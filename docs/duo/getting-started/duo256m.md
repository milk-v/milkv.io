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

<div className='gpio_style'>

| **JTAG** | **SPI**   | **SPI NOR**    | **SD**  | **PWM** | **I2C**  | **UART**   | **NAME** | **PIN**                         | **PIN**                          | **NAME**    | **ADC**    | **SPI NOR**   | **SPI NAND** | **EMMC**  |
|:---------|:----------|:---------------|:--------|:--------|:---------|:-----------|---------:|:-------------------------------:|:--------------------------------:|:------------|:-----------|:--------------|:-------------|:----------|
| JTAG_TDI |           |                |         |         |          | UART1/2_TX | GP0      | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS        |            |               |              |           |
| JTAG_TDO |           |                |         |         |          | UART1/2_RX | GP1      | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS        |            |               |              |           |
|          |           |                |         |         |          |            | GND      | <div className='black'>3</div>  | <div className='black'>38</div>  | GND         |            |               |              |           |
| JTAG_TMS |           |                |         | PWM7    |          | UART1_TX   | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN      |            |               |              |           |
| JTAG_TCK |           |                |         | PWM6    |          | UART1_RX   | GP3      | <div className='green'>5</div>  | <div className='green'>36</div>  | 3V3(OUT)    |            |               |              |           |
|          |           | SPINOR1_HOLD_X | SD1_D2  | PWM5    | I2C1_SCL | UART2/3_TX | GP4      | <div className='green'>6</div>  | <div className='gray'>35</div>   | Boot Switch |            |               |              |           |
|          |           | SPINOR1_WP_X   | SD1_D1  | PWM6    | I2C1_SDA | UART2/3_RX | GP5      | <div className='green'>7</div>  | <div className='gray'>34</div>   | Audio Out   |            |               |              |           |
|          |           |                |         |         |          |            | GND      | <div className='black'>8</div>  | <div className='black'>33</div>  | GND         |            |               |              |           |
|          | SPI2_SCK  | SPINOR1_SCK    | SD1_CLK | PWM9    | I2C3_SDA |            | GP6      | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27        | ADC2(1.8V) |               |              |           |
|          | SPI2_SDO  | SPINOR1_MOSI   | SD1_CMD | PWM8    | I2C3_SCL |            | GP7      | <div className='green'>10</div> | <div className='green'>31</div>  | GP26        | ADC1(1.8V) |               |              |           |
|          | SPI2_SDI  | SPINOR1_MISO   | SD1_D0  | PMW7    | I2C1_SDA | UART3_RTS  | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN         |            |               |              |           |
|          | SPI2_CS_X | SPINOR1_CS_X   | SD1_D3  | PWM4    | I2C1_SCL | UART3_CTS  | GP9      | <div className='green'>12</div> | <div className='green'>29</div>  | GP22        |            |               |              |           |
|          |           |                |         |         |          |            | GND      | <div className='black'>13</div> | <div className='black'>28</div>  | GND         |            |               |              |           |
|          |           |                |         | PWM10   | I2C2_SDA |            | GP10     | <div className='green'>14</div> | <div className='green'>27</div>  | GP21        |            | SPINOR_HOLD_X | SPINAND_HOLD | EMMC_DAT2 |
|          |           |                |         | PWM11   | I2C2_SCL |            | GP11     | <div className='green'>15</div> | <div className='green'>26</div>  | GP20        |            | SPINOR_WP_X   | SPINAND_WP   | EMMC_DAT3 |
|          |           |                |         | PWM4    |          | UART0/1_TX | GP12     | <div className='green'>16</div> | <div className='green'>25</div>  | GP19        |            | SPINOR_MOSI   | SPINAND_MOSI | EMMC_DAT0 |
|          |           |                |         | PWM5    |          | UART0/1_RX | GP13     | <div className='green'>17</div> | <div className='green'>24</div>  | GP18        |            | SPINOR_SCK    | SPINAND_SCK  | EMMC_CLK  |
|          |           |                |         |         |          |            | GND      | <div className='black'>18</div> | <div className='black'>23</div>  | GND         |            |               |              |           |
|          |           |                |         |         |          |            | GP14     | <div className='green'>19</div> | <div className='green'>22</div>  | GP17        |            | SPINOR_CS_X   | SPINAND_CS   | EMMC_DAT1 |
|          |           |                |         |         |          |            | GP15     | <div className='green'>20</div> | <div className='green'>21</div>  | GP16        |            | SPINOR_MISO   | SPINAND_MISO | EMMC_CMD  |

</div>
