---
sidebar_label: 'Install OS'
sidebar_position: 10
---

# Milk-V Jupiter Install OS Image

## Startup Introduction

Jupiter board supports booting the system from three media: SD card, eMMC, and SSD (M.2 NVMe). The boot priority is: `SD card > SSD > eMMC`.

:::tip
The onboard SPI Flash can also boot the system, but due to its small capacity, it is currently only used to store boot programs such as u-boot, and then load the operating system in the eMMC or SSD according to the boot priority. The SD card system does not go through the SPI Flash.
:::

## System Image Description

Currently, Jupiter's image package formats mainly include the following two formats. Pay attention to the difference when installing the system.

- The system image package with the suffix `.img.zip` is a dedicated image package for SD cards.

  - The SD card must be inserted into the PC through a card reader for burning.

  - Supports burning using the Spacemit official burning tool `titanflasher` (need to be unzipped to a `.img` file before burning).

  - It also supports burning with tools such as `balenaEtcher`, `Rufus`, `Win32DiskImager`, etc. In Linux, you can use the `dd` command to burn. Some of these tools support burning zip packages directly, while some need to be decompressed into `.img` files before burning. Please try it yourself. For the method of burning with `balenaEtcher`, please refer to the section at the end of the page.

- The system image package with the suffix `.zip` can be burned to SSD, eMMC or SD card.

  - Must use Spacemit official flashing tool `titanflasher` to flash.

  - When burning to SSD or eMMC, you must connect to the PC via a Type-C cable for burning.

  - When burning to an SD card, the SD card must be inserted into the PC through a card reader for burning.

    :::tip
    Currently, the titanflasher tool still has some minor issues. Please do not use titanflasher to burn the `.zip` image package to the SD card yet.
    :::


The following uses the Spacemit `titanflasher` tool as an example to introduce the methods of burning to SD card, SSD, and eMMC respectively.

## Download and install the `titanflasher` tool

`titanflasher` currently provides versions for both X86(X64) and Linux platforms.

