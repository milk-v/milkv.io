---
sidebar_label: 'Official Image and SDK '
sidebar_position: 10
---

# Official Image and SDK

## Image

### V1 version Image

Image link: [https://github.com/milkv-duo/duo-buildroot-sdk/releases/](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)

### V2 version Image

The V2 version supports the ARM core images of Duo256M and DuoS.

Image link: [https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/)

### Image Description

SSH is enabled by default.

USB-NCM network is enabled by default.

Blue LED blinking.

root password: `milkv`
Login via USB-NCM network using ssh:
~~~
ssh root@192.168.42.1
~~~

If you want to disable LED blinking:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
then reboot the board.

This means renaming the LED blinking script, and after restarting the Duo, the LED will no longer blink.

If you want to restore LED blinking, rename it back to its original name and restart the device
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```
then reboot the board.

Use IO-Board: [https://milkv.io/docs/duo/io-board/usb-ethernet-iob](https://milkv.io/docs/duo/io-board/usb-ethernet-iob)

## SDK source code

### Milk-V Duo Official buildroot SDK V1

duo-buildroot-sdk: [https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

### Milk-V Duo Official buildroot SDK V2

duo-buildroot-sdk-v2: [https://github.com/milkv-duo/duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2)

### Milk-V Duo Official C/C++ examples

duo-examples: [https://github.com/milkv-duo/duo-examples](https://github.com/milkv-duo/duo-examples
)

### Milk-V Duo Official TDL-SDK examples

duo-tdl-examples: [https://github.com/milkv-duo/duo-tdl-examples](https://github.com/milkv-duo/duo-tdl-examples)
