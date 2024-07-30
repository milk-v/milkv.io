---
sidebar_label: 'YOLOv6 Object Detection'
sidebar_position: 21
---

# YOLOv6 object detection

This test program infers the YOLOv6 model for target detection, and the results are only output in printed form.

## Cross-compile YOLO program on PC

Duo256M YOLOv6 code location: sample yolov6.cpp

### Compilation method

Compile the sample program according to the method in the previous chapter. After the compilation is completed, the `sample_yolov6` program we need will be generated in the `sample/cvi_yolo/` directory.
For reference:
https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction

### Model compilation

#### Export the yolov6s.onnx model

> - First download the yolov6 official repository code, the address is as follows:https://github.com/meituan/YOLOv6

```
https://github.com/meituan/YOLOv6.git

```
> - Configure the working environment

```

cd YOLOv6
pip3 install -r requirements.txt
pip3 install onnx

```
Tip: YOLOv6 has one more addict library than V5. If you have already installed the related libraries of YOLOv5, you can also download only one addict.`pip install addict`！！！

> - Get the .pt format model of yolov6, for example, the address to download the yolov6s model:[yolov6s](https://github.com/meituan/YOLOv6/releases/download/0.4.0/yolov6s.pt)

```

wget https://github.com/meituan/YOLOv6/releases/download/0.4.0/yolov6s.pt

```

Copy cvitek-tdl-sdk-sg200x/sample/cvi_yolo/yolo_export/yolov6_export.py to the `YOLOv6/deploy/ONNX` repository directory。

Download the latest version of anacanda, please refer to：https://docs.anaconda.com/miniconda/

Download Python version 3.8 or higher, PyTorch version 1.8 or higher

Activate (e.g. Python 3.8, torch1.9.0):

```

conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv 
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==1.9.0

```

Export the model in onnx format:

```

python ./deploy/ONNX/yolov6_export.py --weights ./yolov6s.pt --img-size 640 640

```

Generate yolov6s.onnx in the current directory

Parameter Explanation

--weights pytorch Model Path

--img-size Image input size

#### TPU-MLIR Conversion Model

Please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document to configure the TPU-MLIR working environment. For parameter analysis, please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document。

After configuring the working environment, create a model_yolov6s directory in the same directory as this project and put the model and image files into it.。

```
mkdir model_yolov6s && cd model_yolov6s
cp ${REGRESSION_PATH}/yolov6s.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .
mkdir workspace && cd workspace

```
Tip: Just copy the three files yolov6s.onnx, COCO2017, and image to model_yolov6s

The operation is as follows:

It is mainly divided into three steps

> - model_transform.py converts the onnx model into an mlir intermediate format model

    onnx -> model_transform.py -> mlir

> - run_calibration.py generates int8 quantization calibration table

    calibration_set -> run_calibration.py -> calibration_table

> - model_deploy.py combines mlir with int8 quantization table to generate cvimodel for TPU inference

    mlir + calibration_table ->model_deploy.py -> cvimodel

#### onnx to MLIR

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

After converting to mlir file, a `yolov6s.mlir` file will be generated.

####Convert MLIR to INT8 model (only supports INT8 quantized models)

Before quantizing to INT8 model, you need to run calibration.py to get the calibration table. The number of input data should be about 100~1000 according to the situation. Here, 100 COCO2017 pictures are prepared for demonstration:

```

run_calibration.py yolov6s.mlir \
--dataset ../COCO2017 \
--input_num 100 \
-o yolov6s_cali_table

```

Generate an int8 symmetric cvimodel using the calibration table:

```

model_deploy.py \
--mlir yolov6s.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov6s_cali_table \
--processor cv181x \
--model yolov6_cv181x_int8_sym.cvimodel

```
After compilation is complete, a file named yolov6_cv181x_int8_sym.cvimodel will be generated.

(Optional) Generate int8 asymmetric cvimodel

```
model_deploy.py \
--mlir yolov6s.mlir \
--quant_input --quant_output \
--quantize INT8 --asymmetric \
--calibration_table yolov6s_cali_table \
--processor cv181x \
--model yolov6_cv181x_int8_asym.cvimodel

```
After compilation is complete, a file named yolov6_cv181x_int8_asym.cvimodel will be generated。

## Board-side reasoning

Copy the compiled sample_yolov6, cvimodel, and the jpg image to be inferred to the board and execute the binary program:

`scp sample_yolov6 yolov6_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

Execute the following command：

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov6 ./yolov6_cv181x_int8_sym.cvimodel  000000000632.jpg 

```

The effect is as follows：

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


