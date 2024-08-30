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

<Image src='/docs/duo/duo-usb-ncm_01.webp' maxWidth='80%' align='center' />

1. Select `CDC NCM` and right-click to select `Update Driver`.

<Image src='/docs/duo/duo-usb-ncm_02.webp' maxWidth='80%' align='center' />

4. Select `Browse my computer for drivers`.

<Image src='/docs/duo/duo-usb-ncm_03.webp' maxWidth='80%' align='center' />

5. Select `Let me pick from a list of available drivers on my computer`.

<Image src='/docs/duo/duo-usb-ncm_04.webp' maxWidth='80%' align='center' />

6. Select `Network Adapters`.

<Image src='/docs/duo/duo-usb-ncm_05.webp' maxWidth='80%' align='center' />

1. Select `Microsoft` in `Manufacturer` and `UsbNcm Host Device` in `Model`.

<Image src='/docs/duo/duo-usb-ncm_06.webp' maxWidth='80%' align='center' />

8. Ignore the warning message.

<Image src='/docs/duo/duo-usb-ncm_07.webp' maxWidth='80%' align='center' />

9. The driver was installed successfully.

<Image src='/docs/duo/duo-usb-ncm_08.webp' maxWidth='80%' align='center' />

1. Check `Network Adapter`, `UsbNcm Host Device` is displayed normally.

<Image src='/docs/duo/duo-usb-ncm_09.webp' maxWidth='80%' align='center' />

11. Use the `ping` command to test.

<Image src='/docs/duo/duo-usb-ncm_10.webp' maxWidth='80%' align='center' />

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

1. Open the terminal and enter `ssh root@192.168.42.1`. The following prompt will appear for the first connection. Just enter `yes`.

<Image src='/docs/duo/duo-usb-ncm_ssh_01.webp' maxWidth='80%' align='center' />

2. Enter the password `milkv` (the password will not be displayed) and log in successfully.

<Image src='/docs/duo/duo-usb-ncm_ssh_02.webp' maxWidth='80%' align='center' />

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

## UART Serial Console

### USB to TTL serial cable

Each pin of a USB-to-TTL cable is defined as follows:

![usb2ttl](/docs/duo/usb2ttl.jpg)

### Connection

Connect USB to TTL serial cable as shown below. Do not connect the red wire.


| Milk-V Duo   | \<---> | USB to TTL |
| ------------ | ------ | ---------- |
| TX (pin 16)  | \<---> | White wire |
| RX (pin 17)  | \<---> | Green wire |
| GND (pin 18) | \<---> | Black wire |


![duo-serial](/docs/duo/duo-serial.jpg)

The default serial setting for Duo u-boot and kernel console is:

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```
