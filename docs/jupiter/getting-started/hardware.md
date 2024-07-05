---
sidebar_label: 'Hardware Interface'
sidebar_position: 5
---

# Hardware Interface

<Image src='/docs/jupiter/jupiter-interface.webp' maxWidth='100%' align='left' />

## Power interface

Jupiter supports the following power supply modes:

- DC power supply, 5.5*2.5mm, 12V/3A or above
- Type-C PD Power Adapter
- PC standard ATX 24-pin power supply
- Ethernet port PoE power supply (requires additional PoE module)

:::tip
The power consumption of the Jupiter board depends on the power and number of connected peripherals. You need to choose the appropriate power supply method according to the specific situation.
:::

## Type-C

- The Type-C interface can be used as a burning port to install system-related images for the `SPI FLASH`, `eMMC module`, and `SSD` on the board through a PC.
- If you are running Bianbu Desktop in Jupiter, the Type-C interface is Adb Device by default, and you can connect to Jupiter via Adb on the PC.
- This Type-C interface supports PD power supply, which means you can power Jupiter through a PD power adapter.

## eMMC Jumper

The eMMC jumper on the board does not need to be short-circuited when we use it. The system image can be burned into the eMMC normally and run. At this time, the boot program in the `SPI Flash` will be used to load the system in the eMMC.

If the eMMC jumper is shorted, the `SPI Flash` on the board will be disabled. In this scenario, you need to keep the eMMC jumper shorted when burning the system image and burn the bootloader into the eMMC as well.
