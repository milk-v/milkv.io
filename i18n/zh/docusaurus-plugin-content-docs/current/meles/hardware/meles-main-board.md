---
sidebar_label: 'Meles 开发板'
sidebar_position: 50
---

# Meles 开发板

## 接口描述

![meles-hardware-interface](/docs/meles/meles-hardware-interface.jpeg)

| 序号  | 名称                    | 序号  | 名称             | 序号  | 名称              |
| ---- | ----------------------- | ---- | ---------------- | ---- | ----------------- |
| 1    | SPI Nor Flash           | 11   | 用户 LED         | 21   | MIPI CSI          |
| 2    | 40-PIN GPIO 插头        | 12   | USB-C 供电      | 22   | 风扇               |
| 3    | 外部天线插座             | 13   | HDMI             | 23   | eMMC 插槽       |
| 4    | 内部天线                 | 14   | PoE              | 24   | MicroSD Card 卡槽 |
| 5    | Wi-Fi5 / BT5.0          | 15   | 下载按钮  | 25   | JTAG              |
| 6    | MIPI DSI                | 16   | USB 3.0 Host     |      |                   |
| 7    | Soc TH1520              | 17   | eMMC 启动按钮     |      |                   |
| 8    | MIPI CSI                | 18   | RAM              |      |                   |
| 9    | 电源 LED                 | 19   | 千兆网口 |      |                   |
| 10   | Reset 按钮               | 20   | 耳机插孔           |      |                   |


## 硬件版本

Meles有不同的版本。当您拿到电路板时，您可能需要知道硬件版本，它印刷在电路板的顶部，类似于“Meles V1.2”。

## 供电

Meles 使用 USB Type-C 端口供电和通信。

要为 Meles 独立供电，您可以使用带有 USB Type-C 端口的 5V/3A 电源适配器。您可以使用 USB PD/QC 电源适配器，而不用担心损坏电路板，因为 PD/QC 会检测到 Meles 只支持 5V ，因此适配器将输出 5V 。

Meles 可以直接使用 PC/笔记本电脑 USB 端口供电。

当您使用 Meles 提供的 PoE 功能时，您可以通过将 DC +5V 直接连接到 PIN#2 和 PIN#4 来为 Meles 供电。除此之外，还需要连接 GND 引脚，比如 PIN#6 和 PIN#9 。

## 处理器

Meles 中使用的 T-HEAD TH1520 SoC 是一款高性能处理器。

* CPU
    * RISC-V 64GCV C910*4 @2.0GHz
    * 每个核包含 64KB I Cache 和 64KB D Cache
    * 1MB 共享 L2 Cache
    * 支持 TEE 和 REE, 可以在启动状态下配置
    * 支持自定义和RISC-V兼容接口的多核调试框架
    * 独立电源域，支持DVFS
* GPU
    * OpenCL 1.1/1.2/2.0
    * OpenGL ES 3.0/3.1/3.2
    * Vulkan 1.1/1.2
    * Android NN HAL
* NPU
    * 支持 4TOPS@INT8, 最高 1GHz
    * 支持 TensorFlow, ONNX, Caffe
    * 支持 CNN, RNN, DNN
* Decode
    * Real-time decoder, 支持 H.265/H.264/VP9/8/7/6/AVS/AVS+/AVS2.0/VC1/MPEG4
    * 支持 H.264 BP/MP/HP@level 5.1 解码, 最大支持 4K 分辨率
    * 支持 H.265/HEVC Main Profile@level 5.1 解码, 最大支持 4K 分辨率
    * 支持 VP9 Profile-2 解码, 最大支持 4K 分辨率
    * 支持 AVS2.0 解码, 最大支持 4K 分辨率
    * 支持 VP6/7/8/AVS/AVS+/VC1/MPEG4 解码, 最大分辨率 1920x1080
    * 最大解码能力 4K@75fps
* Encode
    * 支持 H.264 BP/MP/HP(level4.2) 编码, 最大支持 4K 分辨率
    * 支持 H.265/HEVC Main Profile 编码, 最大支持 4K 分辨率
    * 仅支持 I-frames and P-frames
    * 最大编码能力 4K@40fps

## 内存

Meles 内存规格为 LPDDR4x 4266MT/s，提供 4GB / 8GB / 16GB 三个内存大小的版本选择。

## 网络

Meles提供千兆以太网端口。从测试结果来看，最大带宽至少为 930 Mbits/sec。

如果您对PoE（以太网供电）感兴趣，您可以在 Meles 上尝试一下。

## Micro SD Card 接口

Micro SD 卡接口引脚定义如下所示。

