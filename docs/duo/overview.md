---
sidebar_label: '🌍 Overview'
sidebar_position: 1
---

# Duo series 

# Revision history

| Version | Date       | Changes from previous version                 |
| ------- | ---------- | --------------------------------------------- |
| 0.1     | 2023/11/24 | First version                                 |
| 0.2     | 2023/12/15 | Introduction of Duo 256M and Related Products |
| 0.3     | 2023/12/27 | Introduction of Duo S and Related Products    |

--------------------------------------------------------------------------------------------------------
# Introduction
Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.  

The Milk-V Duo 256M is an upgraded version of Duo with a memory boost to 256M, catering to applications demanding larger memory capacities. It features the SG2002 computing series chip, elevating computational power to 1.0TOPS@INT8. It enables seamless switching between RISC-V/ARM architectures and supports simultaneous operation of dual systems. Additionally, it includes an array of rich GPIO interfaces such as SPI, UART, suitable for a wide range of hardware development in edge intelligent monitoring, including IP cameras, smart peephole locks, visual doorbells, and more.

  
![duo](/docs/duo/duo-v1.2.png)

# Specification
|                | Duo                                                     | Duo 256M                                                | Duo S                                                                         |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| SoC            | CVITEK CV1800B                                          | SG2002                                                  | SG2000                                                                        |
| RISC-V CPU     | C906@1Ghz + C906@700MHz                                 | C906@1Ghz + C906@700MHz                                 | C906@1Ghz + C906@700MHz                                                       |
| Arm CPU        | N/A                                                     | 1 x Cortex-A53@1GHz                                     | 1 x Cortex-A53@1GHz                                                           |
| MCU            | 8051@8KB SRAM                                           | 8051@6KB SRAM                                           | 8051@6KB SRAM                                                                 |
| TPU            | 0.5TOPS@INT8                                            | 1Top@INT8                                               | 0.5Top@INT8                                                                   |
| Storage        | 1 x microSD connector or 1x SD NAND on board            | 1 x microSD connector or 1x SD NAND on board            | 1 x microSD connector, 1x eMMC Pad on board                                   |
| Memory         | SIP DRAM 64MB                                           | SIP DRAM 256MB                                          | SIP DRAM 512MB                                                                |
| USB            | 1 x Type-C for power and data, USB Pads available       | 1 x Type-C for power and data, USB Pads available       | 1 x Type-C for power and data or 1x USB 2.0 A Port HOST                       |
| CSI            | 1 x 16P FPC connector (MIPI CSI 2-lane)                 | 1 x 16P FPC connector (MIPI CSI 2-lane)                 | 1x 16P FPC connector (MIPI CSI 2-lane),1x 15P FPC connector (MIPI CSI 2-lane) |
| Sensor Support | 4M @ 25fps                                              | 5M @ 30fps                                              | 5M @ 30fps                                                                    |
| Ethernet       | 100Mbps ethernet with PHY                               | 100Mbps ethernet with PHY                               | 100Mbps ethernet port(RJ45) onboard                                           |
| Wireless       | N/A                                                     | N/A                                                     | WIFI6 / BT5.4 onboard                                                         |
| Audio          | N/A                                                     | Via GPIO Pads                                           | Via GPIO Header                                                               |
| Display        | N/A                                                     | N/A                                                     | Via GPIO Header (MIPI DSI 4-lane)                                             |
| GPIO           | up to 26 Pins available for general purpose I/O（GPIO） | up to 26 Pins available for general purpose I/O（GPIO） | Up to 39x GPIO Pin (Via 2x 26Pin GPIO Header)                                 |
| Power          | 5V/1A                                                   | 5V/1A                                                   | 5V/1A                                                                         |
| OS Support     | Buildroot, RTOS                                         | Buildroot, RTOS                                         | Buildroot, RTOS                                                               |
| Size           | 21mm*51mm                                               | 21mm*51mm                                               | 43mm x 43mm                                                                   |
| Others         | N/A                                                     | N/A                                                     | 1x BOOT swich, 1x Recovery Key, 1x RST Key                                    |


# Features 

## Processor

