---
sidebar_label: 'wiringX'
sidebar_position: 10
---

## 简介
`wiringX` 是一个开源的 GPIO 控制库，旨在为不同的嵌入式平台提供通用且统一的 GPIO 控制接口。它基于 WiringPi 库进行了改进和扩展，并支持多种嵌入式平台，对`Milk-V Duo`也进行了适配。使用`wiringX`，开发者可以使用相同的代码来控制不同平台上的 GPIO 引脚，简化了跨平台开发的工作，使得开发嵌入式应用程序更加方便和灵活。

本文将分为如下4个部分介绍如何使用 wiringX 在 Duo 上开发应用
1. wiringX 的 APIs
2. 基本使用方法代码示范
3. 基于 wiringX 的应用程序编译环境配置
4. 一些使用 wiringX 实现的 Demo 和项目介绍

如果您对 wiringX 的使用方法已经非常熟悉,可以直接参考我们的样例代码: [duo-examples](https://github.com/milkv-duo/duo-examples)

Milk-V Duo 的 wiringX 引脚序号, 与 Duo 的引脚名序号是一致的，LED 控制引脚不在引出的 40PIN 物理引脚上，其 wiringX 的序号是`25`

<div className='gpio_style'>

| wiringX | PIN NAME |              Pin#               |               Pin#               | PIN NAME | wiringX |
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
| 8       | GP8      | <div className='green'>21</div> | <div className='orange'>30</div> | RUN      |         |
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

注意，Duo 的很多引脚功能是复用的，在使用`wiringX`来控制 Duo 各引脚的功能时，要先确认一下引脚当前的状态是不是自己需要的功能, 如果不是，可以用`duo-pinmux`命令来切换为所需功能

具体方法请参考: [引脚复用](https://milkv.io/zh/docs/duo/application-development/pinmux)

## 一、wiringX APIs

### General

<details>

<summary>int wiringXSetup(char *name, ...)</summary>

  初始化 WiringX 库，用于初始化 GPIO 引脚的配置和资源，对于Duo，固定写法为
  ```
  wiringXSetup("duo", NULL)
  ```

</details>


<details>

<summary>int wiringXValidGPIO(int pin)</summary>

  判断GPIO pin是否可用

</details>


<details>

<summary>void delayMicroseconds(unsigned int ms)</summary>

  延时毫秒

</details>


<details>

<summary>int wiringXGC(void)</summary>

  释放资源

</details>


<details>

<summary>char *wiringXPlatform(void)</summary>

  返回平台信息

</details>


### GPIO

<details>

<summary>int pinMode(int pin, pinmode_t mode)</summary>

  设置指定引脚的工作模式, pin 是引脚编号, mode 可以是
  - PINMODE_INPUT 输入模式
  - PINMODE_OUTPUT 输出模式
  - PINMODE_INTERRUPT 中断模式

</details>


<details>

<summary>int digitalRead(int pin)</summary>

  读取指定引脚pin的输入值, 返回值为 HIGH 或 LOW

</details>


<details>

<summary>int digitalWrite(int pin, enum digital_value_t value)</summary>

  设置指定引脚pin的输出值, value 可以是
  - HIGH 高电平
  - LOW 低电平

</details>


<details>

<summary>int waitForInterrupt(int pin, int ms)</summary>

  等待引脚pin上的中断发生, 参数ms为超时时间, 单位毫秒  
  *该函数已弃用, 建议使用 wiringXISR*

</details>


<details>

<summary>int wiringXISR(int pin, enum isr_mode_t mode)</summary>

将引脚pin配置为中断方式,   其中`mode`的几种模式
- ISR_MODE_RISING
- ISR_MODE_FALLING
- ISR_MODE_BOTH

</details>


### I2C

<details>

<summary>int wiringXI2CSetup(const char *dev, int addr)</summary>

  配置i2c节点和i2c地址

</details>


<details>

<summary>int wiringXI2CRead(int fd)</summary>

  读取1个字节的数据

</details>


<details>

<summary>int wiringXI2CReadReg8(int fd, int reg)</summary>

  从reg寄存器读取1个字节的数据

</details>


<details>

<summary>int wiringXI2CReadReg16(int fd, int reg)</summary>

  从reg寄存器读取2个字节的数据

</details>


<details>

<summary>int wiringXI2CWrite(int fd, int reg)</summary>

  写寄存器的地址reg

</details>


<details>

<summary>int wiringXI2CWriteReg8(int fd, int reg, int value8)</summary>

  将8位数据value8写入寄存器reg

</details>


<details>

<summary>int wiringXI2CWriteReg16(int fd, int reg, int value16)</summary>

  将16位数据value16写入寄存器reg

</details>

### SPI

<details>

<summary>int wiringXSPISetup(int channel, int speed)</summary>

  配置SPI设备的channel(Duo上为0)和speed(Duo中默认为500000)

</details>

<details>

<summary>int wiringXSPIDataRW(int channel, unsigned char *data, int len)</summary>

  SPI总线是上升沿写数据，下降沿读数据，所以该函数同时执行读写操作，因此读取的数据会覆盖写入的数据，使用时需注意

</details>

<details>

<summary>int wiringXSPIGetFd(int channel)</summary>

  获取SPI设备的文件描述符，channel在Duo中默认为0

</details>

### UART

<details>

<summary>int wiringXSerialOpen(const char *dev, struct wiringXSerial_t serial)</summary>

  打开串口设备，dev是设备描述符，serial是个结构体，需要填充串口相关参数  
  具体可参考下面的[UART使用示例](#UART-使用示例)

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

  关闭串口

</details>

<details>

<summary>void wiringXSerialFlush(int fd)</summary>

  清空缓存区

</details>

<details>

<summary>void wiringXSerialPutChar(int fd, unsigned char c)</summary>

  输出一个字符

</details>

<details>

<summary>void wiringXSerialPuts(int fd, const char *s)</summary>

  输出字符串

</details>

<details>

<summary>void wiringXSerialPrintf(int fd, const char *message, ...)</summary>

  格式化输出

</details>

<details>

<summary>int wiringXSerialDataAvail(int fd)</summary>

  返回缓存区接收到的数据个数

</details>

<details>

<summary>int wiringXSerialGetChar(int fd)</summary>

  从串口设备读取一个字符

</details>

## 二、代码示范

### GPIO 使用示例

下面是一个操作 GPIO 的例子，将 Duo 的`20`引脚间隔1秒循环拉高再拉低，物理`20`引脚的 wiringX 序号是`15`

```c
#include <stdio.h>
#include <unistd.h>

#include <wiringx.h>

int main() {
    int DUO_GPIO = 15;

    if(wiringXSetup("duo", NULL) == -1) {
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
编译后放到 Duo 中运行，可以用万用表或者示波器测量`20`引脚的状态是否符合预期

也可以使用板上的 LED 引脚来验证，通过观察 LED 亮灭来直观地判断程序是否正确执行，LED 引脚的 wiringX 序号为`25`，把上面代码中的`15`引脚改为`25`即可，需要注意的是默认固件开机后通过脚本控制 LED 闪烁了，要将其禁用，方法请参考下面的 [blink](#blink) 例子说明

### I2C 使用示例

以下是一个 I2C 的示例

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

    if(wiringXSetup("duo", NULL) == -1) {
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

以下是一个SPI的示例

```c
#include <stdio.h>
#include <unistd.h>
#include <stdint.h>

#include <wiringx.h>

int main(void)
{
    int fd_spi;

    if(wiringXSetup("duo", NULL) == -1) {
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

以下是一个 UART 的示例，使用引脚 4/5 上的 UART4

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

    if(wiringXSetup("duo", NULL) == -1) {
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

电脑上的 USB 转串口线的 RX 接 Duo 的4脚(UART4_TX)，串口线的 TX 接 Duo 的5脚(UART4_RX)，串口线的 GND 接 Duo 的 GND，电脑中使用串口调试助手配置好相应的 COM 口和参数

上述程序编译后生成的可执行程序命名为`uart_test`，通过ssh上传到 Duo 中运行，可以看到电脑上的串口工具中收到了`Duo Serial Test`字符串，串口工具中发送一个字符串`Hello World`，Duo 的终端上也会收到对应的字符串，说明串口收发都正常

![duo](/docs/duo/duo-wiringx-uart-test-zh.png)

## 三、开发环境配置

### 准备开发环境

使用本地的 Ubuntu 系统，推荐 Ubuntu 20.04 LTS  
(也可以使用虚拟机中的Ubuntu系统、Windows 中 WSL 安装的 Ubuntu、基于 Docker 的 Ubuntu 系统)

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
  第一次加载会自动下载所需的 SDK 包，大小为180M左右，下载完会自动解压到`duo-examples`下，解压后的目录名为`duo-sdk`，下次加载时检测到已存在该目录，就不会再次下载了

  注: 如果因为网络原因无法完成SDK包的下载，请通过其他途径获取到`duo-sdk.tar.gz`包，手动解压到`duo-examples`目录下，重新`source envsetup.sh`

- 编译测试

  以`hello-world`为例，进入该例子目录直接执行`make`即可
  ```
  cd hello-world
  make
  ```
  编译成功后将生成的`helloworld`可执行程序通过网口或者RNDIS网络等方式传送到 Duo 设备中，比如[默认固件](https://github.com/milkv-duo/duo-buildroot-sdk/releases)支持的 RNDIS 方式，Duo 的 IP 为`192.168.42.1`，用户名是`root`，密码是`milkv`
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

根据需要，拷贝现有的例子，稍加修改即可。比如需要操作某个 GPIO，可以参考`blink`例子，LED闪烁就是通过控制 GPIO 电平高低实现的，平台初始化和控制 GPIO 的方法，可参考`blink.c`中的代码

- 新建自己的工程目录`my-project`
- 复制`blink`例子中的`blink.c`和`Makefile`文件到`my-project`目录
- 将`blink.c`重命名为自己所需名字如`gpio_test.c`
- 修改`Makefile`中的`TARGET=blink`为`TARGET=gpio_test`
- 修改`gpio_test.c`，实现自己的代码逻辑
- 执行`make`命令编译
- 将生成的`gpio_test`可执行程序发送到Duo中运行

注意:

- 新建工程目录不是必须要放到 duo-examples 目录下的，可以根据自己的习惯放到其他位置，执行 make 编译命令之前，加载过 duo-examples 目录下的编译环境就可以了(`source /PATH/TO/duo-examples/envsetup.sh`)
- 在加载过编译环境(`envsetup.sh`)的终端里，不要编译其他平台如 ARM 或 X86 的 Makefile 工程，如需编译其他平台项目，需要新开终端

## 四、Demo和项目说明

### [hello-world](https://github.com/milkv-duo/duo-examples/tree/main/hello-world)

一个简单的例子，不操作 Duo 外设，仅打印输出"Hello, World!"，用来验证开发环境

### [blink](https://github.com/milkv-duo/duo-examples/tree/main/blink)

一个让 Duo 板载 LED 闪烁的例子，操作 GPIO 使用的是`wiringX`的库，`blink.c`代码中包含了`wiringX`中的平台初始化以及操作 GPIO 的方法

注意:
当前Duo的默认固件上电后 LED 会自动闪烁，这个是通过开机脚本实现的，在测试该 blink 例子的时候，需要将 LED 闪烁的脚本禁用，在 Duo 的终端中执行:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不闪了  
测试完我们C语言实现的 blink 程序后，如果需要恢复 LED 闪烁脚本，再将其名字改回来，重启即可
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

### [I2C](https://github.com/milkv-duo/duo-examples/tree/main/i2c)

#### [bmp280_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c)

通过 I2C 接口连接温度气压传感器 BMP280，读取当前温度和气压值
