---
sidebar_label: '设置'
sidebar_position: 20
---

# 设置工作环境

Milk-V Vega 提供多种连接和管理方法：

- WEB（后端管理界面）
- SSH/Telnet（需要手动激活）
- UART
- JTAG


## WEB

要连接到 WEB 管理界面，请将**您的设备与 Milk-V Vega 放在同一网段**。

我们建议使用以太网电缆将您的设备(例如PC)直接连接到 Milk-V Vega。

连接后，配置设备(例如PC)静态 IP，如下所示：

~~~
IP Address: 192.168.40.1
Subnet mask: 255.255.255.0
Default gateway:NULL
~~~

:::caution
IP 地址不能是 192.168.40.253
:::

等待设置生效后，您的设备就可以连接到 Milk-V Vega。

默认情况下，您可以使用命令 **ping 192.168.40.253** 检查与 Milk-V Vega 的连接。

一切准备就绪后，打开浏览器，输入 **192.168.40.253**，输入默认的用户名和密码，即可进入WEB管理界面。

~~~
账户: admin
密码: admin
~~~

![WEB](/docs/vega/webcotrol.webp)

## SSH/Telnet

:::caution
启用 S​​SH/Telnet 可能会增加您的网络安全风险，请谨慎使用。
:::

为了网络设备的安全，Milk-V Vega 默认关闭 SSH 和 Telnet 连接。要启用它们，请按照以下步骤操作：

进入 **WEB management -> Access Control -> Enable Terminal Configure**。

您可以从那里启用 SSH 和 Telnet。

![Access Control](/docs/vega/ssh-telnet.webp)

一切准备就绪后，使用终端连接工具并输入以下命令：

~~~
$ssh root@192.168.40.253
~~~

使用默认用户名和密码登录：

~~~
用户: root
密码: milkv
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

串口的默认的参数如下：

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

使用默认用户名和密码登录：

~~~
用户: root
密码: milkv
~~~

### JTAG

`ttyUSB1` 是 JTAG 调试接口，使用方法后续更新。
