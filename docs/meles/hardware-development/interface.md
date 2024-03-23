---
sidebar_label: 'Hardware Interface Description'
sidebar_position: 50
---

# Hardware Interface Description

## Interface Overview

### USB Type-C Power

Power supply DC-5V

### Ethernet Port

The Meles offers a Gigabit Ethernet port. From the test results, the bandwidth is at least 930 Mbits/sec.

### 40 PIN GPIO

The Meles is supplied with a 40pin pin GPIO cradle that is compatible with most sensor applications on the market.

**_Hint:_ Actual compatibility is subject to use.**

- The Meles has a 40-pin expansion connector. Each pin is color coded.

<div className='gpio_style' style={{ overflow :"auto"}}>

|  Function4   |    Function3     | Function2  | Function1  |   GPIO   |               Pin#               |              Pin#               |   GPIO    |                Function1                |  Function2  |  Function3  |   Function4   |
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