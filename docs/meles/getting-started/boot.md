---
sidebar_label: 'Boot the Meles'
sidebar_position: 10
---

# Boot the Meles

## Prepare

#### Necessary

- Meles
- eMMC larger than 16GB
- Power supply
  - The Meles is powered by a Type-C port with an input voltage of 5V.
 
#### Optional
- USB to TTL serial cable
  - [Use Serial Console](./setup.md)。
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

## Download images and tools

You need to use the fasboot utility to burn the image into the eMMC.

- Commands for installing the fasboot utility on Linux: `sudo apt-get install android-tools-adb`.

- Download the system image from [meles image]().

## Write images

Here are the steps on how to burn an image to an eMMC using the fasboot utility on a Linux system
