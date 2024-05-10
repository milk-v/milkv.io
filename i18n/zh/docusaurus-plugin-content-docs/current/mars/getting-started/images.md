---
sidebar_label: '镜像下载'
sidebar_position: 45
---

# 镜像下载

## 官方镜像

### Debian

下载链接：[https://github.com/milkv-mars/mars-buildroot-sdk/releases/](https://github.com/milkv-mars/mars-buildroot-sdk/releases/)

镜像说明：

- Mars SD 卡镜像
  ```
  mars_debian-desktop_sdk-v*_sdcard_v*.img.zip
  ```
  下载后参考 [镜像烧录](https://milkv.io/zh/docs/mars/getting-started/boot#%E7%83%A7%E5%BD%95%E9%95%9C%E5%83%8F) 章节将镜像烧录到 microSD 卡中。然后将 microSD 卡插入 Mars 中上电开机。

- Mars eMMC 镜像
  ```
  mars_debian-desktop_sdk-v*_emmc_v*.img.zip
  ```

默认的用户名和密码为：
```
用户: user
密码: milkv
```

## 第三方镜像

### Ubuntu 24.04 (Noble Numbat)

Ubuntu 官方发布的 Ubuntu 24.04 已经提供了支持 Milk-V Mars 的 server 版本。

下载地址： [https://cdimage.ubuntu.com/releases/24.04/release/](https://cdimage.ubuntu.com/releases/24.04/release/)

下载预安装的服务器版本镜像： [ubuntu-24.04-preinstalled-server-riscv64+milkvmars.img.xz](https://cdimage.ubuntu.com/releases/24.04/release/ubuntu-24.04-preinstalled-server-riscv64+milkvmars.img.xz)

下载后参考 [镜像烧录](https://milkv.io/zh/docs/mars/getting-started/boot#%E7%83%A7%E5%BD%95%E9%95%9C%E5%83%8F) 章节将镜像烧录到 microSD 卡中。

#### 更新 Flash 固件

Mars SPI Flash 中出厂默认的 U-boot 固件暂时不支持引导 Ubuntu 镜像，需要手动更新上游源构建的 U-boot，该 U-boot 已经包含在了 Ubuntu 24.04 Mars 的镜像中。我们需要通过串口控制台登陆到 Mars 原有的 U-boot 中，通过命令来将 Ubuntu 镜像中的 U-boot 更新到 Flash 中。

- 连接串口

  参考 [使用串口](https://milkv.io/zh/docs/mars/getting-started/setup#%E4%BD%BF%E7%94%A8%E4%B8%B2%E5%8F%A3) 章节中的方法连接好串口线。

- 登陆到 U-boot 串口控制台

  将烧录好 Ubuntu 镜像的 microSD 卡插入 Mars，上电开机，在串口终端中出现 `Hit any key to stop autoboot` 时迅速按下回车键，进入 U-boot 命令行终端：
  ```python {6}
  In:    serial
  Out:   serial
  Err:   serial
  Model: StarFive VisionFive V2
  Net:   eth0: ethernet@16030000, eth1: ethernet@16040000
  Hit any key to stop autoboot:  0
  StarFive #
  ```

- 依次输入下列命令

  ```txt showLineNumbers
  sf probe
  load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/u-boot-spl.bin.normal.out
  sf update $kernel_addr_r 0 $filesize
  load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/u-boot.itb
  sf update $kernel_addr_r 0x100000 $filesize
  ```

  正常执行以上命令时效果如下：

  ```
  StarFive # sf probe
  SF: Detected gd25lq128 with page size 256 Bytes, erase size 4 KiB, total 16   MiB
  StarFive # load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/  u-boot-spl.bin.normal.out
  141935 bytes read in 20 ms (6.8 MiB/s)
  StarFive # sf update $kernel_addr_r 0 $filesize
  device 0 offset 0x0, size 0x22a6f
  141935 bytes written, 0 bytes skipped in 0.679s, speed 213110 B/s
  StarFive # load mmc 1:1 $kernel_addr_r /usr/lib/u-boot/starfive_visionfive2/  u-boot.itb
  1041691 bytes read in 60 ms (16.6 MiB/s)
  StarFive # sf update $kernel_addr_r 0x100000 $filesize
  device 0 offset 0x100000, size 0xfe51b
  963867 bytes written, 77824 bytes skipped in 7.199s, speed 148089 B/s
  StarFive #
  ```

- 重置 U-boot 环境变量

  重新上电，开机时再次按回车键进入 U-boot 命令行终端，执行如下命令：
  ```
  env default -f -a
  env save
  ```

:::tip
如果更新 Flash 固件失败导致 Mars 不能正常启动，或者需要将 Flash 固件刷回默认固件时，可以参考 [Bootloader 升级](https://milkv.io/zh/docs/mars/getting-started/bootloader) 章节，重新烧录 Flash 出厂固件。
:::

#### 开机启动

更新完 Flash 固件后，再次重新上电开机，就可以正常引导 Mars 的 Ubuntu 24.04 Server 系统了。

第一次启动时，请等到看到输出行确认 cloud-init 已完成。Cloud init 负责生成 SSH 密钥并设置默认密码。等待其完成后才能正常登录。看到串口如下输出时说明该过程已完成：

```
cloud-init[1055]: Cloud-init v. 24.1.3-0ubuntu3 finished at Fri, 19 Apr 2024 14:25:56 +0000. Datasource DataSourceNoCloud [seed=/var/lib/cloud/seed/nocloud-net][dsmode=net].  Up 93.71 seconds
```

现在您可以使用以下默认账号和密码登陆，首次登陆时会要求设置一个新的密码：
```
用户：ubuntu
密码: ubuntu
```
