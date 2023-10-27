---
sidebar_label: 'Resnet18 Image Classification'
sidebar_position: 40
---

# Image Classification Based on Resnet18

## 1. Configure Docker development environment

Refer to [here](https://milkv.io/docs/duo/application-development/tpu/tpu-docker). After configuring the Docker development environment, return here to continue the next step.

## 2. Prepare the working directory in Docker

Create and enter the `resnet18` working directory, note that it is a directory at the same level as `tpu-mlir_*`.
```
# mkdir resnet18 && cd resnet18
```

Get the original model
```
# wget https://github.com/onnx/models/raw/main/vision/classification/resnet/model/resnet18-v1-7.tar.gz
```
Extract `resnet18-v1-7.tar.gz`
```
# tar -zxvf resnet18-v1-7.tar.gz
```
After extraction is complete, the `resnet18-v1-7` folder will be generated in the current directory, which contains the `resnet18-v1-7.onnx` model file.

Copy test image:
```
# cp -rf ${TPUC_ROOT}/regression/dataset/ILSVRC2012/ .
# cp -rf ${TPUC_ROOT}/regression/image/ .
```
`${TPUC_ROOT}` here is an environment variable, corresponding to the `tpu-mlir_*` directory, which is loaded in the `source ./tpu-mlir_*/envsetup.sh` step in the previous configuration of the Docker development environment.

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
 --model_name resnet18 \
 --model_def ../resnet18-v1-7/resnet18-v1-7.onnx \
 --test_input ../image/cat.jpg \
 --input_shapes [[1,3,224,224]] \
 --resize_dims 256,256 \
 --mean 123.675,116.28,103.53 \
 --scale 0.0171,0.0175,0.0174 \
 --pixel_format rgb \
 --test_result resnet18_top_outputs.npz \
 --mlir resnet18.mlir
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-resnet18_05.png)

After converting to the MLIR model, a `resnet18.mlir` file will be generated, which is the MLIR model file. A `resnet18_in_f32.npz` file and a `resnet18_top_outputs.npz` file will also be generated, which are the input files for subsequent model conversion.

![duo](/docs/duo/tpu/duo-tpu-resnet18_06.png)

### MLIR to INT8 model

#### Generate calibration tables required for quantification

Before converting to the INT8 model, you need to generate a calibration table. Here we use the existing 100 pictures from ILSVRC2012 as an example and execute the calibration command:
```
run_calibration.py resnet18.mlir \
 --dataset ../ILSVRC2012 \
 --input_num 100 \
 -o resnet18_cali_table
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-resnet18_07.png)

After the operation is completed, the `resnet18_cali_table` file will be generated, which is used for subsequent compilation of the INT8 model.

![duo](/docs/duo/tpu/duo-tpu-resnet18_08.png)

#### MLIR quantized into INT8 asymmetric cvimodel

The command to convert MLIR model to INT8 model is as follows:
```
model_deploy.py \
 --mlir resnet18.mlir \
 --quantize INT8 \
 --calibration_table resnet18_cali_table \
 --chip cv180x \
 --test_input ../image/cat.jpg \
 --test_reference resnet18_top_outputs.npz \
 --compare_all \
 --fuse_preprocess \
 --model resnet18_cv180x_int8_fuse.cvimodel
