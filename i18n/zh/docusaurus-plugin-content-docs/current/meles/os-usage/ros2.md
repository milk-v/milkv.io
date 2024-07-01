---
sidebar_label: 'ROS 小车'
sidebar_position: 50
---

# RISC-V ROS 小车

[亚博 RISC-V ROS 小车](https://www.yahboom.com/tbdetails?id=591)是一款基于 Meles 打造的多功能 ROS 小车，搭载激光雷达、云台相机、手柄等配件。采用 ROS2 进行开发，支持 SLAM 建图、自动路径规划与避障、手柄遥控、APP 遥控等功能，是您学习 Meles 和 ROS 的好帮手。

![ROS_Car](/docs/meles/ros_car.webp)

## 概述

RISC-V ROS 小车由以下几部分组成：

- 顶部的 TOF 激光雷达
- 二自由度的摄像头云台
- Milk-V Meles 开发板
- MicroROS 控制板
- 底盘 310 编码器减速电机
- 7.4V 电池
- 手柄等其他配件

![ROS_Car](/docs/meles/ros_car_assembly_zh.webp)

其中 Meles 运行带有 ROS2 的 openEuler 系统，通过串口连接 MicroROS 控制板，通过在 ROS 中订阅话题来传递雷达、电池、加速度计等传感器和控制数据。您可以在 [OERV](https://www.oerv.wiki/robot/bestofpractice/05.html) 找到关于 openEuler 和 ROS 的更多信息。MicroROS 控制板相关资料您可以查询[资料汇总](https://www.yahboom.com/study/MicroROS-Board)。

小车上搭载的激光雷达型号为 奥比中光 MS200 ，采样频率每秒 4500 次，扫描频率 7~15Hz，更多资料您可以查询[用户手册](https://www.oradar.com.cn/index/download/index.html?pid=2&id=4)。

## 开始使用

### 机器人组装

机器人的组装请参考[组装视频和组装步骤](https://www.yahboom.com/build.html?id=9624&cid=637)。

### 开机前须知

在机器人运行过程中，您可能需要时刻观察状态，来确保机器人运行正常。在 MicroROS 控制板上，存在一个蓝色 LED ，该 LED 指示控制板的运行状态和电池电量，下面几条是指示灯状态的介绍：

- 指示灯每三秒快闪两下，代表连接正常
- 指示灯每秒闪一次（慢闪），代表控制板在配置模式下
- 指示灯每三秒快闪三次，代表控制板当前在测试模式下
- 指示灯每100毫秒闪一次（快闪），蜂鸣器有蜂鸣声，代表电池电压低，这时需要为机器人充电

更多关于 MicroROS 控制板的信息请查询[资料汇总](https://www.yahboom.com/study/MicroROS-Board)。

:::tip
在后面的一些操作步骤里，您可能需要在 Meles 里输入用户名和密码，下面是默认的用户名和密码。

- 用户名：openeuler
- 密码：123456
:::

### 首次启动机器人

拨动 MicroROS 控制板上的开关为 ROS 小车上电，上电后请等待 Meles 开机，时间大约为 2-3 分钟。

![小车开关](/docs/meles/ros_car_sw.webp)

如果您的开发板上插有 HDMI 显示器，您会在屏幕上看到以下三个自动启动的终端。

![开机后](/docs/meles/ros_car_bootup.webp)

这三个终端分别运行连接代理、手柄控制、建图任务，将在后面的文章中为您介绍这些程序的使用。

这时打开手柄，先按下 R1 键解锁底盘。

![解锁底盘](/docs/meles/ros_car_gamepad_unlock.jpg)

解锁底盘后，按下 ```X```、```Y```、```A```、```B``` 按键来控制云台方向，前后拨动左侧摇杆控制前进/后退，左右拨动右侧摇杆控制小车左转/右转。

![运动控制](/docs/meles/ros_car_gamepad_guide.jpg)

:::tip
若您不能使用手柄控制小车，请您参考[MicroROS 控制板固件烧录](https://milkv.io/zh/docs/meles/os-usage/ros2#获取烧录工具和固件)章节烧录烧录并配置 MicroROS 控制板。
:::

### 关闭自启动脚本

机器人开机默认启动连接代理、手柄控制和建图任务，若您想手动运行其他任务，可能需要关闭这些软件的自启动，防止程序之间的冲突。

#### 使用桌面环境关闭

若您使用键鼠和显示器，或者 VNC 来操作 ROS 小车，您可以直接使用桌面环境来关闭自启动脚本。

在桌面左上角找到 ```Application```-```Settings```-```Sessions and Startup``` 。

![Startup](/docs/meles/ros_car_startup_menu.jpg)

在打开的页面里找到 ```Application Autostart``` 选项卡，其中的 ```myprogram``` 是 ROS 相关的启动项，取消勾选其前面的复选框来取消自启动。

![CancelAutoStart](/docs/meles/ros_car_startup_set.jpg)

#### 使用命令关闭

若您使用 SSH 操作 ROS 小车，或者您不方便进入桌面环境，您可以使用命令的方式关闭自启动脚本。

首先执行下面的命令，进入存放自启动项的目录，并列举其中的文件。

```bash
cd .config/autostart/
ls
```

在正常情况下，您能看到如下三个文件。

![CancelAutoStart](/docs/meles/ros_car_startup_conf.jpg)

以 ```handle.desktop``` 为例，若您需要禁用该启动项，您需要执行

```bash
sudo nano ./handle.desktop
```

然后在文件的第5，6行开始处添加注释，然后按下 ```ctrl``` + ```O``` 键保存，```ctrl``` + ```X``` 键退出。

![changeconf](/docs/meles/ros_car_startup_setconf.jpg)
 
### 手柄和键盘控制

如果您需要手动打开手柄或键盘控制，首先您需要打开代理程序并连接代理，执行下面的命令

```
sh ~/start_agent.sh
```

![agentnode](/docs/meles/ros_car_agent_node.jpg)

:::tip
若您启动代理以后，程序一直卡在前两行的位置，请您按下 MicroROS 控制板上的复位按键，以连接代理。
:::

#### 手柄控制

打开两个终端执行下面的命令。

终端1：

```bash
ros2 run joy joy_node
```

终端2：

```bash
ros2 run yahboomcar_ctrl yahboom_joy
```

在上面的代码成功运行后，先按下 R1 键解锁底盘。

![解锁底盘](/docs/meles/ros_car_gamepad_unlock.jpg)

解锁底盘后，按下 ```X```、```Y```、```A```、```B``` 按键来控制云台方向，前后拨动左侧摇杆控制前进/后退，左右拨动右侧摇杆控制小车左转/右转，按下 Start 键控制蜂鸣器蜂鸣声。

![运动控制](/docs/meles/ros_car_gamepad_guide.jpg)

#### 键盘控制

打开一个终端，执行下面的命令，以使用键盘控制。

```bash
ros2 run yahboomcar_ctrl yahboom_keyboard
```

![键盘控制](/docs/meles/ros_car_keyboard_node.jpg)

在键盘控制的节点打开以后，使用 ```u```、```i```、```o```、```j```、```k```、```l```、```,```、```.```、```/``` 按键来控制小车底盘的前后、转弯运动。

### APP 控制

请首先从 [APP 下载地址](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/ROS1_ROS2.apk)下载 apk 文件，目前仅支持安卓手机使用。

若您关闭了系统自启动的三个程序，那么您需要在 Meles 中开启三个终端分别执行下面的三条命令来启动建图和代理程序。

```
sh ~/start_agent.sh
ros2 launch yahboomcar_bringup yahboomcar_bringup_launch.py
ros2 launch yahboomcar_nav map_gmapping_app_launch.xml
```

:::tip
若您在执行完第一行指令 ```sh ~/start_agent.sh``` 后，终端只有 3-4 行日志输出，请按一下 MicroROS 控制板上的复位按键。
:::

APP 下载安装完成后，请首先连接小车 WiFi ，并关闭手机的移动网络连接。

- WiFi 名称：MicroROS_AP
- 密码：12345678

连接完成后打开 APP ，在 IP 地址栏中输入地址 ```10.42.0.1``` ，并点击右下角的```连接```按钮。

![连接](/docs/meles/ros_car_app_zh.jpg)

连接成功后，您会在主界面上看到雷达点云数据和控制摇杆等。

![主页](/docs/meles/ros_car_appmain_zh.jpg)

<!-- ### SLAM 建图和避障 -->

## MicroROS 控制板固件烧录

### 获取烧录工具和固件

首先下载并解压[扩展板固件](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/Factory-Firmware.rar)和[烧录工具](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.rar)。

我们需要用到其中的 ```microROS_Robot_xxxx.bin``` 固件，```flash_download_tool_3.9.5_0.zip``` 压缩包中的烧录工具。

另外，在烧录工具压缩包中，附有 CP2102 串口芯片的驱动，若您的 PC 上缺少该芯片的驱动，请您运行 ```CP2102-Windows驱动文件.zip``` 压缩包中的 ```CP210xVCPInstaller_xxx.exe``` 来安装驱动。

### 开始烧录

首先用 Type C 数据线将 MicroROS 串口接口和 PC 连接，串口接口位置如下图所示。

![串口接口](/docs/meles/ros_car_microros_serial.jpg)

再执行下面三个步骤让 MicroRO 控制板进入下载模式。

- 按住 BOOT 按键
- 按一下 RST 按键
- 松开 BOOT 按键

![按键介绍](/docs/meles/ros_car_microros_down.jpg)

解压 ```flash_download_tool_3.9.5_0.zip``` 中的所有文件，并运行 ```flash_download_tool_3.9.5.exe``` 。

在弹出的页面中，选择芯片型号为 ESP32-S3 ，并点击 OK 。

![选择芯片型号](/docs/meles/ros_car_firmware_burn.jpg)

然后在 1 位置处选择您要烧录的固件 ```microROS_Robot_xxxx.bin``` ，后面的烧录位置填 0 。在 2 位置处选择 MicroROS 控制板对应的串口，最后点击 3 开始烧录。

![参数选择](/docs/meles/ros_car_firmware_burnset.jpg)

烧录成功后显示 Finish 。

![烧录结束](/docs/meles/ros_car_firmware_burnfinish.jpg)

这时将数据线插回 Meles ，烧录完成。

### 配置控制板

在烧录完成后，需要对控制板的参数进行配置，以保证控制板和 Meles 之间通信正常。

首先执行 ```cat ~/.bashrc``` ，确认其中的 DOMAIN_ID 号。

![bashrc](/docs/meles/ros_car_bashrc.jpg)

再执行 ```nano ~/config_robot.py``` ，编辑文件末尾位置的内容，将 ```robot.set_ros_domain_id()``` 设置成 ```.bashrc``` 中的 DOMAIN_ID 号，按 ```ctrl```+```O``` 保存，按 ```ctrl```+```X``` 退出。

![configpy](/docs/meles/ros_car_configpy.jpg)

最后执行 ```python ~/config_robot.py``` 来配置控制板。

![配置成功](/docs/meles/ros_car_config_success.jpg)

## 安装镜像到 Meles 

首先，您需要到[亚博官网](https://www.yahboom.com/study/microROS-Milk-V)下的“资料汇总下载”板块获取镜像文件。

解压文件夹“5、出厂镜像”中的压缩包到任意位置，使用[安装镜像到 MicroSD 卡](https://milkv.io/zh/docs/meles/installation/install-an-image-to-microsd-card)中的方法刷写镜像。

:::tip
若刷写后系统不能启动，请您尝试将烧录软件更换为 ```Win32DiskImager``` 。
:::

## 附录

### ROS2 相关资料

ROS 入门：https://www.oerv.wiki/robot/quick_start.html

在 OpenEuler 上安装 ROS2 ：https://www.oerv.wiki/robot/how_to_install.html

ROS2 编译环境安装：https://www.oerv.wiki/robot/compiler_and_service.html

ROS2 常用命令：https://www.oerv.wiki/robot/common_command.html

多机通信实例：https://www.oerv.wiki/robot/bestofpractice/01.html