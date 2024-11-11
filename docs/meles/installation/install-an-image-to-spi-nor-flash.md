---
sidebar_label: 'Install an image to SPI Nor Flash'
sidebar_position: 50
---

# Install an image to SPI Nor Flash

Meles has a SPI nor Flash on board. It contains the Bootloader and supports booting other media that the SoC download mode itself does not directly support such Micro SD card and USB.

## Install an image to SPI Nor Flash via UART port

When you replace a new SPI Nor Flash or the firmware is damaged, you may need to burn an image for it. In this case, you can use the serial port to burn it.

### Requirements

- Meles with proper power
- Bootloader for Meles
- Image writer
- USB to TTL serial cable
- Linux Ubuntu PC

### Install tools on PC

Install yoctools

```
$ sudo pip install yoctools -U
```

Check version

```
$ yoc --version
2.0.74
```

Get image writer, iw-single-line.bin

```
$ wget https://github.com/milkv-meles/thead-bin/raw/main/image-writer/iw-single-line.bin
```

### Get essential images

First you need to prepare the image for burning. If your Meles is the 8GB version, you need to download ```u-boot-with-spl-meles.bin```. If your Meles is the 4GB version, download ```u-boot-with-spl-meles-4g.bin```. These files can be found in the [Official Image](../resources-download/image.md) section.

Download zero image.

```
$ wget https://github.com/milkv-meles/thead-bin/raw/main/image-writer/zero-1m.img
```

### Boot Meles to download mode

To boot Meles to download mode is simple:

- Power down Meles
- Plug USB to TTL serial cable to Meles debug port
- Press download button and hold it
- Plug USB Type-C power adapter to Meles Type-C port to power on Meles
- Release download button

### Write Bootloader to SPI Nor Flash

#### Step 1: Check available devices with cct tool

Run the following command. /dev/ttyUSB0 is the serial port on PC.

```
$ sudo cct list -u /dev/ttyUSB0
Wait ..............
```

:::tip
The log output "Wait ......" here means that the cct program is waiting for Meles to respond, and Meles will only respond at the moment of entering the download mode.

Do not close the terminal, and ignore the printed logs and go directly to Step 2.
:::

#### Step 2: Boot Meles to download mode

- Power down Meles
- Plug USB to TTL serial cable to Meles debug port
- Press download button and hold it
- Plug USB Type-C power adapter to Meles Type-C port to power on Meles
- Release download button
- Check device

The terminal opened in Step 1 will now print a list of storage devices.
```
$ sudo cct list -u /dev/ttyUSB0
Wait ............................
Memory device list:
  dev = ram0   , size =    1.1MB
  dev = qspi0  , size =   16.0MB
```

#### Step 3: Download image writer to SRAM

```
$ sudo cct download -u /dev/ttyUSB0 -d ram0 -f ./iw-single-line.bin -v checksum -r
Wait 
Send file './iw-single-line.bin' to 2:0 ...
File ./iw-single-line.bin download success.     
Start to verify data with method:[checksum]
checksum value is: 0x880572
读出并校验成功!
Start to run image...
```

#### Step 4: Download Bootloader to SPI Nor Flash

Download bootloader to 8GB Meles.

```
$ sudo cct download -u /dev/ttyUSB0 -d qspi0 -f ./u-boot-with-spl-meles.bin -v checksum -r -t 1200
Wait 
Send file './u-boot-with-spl-meles.bin' to 23:0 ...
File ./u-boot-with-spl-meles.bin download success.
Start to verify data with method:[checksum]
checksum value is: 0x428a844
读出并校验成功!
Start to run image...
```

#### Step 5: Power cycle Meles

Power cycle Meles and the blue LED should be always on.

### Erase SPI Nor Flash

#### Step 1: Check available devices with cct tool

Run the following command. Device /dev/ttyUSB0 is the serial port on PC.

```
$ sudo cct list -u /dev/ttyUSB0
Wait ..............
```

:::tip
The log output "Wait ......" here means that the cct program is waiting for Meles to respond, and Meles will only respond at the moment of entering the download mode.

Do not close the terminal, and ignore the printed logs and go directly to Step 2.
:::

#### Step 2: Boot Meles to download mode

- Power down Meles
- Plug USB to TTL serial cable to Meles debug port
- Press download button and hold it
- Plug USB Type-C power adapter to Meles Type-C port to power on Meles
- Release download button
- Check device

The terminal opened in Step 1 will now print a list of storage devices.
```
$ sudo cct list -u /dev/ttyUSB0
Wait ............................
Memory device list:
  dev = ram0   , size =    1.1MB
  dev = qspi0  , size =   16.0MB
```

#### Step 3: Download image writer to SRAM

```
$ sudo cct download -u /dev/ttyUSB0 -d ram0 -f ./iw-single-line.bin -v checksum -r
Wait 
Send file './iw-single-line.bin' to 2:0 ...
File ./iw-single-line.bin download success.     
Start to verify data with method:[checksum]
checksum value is: 0x880572
读出并校验成功!
Start to run image...
```

#### Step 4: Download zero image to SPI Nor Flash

```
$ sudo cct download -u /dev/ttyUSB0 -d qspi0 -f ./zero-1m.img -v checksum -r -t 1200
Wait 
Send file './zero-1m.img' to 23:0 ...
File ./zero-1m.img download success.     
Start to verify data with method:[checksum]
checksum value is: 0x0
读出并校验成功!
Start to run image...
```

#### Step 5: Power cycle Meles

Power cycle Meles and the Soc will go directly into download mode and the blue LED will go out.


## Flashing images for SPI Nor Flash via Fastboot

If there is available firmware in SPI Nor Flash, and Meles has an eMMC module installed，the image can be burned through Fastboot when the Soc enters download mode.

Because the TH1520 chip does not have a driver under Windows, the following steps must be performed under the Ubuntu system.

### Download images and tools

First, you need to execute the following command to install the fastboot utility

```
sudo apt-get install android-tools-adb
sudo apt-get install fastboot
```

In addition, you need to prepare the image file for flashing. If your Meles is the 8GB version, you need to download ```u-boot-with-spl-meles.bin```. If your Meles is the 4GB version, download ```u-boot-with-spl-meles-4g.bin```. These files can be found in the [Official Image](../resources-download/image.md) section.

### Start to write

#### Step 1: Launch Meles in download mode

- Meles shuts down and powers off
- Press and hold the download button
- Plug in the Type C cable to power up Meles
- Release the Download button

Type the following command on the PC to view the device:

```
$ lsusb | grep T-HEAD
Bus 001 Device 045: ID 2345:7654 T-HEAD USB download gadget
```

At this time, execute the ```fastboot devices``` command, and the fastboot device number will be returned on the screen, proving that fastboot is available.

#### Step 2: Write

Enter the directory where the image file is stored and execute the following command to start flashing:

```
fastboot flash ram u-boot-with-spl.bin
fastboot reboot
#Wait 3-5 seconds for Meles to reboot
fastboot flash uboot u-boot-with-spl.bin
```

#### Step 3: Restart Meles

After Meles is powered on again, if the system is normal, the blue LED should be always on.
