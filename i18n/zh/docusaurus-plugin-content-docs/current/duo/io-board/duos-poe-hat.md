---
sidebar_label: 'Duo S PoE HAT '
sidebar_position: 20
---
# Duo S PoE HAT
### 简介

Duo S PoE HAT 扩展了 Milk-V Duo S，增加了音频接口和 MIPI DSI 接口，以提供 PoE 供电功能。

![duos-poe-hat](/docs/duo/duos/duos-poe-hat-overview.webp)

### 规格

- 1x 3.5mm 插孔（音频输出）
- 2x 2P 音频输入连接器
- 1x MIPI DSI 连接器（MIPI DSI 4 通道）
- 802.3af 标准，最高 12W

## MIPI DSI 

### MIPI DSI 接口定义

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

### 硬件连接

<Image src='/docs/duo/duos/duos-mipi-dsi-connect.webp' maxWidth='50%' align='left' />

### 软件测试

固件已经集成了测试程序，请使用 [V2.0.0](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/tag/v2.0.0)

登陆到 Duos 终端：
```bash
ssh root@192.168.42.1
```

执行测试程序：
```bash
sample_panel --panel=MILKV_8HD
devmem 0x0a088094 32 0x0701000a
```
此时屏会显示彩色条纹。

<Image src='/docs/duo/duos/duos-mipi-dsi-8hd.webp' maxWidth='100%' align='left' />

