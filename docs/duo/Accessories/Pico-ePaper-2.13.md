---
sidebar_label: 'Pico-ePaper-2.13 display'
sidebar_position: 25
---

# Use Pico-ePaper-2.13 display on Duo S

## Working Principle

Using SPI communication interface, the "microcapsule electrophoresis display" technology is used for image display. The basic principle is that charged nanoparticles suspended in liquid migrate under the action of electric field. The electronic paper display screen displays patterns by reflecting ambient light and does not require backlight. Under ambient light, the electronic paper display screen is clearly visible, and the viewing angle reaches almost 180°. Therefore, the electronic paper display screen is very suitable for reading.

## Hardware wiring

<Image src='/docs/duo/duos/Accessories/Pico-ePaper1-2.13.webp' maxWidth='50%' align='center' />

| Connection name | GND | VCC | DC | CS | RST | BUSY | CLK | DIN |
|----------|-----|------------|-----|-----|-----|------|------|------|
| Pin | GND | VCC (3.3V) | PIN50 | PIN11 | PIN13 | PIN46 | PIN23 | PIN19 |

## Build the operating environment

Reference:` https://github.com/milkv-duo/duo-examples `

## Compile c

```

git clone https://github.com/zwyzwm/Pico-ePaper-2.13.git

```

After downloading and compiling, run the command ` scp root@192.168.42.1:/root/ `, copy the generated paper to the login terminal, and run the program.

## Display characters

> - Take the character size of `Font16` as an example:

In the main function, call `Paint_DrawString_EN(5, 10, "HELLO", &Font16, WHITE, BLACK);`, and the character `HELLO` can be displayed vertically.

## Display black dots

> - Take the black dot size of 2x2 as an example:

In the main function, call `Paint_DrawPoint(2, 2, BLACK, DOT_PIXEL_2X2, DOT_STYLE_DFT);`, and the black dots can be displayed vertically.

In the main function, call `Paint_DrawPoint(250,122, BLACK, DOT_PIXEL_2X2, DOT_STYLE_DFT);`, and the black dots can be displayed in the lower right corner.

## Display the image

> - Reduce the resolution of the jpg image to 250x122

Run ` resize_image.py ` to get a jpg image with a resolution of 250x122.

> - Convert the jpg format to bmp

In the terminal in the same directory, run the command ` covert input.jpg output.bmp ` to get a bmp format image.

> - Convert the bmp format image to a black and white image

In the terminal in the same directory, run the command ` convert input.bmp -colorspace Gray output.bmp ` to get a black and white image.

> - Modulo the image to get the modulo array

For reference: ` https://github.com/riuson/lcd-image-converter `

Or for simpler images, you can run ` Modulo_array.py ` to get the hexadecimal array and copy the array to the ` ImageData.c ` file
> - Display the image
Call ` Paint_DrawBitMap(your arrays); ` in the main function to display the image.







