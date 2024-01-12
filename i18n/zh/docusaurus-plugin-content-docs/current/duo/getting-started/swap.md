---
sidebar_label: '开启虚拟内存Swap'
sidebar_position: 30
---

## 一、什么是 Swap

Swap，又叫做虚拟内存，用于在物理内存(RAM)已满时支持将数据存储在硬盘中。有时即使物理内存尚未用完，Swap也被用于增加缓存容量。在Duo上面，可以理解为，将部分TF卡的空间分配出来当做内存(RAM)使用。

:::caution
打开 Swap 功能可能会导致 TF 卡磨损加快，缩短其使用寿命！强烈建议**仅在内存不足时**启用虚拟内存！
:::

:::tip
Duo 256M 内存相对较大，所以默认固件未添加 Swap 分区，不支持 Swap 功能。
:::

## 二、在 Duo 中如何开启 Swap

使用最新的系统镜像

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

在Duo终端中执行如下两条命令来激活Swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
然后运行 `free -h` 命令来查看swap是否已经启用 (256M)

```
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.8M       13.6M        9.1M       76.0K        6.1M       12.4M
Swap:        256.0M           0      256.0M
```

## 三、如何增加Swap分区的大小

默认固件Swap分区的大小为 `256M`, 增加Swap分区大小的方法有两种

### 1. 修改SDK配置，重新编译生成新固件

您可以修改这个 [size](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/milkv/genimage-milkv-duo.cfg#L36) 的值，然后重新编译生成固件

### 2. 在Duo中直接用fdisk命令修改

通过串口线或者SSH登陆到Duo上，使用fdisk命令修改，原理就是把原来用于Swap的分区先删除掉，再重新用指定大小新建一个

:::caution
对分区进行任何修改都可能导致数据丢失。在进行分区操作之前，请务必备份重要的数据！
:::

以下是使用fdisk的命令行交互方式一步一步操作，如果不习惯该方式，后面提供了脚本方式，执行一次脚本即可完成修改

#### fdisk 命令行交互方式

输入 `fdisk` 命令，会进入 `fdisk` 的命令行交互模式
```
fdisk /dev/mmcblk0
```
输入 `p` 指令，查看当前TF卡系统的分区的信息，可以看到用于 `swap` 的 `/dev/mmcblk0p3` 分区是 `256M`
```
Command (m for help): p
Disk /dev/mmcblk0: 15 GB, 15931539456 bytes, 31116288 sectors
486192 cylinders, 4 heads, 16 sectors/track
Units: sectors of 1 * 512 = 512 bytes

Device       Boot StartCHS    EndCHS        StartLBA     EndLBA    Sectors  Size Id Type
/dev/mmcblk0p1 *  0,0,2       16,81,2              1     262144     262144  128M  c Win95 FAT32 (LBA)
/dev/mmcblk0p2    16,81,3     114,57,8        262145    1835008    1572864  768M 83 Linux
/dev/mmcblk0p3    114,57,9    146,219,10     1835009    2359296     524288  256M  0 Empty
```
记录一下 `/dev/mmcblk0p3` 的 `StartLBA` (起始扇区)值，这里是 `1835009`，等下会用到

再执行 `d` 指令删除分区, 提示输入要删除的分区号，我们要删除 `/dev/mmcblk0p3`，所以再输入 `3`
```
Command (m for help): d
Partition number (1-4): 3
```

再用 `n` 指令新建分区，提示要新建主分区还是扩展分区，我们需要建主分区，所以输入 `p` ，接下来输入分区号，我们要新建的是 `/dev/mmcblk0p3`，所以输入 `3`，下面的提示 `First sector` 是要求输入新建分区的起始扇区值，就是上边记录的 `1835009` 这个值，可以看到提示中默认识别到的就是这个值，所以可以不输，直接回车，最后就是输入新建分区的大小了，看提示，可以输入结束扇区值，也可以直接输入分区的大小，比如要分配1G大小就输入 `+1G`
```
Command (m for help): n
Partition type
   p   primary partition (1-4)
   e   extended
p
Partition number (1-4): 3
First sector (1835009-31116287, default 1835009): 
Using default value 1835009
Last sector or +size{,K,M,G,T} (1835009-31116287, default 31116287): +1G
```
此时可以再执行 p 指令查看一下当前的分区情况，`/dev/mmcblk0p3` 已经是 `1024M` 也就是 `1G` 了

最后，执行 `w` 指令保存修改，并退出fdisk交互模式
```
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table
fdisk: WARNING: rereading partition table failed, kernel still uses old table: Resource busy
```
此时分区的修改并未生效，需要执行 `reboot` 重启，或重新上电后生效

使用时，同样在Duo终端中执行如下两条命令来激活Swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
然后运行 `free -h` 命令来查看swap是否已经启用 (1G即1024M)

#### fdisk 脚本方式

在Duo中新建一个脚本文件 `swap_resize.sh`，或者在PC中建好再上传到Duo中

`swap_resize.sh` 文件的内容，注意修改 `+1G` 为自己需要设置的大小
```bash
fdisk /dev/mmcblk0 <<EOF
p
d
3
n
p
3

+1G

w
EOF

fdisk -l /dev/mmcblk0

echo "----- resize /dev/mmcblk0p3 for swap completed -----"
```

在Duo中执行该脚本，会自己修改swap分区大小
```bash
sh swap_resize.sh
```

同样，需要执行 `reboot` 重启，或重新上电后生效，再激活Swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
然后运行 `free -h` 命令来查看swap是否已经启用 (1G即1024M)

```
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.8M       13.8M        8.2M       76.0K        6.8M       12.3M
Swap:       1024.0M           0     1024.0M
```