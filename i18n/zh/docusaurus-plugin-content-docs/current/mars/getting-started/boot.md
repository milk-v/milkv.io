---
sidebar_label: '启动 Mars'
sidebar_position: 10
---
# 启动 Mars

## 从 microSD 卡启动 Mars

### 准备

- 必要的
  - Mars
  - 大于 16GB 的 microSD 卡
  - Type-C 线
- 可选的
  - USB to TTL 串口模块
  - HDMI 线

### 下载镜像和工具

- 下载 [官方镜像](https://milkv.io/zh/docs/mars/getting-started/images#%E5%AE%98%E6%96%B9%E9%95%9C%E5%83%8F)。
- 下载镜像烧录工具 [balenaEtcher](https://etcher.balena.io/) 或 [Rufus](https://rufus.ie/en/)。

### 烧录镜像

以下是使用 BalenaEtcher 的步骤。

- 点击 **Flash from file**

![etcher-step1](/docs/duo/etcher-step1.png)

- 点击 **Select target**

![etcher-step2](/docs/duo/etcher-step2.png)

- 点击 **Flash!**

![etcher-step3](/docs/duo/etcher-step3.png)

### 开机

将烧录好固件的 microSD 卡插入 Mars 的 microSD 卡槽中。使用适配器 (5V) 通过 Type-C 线连接 Mars，Mars 会自动上电开机，板上的红色电源灯会亮起。待系统启动成功后，板上的绿色状态灯会闪烁。

如果有连接 HDMI 显示器，开机后会显示 Debian 桌面。

### 故障排除

如果您有问题，请到我们的[社区](https://community.milkv.io/)发帖，让我们知道。


## 从 U 盘启动 Mars

* 注意：U 盘启动步骤有点复杂，建议使用 microSD 卡启动 Mars。U 盘只能插在 USB3.0 口。

使用串口线连接到 Mars 的串口调试口，在 Mars 上电的时候按任意按键打断启动，进入 U-Boot 命令行。

在 U-Boot 命令行中输入以下命令：

```bash
setenv boot_devs 'mmc nvme usb'
setenv distro_bootenv_usb 'setenv bootdev usb; setenv devnum 0; run usb_boot'
saveenv
```

下载镜像烧录到 U 盘。使用 microSD 卡启动 Mars，把 U 盘插入 Mars 中，修改 U 盘里的 extlinux.conf 文件。

```bash
sudo mount /dev/sda3 /mnt
sudo nano /mnt/extlinux/extlinux.conf
```

在 `extlinux.conf` 中修改 `APPEND` 行，把 `root=/dev/mmcblk1p4` 改成 `root=/dev/sda4`，如下所示：

```bash
append root=/dev/sda4 rw console=tty0 console=ttyS0,115200 earlycon rootwait stmmaceth=chain_mode:1 selinux=0
```

保存并退出，卸载 U 盘。关机，拔掉 microSD 卡，重新上电开机。
