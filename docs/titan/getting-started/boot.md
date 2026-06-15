---
sidebar_label: 'Install OS'
sidebar_position: 10
---

# Milk-V Titan Install OS Image

We recommend using the Ubuntu 24.04 system officially released by UltraRISC for Milk-V Titan. This page describes how to write the Ubuntu 24.04 firmware image to an NVMe SSD.

## Ubuntu 24.04

The Ubuntu 24.04 firmware is released at:

[https://github.com/milkv-titan/titan-ubuntu/releases/tag/2026-0605](https://github.com/milkv-titan/titan-ubuntu/releases/tag/2026-0605)

Please download all split archive files from the release assets, such as:

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.002
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.003
...
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.md5
```

All split archive files must be placed in the same directory before extraction.

To write the image on a PC, connect the NVMe SSD through an M.2 NVMe USB enclosure or adapter, or install the SSD directly into an available M.2 slot on the PC.

:::caution
Writing the image will erase all existing data on the selected disk. Back up important data before continuing, and make sure you select the Titan target SSD. If you select the wrong disk, such as the PC system disk or another data disk, its data may be destroyed.
:::

:::tip
After the Titan boots from the written SSD, the default system username and password are both `ubuntu`. You will be prompted to change the password on the first login.
:::

### Linux

Install 7-Zip:

```bash
sudo apt update
sudo apt install p7zip-full
```

Extract the firmware image from the first split archive:

```bash
7za x ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
```

The extracted firmware image will be:

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img
```

Verify the image checksum:

```bash
md5sum -c ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.md5
```

Connect the NVMe SSD to the Linux PC using an M.2 NVMe USB enclosure or adapter, or insert it into an available M.2 slot on the PC. Use `lsblk` to identify the SSD device name:

```bash
lsblk
```

Check the device name, capacity, and model carefully. Do not write the image to the PC system disk or any other non-target disk.

Unmount any mounted partitions on the target SSD. Replace `/dev/sdX1` with the actual partition name shown by `lsblk`:

```bash
sudo umount /dev/sdX1
```

Write the image to the SSD. Replace `/dev/sdX` with the actual SSD device, not a partition such as `/dev/sdX1`. This operation will overwrite the selected disk:

```bash
sudo dd if=ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img of=/dev/sdX bs=4M status=progress conv=fsync
sync
```

After writing is complete, remove the SSD safely, install it into the Titan M.2 M Key slot, and power on the board.

### Windows

Install [7-Zip](https://www.7-zip.org/) or another archive tool that supports 7z split archives.

Download all split archive files and place them in the same folder. Right-click the `.001` file and extract it:

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
```

After extraction, you will get:

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img
```

Connect the NVMe SSD to the Windows PC using an M.2 NVMe USB enclosure or adapter, or insert it into an available M.2 slot on the PC.

Download and install [balenaEtcher](https://etcher.balena.io/). Use it to write the image:

1. Click `Flash from file` and select `ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img`.
2. Click `Select target` and select the Titan target SSD. Check the disk name and capacity carefully to avoid selecting the PC system disk or another data disk.
3. Click `Flash!` to start writing the image.

After writing is complete, remove the SSD safely, install it into the Titan M.2 M Key slot, and power on the board.
