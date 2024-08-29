---
sidebar_label: 'TFT-ST7789 显示屏 '
sidebar_position: 25
---

# 在 Duo S 上使用 TFT-ST7789 显示屏

## 硬件接线

```
GND —— GND      VCC —— VCC(3.3V)
SCL —— PIN23    SDA —— PIN19
RES —— PIN50    DC —— PIN48
CS —— PIN46     BLK —— PIN44


```

## 构建运行环境

参考:https://github.com/milkv-duo/duo-examples

生成st7789后，运行命令 `scp st7789 root@192.168.42.1:/root/`,将程序复制到板端终端。
在板端终端上运行程序

## 显示
- > 显示颜色

```
TFT_full(RED);
delay_ms(5000);
TFT_full(GREEN);
delay_ms(5000);
TFT_full(BLUE);
delay_ms(5000);
	
```
- > 显示图片

```
Picture_display(point);

```
