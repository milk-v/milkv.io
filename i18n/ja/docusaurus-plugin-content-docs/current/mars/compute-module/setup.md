---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Set up the working environment

## Use Serial Console

### USB to TTL serial cable

Each pin of a USB-to-TTL cable is defined as follows:

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

### Connection

Take using `Raspberry Pi CM4 IO Board` as the base-board as an example, connect USB to TTL serial cable as shown below. Do not connect the red wire.

| Milk-V Mars  | \<---> | USB to TTL |
| ------------ | ------ | ---------- |
| GND (pin 6)  | \<---> | Black wire |
| TX  (pin 8)  | \<---> | White wire |
| RX  (pin 10) | \<---> | Green wire |

![mars-cm-serial](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

The default serial setting for Mars console is:

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```
