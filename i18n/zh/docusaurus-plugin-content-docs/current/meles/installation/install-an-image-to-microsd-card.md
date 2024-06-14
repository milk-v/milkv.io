---
sidebar_label: '安装镜像到 MicroSD 卡'
sidebar_position: 50
---

# 安装镜像到 MicroSD 卡

Meles 上使用的 SoC TH1520 支持从 SPI Nor Flash 和 eMMC 启动。

Meles 上有一个 MicroSD 卡插槽。因此，Meles 可以支持以 SPI Nor Flash + MicroSD 卡方式引导启动。

## 必要准备

- Meles 和电源适配器
- 带有 Bootloader 的 SPI Nor Flash，并焊接在开发板上s
- 大于16GB，等级 class10 或更高的 MicroSD 卡
- 运行 Windows、Linux 或 MacOS 的PC/笔记本电脑

## 安装烧录工具

从 Balena 官网获取烧录工具 BalenaEtcher， https://etcher.balena.io/.

从 GitHub 获取解压工具 7-Zip，https://github.com/mcmilk/7-Zip-zstd/releases/download/v22.01-v1.5.5-R3/7z22.01-zstd-x64.exe

## 获取 Meles 的系统镜像

从以下链接下载 Meles 的系统镜像， https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240601/sdcard-meles-20240601_180943.img.zst

您可以使用 7-Zip 解压工具解压下载到的 .zst 压缩文件到任意目录，也可以使用其他软件。

## 写入镜像到 MicroSD 卡

- 将 MicroSD 卡插入 MicroSD 读卡器，并将其插入电脑。
- 运行 BalenaEtcher。
- 在 BalenaEtcher 窗口中, 点击 "从文件烧录" 来选择镜像文件。

![sdcard-etcher-flash-from-file](/docs/meles/sdcard-etcher-flash-from-file.png)

- 随后点击 "选择目标磁盘" 来选择 MicroSD 卡对应的设备。

![sdcard-etcher-select-target](/docs/meles/sdcard-etcher-select-target.png)

- 最后点击 "现在烧录!" 以写入镜像。

![sdcard-etcher-flash](/docs/meles/sdcard-etcher-flash.png)

- 烧录成功后显示 "烧录完成!"。

![sdcard-etcher-flash-complete](/docs/meles/sdcard-etcher-flash-complete.png)

现在我们已经成功地将镜像安装到 MicroSD 卡中。
