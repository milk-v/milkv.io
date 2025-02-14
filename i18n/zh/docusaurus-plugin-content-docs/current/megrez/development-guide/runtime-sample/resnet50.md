# ResNet50 示例代码

NPU resnet50 提供的示例目录 (npu_resnet50_sample) 主要包括调用 NPU Runtime 接口的示例代码和模
型目录、二进制程序：src 和 models、 bin

## 安装 Resnet50 示例

请按照 [ENNP SDK 下载](../ENNP-SDK/introduction#ennp-sdk-下载) 下载 ai-release

```bash
cd ai-release/EIC7x_Release_20241230/softwares/packages
sudo apt install ./es-sdk-sample-npu-resnet50.deb
```

安装后 sample 位于 `/opt/eswin/sample-code/ npu_sample /npu_resnet50_sample` 目录

## 目录

详细目录结构如下：

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_resnet50_sample$ tree
.
├── bin
│   └── sample_npu
├── models
│   └── resnet50
│       ├── es_resnet50_classes.txt
│       ├── es_resnet50_post_process.json
│       ├── es_resnet50_pre_process.json
│       ├── git_resnet50_mix_4x3x224x224_dyn_latency.model
│       ├── git_resnet50_mix_4x3x224x224_dyn_latency.ofmap_order.txt
│       ├── git_resnet50_mix_4x3x224x224_dyn.model
│       ├── git_resnet50_mix_4x3x224x224_dyn_throughput.model
│       ├── git_resnet50_mix_4x3x224x224_dyn_throughput.ofmap_order.txt
│       ├── input
│       │   └── pictures
│       │       └── input0
│       │           ├── ILSVRC2012_val_00003966.JPEG
│       │           ├── ILSVRC2012_val_00009032.JPEG
│       │           ├── ILSVRC2012_val_00011712.JPEG
│       │           ├── ILSVRC2012_val_00016098.JPEG
│       │           ├── ILSVRC2012_val_00017212.JPEG
│       │           ├── ILSVRC2012_val_00017773.JPEG
│       │           ├── ILSVRC2012_val_00021709.JPEG
│       │           ├── ILSVRC2012_val_00022662.JPEG
│       │           ├── ILSVRC2012_val_00025785.JPEG
│       │           ├── ILSVRC2012_val_00026363.JPEG
│       │           ├── ILSVRC2012_val_00027830.JPEG
│       │           ├── ILSVRC2012_val_00030734.JPEG
│       │           ├── ILSVRC2012_val_00031637.JPEG
│       │           ├── ILSVRC2012_val_00033024.JPEG
│       │           ├── ILSVRC2012_val_00033154.JPEG
│       │           ├── ILSVRC2012_val_00033435.JPEG
│       │           ├── ILSVRC2012_val_00034978.JPEG
│       │           ├── ILSVRC2012_val_00040463.JPEG
│       │           └── ILSVRC2012_val_00049043.JPEG
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

NPU resnet50 提供的示例代码的入口是 es_ai_inference.cpp 文件。

README.md 文档中包含编译 resnet50 sample 代码编译方法以及运行命令。

Utils 中主要包含一些辅助的工具库。例如：图片的前处理(preprocess)和推理后数据的后处理 (postprocess) 等。

### models 目录

- 配置文件介绍：

  es_resnet50_classes.txt 包含类别标签信息。

  es_resnet50_pre_process.json 包含预处理的策略和参数。

  es_resnet50_post_process.json 包含后处理算子相关参数。

- input 目录：
  该目录存放待推理的原始图片文件。

- 二进制程序目录（bin）
  该目录存放二进制可执行程序。

## 使用方法

详细请参考 `/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/srcREADME.md`

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/bin$ ./sample_npu --help
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
cd /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/bin
```

````bash
sudo ./sample_npu -s 1 -m /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/ -i /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/ -p /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_pre_process.json -q /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_post_process.json -t /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_classes.txt```
````

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/bin$ sudo ./sample_npu -s 1 -m /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/ -i /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/ -p /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_pre_process.json -q /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_post_process.json -t /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_classes.txt
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00009032.JPEG: label(742: ('printer'), confidence(0.999691)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00040463.JPEG: label(259: ('Pomeranian'), confidence(0.999973)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00003966.JPEG: label(734: ('police van'), confidence(0.999887)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00021709.JPEG: label(144: ('pelican'), confidence(0.999998)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00031637.JPEG: label(50: ('American alligator'), confidence(0.997608)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00034978.JPEG: label(563: ('fountain pen'), confidence(0.999710)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00016098.JPEG: label(717: ('pickup'), confidence(0.999992)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00049043.JPEG: label(349: ('bighorn'), confidence(0.593028)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00033024.JPEG: label(763: ('revolver'), confidence(0.984444)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00033154.JPEG: label(622: ('lens cap'), confidence(0.999958)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00027830.JPEG: label(207: ('golden retriever'), confidence(0.930975)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00033435.JPEG: label(22: ('bald eagle'), confidence(0.999989)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00017212.JPEG: label(340: ('zebra'), confidence(0.999976)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00030734.JPEG: label(89: ('sulphur-crested cockatoo'), confidence(0.999946)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00011712.JPEG: label(76: ('tarantula'), confidence(0.999958)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00017773.JPEG: label(269: ('timber wolf'), confidence(0.999858)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00025785.JPEG: label(96: ('toucan'), confidence(0.999835)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00022662.JPEG: label(759: ('reflex camera'), confidence(0.999603)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00026363.JPEG: label(480: ('cash machine'), confidence(0.999630)
```
