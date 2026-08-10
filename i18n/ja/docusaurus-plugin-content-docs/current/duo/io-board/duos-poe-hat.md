---
sidebar_label: 'Duo S PoE HAT '
sidebar_position: 20
---
# Duo S PoE HAT
## Introduction

The Duo S PoE HAT expands the Milk-V Duo S with an audio interface and MIPI DSI interface to provide PoE power capability. 

![duos-poe-hat](/docs/duo/duos/duos-poe-hat-overview.webp)

## Specification

- 1x 3.5mm Jack(audio out)
- 2x 2P Connector for Audio in
- 1x MIPI DSI Connector(MIPI DSI 4-lane)
- 802.3af standard up to 12W

## MIPI DSI

### Definition der MIPI-DSI-Schnittstelle

<div className='gpio_style'>

| u14| Description        |
|:--:|:--------------------|
| 1  | 3V3                 |
| 2  | 1V8                 |
| 3  | SENSOR-INT          |
| 4  | RESET               |
| 5  |                     |
| 6  | GND                 |
| 7  | MIPI-0N             |
| 8  | MIPI-0P             |
| 9  | GND                 |
| 10 | MIPI-1N             |
| 11 | MIPI-1P             |
| 12 | GND                 |
| 13 | MIPI-CKN            |
| 14 | MIPI-CKP            |
| 15 | GND                 |
| 16 | MIPI-2N             |
| 17 | MIPI-2P             |
| 18 | GND                 |
| 19 | MIPI-3N             |
| 20 | MIPI-3P             |
| 21 | GND                 |
| 22 | GND                 |
| 23 | TP-RESET            |
| 24 | TP-VCC              |
| 25 | TP-INT              |
| 26 | TP-SDA              |
| 27 | TP-SCL              |
| 28 | GND                 |
| 29 | GND                 |
| 30 | 3V3                 |
| 31 | 3V3                 |
| 32 | GND                 |
| 33 | GND                 |
| 34 | LED-1               |
| 35 | LED-                |
| 36 |                     |
| 37 |                     |
| 38 | LED+1               |
| 39 | LED+                |

</div>

### Hardware Connection

<Image src='/docs/duo/duos/duos-mipi-dsi-connect.webp' maxWidth='50%' align='left' />

### Software testing

The firmware has integrated the test program, please use [V2.0.0](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/tag/v2.0.0)

Log in to the Duos terminal:
```bash
ssh root@192.168.42.1
```
Execute the test program:
```bash
sample_panel --panel=MILKV_8HD
devmem 0x0a088094 32 0x0701000a
```
At this time, the screen will display colored stripes.

<Image src='/docs/duo/duos/duos-mipi-dsi-8hd.webp' maxWidth='100%' align='left' />


