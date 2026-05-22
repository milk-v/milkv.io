# EsQuant Model Quantization Tool

## Introduction to EsQuant Tool

The EsQuant tool provides a Python interface for users. The advantage of using the Python interface for model quantization is that users can define their own preprocessing functions. It also provides predefined preprocessing functions for ImageNet and YOLO, making the quantization process easier for classification and detection models.

EsQuant can efficiently perform the following tasks:

- **Quantization**: Supports converting floating-point models into fixed-point models. It supports symmetric quantization and mixed precision quantization for different layers.

- **Quantization Accuracy Analysis**: This function provides the cosine similarity between the inference results of each layer in the quantized model and the floating-point model. It includes cumulative error analysis and reset error analysis. The cumulative error analysis helps identify how quantization errors occur, providing insights for improving the accuracy of the quantized model.

## EsQuant Installation

:::tip
This document has been tested on x86 Ubuntu 22.04 with Linux kernel version 6.8.0-52-generic.
:::

EsQuant is released in a Docker format. Please install [Docker](https://docs.docker.com/engine/install/ubuntu/) on your X86 Linux workstation before proceeding.

- **Obtain EsQuant**

  Please follow the [ENNP SDK Download](introduction#ennp-sdk-download) link to download the nn-tools.

- **Load EsQuant Docker Image**

  ```bash
  cd nn-tools/EIC7x_Release_20250130
  sudo docker load -i esquant_docker.tar
  ```

- **Check EsQuant Docker Image**

  ```bash
  sudo docker images
  esquant v0.7  a0c9432b21c5  4 months ago  18.4GB
  ```

- **Create a Container**  
  Prepare a workspace folder on the host.

  ```bash
  mkdir workspace && cd workspace
  ```

  - **Using GPU**  
    :::tip
    To run Docker with GPU, you need to install the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) in advance.
    :::

    ```bash
    sudo docker run --name [gpu_container_name] -it --runtime=nvidia --privileged=true --gpus all -v $(pwd):/workspace esquant:v0.7 /bin/bash
    ```

  - **Using CPU**
    ```bash
    sudo docker run --name [cpu_container_name] -it -v $(pwd):/workspace esquant:v0.7 /bin/bash
    ```

- **Install EsQuant Python Package**  
  Copy the `esquant-1.0-py3-none-any.whl` from the `nn-tools` folder to the workspace folder on the host.

  ```bash
  pip3 install ./esquant-1.0-py3-none-any.whl
  ```

- **Verify EsQuant Installation**  
  Check the version and git-hash to confirm successful installation.

  ```bash
  root@be488f694803:/workspace# python3
  Python 3.10.14 (main, May  6 2024, 19:42:50) [GCC 11.2.0] on linux
  Type "help", "copyright", "credits" or "license" for more information.
  >>> import esquant
  Read SHA from /opt/conda/lib/python3.10/site-packages/esquant/core/sha.txt

   .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .-----------------. .----------------.
  | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
  | |  _________   | || |    _______   | || |    ___       | || | _____  _____ | || |      __      | || | ____  _____  | || |  _________   | |
  | | |_   ___  |  | || |   /  ___  |  | || |  .'   '.     | || ||_   _||_   _|| || |     /  \     | || ||_   \|_   _| | || | |  _   _  |  | |
  | |   | |_  \_|  | || |  |  (__ \_|  | || | /  .-.  \    | || |  | |    | |  | || |    / /\ \    | || |  |   \ | |   | || | |_/ | | \_|  | |
  | |   |  _|  _   | || |   '.___`-.   | || | | |   | |    | || |  | '    ' |  | || |   / ____ \   | || |  | |\ \| |   | || |     | |      | |
  | |  _| |___/ |  | || |  |`\____) |  | || | \  `-'  \_   | || |   \ `--' /   | || | _/ /    \ \_ | || | _| |_\   |_  | || |    _| |_     | |
  | | |_________|  | || |  |_______.'  | || |  `.___.\__|  | || |    `.__.'    | || ||____|  |____|| || ||_____|\____| | || |   |_____|    | |
  | |              | || |              | || |              | || |              | || |              | || |              | || |              | |
  | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
   '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'

  >>> esquant.version()
  version: 1.0
  sha id: af6da07d5c205583f1a71cfee12339ed10623d08
  >>>

  ```
