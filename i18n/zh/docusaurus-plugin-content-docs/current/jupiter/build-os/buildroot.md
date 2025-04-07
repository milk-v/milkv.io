---
sidebar_label: '使用 Buildroot SDK'
sidebar_position: 10
---

# 使用 Buildroot SDK

## 交叉编译

:::tip
这里的交叉编译是指在 X86 的 PC 上编译 Jupiter 的固件。
:::

### 开发环境

#### 硬件配置

推荐配置：

- CPU：12th Gen Intel(R) Core(TM) i5 或以上
- Memory：16GB 或以上
- Disk：SSD，256GB 或以上

#### 操作系统

推荐 Ubuntu 20.04，其他 Linux 发行版本尚未测试。

#### 安装依赖

- Ubuntu 16.04 and 18.04
  ```bash
  sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip zip
  ```
  ```bash
  sudo pip3 install pyyaml
  ```

- Ubuntu 20.04
  ```bash
  sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 python-is-python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip zip
  ```
  ```bash
  sudo pip3 install pyyaml
  ```

### 下载源码

使用 repo（版本 >= 2.41）下载完整SDK。如果没有 repo，请参考 [Git Repo 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/git-repo/) 安装。

使用 repo 前请检查 git 环境是否配置了 user 信息，如果没有配置，可以参考如下命令配置：

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

创建并进入工作目录：
```bash
mkdir jupiter-linux
cd jupiter-linux
```

下载代码，例如下载 `k1-bl-v2.1.y` 分支：
```bash
repo init -u https://github.com/milkv-jupiter/manifests.git -b main -m k1-bl-v2.1.y.xml
repo sync
repo start k1-bl-v2.1.y --all
```

后续需要同步最新的代码时，直接执行 `repo sync` 即可。

Buildroot 在编译过程中，会下载一些源码包，为避免因网络原因出现下载失败的情况，可以使用如下命令提前从 spacemit 服务器下载所需的源码包：
```bash
wget -c -r -nv -np -nH -R "index.html*" http://archive.spacemit.com/buildroot/dl
```
下载的源码包在 `buildroot/dl` 目录中。

目录结构：
```
├── bsp-src               # Linux kernel，uboot and opensbi source code
│   ├── linux-6.6
│   ├── opensbi
│   └── uboot-2022.10
├── buildroot             # Buildroot main directory
│   ├── dl                # Buildroot dependent packages
├── buildroot-ext         # Customized ext, such as board, configs, package, and patches
├── Makefile              # Top Makefile
├── package-src           # Locally deployed application or library source directory
│   ├── ai-support
│   ├── drm-test
│   ├── factorytest
│   ├── glmark2
│   ├── img-gpu-powervr
│   ├── jetson-utils
│   ├── k1x-cam
│   ├── k1x-jpu
│   ├── k1x-vpu-firmware
│   ├── k1x-vpu-test
│   ├── mesa3d
│   ├── mpp
│   ├── rtk_hciattach
│   ├── usb-gadget
│   └── v2d-test
└── scripts               # Scripts used during compilation
```

### 首次完整编译

首次编译，建议使用 `make envconfig` 完整编译。后续如果修改了 `buildroot-ext/configs/spacemit_k1_v2_defconfig`，要使用 `make envconfig` 编译。其他情况，使用 `make` 编译即可。

```bash
make envconfig
Available configs in buildroot-ext/configs/:
  1. spacemit_k1_minimal_defconfig
  2. spacemit_k1_plt_defconfig
  3. spacemit_k1_rt_defconfig
  4. spacemit_k1_upstream_defconfig
  5. spacemit_k1_v2_defconfig
\n
your choice (1-5):
```
输入 `5`，然后回车即开始编译。

