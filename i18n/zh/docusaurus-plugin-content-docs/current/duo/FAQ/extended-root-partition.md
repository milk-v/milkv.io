---
sidebar_label: '拓展根分区'
sidebar_position: 40
---

# 拓展根分区

## SD卡启动方式的拓展根分区

### 检查当前磁盘使用情况

运行命令` df- h `查看当前磁盘分区和使用情况。

```
[root@milkv-duo]~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       752M  185M  526M  26% /
devtmpfs        159M     0  159M   0% /dev
tmpfs           159M     0  159M   0% /dev/shm
tmpfs           159M  116K  159M   1% /tmp
tmpfs           159M   36K  159M   1% /run
/dev/mmcblk0p1  128M  3.6M  125M   3% /boot
```
根分区 (/dev/root)：752M，已用185M，剩余526M。

运行命令` fdisk -l `查看磁盘和分区的详细信息。

```
[root@milkv-duo]~# fdisk -l
Disk /dev/mmcblk0: 29.54 GiB, 31719424000 bytes, 61952000 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device         Boot  Start     End Sectors  Size Id Type
/dev/mmcblk0p1 *         1  262144  262144  128M  c W95 FAT32 (LBA)
/dev/mmcblk0p2      262145  266240    4096    2M  0 Empty
/dev/mmcblk0p3      266241 1839104 1572864  768M 83 Linux
```
磁盘名称：/dev/mmcblk0
总大小：29.54 GiB (31719424000 bytes)
总扇区数：61952000 sectors
扇区大小：512 bytes
分区表类型：DOS（MBR）

我们要扩展的根分区就是 /dev/mmcblk0p3 ，要记住此分区的起始扇区 266241 。

注意：/dev/mmcblk0p1 是 boot 分区，不要动。
### 使用 fdisk 扩展根分区

1. 运行命令 `fdisk /dev/mmcblk0` 启动 fdisk 。
```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): 
```
2. 删除当前根分区

    1. 输入 d 以删除分区。
    2. 输入分区号（按照自己的实际情况）以删除分区 /dev/mmcblk0p3。删除当前根分区。

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.
```
3. 创建新分区

    1. 输入 n 以创建新分区。
    2. 选择 p 创建主分区。
    3. 输入分区号 3（如果系统提示选择分区号，输入 3）。
    4. 输入起始扇区（此为 266241），然后按 Enter。
    5. 输入结束扇区（可以输入 1839104 或直接按 Enter 以扩展到最大空间）。

注意：分区号，起始扇区，结束扇区根据实际情况来定。

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.

Command (m for help): n
Partition type
   p   primary (2 primary, 0 extended, 2 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (3,4, default 3): 3
First sector (266241-61951999, default 268288): 266241
Last sector, +/-sectors or +/-size{K,M,G,T,P} (266241-61951999, default 61951999): 

Created a new partition 3 of type 'Linux' and of size 29.4 GiB.
Partition #3 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: N

```
注意：要是出现 Do you want to remove the signature? [Y]es/[N]o ，选择 N 。

4. 保存更改

输入 w 保存更改并退出 fdisk。
```
Command (m for help): w

The partition table has been altered.
Syncing disks.
```

5. 扩展文件系统

在 fdisk 操作完成后，您需要扩展文件系统以使用新的分区大小。
```
[root@milkv-duo]~# resize2fs /dev/mmcblk0p3
resize2fs 1.46.2 (28-Feb-2021)
Filesystem at /dev/mmcblk0p3 is mounted on /; on-line resizing required
old_desc_blocks = 3, new_desc_blocks = 118
```
6. 查看扩展后的根分区
```
[root@milkv-duo]~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        30G  178M   28G   1% /
devtmpfs        159M     0  159M   0% /dev
tmpfs           159M     0  159M   0% /dev/shm
tmpfs           159M  116K  159M   1% /tmp
tmpfs           159M   36K  159M   1% /run
/dev/mmcblk0p1  128M  3.6M  125M   3% /boot
```
根分区 (/dev/root)：30G，已用178M，剩余28G。

### 创建扩展根分区脚本

内容如下：

```
#!/bin/bash

# 确保脚本以root身份运行
if [ "$EUID" -ne 0 ]; then
    echo "请以root用户运行此脚本"
    exit
fi

# 设置设备名称
DEVICE="/dev/mmcblk0"

# 使用fdisk进行分区操作
{
echo d      # 删除分区
echo 3      # 删除分区3
echo n      # 创建新分区
echo p      # 主分区
echo 3      # 分区号3
echo 266241  # 起始扇区
echo        # 结束扇区，使用默认值（最大空间）
echo N      # 不移除签名
echo w      # 保存更改
} | fdisk "$DEVICE"

# 检查文件系统并扩展
resize2fs "${DEVICE}p3"

# 显示扩展后的磁盘使用情况
df -h
```
注意：此脚本中的 删除分区，分区号，起始扇区，结束扇区要根据自己的实际情况来决定。

将脚本命名为 `resize.sh` ,运行命令 `chmod + x resize.sh` 获取权限。

运行命令 `./resize.sh`,便可成功扩展根分区。