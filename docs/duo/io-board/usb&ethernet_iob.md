---
sidebar_label: 'Duo USB&Ethernet IOB '
sidebar_position: 10
---
# Duo USB&Ethernet IOB
## Introduction

The Duo USB&Ethernet IOB expands the Milk-V Duo with 4 USB, 1 RJ45 network port, 1 serial port pinout, and 1 Type-C power input connector.  

This expansion board can improve the development efficiency of Duo and facilitate developers to access commonly used USB peripherals and Ethernet.

![duousbeth](/docs/duo/duousbethiob.webp)

## Specification

- 4x USB
- 1x 100Mbps RJ45
- 1x Serial port pinout
- 1x Type-C power input connector

## Instructions for use
Before using it, please make sure you are using the [latest image](https://milkv.io/docs/duo/resources/image&sdk).

### Use the IO-Board
Note that when using the IO-Board, the USB network (RNDIS) is not available, Please use the Ethernet interface on the IO-Board

Enable the 4 USB ports on the IO-Board:

~~~
rm /mnt/system/usb.sh
ln -s /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~

then reboot the board

Restore the USB network (RNDIS) when the IO-Board is not used

~~~
rm /mnt/system/usb.sh
ln -s /mnt/system/usb-rndis.sh /mnt/system/usb.sh
sync
~~~

then reboot the board


