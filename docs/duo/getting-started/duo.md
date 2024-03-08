---
sidebar_label: 'Duo(CV1800B)'
sidebar_position: 0
---

# Duo

 <Image src='/docs/duo/duo-v1.2.png' maxWidth='60%' align='center' />

 Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.  

## Introduction of CV1800B

CV1800B is a high-performance, low-power chip for residential consumer surveillance IP cameras, home intelligence and many other products, integrated with H.264/H.265 video compression encoder and ISP; supports digital broad dynamic, 3D noise reduction, defogging, lens distortion correction and other image enhancement and correction algorithms, providing customers with professional-grade video image quality.   

The chip integrates self-developed intelligent reference solutions (human detection, area detection, motion detection), built-in DDR and complete peripherals and peripherals, providing a highly integrated and simple solution to support customer product development and mass production.   

In addition, it also provides secure boot, secure update, secure encryption, etc., providing users with a series of security solutions from development, mass production, and product application with an 8-bit MCU subsystem integrated into the chip, which can replace the general external MCU to achieve the purpose of saving BOM cost and power consumption.

## CV1800B Public Preliminary Datasheet

We have open sourced the Public Preliminary Datasheet of CV1800B to GitHub. please [check it out](https://github.com/milkv-duo/duo-files/blob/main/duo/datasheet/CV1800B-CV1801B-Preliminary-Datasheet-full-en.pdf).

## Buy the CV1800B Chips

Milk-V is the Authorised Global Distributor of the CV1800B chips. You can buy samples of the CV1800B chip from our distributor [online store](https://arace.tech/products/sophon-cv1800b-5pcs) directly. For volume order, please contact [Milk-V Sales Team](mailto:sales@milkv.io) for the qoutation.

## Duo GPIO Pinout

<div className='gpio_style'>

| **JTAG** | **SPI**   | **SPI NOR**    | **SD**  | **PWM** | **I2C**  | **UART**   | **NAME** | **PIN**                         | **PIN**                          | **NAME** | **ADC**    | **SPI NOR**   | **SPI NAND** |
|:---------|:----------|:---------------|:--------|:--------|:---------|:-----------|---------:|:-------------------------------:|:--------------------------------:|:---------|:-----------|:--------------|:-------------|
| JTAG_TDI |           |                |         |         | I2C0_SCL | UART1/2_TX | GP0      | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS     |            |               |              |
| JTAG_TDO |           |                |         |         | I2C0_SDA | UART1/2_RX | GP1      | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS     |            |               |              |
|          |           |                |         |         |          |            | GND      | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |            |               |              |
|          |           |                | SD1_GP1 | PWM10   |          | UART4_TX   | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |            |               |              |
|          |           |                | SD1_GP0 | PWM11   |          | UART4_RX   | GP3      | <div className='green'>5</div>  | <div className='green'>36</div>  | 3V3(OUT) |            |               |              |
|          |           | SPINOR1_HOLD_X | SD1_D2  | PWM5    | I2C1_SCL | UART2/3_TX | GP4      | <div className='green'>6</div>  | <div className='gray'>35</div>   |          |            |               |              |
|          |           | SPINOR1_WP_X   | SD1_D1  | PWM6    | I2C1_SDA | UART2/3_RX | GP5      | <div className='green'>7</div>  | <div className='gray'>34</div>   |          |            |               |              |
|          |           |                |         |         |          |            | GND      | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |            |               |              |
|          | SPI2_SCK  | SPINOR1_SCK    | SD1_CLK | PWM9    | I2C3_SDA |            | GP6      | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     | ADC2(1.8V) |               |              |
|          | SPI2_SDO  | SPINOR1_MOSI   | SD1_CMD | PWM8    | I2C3_SCL |            | GP7      | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     | ADC1(1.8V) |               |              |
|          | SPI2_SDI  | SPINOR1_MISO   | SD1_D0  | PMW7    | I2C1_SDA | UART3_RTS  | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |            |               |              |
|          | SPI2_CS_X | SPINOR1_CS_X   | SD1_D3  | PWM4    | I2C1_SCL | UART3_CTS  | GP9      | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     |            |               |              |
|          |           |                |         |         |          |            | GND      | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |            |               |              |
|          |           |                |         |         | I2C1_SDA |            | GP10     | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     |            | SPINOR_HOLD_X | SPINAND_HOLD |
|          |           |                |         |         | I2C1_SCL |            | GP11     | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     |            | SPINOR_WP_X   | SPINAND_WP   |
| JTAG_TMS |           |                |         | PWM4    |          | UART0/1_TX | GP12     | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     |            | SPINOR_MOSI   | SPINAND_MOSI |
| JTAG_TCK |           |                |         | PWM5    |          | UART0/1_RX | GP13     | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     |            | SPINOR_SCK    | SPINAND_SCK  |
|          |           |                |         |         |          |            | GND      | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |            |               |              |
|          |           |                |         |         |          |            | GP14     | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     |            | SPINOR_CS_X   | SPINAND_CS   |
|          |           |                |         |         |          |            | GP15     | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     |            | SPINOR_MISO   | SPINAND_MISO |

</div>
