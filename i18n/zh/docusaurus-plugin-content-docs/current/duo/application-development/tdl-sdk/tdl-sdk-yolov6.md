---
sidebar_label: 'YOLOv6 目标检测 '
sidebar_position: 21
---

# YOLOv6目标检测

该测试程序会推理 YOLOv6 模型实现目标检测， 结果仅以打印的形式输出。

## pc端交叉编译YOLO程序

Duo256M YOLOv6 代码位置：sample_yolov6.cpp

### 编译方法

参考上一章节简介中的方法编译示例程序，编译完成后，会在`sample/cvi_yolo/`目录下生成我们需要的`sample_yolov6`程序

可参考：https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction


### 模型编译

#### 导出 yolov6s.onnx 模型

> - 首先下载 yolov6 官方仓库代码，地址如下:https://github.com/meituan/YOLOv6

`https://github.com/meituan/YOLOv6.git`

> - 配置工作环境

```

cd YOLOv6
pip3 install -r requirements.txt
pip3 install onnx

```
提示:YOLOv6比V5多了一个addict库，如果之前已经安装过了YOLOv5的相关库，也可以只下载一个addict，`pip install addict`！！！

> - 获取 yolov6 的 .pt 格式的模型，例如下载 yolov6s 模型的地址:[yolov6s](https://github.com/meituan/YOLOv6/releases/download/0.4.0/yolov6s.pt)

```

wget https://github.com/meituan/YOLOv6/releases/download/0.4.0/yolov6s.pt

```

将 cvitek-tdl-sdk-sg200x/sample/cvi_yolo/yolo_export/yolov6_export.py 复制到`YOLOv6/deploy/ONNX`仓库目录下。

下载anacanda最新版本，可参考：https://docs.anaconda.com/miniconda/

下载Python版本在3.8以上，PyTorch版本在1.8以上

激活（例如Python 3.8,torch1.9.0）：

```

conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv 
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==1.9.0

```

导出 onnx 格式模型:

```

python ./deploy/ONNX/yolov6_export.py --weights ./yolov6s.pt --img-size 640 640

```

在当前目录下生成yolov6s.onnx

参数解释

--weights pytorch 模型路径

--img-size 图片输入大小

#### TPU-MLIR 转换模型

请参考[TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档。

配置好工作环境后，在与本项目同级目录下创建一个model_yolov6s目录，将模型和图片文件放入其中。

```
mkdir model_yolov6s && cd model_yolov6s
cp ${REGRESSION_PATH}/yolov6s.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
mkdir workspace && cd workspace

```
提示：就是将yolov6s.onnx，COCO2017，image这三个文件复制到model_yolov6s

操作如下：

具体实现步骤分三步：

> - model_transform.py 将 onnx 模型转化成 mlir 中间格式模型

    onnx -> model_transform.py -> mlir

> - run_calibration.py 生成 int8 量化校准表

    calibration_set -> run_calibration.py -> calibration_table

> - model_deploy.py 将 mlir 配合 int8 量化表生成用于 TPU 推理的 cvimodel

    mlir + calibration_table ->model_deploy.py -> cvimodel

#### onnx 转 MLIR

```

model_transform.py \
--model_name yolov6s \
--model_def yolov6s.onnx \
--input_shapes [[1，3，640，640]] \
--mean 0.0,0.0,0.0 \
--scale 0.0039216,0.0039216,0.0039216 \
--keep_aspect_ratio \
--pixel_format rgb \
--mlir yolov6s.mlir

```

转换成 mlir 文件之后，会生成一个`yolov6s.mlir`文件。

#### MLIR 转 INT8 模型 (仅支持 INT8 量化模型)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片：

```

run_calibration.py yolov6s.mlir \
--dataset ../COCO2017 \
--input_num 100 \
-o yolov6s_cali_table

```

用校准表生成 int8 对称 cvimodel：

```

model_deploy.py \
--mlir yolov6s.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov6s_cali_table \
--processor cv181x \
--model yolov6_cv181x_int8_sym.cvimodel

```
编译完成后，会生成名为 yolov6_cv181x_int8_sym.cvimodel 的文件。

（可选）生成 int8 非对称 cvimodel

```
model_deploy.py \
--mlir yolov6s.mlir \
--quant_input --quant_output \
--quantize INT8 --asymmetric \
--calibration_table yolov6s_cali_table \
--processor cv181x \
--model yolov6_cv181x_int8_asym.cvimodel

```
编译完成后，会生成名为 yolov6_cv181x_int8_asym.cvimodel 的文件。

## 板端推理

将编译好的 sample_yolov6、cvimodel、要推理的 jpg 图片，拷贝到板端然后执行二进制程序：

`scp sample_yolov6 yolov6_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

执行以下命令：

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov6 ./yolov6_cv181x_int8_sym.cvimodel  000000000632.jpg 

```

效果如下：

```

[root@milkv-duo]~# ./sample_yolov6 ./yolov6_cv181x_int8_sym.cvimodel  000000000632.jpg 
[  585.843824] vb has already inited, set_config cmd has no effect
start open cvimodel...
version: 1.4.0
yolov6s Build at 2024-07-29 19:07:18 For platform cv181x
Max SharedMem size:4352000
cvimodel open success!
model opened:./yolov6_cv181x_int8_sym.cvimodel
detect number: 5
detect res: 339.000000 217.000000 429.000000 351.000000 0.891772 58
detect res: 0.000000 269.000000 396.000000 479.000000 0.885544 59
detect res: 183.000000 131.000000 240.000000 228.000000 0.749048 58
detect res: 250.000000 229.000000 349.000000 319.000000 0.577481 56
detect res: 96.000000 190.000000 114.000000 231.000000 0.518224 39

```


