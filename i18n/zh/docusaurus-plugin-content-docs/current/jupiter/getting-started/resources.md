---
sidebar_label: '资源下载汇总'
sidebar_position: 70
---

# 资源下载汇总

## 操作系统镜像

版本说明：

- 后缀为 `.img.zip` 的系统镜像为 SD 卡启动专用镜像，可以通过 PC 上的 `balenaEtcher`，`Rufus`，`Win32DiskImager` 等工具烧录到 SD 中。也可以通过进迭官方工具 `titanflasher` 烧录到 SD 卡中。

- 后缀为 `.zip` 的系统镜像为进迭官方工具 `titanflasher` 使用的刷机包，可以通过读卡器烧录到 SD 卡中，也可以通过 USB Type-C 线烧录到 eMMC 或者 SSD 固态硬盘中。

操作系统的安装方法请参考：[安装操作系统](https://milkv.io/zh/docs/jupiter/getting-started/boot)。

### Ubuntu 23.10 系统

基于 Ubuntu 23.10 社区源码构建，适配 Milk-V Jupiter 的 Desktop 系统镜像。

下载链接：[https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases](https://github.com/milkv-jupiter/jupiter-ubuntu-build/releases)

Ubuntu 系统的 `root` 账户默认密码为 `milkv`。

### Bianbu 系统

Bianbu 是进迭官方推出的针对 RISC-V 架构的处理器做了深度优化的操作系统，基于 Ubuntu 社区源码构建，有 Bianbu Desktop，Bianbu Minimal 和 Bianbu NAS 等版本。

下载链接：[https://github.com/milkv-jupiter/jupiter-bianbu-build/releases](https://github.com/milkv-jupiter/jupiter-bianbu-build/releases)

Bianbu 系统的 `root` 账户默认密码为 `milkv`。

- milkv-jupiter-bianbu-\*-desktop-\*.zip

  Bianbu 桌面版本。

  :::tip
  桌面版本默认集成的 `pose-tracker` 和 `object-detection` 应用需要连接摄像头，当前硬件版本暂不支持。
  :::

  Desktop 版本的固件超过了 github 所限制的 2G 大小，所以采用了分卷压缩的方式分成了两个包上传，后缀为 `001` 和 `002`，将这两个包下载后，需要先解压为一个完整的固件包。在 Windows 或 Linux 的图形界面中，在 `.001` 文件右键直接使用 7zip 或者 winrar 等工具直接解压即可，这类工具一般都支持分卷解压缩。如果是在 Linux 命令行中解压，请参考如下在 Ubuntu 系统中的解压命令：

  - 安装 7zip 工具：
    ```
    sudo apt install p7zip-full
    ```

  - SD 卡版本固件：
    ```
    7za x milkv-jupiter-bianbu-xxx.img.zip.001
    ```
    解压后的完整固件包为：`milkv-jupiter-bianbu-xxx.img.zip`

  - eMMC 和 SSD 版本固件：
    ```
    7za x milkv-jupiter-bianbu-xxx.zip.001
    ```
    解压后的完整固件包为：`milkv-jupiter-bianbu-xxx.zip`

- milkv-jupiter-bianbu-\*-minimal-\*.zip

  Bianbu 命令行版本（无桌面）。

- milkv-jupiter-bianbu-\*-nas-\*.zip

  Bianbu NAS 版本，集成了开源 NAS 系统 `OpenMediaVault`。

  开机后通过串口中执行 `ip a` 命令或者查看路由器后台等方式获取到 Jupiter 的 IP 地址，在 PC 的浏览器中通过该 IP 访问 `OpenMediaVault` 后台 Web 界面。

  - 后台 Web 管理员账号： `admin`
  - 密码： `openmediavault`

- milkv-jupiter-bianbu-\*-kodbox-\*.zip

  Bianbu Dodbox 版本集成了可道云 `Kodbox`。Kodbox 是一款轻量易用，安全可控的开源私有网盘系统。

  开机后通过串口中执行 `ip a` 命令或者查看路由器后台等方式获取到 Jupiter 的 IP 地址，在 PC 的浏览器中通过该 IP 访问 `Kodbox` 后台 Web 界面，按照指导简单设置后即可使用。

### Fedora 41 (by [Fedora-V Force](https://github.com/fedora-riscv))

下载链接：[https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/](https://openkoji.iscas.ac.cn/pub/dist-repos/dl/Milk-V/Jupiter/images/)

系统 `root` 账户默认密码为 `riscv`。

## 硬件资源下载 

### V1.0
- 原理图：[jupiter-sch-v1_0.pdf](https://github.com/milkv-jupiter/jupiter-files/blob/main/hardware/v1_0/jupiter-sch-v1_0.pdf)
- 2d 文件：
  - top面：[jupiter-2d-top-v1_0.pdf](https://github.com/milkv-jupiter/jupiter-files/blob/main/hardware/v1_0/jupiter-2d-top-v1_0.pdf)
  - bot面：[jupiter-2d-bot-v1_0.pdf](https://github.com/milkv-jupiter/jupiter-files/blob/main/hardware/v1_0/jupiter-2d-bot-v1_0.pdf)