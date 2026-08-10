---
sidebar_label: 'YOLOv8 Object Detection '
sidebar_position: 21
---

# yolov8 object detection

This test program will infer the yolov8 model to achieve target detection, and the results are only output in the form of printing.

## Download the precompiled cvimodel

```
git clone https://github.com/zwyzwm/YOLOv8-Object-Detection.git
```

## PC-side cross-compilation YOLO program

Duo256M yolov8 code location: [sample_yolov8.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov8.cpp)

### Compilation method

Refer to the method in the previous chapter [Introduction](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) to compile the sample program

After the compilation is completed, the `sample_yolov8` program we need will be generated in the `sample/cvi_yolo/` directory

### Model compilation

#### Export yolov8.onnx model
> - Download the yolov8 official warehouse code, the address is as follows: https://github.com/ultralytics

`git clone https://github.com/ultralytics`

> - Download the corresponding yolov8 model file

Take [yolov8n](https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt) as an example

```
cd ultralytics
wget https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt
```

> - Export the model of yolov8n.onnx

Download the latest version of anacanda, please refer to: https://docs.anaconda.com/miniconda/

Download Python version above 3.8, PyTorch version above 2.0.1, it is best to use the latest version

Activate (for example Python 3.8, torch2.0.1):

```
conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==2.0.1
```

Copy the yolo_export/yolov8_export.py code to the yolov8 repository

```
python3 yolov8_export.py --weights ./yolov8n.pt --img-size 640 640
```

Tip: When running this command, if an error similar to `ModuleNotFoundError: No module named 'x'` appears, just `pip install x`

Generate yolov8n.onnx in the current directory

Parameter explanation

--weights pytorch model path

--img-size image input size

#### TPU-MLIR conversion model

Please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document to configure the TPU-MLIR working environment. For parameter analysis, please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document.

After configuring the working environment, create a model_yolov8n directory in the same directory as this project and put the model and image files into it.

```
mkdir model_yolov8n && cd model_yolov8n
cp ${REGRESSION_PATH}/yolov8n.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
```

Tip: just copy the three files yolov8n.onnx, COCO2017, and image to model_yolov8n

The operation is as follows:

The specific implementation steps are divided into three steps:

> - model_transform.py converts the onnx model into the mlir intermediate format model

onnx -> model_transform.py -> mlir

> - run_calibration.py generates int8 quantization calibration table

calibration_set -> run_calibration.py -> calibration_table

> - model_deploy.py generates mlir with int8 quantization table for cvimodel for TPU inference

mlir + calibration_table ->model_deploy.py -> cvimodel

#### onnx to MLIR


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

After converting to mlir file, a `yolov8n.mlir` file will be generated.

#### MLIR to INT8 model (only supports INT8 quantization model)

Before quantizing to INT8 model, you need to run calibration.py to get the calibration table. The number of input data should be about 100~1000 according to the situation. Here, 100 COCO2017 pictures are prepared for demonstration:

```
run_calibration.py yolov8n.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolov8n_cali_table
```

Use calibration table to generate int8 symmetric cvimodel:

```
model_deploy.py \
--mlir yolov8n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov8n_cali_table \
--processor cv181x \
--model yolov8n_cv181x_int8_sym.cvimodel
```
After the compilation is complete, a file named yolov8n_cv181x_int8_sym.cvimodel will be generated.

## Board-side reasoning

Copy the compiled sample_yolov8, cvimodel, and the jpg image to be inferred to the board and execute the binary program:

`scp sample_yolov8 yolov8n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

Execute the following command:

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov8 ./yolov8n_cv181x_int8_sym.cvimodel 000000000632.jpg
```

The effect is as follows:

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
