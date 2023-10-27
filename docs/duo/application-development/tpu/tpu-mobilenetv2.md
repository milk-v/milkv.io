---
sidebar_label: 'MobileNetV2 Image Classification'
sidebar_position: 35
---

# Image Classification Based on MobileNetV2

## 1. Configure Docker development environment

Refer to [here](https://milkv.io/docs/duo/application-development/tpu/tpu-docker). After configuring the Docker development environment, return here to continue the next step.

## 2. Prepare the working directory in Docker

Create and enter the `mobilenet_v2` working directory, note that it is a directory at the same level as `tpu-mlir`.
```
# mkdir mobilenet_v2 && cd mobilenet_v2
```

Download the MobileNet model from the official website:
```
git clone https://github.com/shicai/MobileNet-Caffe.git
```

Place the model files in the cloned `MobileNet-Caffe` directory and the image files in the `tpu-mlir` tool chain directory into the current directory.
```
# cp MobileNet-Caffe/mobilenet_v2_deploy.prototxt .
# cp MobileNet-Caffe/mobilenet_v2.caffemodel .
# cp -rf ${TPUC_ROOT}/regression/dataset/ILSVRC2012/ .
# cp -rf ${TPUC_ROOT}/regression/image/ .
```
`${TPUC_ROOT}` here is an environment variable, corresponding to the `tpu-mlir` directory, which is loaded in the `source ./tpu-mlir/envsetup.sh` step in the previous configuration of the Docker development environment.

Create and enter the `work` working directory to store compiled files such as `MLIR` and `cvimodel`
```
# mkdir work && cd work
```

## 3. MobileNet-Caffe Model Conversion

:::tip
The Duo development board is equipped with the CV1800B chip, which supports the **ONNX series** and **Caffe models**. Currently, it does not support TFLite models. In terms of quantized data types, it supports **quantization in BF16 format** and **asymmetric quantization in INT8 format**.
:::

The steps for model conversion are as follows:
- Convert Caffe model to MLIR
- Generate calibration tables required for quantification
- MLIR quantization into INT8 asymmetric cvimodel

### Caffe model converted to MLIR

The model input are pictures. Before converting the model, we need to understand the preprocessing of the model. If the model uses preprocessed npz files as input, there is no need to consider preprocessing. The preprocessing process is expressed as follows ($x$ represents the input): $$ y = (x-mean)\times scale $$

The model in this example is BGR input, `mean` and `scale` are `103.94`, `116.78`, `123.68` and `0.017`, `0.017`, `0.017` respectively. The model conversion command is as follows:
```
model_transform.py \
 --model_name mobilenet_v2 \
 --model_def ../mobilenet_v2_deploy.prototxt \
 --model_data ../mobilenet_v2.caffemodel \
 --input_shapes [[1,3,224,224]] \
 --resize_dims=256,256 \
 --mean 103.94,116.78,123.68 \
 --scale 0.017,0.017,0.017 \
 --pixel_format bgr \
 --test_input ../image/cat.jpg \
 --test_result mobilenet_v2_top_outputs.npz \
 --mlir mobilenet_v2.mlir
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_05.png)

After converting to the MLIR model, a `mobilenet_v2.mlir` file will be generated, which is the MLIR model file. A `mobilenet_v2_in_f32.npz` file and a `mobilenet_v2_top_outputs.npz` file will also be generated, which are the input files for subsequent model conversion.

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_06.png)

### MLIR to INT8 model

#### Generate calibration tables required for quantification

Run `run_calibration.py` to get the calibration table. The number of input data should be about 100~1000 pieces depending on the situation. Here we use the existing 100 images from ILSVRC2012 as an example and execute the calibration command:

```
run_calibration.py mobilenet_v2.mlir \
 --dataset ../ILSVRC2012 \
 --input_num 100 \
 -o mobilenet_v2_cali_table
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_07.png)

After the operation is completed, the `mobilenet_v2_cali_table` file will be generated, which is used for subsequent compilation of the INT8 model.

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_08.png)

#### MLIR quantized into INT8 asymmetric cvimodel

Use the `model_deploy.py` script parameter to use `asymmetric` for asymmetric quantization and convert the MLIR file into an INT8 asymmetric quantization model:
```
model_deploy.py \
 --mlir mobilenet_v2.mlir \
 --asymmetric \
 --calibration_table mobilenet_v2_cali_table \
 --fuse_preprocess \
 --customization_format BGR_PLANAR \
 --chip cv180x \
 --quantize INT8 \
 --test_input ../image/cat.jpg \
 --model mobilenet_v2_cv1800_int8_asym.cvimodel
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_09.png)

After compilation is completed, the `mobilenet_v2_cv1800_int8_asym.cvimodel` file will be generated.

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_10.png)

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
# scp /workspace/mobilenet_v2/work/mobilenet_v2_cv1800_int8_asym.cvimodel root@192.168.42.1:/mnt/tpu/tpu-sdk/
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

Enter the samples directory

```
# cd samples
```

View cvimodel info
```
./bin/cvi_sample_model_info ../mobilenet_v2_cv1800_int8_asym.cvimodel
```

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_11.png)

Perform image classification test
```
./bin/cvi_sample_classifier_fused_preprocess \
 ../mobilenet_v2_cv1800_int8_asym.cvimodel \
 ./data/cat.jpg \
 ./data/synset_words.txt
```

Example of successful classification results

![duo](/docs/duo/tpu/duo-tpu-mobilenetv2_12.png)
