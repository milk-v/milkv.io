---
sidebar_label: 'Boot the Mars'
sidebar_position: 10
---
## Boot Mars from microSD card

### Prepare

- Necessary
  - Mars
  - microSD or eMMC larger than 16GB
  - Type-C cable
- Optional
  - USB to TTL serial cable
  - HDMI cable

### Download images and tools

- Download the system image from [Official Image](https://milkv.io/docs/mars/getting-started/images#official-image).
- Download the flash tool, [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/).

### Burn image

Here are the steps for using balenaEtcher.

- Click **Flash from file**

![etcher-step1](/docs/duo/etcher-step1.png)

- Click **Select target**

![etcher-step2](/docs/duo/etcher-step2.png)

- Click **Flash!**

![etcher-step3](/docs/duo/etcher-step3.png)

### Power on

Insert the microSD card with the burned firmware into the Mars microSD card slot. Use an adapter (5V) to connect Mars via a Type-C cable. Mars will automatically power on and the red power LED on the board will light up. After the system starts successfully, the green status LED on the board will flash.

If an HDMI monitor is connected, the Debian desktop will be displayed after booting.

### Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.


## Boot Mars from USB drive

* Note: The USB drive booting process is a bit complicated, it is recommended to use the microSD card to boot Mars. The USB drive can only be plugged into the USB3.0 port.

Use a serial cable to connect to the serial debugging port of Mars. When powering on Mars, press any key to interrupt the boot process and enter the U-Boot command line.

In the U-Boot command line, enter the following commands:

```bash
setenv boot_devs 'mmc nvme usb'
setenv distro_bootenv_usb 'setenv bootdev usb; setenv devnum 0; run usb_boot'
saveenv
```

Download the image and burn it to the USB drive. Use the microSD card to boot Mars, insert the USB drive into Mars, and modify the `extlinux.conf` file on the USB drive.

```bash
sudo mount /dev/sad3 /mnt
sudo nano /mnt/extlinux/extlinux.conf
```

In the `extlinux.conf`, modify the `APPEND` line, change `root=/dev/mmcblk1p4` to `root=/dev/sda4`, as shown below:

```bash
append root=/dev/sda4 rw console=tty0 console=ttyS0,115200 earlycon rootwait stmmaceth=chain_mode:1 selinux=0
```

Save and exit, unmount the USB drive. Power off, remove the microSD card, and power on again.
