---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Set up the working environment

## Use Serial Console

### USB to TTL serial cable

Each pin of a USB-to-TTL cable is defined as follows:

![usb2ttl](/docs/mars/usb2ttl.png)

### Connection

Connect USB to TTL serial cable as shown below. Do not connect the red wire.

| Milk-V Mars  | \<---> | USB to TTL |
| ------------ | ------ | ---------- |
| GND (pin 6)  | \<---> | Black wire |
| TX  (pin 8)  | \<---> | White wire |
| RX  (pin 10) | \<---> | Green wire |

![mars-serial](/docs/mars/mars-serial.jpg)

The default serial setting for Mars console is:

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

## Boot mode switch

Mars hardware version V1.2 and later versions have a new DIP switch. You can choose to boot from SPI Flash, SD-card, eMMC or UART port. The DIP switch is factory default configured to boot from SPI Flash. If you need to configure it to other modes , please follow the table to configure the DIP switch:

| GPIO1 | GPIO0 |         |
|:-----:|:-----:|:--------|
| 0     | 0     | Flash   |
| 0     | 1     | SD-card |
| 1     | 0     | eMMC    |
| 1     | 1     | UART    |

<Image src='/docs/mars/mars-bootmode-switch.webp' maxWidth='70%' align='left' />

:::tip
The boot method recommended by the CPU manufacturer is SPI Flash. Use the bootloder in Flash to continue booting from the SD card or eMMC. This method is the most stable. It is recommended that you use the method of booting directly from the SD-card or eMMC through DIP switch configuration as a debugging method or a method to verify functions.
:::

Mars before hardware version V1.2 boots from SPI Flash by default and can boot the system in the SD-card or eMMC normally. Not adding this DIP switch will not affect normal use.

When you need to start updating the bootloader in Flash through the UART port, you can power on by pressing the button next to the LED on the board to enter UART mode. This method is applicable to all Mars hardware versions.

<Image src='/docs/mars/mars-upgrade-key.jpg' maxWidth='70%' align='left' />
