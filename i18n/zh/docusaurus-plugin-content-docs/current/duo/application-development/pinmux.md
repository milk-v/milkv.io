---
sidebar_label: '引脚复用'
sidebar_position: 05
---

注意，Duo 系列的很多引脚功能是复用的，在使用应用程序(比如 wiringX, pinpong)来控制 Duo/Duo256M/DuoS 各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`duo-pinmux`命令来切换为所需功能。

### Duo/Duo256M 的引脚名

Duo 引脚可复用的功能请参考：[Duo GPIO 引脚分配](https://milkv.io/zh/docs/duo/getting-started/duo#duo-gpio-%E5%BC%95%E8%84%9A%E5%88%86%E9%85%8D)

Duo256M 引脚可利用的功能请参考：[Duo256M GPIO 引脚分配](https://milkv.io/zh/docs/duo/getting-started/duo256m#duo256m-gpio-%E5%BC%95%E8%84%9A%E5%88%86%E9%85%8D)

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

### DuoS 的引脚名

DuoS 引脚可复用的功能请参考：[DuoS GPIO 引脚分配](https://milkv.io/zh/docs/duo/getting-started/duos#duos-gpio-%E5%BC%95%E8%84%9A%E5%88%86%E9%85%8D)

#### 排针 J3

`排针 J3` 上的 GPIO 使用 3.3V 逻辑电平。

<div className='gpio_style' style={{ overflow :"auto"}} >

| PIN NAME | PIN#                             | PIN#                            | PIN NAME |
|:---------|:--------------------------------:|:-------------------------------:|:---------|
| 3V3      | <div className='orange'>1</div>  | <div className='red'>2</div>    | VSYS(5V) |
| B20      | <div className='green'>3</div>   | <div className='red'>4</div>    | VSYS(5V) |
| B21      | <div className='green'>5</div>   | <div className='black'>6</div>  | GND      |
| B18      | <div className='green'>7</div>   | <div className='green'>8</div>  | A16      |
| GND\*    | <div className='black'>9</div>   | <div className='green'>10</div> | A17      |
| B11      | <div className='green'>11</div>  | <div className='green'>12</div> | B19      |
| B12      | <div className='green'>13</div>  | <div className='black'>14</div> | GND      |
| B22      | <div className='green'>15</div>  | <div className='green'>16</div> | A20      |
| 3V3      | <div className='orange'>17</div> | <div className='green'>18</div> | A19      |
| B13      | <div className='green'>19</div>  | <div className='black'>20</div> | GND      |
| B14      | <div className='green'>21</div>  | <div className='green'>22</div> | A18      |
| B15      | <div className='green'>23</div>  | <div className='green'>24</div> | B16      |
| GND      | <div className='black'>25</div>  | <div className='green'>26</div> | A28      |

</div>

*GND\*：引脚 9 在 DuoS V1.1 版本硬件中是一个低电平的 GPIO，在 V1.2 及更高版本硬件中为 GND。*

#### 排针 J4

`排针 J4` 上的 GPIO 使用 1.8V 逻辑电平。

该排针上的大部分引脚都有其专用功能，如 MIPI DSI 信号，触摸屏信号以及音频信号，如非特殊需求，不建议使用该排针上的引脚做为 GPIO 使用。

<div className='gpio_style' style={{ overflow :"auto"}} >

| PIN NAME | PIN#                            | PIN#                             | PIN NAME    |
|----------|:-------------------------------:|:--------------------------------:|:------------|
| VSYS(5V) | <div className='red'>52</div>   | <div className='blue'>51</div>   | AUDIO_OUT_R |
| B1       | <div className='green'>50</div> | <div className='blue'>49</div>   | AUDIO_OUT_L |
| B2       | <div className='green'>48</div> | <div className='blue'>47</div>   | AUDIO_IN_R  |
| B3       | <div className='green'>46</div> | <div className='blue'>45</div>   | AUDIO_IN_L  |
| E2       | <div className='green'>44</div> | <div className='orange'>43</div> | 3V3         |
| E1       | <div className='green'>42</div> | <div className='green'>41</div>  | C18         |
| E0       | <div className='green'>40</div> | <div className='green'>39</div>  | C19         |
| GND      | <div className='black'>38</div> | <div className='black'>37</div>  | GND         |
| C20      | <div className='green'>36</div> | <div className='green'>35</div>  | C16         |
| C21      | <div className='green'>34</div> | <div className='green'>33</div>  | C17         |
| GND      | <div className='black'>32</div> | <div className='black'>31</div>  | GND         |
| C14      | <div className='green'>30</div> | <div className='green'>29</div>  | C12         |
| C15      | <div className='green'>28</div> | <div className='green'>27</div>  | C13         |

</div>

### 引脚复用配置

以下以 Duo 为例介绍如何配置引脚复用。Duo256M 中使用的引脚名与 Duo 一致，DuoS 中使用的引脚名不同，参考上面表格。

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
