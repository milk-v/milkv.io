---
sidebar_label: 'YOLOv5 目标检测'
sidebar_position: 21
---

# YOLOv5 目标检测
该测试程序会推理 YOLOv5 模型实现目标检测， 结果仅以打印的形式输出

## PC 端交叉编译 YOLO 程序

- Duo 256 YOLOv5 代码位置：[sample_yolov5.cpp](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_yolo/sample_yolov5.cpp)

### 编译方法:   
- 脚本编译 参考上一章节[简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction)中的方法编译示例程序

- 手动编译
  - 打开cvitek-tdl-sdk-sg200x/sample/cvi_yolo目录
     ```bash
     cd cvitek-tdl-sdk-sg200x/sample/cvi_yolo
     ```

  - 编译yolo系列程序得到sample_yolov5二进制文件

     ```bash
     make KERNEL_ROOT=../../../cvitek-tdl-sdk-sg200x/sample MW_PATH=../../../cvitek-tdl-sdk-sg200x/sample/3rd/middleware/v2 TPU_PATH=../../../cvitek-tdl-sdk-sg200x/sample/3rd/tpu IVE_PATH=../../../cvitek-tdl-sdk-sg200x/sample/3rd/ive USE_TPU_IVE=ON  CHIP=CV180X SDK_VER=musl_riscv64 -j10
     ```
   
  - *（可选）删除生成的目标二进制文件*

     ```bash
     make clean
     ```

