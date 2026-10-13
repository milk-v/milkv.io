---
sidebar_label: 'openKylin SP2'
sidebar_position: 3
---

# openKylin SP2

推荐使用超睿官方发布的适用于 Milk-V Titan 的系统。本页面介绍如何将 openKylin 镜像制作成启动 U 盘，并通过安装程序安装到 NVMe SSD 固态硬盘。

## 下载镜像

从 openKylin 官方或项目发布页面下载适用于 Milk-V Titan 的镜像：

[openKylin-ultrarisc-titan-2.0sp2-riscv64](https://bj30886.apps.aliyunfile.com/disk/s/ekZ6yZbox2V?domainId=bj30886)

:::caution
制作启动 U 盘会清空所选 U 盘上的所有数据；安装系统会清空目标 NVMe SSD 上的所有数据。继续操作前请先备份重要数据，并确认选择的是目标 U 盘和 SSD。如果选错设备，例如误选 PC 系统盘或其他数据盘，可能会导致其中的数据被破坏。
:::

:::tip
安装过程中会创建用户名和密码，请牢记。首次进入系统后，建议联网更新软件源。
:::

## 准备工具

1. **balenaEtcher**：在 Windows PC 上下载并安装 [balenaEtcher](https://etcher.balena.io/)。
2. **U 盘**：建议 8 GB 及以上。
3. 可选：Linux 环境下也可使用 `dd` 制作启动 U 盘。

## 制作启动 U 盘

### Windows 环境

安装 balenaEtcher，然后按以下步骤写入镜像：

1. 点击 `Flash from file`，选择 openKylin ISO。
2. 点击 `Select target`，选择目标 U 盘。
3. 点击 `Flash`，等待完成。
4. 完成后安全弹出 U 盘。

### Linux 环境

使用 `lsblk` 查看 U 盘设备名：

```bash
lsblk
```

请仔细核对设备名、容量和型号，避免将镜像误写入 PC 的系统盘或其他非目标磁盘。

卸载目标 U 盘上已挂载的分区。将 `/dev/sdX1` 替换为实际分区名；如有多个分区，逐个卸载：

```bash
sudo umount /dev/sdX1
```

将镜像写入 U 盘：

```bash
sudo dd if=openKylin-ultrarisc-titan-2.0sp2-riscv64-20260622.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

将 `/dev/sdX` 和镜像名称替换为实际的 U 盘设备名和镜像，注意这里应填写磁盘设备，而不是 `/dev/sdX1` 这样的分区名。

## 安装到 Milk-V Titan

1. 将目标 NVMe SSD 安装到 Titan 主板 M.2 插槽。
2. 插入 openKylin U 盘，连接显示器、键盘鼠标，可接网线。
3. 给 Titan 上电，选择从 U 盘启动，进入 Live 环境。
4. 安装前检查系统时间：

```bash
date
```

如果时间为 1970，先手动设置时间，例如：

```bash
date -s "2026-08-03 10:00:00"
```

:::tip
可安装 RTC CR1220 纽扣电池，避免在无网络情况下断电后系统时间丢失。
:::

5. 点击桌面上的安装程序，启动安装程序，根据提示完成安装，选择安装位置：

- 全盘安装：选择目标 NVMe SSD，例如 `/dev/nvme0n1`。
- 自定义安装：手动创建 EFI、根分区、交换分区等。

6. 创建用户名和密码，开始安装。
7. 安装完成后重启，重启前根据屏幕提示拔出 U 盘。

## 启动

1. 确保 U 盘已拔出。
2. 给 Titan 上电，系统从 NVMe SSD 启动。
3. 使用安装时创建的用户名和密码登录。
