---
sidebar_label: '简介'
sidebar_position: 10
---

# 简介

Duo 的 CPU CV1800B 集成了 CVITEK TPU，用于智能检测

TPU 是深度学习神经网络的 AI 加速引擎，可用于加速图像分类、物体检测、人脸检测与识别、分割、LSTM 等。TPU 的主要功能是分担 CPU 工作， 加速计算机视觉和语音相关操作

CV1800B TPU 支持的模型

![duo](/docs/duo/tpu/duo-cv1800b-tpu-model_202307.png)

:::tip
Duo 开发板搭载的是 CV1800B 芯片，该芯片支持 **ONNX 系列** 和 **Caffe 模型**，目前不支持 TFLite 模型。在量化数据类型方面，支持 **BF16 格式的量化** 和 **INT8 格式的非对称量化**
:::
