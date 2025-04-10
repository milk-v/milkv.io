---
sidebar_label: 'Install OS'
sidebar_position: 10
---

# Milk-V Megrez Install OS

## Boot Instructions

The Megrez mainboard supports booting the system from four types of media: SD card, eMMC module, SSD (M.2 SATA), and SATA hard drive.

:::tip
The onboard SPI Flash is used to store boot programs like u-boot, which then loads the operating system from eMMC or SSD based on the boot priority.
:::

## System Image Information

Currently, the Megrez image package format is `img.zip`.

- System image packages with the `.img.zip` suffix:
  - Can be flashed using tools like `balenaEtcher`, `Rufus`, or `Win32DiskImager`. On Linux, the `dd` command can be used. Some tools support flashing directly from the zip file, while others require extracting it to an `.img` file first. Please try accordingly.

## (Recommended) Using BalenaEtcher to Install the System onto SD Card/M.2 SATA SSD/SATA Hard Drive/eMMC Module

### Preparation
- A MicroSD card (greater than 16GB), M.2 SATA SSD, SATA hard drive, or eMMC module.
- An SD card reader, M.2 SATA enclosure, SATA hard drive enclosure, or eMMC module reader.

Using `balenaEtcher` as an example, the flashing process is as follows:

First, connect the storage media to your PC via the appropriate reader. Installing the system on the target drive will erase all existing data on the storage media, so **back up any important files** beforehand.

Download the appropriate system image package (suffix `.img.zip`) from the resource download page: [Resource Download Overview](https://milkv.io/docs/megrez/getting-started/resources).

You can either extract it to an `.img` file before flashing or flash it directly without extracting, as `balenaEtcher` supports loading zip files.

1. Download and install the flashing tool [balenaEtcher](https://etcher.balena.io/).
2. Click `Flash from file` and select the downloaded image.
   <Image src='/docs/common/etcher-step1.webp' maxWidth='100%' align='left' />
3. Click `Select target` and choose the storage media.
   <Image src='/docs/common/etcher-step2.webp' maxWidth='100%' align='left' />
4. Click `Flash!` to start the flashing process.
   <Image src='/docs/common/etcher-step3.webp' maxWidth='100%' align='left' />

After flashing is complete, insert the storage media into the Megrez mainboard and power it on. Since the system does not currently support automatic partition resizing on first boot, please manually resize the system partition as described in the "System Partition Resizing" section.

## Using Fastboot to Install the System onto SD Card/M.2 SATA SSD/eMMC Module

Coming soon.

## System Partition Resizing

:::tip
The system does not currently support automatic partition resizing after boot. Please resize manually after the first boot to avoid running out of space or being unable to access the desktop after a reboot.
:::

The following instructions use the `gparted` tool as an example for resizing. You may also use other tools you are familiar with to accomplish the task.

1. Install the `gparted` tool.
   ```bash
   sudo apt update
   sudo apt install gparted
   ```
   
2. Launch the gparted program from the command line or by selecting it from the application menu.
   ```bash
   sudo gparted
   ```

3. In the top-right corner, select the SD card device. You should see the unallocated space (22GB) and the root filesystem rootfs `/` (6GB).
   <Image src='/docs/jupiter/gparted-extend-01.webp' maxWidth='100%' align='left' />

4. Select the rootfs `/` partition, right-click, and choose `Resize/Move` to expand the partition.
   <Image src='/docs/jupiter/gparted-extend-02.webp' maxWidth='100%' align='left' />

5. In the `New size` field, specify the size of the root filesystem. It is recommended to set at least 16GB (enter `16384`). You can also adjust the size by dragging the top slider. Alternatively, set `Free space following` to `0` to allocate all remaining space to the root filesystem.
   <Image src='/docs/jupiter/gparted-extend-03.webp' maxWidth='100%' align='left' />

6. After making the changes, click `Resize`.
   <Image src='/docs/jupiter/gparted-extend-04.webp' maxWidth='100%' align='left' />

7. You will now see that the rootfs `/` partition has been resized to 16GB. Click the `checkmark` icon in the menu to apply the changes.
   <Image src='/docs/jupiter/gparted-extend-05.webp' maxWidth='100%' align='left' />
   A prompt will appear. Select `Apply`.
   <Image src='/docs/jupiter/gparted-extend-06.webp' maxWidth='100%' align='left' />

8. After the changes are applied, the final partition layout will appear as follows:
   <Image src='/docs/jupiter/gparted-extend-07.webp' maxWidth='100%' align='left' />

## Updating/Re-Flashing U-Boot

### When U-Boot is Available
Please prepare a USB drive and format it to EXT4 format. Store the [bootloader file](http://milkv.io/docs/megrez/getting-started/resources#bootloader-download) on the USB drive. If there are multiple partitions, place it in the first partition.

While the device is powered off, use a Type-C cable or TTL-USB cable to connect the Milk-V Megrez to the PC. Refer to the [UART Serial Console](https://milkv.io/docs/megrez/getting-started/setup#usb-to-serial-cable) for more details.

Switch the `Recovery/Normal Boot Toggle Switch` to `Normal`.

Power on the device, observe the output from the `UART serial console`, and press `s` to interrupt the automatic boot process.

Use the command `ls usb 0` to check if the files on the USB drive are correctly recognized. If recognition fails, try using another USB port or drive, and ensure it is formatted to EXT4.

Use the following command to load the `bootloader_milkv-megrez-2025-0102.bin` file from the USB drive to the memory address starting at 0x90000000.

~~~
ext4load usb 0 0x90000000 bootloader_milkv-megrez-2025-0102.bin 
~~~

Use the following command to burn the file just loaded into the SPI flash.

~~~
es_burn write 0x90000000 flash
~~~

### When U-Boot is Unavailable
Please prepare a USB drive and format it to EXT4 format. Store the [bootloader file](https://milkv.io/docs/megrez/getting-started/resources) on the USB drive. If there are multiple partitions, place it in the first partition.

Switch the `Recovery/Normal Boot Toggle Switch` to `Recovery`.

Use a Type-C cable to connect the Type-C port of the Milk-V Megrez to the PC while the device is powered off.

Power on the device, and the PC will detect a USB storage device named `ESWIN-2030`.

Copy the [bootloader file](https://milkv.io/docs/megrez/getting-started/resources) to `ESWIN-2030`. The `UART serial console` will start printing, and the system will use the uboot file from `ESWIN-2030` as a temporary bootloader.

<Image src='/docs/megrez/recovery-linux.webp' maxWidth='100%' align='left' />
<Image src='/docs/megrez/recovery-print.webp' maxWidth='100%' align='left' />

Press `s` to interrupt the automatic boot process.

Use the command `ls usb 0` to check if the files on the USB drive are correctly recognized. If recognition fails, try using another USB port or drive, and ensure it is formatted to EXT4.

Use the following command to load the `bootloader_milkv-megrez-2025-0102.bin` file from the USB drive to the memory address starting at 0x90000000.

~~~
ext4load usb 0 0x90000000 bootloader_milkv-megrez-2025-0102.bin 
~~~

Use the following command to burn the file just loaded into the SPI flash.

~~~
es_burn write 0x90000000 flash
~~~

Wait for the process to complete, then reboot the device to finish the update.
