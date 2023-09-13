---
sidebar_label: 'pinpong'
sidebar_position: 20
---

# 简介

pinpong库是一套控制开源硬件主控板的Python库，基于Firmata协议并兼容MicroPython语法，借助于pinpong库，直接用Python代码就能给各种常见的开源硬件编程

# 用法

## 引脚复用配置

注意，Duo的很多引脚功能是复用的，在使用`pinpong`库来控制Duo各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`cvi_pinmux`命令来切换为所需功能

具体方法请参考: [引脚复用配置](https://milkv.io/zh/docs/duo/application-development/wiringx#引脚复用配置)

## GPIO



## I2C