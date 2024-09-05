# 内核编译

下面以linux-6.6为例，介绍如何为Bianbu编译自己的内核，支持交叉编译（快）和本地编译（方便）。

## 下载源码

```
git clone https://gitee.com/bianbu-linux/linux-6.6 ~/linux-6.
```

## 交叉编译

### 开发环境

运行命令 ` sudo apt-get install asciidoc xmlto `,安装 asciidoc xmlto 。

### 编译器

地址：http://archive.spacemit.com/toolchain/

1.下载交叉编译器：

例如spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz

2.解压：
```
sudo tar -Jxf /path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz -C /opt
```

 提示： /opt 是你将文件解压到的路径，也可以自己选择路径。

3.设置交叉编译器环境变量：
```
export PATH=/path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0/bin:$PATH
```

提示： /path/to/ 是你将文件解压到的路径，比如 / opt 。

### 编译软件包

1.运行命令 `cd ~/linux-6.6` ,进入内核源码目录。

2.设置内核编译参数：
```
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
export LOCALVERSION=""
```
3.运行命令 `make k1_defconfig`,生成默认配置。

4.修改配置，不改可跳过：
```
make menuconfig
```
5.如需保存修改后的配置：
```
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
6.运行命令 `make -j$(nproc) bindeb-pkg`,编译 debian 软件包。

当看到以下信息，说明编译成功。
```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```
软件包位于上一层目录，常用包：

- > linux-image-6.6.36_6.6.36-*.deb
    
    内核Image软件包。

- >  linux-tools-6.6.36_6.6.36-*.deb

    perf等工具软件包。

7.拷贝到设备，安装然后重启即可:
```
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### 编译模块

编译内核源码树外的模块，以rtl8852bs为例，一般命令如下：
```
cd /path/to/rtl8852bs
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs modules
```

提示：/path/to/rtl8852bs要替换成您的路径。

清理命令：
```
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs clean
```

### 编译设备树

```
make -j$(nproc) dtbs
```
如果编译不成功，就运行命令 ` make ARCH=riscv menuconfig `，进入内核，将 `SOC_SPACEMIT [=n]` 改为 `SOC_SPACEMIT [=y]`。

然后在重新编译设备树即可。

## 本地编译

在Bianbu上可直接编译内核，以下是指南。

### 开发环境

安装依赖：
```
sudo apt-get install flex bison libncurses-dev debhelper libssl-dev u-boot-tools libpfm4-dev libpfm4-dev libtraceevent-dev asciidoc
```

### 编译软件包

1.运行命令 `cd ~/linux-6.6` ,进入内核源码目录。

2.设置内核编译参数：
```
export ARCH=riscv
export LOCALVERSION=""
```
3.运行命令 `make k1_defconfig`,生成默认配置。

4.修改配置，不改可跳过：
```
make menuconfig
```
5.如需保存修改后的配置：
```
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
6.运行命令 `make -j$(nproc) bindeb-pkg`,编译 debian 软件包。

当看到以下信息，说明编译成功。
```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```
软件包位于上一层目录，常用包：

- > linux-image-6.6.36_6.6.36-*.deb
    
    内核Image软件包。

- >  linux-tools-6.6.36_6.6.36-*.deb

    perf等工具软件包。

7.安装然后重启即可：
```
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### 编译模块

本地编译内核源码树外的模块，可以不依赖内核源码。

首先安装linux-headers：
```
sudo apt-get install linux-headers-`uname -r`
```
然后编译模块，例如rtl8852bs：
```
cd /path/to/rtl8852bs
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs modules
```
提示：/path/to/rtl8852bs要替换成您的路径。

清理命令：
```
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs clean
```






