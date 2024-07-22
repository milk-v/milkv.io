---
sidebar_label: 'Resource Download'
sidebar_position: 70
---

# Resource Download Summary

## Operating system image

Version Description:

- The system image with the suffix `.img.zip` is a dedicated image for SD card booting. It can be burned to SD through tools such as `balenaEtcher`, `Rufus`, `Win32DiskImager` on PC. It can also be burned to SD card through the official tool `titanflasher`.

- The system image with the suffix `.zip` is the flashing package used by the official tool `titanflasher` of Spacemit. It can be burned to an SD card through a card reader, or burned to an eMMC or SSD through a USB Type-C cable.

For OS iamge installation methods, please refer to: [Install OS Image](https://milkv.io/docs/jupiter/getting-started/boot).

### Ubuntu 23.10

Based on Ubuntu 23.10 community source code, adapted to the Desktop system image of Milk-V Jupiter.

Download Link: [https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases](https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases)

The default password for the `root` account in Ubuntu is `milkv`.

### Bianbu OS

Bianbu is an operating system officially launched by Spacemit that is deeply optimized for RISC-V architecture processors. It is built based on Ubuntu community source code and has versions such as Bianbu Desktop, Bianbu Minimal and Bianbu NAS.

Download Link: [https://github.com/milkv-jupiter/jupiter-bianbu-build/releases](https://github.com/milkv-jupiter/jupiter-bianbu-build/releases)

The default password for the `root` account in the Bianbu system is `milkv`.

- milkv-jupiter-bianbu-\*-desktop-\*.zip

  Bianbu desktop version.

- milkv-jupiter-bianbu-\*-minimal-\*.zip

  Bianbu command line version (no desktop).

- milkv-jupiter-bianbu-\*-nas-\*.zip

  Bianbu NAS version, integrated with the open source NAS system `OpenMediaVault`.

  After booting up, execute the `ip a` command in the serial port or check the router web user interface to obtain the IP address of Jupiter, and access the `OpenMediaVault` web interface through the IP in the PC browser.

  - Web interface administrator account: `admin`
  - Password: `openmediavault`

- milkv-jupiter-bianbu-\*-kodbox-\*.zip

  Bianbu Dodbox version integrates Kodbox, a lightweight, easy-to-use, secure and controllable open source private file storage system.

  After booting up, execute the `ip a` command in the serial port or check the router web user interface to obtain the IP address of Jupiter. Use the IP address to access the `Kodbox` web interface in the PC browser. Follow the instructions for simple settings and you can use it.

### Fedora 41 (by [Fedora-V Force](https://github.com/fedora-riscv))

Download link: [https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/](https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/)

The default password for the `root` account is `riscv`.
