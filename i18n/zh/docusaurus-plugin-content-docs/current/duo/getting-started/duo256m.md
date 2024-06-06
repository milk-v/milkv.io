---
sidebar_label: 'Duo256M(SG2002)'
sidebar_position: 1
---

# Duo256M

 <Image src='/docs/duo/duo256m-overview-v1.0.webp' maxWidth='70%' align='center' />

Milk-V Duo 256M 是 Duo 的升级版本，内存提升至 256M，满足需要更大内存容量的应用。采用 SG2002 计算系列芯片，计算能力提升至 1.0TOPS@INT8。它可以实现 RISC-V/ARM 架构之间的无缝切换，并支持双系统同时运行。此外，它还包含 SPI、UART 等一系列丰富的 GPIO 接口，适合边缘智能监控领域的各种硬件开发，包括 IP 摄像头、智能猫眼锁、可视门铃等。

## SG2002 简介

SG2002 是面向边缘智能监控 IP 摄像机、智能猫眼门锁、可视门铃、居家智能等多项产品领域而推出的高性能、低功耗芯片，集成了 H.264 视频压缩编解码器, H.265 视频压缩编码器和 ISP；支持 HDR 宽动态、3D 降噪、除雾、镜头畸变校正等多种图像增强和矫正算法，为客户提供专业级的视频图像质量

芯片更集成了自研 TPU，在 8 位整数运算下，可提供 1.0TOPS 的算力。特殊设计的 TPU 调度引擎能有效地为所有的张量处理器核心提供极高的带宽数据流。此外也为用户提供了强大的深度学习模型编译器和软件 SDK 开发包。主流的深度学习框架，比如 Caffe 和 Tensorflow，可以轻松地移植到其平台上。除此之外，还提供了安全启动，安全更新，安全加密等，为用户从开发、量产、产品应用，提供一系列安全解决方案。

## SG2002 数据手册

