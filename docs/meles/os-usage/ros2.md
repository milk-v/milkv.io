---
sidebar_label: 'ROS Car'
sidebar_position: 50
---

# RISC-V ROS Car

[Yahboom RISC-V ROS Car](https://www.yahboom.com/tbdetails?id=591) is a multifunctional ROS car built on Meles, equipped with laser radar, gimbal camera, handle and other accessories. It is developed with ROS2 and supports SLAM mapping, automatic path planning and obstacle avoidance, gamepad remote control, APP remote control and other functions. It is a good helper for you to learn Meles and ROS.

![ROS_Car](/docs/meles/ros_car.webp)

# Overview

The RISC-V ROS Car consists of the following parts:

- TOF LiDAR on top
- 2-DOF camera gimbal
- Milk-V Meles
- MicroROS Control Board
- Chassis 310 Encoder Gear Motor
- 7.4V Battery
- Gamepad and other accessories

![ROS_Car](/docs/meles/ros_car_assembly_en.webp)

Meles runs the openEuler system with ROS2, connects to the MicroROS control board through the serial port, and transmits sensor and control data such as radar, battery, accelerometer, etc. by subscribing to topics in ROS. You can find more information about openEuler and ROS in [OERV](https://www.oerv.wiki/robot/bestofpractice/05.html). You can check [Data Summary](https://www.yahboom.com/study/MicroROS-Board) for information about the MicroROS control board.

The laser radar model installed on the car is Orbbec MS200, with a sampling frequency of 4500 times per second and a scanning frequency of 7~15Hz. For more information, you can refer to the [user manual](https://www.oradar.com.cn/index/download/index.html?pid=2&id=4).

## Quick Start

### Robot assembly

For the assembly of the robot, please refer to [Assembly Video and Assembly Steps](https://www.yahboom.com/build.html?id=9624&cid=637)。

### Before Starting

During the operation of the robot, you may need to observe the status at all times to ensure that the robot is running normally. On the MicroROS control board, there is a blue LED that indicates the operating status of the control board and the battery power. The following are the introductions to the indicator status:

- The indicator light flashes twice every three seconds, indicating that the connection is normal.
- The indicator light flashes once per second (slow flash), indicating that the control board is in configuration mode.
- The indicator light flashes three times every three seconds, indicating that the control panel is currently in test mode.
- The indicator light flashes once every 100 milliseconds (fast flash) and the buzzer beeps, indicating that the battery voltage is low and the robot needs to be charged.

For more information about the MicroROS control board, please refer to [Data Summary](https://www.yahboom.com/study/MicroROS-Board)。

:::tip
In some of the following steps, you may need to enter your username and password in Meles. The following are the default username and password.

- User Name:openeuler
- Password:123456
:::

### First Boot of the Robot

Flip the switch on the MicroROS control board to power on the ROS robot. After powering on, please wait for Meles to start up, which takes about 2-3 minutes.

![switch](/docs/meles/ros_car_sw.webp)

If you have an HDMI monitor plugged into your board, you will see the following three terminals automatically launched on the screen.

![after_boot](/docs/meles/ros_car_bootup.webp)

These three terminals run the connection agent, handle control, and map building tasks respectively. The use of these programs will be introduced to you in the following articles.

At this time, open the gamepad and press the R1 button to unlock the chassis.

![unlock_chassis](/docs/meles/ros_car_gamepad_unlock.jpg)

After unlocking the chassis, press the ```X```, ```Y```, ```A```, and ```B``` buttons to control the direction of the gimbal, move the left joystick forward and backward to control forward/backward, and move the right joystick left and right to control the car to turn left/right.

![move_ctl](/docs/meles/ros_car_gamepad_guide.jpg)

:::tip
If you cannot use the handle to control the car, please refer to the [MicroROS board firmware burning](https://milkv.io/docs/meles/os-usage/ros2#microros-board-firmware-burning) section to burn and configure the MicroROS control board.
:::

### Disable auto-start script

When the robot is turned on, the connection agent, gamepad control, and map building tasks are started by default. If you want to run other tasks manually, you may need to turn off the automatic startup of these software to prevent conflicts between programs.

#### Using desktop environment

If you use a keyboard, mouse, and monitor, or VNC to operate the ROS car, you can directly use the desktop environment to disable the auto-start script.

Find it in the upper left corner of the desktop ```Application```-```Settings```-```Sessions and Startup```.

![Startup](/docs/meles/ros_car_startup_menu.jpg)

In the opened page, find the ```Application Autostart``` tab, where ```myprogram``` is the ROS-related startup item. Uncheck the checkbox in front of it to cancel the autostart.

![CancelAutoStart](/docs/meles/ros_car_startup_set.jpg)

#### Use command

If you use SSH to operate the ROS car, or it is inconvenient for you to enter the desktop environment, you can use commands to disabled the auto-start script.

First, execute the following command to enter the directory where the startup items are stored and list the files in it.

```bash
cd .config/autostart/
ls
```

Under normal circumstances, you can see the following three files.

![CancelAutoStart](/docs/meles/ros_car_startup_conf.jpg)

Take ```handle.desktop``` as an example. If you need to disable this startup item, you need to execute

```bash
sudo nano ./handle.desktop
```

Then add comments at the beginning of lines 5 and 6 of the file, and press ```ctrl``` + ```O``` to save, and ```ctrl``` + ```X``` to exit.

![changeconf](/docs/meles/ros_car_startup_setconf.jpg)
 
### Gamepad and keyboard control

If you need to manually enable gamepad or keyboard control, first you need to open the agent program and connect to the agent, execute the following command

```
sh ~/start_agent.sh
```

![agentnode](/docs/meles/ros_car_agent_node.jpg)

:::tip
If the program is stuck at the first two lines after you start the agent, press the reset button on the MicroROS control panel to connect to the agent.
:::

#### Gamepad Control

Open two terminals and execute the following commands.

Terminal 1：

```bash
ros2 run joy joy_node
```

Terminal 2：

```bash
ros2 run yahboomcar_ctrl yahboom_joy
```

After the above code runs successfully, press the R1 key to unlock the chassis.

![unlockchassis](/docs/meles/ros_car_gamepad_unlock.jpg)

After unlocking the chassis, press the ```X```, ```Y```, ```A```, and ```B``` buttons to control the direction of the gimbal, move the left joystick forward and backward to control forward/backward, move the right joystick left and right to control the car to turn left/right, and press the Start button to control the buzzer beep.

![movectl](/docs/meles/ros_car_gamepad_guide.jpg)

#### Keyboard Control

Open a terminal and execute the following command to use keyboard control.

```bash
ros2 run yahboomcar_ctrl yahboom_keyboard
```

![KeyboardControl](/docs/meles/ros_car_keyboard_node.jpg)

After the keyboard-control node is opened, use the ```u```, ```i```, ```o```, ```j```, ```k```, ```l```, ```,```, ```.```, ```/``` keys to control the forward, backward and turning movements of the car chassis.

### APP Control

Please first download the apk file from [APP Download link](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/ROS1_ROS2.apk). Currently, it only supports Android phones.

If you have closed the three programs that are automatically started by the system, you need to open three terminals in Meles and execute the following three commands respectively to start the map building and agent programs.

```
sh ~/start_agent.sh
ros2 launch yahboomcar_bringup yahboomcar_bringup_launch.py
ros2 launch yahboomcar_nav map_gmapping_app_launch.xml
```

:::tip
If there are only 3-4 lines of log output in the terminal after executing the first line of command ```sh ~/start_agent.sh```, please press the reset button on the MicroROS control board.
:::

After the APP is downloaded and installed, please connect to the car's WiFi first and turn off the mobile network connection on your phone.

- SSID:MicroROS_AP
- Password:12345678

After the connection is complete, open the APP, enter the address ```10.42.0.1``` in the IP address bar, and click the ```Connect``` button in the lower right corner.

![connect](/docs/meles/ros_car_app_en.jpg)

After the connection is successful, you will see the radar point cloud data and control stick on the main page.

![home](/docs/meles/ros_car_appmain_en.jpg)

<!-- ### SLAM 建图和避障 -->

## MicroROS board firmware burning

### Get the burning tool and firmware

First download and unzip the [MicroROS board firmware](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/Factory-Firmware.rar) and [burning tool](https://www.yahboom.com/public/download//MicroRos_Robot_pi5/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.rar).

We need to use the ```microROS_Robot_xxxx.bin``` firmware and the flashing tool in the ```flash_download_tool_3.9.5_0.zip``` compressed package.

In addition, the CP2102 serial port chip driver is included in the compressed package of the burning tool. If your PC lacks the chip driver, please run the ```CP210xVCPInstaller_xxx.exe``` in the ```CP2102-Windows驱动文件.zip``` compressed package to install the driver.

### Start burning

First, use a Type C data cable to connect the MicroROS serial port to the PC. The serial port location is shown in the figure below.

![Serial](/docs/meles/ros_car_microros_serial.jpg)

Then follow the next three steps to put the MicroRO control board into download mode.

- Press and hold the BOOT button
- Press the RST button
- Release the BOOT button

![button](/docs/meles/ros_car_microros_down.jpg)

Unzip all files in ```flash_download_tool_3.9.5_0.zip``` and run ```flash_download_tool_3.9.5.exe``` .

In the new page, select the chip-type as ESP32-S3 and click OK.

![chiptype](/docs/meles/ros_car_firmware_burn.jpg)

Then select the firmware ```microROS_Robot_xxxx.bin``` you want to burn at position 1, and fill 0 for the burning position. Select the serial port corresponding to the MicroROS control board at position 2, and finally click 3 to start burning.

![paraset](/docs/meles/ros_car_firmware_burnset.jpg)

After the burning is successful, Finish is displayed.

![finish](/docs/meles/ros_car_firmware_burnfinish.jpg)

At this time, plug the data cable back into Meles and the burning is complete.

### Configuration MicroROS Board

After the burning is completed, the parameters of the MicroROS board need to be configured to ensure normal communication between the MicroROS board and Meles.

First, run ```cat ~/.bashrc``` to confirm the DOMAIN_ID number.

![bashrc](/docs/meles/ros_car_bashrc.jpg)

And execute ```nano ~/config_robot.py```, edit the content at the end of the file, set ```robot.set_ros_domain_id()``` to the DOMAIN_ID number in ```.bashrc```, press ```ctrl```+```O``` to save, and press ```ctrl```+```X``` to exit.

![configpy](/docs/meles/ros_car_configpy.jpg)

Finally, execute ```python ~/config_robot.py``` to configure the MicroROS board.

![success](/docs/meles/ros_car_config_success.jpg)

## Install the image to Meles

First, you need to go to the "资料汇总下载" section under the [Yahboom official website](https://www.yahboom.com/study/microROS-Milk-V) to obtain the image file.

Unzip the compressed package in the folder "5、出厂镜像" to any location, and use the method in [Install an image to MicroSD Card](https://milkv.io/docs/meles/installation/install-an-image-to-microsd-card) to flash the image.

:::tip
If the system cannot boot after flashing, please try to change the burning software to ```Win32DiskImager```.
:::

## Appendix

### ROS2 Relevant information

ROS getting Started:https://www.oerv.wiki/robot/quick_start.html

Install ROS2 on OpenEuler:https://www.oerv.wiki/robot/how_to_install.html

ROS2 compilation environment installation:https://www.oerv.wiki/robot/compiler_and_service.html

ROS2 common commands:https://www.oerv.wiki/robot/common_command.html

Multi-machine communication example:https://www.oerv.wiki/robot/bestofpractice/01.html