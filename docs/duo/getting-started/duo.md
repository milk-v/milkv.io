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

<Image src='/docs/duo/duo/duo-pinout-01.webp' maxWidth='50%' align='center' />

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

### Camera interface

Duo camera uses a 16-pin connector with a distance of 0.5 mm, which can be directly used with the [CAM-GC2083](https://milkv.io/docs/duo/camera/gc2083) camera head.

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
| 13 | I2C1_SCL     (1.8V) |
| 14 | I2C1_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>
