---
sidebar_label: 'Desktop Usage'
sidebar_position: 40
---

# Basic Usage of Desktop System

#### When the system boots up, the screen Meles is connected to will show the Debian desktop.

## Desktop Login

Login screen requires user name and password。

- User Name: debian
- password : debian

![desktop-login](/docs/meles/login.webp)

## Command Line Window

You can open the command line terminal directly by clicking on the following icon or by using the shortcut `Ctrl + Alt + T` key combination

![cmd-line-1](/docs/meles/cmd-line-1.webp)

![cmd-line-2](/docs/meles/cmd-line-2.webp)

- Enter the `sudo su` command to access `root` privileges, with the password: `debian`.

![cmd-line-3](/docs/meles/cmd-line-3.webp)

## Network Connection

Meles can be connected to the network via Ethernet and WIFI.

### Enternet connection

Connect the network cable to the Meles' Ethernet port.

The status of the icon displayed in the upper left corner of the desktop when connecting to the network cable

- Status when the cable is not connected

![ethernet-disconnect](/docs/meles/ethernet-disconnect.webp)

- Status when the network cable is connected

![ethernet-connect](/docs/meles/ethernet-connect.webp)

### WIFI connection

Meles with on-board WIFI module to support WIFI connectivity

- Click the icon in the upper right corner to view the wireless network you want to connect to from the status bar.

![wifi-connect-1](/docs/meles/wifi-connect-1.webp)

- Enter the password and click connect to connect to the WIFI.

![wifi-connect-2](/docs/meles/wifi-connect-2.webp)

![wifi-connect-3](/docs/meles/wifi-connect-3.webp)

## BT Connect

### Enable bluetooth

Bluetooth needs to be enabled by entering the following command at the command line.

- Requires `root` privileges.

- Type the `vi bt_enable.sh` command to open a vim editor.

![enable-bt-1](/docs/meles/enable-bt-1.webp)

- Press the `i` key to enter the input mode.

![enable-bt-2](/docs/meles/enable-bt-2.webp)

- Then type the following
```
echo 509 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio509/direction
echo 0 > /sys/class/gpio/gpio509/value
sleep 2
echo 1 > /sys/class/gpio/gpio509/value
sleep 1

brcm_patchram_plus --enable_hci --no2bytes --tosleep 200000 --baudrate 115200 --patchram  /lib/firmware/brcm/BCM4345C5.hcd /dev/ttyS4 &
```

![enable-bt-3](/docs/meles/enable-bt-3.webp)

- After the content is entered, press the `ESC` key to enter the bottom line mode, then enter `wq` and press `Enter` to save and exit. 

![enable-bt-4](/docs/meles/enable-bt-4.webp)

- Execute the `chmod +x bt_enable.sh` command

![enable-bt-5](/docs/meles/enable-bt-5.webp)

- Execute `./bt_enable.sh` to enable Bluetooth, the Bluetooth icon will be displayed in the upper right corner to indicate successful enablement.

![enable-bt-6](/docs/meles/enable-bt-6.webp)