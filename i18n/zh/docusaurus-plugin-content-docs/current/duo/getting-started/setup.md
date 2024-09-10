---
sidebar_label: '设置'
sidebar_position: 20
---

# 设置工作环境

## USB Net 设置

为了使用 USB 网络，我们在系统上默认启用了 CDC-NCM 和 DHCP。

:::tip
`V1.1.2` 之前的固件使用的 USB 网络是 RNDIS，如果您使用的是旧的版本，请更新到 `V1.1.2` 或更新的系统镜像。
:::

CDC-NCM 在 Linux，macOS，以及最新的 Windows 系统上都免驱的，您可以直接使用 `ssh root@192.168.42.1` 登陆到 Duo 的终端。

### Windows

如果您的 Windows 系统比较旧，需要手动安装 CDC-NCM 驱动，方法如下：

1. 通过 Type-C 线将 Duo，Duo256M 或者 DuoS 与电脑连接。

2. `CDC NCM` 设备出现在设备管理器中，显示为黄色的感叹号表示未安装驱动。

   <Image src='/docs/duo/duo-usb-ncm_01_zh.webp' maxWidth='80%' align='left' />

3. 选择 `CDC NCM` 后右键选择 `更新驱动程序`。

   <Image src='/docs/duo/duo-usb-ncm_02_zh.webp' maxWidth='80%' align='left' />

4. 选择 `浏览我的电脑以查找驱动程序`。

   <Image src='/docs/duo/duo-usb-ncm_03_zh.webp' maxWidth='80%' align='left' />

5. 选择 `让我从计算机上的可用驱动程序列表中选取`。

   <Image src='/docs/duo/duo-usb-ncm_04_zh.webp' maxWidth='80%' align='left' />

6. 选择 `网络适配器`。

   <Image src='/docs/duo/duo-usb-ncm_05_zh.webp' maxWidth='80%' align='left' />

7. 在 `厂商` 中选择 `Microsoft`，`型号` 中选择 `UsbNcm Host Device`。

   <Image src='/docs/duo/duo-usb-ncm_06_zh.webp' maxWidth='80%' align='left' />

8. 忽略警告信息。

   <Image src='/docs/duo/duo-usb-ncm_07_zh.webp' maxWidth='80%' align='left' />

9. 驱动程序安装成功。

   <Image src='/docs/duo/duo-usb-ncm_08_zh.webp' maxWidth='80%' align='left' />

10. 检查 `网络适配器`，`UsbNcm Host Device` 已经正常显示。

    <Image src='/docs/duo/duo-usb-ncm_09_zh.webp' maxWidth='80%' align='left' />

11. 使用 `ping` 命令测试。

    <Image src='/docs/duo/duo-usb-ncm_10.webp' maxWidth='80%' align='left' />

### Linux & macOS

打开终端，使用 `ping` 命令测试：

```
ubuntu@linux:~$ ping 192.168.42.1 -c 5
PING 192.168.42.1 (192.168.42.1) 56(84) bytes of data.
64 bytes from 192.168.42.1: icmp_seq=1 ttl=64 time=2.00 ms
64 bytes from 192.168.42.1: icmp_seq=2 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=3 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=4 ttl=64 time=2.01 ms
64 bytes from 192.168.42.1: icmp_seq=5 ttl=64 time=2.13 ms

--- 192.168.42.1 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 2.003/2.081/2.132/0.059 ms
```

## SSH

### Windows

1. 打开终端，输入 `ssh root@192.168.42.1`, 首次连接会有如下提示，直接输入 `yes`。

   <Image src='/docs/duo/duo-usb-ncm_ssh_01.webp' maxWidth='80%' align='left' />

2. 输入密码 `milkv` (密码将不会显示)，登陆成功。

   <Image src='/docs/duo/duo-usb-ncm_ssh_02.webp' maxWidth='80%' align='left' />

## 其他

### 修改 USB 网络的 IP 地址

USB 网络 CDC-NCM 默认的 IP 地址是 `192.168.42.1`，如果您需要修改这个地址，比如同一台电脑接入多台 Duo 设备时，每一台 Duo 的 IP 需要设置为不同，可以通过在 Duo 设备内修改如下两个文件实现：

```bash {11} showLineNumbers title="/mnt/system/usb-ncm.sh"
#!/bin/sh

/etc/uhubon.sh device >> /tmp/ncm.log 2>&1
/etc/run_usb.sh probe ncm >> /tmp/ncm.log 2>&1
if test -e /usr/bin/burnd; then
  /etc/run_usb.sh probe acm >> /tmp/ncm.log 2>&1
fi
/etc/run_usb.sh start ncm >> /tmp/ncm.log 2>&1

sleep 0.5
ifconfig usb0 192.168.42.1

count=`ps | grep dnsmasq | grep -v grep | wc -l`
if [ ${count} -lt 1 ] ;then
  echo "/etc/init.d/S80dnsmasq start" >> /tmp/ncm.log 2>&1
  /etc/init.d/S80dnsmasq start >> /tmp/ncm.log 2>&1
fi
```

