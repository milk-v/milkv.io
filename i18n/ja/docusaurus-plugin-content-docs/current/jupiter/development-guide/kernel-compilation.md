# Kernel compilation

The following takes linux-6.6 as an example to introduce how to compile your own kernel for Bianbu, supporting cross-compilation (fast) and local compilation (convenient).

## Download source code

```
git clone https://gitee.com/bianbu-linux/linux-6.6 ~/linux-6.
```

## Cross-compilation

### Development environment

Run the command ` sudo apt-get install asciidoc xmlto ` to install asciidoc xmlto .

### Compiler

Address: http://archive.spacemit.com/toolchain/

1. Download the cross compiler:

For example, spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz

2. Unzip:

```
sudo tar -Jxf /path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz -C /opt
```

Tip: /opt is the path where you unzipped the files, or you can choose your own path.

3. Set the cross compiler environment variable:

```
export PATH=/path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0/bin:$PATH
```

Tip: /path/to/ is the path where you unzipped the files, such as / opt .

### Compile the software package

1. Run the command `cd ~/linux-6.6` to enter the kernel source directory.

2. Set the kernel compilation parameters:

```
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
export LOCALVERSION=""

```
3. Run the command `make k1_defconfig` to generate the default configuration.

4. Modify the configuration. If you do not want to change, you can skip:

```
make menuconfig
```
5. To save the modified configuration:

```
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
6. Run the command `make -j$(nproc) bindeb-pkg` to compile the debian package.

When you see the following information, it means that the compilation is successful.
```
dpkg-genchanges: info: binary-only upload (no source code included)
dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```
The software package is located in the upper directory, commonly used packages:

- > linux-image-6.6.36_6.6.36-*.deb

Kernel Image software package.

- > linux-tools-6.6.36_6.6.36-*.deb

Tool software packages such as perf.

7. Copy to the device, install and reboot:
```
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### Compile modules

Compile modules outside the kernel source tree, taking rtl8852bs as an example, the general command is as follows:
```
cd /path/to/rtl8852bs
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs modules
```

Tip: /path/to/rtl8852bs should be replaced with your path.

Cleanup command:
```
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs clean
```

### Compile device tree

```
make -j$(nproc) dtbs
```
If the compilation fails, run the command ` make ARCH=riscv menuconfig `, enter the kernel, and change `SOC_SPACEMIT [=n]` to `SOC_SPACEMIT [=y]`.

Then recompile the device tree.

## Local compilation

You can compile the kernel directly on Bianbu. The following is a guide.

### Development environment

Installation dependencies:
```
sudo apt-get install flex bison libncurses-dev debhelper libssl-dev u-boot-tools libpfm4-dev libpfm4-dev libtraceevent-dev asciidoc
```

### Compile software package

1. Run the command `cd ~/linux-6.6` to enter the kernel source directory.

2. Set kernel compilation parameters:
```
export ARCH=riscv
export LOCALVERSION=""
```
3. Run the command `make k1_defconfig` to generate the default configuration.

4. Modify the configuration. If you do not want to change, you can skip:
```
make menuconfig
```
5. To save the modified configuration:
```
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
6. Run the command `make -j$(nproc) bindeb-pkg` to compile the debian package.

When you see the following information, the compilation is successful.
```
dpkg-genchanges: info: binary-only upload (no source code included)
dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```
The software package is located in the upper directory. Common packages:

- > linux-image-6.6.36_6.6.36-*.deb

Kernel Image software package.

- > linux-tools-6.6.36_6.6.36-*.deb

perf and other tool software packages.

7. Install and reboot:
```
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### Compile modules

Locally compile modules outside the kernel source tree without relying on the kernel source code.

First install linux-headers:
```
sudo apt-get install linux-headers-`uname -r`
```
Then compile modules, such as rtl8852bs:
```
cd /path/to/rtl8852bs
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs modules
```
Tip: /path/to/rtl8852bs should be replaced with your path.

Cleanup command:
```
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs clean
```