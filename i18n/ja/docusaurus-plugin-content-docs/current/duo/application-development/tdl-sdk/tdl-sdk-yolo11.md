---
sidebar_label: 'YOLO11 Target Detection'
sidebar_position: 22
---

# yolo11 Target Detection

This test program will infer the yolo11 model to achieve target detection, and the results will only be output in the form of printing.

## Download the precompiled cvimodel

```
git clone https://github.com/zwyzwm/yolo11-obiect-dection.git
```

## Cross-compile YOLO program on PC

You can use the yolov8 program.

Duo256M yolov8 code location: [sample_yolov8.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov8.cpp)

### Compilation method

Refer to the method in the previous chapter [Introduction](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) to compile the sample program

After the compilation is completed, the `sample_yolov8` program we need will be generated in the `sample/cvi_yolo/` directory

### Model compilation

If you have already downloaded the yolov8 repository, `git pull` is enough.

#### Export yolo11.onnx model
> - Download the yolo11 official repository code, the address is as follows: https://github.com/ultralytics

```
git clone https://github.com/ultralytics
```

> - Download the corresponding yolo11 model file

Take [yolo11n](https://docs.ultralytics.com/zh/models/yolo11/#supported-tasks-and-modes) as an example

After downloading, copy it to the ultralytics directory.

> - Export the model of yolo11n.onnx

Download the latest version of anacanda, please refer to: https://docs.anaconda.com/miniconda/

Download Python version 3.8 or above, PyTorch version 2.0.1 or above, it is best to use the latest version

Activate (for example, Python 3.8, torch2.0.1):

```
conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==2.0.1
```
Note: Execute in the ultralytics directory.

Copy the yolo_export/yolov8_export.py code to the yolo11 repository, yolo11 is compatible with yolov8.

```
python3 yolov8_export.py --weights ./yolo11n.pt --img-size 640 640
```

Tip: When running this command, if an error similar to `ModuleNotFoundError: No module named 'x'` appears, just `pip install x`.

Generate yolo11n.onnx in the current directory.

Parameter explanation

--weights pytorch model path

--img-size image input size

#### TPU-MLIR conversion model

Please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document to configure the TPU-MLIR working environment. For parameter analysis, please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document.

After configuring the working environment, create a model_yolo11n directory in the same directory as this project and put the model and image files into it.

```
mkdir model_yolo11n && cd model_yolo11n
cp ${REGRESSION_PATH}/yolo11n.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
```

The operation is as follows:

The specific implementation steps are divided into three steps:

> - model_transform.py converts the onnx model into the mlir intermediate format model

onnx -> model_transform.py -> mlir

> - run_calibration.py generates int8 quantization calibration table

calibration_set -> run_calibration.py -> calibration_table

> - model_deploy.py generates cvimodel for TPU inference with mlir and int8 quantization table

mlir + calibration_table ->model_deploy.py -> cvimodel

#### onnx to MLIR

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

After converting to mlir file, a `yolo11n.mlir` file will be generated.

#### MLIR to INT8 model (only supports INT8 quantized model)

Before quantizing to INT8 model, you need to run calibration.py to get the calibration table. The number of input data should be about 100~1000 according to the situation. Here, 100 COCO2017 pictures are prepared for demonstration:

```
run_calibration.py yolo11n.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolo11n_cali_table
```

Use calibration table to generate int8 symmetric cvimodel:

```
model_deploy.py \
--mlir yolo11n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolo11n_cali_table \
--processor cv181x \
--model yolo11n_cv181x_int8_sym.cvimodel
```
After compilation, a file named yolo11n_cv181x_int8_sym.cvimodel will be generated.

## Board-side reasoning

Copy the compiled sample_yolov8, cvimodel, and the jpg image to be inferred to the board and execute the binary program:

`scp sample_yolov8 yolo11n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

Execute the following command:

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov8 ./yolo11n_cv181x_int8_sym.cvimodel 000000000632.jpg
```
The effect is as follows:
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