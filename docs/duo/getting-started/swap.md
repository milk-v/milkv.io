---
sidebar_label: 'Enable Swap'
sidebar_position: 30
---

# What is Swap

Swap, also known as virtual RAM, is used to support storing data in hard disk when physical memory (RAM) is full. Sometimes Swap is also used in parallel to increase cache capacity even if the physical memory is not used up yet.

# How to enable Swap on Duo

Use the latest system image

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

Execute the following two commands to activate swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
then run `free -h` command to check if the swap is active (256M)

**DISCLAIMER: This may cause wear and tear on your microSD card leading to a shorter drive lifespan! It is strongly recommended to enable swap functionality only when there is insufficient memory available!**