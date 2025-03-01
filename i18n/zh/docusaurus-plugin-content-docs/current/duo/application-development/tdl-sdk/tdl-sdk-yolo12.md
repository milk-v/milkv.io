---
sidebar_label: 'YOLO12 Target Detection'
sidebar_position: 23
---

# yolo12 Target 目标检测

该测试程序会推理 yolo12 模型实现目标检测，结果以打印和图片的形式输出。


## 下载预编译好的 cvimodel

```
git clone https://github.com/Arielfoever/milkv-yolo12.git
```

## PC 端交叉编译YOLO程序

可以使用yolov8的程序。Duo256M yolov8 代码 [sample_yolov8.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov8.cpp)

也可以使用 yolov12 程序，位于 [v12.cpp](https://github.com/Arielfoever/milkv-yolo12/blob/master/duo/v12.cpp) 。该程序提供更好的打印输出和图片输出。

### Compilation method

参考上一章节[简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction)中的方法编译示例程序

编译完成后，会在`sample/cvi_yolo/`目录下生成我们需要的`sample_yolov8`程序

### 模型编译 

如果已经下载了yolov8的仓库，`git pull` 即可。 

#### Export yolo11.onnx model

从 [YOLO12: Attention-Centric Object Detection](https://docs.ultralytics.com/models/yolo12/) 下载 [yolo12n.pt](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo12n.pt)。

安装 ultralytics.

将 yolo_export/yolov8_export.py 代码复制到 yolo12 仓库，yolo12 可兼容 yolov8 。

```
python3 yolov8_export.py --weights ./yolo12n.pt --img-size 640 640
```

#### TPU-MLIR conversion model

请参考[TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR](https://github.com/sophgo/tpu-mlir) 文档。

配置好工作环境后,在与本项目同级目录下创建一个model_yolo11n目录,将模型和图片文件放入其中。

```
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
```

#### onnx to MLIR

```
model_transform.py \
    --model_name yolo12n \
    --model_def ../yolo12n.onnx \
    --input_shapes [[1,3,640,640]] \
    --mean 0.0,0.0,0.0 \
    --scale 0.0039216,0.0039216,0.0039216 \
    --keep_aspect_ratio \
    --pixel_format rgb \
    --test_input ../image/dog.jpg \
    --test_result yolov12n_top_outputs.npz \
    --mlir yolov12n.mlir
```

转换成 mlir 文件之后，会生成一个`yolo12n.mlir`文件。

#### MLIR to INT8 model (only supports INT8 quantized model)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片：

```
run_calibration.py yolov12n.mlir \
--dataset ../COCO2017 \
--input_num 100 \
-o yolo12n_cali_table
```

用校准表生成 int8 对称 cvimodel:

```
model_deploy.py \
--mlir yolov12n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolo12n_cali_table \
--processor cv181x \
--model yolo12n_cv181x_int8_sym.cvimodel
```

编译完成后，会生成名为 yolo12n_cv181x_int8_sym.cvimodel 的文件。

## 板端推理

将编译好的 sample_yolov8、cvimodel、要推理的 jpg 图片，拷贝到板端然后执行二进制程序：

`scp sample_yolov8 yolo12n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

执行以下命令：

```
[root@milkv-duo]~# ./sample_yolov8 yolo12n_cv181x_int8_sym.cvimodel in.jpg  out.jpg
enter CVI_TDL_Get_YOLO_Preparam...
asign val 0
asign val 1
asign val 2
setup yolov8 param
enter CVI_TDL_Get_YOLO_Preparam...
setup yolov8 algorithm param
yolov8 algorithm parameters setup success!
---------------------openmodel-----------------------
version: 1.4.0
yolo12n Build at 2025-03-01 17:05:41 For platform cv181x
Max SharedMem size:6656000
---------------------to do detection-----------------------
image read,width:416
image read,hidth:640
objnum:6
Detect person(0): 143.069092 55.362289 340.261047 409.857300 0.854953
Detect person(0): 2.953743 35.646866 159.244690 479.729309 0.831542
Detect person(0): 342.131927 101.365387 415.000000 433.155334 0.743529
Detect dining table(60): 23.431549 390.899475 415.000000 639.000000 0.743529
Detect chair(56): 85.551483 371.947754 250.175781 448.465393 0.548328
Detect cake(55): 154.010742 430.204773 406.356934 562.873474 0.500000
```

结果可查看 [milkv-yolo12](https://github.com/Arielfoever/milkv-yolo12)。
