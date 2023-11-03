---
sidebar_label: '启动 Mars CM'
sidebar_position: 10
---
# 启动 Mars CM

:::tip
Mars CM 从存储介质上区分有两种版本，一种是带 eMMC 存储的 `Mars CM`，另外一种是不带 eMMC 存储的 `Mars CM Lite`，Lite 版本只能通过底板上的 SD/TF 卡启动，如果您所使用的底板上没有设计 SD/TF 卡接口，则不能使用 Lite 版本。另外，eMMC 版本硬件接口与 SD/TF 卡是共用的，不能同时使用，也就是说在使用 eMMC 版本的 Mars CM 时，底板上的 SD/TF 卡座不能插存储卡
:::

Mars CM 采用核心板的设计方式，引脚与树莓派 CM4 兼容，可以搭配不同的底板使用。我们目前释放的固件是适配的树莓派 CM4 IO Board。

以树莓派 CM4 IO Board 为例，分别介绍 eMMC 版本和 Lite 版本如何烧录固件。

## Mars CM eMMC 版本固件烧录

### 准备

- 必要的
  - Mars CM eMMC 版本
  - 树莓派 CM4 IO Board 底板或其他兼容树莓派 CM4 的底板
  - USB 转 TTL 串口线
  - USB 数据线
- 可选的
  - HDMI 线

### 下载镜像和烧录工具
- 下载 Debian 系统镜像: [官方镜像](https://milkv.io/zh/docs/mars/compute-module/resources/image)
- 下载 eMMC 镜像烧录工具 [UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

### 安装驱动

:::tip
仅首次使用时需要安装驱动程序
:::

将下载的 `Mars-UsbFlashTool-*-Windows.zip` 解压到 Windows 系统中

1. USB 转 TTL 串口线连接到底板的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_02.png)

   注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口
  
2. 将 CM4 IO Board 的 J12 排针的 1,2 脚用跳线帽短接 (USB 烧录模式)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. 用 Mirco USB 接口的数据线连接 PC 和底板 J11 USB Slave 接口

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. 打开刷机工具目录中的 `UsbFlashTool-*-Windows.exe` 烧录程序

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_05.png)

5. 右侧串口设置中的串口号，设置为第 1 步中记录的串口号

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_06.png)

6. 绐底板的 12V DC 接口上电
7. 在 `File Type` 中选择 `Firmware`, 再点 `File Select` 选择 `update` 目录中 `usbprog-mars-230510.out` 固件，再点 `Load`，等待加载完后提示 `Loaded`

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_07.png)

8. 此时在 Windows 的设备管理器上已经识别到 JH7110 设备，需要安装驱动

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_08.png)

9. 在工具包目录下打开 `zadig-2.5` 程序，选中菜单 `Options` 中的 `List All Devices`，在下拉列表中先择 `StarFive JH7110 Device`，再点击 `Install Driver` 完成驱动的安装

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_09.png)

   驱动安装成功后，检查一下设备管理器中的状态是否已成为正常的 USB 设备

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_10.png)

10. 驱动安装成功后，将 UsbFlashTool 窗口关闭，底板断电，取下步骤 2 中的跳线帽

### 烧录镜像

烧录镜像的前 6 步与上面安装驱动的前 6 步是一致的

1. USB 转 TTL 串口线连接到底板的 40PIN 排针上，USB 端连接 PC 并记录下串口号

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_02.png)

   注意，如果有其他串口程序打开了该串口，请先将程序退出，不要占用该串口

2. 将 CM4 IO Board 的 J12 排针的 1,2 脚用跳线帽短接 (USB 烧录模式)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. 用 Mirco USB 接口的数据线连接 PC 和底板 J11 USB Slave 接口

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. 打开刷机工具目录中的 `UsbFlashTool-*-Windows.exe` 烧录程序

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_05.png)

5. 右侧串口设置中的串口号，设置为第 1 步中记录的串口号

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_06.png)

6. 绐底板的 12V DC 接口上电
7. 在 `File Type` 中选择 `Firmware`, 再点 `File Select` 选择 `update` 目录中 `usbprog-mars-230510.out` 固件，再点 `Load`，等待加载完后提示 `Complete`

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_15.png)

8. 再次点击 `File Select`, 选择要烧录的 Mars CM eMMC 版本的固件，在 `File Type` 中选择 `Allinone`，`Memory Type` 中选择 `EMMC`，再点击 Load 开始烧录镜像

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_16.png)

   注意，这个烧录程序采用分段烧录方式，所以进度条没有实时滚动，请耐心等待一会

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_17.png)

   烧录过程大约需要 10 分钟，最后提示 100% 并且没有报错信息，则烧录完成

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_18.png)

9. 烧录完成后，将 UsbFlashTool 窗口关闭，底板断电，取下步骤 2 中的跳线帽

### 上电开机

将底板用 HDMI 线连接显示器，注意，Mars CM 只有一路HDMI信号，所以 HDMI 线接到底板的 HDMI0 上。

绐底板的 12V DC 接口上电，等待系统启动后，Mars CM 上的绿色 LED 开始闪烁，显示器会显示 Debian 登陆界面。

## Mars CM Lite 版本固件烧录

Lite 版本不带 eMMC，需要将固件烧录到 SD/TF 卡中，烧录方法跟树莓派和 Mars 等其他开发板烧写镜像的方法一样。

### 准备

- 必要的
  - Mars CM Lite
  - 树莓派 CM4 IO Board 底板或其他兼容树莓派 CM4 的底板
  - 容量 8GB 或以上的 TF 卡
  - TF 卡读卡器
- 可选的
  - USB 转 TTL 串口线
  - HDMI 线

### 下载镜像和烧录工具
- 下载 Debian 系统镜像: [官方镜像](https://milkv.io/zh/docs/mars/compute-module/resources/image)
- 下载烧录工具: [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/)

### 镜像烧录

以使用 `balenaEtcher` 工具烧录为例:

- 点击 **Flash from file** 选择系统镜像

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_01.png)

- 点击 **Select target** 选择目标 SD 卡

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_02.png)

- 点击 **Flash!** 开始烧录

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_03.png)

### 上电开机

将 Mars CM 核心板安装到树莓派 CM4 IO Board 底板上，用 HDMI 线连接显示器，注意，Mars CM 只有一路HDMI信号，所以 HDMI 线接到底板的 HDMI0 上。

上述烧录好镜像的 TF 卡插到底板的卡槽上。

绐底板的 12V DC 接口上电，等待系统启动后，Mars CM 上的绿色 LED 开始闪烁，显示器会显示 Debian 登陆界面。


## 故障排除

如果你有问题，请到我们的[社区](https://community.milkv.io/)发帖，让我们知道。
