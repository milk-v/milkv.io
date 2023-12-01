---
sidebar_label: '🌍 概述'
sidebar_position: 1
---

# Duo

1.2 版本

-------------------------
# 简介
Milk-V Duo是一个基于CV1800B芯片的超紧凑嵌入式开发平台。它可以运行Linux和RTOS，为专业人士、工业ODM、AIoT爱好者、DIY爱好者和创作者提供了一个可靠、低成本和高性能的平台。  
  
![duo](/docs/duo/duo-v1.2.png)

# 规格
| Milk-V Duo | 规格                                                    |
| ---------- | ------------------------------------------------------- |
| 处理器     | CVITEK CV1800B (C906@1Ghz + C906@700MHz)                |
| 内存       | DDR2 64MB                                               |
| Storage    | 1x Mirco SD slot,1x SD NAND solder pad                  |
| USB        | 1x Type-C for data and Power,1x USB2 solder pad         |
| 摄像       | 1x 16P FPC connector (MIPI CSI 2-lane)                  |
| 芯片       | up to 26 Pins available for general purpose I/O（GPIO） |
| 尺寸       | 21mm*51mm                                               |


# 特点 

## 处理器
- 1GHz和700MHz的RISC-V C906处理器
- 集成CVITEK TPU，用于智能检测。
- 支持H.264/H.265视频编码，最高可达2880x1620@20fps。
- 与高清晰度CMOS传感器兼容。
- 可编程的频率输出用于传感器时钟。
- 全面的ISP功能，用于图像优化。
- 部分OpenCV库支持CV硬件加速。
- 16位音频编解码器，内置麦克风输入和输出功能。
- 灵活的网络配置，有1个以太网PHY。

## CSI-2 (MIPI串行摄像头)
- 具有一个16针FPC接口，用于2-lane MIPI摄像头输入。
- 在1.8V电压水平上操作I2C、CLK和RST信号。

## 以太网
- Milk-V Duo包括带有100Mbps PHY的CV1800B芯片。
- PHY与一个5-pin的焊盘相连。
- 使用以太网时，需要外部变压器和RJ45插座。

## USB
- 符合USB 2.0标准，向后兼容USB 1.1。
- 支持各种速度模式、主机/设备功能和传输协议。
- 可通过USB集线器扩展接口（多达127个设备）。
- 省电模式，支持HID设备。
- 用可配置的软件作为USB从属设备的功能 。
- 用于存储媒体访问的USB Type-C。

## 微型SD
- SDIO0与安全数字存储器（SD 3.0）协议兼容。

## 芯片 
- MilkV-Duo 40针针座上有多达26个GPIO引脚，可以访问内部外设，如SDIO、I2C、PWM、SPI、J-TAG和UART。
- Up to 3x I2C
- Up to 5x UART
- Up to 1x SDIO1
- Up to 1x SPI
- Up to 2x ADC
- Up to 7x PWM
- Up to 1x RUN
- Up to 1x JTAG  
![pinoutv1.2](/docs/duo/pinout.webp)


## 电路板规格
- Single-sided PCB
- Dimensions: 51×21mm
- Thickness: 1mm
- Type-C port located on the top edge
- Dual castellated/through-hole pins around the remaining edges
- Can be used as a surface mount module or in Dual Inline Package (DIP) format
- 40 main user pins on a 2.54mm (0.1") pitch grid with 1mm holes
- Compatible with veroboard and breadboard

## 快速启动
[镜像下载](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

[如何编译镜像](https://milkv.io/zh/docs/duo/getting-started/buildroot-sdk)

## 支持
获得更多支持，请将您的问题发布在 [Milk-V Community Duo Category](https://community.milkv.io/c/duo/5).
