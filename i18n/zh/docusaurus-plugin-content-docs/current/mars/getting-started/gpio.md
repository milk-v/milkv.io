---
sidebar_label: 'GPIO 的使用'
sidebar_position: 41
---

# GPIO 的使用
## GPIO 引脚分配

<Image src='/docs/mars/40-pin-Header.webp' maxWidth='50%' align='center' />

## GPIO Pin 分布

<div className='gpio_style' style={{ overflow :"auto"}} >

| SPI      | PWM  | I2C      | LCD    |  GPIO NUM  | NAME  | PIN                              | PIN                   | NAME   | GPIO NUM     |  UART  | LCD  | PWM     | SPI      |
|:-----|:---------|:---------|:---:|:-----------|------:|:--------------------------------:|:-------------------------------:|:---------|:-----------|:---:|:-------------------|:-----|:--------|
|         |       |          |         |    N/A    |  +3.3V |   <div className='orange'>1</div>  |  <div className='red'>2</div>    | +5V   | N/A  |         |       |     |    |
|         |       | I2C_SDA  |         |    58     | GPIO58 |   <div className='green'>3</div>   |  <div className='red'>4</div>    | +5V   | N/A  |         |       |     |    | 
|         |       | I2C_SCL  |         |    57     | GPIO57 |   <div className='green'>5</div>   |  <div className='black'>6</div>  | GND   | N/A  |         |       |
|         |       |          |         |    55     | GPIO55 |   <div className='green'>7</div>   |  <div className='green'>8</div>  | GPIO5 | 5    |UART_TX  |       |
|         |       |          |         |    N/A    | GND    |   <div className='black'>9</div>   |  <div className='green'>10</div> | GPIO6 | 6    |UART_RX  |       |
|         |       |          |         |    42     | GPIO42 |   <div className='green'>11</div>  |  <div className='green'>12</div> | GPIO38| 38   |         |LCD_HSYNC |   |
|         |       |          |         |    43     | GPIO43 |   <div className='green'>13</div>  |  <div className='black'>14</div> | GND   | N/A  |         |       |
|         |       |          |         |    47     | GPIO47 |   <div className='green'>15</div>  |  <div className='green'>16</div> | GPIO54| 54   |         |       |
|         |       |          |         |    N/A    | +3.3V  |   <div className='orange'>17</div> |  <div className='green'>18</div> | GPIO51| 51   |         |       |
| SPI_MOSI|       |          |         |    52     |GPIO52  |   <div className='green'>19</div>  |  <div className='black'>20</div> | GND   | N/A  |         |       |  
| SPI_MISO|       |          |         |    53     |GPIO53  |   <div className='green'>21</div>  |  <div className='green'>22</div> | GPIO50| 50   |         |       |
| SPI_SCLK|       |          |         |    48     | GPIO48 |   <div className='green'>23</div>  |  <div className='green'>24</div> | GPIO49| 49   |         |       |      |   |  SPI_CE0  |
|         |       |          |         |    N/A    | GND    |   <div className='black'>25</div>  |  <div className='green'>26</div> | GPIO56| 56   |         |       |      |   |            
|         |       |          |         |    45     |GPIO45  |   <div className='green'>27</div>  |  <div className='green'>28</div> |GPIO40 | 40   |         |       |  
|         |       |          |LCD_VSYNC|    37     |GPIO37  |   <div className='green'>29</div>  |  <div className='black'>30</div> |GND    | N/A  |         |       |      
|         |       |          | LCD_DE  |    39     |GPIO39  |   <div className='green'>31</div>  |  <div className='green'>32</div> |GPIO46 | 46   |         |       | PWM0  |  |
|         | PWM1  |          |         |    59     |GPIO59  |   <div className='green'>33</div>  |  <div className='black'>34</div> |GND    | N/A  |         |       |       
|         |       |          |         |    63     |GPIO63  |   <div className='green'>35</div>  |  <div className='green'>36</div> |GPIO36 | 36   |         |LCD_CLK|       |      |
|         |       |          |         |    60     |GPIO60  |   <div className='green'>37</div>  |  <div className='green'>38</div> |GPIO61 | 61   |         |       |       |      |
|         |       |          |         |    N/A    |GND     |   <div className='green'>39</div>  |  <div className='green'>40</div> |GPIO44 | 44   |         |       |       |      |
</div>

如果需要引脚复用，可参考：https://milkv.io/zh/docs/mars/getting-started/gpio_full_multiplexing

## 配置GPIO

1. 执行以下操作配置GPIO：

以 GPIO44 为例。
```
$ cd /sys/class/gpio

$ echo 44 | sudo tee export
```
可以运行命令 `ls /sys/class/gpio`，列出 GPIO 目录，检查是否出现 gpio44，确认导出成功。

:::tip
命令中的 44 为 NAME 编号，对应 GPIO44
:::

2. 设置 GPIO 的方向

运行命令 ` echo "out" | sudo tee gpio44/direction `，将 GPIO44 方向设置为输出。

运行命令 ` echo "in" | sudo tee gpio44/direction `，将 GPIO44 方向设置为输入。

可以通过运行命令 `cat gpio44/direction `,来查看设置的方向。

3. 设置 GPIO44 的电压 

运行命令 `echo "1" | sudo tee gpio44/value `,将 GPIO44 的电压设置为高电平。

运行命令 `echo "0" | sudo tee gpio44/value `,将 GPIO44 的电压设置为低电平。

可以通过命令 `cat gpio44/value `,来查看设置的值。