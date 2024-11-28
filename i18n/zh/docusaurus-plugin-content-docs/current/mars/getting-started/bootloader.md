---
sidebar_label: 'Bootloader 升级'
sidebar_position: 40
---

# Mars Bootloader 引导程序升级

Mars 无论是通过 SD 卡启动系统，还是通过 eMMC 模组启动系统，都要通过 Bootloader 引导程序来启动，这个引导程序存储在板上的一个 SPI Flash 中，包含 `SPL` 和 `U-Boot` 两个部分

:::tip
Mars 中的这个 Bootloader 您可以理解为我们电脑中的 BIOS
:::

Mars 出厂时已经预置了一个初始的 Bootloader 程序，正常使用中无须升级该程序。只有出现如下情况时，需要升级 Bootloader

1. SPI Flash 中的 Bootloader 程序意外损坏，导致无法正常启动系统时
2. 官方系统镜像升级(比如 Debian)，必须配合新的 Bootloader，否则无法启动时
3. U-Boot 修复了一些 Bug，或者增加了新功能，您需要使用这些新功能时

更新 Mars 上 SPI Flash 中 Bootloader 的方法有几种，比如 Windows 烧录工具、TFTP、flashcp 命令等，这里分别介绍使用 `flashcp` 命令和在 Windows 系统中使用 `UsbFlashTool` 烧录工具的方法

## 使用 flashcp 命令更新 Bootloader

如果您的 Mars 当前的 Bootloader 可以正常引导 Debian 系统，您可以在 Debian 系统中使用 `flashcp` 命令来更新 Bootloader。

1. 安装 flashcp 命令

   Debian 系统中 `flashcp` 命令包含在 `mtd-utils` 这个包中，执行如下命令安装：
   ```bash
   sudo apt install mtd-utils
   ```

