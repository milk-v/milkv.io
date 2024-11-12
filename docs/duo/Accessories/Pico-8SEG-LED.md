---
sidebar_label: 'Pico-8SEG-LED-digital tube'
sidebar_position: 25
---

# Use Pico-8SEG-LED digital tube on Duo S

## Hardware connection

Pico-8SEG-LED pin diagram: https://www.waveshare.net/wiki/Pico-8SEG-LED#.E6.8E.A5.E5.8F.A3.E8.AF.B4.E6.98.8E

```
VSYS —— 3.3V GND —— GND

RCLK —— PIN50 CLK —— PIN23

DIN —— PIN19
```

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