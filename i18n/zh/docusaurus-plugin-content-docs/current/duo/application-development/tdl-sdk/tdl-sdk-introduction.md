---
sidebar_label: '简介'
sidebar_position: 10
---

# 简介

Cvitek 所提供的 TDL（Turnkey Deep Learning）集成算法，用以缩短应用程序开发所需的时间。

此架构实现了 TDL 所需算法包含其前后处理 提供统一且便捷的编程接口。

目前 TDL SDK 包含 移动侦测，人脸检测，人脸识别，人脸追踪，行人检测，语义分割，车牌辨识，车牌检测，活体识别，IR活体识别，婴儿检测，哭声检测，姿态检测，手势侦测，手势识别 等算法。

## 参考文档

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

## 编译

TDL-SDK 程序需要在 PC 主机的 Linux 环境下进行交叉编译，比如 Ubuntu 22.04 系统。

1. 下载交叉编译工具链

   ```bash
   wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
   ```

   解压工具链：
   ```bash
   tar xvf host-tools.tar.gz
   ```

   进入工具链目录中将工具链的路径导出到环境变量中：
   ```bash
   cd host-tools
   export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
   ```

   验证工具链是否可用：
   ```
   riscv64-unknown-linux-musl-gcc -v
   ```
   能够正常显示交叉编译工具链的版本信息，即工具链可用：
   ```
   $ riscv64-unknown-linux-musl-gcc -v
   Using built-in specs.
   COLLECT_GCC=riscv64-unknown-linux-musl-gcc
   ...
   Thread model: posix
   Supported LTO compression algorithms: zlib
   gcc version 10.2.0 (Xuantie-900 linux-5.10.4 musl gcc Toolchain V2.6.1 B-20220906)
   ```

2. 编译 cvitek-tdl-sdk

   下载 TDL-SDK 源码，Duo 和 Duo256M/DuoS 仓库有所不同：

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

     后续仓库代码如有更新，可以在代码目录中执行 `git pull` 拉取最新的代码，比如 Duo256M 和 DuoS：
     ```bash
     cd cvitek-tdl-sdk-sg200x
     git pull
     ```
     拉取到最新代码后再继续编译。

   编译:
   ```
   cd sample
   ./compile_sample.sh
   ```

   生成的示例程序位于相应的子目录中，比如人脸检测示例 `sample_vi_fd` 位于：
   ```
   cvi_tdl/sample_vi_fd
   ```

   Clean:
   ```bash
   ./compile_sample.sh clean
   ```

## 示例说明

各示例的详细说明及运行方法，请参考后面章节。

## 参考链接

[https://developer.sophgo.com/thread/556.html](https://developer.sophgo.com/thread/556.html)
