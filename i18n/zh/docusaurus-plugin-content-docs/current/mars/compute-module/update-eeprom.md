---
sidebar_label: 'Update EEPROM'
sidebar_position: 120
---

Mars CM 使用 EEPROM 记录 SN 并存储 DDR 和 eMMC 信息。一般来说，您不需要修改 eeprom 中的数据。

但是，如果您需要修改 eeprom 中的数据，您可以使用以下方法更新 eeprom。


1. 通过串口连接 Mars CM，在它启动的时候，按下 `Enter` 键进入 U-Boot 命令行。

2. 短接 `EEPROM_WP` 引脚到地，使 EEPROM 可以被写入。如下图所示，请使用镊子短接 EN 与 GND。

    ![EEPROM_WP](/mars-cm/update-eeprom.webp)

3. 在 U-Boot 命令行中输入以下命令，更新 EEPROM。

    ```shell
    mac product_id MARC-V10-2340-D004E032-00001234
    mac write_eeprom
    ```

    其中，`D004` 代表 4GB DDR，`E032` 代表 32GB eMMC，`00001234` 代表 SN。

4. 重启 Mars CM，新的 EEPROM 信息将被使用。
