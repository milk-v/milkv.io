---
sidebar_label: '设置'
sidebar_position: 20
---

# Set up the working environment

Milk-V Vega offers multiple connection and management methods:
- WEB (Backend administration interface)
- SSH/Telnet (Manual activation required)
- UART
- JTAG


## WEB

To connect to the WEB management interface, place **your device in the same network segment as Milk-V Vega**.

We recommend using an Ethernet cable to directly connect your device to Milk-V Vega.

After the connection, configure the device's Ethernet as follows:


~~~
IP Address: 192.168.40.1
Subnet mask: 255.255.255.0
Default gateway:NULL
~~~

:::caution
IP Address must not be 192.168.40.253
:::

After waiting for the settings to take effect, your device will be able to connect to Milk-V Vega.

By default, you can check the connection to Milk-V Vega using the command **ping 192.168.40.253**.

Once everything is ready, open your browser and go to **192.168.40.253**, then enter the default username and password to access the WEB management interface.

~~~
USERNAME: admin
PASSWORD: admin
~~~

![WEB](/docs/vega/webcotrol.webp)

## SSH/Telnet

:::caution
Enabling SSH/Telnet may increase your network security risk. Please use it cautiously.
:::

For the security of network devices, Milk-V Vega defaults to closing SSH and Telnet connections. To enable them, follow these steps:

Navigate to **WEB management -> Access Control -> Enable Terminal Configure**.

You can enable SSH and Telnet from there.

![Access Control](/docs/vega/ssh-telnet.webp)

Once everything is ready, use a terminal connection tool and enter the following command:

~~~
$ssh root@192.168.40.253
~~~

Log in using the default username and password:

~~~
USERNAME: root
PASSWORD: milkv
~~~

## 串口

Vega 主板集成了 USB 转串口芯片，您只需使用一根 Type-C 数据线连接电脑和 Vega 的 Type-C 接口即可。

:::tip
只有在烧录系统或者需要通过命令行来调试设备时才需要连接串口，正常使用 Vega 时不需要连接。
:::

### Linux 环境下的串口配置

Linux 环境下比如 Ubuntu 系统，不需要安装驱动即可使用 Vege 集成的串口，通过 `lsusb` 命令可以查看 Ubuntu 下是否已经正常识别：
```bash
$ lsusb
Bus 001 Device 013: ID 0403:6010 Future Technology Devices International, Ltd FT2232C/D/H Dual UART/FIFO IC
```
另外，查看 `/dev/` 下，会出现 `/dev/ttyUSB0` 和 `/dev/ttyUSB1` 两个设备:
```bash
$ ls /dev/ttyUSB*
/dev/ttyUSB0  /dev/ttyUSB1
```
其中 `ttyUSB0` 是串口设备，您可以配置 `minicom` 等工具连接。

*`ttyUSB1` 是 JTAG 调试接口，暂未用到*
