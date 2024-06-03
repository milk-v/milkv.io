---
sidebar_label: 'RevyOS'
sidebar_position: 50
---

# RevyOS

Meles RevyOS is an easy to use desktop system. While working with Meles RevyOS, you will find that it performs well in audio, video, Internet, BT, AI, etc.

Command prepended by $ means that the command may be executed by an unprivileged user. And command prepended by # means that the command may be executed by an privileged user. But the symbol, $ and #, are not part of the command.

## Login

Login requires account and password。

- User Name: **debian**
- password : **debian**

![desktop-login](/docs/meles/login.webp)

## Open Terminal

You can open the command line terminal directly by clicking on the following icon or by using the shortcut `Ctrl + Alt + T` key combination.

![cmd-line-1](/docs/meles/cmd-line-1.webp)

![cmd-line-2](/docs/meles/cmd-line-2.webp)

- Enter the `sudo su` command to access `root` privileges, with the password: `debian`.

![cmd-line-3](/docs/meles/cmd-line-3.webp)

## Enternet connection

Connect the network cable to the Meles' Ethernet port.

- Check status when the cable is not connected.

![ethernet-disconnect](/docs/meles/ethernet-disconnect.webp)

- Check tatus when the network cable is connected.

![ethernet-connect](/docs/meles/ethernet-connect.webp)

## Wi-Fi connection

- Click the icon in the upper right corner to view the wireless network.

![wifi-connect-1](/docs/meles/wifi-connect-1.webp)

- Enter the password and click 'Connect' to connect to the hotspot.

![wifi-connect-2](/docs/meles/wifi-connect-2.webp)

![wifi-connect-3](/docs/meles/wifi-connect-3.webp)

## Bluetooth Connect

### Enable bluetooth

Bluetooth needs to be enabled by entering the following command at the command line.

- Requires **`root`** privileges.

- Type the **`vi bt_enable.sh`** command to open a vim editor.

![enable-bt-1](/docs/meles/enable-bt-1.webp)

- Press the **`i`** key to enter the input mode.

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

- After the content is entered, press the **`ESC`** key to enter the bottom line mode, then enter **`wq`** and press **`Enter`** to save and exit.

![enable-bt-4](/docs/meles/enable-bt-4.webp)

- Execute the **`chmod +x bt_enable.sh`** command

![enable-bt-5](/docs/meles/enable-bt-5.webp)

- Execute **`./bt_enable.sh`** to enable Bluetooth and the Bluetooth icon will be displayed in the upper right corner.

![enable-bt-6](/docs/meles/enable-bt-6.webp)

- Click on the Bluetooth icon in the upper-right corner, the Enable Bluetooth window will pop up, and then click **`Enable Bluetooth`**.

![enable-bt-7](/docs/meles/enable-bt-7.webp)

- Bluetooth icon in the upper right corner becomes normal after being enabled.

![enable-bt-8](/docs/meles/enable-bt-8.webp)

### Start connecting to remote Bluetooth device

Once Bluetooth is enabled, you can start searching for and connecting to the Bluetooth device you want to connect to.

- Click on the Bluetooth icon in the upper right corner and select **`yes`** in the pop-up window.

![connect-bt-1](/docs/meles/connect-bt-1.webp)

- Click **`search`** to start searching.

![connect-bt-2](/docs/meles/connect-bt-2.webp)

- When the search is complete, the relevant Bluetooth devices around you will appear.

![connect-bt-3](/docs/meles/connect-bt-3.webp)

- Click on the Bluetooth device you want to connect to and it will automatically connect successfully.

![connect-bt-4](/docs/meles/connect-bt-4.webp)

## Browser Use

The Chromium browser is built-in and is available by clicking the browser icon at the bottom of the desktop.

![browser-use-1](/docs/meles/browser-use-1.webp)

- Once opened you can use the search engine.

![browser-use-2](/docs/meles/browser-use-2.webp)

- Online videos can also be played.

![browser-use-3](/docs/meles/browser-use-3.webp)

## Display Settings

The display settings are only available when you are operating on the monitor.

### Applications-Settings-Display

Click Applications in the upper left corner of the desktop.

![display-1](/docs/meles/display-1.webp)

Select Settings, and then find the Display option in the Options section.

![display-2](/docs/meles/display-2.webp)

You can change the following settings in it.

![display-3](/docs/meles/display-3.webp)

## SSH

- Check the status of the SSH service. Run the following command in a command line window

```
sudo service ssh status
```

![ssh-1](/docs/meles/ssh-1.webp)

- Enter the following command

```
ssh [username]@[IP address]
```

Example:

```
ssh milkv@192.168.2.180
```

- You need to enter the user password to successfully connect to the Debian system. This is a basic SSH connection process. You can use other SSH options for more advanced connections.

![ssh-2](/docs/meles/ssh-2.webp)

### Notice

SSH is installed by default.

If the SSH service is not installed, you can use the following command to install it:

```
sudo apt-get update
sudo apt-get install ssh
```

If the SSH service is not started or runs abnormally, run the following command to restart it:

```
sudo service sshd restart
```