## 获取 cvimodel
你可以直接下载预编译好的 yolov5s int8 对称量化或者非对称量化 cvimodel 模型，亦可按照[模型编译](#模型编译)手动转换模型
### 下载预编译好的 cvimodel
- Duo 256
```bash
# int8 对称模型
wget https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/cvimodel/yolov5_cv181x_int8_sym.cvimodel
# int8 非对称模型
# wget https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/cvimodel/yolov5_cv181x_int8_asym.cvimodel
```
### 模型编译 
#### 导出 yolov5s.onnx 模型

- 首先载 yolov5 官方仓库代码，地址如下: [ultralytics/yolov5\: YOLOv5 🚀 in PyTorch > ONNX > CoreML > TFLite](https://github.com/ultralytics/yolov5)
    ```bash 
    git clone https://github.com/ultralytics/yolov5.git
    ```
- 配置工作环境
    ```bash
    cd yolov5
    pip3 install -r requirements.txt
    pip3 install onnx
    ```
- 获取 yolov5 的 .pt 格式的模型，例如下载 yolov5s 模型的地址：[yolov5s](https://github.com/ultralytics/yolov5/releases/download/v7.0/yolov5s.pt)
    ```bash
    wget https://github.com/ultralytics/yolov5/releases/download/v7.0/yolov5s.pt
    ```

- 将 cvitek-tdl-sdk-sg200x/sample/yolo_export/[yolov5_export.py](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/yolo_export/yolov5_export.py) 复制到 yolov5 仓库目录下

    利用 yolov5_export.py 替换 forward 函数让 yolov5 的后处理由 RISC-V 来做并导出 onnx 格式模型

    ```bash
    python3 yolov5_export.py --weights ./yolov5s.pt --img-size 640 640
    ```

  参数解释 
  
  --weights pytorch 模型路径
  
  --img-size 图片输入大小



#### TPU-MLIR 转换模型

请参考 [TPU-MLIR 文档](https://github.com/sophgo/tpu-mlir) 配置好 TPU-MLIR 工作环境，参数解析请参考 [TPU-MLIR 文档](https://github.com/sophgo/tpu-mlir)

具体实现步骤分三步

- `model_transform.py` 将 onnx 模型转化成 mlir 中间格式模型

  onnx -> model_transform.py -> mlir

- `run_calibration.py` 生成 int8 量化校准表

  calibration_set -> run_calibration.py -> calibration_table

- `model_deploy.py` 将 mlir 配合 int8 量化表生成用于 TPU 推理的 cvimodel

  mlir + calibration_table  ->model_deploy.py -> cvimodel

##### onnx 转 MLIR

```bash
model_transform.py \
--model_name yolov5s \
--model_def yolov5s.onnx \
--input_shapes [[1，3，640，640]] \
--mean 0.0,0.0,0.0 \
--scale 0.0039216,0.0039216,0.0039216 \
--keep_aspect_ratio \
--pixel_format rgb \
--test_input ../image/dog.jpg \
--test_result yolov5s_top_outputs.npz \
--mlir yolov5s.mlir
```

转换成mlir文件之后，会生成一个yolov5s_in_f32.npz文件，该文件是模型的输入文件

##### MLIR 转 INT8 模型 (仅支持 INT8 量化模型)

量化成 INT8 模型前需要运行 calibration.py，得到校准表，输入数据的数量根据情况准备 100~1000 张左右，这里演示准备了 100 张 COCO2017 的图片

```bash
run_calibration.py yolov5s.mlir \
--dataset ../COCO2017 \
--input_num 100 \
-o yolov5s_cali_table
```

然后用校准表生成 int8 对称 cvimodel

```bash
model_deploy.py \
--mlir yolov5s.mlir \
--quant_input --quant_output \
--quantize INT8 \
--calibration_table yolov5s_cali_table \
--processor cv181x \
--test_input yolov5s_in_f32.npz \
--test_reference yolov5s_top_outputs.npz \
--tolerance 0.85,0.45 \
--model yolov5_cv181x_int8_sym.cvimodel
```

编译完成后，会生成名为 yolov5_cv181x_int8_sym.cvimodel 的文件

*（可选）生成 int8 非对称 cvimodel*

```bash
model_deploy.py \
--mlir yolov5s.mlir \
--quant_input --quant_output \
--quantize INT8 --asymmetric \
--calibration_table yolov5s_cali_table \
--processor cv181x \
--test_input yolov5s_in_f32.npz \
--test_reference yolov5s_top_outputs.npz \
--tolerance 0.85,0.45 \
--model yolov5_cv181x_int8_asym.cvimodel
```

编译完成后，会生成名为 yolov5_cv181x_int8_asym.cvimodel 的文件



## 板端推理

将编译好的 [sample_yolov5](#pc-端交叉编译-yolo-程序)、[cvimodel](#获取-cvimodel)、要推理的 jpg 图片，拷贝到板端然后执行二进制程序
```bash
scp sample_yolov5 yolov5_cv181x_int8_asym.cvimodel 000000000113.jpg root@192.168.42.1:/root/
```
要推理的图片如下:

![duo-tdl-sdk-yolov5-detection.jpg](/docs/duo/tdl-sdk/duo-tdl-sdk-yolov5-detection.jpg)

执行以下命令

```bash
export LD_LIBRARY_PATH='/mnt/system/lib'
./sample_yolov5 ./yolov5_cv181x_int8_asym.cvimodel  000000000113.jpg 
```
推理结果如下
```bash
[root@milkv-duo]~/data/test_make# ./sample_yolov5 ./yolov5_cv181x_int8_asym.cvim
odel  000000000113.jpg 
[ 5665.088539] vb has already inited， set_config cmd has no effect
version: 1.4.0
yolov5s Build at 2024-01-30 16:32:00 For platform cv181x
Max SharedMem size:5734400
model opened:./yolov5_cv181x_int8_asym.cvimodel
detect res: 340.399902 96.056824 415.000000 423.052612 0.866147 0
detect res: 149.599243 52.756699 344.154053 434.715759 0.864127 0
detect res: 165.295807 434.305786 389.069794 546.548950 0.739044 55
detect res: 5.554703 34.055344 161.554688 521.089905 0.718132 0
detect res: 79.427734 458.260071 124.559998 515.725830 0.677201 41
detect res: 256.286438 367.324158 303.713562 450.689941 0.598015 43
detect res: 282.405457 93.188477 309.046570 121.621582 0.555912 41
detect res: 281.694244 60.846092 309.968231 91.153908 0.520292 41
```
此程序会推理 yolov5 模型检测图片内容，推理结果仅以打印输出， 输出解析为 `res: x y w h conf label`，分别为识别结果框左上角坐标`(x,y)`，识别结果框的宽和长`(w,h)`，识别结果的置信度`conf`，识别结果的物体标签`label`
```bash
# 查阅 COCO2017 标签文件可以知道 
0 person
55 cake
41 cup
43 knife
```
