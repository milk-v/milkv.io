---
sidebar_label: '设置'
sidebar_position: 20
---

# 设置工作环境

## USBnet 设置

为了使用USB网络，我们在系统上默认启用了RNDIS和DHCP。

### Windows

1. 通过Type-C线将Duo与电脑连接。

2. "RNDIS" 设备出现在设备管理器中。

![rndis-step1](/docs/duo/rndis-step1.png)

3. 选择 "RNDIS "并右键单击以更新驱动程序。

![rndis-step2](/docs/duo/rndis-step2.png)

4. 选择 "Browse my computer for drivers"

![rndis-step3](/docs/duo/rndis-step3.png)

5. 选择 "Let me pick from a list of available drivers on my computer"

![rndis-step4](/docs/duo/rndis-step4.png)

6. 选择 "Network adapters"

![rndis-step5](/docs/duo/rndis-step5.png)

7. Manufacturer/Model: Microsoft/USB RNDIS Adapter

![rndis-step6](/docs/duo/rndis-step6.png)

8. 忽略警告信息

![rndis-step7](/docs/duo/rndis-step7.png)

9. 驱动程序更新成功

![rndis-step8](/docs/duo/rndis-step8.png)

10. 检查 "USB RNDIS Adapter"

![rndis-step9](/docs/duo/rndis-step9.png)

11. 找到IP并使用ping来测试网络

![rndis-step10](/docs/duo/rndis-step10.png)

### Linux

一般来说，Linux可以使用RNDIS而无需配置。

你可以使用命令ip来检查usb0网络。

```
neko@milk-v:~ sudo dmesg | grep usb0
[1055270.386719] rndis_host 1-2.1:1.0 usb0: register 'rndis_host' at usb-0000:00:14.0-2.1, RNDIS device, aa:53:5d:bb:7f:28
[1055270.423753] rndis_host 1-2.1:1.0 enxaa535dbb7f28: renamed from usb0
neko@milk-v:~ ip addr show enxaa535dbb7f28
15: enxaa535dbb7f28: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UNKNOWN group default qlen 1000
    link/ether 42:a2:79:19:7f:e3 brd ff:ff:ff:ff:ff:ff
    inet 192.168.42.69/24 brd 192.168.42.255 scope global dynamic noprefixroute enp0s20f0u1
       valid_lft 3569sec preferred_lft 3569sec
    inet6 fe80::3c92:ed74:3475:cb9c/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
neko@milk-v:~ ping 192.168.42.1 -c 5
PING 192.168.42.1 (192.168.42.1) 56(84) bytes of data.
64 bytes from 192.168.42.1: icmp_seq=1 ttl=64 time=0.334 ms
64 bytes from 192.168.42.1: icmp_seq=2 ttl=64 time=0.287 ms
64 bytes from 192.168.42.1: icmp_seq=3 ttl=64 time=0.275 ms
64 bytes from 192.168.42.1: icmp_seq=4 ttl=64 time=0.287 ms
64 bytes from 192.168.42.1: icmp_seq=5 ttl=64 time=0.266 ms

--- 192.168.42.1 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4096ms
rtt min/avg/max/mdev = 0.266/0.289/0.334/0.031 ms
neko@milk-v:~ 
```

### macOS

没有RNDIS的官方驱动程序。我们需要安装[HoRNDIS](https://joshuawise.com/horndis).

1. 下载HoRNDIS驱动程序
  - Intel https://github.com/jwise/HoRNDIS/releases
  - Apple silicon https://github.com/jwise/HoRNDIS/files/7323710/HoRNDIS-M1.zip

2. 禁用系统完整性保护

    a. 进入macOS恢复系统

    请参考 [macOS 用户指南 -> 恢复](https://support.apple.com/en-hk/guide/mac-help/mchl338cf9a8/mac) 进入恢复模式.

    b. 打开终端，输入以下命令

   ```
    csrutil disable

    csrutil enable --without kext
   ```

    c. 重新启动Mac

3. 安装压缩包中的Kext扩展

4. 检查网络设置

## SSH

1. 打开终端，输入 **ssh root@192.168.42.1**, 并回答是

![rndis-ssh1](/docs/duo/rndis-ssh1.png)

2. 输入密码 **milkv** (密码将不显示在屏幕上)

![rndis-ssh2](/docs/duo/rndis-ssh2.png)

3. 登陆成功

![rndis-ssh3](/docs/duo/rndis-ssh3.png)


## 串行控制台

### USB-TTL串口模块

USB-TTL模块的每个针脚定义如下：

![usb2ttl](/docs/duo/usb2ttl.jpg)

### 连接

如下图所示，连接USB到TTL串口模块。 不要连接红线.


| Milk-V Dou   | <---> | USB to TTL |
| ------------ | ----- | ---------- |
| TX (pin 16)  | <---> | White wire |
| RX (pin 17)  | <---> | Green wire |
| GND (pin 18) | <---> | Black wire |


![duo-serial](/docs/duo/duo-serial.jpg)

Duo u-boot和内核控制台的默认串行设置是：

```
   baudrate: 115200
   data bit: 8
   stop bit: 1
   parity  : none
   flow control: none
```

## sysroot
