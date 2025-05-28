---
sidebar_label: '资源下载汇总'
sidebar_position: 60
---

# 资源下载汇总

## 官方镜像

官方镜像基于 Buildroot 构建，目前有两个版本。

:::tip
- V1 版本镜像只支持 RISCV 核。（建议 Duo 64M 使用该版本）
- V2 版本镜像既支持 RISCV 核，也支持 ARM 核。(建议 Duo256M 和 DuoS 使用该版本)
:::

*建议 Duo 64M 选用 V1 版本的镜像，主要是由于其内存较小，V2 版本的镜像中相关的 AI 应用目前还无法在 Duo 64M 中正常运行。*

### V1 版本镜像

镜像地址: [https://github.com/milkv-duo/duo-buildroot-sdk/releases/](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)

### V2 版本镜像

V2 版本支持 Duo256M 和 DuoS 的 RISC-V 核和 ARM 核的镜像。

镜像地址：[https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/)

### 镜像描述

默认启用 ssh。

默认启用 USB-NCM 网络。

蓝色 LED 闪烁。

root 密码: `milkv`
使用 ssh 通过 USB-NCM 登录：
~~~bash
ssh root@192.168.42.1
~~~

如果需要关闭 LED 闪烁功能：
```bash
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
然后执行 `reboot` 命令或者重新上电。

也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不闪烁了。

如果需要恢复 LED 闪烁，再将其名字改回来，重启即可：
```bash
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```
然后执行 `reboot` 命令或者重新上电。

### 官方SDK

如果您需要自行构建镜像，请参考文档：[Buildroot SDK](https://milkv.io/zh/docs/duo/getting-started/buildroot-sdk)

## 第三方镜像

:::caution
第三方镜像未经过严格测试，可能会存在未知问题，仅用于评估使用。
:::

### Duo (CV1800B)

<div className='gpio_style'>

| OS | Download Link | Guide Link | Author |
|:---- |:---- |:---- |:---- |
| Fedora 41 | [Download](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/Duo/images/latest/) | - | Fedora-V Force |
| Arch Linux | [Download](https://drive.google.com/file/d/1Qf8ioR29KCsvt2MIWre168Um9Q8ot_z5/view?usp=sharing) | [Milk-V Community](https://community.milkv.io/t/arch-linux-on-milkv-duo-milkv-duo-arch-linux/329) [Milk-V Community](https://community.milkv.io/t/debian-arch-linux-on-milkv-duo-256m-milkv-duo-256m-debian-arch-linux/1110) | [@Judehahh](https://community.milkv.io/u/Judehahh) [@sRGB](https://community.milkv.io/u/srgb/summary) |
| AlpineLinux | [Download](https://drive.google.com/file/d/1LfebzdIubEVe0RRMwWAD5QA5LjK-8sv5/view?usp=drive_link) | [Github](https://github.com/cwt/duo-buildroot-sdk/releases/tag/poc1) [Milk-V Community](https://community.milkv.io/t/alpine-linux-on-the-duo/700/5) | [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#AlpineLinux_Disk_Image) [@cwt](https://github.com/cwt) |
| Ubuntu 22.04 | [Download](https://drive.google.com/file/d/1y1NQamzUDzot_kVT2yKkbusoJmtvH5tD/view?usp=sharing) | [Github](https://github.com/bassusteur/milkv-duo-ubuntu) [Milk-V Community](https://community.milkv.io/t/ubuntu-on-the-milk-v-duo/960) | [@bassusteur](https://github.com/bassusteur) [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#Ubuntu_Disk_Image) |
| Debian | [Download](https://drive.google.com/file/d/1TqMuFsRo5Es2Y6-qAyxV8jnFdAkcCp4v/view?usp=sharing) | [Milk-V Community](https://community.milkv.io/t/milkv-duo-duo-debian-full-7z-519m-download/862) [Github](https://github.com/hongwenjun/riscv64/tree/main/milkv-duo) | [@sRGB](https://community.milkv.io/u/srgb/summary) |
| Fedora-RISCV-Builder | [Learn more](https://github.com/chainsx/fedora-riscv-builder) | [Github](https://github.com/chainsx/fedora-riscv-builder) | [@chainsx](https://github.com/chainsx) |
| Debian/Ubuntu image builder | [Learn more](https://community.milkv.io/t/milk-v-duo-debian-ubuntu-image-builder/1424) | [Github](https://github.com/logicethos/Milk-V_Duo_Linux2SD) | [@Logic Ethos Ltd](https://github.com/logicethos) |
| OpenWRT | [Learn more](https://github.com/Pillar1989/VizOS) | [Milk-V Community](https://community.milkv.io/t/openwrt-on-milkv-duo-milkv-duo-openwrt/1025) | [@Baozhu](https://community.milkv.io/u/Baozhu) [@Pillar1989](https://github.com/Pillar1989) |
| Zephyr | [Download](https://github.com/kinsamanka/milkv-zephyros/releases/download/v0.1.1-alpha/milkv-duo_sdcard.img.gz) | [Github](https://github.com/kinsamanka/milkv-zephyros) | [@kinsamanka](https://github.com/kinsamanka) |
| Yocto | [Learn more](https://github.com/kinsamanka/meta-milkv/blob/master/README.md) | [Github](https://github.com/kinsamanka/meta-milkv) | [@kinsamanka](https://github.com/kinsamanka) |
| RT-Thread | [Learn more](https://github.com/RT-Thread/rt-thread/tree/master/bsp/cvitek) | [Github](https://github.com/RT-Thread/rt-thread/tree/master/bsp/cvitek)  [RISC-V RT-Thread Programming Guide](https://riscv-rtthread-programming-manual.readthedocs.io/zh-cn/latest/) | [@hflyingcys](https://github.com/flyingcys) |
| ThreadX | [Learn more](https://github.com/saicogn/ThreadX-to-RISC-V64) | [Github](https://github.com/saicogn/ThreadX-to-RISC-V64) | [@hsaicogn](https://github.com/saicogn) |

</div>

### Duo 256M (SG2002)

<div className='gpio_style'>

| OS | Download Link | Guide Link | Author |
|:---- |:---- |:---- |:---- |
| Fedora 41 | [Download](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/Duo256M/images/latest/) | - | Fedora-V Force |
| Debian | [Download](https://github.com/Fishwaldo/sophgo-sg200x-debian/releases/tag/v1.2.0) | [Github](https://github.com/Fishwaldo/sophgo-sg200x-debian) | [@Fishwaldo](https://github.com/Fishwaldo) |
| Ubuntu 22.04 | [Download](https://drive.google.com/file/d/1mkzLhvtjJup3GbgWKZdwL80PZMMXg7n1/view) | [Github](https://github.com/bassusteur/milkv-duo-ubuntu) [Milk-V Community](https://community.milkv.io/t/ubuntu-on-the-milk-v-duo/960) | [@bassusteur](https://github.com/bassusteur) [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#Ubuntu_Disk_Image) |
| Arch Linux | [Download](https://drive.google.com/file/d/16qJTmEtFFTkS-mIRFdaj4Prbi2QezjMI/view) | [Milk-V Community](https://community.milkv.io/t/arch-linux-on-milkv-duo-milkv-duo-arch-linux/329) [Milk-V Community](https://community.milkv.io/t/debian-arch-linux-on-milkv-duo-256m-milkv-duo-256m-debian-arch-linux/1110) | [@Judehahh](https://community.milkv.io/u/Judehahh) [@sRGB](https://community.milkv.io/u/srgb/summary) |
| AlpineLinux  | [Download](https://drive.google.com/file/d/1zhhB6AdgvjjuzBWjY6TchdX5b0uNWzP-/view) | [Github](https://github.com/cwt/duo-buildroot-sdk/releases/tag/poc1) [Milk-V Community](https://community.milkv.io/t/alpine-linux-on-the-duo/700/5) | [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#AlpineLinux_Disk_Image) [@cwt](https://github.com/cwt) |

</div>

### Duo S (SG2000)

<div className='gpio_style'>

| OS | Download Link | Guide Link | Author | Account and Password |
|:---- |:---- |:---- |:---- |:---- |
| Fedora 41 | [Download](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/DuoS/images/latest/) | - | Fedora-V Force | root/riscv |
| Debian | [Download](https://github.com/Fishwaldo/sophgo-sg200x-debian/releases) | [Github](https://github.com/Fishwaldo/sophgo-sg200x-debian) | [@Fishwaldo](https://github.com/Fishwaldo) | |
| NuttX | [Learn more](https://github.com/lupyuen/nuttx-sg2000) | [Github](https://github.com/lupyuen/nuttx-sg2000) | [@lupyuen](https://github.com/lupyuen) | |

</div>
