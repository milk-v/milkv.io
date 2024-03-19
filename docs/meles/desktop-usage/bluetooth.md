---
sidebar_label: 'Bluetooth Connect'
sidebar_position: 50
---

# Bluetooth Connect

## Enable bluetooth

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

## Start connecting to Bluetooth

Once Bluetooth is enabled, you can start searching for and connecting to the Bluetooth device you want to connect to.

- Click on the Bluetooth icon in the upper right corner and select **`yes`** in the pop-up window.

![connect-bt-1](/docs/meles/connect-bt-1.webp)

- Click **`search`** to start searching.

![connect-bt-2](/docs/meles/connect-bt-2.webp)

- When the search is complete, the relevant Bluetooth devices around you will appear.

![connect-bt-3](/docs/meles/connect-bt-3.webp)

- Click on the Bluetooth device you want to connect to and it will automatically connect successfully.

![connect-bt-4](/docs/meles/connect-bt-4.webp)