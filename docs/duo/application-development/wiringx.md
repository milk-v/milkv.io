---
sidebar_label: 'wiringX'
sidebar_position: 10
---

# Introduction

wiringX is a library that allows developers to control the GPIO of various platforms with generic and uniform functions. By using wiringX, the same code will run on all platforms supported by wiringX, natively.

This article will be divided into the following four parts to introduce how to develop applications on Duo using wiringX:

1. wiringX APIs
2. Basic usage code demonstration
3. Configuration of the application compilation environment based on wiringX
4. Introduction to some demos and projects implemented using wiringX

If you are already familiar with the usage of wiringX, you can directly refer to our sample code:  [duo-examples](https://github.com/milkv-duo/duo-examples)

Please note that many pin functions of the Duo series are multiplexed. When using `wiringX` to control the functions of each pin, it is important to confirm the current state of the pin to ensure it matches the desired functionality. If it doesn't, you can use the `duo-pinmux` command to switch it to the desired function.

Please refer to the detailed usage instructions for more information：[pinmux](https://milkv.io/docs/duo/application-development/pinmux).

### Duo/Duo256M wiringX numbers

The wiringX pin numbers of Duo and Duo256M are consistent with the pin name numbers. However, the blue LED control pin is not available on the 40-pin physical pinout, and its wiringX pin number is `25`.

<Image src='/docs/duo/duo/duo-pinout-01.webp' maxWidth='50%' align='left' />

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

### DuoS wiringX numbers

The wiringX pin numbers of DuoS are consistent with the physical pin numbers. The blue LED control pin is not on the 40PIN physical pins, and its wiringX number is `0`.

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='left' />

#### Header J3

GPIO on `Header J3` use 3.3V logic levels.

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

*GND\*: Pin 9 is a low-level GPIO in the V1.1 version of the hardware, and is GND in the V1.2 version and later.*

#### Header J4

GPIO on `Header J4` use 1.8V logic levels.

Most of the pins on this header have dedicated functions, such as MIPI DSI signals, Touch Screen signals, and audio signals. If there is no special requirement, it is not recommended to use the pins on this header as GPIO.

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

## 1. Code example

### GPIO Usage Example

Here is an example of working with GPIO. It will toggle pin 20 on Duo every 1 second, pulling it high and then low. The physical pin number for pin 20 is `15` in the WiringX numbering system.

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
After compiling and running it on Duo, you can use a multimeter or an oscilloscope to measure the state of pin 20 and verify if it matches the expected behavior.

You can also use the onboard LED pin to verify the behavior. By observing the on/off state of the LED, you can intuitively determine if the program is executing correctly. The WiringX pin number for the LED is `25`. Simply modify the code mentioned above by replacing pin `15` with pin `25`. However, please note that the default firmware has a script to control LED blinking on startup, which needs to be disabled. You can refer to the example explanation for [blink](#blink) below for instructions on how to disable it.

### I2C Usage Example

Here is an example of I2C communication:

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

### SPI Usage Example

Here is an example of SPI communication:

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

### UART Usage Example

Here is an example of UART communication using UART4 on pins 4/5:

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
Testing Method:

The RX of the USB to serial converter cable is connected to pin 4 (UART4_TX) of Duo, the TX of the serial cable is connected to pin 5 (UART4_RX) of Duo, and the GND of the serial cable is connected to the GND of Duo. On the computer, configure the COM port and parameters using a serial debugging tool.

The compiled executable of the above program is named `uart_test`. After uploading it to Duo via SSH and running it, you should be able to see the string `Duo Serial Test` received in the serial tool on your computer. If you send the string `Hello World` from the serial tool, you will also see the corresponding string received on the Duo's terminal. This confirms that the serial communication is functioning correctly.

![duo](/docs/duo/duo-wiringx-uart-test.png)


## 2. Development Environment Setup

### Build environment on Ubuntu20.04

You can also use Ubuntu installed in a virtual machine, Ubuntu installed via WSL on Windows, or Ubuntu-based systems using Docker.

- Install the tools that compile dependencies
  ```
  sudo apt-get install wget git make
  ```
- Get example source code
  ```
  git clone https://github.com/milkv-duo/duo-examples.git
  ```

- Prepare compilation environment
  ```
  cd duo-examples
  source envsetup.sh
  ```
  The first time you source it, the required SDK package will be automatically downloaded, which is approximately 180MB in size. Once downloaded, it will be automatically extracted to the `duo-examples` directory with the name `duo-sdk`. When source it next time, if the directory already exists, it will not be downloaded again.

- Compile testing  

  Take hello-world as an example, enter the hello-world directory and execute make:
  ```
  cd hello-world
  make
  ```
  After the compilation is successful, send the generated `helloworld` executable program to the Duo device through the network port or the USB network. For example, the USB-NCM method supported by the [default firmware](https://github.com/milkv-duo/duo-buildroot-sdk/releases), Duo’s IP is 192.168.42.1, the user name is `root`, and the password is `milkv`.
  ```
  scp helloworld root@192.168.42.1:/root/
  ```
  After sending successfully, run `./helloworld` in the terminal logged in via ssh or serial port, and it will print `Hello, World!`
  ```
  [root@milkv]~# ./helloworld
  Hello, World!
  ```
  **At this point, our compilation and development environment is ready for use.**

### How to create your own project

You can simply copy existing examples and make necessary modifications. For instance, if you need to manipulate a GPIO, you can refer to the `blink` example. LED blinking is achieved by controlling the GPIO's voltage level. The current SDK utilizes the WiringX library for GPIO operations, which has been adapted specifically for Duo. You can find the platform initialization and GPIO control methods in the `blink.c` code for reference.

- Create your own project directory called `my-project`.
- Copy the `blink.c` and `Makefile` files from the `blink` example to the `my-project` directory.
- Rename `blink.c` to your desired name, such as `gpio_test.c`.
- Modify the `Makefile` by changing `TARGET=blink` to `TARGET=gpio_test`.
- Modify `gpio_test.c` to implement your own code logic.
- Execute the `make` command to compile.
- Send the generated `gpio_test` executable program to Duo for execution.
  
Note:

- Creating a new project directory is not mandatory to be placed within the `duo-examples` directory. You can choose any location based on your preference. Before executing the `make` compilation command, it is sufficient to load the compilation environment from the `duo-examples` directory (source /PATH/TO/duo-examples/envsetup.sh).
- Within the terminal where the compilation environment (envsetup.sh) is loaded, avoid compiling Makefile projects for other platforms such as ARM or X86. If you need to compile projects for other platforms, open a new terminal.

## 3. Explanation of each example

### hello-world

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/hello-world](https://github.com/milkv-duo/duo-examples/tree/main/hello-world)

A simple example that doesn't interact with Duo peripherals, only prints the output "Hello, World!" to verify the development environment.

### blink

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/blink](https://github.com/milkv-duo/duo-examples/tree/main/blink)

This example demonstrates how to control an LED connected to a GPIO pin. It uses the WiringX library to toggle the GPIO pin's voltage level, resulting in the LED blinking.  

The `blink.c` code includes platform initialization and GPIO manipulation methods from the WiringX library.

To test the `blink` example, which involves LED blinking, you need to disable the script responsible for the automatic LED blinking on the default firmware of Duo. In the Duo terminal, execute the following command:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
This command renames the LED blinking script. After restarting Duo, the LED will no longer blink. 

Once you have finished testing the `blink` program implemented in C, if you want to restore the LED blinking script, you can rename it back using the following command and then restart Duo:
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```

### PWM

Source code：[https://github.com/milkv-duo/duo-examples/tree/main/pwm](https://github.com/milkv-duo/duo-examples/tree/main/pwm)

Set the PWM signal on a pin by manually entering the pin number and duty cycle. After running the program， please follow the prompts to enter the [pin number]:[duty] cycle to set the PWM signal on the corresponding pin, such as 3:500.

### ADC

#### adcRead reads the voltage value

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/adc](https://github.com/milkv-duo/duo-examples/tree/main/adc)

Reading the measured value of the ADC is divided into two versions: shell script and C language. After starting, select the ADC to be read according to the output prompts. After selection, the voltage value measured by the ADC will be printed in a loop.

### I2C

I2C source code directory: [https://github.com/milkv-duo/duo-examples/tree/main/i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c)

#### BMP280 Temperature Barometer Sensor

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c)

This example code shows how to interface the Milk-V Duo with the popular BMP280 temperature and air pressure sensor manufactured by Bosch.

#### VL53l0X  Time of Flight distance sensor

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/i2c/vl53l0x_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/vl53l0x_i2c)

Use the TOF distance sensor VL53L0X module via the I2C interface to read the measured distance.

#### SSD1306 OLEDs

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/i2c/ssd1306_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/ssd1306_i2c)

Display strings on SSD1306 OLED display via I2C interface.

#### ADXL345 Three-axis acceleration sensor

Source code: [https://github.com/milkv-duo/duo-examples/blob/main/i2c/adxl345_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/adxl345_i2c)

Read the acceleration data obtained by ADXL345 through the I2C interface, read it every 1 second, and print the result on the screen.

#### LCM1602 Display Moudle

Source code: [https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm1602_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm1602_i2c)

Display strings on the 1602 LCD screen via the I2C interface.

#### LCM2004 Display Moudle

Source code: [https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm2004_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/lcm2004_i2c)

Display string on 2004 LCD screen via I2C interface.

#### TCS34725 Color sensor

Source code: [https://github.com/milkv-duo/duo-examples/blob/main/i2c/tcs34725_i2c](https://github.com/milkv-duo/duo-examples/blob/main/i2c/tcs34725_i2c)

Read the TCS34725 color sensor through the I2C interface and output the obtained data.

### SPI

SPI source code directory: [https://github.com/milkv-duo/duo-examples/tree/main/spi](https://github.com/milkv-duo/duo-examples/tree/main/spi)

#### MAX6675 Temperature Sensor

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/spi/max6675_spi](https://github.com/milkv-duo/duo-examples/tree/main/spi/max6675_spi)

Connect the K-type thermocouple measurement module MAX6675 through the SPI interface to measure the current temperature on the sensor.

#### RC522 Radio Frequency Identification Module

Source code: [https://github.com/milkv-duo/duo-examples/tree/main/spi/rc522_spi](https://github.com/milkv-duo/duo-examples/tree/main/spi/rc522_spi)

Connect the RC522 RFID read-write module via the SPI interface to read the card ID and type and output them to the screen.

## 4. Compile wiringX

Duo firmware already contains the compiled wiringX library (/usr/lib/libwiringx.so) and can be used directly. If you need to compile the source code of wiringX to generate the library, you can compile it as follows.

We compile it on an Ubuntu host or other Linux distribution.

*Note: Part of Duo's wiringX code has not yet been integrated into the upstream wiringX repo. In actual use, please give priority to using the wiringX library in Duo firmware.

### Download wiringX source code

```
git clone https://github.com/wiringX/wiringX.git
```

### Modify CMakeLists.txt

Enter the code directory:
```
cd wiringX
```

The wiringX project is compiled using cmake. You need to modify CMakeLists.txt through `vi` or other editors to add the cross-compilation toolchain and compilation parameters:

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

There are two variables that need to be noted and configured according to your own file path:
- **CMAKE_C_COMPILER**: The path to gcc in the cross-compilation toolchain
- **CMAKE_CXX_COMPILER**: path to g++ in the cross-compilation toolchain

Download link for cross-compilation toolchain: [host-tools.tar.gz](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz). You can download and unzip it through the wget command:
```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
tar -xf host-tools.tar.gz
```

If you have ever compiled [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk), the `host-tools` directory in its root directory is the directory of the cross toolchain. There is no need to re-download, you can directly modify the `CMAKE_CURRENT_SOURCE_DIR` field to specify the directory. Or create a soft link pointing to the directory.

### Modify code

Since the time-related definitions in the cross toolchain are slightly different from those in wiringX, add the following two lines of modification:

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

### Compile

Compiling in cmake will create some intermediate directories and files, so we create a new build directory and enter this directory to complete the compilation:

```bash
mkdir build
cd build
cmake ..
make
```

After compilation is completed, the `libwiringx.so` generated in the current `build` directory is the wiringX library we need.

### Points to Consider

If you encounter compilation errors, you can try to change the version of `cmake`. For example, you can manually install the latest `3.27.6` version:

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.27.6/cmake-3.27.6-linux-x86_64.sh
chmod +x cmake-3.27.6-linux-x86_64.sh
sudo sh cmake-3.27.6-linux-x86_64.sh --skip-license --prefix=/usr/local/
```
The manually installed `cmake` is in `/usr/local/bin`. At this time, use the `cmake --version` command to check its version number, which should be:

```
cmake version 3.27.6
```

## 5. wiringX APIs

### General

<details>

<summary>int wiringXSetup(char *name, ...)</summary>

  To initialize the WiringX library for configuring and managing GPIO pins:
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

  To check if a GPIO pin is available.

</details>


<details>

<summary>void delayMicroseconds(unsigned int ms)</summary>

  Delay for how many milliseconds.

</details>


<details>

<summary>int wiringXGC(void)</summary>

  To release resources.

</details>


<details>

<summary>char *wiringXPlatform(void)</summary>

  Return platform information.

</details>


### GPIO

<details>

<summary>int pinMode(int pin, pinmode_t mode)</summary>

  Set the working mode for the specified pin, where pin is the pin number, and mode can be:
  - PINMODE_INPUT input mode
  - PINMODE_OUTPUT output mode
  - PINMODE_INTERRUPT interrupt mode

</details>


<details>

<summary>int digitalRead(int pin)</summary>

  Read the input value of the specified pin, and the return value is HIGH or LOW.

</details>


<details>

<summary>int digitalWrite(int pin, enum digital_value_t value)</summary>

  Set the output value for the specified pin, where value can be:
  - HIGH high level
  - LOW low level

</details>


<details>

<summary>int waitForInterrupt(int pin, int ms)</summary>

  Wait for an interrupt to occur on pin, with a timeout of ms milliseconds.
  *This function has been deprecated. It is recommended to use wiringXISR*

</details>


<details>

<summary>int wiringXISR(int pin, enum isr_mode_t mode)</summary>

Configure pin as an interrupt mode, with several modes for mode:
- ISR_MODE_RISING
- ISR_MODE_FALLING
- ISR_MODE_BOTH

</details>


### I2C

<details>

<summary>int wiringXI2CSetup(const char *dev, int addr)</summary>

  Configure the I2C node and I2C address.

</details>


<details>

<summary>int wiringXI2CRead(int fd)</summary>

  Read 1 byte of data.

</details>


<details>

<summary>int wiringXI2CReadReg8(int fd, int reg)</summary>

  Read 1 byte of data from the reg register.

</details>


<details>

<summary>int wiringXI2CReadReg16(int fd, int reg)</summary>

  Read 2 bytes of data from the reg register.

</details>


<details>

<summary>int wiringXI2CWrite(int fd, int reg)</summary>

  Write the address of the register reg.

</details>


<details>

<summary>int wiringXI2CWriteReg8(int fd, int reg, int value8)</summary>

  Write the 8-bit data value8 to the register reg.

</details>


<details>

<summary>int wiringXI2CWriteReg16(int fd, int reg, int value16)</summary>

  Write the 16-bit data value16 to the register reg.

</details>

### SPI

<details>

<summary>int wiringXSPISetup(int channel, int speed)</summary>

  Configure the channel (0 on Duo) and speed (default to 500000) of the SPI device.

</details>

<details>

<summary>int wiringXSPIDataRW(int channel, unsigned char *data, int len)</summary>

  The SPI bus writes data on the rising edge and reads data on the falling edge. Therefore, this function performs both read and write operations simultaneously, resulting in the read data overwriting the written data. Please be cautious when using it.

</details>

<details>

<summary>int wiringXSPIGetFd(int channel)</summary>

  Get the file descriptor of the SPI device, with the channel defaulting to 0 on Duo.

</details>

### UART

<details>

<summary>int wiringXSerialOpen(const char *dev, struct wiringXSerial_t serial)</summary>

  Open the serial port device, where `dev` is the device descriptor and `serial` is a structure that needs to be filled with serial port-related parameters. For more details, please refer to the [UART Usage Example](#UART-Usage-Example).

  ```c
  typedef struct wiringXSerial_t {
      unsigned int baud;           // baudrate
      unsigned int databits;       // 7/8
      unsigned int parity;         // o/e/n
      unsigned int stopbits;       // 1/2
      unsigned int flowcontrol;    // x/n
  } wiringXSerial_t;
  ```

</details>

<details>

<summary>void wiringXSerialClose(int fd)</summary>

  Close the serial port.

</details>

<details>

<summary>void wiringXSerialFlush(int fd)</summary>

  Flush the buffer.

</details>

<details>

<summary>void wiringXSerialPutChar(int fd, unsigned char c)</summary>

  Output a character.

</details>

<details>

<summary>void wiringXSerialPuts(int fd, const char *s)</summary>

  Output a string.

</details>

<details>

<summary>void wiringXSerialPrintf(int fd, const char *message, ...)</summary>

  Format output.

</details>

<details>

<summary>int wiringXSerialDataAvail(int fd)</summary>

  Return the number of data received in the buffer.

</details>

<details>

<summary>int wiringXSerialGetChar(int fd)</summary>

  Read a character from the serial port device.

</details>

### PWM

The current version of wiringX only supports Duo's PWM. Duo256M and DuoS will add PWM support later.

- Duo PWM Pin Number

<div className='gpio_style'>

| PWM | PIN NAME |              Pin#               |              Pin#                | PIN NAME |
|:---:|:---------|:-------------------------------:|:--------------------------------:|----------|
|     | GP0      | <div className='green'>1</div>  |    <div className='red'>40</div> | VBUS     |
|     | GP1      | <div className='green'>2</div>  |    <div className='red'>39</div> | VSYS     |
|     | GND      | <div className='black'>3</div>  |  <div className='black'>38</div> | GND      |
| 10  | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |
| 11  | GP3      | <div className='green'>5</div>  |    <div className='red'>36</div> | 3V3(OUT) |
| 5   | GP4      | <div className='green'>6</div>  |   <div className='gray'>35</div> |          |
| 6   | GP5      | <div className='green'>7</div>  |   <div className='gray'>34</div> |          |
|     | GND      | <div className='black'>8</div>  |  <div className='black'>33</div> | GND      |
| 9   | GP6      | <div className='green'>9</div>  |  <div className='green'>32</div> | GP27     |
| 8   | GP7      | <div className='green'>10</div> |  <div className='green'>31</div> | GP26     |
| 7   | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |
| 4   | GP9      | <div className='green'>12</div> |  <div className='green'>29</div> | GP22     |
|     | GND      | <div className='black'>13</div> |  <div className='black'>28</div> | GND      |
|     | GP10     | <div className='green'>14</div> |  <div className='green'>27</div> | GP21     |
|     | GP11     | <div className='green'>15</div> |  <div className='green'>26</div> | GP20     |
| 4   | GP12     | <div className='green'>16</div> |  <div className='green'>25</div> | GP19     |
| 5   | GP13     | <div className='green'>17</div> |  <div className='green'>24</div> | GP18     |
|     | GND      | <div className='black'>18</div> |  <div className='black'>23</div> | GND      |
|     | GP14     | <div className='green'>19</div> |  <div className='green'>22</div> | GP17     |
|     | GP15     | <div className='green'>20</div> |  <div className='green'>21</div> | GP16     |

</div>

- Duo256M PWM Pin Number

<div className='gpio_style'>

| PWM | PIN NAME |              Pin#               |              Pin#                | PIN NAME |
|:---:|:---------|:-------------------------------:|:--------------------------------:|----------|
|     | GP0      | <div className='green'>1</div>  |    <div className='red'>40</div> | VBUS     |
|     | GP1      | <div className='green'>2</div>  |    <div className='red'>39</div> | VSYS     |
|     | GND      | <div className='black'>3</div>  |  <div className='black'>38</div> | GND      |
| 7   | GP2      | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |
| 6   | GP3      | <div className='green'>5</div>  |    <div className='red'>36</div> | 3V3(OUT) |
| 5   | GP4      | <div className='green'>6</div>  |   <div className='gray'>35</div> |          |
| 6   | GP5      | <div className='green'>7</div>  |   <div className='gray'>34</div> |          |
|     | GND      | <div className='black'>8</div>  |  <div className='black'>33</div> | GND      |
| 9   | GP6      | <div className='green'>9</div>  |  <div className='green'>32</div> | GP27     |
| 8   | GP7      | <div className='green'>10</div> |  <div className='green'>31</div> | GP26     |
| 7   | GP8      | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |
| 4   | GP9      | <div className='green'>12</div> |  <div className='green'>29</div> | GP22     |
|     | GND      | <div className='black'>13</div> |  <div className='black'>28</div> | GND      |
| 10  | GP10     | <div className='green'>14</div> |  <div className='green'>27</div> | GP21     |
| 11  | GP11     | <div className='green'>15</div> |  <div className='green'>26</div> | GP20     |
| 4   | GP12     | <div className='green'>16</div> |  <div className='green'>25</div> | GP19     |
| 5   | GP13     | <div className='green'>17</div> |  <div className='green'>24</div> | GP18     |
|     | GND      | <div className='black'>18</div> |  <div className='black'>23</div> | GND      |
|     | GP14     | <div className='green'>19</div> |  <div className='green'>22</div> | GP17     |
|     | GP15     | <div className='green'>20</div> |  <div className='green'>21</div> | GP16     |

</div>

<details>

<summary>wiringXPWMSetPeriod(int pin, long period)</summary>

  Set the period of the PWM pin, pin is the PWM pin number, period is in nanoseconds.

</details>


<details>

<summary>int wiringXPWMSetDuty(int pin, long duty_cycle)</summary>

  Set the high level time of the PWM pin in one cycle, duty_cycle is in nanoseconds.

</details>


<details>

<summary>int wiringXPWMSetPolarity(int pin, int polarity)</summary>

  Set the PWM pin polarity, the polarity is 0 or 1:
  - 0 normal
  - 1 inversed

</details>


<details>

<summary>int wiringXPWMEnable(int pin, int enable)</summary>

  Enable or disable PWM pin output, enable is 0 or 1:
  - 0: disable
  - 1: enable

</details>
