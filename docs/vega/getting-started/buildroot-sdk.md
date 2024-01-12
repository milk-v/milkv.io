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