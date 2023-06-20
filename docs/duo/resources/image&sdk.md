---
sidebar_label: 'Official Image and SDK '
sidebar_position: 40
---
# Official Image and SDK
## Image
- **(Latest)** [milkv-duo-20230616-2232.img](https://github.com/milkv-duo/milkv-duo-buildroot-sdk/releases/tag/20230616)  
    Upload new image and sdk:

    Enable ssh  
    Enable RNDIS  
    Blink LED  
    Root password: milkv  
    Login via RNDIS using ssh:  
    ~~~
    ssh root@192.168.42.1  
    ~~~
    If you want to disable LED blinking:  
    mv /mnt/system/blink.sh /mnt/system/blink.  sh_backup && sync  
    then reboot the board  

## SDK
### Buildroot-sdk

  [Get it on GitHub](https://github.com/milkv-duo/duo-buildroot-sdk)
