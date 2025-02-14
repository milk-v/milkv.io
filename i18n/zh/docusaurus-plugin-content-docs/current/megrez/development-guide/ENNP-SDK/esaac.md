# EsAAC 模型编译工具

## EsAAC 工具介绍

EsAAC 是 ESWIN 面向自研芯片的深度学习编译器，可以将主流人工智能框架（TensorFlow、
Pytorch、Caffe、ONNX 等）的网络模型转换成统一的中间表达(IR)，同时进行基于 EIC7700 硬件的模型优化，产生 EIC7700 可以加载运行的离线模型，即集转换、优化、编译于一体。

EsAAC 适用的网络模型包括图像分类、目标检测、图像分割等。

具体支持的功能包括：

- 支持图像分类，目标检测，图像分割等领域模型的优化和编译。

- 支持输入的网络模型格式： ONNX。

- 支持多个 batch 模型的编译,最大 batchsize 为 16（具体数量取决于实际模型），离线模型只支持静态多 batch；

- 支持利用不同异构计算单元，并设置各个计算单元最大的使用资源情况；

- 支持利用片上高速存储 SRAM 进行缓存优化；

- 支持用户定制的前处理或后处理计算（包括输入图片的颜色转换和归一化，以及输出非最大值
  抑制等计算）。

## EsAAC 与 EsSimulator 工具安装

EsAAC 和 EsSimulator 以同一 docker 形式发布, 请用户在 X86 Linux 平台工作站安装好 [docker](https://docs.docker.com/engine/install/ubuntu/)
:::tip
此文档在 x86 ubuntu22.04 Linux 6.8.0-52-generic 上测试通过
:::

- 获取 EsAAC_EsSimulator Docker 压缩包

  请按照 [ENNP SDK 下载](introduction#ennp-sdk-下载) 下载 nn-tools

- 加载 EsAAC_EsSimulator Docker 镜像

  ```bash
  cd nn-tools/EIC7x_Release_20241230
  sudo docker load -i esaac_essimulator_docker_20241230.tar
  ```

- 查看 EsAAC_EsSimulator Docker 镜像
  ```bash
  $sudo docker images
  esaac_essimulator 20241230  390b345f56b8  6 weeks ago 3.46GB
  ```
- 创建容器

  host 端准备 workspace 文件夹

  ```bash
  mkdir workspace && cd workspace
  ```

  启动容器

  ```bash
  sudo docker run --name esaac_sim -it -v $(pwd):/workspace esaac_essimulator:20241230 /bin/bash
  ```

- 查看 EsAAC 版本信息

  ```bash
  eswin@83752f68f2ce:~$ ./EsAAC --version
  eaac version: 0.0.3
  ```

- 查看 EsSimulator 版本信息

  ```bash
  eswin@83752f68f2ce:~$ ./EsSimulator --version
  EsSimulator version: 0.0.3(Tue Dec 24 17:00:01 2024 +0800).
  ```
