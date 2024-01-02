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
Before using it, please make sure you are using the [latest image](https://milkv.io/docs/duo/resources/image-sdk).

### Use the IO-Board
Note that when using the IO-Board, the USB network (RNDIS) is not available, Please use the Ethernet interface on the IO-Board

If you need to assign a fixed MAC address to the Ethernet port of the IO-Board, please execute the following command(**Replace the MAC address in the command with the MAC address you want to set, and please note that MAC addresses of different devices within the same network segment must not be duplicated**)
```
echo "pre-up ifconfig eth0 hw ether 78:01:B3:FC:E8:55" >> /etc/network/interfaces && sync
```
then reboot the board

Enable the 4 USB ports on the IO-Board:
~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
then reboot the board

For example, if a USB flash drive is connected to the USB port on the IO-Board, you can use the command `ls /dev/sd*` to check if the device is detected

To mount the USB drive and view its contents in the system (taking /dev/sda1 as an example):
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
```
Verify if the contents in the `/mnt/udisk` directory match the expectations
```
ls /mnt/udisk
```

The command to unmount a USB flash drive
```
umount /mnt/udisk
```

To restore the functionality of the USB network (RNDIS) when not using the IO-Board, you can follow these steps
```
ln -sf /mnt/system/usb-rndis.sh /mnt/system/usb.sh
sync
```
then reboot the board

## Hardware schematics
- [Hardware schematics](https://github.com/milkv-duo/accessories/blob/master/Duo_USB%26Ethernet_IOB/duo_iob_v1.11.pdf)
