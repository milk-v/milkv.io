---
sidebar_label: 'Fedora 44'
sidebar_position: 2
---

# Fedora 44

本页面介绍如何将 Fedora 44 系统镜像烧录到 NVMe SSD 固态硬盘，并完成首次启动前必须的 GRUB 配置。

:::info
Fedora Server 默认没有桌面环境，是纯字符界面。默认登录用户名为 `fedora`，密码为 `linux`。
:::

## 下载 Fedora 镜像

推荐使用 Fedora 44 RISC-V 镜像目录中的 Fedora Server Host Omni 镜像：

[https://dl.fedoraproject.org/pub/alt/risc-v/release/44/Server/riscv64/images/](https://dl.fedoraproject.org/pub/alt/risc-v/release/44/Server/riscv64/images/)

Fedora Project 也提供了 Milk-V Titan 相关说明：

[https://fedoraproject.org/wiki/Architectures/RISC-V/Milk-V/Titan](https://fedoraproject.org/wiki/Architectures/RISC-V/Milk-V/Titan)

选择目录中最新的 Omni 镜像，例如：

```text
Fedora-Server-Host-Omni-44-20260731.0.riscv64.raw.xz
Fedora-Server-Host-Omni-44-20260731.0.riscv64.raw.xz.sha256
```

注意：

- Fedora 镜像不是分卷压缩包，只需要下载 `.raw.xz` 和对应的 `.sha256` 校验文件。
- 如果目录中已有更新版本，请用最新 Omni 镜像替换上面的文件名。
- 除非有特殊需求，否则优先选择 Omni 镜像。

## 准备工具与硬件

在 Windows PC 上准备：

1. **balenaEtcher**：下载并安装 [balenaEtcher](https://etcher.balena.io/)。
2. **M.2 NVMe USB 硬盘盒或转接器**：用于将目标 SSD 连接到 PC。
3. **目标 NVMe SSD**：用于 Titan 的固态硬盘。

:::caution
烧录会清空所选磁盘上的所有数据。请先备份重要数据，并确认选择的是用于 Titan 的目标 SSD。
:::

## 烧录镜像

### 连接 SSD

将 NVMe SSD 固态硬盘连接到电脑，可以使用 M.2 NVMe USB 硬盘盒或转接器，也可以将 SSD 直接插入 PC 上可用的 M.2 插槽。

### 打开 balenaEtcher

按以下步骤写入镜像：

1. 点击 `Flash from file`，选择 Fedora 镜像。
2. 点击 `Select target`，选择用于 Titan 的目标 SSD 固态硬盘。请仔细核对磁盘名称和容量，避免误选 PC 系统盘或其他数据盘。
3. 点击 `Flash!` 开始写入镜像。

## 修改 GRUB 配置

Fedora 在 Milk-V Titan 上首次启动前，必须修改镜像第二分区的 GRUB 条目，加入设备树和串口控制台。

由于 balenaEtcher 是在 Windows 下写盘，而 Fedora 的第二分区通常是 Linux 文件系统，Windows 无法直接编辑。推荐以下方式之一：

- 将 SSD 接到一台 Linux 电脑，挂载第二分区修改。
- 使用 Linux 虚拟机或 WSL2 挂载该 SSD 的物理磁盘后修改。

以下以 Linux 环境为例。

### 查看 SSD 设备名

```bash
lsblk
```

假设目标 SSD 为 `/dev/sdX`，第二分区为 `/dev/sdX2`。请仔细核对设备名、容量和型号，避免将镜像误写入 PC 的系统盘或其他非目标磁盘。

### 挂载第二分区

```bash
sudo mount /dev/sdX2 /mnt
```

### 找到 GRUB 条目和实际内核版本

```bash
ls /mnt/loader/entries/
ls -d /mnt/dtb-*
ls /mnt/vmlinuz-* /mnt/initramfs-*.img
```

会看到类似：

```text
/mnt/loader/entries/b1dbf716b91d4a2eab2cf655009b46f4-7.1.5-201.0.riscv64.omni.fc44.riscv64.conf
```

以及：

```text
/mnt/dtb-7.1.5-201.0.riscv64.omni.fc44.riscv64/ultrarisc/dp1000.dtb
```

:::note
版本号必须使用实际看到的版本，不能照抄示例。
:::

### 编辑对应的 `.conf` 文件

```bash
sudo nano /mnt/loader/entries/<实际文件名>.conf
```

在文件底部添加一行：

```text
devicetree /dtb-<实际内核版本>/ultrarisc/dp1000.dtb
```

例如：

```text
devicetree /dtb-7.1.5-201.0.riscv64.omni.fc44.riscv64/ultrarisc/dp1000.dtb
```

同时找到 `options` 行，在末尾追加：

```text
console=ttyS0,115200
```

改完后整个文件内容参考：

```text
title Fedora Linux (7.1.5-201.0.riscv64.omni.fc44.riscv64) 44 (Server Edition)
version 7.1.5-201.0.riscv64.omni.fc44.riscv64
linux /vmlinuz-7.1.5-201.0.riscv64.omni.fc44.riscv64
initrd /initramfs-7.1.5-201.0.riscv64.omni.fc44.riscv64.img
options earlycon root=UUID=b9a65dd6-1b90-47d1-99d1-de47f85e5809 rootflags=subvol=root console=ttyS0,115200
grub_users $grub_users
grub_arg --unrestricted
grub_class fedora
devicetree /dtb-7.1.5-201.0.riscv64.omni.fc44.riscv64/ultrarisc/dp1000.dtb
```

### 保存并卸载

卸载分区：

```bash
sync
sudo umount /mnt
```

安全移除 SSD。

## 安装到 Milk-V Titan 并启动

1. 将 SSD 安装到 Titan 主板的 M.2 M Key 插槽中。
2. 给主板上电启动。
3. 启动后登录：

```text
用户名：fedora
密码：linux
```

<Image src='/docs/titan/getting-started/install-os/fedora-login-console.webp' maxWidth='100%' align='left' />

## 启动后配置 GRUB

为确保内核更新后仍能正常启动，登录 Fedora 后编辑：

```bash
sudo nano /etc/default/grub
```

修改或添加以下内容：

```text
GRUB_CMDLINE_LINUX_DEFAULT="earlycon rootflags=subvol=root console=ttyS0,115200"
GRUB_DEVICETREE="ultrarisc/dp1000.dtb"
GRUB_TERMINAL_INPUT="serial"
GRUB_TERMINAL_OUTPUT="serial"
```

完整示例：

```text
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_DISABLE_RECOVERY=true
GRUB_CMDLINE_LINUX_DEFAULT="earlycon rootflags=subvol=root console=ttyS0,115200"
GRUB_ENABLE_BLSCFG=true
GRUB_GFXMODE=auto
GRUB_TERMINAL_INPUT="serial"
GRUB_TERMINAL_OUTPUT="serial"
GRUB_TIMEOUT=3
GRUB_TIMEOUT_STYLE=menu
GRUB_DEVICETREE="ultrarisc/dp1000.dtb"
```

保存后重新生成 GRUB 配置：

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

## 可选调整

### 禁止 MMC 报错刷屏

如果串口控制台不断出现类似信息：

<Image src='/docs/titan/getting-started/install-os/fedora-mmc-warning.webp' maxWidth='100%' align='left' />

临时禁用：

```bash
sudo rmmod spi_dw_mmio
```

永久禁用：

```bash
echo "blacklist spi_dw_mmio" | sudo tee /etc/modprobe.d/spi_dw_mmio.conf
sudo dracut --force
```

### 固定 MAC 地址

如果 MAC 地址每次启动变化，可固定：

```bash
nmcli connection show
sudo nmcli connection modify "Wired connection 1" ethernet.cloned-mac-address 70:48:f7:1a:2b:3c
```

将 `"Wired connection 1"` 和 MAC 地址替换为需要的。

## Cockpit Web 控制台

Fedora Server 提供了基于 Web 的图形化管理工具 Cockpit，可以通过浏览器在另一台电脑上管理和监控 Titan 的状态。

### 通过浏览器访问

确保你用于访问的机器和 Titan 在同一个网段，在浏览器中打开：

```text
https://IP:9090
```

:::note
因为使用的是自签名证书，浏览器可能会提示“不安全”，点击“高级”并继续前往即可。
:::

### 登录界面

打开后会看到 Fedora Linux Server Edition 的登录页面。在输入框中填写：

- **用户名**：`fedora`
- **密码**：`linux`

<Image src='/docs/titan/getting-started/install-os/fedora-cockpit-login.webp' maxWidth='100%' align='left' />

点击 **登录** 后，即可进入 Web 管理界面，在这里可以查看系统日志、管理用户和终端等。
