---
sidebar_label: 'pinpong'
sidebar_position: 20
---

# Introduction

The pinpong library is an open-source python library that is based on the firmata protocol and utilizes micropython syntax. Its primary objective is to provide developers with a tool that allows them to directly control various open-source hardware control boards through Python code. 

# Usage

## Pin numbers

### Duo

<div className='gpio_style'>

| pinpong | PIN NAME |              Pin#               |              Pin#                | PIN NAME | pinpong |
| ------- | -------- | :-----------------------------: | :------------------------------: | -------- | ------- |
| 0       | GP0      | <div className='green'>1</div>  |    <div className='red'>40</div> | VBUS     |         |
| 1       | GP1      | <div className='green'>2</div>  |    <div className='red'>39</div> | VSYS     |         |
|         | GND      | <div className='black'>3</div>  |  <div className='black'>38</div> | GND      |         |
| 2       | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |         |
| 3       | GP3      | <div className='green'>5</div>  |    <div className='red'>36</div> | 3V3(OUT) |         |
| 4       | GP4      | <div className='green'>6</div>  |   <div className='gray'>35</div> |          |         |
| 5       | GP5      | <div className='green'>7</div>  |   <div className='gray'>34</div> |          |         |
|         | GND      | <div className='black'>8</div>  |  <div className='black'>33</div> | GND      |         |
| 6       | GP6      | <div className='green'>9</div>  |  <div className='green'>32</div> | GP27     | 27      |
| 7       | GP7      | <div className='green'>10</div> |  <div className='green'>31</div> | GP26     | 26      |
| 8       | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |         |
| 9       | GP9      | <div className='green'>12</div> |  <div className='green'>29</div> | GP22     | 22      |
|         | GND      | <div className='black'>13</div> |  <div className='black'>28</div> | GND      |         |
| 10      | GP10     | <div className='green'>14</div> |  <div className='green'>27</div> | GP21     | 21      |
| 11      | GP11     | <div className='green'>15</div> |  <div className='green'>26</div> | GP20     | 20      |
| 12      | GP12     | <div className='green'>16</div> |  <div className='green'>25</div> | GP19     | 19      |
| 13      | GP13     | <div className='green'>17</div> |  <div className='green'>24</div> | GP18     | 18      |
|         | GND      | <div className='black'>18</div> |  <div className='black'>23</div> | GND      |         |
| 14      | GP14     | <div className='green'>19</div> |  <div className='green'>22</div> | GP17     | 17      |
| 15      | GP15     | <div className='green'>20</div> |  <div className='green'>21</div> | GP16     | 16      |
|         |          | &nbsp;                          |                                  |          |         |
| 25      | GP25     | <div className='blue'>LED</div> |                                  |          |         |

</div>

## Pinmux

Many of Duo's pins have multipurpose functionality. When using pinpong library to control the functions of each pin, it is important to confirm the current state of the pin to ensure it matches the desired functionality. If it doesn't, you can use the `duo-pinmux` command to switch it to the desired function

