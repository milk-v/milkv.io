---
sidebar_label: 'Introduction'
sidebar_position: 10
---

# Introduction

Cvitek provides TDL integration algorithms to reduce the time required for application development.

This architecture realizes the algorithm required by TDL, including its pre and post processing, and provides a unified and convenient programming interface.

At present, TDL SDK includes motion detection, face detection, face recognition, face tracking, pedestrian detection, semantic segmentation, license plate recognition, license plate detection, live recognition, IR live recognition, infant detection, cry detection, attitude detection, gesture detection, Gesture Recognition and other algorithms.

## Compilation

The TDL-SDK program needs to be cross-compiled in the Linux environment of the PC host, such as Ubuntu 22.04 system.

:::tip
Currently, there are two versions of OS for the Duo series board: V1 and V2. For related instructions, please refer to [Resource Download Summary](https://milkv.io/docs/duo/getting-started/download). The TDL-SDK for these two versions of OS is also different. The following describes the compilation methods of the TDL-SDK examples for these two versions of firmware.
:::

### TDL-SDK Examples for V1 OS Image

#### Download toolchain

```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
```

Extracting Toolchain:
```bash
tar xvf host-tools.tar.gz
```

Enter the toolchain directory and export the toolchain path to the environment variable:
```bash
cd host-tools
export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
```

Verify that the toolchain is available:
```
riscv64-unknown-linux-musl-gcc -v
```

The version information of the cross-compilation tool chain can be displayed normally, that is, the toolchain is available:
```
$ riscv64-unknown-linux-musl-gcc -v
Using built-in specs.
COLLECT_GCC=riscv64-unknown-linux-musl-gcc
...
Thread model: posix
Supported LTO compression algorithms: zlib
gcc version 10.2.0 (Xuantie-900 linux-5.10.4 musl gcc Toolchain V2.6.1 B-20220906)
```

#### Download TDL-SDK sample

Download the TDL-SDK source code, the Duo and Duo256M/DuoS repositories are different:

- Duo:
  ```bash
  git clone https://github.com/milkv-duo/cvitek-tdl-sdk-cv180x.git
  cd cvitek-tdl-sdk-cv180x
  ```

- Duo256M 和 DuoS:
  ```bash
  git clone https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x.git
  cd cvitek-tdl-sdk-sg200x
  ```

If the repositories code is updated, you can execute `git pull` in the code directory to pull the latest code, such as Duo256M and DuoS:
```bash
cd cvitek-tdl-sdk-sg200x
git pull
```
After pulling the latest code, continue compiling.

#### Compile samples

```
cd sample
./compile_sample.sh
```

The generated program is in the corresponding subdirectory in the sample directory. For example, the face detection example `sample_vi_fd` is locatedin
```
cvi_tdl/sample_vi_fd
```

Clean:
```bash
./compile_sample.sh clean
```

### TDL-SDK Examples for V2 OS Image

#### Get TDL-SDK sample

Get the repository code:
```
git clone https://github.com/milkv-duo/duo-tdl-examples.git
```

If there is any update to the repository code later, you can execute `git pull` in the code directory to pull the latest code, and then continue compiling after pulling the latest code.

#### Compile Example

The following takes the compilation of face detection program as an example to introduce the compilation process.

Enter the code directory:
```
cd duo-tdl-examples
```

Prepare the compilation environment:
```
source envsetup.sh
```
The first time you source it, the required toolchain will be automatically downloaded. The downloaded directory is named `host-tools`. When source it next time, if the directory already exists, it will not be downloaded again.

In the source process, you need to enter the required compilation target as prompted:
```
Select Product:
1. Duo (CV1800B)
2. Duo256M (SG2002) or DuoS (SG2000)
```
If the target board is Duo, select `1`, if the target board is Duo256M or DuoS, select `2`. Since Duo256M and DuoS support both RISCV and ARM architectures, you need to continue to select as prompted:
```
Select Arch:
1. ARM64
2. RISCV64
Which would you like:
```
If the test program needs to be run on a ARM system, select `1`, if it is an RISCV system, select `2`.

**In the same terminal, you only need to source it once.**

The sample program for face detection is `sample_vi_fd`. Enter the sample_vi_fd directory:
```
cd sample_vi_fd
```
Compile using the `make` command:
```
make
```
Send the `sample_vi_fd` program generated in the current directory to the Duo series board via `scp` or other methods for testing. If you need to clear the generated program, you can execute `make clean` to clear it.

Programs directly transferred to the Duo development board through `scp` may not have execution permissions. You need to add executable permissions in the development board's system using the `chmod` command:
```
chmod +x sample_vi_fd
```

The command to test the face detection example in the development board is `sample_vi_fd + face detection model file`. **Note that the models used in Duo and Duo256M/DuoS are different**.

Model download link: [https://github.com/milkv-duo/tdl-models](https://github.com/milkv-duo/tdl-models).

- Duo (CV180X)
  ```
  ./sample_vi_fd /mnt/cvimodel/scrfd_320_256_ir_0x.cvimodel
  ```

- Duo256M/DuoS (SG200X)
  ```
  ./sample_vi_fd /mnt/cvimodel/scrfd_768_432_int8_1x.cvimodel
  ```

At this time, point the camera at the face, and the terminal log will print the number of faces currently detected. If you need to preview the video screen in real time on a computer, please refer to [Face Detection Documentation](https://milkv.io/docs/duo/application-development/tdl-sdk/tdl-sdk-face-detection).

## Model support list

### TDL-SDK Model Data Types

[https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/6_Data_Types.html](https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/6_Data_Types.html)

### TDK-SDK Model Download (Sophgo)

[https://github.com/sophgo/tdl_models/tree/main](https://github.com/sophgo/tdl_models/tree/main)

## Example description

For detailed descriptions and running methods of each example, please refer to the following chapters.

## Reference Documentation

<table>
<thead>
  <tr>
    <td>Chinese Version(中文版)</td>
    <td colspan="2">格式</td>
    <td>English Version</td>
    <td colspan="2">Format</td>
  </tr>
</thead>
<tbody>
	<tr>
    <td>深度学习SDK软件开发指南</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/TDLSDKSoftwareDevelopmentGuide_zh.pdf">pdf</a></td>
    <td>TDL SDK Software Development Guide</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/TDLSDKSoftwareDevelopmentGuide_en.pdf">pdf</a></td>
  </tr>
  <tr>
    <td>YOLO系列开发指南</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/YOLO_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/YOLO_Development_Guide/build/YOLODevelopmentGuide_zh.pdf">pdf</a></td>
    <td>YOLO Development Guide</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/YOLO_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/YOLO_Development_Guide/build/YOLODevelopmentGuide_en.pdf">pdf</a></td>
  </tr>
</tbody>
</table>
