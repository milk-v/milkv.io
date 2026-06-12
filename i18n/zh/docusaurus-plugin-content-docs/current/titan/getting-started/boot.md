---
sidebar_label: '安装操作系统'
sidebar_position: 10
---

# Milk-V Titan 安装操作系统

推荐使用超睿官方发布的 Ubuntu 24.04 系统。本页面介绍如何将 Ubuntu 24.04 固件镜像烧录到 NVMe SSD 固态硬盘。

## Ubuntu 24.04

Ubuntu 24.04 固件发布地址：

[https://github.com/milkv-titan/titan-ubuntu/releases/tag/2026-0605](https://github.com/milkv-titan/titan-ubuntu/releases/tag/2026-0605)

请在 Release Assets 中下载所有分卷压缩文件，例如：

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.002
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.003
...
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.md5
```

解压前请确保所有分卷压缩文件都位于同一个目录中。

在 PC 上烧录镜像时，可以通过 M.2 NVMe USB 硬盘盒或转接器连接 SSD，也可以将 SSD 直接安装到 PC 上可用的 M.2 插槽中。

:::caution
烧录镜像会清空所选磁盘上的所有数据。继续操作前请先备份重要数据，并确认选择的是用于 Titan 的目标 SSD。如果选错磁盘，例如误选 PC 的系统盘或其他数据盘，可能会导致其中的数据被破坏。
:::

### Linux 环境

安装 7-Zip 工具：

```bash
sudo apt update
sudo apt install p7zip-full
```

从第一个分卷文件解压固件镜像：

```bash
7za x ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
```

解压后得到的固件镜像为：

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img
```

校验镜像 MD5：

```bash
md5sum -c ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.md5
```

将 NVMe SSD 固态硬盘连接到 Linux 电脑，可以使用 M.2 NVMe USB 硬盘盒或转接器，也可以将 SSD 直接插入 PC 上可用的 M.2 插槽。使用 `lsblk` 查看 SSD 的设备名：

```bash
lsblk
```

请仔细核对设备名、容量和型号，避免将镜像误写入 PC 的系统盘或其他非目标磁盘。

卸载目标 SSD 上已经挂载的分区。请将 `/dev/sdX1` 替换为 `lsblk` 中显示的实际分区名：

```bash
sudo umount /dev/sdX1
```

将镜像写入 SSD。请将 `/dev/sdX` 替换为实际的 SSD 设备名，注意这里应填写磁盘设备，而不是 `/dev/sdX1` 这样的分区名。该操作会覆盖所选磁盘：

```bash
sudo dd if=ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img of=/dev/sdX bs=4M status=progress conv=fsync
sync
```

烧录完成后，安全移除 SSD，将其安装到 Titan 主板的 M.2 M Key 插槽中，然后给主板上电启动。

### Windows 环境

安装 [7-Zip](https://www.7-zip.org/) 或其他支持 7z 分卷压缩包的解压工具。

下载所有分卷压缩文件，并将它们放在同一个文件夹中。右键点击 `.001` 文件并解压：

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img.7z.001
```

解压后得到：

```text
ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img
```

将 NVMe SSD 固态硬盘连接到 Windows 电脑，可以使用 M.2 NVMe USB 硬盘盒或转接器，也可以将 SSD 直接插入 PC 上可用的 M.2 插槽。

下载并安装 [balenaEtcher](https://etcher.balena.io/)，然后按以下步骤写入镜像：

1. 点击 `Flash from file`，选择 `ubuntu-24.04-desktop-riscv64-rvck-titan-20260605.img`。
2. 点击 `Select target`，选择用于 Titan 的目标 SSD 固态硬盘。请仔细核对磁盘名称和容量，避免误选 PC 系统盘或其他数据盘。
3. 点击 `Flash!` 开始写入镜像。

烧录完成后，安全移除 SSD，将其安装到 Titan 主板的 M.2 M Key 插槽中，然后给主板上电启动。
