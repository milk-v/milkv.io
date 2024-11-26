---
sidebar_label: 'GCC Toolchain'
sidebar_position: 30
---

# SG2042 GCC toolchain documentation
SG2042 use the T-HEAD GNU compiler toolchain, this document introduces how to build and use this toolchain.

# T-HEAD GNU Compiler Toolchain
T-HEAD GNU Compiler Toolchain is a RISC-V vendor toolchain that supports T-head CPUs. It offers vendor extensions series X-Thead, and optimized many special instructions.   

You can download the source and build it from [Here](https://github.com/T-head-Semi/xuantie-gnu-toolchain)

A prebuild toolchain can be downloaded from [Here](https://occ.t-head.cn/community/download)

## 1. How to Build
### 1.1 Download the source for github

``````
$ git clone https://github.com/T-head-Semi/xuantie-gnu-toolchain
``````

*Notes: the source files will take around 6.65 GB of disk and download size.*

### 1.2 Install prerequisites

Several standard packages are needed to build the toolchain, so we need to prepare the build environment before build.

- **On Ubuntu**
``````
$ apt-get install -y make diffutils autoconf automake autotools-dev curl python3 python3-pip libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev ninja-build git cmake libglib2.0-dev
``````

- **On On Fedora/CentOS/RHEL OS**
``````
$ dnf install -y make diffutils autoconf automake python3 libmpc-devel mpfr-devel gmp-devel gawk  bison flex texinfo patchutils gcc gcc-c++ zlib-devel expat-devel
``````

### 1.3 Build steps
Sets up the configure args at first, pick an install path like /opt/riscv, tools will be installed in /opt/riscv/bin subdir:

``````
$ ./configure --prefix=/opt/riscv –-with-arch=rv64gc_zfh_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadfmv_xtheadint_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync --with-abi=lp64d
``````

*Notes: you can enable any other supported RISC-V sub-extensions by adding extensions in --with-arch option. For example, to enable RISC-V Bitmanip extension in toolchain, you can add _zba_zbb_zbc_zbs follow exist args.*  

It supports two build modes: a generic ELF/Newlib toolchain and a more sophisticated Linux-ELF/glibc toolchain.

- **Newlib toolchain**

``````
$ make -j $(nproc)
``````

- **Linux-ELF/glibc toolchain**

``````
$ make linux -j $(nproc)
``````

*Notes: The build usually takes about fifteen minutes.*

### 1.4 Check the build
After build finished, check with
``````
$ /opt/riscv/bin/riscv64-xxx-gcc -v
``````

to see if the toolchain installed correctly.

## 2. How to use
You can get an introduction to basic usage through --help option:
``````
$ /opt/riscv/bin/riscv64-xxx-gcc --help
``````

For further details please refer to [GCC user manual](https://gcc.gnu.org/onlinedocs/gcc-13.2.0/gcc/)

## 3. Bug reports
If you meet any problems when using toolchain, please send a bug report to [GCC Bugzilla](https://gcc.gnu.org/bugzilla) or [open a new issue](https://github.com/riscv-collab/riscv-gnu-toolchain/issues).

The RISC-V toolchain SIG will help you solve the problem soon.