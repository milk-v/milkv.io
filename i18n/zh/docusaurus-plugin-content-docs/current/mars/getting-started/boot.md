---
sidebar_label: '启动 Mars'
sidebar_position: 10
---
# 从 microSD 卡启动 Mars

## 准备

- 必要的
  - Mars
  - 大于 16GB 的 microSD 卡
  - Type-C 线
- 可选的
  - USB to TTL 串口模块
  - HDMI 线

## 下载镜像和工具

- 下载 [官方镜像](https://milkv.io/zh/docs/mars/getting-started/images#%E5%AE%98%E6%96%B9%E9%95%9C%E5%83%8F)。
- 下载镜像烧录工具 [balenaEtcher](https://etcher.balena.io/) 或 [Rufus](https://rufus.ie/en/)。

## 烧录镜像

以下是使用 BalenaEtcher 的步骤。

- 点击 **Flash from file**

![etcher-step1](/docs/duo/etcher-step1.png)

- 点击 **Select target**

![etcher-step2](/docs/duo/etcher-step2.png)

- 点击 **Flash!**

![etcher-step3](/docs/duo/etcher-step3.png)

## 开机

将烧录好固件的 microSD 卡插入 Mars 的 microSD 卡槽中。使用适配器 (5V) 通过 Type-C 线连接 Mars，Mars 会自动上电开机，板上的红色电源灯会亮起。待系统启动成功后，板上的绿色状态灯会闪烁。

如果有连接 HDMI 显示器，开机后会显示 Debian 桌面。

## 故障排除

如果您有问题，请到我们的[社区](https://community.milkv.io/)发帖，让我们知道。