```

Example of successful operation

![duo](/docs/duo/tpu/duo-tpu-resnet18_09.png)

After compilation is completed, the `resnet18_cv180x_int8_fuse.cvimodel` file will be generated.

![duo](/docs/duo/tpu/duo-tpu-resnet18_10.png)

## 4. Validate on Development Board Duo

### Connecting the Duo development board

Complete the connection between the Duo development board and the computer according to the previous tutorial, and use tools such as `mobaxterm` or `Xshell` to open a terminal to operate the Duo development board.

### Get cvitek_tpu_sdk

1. Download from MEGA

   [Download address](https://mega.nz/folder/yZghQA4R#aZkbTwJb7Ji5LvAWIuBtag)

   Package Name: `cvitek_tpu_sdk_cv180x_musl_riscv64_rvv.tar.gz`

2. Download from FTP server

   ```
   sftp://218.17.249.213
   username: cvitek_mlir_2023
   password: 7&2Wd%cu5k
   ```
   If the file is not found, you can search for it in the backup directory. The old version of the package may be placed in the backup directory after updating the version.

After the download is complete, copy it to Docker through the Windows terminal
```
docker cp C:\Users\Carbon\Duo-TPU\cvitek_tpu_sdk_cv180x_musl_riscv64_rvv.tar.gz  DuoTPU:/workspace/
```

And extract it in Docker
```
# tar -zxvf cvitek_tpu_sdk_cv180x_musl_riscv64_rvv.tar.gz
```

After the extraction is complete, a `cvitek_tpu_sdk` folder will be generated.

### Copy the development toolkit and model files to the development board

In the terminal of the Duo board, create a new directory `/mnt/tpu/`
```
# mkdir -p /mnt/tpu && cd /mnt/tpu
```

In the Docker terminal, copy the development toolkit and model files to the Duo board
```
# scp -r /workspace/cvitek_tpu_sdk root@192.168.42.1:/mnt/tpu/
# scp /workspace/resnet18/work/resnet18_cv180x_int8_fuse.cvimodel root@192.168.42.1:/mnt/tpu/cvitek_tpu_sdk/
```

### Set environment variables

In the terminal of the Duo board, set the environment variables
```
# cd /mnt/tpu/cvitek_tpu_sdk
# source ./envs_tpu_sdk.sh
```

### Perform Image Classification

On the Duo board, perform Image Classification on the image

![duo](/docs/duo/tpu/duo-tpu-cat.jpg)

Image classification using `resnet18_cv180x_int8_fuse.cvimodel` model:
```
./samples/bin/cvi_sample_classifier_fused_preprocess \
 ./resnet18_cv180x_int8_fuse.cvimodel \
 ./samples/data/cat.jpg \
 ./samples/data/synset_words.txt
```

Example of successful classification results

![duo](/docs/duo/tpu/duo-tpu-resnet18_11.png)

## 5. Appendix

The documents involved in the text are summarized as follows:

- TPU-MLIR model conversion tool：`tpu-mlir_v1.3.228-g19ca95e9-20230921.tar.gz`
- TPU SDK Development Kit：`cvitek_tpu_sdk_cv180x_musl_riscv64_rvv.tar.gz`
- (Additional) Sample test routine source code：`cvitek_tpu_samples.tar.gz`
- (Additional) Converted cvimodel package：`cvimodel_samples_cv180x.tar.gz`

The package files required for TPU development mentioned in the text can be obtained from the sftp site below, or downloaded from [MEGA](https://mega.nz/folder/yZghQA4R#aZkbTwJb7Ji5LvAWIuBtag)
```
sftp://218.17.249.213
user: cvitek_mlir_2023
password: 7&2Wd%cu5k
```

The interface after logging in to the sftp site using WinSCP:

![duo](/docs/duo/tpu/duo-tpu-sftp.png)

Notice:
1. samples_extra in the sample directory provides more sample scripts, but the cvimodel name has been hard-coded in it. If you want to use the script to run, you need to modify the cvimodel name yourself.
2. This section introduces the use of precompiled sample programs to deploy and test the converted cvimodel. If developers are interested in encoding and cross-compiling the sample source code, please refer to the official website [TPU-MLIR Documentation](https://doc.sophgo.com/sdk-docs/v23.05.01/docs_latest_release/docs/tpu-mlir/quick_start/html/10_cv18xx_guide.html#runtime-sample) in Chapter 9 "CV18xx Chip Usage Guide" Section 3 "Compiling and running the runtime sample" content.
