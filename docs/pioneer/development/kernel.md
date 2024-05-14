---
sidebar_label: 'Build Kernel'
sidebar_position: 1
---

# Build Kernel

## Install dependencies

- on Fedora

```bash
$ sudo dnf install autoconf automake curl python3 libmpc-devel mpfr-devel gmp-devel gawk bison flex texinfo gperf libtool patchutils bc openssl dkms libudev-devel golang-bin zlib-devel qemu-user-binfmt  qemu-user-static ncurses-devel expat-devel elfutils-libelf-devel pciutils-devel openssl-devel binutils-devel qemu-system-riscv-core rsync cpio
```

- on Ubuntu

```bash
$ sudo apt-get install autoconf automake autotools-dev curl python3 libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev libncurses-dev openssl libiberty-dev libssl-dev dkms libelf-dev libudev-dev libpci-dev golang-go qemu-user-static rsync cpio rpm
```

## Build from source

### Download source code

```bash
$ git clone https://github.com/sophgo/bootloader-riscv.git
$ git clone https://github.com/sophgo/linux-riscv.git
```

### Build Cross toolchain

```bash
$ CHIP=mango
$ source bootloader-riscv/scripts/envsetup.sh
$ build_rv_gcc
```

```bash
# get the following folders:
.
├── bootloader-riscv
├── linux-riscv
└── gcc-riscv
    ├── gcc-riscv64-unknown-elf
    └── gcc-riscv64-unknown-linux-gnu
```

### Build kernel

```bash
$ build_rv_kernel
```

- build debs

```bash
$ build_rv_ubuntu_kernel
$ ls install/soc_mango/single_chip/bsp-debs/
linux-headers-6.1.80.deb  linux-image-6.1.80.deb  linux-libc-dev_6.1.80.deb
```

- build rpms

```bash
$ build_rv_fedora_kernel
$ ls install/soc_mango/single_chip/bsp-rpms/
kernel-6.1.80.riscv64.rpm  kernel-devel-6.1.80.riscv64.rpm  kernel-headers-6.1.80.riscv64.rpm
```