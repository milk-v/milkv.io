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

User Name:openeuler
Password:123456
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
If you cannot use the handle to control the car, please refer to the [## MicroROS control board firmware burning] section to burn and configure the MicroROS control board.
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

![changeconf](/docs/meles/ros_car_agent_node.jpg)

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
