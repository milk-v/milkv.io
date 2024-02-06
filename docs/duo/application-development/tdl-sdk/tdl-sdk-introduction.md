---
sidebar_label: 'Introduction'
sidebar_position: 10
---

## Introduction

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

1. Download toolchain

   ```bash
   wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
   tar xvf host-tools.tar.gz
   cd host-tools
   export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
   ```

2. Compile cvitek-tdl-sdk

   Duo:
   ```bash
   git clone https://github.com/milkv-duo/cvitek-tdl-sdk-cv180x.git
   cd cvitek-tdl-sdk-cv180x
   ```

   Duo256M and DuoS:
   ```bash
   git clone https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x.git
   cd cvitek-tdl-sdk-sg200x
   ```

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
