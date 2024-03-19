---
sidebar_label: 'Build Environment Setup'
sidebar_position: 10
---

# Build Environment Setup

Here's how to set up an environment to compile meles under docker

## Download docker

Follow the [docker guide](https://docs.docker.com/get-docker/) to install docker first on HOST PC.

Download **`milkv/ubuntu2204`** docker.

```
docker pull milkv/ubuntu2204:v1.3
```

## Start container

- **milkv-ubuntu2204-v1.3 is just an example, you can set your own name.**

```
docker run --rm --privileged --name milkv-ubuntu2204-v1.3 -v $PWD:/workspace -it milkv/ubuntu2204:v1.3
```

## Install needed packages

```
sudo apt install -y gdisk dosfstools g++-12-riscv64-linux-gnu build-essential libncurses-dev gawk flex bison openssl libssl-dev tree dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf device-tree-compiler git
```

## Get toolchain

```
wget https://occ-oss-prod.oss-cn-hangzhou.aliyuncs.com/resource//1663142514282/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz

tar -xvf Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1-20220906.tar.gz -C /opt
export PATH="/opt/Xuantie-900-gcc-linux-5.10.4-glibc-x86_64-V2.6.1/bin:$PATH"
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

## Get the source code

```
mkdir -p /workspace/thead-sdk && cd /workspace/thead-sdk
git clone https://github.com/milkv-meles/thead-u-boot.git -b meles
git clone https://github.com/milkv-meles/thead-kernel.git -b meles
git clone https://github.com/milkv-meles/thead-bin.git -b main
git clone https://github.com/milkv-meles/build.git -b main
```