---
sidebar_label: 'Enable Swap'
sidebar_position: 30
---

# What is Swap

Swap, also known as virtual RAM, is used to support storing data in hard disk when physical memory (RAM) is full. Sometimes Swap is also used in parallel to increase cache capacity even if the physical memory is not used up yet.

# How to enable Swap on Duo

:::caution
This may cause wear and tear on your microSD card leading to a shorter drive lifespan! It is strongly recommended to enable swap functionality only when there is insufficient memory available!
:::

Use the latest system image

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

Execute the following two commands to activate swap
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
then run `free -h` command to check if the swap is active (256M)

```
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.8M       13.6M        9.1M       76.0K        6.1M       12.4M
Swap:        256.0M           0      256.0M
```


# How to increase the size of the Swap partition

The default firmware size of the Swap partition is `256M`. There are two methods to increase the Swap partition size

## 1. Modify SDK and recompile to generate a new firmware

You can modify the value of this [size](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/milkv/genimage-milkv-duo.cfg#L36), and then recompile to generate the firmware

## 2. Directly modify using the fdisk command in Duo

By connecting to Duo through a serial cable or SSH, you can use the `fdisk` command to modify it. The principle involves deleting the existing swap partition and creating a new one with the specified size

:::caution
Any modifications to the partitions can potentially lead to data loss. Before performing any partition operations, please make sure to back up your important data！
:::

The following is the step-by-step command-line interactive method using `fdisk`. If you're not familiar with this method, a script-based approach is provided later, which can be executed once to complete the modification

### The command-line interactive mode of fdisk

Entering the `fdisk` command will take you into the command-line interactive mode of `fdisk`

```
fdisk /dev/mmcblk0
```

By entering the `p` command, you can view the information of the current partition on the MicroSD Card. You will be able to see that the partition `/dev/mmcblk0p3` used for `swap` is `256MB` in size
```
Command (m for help): p
Disk /dev/mmcblk0: 15 GB, 15931539456 bytes, 31116288 sectors
486192 cylinders, 4 heads, 16 sectors/track
Units: sectors of 1 * 512 = 512 bytes

Device       Boot StartCHS    EndCHS        StartLBA     EndLBA    Sectors  Size Id Type
/dev/mmcblk0p1 *  0,0,2       16,81,2              1     262144     262144  128M  c Win95 FAT32 (LBA)
/dev/mmcblk0p2    16,81,3     114,57,8        262145    1835008    1572864  768M 83 Linux
/dev/mmcblk0p3    114,57,9    146,219,10     1835009    2359296     524288  256M  0 Empty
```
Please make a note of the `StartLBA` (starting sector) value for `/dev/mmcblk0p3`, which is `1835009`. We will need it later

To delete a partition, you need to execute the `d` command and then enter the partition number you want to delete. In this case, we want to delete `/dev/mmcblk0p3`, so you should enter `3`
```
Command (m for help): d
Partition number (1-4): 3
```

To create a new partition, you can use the `n` command. When prompted, choose whether to create a primary or extended partition. Since we want to create a primary partition, enter `p`. Next, enter the partition number you want to create, which is `3` for `/dev/mmcblk0p3`

The following prompt `First sector` is required to enter the starting sector value of the new partition, which is the value `1835009` recorded above. You can see that this value is recognized by default in the prompt, so you can just press Enter without inputting it

Finally, you will be asked to input the size of the new partition. You can either enter the ending sector value or directly specify the size of the partition. For example, if you want to allocate 1GB, you can enter `+1G` according to the prompt
```
Command (m for help): n
Partition type
   p   primary partition (1-4)
   e   extended
p
Partition number (1-4): 3
First sector (1835009-31116287, default 1835009): 
Using default value 1835009
Last sector or +size{,K,M,G,T} (1835009-31116287, default 31116287): +1G
```
Then execute the `p` command again to check the current partition status. You will see that `/dev/mmcblk0p3` is now `1024M`, which is equivalent to `1G`

Finally, execute the `w` command to save the modifications and exit the fdisk interactive mode
```
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table
fdisk: WARNING: rereading partition table failed, kernel still uses old table: Resource busy
```
At this point, the partition modifications will not take effect until you execute the `reboot` command to restart the system or power cycle the device

To activate Swap, you can execute the following two commands in the Duo terminal
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```
Then run the command `free -h` to check if the swap has been enabled (1G, which is equivalent to 1024M)

### The script-based approach for fdisk

Create a script file named `swap_resize.sh` in Duo, or create it on your PC and then upload it to Duo

The contents of the `swap_resize.sh` file, please note to modify `+1G` to the desired size
```bash
fdisk /dev/mmcblk0 <<EOF
p
d
3
n
p
3

+1G

w
EOF

fdisk -l /dev/mmcblk0

echo "----- resize /dev/mmcblk0p3 for swap completed -----"
```

Executing this script in Duo will automatically modify the size of the swap partition
```bash
sh swap_resize.sh
```

Similarly, you need to execute the `reboot` command to restart the system or power cycle the device for the changes to take effect. After that, you can activate Swap again
```
mkswap /dev/mmcblk0p3
swapon /dev/mmcblk0p3
```

Then run the command `free -h` to check if the swap has been enabled (1G, which is equivalent to 1024M)

```
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.8M       13.8M        8.2M       76.0K        6.8M       12.3M
Swap:       1024.0M           0     1024.0M
```