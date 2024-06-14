---
sidebar_label: 'Install an image to MicroSD Card'
sidebar_position: 50
---

# Install an image to MicroSD Card

SoC TH1520 used on Meles supports booting from SPI Nor Flash and eMMC.
There is one MicroSD Card slot on Meles. Therefore Meles supports the following booting method: SPI Nor Flash + MicroSD Card.

## Requirements

- Meles with proper power
- SPI Nor Flash with bootloader on board
- A MicroSD Card, larger than 16GB, class 10 or better
- A PC/laptop running Windows or Linux or MacOS

## Install tools on PC

Get Balena Etcher from webite, https://etcher.balena.io/.

Get the decompression tool 7-Zip from GitHub, https://github.com/mcmilk/7-Zip-zstd/releases/download/v22.01-v1.5.5-R3/7z22.01-zstd-x64.exe

## Get Meles MicroSD card image

Download Meles MicroSD Card image. https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240601/sdcard-meles-20240601_180943.img.zst

You can use 7-Zip or other tools to extract the downloaded .zst compressed file to any directory.

## Write the image to MicroSD Card

- Insert the MicroSD Card into MicroSD Card Reader, which connects to Host PC.
- Run the application Etcher
- On the Etcher window, we click "Flash from file" to select image file.

![sdcard-etcher-flash-from-file](/docs/meles/sdcard-etcher-flash-from-file.png)

- On the Etcher window, we click "Select target" to select MicroSD Card device.

![sdcard-etcher-select-target](/docs/meles/sdcard-etcher-select-target.png)

- On the Etcher window, we click "Flash!" to write the image.

![sdcard-etcher-flash](/docs/meles/sdcard-etcher-flash.png)

- On the Etcher window, it shows that "Flash Complete!".

![sdcard-etcher-flash-complete](/docs/meles/sdcard-etcher-flash-complete.png)

Now we have successfully installed the image to MicroSD Card.
