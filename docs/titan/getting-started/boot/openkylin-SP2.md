---
sidebar_label: 'openKylin SP2'
sidebar_position: 3
---

# openKylin SP2

This page describes how to create an openKylin bootable USB drive for Milk-V Titan, then use the installer to install openKylin to an NVMe SSD.

## Download the Image

Download the openKylin image for Milk-V Titan from the release page:

[openKylin-ultrarisc-titan-2.0sp2-riscv64](https://bj30886.apps.aliyunfile.com/disk/s/ekZ6yZbox2V?domainId=bj30886)

:::caution
Creating the bootable USB drive will erase all existing data on the selected USB drive. Installing the system will erase all existing data on the target NVMe SSD. Back up important data before continuing, and make sure you select the correct USB drive and SSD.
:::

:::tip
You will create the username and password during installation. Keep them safe. After entering the system for the first time, we recommend connecting to the network and updating the software sources.
:::

## Prepare Tools

1. **balenaEtcher**: Download and install [balenaEtcher](https://etcher.balena.io/) on a Windows PC.
2. **USB drive**: 8 GB or larger is recommended.
3. Optional: You can also use `dd` in a Linux environment to create the bootable USB drive.

## Create the Bootable USB Drive

### Windows

Install balenaEtcher, then write the image as follows:

1. Click `Flash from file` and select the openKylin ISO.
2. Click `Select target` and select the target USB drive.
3. Click `Flash` and wait for the writing process to finish.
4. Safely eject the USB drive.

### Linux

Use `lsblk` to check the USB drive device name:

```bash
lsblk
```

Check the device name, capacity, and model carefully to avoid writing the image to the PC system disk or another non-target disk.

Unmount any mounted partitions on the target USB drive. Replace `/dev/sdX1` with the actual partition name. If the USB drive has multiple mounted partitions, unmount them one by one:

```bash
sudo umount /dev/sdX1
```

Write the image to the USB drive:

```bash
sudo dd if=openKylin-ultrarisc-titan-2.0sp2-riscv64-20260622.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

Replace `/dev/sdX` and the image file name with the actual USB drive device name and image file. Use the disk device, not a partition such as `/dev/sdX1`.

## Install on Milk-V Titan

1. Install the target NVMe SSD into the M.2 slot on the Titan board.
2. Insert the openKylin USB drive, connect a monitor, keyboard, and mouse, and optionally connect Ethernet.
3. Power on Titan, select the USB drive as the boot device, and enter the Live environment.
4. Check the system time before installation:

```bash
date
```

If the time is 1970, set it manually first, for example:

```bash
date -s "2026-08-03 10:00:00"
```

:::tip
You can install an RTC CR1220 coin-cell battery to avoid losing the system time after power-off when no network is available.
:::

5. Click the installer on the desktop, start the installer, and follow the prompts to complete the installation. Select the installation target:

- Full disk installation: Select the target NVMe SSD, such as `/dev/nvme0n1`.
- Custom installation: Manually create the EFI partition, root partition, swap partition, and other required partitions.

6. Create a username and password, then start the installation.
7. After installation is complete, reboot the system. Remove the USB drive when prompted on the screen.

## Boot

1. Make sure the USB drive has been removed.
2. Power on Titan. The system will boot from the NVMe SSD.
3. Log in with the username and password created during installation.
