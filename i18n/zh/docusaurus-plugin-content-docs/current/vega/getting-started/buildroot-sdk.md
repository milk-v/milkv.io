---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# 简介

Vega 默认的 SDK 是基于 buildroot 构建的，用来生成 Vega 的固件，SDK 主要包含如下几个部分:

- u-boot: 2020.07-rc2
- linux kernel: 5.8.0
- buildroot: 2020.05-rc1
- opensbi: 0.7

源码地址: [github](https://github.com/milkv-vega/vega-buildroot-sdk)

# 编译镜像

准备编译环境，使用本地的 Ubuntu 系统，官方支持的编译环境为 `Ubuntu Jammy 22.04.x amd64`。

如果您使用的是其他的 Linux 发行版，我们强烈建议您使用 Docker 环境来编译，以降低编译出错的概率。

以下分别介绍两种环境下的编译方法。

## 一、使用 Ubuntu 22.04 编译

### 安装编译依赖的工具包

```bash
sudo apt install -y make git gcc g++ bison flex device-tree-compiler mtd-utils
```

### 获取 SDK

```bash
git clone https://github.com/milkv-vega/vega-buildroot-sdk.git --depth=1
```

### 一键编译

执行一键编译脚本 `build.sh`：
```bash
cd vega-buildroot-sdk/
./build.sh
```

编译成功后可以在 `out` 目录下看到生成的三个镜像：
```
out/
├── freeloader.bin
├── kernel.bin
└── ubifs.img
```

*注: 第一次编译会自动下载所需的工具链，大小为 370M 左右，下载完会自动解压到 SDK 目录下的 `host-tools` 目录，下次编译时检测到已存在 `host-tools` 目录，就不会再次下载了*

## 二、使用 Docker 编译

需要在运行 Linux 系统的主机上支持 Docker。 Docker 的使用方法请参考[官方文档](https://docs.docker.com/)或其他教程。

我们将 SDK 代码放在 Linux 主机系统上，调用 Milk-V 提供的 Docker 镜像环境来编译。

### 在 Linux 主机上拉 SDK 代码

```bash
git clone https://github.com/milkv-vega/vega-buildroot-sdk.git --depth=1
```

### 进入 SDK 代码目录

```bash
cd vega-buildroot-sdk
```

### 拉取 Docker 镜像并运行

:::tip
这里使用的 Docker 镜像，与 Milk-V 的另一款产品 Duo 使用的是相同的 Docker 镜像。
:::

```bash
docker run -itd --name vegadocker -v $(pwd):/home/work milkvtech/milkv-duo:latest /bin/bash
```

命令中部分参数说明:
- `vegadocker` docker 运行时名字，可以使用自己想用的名字
- `$(pwd)` 当前目录，这里是上一步 cd 到的 duo-buildroot-sdk 目录
- `-v $(pwd):/home/work`  将当前的代码目录绑定到 Docker 镜像里的 /home/work 目录
- `milkvtech/milkv-duo:latest` Milk-V 提供的 Docker 镜像，第一次会自动从 hub.docker.com 下载

Docker 运行成功后，可以用 `docker ps -a` 命令查看运行状态：
```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND       CREATED       STATUS       PORTS     NAMES
8edea33c2239   milkvtech/milkv-duo:latest   "/bin/bash"   2 hours ago   Up 2 hours             vegadocker
```

### 使用 Docker 一键编译

```bash
docker exec -it vegadocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh"
```

命令中部分参数说明:
- `vegadocker` 运行的 Docker 名字, 与上一步中设置的名字要保持一致
- `"*"` 双引号中是要在 Docker 镜像中运行的 Shell 命令
- `cd /home/work` 是切换到 /home/work 目录，由于运行时已经将该目录绑定到主机的代码目录，所以在 Docker 中 /home/work 目录就是该 SDK 的源码目录
- `cat /etc/issue` 显示 Docker 使用的镜像的版本号，目前是 Ubuntu 22.04.3 LTS，调试用
- `./build.sh` 执行一键编译脚本

编译成功后可以在 `out` 目录下看到生成的三个镜像：
```
out/
├── freeloader.bin
├── kernel.bin
└── ubifs.img
```

### 停用 Docker

编译完成后，如果不再需要以上的 Docker 运行环境，可先将其停止，再删除:
```bash
docker stop 8edea33c2239
docker rm 8edea33c2239
```

## 三、其他编译注意事项

如果您想尝试在以上两种环境之外的环境下编译本 SDK，下面是可能需要注意的事项，仅供参考。

### 使用 Windows Linux 子系统 (WSL) 进行编译

如果您希望使用 WSL 执行编译，则构建镜像时会遇到一个小问题，WSL 中的 $PATH 具有 Windows 环境变量，其中路径之间包含一些空格。

要解决此问题，您需要更改 `/etc/wsl.conf` 文件并添加以下行：

```
[interop]
appendWindowsPath = false
```

然后需要使用 `wsl.exe --reboot` 重新启动 WSL。再运行 `./build.sh` 脚本或分步编译命令。

要恢复 `/etc/wsl.conf` 文件中的此更改，请将 `appendWindowsPath` 设置为 `true`。 要重新启动 WSL，您可以使用 Windows PowerShell 命令 `wsl.exe --shutdown`，然后使用`wsl.exe`，之后 Windows 环境变量在 $PATH 中再次可用。

## 四、镜像烧录

镜像的烧录，需要通过串口输入命令进行操作，串口的使用请参考[这里](https://milkv.io/zh/docs/vega/getting-started/setup#串口)。

将 SDK 编译生成的三个镜像文件烧录到 Vega 设备中，需要使用 TFTP 环境。

### Ubuntu 22.04 中安装 TFTP 服务

安装 tftp 服务:
```bash
sudo apt update
sudo apt install tftpd-hpa
```

编辑配置文件:
```
sudo vi /etc/default/tftpd-hpa
```
修改 `TFTP_DIRECTORY` 为镜像文件存放目录，比如用户目录下的 `tftp` 目录:
```
TFTP_USERNAME="tftp"
TFTP_DIRECTORY="/home/xxx/tftp"
TFTP_ADDRESS=":69"
TFTP_OPTIONS="--secure"
```

在用户目录下创建 tftp 目录，用于存放需要通过 tftp 服务传输的文件:
```bash
mkdir /home/xxx/tftp
```

重启 tftp 服务：
```bash
sudo systemctl restart tftpd-hpa
```

在设备的 u-boot 命令行中，测试主机 Ubuntu 中的 tftp 服务是否工作正常:

- 配置当前设备要使用的 IP 和 tftp 服务器的 IP:
  ```
  setenv ipaddr 192.168.2.2222;setenv serverip 192.168.2.66
  ```
- ping 主机:
  ```
  ping 192.168.77.176
  ```
  如果能 ping 通，则 Ubuntu 上的 tftp 服务正常。

### 烧录 Loader

将 `freeloader.bin` 放在 tftp 目录下，Vega 设备上电后，在串口中看到如下提示后，快速输入 `asd` 进入 u-boot 的终端：

```
U-Boot 2020.07-rc2 (Jan 12 2024 - 16:32:24 +0800)

CPU:   rv64imafdc
Model: nuclei,ux600fd
DRAM:  240 MiB
Board: Initialized
NAND:  128 MiB
Loading Environment from SPI Flash... SF: Detected w25q32 with page size 256 Bytes, erase size 4 KiB, total 4 MiB
OK
In:    console
Out:   console
Err:   console
Net:   xy1000_eth
Press asd to abort autoboot in 2 seconds
=>
```

将与 TFTP 服务器在同一网段的网线接到 Vega 的任意端口，在串口的 u-boot 终端中配置 Vega 的 IP 和 TFTP 服务器的 IP，比如 TFTP 服务器的 IP 是 `192.168.2.66`，Vega 的 IP 配置为 `192.168.2.222`，命令如下:

```
setenv ipaddr 192.168.2.222;setenv serverip 192.168.2.66
```

烧录 `freeloader.bin`:
```
run updatefreeloader
```
这里一定要等待烧录完成，待出现命令行提示符 `=>` 后，说明烧录完成。烧录完 `freeloader.bin` 后，需要重新上电，再快速输入 `asd` 进入 u-boot 的终端，继续烧录内核和文件系统。

### 烧录内核和文件系统

同样，将要烧录的 kernel.bin 和 ubifs.img 两个镜像文件，放到 `tftp` 目录下，在 u-boot 的终端中，与上面一样，配置 TFTP 相关 IP:
```
setenv ipaddr 192.168.2.222;setenv serverip 192.168.2.66
```

烧录 `kernel.bin`：
```
run updateos_nand
```

烧录 `ubifs.img`：
```
run updateubifs_boot
```

设置启动命令：
```
setenv bootcmd run bootcmd_ubifs_boot
```

保存环境变量：
```
saveenv
```

启动：
```
boot
```