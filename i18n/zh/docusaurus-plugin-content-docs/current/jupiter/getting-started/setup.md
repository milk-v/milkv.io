---
sidebar_label: '常用设置'
sidebar_position: 20
---

# 常用设置

## UART 串口控制台

Jupiter 主板上有预留一个 UART 调试串口，可以查看系统的启动日志，也可以在系统启动后登陆到控制台，执行一些终端命令。

### USB 转串口线

常见的 USB 转 TTL 串口线的引脚定义如下：

<Image src='/docs/jupiter/usb2ttl.webp' maxWidth='100%' align='left' />

### 连接串口

调试串口电平为 3.3V，如下图所示，连接 USB 转 TTL 串口模块，不要连接红色线。

<div className='gpio_style'>

| Milk-V Jupiter  | \<---> | USB 转 TTL 线 |
|:---------------:|:------:|:-------------|
| GND             | \<---> | 黑线          |
| RX              | \<---> | 绿线 (TX)     |
| TX              | \<---> | 白线 (RX)     |

</div>

<Image src='/docs/jupiter/jupiter-usb-to-ttl.webp' maxWidth='100%' align='left' />

Jupiter 默认的串口参数如下：
```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```
