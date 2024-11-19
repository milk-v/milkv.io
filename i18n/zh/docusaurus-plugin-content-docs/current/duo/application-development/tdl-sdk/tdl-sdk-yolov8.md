---
sidebar_label: 'YOLOv8 目标检测 '
sidebar_position: 21
---

# yolov8目标检测

该测试程序会推理 yolov8 模型实现目标检测， 结果仅以打印的形式输出。

## 下载预编译好的 cvimodel

```
git clone https://github.com/zwyzwm/YOLOv8-Object-Detection.git
```

## pc端交叉编译YOLO程序

Duo256M yolov8 代码位置：sample_yolov8.cpp

### 编译方法

参考上一章节[简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction)中的方法编译示例程序

编译完成后，会在`sample/cvi_yolo/`目录下生成我们需要的`sample_yolov8`程序

### 模型编译 

#### 导出 yolov8.onnx 模型
> - 下载 yolov8 官方仓库代码，地址如下: https://github.com/ultralytics

```
git clone https://github.com/ultralytics
```

> - 下载对应的 yolov8 模型文件

以 [yolov8n](https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt) 为例

```
cd  ultralytics
wget https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt
```

> - 导出 yolov8n.onnx 的模型

下载anacanda最新版本,可参考:https://docs.anaconda.com/miniconda/

下载Python版本在3.8以上,PyTorch版本在2.0.1以上，最好使用最新版本

激活（例如Python 3.8,torch2.0.1）:

```
conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv 
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==2.0.1
```

将 yolo_export/yolov8_export.py 代码复制到 yolov8 仓库

```
python3 yolov8_export.py --weights ./yolov8n.pt --img-size 640 640
```

提示：运行此命令时，出现类似`ModuleNotFoundError: No module named 'x'`错误，只需`pip install x`

在当前目录下生成yolov8n.onnx

参数解释

--weights pytorch 模型路径

--img-size 图片输入大小

#### TPU-MLIR 转换模型

请参考[TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档。

配置好工作环境后,在与本项目同级目录下创建一个model_yolov8n目录,将模型和图片文件放入其中。

```
mkdir model_yolov8n && cd model_yolov8n
cp ${REGRESSION_PATH}/yolov8n.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
```

提示:就是将yolov8n.onnx,COCO2017,image这三个文件复制到model_yolov8n

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
--model_name yolov8n \
--model_def yolov8n.onnx \
--input_shapes [[1,3,640,640]] \
--mean 0.0,0.0,0.0 \
--scale 0.0039216,0.0039216,0.0039216 \
--keep_aspect_ratio \
--pixel_format rgb \
--mlir yolov8n.mlir
```

转换成 mlir 文件之后，会生成一个`yolov8n.mlir`文件。

#### MLIR 转 INT8 模型 (仅支持 INT8 量化模型)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片：

```
run_calibration.py yolov8n.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolov8n_cali_table
```

用校准表生成 int8 对称 cvimodel:

```
model_deploy.py \
--mlir yolov8n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov8n_cali_table \
--processor cv181x \
--model yolov8n_cv181x_int8_sym.cvimodel
```
编译完成后，会生成名为 yolov8n_cv181x_int8_sym.cvimodel 的文件。

## 板端推理

将编译好的 sample_yolov8、cvimodel、要推理的 jpg 图片，拷贝到板端然后执行二进制程序：

`scp sample_yolov8 yolov8n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

执行以下命令：

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov8 ./yolov8n_cv181x_int8_sym.cvimodel  000000000632.jpg 
```

效果如下：

```
[root@milkv-duo]~# ./sample_yolov8 ./yolov8n_cv181x_int8_sym.cvimodel  000000000
632.jpg
enter CVI_TDL_Get_YOLO_Preparam...
asign val 0 
asign val 1 
asign val 2 
setup yolov8 param 
enter CVI_TDL_Get_YOLO_Preparam...
setup yolov8 algorithm param 
yolov8 algorithm parameters setup success!
---------------------openmodel-----------------------version: 1.4.0
yolov8n Build at 2024-07-31 14:30:32 For platform cv181x
Max SharedMem size:2048000
---------------------to do detection-----------------------
image read,width:640
image read,hidth:483
objnum:4
boxes=[[340.561,214.003,427.962,350.141,58,0.906066],[0.844345,279.573,401.244,477.67,59,0.894497],[181.399,124.6,241.393,227.863,58,0.680377],[245.295,229.886,349.774,318.173,56,0.562628],]
```
