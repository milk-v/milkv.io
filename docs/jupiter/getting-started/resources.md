---
sidebar_label: 'Resource Download'
sidebar_position: 70
---

# Resource Download Summary

## Operating system image

Version Description:

- The system image with the suffix `.img.zip` is a dedicated image for SD card boot. It can be burned to the SD card through the official tool `titanflasher` of Spacemit, or through tools such as `balenaEtcher`, `Rufus`, `Win32DiskImager` on the PC.

- The system image with the suffix `.zip` is the flashing package used by the official tool `titanflasher` of Spacemit. It can be burned to an SD card through a card reader, or burned to an eMMC or SSD through a USB Type-C cable.

For OS iamge installation methods, please refer to: [Install OS Image](https://milkv.io/docs/jupiter/getting-started/boot).

### Bianbu OS

Bianbu is an operating system officially launched by Spacemit that is deeply optimized for RISC-V architecture processors. It is built based on Ubuntu community source code and has versions such as Bianbu Desktop, Bianbu Minimal and Bianbu NAS.

Download Link: [https://github.com/milkv-jupiter/jupiter-bianbu-build/releases](https://github.com/milkv-jupiter/jupiter-bianbu-build/releases)

The default password for the `root` account in the Bianbu system is `bianbu`.

### Ubuntu 23.10

Based on Ubuntu 23.10 community source code, adapted to the Desktop system image of Milk-V Jupiter.

Download Link: [https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases](https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases)

The default password for the `root` account in Ubuntu is `bianbu`.

### Fedora 41

Currently only SD card images are provided, download link: [https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/](https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/)

Decompression command:
```bash
zstd -d xxx.img.zst
```
