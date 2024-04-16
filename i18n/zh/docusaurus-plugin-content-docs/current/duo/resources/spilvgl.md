---
sidebar_label: 'SPI Display LVGL'
sidebar_position: 60
---

# 简介

该示例运行在 Duo 设备上，使用一块 240x320 分辨率的 SPI 接口显示屏，运行 LVGL 测试程序。

需准备 Milk-V Duo 开发板(或 Duo256M)、TF卡、一块 ST7789V 芯片液晶屏，这里使用的一块全彩 2.4 寸的屏幕，分辨率为 240*320，接口方式为 SPI，可按需选择不同尺寸屏幕。不同分辨率屏幕请注意下列配置时对应修改。

<Image src='/docs/duo/lvgl/duo-spi-display-gmt024-08.webp' maxWidth='90%' align='center' />

## 点亮 SPI 显示屏

### 编译固件

获取官方SDK：[https://github.com/milkv-duo/duo-buildroot-sdk.git](https://github.com/milkv-duo/duo-buildroot-sdk.git)
```
git clone https://github.com/milkv-duo/duo-buildroot-sdk.git
```

获取 Duo LVGL Demo：[https://github.com/milkv-duo/duo-lvgl-fb-demo.git](https://github.com/milkv-duo/duo-lvgl-fb-demo.git)
```
git clone https://github.com/milkv-duo/duo-lvgl-fb-demo.git
```

进入 SDK 目录，并为 SDK 的内核打一个支持 ST7789V 芯片的补丁(该补丁在上面的 duo-lvgl-fb-demo.git 仓库中)：
```
cd duo-buildroot-sdk
git apply --reject ../duo-lvgl-fb-demo/duo-kernel-fb_st7789v.patch
```

确认内核配置有打开 FB TFT 的支持（最新的 Buildroot SDK 中默认都已经支持）：
```
CONFIG_FB=y
CONFIG_FB_TFT=y
CONFIG_FB_TFT_ST7789V=y
```

内核配置文件所在的位置：
- Duo：
  ```
  build/boards/cv180x/cv1800b_milkv_duo_sd/linux/cvitek_cv1800b_milkv_duo_sd_defconfig
  ```
- Duo256M：
  ```
  build/boards/cv181x/cv1812cp_milkv_duo256m_sd/linux/cvitek_cv1812cp_milkv_duo256m_sd_defconfig
  ```
- DuoS SD：
  ```
  build/boards/cv181x/cv1813h_milkv_duos_sd/linux/cvitek_cv1813h_milkv_duos_sd_defconfig
  ```
- DuoS eMMC：
  ```
  build/boards/cv181x/cv1813h_milkv_duos_emmc/linux/cvitek_cv1813h_milkv_duos_emmc_defconfig
  ```

编译SD卡固件：

- Duo
  ```
  ./build.sh milkv-duo
  ```
- Duo256M
  ```
  ./build.sh milkv-duo256m
  ```
- DuoS SD
  ```
  ./build.sh milkv-duos-sd
  ```
- DuoS eMMC
  ```
  ./build.sh milkv-duos-emmc
  ```

编译完后，将 out 目录中对应的 img 文件烧录到 TF 卡中。

### 硬件连接

接下来根据 Duo 的引脚位置参考，进行连线配置。注意该显示屏 BL 引脚是背光使能引脚，高电平背光亮。

#### Duo 和 Duo256M

<div className='gpio_style'>

| Duo/Duo256M 物理引脚 | ST7789V  |
|:-------------------|:--------:|
| PIN 38: GND        | GND      |
| PIN 36: 3.3V(OUT)  | VCC      |
| PIN 9:  SPI2_SCK   | SCL      |
| PIN 10: SPI2_SDO   | SDA      |
| PIN 21: GP16       | RES      |
| PIN 22: GP17       | DC       |
| PIN 12: SPI2_CS_X  | CS       |
| PIN 36: 3.3V(OUT)  | BL       |

</div>

<Image src='/docs/duo/lvgl/duo-lvgl-fb-240x320.webp' maxWidth='90%' align='center' />

#### DuoS

<div className='gpio_style'>

| DuoS 物理引脚      | ST7789V  |
|:------------------|:--------:|
| PIN 25: GND       | GND      |
| PIN 17: 3V3       | VCC      |
| PIN 23: SPI3_SCK  | SCL      |
| PIN 19: SPI3_SDO  | SDA      |
| PIN 26: A28       | RES      |
| PIN 22: A18       | DC       |
| PIN 24: B16       | CS       |
| PIN  1: 3V3       | BL       |

</div>

<Image src='/docs/duo/lvgl/duos-lvgl-fb-240x320.webp' maxWidth='60%' align='center' />

### 测试屏显示是否正常

Duo 插入上面烧录好的 TF 卡，上电开机，通过串口终端或者 SSH 登陆到 Duo 的控制台，查看 ST7789V 的驱动是否正常：

```
[root@milkv-duo]~# dmesg | grep st7789v
[    0.998809] fb_st7789v spi0.0: fbtft_property_value: buswidth = 8
[    1.005243] fb_st7789v spi0.0: fbtft_property_value: debug = 0
[    1.011392] fb_st7789v spi0.0: fbtft_property_value: rotate = 0
[    1.017613] fb_st7789v spi0.0: fbtft_property_value: fps = 60
[    1.529233] graphics fb0: fb_st7789v frame buffer, 240x320, 150 KiB video memory, 4 KiB buffer memory, fps=62, spi0.0 at 48 MHz
```
如上显示则说明驱动已正常加载。

花屏测试：
```
cat /dev/random > /dev/fb0
```

清空屏幕(黑屏)：
```
cat /dev/zero > /dev/fb0
```

能正常显示花屏和黑屏，说明屏可以正常使用了。

## LVGL 测试

### 下载 LVGL frame buffer demo 源码

下载 `lv_port_linux_frame_buffer` 仓库源码, LVGL 已提供 Linux 的 fb 工程，该工程已通过 git submodule 子仓库形式集成了 lvgl 和 lvgl_drivers 两个子仓库。

该仓库已整理后集成到了前面下载的 Duo LVGL Demo 代码中，并适配 Duo 和该 SPI 显示屏，可以直接编译测试。

### 下载交叉编译工具链

下载工具链：
```
git clone https://github.com/milkv-duo/host-tools.git
```
也可以直接使用 Buildroot SDK 中 host-tools 目录，二者是一样的。

进入到工具链目录中 `export` 工具链到环境变量中：
```
cd host-tools
export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
```

验证工具链是否可用：
```
riscv64-unknown-linux-musl-gcc -v
```
能够正常显示交叉编译工具链的版本信息，即工具链可用。

### 编译 LVGL

进入 Demo 代码中的 lv_port_linux_frame_buffer 目录执行：
```
make clean
make -j
```

编译完成后，在 build/bin 目录会生成 demo 程序，通过 scp 命令拷贝到 Duo 设备上：
```
scp demo root@192.168.42.1:/root/
```
密码是 `milkv`。

通过串口或者 SSH 登陆到 Duo 的终端控制台：
```
ssh root@192.168.42.1
```

为 demo 程序添加可执行权限：
```
chmod +x demo
```

运行测试程序：
```
./demo
```

可以看到 lvgl 的 widget Demo：

<Image src='/docs/duo/lvgl/duo-lvgl-fb-01.webp' maxWidth='100%' align='center' />

*如后续运行颜色不对，可修改 `LV_COLOR_16_SWAP` 为 1。*

### 更换 Demo 为 Benchmark 测试样例

修改 `lv_conf.h` 中的宏定义，将 `LV_USE_DEMO_WIDGETS` 改为 0，`LV_USE_DEMO_BENCHMARK` 改为 1 后重新编译：

```
make clean
make -j
```

同样的方法将生成的 demo 上传到 Duo 中执行测试，注意再次上传时，Duo 中运行的 demo 程序需要先退出(Ctrl+C)。

<Image src='/docs/duo/lvgl/duo-lvgl-fb-02.webp' maxWidth='100%' align='center' />

该测试运行之后会生成统计结果：

<Image src='/docs/duo/lvgl/duo-lvgl-fb-03.webp' maxWidth='100%' align='center' />

测试结果为 FPS：100 左右。

## 参考

- [milk-v duo 交叉编译 LVGL](https://zhuanlan.zhihu.com/p/672633256)
- [milk-v duo spi TFT 液晶屏 ST7789V 使用](https://zhuanlan.zhihu.com/p/672610362)
- [【spi】Milk-V Duo点亮st7735](https://community.milkv.io/t/spi-milk-v-duo-st7735/625)
