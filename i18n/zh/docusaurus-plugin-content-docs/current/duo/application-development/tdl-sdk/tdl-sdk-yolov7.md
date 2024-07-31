---
sidebar_label: 'yolov7 目标检测 '
sidebar_position: 21
---

# yolov7目标检测

该测试程序会推理 yolov7 模型实现目标检测， 结果仅以打印的形式输出。

## pc端交叉编译YOLO程序

Duo256M yolov7 代码位置：sample_yolov7.cpp

### 编译方法

参考上一章节[简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction)中的方法编译示例程序

编译完成后，会在`sample/cvi_yolo/`目录下生成我们需要的`sample_yolov7`程序


### 模型编译 

#### 导出 yolov7.onnx 模型
> - 下载 yolov7 官方仓库代码，地址如下:https://github.com/WongKinYiu/yolov7

`git clone https://github.com/WongKinYiu/yolov7`

> - 配置工作环境

```

cd yolov7
pip3 install -r requirements.txt
pip3 install onnx

```

> - 导出 yolov7.onnx 的模型

下载anacanda最新版本,可参考:https://docs.anaconda.com/miniconda/

下载Python版本在3.8以上,PyTorch版本在1.7以上，最好使用最新版本

激活（例如Python 3.8,torch1.9.0）:

```

conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv 
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==1.9.0

```

下载yolov7.pt模型,下载地址:https://www.google.com/search?client=ubuntu-sn&channel=fs&q=yolov7.pt%E6%A8%A1%E5%9E%8B%E4%B8%8B%E8%BD%BD

将yolov7.pt复制到yolov7目录

将 yolo_export/yolov7_export.py 复制到 yolov7 目录

```

python3 yolov7_export.py --weights ./yolov7.pt --img-size 640 640

```

提示：运行此命令时，出现类似`ModuleNotFoundError: No module named 'x'`错误，只需`pip install x`

在当前目录下生成yolov7.onnx

参数解释

--weights pytorch 模型路径

--img-size 图片输入大小

#### TPU-MLIR 转换模型

请参考[TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档。

配置好工作环境后,在与本项目同级目录下创建一个model_yolov7目录,将模型和图片文件放入其中。

```

mkdir model_yolov7 && cd model_yolov7
cp ${REGRESSION_PATH}/yolov7.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .

```

提示:就是将yolov7.onnx,COCO2017,image这三个文件复制到model_yolov7

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
--model_name yolov7 \
--model_def yolov7.onnx \
--input_shapes [[1,3,640,640]] \
--mean 0.0,0.0,0.0 \
--scale 0.0039216,0.0039216,0.0039216 \
--keep_aspect_ratio \
--pixel_format rgb \
--mlir yolov7.mlir

```

转换成 mlir 文件之后，会生成一个`yolov7.mlir`文件。

#### MLIR 转 INT8 模型 (仅支持 INT8 量化模型)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片：

```

run_calibration.py yolov7.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolov7_cali_table

```

用校准表生成 int8 对称 cvimodel:

```

model_deploy.py \
--mlir yolov7.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov7_cali_table \
--processor cv181x \
--model yolov7_cv181x_int8_sym.cvimodel

```
编译完成后，会生成名为 yolov7_cv181x_int8_sym.cvimodel 的文件。

（可选）生成 int8 非对称 cvimodel

```
model_deploy.py \
--mlir yolov7.mlir \
--quant_input --quant_output \
--quantize INT8 --asymmetric \
--calibration_table yolov7_cali_table \
--processor cv181x \
--model yolov7_cv181x_int8_asym.cvimodel

```
编译完成后，会生成名为 yolov7c_v181x_int8_asym.cvimodel 的文件。




## 板端推理

将编译好的 sample_yolov7、cvimodel、要推理的 jpg 图片，拷贝到板端然后执行二进制程序：

`scp sample_yolov7 yolov7_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

执行以下命令：

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov7 ./yolov7_cv181x_int8_sym.cvimodel  000000000632.jpg 

```

效果如下：

```
[root@milkv-duo]~# ./sample_yolov7 ./yolov7_cv181x_int8_sym.cvimodel  0000000006
32.jpg
enter CVI_TDL_Get_YOLO_Preparam...
asign val 0 
asign val 1 
asign val 2 
setup yolov7 param 
enter CVI_TDL_Get_YOLO_Preparam...
setup yolov7 algorithm param 
yolov7 algorithm parameters setup success!
version: 1.4.0
yolov7 Build at 2024-07-30 18:00:45 For platform cv181x
Max SharedMem size:26214400
model opened:./yolov7_cv181x_int8_sym.cvimodel
detect res: 4.758652 272.341248 396.816833 479.677979 0.930349 59
detect res: 343.670563 209.335052 428.875031 355.240448 0.894445 58
detect res: 186.548691 132.844727 243.875809 226.700867 0.862043 58
detect res: 249.286285 234.226410 344.289215 313.461273 0.842118 56
detect res: 95.998596 190.682983 114.998596 234.637512 0.697521 39

```