| PIN# | Name       |
| ---- | ---------- |
| 1    | SDIO0_DAT2 |
| 2    | SDIO0_DAT3 |
| 3    | SDIO0_CMD  |
| 4    | VSD_3V3    |
| 5    | SDIO0_CLK  |
| 6    | GND        |
| 7    | SDIO0_DAT0 |
| 8    | SDIO0_DAT1 |
| 9    | SDIO0_DETN |
| 10   | GND        |

## eMMC 接口

高性能 eMMC 模块是 Meles 系统存储的最佳选择。我们提供 8GB/16GB/32GB/64GB/128GB 的 eMMC 模块供您选择。

eMMC 插座引脚定义如下所示。

|   名称    | PIN  | PIN  |    名称     |
| :-------: | :--: | :--: | :---------: |
|   GND1    |  1   |  34  |    GND11    |
|  EMMC_D5  |  2   |  33  |   EMMC_D6   |
|   GND2    |  3   |  32  |    GND12    |
|  EMMC_D4  |  4   |  31  |   EMMC_D7   |
|   GND3    |  5   |  30  |    GND13    |
|  EMMC_0   |  6   |  29  |   EMMC_D1   |
|   GND4    |  7   |  28  |    GND14    |
| EMMC_CLK  |  8   |  27  |   EMMC_D2   |
|   GND5    |  9   |  26  |    GND15    |
|  EMMC_D3  |  10  |  25  |  EMMC_CMD   |
|   GND6    |  11  |  24  |    GND16    |
| EMMC_RSTN |  12  |  23  | DVDD33_EMMC |
|   GND7    |  13  |  22  | DVDD33_EMMC |
|   GND8    |  14  |  21  | DVDD18_EMMC |
| EMMC_RCLK |  15  |  20  | DVDD18_EMMC |
|   GND9    |  16  |  19  |    GND17    |
|   GND10   |  17  |  18  |    GND18    |

## USB 接口

Meles 有四个 USB-A 连接器。所有都是 USB 3.0 规格。它可以支持任何通用的 USB 电脑键盘和鼠标。它还可以与 USB 存储器、USB 到 MIDI 转换器以及几乎任何其他具有 USB 功能的设备/组件一起使用。

## HDMI 接口

Meles配备了一个HDMI连接器。支持的最大分辨率为 4k@60Hz，任何 HDMI 显示器都可以作为 Meles 的显示器。

HDMI 接口引脚定义如下所示。

| PIN# | Name        |
| ---- | ----------- |
| 1    | HDMI_DATAP2 |
| 2    | GND         |
| 3    | HDMI_DATAN2 |
| 4    | HDMI_DATAP1 |
| 5    | GND         |
| 6    | HDMI_DATAN1 |
| 7    | HDMI_DATAP0 |
| 8    | GND         |
| 9    | HDMI_DATAN0 |
| 10   | HDMI_CLKP   |
| 11   | GND         |
| 12   | HDMI_CLKN   |
| 13   | HDMI_CEC    |
| 14   | NC          |
| 15   | HDMI_SCL    |
| 16   | HDMI_SDA    |
| 17   | GND         |
| 18   | VCC5V0_HDMI |
| 19   | HDMI_HPD    |

## DSI 接口

DSI 接口可用于 MIPI 显示。

## CSI1/CSI2 接口

DSI 接口可用于 MIPI 摄像头。

## 音频接口

Meles 配备了一个标准的3.5毫米音频插孔。当没有 HDMI 电缆时，音频插孔是产生声音所必需的。可以使用插孔通过扬声器或耳机播放音频。这需要您使用桌面音量控制进行配置。

## 风扇

| PIN# | 名称  |
| ---- | ----- |
| 1    | PWM   |
| 2    | +5V   |

## LED

Meles 有电源 LED 和用户 LED。

电源指示灯为绿色。当 Meles 通电时，它总是亮着的。

用户指示灯为蓝色。它可以通过软件进行控制。默认情况下，当内核运行时它会一直闪烁。

## 按键

Meles 提供了三个按钮，重置按钮，下载按钮和 eMMC 启动按钮。

Reset（重置）按钮用作硬件重置按钮。短按该按钮可重新启动系统。

下载按钮用于固件闪存/升级。

eMMC 启动按钮用于设置首先从 eMMC 启动。

## JTAG 调试接口

Meles 配备了用于内部调试的 JTAG 接口。

JTAG 接口引脚定义如下所示。

| PIN# | 名称       |
| ---- | ---------- |
| 1    | JTG_TMS    |
| 2    | JTG_TD     |
| 3    | JTG_TDO    |
| 4    | JTG_TCLK   |
| 5    | GND        |
| 6    | AOUART_TXD |
| 7    | GND        |
| 8    | AOUART_RXD |
| 9    | GND        |
| 10   | GND        |

## 40 PIN GPIO

