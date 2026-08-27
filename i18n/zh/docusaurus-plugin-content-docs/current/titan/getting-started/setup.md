---
sidebar_label: '常用设置'
sidebar_position: 20
---

# 常用设置

## 使用串口控制台

Titan 主板集成了基于 CH340 芯片的 USB Type-C 转 TTL 串口，无需使用额外的 USB 转 TTL 模块。通过串口控制台可以查看系统启动日志，也可以在系统启动后登录命令行控制台。

使用支持数据传输的 USB Type-C 线，将靠近 DC 电源接口的调试 Type-C 口连接至电脑。连接后，电脑应识别到一个 CH340 串口设备。如果未识别到该设备，请安装与电脑操作系统对应的 CH340 驱动。

使用串口终端软件打开识别到的串口，并设置以下参数：

```text
baudrate: 115200
data bit: 8
stop bit: 1
parity: none
flow control: none
```

为 Titan 上电后即可查看启动日志。系统启动完成后，按 `Enter` 键激活控制台。
