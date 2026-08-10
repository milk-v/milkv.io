---
sidebar_label: 'Docker dev environment'
sidebar_position: 20
---

# Setting up Docker development environment

## Docker installation

In the windows environment, you can install `Docker Desktop for Windows`, Docker [download address](https://docs.docker.com/desktop/install/windows-install/)

![duo](/docs/duo/tpu/duo-tpu-docker_01.png)

Running Docker under Windows requires relevant dependencies, as shown in the figure, you need to use the WSL2 backend or Hyper-V backend as a running dependency.

The enabling method for the Hyper-V backend is as follows:

1. Control Panel - Programs and Features - Turn Windows features on or off
2. Find `Hyper-V`, check `Hyper-V Management Tools` and `Hyper-V Platform`, click OK and wait for the system file configuration to be completed before restarting the computer.

   ![duo](/docs/duo/tpu/duo-tpu-docker_02-en.png)

Then you can install and download Docker Desktop for Windows, and make the appropriate check according to the selected backend in the installation guide.

After the installation is complete, you need to restart your computer and then you can use Docker.

## Pull the Docker image required for development

Get the image file from Docker hub
```
docker pull sophgo/tpuc_dev:v3.1
```

```
PS C:\Users\Carbon> docker pull sophgo/tpuc_dev:v3.1
v3.1: Pulling from sophgo/tpuc_dev
b237fe92c417: Pull complete
db3c30810eab: Downloading  411.1MB/629.4MB
2651dfd68288: Download complete
db3c5981ae16: Download complete
16098f82aa65: Download complete
85e8821c88fd: Download complete
d8a25a7307da: Download complete
91fd425676de: Download complete
b3ad6c6ed19d: Downloading  346.1MB/480.6MB
ecaa420e1520: Download complete
a570c4642598: Download complete
2d76e68a7946: Download complete
1df3b38113a9: Download complete
4f4fb700ef54: Download complete
f835d42d7adc: Download complete
2b009425c205: Downloading  252.9MB/1.098GB
```

## Start Docker container

```
docker run --privileged --name <container_name> -v /workspace -it sophgo/tpuc_dev:v3.1
```
`<container_name>` is the container name defined by yourself, such as DuoTPU
```
docker run --privileged --name DuoTPU -v /workspace -it sophgo/tpuc_dev:v3.1
```

## Log in to the Docker container

After starting the container, you will automatically log in to the terminal interface of the Docker window. If you need to open a new window, you can do it as follows

Use the `docker ps` command to view the current Docker container list
```
PS C:\Users\Carbon\Duo-TPU> docker ps
CONTAINER ID   IMAGE                  COMMAND
f3a060efb1d3   sophgo/tpuc_dev:v3.1   "/bin/bash"
```

Log in to the Docker container using the `CONTAINER ID`
```
docker exec -it f3a060efb1d3 /bin/bash
```

In Docker terminal, check whether the current directory is `/workspace`. If not, use the `cd` command to enter the directory.
```
# cd /workspace/
```

![duo](/docs/duo/tpu/duo-tpu-docker_03.png)


## Get development kit and add environment variables

Download the TPU-MLIR model conversion toolkit in the Docker terminal
```
git clone https://github.com/milkv-duo/tpu-mlir.git
```

In the Docker terminal, use the `source` command to add environment variables
```
# source ./tpu-mlir/envsetup.sh
```
