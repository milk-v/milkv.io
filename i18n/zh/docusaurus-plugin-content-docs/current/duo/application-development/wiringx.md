---
sidebar_label: 'wiringX'
sidebar_position: 10
---

## 简介

`wiringX` 是一个开源的 GPIO 控制库，旨在为不同的嵌入式平台提供通用且统一的 GPIO 控制接口。它基于 WiringPi 库进行了改进和扩展，并支持多种嵌入式平台，对`Milk-V Duo`也进行了适配。使用`wiringX`，开发者可以使用相同的代码来控制不同平台上的 GPIO 引脚，简化了跨平台开发的工作，使得开发嵌入式应用程序更加方便和灵活。

本文将分为如下4个部分介绍如何使用 wiringX 在 Duo 上开发应用：

1. 基于 wiringX 的应用程序编译环境配置
2. 基本使用方法代码示范
3. 一些使用 wiringX 实现的 Demo 和项目介绍
4. wiringX 的 AP

如果您对 wiringX 的使用方法已经非常熟悉，可以直接参考示例代码仓库: [duo-examples](https://github.com/milkv-duo/duo-examples)。

注意，Duo 系列的很多引脚功能是复用的，在使用`wiringX`来控制 Duo/Duo256M/DuoS 各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`duo-pinmux`命令来切换为所需功能。

具体方法请参考: [引脚复用](https://milkv.io/zh/docs/duo/application-development/pinmux)。

## Duo 系列开发板 wiringX 引脚序号

### Duo/Duo256M

Duo 和 Duo256M 的 wiringX 引脚序号, 与引脚名序号是一致的，蓝色 LED 控制引脚不在引出的 40PIN 物理引脚上，其 wiringX 的序号是`25`。

<Image src='/docs/duo/duo/duo-pinout-01.webp' maxWidth='50%' align='left' />

<div className='gpio_style'>

| wiringX | PIN NAME |              PIN#               |               PIN#               | PIN NAME | wiringX |
| ------- | -------- | :-----------------------------: | :------------------------------: | -------- | ------- |
| 0       | GP0      | <div className='green'>1</div>  |  <div className='red'>40</div>   | VBUS     |         |
| 1       | GP1      | <div className='green'>2</div>  |  <div className='red'>39</div>   | VSYS     |         |
|         | GND      | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |         |
| 2       | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |         |
| 3       | GP3      | <div className='green'>5</div>  |  <div className='red'>36</div>   | 3V3(OUT) |         |
| 4       | GP4      | <div className='green'>6</div>  |  <div className='gray'>35</div>  |          |         |
| 5       | GP5      | <div className='green'>7</div>  |  <div className='gray'>34</div>  |          |         |
|         | GND      | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |         |
| 6       | GP6      | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     | 27      |
| 7       | GP7      | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     | 26      |
| 8       | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |         |
| 9       | GP9      | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     | 22      |
|         | GND      | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |         |
| 10      | GP10     | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     | 21      |
| 11      | GP11     | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     | 20      |
| 12      | GP12     | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     | 19      |
| 13      | GP13     | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     | 18      |
|         | GND      | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |         |
| 14      | GP14     | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     | 17      |
| 15      | GP15     | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     | 16      |
|         |          |             &nbsp;              |                                  |          |         |
| 25      | GP25     | <div className='blue'>LED</div> |                                  |          |         |

</div>

### DuoS

DuoS 的 wiringX 引脚序号, 与物理引脚序号是一致的，蓝色 LED 控制引脚不在引出的 40PIN 物理引脚上，其 wiringX 的序号是 `0`。

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='left' />

#### 排针 J3

`排针 J3` 上的 GPIO 使用 3.3V 逻辑电平。

<div className='gpio_style' style={{ overflow :"auto"}} >

| wiringX | PIN NAME | PIN#                             | PIN#                            | PIN NAME | wiringX |
|:-------:|:---------|:--------------------------------:|:-------------------------------:|:---------|:-------:|
|         | 3V3      | <div className='orange'>1</div>  | <div className='red'>2</div>    | VSYS(5V) |         |
| 3       | B20      | <div className='green'>3</div>   | <div className='red'>4</div>    | VSYS(5V) |         |
| 5       | B21      | <div className='green'>5</div>   | <div className='black'>6</div>  | GND      |         |
| 7       | B18      | <div className='green'>7</div>   | <div className='green'>8</div>  | A16      | 8       |
|         | GND\*    | <div className='black'>9</div>   | <div className='green'>10</div> | A17      | 10      |
| 11      | B11      | <div className='green'>11</div>  | <div className='green'>12</div> | B19      | 12      |
| 13      | B12      | <div className='green'>13</div>  | <div className='black'>14</div> | GND      |         |
| 15      | B22      | <div className='green'>15</div>  | <div className='green'>16</div> | A20      | 16      |
|         | 3V3      | <div className='orange'>17</div> | <div className='green'>18</div> | A19      | 18      |
| 19      | B13      | <div className='green'>19</div>  | <div className='black'>20</div> | GND      |         |
| 21      | B14      | <div className='green'>21</div>  | <div className='green'>22</div> | A18      | 22      |
| 23      | B15      | <div className='green'>23</div>  | <div className='green'>24</div> | B16      | 24      |
|         | GND      | <div className='black'>25</div>  | <div className='green'>26</div> | A28      | 26      |

</div>

*GND\*：引脚 9 在 DuoS V1.1 版本硬件中是一个低电平的 GPIO，在 V1.2 及更高版本硬件中为 GND。*

#### 排针 J4

`排针 J4` 上的 GPIO 使用 1.8V 逻辑电平。

该排针上的大部分引脚都有其专用功能，如 MIPI DSI 信号，触摸屏信号以及音频信号，如非特殊需求，不建议使用该排针上的引脚做为 GPIO 使用。

<div className='gpio_style' style={{ overflow :"auto"}} >

| wiringX | PIN NAME | PIN#                            | PIN#                             | PIN NAME    | wiringX |
|:-------:|----------|:-------------------------------:|:--------------------------------:|:------------|:-------:|
|         | VSYS(5V) | <div className='red'>52</div>   | <div className='blue'>51</div>   | AUDIO_OUT_R |         |
| 50      | B1       | <div className='green'>50</div> | <div className='blue'>49</div>   | AUDIO_OUT_L |         |
| 48      | B2       | <div className='green'>48</div> | <div className='blue'>47</div>   | AUDIO_IN_R  |         |
| 46      | B3       | <div className='green'>46</div> | <div className='blue'>45</div>   | AUDIO_IN_L  |         |
| 44      | E2       | <div className='green'>44</div> | <div className='orange'>43</div> | 3V3         |         |
| 42      | E1       | <div className='green'>42</div> | <div className='green'>41</div>  | C18         | 41      |
| 40      | E0       | <div className='green'>40</div> | <div className='green'>39</div>  | C19         | 39      |
|         | GND      | <div className='black'>38</div> | <div className='black'>37</div>  | GND         |         |
| 36      | C20      | <div className='green'>36</div> | <div className='green'>35</div>  | C16         | 35      |
| 34      | C21      | <div className='green'>34</div> | <div className='green'>33</div>  | C17         | 33      |
|         | GND      | <div className='black'>32</div> | <div className='black'>31</div>  | GND         |         |
| 30      | C14      | <div className='green'>30</div> | <div className='green'>29</div>  | C12         | 29      |
| 28      | C15      | <div className='green'>28</div> | <div className='green'>27</div>  | C13         | 27      |

</div>

## 开发环境配置

### 准备开发环境

使用本地的 Ubuntu 系统，推荐 Ubuntu 22.04 LTS
(也可以使用虚拟机中的 Ubuntu 系统、Windows 中 WSL 安装的 Ubuntu、基于 Docker 的 Ubuntu 系统)。

- 安装编译依赖的工具
  ```
  sudo apt-get install wget git make
  ```
- 获取 Examples 源码
  ```
  git clone https://github.com/milkv-duo/duo-examples.git
  ```

- 加载编译环境
  ```
  cd duo-examples
  source envsetup.sh
  ```
  第一次加载会自动下载所需的编译工具链，下载后的目录名为`host-tools`，下次再加载编译环境时，会检测该目录，如果已存在则不会再次下载。

  加载编译环境时需要按提示输入所需编译目标：
  ```
  Select Product:
  1. Duo (CV1800B)
  2. Duo256M (SG2002) or DuoS (SG2000)
  ```
  如果目标板是 Duo 则选择 `1`，如果目标板是 Duo256M 或者 DuoS 则选择 `2`。由于 Duo256M 和 DuoS 支持 RISCV 和 ARM 两种架构，还需要按提示继续选择：
  ```
  Select Arch:
  1. ARM64
  2. RISCV64
  Which would you like:
  ```
  如果测试程序需要在 ARM 系统中运行，选择 `1`，如果是 RISCV 系统则选择 `2`。

- 编译测试

  以`hello-world`为例，进入该例子目录直接执行`make`即可：
  ```
  cd hello-world
  make
  ```
  编译成功后将生成的`helloworld`可执行程序通过网口或者 USB 网络等方式传送到 Duo 设备中，比如[默认固件](https://github.com/milkv-duo/duo-buildroot-sdk/releases)支持的 USB-NCM 方式，Duo 的 IP 为`192.168.42.1`，用户名是`root`，密码是`milkv`。
  ```
  scp helloworld root@192.168.42.1:/root/
  ```
  发送成功后，在 ssh 或者串口登陆的终端中运行`./helloworld`，会打印`Hello, World!`
  ```
  [root@milkv]~# ./helloworld
  Hello, World!
  ```
  **至此，我们的编译开发环境就可以正常使用了**

### 如何创建自己的工程

根据需要，拷贝现有的例子，稍加修改即可。比如需要操作某个 GPIO，可以参考`blink`例子，LED闪烁就是通过控制 GPIO 电平高低实现的，平台初始化和控制 GPIO 的方法，可参考`blink.c`中的代码。

- 新建自己的工程目录`my-project`
- 复制`blink`例子中的`blink.c`和`Makefile`文件到`my-project`目录
- 将`blink.c`重命名为自己所需名字如`gpio_test.c`
- 修改`Makefile`中的`TARGET=blink`为`TARGET=gpio_test`
- 修改`gpio_test.c`，实现自己的代码逻辑
- 执行`make`命令编译
- 将生成的`gpio_test`可执行程序发送到Duo中运行

注意:

- 新建工程目录不是必须要放到 duo-examples 目录下的，可以根据自己的习惯放到其他位置，执行 make 编译命令之前，加载过 duo-examples 目录下的编译环境就可以了(`source /PATH/TO/duo-examples/envsetup.sh`)。
- 在加载过编译环境(`envsetup.sh`)的终端里，不要编译其他平台如 ARM 或 X86 的 Makefile 工程，如需编译其他平台项目，需要新开终端。

## 代码示范

### GPIO 使用示例

下面是一个操作 GPIO 的例子，将 Duo 的`20`引脚间隔1秒循环拉高再拉低，物理`20`引脚的 wiringX 序号是`15`。

```c
#include <stdio.h>
#include <unistd.h>

#include <wiringx.h>

int main() {
    int DUO_GPIO = 15;

    // Duo:     milkv_duo
    // Duo256M: milkv_duo256m
    // DuoS:    milkv_duos
    if(wiringXSetup("milkv_duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    if(wiringXValidGPIO(DUO_GPIO) != 0) {
        printf("Invalid GPIO %d\n", DUO_GPIO);
    }

    pinMode(DUO_GPIO, PINMODE_OUTPUT);

    while(1) {
        printf("Duo GPIO (wiringX) %d: High\n", DUO_GPIO);
        digitalWrite(DUO_GPIO, HIGH);
        sleep(1);
        printf("Duo GPIO (wiringX) %d: Low\n", DUO_GPIO);
        digitalWrite(DUO_GPIO, LOW);
        sleep(1);
    }

    return 0;
}
```
编译后放到 Duo 中运行，可以用万用表或者示波器测量`20`引脚的状态是否符合预期。

也可以使用板上的 LED 引脚来验证，通过观察 LED 亮灭来直观地判断程序是否正确执行，LED 引脚的 wiringX 序号为`25`，把上面代码中的`15`引脚改为`25`即可，需要注意的是默认固件开机后通过脚本控制 LED 闪烁了，要将其禁用，方法请参考下面的 [blink](#blink) 例子说明。

### I2C 使用示例

以下是一个 I2C 的示例：

```c
#include <stdio.h>
#include <unistd.h>
#include <stdint.h>

#include <wiringx.h>

#define I2C_DEV "/dev/i2c-1"

#define I2C_ADDR 0x04

int main(void)
{
    int fd_i2c;
    int data = 0;

    // Duo:     milkv_duo
    // Duo256M: milkv_duo256m
    // DuoS:    milkv_duos
    if(wiringXSetup("milkv_duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    if ((fd_i2c = wiringXI2CSetup(I2C_DEV, I2C_ADDR)) <0) {
        printf("I2C Setup failed: %d\n", fd_i2c);
        wiringXGC();
        return -1;
    }

    // TODO
}
```

### SPI 使用示例

以下是一个SPI的示例：

```c
#include <stdio.h>
#include <unistd.h>
#include <stdint.h>

#include <wiringx.h>

int main(void)
{
    int fd_spi;

    // Duo:     milkv_duo
    // Duo256M: milkv_duo256m
    // DuoS:    milkv_duos
    if(wiringXSetup("milkv_duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    if ((fd_spi = wiringXSPISetup(0, 500000)) <0) {
        printf("SPI Setup failed: %d\n", fd_spi);
        wiringXGC();
        return -1;
    }

    // TODO
}
```

### UART 使用示例

以下是一个 UART 的示例，使用引脚 4/5 上的 UART4：

```c
#include <stdio.h>
#include <unistd.h>

#include <wiringx.h>

int main() {
    struct wiringXSerial_t wiringXSerial = {115200, 8, 'n', 1, 'n'};
    char buf[1024];
    int str_len = 0;
    int i;
    int fd;

    // Duo:     milkv_duo
    // Duo256M: milkv_duo256m
    // DuoS:    milkv_duos
    if(wiringXSetup("milkv_duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    if ((fd = wiringXSerialOpen("/dev/ttyS4", wiringXSerial)) < 0) {
        printf("Open serial device failed: %d\n", fd);
        wiringXGC();
        return -1;
    }

    wiringXSerialPuts(fd, "Duo Serial Test\n");

    while(1)
    {
        str_len = wiringXSerialDataAvail(fd);
        if (str_len > 0) {
            i = 0;
            while (str_len--)
            {
                buf[i++] = wiringXSerialGetChar(fd);
            }
            printf("Duo UART receive: %s\n", buf);
        }
    }

    wiringXSerialClose(fd);

    return 0;
}
```
测试方法:

电脑上的 USB 转串口线的 RX 接 Duo 的4脚(UART4_TX)，串口线的 TX 接 Duo 的5脚(UART4_RX)，串口线的 GND 接 Duo 的 GND，电脑中使用串口调试助手配置好相应的 COM 口和参数。

上述程序编译后生成的可执行程序命名为`uart_test`，通过ssh上传到 Duo 中运行，可以看到电脑上的串口工具中收到了`Duo Serial Test`字符串，串口工具中发送一个字符串`Hello World`，Duo 的终端上也会收到对应的字符串，说明串口收发都正常。

![duo](/docs/duo/duo-wiringx-uart-test-zh.png)

## Demo 和项目说明

### hello-world

源码：[https://github.com/milkv-duo/duo-examples/tree/main/hello-world](https://github.com/milkv-duo/duo-examples/tree/main/hello-world)

一个简单的例子，不操作 Duo 外设，仅打印输出"Hello, World!"，用来验证开发环境。

### blink

源码：[https://github.com/milkv-duo/duo-examples/tree/main/blink](https://github.com/milkv-duo/duo-examples/tree/main/blink)

一个让 Duo 板载 LED 闪烁的例子，操作 GPIO 使用的是`wiringX`的库，`blink.c`代码中包含了`wiringX`中的平台初始化以及操作 GPIO 的方法。

注意:
当前Duo的默认固件上电后 LED 会自动闪烁，这个是通过开机脚本实现的，在测试该 blink 例子的时候，需要将 LED 闪烁的脚本禁用，在 Duo 的终端中执行：
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不闪了  
测试完我们C语言实现的 blink 程序后，如果需要恢复 LED 闪烁脚本，再将其名字改回来，重启即可：
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

### PWM

源码：[https://github.com/milkv-duo/duo-examples/tree/main/pwm](https://github.com/milkv-duo/duo-examples/tree/main/pwm)

通过手动输入引脚号和占空比来设置引脚上的 PWM 信号。运行程序后请按提示输入 [引脚号]:[占空比] 以设置对应引脚上的 PWM 信号，比如 3:500 。

### ADC

#### adcRead 读取电压值

源码：[https://github.com/milkv-duo/duo-examples/tree/main/adc](https://github.com/milkv-duo/duo-examples/tree/main/adc)

读取 ADC 的测量值，分为 shell 脚本和C语言两个版本，启动后根据输出提示选择要读取的 ADC，选择后会循环打印 ADC 测量到的电压值。

### I2C

I2C 代码目录：[https://github.com/milkv-duo/duo-examples/tree/main/i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c)

#### BMP280 温度气压传感器

源码：[https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c)

通过 I2C 接口连接温度气压传感器 BMP280，读取当前温度和气压值。

#### VL53L0X ToF 测距传感器

源码：[https://github.com/milkv-duo/duo-examples/tree/main/i2c/vl53l0x_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/vl53l0x_i2c)

通过 I2C 接口使用 TOF 测距传感器 VL53L0X 模块，读取测量到的距离。

#### SSD1306 显示屏

源码：[https://github.com/milkv-duo/duo-examples/tree/main/i2c/ssd1306_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/ssd1306_i2c)

通过 I2C 接口在 SSD1306 OLED 显示屏上显示字符串。

#### ADXL345 三轴加速度传感器

源码：[https://github.com/milkv-duo/duo-examples/blob/main/i2c/adxl345_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/adxl345_i2c)

通过 I2C 接口读取 ADXL345 获得的加速度数据，每 1s 读取一次，并将结果打印在屏幕上。

#### LCM1602 显示屏

源码：[https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm1602_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm1602_i2c)

通过 I2C 接口在 1602 LCD 屏幕上显示字符串。

#### LCM2004 显示屏

源码：[https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm2004_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm2004_i2c)

通过 I2C 接口在 2004 LCD 屏幕上显示字符串。

#### TCS34725 颜色传感器

源码：[https://github.com/milkv-duo/duo-examples/blob/main/i2c/tcs34725_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/tcs34725_i2c)

通过 I2C 接口读取 TCS34725 颜色传感器，并将获得的数据输出。

### SPI

SPI 代码目录：[https://github.com/milkv-duo/duo-examples/tree/main/spi](https://github.com/milkv-duo/duo-examples/tree/main/spi)

#### MAX6675 热电偶温度传感器

源码：[https://github.com/milkv-duo/duo-examples/tree/main/spi/max6675_spi](https://github.com/milkv-duo/duo-examples/tree/main/spi/max6675_spi)

通过 SPI 接口连接 K 型热电偶测量模块 MAX6675，测量当前传感器上的温度。

#### RC522 RFID读写模块

源码：[https://github.com/milkv-duo/duo-examples/tree/main/spi/rc522_spi](https://github.com/milkv-duo/duo-examples/tree/main/spi/rc522_spi)

通过 SPI 接口连接 RC522 RFID 读写模块，读取卡片 ID 和类型并输出到屏幕。

## 编译 wiringX 库

Duo 固件中已经包含编译好的 wiringX 库（/usr/lib/libwiringx.so），可以直接使用。如果你需要通过编译 wiringX 的源码来生成该库，可以按如下方法编译。

我们这里在 Ubuntu 主机或其他 Linux 发行版上进行编译。

*注：Duo 的 wiringX 代码有部分尚未合入上游 wiringX 仓库中，在实际使用中请优先使用 Duo 固件中的 wiringX 库。*

### 下载 wiringX 源码

```
git clone https://github.com/wiringX/wiringX.git
```

### 修改 CMakeLists.txt

进入代码目录：
```
cd wiringX
```

wiringX 项目使用 cmake 方式来编译，需要通过 `vi` 或其他编辑器修改 CMakeLists.txt，来添加交叉编译工具链以及编译参数：

```diff {9-12}
diff --git a/CMakeLists.txt b/CMakeLists.txt
index 8909393..6918181 100644
--- a/CMakeLists.txt
+++ b/CMakeLists.txt
@@ -17,6 +17,11 @@ set(CMAKE_EXE_LINKER_FLAGS " -Wl,-rpath=/usr/local/lib/,-rpath=/usr/lib/,-rpath=
 set(CMAKE_SHARED_LINKER_FLAGS " -Wl,-rpath=/usr/local/lib/,-rpath=/usr/lib/,-rpath=/lib/")
 set(CMAKE_MODULE_LINKER_FLAGS " -Wl,-rpath=/usr/local/lib/,-rpath=/usr/lib/,-rpath=/lib/")

+set(CMAKE_C_COMPILER "${CMAKE_CURRENT_SOURCE_DIR}/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-gcc")
+set(CMAKE_CXX_COMPILER "${CMAKE_CURRENT_SOURCE_DIR}/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-g++")
+set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -mcpu=c906fdv -march=rv64imafdcv0p7xthead -mcmodel=medany -mabi=lp64d")
+set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -D_LARGEFILE_SOURCE -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64")
+
 # Start uninstaller generator
 function(WRITE_UNINSTALL_TARGET_SCRIPT)
     # Create uninstall target template file, if it doesn't exist...
```

其中有两个变量需要注意一下，根据自己的文件路径来配置：
- **CMAKE_C_COMPILER**：交叉编译工具链中 gcc 的路径
- **CMAKE_CXX_COMPILER**：交叉编译工具链中 g++ 的路径

交叉编译工具链的下载链接：[host-tools.tar.gz](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz)。可以通过 wget 命令下载后解压：
```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
tar -xf host-tools.tar.gz
```

如果你曾经编译过 [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)，其根目录下的 `host-tools` 目录就是交叉工具链的目录，没必要重新下载，可以直接修改 `CMAKE_CURRENT_SOURCE_DIR` 字段指定到该目录即可。或者创建个软链接指向该目录。

### 修改代码

由于交叉工具链中的 time 相关定义与 wiringX 中的定义稍有不同，添加如下两行修改：

```diff {9,10}
diff --git a/src/wiringx.c b/src/wiringx.c
index 034674a..4171a75 100644
--- a/src/wiringx.c
+++ b/src/wiringx.c
@@ -113,6 +113,9 @@ static struct spi_t spi[2] = {
        } while(0)
 #endif

+typedef time_t __time_t;
+typedef suseconds_t __suseconds_t;
+
 /* Both the delayMicroseconds and the delayMicrosecondsHard
    are taken from wiringPi */
 static void delayMicrosecondsHard(unsigned int howLong) {
```

### 编译

cmake 方式编译会创建一些中间目录和文件，所以我们新建一个 build 目录并进入该目录来完成编译：

```bash
mkdir build
cd build
cmake ..
make
```

编译完成后，当前 `build` 目录下生成的 `libwiringx.so` 就是我们所需要的 wiringX 库。

### 注意事项

如果遇到编译报错，可以尝试更换 `cmake` 的版本，比如可以手动安装目前最新的 `3.27.6` 版本：

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.27.6/cmake-3.27.6-linux-x86_64.sh
chmod +x cmake-3.27.6-linux-x86_64.sh
sudo sh cmake-3.27.6-linux-x86_64.sh --skip-license --prefix=/usr/local/
```
手动安装的 `cmake` 在 `/usr/local/bin` 中，此时用 `cmake --version` 命令查看其版本号, 应为：

```
cmake version 3.27.6
```

## wiringX APIs

### General

<details>

<summary>int wiringXSetup(char *name, ...)</summary>

  初始化 WiringX 库，用于初始化 GPIO 引脚的配置和资源：
  - Duo
    ```
    wiringXSetup("milkv_duo", NULL)
    ```
  - Duo256M
    ```
    wiringXSetup("milkv_duo256m", NULL)
    ```
  - DuoS
    ```
    wiringXSetup("milkv_duos", NULL)
    ```

</details>


<details>

<summary>int wiringXValidGPIO(int pin)</summary>

  判断 GPIO pin 是否可用。

</details>


<details>

<summary>void delayMicroseconds(unsigned int ms)</summary>

  延时毫秒。

</details>


<details>

<summary>int wiringXGC(void)</summary>

  释放资源。

</details>


<details>

<summary>char *wiringXPlatform(void)</summary>

  返回平台信息。

</details>


### GPIO

<details>

<summary>int pinMode(int pin, pinmode_t mode)</summary>

  设置指定引脚的工作模式, pin 是引脚编号, mode 可以是：
  - PINMODE_INPUT 输入模式
  - PINMODE_OUTPUT 输出模式
  - PINMODE_INTERRUPT 中断模式

</details>


<details>

<summary>int digitalRead(int pin)</summary>

  读取指定引脚pin的输入值, 返回值为 HIGH 或 LOW。

</details>


<details>

<summary>int digitalWrite(int pin, enum digital_value_t value)</summary>

  设置指定引脚pin的输出值, value 可以是：
  - HIGH 高电平
  - LOW 低电平

</details>


<details>

<summary>int waitForInterrupt(int pin, int ms)</summary>

  等待引脚pin上的中断发生, 参数ms为超时时间, 单位毫秒。
  *该函数已弃用, 建议使用 wiringXISR*

</details>


<details>

<summary>int wiringXISR(int pin, enum isr_mode_t mode)</summary>

将引脚pin配置为中断方式, 其中`mode`的几种模式：
- ISR_MODE_RISING
- ISR_MODE_FALLING
- ISR_MODE_BOTH

</details>


### I2C

<details>

<summary>int wiringXI2CSetup(const char *dev, int addr)</summary>

  配置i2c节点和i2c地址。

</details>


<details>

<summary>int wiringXI2CRead(int fd)</summary>

  读取1个字节的数据。

</details>


<details>

<summary>int wiringXI2CReadReg8(int fd, int reg)</summary>

  从reg寄存器读取1个字节的数据。

</details>


<details>

<summary>int wiringXI2CReadReg16(int fd, int reg)</summary>

  从reg寄存器读取2个字节的数据。

</details>


<details>

<summary>int wiringXI2CWrite(int fd, int reg)</summary>

  写寄存器的地址reg。

</details>


<details>

<summary>int wiringXI2CWriteReg8(int fd, int reg, int value8)</summary>

  将8位数据value8写入寄存器reg。

</details>


<details>

<summary>int wiringXI2CWriteReg16(int fd, int reg, int value16)</summary>

  将16位数据value16写入寄存器reg。

</details>

### SPI

<details>

<summary>int wiringXSPISetup(int channel, int speed)</summary>

  配置SPI设备的channel(Duo上为0)和speed(Duo中默认为500000)。

</details>

<details>

<summary>int wiringXSPIDataRW(int channel, unsigned char *data, int len)</summary>

  SPI总线是上升沿写数据，下降沿读数据，所以该函数同时执行读写操作，因此读取的数据会覆盖写入的数据，使用时需注意。

</details>

<details>

<summary>int wiringXSPIGetFd(int channel)</summary>

  获取SPI设备的文件描述符，channel在Duo中默认为0。

</details>

### UART

<details>

<summary>int wiringXSerialOpen(const char *dev, struct wiringXSerial_t serial)</summary>

  打开串口设备，dev是设备描述符，serial是个结构体，需要填充串口相关参数  
  具体可参考下面的[UART使用示例](#UART-使用示例)。

  ```c
  typedef struct wiringXSerial_t {
      unsigned int baud;           // 波特率
      unsigned int databits;       // 数据位:   7/8
      unsigned int parity;         // 奇偶校验: o/e/n
      unsigned int stopbits;       // 停止位:   1/2
      unsigned int flowcontrol;    // 硬件流控: x/n
  } wiringXSerial_t;
  ```

</details>

<details>

<summary>void wiringXSerialClose(int fd)</summary>

  关闭串口。

</details>

<details>

<summary>void wiringXSerialFlush(int fd)</summary>

  清空缓存区。

</details>

<details>

<summary>void wiringXSerialPutChar(int fd, unsigned char c)</summary>

  输出一个字符。

</details>

<details>

<summary>void wiringXSerialPuts(int fd, const char *s)</summary>

  输出字符串。

</details>

<details>

<summary>void wiringXSerialPrintf(int fd, const char *message, ...)</summary>

  格式化输出。

</details>

<details>

<summary>int wiringXSerialDataAvail(int fd)</summary>

  返回缓存区接收到的数据个数。

</details>

<details>

<summary>int wiringXSerialGetChar(int fd)</summary>

  从串口设备读取一个字符。

</details>

### PWM

<details>

<summary>wiringXPWMSetPeriod(int pin, long period)</summary>

  设置 PWM 引脚的周期, pin 是引脚编号, period 单位为纳秒。

</details>


<details>

<summary>int wiringXPWMSetDuty(int pin, long duty_cycle)</summary>

  设置 PWM 引脚一个周期内高电平所占时间, duty_cycle 单位为纳秒。

</details>


<details>

<summary>int wiringXPWMSetPolarity(int pin, int polarity)</summary>

  设置 PWM 引脚极性，polarity 位为 0 或者 1：
  - 0 正常
  - 1 反转

</details>


<details>

<summary>int wiringXPWMEnable(int pin, int enable)</summary>

  使能或禁用 PWM 引脚输出，enable 输出为 0 或者 1：
  - 0: 禁用
  - 1: 使能

</details>
