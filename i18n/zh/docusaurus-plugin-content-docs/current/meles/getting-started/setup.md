---
sidebar_label: '设置'
sidebar_position: 20
---

# 设置工作环境

## 使用串行控制台

### USB 转 TTL 串行电缆

USB 转 TTL 电缆的每个引脚定义如下：

![usb2ttl](/docs/meles/usb2ttl.png)

### 连接

如下图所示连接 USB 至 TTL 串行电缆。不要连接红线！

| Milk-V Mars  | \<---> | USB to TTL |
| ------------ | ------ | ---------- |
| GND (pin 6)  | \<---> | Black wire |
| TX  (pin 8)  | \<---> | White wire |
| RX  (pin 10) | \<---> | Green wire |

![meles-serial](/docs/meles/meles-serial.png)

Meles 控制台的默认串行设置为：

```
波特率: 115200
数据位: 8
停止位: 1
奇偶校验  : none
流控: none
```