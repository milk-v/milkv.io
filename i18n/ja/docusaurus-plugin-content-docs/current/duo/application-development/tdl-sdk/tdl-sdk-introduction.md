---
sidebar_label: 'Introduction'
sidebar_position: 10
---

# Introduction

Cvitek provides TDL integration algorithms to reduce the time required for application development.

This architecture realizes the algorithm required by TDL, including its pre and post processing, and provides a unified and convenient programming interface.

At present, TDL SDK includes motion detection, face detection, face recognition, face tracking, pedestrian detection, semantic segmentation, license plate recognition, license plate detection, live recognition, IR live recognition, infant detection, cry detection, attitude detection, gesture detection, Gesture Recognition and other algorithms.

## Documents

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

## Compilation

The TDL-SDK program needs to be cross-compiled in the Linux environment of the PC host, such as Ubuntu 22.04 system.

1. Download toolchain

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

2. Compile cvitek-tdl-sdk

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

   Compile samples:
   ```
   cd sample
   ./compile_sample.sh
   ```

   The generated program is in the corresponding subdirectory in the sample directory. For example, the face detection example `sample_vi_fd` is located in
   ```
   cvi_tdl/sample_vi_fd
   ```

   Clean:
   ```bash
   ./compile_sample.sh clean
   ```

## Example description

For detailed descriptions and running methods of each example, please refer to the following chapters.

## Reference link

[https://developer.sophgo.com/thread/556.html](https://developer.sophgo.com/thread/556.html)
