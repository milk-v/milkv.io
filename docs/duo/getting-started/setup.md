---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Set up the working environment

## USB NET setup

To use USB networking, we enabled CDC-NCM and DHCP by default on the system.

:::tip
The USB network used by firmware before `V1.1.2` is RNDIS. If you are using an older version, please update to `V1.1.2` or a newer system image.
:::

CDC-NCM is driver-free on Linux, macOS, and the latest Windows systems. You can log in to Duo's terminal directly using `ssh root@192.168.42.1`.

### Windows

If your Windows system is older, you need to manually install the CDC-NCM driver as follows:

1. Connect Duo, Duo256M or DuoS to your computer via a Type-C cable.

2. The `CDC NCM` device appears in the Device Manager with a yellow exclamation mark indicating that the driver is not installed.

   <Image src='/docs/duo/duo-usb-ncm_01.webp' maxWidth='80%' align='left' />

3. Select `CDC NCM` and right-click to select `Update Driver`.

   <Image src='/docs/duo/duo-usb-ncm_02.webp' maxWidth='80%' align='left' />

4. Select `Browse my computer for drivers`.

   <Image src='/docs/duo/duo-usb-ncm_03.webp' maxWidth='80%' align='left' />

5. Select `Let me pick from a list of available drivers on my computer`.

   <Image src='/docs/duo/duo-usb-ncm_04.webp' maxWidth='80%' align='left' />

6. Select `Network Adapters`.

   <Image src='/docs/duo/duo-usb-ncm_05.webp' maxWidth='80%' align='left' />

7. Select `Microsoft` in `Manufacturer` and `UsbNcm Host Device` in `Model`.

   <Image src='/docs/duo/duo-usb-ncm_06.webp' maxWidth='80%' align='left' />

8. Ignore the warning message.

   <Image src='/docs/duo/duo-usb-ncm_07.webp' maxWidth='80%' align='left' />

9. The driver was installed successfully.

   <Image src='/docs/duo/duo-usb-ncm_08.webp' maxWidth='80%' align='left' />

10. Check `Network Adapter`, `UsbNcm Host Device` is displayed normally.

    <Image src='/docs/duo/duo-usb-ncm_09.webp' maxWidth='80%' align='left' />

11. Use the `ping` command to test.

    <Image src='/docs/duo/duo-usb-ncm_10.webp' maxWidth='80%' align='left' />

### Linux & macOS

Open the terminal and use the `ping` command to test:

```
ubuntu@linux:~$ ping 192.168.42.1 -c 5
PING 192.168.42.1 (192.168.42.1) 56(84) bytes of data.
64 bytes from 192.168.42.1: icmp_seq=1 ttl=64 time=2.00 ms
64 bytes from 192.168.42.1: icmp_seq=2 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=3 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=4 ttl=64 time=2.01 ms
64 bytes from 192.168.42.1: icmp_seq=5 ttl=64 time=2.13 ms

--- 192.168.42.1 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 2.003/2.081/2.132/0.059 ms
```

## SSH

### Windows

1. Open the terminal and enter `ssh root@192.168.42.1`. The following prompt will appear for the first connection. Just enter `yes`.

   <Image src='/docs/duo/duo-usb-ncm_ssh_01.webp' maxWidth='80%' align='left' />

2. Enter the password `milkv` (the password will not be displayed) and log in successfully.

   <Image src='/docs/duo/duo-usb-ncm_ssh_02.webp' maxWidth='80%' align='left' />

## Extended root partition

### Extended root partition for SD card boot mode

#### Check current disk usage

Run command ` df - h ` to view current disk partition and usage.

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

```
[root@milkv-duo]~# fdisk -l
Disk /dev/mmcblk0: 29.54 GiB, 31719424000 bytes, 61952000 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device         Boot  Start     End Sectors  Size Id Type
/dev/mmcblk0p1 *         1  262144  262144  128M  c W95 FAT32 (LBA)
/dev/mmcblk0p2      262145  266240    4096    2M  0 Empty
/dev/mmcblk0p3      266241 1839104 1572864  768M 83 Linux
```
Disk name: /dev/mmcblk0
Total size: 29.54 GiB (31719424000 bytes)
Total number of sectors: 61952000 sectors
Sector size: 512 bytes
Partition table type: DOS (MBR)

