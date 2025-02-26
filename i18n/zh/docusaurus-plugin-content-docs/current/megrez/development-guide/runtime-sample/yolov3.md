# YOLOv3 示例代码

NPU Runtime 提供的示例目录 (npu_runtime_sample) 主要包括调用 NPU Runtime 接口的示例代码和模型目录。

## 安装 Yolov3 示例

```bash
sudo apt install es-sdk-sample-npu-runtime
```

安装后 sample 位于 `/opt/eswin/sample-code/npu_sample/npu_runtime_sample` 目录

## 目录

NPU Runtime 提供的示例目录 (npu_runtime_sample) 主要包括调用 NPU Runtime 接口的示例代码和模型目录：src 和 models，详细目录结构如下：

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_runtime_sample$ tree
.
├── bin
│   └── sample_npu
├── models
│   └── yolov3
│       ├── es_yolov3_classes.txt
│       ├── es_yolov3_post_process.json
│       ├── es_yolov3_pre_process.json
│       ├── git_yolov3_416_mix_1x3x416x416_dyn_latency.model
│       ├── git_yolov3_416_mix_1x3x416x416_dyn_latency.ofmap_order.txt
│       ├── input
│       │   ├── pictures
│       │   │   └── input0
│       │   │       ├── bus.jpg
│       │   │       └── dog.jpg
│       │   └── preprocessed
│       │       ├── 0
│       │       │   └── bus.bin
│       │       ├── 1
│       │       │   └── dog.bin
│       │       └── list.txt
│       └── model.json
└── src
    ├── build.sh
    ├── CMakeLists.txt
    ├── README.md
    ├── sample_npu_comm.cpp
    ├── sample_npu_comm.h
    ├── sample_npu.cpp
    └── utils
        ├── json
        │   ├── cJSON.cpp
        │   └── cJSON.h
        ├── postprocess
        │   ├── EsPostProcess.cpp
        │   └── EsPostProcess.h
        ├── preprocess
        │   ├── EsHwPreProcess.cpp
        │   ├── EsHwPreProcess.h
        │   └── IPreprocess.h
        ├── sample_npu_utils.cpp
        ├── sample_npu_utils.h
        └── vdec
            ├── common
            │   ├── sample_comm.h
            │   ├── sample_comm_sys.cpp
            │   ├── sample_comm_vdec.cpp
            │   └── sample_comm_vps.cpp
            ├── EsVdec.cpp
            ├── EsVdec.h
            ├── IVdec.h
            └── MemoryPool.h

```

### src 目录

NPU Runtime 提供的示例代码的入口是 sample_npu.cpp 文件，这个文件代码包含了一系列示例的 Case 例如： 同步，异步，多 Stream，Context 以及动态 batchsize 的 Case 等，每种 Case 在代码中都有单独的入口函数，用户可以轻松找到适合自己应用的 Sample。

README.md 文档中包含编译 sample_npu 代码方法以及运行 sample_npu 命令行示例。

Utils 中主要包含一些辅助的工具库。例如：图片的前处理 (preprocess) 和推理后数据的后处理 (postprocess) 等。

### models 目录

- 配置文件介绍：

  es_yolov3_classes.txt 包含类别标签信息。

  es_yolov3_pre_process.json 包含预处理的策略和参数。

  es_yolov3_post_process.json 包含后处理算子相关参数。

- input 目录：

  该目录包含 Pictures 和 Preprocessed 目录。

  Pictures 目录存放待推理的原始图片文件。

  Preprocessed 目录存放已经预处理(Decode，Resize，Normalization 和 CVT)后的二进制数据文件。

- output 目录：

  output 目录在这个 Sample 示例中暂时没有用到，es_run_model 工具会使用 output 目录中
  的数据来校验 NPU Runtime 推理的结果正确性。

## 使用方法

详细请参考 `opt/eswin/sample-code/npu_sample/npu_runtime_sample/src/README.md`

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_runtime_sample/bin$ ./sample_npu --help
[E][ES_MEM]  open_mmz_vb_dev:  348 open /dev/mmz_vb failed!
Usage:
-h, --help                display help info
-s, --sample=type         set sample type(
                          1.SAMPLE_SYNC
                          2.SAMPLE_ASYNC
                          3.SAMPLE_MULTI_CONTEXT
                          4.SAMPLE_MULTI_STREAM
                          5.SAMPLE_MULTI_MODEL
                          6.SAMPLE_COMPOSITE_MODEL
                          7.SAMPLE_D2D
                          8.SAMPLE_PEPELINE)
-m, --model=dir           set model dirs.(Multiple model dirs are separated by commas)
-i, --input=dir           set input dirs.(Multiple input dirs are separated by commas)
-o, --output=dir          set output dirs.(Multiple input dirs are separated by commas)
-p, --pre_process=path    set pre-process config file.(Multiple config file are separated by commas)
-q, --post_process=path   set post-process config file.(Multiple config file are separated by commas)
-t, --classify=path       set classify file.(Multiple classify file are separated by commas)
-n, --numbers=n           set numbers of context/stream.
```

### 使用示例

```bash
cd /opt/eswin/sample-code/npu_sample/npu_runtime_sample/bin && sudo mkdir ../out
sudo ./sample_npu -s 1 -o ../out
```

```bash
sudo ./sample_npu -s 2 -m /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3 -i /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/input/pictures -p /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_pre_process.json -q /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_post_process.json -t /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_classes.txt -o ../out
```

![ennp_4.webp](/docs/megrez/ennp_4.webp)