```bash {2} showLineNumbers title="/etc/dnsmasq.conf"
interface=usb0
dhcp-range=192.168.42.2,192.168.42.242,1h
dhcp-option=3
dhcp-option=6
```

### 开启虚拟内存 Swap

#### 什么是 Swap

Swap，又叫做虚拟内存，用于在物理内存(RAM)已满时支持将数据存储在硬盘中。有时即使物理内存尚未用完，Swap也被用于增加缓存容量。在Duo上面，可以理解为，将部分TF卡的空间分配出来当做内存(RAM)使用。

:::caution
打开 Swap 功能可能会导致 TF 卡磨损加快，缩短其使用寿命！强烈建议**仅在内存不足时**启用虚拟内存！
:::

:::tip
Duo 256M 内存相对较大，所以默认固件未添加 Swap 分区，不支持 Swap 功能。
:::

#### 在 Duo 中如何开启 Swap

使用最新的系统镜像

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

在 Duo 终端中执行如下两条命令来激活 Swap
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

#### 如何增加 Swap 分区的大小

默认固件 Swap 分区的大小为 `256M`, 增加 Swap 分区大小的方法有两种：

1. 修改 SDK 配置，重新编译生成新固件

   您可以修改制作镜像的配置文件中 Swap 分区的大小，然后重新编译生成固件，Duo 对应的配置文件链接如下：

   [milkv-duo-sd](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo-sd/genimage.cfg#L36)

2. 在 Duo 中直接用 fdisk 命令修改

   通过串口线或者 SSH 登陆到 Duo 上，使用 fdisk 命令修改，原理就是把原来用于 Swap 的分区先删除掉，再重新用指定大小新建一个。

   :::caution
   对分区进行任何修改都可能导致数据丢失。在进行分区操作之前，请务必备份重要的数据！
   :::

   以下是使用 fdisk 的命令行交互方式一步一步操作，如果不习惯该方式，后面提供了脚本方式，执行一次脚本即可完成修改。

   - fdisk 命令行交互方式

     输入 `fdisk` 命令，会进入 `fdisk` 的命令行交互模式：
     ```
     fdisk /dev/mmcblk0
     ```
     输入 `p` 指令，查看当前TF卡系统的分区的信息，可以看到用于 `swap` 的 `/dev/mmcblk0p3` 分区是 `256M`：
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
     记录一下 `/dev/mmcblk0p3` 的 `StartLBA` (起始扇区)值，这里是 `1835009`，等下会用到。

     再执行 `d` 指令删除分区, 提示输入要删除的分区号，我们要删除 `/dev/mmcblk0p3`，所以再输入 `3`：
     ```
     Command (m for help): d
     Partition number (1-4): 3
     ```

     再用 `n` 指令新建分区，提示要新建主分区还是扩展分区，我们需要建主分区，所以输入 `p` ，接下来输入分区号，我们要新建的是 `/dev/mmcblk0p3`，所     以输入 `3`，下面的提示 `First sector` 是要求输入新建分区的起始扇区值，就是上边记录的 `1835009` 这个值，可以看到提示中默认识别到的就是这个     值，所以可以不输，直接回车，最后就是输入新建分区的大小了，看提示，可以输入结束扇区值，也可以直接输入分区的大小，比如要分配1G大小就输入 `+1G`：
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
     此时可以再执行 `p` 指令查看一下当前的分区情况，`/dev/mmcblk0p3` 已经是 `1024M` 也就是 `1G` 了。

     最后，执行 `w` 指令保存修改，并退出fdisk交互模式：
     ```
     Command (m for help): w
     The partition table has been altered.
     Calling ioctl() to re-read partition table
     fdisk: WARNING: rereading partition table failed, kernel still uses old table: Resource busy
     ```
     此时分区的修改并未生效，需要执行 `reboot` 重启，或重新上电后生效。

     使用时，同样在 Duo 终端中执行如下两条命令来激活 Swap：
     ```
     mkswap /dev/mmcblk0p3
     swapon /dev/mmcblk0p3
     ```
     然后运行 `free -h` 命令来查看swap是否已经启用 (1G即1024M)

   - fdisk 脚本方式

     在 Duo 中新建一个脚本文件 `swap_resize.sh`，或者在 PC 中建好再上传到 Duo 中。

     `swap_resize.sh` 文件的内容，注意修改 `+1G` 为自己需要设置的大小：
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

     在 Duo 中执行该脚本，会自己修改 swap 分区大小：
     ```bash
     sh swap_resize.sh
     ```

     同样，需要执行 `reboot` 重启，或重新上电后生效，再激活 Swap：
     ```
     mkswap /dev/mmcblk0p3
     swapon /dev/mmcblk0p3
     ```
     然后运行 `free -h` 命令来查看 swap 是否已经启用 (1G即1024M)

     ```
     [root@milkv-duo]~# free -h
                   total        used        free      shared  buff/cache   available
     Mem:          28.8M       13.8M        8.2M       76.0K        6.8M       12.3M
     Swap:       1024.0M           0     1024.0M
     ```