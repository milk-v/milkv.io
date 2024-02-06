---
sidebar_label: '简介'
sidebar_position: 10
---

## TDL SDK 简介

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

1. 下载工具链

   ```bash
   wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
   tar xvf host-tools.tar.gz
   cd host-tools
   export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
   ```

2. 编译 cvitek-tdl-sdk

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

## 参考链接

[https://developer.sophgo.com/thread/556.html](https://developer.sophgo.com/thread/556.html)
