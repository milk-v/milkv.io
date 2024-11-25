---
sidebar_label: 'Extend root partition'
sidebar_position: 40
---

# Expand root partition

## Check current disk usage

Run command ` df - h ` to view current disk partitions and usage.

```
[root@milkv-duo]~# df -h
Filesystem Size Used Avail Use% Mounted on
/dev/root 752M 185M 526M 26% /
devtmpfs 159M 0 159M 0% /dev
tmpfs 159M 0 159M 0% /dev/shm
tmpfs 159M 116K 159M 1% /tmp
tmpfs 159M 36K 159M 1% /run
/dev/mmcblk0p1 128M 3.6M 125M 3% /boot
```
Root partition (/dev/root): 752M, 185M used, 526M remaining.

Run the command ` fdisk -l ` to view detailed information about the disk and partitions.

``` [root@milkv-duo]~# fdisk -l Disk /dev/mmcblk0: 29.54 GiB, 31719424000 bytes, 61952000 sectors Units: sectors of 1 * 512 = 512 bytes Sector size (logical/physical): 512 bytes / 512 bytes I/O size (minimum/optimal): 512 bytes / 512 bytes Disklabel type: dos Disk identifier: 0x00000000 Device Boot Start End Sectors Size Id Type /dev/mmcblk0p1 * 1 262144 262144 128M c W95 FAT32 (LBA) /dev/mmcblk0p2 262145 266240 4096 2M 0 Empty
/dev/mmcblk0p3 266241 1839104 1572864 768M 83 Linux
```
Disk name: /dev/mmcblk0
Total size: 29.54 GiB (31719424000 bytes)
Total number of sectors: 61952000 sectors
Sector size: 512 bytes
Partition table type: DOS (MBR)

The root partition we want to expand is /dev/mmcblk0p3. Remember the starting sector 266241 of this partition.

Note: /dev/mmcblk0p1 is the boot partition, do not change it.
## Use fdisk to expand the root partition

1. Run the command `fdisk /dev/mmcblk0` to start fdisk.
```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help):
```
2. Delete the current root partition

     1. Enter d to delete the partition.
     2. Enter the partition number (according to your actual situation) to delete the partition /dev/mmcblk0p3. Delete the current root partition.

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.
```
3. Create a new partition

     1. Enter n to create a new partition.
     2. Select p to create a primary partition.
     3. Enter partition number 3 (if prompted to select a partition number, enter 3).
     4. Enter the starting sector (here is 266241) and press Enter.
     5. Enter the end sector (you can enter 1839104 or press Enter to expand to the maximum space).

Note: The partition number, start sector, and end sector are determined according to the actual situation.

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.

Command (m for help): n
Partition type
p primary (2 primary, 0 extended, 2 free)
e extended (container for logical partitions)
Select (default p): p
Partition number (3,4, default 3): 3
First sector (266241-61951999, default 268288): 266241
Last sector, +/-sectors or +/-size{K,M,G,T,P} (266241-61951999, default 61951999):

Created a new partition 3 of type 'Linux' and of size 29.4 GiB.
Partition #3 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: N

```
Note: If Do you want to remove the signature? [Y]es/[N]o appears, select N.

4. Save changes

Type w to save changes and exit fdisk.
```
Command (m for help): w

The partition table has been altered.
Syncing disks.
```

5. Extend the file system

After the fdisk operation is complete, you need to extend the file system to use the new partition size.

```
[root@milkv-duo]~# resize2fs /dev/mmcblk0p3 resize2fs 1.46.2 (28-Feb-2021) Filesystem at /dev/mmcblk0p3 is mounted on /; on-line resizing required old_desc_blocks = 3, new_desc_blocks = 118 ``` 6. View the expanded root partition ``` [root@milkv-duo]~# df -h Filesystem Size Used Avail Use% Mounted on /dev/root 30G 178M 28G 1% / devtmpfs 159M 0 159M 0% /dev tmpfs 159M 0 159M 0% /dev/shm tmpfs 159M 116K 159M 1% /tmp
tmpfs 159M 36K 159M 1% /run
/dev/mmcblk0p1 128M 3.6M 125M 3% /boot
```
Root partition (/dev/root): 30G, 178M used, 28G remaining.

## Create an extended root partition script

The content is as follows:

```

#!/bin/bash

# Make sure the script is run as root

if [ "$EUID" -ne 0 ]; then
echo "Please run this script as root user"
exit
fi

# Set the device name
DEVICE="/dev/mmcblk0"

# Use fdisk to perform partition operations
{
echo d # Delete partition
echo 3 # Delete partition 3
echo n # Create a new partition
echo p # Primary partition
echo 3 # Partition number 3
echo 266241 # Start sector
echo # End sector, use the default value (maximum space)
echo N # Do not remove the signature
echo w # Save changes
} | fdisk "$DEVICE"

# Check the file system and expand
resize2fs "${DEVICE}p3"

# Display the disk usage after expansion
df -h

```
Note: The partition deletion, partition number, start sector, and end sector in this script should be determined according to your actual situation.

Name the script `resize.sh` and run the command `chmod + x resize.sh` to obtain permissions.

Run the command `./resize.sh` to successfully expand the root partition.