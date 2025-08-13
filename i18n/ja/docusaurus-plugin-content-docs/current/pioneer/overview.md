---
sidebar_label: '📚 Overview'
sidebar_position: 1
---

# Pioneer Overview

## Introduction

Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future. 

## Pioneer Board

![Pioneer Board](/docs/pioneer/pioneerboardv1.1.webp)

| Pioneer Board | Specification                                      |
| ------------- | -------------------------------------------------- |
| Processor     | SOPHON SG2042 (64 Core C920, RVV 0.71, up to 2GHz) |
| Memory        | 4x DDR4 DIMM slots up to 128 GB RAM support        |
| PCI Express   | 1x PCIe x16 Slot (PCIe 4.0 x16)                    |
|               | 1x PCIe x16 Slot (PCIe 4.0 x8)                     |
| Storage       | 5x SATA connector                                  |
|               | 1x SPI Flash for BIOS                              |
|               | 1x eMMC module connector                           |
|               | 1x micro SD card for recovery or OS loading        |
|               | 2x M.2 M KEY(PCIe 3.0 x4)                          |
| Ethernet      | 2x RJ45 2.5G                                       |
| Wireless      | 1x M.2 E KEY(PCIe 3.0 x1 + USB 2.0)                |
| USB           | 8x USB3                                            |
|               | 1x USB Header for front panel(2x USB 3.0)          |
| Others        | 1x misc header for front panel power, reset, etc   |
|               | 1x serial port(USB-C) for front panel              |
| Power         | 1x standard 24P ATX Power connector                |
| Size          | 24.4cm x 24.4cm                                    |

## Pioneer Box

![Pioneer Box](/docs/pioneer/pioneerbox.webp)

Pioneer Box is a complete ready-to-use RISC-V PC with the following:

- 1x Pioneer Board
- 128GB 3200 DDR4 
- 1x 1TB PCIe 3.0 SSD
- 1x Intel X540-T2 Network Card with 2x 10Gbps RJ45 ports
- 1x AMD R5 230 Graphic Card with HDMI, VGA and DVI
- 1x MSI A350 350W Power Apply
- 1x Cooler with PWM Fan up to 2300 RPM supporting up to 160W D-TDP
- White slim PC enclosure with handle

## Hardware

![Pioneer Mark](/docs/pioneer/pioneer-mark.webp)


| No. | Description                       | No. | Description                    | No. | Description                       |
| --- | --------------------------------- | --- | ------------------------------ | --- | --------------------------------- |
| 1   | SOPHON SG2042                     | 10  | PCIe 4.0 x8                    | 19  | UART                              |
| 2   | PCIe Switch(ASM2824)              | 11  | MCU(for Power-up control)      | 20  | SPIF                              |
| 3   | DDR4 DIMM Slot                    | 12  | SATA3 6Gbps                    | 21  | JTAG                              |
| 4   | SD Card Slot                      | 13  | 24P ATX Power Supply Connector | 22  | USB                               |
| 5   | 2.5GbE Ethernet Port              | 14  | LPC                            | 23  | SG2042 & MCU Debug                |
| 6   | USB3                              | 15  | LPC                            | 24  | MCU Programming and Debugging Pin |
| 7   | PCIe 4.0 x16                      | 16  | Pin for Start, Power off, etc. | 25  | eMMC Module Connector             |
| 8   | M.2 E Key (PCIe 3.0 x1 + USB 2.0) | 17  | CPU FAN Connectors             | -   | -                                 |
| 9   | M.2 M Key (PCIe 3.0 x4)           | 18  | GPIO                           | -   | -                                 |

## Support

For support please see the documentation section of the Milk-V website and post questions to the Milk-V Community.
