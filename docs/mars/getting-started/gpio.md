---
sidebar_label: 'GPIO usage'
sidebar_position: 41
---

# GPIO usage
## GPIO pin assignment

<Image src='/docs/mars/40-pin-Header.webp' maxWidth='50%' align='center' />

## GPIO Pin distribution

<div className='gpio_style' style={{ overflow :"auto"}} >

| SPI      | PWM  | I2C      | LCD    |  GPIO NUM  | NAME  | PIN                              | PIN                   | NAME   | GPIO NUM     |  UART  | LCD  | PWM     | SPI      |
|:-----|:---------|:---------|:---:|:-----------|------:|:--------------------------------:|:-------------------------------:|:---------|:-----------|:---:|:-------------------|:-----|:--------|
|         |       |          |         |    N/A    |  +3.3V |   <div className='orange'>1</div>  |  <div className='red'>2</div>    | +5V   | N/A  |         |       |     |    |
|         |       | I2C_SDA  |         |    58     | GPIO58 |   <div className='green'>3</div>   |  <div className='red'>4</div>    | +5V   | N/A  |         |       |     |    | 
|         |       | I2C_SCL  |         |    57     | GPIO57 |   <div className='green'>5</div>   |  <div className='black'>6</div>  | GND   | N/A  |         |       |
|         |       |          |         |    55     | GPIO55 |   <div className='green'>7</div>   |  <div className='green'>8</div>  | GPIO5 | 5    |UART_TX  |       |
|         |       |          |         |    N/A    | GND    |   <div className='black'>9</div>   |  <div className='green'>10</div> | GPIO6 | 6    |UART_RX  |       |
|         |       |          |         |    42     | GPIO42 |   <div className='green'>11</div>  |  <div className='green'>12</div> | GPIO38| 38   |         |LCD_HSYNC|
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