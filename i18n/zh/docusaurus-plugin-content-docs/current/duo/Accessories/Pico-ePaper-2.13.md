---
sidebar_label: 'Pico-ePaper-2.13 显示屏'
sidebar_position: 25
---

# 在 Duo S 上使用 Pico-ePaper-2.13 显示屏

## 工作原理

使用SPI通信接口，采用“微胶囊电泳显示”技术进行图像显示，其基本原理是悬浮在液体中的带电纳米粒子受到电场作用而产生迁移。电子纸显示屏是靠反射环境光来显示图案的，不需要背光，在环境光下，电子纸显示屏清晰可视，可视角度几乎达到了 180°。因此，电子纸显示屏非常适合阅读。



## 硬件接线

<Image src='/docs/duo/duos/Accessories/Pico-ePaper1-2.13.webp' maxWidth='50%' align='center' />

| 连接名称 | GND | VCC  | DC  | CS  | RST | BUSY | CLK  | DIN  |
|----------|-----|------------|-----|-----|-----|------|------|------|
| 引脚     | GND | VCC (3.3V)  | PIN50 | PIN11 | PIN13 | PIN46 | PIN23 | PIN19 |

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








