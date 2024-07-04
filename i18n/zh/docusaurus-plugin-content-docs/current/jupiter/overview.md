---
sidebar_label: '🌍 概述'
sidebar_position: 1
---

# Milk-V Jupiter

## 简介

Milk-V Jupiter 是一款基于 Spacemit K1/M1 的 Mini-ITX 设备。该设备集成了标准 PCIe X8 插槽，支持常见 PCIe 设备，如显卡、PCIe 转 SATA 转接卡、网卡；双千兆以太网接口；板载 WI-FI6/BT5.2 模组；支持 NVMe SSD，是入门级 RISC-V Desktop 首选。

<Image src='/docs/jupiter/jupiter-overview.webp' maxWidth='100%' align='left' />

## 硬件规格

 Milk-V Jupiter | 详细规格
----------------|---------------------------------------------------------
 SoC            | SPACEMIT K1/M1, Otca-core X60™(RV64GCVB), RVA22, RVV1.0
 AI算力          | 2.0TOPS
 内存            | 4GB / 8GB / 16GB LPDDR4X
 GPU            | IMG BXE-2-32@819MHz, 32KB SLC <br> OpenGL ES 1.1/3.2 <br> EGL1.5 <br> OpenCL 3.0 <br> Vulkan 1.3
 多媒体能力       | 支持 3D 图形引擎，与 OpenCL 3.0、OpenGLES 3.2 和 Vulkan 1.2 兼容 <br> 支持 4K H.265/H.264/VP9/VP8 和其他编码/解码格式 <br> 支持立体声输出
 存储            | 1x SPI Flash&nbsp;（作启动介质之一）<br> 1x M.2 M Key 连接器支持&nbsp;M.2 NVMe SSD (PCIe 2.1&nbsp;x2) <br> 1x eMMC&nbsp;模块连接器 <br> 1x microSD 插槽
 以太网          | 2 x 千兆 RJ45 端口，支持 PoE（需要额外的 PoE 模块）
 无线            | 板载 WI-FI6/BT5.2
 USB            | 2x USB 3 Type-A HOST 接口 <br> 2x USB 2 Type-A HOST 接口 <br> 1x Type-C (USB2 OTG, 可作固件烧录使用)，支持 PD 供电 <br> 2x 前面板 USB 3.0&nbsp; <br> 2x 前面板 USB 2.0&nbsp;‍
 视频输出         | 1x 标准 HDMI，最高支持 1920x1440@60Hz
 音频            | 1x 耳机插孔 <br> 1x 麦克风插孔
 PCIe           | 1x PCIe x8 插槽（PCIe 2.1，2 通道），支持显卡
 其他            | 1x PWM 风扇接口 <br> 1x RTC 电池座子(CR1220 规格) <br> 1x 前面板控制与状态接口（支持 开关机&nbsp;/ 重启，支持&nbsp;状态灯&nbsp;/ 电源灯） <br> 1x SoC Uart Debug(3P) <br> 1x Debug(4P)
 电源            | 1x 12V 直流电源插孔（55x25mm）<br> 1x 标准 24 针 ATX 电源接 <br> 1x Type-C PD 供电
 操作系统         | 支持&nbsp;Ubuntu&nbsp;/ Fedora / Bianbu
 尺寸            | 170mm x 170 mm（标准Mini-ITX形态）

## 硬件接口说明

