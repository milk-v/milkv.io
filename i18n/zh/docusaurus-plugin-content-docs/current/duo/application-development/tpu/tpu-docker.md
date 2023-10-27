---
sidebar_label: '配置Docker开发环境'
sidebar_position: 20
---

# 配置 Docker 开发环境

## Docker 安装

在 windows 环境下，可以安装 `Docker Desktop for Windows`，Docker [下载地址](https://docs.docker.com/desktop/install/windows-install/)

![duo](/docs/duo/tpu/duo-tpu-docker_01.png)

在 Windows 下运行 Docker 需要相关依赖，即如图中所示，需要使用 WSL2 后端或者 Hyper-V 后端作为运行依赖

Hyper-V 后端的启用方式如下

1. 控制面板 —— 程序和功能 —— 启用或关闭Windows功能
2. 找到 `Hyper-V`，勾选 `Hyper-V管理工具` 和 `Hyper-V平台`，点确定后等待系统文件配置完成后重启电脑

   ![duo](/docs/duo/tpu/duo-tpu-docker_02-zh.png)

然后即可安装下载好 Docker Desktop for Windows，在安装指引中根据选择的后端进行相应的勾选

安装完成后，需要重启电脑，然后即可使用 Docker

## 拉取开发所需 Docker 镜像

从 Docker hub 获取镜像文件
```
docker pull sophgo/tpuc_dev:v3.1
```

```
PS C:\Users\Carbon> docker pull sophgo/tpuc_dev:v3.1
v3.1: Pulling from sophgo/tpuc_dev
b237fe92c417: Pull complete
db3c30810eab: Downloading  411.1MB/629.4MB
2651dfd68288: Download complete
db3c5981ae16: Download complete
16098f82aa65: Download complete
85e8821c88fd: Download complete
d8a25a7307da: Download complete
91fd425676de: Download complete
b3ad6c6ed19d: Downloading  346.1MB/480.6MB
ecaa420e1520: Download complete
a570c4642598: Download complete
2d76e68a7946: Download complete
1df3b38113a9: Download complete
4f4fb700ef54: Download complete
f835d42d7adc: Download complete
2b009425c205: Downloading  252.9MB/1.098GB
```

## 启动 Docker 容器

在 Windows 终端中执行
```
docker run --privileged --name <container_name> -v /workspace -it sophgo/tpuc_dev:v3.1
```
其中，`<container_name>`为自己定义的容器名，比如叫 DuoTPU
```
docker run --privileged --name DuoTPU -v /workspace -it sophgo/tpuc_dev:v3.1
```

## 登陆到 Docker 容器

启动容器后会自动登陆到  Docker 窗口的终端界面，如果需要新开窗口，可以按如下方法操作

在 Windows 终端中用 `docker ps` 命令查看当前 Docker 容器列表
```
PS C:\Users\Carbon\Duo-TPU> docker ps
CONTAINER ID   IMAGE                  COMMAND
f3a060efb1d3   sophgo/tpuc_dev:v3.1   "/bin/bash"
```

用 `CONTAINER ID` 登陆到 Docker 容器中
```
docker exec -it f3a060efb1d3 /bin/bash
```

在 Docker 终端中，检查当前是否为 `/workspace` 目录，如果不是，用 `cd` 命令进入该目录
```
# cd /workspace/
```

![duo](/docs/duo/tpu/duo-tpu-docker_03.png)


## 获取开发工具包并添加环境变量

在 Docker 终端中下载 TPU-MLIR 模型转换工具包
```
git clone https://github.com/milkv-duo/tpu-mlir.git
```

在 Docker 终端中，用 `source` 命令添加环境变量
In the Docker terminal, use the `source` command to add environment variables
```
# source ./tpu-mlir/envsetup.sh
```
