---
sidebar_label: '引脚复用'
sidebar_position: 05
---

### Duo的引脚名

![duo](/docs/duo/duo-wiringx-pinout-with-pin-name.png)

### 引脚复用配置

注意，Duo的很多引脚功能是复用的，在使用应用程序(比如wiringX,pinpong)来控制Duo各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`cvi_pinmux`命令来切换为所需功能

直接执行cvi_pinmux命令可以看该命令的使用方法
```
[root@milkv]~# cvi_pinmux
cvi_pinmux for cv180x
./cvi_pinmux -p          <== List all pins
./cvi_pinmux -l          <== List all pins and its func
./cvi_pinmux -r pin      <== Get func from pin
./cvi_pinmux -w pin/func <== Set func to pin
```

比如Duo的物理1脚，想查看其复用状态，首先要知道该引脚的名字，在上图中已有标注，1脚的名字是`IIC0_SCL`，查看其复用状态，用`cvi_pinmux -r`后面加上引脚名字
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[v] XGPIOA_28
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
可以看到当前功能为`XGPIOA_28`，是GPIO功能，如果要把1脚配置成串口UART1的TX，可以通过以下命令设置，`cvi_pinmux -w 引脚名字/功能`
```
cvi_pinmux -w IIC0_SCL/UART1_TX
```
此时再次查看该引复用状态
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[v] UART1_TX
[ ] UART2_TX
[ ] XGPIOA_28
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
看到已经配置为`UART1_TX`了

同样，如果要配置1脚为I2C0的SCL，需执行
```
cvi_pinmux -w IIC0_SCL/IIC0_SCL
```
检查复用状态
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[ ] XGPIOA_28
[v] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
符合预期
