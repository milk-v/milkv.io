---
sidebar_label: 'Extend Partition'
sidebar_position: 30
---

# Extend Partition on SD Card or eMMC

The default capacity of the official Debian image root file system is about `4GB`. When installing software or other data increases, there will be insufficient space. We can expand the file system to the full capacity of the SD card or eMMC.


:::tip
Whether Mar CM is a version with eMMC or a Lite version without eMMC that uses an SD card as the storage medium, the device recognized in the system is `/dev/mmcblk0`
:::


The following uses a Mars CM booted from a 32G SD card as an example to introduce how to expand the capacity through commands. The expansion method for the eMMC version is also the same.

## Check the current status of the partitions

Use the `df -h` command to view the current partition status

```
# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            1.4G     0  1.4G   0% /dev
tmpfs           388M  3.4M  385M   1% /run
/dev/mmcblk0p4  3.7G  3.1G  594M  85% /
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           5.0M  8.0K  5.0M   1% /run/lock
tmpfs           388M   92K  388M   1% /run/user/1000
tmpfs           388M   24K  388M   1% /run/user/0
```

You can see that the device mounted in the current root partition `/` directory is `/dev/mmcblk0p4`

## Extend a partition using the fdisk command

Entering the `fdisk` command will take you into the command-line interactive mode of `fdisk`

```
# fdisk /dev/mmcblk0
```

Enter the `p` command to view the current partition information. You can see that the current capacity of the system partition `/dev/mmcblk0p4` is `3.8G`

```
Command (m for help): p

Disk /dev/mmcblk0: 29.12 GiB, 31267487744 bytes, 61069312 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 6ED69CD1-D57A-4373-B24B-924EE58DFAA1

Device          Start     End Sectors  Size Type
/dev/mmcblk0p1   4096    8191    4096    2M HiFive BBL
/dev/mmcblk0p2   8192   16383    8192    4M HiFive FSBL
/dev/mmcblk0p3  16384  221183  204800  100M EFI System
/dev/mmcblk0p4 221184 8189918 7968735  3.8G Linux filesystem
```

Then execute the `d` command to delete the system partition from the original system. You will be prompted to enter the partition number to be deleted. We want to delete `/dev/mmcblk0p4`, so enter `4`

```
Command (m for help): d
Partition number (1-4, default 4): 4

Partition 4 has been deleted.

Command (m for help):
```

Then use the `n` command to create a new partition. It prompts you to enter the partition number. We still use `/dev/mmcblk0p4`, so enter `4`.

The following prompt `First sector` requires you to enter the starting sector value of the new partition. The command it has helped us identify the default starting value (`default 221184`), which is the starting sector of the just deleted `/dev/mmcblk0p4`, so you can just press Enter without entering value.

Finally enter the size of the new partition. The default `"default"` value is the entire storage space, there is no need to enter a specific value, just press Enter and it will prompt "Do you want to remove the signature? [Y]es/[N]o:" Enter `No`

```
Command (m for help): n
Partition number (4-128, default 4): 4
First sector (34-61069278, default 221184): 
Last sector, +/-sectors or +/-size{K,M,G,T,P} (221184-61069278, default 61067263): 

Created a new partition 4 of type 'Linux filesystem' and of size 29 GiB.
Partition #4 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: No

Command (m for help):
```

Execute the `p` command to check the current partition situation. `/dev/mmcblk0p4` has been expanded to the entire storage space. Here it is `29G`

```
Command (m for help): p

Disk /dev/mmcblk0: 29.12 GiB, 31267487744 bytes, 61069312 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 6ED69CD1-D57A-4373-B24B-924EE58DFAA1

Device          Start      End  Sectors  Size Type
/dev/mmcblk0p1   4096     8191     4096    2M HiFive BBL
/dev/mmcblk0p2   8192    16383     8192    4M HiFive FSBL
/dev/mmcblk0p3  16384   221183   204800  100M EFI System
/dev/mmcblk0p4 221184 61067263 60846080   29G Linux filesystem

Command (m for help):
```

Execute the `w` command to save changes and exit `fdisk` interactive mode

```
Command (m for help): w
The partition table has been altered.
Syncing disks.
```

Finally, execute the `resize2fs` command to complete the file system expansion

```
# resize2fs /dev/mmcblk0p4
resize2fs 1.46.6-rc1 (12-Sep-2022)
Filesystem at /dev/mmcblk0p4 is mounted on /; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 4
The filesystem on /dev/mmcblk0p4 is now 7605760 (4k) blocks long.
```

Use the `df -h` command again to check the partition status. You can see that the system partition node `/dev/mmcblk0p4` has been expanded to `29G`

```
# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            1.4G     0  1.4G   0% /dev
tmpfs           388M  3.4M  385M   1% /run
/dev/mmcblk0p4   29G  3.1G   26G  11% /
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           5.0M  8.0K  5.0M   1% /run/lock
tmpfs           388M   92K  388M   1% /run/user/1000
tmpfs           388M   24K  388M   1% /run/user/0
```
