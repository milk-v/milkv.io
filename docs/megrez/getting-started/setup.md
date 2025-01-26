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
```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

## Release the memory used by the NPU

After the system starts, the system memory size should be smaller than the nominal value. For example, for a version with 16G memory, the memory is about 10G through the command:

```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:           9.7Gi       471Mi       8.9Gi       9.3Mi       426Mi       9.2Gi
Swap:             0B          0B          0B
```

This is because part of the memory is allocated to the NPU. If you do not need the NPU function, you can use the following method to release the memory occupied by the NPU.

:::caution
Releasing the memory used by the NPU will cause the loss of the NPU and related codec functions! If the system memory meets the usage requirements, it is not recommended to release the memory used by the NPU!
:::

### Replace the device tree

Download the dtb file:
[eic7700-milkv-megrez-no-npu.dtb](https://github.com/milkv-megrez/megrez-files/blob/main/software/dtb/eic7700-milkv-megrez-no-npu.dtb?raw=true)

Back up the dtb file used by the original system:
```
sudo cp /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb_bak
```

Replace the downloaded dtb file:
```
sudo cp -rf eic7700-milkv-megrez-no-npu.dtb /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb
```

Restart the device after syncing:
```
sync
sudo reboot
```

After restarting, check the memory information again, it has become about 16G:
```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       858Mi        14Gi        10Mi       764Mi        14Gi
Swap:             0B          0B          0B
```
