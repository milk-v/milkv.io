---
sidebar_label: 'Bootloader 升级'
sidebar_position: 40
---

# Mars CM Bootloader 引导程序升级

Mars CM 无论是通过 SD 卡启动系统，还是通过 eMMC 模组启动系统，都要通过 Bootloader 引导程序来启动，这个引导程序存储在板上的一个 SPI Flash 中，包含 `SPL` 和 `U-Boot` 两个部分

:::tip
Mars CM 中的这个 Bootloader 您可以理解为我们电脑中的 BIOS
:::

Mars CM 出厂时已经预置了一个初始的 Bootloader 程序，正常使用中无须升级该程序。只有出现如下情况时，需要升级 Bootloader

1. SPI Flash 中的 Bootloader 程序意外损坏，导致无法正常启动系统时
2. 官方系统镜像升级(比如 Debian)，必须配合新的 Bootloader，否则无法启动时
3. U-Boot 修复了一些 Bug，或者增加了新功能，您需要使用这些新功能时

更新 Mars CM 上 SPI Flash 中 Bootloader 的方法有几种，比如 Windows 烧录工具、TFTP、flashcp 命令等，这里先介绍在 Windows 系统中使用 UsbFlashTool 烧录工具的方法

Mars CM 可以搭配不同的底板使用，这里以搭配树莓派 CM4 IO Board 底板为例进行说明。

## 使用 UsbFlashTool Windows 工具升级 Bootloader

### 下载 UsbFlashTool 烧录工具和 Bootloader 固件

[烧录工具 UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

[Bootloader 固件](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    u-boot-spl.bin.normal.out
U-BOOT: visionfive2_fw_payload.img
```

### 安装驱动

:::tip
仅首次使用时需要安装驱动程序
:::

请参考 `启动 Mars CM` 的 [安装驱动](https://milkv.io/zh/docs/mars/compute-module/boot#%E5%AE%89%E8%A3%85%E9%A9%B1%E5%8A%A8) 章节安装驱动后，返回这里继续操作。

### 升级 Bootloader

烧录 Bootloader 的前 6 步与前面安装驱动的前 6 步是一致的

1. USB 转 TTL 串口线连接到底板的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/mars-usb-flash-tool_02.png)

   **注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口**
  
2. 将 CM4 IO Board 的 J12 排针的 1,2 脚用跳线帽短接 (USB 烧录模式)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. 用 Mirco USB 接口的数据线连接 PC 和底板 J11 USB Slave 接口

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. 打开刷机工具目录中的 `UsbFlashTool-*-Windows.exe` 烧录程序

   ![mars-cm](/docs/mars/mars-usb-flash-tool_05.png)

5. 右侧串口设置中的串口号，设置为第 1 步中记录的串口号

   ![mars-cm](/docs/mars/mars-usb-flash-tool_06.png)

6. 绐底板的 12V DC 接口上电
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

9. 烧录完成后，将 UsbFlashTool 窗口关闭，底板断电，取下步骤 2 中的跳线帽


重新上电后，可根据串口日志中的时间信息判断 Bootloader 是否已经更新

```
U-Boot SPL 2021.10 (Aug 31 2023 - 12:55:45 +0800)
```

```
U-Boot 2021.10 (Aug 31 2023 - 12:55:45 +0800), Build: jenkins-github_visionfive2-17
```
