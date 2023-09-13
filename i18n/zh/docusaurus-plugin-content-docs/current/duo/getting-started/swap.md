---
sidebar_label: '开启虚拟内存Swap'
sidebar_position: 30
---

# 什么是 Swap

Swap，又叫做虚拟内存，用于在物理内存(RAM)已满时支持将数据存储在硬盘中。有时即使物理内存尚未用完，Swap也被用于增加缓存容量。在Duo上面，可以理解为，将部分TF卡的空间分配出来当做内存(RAM)使用

# 在 Duo 中如何开启 Swap

使用最新的系统镜像

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

在Duo终端中执行如下两条命令来激活Swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
然后运行 `free -h` 命令来查看swap是否已经启用 (256M)

**免责声明：打开Swap功能可能会导致TF卡磨损加快，缩短其使用寿命！强烈建议仅在内存不足时启用虚拟内存！**