The root partition we want to expand is /dev/mmcblk0p3. Remember the starting sector 266241 of this partition.

Note: /dev/mmcblk0p1 is the boot partition, do not move it.

#### Use fdisk to expand the root partition

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

5. Enter the ending sector (you can enter 1839104 or press Enter directly to expand to the maximum space).

Note: The partition number, starting sector, and ending sector are determined according to the actual situation.

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
   p   primary (2 primary, 0 extended, 2 free)
   e   extended (container for logical partitions)
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
[root@milkv-duo]~# resize2fs /dev/mmcblk0p3
resize2fs 1.46.2 (28-Feb-2021)
Filesystem at /dev/mmcblk0p3 is mounted on /; on-line resizing required
old_desc_blocks = 3, new_desc_blocks = 118
```
6. View the expanded root partition 
```
[root@milkv-duo]~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        30G  178M   28G   1% /
devtmpfs        159M     0  159M   0% /dev
tmpfs           159M     0  159M   0% /dev/shm
tmpfs           159M  116K  159M   1% /tmp
tmpfs           159M   36K  159M   1% /run
/dev/mmcblk0p1  128M  3.6M  125M   3% /boot
```
Root partition (/dev/root): 30G, 178M used, 28G remaining.
#### Create an extended root partition script

Contents are as follows:

```
#!/bin/bash

# Make sure the script is run as root
if [ "$EUID" -ne 0 ]; then
echo "Please run this script as root"
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

## Others

### Modify the IP address of the USB network

The default IP address of USB network is `192.168.42.1`. If you need to modify this address, for example, when the same computer is connected to multiple Duo devices, the IP of each Duo needs to be set to a different one. This can be achieved by modifying the following two files in the Duo device:

```bash {11} showLineNumbers title="/mnt/system/usb-ncm.sh"
#!/bin/sh

/etc/uhubon.sh device >> /tmp/ncm.log 2>&1
/etc/run_usb.sh probe ncm >> /tmp/ncm.log 2>&1
if test -e /usr/bin/burnd; then
  /etc/run_usb.sh probe acm >> /tmp/ncm.log 2>&1
fi
/etc/run_usb.sh start ncm >> /tmp/ncm.log 2>&1

sleep 0.5
ifconfig usb0 192.168.42.1

count=`ps | grep dnsmasq | grep -v grep | wc -l`
if [ ${count} -lt 1 ] ;then
  echo "/etc/init.d/S80dnsmasq start" >> /tmp/ncm.log 2>&1
  /etc/init.d/S80dnsmasq start >> /tmp/ncm.log 2>&1
fi
```

```bash {2} showLineNumbers title="/etc/dnsmasq.conf"
interface=usb0
dhcp-range=192.168.42.2,192.168.42.242,1h
dhcp-option=3
dhcp-option=6
```

### Enable Swap

#### What is Swap

Swap, also known as virtual RAM, is used to support storing data in hard disk when physical memory (RAM) is full. Sometimes Swap is also used in parallel to increase cache capacity even if the physical memory is not used up yet.

:::caution
This may cause wear and tear on your microSD card leading to a shorter drive lifespan! It is strongly recommended to enable swap functionality **only when there is insufficient memory available**!
:::

#### How to enable Swap on Duo

:::tip
There are two ways to enable Swap, one is to use Swap partition, the other is to use Swap file. In versions before `v1.1.3`, Duo's image reserves a 256M partition as a Swap partition. In `v1.1.3` and later versions, the Swap file method is used uniformly.
:::

Use the latest system image:

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

Execute the following command in the Duo terminal to create a 256M Swap file (the file size and location can be customized):

```bash
fallocate -l 256M /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
```

Then run the `swapon --show` or `free -h` command to check if swap is enabled (256M):

```bash {3} title="swapon --show"
[root@milkv-duo]~# swapon --show
NAME          TYPE   SIZE USED PRIO
/mnt/swapfile file 255.8M   0B   -2
```

```bash {4} title="free -h"
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.3M       14.3M        3.7M       76.0K       10.3M       11.2M
Swap:        255.8M           0      255.8M
```

If you need to automatically load Swap at startup, you can use this command to configure:

```bash
echo "/mnt/swapfile swap swap defaults 0 0" >> /etc/fstab && sync
```

After restarting, use the `swapon --show` or `free -h` command to check that Swap has been automatically loaded.
