---
sidebar_label: 'Boot the Mars CM'
sidebar_position: 10
---
# Boot the Mars CM

:::tip
Mars CM has two versions based on storage, one is `Mars CM` with eMMC storage, and the other is `Mars CM Lite` without eMMC storage. The Lite version can only be accessed through SD card on the base-board. If the base-board you are using does not have a SD card interface, you cannot use the Lite version. In addition, the eMMC version shares the hardware interface with the SD card, so they cannot be used at the same time. In other words, when using the eMMC version of Mars CM, you cannot insert a storage card into the SD card slot on the base-board.
:::

Mars CM adopts a core board design, with pin compatibility with Raspberry Pi CM4. It can be used with different base-boards. The firmware we currently release is compatible with the Raspberry Pi CM4 IO Board.

Taking the Raspberry Pi CM4 IO Board as an example, we will introduce how to burn firmware for the `eMMC` version and the `Lite `version.

## Mars CM eMMC version image burning

### Prepare

- Necessary
  - Mars CM eMMC version
  - Raspberry Pi CM4 IO Board or other Raspberry Pi CM4 compatible base-board
  - USB to TTL serial cable
  - USB data cable
- Optional
  - HDMI cable

### Download image and burning tools
- Download the Debian system image: [Official Image](https://milkv.io/zh/docs/mars/compute-module/resources/image)
- Download the eMMC image burning tool: [UsbFlashTool](https://github.com/milkv-mars/mars-tools/blob/main/Mars-UsbFlashTool-v2.4-Windows.zip)

### Install driver for the burning tool

:::tip
Driver installation is only required for the first use.
:::

Extract the downloaded `Mars-UsbFlashTool-*-Windows.zip` into the Windows system.

1. Connect the USB to TTL serial port cable to the 40 pin header on the base-board, connect the USB to the PC and note down the serial port number

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/mars-usb-flash-tool_02.png)

   Note: If any other serial port program is open and using the serial port, please exit the program to release the port and avoid occupying it.

2. Short-circuit pins 1 and 2 of the J12 header on the CM4 IO Board using a jumper cap (USB flashing mode)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. Connect the PC and the base-board's J11 USB Slave interface using a Micro USB data cable

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. Run the `UsbFlashTool-*-Windows.exe` flashing program in the flashing tool directory

   ![mars-cm](/docs/mars/mars-usb-flash-tool_05.png)

5. Set the serial port number in the `Serial Setting` on the right side to the serial port number noted in step 1

   ![mars-cm](/docs/mars/mars-usb-flash-tool_06.png)

6. Power on the base-board through the 12V DC interface
7. Select `Firmware` in `File Type`, then click `File Select` to select the `usbprog-mars-230510.out` in the `update` directory, then click `Load`, and wait for the message `Loaded` to appear after loading

   ![mars-cm](/docs/mars/mars-usb-flash-tool_07.png)

8. At this time, the JH7110 device has been identified in the Windows Device Manager and the driver needs to be installed

   ![mars-cm](/docs/mars/mars-usb-flash-tool_08.png)

9. Run the `zadig-2.5` program in the flashing tool directory, select `List All Devices` in the menu `Options`, select `StarFive JH7110 Device` in the drop-down list, and then click `Install Driver` to complete the driver installation

   ![mars-cm](/docs/mars/mars-usb-flash-tool_09.png)

   After the driver is successfully installed, check whether the status in the device manager has become a normal USB device

   ![mars-cm](/docs/mars/mars-usb-flash-tool_10.png)

10. After the driver is installed successfully, close the UsbFlashTool window, power off the base-board, and remove the jumper cap in step 2

### Burn image

The first 6 steps of burning the image are the same as the first 6 steps of installing the driver above.

1. Connect the USB to TTL serial port cable to the 40 pin header on the base-board, connect the USB to the PC and note down the serial port number

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_01.jpg)

   ![mars-cm](/docs/mars/mars-usb-flash-tool_02.png)

   Note: If any other serial port program is open and using the serial port, please exit the program to release the port and avoid occupying it.

2. Short-circuit pins 1 and 2 of the J12 header on the CM4 IO Board using a jumper cap (USB flashing mode)

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_03.jpg)

3. Connect the PC and the base-board's J11 USB Slave interface using a Micro USB data cable

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_04.jpg)

4. Run the `UsbFlashTool-*-Windows.exe` flashing program in the flashing tool directory

   ![mars-cm](/docs/mars/mars-usb-flash-tool_05.png)

5. Set the serial port number in the `Serial Setting` on the right side to the serial port number noted in step 1

   ![mars-cm](/docs/mars/mars-usb-flash-tool_06.png)

6. Power on the base-board through the 12V DC interface
7. Select `Firmware` in `File Type`, then click `File Select` to select the `usbprog-mars-230510.out` in the `update` directory, then click `Load`, and wait for the message `Complete` to appear after loading

   ![mars-cm](/docs/mars/mars-usb-flash-tool_15.png)

8. Click `File Select` again, select the firmware for Mars CM eMMC version, select `Allinone` in `File Type`, select `EMMC` in `Memory Type`, and then click Load to start burning the image

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_16.png)

   Note that this burning program uses segmented burning, so the progress bar does not scroll in real time. Please wait patiently for a while.

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_17.png)

   The burning process takes about 10 minutes. When the final prompt is 100% and there is no error message, the burning is complete.

   ![mars-cm](/docs/mars/cm/mars-cm-docs_boot_18.png)

9. After burning is completed, close the UsbFlashTool window, power off the base-board, and remove the jumper cap in step 2

### Power on

Connect the base-board to the monitor with an HDMI cable. Note that Mars CM only has one HDMI signal, so the HDMI cable is connected to HDMI0 on the CM4 IO Board.

Power on the 12V DC interface of the base-board. After waiting for the system to start, the green LED on the Mars CM starts to flash, and the Debian login interface will be displayed on the monitor.

## Mars CM Lite version image burning

The Lite version does not come with eMMC and needs to burn the firmware to the SD card. The burning method is the same as the image burning method for other development boards such as Raspberry Pi and Mars.

### Prepare

- Necessary
  - Mars CM Lite
  - Raspberry Pi CM4 IO Board or other Raspberry Pi CM4 compatible base-board
  - microSD card with a capacity of 8GB or above
  - microSD card reader
- Optional
  - USB to TTL serial cable
  - HDMI cable

### Download image and burning tools
- Download the Debian system image: [Official Image](https://milkv.io/zh/docs/mars/compute-module/resources/image)
- Download the burning tool: [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/)

### Burn image

Take burning using the `balenaEtcher` tool as an example:

- Click **Flash from file** to select the system image

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_01.png)

- Click **Select target** to select the target SD card

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_02.png)

- Click **Flash!** to start burning

![mars-cm](/docs/mars/cm/mars-cm-docs_boot_etcher_03.png)

### Power on

Install the Mars CM core board onto the base-board of the Raspberry Pi CM4 IO Board and connect the monitor with an HDMI cable. Note that Mars CM only has one HDMI signal, so the HDMI cable is connected to HDMI0 on the base board.

Insert the microSD card with the above burned image into the card slot of the base-board.

Power on the 12V DC interface of the base-board. After waiting for the system to start, the green LED on the Mars CM starts to flash, and the Debian login interface will be displayed on the monitor.

## Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.
