---
sidebar_label: 'Bootloader Update'
sidebar_position: 40
---

# Milk-V Mars Bootloader Update Guide

Whether Mars starts the system through the SD card or the eMMC module, it must be started through the Bootloader boot program. This boot program is stored in an SPI Flash on the board and contains two parts: `SPL` and `U-Boot`.

:::tip
The Bootloader in Mars can be understood as the BIOS in PC
:::

When Mars is shipped, it already comes with a pre-installed initial Bootloader program. There is no need to upgrade this program during normal usage. Bootloader upgrade is only necessary in the following situations:

1. When the bootloader program in SPI Flash is accidentally damaged, causing the system to fail to start normally.
2. When upgrading the official system image (such as Debian), it must be matched with the new bootloader, otherwise it cannot be started.
3. U-Boot has fixed some bugs or added new functions. When you need to use these new functions.

There are several ways to update the Bootloader in SPI Flash on Mars, such as Windows burning tools, TFTP, flashcp commands, etc. Here are the methods of using the `flashcp` command and using the `UsbFlashTool` burning tool in Windows systems.

## Update Bootloader using flashcp command

If the current bootloader of your Mars can boot the Debian system normally, you can use the `flashcp` command in the Debian system to update the bootloader.

1. Install flashcp command

   The `flashcp` command in the Debian system is included in the `mtd-utils` package. Execute the following command to install:
   ```bash
   sudo apt install mtd-utils
   ```

