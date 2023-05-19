# Duo

Version 1.2 

-------------------------
# Introduction
Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.  
  
![duo](/DOUImage/duo-v1.2.png)

# Specification
| Milk-V Duo | Specification                                           |
| ---------- | ------------------------------------------------------- |
| Processor  | CVITEK CV1800B (C906@1Ghz + C906@700MHz)                |
| Memory     | DDR2 64MB                                               |
| Storage    | 1x Mirco SD slot,1x SD NAND solder pad                  |
| USB        | 1x Type-C for data and Power,1x USB2 solder pad         |
| Camera     | 1x 16P FPC connector (MIPI CSI 2-lane)                  |
| GPIO       | up to 26 Pins available for general purpose I/O（GPIO） |
| Size       | 21mm*51mm                                               |
# Features 

## Processor
- 1GHz and 700MHz RISC-V C906 processors
- Integrated CVITEK TPU for smart detection.
- Supports H.264/H.265 video encoding, up to 2880x1620@20fps.
- Compatible with high-definition CMOS sensors.
- Programmable frequency output for sensor clock.
- Comprehensive ISP features for image optimization.
- Partial OpenCV library support with CV hardware acceleration.
- 16-bit audio codec with built-in mic input and output functions.
- Flexible network configurations with 1 Ethernet PHY.

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
![pinoutv1.2](/DOUImage/pinout-v1.2.png)


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
[Image download](https://github.com/milk-v/duo-manifest/releases)  
[How to build image](https://github.com/milk-v/duo-manifest)  

## Support
For support please post your issue on the [Milk-V Community Duo Category](https://community.milkv.io/c/duo/5).