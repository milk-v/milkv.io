---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# Introduction

## Buildroot SDK V1

Duo's default SDK is built based on buildroot and is used to generate Duo's firmware. The SDK mainly contains the following parts:

- u-boot: 2021.10
- linux kernel: 5.10.4
- buildroot: 2021.05
- opensbi: 89182b2

Source code: [https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

SDK Directory Structure

```text
├── build               // compilation scripts and board configs
├── build.sh            // one-click compilation script
├── buildroot-2021.05   // buildroot source code
├── freertos            // freertos system
├── fsbl                // fsbl firmware in prebuilt form
├── install             // temporary images stored here
├── isp_tuning          // camera effect parameters
├── linux_5.10          // linux kernel
├── middleware          // self-developed multimedia framework
├── device              // configuration files for milkv
├── opensbi             // opensbi library
├── out                 // final image for SD card
├── ramdisk             // prebuilt ramdisk
└── u-boot-2021.10      // u-boot source code
```

:::tip
The V1 version of SDK does not support the ARM core of Duo256M and DuoS. If you need to use the ARM core, please use the V2 version of SDK.
:::

## Buildroot SDK V2

The V2 version SDK adds support for Duo256M and DuoS ARM cores, and the compilation method is basically the same as the V1 version SDK.

Source code: [https://github.com/milkv-duo/duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2)

# Build image

Prepare the Compilation Environment. Using a local Ubuntu system, the officially supported compilation environment is `Ubuntu Jammy 22.04.x amd64` only!

If you are using other Linux distributions, we strongly recommend that you use the Docker environment to compile to reduce the probability of compilation errors.

The following describes the compilation methods in the two environments.

## 1. Compiled using Ubuntu 22.04

### Packages to be installed

Install the packages that compile dependencies:

```bash
sudo apt install -y pkg-config build-essential ninja-build automake autoconf libtool wget curl git gcc libssl-dev bc slib squashfs-tools android-sdk-libsparse-utils jq python3-distutils scons parallel tree python3-dev python3-pip device-tree-compiler ssh cpio fakeroot libncurses5 flex bison libncurses5-dev genext2fs rsync unzip dosfstools mtools tcl openssh-client cmake expect python-is-python3
```

For [duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2), you also need to install the following tool packages:
```bash
sudo pip install jinja2
```

### Get SDK Source Code

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk.git --depth=1
```

### 1). One-click Compilation

Execute one-click compilation script `build.sh`：
```bash
cd duo-buildroot-sdk/
./build.sh
```

You will see tips on how to use the compiled script:
```bash
# ./build.sh
Usage:
./build.sh              - Show this menu
./build.sh lunch        - Select a board to build
./build.sh [board]      - Build [board] directly, supported boards asfollows:
milkv-duo-sd
milkv-duo-spinand
milkv-duo-spinor
milkv-duo256m-sd
milkv-duo256m-spinand
milkv-duo256m-spinor
milkv-duos-emmc
milkv-duos-sd
```
Listed at the bottom is the list of currently supported target versions.

As shown in the prompt, there are two ways to compile the target version.

The first method is to execute `./build.sh lunch` to bring up the interactive menu, select the version number to be compiled, and press Enter:
```bash
# ./build.sh lunch
Select a target to build:
1. milkv-duo-sd
2. milkv-duo-spinand
3. milkv-duo-spinor
4. milkv-duo256m-sd
5. milkv-duo256m-spinand
6. milkv-duo256m-spinor
7. milkv-duos-emmc
8. milkv-duos-sd
Which would you like:
```

The second method is to put the name of the target version after the script and compile it directly. For example, if you need to compile the image of `milkv-duo-sd`, the command is as follows:
```bash
# ./build.sh milkv-duo-sd
```

After a successful compilation, you can find the generated SD card burning image `milkv-duo-sd-*-*.img` in the `out` directory.

*Note: The first compilation will automatically download the required toolchain, which is approximately 840MB in size. Once downloaded, it will be automatically extracted to the `host-tools` directory in the SDK directory. For subsequent compilations, if the `host-tools` directory is detected, the download will not be performed again*.

### 2). Step-by-step Compilation

If you have not executed the one-click compilation script, you need to manually download the toolchain [host-tools](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz) and extract it to the SDK root directory:

```bash
tar -xf host-tools.tar.gz -C /your/sdk/path/
```

Then enter the following commands in sequence to complete the step-by-step compilation. Replace `[board]` and `[config]` in the command with the version that needs to be compiled. The currently supported `board` and corresponding `config` are as follows:
```
milkv-duo-sd             cv1800b_milkv_duo_sd
milkv-duo-spinand        cv1800b_milkv_duo_spinand
milkv-duo-spinor         cv1800b_milkv_duo_spinor
milkv-duo256m-sd         cv1812cp_milkv_duo256m_sd
milkv-duo256m-spinand    cv1812cp_milkv_duo256m_spinand
milkv-duo256m-spinor     cv1812cp_milkv_duo256m_spinor
milkv-duos-emmc          cv1813h_milkv_duos_emmc
milkv-duos-sd            cv1813h_milkv_duos_sd
```

```bash
source device/[board]/boardconfig.sh

source build/milkvsetup.sh
defconfig [config]
clean_all
build_all
pack_sd_image
```

For example, if you need to compile the image of `milkv-duo-sd`, the step-by-step compilation command is as follows:
```bash
source device/milkv-duo-sd/boardconfig.sh

source build/milkvsetup.sh
defconfig cv1800b_milkv_duo_sd
clean_all
build_all
pack_sd_image
```

Generated firmware location:
```
Duo:      install/soc_cv1800b_milkv_duo_sd/[board].img
Duo256M:  install/soc_cv1812cp_milkv_duo256m_sd/[board].img
```

## 2. Compiled using Docker

Docker support is required on hosts running Linux systems. For how to use Docker, please refer to the [official documentation](https://docs.docker.com/) or other tutorials.

We put the SDK source code on the Linux host system and call the Docker image environment provided by Milk-V to compile it.

### Pull SDK code on Linux host

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk.git --depth=1
```

### Enter the SDK code directory

```bash
cd duo-buildroot-sdk
```

### Pull the Docker image and run

```bash
docker run --privileged -itd --name duodocker -v "$(pwd)":/home/work milkvtech/milkv-duo:latest /bin/bash
```

Description of some parameters in the command:
- `--privileged` starts the container in privileged mode.
- `duodocker` Docker name, you can use the name you want to use.
- `$(pwd)` The current directory, here is the duo-buildroot-sdk directory that was 'cd' to in the previous step.
- `-v $(pwd):/home/work`  Bind the current code directory to the /home/work directory in the Docker image.
- `milkvtech/milkv-duo:latest` The Docker image provided by Milk-V will be automatically downloaded from hub.docker.com for the first time.

After Docker runs successfully, you can use the `docker ps -a` command to view the running status:
```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND       CREATED       STATUS       PORTS     NAMES
8edea33c2239   milkvtech/milkv-duo:latest   "/bin/bash"   2 hours ago   Up 2 hours             duodocker
```

:::tip
If the image on the Docker server is updated, you can use the `docker pull milkvtech/milkv-duo:latest` command to synchronize the latest image.
:::

### 1). One-click compilation using Docker

```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh [board]"
```

Note that the `./build.sh [board]` at the end of the command is the same as the previous usage in the one-click compilation instructions in Ubuntu 22.04. Use `./build.sh` can see how to use the command, use `./ build.sh lunch` can bring up the interactive selection menu, use `./build.sh [board]` to directly compile the target version, `[board]` can be replaced with:
```
milkv-duo-sd
milkv-duo-spinand
milkv-duo-spinor
milkv-duo256m-sd
milkv-duo256m-spinand
milkv-duo256m-spinor
milkv-duos-emmc
milkv-duos-sd
```

Description of some parameters in the command:
- `duodocker` The name of the running Docker must be consistent with the name set in the previous step.
- `"*"` In quotes is the shell command to be run in the Docker image.
- `cd /home/work` Switch to the /home/work directory. Since this directory has been bound to the host's code directory during runtime, the /home/work directory in Docker is the source code directory of the SDK.
- `cat /etc/issue` Displays the version number of the image used by Docker. It is currently Ubuntu 22.04.3 LTS and is used for debugging.
- `./build.sh [board]` Execute one-click compilation script.

For example, if you need to compile the image of `milkv-duo-sd`, the command is as follows:
```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh milkv-duo-sd"
```

After successful compilation, you can see the generated SD card burning image `[board]-*-*.img` in the `out` directory.

### 2). Compile step by step using Docker

If you have not executed the one-click compilation script, you need to manually download the toolchain [host-tools](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz) and extract it to the SDK root directory:

```bash
tar -xf host-tools.tar.gz -C /your/sdk/path/
```

Step-by-step compilation requires logging into Docker to operate. Use the command `docker ps -a` to view and record the ID number of the container, such as 8edea33c2239.

Enter Docker:
```bash
docker exec -it 8edea33c2239 /bin/bash
```

Enter the code directory bound in Docker：
```bash
root@8edea33c2239:/# cd /home/work/
```

Then enter the following commands in sequence to complete the step-by-step compilation. Replace `[board]` and `[config]` in the command with the version that needs to be compiled. The currently supported `board` and corresponding `config` are as follows:
```
milkv-duo-sd             cv1800b_milkv_duo_sd
milkv-duo-spinand        cv1800b_milkv_duo_spinand
milkv-duo-spinor         cv1800b_milkv_duo_spinor
milkv-duo256m-sd         cv1812cp_milkv_duo256m_sd
milkv-duo256m-spinand    cv1812cp_milkv_duo256m_spinand
milkv-duo256m-spinor     cv1812cp_milkv_duo256m_spinor
milkv-duos-emmc          cv1813h_milkv_duos_emmc
milkv-duos-sd            cv1813h_milkv_duos_sd
```

```bash
source device/[board]/boardconfig.sh

source build/milkvsetup.sh
defconfig [config]
clean_all
build_all
pack_sd_image
```

For example, if you need to compile the image of `milkv-duo-sd`, the step-by-step compilation command is as follows:
```bash
source device/milkv-duo-sd/boardconfig.sh

source build/milkvsetup.sh
defconfig cv1800b_milkv_duo_sd
clean_all
build_all
pack_sd_image
```

Generated firmware location:
```
Duo:      install/soc_cv1800b_milkv_duo_sd/[board].img
Duo256M:  install/soc_cv1812cp_milkv_duo256m_sd/[board].img
```

Generated firmware location: `install/soc_cv1800b_milkv_duo_sd/milkv-duo-sd.img`.

After compilation is completed, you can use the `exit` command to exit the Docker environment:
```bash
root@8edea33c2239:/home/work# exit
```
The generated firmware can also be seen in the host code directory.

### Stop Docker

After compilation is completed, if the above Docker running environment is no longer needed, you can stop it first and then delete it:
```bash
docker stop 8edea33c2239
docker rm 8edea33c2239
```

## 3. Other compilation considerations

If you want to try to compile this SDK in an environment other than the above two environments, the following are things you may need to pay attention to, for reference only.

### cmake version

Note：`cmake` minimum version requirement is `3.16.5`.

Check the version of `cmake` in the system:

```bash
cmake --version
```

For example, the version of `cmake` installed using apt in the `Ubuntu 20.04` is:

```
cmake version 3.16.3
```

The minimum requirement of this SDK is not met. Manual installation of the latest version `3.27.6` is needed:

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.27.6/cmake-3.27.6-linux-x86_64.sh
chmod +x cmake-3.27.6-linux-x86_64.sh
sudo sh cmake-3.27.6-linux-x86_64.sh --skip-license --prefix=/usr/local/
```

When manually installed, `cmake` is located in `/usr/local/bin`. To check its version, use the command `cmake --version`, which should display:

```
cmake version 3.27.6
```

### Compiling with Windows Linux Subsystem (WSL)

If you wish to perform the compilation with WSL, there's an small issue building the image.
The $PATH, due Windows interoperability, has Windows environment variables which include some spaces between the paths.

To solve this problem you need to change the `/etc/wsl.conf` file and add the following lines:

```
[interop]
appendWindowsPath = false
```

After that, you need to reboot the WSL with `wsl.exe --reboot`. Then you able to run the `./build.sh` script or the `build_all` line in the step-by-step compilation method.
To rollback this change in `/etc/wsl.conf` file set `appendWindowsPath` as true. To reboot the WSL, can you use the Windows PowerShell command `wsl.exe --shutdown` then `wsl.exe`, after that the Windows environment variables become avaliable again in $PATH.

## 4. Add application packages

Buildroot is a lightweight embedded Linux system building tool. The system it generates does not have the apt package management tool like the Ubuntu system to download and use application packages. Duo's default SDK has added some commonly used tools or commands. If you need to add your own applications, you need to make some modifications to the SDK and recompile to generate the required system firmware.

The following introduces several common methods for adding application packages in Buildroot.

### Enable commands in Busybox

In a system built using Buildroot, some basic commands are provided by busybox. You can check whether the configuration file of busybox contains the commands you need, enable it and recompile. The location of the configuration file of busybox is:

```
buildroot-2021.05/package/busybox/busybox.config
```

For example, the timeout command, how to enable it:

```diff {9,10}
diff --git a/buildroot-2021.05/package/busybox/busybox.config b/buildroot-2021.05/package/busybox/busybox.config
index d7d58f064..b268cd6f8 100644
--- a/buildroot-2021.05/package/busybox/busybox.config
+++ b/buildroot-2021.05/package/busybox/busybox.config
@@ -304,7 +304,7 @@ CONFIG_TEST=y
 CONFIG_TEST1=y
 CONFIG_TEST2=y
 CONFIG_FEATURE_TEST_64=y
-# CONFIG_TIMEOUT is not set
+CONFIG_TIMEOUT=y
 CONFIG_TOUCH=y
 # CONFIG_FEATURE_TOUCH_NODEREF is not set
 CONFIG_FEATURE_TOUCH_SUSV3=y
```

Refer to this commit: [busybox: add timeout command](https://github.com/milkv-duo/duo-buildroot-sdk/commit/2833c24f11bb48776094265b7b16cfde87f86083)

### Configure application packages preset in Buildroot

In addition, a large number of application packages are preset in Buildroot. The required programs are generated by downloading the source code and compiling them. The preset application packages of Buildroot can be viewed in the `buildroot-2021.05/package` directory.

Configuring to enable or disable an application package is implemented in the target board's configuration file. Taking the `milkv-duo-sd` target as an example, its buildroot configuration file is:
```
buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig
```

We can compile the SDK as a whole on the host (such as Ubuntu), and then go to the Buildroot compilation directory to configure the relevant application packages through command line menu interaction.

1. Enter the Buildroot compilation directory

   ```
   cd buildroot-2021.05/output/milkv-duo-sd_musl_riscv64
   ```

   You can use the `make show-targets` command to view the currently used application packages:

   ```
   $ make show-targets
   busybox coreutils dhcpcd dnsmasq dropbear duo-pinmux e2fsprogs evtest expat fio freetype gdb host-acl host-attr host-autoconf host-automake host-e2fsprogs host-fakeroot host-genimage host-libtool host-libzlib host-m4 host-makedevs host-mkpasswd host-patchelf host-pkgconf host-skeleton host-util-linux host-xz host-zlib htop ifupdown-scripts initscripts iperf3 json-c kmod libevent libffi libnl libopenssl libxml2 libxslt libzlib musl-compat-headers ncurses ntp openssl python-cffi python-evdev python-freetype python-lxml python-modbus-tk python-pillow python-pinpong python-pip python-psutil python-pycparser python-serial python-setuptools python-smbus-cffi python-spidev python3 skeleton skeleton-init-common skeleton-init-sysv spidev_test strace stress-ng tar toolchain toolchain-external toolchain-external-custom urandom-scripts util-linux wpa_supplicant zlib rootfs-ext2 rootfs-tar
   ```

2. Configure Buildroot

   Execute the `make menuconfig` command to bring up the interactive menu:

   <Image src='/docs/duo/buildroot/milkv-duo-buildroot-sdk-01.webp' maxWidth='100%' align='left' />

   Find the required application package according to the classification in `Target packages`. If you don't know the specific location of the application package, you can press the `/` key to search for the package name. For example, if you want to install the `tar` command, since searching for `tar` will bring up too many other irrelevant content, you can search for `package_tar`. And see that `=n` is currently disabled. Its location is in the `System tools` category of `Target packages`. You can double-click the `ESC` key to return to the main page. Then enter the corresponding position on the interface, or you can directly enter the position according to the number prompted earlier:

   <Image src='/docs/duo/buildroot/milkv-duo-buildroot-sdk-02.webp' maxWidth='100%' align='left' />

   Press the space bar to enable:

   <Image src='/docs/duo/buildroot/milkv-duo-buildroot-sdk-03.webp' maxWidth='100%' align='left' />

   Double-click the `ESC` key continuously to exit the main interface. When prompted whether to save, the default is YES. Just press Enter to save and exit:

   <Image src='/docs/duo/buildroot/milkv-duo-buildroot-sdk-04.webp' maxWidth='100%' align='left' />

   Execute the `make savedefconfig` command to save the modified configuration to the original configuration file. Use the `git status` command to confirm. You can see that the original configuration file has been modified:

   <Image src='/docs/duo/buildroot/milkv-duo-buildroot-sdk-05.webp' maxWidth='100%' align='left' />

   At this point, go back to the SDK root directory and recompile.

   :::tip
   Here you can also compare the differences between the old configuration file and the new configuration file in the compilation directory, and manually modify the parts that need to be changed directly into the original configuration file `milkv-duo-sd_musl_riscv64_defconfig`:
   ```diff
   diff -u .config.old .config
   ```
   :::

   After starting with the newly compiled image, test the newly added command on the Duo device. If a `not found` error occurs, it may be that the `.mk` configuration file of the package needs to be supplemented with gcc parameters, mainly `TARGET_CFLAGS` and The two parameters of `TARGET_LDFLAGS` need to be added. You can refer to the following commits:

   1. [buildroot: enable fio](https://github.com/milkv-duo/duo-buildroot-sdk/commit/6ebbd6e219d3efcd9b95086c75702f4f717e7f03#diff-1a84d28825d604f941100ff9b50ec8d63bf84535a3dd6f7e62c421a657e6556a)
   2. [buildroot: enable spidev_test](https://github.com/milkv-duo/duo-buildroot-sdk/commit/84d6b72eb6c9ff467410376fc982b5ee4f8e3d1f#diff-d0fb4ce2e7555c5cc5399aeaa75e4bf5fd429f034f4d00457f450a994204b97f)
   3. [buildroot: fix build parameter for coremark package](https://github.com/milkv-duo/duo-buildroot-sdk/commit/cdd4fabb6100f87a61ca7560def558cd9e38f91a)

### Add your own application package

Compile and test your own application. The method of integrating it into the Buildroot project is not recommended. It is recommended to use method [duo-examples](https://github.com/milkv-duo/duo-examples).

If you really need to compile your application in Buildroot package mode, you can refer to the configuration of the preset package in Buildroot to add it. Here are a few reference links:

1. [buildroot: add python-evdev required by the pinpong library](https://github.com/milkv-duo/duo-buildroot-sdk/commit/11caee79c7a48f7f6fd4a5d352ccf8976857d522)
2. [buildroot: add python-freetype required by the pinpong library](https://github.com/milkv-duo/duo-buildroot-sdk/commit/165fc3c4c1adca1d1f635fd2069a5ad67d895c7c)

Mainly refer to the content added in `buildroot-2021.05/package`.

## 5. Delete application packages

If you need to delete some unnecessary application packages to speed up compilation, or disable some unnecessary packages when compiling the firmware by yourself, you can use the `make menuconfig` method of opening the Buildroot application package mentioned above to disable related packages.

You can also delete the corresponding package name in the Buildroot configuration file. Take the `milkv-duo-sd` target as an example. For example, if you do not need to compile Python-related libraries, you can make the following modifications and recompile to generate firmware.

```diff title="buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig"
diff --git a/buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig b/buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig
index 2bc8cd5e3..e78901afb 100644
--- a/buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig
+++ b/buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig
@@ -330,25 +330,6 @@ BR2_PACKAGE_EVTEST=y
 # BR2_PACKAGE_FCONFIG is not set
 BR2_PACKAGE_FLASHROM_ARCH_SUPPORTS=y
 
-BR2_PACKAGE_PYTHON3=y
-BR2_PACKAGE_PYTHON3_PY_PYC=y
-BR2_PACKAGE_PYTHON_LXML=y
-BR2_PACKAGE_PYTHON_PIP=y
-BR2_PACKAGE_PYTHON_SETUPTOOLS=y
-BR2_PACKAGE_PYTHON3_SSL=y
-
-BR2_PACKAGE_PYTHON_SERIAL=y
-BR2_PACKAGE_PYTHON_PILLOW=y
-BR2_PACKAGE_PYTHON_SMBUS_CFFI=y
-BR2_PACKAGE_PYTHON_SPIDEV=y
-BR2_PACKAGE_PYTHON_MODBUS_TK=y
-BR2_PACKAGE_PYTHON_EVDEV=y
-BR2_PACKAGE_PYTHON_FREETYPE=y
-
-BR2_PACKAGE_PYTHON_PINPONG=y
-
-BR2_PACKAGE_PYTHON_PSUTIL=y
-
 #
 # Compression and decompression
 #
```

## 6. Frequently Asked Questions

### Buildroot troubleshooting method

Buildroot in the SDK enables top-level parallel compilation by default to speed up compilation. However, when a compilation error occurs, it is inconvenient to analyze the error log, so we can delete it in the config file first, and then reopen it after the problem is solved.

Take the `milkv-duo-sd` target as an example. After deleting the line in its configuration file, delete the `buildroot-2021.05/output` directory and recompile:

```bash title="buildroot-2021.05/configs/milkv-duo-sd_musl_riscv64_defconfig"
BR2_PER_PACKAGE_DIRECTORIES=y
```

When a compilation error occurs, in addition to checking the error information of the compilation terminal, you can also check the complete log in `build/br.log` for troubleshooting.
