---
sidebar_label: 'Using GCC'
sidebar_position: 05
---

# Using GCC

After Jupiter is installed with Ubuntu, Bianbu systems, it supports onboard development. Here, we take the use of GCC to compile a test program as an example to introduce the onboard development method.

## Install GCC

Ubuntu Desktop and Bianbu Desktop versions have gcc installed by default. You can view the version of gcc by running the following command:
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

If gcc is not installed in your system, you can install it with the following command:
```bash
sudo apt update
sudo apt install build-essential
```

## Hello World test program

Create a new test file `hello.c`, you can use the touch command to create it in the command line:
```bash
touch hello.c
```

Edit the file content as follows:
```C
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

Compile:
```bash
gcc -o hello hello.c
```

Run the generated program hello:
```bash
./hello
```

The output is as follows:
```
milkv@k1:~$ ./hello
Hello, World!
```
