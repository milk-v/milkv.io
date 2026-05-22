---
sidebar_label: 'YOLO12 Target Detection'
sidebar_position: 23
---

# yolo12 Target Detection

This test program will infer the yolo12 model to achieve target detection, and the results will be output in the form of printing and images.

## Download the precompiled cvimodel

```
git clone https://github.com/Arielfoever/milkv-yolo12.git
```

## Cross-compile YOLO program on PC

You can use the yolov8 program.

Duo256M yolov8 code location: [sample_yolov8.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov8.cpp)

You can also use yolov12 program which located at [v12.cpp](https://github.com/Arielfoever/milkv-yolo12/blob/master/duo/v12.cpp) to get the output images and better printings.

### Compilation method

Refer to the method in the previous chapter [Introduction](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) to compile the sample program.

After the compilation is completed, the `sample_yolov8` program we need will be generated in the `sample/cvi_yolo/` directory

### Model compilation

If you have already downloaded the yolov8 repository, `git pull` is enough.

#### Export yolo11.onnx model

Download [yolo12n.pt](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo12n.pt) via [YOLO12: Attention-Centric Object Detection](https://docs.ultralytics.com/models/yolo12/)

> - Download the corresponding yolo11 model file

Take [yolo11n](https://docs.ultralytics.com/zh/models/yolo11/#supported-tasks-and-modes) as an example

After downloading, copy it to the ultralytics directory.

Install ultralytics.

Copy the yolo_export/yolov8_export.py code to the yolo11 repository, yolo11 is compatible with yolov8.

```
python3 yolov8_export.py --weights ./yolo12n.pt --img-size 640 640
```

#### TPU-MLIR conversion model

Please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document to configure the TPU-MLIR working environment. For parameter analysis, please refer to the [TPU-MLIR](https://github.com/sophgo/tpu-mlir) document.

After configuring the working environment, create a model_yolo11n directory in the same directory as this project and put the model and image files into it.

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

After converting to mlir file, a `yolo12n.mlir` file will be generated.

#### MLIR to INT8 model (only supports INT8 quantized model)

Before quantizing to INT8 model, you need to run calibration.py to get the calibration table. The number of input data should be about 100~1000 according to the situation. Here, 100 COCO2017 pictures are prepared for demonstration:

```
run_calibration.py yolov12n.mlir \
--dataset ../COCO2017 \
--input_num 100 \
-o yolo12n_cali_table
```

Use calibration table to generate int8 symmetric cvimodel:

```
model_deploy.py \
--mlir yolov12n.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolo12n_cali_table \
--processor cv181x \
--model yolo12n_cv181x_int8_sym.cvimodel
```
After compilation, a file named yolo11n_cv181x_int8_sym.cvimodel will be generated.

## Board-side reasoning

Copy the compiled sample_yolov8, cvimodel, and the jpg image to be inferred to the board and execute the binary program:

`scp sample_yolov8 yolo11n_cv181x_int8_sym.cvimodel 000000000632.jpg root@192.168.42.1:/root/`

Execute the following command:

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

See images at [milkv-yolo12](https://github.com/Arielfoever/milkv-yolo12).

