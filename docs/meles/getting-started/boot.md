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

You will need to download the following three files:

- u-boot-with-spl-singlerank.bin or u-boot-with-spl-dualrank.bin
  - Choose according to the meles memory size, 4G choose u-boot-with-spl-singlerank.bin, 8G choose u-boot-with-spl-dualrank.bin
- boot.ext
- root-meles-20231210_134926.ext4

Download the system image from [Meles Image File](https://github.com/milkv-meles/meles-images/releases/tag/v1.0.0).

## Write images

**Here are the steps on how to burn an image to an eMMC using the fasboot utility on a Linux system**

- First snap the EMMC into the slot on the back of the meles

![Install-eMMC](/docs/meles/Install-emmc.webp)

- Use the Type-A to Type-C cable to connect the meles to the PC.
  - Type-A port connects to the PC's Type-A port, and Type-C port connects to the meles' Type-C port.

- The following steps need to be performed to put the Meles into burn mode
  - Press and hold the Meles Download Button
  - Reconnect to Type-C port
  - Release the Download Button

![Download Button](/docs/meles/DownloadButton.webp)

- Enter the following command to view the PC side and the device will appear
```
$ lsusb | grep T-HEAD
Bus 001 Device 045: ID 2345:7654 T-HEAD USB download gadget
```

- Execute the following command to start burning
  - The `u-boot-with-spl.bin` file is divided into `u-boot-with-spl-singlerank.bin` and `u-boot-with-spl-dualrank.bin`, depending on the memory size of the meles you have.
  - `4G` choose `u-boot-with-spl-singlerank.bin`, `8G` choose `u-boot-with-spl-dualrank.bin`
```
$ fastboot flash ram u-boot-with-spl.bin
$ fastboot reboot
$ sleep 5
$ fastboot flash uboot u-boot-with-spl.bin
$ fastboot flash boot boot.ext4
$ fastboot flash root rootfs.ext4
```

- The following figure represents a successful burn-in

![Download Button](/docs/meles/DownloadButton.webp)

## Power on

Connect the Meles with a Type-C cable using an adapter (5V) and a HDMI cable to screen.

When the system boots up, the screen Meles is connected to will show the Debian desktop.

## Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.