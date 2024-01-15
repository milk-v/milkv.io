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