2. 下载 Bootloader 固件

   [Bootloader 固件](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

   固件包含 `SPL` 和 `U-Boot` 两个文件：
   ```
   SPL:    mars_u-boot-spl.bin.normal.out
   U-Boot: mars_visionfive2_fw_payload.img
   ```
   可以在 Mars 上直接下载，或者在 PC 上下载后通过 scp 命令或U盘拷贝到 Mars 上。

3. 查看 SPI Flash 分区信息
   ```
   cat /proc/mtd
   ```
   输出结果如下：
   ```
   user@milkv:~$ cat /proc/mtd
   dev:    size   erasesize  name
   mtd0: 00040000 00001000 "spl"
   mtd1: 00300000 00001000 "uboot"
   mtd2: 00100000 00001000 "data"
   ```
   我们需要将 `SPL` 更新到 `mtd0` 分区, `U-Boot` 更新到 `mtd1` 分区。

4. 更新 Bootloader

   更新 SPL:
   ```bash
   sudo flashcp -v mars_u-boot-spl.bin.normal.out /dev/mtd0
   ```
   更新 U-Boot:
   ```bash
   sudo flashcp -v mars_visionfive2_fw_payload.img /dev/mtd1
   ```
   执行成功输出如下:
   ```
   user@milkv:~$ sudo flashcp -v mars_u-boot-spl.bin.normal.out /dev/mtd0
   Erasing blocks: 36/36 (100%)
   Writing data: 143k/143k (100%)
   Verifying data: 143k/143k (100%)
   user@milkv:~$
   user@milkv:~$ sudo flashcp -v mars_visionfive2_fw_payload.img /dev/mtd1
   Erasing blocks: 723/723 (100%)
   Writing data: 2890k/2890k (100%)
   Verifying data: 2890k/2890k (100%)
   ```

重新上电后，可根据 UART 串口日志中的时间戳判断 Bootloader 是否已经更新：

```
U-Boot SPL 2021.10 (Nov 24 2023 - 10:21:39 +0800)
```
```
U-Boot 2021.10 (Nov 24 2023 - 10:21:39 +0800)
```

## 在 Windows 下使用 UsbFlashTool 工具升级 Bootloader

### 下载 UsbFlashTool 烧录工具和 Bootloader 固件

[烧录工具 UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

[Bootloader 固件](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    mars_u-boot-spl.bin.normal.out
U-Boot: mars_visionfive2_fw_payload.img
```

### 安装驱动

:::tip
仅首次使用时需要安装驱动程序
:::

将下载的 `Mars-UsbFlashTool-*-Windows.zip` 解压到 Windows 系统中

1. USB 转 TTL 串口线连接到 Mars 的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   USB 转串口线的连接方法: [使用串口](https://milkv.io/zh/docs/mars/getting-satrted/setup#%E4%BD%BF%E7%94%A8%E4%B8%B2%E5%8F%A3)

   ![mars](/docs/mars/mars-usb-flash-tool_02.png)

   **注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口**

2. 用双公头 USB 数据线连接 PC 和 Mars 的 USB 2.0 接口

   <Image src='/docs/common/usba2usba.webp' maxWidth='60%' align='left' />

   ![mars](/docs/mars/mars-usb-port-a.jpg)

3. 按住 Mars 上的升级键，再通过 Type C 接口绐 Mars 上电，此时 Mars 会进入升级模式，可松开升级键继续操作

   ![mars](/docs/mars/mars-upgrade-key.jpg)

4. 打开刷机工具目录中的 `UsbFlashTool-*-Windows.exe` 烧录程序

   ![mars](/docs/mars/mars-usb-flash-tool_05.png)

5. 右侧串口设置中的串口号，设置为第 1 步中记录的串口号

   ![mars](/docs/mars/mars-usb-flash-tool_06.png)

6. 在 `File Type` 中选择 `Firmware`, 再点 `File Select` 选择 `update` 目录中 `usbprog-mars-230510.out` 固件，再点 `Load`，等待加载完后提示 `Loaded`

   ![mars](/docs/mars/mars-usb-flash-tool_07.png)

7. 此时在 Windows 的设备管理器上已经识别到 JH7110 设备，需要安装驱动

   ![mars](/docs/mars/mars-usb-flash-tool_08.png)

8. 在工具包目录下打开 `zadig-2.5` 程序，选中菜单 `Options` 中的 `List All Devices`，在下拉列表中先择 `StarFive JH7110 Device`，再点击 `Install Driver` 完成驱动的安装

   ![mars](/docs/mars/mars-usb-flash-tool_09.png)

   驱动安装成功后，检查一下设备管理器中的状态是否已成为正常的 USB 设备

   ![mars](/docs/mars/mars-usb-flash-tool_10.png)

9.  驱动安装成功后，将 UsbFlashTool 窗口关闭，Mars 断电

### 升级 Bootloader

烧录 Bootloader 的前 5 步与上面安装驱动的前 5 步是一致的

1. USB 转 TTL 串口线连接到 Mars 的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   USB 转串口线的连接方法: [使用串口](https://milkv.io/zh/docs/mars/getting-satrted/setup#%E4%BD%BF%E7%94%A8%E4%B8%B2%E5%8F%A3)

   ![mars](/docs/mars/mars-usb-flash-tool_02.png)

   注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口

2. 用双公头 USB 数据线连接 PC 和 Mars 的 USB 2.0 接口

   <Image src='/docs/common/usba2usba.webp' maxWidth='60%' align='left' />

   ![mars](/docs/mars/mars-usb-port-a.jpg)

3. 按住 Mars 上的升级键，再通过 Type C 接口绐 Mars 上电，此时 Mars 会进入升级模式，可松开升级键继续操作

   ![mars](/docs/mars/mars-upgrade-key.jpg)

4. 打开刷机工具目录中的 `UsbFlashTool-*-Windows.exe` 烧录程序

   ![mars](/docs/mars/mars-usb-flash-tool_05.png)

5. 右侧串口设置中的串口号，设置为第 1 步中记录的串口号

   ![mars](/docs/mars/mars-usb-flash-tool_06.png)

6. 在 `File Type` 中选择 `Firmware`, 再点 `File Select` 选择 `update` 目录中 `usbprog-mars-230510.out` 固件，再点 `Load`，等待加载完后提示 `Complete`

   ![mars](/docs/mars/mars-usb-flash-tool_15.png)

7. 烧录 `SPL`

   点击 `File Select`, 选择要烧录的 `SPL` 固件 `u-boot-spl.bin.normal.out` ，在 `File Type` 中选择 `SPL`，`Memory Type` 中选择 `FLASH`，再点击 `Load` 开始烧录固件

   ![mars](/docs/mars/mars-usb-flash-tool_16.png)

   烧录成功后会显示 `SUCCEED` 和 `Complete`

   ![mars](/docs/mars/mars-usb-flash-tool_17.png)

8. 烧录 `U-BOOT`

   点击 `File Select`, 选择要烧录的 `U-BOOT` 固件 `visionfive2_fw_payload.img` ，在 `File Type` 中选择 `U-Boot`，`Memory Type` 中选择 `FLASH`，再点击 `Load` 开始烧录固件

   ![mars](/docs/mars/mars-usb-flash-tool_18.png)

   烧录成功后会显示 `SUCCEED` 和 `Complete`

   ![mars](/docs/mars/mars-usb-flash-tool_19.png)

9. 烧录完成后，将 UsbFlashTool 窗口关闭，Mars 断电


重新上电后，可根据 UART 串口日志中的时间戳判断 Bootloader 是否已经更新

```
U-Boot SPL 2021.10 (Aug 31 2023 - 12:55:45 +0800)
```

```
U-Boot 2021.10 (Aug 31 2023 - 12:55:45 +0800), Build: jenkins-github_visionfive2-17
```

## 刷新新版本的 U-Boot

### 下载 Bootloader 固件

[Bootloader 固件](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    mars_u-boot-spl.bin.normal.out
U-Boot: mars_visionfive2_fw_payload.img
```

### SD 卡分区

以下以 /dev/sdc 为例：

运行命令 `sudo fdisk /dev/sdc` ,启动 fdisk。
```
milkv@milkv-desktop:~$ sudo fdisk /dev/sdc

Welcome to fdisk (util-linux 2.37.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): 
```
根据提示输入 `n`,创建新分区。
```
Command (m for help): n
Partition number (1-128, default 1): 
First sector (34-122131422, default 2048): 
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-122131422, default 122131422): 

Created a new partition 1 of type 'Linux filesystem' and of size 58.2 GiB.
```
根据提示输入，也可直接按 enter 。
 
注意：要是出现 Do you want to remove the signature? [Y]es/[N]o ，选择 N 。

创建好之后，输入 `w` 保存并退出。

输入命令 `sudo mkfs.vfat -I /dev/sdc1` ,将分区格式化为 FAT32 。

运行命令 `lsdlk -f `, 查看是否格式化成功。

```
milkv@milkv-desktop:~$ sudo mkfs.vfat -I /dev/sdc1
mkfs.fat 4.2 (2021-01-31)
milkv@milkv-desktop:~$ lsblk -f
NAME FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
loop0
     squash 4.0                                                    0   100% /snap/bare/5
loop1
     squash 4.0                                                    0   100% /snap/core18/2846
loop2
     squash 4.0                                                    0   100% /snap/core20/2379

...

sda                                                                         
sdc                                                                         
└─sdc1
     vfat   FAT32       6A8E-8C2A                                           
nvme0n1
│                                                                           
├─nvme0n1p1
│    vfat   FAT32       0BA1-44C9                             504.9M     1% /boot/efi
└─nvme0n1p2
     ext4   1.0         1ad0a4fe-c1e1-4dbe-a6cb-8488144bd6b7     49G    84% /var/snap/firefox/common/host-hunspell
                                                                            /
```
运行命令 `sudo mount /dev/sdc1 /mnt`, 将其挂载到 /mnt 目录。可根据实际情况来决定挂载到哪个目录。

将下载的 `mars_u-boot-spl.bin.normal.out` 和 `mars_visionfive2_fw_payload.img` 复制到 mnt 目录下。

### 刷新 u-boot

假设您的新 U-Boot 版本位于 SD 卡的第 1 个分区上，您可以使用以下命令将其安装到 SPI 闪存中
```
sf probe
load mmc 0:1 $kernel_addr_r mars_u-boot-spl.bin.normal.out
sf update $kernel_addr_r 0 $filesize
load mmc 0:1 $kernel_addr_r mars_visionfive2_fw_payload.img
sf update $kernel_addr_r 0x100000 $filesize
```
注意：load mmc 可能是 0：1 ，也可能是 1:1 。

可以运行命令 `ls mmc 0:1` 跟 `ls mmc 1:1`,观察文件是否存在。

```
StarFive # ls mmc 1:1
   147336   mars_u-boot-spl.bin.normal.out
  2959557   mars_visionfive2_fw_payload.img

2 file(s), 0 dir(s)
```

更新 U-Boot 后，您可能需要重新启动并将环境重置为默认值。
```
env default -f -a
env save
```

## 在 Linux 下使用 Uart 启动 U-BOOT 

当 SPI 中的 U-BOOT 损坏，SD卡也无法启动时，可以使用 uart 启动。

### 下载 Bootloader 固件

[Bootloader 固件](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    mars_u-boot-spl.bin.normal.out
U-Boot: mars_visionfive2_fw_payload.img
```

### 下载 tio

可参考：https://github.com/tio/tio 

:::tip
注意要下载最新版本，直接运行命令 `sudo apt-get install tio` 下载的版本是不符合要求的。
:::

### 从 UART 启动

按住 Mars 上的升级键，为开发板供电并通过 XMODEM 上传 `mars_u-boot-spl.bin.normal.out`。

运行命令 `tio -b 115200 --databits 8 --flow none --stopbits 1 /dev/ttyUSB0`
```
$ tio -b 115200 --databits 8 --flow none --stopbits 1 /dev/ttyUSB0
[08:14:54.700] tio v2.7
[08:14:54.700] Press ctrl-t q to quit
[08:14:54.701] Connected

(C)StarFive
CCC
(C)StarFive
CCCCCCCC
```
按ctrl-t x启动 XMODEM-1K 传输,根据提示输入即可。

```
[15:37:49.827] Please enter which X modem protocol to use:
[15:37:49.827]  (0) XMODEM-1K send
[15:37:49.827]  (1) XMODEM-CRC send
[15:37:49.827]  (2) XMODEM-CRC receive
CCCCCCCCCCCCCCCC
[15:37:51.940] Send file with XMODEM-1K
[15:38:15.230] Sending file '/tmp/mars_u-boot-spl.bin.normal.out'  
[15:38:15.230] Press any key to abort transfer
................................................................................................................................................|
[15:38:29.151] Done

U-Boot SPL 2021.10 (Nov 24 2023 - 10:21:39 +0800)
LPDDR4: 1G version: g8ad50857.
Trying to boot from SPI
```

注意：`Sending file '/path/to/mars_u-boot-spl.bin.normal.out'  `,输入要发送的文件之后，等待....之后出现的 | ,便是发送完成。