---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# Introduction

Vega's default SDK is built based on buildroot and is used to generate Vega's firmware. The SDK mainly contains the following parts:

- u-boot: 2020.07-rc2
- linux kernel: 5.8.0
- buildroot: 2020.05-rc1
- opensbi: 0.7

Source code: [github](https://github.com/milkv-vega/vega-buildroot-sdk)

# Build image

Prepare the Compilation Environment. Using a local Ubuntu system, the officially supported compilation environment is `Ubuntu Jammy 22.04.x amd64` only!

If you are using other Linux distributions, we strongly recommend that you use the Docker environment to compile to reduce the probability of compilation errors.

The following describes the compilation methods in the two environments.

## 1. Compiled using Ubuntu 22.04

### Packages to be installed

```bash
sudo apt install -y make git gcc g++ bison flex device-tree-compiler mtd-utils
```

### Get SDK Source Code

```bash
git clone https://github.com/milkv-vega/vega-buildroot-sdk.git --depth=1
```

### One-click Compilation

Execute one-click compilation script `build.sh`：
```bash
cd vega-buildroot-sdk/
./build.sh
```

After successful compilation, you can see the three generated images in the `out` directory:
```
out/
├── freeloader.bin
├── kernel.bin
└── ubifs.img
```

## 2. Compiled using Docker

Docker support is required on hosts running Linux systems. For how to use Docker, please refer to the [official documentation](https://docs.docker.com/) or other tutorials.

We put the SDK source code on the Linux host system and call the Docker image environment provided by Milk-V to compile it.

### Pull SDK code on Linux host

```bash
git clone https://github.com/milkv-vega/vega-buildroot-sdk.git --depth=1
```

### Enter the SDK code directory

```bash
cd vega-buildroot-sdk
```

### Pull the Docker image and run

:::tip
The Docker image used here is the same Docker image used by Milk-V’s other product Duo.
:::

```bash
docker run -itd --name vegadocker -v $(pwd):/home/work milkvtech/milkv-duo:latest /bin/bash
```

Description of some parameters in the command:
- `vegadocker` Docker name, you can use the name you want to use.
- `$(pwd)` The current directory, here is the duo-buildroot-sdk directory that was 'cd' to in the previous step.
- `-v $(pwd):/home/work`  Bind the current code directory to the /home/work directory in the Docker image.
- `milkvtech/milkv-duo:latest` The Docker image provided by Milk-V will be automatically downloaded from hub.docker.com for the first time.

After Docker runs successfully, you can use the `docker ps -a` command to view the running status:
```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND       CREATED       STATUS       PORTS     NAMES
8edea33c2239   milkvtech/milkv-duo:latest   "/bin/bash"   2 hours ago   Up 2 hours             vegadocker
```

### One-click compilation using Docker

```bash
docker exec -it vegadocker /bin/bash -c "cd /home/work && cat /etc/issue && ./build.sh"
```

Description of some parameters in the command:
- `vegadocker` The name of the running Docker must be consistent with the name set in the previous step.
- `"*"` In quotes is the shell command to be run in the Docker image.
- `cd /home/work` Switch to the /home/work directory. Since this directory has been bound to the host's code directory during runtime, the /home/work directory in Docker is the source code directory of the SDK.
- `cat /etc/issue` Displays the version number of the image used by Docker. It is currently Ubuntu 22.04.3 LTS and is used for debugging.
- `./build.sh` Execute one-click compilation script.

After successful compilation, you can see the three generated images in the `out` directory:
```
out/
├── freeloader.bin
├── kernel.bin
└── ubifs.img
```

### Stop Docker

After compilation is completed, if the above Docker running environment is no longer needed, you can stop it first and then delete it:
```bash
docker stop 8edea33c2239
docker rm 8edea33c2239
```

## 3. Other compilation considerations

If you want to try to compile this SDK in an environment other than the above two environments, the following are things you may need to pay attention to, for reference only.

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

## 4. Image burning

Burning the image requires inputting commands through the serial port. For the use of the serial port, please refer to [here](https://milkv.io/docs/vega/getting-started/setup#serial-console).

To burn the three image files generated by SDK compilation into the Vega device, you need to use the TFTP environment.

### Installing TFTP service in Ubuntu 22.04

Install tftp service:
```bash
sudo apt update
sudo apt install tftpd-hpa
```

Edit configuration file:
```
sudo vi /etc/default/tftpd-hpa
```
Modify `TFTP_DIRECTORY` to the directory where the image file is stored, such as the `tftp` directory under the user directory:
```
TFTP_USERNAME="tftp"
TFTP_DIRECTORY="/home/xxx/tftp"
TFTP_ADDRESS=":69"
TFTP_OPTIONS="--secure"
```

Create a tftp directory in the user directory to store files that need to be transferred through the tftp service:
```bash
mkdir /home/xxx/tftp
```

Restart the tftp service:
```bash
sudo systemctl restart tftpd-hpa
```

In the device's u-boot command line, test whether the tftp service in the host Ubuntu is working properly:

- Configure the IP to be used by the current device and the IP of the tftp server:
  ```
  setenv ipaddr 192.168.2.2222;setenv serverip 192.168.2.66
  ```
- ping host:
  ```
  ping 192.168.2.66
  ```
  If the ping is successful, the tftp service on Ubuntu is normal.

### Burn Loader

Place `freeloader.bin` in the tftp directory. After the Vega device is powered on, after seeing the following prompt in the serial port, quickly enter `asd` to enter the u-boot terminal:

```
U-Boot 2020.07-rc2 (Jan 12 2024 - 16:32:24 +0800)

CPU:   rv64imafdc
Model: nuclei,ux600fd
DRAM:  240 MiB
Board: Initialized
NAND:  128 MiB
Loading Environment from SPI Flash... SF: Detected w25q32 with page size 256 Bytes, erase size 4 KiB, total 4 MiB
OK
In:    console
Out:   console
Err:   console
Net:   xy1000_eth
Press asd to abort autoboot in 2 seconds
=>
```

Connect the network cable in the same network segment as the TFTP server to any port of Vega, and configure the IP of Vega and the IP of the TFTP server in the u-boot terminal of the serial port. For example, the IP of the TFTP server is `192.168.2.66`, and the IP of Vega Configured as `192.168.2.222`, the command is as follows:

```
setenv ipaddr 192.168.2.222;setenv serverip 192.168.2.66
```

Burn `freeloader.bin`:
```
run updatefreeloader
```
You must wait for the burning to be completed here. When the command line prompt `=>` appears, the burning is completed. After burning `freeloader.bin`, you need to power on again, quickly enter `asd` to enter the u-boot terminal, and continue burning the kernel and file system.

## Burn kernel and file system

Similarly, place the two image files kernel.bin and ubifs.img to be burned in the `tftp` directory. In the u-boot terminal, configure the TFTP-related IP as above:
```
setenv ipaddr 192.168.2.222;setenv serverip 192.168.2.66
```

Burn `kernel.bin`：
```
run updateos_nand
```

Burn `ubifs.img`：
```
run updateubifs_boot
```

Set startup command:
```
setenv bootcmd run bootcmd_ubifs_boot
```

Save environment variables:
```
saveenv
```

start up:
```
boot
```