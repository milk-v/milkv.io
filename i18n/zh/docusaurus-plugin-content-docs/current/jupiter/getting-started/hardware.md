---
sidebar_label: '硬件接口说明'
sidebar_position: 5
---

# 硬件接口说明

<Image src='/docs/jupiter/jupiter-interface.webp' maxWidth='100%' align='left' />

## 电源接口

Jupiter 主板支持以下供电方式：

- DC 接口，规格为 5.5*2.5mm，12V/3A 以上
- Type-C PD 电源适配器
- PC 标准 ATX 24 针电源
- 网口 PoE 供电（需要额外的 PoE 模块）

:::tip
Jupiter 主板功耗取决于所连接的外设功率和数量，需根据具体情况选择合适的供电方式。
:::

## Type-C 接口

- Type-C 接口可以做为烧录口，通过 PC 为板上的 `SPI FLASH`，`eMMC 模块`，`SSD 固件硬盘`安装系统相关的镜像。
- 如果您在 Jupiter 中运行的是 Bianbu Desktop 的系统，Type-C 接口默认是 Adb Device，可以在 PC 中通过 Adb 连接 Jupiter。
- 该 Type-C 接口支持 PD 供电，也就是您可以通过 PD 电源适配器为 Jupiter 供电。

## eMMC 跳线

主板上的 eMMC 跳线，我们使用时不需要短接，是可以正常烧录系统镜像到 eMMC 中并运行的，此时会使用 `SPI Flash` 中的引导程序来加载 eMMC 中的系统。

如果 eMMC 跳线短接，会禁用板上的 `SPI Flash`，这种场景下，需要在烧录系统镜像时也保持 eMMC 跳线短接，将引导程序也烧录到 eMMC 中。

## F_PANEL 接口

`F_PANEL` 是 `Front Panel` 的缩写，是一组用来连接标准 PC 机箱前面板的跳线，包含`开关机键`、`重启键`、`电源指示灯`、`硬盘状态灯`四组信号。

:::tip
Jupiter 主板按上述`电源接口`中的方式供电后会自动开机，不需要使用 `F_PANEL` 中的`开关机键`，该`开关机键`的功能是关机或关机后再次开机。
:::

<Image src='/docs/jupiter/jupiter-interface-f-panel-1.webp' maxWidth='100%' align='left' />

<Image src='/docs/jupiter/jupiter-interface-f-panel-2.webp' maxWidth='100%' align='left' />

## F_AUDIO、F_USB2、FUSB3 接口

以下是一个常见的标准 PC 机箱前面板 USB 和音频扩展接口板，包含了 Audio、USB2.0 和 USB3.0 的接口。您可以通过 Jupiter 主板上对应用的接口，将 USB 和音频接口扩展到 PC 机箱前面板上。

:::tip
Jupiter 主板已经板载了 Audio、USB2.0、USB3.0 接口，在没有 PC 机箱的情况下也能够正常使用相应的功能。
:::

<Image src='/docs/jupiter/jupiter-interface-f-usb-audio.webp' maxWidth='100%' align='left' />

### F_AUDIO

Jupiter 主板上的 F_AUDIO 音频接口兼容 AC'97 前置音频接口，各引脚定义如下：

<Image src='/docs/jupiter/jupiter-interface-f-audio.webp' maxWidth='100%' align='left' />

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

Jupiter 主板上的 F_USB2 接口兼容标准 PC 主板 USB2.0 接口，引脚定义如下：

<Image src='/docs/jupiter/jupiter-interface-f-usb2.webp' maxWidth='100%' align='left' />

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

Jupiter 主板上的 F_USB3 接口兼容标准 PC 主板 USB3.0 接口，引脚定义如下：

<Image src='/docs/jupiter/jupiter-interface-f-usb3.webp' maxWidth='100%' align='left' />

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

## SATA 供电接口

<Image src='/docs/jupiter/jupiter-interface-sata-power.webp' maxWidth='100%' align='left' />

| PIN | Description |
|:---:|:------------|
| 1   | 5V          |
| 2   | GND         |
| 3   | GND         |
| 4   | 12V         |

连接器规格：

<Image src='/docs/jupiter/jupiter-interface-sata-power-spec.webp' maxWidth='100%' align='left' />
