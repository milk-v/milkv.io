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

:::tip
The Duo 256M memory is relatively large, so the default firmware does not add a Swap partition and does not support the Swap function.
:::

#### How to enable Swap on Duo

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

#### How to increase the size of the Swap partition

The default firmware size of the Swap partition is `256M`. There are two methods to increase the Swap partition size

1. Modify SDK and recompile to generate a new firmware

   You can modify the value of this [size](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/milkv/genimage-milkv-duo.cfg#L36), and then recompile to generate the firmware

   You can modify the size of the Swap partition in the configuration file used to create the image, and then recompile and generate firmware. The configuration file links corresponding to Duo firmware is as follow:

   [milkv-duo-sd](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo-sd/genimage.cfg#L36)

2. Directly modify using the fdisk command in Duo

   By connecting to Duo through a serial cable or SSH, you can use the `fdisk` command to modify it. The principle involves deleting the existing swap partition and creating a new one with the specified size

   :::caution
   Any modifications to the partitions can potentially lead to data loss. Before performing any partition operations, please make sure to back up your important data！
   :::

   The following is the step-by-step command-line interactive method using `fdisk`. If you're not familiar with this method, a script-based approach is provided later, which can be executed once to complete the modification

   - The command-line interactive mode of fdisk

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

   - The script-based approach for fdisk

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