编译完成，可以看到：
```
Images successfully packed into /build/jupiter-linux/local/output/k1_v2/images/bianbu-linux-k1_v2.zip


Generating sdcard image...................................
INFO: cmd: "mkdir -p "/build/jupiter-linux/local/output/k1_v2/build/genimage.tmp"" (stderr):
INFO: cmd: "rm -rf "/build/jupiter-linux/local/output/k1_v2/build/genimage.tmp"/*" (stderr):
INFO: cmd: "mkdir -p "/build/jupiter-linux/local/output/k1_v2/images"" (stderr):
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'bootinfo' from 'factory/bootinfo_sd.bin' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'fsbl' (in MBR) from 'factory/FSBL.bin' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'env' (in MBR) from 'env.bin' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'opensbi' (in MBR) from 'fw_dynamic.itb' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'uboot' (in MBR) from 'u-boot.itb' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'bootfs' (in MBR) from 'bootfs.img' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition 'rootfs' (in MBR) from 'rootfs.ext4' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition '[MBR]' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition '[GPT header]' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition '[GPT array]' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): adding partition '[GPT backup]' ...
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): writing GPT
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): writing protective MBR
INFO: hdimage(bianbu-linux-k1_v2-sdcard.img): writing MBR
Successfully generated at /build/jupiter-linux/local/output/k1_v2/images/bianbu-linux-k1_v2-sdcard.img
make[1]: Leaving directory '/build/jupiter-linux/local/output/k1_v2'
```

生成的镜像有两个：

- bianbu-linux-k1_v2.zip 适用于 titanflasher  工具，或者解压后用 fastboot 刷机。
- bianbu-linux-k1_v2-sdcard.img 为 sd 卡固件，解压后可以用 dd 命令或者 balenaEtcher 写入 sd 卡。

详细的刷机方法请参考：[Milk-V Jupiter 安装操作系统](https://milkv.io/zh/docs/jupiter/getting-started/boot)。

固件默认用户名：`root`，密码：`bianbu`。

### 修改配置

如果默认的配置不满足您的需求，比如需要修改 kernel，或者添加 buildroot 的包，可以参考如下方法修改后，重新编译。

#### Buildroot

调出 buildroot 的配置界面：
```bash
make menuconfig
```
根据需求调整好配置后，保存配置，默认保存到 `buildroot-ext/configs/spacemit_k1_v2_defconfig`：
```bash
make savedefconfig
```

#### Linux Kernel

调出 kernel 的配置界面：
```bash
make linux-menuconfig
```
根据需求调整好配置后，保存配置，默认保存到 `bsp-src/linux-6.6/arch/riscv/configs/k1_defconfig`：
```bash
make linux-update-defconfig
```

#### U-boot

调出 u-boot 的配置界面：
```bash
make uboot-menuconfig
```
根据需求调整好配置后，保存配置，默认保存到 `bsp-src/uboot-2022.10/configs/k1_defconfig`：
```bash
make uboot-update-defconfig
```

### 编译指定包

#### u-boot

编译 u-boot：
```bash
make uboot-rebuild
```

#### kernel

编译 kernel：
```bash
make linux-rebuild
```

#### buildroot

buildroot 支持编译指定的 package，可以 `make help` 查看指南。

常用命令：

- 删除 `<pkg>` 的编译目录：`make <pkg>-dirclean`
- 编译 `<pkg>` ：`make <pkg>`

编译指定包之后，可以单独下载到设备验证，或者编进固件：
```bash
make
```

### 单独编译引导程序和内核

如果不需要编译整个镜像，只编译 opensbi、u-boot、linux kernel，可以使用如下方法分别单独编译。

交叉编译器下载地址：[http://archive.spacemit.com/toolchain/](http://archive.spacemit.com/toolchain/)，解压即可使用。

设置环境变量：
```bash
export PATH=/path/to/spacemit-toolchain-linux-glibc-x86_64-v0.3.3/bin:$PATH
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

#### 单独编译 opensbi

```bash
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```

#### 单独编译 u-boot

```bash
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```

编译会根据 `board/spacemit/k1-x/k1-x.env` 生成 `u-boot-env-default.bin`，对应分区表 `env` 分区的镜像。

#### 单独编译 linux 内核

```bash
cd /path/to/linux-6.6
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```

## 本地编译

:::tip
这里的本地编译是指在 Jupiter 运行的系统上直接编译 Jupiter 的引导程序和内核。
:::

将 opensbi、u-boot 或 linux 代码下载到 Bianbu Desktop 系统中，即可本地编译。

### 编译 opensbi

```bash
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```

将 `platform/generic/firmware/fw_dynamic.itb` 用 fastboot 写入 opensbi 分区即可。

### 编译 u-boot

```bash
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```

将 `FSBL.bin`、`u-boot-env-default.bin` 和 `u-boot.itb` 用 fastboot 写入对应分区即可。

### 编译 linux kernel

```bash
cd /path/to/linux-6.6
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```

将 `arch/riscv/boot/Image.gz.itb` 和 `arch/riscv/boot/dts/spacemit/*.dtb` 替换 `bootfs` 分区对应文件即可。
