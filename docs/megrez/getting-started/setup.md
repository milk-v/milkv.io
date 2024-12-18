---
sidebar_label: 'Setting Up'
sidebar_position: 20
---

# Setting Up

## UART Serial Console

The Megrez board includes a reserved UART debugging serial port, which can be used to view system boot logs or log in to the console after the system has booted to execute terminal commands.

### USB to Serial Cable

The pin definitions of a common USB to TTL serial cable are as follows:

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

### Connecting the Serial Port

The debugging serial port operates at a 3.3V level. As shown in the diagram below, connect the USB to TTL serial module, but do not connect the red wire.

<div className='gpio_style'>

| Milk-V Megrez | \<---> | USB to TTL Cable |
| :-----------: | :----: | :--------------: |
|      GND      | \<---> | Black wire       |
|      RX       | \<---> | Green wire (TX)  |
|      TX       | \<---> | White wire (RX)  |

</div>

<Image src='/docs/megrez/megrez-ttl.webp' maxWidth='100%' align='left' />

The default serial port parameters for Megrez are as follows:
