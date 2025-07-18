# EsAAC Model Compilation Tool

## Introduction to EsAAC Tool

EsAAC is a deep learning compiler developed by ESWIN for its self-developed chips. It can convert network models from popular AI frameworks (TensorFlow, Pytorch, Caffe, ONNX, etc.) into a unified Intermediate Representation (IR), while optimizing models based on EIC7700 hardware, generating offline models that can be loaded and run on the EIC7700. This tool integrates conversion, optimization, and compilation.

EsAAC is suitable for network models in fields such as image classification, object detection, and image segmentation.

Specific supported functions include:

- **Model Optimization and Compilation**: Supports optimization and compilation of models in image classification, object detection, and image segmentation domains.

- **Supported Input Model Formats**: ONNX.

- **Batch Model Compilation**: Supports compiling models with multiple batches, with a maximum batch size of 16 (specific quantity depends on the actual model). Offline models only support static multi-batch.

- **Heterogeneous Computation Unit Usage**: Supports utilizing different heterogeneous computing units and setting the maximum resource usage for each unit.

- **Cache Optimization Using On-chip SRAM**: Supports cache optimization using on-chip high-speed storage SRAM.

- **Custom Preprocessing or Postprocessing**: Supports user-defined preprocessing or postprocessing computations (including input image color conversion and normalization, as well as output non-maximum suppression).

## EsAAC and EsSimulator tool installation

EsAAC and EsSimulator are released in the same Docker format. Please ensure that Docker is installed on your X86 Linux workstation.

:::tip
This document has been tested on x86 Ubuntu 22.04 with Linux kernel version 6.8.0-52-generic.
:::

- **Obtain EsAAC_EsSimulator Docker Compressed Package**

  Please follow the [ENNP SDK Download](introduction#ennp-sdk-download) link to download the nn-tools.

- **Load EsAAC_EsSimulator Docker Image**

  ```bash
  cd nn-tools/EIC7x_Release_20250130
  sudo docker load -i esaac_essimulator_docker_20241230.tar
  ```

- **Check EsAAC_EsSimulator Docker Image**

  ```bash
  $sudo docker images
  esaac_essimulator 20250130  6d014d7a550d  2 weeks ago 3.46GB
  ```

- **Create Container**

  Prepare a workspace folder on the host.

  ```bash
  mkdir workspace && cd workspace
  ```

  Start the container:

  ```bash
  sudo docker run --name esaac_sim -it -v $(pwd):/workspace esaac_essimulator:20241230 /bin/bash
  ```

- **Check EsAAC Version Information**

  ```bash
  eswin@83752f68f2ce:~$ ./EsAAC --version
  eaac version: 0.0.3
  ```

- **Check EsSimulator Version Information**

  ```bash
  eswin@83752f68f2ce:~$ ./EsSimulator --version
  EsSimulator version: 0.0.3(Tue Dec 24 17:00:01 2024 +0800).
  ```
