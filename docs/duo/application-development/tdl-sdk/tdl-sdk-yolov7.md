---
sidebar_label: 'yolov7 object detection '
sidebar_position: 21
---

# yolov7 target detection

This test program will infer the yolov7 model to achieve target detection, and the results are only output in the form of printing.

## PC-side cross-compile YOLO program

Duo256M yolov7 code location: sample_yolov7.cpp

### Compilation method

Refer to the method in the previous chapter [Introduction] (https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) to compile the sample program

After the compilation is completed, the `sample_yolov7` program we need will be generated in the `sample/cvi_yolo/` directory

### Model compilation

#### Export yolov7.onnx model
> - Download yolov7 official repository code, the address is as follows: https://github.com/WongKinYiu/yolov7

`git clone https://github.com/WongKinYiu/yolov7`

> - Configure the working environment

```

cd yolov7
pip3 install -r requirements.txt
pip3 install onnx

```

> - Export yolov7.onnx model

Download the latest version of anacanda, please refer to: https://docs.anaconda.com/miniconda/

Download Python version 3.8 or above, PyTorch version 1.7 or above, it is best to use the latest version

Activate (for example, Python 3.8, torch1.9.0):

```

conda create -n py3.8 python==3.8.2
conda activate py3.8
python -m venv .venv
source .venv/bin/activate
pip3 install --upgrade pip
pip3 install torch==1.9.0

```

Download yolov7.pt model, download address: https://www.google.com/search?client=ubuntu-sn&channel=fs&q=yolov7.pt%E6%A8%A1%E5%9E%8B%E4%B8%8B%E8%BD%BD

Copy yolov7.pt to yolov7 directory

Copy yolo_export/yolov7_export.py to yolov7 directory

```

python3 yolov7_export.py --weights ./yolov7.pt --img-size 640 640

```

Tip: When running this command, if an error similar to `ModuleNotFoundError: No module named 'x'` appears, just `pip install x`

Generate yolov7.onnx in the current directory

Parameter explanation

--weights pytorch model path

--img-size image input size

#### TPU-MLIR conversion model

Please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document to configure the TPU-MLIR working environment. For parameter analysis, please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document.

After configuring the working environment, create a model_yolov7 directory in the same directory as this project and put the model and image files into it.

```

mkdir model_yolov7 && cd model_yolov7
cp ${REGRESSION_PATH}/yolov7.onnx .
cp -rf ${REGRESSION_PATH}/dataset/COCO2017 .
cp -rf ${REGRESSION_PATH}/image .

```

Tip: just copy the three files yolov7.onnx, COCO2017, and image to model_yolov7

The operation is as follows:

The specific implementation steps are divided into three steps:

> - model_transform.py converts the onnx model into the mlir intermediate format model

onnx -> model_transform.py -> mlir

> - run_calibration.py generates the int8 quantization calibration table

calibration_set -> run_calibration.py -> calibration_table

> - model_deploy.py combines mlir with the int8 quantization table to generate the cvimodel for TPU inference

mlir + calibration_table ->model_deploy.py -> cvimodel

#### onnx to MLIR

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

After converting to mlir file, a `yolov7.mlir` file will be generated.

#### MLIR to INT8 model (only supports INT8 quantized model)

Before quantizing to INT8 model, you need to run calibration.py to get the calibration table. The number of input data should be about 100~1000 according to the situation. Here, 100 COCO2017 pictures are prepared for demonstration:

```

run_calibration.py yolov7.mlir \
--dataset ./COCO2017 \
--input_num 100 \
-o yolov7_cali_table

```

Use calibration table to generate int8 symmetric cvimodel:

```

model_deploy.py \
--mlir yolov7.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov7_cali_table \
--processor cv181x \
--model yolov7_cv181x_int8_sym.cvimodel

```
After compilation, a file named yolov7_cv181x_int8_sym.cvimodel will be generated.

(Optional) Generate int8 asymmetric cvimodel

```
model_deploy.py \
--mlir yolov7.mlir \
--quant_input --quant_output \
--quantize INT8 --asymmetric \
--calibration_table yolov7_cali_table \
--processor cv181x \
--model yolov7_cv181x_int8_asym.cvimodel

```
After compilation, a file named yolov7c_v181x_int8_asym.cvimodel will be generated.


## Board-side reasoning

Copy the compiled sample_yolov7, cvimodel, and the jpg image to be inferred to the board and execute the binary program:

`scp sample_yolov7 yolov7_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

Execute the following command:

```
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov7 ./yolov7_cv181x_int8_sym.cvimodel 000000000632.jpg

```

The effect is as follows:

```
[root@milkv-duo]~# ./sample_yolov7 ./yolov7_cv181x_int8_sym.cvimodel  000000000632.jpg
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


