---
sidebar_label: 'Official Image and SDK '
sidebar_position: 40
---
# Official Image and SDK

## Image
- **(Latest)** [milkv-duo-xxx.img.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)  
    Root password: milkv  
    Login via RNDIS using ssh:  
    ~~~
    ssh root@192.168.42.1  
    ~~~
    If you want to disable LED blinking:
    ```
    mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
    ```
    then reboot the board

    This means renaming the LED blinking script, and after restarting the Duo, the LED will no longer blink

    If you want to restore LED blinking, rename it back to its original name and restart the device
    ```
    mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
    ```
    then reboot the board

    [Use IO-Board](https://milkv.io/docs/duo/io-board/usb&ethernet_iob)


## SDK

### Milk-V Duo Official buildroot SDK
duo-buildroot-sdk [https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

### Milk-V Duo Official C/C++ examples
duo-examples [https://github.com/milkv-duo/duo-examples](https://github.com/milkv-duo/duo-examples
)
