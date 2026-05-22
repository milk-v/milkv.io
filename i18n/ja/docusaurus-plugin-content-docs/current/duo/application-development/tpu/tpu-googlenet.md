---
sidebar_label: 'Googlenet Image Classification'
sidebar_position: 37
---

# Image Classification Based on Googlenet

## 1. Configure Docker development environment

Refer to [here](https://milkv.io/docs/duo/application-development/tpu/tpu-docker). After configuring the Docker development environment, return here to continue the next step.

:::warning
If you are using a configured Docker development environment, please make sure to follow the Docker configuration tutorial to execute command `source ./tpu-mlir/envsetup.sh` after starting Docker, otherwise errors may occur in subsequent steps.
:::

## 2. Prepare the working directory in Docker

Create and enter the `googlenet` working directory, note that it is a directory at the same level as `tpu-mlir`.
```
# mkdir googlenet && cd googlenet
```

Get the original model
```
wget https://media.githubusercontent.com/media/onnx/models/main/validated/vision/classification/inception_and_googlenet/googlenet/model/googlenet-12.onnx
```

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

### ONNX model converted to MLIR

The model in this example is RGB input, `mean` and `scale` are `123.675`,`116.28`,`103.53` and `0.0171`,`0.0175`,`0.0174` respectively. The model conversion command is as follows:
```
model_transform.py \
 --model_name googlenet \
 --model_def ../googlenet-12.onnx \
 --test_input ../image/cat.jpg \
 --input_shapes [[1,3,224,224]] \
 --resize_dims 256,256 \
 --mean 123.675,116.28,103.53 \
 --scale 0.0171,0.0175,0.0174 \
 --pixel_format rgb \
 --test_result googlenet_top_outputs.npz \
 --mlir googlenet.mlir
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-googlenet_05.png)

After converting to the MLIR model, a `googlenet.mlir` file will be generated, which is the MLIR model file. A `googlenet_in_f32.npz` file and a `googlenet_top_outputs.npz` file will also be generated, which are the input files for subsequent model conversion.

![duo](/docs/duo/tpu/duo-tpu-googlenet_06.png)

### MLIR to BF16 model

The command to convert the MLIR model to the BF16 model is as follows:
```
model_deploy.py \
 --mlir googlenet.mlir \
 --quantize BF16 \
 --chip cv180x \
 --test_input googlenet_in_f32.npz \
 --test_reference googlenet_top_outputs.npz \
 --model googlenet_bf16.cvimodel
```

:::tip
If the development board you are using is not Duo, please replace the fourth line `-- chip cv180x` in the above command with the corresponding chip model.
When using Duo 256M/Duo S , it should be changed to ` -- chip cv181x`.
:::

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-googlenet_07.png)

After compilation is completed, the `googlenet_bf16.cvimodel` file will be generated.

![duo](/docs/duo/tpu/duo-tpu-googlenet_08.png)

### MLIR to INT8 model

#### Generate calibration tables required for quantification

Run `run_calibration.py` to get the calibration table. The number of input data should be about 100~1000 pieces depending on the situation. Here we use the existing 100 images from ILSVRC2012 as an example and execute the calibration command:
```
run_calibration.py googlenet.mlir \
 --dataset ../ILSVRC2012 \
 --input_num 100 \
 -o googlenet_cali_table
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-googlenet_09.png)

After the operation is completed, the `googlenet_cali_table` file will be generated, which is used for subsequent compilation of the INT8 model.

![duo](/docs/duo/tpu/duo-tpu-googlenet_10.png)

#### MLIR quantized into INT8 asymmetric cvimodel

The command to convert MLIR model to INT8 model is as follows:
```
model_deploy.py \
 --mlir googlenet.mlir \
 --quantize INT8 \
 --calibration_table googlenet_cali_table \
 --chip cv180x \
 --test_input ../image/cat.jpg \
 --test_reference googlenet_top_outputs.npz \
 --compare_all \
 --fuse_preprocess \
 --model googlenet_int8_fuse.cvimodel
```

:::tip
If the development board you are using is not Duo, please replace the fifth line `-- chip cv180x` in the above command with the corresponding chip model.
When using Duo 256M/Duo S , it should be changed to ` -- chip cv181x`.
:::

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-googlenet_11.png)

After compilation is completed, the `googlenet_int8_fuse.cvimodel` file will be generated.

![duo](/docs/duo/tpu/duo-tpu-googlenet_12.png)

## 4. Validate on Development Board Duo

### Connecting the Duo development board

Complete the connection between the Duo development board and the computer according to the previous tutorial, and use tools such as `mobaxterm` or `Xshell` to open a terminal to operate the Duo development board.

### Get tpu-sdk

Switch to the `/workspace` directory in the Docker terminal
```
cd /workspace
```

Download tpu sdk, if you are using Duo, execute
```
git clone https://github.com/milkv-duo/tpu-sdk-cv180x.git
mv ./tpu-sdk-cv180x ./tpu-sdk
```

Else,if you are using Duo 256M/Duo S , execute
```
git clone https://github.com/milkv-duo/tpu-sdk-sg200x.git
mv ./tpu-sdk-sg200x ./tpu-sdk
```

### Copy tpu-sdk and model files to Duo

In the terminal of the Duo board, create a new directory `/mnt/tpu/`
```
# mkdir -p /mnt/tpu && cd /mnt/tpu
```

In the Docker terminal, copy `tpu-sdk` and model files to the Duo
```
# scp -r /workspace/tpu-sdk root@192.168.42.1:/mnt/tpu/
# scp /workspace/googlenet/work/googlenet_bf16.cvimodel root@192.168.42.1:/mnt/tpu/tpu-sdk/
# scp /workspace/googlenet/work/googlenet_int8_fuse.cvimodel root@192.168.42.1:/mnt/tpu/tpu-sdk/
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

Image classification using `googlenet_bf16.cvimodel` model
```
./samples/bin/cvi_sample_classifier_bf16 \
 ./googlenet_bf16.cvimodel \
 ./samples/data/cat.jpg \
 ./samples/data/synset_words.txt
```

Example of successful classification results

![duo](/docs/duo/tpu/duo-tpu-googlenet_13.png)

Image classification using `googlenet_int8_fuse.cvimodel` model
```
./samples/bin/cvi_sample_classifier_fused_preprocess \
 ./googlenet_int8_fuse.cvimodel \
 ./samples/data/cat.jpg \
 ./samples/data/synset_words.txt
```

Example of successful classification results

![duo](/docs/duo/tpu/duo-tpu-googlenet_14.png)
