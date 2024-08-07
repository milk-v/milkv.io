---
sidebar_label: 'Duo 启动'
sidebar_position: 10
---

# 从 microSD 卡启动 Duo

## 准备

- 必要的
  - Duo，Duo256M 或者 DuoS
  - 大于 1GB 的 microSD 卡
  - Type-C 数据线
- 可选的
  - USB to TTL 串口模块

## 下载镜像和工具

- 从[官方镜像和SDK](https://milkv.io/zh/docs/duo/resources/image-sdk)下载系统镜像。
- 下载镜像烧录工具 [balenaEtcher](https://etcher.balena.io/) 或 [Rufus](https://rufus.ie/en/)。

## 烧录镜像

以下是使用 BalenaEtcher 烧录系统镜像的步骤。

- 点击 **Flash from file**

![etcher-step1](/docs/duo/etcher-step1.png)

- 点击 **Select target**

![etcher-step2](/docs/duo/etcher-step2.png)

- 点击 **Flash!**

![etcher-step3](/docs/duo/etcher-step3.png)

## 开机

使用适配器（5V）或电脑 USB，用 Type-C 线连接 Duo。

Duo 上的蓝色 LED 灯将闪烁。

:::tip
如果开机后蓝色 LED 未闪烁，说明系统没有正常运行，可能是烧录到 microSD 中的镜像有问题。您可以尝试用其他烧录软件重新烧录镜像，常用的烧录软件有 balenaEtcher，Rufus，Win32DiskImager 等。如果仍然不能正常启动，可以连接串口线，将开机后的日志发送绐我们分析。
:::

## 故障排除

如果您有问题，请到我们的[社区](https://community.milkv.io/)发帖，让我们知道。
