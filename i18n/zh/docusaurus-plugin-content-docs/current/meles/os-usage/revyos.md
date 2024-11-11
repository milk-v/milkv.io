---
sidebar_label: 'RevyOS'
sidebar_position: 50
---

# RevyOS

Meles RevyOS 是一个易于使用的桌面系统。在使用 Meles RevyOS 时，您会发现它在音频、视频、互联网、BT、AI等方面表现良好。

以 `$` 开头的命令表示该命令可以由无特权用户执行。以 `#` 开头的命令意味着该命令可以由特权用户执行。但是符号 `$` 和 `#` 不是命令的一部分。

## 登录

登录需要用户账户和密码。

- User Name: **debian**
- password : **debian**

![desktop-login](/docs/meles/login.webp)

## 打开终端

您可以通过单击以下图标或使用快捷键 “Ctrl+Alt+T” 打开命令行终端。

![cmd-line-1](/docs/meles/cmd-line-1.webp)

![cmd-line-2](/docs/meles/cmd-line-2.webp)

- 输入 `sudo su` 命令并输入密码来使用 `root` 权限, 密码：`debian`.

![cmd-line-3](/docs/meles/cmd-line-3.webp)

## 网络连接

首先连接网线到 Meles 的网口

- 当未连接网线时检查网络状态

![ethernet-disconnect](/docs/meles/ethernet-disconnect.webp)

- 当连接网线时检查网络状态

![ethernet-connect](/docs/meles/ethernet-connect.webp)

## Wi-Fi 连接

- 单击右上角的图标以查看无线网络。

![wifi-connect-1](/docs/meles/wifi-connect-1.webp)

- 输入密码，然后单击“连接”以连接到热点。

![wifi-connect-2](/docs/meles/wifi-connect-2.webp)

![wifi-connect-3](/docs/meles/wifi-connect-3.webp)

## 蓝牙连接

### 打开蓝牙

首先需要通过在命令行中输入以下命令来启用蓝牙。

- 需要以 **`root`** 权限执行。

- 键入 **`vi bt_enable.sh`** 命令来打开 vim 编辑器。

![enable-bt-1](/docs/meles/enable-bt-1.webp)

- 按下 **`i`** 键进入输入模式。

![enable-bt-2](/docs/meles/enable-bt-2.webp)

- 然后输入以下内容
```
echo 509 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio509/direction
echo 0 > /sys/class/gpio/gpio509/value
sleep 2
echo 1 > /sys/class/gpio/gpio509/value
sleep 1

brcm_patchram_plus --enable_hci --no2bytes --tosleep 200000 --baudrate 115200 --patchram  /lib/firmware/brcm/BCM4345C5.hcd /dev/ttyS4 &
```

![enable-bt-3](/docs/meles/enable-bt-3.webp)

- 输入内容后，按 **`ESC`** 键进入命令模式，然后输入 **`wq`** 并按 **`enter `** 键保存并退出。

![enable-bt-4](/docs/meles/enable-bt-4.webp)

- 执行 **`chmod +x bt_enable.sh`** 命令。

![enable-bt-5](/docs/meles/enable-bt-5.webp)

- 执行 **`./bt_enable.sh`** 以启用蓝牙，蓝牙图标将显示在右上角。

![enable-bt-6](/docs/meles/enable-bt-6.webp)

- 单击右上角的蓝牙图标，将弹出启用蓝牙窗口，然后单击 **`启用蓝牙`** 。

![enable-bt-7](/docs/meles/enable-bt-7.webp)

- 右上角的蓝牙图标在启用后变为正常。

![enable-bt-8](/docs/meles/enable-bt-8.webp)

### 连接到蓝牙设备

启用蓝牙后，您可以开始搜索并连接到要连接的蓝牙设备。

- 单击右上角的蓝牙图标，然后在弹出窗口中选择 **`是`** 。

![connect-bt-1](/docs/meles/connect-bt-1.webp)

- 点击 **`search`** 开始搜索。

![connect-bt-2](/docs/meles/connect-bt-2.webp)

- 搜索完成后，您周围的相关蓝牙设备将显示在屏幕上。

![connect-bt-3](/docs/meles/connect-bt-3.webp)

- 单击要连接的蓝牙设备，Meles 将自动连接。

![connect-bt-4](/docs/meles/connect-bt-4.webp)

## 浏览器使用

系统内置了 Chromium 浏览器，单击桌面底部的浏览器图标即可使用。

![browser-use-1](/docs/meles/browser-use-1.webp)

- 打开后，您可以使用搜索引擎。

![browser-use-2](/docs/meles/browser-use-2.webp)

- 也可以播放在线视频。

![browser-use-3](/docs/meles/browser-use-3.webp)

## 显示设置

仅当您在显示器上操作时，显示设置才可用。

### 应用程序-设置-显示

单击桌面左上角的“应用程序”。

![display-1](/docs/meles/display-1.webp)

选择“设置”，然后在“选项”部分中找到“显示”选项。

![display-2](/docs/meles/display-2.webp)

您可以在其中更改以下设置。

![display-3](/docs/meles/display-3.webp)

## 设置 VNC 和自动登录

首先确保开发板已经联网。

随后打开终端，执行以下命令，安装 x11vnc

```
sudo apt update
sudo apt install x11vnc -y
```

安装完成后执行命令 ```x11vnc``` ，出现下图所示的输出证明安装成功。

![vnc-install](/docs/meles/vnc-installed.jpg)

下面设置开机自启动。

在终端中执行命令 ```nano ~/vnc_startup.sh```，在文件中输入下列内容：

```
while true
do
x11vnc
done
```

输入完成后按 ```ctrl``` + ```o``` 保存，按 ```ctrl``` + ```x``` 退出。

执行下列命令给文件添加执行权限：

```
chmod +x ~/vnc_startup.sh
```

最后再设置 vnc 自启动，打开左上角 application - settings - session and startup

在页面的 application autostart 项添加 vnc 启动任务，任务命令填写 ```/home/debian/vnc_startup.sh```，如图所示。

![vnc-install](/docs/meles/vnc-startup.jpg)

接下来设置自动登录。

执行下列命令

```
sudo nano /etc/lightdm/lightdm.conf
```

编辑 ```autologin-user=``` 和 ```autologin-in-background=false``` 两行。

取消注释，内容更改为

```
autologin-user=debian
autologin-in-background=True
```

![vnc-install](/docs/meles/lightdn-conf.jpg)

完成后按 ```ctrl``` + ```o``` 保存，按 ```ctrl``` + ```x``` 退出。

最后重启。

meles 启动后请在路由器上查询 meles 的 IP 地址，打开 VNC 客户端，设置连接。

![vnc-install](/docs/meles/vnc-connect.jpg)

![vnc-install](/docs/meles/vnc-connected.jpg)

## SSH

- 要检查SSH服务的状态，请在命令行窗口中运行以下命令

```
sudo service ssh status
```

![ssh-1](/docs/meles/ssh-1.webp)

- 输入以下命令来建立 SSH 连接

```
ssh [username]@[IP address]
```

比如：

```
ssh milkv@192.168.2.180
```

- 您需要输入用户密码才能成功连接到 Debian 系统。这是一个基本的 SSH 连接过程。您可以使用其他 SSH 软件进行更高级的连接。

![ssh-2](/docs/meles/ssh-2.webp)

### 注意

SSH 是默认安装的。

如果未安装 SSH 服务，可以使用以下命令进行安装：

```
sudo apt-get update
sudo apt-get install ssh
```

如果 SSH 服务未启动或运行异常，请运行以下命令重新启动它：

```
sudo service sshd restart
```
