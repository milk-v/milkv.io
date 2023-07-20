---
sidebar_label: '🌍 Overview'
sidebar_position: 1
---

# Mars

Version 1.0 

-------------------------
## Introduction
Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. This four-core device supports a plug-and-play eMMC module, as well as up to 8GB of LPDDR4 memory. The board is equipped with three USB 3.0 ports, one USB 2.0 port, an HDMI 2.0 port that supports 4K resolution, an RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO.  
  
![mars](/docs/mars/mars.webp)

## Specification
| Milk-V Mars  | Specification                                       |
|--------------|-----------------------------------------------------|
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

## Features 

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

## Hardware
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

### Memory
**Milk-V Mars** offers a choice of 2GB / 4GB / 8GB memory sizes.  
The memory specification is LPDDR4 2800MT/s.

### Camara for MIPI CSI 
Milk-V Mars supports the following 

| Manufacturer | Type specification | Description            |
|--------------|--------------------|------------------------|
| Sony         | IMX219             | 8MP sensor(crop 1080p) |

### Display for MIPI DSI
Milk-V Mars supports the following 

| Manufacturer | Type specification | Description            |
|--------------|--------------------|------------------------|
| Waveshare         | 4.3inch DSI LCD             | 2-Lane 4.3 inch 800x480 |
| Waveshare         | 7inch DSI LCD             | 2-Lane 7 inch 800x480 |
| Waveshare         | 5inch DSI LCD             | 2-Lane 5 inch 800x480 |
| Radxa         | Radxa Display 8 HD             | 4-Lane 8 inch 800x1280 |

### UVC Camera
Milk-V Mars supports the following 

| Manufacturer | Type specification | Description            |
|--------------|--------------------|------------------------|
| Logitech          | Logitech C270             | 720p |
| Logitech          | Logitech C920             | 1080p |

### Support
For support please post your issue on the [Milk-V Community Mars Category](https://community.milkv.io/c/mars).
