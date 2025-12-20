---
sidebar_label: '硬件接口说明'
sidebar_position: 5
---

# 硬件接口说明

<Image src='/docs/megrez/megrez-interface.webp' maxWidth='100%' align='left' />

## 电源接口

Megrez 主板支持以下供电方式：

- DC 接口，规格为 5.5*2.5mm，12V/3A 以上
- PC 标准 ATX 24 针电源
- 网口 PoE 供电（需要额外的 PoE 模块）

:::tip
Megrez 主板功耗取决于所连接的外设功率和数量，需根据具体情况选择合适的供电方式。
:::

## Type-C 接口

- Type-C 接口可以做为烧录或调试口，通过 PC 为板上的 `SPI FLASH`，`eMMC 模块`，`SATA SSD 固态硬盘`安装系统相关的镜像。

## F_PANEL 接口

`F_PANEL` 是 `Front Panel` 的缩写，是一组用来连接标准 PC 机箱前面板的跳线，包含`开关机键`、`重启键`、`电源指示灯`、`硬盘状态灯`四组信号。

:::tip
Megrez 主板按上述`电源接口`中的方式供电后会自动开机，不需要使用 `F_PANEL` 中的`开关机键`，该`开关机键`的功能是关机或关机后再次开机。
:::

<Image src='/docs/jupiter/jupiter-interface-f-panel-1.webp' maxWidth='100%' align='left' />

<Image src='/docs/common/pc-f-panel.webp' maxWidth='100%' align='left' />

## F_AUDIO、F_USB2、FUSB3 接口

以下是一个常见的标准 PC 机箱前面板 USB 和音频扩展接口板，包含了 Audio、USB2.0 和 USB3.0 的接口。您可以通过 Megrez 主板上对应用的接口，将 USB 和音频接口扩展到 PC 机箱前面板上。

:::tip
Megrez 主板已经板载了 Audio、USB2.0、USB3.0 接口，在没有 PC 机箱的情况下也能够正常使用相应的功能。
:::

<Image src='/docs/jupiter/jupiter-interface-f-usb-audio.webp' maxWidth='100%' align='left' />

### F_AUDIO

Megrez 主板上的 F_AUDIO 音频接口兼容 AC'97 前置音频接口，各引脚定义如下：

<Image src='/docs/megrez/megrez-f_audio.webp' maxWidth='100%' align='left' />

<div className='gpio_style'>

| Description | PIN | PIN | Description |
|:------------|:---:|:---:|:------------|
| MIC_IN      | 1   | 2   | GND         |
| MIC_POWER   | 3   | 4   | GND         |
| AUDIO_OUT_R | 5   | 6   | RET_R(NC)   |
| NC          | 7   |     |             |
| AUDIO_OUT_L | 9   | 10  | RET_L(NC)   |

</div>

### F_USB2

Megrez 主板上的 F_USB2 接口兼容标准 PC 主板 USB2.0 接口，引脚定义如下：

<Image src='/docs/megrez/megrez-f_usb2.webp' maxWidth='100%' align='left' />

<div className='gpio_style'>

| Description | PIN | PIN | Description |
|:------------|:---:|:---:|:------------|
| 5V          | 1   | 2   | 5V          |
| USB1-       | 3   | 4   | USB2-       |
| USB1+       | 5   | 6   | USB2+       |
| GND         | 7   | 8   | GND         |
|             |     | 10  | GND         |

</div>

### F_USB3

Megrez 主板上的 F_USB3 接口兼容标准 PC 主板 USB3.0 接口，引脚定义如下：

<Image src='/docs/megrez/megrez-f_usb3.webp' maxWidth='100%' align='left' />

<div className='gpio_style'>

| Description | PIN | PIN | Description |
|:------------|:---:|:---:|:------------|
| ID          | 1   | 2   | P2-D+       |
| P1-D+       | 3   | 4   | P2-D-       |
| P1-D-       | 5   | 6   | GND         |
| GND         | 7   | 8   | P2-SSTX+    |
| P1-SSTX+    | 9   | 10  | P2-SSTX-    |
| P1-SSTX-    | 11  | 12  | GND         |
| GND         | 13  | 14  | P2-SSRX+    |
| P1-SSRX+    | 15  | 16  | P2-SSRX-    |
| P1-SSRX-    | 17  | 18  | Vbus        |
| Vbus        | 19  |     |             |

</div>

## Recovery/Normal Boot 切换开关

Megrez 主板的默认启动顺序为 SPI Flash(U-boot) -> SD/eMMC/SATA 。  

当 SPI Flash 里的 U-boot 固件意外受损无法启动时，可以使用 `Recovery/Normal Boot 切换开关` 进入恢复模式，此时 Megrez 会从 USB 加载 `临时 U-boot`。

<Image src='/docs/megrez/megrez-recovery-switch.webp' maxWidth='100%' align='left' />

状态定义如下：

| Description                     |   PIN    |  PIN   | Description                |
| :------------------------------ | :------: | :----: | :------------------------- |
| boot from USB U-boot(Temporary) | RECOVERY | NORMAL | boot from SPI Flash U-boot |

## SATA SEL 切换开关

Megrez 主板上有两个SATA硬盘接口。

一个是 `M.2 SATA SSD 接口`，一个是 `SATA3 硬盘接口`。这两个接口共用同一组SATA信号，通过 `SATA SEL 切换开关` 进行切换。

<Image src='/docs/megrez/megrez-sata-sel.webp' maxWidth='100%' align='left' />

## Debug/Download

Megrez 主板上内置了CH340 芯片。默认情况下，使用 Type-C 连接 Debug 至 PC ，此时 PC 将新增一个 `tty.usbserial-1220` 设备。

Megrez 默认的串口参数如下：
```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```
