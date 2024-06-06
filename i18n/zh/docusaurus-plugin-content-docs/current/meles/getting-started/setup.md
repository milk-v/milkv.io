---
sidebar_label: '设置'
sidebar_position: 20
---

# 搭建工作环境

## 使用串口终端

### USB 转 TTL 串口模块

USB 串口模块的引脚定义如下：

![usb2ttl](/docs/meles/usb2ttl.png)

### 连接

根据下表连接 USB 串口模块和 Meles，不要连接红线。

| Milk-V Meles  | \<---> | USB 串口模块 |
| ------------ | ------ | ---------- |
| GND (pin 6)  | \<---> | 黑线 |
| TX  (pin 8)  | \<---> | 白线 |
| RX  (pin 10) | \<---> | 绿线 |

![mars-serial](/docs/meles/meles-serial.png)

Meles 串口控制台的默认配置为：

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```
