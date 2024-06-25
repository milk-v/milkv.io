---
sidebar_label: 'Boot the Meles'
sidebar_position: 10
---

# Boot the Meles

## Prepare

#### Necessary

- Meles
- eMMC or MicroSD Card larger than 16GB
- Power supply
  - The Meles is powered by a Type-C port with an input voltage of 5V.
 
#### Optional
- USB to TTL serial cable
  - [Use Serial Console](./setup.md).
- Ethernet cable
  - Meles supports Internet access via WIFI or Ethernet.
  - Ethernet cables are used to connect the Meles to the local network and the Internet.
- USB Type A to Type C Cable
  - Required to use the fastboot command to burn an image into the EMMC.
- USB Keyboard and Mouse
  - The Meles features four USB-A ports and can be equipped with a full-size keyboard and mouse.
- Monitor and HDMI cable
  - The Meles is equipped with a full-size HDMI connector. It is recommended to use a monitor that supports HDMI.
  - Supports up to 3840 x 2160 (4K) resolution.

## Install the system

After the hardware is prepared, you need to burn the system to the Meles storage medium. Depending on the storage medium, you need to choose different installing methods.

### Booting from eMMC

If you use eMMC as the storage medium, you need to refer to the [Install an image to eMMC](../installation/install-an-image-to-emmc.md) section to burn the image to eMMC.

In addition, you may need to flash the firmware in SPI Nor Flash, which is already flashed by default. If you need, you can refer to the [Install an image to SPI Nor Flash](../installation/install-an-image-to-spi-nor-flash.md) section to flash it.

### Booting from MicroSD

If you use a MicroSD card as the storage medium, you need to refer to the [Install an image to MicroSD Card](../installation/install-an-image-to-microsd-card.md) section to burn the image.

In addition, you may need to flash the firmware in SPI Nor Flash, which is already flashed by default. If you need, you can refer to the [Install an image to SPI Nor Flash](../installation/install-an-image-to-spi-nor-flash.md) section to flash it.

## Power on

Connect the Meles with a Type-C cable using an adapter (5V) and a HDMI cable to screen.

When the system boots up, the screen Meles is connected to will show the Debian desktop.

## Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.