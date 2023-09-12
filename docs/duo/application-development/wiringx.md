---
sidebar_label: 'WiringX'
sidebar_position: 10
---

# Introduction
wiringX is a library that allows developers to control the GPIO of various platforms with generic and uniform functions. By using wiringX, the same code will run on all platforms supported by wiringX, natively.

This article will be divided into the following four parts to introduce how to develop applications on Duo using wiringX:

1. wiringX APIs
2. Basic usage code demonstration and how to configure Duo's pin multiplexing
3. Configuration of the application compilation environment based on wiringX
4. Introduction to some demos and projects implemented using wiringX

If you are already familiar with the usage of wiringX, you can directly refer to our sample code:  [duo-examples](https://github.com/milkv-duo/duo-examples)

The wiringX pin numbering of Milk-V Duo is consistent with the physical pin numbering of Duo. However, the LED control pin is not available on the 40-pin physical pinout, and its wiringX pin number is 0

![duo](/docs/duo/duo-wiringx-pinout-with-pin-name-800x600.png)


## 1. wiringX APIs

### General

<details><summary>int wiringXSetup(char *name, ...)</summary>

  To initialize the WiringX library for configuring and managing GPIO pins, the fixed syntax for Duo is as follows
  ```
  wiringXSetup("duo", NULL)
  ```

</details>


<details><summary>int wiringXValidGPIO(int pin)</summary>

  To check if a GPIO pin is available,

</details>


<details><summary>void delayMicroseconds(unsigned int ms)</summary>

  Delay for how many milliseconds

</details>


<details><summary>int wiringXGC(void)</summary>

  To release resources

</details>


<details><summary>char *wiringXPlatform(void)</summary>

  Return platform information

</details>


### GPIO

<details><summary>int pinMode(int pin, pinmode_t mode)</summary>

  Set the working mode for the specified pin, where pin is the pin number, and mode can be
  - PINMODE_INPUT input mode
  - PINMODE_OUTPUT output mode
  - PINMODE_INTERRUPT interrupt mode

</details>


<details><summary>int digitalRead(int pin)</summary>

  Read the input value of the specified pin, and the return value is HIGH or LOW

</details>


<details><summary>int digitalWrite(int pin, enum digital_value_t value)</summary>

  Set the output value for the specified pin, where value can be
  - HIGH high level
  - LOW low level

</details>


<details><summary>int waitForInterrupt(int pin, int ms)</summary>

  Wait for an interrupt to occur on pin, with a timeout of ms milliseconds  
  *This function has been deprecated. It is recommended to use wiringXISR*

</details>


<details><summary>int wiringXISR(int pin, enum isr_mode_t mode)</summary>

Configure pin as an interrupt mode, with several modes for mode
- ISR_MODE_RISING
- ISR_MODE_FALLING
- ISR_MODE_BOTH

</details>


### I2C

<details><summary>int wiringXI2CSetup(const char *dev, int addr)</summary>

  Configure the I2C node and I2C address

</details>


<details><summary>int wiringXI2CRead(int fd)</summary>

  Read 1 byte of data

</details>


<details><summary>int wiringXI2CReadReg8(int fd, int reg)</summary>

  Read 1 byte of data from the reg register

</details>


<details><summary>int wiringXI2CReadReg16(int fd, int reg)</summary>

  Read 2 bytes of data from the reg register

</details>


<details><summary>int wiringXI2CWrite(int fd, int reg)</summary>

  Write the address of the register reg

</details>


<details><summary>int wiringXI2CWriteReg8(int fd, int reg, int value8)</summary>

  Write the 8-bit data value8 to the register reg

</details>


<details><summary>int wiringXI2CWriteReg16(int fd, int reg, int value16)</summary>

  Write the 16-bit data value16 to the register reg

</details>

### SPI

<details><summary>int wiringXSPISetup(int channel, int speed)</summary>

  Configure the channel (0 on Duo) and speed (default to 500000) of the SPI device

</details>

<details><summary>int wiringXSPIDataRW(int channel, unsigned char *data, int len)</summary>

  The SPI bus writes data on the rising edge and reads data on the falling edge. Therefore, this function performs both read and write operations simultaneously, resulting in the read data overwriting the written data. Please be cautious when using it

</details>

<details><summary>int wiringXSPIGetFd(int channel)</summary>

  Get the file descriptor of the SPI device, with the channel defaulting to 0 on Duo

</details>

### UART

<details><summary>int wiringXSerialOpen(const char *dev, struct wiringXSerial_t serial)</summary>

  Open the serial port device, where `dev` is the device descriptor and `serial` is a structure that needs to be filled with serial port-related parameters. For more details, please refer to the [UART Usage Example](#UART-Usage-Example)

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

<details><summary>void wiringXSerialClose(int fd)</summary>

  Close the serial port

</details>

<details><summary>void wiringXSerialFlush(int fd)</summary>

  Flush the buffer

</details>

<details><summary>void wiringXSerialPutChar(int fd, unsigned char c)</summary>

  Output a character

</details>

<details><summary>void wiringXSerialPuts(int fd, const char *s)</summary>

  Output a string

</details>

<details><summary>void wiringXSerialPrintf(int fd, const char *message, ...)</summary>

  Format output

</details>

<details><summary>int wiringXSerialDataAvail(int fd)</summary>

  Return the number of data received in the buffer

</details>

<details><summary>int wiringXSerialGetChar(int fd)</summary>

  Read a character from the serial port device

</details>

## 2. Code example

### Pin multiplexing configuration

Please note that many of Duo's pins have multipurpose functionality. When using `wiringX` to control the functions of each pin, it is important to confirm the current state of the pin to ensure it matches the desired functionality. If it doesn't, you can use the `cvi_pinmux` command to switch it to the desired function


Executing the `cvi_pinmux` command directly allows you to view the usage instructions
```
[root@milkv]~# cvi_pinmux
cvi_pinmux for cv180x
./cvi_pinmux -p          <== List all pins
./cvi_pinmux -l          <== List all pins and its func
./cvi_pinmux -r pin      <== Get func from pin
./cvi_pinmux -w pin/func <== Set func to pin
```

To check the multiplexing status of a specific pin, such as pin 1 on Duo, you need to know the name of that pin. As indicated in the diagram above, the name of pin 1 is `IIC0_SCL`. To view its multiplexing status, use the command `cvi_pinmux -r` followed by the pin name
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[v] XGPIOA_28
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
You can see that the current function is `XGPIOA_28`, indicating it is configured as a GPIO. If you want to configure pin 1 as the TX pin for UART1, you can use the following command: `cvi_pinmux -w pin_name/function`
```
cvi_pinmux -w IIC0_SCL/UART1_TX
```
Now, check the multiplexing status of the pin again
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[v] UART1_TX
[ ] UART2_TX
[ ] XGPIOA_28
[ ] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
You can see that it has been configured as `UART1_TX` now

Similarly, to configure pin 1 as the SCL pin for I2C0, you need to execute
```
cvi_pinmux -w IIC0_SCL/IIC0_SCL
```
Check the multiplexing status
```
[root@milkv]~# cvi_pinmux -r IIC0_SCL
IIC0_SCL function:
[ ] JTAG_TDI
[ ] UART1_TX
[ ] UART2_TX
[ ] XGPIOA_28
[v] IIC0_SCL
[ ] WG0_D0
[ ] DBG_10
```
It meets the expectation

### GPIO Usage Example

Here is an example of working with GPIO. It will toggle pin 20 on Duo every 1 second, pulling it high and then low. The physical pin number for pin 20 is also 20 in the WiringX numbering system

```c
#include <stdio.h>
#include <unistd.h>

#include <wiringx.h>

int main() {
    int DUO_GPIO = 20;

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
After compiling and running it on Duo, you can use a multimeter or an oscilloscope to measure the state of pin 20 and verify if it matches the expected behavior

You can also use the onboard LED pin to verify the behavior. By observing the on/off state of the LED, you can intuitively determine if the program is executing correctly. The WiringX pin number for the LED is 0. Simply modify the code mentioned above by replacing pin 20 with pin 0. However, please note that the default firmware has a script to control LED blinking on startup, which needs to be disabled. You can refer to the example explanation for [blink](#blink) below for instructions on how to disable it

### I2C Usage Example

Here is an example of I2C communication

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

### SPI Usage Example

Here is an example of SPI communication

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

### UART Usage Example

Here is an example of UART communication using UART4 on pins 4/5

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
Testing Method:

The RX of the USB to serial converter cable is connected to pin 4 (UART4_TX) of Duo, the TX of the serial cable is connected to pin 5 (UART4_RX) of Duo, and the GND of the serial cable is connected to the GND of Duo. On the computer, configure the COM port and parameters using a serial debugging tool

The compiled executable of the above program is named `uart_test`. After uploading it to Duo via SSH and running it, you should be able to see the string `Duo Serial Test` received in the serial tool on your computer. If you send the string `Hello World` from the serial tool, you will also see the corresponding string received on the Duo's terminal. This confirms that the serial communication is functioning correctly

![duo](/docs/duo/duo-wiringx-uart-test.png)

### PWM Usage Example

Here is an example of UART communication

```c
#include <stdio.h>
#include <unistd.h>
#include <stdint.h>

#include <wiringx.h>

int main(void)
{
    if(wiringXSetup("duo", NULL) == -1) {
        wiringXGC();
        return -1;
    }

    // TODO
}
```

## 3. Development Environment Setup

### Build environment on Ubuntu20.04

You can also use Ubuntu installed in a virtual machine, Ubuntu installed via WSL on Windows, or Ubuntu-based systems using Docker.

- Install the tools that compile dependencies.
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

  Take hello-world as an example, enter the hello-world directory and execute make
  ```
  cd hello-world
  make
  ```
  After the compilation is successful, send the generated `helloworld` executable program to the Duo device through the network port or the RNDIS network. For example, the RNDIS method supported by the [default firmware](https://github.com/milkv-duo/duo-buildroot-sdk/releases), Duo’s IP is 192.168.42.1, the user name is `root`, and the password is `milkv`
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

## 4. Explanation of each example

### [hello-world](https://github.com/milkv-duo/duo-examples/tree/main/hello-world)

A simple example that doesn't interact with Duo peripherals, only prints the output "Hello, World!" to verify the development environment.

### [blink](https://github.com/milkv-duo/duo-examples/tree/main/blink)

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

### [I2C](https://github.com/milkv-duo/duo-examples/tree/main/i2c)

#### [bmp280_i2c](https://github.com/milkv-duo/duo-examples/tree/main/i2c/bmp280_i2c)

This example code shows how to interface the Milk-V Duo with the popular BMP280 temperature and air pressure sensor manufactured by Bosch.

