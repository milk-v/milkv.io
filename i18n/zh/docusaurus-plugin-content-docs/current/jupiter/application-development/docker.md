---
sidebar_label: '使用 Docker'
sidebar_position: 10 
---

# 使用 Docker

Docker 是一个开源的容器化平台，可用于轻松地创建、部署和管理应用程序。它使你能够将应用程序与基础设施分离，从而能够快速交付软件。通过利用 Docker 在代码的发布、测试和部署方面的方法，你可以将应用程序和其依赖项打包到一个称为容器的标准化单元中，来提供一种轻量级且可移植的虚拟化解决方案。

## 安装 Docker

Milk-V Jupiter 的 Ubuntu Desktop 和 Bianbu Desktop 操作系统，可以直接使用如下命令安装 Docker。

更新源：
```
sudo apt update
```

安装 Docker：
```
sudo apt install docker.io
```

:::tip
以下在使用 Docker 的相关命令时，如遇到提示权限问题，请尝试命令前加 `sudo` 提升执行权限。
:::

## 拉取 Docker 镜像

在进迭 harbor 服务器上已经预置了 debian 基础系统的 image，我们可以拉取该镜像来测试 Docker 的使用。

### 拉取镜像

```bash
docker pull harbor.spacemit.com/library/debian:unstable-slim
```

### 查看本机中已经拉取的镜像

```bash
docker images
```

结果如下：
```
milkv@k1:~$ sudo docker images
REPOSITORY                           TAG             IMAGE ID       CREATED       SIZE
harbor.spacemit.com/library/debian   unstable-slim   0b7da19f6d95   3 weeks ago   67.6MB
```

### 运⾏ Docker

从拉取的镜像中创建一个名为 debian 的容器：

```bash
docker run -itd --name debian harbor.spacemit.com/library/debian:unstable-slim
```

### 查看运⾏中的容器

```bash
docker ps
```

### 进⼊容器

```bash
docker exec -it debian bash
```

## 其他 Docker 常用命令

### 查看所有容器

```bash
docker ps -a
```

### 退出容器

```bash
exit
```

### 停⽌容器

使用 `docker ps -a` 查看容器的 ID，再将其停止：

```bash
docker stop be067d972b86
```

### 重启停⽌的容器

```bash
docker restart be067d972b86
```

### 删除容器

```bash
docker rm -f be067d972b86
```

### 清理掉所有处于终⽌状态的容器

```
docker container prune
```

### 删除已拉取的镜像

```bash
docker rmi harbor.spacemit.com/library/debian:unstable-slim
```