2. Download Bootloader Firmware

   [Bootloader firmware](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

   The firmware contains two files, `SPL` and `U-Boot`:
   ```
   SPL:    mars_u-boot-spl.bin.normal.out
   U-Boot: mars_visionfive2_fw_payload.img
   ```
   You can download it directly on Mars, or download it on PC and then transfer it to Mars through scp command or USB flash drive.

3. View SPI Flash partition information
   ```
   cat /proc/mtd
   ```
   The output is as follows:
   ```
   user@milkv:~$ cat /proc/mtd
   dev:    size   erasesize  name
   mtd0: 00040000 00001000 "spl"
   mtd1: 00300000 00001000 "uboot"
   mtd2: 00100000 00001000 "data"
   ```
   We need to update `SPL` to the `mtd0` partition and `U-Boot` to the `mtd1` partition.

4. Update Bootloader

   Update SPL:
   ```bash
   sudo flashcp -v mars_u-boot-spl.bin.normal.out /dev/mtd0
   ```
   Update U-Boot:
   ```bash
   sudo flashcp -v mars_visionfive2_fw_payload.img /dev/mtd1
   ```
   The output of successful execution is as follows:
   ```
   user@milkv:~$ sudo flashcp -v mars_u-boot-spl.bin.normal.out /dev/mtd0
   Erasing blocks: 36/36 (100%)
   Writing data: 143k/143k (100%)
   Verifying data: 143k/143k (100%)
   user@milkv:~$
   user@milkv:~$ sudo flashcp -v mars_visionfive2_fw_payload.img /dev/mtd1
   Erasing blocks: 723/723 (100%)
   Writing data: 2890k/2890k (100%)
   Verifying data: 2890k/2890k (100%)
   ```

After powering on again, you can determine whether the bootloader has been updated based on the timestamp in the UART serial port log:

```
U-Boot SPL 2021.10 (Nov 24 2023 - 10:21:39 +0800)
```
```
U-Boot 2021.10 (Nov 24 2023 - 10:21:39 +0800)
```

## Use UsbFlashTool to upgrade bootloader under Windows

### Download UsbFlashTool burning tool and Bootloader firmware

[UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

[Bootloader firmware](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    mars_u-boot-spl.bin.normal.out
U-Boot: mars_visionfive2_fw_payload.img
```

### Install driver for the burning tool

:::tip
Driver installation is only required for the first use.
:::

Extract the downloaded `Mars-UsbFlashTool-*-Windows.zip` into the Windows system.

1. Connect the USB to TTL serial port cable to the 40 pin header on Mars, connect the USB to the PC and note down the serial port number

   How to connect USB to serial cable: [Use Serial Console](https://milkv.io/docs/mars/getting-satrted/setup#use-serial-console)

   ![mars](/docs/mars/mars-usb-flash-tool_02.png)

   **Note: If any other serial port program is open and using the serial port, please exit the program to release the port and avoid occupying it.**

2. Connect the PC and Mars using a USB 2.0 interface with a type A Male to Male USB data cable

   <Image src='/docs/common/usba2usba.webp' maxWidth='60%' align='left' />

   ![mars](/docs/mars/mars-usb-port-a.jpg)

3. Press and hold the `upgrade button` on Mars, and then power on Mars through the Type C interface. At this time, Mars will enter the upgrade mode. You can release the `upgrade button` to continue the operation.

   ![mars](/docs/mars/mars-upgrade-key.jpg)

4. Run the `UsbFlashTool-*-Windows.exe` flashing program in the flashing tool directory

   ![mars](/docs/mars/mars-usb-flash-tool_05.png)

5. Set the serial port number in the `Serial Setting` on the right side to the serial port number noted in step 1

   ![mars](/docs/mars/mars-usb-flash-tool_06.png)

6. Select `Firmware` in `File Type`, then click `File Select` to select the `usbprog-mars-230510.out` in the `update` directory, then click `Load`, and wait for the message `Loaded` to appear after loading

   ![mars](/docs/mars/mars-usb-flash-tool_07.png)

7. At this time, the JH7110 device has been identified in the Windows Device Manager and the driver needs to be installed

   ![mars](/docs/mars/mars-usb-flash-tool_08.png)

8. Run the `zadig-2.5` program in the flashing tool directory, select `List All Devices` in the menu `Options`, select `StarFive JH7110 Device` in the drop-down list, and then click `Install Driver` to complete the driver installation

   ![mars](/docs/mars/mars-usb-flash-tool_09.png)

   After the driver is successfully installed, check whether the status in the device manager has become a normal USB device

   ![mars](/docs/mars/mars-usb-flash-tool_10.png)

9. After the driver is successfully installed, close the UsbFlashTool window and power off Mars.

### Upgrade Bootloader

The first 6 steps of burning the bootloader are the same as the first 5 steps of installing the driver above.

7. Flash the `SPL`

   Click `File Select`, select the `SPL` firmware `mars_u-boot-spl.bin.normal.out` to be burned, select `SPL` in `File Type`, select `FLASH` in `Memory Type`, Click `Load` to start burning firmware.

   ![mars](/docs/mars/mars-usb-flash-tool_16.png)

   After successful burning, `SUCCEED` and `Complete` will be displayed.

   ![mars](/docs/mars/mars-usb-flash-tool_17.png)

8. Flash the `U-BOOT`

   Click `File Select`, select the `U-BOOT` firmware `mars_visionfive2_fw_payload.img` to be burned, select `U-Boot` in `File Type`, select `FLASH` in `Memory Type`, and then click `Load` to start burning firmware.

   ![mars](/docs/mars/mars-usb-flash-tool_18.png)

   After successful burning, `SUCCEED` and `Complete` will be displayed.

   ![mars](/docs/mars/mars-usb-flash-tool_19.png)

9. After burning is completed, close the UsbFlashTool window and power off Mars.


After powering on again, you can determine whether the bootloader has been updated based on the time information in the serial port log.

```
U-Boot SPL 2021.10 (Aug 31 2023 - 12:55:45 +0800)
```

```
U-Boot 2021.10 (Aug 31 2023 - 12:55:45 +0800), Build: jenkins-github_visionfive2-17
```
## Flash the new version of U-Boot

Assuming your new U-Boot version is on the 1st partition of the SD card, you can install it to the SPI flash using the following commands
```
sf probe
load mmc 0:1 $kernel_addr_r mars_u-boot-spl.bin.normal.out
sf update $kernel_addr_r 0 $filesize
load mmc 0:1 $kernel_addr_r mars_visionfive2_fw_payload.img
sf update $kernel_addr_r 0x100000 $filesize
```
Note: load mmc may be 0:1 or 1:1.

You can run the commands `ls mmc 0:1` and `ls mmc 1:1` to see if the files exist.

```
StarFive # ls mmc 1:1
147336 mars_u-boot-spl.bin.normal.out
2959557 mars_visionfive2_fw_payload.img

2 file(s), 0 dir(s)
```

After updating U-Boot, you may need to reboot and reset the environment to defaults.
```
env default -f -a
env save
```

## Use Uart to start U-BOOT under Linux

When U-BOOT in SPI is damaged and SD card cannot be started, you can use uart to start.

### Download Bootloader Firmware

[Bootloader Firmware](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL: mars_u-boot-spl.bin.normal.out
U-Boot: mars_visionfive2_fw_payload.img
```

### Download tio

For reference: https://github.com/tio/tio

:::tip
Note that you need to download the latest version. The version downloaded by directly running the command `sudo apt-get install tio` does not meet the requirements.
:::

### Boot from UART

Press and hold the upgrade button on Mars, power the board and upload `mars_u-boot-spl.bin.normal.out` via XMODEM.

Run the command `tio -b 115200 --databits 8 --flow none --stopbits 1 /dev/ttyUSB0`
```
$ tio -b 115200 --databits 8 --flow none --stopbits 1 /dev/ttyUSB0
[08:14:54.700] tio v2.7
[08:14:54.700] Press ctrl-t q to quit
[08:14:54.701] Connected

(C)StarFive
CCC
(C)StarFive
CCCCCCCC
```
Press ctrl-t x to start XMODEM-1K transmission, and enter according to the prompts.

``` [15:37:49.827] Please enter which X modem protocol to use: [15:37:49.827] (0) XMODEM-1K send [15:37:49.827] (1) XMODEM-CRC send [15:37:49.827] (2) XMODEM-CRC receive CCCCCCCCCCCCCCCC [15:37:51.940] Send file with XMODEM-1K [15:38:15.230] Sending file '/tmp/mars_u-boot-spl.bin.normal.out' [15:38:15.230] Press any key to abort transfer .................................................................................................................................................................| [15:38:29.151] Done U-Boot SPL 2021.10 (Nov 24 2023 - 10:21:39 +0800)
LPDDR4: 1G version: g8ad50857.
Trying to boot from SPI
```

Note: `Sending file '/path/to/mars_u-boot-spl.bin.normal.out' `, after entering the file to be sent, wait for the | that appears after ..., which means the sending is complete.
