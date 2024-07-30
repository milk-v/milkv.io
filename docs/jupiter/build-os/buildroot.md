---
sidebar_label: 'Using Buildroot SDK'
sidebar_position: 10
---

# Using Buildroot SDK

## Cross Compilation

:::tip
Cross Compilation here refers to compiling Jupiter's firmware on an X86 PC.
:::

### Development Environment

#### Hardware requirements

Recommended hardware:

- CPU：12th Gen Intel(R) Core(TM) i5 or above
- Memory：16GB or above
- Disk：SSD，256GB or above

#### Operating System

Ubuntu 20.04 is recommended, other Linux distributions have not been tested.

#### Install Dependencies

- Ubuntu 16.04 and 18.04
  ```bash
  sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip zip
  ```
  ```bash
  sudo pip3 install pyyaml
  ```

- Ubuntu 20.04
  ```bash
  sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 python-is-python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip zip
  ```
  ```bash
  sudo pip3 install pyyaml
  ```

### Download source code

Use repo (version >= 2.41) to download the complete SDK.

Before using repo, please check whether the git environment is configured with user information. If not, you can refer to the following command to configure it:

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

Create and enter the working directory:
```bash
mkdir jupiter-linux
cd jupiter-linux
```

Download the code, for example download the `bl-v1.0.y` branch:
```bash
repo init -u https://github.com/milkv-jupiter/manifests.git -b main -m bl-v1.0.y.xml
repo sync
repo start bl-v1.0.y --all
```

When you need to synchronize the latest code later, just execute `repo sync`.

During the compilation process, Buildroot will download some source packages. To avoid download failures due to network reasons, you can use the following command to download the required source packages from the spacemit server in advance:
```bash
wget -c -r -nv -np -nH -R "index.html*" http://archive.spacemit.com/buildroot/dl
```
The downloaded source package is in the `buildroot/dl` directory.

Directory Structure:
```
├── bsp-src               # Linux kernel，uboot and opensbi source code
│   ├── linux-6.1
│   ├── opensbi
│   └── uboot-2022.10
├── buildroot             # Buildroot main directory
│   ├── dl                # Buildroot dependent packages
├── buildroot-ext         # Customized ext, such as board, configs, package, and patches
├── Makefile              # Top Makefile
├── package-src           # Locally deployed application or library source directory
│   ├── ai-support
│   ├── drm-test
│   ├── img-gpu-powervr
│   ├── k1x-cam
│   ├── k1x-jpu
│   ├── k1x-vpu-firmware
│   ├── k1x-vpu-test
│   ├── mesa3d
│   ├── mpp
│   └── v2d-test
└── scripts               # Scripts used during compilation
```

### First full compilation

For the first compilation, it is recommended to use `make envconfig` to compile completely. If `buildroot-ext/configs/spacemit_k1_defconfig` is modified later, `make envconfig` should be used to compile. In other cases, just use `make` to compile.

```bash
make envconfig
Available configs in buildroot-ext/configs/:
  1. spacemit_k1_defconfig
  2. spacemit_k1_minimal_defconfig
  3. spacemit_k1_plt_defconfig
  4. spacemit_k1_v2_defconfig


your choice (1-4):
```
Enter `1` and press Enter to start compiling.

After the compilation is complete, you can see:
```
Images successfully packed into /build/jupiter-linux/output/k1/images/bianbu-linux-k1.zip


Generating sdcard image...................................
INFO: cmd: "mkdir -p "/build/jupiter-linux/output/k1/build/genimage.tmp"" (stderr):
INFO: cmd: "rm -rf "/build/jupiter-linux/output/k1/build/genimage.tmp"/*" (stderr):
INFO: cmd: "mkdir -p "/build/jupiter-linux/output/k1/images"" (stderr):
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'bootinfo' from 'factory/bootinfo_sd.bin' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'fsbl' (in MBR) from 'factory/FSBL.bin' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'env' (in MBR) from 'env.bin' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'opensbi' (in MBR) from 'fw_dynamic.itb' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'uboot' (in MBR) from 'u-boot.itb' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'bootfs' (in MBR) from 'bootfs.img' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition 'rootfs' (in MBR) from 'rootfs.ext4' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition '[MBR]' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition '[GPT header]' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition '[GPT array]' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): adding partition '[GPT backup]' ...
INFO: hdimage(bianbu-linux-k1-sdcard.img): writing GPT
INFO: hdimage(bianbu-linux-k1-sdcard.img): writing protective MBR
INFO: hdimage(bianbu-linux-k1-sdcard.img): writing MBR
Successfully generated at /build/jupiter-linux/output/k1/images/bianbu-linux-k1-sdcard.img
```

