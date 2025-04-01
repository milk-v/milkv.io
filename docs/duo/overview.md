---
sidebar_label: '🌍 Overview'
sidebar_position: 1
---


# Milk-V Duo

# Duo series 

# Revision history

| Version | Date       | Changes from previous version                                      |
| ------- | ---------- | ------------------------------------------------------------------ |
| 0.1     | 2023/11/24 | First version                                                      |
| 0.2     | 2023/12/15 | Introduction of Duo 256M and Related Products                      |
| 0.3     | 2023/12/27 | Introduction of Duo S and Related Products                         |
| 0.4     | 2024/06/25 | Introduction of DuoModule 01 Evaluation Board and Related Products |

--------------------------------------------------------------------------------------------------------
# Introduction
Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.  

The Milk-V Duo 256M is an upgraded version of Duo with a memory boost to 256M, catering to applications demanding larger memory capacities. It features the SG2002 computing series chip, elevating computational power to 1.0TOPS@INT8. It enables seamless switching between RISC-V/ARM architectures and supports simultaneous operation of dual systems. Additionally, it includes an array of rich GPIO interfaces such as SPI, UART, suitable for a wide range of hardware development in edge intelligent monitoring, including IP cameras, smart peephole locks, visual doorbells, and more.

Milk-V Duo S is an upgraded model of Duo, featuring an upgraded SG2000 main controller with a larger 512MB memory and expanded IO capabilities. It integrates wireless capabilities with WI-FI 6/BT 5, and comes equipped with a USB 2.0 HOST interface and a 100Mbps Ethernet port for user convenience. Supporting dual cameras (2x MIPI CSI 2-lane) and MIPI video output (MIPI DSI 4-lane), it allows for versatile applications. The device also supports switching between RISC-V and ARM boot through a switch. With enhanced functionality, Duo S is better suited for a variety of scenarios with more complex project development requirements.

The Duo Module 01 is a compact module with integrated SG2000, WI-FI6/BTDM5.4, and eMMC. It supports SMD mounting. Also it can greatly save product development time. It is the first choice for making products.To enhance your development experience with the Duo Module 01, Milk-V provides the DuoModule 01 Evaluation Board, which is designed to facilitate your development evaluation and provide you with reference designs.

# Specification
|                | [Duo(EOL)](/docs/duo/getting-started/duo)                                 | [Duo 256M](/docs/duo/getting-started/duo256m)                             | [Duo S](/docs/duo/getting-started/duos)                                       | DuoModule 01 Evaluation Board                                                 |
| -------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Overview       | <Image src='/docs/duo/duo-v1.2-top.webp' maxWidth='70%' align='center' /> | <Image src='/docs/duo/duo256m-v1.0.webp' maxWidth='75%' align='center' /> | <Image src='/docs/duo/duos-x1.0.webp' maxWidth='70%' align='center' />        | <Image src='/docs/duo/dm01/dm01-eb.webp' maxWidth='70%' align='center' />     |
| SoC            | CVITEK CV1800B                                                            | SG2002                                                                    | SG2000                                                                        | SG2000                                                                        |
| RISC-V CPU     | C906@1Ghz + C906@700MHz                                                   | C906@1Ghz + C906@700MHz                                                   | C906@1Ghz + C906@700MHz                                                       | C906@1Ghz + C906@700MHz                                                       |
| Arm CPU        | N/A                                                                       | 1 x Cortex-A53@1GHz                                                       | 1 x Cortex-A53@1GHz                                                           | 1 x Cortex-A53@1GHz                                                           |
| MCU            | 8051@8KB SRAM                                                             | 8051@6KB SRAM                                                             | 8051@6KB SRAM                                                                 | 8051@6KB SRAM                                                                 |
| TPU            | 0.5TOPS@INT8                                                              | 1TOPS@INT8                                                                | 0.5TOPS@INT8                                                                  | 0.5TOPSs@INT8                                                                 |
| Storage        | 1 x microSD connector or 1x SD NAND on board                              | 1 x microSD connector or 1x SD NAND on board                              | 1 x microSD connector, 1x eMMC Pad on board                                   | 1 x microSD connector, 1x 8GB eMMC onboard                                    |
| Memory         | SIP DRAM 64MB                                                             | SIP DRAM 256MB                                                            | SIP DRAM 512MB                                                                | SIP DRAM 512MB                                                                |
| USB            | 1 x Type-C for power and data, USB Pads available                         | 1 x Type-C for power and data, USB Pads available                         | 1 x Type-C for power and data or 1x USB 2.0 A Port HOST                       | 1 x Type-C for power and data or 4x USB 2.0 A Port HOST                       |
| CSI            | 1 x 16P FPC connector (MIPI CSI 2-lane)                                   | 1 x 16P FPC connector (MIPI CSI 2-lane)                                   | 1x 16P FPC connector (MIPI CSI 2-lane),1x 15P FPC connector (MIPI CSI 2-lane) | 1x 16P FPC connector (MIPI CSI 2-lane),1x 15P FPC connector (MIPI CSI 2-lane) |
| Sensor Support | 4M @ 25fps                                                                | 5M @ 30fps                                                                | 5M @ 30fps                                                                    | 5M @ 30fps                                                                    |
| Ethernet       | 100Mbps ethernet with PHY                                                 | 100Mbps ethernet with PHY                                                 | 100Mbps ethernet port(RJ45) onboard                                           | 2x 100Mbps ethernet Ports(RJ45)                                               |
| Wireless       | N/A                                                                       | N/A                                                                       | Optional WIFI6 / BT5.4 onboard                                                | WIFI6 / BT5.4 onboard                                                         |
| Audio          | N/A                                                                       | Via GPIO Pads                                                             | Via GPIO Header                                                               | 1x 3.5mm jack for audio out, 2x 2p for mic in                                 |
| Display        | N/A                                                                       | N/A                                                                       | Via GPIO Header (MIPI DSI 4-lane)                                             | 1x 39P FPC Connector (MIPI DSI 4-lane)                                        |
| GPIO           | up to 26 Pins available for general purpose I/O（GPIO）                   | up to 26 Pins available for general purpose I/O（GPIO）                   | Up to 39x GPIO Pin (Via 2x 26Pin GPIO Header)                                 | Up to 19x GPIO Pin (Via GPIO Header)                                          |
| Power          | 5V/1A                                                                     | 5V/1A                                                                     | 5V/1A                                                                         | 5V/1A                                                                         |
| OS Support     | Buildroot, RTOS                                                           | Buildroot, RTOS                                                           | Buildroot, RTOS                                                               | Buildroot, RTOS                                                               |
| Size           | 21mm*51mm                                                                 | 21mm*51mm                                                                 | 43mm x 43mm                                                                   | 100mm x 75mm                                                                  |
| Others         | N/A                                                                       | N/A                                                                       | 1x BOOT swich, 1x Recovery Key, 1x RST Key                                    | 1x BOOT swich, 1x Recovery Key, 1x RST Key                                    |

:::tip
Due to SOPHGO ending the lifecycle of CV1800B, Milk-V Duo will no longer be produced. It is recommended that you choose Milk-V Duo 256M or Duo S.
:::

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

## Quick Start
[Image download](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

[How to build image](https://milkv.io/docs/duo/getting-started/buildroot-sdk)

[Hardware Doc](https://github.com/milkv-duo/duo-files)

[Chip datasheet](https://github.com/sophgo/sophgo-doc/releases)

## Support
For support please post your issue on the [Milk-V Community Duo Category](https://community.milkv.io/c/duo/5).
