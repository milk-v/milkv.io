---
sidebar_label: 'Arduino'
sidebar_position: 51
---

# Introduction

Arduino is a popular open-source hardware platform known for its simplicity, ease of use, and openness. It provides a rich collection of library functions and example code, making it accessible even for individuals without programming experience. Additionally, the Arduino community is highly active, allowing easy access to a wide range of project tutorials, documentation, and support.

Milk-V Duo series now supports Arduino development. You can directly use the Arduino IDE and, after a simple configuration, start using it.

The Duo series CPU adopts a big-little core design, where the Arduino firmware runs on the little core, while the big core is responsible for communication with the Arduino IDE. It receives the Arduino firmware and loads it onto the little core for execution. At the same time, the Linux system in the big core also operates normally.

## 1. Development Environment Setup

### Install Arduino IDE

Arduino IDE supports three operating systems: Windows, Linux, and macOS. According to the system you are using, go to [Arduino official website](https://www.arduino.cc/en/software) to download the corresponding installation package for installation. The current latest version is 2.3.2, and it is recommended to use the latest version.
   
### Add Duo to Arduino IDE

Open Arduino IDE, select ``Preferences`` in the ``File`` menu, and add the Duo configuration file address in the ``Additional boards manager URLs`` in the ``Settings`` tab:

```
https://github.com/milkv-duo/duo-arduino/releases/download/V1.0.0/package_sg200x_index.json
```

<Image src='/docs/duo/arduino/duo-arduino-01.jpg' minWidth='40%' maxWidth='100%' align='left' />

Please download the latest json file address from [Releases](https://github.com/milkv-duo/duo-arduino/releases).

If you have configured other development board addresses before, separate them with commas, or click the icon on the right side of the address bar to bring up the window, and follow the prompts to add them.

After configuring, select ``Board`` in the ``Tools`` menu, open the ``Boards Manager``, search for *SG200X*, and click ``Install``.

<Image src='/docs/duo/arduino/duo-arduino-02.jpg' minWidth='40%' maxWidth='100%' align='left' />

At this point, the Duo development environment in Arduino IDE has been installed. Now you can write and test the code.

### Test blinking the onboard LED

Currently, Duo's SD card system needs to burn firmware that supports Arduino. Please download the firmware with the prefix `arduino` from [Latest Release](https://github.com/milkv-duo/duo-buildroot-sdk/releases) firmware.

Refer to [Boot the Duo](https://milkv.io/docs/duo/getting-started/boot) in the previous chapter to install the SD card system.

Use a USB cable to connect Duo to your computer, and Duo will automatically power on.

Duo's default firmware, the large-core Linux system, will control the on-board LED flashing. This is achieved through the boot script. Now we are going to use the little-core Arduino to light up the LED. We need to disable the LED flashing script in the large-core Linux. In Duo's Execute in terminal:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
That is to say, rename the LED flashing script. After restarting Duo, the LED will no longer flash:
```
reboot
```

At this time, there will be an additional serial device in the "Port" of the "Device Manager" of the computer.

<Image src='/docs/duo/arduino/duo-arduino-03.jpg' minWidth='40%' maxWidth='60%' align='left' />

On the main interface of Arduino IDE, click ``Select Board``, and then click ``Select other board and port...``

<Image src='/docs/duo/arduino/duo-arduino-04.jpg' minWidth='40%' maxWidth='100%' align='left' />

Search for "duo", select ``Duo Dev Module`` for Duo, select ``Duo256 Dev Module`` for Duo256M, select the corresponding serial port in the port and click OK.

<Image src='/docs/duo/arduino/duo-arduino-05.jpg' minWidth='40%' maxWidth='100%' align='left' />

Open the ``Examples`` > ``01.Basics`` > ``Blink`` test program in the ``File`` menu of the Arduino IDE. The function of this program is to blink the onboard LED of the Arduino device. In Duo It is also supported. You may need to install pyserial in order to upload, and then let’s just click the ``Upload`` button to test:

<Image src='/docs/duo/arduino/duo-arduino-06.jpg' minWidth='40%' maxWidth='100%' align='left' />

At this time, you can see the LED on the Duo board blinking at intervals of 1 second.

## 2. Duo Arduino pin resource

### Duo

<div className='gpio_style'>

| SPI       | PWM  | I2C      | UART     | GPIO | NAME | PIN                             | PIN                              | NAME     | GPIO | ADC  |
|-----------|------|----------|----------|:----:|-----:|:-------------------------------:|:--------------------------------:|----------|:----:|------|
|           |      |          |          | 1    | GP0  | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS     |      |      |
|           |      |          |          | 2    | GP1  | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS     |      |      |
|           |      |          |          |      | GND  | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |      |      |
|           | PWM7 |          |          |      | GP2  | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |      |      |
|           | PWM6 |          |          |      | GP3  | <div className='green'>5</div>  | <div className='red'>36</div>    | 3V3(OUT) |      |      |
|           | PWM5 |          | UART3_TX |      | GP4  | <div className='green'>6</div>  | <div className='gray'>35</div>   |          |      |      |
|           | PWM6 |          | UART3_RX |      | GP5  | <div className='green'>7</div>  | <div className='gray'>34</div>   |          |      |      |
|           |      |          |          |      | GND  | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |      |      |
| SPI2_SCK  | PWM9 | I2C3_SDA |          |      | GP6  | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     |      |      |
| SPI2_MOSI | PWM8 | I2C3_SCL |          |      | GP7  | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     |      | ADC1 |
| SPI2_MISO | PWM7 | I2C1_SDA |          |      | GP8  | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |      |      |
| SPI2_CSn  | PWM4 | I2C1_SCL |          |      | GP9  | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     |      |      |
|           |      |          |          |      | GND  | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |      |      |
|           | PWM10 | I2C2_SDA |          | 14   | GP10 | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     | 27   |      |
|           | PWM11 | I2C2_SCL |          | 15   | GP11 | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     | 26   |      |
|           | PWM4 |          |          |      | GP12 | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     | 25   |      |
|           | PWM5 |          |          |      | GP13 | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     | 24   |      |
|           |      |          |          |      | GND  | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |      |      |
|           |      |          |          | 19   | GP14 | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     | 22   |      |
|           |      |          |          | 20   | GP15 | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     | 21   |      |
|           |      |          |          |      |      | &nbsp;                          |                                  |          |      |      |
|           |      |          |          | 0    |      | <div className='blue'>LED</div> |                                  |          |      |      |

</div>

### Duo256M

<div className='gpio_style'>

| SPI       | PWM  | I2C      | UART     | GPIO | NAME | PIN                             | PIN                              | NAME     | GPIO | ADC  |
|-----------|------|----------|----------|:----:|-----:|:-------------------------------:|:--------------------------------:|----------|:----:|------|
|           |      |          |          | 1    | GP0  | <div className='green'>1</div>  | <div className='red'>40</div>    | VBUS     |      |      |
|           |      |          |          | 2    | GP1  | <div className='green'>2</div>  | <div className='red'>39</div>    | VSYS     |      |      |
|           |      |          |          |      | GND  | <div className='black'>3</div>  | <div className='black'>38</div>  | GND      |      |      |
|           | PWM7 |          |          |      | GP2  | <div className='green'>4</div>  | <div className='orange'>37</div> | 3V3_EN   |      |      |
|           | PWM6 |          |          |      | GP3  | <div className='green'>5</div>  | <div className='red'>36</div>    | 3V3(OUT) |      |      |
|           | PWM5 |          | UART3_TX |      | GP4  | <div className='green'>6</div>  | <div className='gray'>35</div>   |          |      |      |
|           | PWM6 |          | UART3_RX |      | GP5  | <div className='green'>7</div>  | <div className='gray'>34</div>   |          |      |      |
|           |      |          |          |      | GND  | <div className='black'>8</div>  | <div className='black'>33</div>  | GND      |      |      |
| SPI2_SCK  | PWM9 | I2C3_SDA |          |      | GP6  | <div className='green'>9</div>  | <div className='green'>32</div>  | GP27     |      |      |
| SPI2_MOSI | PWM8 | I2C3_SCL |          |      | GP7  | <div className='green'>10</div> | <div className='green'>31</div>  | GP26     |      | ADC1 |
| SPI2_MISO | PWM7 | I2C1_SDA |          |      | GP8  | <div className='green'>11</div> | <div className='orange'>30</div> | RUN      |      |      |
| SPI2_CSn  | PWM4 | I2C1_SCL |          |      | GP9  | <div className='green'>12</div> | <div className='green'>29</div>  | GP22     |      |      |
|           |      |          |          |      | GND  | <div className='black'>13</div> | <div className='black'>28</div>  | GND      |      |      |
|           | PWM10 | I2C2_SDA |          | 14   | GP10 | <div className='green'>14</div> | <div className='green'>27</div>  | GP21     | 27   |      |
|           | PWM11 | I2C2_SCL |          | 15   | GP11 | <div className='green'>15</div> | <div className='green'>26</div>  | GP20     | 26   |      |
|           | PWM4 |          |          |      | GP12 | <div className='green'>16</div> | <div className='green'>25</div>  | GP19     | 25   |      |
|           | PWM5 |          |          |      | GP13 | <div className='green'>17</div> | <div className='green'>24</div>  | GP18     | 24   |      |
|           |      |          |          |      | GND  | <div className='black'>18</div> | <div className='black'>23</div>  | GND      |      |      |
|           |      |          |          | 19   | GP14 | <div className='green'>19</div> | <div className='green'>22</div>  | GP17     | 22   |      |
|           |      |          |          | 20   | GP15 | <div className='green'>20</div> | <div className='green'>21</div>  | GP16     | 21   |      |
|           |      |          |          |      |      | &nbsp;                          |                                  |          |      |      |
|           |      |          |          | 0    |      | <div className='blue'>LED</div> |                                  |          |      |      |

</div>

## 3. Code example

### GPIO Usage Example

This program implements Duo physical pin 20 to output high and low levels cyclically with an interval of 1 second, and observe the phenomenon through an external LED. 

The connection method is as follows. The negative pole of the LED is connected to the ground of the Duo (for example, pin 18), and the positive pole is connected in series with a 1K resistor and then connected to pin 20:

<Image src='/docs/duo/arduino/duo-arduino-07.png' minWidth='40%' maxWidth='70%' align='left' />

test code:
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
- If the LED is not connected, you can observe the status changes of the pin through a multimeter or oscilloscope.
- Configuring TEST_PIN to 0 enables testing of the Duo onboard LED.
:::

### UART Usage Example

#### UART Serial port

The UART serial port uses `UART3` on physical pin `6/7` by default. When debugging the Arduino program, you can print debugging information through this serial port.

The connection method is as follows. The computer can use a USB to TTL serial port cable. The logic level is 3.3V and the baud rate is 115200. The RX of the serial port cable is connected to the PIN 6 UART3_TX of the Duo. The TX of the serial port cable is connected to the PIN 7 UART3_RX of the Duo. The serial port The GND of the line is connected to any GND of the Duo, such as pin 3:

<Image src='/docs/duo/arduino/duo-arduino-08.jpg' minWidth='40%' maxWidth='90%' align='left' />

test code:
```C
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.printf("hello world\r\n");
  delay(1000);
}
```

After running, you can see the "hello world" string printed every 1 second in the computer serial port tool:
```
hello world
hello world
```

In addition, the default serial port uses Duo's UART3 interface, so `Serial3` can also be used in the program:
```C
void setup() {
  Serial3.begin(115200);
}

void loop() {
  Serial3.printf("hello world\r\n");
  delay(1000);
}
```

### I2C Usage Example

:::caution
The I2C interface resources of Duo and Duo256M are different and need to be used according to the previous pin resource diagram.
:::

#### I2C0 sends data to I2C1 (Duo)

The hardware connection is as follows. Connect the SDA and SCL pins of I2C0 and I2C1 correspondingly, and then connect the serial port to the computer to view the printing information according to the method in the UART example above.

<Image src='/docs/duo/arduino/duo-arduino-09.jpg' minWidth='40%' maxWidth='60%' align='left' />

The `Wire` function in Duo is mapped to I2C0 by default, that is, `Wire` is equivalent to `Wire0`.

Test code:
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

Test Results:
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

#### I2C1 sends data to I2C2 (Duo256M)

:::tip
Note that Duo256M does not have I2C0.
:::

The hardware connection is as follows. Connect the SDA and SCL pins of I2C1 and I2C2 correspondingly, and then connect the serial port to the computer to view the printing information according to the method in the UART example above.

<Image src='/docs/duo/arduino/duo-arduino-11.jpg' minWidth='40%' maxWidth='60%' align='left' />

The `Wire` function in Duo256M is mapped to I2C1 by default, that is, `Wire` is equivalent to `Wire1`.

Test code:
```C
#include <Wire.h>

void receive(int a) {
  Serial.printf("receive %d bytes\n\r", a);
  while(a--) {
    Serial.printf("%d \n\r", Wire2.read());
  }
}

void setup() {
  Serial.begin(115200);

  Wire2.begin(0x50);
  Wire2.onReceive(receive);

  Wire.begin();
  Serial.printf("test slave\n\r");
  Wire2.print();
}

byte val = 0;

void loop() {
  Wire.beginTransmission(0x50);         // Transmit to device number 0x50
  Serial.printf("send %d \n\r", ++val);
  Wire.write(val);                      // Sends value byte
  Wire.endTransmission();               // Stop transmitting
  Wire2.onService();
  delay(1000);
}
```

Test Results:
```
test slave
Wire2: 1
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

### SPI Usage Example

#### SPI loopback test

The hardware connection is as follows. Short-circuit the MOSI and MISO of the SPI, that is, pin 10 and pin 11, and then connect the serial port to the computer according to the method in the UART example above to view the printing information.

<Image src='/docs/duo/arduino/duo-arduino-10.jpg' minWidth='40%' maxWidth='60%' align='left' />

Test code:
```C
#include <SPI.h>

char str[]="hello world\n";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  SPI.begin();
}

byte i = 0;

void loop() {
  // put your main code here, to run repeatedly:
  // digitalWrite(12, 1);
  SPI.beginTransaction(SPISettings());
  Serial.printf("transfer %c\n\r", str[i]);
  char out = SPI.transfer(str[i++]);        // spi loop back
  SPI.endTransaction();
  Serial.printf("receive %x \n\r", out);
  i %= 12;
}
```

Test Results:
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

### PWM Usage Example

The hardware connection is as follows. Connect the DUO's GP4 to the negative lead of the LED.

<Image src='/docs/duo/arduino/duo-arduino-12.jpg' minWidth='40%' maxWidth='60%' align='left' />

Test code:
```C
void setup() {
  pinMode(6, OUTPUT);
}

void loop() {
  for(int i = 128; i < 255; i++)
  {
    analogWrite(6,i);
    delay(50);
  }
  for(int i = 255; i > 128; i--)
  {
    analogWrite(6,i);
    delay(50);
  }
}
```

After compiling and burning, you can observe the LED light breathing effect.

:::warning
Please pay attention to the allocation of PWM resources when using PWM. The same PWM can be assigned to two different pins, but the outputs of the two pins are exactly the same.
:::

### ADC Usage Example

The hardware connection is as follows. Connect the GP26 of DUO to the signal pin of the potentiometer, and connect the other two pins to the positive and negative poles of the power supply respectively.

<Image src='/docs/duo/arduino/duo-arduino-13.jpg' minWidth='40%' maxWidth='60%' align='left' />

Test code:
```C
int adc_get_val = 0;

void setup() {
  pinMode(0,OUTPUT);
}

void loop() {
  adc_get_val = analogRead(31);

  digitalWrite(0,HIGH);
  delay(adc_get_val);
  digitalWrite(0,LOW);
  delay(adc_get_val);
}
```

After compiling and burning, you can observe that the flashing frequency of the onboard LED changes as the position of the potentiometer changes.

### MailBox Usage Example

Compile and burn the following code into the small core Arduino. This program can read the information sent by the large core from the MailBox and print it to the serial port, for serial port wiring, please refer to the [UART Usage Example](#uart-usage-example) in this chapter.

```C

#include "mailbox.h"

struct valid_t {
  uint8_t linux_valid;
  uint8_t rtos_valid;
} __attribute__((packed));

typedef union resv_t {
  struct valid_t valid;
  unsigned short mstime;  // 0 : noblock, -1 : block infinite
} resv_t;

typedef struct cmdqu_t cmdqu_t;
/* cmdqu size should be 8 bytes because of mailbox buffer size */
struct cmdqu_t {
  uint8_t ip_id;
  uint8_t cmd_id : 7;
  uint8_t block : 1;
  union resv_t resv;
  unsigned int param_ptr;
} __attribute__((packed)) __attribute__((aligned(0x8)));

void showmsg(MailboxMsg msg) {
  cmdqu_t *cmdq;
  Serial.print("Get Msg: ");
  Serial.println(*(msg.data), HEX);
  cmdq = (cmdqu_t *)msg.data;
  Serial.printf("cmdq->ip_id = %d\r\n", cmdq->ip_id);
  Serial.printf("cmdq->cmd_id = %x\r\n", cmdq->cmd_id);
  Serial.printf("cmdq->block = %d\r\n", cmdq->block);
  Serial.printf("cmdq->para_ptr = %x\r\n", cmdq->param_ptr);
  *(msg.data) = 0;
}

void setup() {
  Serial.begin(115200);
  mailbox_init(false);
  mailbox_register(0, showmsg);
  mailbox_enable_receive(0);
  Serial.println("Mailbox Start");
}

void loop() {
  
}

```

Compile the test program [mailbox_test](https://github.com/milkv-duo/duo-examples/tree/main/mailbox-test) and run it on large-core Linux. The test program has been stored in the [duo-examples](https://github.com/milkv-duo/duo-examples) warehouse. You can refer to [README](https://github.com/milkv-duo/duo-examples/blob/main/README.md) for compilation.

After running, the big core Linux output：

```

C906B: cmd.param_ptr = 0x2
C906B: cmd.param_ptr = 0x3

```

Small core serial port printing：

```

Mailbox Start
Get Msg: 19300
cmdq->ip_id = 0
cmdq->cmd_id = 13
cmdq->block = 1
cmdq->para_ptr = 2
Get Msg: 19300
cmdq->ip_id = 0
cmdq->cmd_id = 13
cmdq->block = 1
cmdq->para_ptr = 3

```

## 4. Sensor examples

### L9110H_test

L9110H_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/L9110H_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/L9110H_test)

For the example code of the DC motor driver chip L9110H, connect the wires according to the code comments and then burn and run. The motor will run in cycles of gradual acceleration and deceleration, and reverse gradual acceleration and deceleration.

### LCD1602

LCD1602_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD1602_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD1602_test)

Example code for the LCD1602 I2C interface screen. Connect the wires according to the code comments and then burn and run. The screen will display a string.

### LCD2004

LCD2004_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD2004_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD2004_test)

Example code for the LCD2004 I2C interface screen. Connect the wires according to the code comments and then burn and run. The screen will display a string.

### Buzzer

buzzer_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_test)

Example code for the buzzer module, wired according to the code comments and burned to run. The buzzer plays three different frequencies of beeps in a loop.

### HC-SR04

hc_sr04_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/hc_sr04_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/hc_sr04_test)

Example code for HC-SR04 ultrasonic distance measurement sensor module. After burning and running the example code, the board will print the measured distance data to the serial port.

### RC522

rc522_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/rc522_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/rc522_test)

Example code for RC522 RFID read-write module. After burning and running the code, the board will loop to check if the ID card is read. If the ID card is detected, it will print the card type and card number information to the serial port.

### SSD1306

ssd1306_test source:[https://github.com/milkv-duo/duo-arduino-examples/tree/master/ssd1306_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/ssd1306_test)

Example code for SSD1306 OLED screen module. After wiring according to comments and burning the code, the screen displays a dynamic animation of the eyes.

## 5. Arduino APIs

### Digital I/O

<details>

<summary>digitalWrite()</summary>

```
void digitalWrite(uint8_t pinNumber, uint8_t status)
```
Write a HIGH or a LOW value to a digital pin.

</details>

<details>

<summary>digitalRead()</summary>

```
int digitalRead(uint8_t pinNumber)
```
Reads the value from a specified digital pin, either HIGH or LOW.

</details>

<details>

<summary>pinMode()</summary>

```
void pinMode(uint8_t pinNumber, uint8_t pinMode)
```
Configures the specified pin to behave either as an input or an output

</details>

### Analog I/O

<details>

<summary>analogRead()</summary>

```
uint32_t analogRead(uint32_t pinNumber)
```
Reads the value from the specified analog pin.

</details>

<details>

<summary>analogReadResolution()</summary>

```
void analogReadResolution(int bits)
```
Sets the size (in bits) of the value returned by analogRead().

</details>

<details>

<summary>analogWrite()</summary>

```
void analogWrite(uint8_t pinNumber, uint32_t val)
```
Writes an analog value (PWM wave) to a pin.

</details>

<details>

<summary>analogWriteResolution()</summary>

```
void analogWriteResolution(int bits)
```
analogWriteResolution() sets the resolution of the analogWrite() function.

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

Other functional interfaces and their usage in Duo will be updated in the future. You can also refer to [Arduino official documentation](https://www.arduino.cc/reference/en/) first.
