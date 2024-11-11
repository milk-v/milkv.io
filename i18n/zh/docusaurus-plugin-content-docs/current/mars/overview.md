---
sidebar_label: '🌍 概述'
sidebar_position: 1
---

# Mars

## 简介

Milk-V Mars 是一款高性能的 RISC-V 单板计算机（SBC），只有信用卡大小，基于 StarFive JH7110 设计。这个四核设备支持可拆卸的 eMMC 模块，以及高达 8GB 的 LPDDR4 内存。该板配备了三个USB 3.0 端口，一个 USB 2.0 端口，一个支持 4K 分辨率的 HDMI 2.0 端口，一个支持 PoE（以太网供电）的 RJ45 以太网端口，以及一个用于 WIFI/BT 模块的 E-Key 插槽。它还包括一个 2 Lane 的 MIPI CSI 和一个 4 Lane 的 MIPI DSI，以及一个 40 PIN 的 GPIO。

<Image src='/docs/mars/mars.webp' maxWidth='100%' align='left' />

## 规格

| Milk-V Mars  | Specification                                       |
| ------------ | --------------------------------------------------- |
| SoC          | Starfive JH7110 64bit SoC with RV64GC, up to 1.5GHz |
| Memory       | LPDDR4 1GB / 2GB / 4GB / 8GB                        |
| Storage      | 1x eMMC Slot                                        |
|              | 1x Micro SD Slot                                    |
|              | 1x SPI Flash for bootloader                         |
| Video output | 1x HDMI                                             |
|              | 1x mipi DSI(2-lane)                                 |
|              | 1x mipi DSI(4-lane)                                 |
|              | Max dual display output: 1 HDMI + 1 MIPI DSI        |
| Multimedia   | 1x MIPI CSI(2-lane)                                 |
|              | H.264 & H.265 4K@60fps Decoding                     |
|              | H.265 1080p@30fps Encoding                          |
|              | JPEG encoder/decoder                                |
| Connectivity | 1x RJ45 Gigabit Ethernet                            |
|              | 3x USB3 + 1x USB2                                   |
|              | 1x M.2 E-Key                                        |
| Power        | USB-C port 5V DC (minimum 3A+)                      |
|              | GPIO Power in, 5V DC via GPIO header (minimum 3A+)  |
|              | PoE                                                 |
| GPIO         | 40 Pin GPIO Header,up to 28x GPIO, supporting 3.3V  |
| Dimensions   | 85mm x 56mm                                         |
| Button       | 1x Recovery botton                                  |
| Others       | 2 Pin 5V slot for FAN                               |

## 特性

- A 64-bit System-on-Chip (SoC) with RV64GC architecture, clocking up to 1.5GHz
- Support for a removable eMMC module
- Equipped with a Gigabit Ethernet port, PoE (Power over Ethernet) capable
- Memory configuration up to 8GB LPDDR4
- Features 3 USB 3.0 ports
- Comes with 1 USB 2.0 port
- Supports 1 4K HDMI 2.0 display output
- Includes 2 MIPI DSI interfaces
- Supports M.2 E-Key WIFI/BT module
- Comes with a 40-pin GPIO interface

## 硬件

### SoC

**Starfive JH7110** has the following 
- RISC-V U74 quad-core and S7 monitor core with 2 MB L2 cache
- Support Linux OS with kernel versions 5.10 and 5.15
- CPU work frequency up to 1.5 GHz
- GPU IMG BXE-4-32
- 32-bit LPDDR4/DDR4/LPDDR3/DDR3, up to 2,800 Mbps
- Video decoder supports up to 4K@60fps and multi-stream for H.264/H.265
- Video encoder supports up to 1080p@30fps and multi-stream for H.265
- Provide JPEG encoder/decoder
- Support up to 1080p@30fps full-functional ISP
- Support video input: 1 × DVP and 1 × MIPI-CSI with 4D2C up to 4K@30fps
- Support video output: MIPI display output with 4D1C up to 1080p@60fps
- Support 1 × HDMI2.0 port display up to 4K@30fps
- Support 24-bit RGB parallel interface up to 1080p@30fps
- Support 2 × PCIe2.0, 1 lane
- Support USB3.0 Host/Device (By reusing 1 of the PCIe2.0 lanes)
- Support 2 × Ethernet MAC 1000 Mbps, 2 × CAN2.0B
- Support IEEE 1588-2002 and IEEE 1588-2008 standards
- Support TRNG and support OTP, DMA, QSPI, and other peripherals
- Audio DSP supports floating-point instructions
- Dedicated audio processing and sub-system

#### GPU

The GPU of JH7110 has the following 
- IMG BXE-4-32 MC1 with work frequency up to 600 MHz (400 MHz by default)
- Fully compliant with the following APIs:
    - Support OpenCL 3.0
    - Support OpenGL ES 3.2
    - Support Vulkan 1.2
- Tile-based deferred rendering architecture for 3D graphics workloads, with concurrent processing of multiple tiles
- Programmable high-quality image anti-aliasing
- Fine-grain triangle culling
- Support for DRM security
- Support for GPU visualization
    - Up to 8 virtual GPUs
    - Support for IMG Hyper-Lane technology, with 8 hyper-lanes available
    - Separate IRQs per OSID
- Multi-threaded Unified Shading Cluster (USC) engine incorporating pixel shader, vertex shader, and GP-GPU (compute shader) functionality
- USC incorporates an ALU architecture with high SIMD efficiency
- Fully virtual memory addressing (up to 64 GB address space), supporting unified memory architecture
- Fine-grained task switching, workload balancing, and power management
- Advanced DMA driven operation for minimum host CPU interaction
- System Level Cache (SLC)
- Specialized Texture Cache Unit (TCU)
- Compressed texture decoding
- Lossless and/or visually lossless low area image compression - the Imagination
- frame buffer compression and decompression (TFBC) algorithm
- Dedicated processor for B-Series core firmware execution
    - Single-threaded firmware processor with a 2 KB instruction cache and a 2 KB data cache.

### 内存

**Milk-V Mars** 提供 2GB / 4GB / 8GB 内存大小选择。内存规格为 LPDDR4 2800MT/s。

### 外设支持列表

Mars 外设支持列表：[https://milkv.io/zh/docs/mars/support-lists](https://milkv.io/zh/docs/mars/support-lists)。

### 支持

如需支持，您可以在 [Milk-V Mars](https://community.milkv.io/c/mars) 社区发布您的问题。
