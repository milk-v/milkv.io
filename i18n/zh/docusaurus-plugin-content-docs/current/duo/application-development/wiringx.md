---
sidebar_label: 'WiringX'
sidebar_position: 10
---

## 简介
`wiringX`是一个开源的GPIO控制库，旨在为不同的嵌入式平台提供通用且统一的GPIO控制接口。它基于WiringPi库进行了改进和扩展，并支持多种嵌入式平台，对`Milk-V Duo`也进行了适配。使用`wiringX`，开发者可以使用相同的代码来控制不同平台上的GPIO引脚，简化了跨平台开发的工作，使得开发嵌入式应用程序更加方便和灵活。

本文将分为如下4个部分介绍如何使用wiringX在Duo上开发应用
1. wiringX 的 APIs
2. 基本使用方法代码示范, 以及如何配置Duo的引脚复用
3. 基于wiringX的应用程序编译环境配置
4. 一些使用wiringX实现的Demo和项目介绍

如果您对wiringX的使用方法已经非常熟悉,可以直接参考我们的样例代码: [duo-examples](https://github.com/milkv-duo/duo-examples)

Milk-V Duo 的 wiringX 引脚序号, 与Duo的物理引脚标号是一致的，LED控制引脚不在引出的40PIN物理引脚上，其wiringX的序号是0

![duo|1024x1169](/docs/duo/duo-wiringx-pinout.png)

## 一、wiringX APIs

### 通用

#### int wiringXSetup(char *name, ...)
初始化 WiringX 库，用于初始化 GPIO 引脚的配置和资源，对于Duo，固定写法为  
```
wiringXSetup("duo", NULL)
```

#### int wiringXValidGPIO(int pin)
判断GPIO pin是否可用

#### void delayMicroseconds(unsigned int ms)
延时毫秒

#### int wiringXGC(void)

#### char *wiringXPlatform(void)


### GPIO

#### pinMode(pin, mode)
设置指定引脚的工作模式, pin 是引脚编号, mode 可以是
- PINMODE_INPUT 输入模式
- PINMODE_OUTPUT 输出模式
- PINMODE_INTERRUPT 中断模式

#### int digitalRead(int pin)
读取指定引脚pin的输入值, 返回值为 HIGH 或 LOW

#### int digitalWrite(int pin, enum digital_value_t value)
设置指定引脚pin的输出值, value 可以是
- HIGH 高电平
- LOW 低电平

#### int waitForInterrupt(int pin, int ms)
等待引脚pin上的中断发生, 参数ms为超时时间, 单位毫秒  
*该函数已弃用, 建议使用 wiringXISR*

#### int wiringXISR(int pin, enum isr_mode_t mode)
将引脚pin配置为中断方式

其中`mode`的几种模式
- ISR_MODE_RISING
- ISR_MODE_FALLING
- ISR_MODE_BOTH

### I2C

- **wiringXI2CSetup(dev, addr)**: 配置i2c节点和i2c地址
- **wiringXI2CRead(fd)**: 读取1个字节的数据
- **wiringXI2CReadReg8(fd, reg)**: 从reg寄存器读取1个字节的数据
- **wiringXI2CReadReg16(fd, reg)**: 从reg寄存器读取2个字节的数据
- **wiringXI2CWrite(fd, reg)**: 写寄存器的地址reg
- <details><summary>wiringXI2CWriteReg8(fd, reg, value8)</summary>
  <p>
  将8位数据value8写入寄存器reg
  </p>
  </details>

- <details><summary>wiringXI2CWriteReg16(fd, reg, value16)</summary>
  <p>
  将16位数据value16写入寄存器reg
  </p>
  </details>


## 二、代码示范

### GPIO

下面是一个操作GPIO的例子，将序号为0的LED控制脚间隔1秒循环拉高再拉低，看到的现象就是Duo上的LED间隔1秒不断闪烁
```
#include <stdio.h>
#include <unistd.h>

#include <wiringx.h>

int main() {
    int DUO_LED = 0;

    if(wiringXSetup("duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    if(wiringXValidGPIO(DUO_LED) != 0) {
        printf("Invalid GPIO %d\n", DUO_LED);
    }

    pinMode(DUO_LED, PINMODE_OUTPUT);

    while(1) {
        printf("Duo LED GPIO (wiringX) %d: High\n", DUO_LED);
        digitalWrite(DUO_LED, HIGH);
        sleep(1);
        printf("Duo LED GPIO (wiringX) %d: Low\n", DUO_LED);
        digitalWrite(DUO_LED, LOW);
        sleep(1);
    }

    return 0;
}
```

### I2C

以下是一个I2C的示例

```
wiringXI2CSetup
```

## 三、开发环境配置

### 准备开发环境

使用本地的Ubuntu系统，推荐 Ubuntu 20.04 LTS  
(也可以使用虚拟机中的Ubuntu系统、Windows中WSL安装的Ubuntu、基于Docker的Ubuntu系统)

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
  第一次加载会自动下载所需的SDK包，大小为180M左右，下载完会自动解压到`duo-examples`下，解压后的目录名为`duo-sdk`，下次加载时检测到已存在该目录，就不会再次下载了

  注: 如果因为网络原因无法完成SDK包的下载，请通过其他途径获取到`duo-sdk.tar.gz`包，手动解压到`duo-examples`目录下，重新`source envsetup.sh`

- 编译测试

  以`hello-world`为例，进入该例子目录直接执行`make`即可
  ```
  cd hello-world
  make
  ```
  编译成功后将生成的`helloworld`可执行程序通过网口或者RNDIS网络等方式传送到Duo设备中，比如[默认固件](https://github.com/milkv-duo/duo-buildroot-sdk/releases)支持的RNDIS方式，Duo的IP为`192.168.42.1`，用户名是`root`，密码是`milkv`
  ```
  scp helloworld root@192.168.42.1:/root/
  ```
  发送成功后，在ssh或者串口登陆的终端中运行`./helloworld`，会打印`Hello, World!`
  ```
  [root@milkv]~# ./helloworld
  Hello, World!
  ```
  **至此，我们的编译开发环境就可以正常使用了**

### 如何创建自己的工程

根据需要，拷贝现有的例子，稍加修改即可。比如需要操作某个GPIO，可以参考`blink`例子，LED闪烁就是通过控制GPIO电平高低实现的，平台初始化和控制GPIO的方法，可参考`blink.c`中的代码

- 新建自己的工程目录`my-project`
- 复制`blink`例子中的`blink.c`和`Makefile`文件到`my-project`目录
- 将`blink.c`重命名为自己所需名字如`gpio_test.c`
- 修改`Makefile`中的`TARGET=blink`为`TARGET=gpio_test`
- 修改`gpio_test.c`，实现自己的代码逻辑
- 执行`make`命令编译
- 将生成的`gpio_test`可执行程序发送到Duo中运行

注意:

- 新建工程目录不是必须要放到duo-examples目录下的，可以根据自己的习惯放到其他位置，执行make编译命令之前，加载过duo-examples目录下的编译环境就可以了(`source /PATH/TO/duo-examples/envsetup.sh`)
- 在加载过编译环境(`envsetup.sh`)的终端里，不要编译其他平台如ARM或X86的Makefile工程，如需编译其他平台项目，需要新开终端

## 四、Demo和项目说明

### [hello-world](https://github.com/milkv-duo/duo-examples/tree/main/hello-world)

一个简单的例子，不操作Duo外设，仅打印输出"Hello, World!"，用来验证开发环境

### [blink](https://github.com/milkv-duo/duo-examples/tree/main/blink)

一个让Duo板载LED闪烁的例子，操作GPIO使用的是`wiringX`的库，`blink.c`代码中包含了`wiringX`中的平台初始化以及操作GPIO的方法

注意:
当前Duo的默认固件上电后LED会自动闪烁，这个是通过开机脚本实现的，在测试该blink例子的时候，需要将LED闪烁的脚本禁用，在Duo的终端中执行:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
也就是将LED闪烁脚本改名，重启Duo后，LED就不闪了  
测试完我们C语言实现的blink程序后，如果需要恢复LED闪烁脚本，再将其名字改回来，重启即可
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

### [I2C](https://github.com/milkv-duo/duo-examples/tree/main/i2c)

#### [bmp280_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c)

通过I2C接口连接温度气压传感器BMP280，读取当前温度和气压值
