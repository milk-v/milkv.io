---
sidebar_label: 'Arduino'
sidebar_position: 51
---

# 简介

Arduino 是一个很流行的开源硬件平台，具有简洁性、易用性和开放性等优点。它提供了丰富的库函数和示例代码，使得即使对于没有编程经验的人来说，也能够快速上手。同时，Arduino 社区非常活跃，您可以轻松地获取到各种项目教程、文档和支持。

Milk-V Duo 系列已经支持 Arduino 开发，您可以直接使用 Arduino IDE，进行简单的配置后即可使用。

Duo 系列 CPU 采用大小核设计，Arduino 固件运行在小核中，大核负责与 Arduino IDE 通讯，接收 Arduino 固件并将其加载到小核中运行。同时，大核中的 Linux 系统也是正常运行的。

## 一、环境配置

### 安装 Arduino IDE

Arduino IDE 支持 Windows、Linux、macOS 三种操作系统，根据您使用的系统到 [Arduino官方网站](https://www.arduino.cc/en/software) 下载对应安装包进行安装，当前最新的版本为 2.3.2，建议使用1.8.X以上版本。
   
### Arduino IDE 中添加 Duo 开发板

打开 Arduino IDE，在 ``文件`` 菜单中选择 ``首选项``，在 ``设置`` 标签中的 ``其他开发板管理器地址`` 内添加 Duo 的配置文件地址：

```
https://github.com/milkv-duo/duo-arduino/releases/download/V1.0.0/package_cv180x_index.json
```

<Image src='/docs/duo/arduino/duo-arduino-01_zh.jpg' minWidth='40%' maxWidth='100%' align='left' />

最新的 json 文件地址请到 [Releases](https://github.com/milkv-duo/duo-arduino/releases) 中下载。

如果之前有配置其他开发板地址，用逗号隔开，或者点地址栏右侧的图标调出窗口，按提示添加。

配置好之后在 ``工具`` 菜单中选择 ``开发板``，打开 ``开发板管理器``，搜索 *CV180*，点击 ``安装``。

<Image src='/docs/duo/arduino/duo-arduino-02_zh.jpg' minWidth='40%' maxWidth='100%' align='left' />

到此 Arduino IDE 中 Duo 的开发环境已安装完成，下面就可以进行代码编写测试了。

### 在 Duo 中测试点亮板载 LED

目前，Duo 的 SD 卡系统需要烧录支持 Arduino 的固件，请在 [最新 Release](https://github.com/milkv-duo/duo-buildroot-sdk/releases) 的固件中下载前缀为 `arduino` 的固件。

参考前面章节中的 [启动 Duo](https://milkv.io/zh/docs/duo/getting-started/boot) 安装好SD卡系统。

使用 USB 线将 Duo 连接到电脑，Duo 会自动上电开机。

Duo 的默认固件大核 Linux 系统会控制板载 LED 闪烁，这个是通过开机脚本实现的，我们现在要用小核 Arduino 来点亮 LED，需要将大核 Linux 中 LED 闪烁的脚本禁用，在 Duo 的终端中执行:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不会闪烁了：
```
reboot
```

此时查看电脑的 ``设备管理器`` 的 ``端口`` 中会多出一个串口设备：

<Image src='/docs/duo/arduino/duo-arduino-03_zh.jpg' minWidth='40%' maxWidth='60%' align='left' />

在 Arduino IDE 主界面点击 ``选择开发板``，再点击 ``选择其他开发板和接口......``

<Image src='/docs/duo/arduino/duo-arduino-04_zh.jpg' minWidth='40%' maxWidth='100%' align='left' />

搜索 "duo"，Duo 选择 ``Duo Dev Module``，Duo256M 选择 ``Duo256 Dev Module``，端口中选择对应的串口后点确定。

<Image src='/docs/duo/arduino/duo-arduino-05_zh.jpg' minWidth='40%' maxWidth='100%' align='left' />

在 Arduino IDE 的 ``文件`` 菜单中依次打开 ``示例`` > ``01.Basics`` > ``Blink`` 测试程序，该程序功能实现的是 Arduino 设备板载 LED 闪烁，Duo 中也是支持的，我们直接点 ``上传`` 按钮进行测试：

<Image src='/docs/duo/arduino/duo-arduino-06_zh.jpg' minWidth='40%' maxWidth='100%' align='left' />

此时，可以看到 Duo 板载的 LED 间隔1秒闪烁。

## 二、Duo Arduino 引脚资源分配

### Duo

<div className='gpio_style'>

| SPI       | PWM   | I2C      | UART     | GPIO | NAME | PIN                             | PIN                              | NAME     | GPIO | ADC  |
|-----------|-------|----------|----------|:----:|-----:|:-------------------------------:|:--------------------------------:|----------|:----:|------|
|           |       | I2C0_SCL |          | 1    | GP0  | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS     |      |      |
|           |       | I2C0_SDA |          | 2    | GP1  | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS     |      |      |
|           |       |          |          |      | GND  | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |      |      |
|           | PWM10 |          |          |      | GP2  | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |      |      |
|           | PWM11 |          |          |      | GP3  | <div className='green'>5</div>  | <div className='red'>36</div>    | 3V3(OUT) |      |      |
|           |       |          | UART3_TX |      | GP4  | <div className='green'>6</div>  | <div className='gray'>35</div>   |          |      |      |
|           |       |          | UART3_RX |      | GP5  | <div className='green'>7</div>  | <div className='gray'>34</div>   |          |      |      |
|           |       |          |          |      | GND  | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |      |      |
| SPI2_SCK  |       |          |          |      | GP6  | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     |      |      |
| SPI2_MOSI |       |          |          |      | GP7  | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     |      | ADC1 |
| SPI2_MISO |       | I2C1_SDA |          |      | GP8  | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |      |      |
| SPI2_CSn  |       | I2C1_SCL |          |      | GP9  | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     |      |      |
|           |       |          |          |      | GND  | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |      |      |
|           |       |          |          | 14   | GP10 | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     | 27   |      |
|           |       |          |          | 15   | GP11 | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     | 26   |      |
|           |       |          |          |      | GP12 | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     | 25   |      |
|           |       |          |          |      | GP13 | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     | 24   |      |
|           |       |          |          |      | GND  | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |      |      |
|           |       |          |          | 19   | GP14 | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     | 22   |      |
|           |       |          |          | 20   | GP15 | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     | 21   |      |
|           |       |          |          |      |      | &nbsp;                          |                                  |          |      |      |
|           |       |          |          | 0    |      | <div className='blue'>LED</div> |                                  |          |      |      |

</div>

### Duo256M

## 三、代码示例

### GPIO 使用示例

该程序实现将 Duo 物理引脚 20 间隔1秒循环输出高低电平，通过外接 LED 来观察现象。

连接方法如下，LED 负极接 Duo 的地(比如引脚18)，正极串接一个 1K 电阻后，连接到引脚20：

<Image src='/docs/duo/arduino/duo-arduino-07.png' minWidth='40%' maxWidth='60%' align='left' />

测试程序：
```C
#define TEST_PIN 20  //0,1,2,14,15,19,20,21,22,24,25,26,27

// the setup function runs once when you press reset or power the board
void setup() {
  pinMode(TEST_PIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(TEST_PIN, HIGH); // turn the TEST_PIN on (HIGH is the voltage level)
  delay(1000);                  // wait for a second
  digitalWrite(TEST_PIN, LOW);  // turn the TEST_PIN off by making the voltage LOW
  delay(1000);                  // wait for a second
}
```

:::tip
- 如果不接 LED，可以通过万用表或示波器观察引脚的状态变化。
- TEST_PIN 配置为 0 可以测试 Duo 板载 LED。
:::

### UART 使用示例

#### 串口输出

UART 串口默认使用的是物理引脚 `6/7` 上的 `UART3`，在调试 Arduino 程序时，可以通过该串口打印调试信息。

连接方法如下，电脑端可使用 USB 转 TTL 串口线，逻辑电平为 3.3V，波特率为 115200，串口线的 RX 连接 Duo 的 6 脚 UART3_TX，串口线的 TX 连接 Duo 的 7 脚 UART3_RX，串口线的 GND 连接 Duo 的任意 GND 比如引脚 3：

<Image src='/docs/duo/arduino/duo-arduino-08.jpg' minWidth='40%' maxWidth='90%' align='left' />

测试程序：
```C
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.printf("hello world\r\n");
  delay(1000);
}
```

运行后可以在电脑串口工具看到间隔1秒打印"hello world"字符串：
```
hello world
hello world
```

另外，该默认串口使用的是 Duo 的 UART3 接口，所以程序中也可以使用 Serial3：
```C
void setup() {
  Serial3.begin(115200);
}

void loop() {
  Serial3.printf("hello world\r\n");
  delay(1000);
}
```

### I2C 使用示例

#### I2C0 向 I2C1 发送数据

硬件连接如下，将 I2C0 和 I2C1 的 SDA 和 SCL 引脚对应连接，再按上述 UART 示例中的方法连接串口到电脑上查看打印信息。

<Image src='/docs/duo/arduino/duo-arduino-09.jpg' minWidth='40%' maxWidth='60%' align='left' />

测试代码：
```C
#include <Wire.h>

void receive(int a) {
  Serial.printf("receive %d bytes\n\r", a);
  while(a--) {
    Serial.printf("%d \n\r", Wire1.read());
  }
}

void setup() {
  Serial.begin(115200);

  Wire1.begin(0x50);
  Wire1.onReceive(receive);

  Wire.begin();
  Serial.printf("test slave\n\r");
  Wire1.print();
}

byte val = 0;

void loop() {
  Wire.beginTransmission(0x50);         // Transmit to device number 0x50
  Serial.printf("send %d \n\r", ++val);
  Wire.write(val);                      // Sends value byte
  Wire.endTransmission();               // Stop transmitting
  Wire1.onService();
  delay(1000);
}
```

测试结果：
```
test slave
Wire1: 1
[iic_dump_register]: ===dump start
IC_CON = 0x22
IC_TAR = 0x55
IC_SAR = 0x50
IC_SS_SCL_HCNT = 0x1ab
IC_SS_SCL_LCNT = 0x1f3
IC_ENABLE = 0x1
IC_STATUS = 0x6
IC_INTR_MASK = 0x224
IC_INTR_STAT = 0
IC_RAW_INTR_STAT = 0x10
[iic_dump_register]: ===dump end
send 1
receive 1 bytes
1
send 2
receive 1 bytes
2
send 3
receive 1 bytes
3
send 4
receive 1 bytes
4
```

### SPI 使用示例

#### SPI 回环测试

硬件连接如下，将 SPI 的 MOSI 和 MISO 短接，也就是引脚 10 和引脚 11，再按上述 UART 示例中的方法连接串口到电脑上查看打印信息。

<Image src='/docs/duo/arduino/duo-arduino-10.jpg' minWidth='40%' maxWidth='60%' align='left' />

测试代码：
```C
#include <SPI.h>

char str[]="hello world\n";
void setup() {
  // put your setup code here, to run once:
  Serial2.begin(115200);
  SPI.begin();
}

byte i = 0;

void loop() {
  // put your main code here, to run repeatedly:
  // digitalWrite(12, 1);
  SPI.beginTransaction(SPISettings());
  Serial2.printf("transfer %c\n\r", str[i]);
  char out = SPI.transfer(str[i++]);        // spi loop back
  SPI.endTransaction();
  Serial2.printf("receive %x \n\r", out);
  i %= 12;
}
```

运行结果：
```
receive a 
transfer h
receive 68 
transfer e
receive 65 
transfer l
receive 6c 
transfer l
receive 6c 
transfer o
receive 6f 
transfer  
receive 20 
transfer w
receive 77 
transfer o
receive 6f 
transfer r
receive 72 
transfer l
receive 6c 
transfer d
receive 64 
transfer
```

### PWM 使用示例

### ADC 使用示例

## 四、Demo和项目说明

Coming Soon ...

## 五、Arduino APIs

### Digital I/O

<details>

<summary>digitalWrite()</summary>

```
void digitalWrite(uint8_t pinNumber, uint8_t status)
```
指定引脚输出高或者低。

</details>

<details>

<summary>digitalRead()</summary>

```
int digitalRead(uint8_t pinNumber)
```
从指定的数字引脚读取值（高电平或低电平）。

</details>

<details>

<summary>pinMode()</summary>

```
void pinMode(uint8_t pinNumber, uint8_t pinMode)
```
配置指定的引脚作为输入或输出。

</details>

### Analog I/O

<details>

<summary>analogRead()</summary>

```
uint32_t analogRead(uint32_t pinNumber)
```
从指定的模拟引脚(ADC)读取值。

</details>

<details>

<summary>analogReadResolution()</summary>

```
void analogReadResolution(int bits)
```
设置由 analogRead() 返回的值的大小（以 bit 为单位）。

</details>

<details>

<summary>analogWrite()</summary>

```
void analogWrite(uint8_t pinNumber, uint32_t val)
```
将模拟值（PWM）写入引脚。

</details>

<details>

<summary>analogWriteResolution()</summary>

```
void analogWriteResolution(int bits)
```
设置 analogWrite() 函数的分辨率。

</details>

### Wire(I2C)

<details>

<summary>begin()</summary>

```
void begin(csi_iic_addr_mode_t addr_mode = IIC_ADDRESS_7BIT);
void begin(uint16_t address, csi_iic_addr_mode_t addr_mode = IIC_ADDRESS_7BIT);
```


</details>

<details>

<summary>beginTransmission()</summary>

```
void beginTransmission(uint16_t);
```

</details>

<details>

<summary>endTransmission()</summary>

```
uint8_t endTransmission(bool stopBit);
uint8_t endTransmission(void);
```

</details>

<details>

<summary>requestFrom()</summary>

```
size_t requestFrom(uint16_t address, size_t quantity, bool stopBit);
size_t requestFrom(uint16_t address, size_t quantity);
```

</details>

<details>

<summary>write()</summary>

```
size_t write(uint8_t data);
size_t write(const uint8_t * data, size_t quantity);
```

</details>

<details>

<summary>available()</summary>

```
virtual int available(void);
```


</details>

<details>

<summary>read()</summary>

```
virtual int read(void);
```

</details>

<details>

<summary>onReceive()</summary>

```
void onReceive(void(*)(int));
```

</details>

<details>

<summary>onRequest()</summary>

```
void onRequest(void(*)(void));
```

</details>

<br />

其他功能接口以及在 Duo 中的用法，后续会陆续更新，您也可以先参考 [Arduino 官方文档](https://www.arduino.cc/reference/en/)。
