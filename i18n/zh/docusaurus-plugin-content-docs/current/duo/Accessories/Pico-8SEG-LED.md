---
sidebar_label: 'Pico-8SEG-LED-数码管'
sidebar_position: 25
---

# 在 Duo S 上使用 Pico-8SEG-LED 数码管

## 硬件连线

Pico-8SEG-LED 的引脚图:https://www.waveshare.net/wiki/Pico-8SEG-LED#.E6.8E.A5.E5.8F.A3.E8.AF.B4.E6.98.8E

```
VSYS —— 3.3V     GND —— GND

RCLK —— PIN50    CLK —— PIN23

DIN —— PIN19
```

## 构建运行环境

参考:https://github.com/milkv-duo/duo-examples


## 编译 C

```

git clone https://github.com/zwyzwm/Pico-8SEG-LED.git

```
下载编译完成之后，运行命令 ` scp shu root@192.168.42.1:/root/ `，将生成的 shu ，复制到登陆终端，运行程序。


## 数码管计数

> -  0000-9999的循环计数

在主函数中，调用函数` LED_8SEG_stopwatch();`，即可实现0000-9999的循环计数。

> - 个位 0-9的循环计数

在主函数中，调用函数` Increment(); `，即可实现个位0-9的循环计数。


