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

### Boot the Robot

Flip the switch on the MicroROS control board to power on the ROS robot. After powering on, please wait for Meles to start up, which takes about 2-3 minutes.

![switch](/docs/meles/ros_car_sw.webp)

If you have an HDMI monitor plugged into your board, you will see the following three terminals automatically launched on the screen.

![after_boot](/docs/meles/ros_car_bootup.webp)

These three terminals run the connection agent, handle control, and map building tasks respectively. The use of these programs will be introduced to you in the following articles.

At this time, open the gamepad and press the R1 button to unlock the chassis.

![unlock_chassis](/docs/meles/ros_car_gamepad_unlock.jpg)

After unlocking the chassis, press the X, Y, A, and B buttons to control the direction of the gimbal, move the left joystick forward and backward to control forward/backward, and move the right joystick left and right to control the car to turn left/right.

![move_ctl](/docs/meles/ros_car_gamepad_guide.jpg)

:::tip
If you cannot use the handle to control the car, please refer to the [## MicroROS control board firmware burning] section to burn and configure the MicroROS control board.
:::

Comming soon.... Not long time...
