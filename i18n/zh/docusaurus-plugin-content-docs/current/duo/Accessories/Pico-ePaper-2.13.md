---
sidebar_label: 'Pico-ePaper-2.13 显示屏'
sidebar_position: 25
---

# 在 Duo S 上使用 Pico-ePaper-2.13 显示屏

## 硬件接线

```
VSYS —— 3.3V    CS —— PIN11
 
GND —— GND      RST —— PIN13

BUSY —— PIN46   DIN —— PIN19

DC —— PIN50     CLK —— PIN23

```
## 构建运行环境

参考:` https://github.com/milkv-duo/duo-examples `

## 编译c

```

git clone https://github.com/zwyzwm/Pico-ePaper-2.13.git

```

下载编译完成之后，运行命令 ` scp root@192.168.42.1:/root/ `，将生成的paper，复制到登陆终端，运行程序。

## 显示字符 

> - 以字符大小为` Font16 `为例:

  在main函数中调用` Paint_DrawString_EN(5, 10, "HELLO", &Font16, WHITE, BLACK); ` ，便可以顶格显示字符 `HELLO` 。

## 显示黑点

> - 以黑点大小 2x2 为例:

  在 main 函数中调用` Paint_DrawPoint(2, 2, BLACK, DOT_PIXEL_2X2, DOT_STYLE_DFT); `，便可以顶格显示黑点。

  在 main 函数中调用` Paint_DrawPoint(250,122, BLACK, DOT_PIXEL_2X2, DOT_STYLE_DFT); `，便可以右下角显示黑点。

## 显示图片

> - 将 jpg 图片的分辨率裁减为 250x122

  运行 ` resize_image.py ` ，得到分辨率为 250x122 的 jpg 图片。

> - 将 jpg 的格式转化为 bmp

  在同一目录下的终端中，运行命令 ` covert input.jpg output.bmp ` ，得到 bmp 格式的图片。

> - 将 bmp 格式的图片转换成黑白图像

  在统一目录下的终端中，运行命令 ` convert input.bmp -colorspace Gray output.bmp ` ，得到黑白图像。

> - 对图像进行取模，得到取模数组
  
  可参考: ` https://github.com/riuson/lcd-image-converter `

  或者比较简单的图像，可以运行 ` Modulo_array.py ` ，得到十六进制数组，将数组复制到 ` ImageData.c `文件中
> - 显示图像
 在main函数中调用` Paint_DrawBitMap(your arrays); `，便可以显示图像。