There are two images generated:

- bianbu-linux-k1.zip is suitable for the `titanflasher` tool, or you can decompress it and use fastboot to flash the device.
- bianbu-linux-k1-sdcard.img is the SD card firmware. After decompression, you can use the `dd` command or `balenaEtcher` to write it to the SD card.

For detailed flashing methods, please refer to: [Milk-V Jupiter Install OS Image](https://milkv.io/docs/jupiter/getting-started/boot).

The firmware default username is: `root`, password is: `bianbu`.

### Modify configuration

If the default configuration does not meet your needs, such as you need to modify the kernel or add buildroot packages, you can modify it and recompile it by referring to the following method.

#### Buildroot

Call up the buildroot configuration interface:
```bash
make menuconfig
```
After modifying the configuration according to your needs, save the configuration. By default, it is saved to `buildroot-ext/configs/spacemit_k1_defconfig`:
```bash
make savedefconfig
```

#### Linux Kernel

Call up the kernel configuration interface:
```bash
make linux-menuconfig
```
After modifying the configuration according to your needs, save the configuration. By default, it is saved to `bsp-src/linux-6.1/arch/riscv/configs/k1_defconfig`:
```bash
make linux-update-defconfig
```

#### U-boot

Call up the u-boot configuration interface:
```bash
make uboot-menuconfig
```
After modifying the configuration according to requirements, save the configuration. By default, it is saved to `bsp-src/uboot-2022.10/configs/k1_defconfig`:
```bash
make uboot-update-defconfig
```

### Compile specified package

#### u-boot

Compile u-boot：
```bash
make uboot-rebuild
```

#### kernel

Compile kernel：
```bash
make linux-rebuild
```

#### buildroot

buildroot supports compiling specified packages. You can use `make help` to view the guide.

Common commands:

- Delete the build directory of `<pkg>`: `make <pkg>-dirclean`
- Compile `<pkg>`: `make <pkg>`

After compiling the specified package, you can download it to the Jupiter board for verification, or compile it into the firmware:
```bash
make
```

### Compile the bootloader and kernel separately

If you do not need to compile the entire image, and only want to compile opensbi, u-boot, and linux kernel, you can use the following method to compile them separately.

Download the cross compiler at [http://archive.spacemit.com/toolchain/](http://archive.spacemit.com/toolchain/), decompress it and use it.

Set the environment variables:
```bash
export PATH=/path/to/spacemit-toolchain-linux-glibc-x86_64-v0.3.3/bin:$PATH
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

#### Compile opensbi separately

```bash
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```

#### Compile u-boot separately

```bash
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```

The compilation will generate `u-boot-env-default.bin` according to `board/spacemit/k1-x/k1-x.env`, which corresponds to the image of the partition table `env` partition.

#### Compile linux kernel separately

```bash
cd /path/to/linux-6.1
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```

## Local Compilation

:::tip
Local compilation here means compiling Jupiter's bootloader and kernel directly on the system where Jupiter is running.
:::

Download opensbi, u-boot or linux kernel code to the Bianbu Desktop system and compile it locally.

### Compile opensbi

```bash
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```

Just write `platform/generic/firmware/fw_dynamic.itb` to the opensbi partition using fastboot.

### Compile u-boot

```bash
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```

Just write `FSBL.bin`, `u-boot-env-default.bin` and `u-boot.itb` to the corresponding partitions using fastboot.

### Compile linux kernel

```bash
cd /path/to/linux-6.1
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```

Replace the files corresponding to the `bootfs` partition with `arch/riscv/boot/Image.gz.itb` and `arch/riscv/boot/dts/spacemit/*.dtb`.
