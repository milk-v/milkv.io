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

Arduino IDE supports three operating systems: Windows, Linux, and macOS. According to the system you are using, go to [Arduino official website](https://www.arduino.cc/en/software) to download the corresponding installation package for installation. The current latest version is 2.3.2, and it is recommended to use version 1.8.X or above.
   
### Add Duo to Arduino IDE

Open Arduino IDE, select ``Preferences`` in the ``File`` menu, and add the Duo configuration file address in the ``Additional boards manager URLs`` in the ``Settings`` tab:

```
https://github.com/milkv-duo/duo-arduino/releases/download/V1.0.0/package_cv180x_index.json
```

<Image src='/docs/duo/arduino/duo-arduino-01.jpg' minWidth='40%' maxWidth='100%' align='left' />

Please download the latest json file address from [Releases](https://github.com/milkv-duo/duo-arduino/releases).

If you have configured other development board addresses before, separate them with commas, or click the icon on the right side of the address bar to bring up the window, and follow the prompts to add them.

After configuring, select ``Board`` in the ``Tools`` menu, open the ``Boards Manager``, search for *CV180*, and click ``Install``.

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

On the main interface of Arduino IDE, click ``Select Board``, and then click ``Select other board and port...``

<Image src='/docs/duo/arduino/duo-arduino-04.jpg' minWidth='40%' maxWidth='100%' align='left' />

Search for "duo", select ``Duo Dev Module`` for Duo, select ``Duo256 Dev Module`` for Duo256M, select the corresponding serial port in the port and click OK.

<Image src='/docs/duo/arduino/duo-arduino-05.jpg' minWidth='40%' maxWidth='100%' align='left' />

Open the ``Examples`` > ``01.Basics`` > ``Blink`` test program in the ``File`` menu of the Arduino IDE. The function of this program is to blink the onboard LED of the Arduino device. In Duo It is also supported. Let’s just click the ``Upload`` button to test:

<Image src='/docs/duo/arduino/duo-arduino-06.jpg' minWidth='40%' maxWidth='100%' align='left' />

At this time, you can see the LED on the Duo board blinking at intervals of 1 second.

## 2. Code example

### GPIO Usage Example

This program implements Duo physical pin 20 to output high and low levels cyclically with an interval of 1 second, and observe the phenomenon through an external LED. 

The connection method is as follows. The negative pole of the LED is connected to the ground of the Duo (for example, pin 18), and the positive pole is connected in series with a 1K resistor and then connected to pin 20:

<Image src='/docs/duo/arduino/duo-arduino-07.png' minWidth='40%' maxWidth='100%' align='left' />

test program:

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

### I2C Usage Example

### SPI Usage Example

### UART Usage Example

### PWM Usage Example

### ADC Usage Example

## 3. Demo and Projects

Coming Soon ...

## 4. Arduino APIs

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
