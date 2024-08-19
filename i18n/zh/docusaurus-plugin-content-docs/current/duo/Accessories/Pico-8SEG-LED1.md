---
sidebar_label: 'Pico-8SEG-LED-数码管'
sidebar_position: 25
---

# 在 Duo S 上使用 Pico-8SEG-LED 数码管

## 硬件连接

Pico-8SEG-LED 引脚图：https://www.waveshare.net/wiki/Pico-8SEG-LED#.E6.8E.A5.E5.8F.A3.E8.AF.B4.E6.98.8E

```
VSYS —— 3.3V GND —— GND

RCLK —— PIN50 CLK —— PIN23

DIN —— PIN19
```

## 搭建运行环境

参考：https://github.com/milkv-duo/duo-examples

## 编译 c

```

git clone https://github.com/zwyzwm/Pico-8SEG-LED.git

```
下载并编译完成后，运行命令`scp shu root@192.168.42.1:/root/`，将生成的shu复制到登录终端，运行程序即可。

##数码管计数

>-0000-9999循环计数

在主函数中调用函数`LED_8SEG_stopwatch();`实现0000-9999循环计数。

>-个位0-9循环计数

在主函数中调用函数`Increment();`实现个位0-9循环计数。