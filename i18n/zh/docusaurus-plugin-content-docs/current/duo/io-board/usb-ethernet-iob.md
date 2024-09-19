---
sidebar_label: 'Duo USB&Ethernet IOB '
sidebar_position: 10
---
# Duo USB&Ethernet IO-Board

## 简介

Duo USB&Ethernet IO-Board 通过添加4个USB端口、1个RJ45网络端口、1个串口引脚和1个Type-C电源输入接口，扩展了Milk-V Duo的功能。

此扩展板可以提高Duo的开发效率，并方便开发人员访问常用的USB外设和以太网。

![duousbeth](/docs/duo/duousbethiob.webp)

## 规格

- 4x USB
- 1x 100Mbps RJ45
- 1x Serial port pinout
- 1x Type-C power input connector

## 使用说明
使用之前，请确认要使用最新的TF卡固件 [latest image](https://milkv.io/docs/duo/resources/image-sdk)。

### 使用 Duo IO-Board

请注意，当Duo插在IO-Board底板上使用时，USB网络(USB-NCM)功能是失效的，请使用底板上的RJ45以太网接口。

底板上的网口MAC地址是随机分配的，这可能会导致每次重启之后，MAC地址会变，路由器为网口分配的ip地址也会变，为了解决这个问题，可以使用如下命令配置一个固定的MAC地址(**替换命令中的MAC地址为你想使用的地址，另外注意在同一网段中，不能出现重复的MAC地址**)：
```
echo "pre-up ifconfig eth0 hw ether 78:01:B3:FC:E8:55" >> /etc/network/interfaces && sync
```
然后执行 reboot 命令或重新上电使其生效。

配置IO-Board底板上的4个USB口功能：
~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
然后执行 reboot 命令或重新上电使其生效。

比如底板USB口接入U盘后，可以用`ls /dev/sd*`查看是否有检测到设备。

挂载到系统中查看U盘中的内容(以/dev/sda1为例)：
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
```
查看`/mnt/udisk`目录中的内容是否符合预期：
```
ls /mnt/udisk
```

卸载U盘的命令：
```
umount /mnt/udisk
```

在不使用 IO-Board 底板时，想恢复 USB 网卡(USB-NCM)功能，执行：
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-ncm.sh /mnt/system/usb.sh
sync
~~~
然后执行 reboot 命令或重新上电使其生效。

## 硬件原理图
- [Hardware schematics](https://github.com/milkv-duo/accessories/blob/master/Duo_USB%26Ethernet_IOB/duo_iob_v1.11.pdf)
