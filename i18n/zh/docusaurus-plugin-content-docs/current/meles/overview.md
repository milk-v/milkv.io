---
sidebar_label: '🌍 概述'
sidebar_position: 4
---

# Meles

版本 1.0 

-------------------------
## 简介
Milk-V Meles 是一款基于 TH1520 的信用卡大小的单板计算机（SBC）。它拥有四个 RISC-V 64GCV C910 核心，最高可运行频率2.0GHz。Meles 包含了丰富的接口和强大的计算和人工智能能力，是爱好者、工业制造商、工程师、教师和学生的理想 RISC-V 智能硬件平台。
  
  
![meles](/docs/meles/meles.webp)
![meles-top](/docs/meles/meles-top.webp)
![meles-bot](/docs/meles/meles-bot.webp)

## Specification
| Milk-V Meles | 规格                                                                          |
| ------------ | -------------------------------------------------------------------------------------- |
| 核心         | T-Head TH1520, 四核心 RISC-V 64GCV C910, 最高 2.0GHz                               |
| 内存       | 8GB / 16GB LPDDR4X, 4266 MT/s                                                          |
| 储存      | 1x eMMC 插槽                                                                           |
|              | 1x MicroSD 插槽                                                                        |
| 显示      | 1x HDMI 2.0, 最高 4K@60FPS                                                            |
|              | 1x MIPI DSI 4-lanes, 支持触摸屏                                             |
| 音频        | 1x HDMI 2.0 带音频输出                                                          |
|              | 1x I2S, 支持音频输入和输出                                                |
|              | 1x 3.5mm 插槽，支持音频输出                                                        |
| 相机       | 1x 4-lanes MIPI CSI 输入                                                              |
|              | 1x 2-lanes MIPI CSI 输入                                                              |
| USB          | 4x 主机 USB3.0                                                                         |
|              | 1x 从机 USB2.0 (Type-C)                                                              |
| 网络接口     | 1x 10/100/1000 Mbps RJ45 端口                                                          |
| 无线     | AP6256 (WI-FI 5 / BT 5.2)                                                              |
| GPIO         | 40 Pin GPIO 插头, 最多有 3xUART, 2xI2C, 1xSPI, 1xI2S,1xADC, 8xGPIO, 1xC910 调试接口 |
| 按键          | 1x 复位按键 (Reset)                                                                    |
|              | 1x 恢复按键 (Recovery)                                                            |
|              | 1x  eMMC / SPI 启动模式切换按键                                            |
| LED          | 1x 电源 LED                                                                           |
|              | 1x 用户 LED                                                                            |
| 其他        | 1x 2Pin 风扇接口                                                                        |

## 硬件
### SoC
**T-Head TH1520** 具有以下特性

| TH1520 | 规格                                                                    |
| ------ | -------------------------------------------------------------------------------- |
| CPU    | RISC-V 64GCV C910*4@**2.0GHz**                                                   |
|        | 每个核心包含 64KB I 缓存 和 64KB D 缓存                                 |
|        | 1MB 共享 L2 缓存                                                           |
|        | 支持 TEE 和 REE, 可以在启动状态下配置                              |
|        | 支持自定义和RISC-V兼容接口的多核调试框架 |
|        | 独立电源域，支持DVFS                                         |
| GPU    | OpenCL 1.1/1.2/2.0                                                               |
|        | OpenGL ES 3.0/3.1/3.2                                                            |
|        | Vulkan 1.1/1.2                                                                   |
|        | Android NN HAL                                                                   |
| NPU    | 支持 4TOPS@INT8, up to 1GHz                                                   |
|        | 支持 TensorFlow、ONNX、Caffe                                                  |
|        | 支持 CNN、RNN、DNN                                                            |
| Decode | Real-time decoder, 支持 H.265/H.264/VP9/8/7/6/AVS/AVS+/AVS2.0/VC1/MPEG4       |
|        | 支持 H.264 BP/MP/HP@level 5.1 解码, 最大支持 4K 分辨率                  |
|        | 支持 H.265/HEVC Main Profile@level 5.1 解码, 最大支持 4K 分辨率         |
|        | 支持 VP9 Profile-2 解码, 最大支持 4K 分辨率                             |
|        | 支持 AVS2.0 解码, 最大支持 4K 分辨率                                    |
|        | 支持 VP6/7/8/AVS/AVS+/VC1/MPEG4 解码, 最大分辨率 1920x1080         |
|        | 最大解码能力 4K@75fps                                                    |
| Encode | 支持 H.264 BP/MP/HP(level4.2) 编码, 最大支持 4K 分辨率                  |
|        | 支持 H.265/HEVC Main Profile 编码, 最大支持 4K 分辨率                   |
|        | 仅支持 I-frames and P-frames                                              |
|        | 最大编码能力 4K@40fps                                                     |

### 内存
**Milk-V Meles** 提供 8GB / 16GB 两种内存大小。  
内存规格 LPDDR4X 4266MT/s 。

## 支持
如需支持，请将您的问题发布在 [Milk-V Community Meles Category](https://community.milkv.io/c/meles)。
