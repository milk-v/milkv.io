---
sidebar_label: '使用 GCC'
sidebar_position: 5
---

# 使用 GCC

Jupiter 安装 Ubuntu, Bianbu 等系统后，支持板载开发。这里以使用 GCC 编译一个测试程序为例，介绍一下板载开发的方法。

## 安装 GCC

Ubuntu Desktop 以及 Bianbu Desktop 版本默认已经安装了 gcc, 可通过如下命令查看 gcc 的版本号：
```bash
milkv@k1:~$ gcc -v
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/libexec/gcc/riscv64-linux-gnu/13/lto-wrapper
Target: riscv64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 13.2.0-4ubuntu3-bb2' --with-bugurl=file:///usr/share/doc/gcc-13/README.Bugs --enable-languages=c,ada,c++,go,d,fortran,objc,obj-c++,m2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-13 --program-prefix=riscv64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/libexec --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-libitm --disable-libquadmath --disable-libquadmath-support --enable-plugin --enable-default-pie --with-system-zlib --enable-libphobos-checking=release --with-target-system-zlib=auto --enable-objc-gc=auto --enable-multiarch --disable-werror --disable-multilib --with-arch=rv64gc --with-abi=lp64d --enable-checking=release --build=riscv64-linux-gnu --host=riscv64-linux-gnu --target=riscv64-linux-gnu --with-build-config=bootstrap-lto-lean --enable-link-serialization=2
Thread model: posix
Supported LTO compression algorithms: zlib zstd
gcc version 13.2.0 (Ubuntu 13.2.0-4ubuntu3-bb2)
```

如果您使用的系统中未安装 gcc，可以通过如下命令安装：
```bash
sudo apt update
sudo apt install build-essential
```

## 编写 Hello World 测试程序

新建测试文件 `hello.c`, 命令行里可以通过 touch 命令创建：
```bash
touch hello.c
```

编辑该文件内容如下：
```C
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

编译：
```bash
gcc -o hello hello.c
```

运行生成的程序 hello：
```bash
./hello
```

输出如下：
```
milkv@k1:~$ ./hello
Hello, World!
```
