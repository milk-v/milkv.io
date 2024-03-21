---
sidebar_label: 'Duo S(SG2000)'
sidebar_position: 3
---

# Duo S

<Image src='/docs/duo/duos/duos-v1.1.webp' maxWidth='70%' align='center' />

Milk-V Duo S is an upgraded model of Duo, featuring an upgraded SG2000 main controller with a larger 512MB memory and expanded IO capabilities. It integrates wireless capabilities with WI-FI 6/BT 5, and comes equipped with a USB 2.0 HOST interface and a 100Mbps Ethernet port for user convenience. Supporting dual cameras (2x MIPI CSI 2-lane) and MIPI video output (MIPI DSI 4-lane), it allows for versatile applications. The device also supports switching between RISC-V and ARM boot through a switch. With enhanced functionality, Duo S is better suited for a variety of scenarios with more complex project development requirements.

## Introduction of SG2000

SG2000 is a high-performance, low-power chip designed for various product fields such as edge intelligent surveillance IP cameras, local facial recognition attendance machines, and smart home devices. It integrates H.264/H.265 video compression and decoding and ISP capabilities. It supports various image enhancement and correction algorithms like HDR wide dynamic range, 3D noise reduction, defogging, and lens distortion correction, providing customers with professional-grade video image quality.

The chip also integrates an in-house TPU, delivering approximately 0.5TOPS of computing power under INT8 operations. The specially designed TPU scheduling engine efficiently provides high-bandwidth data flow for tensor processing unit cores. It also offers users a powerful deep learning model compiler and software SDK development kit. Mainstream deep learning frameworks such as Caffe, Pytorch, ONNX, MXNet, and TensorFlow (Lite) can be easily ported to this platform.

## SG2000 Public Preliminary Datasheet