Please refer to the instructions: [pinmux](https://milkv.io/docs/duo/application-development/pinmux)

## GPIO

### Onboard LED blinking

This is an example to blink the Duo's onboard LED. You can create a new file `blink.py` directly in Duo, or create it on your computer and upload it to Duo via SSH.

:::tip
The Duo LED pin number is 25. If you use other pins to connect an external LED, please refer to the table above for the number.
:::

Contents of the file `blink.py` :

```python
# -*- coding: utf-8 -*-

# 实验效果：控制 MilkV-Duo 板载 LED 灯一秒闪烁一次。
# Function: Control the MilkV-Duo onboard LED light to flash once per second.
# 接线：使用电脑连接一块 MilkV-Duo 主控板。
# Wiring: Use a computer to connect a MilkV-Duo board.

# 在启动程序前请使用 duo-pinmux 确认引脚复用在正确的功能上。
# Please use duo-pinmux to confirm that the pins are multiplexed to the correct functions before starting the program.

import time
from pinpong.board import Board,Pin

Board("MILKV-DUO").begin() # 初始化，选择板型，不输入板型则进行自动识别;Initialize, select the board type, if you do not enter the board type, it will be automatically identified.

led = Pin(Pin.D14, Pin.OUT) # 引脚初始化为电平输出;The pin is initialized as output.

while True:
  led.value(1) # 输出高电平;Output High.
  print("1")
  time.sleep(1) # 等待1秒 保持状态;Stay 1s.

  led.value(0) # 输出低电平;Output Low.
  print("0")
  time.sleep(1) # 等待1秒 保持状态;Stay 1s.
```

Execute the command `python blink.py` in the Duo terminal:

```
[root@milkv-duo]~# python blink.py
milkv-duo

  __________________________________________
 |    ____  _       ____                    |
 |   / __ \(_)___  / __ \____  ____  ____ _ |
 |  / /_/ / / __ \/ /_/ / __ \/ __ \/ __ `/ |
 | / ____/ / / / / ____/ /_/ / / / / /_/ /  |
 |/_/   /_/_/ /_/_/    \____/_/ /_/\__, /   |
 |   v0.5.2  Designed by DFRobot  /____/    |
 |__________________________________________|

1
0
1
0
```

You will see the LED flashing at 1 second intervals.

:::warning
The default firmware of the current Duo will automatically blink the LED after power-on. This is achieved by the boot script. When testing the blink example, you need to disable the LED blinking script. Execute in the Duo terminal:

```bash
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
reboot
```

After testing the blink program, if you need to restore the LED blinking script, execute the following command:

```bash
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
reboot
```
:::

### External button

This is an example of an external button. The program will read the GPIO status every 0.1s and print it to the screen. Please create a ```button.py``` file in Duo or upload it using SSH.

Contents of the file ```button.py```:

```python
# -*- coding: utf-8 -*-

# 实验效果：终端输出 MilkV-Duo 上的引脚电平。
# Function: The terminal outputs the pin level on MilkV-Duo.
# 接线：使用电脑连接一块 MilkV-Duo 主控板，主控板 D0 接一个按钮模块。
# Wiring: Connect MilkV-Duo board to computer, and connect the board D0 to a button module.

# 在启动程序前请使用 duo-pinmux 确认引脚复用在正确的功能上。
# Please use duo-pinmux to confirm that the pins are multiplexed to the correct functions before starting the program.

import time
from pinpong.board import Board,Pin

Board("MILKV-DUO").begin()  # 初始化，选择板型，不输入板型则进行自动识别;Initialize, select the board type, if you do not enter the board type, it will be automatically identified.

btn = Pin(Pin.D0, Pin.IN) # 引脚初始化为电平输入;The pin is initialized as Input.

while T rue:
  v = btn.value()  # 读取引脚电平;Read pin level.
  print(v)  # 终端打印读取的电平状态;Print pin level.
  time.sleep(0.1)
```

Connect a button module to the GP0 on Duo and execute the `python button.py` command in the Duo's terminal:

```
[root@milkv-duo]~# python ./button.py
milkv-duo

  __________________________________________
 |    ____  _       ____                    |
 |   / __ \(_)___  / __ \____  ____  ____ _ |
 |  / /_/ / / __ \/ /_/ / __ \/ __ \/ __ `/ |
 | / ____/ / / / / ____/ /_/ / / / / /_/ /  |
 |/_/   /_/_/ /_/_/    \____/_/ /_/\__, /   |
 |   v0.5.2  Designed by DFRobot  /____/    |
 |__________________________________________|
 
1
1
1
1
```

You can observe that the GPIO status is output on the screen every 0.1s, and you can also observe that the GPIO status is reversed by pressing the button.

### Software simulation external interrupt

This example demonstrates the use of the software simulated external interrupt function in the pinpong library. Please create or upload the ```irq.py``` file in Duo.

Contents of the file ```irq.py```:

```python
# -*- coding: utf-8 -*-

# 实验效果：引脚模拟中断功能测试。
# Function: Pin interrupt function test.
# 接线：使用电脑连接一块 MilkV-Duo 主控板，主控板 GP0 接一个按钮模块。
# Wiring: Connect a MilkV-Duo board, and connect the board GP0 to a button module.

# 在启动程序前请使用 duo-pinmux 确认引脚复用在正确的功能上。
# Please use duo-pinmux to confirm that the pins are multiplexed to the correct functions before starting the program.

import time
from pinpong.board import Board,Pin

Board("MILKV-DUO").begin()  # 初始化，选择板型和端口号，不输入端口号则进行自动识别;Initialize, select the board type, if you do not enter the board type, it will be automatically identified.

btn = Pin(Pin.D0, Pin.IN)

def btn_rasing_handler(pin):# 中断事件回调函数;Interrupt event callback function.
  print("\n--rising---")
  print("pin = ", pin)
  
def btn_falling_handler(pin):# 中断事件回调函数;Interrupt event callback function.
  print("\n--falling---")
  print("pin = ", pin)

def btn_both_handler(pin):# 中断事件回调函数;Interrupt event callback function.
  print("\n--both---")
  print("pin = ", pin)

btn.irq(trigger=Pin.IRQ_FALLING, handler=btn_falling_handler) # 设置中断模式为下降沿触发;Set the interrupt mode to falling edge trigger.
#btn.irq(trigger=Pin.IRQ_RISING, handler=btn_rasing_handler) # 设置中断模式为上升沿触发，及回调函数;Set the interrupt mode to rising edge trigger and set callback function;
#btn.irq(trigger=Pin.IRQ_RISING+Pin.IRQ_FALLING, handler=btn_both_handler) # 设置中断模式为电平变化时触发;Set the interrupt mode to trigger when the level changes.

while True:
  time.sleep(1)
```

Connect the button module to the Duo GP0 and execute ```python irq.py``` in the Duo terminal.

```
[root@milkv-duo]~# python ./irq.py 
milkv-duo

  __________________________________________
 |    ____  _       ____                    |
 |   / __ \(_)___  / __ \____  ____  ____ _ |
 |  / /_/ / / __ \/ /_/ / __ \/ __ \/ __ `/ |
 | / ____/ / / / / ____/ /_/ / / / / /_/ /  |
 |/_/   /_/_/ /_/_/    \____/_/ /_/\__, /   |
 |   v0.5.2  Designed by DFRobot  /____/    |
 |__________________________________________|
 

--falling---
pin =  0
```

When the button is pressed, you will see the information printed on the screen after the falling edge event is triggered. You can also try different external interrupt event by turning on or off the comments of the ```btn.irq()``` function in the program.

## I2C

### Scan for devices on the bus

This example shows how to use pinpong to control the I2C on the Duo to scan for devices connected to the bus. Please create or upload the ```i2c_scan.py``` file in the Duo using SSH.

Contents of the file ```i2c_scan.py```:

```python
# -*- coding: utf-8 -*-

# 实验效果：控制 MilkV-Duo I2C 扫描 I2C 总线上的设备。
# Function: Control MilkV-Duo I2C to scan devices on the I2C bus.
# 接线：连接一个 I2C 从机设备到 MilkV-Duo 。
# Wiring: Connect an I2C slave device to MilkV-Duo.

# 在启动程序前请使用 duo-pinmux 确认引脚复用在正确的功能上。
# Please use duo-pinmux to confirm that the pins are multiplexed to the correct functions before starting the program.

import time
from pinpong.board import Board,I2C

Board("MILKV-DUO").begin()  # 初始化，选择板型，不输入板型则进行自动识别;Initialize, select the board type, if you do not enter the board type, it will be automatically identified.
i2c = I2C(0) # 指定 I2C 设备号;Specifies the I2C device number.

l=i2c.scan() # 扫描 I2C 总线上的设备;;Scan for devices on the I2C bus.
print("i2c list:",l)

while(1):
	time.sleep(1)
```

Connect the I2C device to I2C0 of Duo and execute ```python i2c_scan.py``` in the terminal.

```
[root@milkv-duo]~# python ./i2c_scan.py 
milkv-duo

  __________________________________________
 |    ____  _       ____                    |
 |   / __ \(_)___  / __ \____  ____  ____ _ |
 |  / /_/ / / __ \/ /_/ / __ \/ __ \/ __ `/ |
 | / ____/ / / / / ____/ /_/ / / / / /_/ /  |
 |/_/   /_/_/ /_/_/    \____/_/ /_/\__, /   |
 |   v0.5.2  Designed by DFRobot  /____/    |
 |__________________________________________|
 
i2c list: [86]
```

After the program runs, the device address scanned by I2C will be printed on the screen.

### Communications

This example demonstrates how to use the pinpong library to send or read data over I2C. Please create or upload a ```i2c.py``` file on the Duo using SSH.

Contents of the file ```i2c.py```:

```python
# -*- coding: utf-8 -*-

# 实验效果：控制 MilkV-Duo I2C 通信协议展示。
# Function: Control MilkV-Duo I2C communication.
# 接线：连接一个 I2C 从机设备到 MilkV-Duo ,假设 I2C 地址为 0x33 。
# Wiring: Connect an I2C slave device to MilkV-Duo, assuming the I2C address is 0x33.

# 在启动程序前请使用 duo-pinmux 确认引脚复用在正确的功能上。
# Please use duo-pinmux to confirm that the pins are multiplexed to the correct functions before starting the program.

import time
from pinpong.board import Board,I2C

Board("MILKV-DUO").begin()  # 初始化，选择板型和端口号，不输入端口号则进行自动识别;Initialize, select the board type, if you do not enter the board type, it will be automatically identified.

i2c = I2C(bus_num=3) # 设置使用的 I2C 号;Specifies the I2C device number.

l=i2c.scan() # 扫描 I2C 总线上的设备 - [0x33];Scan for devices on the I2C bus - [0x33].
print("i2c list:",l)

i2c.writeto(0x33,[1,2,3,4,5]) # 将 [1,2,3,4,5] 写入 I2C 设备;Write [1,2,3,4,5] to the I2C device.
i2c.readfrom(0x33,6) # 从 I2C 设备读取 6 个数据;Read 6 data from I2C device.
i2c.readfrom_mem(0x33,2,6) # 从 I2C 设备的寄存器 2 读取 6 个数据;Read 6 data from register 2 of the I2C device.
i2c.writeto_mem(0x33,2,[1,2,3,4,5]) # 向 I2C 设备的寄存器 2 写入 [1,2,3,4,5];Write [1,2,3,4,5] to register 2 of the I2C device;

while(1):
	time.sleep(1)
```

Assume that an I2C device with address 0x33 is mounted on I2C3 of Duo. You can use a logic analyzer or other device to capture the level signal on I2C3 for analysis. Execute ```python i2c.py``` in the Duo terminal to run the program.

Because there is no I2C device with address 0x33 mounted on the bus, the program may return some error information after execution:

```
[root@milkv-duo]~# python ./i2c.py 
milkv-duo

  __________________________________________
 |    ____  _       ____                    |
 |   / __ \(_)___  / __ \____  ____  ____ _ |
 |  / /_/ / / __ \/ /_/ / __ \/ __ \/ __ `/ |
 | / ____/ / / / / ____/ /_/ / / / / /_/ /  |
 |/_/   /_/_/ /_/_/    \____/_/ /_/\__, /   |
 |   v0.5.2  Designed by DFRobot  /____/    |
 |__________________________________________|
 
i2c list: []
Traceback (most recent call last):
  File "/root/./i2c.py", line 21, in <module>
    i2c.writeto(0x33,[1,2,3,4,5]) # 将 [1,2,3,4,5] 写入 I2C 设备;Write [1,2,3,4,5] to the I2C device.
  File "/usr/lib/python3.9/site-packages/pinpong/board.py", line 823, in writeto
    self.obj.writeto(i2c_addr, value)
  File "/usr/lib/python3.9/site-packages/pinpong/board.py", line 781, in writeto
    self.i2c.transfer(writing(i2c_addr, value))
  File "/usr/lib/python3.9/site-packages/pinpong/base/i2c.py", line 89, in transfer
    ioctl(self.fd, I2C_RDWR, ioctl_arg)
OSError: [Errno 121] Remote I/O error
```

## Other Examples

Please refer to:[github](https://github.com/milkv-duo/duo-buildroot-sdk/tree/develop/buildroot-2021.05/package/python-pinpong/pinpong/examples/milkv-Duo)

:::warning
The above examples have not been verified and may not work properly.
:::