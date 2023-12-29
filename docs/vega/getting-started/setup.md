---
sidebar_label: 'Setting Up'
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
