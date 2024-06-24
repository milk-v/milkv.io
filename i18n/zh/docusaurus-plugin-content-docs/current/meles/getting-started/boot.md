---
sidebar_label: '启动 Meles'
sidebar_position: 10
---

# 启动 Meles

## 准备工作

#### 必要前提

- Meles 开发板
- 大于 16GB 的 eMMC
- 供电
  - Meles 由输入电压为 5V 的 Type C 端口供电。
 
#### 可选项
- USB 串口模块
  - [使用串口终端](./setup.md).
- 网络
  - Meles 支持通过 WIFI 或网线接入互联网。
  - 网线用于将 Meles 连接到本地网络和互联网。
- Type A 到 Type C 的 USB 线
  - 需要使用 fastboot 命令将映像刻录到 EMMC 中。
- USB 键鼠
  - Meles 具有四个 USB-A 端口，可以配备全尺寸键盘和鼠标。
- 显示器和 HDMI 线
  - Meles 配备了全尺寸 HDMI 连接器。建议使用支持 HDMI 的显示器。
  - 最高支持 3840 x 2160（4K）分辨率。

## 下载镜像和工具

您需要使用 fasboot 实用程序将映像刻录到 eMMC 中。

- 使用以下命令在 Linux 上安装 fasboot 实用程序: `sudo apt-get install android-tools-adb`.

您需要下载以下三个文件:

- u-boot-with-spl-meles-4g.bin 或 u-boot-with-spl-meles.bin
  - 根据 Meles 内存大小进行选择, 4G 选择 u-boot-with-spl-meles-4g.bin, 8G 选择 u-boot-with-spl-meles.bin
- boot-meles-20240417_155900.ext4
- root-meles-20240417_155900.ext4

从此处下载 [系统镜像](../resources-download/image.md).

## 写入镜像

#### 以下是如何在 Linux 系统上使用 fasboot 实用程序将镜像刻录到 eMMC 的步骤。如果您想用 SD 卡启动，请单击此处: [使用 SD 卡安装镜像](../installation/install-an-image-to-microsd-card.md).

- 首先将 eMMC 卡入 Meles 背面的插槽。

![Install-eMMC](/docs/meles/Install-emmc.webp)

- 使用 TypeA 到 TypeC 数据线将 Meles 连接到电脑。
  - 数据线的 Type-A 端口连接到 PC 端，Type-C 端口连接到 Meles。

- 执行以下步骤使 Meles 进入烧录模式：
  - 按住 Meles 下载按钮
  - 拔插一次 Type-C 数据线
  - 松开下载按钮

![Download Button](/docs/meles/DownloadButton.webp)

- 在 PC 端键入以下命令来查看设备:
```
$ lsusb | grep T-HEAD
Bus 001 Device 045: ID 2345:7654 T-HEAD USB download gadget
```

- 执行以下命令开始烧录
  - 命令中 `u-boot-with-spl.bin` 分为 `u-boot-with-spl-meles-4g.bin` 和 `u-boot-with-spl-meles.bin`, 请根据开发板的内存的大小选择使用。
  - `4G` 选择 `u-boot-with-spl-meles-4g.bin`, `8G` 选择 `u-boot-with-spl-meles.bin` 。
```
$ fastboot flash ram u-boot-with-spl.bin
$ fastboot reboot
$ sleep 5
$ fastboot flash uboot u-boot-with-spl.bin
$ fastboot flash boot boot-meles-20240417_155900.ext4
$ fastboot flash root root-meles-20240417_155900.ext4
```

- 成功后显示效果如下图所示。

![Write Success](/docs/meles/WriteSuccess.webp)

## 开机

将 5v 电源适配器和 HDMI 线分别连接到 Meles 的 Type-C端口和 HDMI 端口， HDMI 另一端连接显示器。

当系统启动后，Meles 连接的显示器将显示 Debian 桌面。

## 故障排除

如果您遇到问题, 请到我们的 [社区](https://community.milkv.io/) 提问。