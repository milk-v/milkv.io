---
sidebar_label: 'pinmux'
sidebar_position: 05
---

### The pin names  for Duo

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

### Pin multiplexing configuration

Many of Duo's pins have multipurpose functionality. When using applications (such as wiringX, pinpong) to control the functions of each pin, it is important to confirm the current state of the pin to ensure it matches the desired functionality. If it doesn't, you can use the `duo-pinmux` command to switch it to the desired function

Executing the `duo-pinmux` command directly allows you to view the usage instructions
```
[root@milkv-duo]~# duo-pinmux
pinmux for duo
duo-pinmux -p          <== List all pins
duo-pinmux -l          <== List all pins and its func
duo-pinmux -r pin      <== Get func from pin
duo-pinmux -w pin/func <== Set func to pin
```

To check the multiplexing status of a specific pin, such as pin 1 on Duo, you need to know the name of that pin. As indicated in the diagram above, the name of pin 1 is `GP0`. To view its multiplexing status, use the command `duo-pinmux -r` followed by the pin name
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
You can see that the current function is `IIC0_SCL`, indicating it is configured as the SCL pin for I2C0. If you want to configure pin 1 as a GPIO, you can use the following command: `duo-pinmux -w pin_name/function`
```
duo-pinmux -w GP0/GP0
```
Now, check the multiplexing status of the pin again
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
You can see that it has been configured as `GP0` now

Similarly, to configure pin 1 as the TX pin for UART1, you need to execute
```
duo-pinmux -w GP0/UART1_TX
```
Check the multiplexing status
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
It meets the expectation
