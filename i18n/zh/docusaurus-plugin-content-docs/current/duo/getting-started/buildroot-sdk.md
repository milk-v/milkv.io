---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# 简介

Duo 默认的 SDK 是基于 buildroot 构建的，用来生成 Duo 的固件，SDK 主要包含如下几个部分:

- u-boot: 2021.10
- linux kernel: 5.10.4
- buildroot: 2021.05
- opensbi: 89182b2

源码地址: [github](https://github.com/milkv-duo/duo-buildroot-sdk)

SDK目录结构

```text
├── build               // 编译目录，存放编译脚本以及各board差异化配置
├── build.sh            // Milk-V Duo 一键编译脚本
├── buildroot-2021.05   // buildroot 开源工具
├── freertos            // freertos 系统
├── fsbl                // fsbl启动固件，prebuilt 形式存在
├── install             // 执行一次完整编译后，临时存放各 image 路径
├── isp_tuning          // 图像效果调试参数存放路径
├── linux_5.10          // 开源 linux 内核
├── middleware          // 自研多媒体框架，包含 so 与 ko
├── device              // 存放 Milk-V Duo 相关配置及脚本文件的目录
├── opensbi             // 开源 opensbi 库
├── out                 // Milk-V Duo 最终生成的 SD 卡烧录镜像所在目录
├── ramdisk             // 存放最小文件系统的 prebuilt 目录
└── u-boot-2021.10      // 开源 uboot 代码
```

:::tip
当前 SDK 不支持 Duo256M 和 DuoS 的 ARM 核，如果需要使用 ARM 核，可以暂时参考这个仓库：

duo-build: [https://github.com/milkv-duo/duo-build](https://github.com/milkv-duo/duo-build)
:::

# 编译镜像

准备编译环境，使用本地的 Ubuntu 系统，官方支持的编译环境为 `Ubuntu Jammy 22.04.x amd64`。

如果您使用的是其他的 Linux 发行版，我们强烈建议您使用 Docker 环境来编译，以降低编译出错的概率。

以下分别介绍两种环境下的编译方法。

## 一、使用 Ubuntu 22.04 编译

### 安装编译依赖的工具包

```bash
sudo apt install -y pkg-config build-essential ninja-build automake autoconf libtool wget curl git gcc libssl-dev bc slib squashfs-tools android-sdk-libsparse-utils jq python3-distutils scons parallel tree python3-dev python3-pip device-tree-compiler ssh cpio fakeroot libncurses5 flex bison libncurses5-dev genext2fs rsync unzip dosfstools mtools tcl openssh-client cmake expect
```

### 获取 SDK

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk.git --depth=1
```

### 1、一键编译

执行一键编译脚本 `build.sh`：
```bash
cd duo-buildroot-sdk/
./build.sh
```
会看到编译脚本的使用方法提示：
```bash
# ./build.sh
Usage:
./build.sh              - Show this menu
./build.sh lunch        - Select a board to build
./build.sh [board]      - Build [board] directly, supported boards asfollows:
milkv-duo
milkv-duo256m
```
最下边列出的是当前支持的目标版本列表。

如提示中所示，有两种方法来编译目录版本。

第一种方法是执行 `./build.sh lunch` 调出交互菜单，选择要编译的版本序号，回车：
```bash
# ./build.sh lunch
Select a target to build:
1. milkv-duo
2. milkv-duo256m
Which would you like:
```

第二种方法是脚本后面带上目标版本的名字，比如要编译 `milkv-duo` 的镜像:
```bash
# ./build.sh milkv-duo
```

编译成功后可以在 `out` 目录下看到生成的SD卡烧录镜像 `milkv-duo-*-*.img`

*注: 第一次编译会自动下载所需的工具链，大小为 840M 左右，下载完会自动解压到 SDK 目录下的 `host-tools` 目录，下次编译时检测到已存在 `host-tools` 目录，就不会再次下载了*

### 2、分步编译

如果未执行过一键编译脚本，需要先手动下载工具链 [host-tools](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz)，并解压到 SDK 根目录：

```bash
tar -xf host-tools.tar.gz -C /your/sdk/path/
```

再依次输入如下命令完成分步编译，命令中的 `[board]` 和 `[config]` 替换为需要编译的版本，当前支持的 `board` 和对应的 `config` 如下：
```
milkv-duo               cv1800b_milkv_duo_sd
milkv-duo256m           cv1812cp_milkv_duo256m_sd
```

```bash
source device/[board]/boardconfig.sh

source build/milkvsetup.sh
defconfig [config]
clean_all
build_all
pack_sd_image
```

比如需要编译 `milkv-duo` 的镜像，分步编译命令如下：
```bash
source device/milkv-duo/boardconfig.sh

source build/milkvsetup.sh
defconfig cv1800b_milkv_duo_sd
clean_all
build_all
pack_sd_image
```

生成的固件位置：
```
Duo:      install/soc_cv1800b_milkv_duo_sd/[board].img
Duo256M:  install/soc_cv1812cp_milkv_duo256m_sd/[board].img
```

## 二、使用 Docker 编译

需要在运行 Linux 系统的主机上支持 Docker。 Docker 的使用方法请参考[官方文档](https://docs.docker.com/)或其他教程。

我们将 SDK 代码放在 Linux 主机系统上，调用 Milk-V 提供的 Docker 镜像环境来编译。

### 在 Linux 主机上拉 SDK 代码

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk.git --depth=1
```

### 进入 SDK 代码目录

```bash
cd duo-buildroot-sdk
```

### 拉取 Docker 镜像并运行

```bash
docker run -itd --name duodocker -v $(pwd):/home/work milkvtech/milkv-duo:latest /bin/bash
```

命令中部分参数说明:
- `duodocker` docker 运行时名字，可以使用自己想用的名字
- `$(pwd)` 当前目录，这里是上一步 cd 到的 duo-buildroot-sdk 目录
- `-v $(pwd):/home/work`  将当前的代码目录绑定到 Docker 镜像里的 /home/work 目录
- `milkvtech/milkv-duo:latest` Milk-V 提供的 Docker 镜像，第一次会自动从 hub.docker.com 下载

Docker 运行成功后，可以用 `docker ps -a` 命令查看运行状态：
```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND       CREATED       STATUS       PORTS     NAMES
8edea33c2239   milkvtech/milkv-duo:latest   "/bin/bash"   2 hours ago   Up 2 hours             duodocker
```

### 1. 使用 Docker 一键编译

```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh [board]"
```

注意命令最后的 `./build.sh [board]` 和前面在 Ubuntu 22.04 中一键编译说明中的用法是一样的，直接 `./build.sh` 可以查看命令的使用方法，用 `./build.sh lunch` 可以调出交互选择菜单，用 `./build.sh [board]` 可以直接编译目标版本，`[board]` 可以替换为:
```
milkv-duo
milkv-duo256m
```

命令中部分参数说明:
- `duodocker` 运行的 Docker 名字, 与上一步中设置的名字要保持一致
- `"*"` 双引号中是要在 Docker 镜像中运行的 Shell 命令
- `cd /home/work` 是切换到 /home/work 目录，由于运行时已经将该目录绑定到主机的代码目录，所以在 Docker 中 /home/work 目录就是该 SDK 的源码目录
- `cat /etc/issue` 显示 Docker 使用的镜像的版本号，目前是 Ubuntu 22.04.3 LTS，调试用
- `./build.sh [board]` 执行一键编译脚本

比如需要编译 `milkv-duo` 的镜像，编译命令如下:
```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh milkv-duo"
```

编译成功后可以在 `out` 目录下看到生成的SD卡烧录镜像 `[board]-*-*.img`

### 2. 使用 Docker 分步编译

如果未执行过一键编译脚本，需要先手动下载工具链 [host-tools](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz)，并解压到 SDK 根目录：

```bash
tar -xf host-tools.tar.gz -C /your/sdk/path/
```

分步编译需要登陆到 Docker 中进行操作，用命令 `docker ps -a` 查看并记录容器的 ID 号，比如 8edea33c2239。

登陆到 Docker 中:
```bash
docker exec -it 8edea33c2239 /bin/bash
```

进入 Docker 中绑定的代码目录：
```bash
root@8edea33c2239:/# cd /home/work/
```

再依次输入如下命令完成分步编译，命令中的 `[board]` 和 `[config]` 替换为需要编译的版本，当前支持的 `board` 和对应的 `config` 如下：
```
milkv-duo               cv1800b_milkv_duo_sd
milkv-duo256m           cv1812cp_milkv_duo256m_sd
```

```bash
source device/[board]/boardconfig.sh

source build/milkvsetup.sh
defconfig [config]
clean_all
build_all
pack_sd_image
```

比如需要编译 `milkv-duo` 的镜像，分步编译命令如下：
```bash
source device/milkv-duo/boardconfig.sh

source build/milkvsetup.sh
defconfig cv1800b_milkv_duo_sd
clean_all
build_all
pack_sd_image
```

生成的固件位置：
```
Duo:      install/soc_cv1800b_milkv_duo_sd/[board].img
Duo256M:  install/soc_cv1812cp_milkv_duo256m_sd/[board].img
```

编译完成后可以用 `exit` 命令退出 Docker 环境：
```bash
root@8edea33c2239:/home/work# exit
```
在主机代码目录中同样也可以看到生成的固件。

### 停用 Docker

编译完成后，如果不再需要以上的 Docker 运行环境，可先将其停止，再删除:
```bash
docker stop 8edea33c2239
docker rm 8edea33c2239
```

## 三、其他编译注意事项

如果您想尝试在以上两种环境之外的环境下编译本 SDK，下面是可能需要注意的事项，仅供参考。

### cmake 版本号

注意：`cmake` 版本最低要求 `3.16.5`

查看系统中 `cmake` 的版本号

```bash
cmake --version
```

比如在`Ubuntu 20.04`中用 apt 安装的 cmake 版本号为

```
cmake version 3.16.3
```

不满足此SDK最低要求，需要手动安装目前最新的 `3.27.6` 版本

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.27.6/cmake-3.27.6-linux-x86_64.sh
chmod +x cmake-3.27.6-linux-x86_64.sh
sudo sh cmake-3.27.6-linux-x86_64.sh --skip-license --prefix=/usr/local/
```
手动安装的 `cmake` 在 `/usr/local/bin` 中，此时用 `cmake --version` 命令查看其版本号, 应为

```
cmake version 3.27.6
```

### 使用 Windows Linux 子系统 (WSL) 进行编译

如果您希望使用 WSL 执行编译，则构建镜像时会遇到一个小问题，WSL 中的 $PATH 具有 Windows 环境变量，其中路径之间包含一些空格。

要解决此问题，您需要更改 `/etc/wsl.conf` 文件并添加以下行：

```
[interop]
appendWindowsPath = false
```

然后需要使用 `wsl.exe --reboot` 重新启动 WSL。再运行 `./build.sh` 脚本或分步编译命令。

要恢复 `/etc/wsl.conf` 文件中的此更改，请将 `appendWindowsPath` 设置为 `true`。 要重新启动 WSL，您可以使用 Windows PowerShell 命令 `wsl.exe --shutdown`，然后使用`wsl.exe`，之后 Windows 环境变量在 $PATH 中再次可用。

## 四、Buildroot 添加应用包

Buildroot 是一个轻量级的嵌入式 Linux 系统构建框架，其生成的系统没有像 Ubuntu 系统一样的 apt 包管理工具来下载和使用应用包。Duo 默认的 SDK 已经添加了一些常用的工具或命令，如果您需要添加自己的应用，需要对 SDK 做一些修改后重新编译生成所需的系统固件。

以下介绍在 Buildroot 中添加应用包常用的几种方法。

### 开启 Busybox 中的命令

### 配置 Buildroot 中预置的应用包

### 添加自己的应用包

## 五、删除不需要的应用包

如果你在自行编译固件的过程中，需要删除一些不需要的应用包来加快编译速度，可以在 Buildroot 的配置文件中将对应的包名删除，以 `milkv-duo` 目标为例，比如不需要编译 Python 相关的库，可以做如下修改后，重新编译生成固件即可。

```diff title="buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig"
diff --git a/buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig b/buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig
index 2bc8cd5e3..e78901afb 100644
--- a/buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig
+++ b/buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig
@@ -330,25 +330,6 @@ BR2_PACKAGE_EVTEST=y
 # BR2_PACKAGE_FCONFIG is not set
 BR2_PACKAGE_FLASHROM_ARCH_SUPPORTS=y
 
-BR2_PACKAGE_PYTHON3=y
-BR2_PACKAGE_PYTHON3_PY_PYC=y
-BR2_PACKAGE_PYTHON_LXML=y
-BR2_PACKAGE_PYTHON_PIP=y
-BR2_PACKAGE_PYTHON_SETUPTOOLS=y
-BR2_PACKAGE_PYTHON3_SSL=y
-
-BR2_PACKAGE_PYTHON_SERIAL=y
-BR2_PACKAGE_PYTHON_PILLOW=y
-BR2_PACKAGE_PYTHON_SMBUS_CFFI=y
-BR2_PACKAGE_PYTHON_SPIDEV=y
-BR2_PACKAGE_PYTHON_MODBUS_TK=y
-BR2_PACKAGE_PYTHON_EVDEV=y
-BR2_PACKAGE_PYTHON_FREETYPE=y
-
-BR2_PACKAGE_PYTHON_PINPONG=y
-
-BR2_PACKAGE_PYTHON_PSUTIL=y
-
 #
 # Compression and decompression
 #
```

## 六、常见问题

### Buildroot 编译出错排查方法

SDK 中 Buildroot 默认开启了顶层并行编译以加快编译速度，但是编译出错时，不方便分析出错的日志，所以我们可以先在 config 文件中将其删除，待排解决了问题之后，再将其重新打开。

以 milkv-duo 目标为例，在其配置文件中将该配置删除后，重新编译：

```bash title="buildroot-2021.05/configs/milkv-duo_musl_riscv64_defconfig"
BR2_PER_PACKAGE_DIRECTORIES=y
```

编译出错时除了查看编译终端的出错信息，还可以查看 `build/br.log` 中的完整日志进行排查。
