---
sidebar_label: 'pinmux'
sidebar_position: 05
---

### The pin names  for Duo

![duo](/docs/duo/duo-wiringx-pinout-with-pin-name.png)

### Pin multiplexing configuration

Many of Duo's pins have multipurpose functionality. When using applications (such as wiringX, pinpong) to control the functions of each pin, it is important to confirm the current state of the pin to ensure it matches the desired functionality. If it doesn't, you can use the `cvi_pinmux` command to switch it to the desired function

Executing the `cvi_pinmux` command directly allows you to view the usage instructions
```
[root@milkv]~# cvi_pinmux
cvi_pinmux for cv180x
./cvi_pinmux -p          <== List all pins
./cvi_pinmux -l          <== List all pins and its func
./cvi_pinmux -r pin      <== Get func from pin
./cvi_pinmux -w pin/func <== Set func to pin
```

To check the multiplexing status of a specific pin, such as pin 1 on Duo, you need to know the name of that pin. As indicated in the diagram above, the name of pin 1 is `IIC0_SCL`. To view its multiplexing status, use the command `cvi_pinmux -r` followed by the pin name
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
You can see that the current function is `XGPIOA_28`, indicating it is configured as a GPIO. If you want to configure pin 1 as the TX pin for UART1, you can use the following command: `cvi_pinmux -w pin_name/function`
```
cvi_pinmux -w IIC0_SCL/UART1_TX
```
Now, check the multiplexing status of the pin again
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
You can see that it has been configured as `UART1_TX` now

Similarly, to configure pin 1 as the SCL pin for I2C0, you need to execute
```
cvi_pinmux -w IIC0_SCL/IIC0_SCL
```
Check the multiplexing status
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
It meets the expectation
