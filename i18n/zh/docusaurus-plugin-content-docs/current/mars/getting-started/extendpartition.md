---
sidebar_label: '扩展分区'
sidebar_position: 30
---

# 扩展 SD 卡或者 eMMC 系统分区容量

官方 Debian 镜像根文件系统默认容量约为 `4GB`，在安装软件或其他数据增加的情况下会出现空间不足的情况，我们可以将文件系统扩展为使用 SD 卡或 eMMC 的全部容量。

:::tip
Mars 中使用 eMMC 或 SD 卡启动，存储挂载的节点不同，`eMMC` 版本为 `/dev/mmcblk0`，`SD Card` 版本为 `/dev/mmcblk1`
:::

如下以一个 32G SD 卡启动的 Mars 为例，介绍如何通过命令来进行扩容，eMMC 版的扩容方法也是一样的，只需把 `/dev/mmcblk1` 换成 `/dev/mmcblk0`（`/dev/mmcblk1p4` 换成 `/dev/mmcblk0p4`）。

## 查看当前分区的状态

用 `df -h` 命令查看系统当前的分区状态

```
# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            700M     0  700M   0% /dev
tmpfs           193M  3.3M  190M   2% /run
/dev/mmcblk1p4  3.7G  3.1G  590M  85% /
tmpfs           962M     0  962M   0% /dev/shm
tmpfs           5.0M   12K  5.0M   1% /run/lock
/dev/mmcblk1p3  100M   23M   77M  23% /boot
tmpfs           193M   60K  193M   1% /run/user/110
tmpfs           193M   24K  193M   1% /run/user/0
```

可以看到当前根分区 `/` 目录挂载的设备为 `/dev/mmcblk1p4`

## 使用 fdisk 命令扩展分区

执行 `fdsik` 命令进入 fdisk 的命令行交互模式

```
# fdisk /dev/mmcblk1
```

输入 `p` 指令，查看当前分区的信息，可以看到系统分区 `/dev/mmcblk1p4` 当前容量是 `3.8G`

```
Command (m for help): p

Disk /dev/mmcblk1: 29.12 GiB, 31267487744 bytes, 61069312 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 2D487F15-E07F-4B07-BC04-80EA297E8675

Device          Start     End Sectors  Size Type
/dev/mmcblk1p1   4096    8191    4096    2M HiFive BBL
/dev/mmcblk1p2   8192   16383    8192    4M HiFive FSBL
/dev/mmcblk1p3  16384  221183  204800  100M EFI System
/dev/mmcblk1p4 221184 8189918 7968735  3.8G Linux filesystem
```

再执行 `d` 指令删除原系来的统分区, 提示输入要删除的分区号，我们要删除 `/dev/mmcblk1p4`，所以再输入 `4`

```
Command (m for help): d
Partition number (1-4, default 4): 4

Partition 4 has been deleted.

Command (m for help):
```

再用 `n` 指令新建分区，提示输入分区号，我们还是使用 `/dev/mmcblk1p4`，所以输入 `4`

下面的提示 `First sector` 是要求输入新建分区的起始扇区值，命令已经帮我们识别到了默认的起始值(`default 221184`)，就是刚刚删除的 `/dev/mmcblk1p4` 的起始扇区，所以可以不输入，直接回车

然后就是输入新建分区的大小了，默认的 `default` 值就是全部的存储空间，也不用输入具体值，直接回车，提示 "Do you want to remove the signature? [Y]es/[N]o:" 输入 `No`

```
Command (m for help): n
Partition number (4-128, default 4): 4
First sector (34-61069278, default 221184): 
Last sector, +/-sectors or +/-size{K,M,G,T,P} (221184-61069278, default 61067263): 

Created a new partition 4 of type 'Linux filesystem' and of size 29 GiB.
Partition #4 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: No

Command (m for help):
```

此时可以再执行 `p` 指令查看一下当前的分区情况，`/dev/mmcblk1p4` 已经扩展为存储的全部空间了，我这里是 `29G`

```
Command (m for help): p

Disk /dev/mmcblk1: 29.12 GiB, 31267487744 bytes, 61069312 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 2D487F15-E07F-4B07-BC04-80EA297E8675

Device          Start      End  Sectors  Size Type
/dev/mmcblk1p1   4096     8191     4096    2M HiFive BBL
/dev/mmcblk1p2   8192    16383     8192    4M HiFive FSBL
/dev/mmcblk1p3  16384   221183   204800  100M EFI System
/dev/mmcblk1p4 221184 61067263 60846080   29G Linux filesystem

Command (m for help):
```

执行 `w` 指令保存修改，并退出 `fdisk` 交互模式

```
Command (m for help): w
The partition table has been altered.
Syncing disks.
```

最后，执行 `resize2fs` 命令来完成文件系统的扩容

```
# resize2fs /dev/mmcblk1p4 
resize2fs 1.46.6-rc1 (12-Sep-2022)
Filesystem at /dev/mmcblk1p4 is mounted on /; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 4
The filesystem on /dev/mmcblk1p4 is now 7605760 (4k) blocks long.
```

再次用 `df -h` 命令来查看分区状态，可以看到系统分区节点 `/dev/mmcblk1p4` 已经扩容到了 `29G`

```
# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            700M     0  700M   0% /dev
tmpfs           193M  3.3M  190M   2% /run
/dev/mmcblk1p4   29G  3.1G   26G  11% /
tmpfs           962M     0  962M   0% /dev/shm
tmpfs           5.0M   12K  5.0M   1% /run/lock
tmpfs           193M   64K  193M   1% /run/user/110
tmpfs           193M   24K  193M   1% /run/user/0
/dev/mmcblk1p3  100M   23M   77M  23% /boot
```