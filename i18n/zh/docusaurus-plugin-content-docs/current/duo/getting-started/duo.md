---
sidebar_label: 'Duo(CV1800B)'
sidebar_position: 0
---

# Duo

 <Image src='/docs/duo/duo-v1.2.png' maxWidth='60%' align='center' />

Milk-V Duo 是一款基于 CV1800B 芯片的超紧凑型嵌入式开发平台。 它可以运行 Linux 和 RTOS，为专业人士、工业 ODM、AIoT 爱好者、DIY 爱好者和创作者提供可靠、低成本、高性能的平台。

## CV1800B 简介

CV1800B 是一款高性能、低功耗芯片，适用于住宅消费监控 IP 摄像机、家庭智能等众多产品，集成 H.264/H.265 视频压缩编码器和 ISP；支持数字宽动态、3D降噪、去雾、镜头畸变校正等图像增强和校正算法，为客户提供专业级的视频图像质量。

该芯片集成了自主研发的智能参考解决方案（人体检测、区域检测、运动检测），内置 DDR 以及完整的外围设备和外围设备，为支持客户产品开发和量产提供了高度集成且简单的解决方案。

## CV1800B 数据手册

我们已将 CV1800B 的数据表开源到 GitHub。 请[查看](https://github.com/milkv-duo/duo-files/blob/main/duo/datasheet/CV1800B-CV1801B-Preliminary-Datasheet-full-en.pdf)。

## 购买 CV1800B 芯片

Milk-V 是 CV1800B 芯片的全球授权经销商。 您可以直接从我们的经销商[在线商店](https://arace.tech/products/sophon-cv1800b-5pcs)购买 CV1800B 芯片的样品。如需批量订购，请联系[Milk-V 销售团队](mailto:sales@milkv.io) 获取报价。

## Duo GPIO 引脚分配

<Image src='/docs/duo/duo/duo-pinout-01.webp' maxWidth='50%' align='center' />

### GPIO 引脚映射

<div className='gpio_style'>

| GROUP | ADDR          | PORT  | CHIP      | NUM     | NAME     | START             |
|:-----:|:-------------:|:-----:|:---------:|:-------:|:---------|:------------------|
| gpio0 | gpio@03020000 | porta | gpiochip0 | 480-511 | XGPIOA   | 480 - XGPIOA[0]   |
| gpio1 | gpio@03021000 | portb | gpiochip1 | 448-479 | XGPIOB   | 448 - XGPIOB[0]   |
| gpio2 | gpio@03022000 | portc | gpiochip2 | 416-447 | XGPIOC   | 416 - XGPIOC[0]   |
| gpio3 | gpio@03023000 | portd | gpiochip3 | 384-415 |          |                   |
| gpio4 | gpio@05021000 | porte | gpiochip4 | 352-383 | PWR_GPIO | 352 - PWR_GPIO[0] |

</div>

### GPIO 引脚分布

<div className='gpio_style' style={{ overflow :"auto"}} >

| JTAG     | SPI       | SPI NOR        | SD      | PWM   | I2C      | UART       | NUM | CV1800B      | NAME | PIN                             | PIN                              | NAME     | CV1800B     | NUM | ADC        | SPI NOR       | SPI NAND     |
|:---------|:----------|:---------------|:--------|:------|:---------|:-----------|:---:|:-------------|-----:|:-------------------------------:|:--------------------------------:|:---------|:------------|:---:|:-----------|:--------------|:-------------|
| JTAG_TDI |           |                |         |       | I2C0_SCL | UART1/2_TX | 508 | XGPIOA[28]   | GP0  | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS(5V) |             |     |            |               |              |
| JTAG_TDO |           |                |         |       | I2C0_SDA | UART1/2_RX | 509 | XGPIOA[29]   | GP1  | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS(5V) |             |     |            |               |              |
|          |           |                |         |       |          |            |     |              | GND  | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |             |     |            |               |              |
|          |           |                | SD1_GP1 | PWM10 |          | UART4_TX   | 378 | PWR_GPIO[26] | GP2  | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |             |     |            |               |              |
|          |           |                | SD1_GP0 | PWM11 |          | UART4_RX   | 377 | PWR_GPIO[25] | GP3  | <div className='green'>5</div>  | <div className='red'>36</div>  | 3V3(OUT) |             |     |            |               |              |
|          |           | SPINOR1_HOLD_X | SD1_D2  | PWM5  | I2C1_SCL | UART2/3_TX | 371 | PWR_GPIO[19] | GP4  | <div className='green'>6</div>  | <div className='gray'>35</div>   |          |             |     |            |               |              |
|          |           | SPINOR1_WP_X   | SD1_D1  | PWM6  | I2C1_SDA | UART2/3_RX | 372 | PWR_GPIO[20] | GP5  | <div className='green'>7</div>  | <div className='gray'>34</div>   |          |             |     |            |               |              |
|          |           |                |         |       |          |            |     |              | GND  | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |             |     |            |               |              |
|          | SPI2_SCK  | SPINOR1_SCK    | SD1_CLK | PWM9  | I2C3_SDA |            | 375 | PWR_GPIO[23] | GP6  | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     | XGPIOB[6]   | 454 | ADC2(1.8V) |               |              |
|          | SPI2_SDO  | SPINOR1_MOSI   | SD1_CMD | PWM8  | I2C3_SCL |            | 374 | PWR_GPIO[22] | GP7  | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     | XGPIOB[3]   | 451 | ADC1(1.8V) |               |              |
|          | SPI2_SDI  | SPINOR1_MISO   | SD1_D0  | PMW7  | I2C1_SDA | UART3_RTS  | 373 | PWR_GPIO[21] | GP8  | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |             |     |            |               |              |
|          | SPI2_CS_X | SPINOR1_CS_X   | SD1_D3  | PWM4  | I2C1_SCL | UART3_CTS  | 370 | PWR_GPIO[18] | GP9  | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     | PWR_GPIO[4] | 356 |            |               |              |
|          |           |                |         |       |          |            |     |              | GND  | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |             |     |            |               |              |
|          |           |                |         |       | I2C1_SDA |            | 425 | XGPIOC[9]    | GP10 | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     | XGPIOA[26]  | 506 |            | SPINOR_HOLD_X | SPINAND_HOLD |
|          |           |                |         |       | I2C1_SCL |            | 426 | XGPIOC[10]   | GP11 | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     | XGPIOA[27]  | 507 |            | SPINOR_WP_X   | SPINAND_WP   |
| JTAG_TMS |           |                |         | PWM4  |          | UART0/1_TX | 496 | XGPIOA[16]   | GP12 | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     | XGPIOA[25]  | 505 |            | SPINOR_MOSI   | SPINAND_MOSI |
| JTAG_TCK |           |                |         | PWM5  |          | UART0/1_RX | 497 | XGPIOA[17]   | GP13 | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     | XGPIOA[22]  | 502 |            | SPINOR_SCK    | SPINAND_SCK  |
|          |           |                |         |       |          |            |     |              | GND  | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |             |     |            |               |              |
|          |           |                |         |       |          |            | 494 | XGPIOA[14]   | GP14 | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     | XGPIOA[24]  | 504 |            | SPINOR_CS_X   | SPINAND_CS   |
|          |           |                |         |       |          |            | 495 | XGPIOA[15]   | GP15 | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     | XGPIOA[23]  | 503 |            | SPINOR_MISO   | SPINAND_MISO |
|          |           |                |         |       |          |            |     |              |      | &nbsp;                          |                                  |          |             |     |            |               |              |
|          |           |                |         |       |          |            | 440 | XGPIOC[24]   |      | <div className='blue'>LED</div> |                                  |          |             |     |            |               |              |

</div>

### 摄像头接口

Duo 摄像头接口使用的是 16 PIN 间距为 0.5mm 的连接器，可以直接使用 [CAM-GC2083](https://milkv.io/zh/docs/duo/camera/gc2083) 摄像头。

#### 摄像头接口 FPC 线序

<Image src='/docs/duo/duo/duo-camera-csi-port.webp' maxWidth='50%' align='left' />

<div className='gpio_style'>

| J1 | Description         |
|:--:|:--------------------|
| 1  | GND                 |
| 2  | MIPI0_DN0           |
| 3  | MIPI0_DP0           |
| 4  | GND                 |
| 5  | MIPI0_DN1           |
| 6  | MIPI0_DP1           |
| 7  | GND                 |
| 8  | MIPI0_CKN           |
| 9  | MIPI0_CKP           |
| 10 | GND                 |
| 11 | SENSOR_RSTN  (1.8V) |
| 12 | SENSOR_CLK   (1.8V) |
| 13 | I2C1_SCL     (1.8V) |
| 14 | I2C1_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>

## 硬件资料

### V1.2

- 原理图：[duo-schematic-v1.2.pdf](https://github.com/milkv-duo/duo-files/blob/main/duo/hardware/duo-schematic-v1.2.pdf?raw=true)
- 位号图（顶层）：[duo-component-list-top-v1.2.pdf](https://github.com/milkv-duo/duo-files/blob/main/duo/hardware/duo-component-list-top-v1.2.pdf?raw=true)
- 位号图（底层）：[duo-component-list-bottom-v1.2.pdf](https://github.com/milkv-duo/duo-files/blob/main/duo/hardware/duo-component-list-bottom-v1.2.pdf?raw=true)
- 2D dxf: [duo-mechanical-drawings-v1.1.zip](https://github.com/milkv-duo/duo-files/blob/main/duo/hardware/duo-mechanical-drawings-v1.1.zip?raw=true)

### V1.1

- 原理图：[duo-schematic-v1.1.pdf](https://github.com/milkv-duo/duo-files/blob/main/duo/hardware/duo-schematic-v1.1.pdf?raw=true)

### 其他

[https://github.com/milkv-duo/duo-files/tree/main/duo/hardware](https://github.com/milkv-duo/duo-files/tree/main/duo/hardware)
