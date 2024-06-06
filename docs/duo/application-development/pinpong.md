---
sidebar_label: 'pinpong'
sidebar_position: 20
---

# Introduction

The pinpong library is an open-source python library that is based on the firmata protocol and utilizes micropython syntax. Its primary objective is to provide developers with a tool that allows them to directly control various open-source hardware control boards through Python code. 

# Usage

## Pin numbers

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

This is an example of making the Duo onboard LED blink. You can create a new `blink.py` file directly in Duo, or create it on your computer and then upload it to Duo via ssh.

:::tip
The Pin number of the LED is 25. If you use other pins to connect external LEDs, please refer to the table above for the Pin number.
:::

Contents of the `blink.py` file:
```python
# -*- coding: utf-8 -*-

import time
from pinpong.board import Board,Pin

Board("MILKV-DUO").begin()

led = Pin(Pin.D25, Pin.OUT)

while True:
  led.value(1)
  print("1")
  time.sleep(1)

  led.value(0)
  print("0")
  time.sleep(1)
```

Execute the `python blink.py` command in Duo's terminal:
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
You will see the LED blinking at 1 second intervals.

**Note**:
To test the `blink.py` example, which involves LED blinking, you need to disable the script responsible for the automatic LED blinking on the default firmware of Duo. In the Duo terminal, execute the following command:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
This command renames the LED blinking script. After restarting Duo, the LED will no longer blink.

Once you have finished testing the `blink.py`, if you want to restore the LED blinking script, you can rename it back using the following command and then restart Duo:
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

## Other examples

Please refer to: [github](https://github.com/milkv-duo/duo-buildroot-sdk/tree/develop/buildroot-2021.05/package/python-pinpong/pinpong/examples/milkv-Duo)
