---
sidebar_label: 'YOLO11 目标检测 '
sidebar_position: 22
---

# yolo11目标检测

该测试程序会推理 yolo11 模型实现目标检测， 结果仅以打印的形式输出。

## 下载预编译好的 cvimodel

```
git clone https://github.com/zwyzwm/yolo11-obiect-dection.git
```

## pc端交叉编译YOLO程序

可以使用yolov8的程序。

Duo256M yolov8 代码位置：[sample_yolov8.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov8.cpp)

### 编译方法

参考上一章节[简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction)中的方法编译示例程序

编译完成后，会在`sample/cvi_yolo/`目录下生成我们需要的`sample_yolov8`程序

### 模型编译 

如果已经下载了yolov8的仓库，`git pull` 即可。 

#### 导出 yolo11.onnx 模型

> - 下载 yolo11 官方仓库代码，地址如下: https://github.com/ultralytics

```
git clone https://github.com/ultralytics
```

> - 下载对应的 yolo11 模型文件

以 [yolo11n](https://docs.ultralytics.com/zh/models/yolo11/#supported-tasks-and-modes) 为例

下载之后，将其复制到 ultralytics 目录下。

> - 导出 yolo11n.onnx 的模型

下载 anacanda 最新版本,可参考:https://docs.anaconda.com/miniconda/

下载 Python 版本在3.8以上, PyTorch 版本在2.0.1以上，最好使用最新版本

激活（例如Python 3.8,torch2.0.1）:

```
conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv 
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==2.0.1
```
注意：在 ultralytics 目录下执行。

将 yolo_export/yolov8_export.py 代码复制到 yolo11 仓库，yolo11 可兼容 yolov8 。

```
python3 yolov8_export.py --weights ./yolo11n.pt --img-size 640 640
```

提示：运行此命令时，出现类似`ModuleNotFoundError: No module named 'x'`错误，只需`pip install x` 。

在当前目录下生成 yolo11n.onnx 。

参数解释

--weights pytorch 模型路径

--img-size 图片输入大小

#### TPU-MLIR 转换模型

请参考[TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档。

配置好工作环境后,在与本项目同级目录下创建一个model_yolo11n目录,将模型和图片文件放入其中。

```
mkdir model_yolo11n && cd model_yolo11n
cp ${REGRESSION_PATH}/yolo11n.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
```

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
--model_name yolo11n \
--model_def yolo11n.onnx \
--input_shapes [[1,3,640,640]] \
--mean 0.0,0.0,0.0 \
--scale 0.0039216,0.0039216,0.0039216 \
--keep_aspect_ratio \
--pixel_format rgb \
--mlir yolo11n.mlir
```

转换成 mlir 文件之后，会生成一个`yolo11n.mlir`文件。

#### MLIR 转 INT8 模型 (仅支持 INT8 量化模型)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片：

```
run_calibration.py yolo11n.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolo11n_cali_table
```

用校准表生成 int8 对称 cvimodel:

```
model_deploy.py \
--mlir yolo11n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolo11n_cali_table \
--processor cv181x \
--model yolo11n_cv181x_int8_sym.cvimodel
```
编译完成后，会生成名为 yolo11n_cv181x_int8_sym.cvimodel 的文件。

## 板端推理

将编译好的 sample_yolov8、cvimodel、要推理的 jpg 图片，拷贝到板端然后执行二进制程序：

`scp sample_yolov8 yolo11n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

执行以下命令：

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov8 ./yolo11n_cv181x_int8_sym.cvimodel  000000000632.jpg 
```
效果如下：
```
[root@milkv-duo]~# ./sample_yolov8 yolo11n_cv181x_int8_sym.cvimodel 000000123633
.jpg 
enter CVI_TDL_Get_YOLO_Preparam...
asign val 0 
asign val 1 
asign val 2 
setup yolov8 param 
enter CVI_TDL_Get_YOLO_Preparam...
setup yolov8 algorithm param 
yolov8 algorithm parameters setup success!
---------------------openmodel-----------------------version: 1.4.0
yolo11n Build at 2024-11-26 12:01:47 For platform cv181x
Max SharedMem size:2560000
---------------------to do detection-----------------------
image read,width:640
image read,hidth:480
objnum:8
boxes=[[115.612,1.25182,270.947,289.162,0,0.92671],[119.31,254.086,340.866,477.433,0,0.91099],[296.388,1.66853,565.529,347.339,0,0.780504],[317.854,204.474,556.278,426.264,0,0.74215],[280.494,374.201,637.716,476.691,60,0.74215],[447.548,0.49231,543.932,135.208,0,0.614296],[616.248,186.48,639,279.167,73,0.5],[80.4785,374.474,155.927,478.969,56,0.5],]
```


