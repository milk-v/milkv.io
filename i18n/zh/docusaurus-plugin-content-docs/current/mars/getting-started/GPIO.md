---
sidebar_label: 'GPIO 的使用'
sidebar_position: 41
---

# GPIO 的使用
## GPIO 引脚分配

<Image src='/docs/mars/40-pin-Header.webp' maxWidth='50%' align='center' />

## GPIO Pin 分布

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

## 配置GPIO

1. 执行以下操作配置GPIO：

以 GPIO44 为例。
```
$ cd /sys/class/gpio

$ echo 44 | sudo tee export
```
可以运行命令 `ls /sys/class/gpio`，列出 GPIO 目录，检查是否出现 gpio44，确认导出成功。

:::tip
命令中的 44 为 sys 编号，对应 GPIO44
:::

2. 设置 GPIO 的方向

运行命令 ` echo "out" | sudo tee gpio44/direction `，将 GPIO44 方向设置为输出。

运行命令 ` echo "in" | sudo tee gpio44/direction `，将 GPIO44 方向设置为输入。

可以通过运行命令 `cat gpio44/direction `,来查看设置的方向。

3. 设置 GPIO44 的电压 

运行命令 `echo "1" | sudo tee gpio44/value `,将 GPIO44 的电压设置为高电平。

运行命令 `echo "0" | sudo tee gpio44/value `,将 GPIO44 的电压设置为低电平。

可以通过命令 `cat gpio44/value `,来查看设置的值。