---
sidebar_label: '配置Docker开发环境'
sidebar_position: 20
---

# 配置 Docker 开发环境

## Docker安装

在 windows 环境下，可以安装 Docker Desktop for Windows，Docker [下载地址](https://docs.docker.com/desktop/install/windows-install/)

![duo](/docs/duo/tpu/duo-tpu-docker_01.png)

在 Windows 下运行 Docker 需要相关依赖，即如图中所示，需要使用 WSL2 后端或者 Hyper-V 后端作为运行依赖

Hyper-V后端的启用方式如下

1. 控制面板 —— 程序和功能 —— 启用或关闭Windows功能
2. 找到Hyper-V，勾选Hyper-V管理工具和Hyper-V平台，点确定后等待系统文件配置完成后重启电脑

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

## 启动容器

```
docker run --privileged --name <container_name> -v /workspace -it sophgo/tpuc_dev:v3.1
```

其中，`<container_name>`为自己定义的容器名，比如叫 DuoTPU

```
docker run --privileged --name DuoTPU -v /workspace -it sophgo/tpuc_dev:v3.1
```

## 获取开发工具包

1. 从 MEGA 下载

   [下载地址](https://mega.nz/folder/yZghQA4R#aZkbTwJb7Ji5LvAWIuBtag)

   当前最新的工具包为: `tpu-mlir_v1.3.228-g19ca95e9-20230921.tar.gz`

2. 从 ftp 服务器下载

   ```
   sftp://218.17.249.213
   username: cvitek_mlir_2023
   password: 7&2Wd%cu5k
   ```
   如果文件未找到，可以到 backup 目录中找一下，可能更新版本后旧版本的包被放到 backup 目录

   使用 WinSCP 登陆 sftp 站点后的界面

   ![duo](/docs/duo/tpu/duo-tpu-sftp.png)

## 拷贝开发工具包

新建一个 Windows 终端，并将开发工具包从 windows 拷贝到 Docker 容器中
```
docker cp <path>/tpu-mlir_*.tar.gz <container_name>:/workspace/
```
其中，`<path>`为 windows 系统中开发工具包所在的文件目录，`<container_name>`为容器名

比如
```
docker cp C:\Users\Carbon\Duo-TPU\tpu-mlir_v1.3.228-g19ca95e9-20230921.tar.gz DuoTPU:/workspace/
```

## 将工具包解压并添加环境变量

用 `docker ps` 命令查看当前 Docker 容器列表
```
PS C:\Users\Carbon\Duo-TPU> docker ps
CONTAINER ID   IMAGE                  COMMAND
f3a060efb1d3   sophgo/tpuc_dev:v3.1   "/bin/bash"
```

用容器 ID 登陆到 Docker 容器中
```
docker exec -it f3a060efb1d3 /bin/bash
```

在 Docker 命令行下，检查当前是否为 /workspace 目录，如果不是，用 cd 命令进入该目录
```
# cd /workspace/
```

![duo](/docs/duo/tpu/duo-tpu-docker_03.png)

在 Docker 容器中，解压工具包并添加环境变量
```
# tar -zxvf tpu-mlir_v1.3.228-g19ca95e9-20230921.tar.gz
# source ./tpu-mlir_v1.3.228-g19ca95e9-20230921/envsetup.sh
```