我们已将 SG2002 的数据表和 TRM 开源到 GitHub。 请[查看](https://github.com/milkv-duo/duo-files/tree/main/duo-256M/datasheet)。

## 购买 SG2002 芯片

Milk-V 是 SG2002 芯片的全球授权经销商。您可以直接从我们的经销商[在线商店](https://arace.tech/products/sophon-cv1800b-5pcs)购买 SG2002 芯片的样品。如需批量订购，请联系[Milk-V 销售团队](mailto:sales@milkv.io) 获取报价。

## Duo256M GPIO 引脚分配

<Image src='/docs/duo/duo256m/duo256m-pinout-01.webp' maxWidth='50%' align='center' />

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

| JTAG     | SPI      | SPI-NOR   | SD      | PWM   | I2C      | UART       | NUM | SG2002       | NAME | PIN                             | PIN                              | NAME        | SG2002      | NUM | ADC        | SPI-NOR  | SPI-NAND  | EMMC      |
|:---------|:---------|:----------|:--------|:------|:---------|:-----------|:---:|:-------------|-----:|:-------------------------------:|:--------------------------------:|:------------|:------------|:---:|:-----------|:---------|:----------|:----------|
| JTAG_TDI |          |           |         |       |          | UART1/2_TX | 508 | XGPIOA[28]   | GP0  | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS(5V)    |             |     |            |          |           |           |
| JTAG_TDO |          |           |         |       |          | UART1/2_RX | 509 | XGPIOA[29]   | GP1  | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS(5V)    |             |     |            |          |           |           |
|          |          |           |         |       |          |            |     |              | GND  | <div className='black'>3</div>  | <div className='black'>38</div>  | GND         |             |     |            |          |           |           |
| JTAG_TMS |          |           |         | PWM7  |          | UART1_TX   | 499 | XGPIOA[19]   | GP2  | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN      |             |     |            |          |           |           |
| JTAG_TCK |          |           |         | PWM6  |          | UART1_RX   | 498 | XGPIOA[18]   | GP3  | <div className='green'>5</div>  | <div className='red'>36</div>    | 3V3(OUT)    |             |     |            |          |           |           |
|          |          | NOR1_HOLD | SD1_D2  | PWM5  | I2C1_SCL | UART2/3_TX | 371 | PWR_GPIO[19] | GP4  | <div className='green'>6</div>  | <div className='gray'>35</div>   | Boot-Switch |             |     |            |          |           |           |
|          |          | NOR1_WP   | SD1_D1  | PWM6  | I2C1_SDA | UART2/3_RX | 372 | PWR_GPIO[20] | GP5  | <div className='green'>7</div>  | <div className='gray'>34</div>   | Audio-Out   |             |     |            |          |           |           |
|          |          |           |         |       |          |            |     |              | GND  | <div className='black'>8</div>  | <div className='black'>33</div>  | GND         |             |     |            |          |           |           |
|          | SPI2_SCK | NOR1_SCK  | SD1_CLK | PWM9  | I2C3_SDA |            | 375 | PWR_GPIO[23] | GP6  | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27        | XGPIOB[6]   | 454 |            |          |           |           |
|          | SPI2_SDO | NOR1_MOSI | SD1_CMD | PWM8  | I2C3_SCL |            | 374 | PWR_GPIO[22] | GP7  | <div className='green'>10</div> | <div className='green'>31</div>  | GP26        | XGPIOB[3]   | 451 | ADC1(1.8V) |          |           |           |
|          | SPI2_SDI | NOR1_MISO | SD1_D0  | PMW7  | I2C1_SDA | UART3_RTS  | 373 | PWR_GPIO[21] | GP8  | <div className='green'>11</div> | <div className='orange'>30</div> | RUN         |             |     |            |          |           |           |
|          | SPI2_CS  | NOR1_CS   | SD1_D3  | PWM4  | I2C1_SCL | UART3_CTS  | 370 | PWR_GPIO[18] | GP9  | <div className='green'>12</div> | <div className='green'>29</div>  | GP22        | PWR_GPIO[4] | 356 |            |          |           |           |
|          |          |           |         |       |          |            |     |              | GND  | <div className='black'>13</div> | <div className='black'>28</div>  | GND         |             |     |            |          |           |           |
|          |          |           |         | PWM10 | I2C2_SDA |            | 430 | XGPIOC[14]   | GP10 | <div className='green'>14</div> | <div className='green'>27</div>  | GP21        | XGPIOA[26]  | 506 |            | NOR_HOLD | NAND_HOLD | EMMC_DAT2 |
|          |          |           |         | PWM11 | I2C2_SCL |            | 431 | XGPIOC[15]   | GP11 | <div className='green'>15</div> | <div className='green'>26</div>  | GP20        | XGPIOA[27]  | 507 |            | NOR_WP   | NAND_WP   | EMMC_DAT3 |
|          |          |           |         | PWM4  |          | UART0/1_TX | 496 | XGPIOA[16]   | GP12 | <div className='green'>16</div> | <div className='green'>25</div>  | GP19        | XGPIOA[25]  | 505 |            | NOR_MOSI | NAND_MOSI | EMMC_DAT0 |
|          |          |           |         | PWM5  |          | UART0/1_RX | 497 | XGPIOA[17]   | GP13 | <div className='green'>17</div> | <div className='green'>24</div>  | GP18        | XGPIOA[22]  | 502 |            | NOR_SCK  | NAND_SCK  | EMMC_CLK  |
|          |          |           |         |       |          |            |     |              | GND  | <div className='black'>18</div> | <div className='black'>23</div>  | GND         |             |     |            |          |           |           |
|          |          |           |         |       |          |            | 494 | XGPIOA[14]   | GP14 | <div className='green'>19</div> | <div className='green'>22</div>  | GP17        | XGPIOA[24]  | 504 |            | NOR_CS   | NAND_CS   | EMMC_DAT1 |
|          |          |           |         |       |          |            | 495 | XGPIOA[15]   | GP15 | <div className='green'>20</div> | <div className='green'>21</div>  | GP16        | XGPIOA[23]  | 503 |            | NOR_MISO | NAND_MISO | EMMC_CMD  |
|          |          |           |         |       |          |            |     |              |      | &nbsp;                          |                                  |             |             |     |            |          |           |           |
|          |          |           |         |       |          |            | 354 | PWR_GPIO[2]  |      | <div className='blue'>LED</div> |                                  |             |             |     |            |          |           |           |

</div>

GP26 和 GP27 引脚逻辑电平为 1.8V, 其他 GPIO 逻辑电平均为 3.3V 逻辑电平。

### 摄像头接口

Duo256M 摄像头接口使用的是 16 PIN 间距为 0.5mm 的连接器，可以直接使用 [CAM-GC2083](https://milkv.io/zh/docs/duo/camera/gc2083) 摄像头。

#### 摄像头接口 FPC 线序

<Image src='/docs/duo/duo/duo-camera-csi-port.webp' maxWidth='70%' align='left' />

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
| 13 | I2C2_SCL     (1.8V) |
| 14 | I2C2_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>

## Duo256M 使用指引

### RISC-V 与 ARM 切换

Duo256M 的大核可以选择使用 RISC-V 或者 ARM，默认使用的是 RISC-V 核，可以通过短接物理引脚 35（Boot-Switch）和 GND 来切换到 ARM 核。如果您在使用中发现 Duo256M 不能正常启动，请先检查当前使用的核与使用的固件是否一致。

<Image src='/docs/duo/duo256m/duo256m-arm-riscv-switch.webp' maxWidth='50%' align='center' />

如果连接了调试串口，可以在第一行开机日志中看到，以 `C` 开头时代表从 RISC-V 核启动，以 `B` 开头时代表从 ARM 核启动。

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```
