---
sidebar_label: 'Pico-8SEG-LED-digital tube'
sidebar_position: 25
---

# Use Pico-8SEG-LED digital tube on Duo S

## Working Principle

Using SPI communication interface, 74HC595 chip, contains an 8-bit serial input and parallel output shift register and provides an 8-bit D-type storage register, which has 8-bit 3-state output. Independent clock signals are provided to the shift register and storage register respectively. The shift register has direct clear function, serial input and output function and cascade application. (Standard pins are used.) Both the shift register and the storage register are triggered by the positive edge clock. If the two clocks are connected together, the shift register is always the previous clock pulse of the storage register. All input ports are equipped with anti-static and instantaneous overvoltage protection circuits.

## Hardware connection

Pico-8SEG-LED pin diagram:

<Image src='/static/docs/duo/duos/Accessories/Pico-8SEG-LED.webp' maxWidth='50%' align='center' />

| Connection Name | VSYS | GND | RCLK | CLK  | DIN  |
|----------|------|-----|------|------|------|
|  Connection Pin | 3.3V | GND | PIN50| PIN23| PIN19|

## Build the operating environment

Reference: https://github.com/milkv-duo/duo-examples

## Compile c

```
git clone https://github.com/zwyzwm/Pico-8SEG-LED.git
```
After downloading and compiling, run the command `scp shu root@192.168.42.1:/root/`, copy the generated shu to the login terminal, and run the program.

## Digital tube counting

> - 0000-9999 cycle counting

Call the function `LED_8SEG_stopwatch();` in the main function to implement 0000-9999 cycle counting.