download link: [https://github.com/milkv-jupiter/jupiter-tools/releases/tag/titanflasher](https://github.com/milkv-jupiter/jupiter-tools/releases/tag/titanflasher)

If prompted during Windows installation, select `Install this driver software anyway`.
<Image src='/docs/jupiter/titanflasher-20-en.webp' maxWidth='100%' align='left' />

:::tip
When using the `titanflasher` tool to flash the firmware, the firmware will be unzipped to its workspace. Please check `Automatically clean up` in `Settings`, or manually delete unused files in the workspace directory to avoid cache files taking up too much system space after multiple flashes.
:::
<Image src='/docs/jupiter/titanflasher-35-en.webp' maxWidth='100%' align='left' />

## Install OS to the SD card

The SD card OS has the highest startup priority. All boot programs required for startup, including u-boot, kernel, and system, are stored in the SD card.

First, go to the resource download page to download the system image package for the SD card (the suffix is ​​`.img.zip`):[Resource Download Summary](https://milkv.io/docs/jupiter/getting-started/resources)。

After downloading, unzip it into a `.img` file.

Insert the SD card into the PC through the card reader. Installing the system to the SD card will clear the original data in the SD card, so **note to back up important files in the card in advance**.

1. Run the `titanflasher` tool and select "Development Tools".
   <Image src='/docs/jupiter/titanflasher-01-en.webp' maxWidth='100%' align='left' />
2. Select Card Startup.
   <Image src='/docs/jupiter/titanflasher-02-en.webp' maxWidth='100%' align='left' />
3. Click "Select SD Card" to select the target SD card.
   <Image src='/docs/jupiter/titanflasher-03-en.webp' maxWidth='100%' align='left' />
4. Click "Select Flash Package".
   <Image src='/docs/jupiter/titanflasher-04-en.webp' maxWidth='100%' align='left' />
5. Click "Local Image" and select the unzipped `.img` SD card image.
   <Image src='/docs/jupiter/titanflasher-05-en.webp' maxWidth='100%' align='left' />
6. Select "Burn Starter Card".
   <Image src='/docs/jupiter/titanflasher-06-en.webp' maxWidth='100%' align='left' />
7. Click "Execute".
   <Image src='/docs/jupiter/titanflasher-07-en.webp' maxWidth='100%' align='left' />
8. Click "OK".
   <Image src='/docs/jupiter/titanflasher-08-en.webp' maxWidth='100%' align='left' />
9. Start burning.
   <Image src='/docs/jupiter/titanflasher-09-en.webp' maxWidth='100%' align='left' />

When the burning progress bar shows 100%, the burning is complete. Insert the SD card with the burned system into the SD card slot of Jupiter, power on, and if the Desktop version of the system is installed, the display connected via HDMI will display the startup LOGO, and the system will enter the desktop after startup.

### System partition expansion

:::tip
The SD card system currently does not have the function of automatically expanding the capacity after booting. Please manually expand the capacity after booting, otherwise the system will report insufficient space and even fail to enter the desktop after restarting. The SSD and eMMC systems will automatically expand the capacity and do not require this step.
:::

The following uses the `gparted` tool as an example to explain how to expand the capacity. You can also use other tools that you are familiar with to complete the expansion.

1. Install the `gparted` tool.
   ```bash
   sudo apt update
   sudo apt install gparted
   ```
2. Start the `gparted` program from the command line or click on the `gparted` application from the application list in the menu.
   ```bash
   sudo gparted
   ```

3. Select the SD card device in the upper right corner, and you can see that the current unallocated space of the SD card is 22G, and the root file system rootfs `/` is 6G.
   <Image src='/docs/jupiter/gparted-extend-01.webp' maxWidth='100%' align='left' />

4. Select the rootfs `/` partition, right-click and select `Resize/Move` to expand the partition.
   <Image src='/docs/jupiter/gparted-extend-02.webp' maxWidth='100%' align='left' />

5. In `New size`, specify the size of the root file system. It is recommended to set it to at least 16G. Enter `16384`. You can also drag the top slider to adjust the size. You can also set `Free space following` to `0` to allocate all the remaining space on the SD card to the root file system.
   <Image src='/docs/jupiter/gparted-extend-03.webp' maxWidth='100%' align='left' />

6. After modifying, click `Resize`
   <Image src='/docs/jupiter/gparted-extend-04.webp' maxWidth='100%' align='left' />

7. You can see that the current rootfs `/` has been changed to 16G. Click the `Check Mark` button in the menu to start the change.
   <Image src='/docs/jupiter/gparted-extend-05.webp' maxWidth='100%' align='left' />
   When a prompt pops up, select `Apply`.
   <Image src='/docs/jupiter/gparted-extend-06.webp' maxWidth='100%' align='left' />

8. After the change is completed, the final partition situation is as follows.
   <Image src='/docs/jupiter/gparted-extend-07.webp' maxWidth='100%' align='left' />

## Install OS to eMMC or SSD

When burning the system image to SSD or eMMC, it must be connected to a PC via a Type-C cable for burning.

:::tip
The priority of burning is the same as the priority of booting. If both SSD and eMMC exist, the image will be burned to SSD. When neither SSD nor eMMC exists, the `titanflasher` tool will only burn u-boot to SPI Flash.
:::

First, go to the resource download page to download the system image package with the suffix `.zip` (not `.img.zip`): [Resource Download Summary](https://milkv.io/docs/jupiter/getting-started/resources)。

### Use titanflasher flash tool

Note that you do not need to unzip the zip package after downloading it.

1. Use a Type-C cable to connect the Type-C port of Jupiter to the PC.
   <Image src='/docs/common/usba2typec.webp' maxWidth='50%' align='left' />

2. Press and hold the RECOVERY button on the board or short the RECOVERY pins, then power on Jupiter to enter USB burning mode.
   <Image src='/docs/jupiter/jupiter-recovery.webp' maxWidth='100%' align='left' />

3. Open the titanflasher tool, select `Development Tools`, and then select `Standalone Flashing`.
   <Image src='/docs/jupiter/titanflasher-30-en.webp' maxWidth='100%' align='left' />

4. Click `Scan Devices` and select the identified `dfu-device`.
   <Image src='/docs/jupiter/titanflasher-31-en.webp' maxWidth='100%' align='left' />

5. Click `Select Flash File`, select the zip system image, the tool will decompress it first, please wait for a while. If you need to restart automatically after the flash is completed, you can check `Auto-start after flashing`.
   <Image src='/docs/jupiter/titanflasher-32-en.webp' maxWidth='100%' align='left' />

6. Click `Start Flashing` to start burning.
   <Image src='/docs/jupiter/titanflasher-33-en.webp' maxWidth='100%' align='left' />

7. It will show that 100% of the burning is completed. You can power off and restart the board to enter the system.
   <Image src='/docs/jupiter/titanflasher-34-en.webp' maxWidth='100%' align='left' />

### Using fastboot

In addition to using titanflasher, you can also use the `fastboot` method to flash the device. The complete flashing steps of this method need to be further improved. The following flashing commands are for developers' reference only.

```bash
fastboot stage factory/FSBL.bin
fastboot continue
sleep 2

fastboot stage u-boot.itb
fastboot continue
sleep 3
#adb reboot bootloader
#sleep 3

fastboot flash gpt partition_universal.json
fastboot flash bootinfo factory/bootinfo_sd.bin
fastboot flash fsbl factory/FSBL.bin
fastboot flash env env.bin
fastboot flash opensbi opensbi.itb
fastboot flash uboot u-boot.itb
fastboot flash bootfs bootfs.img
fastboot flash rootfs rootfs.ext4

sleep 2
fastboot reboot
```

## Others

### Use 3rd tools to burn SD card images

SD card system image can be burned using tools such as balenaEtcher, Rufus, Win32DiskImager, etc. Taking `balenaEtcher` as an example, the burning method is as follows.

First, insert the SD card into the PC through the card reader. Installing the system to the SD card will clear the original data in the SD card, so **note to back up important files in the card in advance**.

Go to the resource download page to download the system image package for the SD card (suffix is ​​`.img.zip`): [Resource download summary](https://milkv.io/docs/jupiter/getting-started/resources)。

You don't need to decompress the file after downloading. `balenaEtcher` supports loading zip packages.

1. Download the image burning tool [balenaEtcher](https://etcher.balena.io/) and install it.
2. Click `Flash from file` and select the downloaded SD card image.
   <Image src='/docs/common/etcher-step1.webp' maxWidth='100%' align='left' />
3. Click `Select target` to select the SD card.
   <Image src='/docs/common/etcher-step2.webp' maxWidth='100%' align='left' />
4. Click `Flash!` to start flashing.
   <Image src='/docs/common/etcher-step3.webp' maxWidth='100%' align='left' />

After the burning is complete, insert the SD card into the Jupiter board and start the system. The SD card system currently does not have the function of automatically expanding the capacity after startup. After the first startup, please expand the system partition according to the method in the previous section.
