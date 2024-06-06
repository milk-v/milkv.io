---
sidebar_label: '基于Squeezenet的图像分类'
sidebar_position: 38
---

# 基于 Squeezenet 的图像分类

## 1. 配置 Docker 开发环境

参考 [这里](https://milkv.io/zh/docs/duo/application-development/tpu/tpu-docker) 配置好 Docker 开发环境后，再回到这里继续下一步。

:::warning
若您使用已经配置好的 Docker 开发环境，请您启动 Docker 后务必按照 Docker 配置教程执行 `source ./tpu-mlir/envsetup.sh` 命令，否则后续步骤可能报错。
:::

## 2. 在 Docker 中准备工作目录

创建并进入 `squeezenet1.1` 工作目录，注意是与 `tpu-mlir` 同级的目录
```
# mkdir squeezenet1.1 && cd squeezenet1.1
```

获取原始模型
```
# wget https://media.githubusercontent.com/media/onnx/models/main/validated/vision/classification/squeezenet/model/squeezenet1.1-7.tar.gz
```
将 `squeezenet1.1-7.tar.gz` 解压
```
# tar -zxvf squeezenet1.1-7.tar.gz
```
解压后会在当前目录生成 `squeezenet1.1` 文件夹，该文件夹下包含有 `squeezenet1.1.onnx` 模型文件

拷贝测试图片:
```
# cp -rf ${TPUC_ROOT}/regression/dataset/ILSVRC2012/ .
# cp -rf ${TPUC_ROOT}/regression/image/ .
```
这里的 `${TPUC_ROOT}` 是环境变量，对应 `tpu-mlir` 目录，是在前面配置 Docker 开发环境中 `source ./tpu-mlir/envsetup.sh` 这一步加载的

创建并进入 `work` 工作目录，用于存放编译生成的 MLIR、cvimodel 等文件
```
# mkdir work && cd work
```

## 3. ONNX 模型转换

:::tip
Duo 开发板搭载的是 CV1800B 芯片，该芯片支持 **ONNX 系列** 和 **Caffe 模型**，目前不支持 TFLite 模型。在量化数据类型方面，支持 **BF16 格式的量化** 和 **INT8 格式的非对称量化**
:::

模型转换步骤如下：
- ONNX 模型转换成 MLIR
- 生成量化需要的校准表
- MLIR 量化成 INT8 非对称 cvimodel

### ONNX 模型转换成 MLIR

本例中的模型是 RGB 输入, `mean` 和 `scale` 分别为 `123.675`,`116.28`,`103.53` 和 `0.0171`,`0.0175`,`0.0174`

将 ONNX 模型转换为 MLIR 模型的命令如下:
```
model_transform.py \
 --model_name squeezenet1.1 \
 --model_def ../squeezenet1.1/squeezenet1.1.onnx \
 --test_input ../image/cat.jpg \
 --input_shapes [[1,3,224,224]] \
 --resize_dims 256,256 \
 --mean 123.675,116.28,103.53 \
 --scale 0.0171,0.0175,0.0174 \
 --pixel_format rgb \
 --test_result squeezenet1.1_top_outputs.npz \
 --mlir squeezenet1.1.mlir
```

运行成功效果示例

![duo](/docs/duo/tpu/duo-tpu-squeezenet_05.png)

转成 MLIR 模型后，会生成一个 `squeezenet1.1.mlir` 文件，该文件即为 MLIR 模型文件，还会生成一个 `squeezenet1.1_in_f32.npz` 文件和一个 `squeezenet1.1_top_outputs.npz` 文件，是后续转模型的输入文件

![duo](/docs/duo/tpu/duo-tpu-squeezenet_06.png)

### MLIR 转 INT8 模型

#### 生成量化需要的校准表

在转 INT8 模型之前需要先生成校准表，这里用现有的 100 张来自 ILSVRC2012 的图片举例，执行 calibration 命令：
```
run_calibration.py squeezenet1.1.mlir \
 --dataset ../ILSVRC2012 \
 --input_num 100 \
 -o squeezenet1.1_cali_table
```

运行成功效果示例

![duo](/docs/duo/tpu/duo-tpu-squeezenet_07.png)

运行完成后会生成名为 `squeezenet1.1_cali_table` 的文件, 该文件用于后续编译 INT8 模型的输入文件

![duo](/docs/duo/tpu/duo-tpu-squeezenet_08.png)

#### MLIR 量化成 INT8 非对称 cvimodel

将 MLIR 模型转换为 INT8 模型的命令如下:
```
model_deploy.py \
 --mlir squeezenet1.1.mlir \
 --quantize INT8 \
 --calibration_table squeezenet1.1_cali_table \
 --chip cv180x \
 --test_input ../image/cat.jpg \
 --test_reference squeezenet1.1_top_outputs.npz \
 --compare_all \
 --fuse_preprocess \
 --model squeezenet1.1_int8_fuse.cvimodel
```

:::tip
如果您使用的开发板不是 Duo ，请将上述命令中第 5 行 `--chip cv180x` 更换为对应的芯片型号。
使用 Duo 256M/Duo S 时应更改为 `--chip cv181x`。
:::

运行成功效果示例

![duo](/docs/duo/tpu/duo-tpu-squeezenet_09.png)

编译完成后, 会生成名为 `squeezenet1.1_int8_fuse.cvimodel` 的文件

![duo](/docs/duo/tpu/duo-tpu-squeezenet_10.png)

## 4. 在 Duo 开发板上进行验证

### 连接 Duo 开发板

根据前面的教程完成 Duo 开发板与电脑的连接，并使用 `mobaxterm` 或 `Xshell` 等工具开启终端操作 Duo 开发板

### 获取 tpu-sdk

在 Docker 终端下切换到 `/workspace` 目录
```
cd /workspace
```

下载 tpu-sdk，如果您使用的是 Duo ，则执行
```
git clone https://github.com/milkv-duo/tpu-sdk-cv180x.git
mv ./tpu-sdk-cv180x ./tpu-sdk
```

如果您使用的是 Duo 256M/Duo S ,则执行
```
git clone https://github.com/milkv-duo/tpu-sdk-sg200x.git
mv ./tpu-sdk-sg200x ./tpu-sdk
```

### 将开发工具包和模型文件拷贝到 Duo 开发板上

在 duo 开发板的终端中，新建文件目录 `/mnt/tpu/`
```
# mkdir -p /mnt/tpu && cd /mnt/tpu
```

在 Docker 的终端中，将 `tpu-sdk` 和模型文件拷贝到 Duo 开发板上
```
# scp -r /workspace/tpu-sdk root@192.168.42.1:/mnt/tpu/
# scp /workspace/squeezenet1.1/work/squeezenet1.1_int8_fuse.cvimodel root@192.168.42.1:/mnt/tpu/tpu-sdk/
```

### 设置环境变量

在 Duo 开发板的终端中，进行环境变量的设置
```
# cd /mnt/tpu/tpu-sdk
# source ./envs_tpu_sdk.sh
```

### 进行图像分类测试

在 Duo 开发板上，对该图像进行分类

![duo](/docs/duo/tpu/duo-tpu-cat.jpg)

在 Duo 开发板的终端中，使用 `squeezenet1.1_int8_fuse.cvimodel` 模型进行图像分类:
```
./samples/bin/cvi_sample_classifier_fused_preprocess \
 ./squeezenet1.1_int8_fuse.cvimodel \
 ./samples/data/cat.jpg \
 ./samples/data/synset_words.txt
```

分类成功结果示例

![duo](/docs/duo/tpu/duo-tpu-squeezenet_11.png)
