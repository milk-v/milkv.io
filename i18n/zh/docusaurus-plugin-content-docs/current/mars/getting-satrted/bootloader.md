---
sidebar_label: 'Bootloader 升级'
sidebar_position: 30
---

# Mars Bootloader 引导程序升级

Mars 无论是通过 SD 卡启动系统，还是通过 eMMC 模组启动系统，都要通过 Bootloader 引导程序来启动，这个引导程序存储在板上的一个 SPI Flash 中，包含 SPL 和 U-boot 两个部分

:::tip
Mars 中的这个 Bootloader 您可以理解为我们电脑中的 BIOS
:::

Mars 出厂时已经预置了一个初始的 Bootloader 程序，正常使用中无须升级该程序。只有出现如下情况时，需要升级 Bootloader

1. SPI Flash 中的 Bootloader 程序意外损坏，导致无法正常启动系统时
2. 官方系统镜像升级(比如 Debian)，必须配合新的 Bootloader，否则无法启动时
3. U-Boot 修复了一些 Bug，或者增加了新功能，您需要使用这些新功能时

更新 Mars 上 SPI Flash 中 Bootloader 的方法有几种，比如 Windows 烧录工具、TFTP、flashcp 命令等，这里先介绍在 Windows 系统中使用 UsbFlashTool 烧录工具的方法

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

将下载的 `Mars-UsbFlashTool-*-Windows.zip` 解压到 Windows 系统中

1. USB 转 TTL 串口线连接到 Mars 的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   USB 转串口线的连接方法: [使用串口](https://milkv.io/zh/docs/mars/getting-satrted/setup#%E4%BD%BF%E7%94%A8%E4%B8%B2%E5%8F%A3)

   ![mars](/docs/mars/mars-usb-flash-tool_02.png)

   **注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口**
  
2. 用双公头 USB 数据线连接 PC 和 Mars 的 USB 2.0 接口

   ![mars](/docs/mars/usba2usba.jpg)

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

   ![mars](/docs/mars/usba2usba.jpg)

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


重新上电后，可根据串口日志中的时间信息判断 Bootloader 是否已经更新

```
U-Boot SPL 2021.10 (Aug 31 2023 - 12:55:45 +0800)
```

```
U-Boot 2021.10 (Aug 31 2023 - 12:55:45 +0800), Build: jenkins-github_visionfive2-17
```