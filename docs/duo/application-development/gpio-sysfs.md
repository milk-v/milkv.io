---
sidebar_label: 'GPIO pin control'
sidebar_position: 3
---

# GPIO pin control

The Duos serial number is the NUM column of [J3 arrangement](https://milkv.io/zh/docs/duo/getting-started/duos#%E6%8E%92%E9%92%88-j3).

The Duo serial number is the NUM column of [GPIO pin distribution](https://milkv.io/zh/docs/duo/getting-started/duo#gpio-%E5%BC%95%E8%84%9A%E5%88%86%E5%B8%83).

The serial number of Duo256M is the NUM column of [GPIO pin distribution](https://milkv.io/zh/docs/duo/getting-started/duo256m#duo256m-gpio-%E5%BC%95%E8%84%9A%E5%88%86%E9%85%8D).

The serial number of Duo Module 01 is the NUM column of [26 PIN pin header](https://milkv.io/zh/docs/duo/getting-started/duo-module-01#26-pin-%E6%8E%92%E9%92%88).

Take Duos, GPIO466 as an example,

1. Perform the following operations to configure GPIO

```
$ cd /sys/class/gpio

$ echo 466 > export

```
You can run the command ls /sys/class/gpio to list the GPIO directory, check whether gpio466 appears, and confirm that the export is successful.

Run the command `echo 466 > unexport` to cancel the export of the gpio466 pin.

2. Set the direction of GPIO

Run the command `echo "out" > gpio466/direction` to set the gpio466 direction to output.

Run the command `echo "in" > gpio466/direction` to set the gpio466 direction to input.

You can check the set direction by running the command `cat gpio466/direction`.

3. Set the GPIO level

Run the command `echo "1" > gpio466/value` to set the gpio466 level to high.

Run the command `echo "0" > gpio466/value` to set the gpio466 level to low.

You can view the set level by running the command `cat gpio466/value`.