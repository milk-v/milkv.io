---
sidebar_label: 'GPIO usage'
sidebar_position: 41
---

# GPIO usage
## GPIO pin assignment

<Image src='/docs/mars/40-pin-Header.webp' maxWidth='50%' align='center' />

## GPIO Pin distribution

<div className='gpio_style' style={{ overflow :"auto"}} >

| sys   | dts | GPIO Num      | NAME     | PIN                             | PIN                              | NAME        | GPIO Num     | dts | sys   |
|:-----------|:---:|:------------|---------:|:-------------------------------:|:--------------------------------:|:------------|:-----------|:---:|:-----------|
|       |          |      N/A    |    +3.3V        |   <div className='orange'>1</div>  |  <div className='red'>2</div>     | +5V             | N/A  |       |      |
| i2c-0 | i2c0     |    58       | GPIO58 (I2C SDA)|   <div className='green'>3</div>   | <div className='red'>4</div>      | +5V             | N/A  |       |       | 
| i2c-0 | i2c0     |    57       | GPIO57 (I2C SCL)|   <div className='green'>5</div>   | <div className='black'>6</div>    | GND             | N/A  |       |       | 
|  55   |          |     55      |      GPIO55     | <div className='green'>7</div>     | <div className='green'>8</div>    | GPIO5 (UART TX) |5     | uart0 |ttyS0  | 
|       |          |     N/A     | GND             |   <div className='black'>9</div>   | <div className='green'>10</div>   | GPIO6 (UART RX) | 6    | uart0 |ttyS0  |
| 42    |          | 42          | GPIO42          | <div className='green'>11</div>    | <div className='green'>12</div>   |  GPIO38         | 38   |       | 38    | 
| 43    |          | 43          |  GPIO43         | <div className='green'>13</div>    | <div className='black'>14</div>   | GND             |N/A   |       |       |
|  47   |          |      47     |     GPIO47      |  <div className='green'>15</div>   |  <div className='green'>16</div>  | GPIO54          | 54    |       |54     |
|       |          |     N/A     | +3.3V           | <div className='orange'>17</div>   |  <div className='green'>18</div>  | GPIO51          | 51    |       | 51    | 
|spidev1.0|   spi0 |     52      |GPIO52 (SPI MOSI)|  <div className='green'>19</div>   |<div className='black'>20</div>    | GND             | N/A   |       |         | 
|spidev1.0 |  spi0 |  53         |GPIO53（SPI MISO）|   <div className='green'>21</div>  |  <div className='green'>22</div>  | GPIO50          | 50    |       |  50     | 
| spidev1.0 | spi0  |      48    | GPIO48 (SPI SCLK) |  <div className='green'>23</div> |  <div className='green'>24</div>  | GPIO49 (SPI CE0) | 49    | spi0 | spidev1.0| 
|       |          |    N/A      | GND              | <div className='black'>25</div>   |<div className='green'>26</div>    | GPIO56           |56     |      | 56        | 
|45      |        |45            |GPIO45            |<div className='green'>27</div>    |<div className='green'>28</div>    |GPIO40            |40      |      |40        |
|37     |         |37            |GPIO37            |<div className='green'>29</div>    |<div className='black'>30</div>    |GND               |N/A     |      |          |  
|39      |        |39            |GPIO39             |<div className='green'>31</div>    |<div className='green'>32</div>   |GPIO46（PWM0）     |46      |      | pwm0     |
|  pwm1  |        |59            |GPIO59（PWM1）      |<div className='green'>33</div>    |<div className='black'>34</div>   |GND| N/A          |         |        |       |
|63      |        |63            |GPIO63              |<div className='green'>35</div>    |<div className='green'>36</div>   |GPIO36            |36       |        |36     |
|60       |       | 60           |GPIO60               |<div className='green'>37</div>    |<div className='green'>38</div>  |GPIO61            |61       |        |61      |
|         |       |N/A           |GND                  |<div className='green'>39</div>    |<div className='green'>40</div>   |GPIO44           |44       |        |44       |
</div>

## Configure GPIO

1. Perform the following operations to configure GPIO:

Take GPIO44 as an example.
```
$ cd /sys/class/gpio

$ echo 44 | sudo tee export
```
You can run the command `ls /sys/class/gpio` to list the GPIO directory, check whether gpio44 appears, and confirm that the export is successful.

:::tip
The 44 in the command is the sys number, corresponding to GPIO44
:::

2. Set the direction of GPIO

Run the command ` echo "out" | sudo tee gpio44/direction ` to set the direction of GPIO44 to output.

Run the command ` echo "in" | sudo tee gpio44/direction ` to set the direction of GPIO44 to input.

You can check the set direction by running the command `cat gpio44/direction `.

3. Set the voltage of GPIO44

Run the command `echo "1" | sudo tee gpio44/value ` to set the voltage of GPIO44 to a high level.

Run the command `echo "0" | sudo tee gpio44/value ` to set the voltage of GPIO44 to a low level.

You can view the set value through the command `cat gpio44/value `.