# EsQuant 模型量换工具

## EsQuant 工具介绍

EsQuant 工具提供 python 接口供用户使用，使用 python 接口形式量化模型的优势是用户可以自定
义预处理函数，同时预先提供了 imagenet 和 yolo 的预处理函数，方便分类模型和检测模型的量化工作。

EsQuant 可以方便地完成以下工作：

- 量化功能：支持将浮点数模型量化成定点化模型，支持对称量化，不同层支持混合精度量化。

- 量化精度分析：该功能将给出模型量化后每一层推理结果与浮点数推理结果的余弦相似度，包
  含累计误差分析和重置误差分析，根据累计误差分析可以便于分析量化误差是如何出现的，为
  提高量化模型的精度提供思路。

## EsQuant 安装

:::tip
此文档在 x86 ubuntu22.04 Linux 6.8.0-52-generic 上测试通过
:::
EsQuant 以 docker 形式发布, 请用户在 X86 Linux 平台工作站安装好 [docker](https://docs.docker.com/engine/install/ubuntu/)

- 获取 EsQuant

  请按照 [ENNP SDK 下载](introduction#ennp-sdk-下载) 下载 nn-tools

- 加载 EsQuant docker 镜像

  ```bash
  cd nn-tools/EIC7x_Release_20241230
  sudo docker load -i esquant_docker.tar
  ```

- 查看 EsQuant docker 镜像
  ```bash
  $sudo docker images
  esquant v0.7  a0c9432b21c5  4 months ago  18.4GB
  ```
- 创建容器
  host 端准备 workspace 文件夹

  ```bash
  mkdir workspace && cd workspace
  ```

  - 使用 GPU
    :::tip
    使用 GPU 启动 Docker 需要提前安装 [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
    :::

    ```bash
    sudo docker run --name [gpu_container_name] -it --runtime=nvidia --privileged=true --gpus all -v $(pwd):/workspace esquant:v0.7 /bin/bash
    ```

  - 使用 CPU
    ```bash
    sudo docker run --name [cpu_container_name] -it -v $(pwd):/workspace esquant:v0.7 /bin/bash
    ```

- 安装 EsQuant Python 包
  将 nn-tools 里的 esquant-1.0-py3-none-any.whl 复制到 host 上的 workspace 文件夹中
  ```bash
  pip3 install ./esquant-1.0-py3-none-any.whl
  ```
- 确认 EsQuant 安装成功

  查看版本信息和 git-hash 信息以确认是否部署成

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