We have open sourced the Public Preliminary Datasheet and TRM of SG2000 to GitHub. please [check it out](https://github.com/milkv-duo/duo-files/tree/main/duo-s/datasheet).

## Buy the SG2000 Chips

Milk-V is the Authorised Global Distributor of the SG2002 chips. You can buy samples of the SG2002 chip from our distributor [online store](https://arace.tech/products/sophon-cv1800b-5pcs) directly. For volume order, please contact [Milk-V Sales Team](mailto:sales@milkv.io) for the qoutation.

## DuoS GPIO Pinout

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='center' />

### Header J3

<div className='gpio_style'>

| SPI      | PWM  | I2C               | UART     | NAME  | PIN                              | PIN                             | NAME | UART               | PWM  | SPI     | JTAG      |
|:---------|:-----|:------------------|:---------|------:|:--------------------------------:|:-------------------------------:|:-----|:-------------------|:-----|:--------|:----------|
|          |      |                   |          | 3V3   | <div className='orange'>1</div>  | <div className='red'>2</div>    | VSYS |                    |      |         |           |
|          | PWM3 | I2C3_SDA/I2C4_SCL |          | B20   | <div className='green'>3</div>   | <div className='red'>4</div>    | VSYS |                    |      |         |           |
|          |      | I2C3_SCL/I2C4_SDA |          | B21   | <div className='green'>5</div>   | <div className='black'>6</div>  | GND  |                    |      |         |           |
|          |      | I2C1_SCL          |          | B18   | <div className='green'>7</div>   | <div className='green'>8</div>  | A16  | UART0_TX/UART1_TX  | PWM4 |         |           |
|          |      |                   |          | GND\* | <div className='black'>9</div>   | <div className='green'>10</div> | A17  | UART0_RX/UART1_RX  | PWM5 |         |           |
|          | PWM1 | I2C1_SDA          | UART2_TX | B11   | <div className='green'>11</div>  | <div className='green'>12</div> | B19  | UART2_TX           | PWM2 |         |           |
|          | PWM2 | I2C1_SCL          | UART2_RX | B12   | <div className='green'>13</div>  | <div className='black'>14</div> | GND  |                    |      |         |           |
|          |      |                   | UART2_RX | B22   | <div className='green'>15</div>  | <div className='green'>16</div> | A20  |                    |      |         | JTAG_TRST |
|          |      |                   |          | 3V3   | <div className='orange'>17</div> | <div className='green'>18</div> | A19  | UART1_TX/UART1_RTS | PWM7 |         | JTAG_TMS  |
| SPI3_SDO | PWM3 | I2C2_SCL          |          | B13   | <div className='green'>19</div>  | <div className='black'>20</div> | GND  |                    |      |         |           |
| SPI3_SDI |      | I2C2_SDA          |          | B14   | <div className='green'>21</div>  | <div className='green'>22</div> | A18  | UART1_RX/UART1_CTS | PWM6 |         | JTAG_TCK  |
| SPI3_SCK |      |                   | UART2_TX | B15   | <div className='green'>23</div>  | <div className='green'>24</div> | B16  | UART2_RX           |      | SPI3_CS |           |
|          |      |                   |          | GND   | <div className='black'>25</div>  | <div className='green'>26</div> | A28  | UART2_TX/UART1_TX  |      |         |           |


</div>

GPIO on `Header J3` use 3.3V logic levels.

*GND\*: Pin 9 is a low-level GPIO in the V1.1 version of the hardware, and is GND in the V1.2 version and later.*

### Header J4

<div className='gpio_style'>

| PWM   | I2C               | UART     | NAME | PIN                             | PIN                              | NAME        | I2C      | PWM   | SD      | SPI       |
|:------|:------------------|:---------|-----:|:-------------------------------:|:--------------------------------:|:------------|:---------|:------|:--------|:----------|
|       |                   |          | VSYS | <div className='red'>52</div>   | <div className='blue'>51</div>   | AUDIO_OUT_R |          |       |         |           |
| PWM12 | I2C4_SCL          | UART3_TX | B1   | <div className='green'>50</div> | <div className='blue'>49</div>   | AUDIO_OUT_L |          |       |         |           |
| PWM13 | I2C4_SDA          | UART3_RX | B2   | <div className='green'>48</div> | <div className='blue'>47</div>   | AUDIO_IN_R  |          |       |         |           |
|       |                   |          | B3   | <div className='green'>46</div> | <div className='blue'>45</div>   | AUDIO_IN_L  |          |       |         |           |
| PWM10 | I2C2_SDA          |          | E2   | <div className='green'>44</div> | <div className='orange'>43</div> | 3V3         |          |       |         |           |
| PWM9  | I2C2_SCL          | UART2_RX | E1   | <div className='green'>42</div> | <div className='green'>41</div>  | C18         | I2C1_SDA | PWM12 | SD1_CLK |           |
| PWM8  |                   | UART2_TX | E0   | <div className='green'>40</div> | <div className='green'>39</div>  | C19         | I2C1_SCL | PWM13 | SD1_CMD |           |
|       |                   |          | GND  | <div className='black'>38</div> | <div className='black'>37</div>  | GND         |          |       |         |           |
| PWM14 | I2C1_SDA/I2C2_SDA |          | C20  | <div className='green'>36</div> | <div className='green'>35</div>  | C16         | I2C1_SDA | PWM8  | SD1_D2  | SPI0_SCK  |
| PWM15 | I2C1_SCL/I2C2_SCL |          | C21  | <div className='green'>34</div> | <div className='green'>33</div>  | C17         | I2C1_SCL | PWM9  | SD1_D3  | SPI0_CS_X |
|       |                   |          | GND  | <div className='black'>32</div> | <div className='black'>31</div>  | GND         |          |       |         |           |
| PWM10 | I2C2_SDA          |          | C14  | <div className='green'>30</div> | <div className='green'>29</div>  | C12         |          | PWM14 |         |           |
| PWM11 | I2C2_SCL          |          | C15  | <div className='green'>28</div> | <div className='green'>27</div>  | C13         |          | PWM15 |         |           |

</div>

GPIO E0/E1/E2 on `Header J4` use 3.3V logic levels, other GPIOs use 1.8V logic levels.

## DuoS User Guide

### RISC-V and ARM switching

The large core of DuoS can choose to use RISC-V or ARM processor, which can be set through the switch on the board. If you find that DuoS cannot start normally during use, please first check whether the switch is consistent with the firmware used.

<Image src='/docs/duo/duos/duos-arm-riscv-switch.webp' maxWidth='70%' align='center' />

If the debug serial port is connected, you can see in the first line of the boot log that starting with `C` means starting from the RISC-V core, and starting with `B` means starting from the ARM core.

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```

### Usage of USB Type A interface

The USB functions of the DuoS USB Type A interface and Type C interface are optional and cannot be used at the same time. The default firmware is configured with the USB network port (RNDIS) function of the Type C port. If you need to switch to the USB 2.0 HOST port of the Type A port for use with USB flash drives and other devices, you need to execute the following command:

~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
Then execute the `reboot` command or power on again to make it take effect.

For example, after connecting a USB flash drive to the USB A port, you can use `ls /dev/sd*` to check whether the device is detected.

Mount it to the system to view the contents of the USB flash drive (take /dev/sda1 as an example):
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
```
Check whether the contents of the `/mnt/udisk` directory are as expected:
```
ls /mnt/udisk
```

Command to uninstall USB flash drive:
```
umount /mnt/udisk
```

When you want to restore the USB network (RNDIS) function of the Type C port, execute:
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-rndis.sh /mnt/system/usb.sh
sync
~~~
Then execute the `reboot` command or power on again to make it take effect.

:::tip
DuoS has an onboard Ethernet interface, so the USB network port (RNDIS) of the Type C port can be used without switching to the USB 2.0 Host function of the A port.
:::

### UART Serial Console

Connect USB to TTL serial cable as shown below. Do not connect the red wire.

| Milk-V DouS | \<---> | USB to TTL |
| ----------- | ------ | ---------- |
| GND (pin 6) | \<---> | Black wire |
| TX (pin  8) | \<---> | White wire |
| RX (pin 10) | \<---> | Green wire |

<Image src='/docs/duo/duos/duos-serial-port.webp' maxWidth='100%' align='center' />

The default serial setting for Duo u-boot and kernel console is:

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

### WIFI configuration

#### Method 1

Edit the following file and replace `ssid` and `psk` with the WIFI account and password to be connected:

```python {6,7} title="/etc/wpa_supplicant.conf"
ctrl_interface=/var/run/wpa_supplicant
ap_scan=1
update_config=1

network={
  ssid="wifi_test"
  psk="12345678"
  key_mgmt=WPA-PSK
}
```

Then execute the following command:

```bash
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
```
You can connect to WIFI. After connecting, you can view the assigned IP address through the `ifconfig` or `ip a` command.

:::tip
If you need to automatically connect to the network at boot, you can put this command in the `/mnt/system/auto.sh` file.
:::
