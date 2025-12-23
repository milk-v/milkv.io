---
sidebar_label: '硬件接口说明'
sidebar_position: 5
---

# 硬件接口说明

<Image src='/docs/titan/titan-interface.webp' maxWidth='100%' align='left' />

## 电源接口

Titan 主板支持以下两种供电方式：

- PC 标准 ATX 24 针电源
- DC 接口，规格为 5.5*2.5mm

如果 ATX 和 DC 同时存在，会优先使用 ATX 供电。

Titan 主板功耗取决于所连接的外设功率和数量，需根据具体情况选择合适的供电方式。以下是在满足系统可正常运行状态下，空载和 CPU 压力测试时的功耗，仅供参考。如果您还连接了其他外设，比如外接显卡，还需要考虑显卡本身的功耗。

- DDR4 64GB(32GB*2) + M.2 NVMe 固态硬盘(128G)，空载功耗约14W(12V/1.2A)
- DDR4 64GB(32GB*2) + M.2 NVMe 固态硬盘(128G)，满载功耗约30W(12V/2.5A)

## 内存插槽

Titan 板载两个 DDR4 插槽，当前固件仅支持 DDR4 UDIMM，您必须为两个内存插槽都安装内存条，并且确保所使用的两条内存规格完全相同。当前验证过的 DDR4 列表请参考如下链接：

内存支持列表: [https://milkv.io/zh/docs/titan/getting-started/memory](https://milkv.io/zh/docs/titan/getting-started/memory)

## PCIe M Key

PCIe M Key 接口是一种用于连接高性能扩展设备的接口标准。它是 PCI Express（PCIe）总线的一种物理接口形式之一。

Titan 板载的 PCIe M Key 接口支持 PCIe Gen4 x4，主要用于安装 NVMe 协议的 M.2 SSD 做为系统启动介质。尺寸支持 2230/2242/2260/2280。

## PCIe x16 插槽

板载全尺寸 PCIe x16 插槽，支持 PCIe Gen4 x16，可支持高性能显卡扩展。

## 千兆以太网口

板载千兆 RJ45 以太网口，支持 10/100/1000 Mbps 自适应速率。

## 风扇接口

板载标准的 ATX 4-Pin 风扇接口，支持 PWM 调速。

<Image src='/docs/titan/titan-fan.webp' maxWidth='100%' align='left' />

| 引脚 | 名称 | 描述 |
|:---:|:-----|:-----|
| 1   | PWM         | 脉冲宽度调制控制信号 |
| 2   | TACH        | 风扇转速反馈信号 |
| 3   | VCC-12V     | 电源 12V |
| 4   | GND         | 接地 |

## 电源指示灯

在使用 ATX 电源供电时，1 处的红色 LED 灯会常亮。2、3、4 三个蓝色 LED 灯当前未做功能区分，主板正常工作时会全部常亮。

<Image src='/docs/titan/titan-led.webp' maxWidth='100%' align='left' />

您也可以使用 F_PANEL 接口来扩展电源指示灯，该接口是标准 PC 机箱前面板扩展接口。

## 板载按键

1. 主板电源键，长按3秒可以强制断电。您也可以使用 F_PANEL 接口来扩展电源键，二者功能一致。
2. BMC 复位键，可手动复位 BMC 模块。
3. 主板复位键，可手动复位主板电源。您也可以使用 F_PANEL 接口来扩展复位键，二者功能一致。
4. BMC 烧录键，烧录 BMC 固件时需要按住该键上电，使 BMC 进入烧录模式。

<Image src='/docs/titan/titan-key.webp' maxWidth='100%' align='left' />

## Type-C 接口

Titan 主板有两个 Type-C 接口：

1. 靠近 DC 电源接口位置的 Type-C 为 UR-DP1000 的调试口，板载 USB 转 UART 模块与 UR-DP1000 连接，具体用法请参考：

   USB Type-C 调试口使用说明: [https://milkv.io/zh/docs/titan/getting-started/setup](https://milkv.io/zh/docs/titan/getting-started/setup)

2. 另外一个 Type-C 口为 BMC 模块的烧录口，使用方法请参考 BMC 使用说明：

   BMC 使用说明：[https://milkv.io/zh/docs/titan/getting-started/bmc](https://milkv.io/zh/docs/titan/getting-started/bmc)

<Image src='/docs/titan/titan-typec.webp' maxWidth='100%' align='left' />

## F_PANEL 接口

`F_PANEL` 是 `Front Panel` 的缩写，是一组用来连接标准 PC 机箱前面板的跳线，包含`开关机键`、`重启键`、`电源指示灯`、`硬盘状态灯`四组信号。

<Image src='/docs/titan/titan-f-panel.webp' maxWidth='100%' align='left' />

<Image src='/docs/common/pc-f-panel.webp' maxWidth='100%' align='left' />

## F_USB2.0

Titan 主板上的 F_USB2.0 接口兼容标准 PC 主板 USB2.0 接口，您可以通过该接口将两个 USB2.0 接口扩展到 PC 机箱前面板上，接口引脚定义如下：

<Image src='/docs/titan/titan-f-usb2.webp' maxWidth='100%' align='left' />

<div className='gpio_style'>

| 描述 | 引脚 | 引脚 | 描述 |
|:------------|:---:|:---:|:------------|
| 5V          | 1   | 2   | 5V          |
| USB1-       | 3   | 4   | USB2-       |
| USB1+       | 5   | 6   | USB2+       |
| GND         | 7   | 8   | GND         |
|             |     | 10  | GND         |

</div>

## BMC 网口和 USB2.0

BMC 模块自带一个 RJ45 网口和 USB2.0 接口，具体使用方法请参考：

BMC 使用说明：[https://milkv.io/zh/docs/titan/getting-started/bmc](https://milkv.io/zh/docs/titan/getting-started/bmc)

<Image src='/docs/titan/titan-bmc-rj45-usb.webp' maxWidth='100%' align='left' />