### CV1800B (Duo)
- 1GHz and 700MHz RISC-V C906 processors
- Integrated CVITEK TPU for smart detection.
- SIP DRAM 64MB
- Supports H.264/H.265 video encoding, up to 2880x1620@20fps.
- Compatible with high-definition CMOS sensors.
- Programmable frequency output for sensor clock.
- Comprehensive ISP features for image optimization.
- Partial OpenCV library support with CV hardware acceleration.
- 16-bit audio codec with built-in mic input and output functions.
- Flexible network configurations with 1 Ethernet PHY.

### SG2002 (Duo 256M)
- 1GHz and 700MHz RISC-V C906 processors
- **Optional T-Head C906@1GHz or Cortex-A53@1GHz**
- Integrated **1TOPS@INT8** TPU for smart detection.
- SIP DRAM 256MB
- Supports H.264/H.265 video encoding, up to **5M@30fps**.
- Compatible with high-definition CMOS sensors.
- Support Multiple storage devices via SPI-NOR, SPI-NAND, eMMC5.0, 2 x SDIO3.0 interfaces
- Comprehensive ISP features for image optimization.
- Partial OpenCV library support with CV hardware acceleration.
- 16-bit audio codec with built-in mic input and output functions.
- 2L MIPI DSI 5M@30fps
- 4L or 2L+2L MIPI CSI 5M@30fps
- Flexible network configurations with 1 Ethernet PHY.
- QFN88

### SG2000 (Duo S)
- 1GHz and 700MHz RISC-V C906 processors
- **Optional T-Head C906@1GHz or Cortex-A53@1GHz**
- Integrated 0.5TOPS@INT8 TPU for smart detection.
- SIP DRAM 512MB
- Supports H.264/H.265 video encoding, up to **5M@30fps**.
- Compatible with high-definition CMOS sensors.
- Support Multiple storage devices via SPI-NOR, SPI-NAND, eMMC5.0, 2 x SDIO3.0 interfaces
- Comprehensive ISP features for image optimization.
- Partial OpenCV library support with CV hardware acceleration.
- 16-bit audio codec with built-in mic input and output functions.
- 2L MIPI DSI 5M@30fps
- 4L or 2L+2L MIPI CSI 5M@30fps
- Flexible network configurations with 1 Ethernet PHY.
- LFBGA

## CSI-2 (MIPI serial camera)
- Features a 16-pin FPC interface for 2-lane MIPI camera input.
- Operates I2C, CLK, and RST signals at a 1.8V voltage level.

## Ethernet
- Milk-V Duo includes CV1800B chip with a 100Mbps PHY.
- PHY is linked to a 5-pin solder pad.
- External transformer and RJ45 socket are needed for Ethernet use.

## USB
- USB 2.0 compliant, backward compatible with USB 1.1.
- Supports various speed modes, Host/Device functionality, and transfer protocols.
- Expandable interfaces via USB Hub (up to 127 devices).
- Power-saving mode, supports HID devices.
- Functions as USB slave device with configurable software.
- USB Type-C for storage media access.

## Micro SD
- SDIO0 is compatible with Secure Digital Memory (SD 3.0) protocol.

## GPIO 
- Up to 26 GPIO pins on the MilkV-Duo 40-pin header provide access to internal peripherals such as SDIO, I2C, PWM, SPI, J-TAG, and UART.
- Up to 3x I2C
- Up to 5x UART
- Up to 1x SDIO1
- Up to 1x SPI
- Up to 2x ADC
- Up to 7x PWM
- Up to 1x RUN
- Up to 1x JTAG  
![pinoutv1.2](/docs/duo/pinout.webp)


## Board Specifications
- Single-sided PCB
- Dimensions: 51×21mm
- Thickness: 1mm
- Type-C port located on the top edge
- Dual castellated/through-hole pins around the remaining edges
- Can be used as a surface mount module or in Dual Inline Package (DIP) format
- 40 main user pins on a 2.54mm (0.1") pitch grid with 1mm holes
- Compatible with veroboard and breadboard

## Quick Start
[Image download](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

[How to build image](https://milkv.io/docs/duo/getting-started/buildroot-sdk)

## Support
For support please post your issue on the [Milk-V Community Duo Category](https://community.milkv.io/c/duo/5).
