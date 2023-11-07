---
sidebar_label: '设置'
sidebar_position: 20
---

# 配置工作环境

## 使用串口

### USB 转串口线连接

常见的 USB 转 TTL 线的引脚定义如下：

![usb2ttl](/docs/mars/usb2ttl.png)

### 连接串口

如下所示连接 USB 转 TTL 串口线，不要连接红色的供电线

| Milk-V Mars  | <---> | USB to TTL |
| ------------ | ----- | ---------- |
| GND (pin 6)  | <---> | Black wire |
| TX  (pin 8)  | <---> | White wire |
| RX  (pin 10) | <---> | Green wire |

![mars-serial](/docs/mars/mars-serial.png)

Mars 默认的串口参数如下：

```
   baudrate: 115200
   data bit: 8
   stop bit: 1
   parity  : none
   flow control: none
```
