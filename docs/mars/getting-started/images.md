---
sidebar_label: 'Images Download'
sidebar_position: 45
---

# Images Download

## Official Image

### Debain

Download from Github: [https://github.com/milkv-mars/mars-buildroot-sdk/releases/](https://github.com/milkv-mars/mars-buildroot-sdk/releases/)

- Mars SD card Image
  ```
  mars_debian-desktop_sdk-v*_sdcard_v*.img.zip
  ```

- Mars eMMC Image
  ```
  mars_debian-desktop_sdk-v*_emmc_v*.img.zip
  ```

After downloading, refer to [Burn Image](https://milkv.io/docs/mars/getting-started/boot#burn-image) Burn the image to the microSD card.

After burning, insert the microSD card into Mars and power it on. The default username and password are:
```
User: user
Password: milkv
```

## Third-party Images

### Ubuntu 24.04 (Noble Numbat)

Ubuntu 24.04, officially released by Ubuntu, already provides a server version that supports Milk-V Mars.

download link: [https://cdimage.ubuntu.com/releases/24.04/release/](https://cdimage.ubuntu.com/releases/24.04/release/)

Download the preinstalled server image: [ubuntu-24.04-preinstalled-server-riscv64+milkvmars.img.xz](https://cdimage.ubuntu.com/releases/24.04/release/ubuntu-24.04-preinstalled-server-riscv64+milkvmars.img.xz)

After downloading, refer to [Burn Image](https://milkv.io/docs/mars/getting-started/boot#burn-image) Burn the image to the microSD card.

#### Update Flash firmware

The factory-default U-boot firmware in Mars SPI Flash does not currently support booting Ubuntu images. You need to manually update the U-boot built from upstream sources. This U-boot firmware is already included in the Ubuntu 24.04 Mars image. We need to log in to the original U-boot of Mars through the serial console and update the U-boot firmware in the Ubuntu image to SPI Flash through commands.

- Connect serial port

  Refer to [Use Serial Console](https://milkv.io/docs/mars/getting-started/setup#use-serial-console) Connect the serial port cable using the method in the chapter.

- Log in to the U-boot serial console

  Insert the microSD card with the burned Ubuntu image into Mars, power it on, and quickly press the Enter key when `Hit any key to stop autoboot` appears in the serial terminal to enter the U-boot command line terminal:
  ```python {6}
  In:    serial
  Out:   serial
  Err:   serial
  Model: StarFive VisionFive V2
  Net:   eth0: ethernet@16030000, eth1: ethernet@16040000
  Hit any key to stop autoboot:  0
  StarFive #
  ```

- Enter the following commands in sequence

  ```
  sf probe
  load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/u-boot-spl.bin.normal.out
  sf update $kernel_addr_r 0 $filesize
  load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/u-boot.itb
  sf update $kernel_addr_r 0x100000 $filesize
  ```

  When the above command is executed normally, the effect is as follows:
  ```
  StarFive # sf probe
  SF: Detected gd25lq128 with page size 256 Bytes, erase size 4 KiB, total 16   MiB
  StarFive # load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/  u-boot-spl.bin.normal.out
  141935 bytes read in 20 ms (6.8 MiB/s)
  StarFive # sf update $kernel_addr_r 0 $filesize
  device 0 offset 0x0, size 0x22a6f
  141935 bytes written, 0 bytes skipped in 0.679s, speed 213110 B/s
  StarFive # load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/  u-boot.itb
  1041691 bytes read in 60 ms (16.6 MiB/s)
  StarFive # sf update $kernel_addr_r 0x100000 $filesize
  device 0 offset 0x100000, size 0xfe51b
  963867 bytes written, 77824 bytes skipped in 7.199s, speed 148089 B/s
  StarFive #
  ```

- Reset U-boot environment variables

  Power on again, press the Enter key again when booting up to enter the U-boot command line terminal, and execute the following command:
  ```
  env default -f -a
  env save
  ```

:::tip
If the failure to update the Flash firmware causes Mars to fail to start normally, or if you need to flash the Flash firmware back to the default firmware, you can refer to the [Bootloader update](https://milkv.io/docs/mars/getting-started/bootloader) chapter , re-burn the Flash default firmware.
:::

#### Power on and start

After updating the Flash firmware, power on again and you can boot the Ubuntu 24.04 Server system of Mars normally.

When starting up for the first time, wait until you see the output line confirming that cloud-init has completed. Cloud init is responsible for generating SSH keys and setting default passwords. Wait for it to complete before logging in normally. When you see the following output from the serial port, it means that the process has been completed:

```
cloud-init[1055]: Cloud-init v. 24.1.3-0ubuntu3 finished at Fri, 19 Apr 2024 14:25:56 +0000. Datasource DataSourceNoCloud [seed=/var/lib/cloud/seed/nocloud-net][dsmode=net].  Up 93.71 seconds
```

Now you can log in using the following default user and password. You will be asked to set a new password when logging in for the first time:
```
User: ubuntu
Password: ubuntu
```
