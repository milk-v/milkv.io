---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Common Settings

## Use Serial Console

The Titan motherboard has an onboard USB Type-C-to-TTL serial interface based on the CH340 chip. No external USB-to-TTL adapter is required. The serial console can be used to view the system boot log and access the command-line console after the system starts.

Use a USB Type-C cable that supports data transfer to connect the debug Type-C port near the DC power connector to your computer. The computer should detect a CH340 serial device. If the device is not detected, install the appropriate CH340 driver for your operating system.

Open the detected serial port with a serial terminal application and use the following settings:

```text
baudrate: 115200
data bit: 8
stop bit: 1
parity: none
flow control: none
```

Power on the Titan to view the boot log. After the system has started, press `Enter` to activate the console.
