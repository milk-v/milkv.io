---
sidebar_label: "Introduction to ENNP"
sidebar_position: 1
---

# Introduction of ENNP

ENNP (ESWIN Neural Network Processing) platform is an intelligent computing heterogeneous acceleration platform for media processing chips developed by ESWIN.  
Developers can use the API provided by ENNP to call the hardware acceleration modules inside the EIC7700 to implement neural network model inference, image transformation processing, and other custom functions requiring hardware acceleration.

The ENNP platform offers hardware-accelerated models based on HAE, GPU, DSP, NPU, etc., for inference, enabling applications such as object recognition, object detection, and image classification.

## ENNP Software Stack Block Diagram

ENNP includes offline development toolkits and runtime software frameworks. Development based on ENNP is divided into offline development and online development.

![ennp_1.webp](/docs/megrez/ennp_1.webp)

The "Offline develop" block diagram on the left includes tools such as EsQuant for model quantization, EsAAC for model compilation, EsGoldenDataGen for reference data generation, and EsSimulator for simulation and validation. These tools make up the ENNP offline development toolkit. Using these tools, AI framework models (such as TensorFlow, PyTorch, Caffe, and ONNX) trained in algorithms can be converted into a unified intermediate representation (IR), and offline models can be generated, with end-to-end support for model optimization, offline model generation, and verification.

After model generation, runtime software can be written using ESSDK to call the NPU Runtime interface, utilizing NPU subsystems (NPU, DSP, HAE, GPU, etc.) for inference, enabling chip hardware acceleration for tasks such as image classification, object detection, image segmentation, and natural language processing.

## ENNP SDK Download

The ENNP SDK is hosted on Baidu Cloud. Please use the Baidu Cloud client to download it. For Baidu Cloud registration instructions, refer to [here](https://www.reddit.com/r/baidu/comments/t09pll/how_to_register_baidu_account_outside_china/)

- ai-release.tar.gz
- nn-tools.tar.gz

```bash
Link: https://pan.baidu.com/s/1juNcBYxXGBGisD4DHDPseA?pwd=1024  Extraction code: 1024
```

### Extracting the compressed files

```bash
tar -xvf ai-release.tar.gz
tar -xvf nn-tools.tar.gz
```

## Detailed Documentation

- [ENNP User Manual](https://github.com/milkv-megrez/megrez-files/blob/main/ai-release/docs/ENNP%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C_CN_v1.2.pdf)
- [ENNP Developer Manual](https://github.com/milkv-megrez/megrez-files/blob/main/ai-release/docs/ENNP%E5%BC%80%E5%8F%91%E8%80%85%E6%89%8B%E5%86%8C_CN_v0.9.2.pdf)
