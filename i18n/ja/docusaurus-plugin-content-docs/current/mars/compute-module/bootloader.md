---
sidebar_label: 'Bootloader Update'
sidebar_position: 40
---

# Milk-V Mars CM Bootloader Update Guide

Whether Mars CM starts the system through the SD card or the eMMC module, it must be started through the Bootloader boot program. This boot program is stored in an SPI Flash on the board and contains two parts: `SPL` and `U-Boot`.

:::tip
The Bootloader in Mars CM can be understood as the BIOS in PC
:::

When Mars CM is shipped, it already comes with a pre-installed initial Bootloader program. There is no need to upgrade this program during normal usage. Bootloader upgrade is only necessary in the following situations:

1. When the bootloader program in SPI Flash is accidentally damaged, causing the system to fail to start normally.
2. When upgrading the official system image (such as Debian), it must be matched with the new bootloader, otherwise it cannot be started.
3. U-Boot has fixed some bugs or added new functions. When you need to use these new functions.

There are several ways to update the Bootloader in SPI Flash on Mars CM, such as Windows burning tools, TFTP, flashcp commands, etc. Here we first introduce how to use the UsbFlashTool burning tool in Windows systems.

Mars CM can be used with different base-boards. Here we take the Raspberry Pi `CM4 IO Board` base board as an example.

## Upgrade Bootloader using UsbFlashTool Windows tool

### Download UsbFlashTool burning tool and Bootloader firmware

[UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

[Bootloader firmware](https://github.com/milkv-mars/mars-buildroot-sdk/releases)

```
SPL:    u-boot-spl.bin.normal.out
U-BOOT: visionfive2_fw_payload.img
```

### Install driver for the burning tool

:::tip
Driver installation is only required for the first use.
:::

Please refer to [Install driver for the burning tool
](https://milkv.io/docs/mars/compute-module/boot#install-driver-for-the-burning-tool).

After installing the driver, return here to continue the operation.

### Upgrade Bootloader

The first 6 steps of burning the bootloader are the same as the first 6 steps of installing the driver above.

1. Connect the USB to TTL serial port cable to the 40 pin header on the base-board, connect the USB to the PC and note down the serial port number

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/mars-usb-flash-tool_02.png)

   **Note: If any other serial port program is open and using the serial port, please exit the program to release the port and avoid occupying it.**

2. Short-circuit pins 1 and 2 of the J12 header on the CM4 IO Board using a jumper cap (USB flashing mode)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. Connect the PC and the base-board's J11 USB Slave interface using a Micro USB data cable

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. Run the `UsbFlashTool-*-Windows.exe` flashing program in the flashing tool directory

   ![mars-cm](/docs/mars/mars-usb-flash-tool_05.png)

5. Set the serial port number in the `Serial Setting` on the right side to the serial port number noted in step 1

   ![mars-cm](/docs/mars/mars-usb-flash-tool_06.png)

6. Power on the base-board through the 12V DC interface

7. Flash the `SPL`

   Click `File Select`, select the `SPL` firmware `u-boot-spl.bin.normal.out` to be burned, select `SPL` in `File Type`, select `FLASH` in `Memory Type`, Click `Load` to start burning firmware.

   ![mars](/docs/mars/mars-usb-flash-tool_16.png)

   After successful burning, `SUCCEED` and `Complete` will be displayed.

   ![mars](/docs/mars/mars-usb-flash-tool_17.png)

8. Flash the `U-BOOT`

   Click `File Select`, select the `U-BOOT` firmware `visionfive2_fw_payload.img` to be burned, select `U-Boot` in `File Type`, select `FLASH` in `Memory Type`, and then click `Load` to start burning firmware.

   ![mars](/docs/mars/mars-usb-flash-tool_18.png)

   After successful burning, `SUCCEED` and `Complete` will be displayed.

   ![mars](/docs/mars/mars-usb-flash-tool_19.png)

9. After burning is completed, close the UsbFlashTool window, power off the base-board, and remove the jumper cap in step 2


After powering on again, you can determine whether the bootloader has been updated based on the time information in the serial port log.

```
U-Boot SPL 2021.10 (Aug 31 2023 - 12:55:45 +0800)
```

```
U-Boot 2021.10 (Aug 31 2023 - 12:55:45 +0800), Build: jenkins-github_visionfive2-17
```