Meles 配备 40pin GPIO 接口，与市面上大多数传感器应用接口兼容。

**_提示：_ 兼容性以实际使用为准。**

- Meles 有一个40针的扩展连接器。每类引脚使用不同颜色标记。

<div className='gpio_style' style={{ overflow :"auto"}}>

|  功能4   |    功能3     | 功能2  | 功能1  |   GPIO   |               Pin#               |              Pin#               |   GPIO    |                功能1                |  功能2  |  功能3  |   功能4   |
| :----------: | :--------------: | :--------: | :--------: | :------: | :------------------------------: | :-----------------------------: | :-------: | :-------------------------------------: | :---------: | :---------: | :-----------: |
|              |                  |            |   +3.3V    |          | <div className='yellow'>1</div>  |  <div className='red'>2</div>   |           |                  +5.0V                  |             |             |               |
|              |                  |            |  I2C1_SDA  | GPIO0_9  |  <div className='green'>3</div>  |  <div className='red'>4</div>   |           |                  +5.0V                  |             |             |               |
|              |                  |            |  I2C1_SCL  | GPIO0_8  |  <div className='green'>5</div>  | <div className='black'>6</div>  |           |                   GND                   |             |             |               |
|              |                  |            | UART3_TXD  | GPIO0_16 |  <div className='green'>7</div>  | <div className='green'>8</div>  |  GPIO2_0  | <div className='orange'>UART0_TXD</div> |             |             |               |
|              |                  |            |    GND     |          |  <div className='black'>9</div>  | <div className='green'>10</div> |  GPIO2_1  | <div className='orange'>UART0_RXD</div> |             |             |               |
|              |                  |            | UART3_RXD  | GPIO0_17 | <div className='green'>11</div>  | <div className='green'>12</div> | AOGPIO_8  |                I2S2_SCLK                | AUDIO_PA19  | AOUART_TXD  | AOUART_IR_OUT |
|              |                  |            | GMAC1_RXDV | GPIO2_25 | <div className='green'>13</div>  | <div className='black'>14</div> |           |                   GND                   |             |             |               |
|              |                  |            | GMAC1_TXD3 | GPIO2_24 | <div className='green'>15</div>  | <div className='green'>16</div> | GPIO2_22  |               GMAC1_TXD1                |             |             |               |
|              |                  |            |   +3.3V    |          | <div className='yellow'>17</div> | <div className='green'>18</div> | GPIO2_31  |               GMAC1_RXD1                |             |             |               |
|              |                  |            |  SPI_MOSI  | GPIO2_16 | <div className='green'>19</div>  | <div className='black'>20</div> |           |                   GND                   |             |             |               |
|              |                  |            |  SPI_MISO  | GPIO2_17 | <div className='green'>21</div>  | <div className='green'>22</div> |  GPIO3_2  |                  PWM0                   |             |             |               |
| UART2_IR_OUT |    UART2_TXD     |  SPI_SCLK  |  SPI_SCLK  | GPIO2_14 | <div className='green'>23</div>  | <div className='green'>24</div> | GPIO2_15  |                SPI_SSN0                 |  UART2_RXD  | UART2_IR_IN |               |
|              |                  |            |    GND     |          | <div className='black'>25</div>  | <div className='green'>26</div> |           |                   ADC                   |             |             |               |
|              |                  |            |  I2C3_SDA  | GPIO2_12 |  <div className='blue'>27</div>  | <div className='blue'>28</div>  | GPIO2_11  |                I2C3_SCL                 |             |             |               |
|              |                  |            | GMAC1_TXD2 | GPIO2_23 | <div className='green'>29</div>  | <div className='black'>30</div> |           |                   GND                   |             |             |               |
|              |                  |            | GMAC1_RXD2 | GPIO3_1  | <div className='green'>31</div>  | <div className='green'>32</div> | GPIO0_10  |                UART1_TXD                |             |             |               |
|              |                  |            | UART1_RXD  | GPIO0_11 | <div className='green'>33</div>  | <div className='black'>34</div> |           |                   GND                   |             |             |               |
|              | PLL_DSKEW_BYPASS | AUDIO_PA18 | I2S2_LRCK  | AOGPIO_7 | <div className='green'>35</div>  | <div className='green'>36</div> |  GPIO3_3  |                  PWM1                   |             |             |               |
|              |                  |            | GMAC1_RXD2 | GPIO3_0  | <div className='green'>37</div>  | <div className='green'>38</div> | AOGPIO_10 |               AUDIO_PA21                | BISR_BYPASS |             |               |
|              |                  |            |    GND     |          | <div className='black'>39</div>  | <div className='green'>40</div> | AOGPIO_11 |               AUDIO_PA22                |             |             |               |

</div>
