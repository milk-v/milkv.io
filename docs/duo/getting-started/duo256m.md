---
sidebar_label: 'Duo256M(SG2002)'
sidebar_position: 1
---

# Duo256M

 <Image src='/docs/duo/duo256m-overview-v1.0.webp' maxWidth='70%' align='center' />

The Milk-V Duo 256M is an upgraded version of Duo with a memory boost to 256M, catering to applications demanding larger memory capacities. It features the SG2002 computing series chip, elevating computational power to 1.0TOPS@INT8. It enables seamless switching between RISC-V/ARM architectures and supports simultaneous operation of dual systems. Additionally, it includes an array of rich GPIO interfaces such as SPI, UART, suitable for a wide range of hardware development in edge intelligent monitoring, including IP cameras, smart peephole locks, visual doorbells, and more.

## Introduction of SG2002

SG2002 is a high-performance, low-power chip designed for various product fields such as edge intelligent surveillance IP cameras, smart door locks, visual doorbells, and home intelligence. It integrates H.264 video compression and decoding, H.265 video compression encoding, and ISP capabilities. It supports multiple image enhancement and correction algorithms such as HDR wide dynamic range, 3D noise reduction, defogging, and lens distortion correction, providing customers with professional-grade video image quality.

The chip also incorporates a self-developed TPU, delivering 1.0 TOPS of computing power under 8-bit integer operations. The specially designed TPU scheduling engine efficiently provides high-bandwidth data flow for all tensor processing unit cores. Additionally, it offers users a powerful deep learning model compiler and software SDK development kit. Leading deep learning frameworks like Caffe and Tensorflow can be easily ported to its platform. Furthermore, it includes security boot, secure updates, and encryption, providing a series of security solutions from development, mass production, to product applications.

The chip integrates an 8-bit MCU subsystem, replacing the typical external MCU to achieve cost-saving and power efficiency goals.

## SG2002 Public Preliminary Datasheet

We have open sourced the Public Preliminary Datasheet and TRM of SG2002 to GitHub. please [check it out](https://github.com/milkv-duo/duo-files/tree/main/duo-256M/datasheet).

## Buy the SG2002 Chips

Milk-V is the Authorised Global Distributor of the SG2002 chips. You can buy samples of the SG2002 chip from our distributor [online store](https://arace.tech/products/sophon-cv1800b-5pcs) directly. For volume order, please contact [Milk-V Sales Team](mailto:sales@milkv.io) for the qoutation.

## Duo256M GPIO Pinout

<Image src='/docs/duo/duo256m/duo256m-pinout-01.webp' maxWidth='50%' align='center' />

### GPIO pin mapping

<div className='gpio_style'>

| GROUP | ADDR          | PORT  | CHIP      | NUM     | NAME     | START             |
|:-----:|:-------------:|:-----:|:---------:|:-------:|:---------|:------------------|
| gpio0 | gpio@03020000 | porta | gpiochip0 | 480-511 | XGPIOA   | 480 - XGPIOA[0]   |
| gpio1 | gpio@03021000 | portb | gpiochip1 | 448-479 | XGPIOB   | 448 - XGPIOB[0]   |
| gpio2 | gpio@03022000 | portc | gpiochip2 | 416-447 | XGPIOC   | 416 - XGPIOC[0]   |
| gpio3 | gpio@03023000 | portd | gpiochip3 | 384-415 |          |                   |
| gpio4 | gpio@05021000 | porte | gpiochip4 | 352-383 | PWR_GPIO | 352 - PWR_GPIO[0] |

</div>

### GPIO Pinout

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

The logic level of `GP26` and `GP27` pins is 1.8V, and the logic level of other GPIO pins is 3.3V logic level.

### Camera interface

Duo256M camera uses a 16-pin connector with a distance of 0.5 mm, which can be directly used with the [CAM-GC2083](https://milkv.io/docs/duo/camera/gc2083) camera head.

#### Connector FPC Definition

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
| 13 | I2C2_SCL     (1.8V) |
| 14 | I2C2_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>

## Duo256M User Guide

### RISC-V and ARM switching

The large core of Duo256M can choose to use RISC-V or ARM processor. The RISC-V core is used by default. You can switch to the ARM core by shorting physical pin 35 (Boot-Switch) and GND. If you find that Duo256M cannot start normally during use, please first check whether the core currently used is consistent with the firmware used.

<Image src='/docs/duo/duo256m/duo256m-arm-riscv-switch.webp' maxWidth='50%' align='center' />

If the debug serial port is connected, you can see in the first line of the boot log that starting with `C` means starting from the RISC-V core, and starting with `B` means starting from the ARM core.

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```
