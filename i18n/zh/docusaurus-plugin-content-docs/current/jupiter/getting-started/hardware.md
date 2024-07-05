---
sidebar_label: '硬件接口说明'
sidebar_position: 5
---

# 硬件接口说明

<Image src='/docs/jupiter/jupiter-interface.webp' maxWidth='100%' align='left' />

## 电源接口

Jupiter 主板支持以下供电方式：

- DC 接口，规格为 5.5*2.5mm，12V/3A 以上
- Type-C PD 电源适配器
- PC 标准 ATX 24 针电源
- 网口 PoE 供电（需要额外的 PoE 模块）

:::tip
Jupiter 主板功耗取决于所连接的外设功率和数量，需根据具体情况选择合适的供电方式。
:::

## Type-C 接口

- Type-C 接口可以做为烧录口，通过 PC 为板上的 `SPI FLASH`，`eMMC 模块`，`SSD 固件硬盘`安装系统相关的镜像。
- 如果您在 Jupiter 中运行的是 Bianbu Desktop 的系统，Type-C 接口默认是 Adb Device，可以在 PC 中通过 Adb 连接 Jupiter。
- 该 Type-C 接口支持 PD 供电，也就是您可以通过 PD 电源适配器为 Jupiter 供电。

## eMMC 跳线

主板上的 eMMC 跳线，我们使用时不需要短接，是可以正常烧录系统镜像到 eMMC 中并运行的，此时会使用 `SPI Flash` 中的引导程序来加载 eMMC 中的系统。

如果 eMMC 跳线短接，会禁用板上的 `SPI Flash`，这种场景下，需要在烧录系统镜像时也保持 eMMC 跳线短接，将引导程序也烧录到 eMMC 中。
