---
sidebar_label: '设置'
sidebar_position: 20
---

# 设置工作环境

## USB Net 设置

为了使用 USB 网络，我们在系统上默认启用了 CDC-NCM 和 DHCP。

:::tip
`V1.1.2` 之前的固件使用的 USB 网络是 RNDIS，如果您使用的是旧的版本，请更新到 `V1.1.2` 或更新的系统镜像。
:::

CDC-NCM 在 Linux，macOS，以及最新的 Windows 系统上都免驱的，您可以直接使用 `ssh root@192.168.42.1` 登陆到 Duo 的终端。

### Windows

如果您的 Windows 系统比较旧，需要手动安装 CDC-NCM 驱动，方法如下：

1. 通过 Type-C 线将 Duo，Duo256M 或者 DuoS 与电脑连接。

2. `CDC NCM` 设备出现在设备管理器中，显示为黄色的感叹号表示未安装驱动。

<Image src='/docs/duo/duo-usb-ncm_01_zh.webp' maxWidth='80%' align='left' />

3. 选择 `CDC NCM` 后右键选择 `更新驱动程序`。

<Image src='/docs/duo/duo-usb-ncm_02_zh.webp' maxWidth='80%' align='left' />

4. 选择 `浏览我的电脑以查找驱动程序`。

<Image src='/docs/duo/duo-usb-ncm_03_zh.webp' maxWidth='80%' align='left' />

5. 选择 `让我从计算机上的可用驱动程序列表中选取`。

<Image src='/docs/duo/duo-usb-ncm_04_zh.webp' maxWidth='80%' align='left' />

6. 选择 `网络适配器`。

<Image src='/docs/duo/duo-usb-ncm_05_zh.webp' maxWidth='80%' align='left' />

7. 在 `厂商` 中选择 `Microsoft`，`型号` 中选择 `UsbNcm Host Device`。

<Image src='/docs/duo/duo-usb-ncm_06_zh.webp' maxWidth='80%' align='left' />

8. 忽略警告信息。

<Image src='/docs/duo/duo-usb-ncm_07_zh.webp' maxWidth='80%' align='left' />

9. 驱动程序安装成功。

<Image src='/docs/duo/duo-usb-ncm_08_zh.webp' maxWidth='80%' align='left' />

10. 检查 `网络适配器`，`UsbNcm Host Device` 已经正常显示。

<Image src='/docs/duo/duo-usb-ncm_09_zh.webp' maxWidth='80%' align='left' />

11. 使用 `ping` 命令测试。

<Image src='/docs/duo/duo-usb-ncm_10_zh.webp' maxWidth='80%' align='left' />

### Linux & macOS

打开终端，使用 `ping` 命令测试：

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

1. 打开终端，输入 `ssh root@192.168.42.1`, 首次连接会有如下提示，直接输入 `yes`。

<Image src='/docs/duo/duo-usb-ncm_ssh_01.webp' maxWidth='80%' align='left' />

2. 输入密码 `milkv` (密码将不会显示)，登陆成功。

<Image src='/docs/duo/duo-usb-ncm_ssh_02.webp' maxWidth='80%' align='left' />

### 修改 USB 网络的 IP 地址

USB 网络 CDC-NCM 默认的 IP 地址是 `192.168.42.1`，如果您需要修改这个地址，比如同一台电脑接入多台 Duo 设备时，每一台 Duo 的 IP 需要设置为不同，可以通过在 Duo 设备内修改如下两个文件实现：

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
