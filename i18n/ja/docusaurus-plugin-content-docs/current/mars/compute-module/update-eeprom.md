---
sidebar_label: 'Update EEPROM'
sidebar_position: 120
---

Mars CM uses EEPROM to record SN and store DDR and eMMC information. Generally speaking, you do not need to modify the data in the eeprom. 

However, if you need to modify the data in the eeprom, you can use the following method to update the eeprom.


1. Connect to Mars CM via serial port, and press the `Enter` key to enter the U-Boot command line when it starts.

2. Short the `EEPROM_WP` pin to the ground, so that the EEPROM can be written. As shown in the figure below, use tweezers to short EN to GND.

    ![EEPROM_WP](/mars-cm/update-eeprom.webp)

3. Enter the following command in the U-Boot command line to update the EEPROM.

    ```shell
    mac product_id MARC-V10-2340-D004E032-00001234
    mac write_eeprom
    ```

    In which, `D004` represents 4GB DDR, `E032` represents 32GB eMMC, and `00001234` represents SN.

4. Restart Mars CM, and the new EEPROM information will be used.
