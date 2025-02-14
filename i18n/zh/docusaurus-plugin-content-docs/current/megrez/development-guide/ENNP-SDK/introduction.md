---
sidebar_label: "ENNP 简介"
sidebar_position: 1
---

# ENNP 简介

ENNP（ESWIN Neural Network Processing）平台是奕斯伟媒体处理芯片智能计算异构加速平台。
开发者可以基于 ENNP 提供的 API 接口调用 EIC7700 内部的硬件加速模块实现神经网络模型的推理、图像的变换处理及其他需要硬件加速的自定义功能。

ENNP 平台能提供基于 HAE、GPU、DSP、NPU 等硬件加速模型的推理，实现目标识别、对象检测、图像分类等应用场景。

## ENNP 软件栈框图

ENNP 包括离线开发工具套件和运行时软件框架，基于 ENNP 的开发分为离线开发与在线开发。

![ennp_1.webp](/docs/megrez/ennp_1.webp)

左边框图 "Offline develop" 中包含 EsQuant 量化工具，EsAAC 模型编译工具，EsGoldenDataGen 参考数据生成工具以及 EsSimulator 仿真验证工具。这些属于 ENNP 离线开发工具套件。利用上述工具套件，可以将人工智能框架（TensorFlow、 PyTorch、Caffe 与 ONNX 等）训练好的算法模型转换成统一的中间表达（IR）并生成离线模型，同时提供端到端的模型优化、离线模型产生及验证等功能。

模型生成后，可以基于 ESSDK 编写运行时软件，调用 NPU Runtime 的接口利用 NPU 子系统硬件（NPU、DSP、HAE、GPU 等）进行推理基于芯片硬件加速实现图像分类，目标检测，图像分割，自然语言处理等功能。

## ENNP SDK 下载

ENNP SDK 通过百度云盘存放托管，用户请使用百度云盘客户端进行下载，百度云盘注册请参考 [这里](https://www.reddit.com/r/baidu/comments/t09pll/how_to_register_baidu_account_outside_china/)

- ai-release.tar.gz
- nn-tools.tar.gz

```bash
链接: https://pan.baidu.com/s/1juNcBYxXGBGisD4DHDPseA?pwd=1024 提取码: 1024
```

### 解压压缩包

```bash
tar -xvf ai-release.tar.gz
tar -xvf nn-tools.tar.gz
```

## 详细文档

- [ENNP用户手册](https://github.com/milkv-megrez/megrez-files/blob/main/ai-release/docs/ENNP%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C_CN_v1.2.pdf)
- [ENNP开发者手册](https://github.com/milkv-megrez/megrez-files/blob/main/ai-release/docs/ENNP%E5%BC%80%E5%8F%91%E8%80%85%E6%89%8B%E5%86%8C_CN_v0.9.2.pdf)
