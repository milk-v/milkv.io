---
sidebar_label: 'Visuino'
sidebar_position: 99
---

# Introduction

Visuino is a visual programming environment designed for Arduino and other microcontroller boards. It allows users to create projects without needing to write code manually. Instead, you can use a drag-and-drop interface to connect components and set up your project visually. Visuino then generates the necessary code for you.

<Image src='/docs/duo/visuino/Visuino-program-Main-slide3.gif' maxWidth='100%' align='left' />

Milk-V Duo series now supports Arduino development and automaticly will accept ``Visuino``. You can directly use the Visuino IDE and, after a simple configuration, start using it.

<Image src='/docs/duo/visuino/inst-visuino-6.webp' maxWidth='100%' align='left' />

The Duo series CPU adopts a big-little core design, where the Visuino firmware runs on the little core, while the big core is responsible for communication with the Visuino IDE. It receives the Visuino firmware and loads it onto the little core for execution. At the same time, the Linux system in the big core also operates normally.

## 1. Development Environment Setup

### Install Visuino IDE

Visuino IDE supports runs on Windows. Go to [Visuino official website](https://www.visuino.com) to download Visuino. The current latest version is Pro 8.0.0.129, and it is recommended to use the latest version.

[Download file](https://www.visuino.com/installs/Visuino_Pro_8_0_0_129_Beta2.zip)

### Add Duo 256 to VISUINO IDE

Open Visuino IDE, select ``Board Type filter`` in the ``Select Board`` of ``Arduino Uno R3 template``, and type Milk V Duo 256M in the  ``Filter``

<Image src='/docs/duo/visuino/inst-visuino-1.webp' maxWidth='100%' align='left' />

After configuring, select ``Power Button icon`` and a box will open, then click in  in the ``Gear Icon``, then the project will be compiled.

<Image src='/docs/duo/visuino/inst-visuino-2.webp' maxWidth='100%' align='left' />

See the compiling

<Image src='/docs/duo/visuino/inst-visuino-4.webp' maxWidth='100%' align='left' />

Now you can do a VISUINO project and test.

### Test blinking the onboard LED

Currently, Duo's SD card system needs to burn firmware that supports Arduino. Please download the firmware with the prefix `arduino` from [Latest Release](https://github.com/milkv-duo/duo-buildroot-sdk/releases) firmware.

:::tip
The latest available Arduino firmware version is [v1.1.4](https://github.com/milkv-duo/duo-buildroot-sdk/releases/).
:::

Refer to [Boot the Duo](https://milkv.io/docs/duo/getting-started/boot) to install the system.

Use a USB cable to connect Duo to your computer, and Duo will automatically power on.

Duo's default firmware, the large-core Linux system, will control the on-board LED flashing. This is achieved through the boot script. Now we are going to use the little-core Visuino to light up the LED. We need to disable the LED flashing script in the large-core Linux. In Duo's Execute in terminal:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
That is to say, rename the LED flashing script. After restarting Duo, the LED will no longer flash:
```
reboot
```

At this time, there will be an additional serial device in the ``Port`` of the ``Power Box`` of the computer.

On upper right size, search for the ``Pulse`` component and drag it to into the IDE, connect the ``Out`` of Pulse in the ``LED input`` of ``Milk V Duo 256M``,  this project of this program is to blink the onboard LED of the Milk V Duo 256 device. In Duo It is also supported. You may need to install ```pyserial``` in order to upload, and then let’s just click the ``Upload`` button to test.

<Image src='/docs/duo/visuino/inst-visuino-3.webp' maxWidth='100%' align='left' />

Upload it

<Image src='/docs/duo/visuino/inst-visuino-5.webp' maxWidth='100%' align='left' />

At this time, you can see the LED on the Duo board blinking at intervals of 1 second.

:::tip
Before compiling and downloading the code, please make sure that you have installed the ```python``` environment on your computer and configured the environment variables correctly. The lack of the ```python``` environment may cause the code to fail to compile and download.

If you cannot download the firmware to the Duo, please check whether ```pyserial``` is installed first. If not, you can execute ```pip install pyserial``` to install it.

If you still cannot upload code to the Duo after installing ```pyserial```, please check whether ```serial``` is installed on your computer. Installing both ```pyserial``` and ```serial``` at the same time may cause the firmware to fail to download. Please run ```pip uninstall serial``` to uninstall ```serial```.
:::

## Visuino Web Page

[VISUINO](https://www.visuino.com/)
Contact
[Mitov](mailto:mitov@mitov.com)
