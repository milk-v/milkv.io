---
sidebar_label: '启动 Meles'
sidebar_position: 10
---

# 启动 Meles

## 准备工作

#### 必要前提

- Meles 开发板
- 大于 16GB 的 eMMC 或者 MicroSD 卡。
- 供电
  - Meles 由输入电压为 5V 的 Type C 端口供电。
 
#### 可选项
- USB 串口模块
  - [使用串口终端](./setup.md).
- 网络
  - Meles 支持通过 WIFI 或网线接入互联网。
  - 网线用于将 Meles 连接到本地网络和互联网。
- Type A 到 Type C 的 USB 线
  - 需要使用 fastboot 命令将映像刻录到 eMMC 中。
- USB 键鼠
  - Meles 具有四个 USB-A 端口，可以配备全尺寸键盘和鼠标。
- 显示器和 HDMI 线
  - Meles 配备了全尺寸 HDMI 连接器。建议使用支持 HDMI 的显示器。
  - 最高支持 3840 x 2160（4K）分辨率。

## 写入镜像

在硬件准备妥当后，您需要为 Meles 的储存介质烧写系统，根据储存介质的不同，您需要选择不同的刷写方式。

### 使用 eMMC 启动

若您使用 eMMC 作为储存介质，您需要参考[安装镜像到 eMMC ](../installation/install-an-image-to-emmc.md)章节烧录镜像到 eMMC。

另外，您可能需要刷写 SPI Nor Flash 中的固件，这个固件出厂默认是刷写好的。若您有需要，可以参考[安装镜像到 SPI Nor Flash ](../installation/install-an-image-to-spi-nor-flash.md)章节进行刷写。

### 使用 MicroSD 卡启动

若您使用 MicroSD 卡作为储存介质，您需要参考[安装镜像到 MicroSD 卡 ](../installation/install-an-image-to-microsd-card.md)章节进行镜像烧录。

另外，您可能需要刷写 SPI Nor Flash 中的固件，这个固件出厂默认是刷写好的。若您有需要，可以参考[安装镜像到 SPI Nor Flash ](../installation/install-an-image-to-spi-nor-flash.md)章节进行刷写。

## 开机

将 5v 电源适配器和 HDMI 线分别连接到 Meles 的 Type-C端口和 HDMI 端口， HDMI 另一端连接显示器。

当系统启动后，Meles 连接的显示器将显示 Debian 桌面。

:::warning
请您先插入 HDMI 线再接入电源，否则可能造成没有显示输出的问题。
:::

## 故障排除

如果您遇到问题, 请到我们的 [社区](https://community.milkv.io/) 提问。