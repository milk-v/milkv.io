---
sidebar_label: 'Pico-8SEG-LED-数码管'
sidebar_position: 25
---

# 在 Duo S 上使用 Pico-8SEG-LED 数码管

## 工作原理

使用SPI通信接口，74HC595芯片，包含一个8位串行输入与并行输出移位寄存器并提供一个8位D型存储寄存器，该存储寄存器具有8位3三态输出。分别提供独立的时钟信号给移位寄存器和存储寄存器,移位寄存器具有直接清零功能和串行输入输出功能以及级联应用.(采用标准引脚。)移位寄存器和存储寄存器均为使用正边缘时钟触发，如果这两个时钟连接在一起，移位寄存器始终在存储寄存器的前一个时钟脉冲。所有输入端口均设有防静电及瞬间过压保护电路。

## 硬件连接

Pico-8SEG-LED 引脚图：

<Image src='/docs/duo/duos/Accessories/Pico-8SEG-LED.webp' maxWidth='50%' align='center' />

| 连接名称 | VSYS | GND | RCLK | CLK  | DIN  |
|----------|------|-----|------|------|------|
| 连接引脚 | 3.3V | GND | PIN50| PIN23| PIN19|

## 搭建运行环境

参考：https://github.com/milkv-duo/duo-examples

## 编译 c

```
git clone https://github.com/zwyzwm/Pico-8SEG-LED.git
```
下载并编译完成后，运行命令`scp shu root@192.168.42.1:/root/`，将生成的shu复制到登录终端，运行程序即可。

## 数码管计数

> - 0000-9999循环计数

在主函数中调用函数`LED_8SEG_stopwatch();`实现0000-9999循环计数。


