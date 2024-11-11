---
sidebar_label: 'pinpong'
sidebar_position: 20
---

# 简介

pinpong 库是一套控制开源硬件主控板的 Python 库，基于 Firmata 协议并兼容 MicroPython 语法，借助于 pinpong 库，直接用 Python 代码就能给各种常见的开源硬件编程。

# 用法

## 引脚序号

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

## 引脚复用配置

注意，Duo 的很多引脚功能是复用的，在使用 `pinpong` 库来控制 Duo 各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`duo-pinmux`命令来切换为所需功能

具体方法请参考: [引脚复用配置](https://milkv.io/zh/docs/duo/application-development/pinmux)

## GPIO

### 板载 LED 闪烁

这是一个让 Duo 板载 LED 闪烁的例子，可以直接在 Duo 中新建 `blink.py` 文件，或者在电脑中创建好之后通过 SSH 上传到 Duo 中。

:::tip
Duo LED 引脚的序号是 25，如果使用其他引脚外接 LED，序号请参考上面的表格。
:::

`blink.py` 文件的内容：

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

在 Duo 的终端中执行 `python blink.py` 命令：

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

会看到 LED 间隔 1 秒闪烁。

:::warning
当前 Duo 的默认固件上电后 LED 会自动闪烁，这个是通过开机脚本实现的，在测试该 blink 例子的时候，需要将 LED 闪烁的脚本禁用，在 Duo 的终端中执行：

```bash
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
reboot
```

测试完 blink 程序后，如果需要恢复 LED 闪烁脚本，执行下面的命令即可：

```bash
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
reboot
```
:::

### 外接按钮

这是外接按钮的例子，程序会每隔 0.1s 读取一次 GPIO 状态并将其打印在屏幕上。请在 Duo 中创建或使用 SSH 上传 ```button.py``` 文件。

```button.py``` 文件内容：

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

在开发板 GP0 上连接一个按钮模块，并在 Duo 的终端中执行 `python button.py` 命令：

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

可以观察到屏幕上每 0.1s 输出一次 GPIO 状态，按下按钮也可以观察到 GPIO 状态被反转。

### 软件模拟外部中断

这个例子演示 pinpong 库中软件模拟外部中断功能的使用，请在 Duo 中创建或使用 SSH 上传 ```irq.py``` 文件。

```irq.py``` 文件内容：

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

在 Duo 开发板 GP0 上接入按钮模块，并在 Duo 终端执行 ```python irq.py``` 。

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

当按钮按下时，您会在屏幕上观察到下降沿事件触发后的信息打印。您也可以通过打开或关闭程序中 ```btn.irq()``` 函数的注释来尝试不同的外部中断事件的实现。

## I2C

### 扫描总线上的设备

这个例子演示如何使用 pinpong 控制 Duo 上的 I2C 扫描总线上连接的设备。请在 Duo 中创建或使用 SSH 上传 ```i2c_scan.py``` 文件。

```i2c_scan.py``` 文件内容：

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

将 I2C 设备接到 Duo 的 I2C0 上，并在终端执行 ```python i2c_scan.py```。

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

程序运行后，I2C 扫描到的设备地址将被打印到屏幕上。

### 通信

这个例子演示如何使用 pinpong 库操作 I2C 发送或读取数据。请在 Duo 上创建或者使用 SSH 上传 ```i2c.py``` 文件。

```i2c.py``` 文件内容：

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

假设 Duo 的 I2C3 上挂载了一个地址为 0x33 的 I2C 设备，您可以使用逻辑分析仪等设备抓取 I2C3 上的电平信号进行分析。在 Duo 终端执行 ```python i2c.py``` 来运行程序。

因为总线上没有挂载地址为 0x33 的 I2C 设备，程序执行后可能返回一些错误信息:

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

## 其他示例

请参考: [github](https://github.com/milkv-duo/duo-buildroot-sdk/tree/develop/buildroot-2021.05/package/python-pinpong/pinpong/examples/milkv-Duo)

:::warning
以上示例没有被验证，可能使用不正常。
:::