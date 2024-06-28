---
sidebar_label: '安装镜像到 eMMC'
sidebar_position: 50
---

# 安装镜像到 eMMC

Meles 上使用的 SoC TH1520 支持从 SD Card 和 eMMC 启动。本章向您介绍如何向您的 eMMC 模块中刷写系统。

## 必要准备

- Meles 和 Type C 数据线
- 带有 Bootloader 的 SPI Nor Flash，并焊接在开发板上
- 大于 16GB 的 eMMC 模块
- 运行 Ubuntu 的PC/笔记本电脑/虚拟机

在开始刷写前，请您确保 SPI Nor Flash 中刷入了正确的固件。如果您不知道如何向 SPI Nor Flash 刷写固件，请您参考[安装镜像到 SPI Nor Flash](./install-an-image-to-spi-nor-flash.md)章节。

## 下载镜像和工具

在向 eMMC 刷入镜像以前，您需要准备 fastboot 实用工具和相应的镜像文件。

在 Ubuntu 操作系统中执行以下命令来安装 fastboot

```
sudo apt-get install android-tools-adb
sudo apt-get install fastboot
```

另外您需要下载以下的镜像文件

- u-boot-with-spl-meles.bin 或 u-boot-with-spl-meles-4g.bin
- boot-meles-xxxx_xxxx.ext4
- root-meles-xxxx_xxxx.ext4

其中第一项 u-boot 镜像需要根据您的开发板版本选择，若您的开发板是 8GB 版本，则您需要下载 ```u-boot-with-spl-meles.bin```。若您的开发板是 4GB 版本，则下载 ```u-boot-with-spl-meles-4g.bin```。这些文件可以在[官方镜像](../resources-download/image.md)章节找到。

## 写入镜像

首先将 eMMC 卡插入 Meles 背面的插槽。

![Install-eMMC](/docs/meles/Install-emmc.webp)

然后执行以下步骤使 Meles 进入烧录模式：

  - 按住 Meles 下载按钮
  - 拔插一次 Type-C 数据线
  - 松开下载按钮

![Download Button](/docs/meles/DownloadButton.webp)

在 Ubuntu 键入以下命令来查看设备，正常情况下会有第二行的输出:

```
$ lsusb | grep T-HEAD
Bus 001 Device 045: ID 2345:7654 T-HEAD USB download gadget
```

这时键入 ```sudo fastboot devices``` 命令，返回 fastboot 设备号，证明可以开始烧录。

执行以下命令开始烧录，在执行时注意将 ```[]``` 中的文件名替换为您下载的文件名。

```
fastboot flash ram [u-boot-with-spl.bin]
fastboot reboot
#这里暂停 3-5 秒等待 Meles 重启
fastboot flash boot [boot-meles-xxxx_xxxx.ext4]
fastboot flash root [root-meles-xxxx_xxxx.ext4]
```

成功时显示效果如下图所示。

![Write Success](/docs/meles/WriteSuccess.webp)
