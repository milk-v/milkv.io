---
sidebar_label: '引脚复用'
sidebar_position: 05
---

### Duo的引脚名

<div className='gpio_style'>

| PIN NAME |              Pin#               |              Pin#                | PIN NAME |
| -------- | :-----------------------------: | :------------------------------: | -------- |
| GP0      | <div className='green'>1</div>  |    <div className='red'>40</div> | VBUS     |
| GP1      | <div className='green'>2</div>  |    <div className='red'>39</div> | VSYS     |
| GND      | <div className='black'>3</div>  |  <div className='black'>38</div> | GND      |
| GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |
| GP3      | <div className='green'>5</div>  |    <div className='red'>36</div> | 3V3(OUT) |
| GP4      | <div className='green'>6</div>  |   <div className='gray'>35</div> |          |
| GP5      | <div className='green'>7</div>  |   <div className='gray'>34</div> |          |
| GND      | <div className='black'>8</div>  |  <div className='black'>33</div> | GND      |
| GP6      | <div className='green'>9</div>  |  <div className='green'>32</div> | GP27     |
| GP7      | <div className='green'>10</div> |  <div className='green'>31</div> | GP26     |
| GP8      | <div className='green'>21</div> | <div className='orange'>30</div> | RUN      |
| GP9      | <div className='green'>12</div> |  <div className='green'>29</div> | GP22     |
| GND      | <div className='black'>13</div> |  <div className='black'>28</div> | GND      |
| GP10     | <div className='green'>14</div> |  <div className='green'>27</div> | GP21     |
| GP11     | <div className='green'>15</div> |  <div className='green'>26</div> | GP20     |
| GP12     | <div className='green'>16</div> |  <div className='green'>25</div> | GP19     |
| GP13     | <div className='green'>17</div> |  <div className='green'>24</div> | GP18     |
| GND      | <div className='black'>18</div> |  <div className='black'>23</div> | GND      |
| GP14     | <div className='green'>19</div> |  <div className='green'>22</div> | GP17     |
| GP15     | <div className='green'>20</div> |  <div className='green'>21</div> | GP16     |
|          | &nbsp;                          |                                  |          |
| GP25     | <div className='blue'>LED</div> |                                  |          |

</div>

### 引脚复用配置

注意，Duo 的很多引脚功能是复用的，在使用应用程序(比如 wiringX, pinpong)来控制Duo各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`duo-pinmux`命令来切换为所需功能

直接执行 `duo-pinmux` 命令可以看该命令的使用方法
```
[root@milkv-duo]~# duo-pinmux
pinmux for duo
duo-pinmux -p          <== List all pins
duo-pinmux -l          <== List all pins and its func
duo-pinmux -r pin      <== Get func from pin
duo-pinmux -w pin/func <== Set func to pin
```

比如 Duo 的物理`1`脚，想查看其复用状态，首先要知道该引脚的名字，在上图中已有标注，1脚的名字是`GP0`，查看其复用状态，用`duo-pinmux -r`后面加上引脚名字
```
[root@milkv-duo]~# duo-pinmux -r GP0
GP0 function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[ ] GP0
[v] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
可以看到当前功能为`IIC0_SCL`，是 I2C0 的 SCL 功能，如果要把 1 脚配置成 GPIO，可以通过以下命令设置，`duo-pinmux -w 引脚名字/功能`
```
duo-pinmux -w GP0/GP0
```
此时再次查看该引复用状态
```
[root@milkv-duo]~# duo-pinmux -r GP0
GP0 function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[v] GP0
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
看到已经配置为`GP0`了

同样，如果要配置 1 脚为串口 UART1 的 TX，需执行
```
duo-pinmux -w GP0/UART1_TX
```
检查复用状态
```
[root@milkv-duo]~# duo-pinmux -r GP0
GP0 function:
[ ] JTAG_TDI
[v] UART1_TX
[ ] UART2_TX
[ ] GP0
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
符合预期
