---
sidebar_label: 'Densenet Image Classification'
sidebar_position: 39
---

# Image Classification Based on Densenet

## 1. Configure Docker development environment

Refer to [here](https://milkv.io/docs/duo/application-development/tpu/tpu-docker). After configuring the Docker development environment, return here to continue the next step.

## 2. Prepare the working directory in Docker

Create and enter the `densenet121` working directory, note that it is a directory at the same level as `tpu-mlir`.
```
# mkdir densenet121 && cd densenet121
```

Get the original model
```
# wget https://github.com/onnx/models/raw/main/vision/classification/densenet-121/model/densenet-12.tar.gz
```
Extract `densenet-12.tar.gz`
```
# tar -zxvf densenet-12.tar.gz
```
After extraction is complete, the `densenet-12` folder will be generated in the current directory, which contains the `densenet-12.onnx` model file.

Copy test image:
```
# cp -rf ${TPUC_ROOT}/regression/dataset/ILSVRC2012/ .
# cp -rf ${TPUC_ROOT}/regression/image/ .
```
`${TPUC_ROOT}` here is an environment variable, corresponding to the `tpu-mlir` directory, which is loaded in the `source ./tpu-mlir/envsetup.sh` step in the previous configuration of the Docker development environment.

Create and enter the `work` working directory to store compiled files such as `MLIR` and `cvimodel`
```
# mkdir work && cd work
```

## 3. ONNX Model Conversion

:::tip
The Duo development board is equipped with the CV1800B chip, which supports the **ONNX series** and **Caffe models**. Currently, it does not support TFLite models. In terms of quantized data types, it supports **quantization in BF16 format** and **asymmetric quantization in INT8 format**.
:::

The steps for model conversion are as follows:
- Convert ONNX model to MLIR
- Generate calibration tables required for quantification
- MLIR quantization into INT8 asymmetric cvimodel

### ONNX model converted to MLIR

The model in this example is RGB input, `mean` and `scale` are `123.675`,`116.28`,`103.53` and `0.0171`,`0.0175`,`0.0174` respectively.

The command to convert an ONNX model to an MLIR model is as follows:
```
model_transform.py \
 --model_name densenet121 \
 --model_def ../densenet-12/densenet-12.onnx \
 --test_input ../image/cat.jpg \
 --input_shapes [[1,3,224,224]] \
 --resize_dims 256,256 \
 --mean 123.675,116.28,103.53 \
 --scale 0.0171,0.0175,0.0174 \
 --pixel_format rgb \
 --test_result densenet121_top_outputs.npz \
 --mlir densenet121.mlir
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-densenet_05.png)

After converting to the MLIR model, a `densenet121.mlir` file will be generated, which is the MLIR model file. A `densenet121_in_f32.npz` file and a `densenet121_top_outputs.npz` file will also be generated, which are the input files for subsequent model conversion.

![duo](/docs/duo/tpu/duo-tpu-densenet_06.png)

### MLIR to INT8 model

#### Generate calibration tables required for quantification

Before converting to the INT8 model, you need to generate a calibration table. Here we use the existing 100 pictures from ILSVRC2012 as an example and execute the calibration command:
```
run_calibration.py densenet121.mlir \
 --dataset ../ILSVRC2012 \
 --input_num 100 \
 -o densenet121_cali_table
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-densenet_07.png)

After the operation is completed, the `densenet121_cali_table` file will be generated, which is used for subsequent compilation of the INT8 model.

![duo](/docs/duo/tpu/duo-tpu-densenet_08.png)

#### MLIR quantized into INT8 asymmetric cvimodel

The command to convert MLIR model to INT8 model is as follows:
```
model_deploy.py \
 --mlir densenet121.mlir \
 --quantize INT8 \
 --calibration_table densenet121_cali_table \
 --chip cv180x \
 --test_input ../image/cat.jpg \
 --test_reference densenet121_top_outputs.npz \
 --compare_all \
 --fuse_preprocess \
 --model densenet121_cv180x_int8_fuse.cvimodel
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-densenet_09.png)

After compilation is completed, the `densenet121_cv180x_int8_fuse.cvimodel` file will be generated.

![duo](/docs/duo/tpu/duo-tpu-densenet_10.png)

## 4. Validate on Development Board Duo

### Connecting the Duo development board

Complete the connection between the Duo development board and the computer according to the previous tutorial, and use tools such as `mobaxterm` or `Xshell` to open a terminal to operate the Duo development board.

### Get tpu-sdk

Switch to the `/workspace` directory in the Docker terminal
```
cd /workspace
```

Download tpu-sdk
```
git clone https://github.com/milkv-duo/tpu-sdk.git
```

### Copy tpu-sdk and model files to Duo

In the terminal of the Duo board, create a new directory `/mnt/tpu/`
```
# mkdir -p /mnt/tpu && cd /mnt/tpu
```

In the Docker terminal, copy `tpu-sdk` and model files to the Duo
```
# scp -r /workspace/tpu-sdk root@192.168.42.1:/mnt/tpu/
# scp /workspace/densenet121/work/densenet121_cv180x_int8_fuse.cvimodel root@192.168.42.1:/mnt/tpu/tpu-sdk/
```

### Set environment variables

In the terminal of the Duo board, set the environment variables
```
# cd /mnt/tpu/tpu-sdk
# source ./envs_tpu_sdk.sh
```

### Perform Image Classification

On the Duo board, perform Image Classification on the image

![duo](/docs/duo/tpu/duo-tpu-cat.jpg)

Image classification using `densenet121_cv180x_int8_fuse.cvimodel` model:
```
./samples/bin/cvi_sample_classifier_fused_preprocess \
 ./densenet121_cv180x_int8_fuse.cvimodel \
 ./samples/data/cat.jpg \
 ./samples/data/synset_words.txt
```

Example of successful classification results

![duo](/docs/duo/tpu/duo-tpu-densenet_11.png)
