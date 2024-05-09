---
sidebar_label: '设置'
sidebar_position: 20
---

# 配置工作环境

## 使用串口

### USB 转串口线连接

常见的 USB 转 TTL 线的引脚定义如下：

![usb2ttl](/docs/mars/usb2ttl.png)

### 连接串口

如下所示连接 USB 转 TTL 串口线，不要连接红色的供电线

| Milk-V Mars  | \<---> | USB 转 TTL 线 |
| ------------ | ------ | ------------- |
| GND (pin 6)  | \<---> | 黑线          |
| TX  (pin 8)  | \<---> | 白线          |
| RX  (pin 10) | \<---> | 绿线          |

![mars-serial](/docs/mars/mars-serial.jpg)

Mars 默认的串口参数如下：

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

## 启动模式选择

Mars 硬件版本 V1.2 及之后的版本新增了拨码开关，可以选择从 SPI Flash，SD 卡，eMMC 或 UART 口启动，拨码开关出厂默认配置为从 SPI Flash 启动，如需配置为其他模式，请按下表来配置拨码开关：

| GPIO1 | GPIO0 |         |
|:-----:|:-----:|:--------|
| 0     | 0     | Flash   |
| 0     | 1     | SD-card |
| 1     | 0     | eMMC    |
| 1     | 1     | UART    |

<Image src='/docs/mars/mars-bootmode-switch.webp' maxWidth='70%' align='left' />

:::tip
芯片原厂推荐的启动方式为 SPI Flash，通过 Flash 中的引导程序来继续引导从 SD 卡或者 eMMC 启动，这种方式是最稳定的。建议您将通过拨码开关配置从 SD 卡或者 eMMC 直接启动的方法做为调试手段或者验证功能的方法来使用。
:::

硬件版本 V1.2 之前的 Mars，默认是从 SPI Flash 启动，是可以正常引导 SD 卡或者 eMMC 中的系统的，没有加该拨码开关不影响正常的使用。

在需要通过 UART 口启动更新 Flash 中的引导程序时，可以通过按住板上 LED 旁边的按键上电，来进入 UART 模式，该方法适用于所有 Mars 硬件版本。

<Image src='/docs/mars/mars-upgrade-key.jpg' maxWidth='70%' align='left' />
