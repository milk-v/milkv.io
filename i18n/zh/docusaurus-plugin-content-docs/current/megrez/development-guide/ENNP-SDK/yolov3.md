# YOLOv3 实战完整示例

此文档使用 ENNP SDK 将 YOLOv3 移植到 EIC7700 内部的硬件加速模块实现使用 NPU 推理神经网络模型，
请在参考此文档前请先按照 [ENNP SDK 下载](introduction#ennp-sdk-下载)，[EsQuant 安装](esquant#esquant-安装)， [EsAAC 与 EsSimulator 工具安装](esaac#esaac-与-essimulator-工具安装) 配置所需环境。

:::tip
此文档在 x86 ubuntu22.04 Linux 6.8.0-52-generic 上测试通过
:::

## 模型转换

### ONNX 模型导出

- 在 GitHub 下载官方代码

  ```bash
  git clone https://github.com/ultralytics/yolov3.git
  ```

- 修改依赖版本
  将 torch 版本指定为 1.12.0, 将 torchvision 版本指定为 0.13.0, 去掉 onnx 和 onnx-simplifier 的注释
  ```bash
  vim requirements.txt
  torch==1.12.0
  torchvision==0.13.0
  onnx>=1.10.0
  onnx-simplifier>=0.4.1
  ```
- 安装依赖

  ```bash
  cd yolov3
  pip3 install -r requirements.txt
  ```

- 下载官方模型

  ```bash
  wget https://github.com/ultralytics/yolov3/releases/download/v9.6.0/yolov3.pt
  ```

- 导出 onnx
  ```bash
  python3 export.py --weights ./yolov3.pt --img-size 416 --simplify --opset 13 --include onnx
  ```

### 模型裁减

由于导出的模型包含部分后处理操作，且量化工具暂时不支持后处理操作，所以需要裁剪掉后处理部分。
注意裁剪部分为 conv 后的 operations。
通过 [netron](https://netron.app/) 查看后在裁剪脚本填写 input_names 和输出的 output_names 即可。

- onnx::Shape_406
- onnx::Shape_461
- onnx::Reshape_516
  ![ennp_3.webp](/docs/megrez/ennp_3.webp)
  ```python
  import onnx
  input_onnx = "yolov3.onnx"
  input_names = ["images"]
  output_names = ["onnx::Shape_406", "onnx::Shape_461", "onnx::Reshape_516"]
  output_onnx = input_onnx
  cut_suffix = "_sim_extract_416_notranspose_noreshape." + input_onnx.split('.')[-1]
  new_output_onnx = output_onnx.replace(".onnx", cut_suffix)
  print(new_output_onnx)
  onnx.utils.extract_model(input_onnx, new_output_onnx, input_names, output_names)
  ```
  运行此 python 脚本后在当前目录生成已经剪裁后的 `yolov3_sim_extract_416_notranspose_noreshape.onnx` 模型

### 模型量化

:::tip
使用 EsQuant 工具执行量化模型， 请在 EsQuant Docker 中完成，具体请参考 [EsQuant 模型量换工具](esquant)
:::

- 配置 config.json

  config.json 已经提供在 `nn-tools/sample/yolov3/esquant` 里以下为示例，用户请参考并按实际情况做修改

  ```bash
  {
      "version": "1.3",
      "model": {
          "model_path": "/workspace/yolov3_sim_extract_416_notranspose_noreshape.onnx",
          "save_path": "/workspace/yolov3/",
          "images_list": "/workspace/img_list.txt",
          "analysis_list": "/workspace/alys_list.txt"
      },
      "quant": {
          "quantized_method": "per_channel",
          "quantized_dtype": "int8",
          "requant_mode": "mean",
          "quantized_algorithm": "at_eic",
          "optimization_option": "auto",
          "bias_option": "absmax",
          "nodes_option1": [],
          "nodes_option2": [],
          "nodes_i8": [],
          "nodes_i16": [],
          "mean": [
              0,0,0
          ],
          "std": [
              1,1,1
          ],
          "norm": true,
          "scale_path": "",
          "enable_analyse": true,
          "device": "cpu"
      },
      "preprocess": {
          "input_format": "RGB",
          "keep_ratio":false,
          "resize_shape": [
            416,
            416
          ],
          "crop_shape": [
            416,
            416
          ]
      }
  }
  ```

- 在 EsQuant Docker 容中 下载 coco2017 数据集

  模型量化需要校准集合, 这里使用 [coco2017-1000](https://cocodataset.org/#download) 数据集合进行校准，请用户自行下载, 并参考 `nn-tools/sample/yolov3/esquant` 制作好 `img_list.txt` 和 `alys_list.txt`。

  - img_list.txt

    ```bash
    /workspace/coco/val2017_1000/000000095069.jpg
    /workspace/coco/val2017_1000/000000499313.jpg
    /workspace/coco/val2017_1000/000000579893.jpg
    /workspace/coco/val2017_1000/000000023230.jpg
    /workspace/coco/val2017_1000/000000162035.jpg
    ...
    ```

  - alys_list.txt

    ```bash
    /workspace/coco/val2017_1000/000000095069.jpg
    ```

- 执行量化

  ```bash
  python3 Example_with_config.py --config_path ./config.json --preprocess_name Yolo
  ```

  量化执行完成后，进入 config.json 文件中定义的 `save_path` 目录，可看到生成的 `workspace_yolov3_sim_extract_416_notranspose_noreshape.json` 文件，进行图融合后的 onnx 文件和精度分析结果文件 `precision_accumulate_result.txt`、`precision_reset_result.txt`。

- （可选） 量化模型精度分析

  精度分析依赖于量化过程中生成的 `precision_accumulate_result.txt` 和 `precision_reset_result.txt` 文件。
  `precision_accumulate_result.txt` 统计的信息为量化模型和浮点数模型逐层累计的余弦相似度误差；
  `precision_reset_result.txt` 统计的信息为量化模型和浮点数模型每层均重置输入获得的余弦相似度误差。

  ```bash
  Sigmoid_240: 0.987436056137085
  Mul_241    : 0.9122292399406433
  Conv_242   : 0.9125502705574036
  Sigmoid_243: 0.9889860153198242
  Mul_244    : 0.9188247919082642
  Conv_245   : 0.8988267183303833
  Sigmoid_246: 0.9783140420913696
  Mul_247    : 0.9119919538497925
  Conv_248   : 0.997031569480896
  ```

  首先查看 `precision_accumulate_result.txt` 中最后的 op-name（网络结构中最后一层 operation 名称）对应的 cos_dist(mean) 是否大于 95%，如果满足大于阈值则视为误差在可接受范围内。
  如不满足需要查看另外一个文件即 precision_reset_result.txt。此时需要定位哪一层精度损失下降明显，然后在配置文件 config.json 中将此层替换成 int16（不要更换第一层 operation 和最后输出的 operation 的 datatype）。
  操作即在配置文件中找到 nodes_int16，在其中填写 node-name 字段。重新量化并开展精度分析，再排查量化精度误差。该过程结束后一般都可以获得较高的精度，如果精度还是低于阈值，则需要排查配置参数是否正确。

### （可选）准备仿真数据

- 生成用于模拟的 GoldenData

  `EsGoldenDataGen` 用于生成参考数据，包含 input feature map 和 output feature map，然后将工具生成的数据提供给 EsSimulator 然后进行验证。

  参考 config.json 在 `nn-tools/EIC7x_Release_20241230/sample/yolov3/essimulator` 中, 请按参考修改实际路径

  ```bash
  python3 -m esquant.es_goldendata_gen.EsGoldenDataManager --config yolov3.json
  ```

## 模型编译

:::tip
使用 EsAAC 工具执行量化模型， 请在 EsAAC Docker 中完成，具体请参考 [EsAAC 模型编译工具](esaac)
:::

### 编译模型

对通过 [模型量化](#模型量化) 得到的保存结果进行模型编译

```bash
./EsAAC --input-model /workspace/yolov3/workspace_yolov3_sim_extract_416_notranspose_noreshape.onnx --quant-stats /workspace/yolov3/workspace_yolov3_sim_extract_416_notranspose_noreshape.json
```

编译后模型保存在 `/home/eswin/model_files/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model`

### （可选）仿真验证

基于 EsSimulator 做基本测试，需要指定 model、input、output 参数， 需要参考上文 [准备仿真数据](#可选准备仿真数据) 生成。

这里需要注意：对于多输出模型输出的 ofmap 顺序可能和模型结构上面输出不一致，送入测试程序的时候会报错，这时 ofmap 需要指定顺序。EsACC 会在当前目录下产生一个
`model_name.ofmap_order.txt` 的文件来描述输出 ofmap 的顺序，文件格式如下所示(只有一个输出的模型不需要关注此文件)：

```bash
5    Conv_336_biasadd
6    Conv_292_biasadd
7    Conv_248_biasadd
```

```bash
eswin@83752f68f2ce:~$ ./EsSimulator --model=./model_files/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model --input=/workspace/yolov3_sim/input_000000523175.bin --output=/workspace/yolov3_sim/Conv_336_000000523175.bin,/workspace/yolov3_sim/Conv_292_000000523175.bin,/workspace/yolov3_sim/Conv_248_000000523175.bin
EsSimulator version: 0.0.3(Tue Dec 24 17:00:01 2024 +0800).

./model_files/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model test successful.
```

当模型数据基于 float32 或 float16，可设置误差容忍度，模型进行数据比较时，当绝对误差和相对误
差小于容忍度时，模型比较都为正确，配置容忍度示例如下：

```bash
./EsSimulator --model=./model_files/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model --input=/workspace/yolov3_sim/input_000000523175.bin --output=/workspace/yolov3_sim/Conv_336_000000523175.bin,/workspace/yolov3_sim/Conv_292_000000523175.bin,/workspace/yolov3_sim/Conv_248_000000523175.bin --tolerance=0.008
```

## 模型推理

在 Megrez 中使用 [es_run_model](es_run_model) 验证模型在硬件上的功能、精度并统计模型的性能。

- 将生成的模型复制到 Megrez 上
- 使用 es_run_model 运行模型

### 性能测试

```bash
cd /opt/eswin/bin
sudo ./es_run_model -m /home/debian/npu/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model -r 100
----------------------------------------------------------------
   min = 20.7301 ms    max = 24.5066 ms    avg = 20.8355 ms    fps = 47.9949 frame/s
----------------------------------------------------------------
```

### 保存推理结果

结果保存在指定的输出文件夹中

```bash
sudo ./es_run_model -m /home/debian/npu/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model -r 10 -i /home/debian/npu/yolov3_verify/input -o /home/debian/npu/yolov3_verify/npu_output
```

### 精度测试

将 [准备仿真数据](#可选准备仿真数据) 生成的数据复制到 Megrez 上

- 制作校对数据目录

  请参以下文件架构用仿真数据进行制作， 对于多输出模型需要按照 model_name.ofmap_order.txt 进行重命名并排序

  ```bash
  debian@rockos-eswin:~/npu/yolov3_verify$ tree
  .
  ├── input
  │   └── input_000000523175.bin
  └── output
      ├── output_0.bin
      ├── output_1.bin
      └── output_2.bin
  ```

- 运行校对
  ```bash
  sudo ./es_run_model -m /home/debian/npu/workspace_yolov3_sim_extract_416_notranspose_noreshape_npu_b1.model -r 10 -i /home/debian/npu/yolov3_verify/input -o /home/debian/npu/yolov3_verify/output -v
  ```
