---
sidebar_label: 'pinpong'
sidebar_position: 20
---

# 简介

pinpong 库是一套控制开源硬件主控板的 Python 库，基于 Firmata 协议并兼容 MicroPython 语法，借助于 pinpong 库，直接用 Python 代码就能给各种常见的开源硬件编程

# 用法

## 引脚序号

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
| 8       | GP8      | <div className='green'>21</div> | <div className='orange'>30</div> | RUN      |         |
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

这是一个让 Duo 板载 LED 闪烁的例子，可以直接在 Duo 中新建 `blink.py` 文件，或者在电脑中创建好之后通过 ssh 上传到 Duo 中。

:::tip
LED 引脚的序号是 25，如果使用其他引脚外接 LED，序号请参考上面的表格
:::

`blink.py` 文件的内容：
```python
# -*- coding: utf-8 -*-

# 实验效果：控制 Milk-V Duo 板载 LED 灯一秒闪烁一次

import time
from pinpong.board import Board,Pin

Board("MILKV-DUO").begin()  #初始化，选择板型，不输入板型则进行自动识别

led = Pin(Pin.D25, Pin.OUT) #引脚初始化为电平输出

while True:
  led.value(1)   #输出高电平
  print("1")     #终端打印信息
  time.sleep(1)  #等待1秒 保持状态

  led.value(0)   #输出低电平
  print("0")     #终端打印信息
  time.sleep(1)  #等待1秒 保持状态
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

注意:
当前 Duo 的默认固件上电后 LED 会自动闪烁，这个是通过开机脚本实现的，在测试该 blink 例子的时候，需要将 LED 闪烁的脚本禁用，在 Duo 的终端中执行：
```bash
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不闪了
测试完我们 blink 程序后，如果需要恢复 LED 闪烁脚本，再将其名字改回来，重启即可：
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

## I2C