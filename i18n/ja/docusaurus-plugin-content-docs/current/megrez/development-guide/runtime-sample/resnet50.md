# ResNet50 Example Code

The NPU ResNet50 example directory (`npu_resnet50_sample`) mainly includes example code for calling NPU Runtime interfaces, as well as model directories, binary programs: `src` and `models`, `bin`.

## Installing ResNet50 Example

```bash
sudo apt install es-sdk-sample-npu-resnet50
```

After installation, the sample is located in the `/opt/eswin/sample-code/npu_sample/npu_resnet50_sample` directory.

## Directory Structure

The detailed directory structure is as follows:

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

### `src` Directory

The entry point for the NPU ResNet50 example code is the `es_ai_inference.cpp` file. The `README.md` document includes the compilation method for the ResNet50 sample code and the command to run it.

The `utils` directory mainly contains auxiliary utility libraries. For example, it includes pre-processing for images and post-processing for inference results.

### `models` Directory

- Configuration files:

  - `es_resnet50_classes.txt` contains class label information.
  - `es_resnet50_pre_process.json` contains the pre-processing strategy and parameters.
  - `es_resnet50_post_process.json` contains parameters for the post-processing operator.

- `input` directory:
  This directory stores the raw image files for inference.

- Binary directory (`bin`):
  This directory contains the binary executable programs.

## Usage

For more details, please refer to `/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/src/README.md`.

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/bin$ ./sample_npu --help
[E][ES_MEM] open_mmz_vb_dev:  348 open /dev/mmz_vb failed!
Usage:
-h, --help                display help info
-s, --sample=type         set sample type (
                          1.SAMPLE_SYNC
                          2.SAMPLE_ASYNC
                          3.SAMPLE_MULTI_CONTEXT
                          4.SAMPLE_MULTI_STREAM
                          5.SAMPLE_MULTI_MODEL
                          6.SAMPLE_COMPOSITE_MODEL
                          7.SAMPLE_D2D
                          8.SAMPLE_PEPELINE)
-m, --model=dir           set model dirs (Multiple model dirs are separated by commas)
-i, --input=dir           set input dirs (Multiple input dirs are separated by commas)
-o, --output=dir          set output dirs (Multiple input dirs are separated by commas)
-p, --pre_process=path    set pre-process config file (Multiple config files are separated by commas)
-q, --post_process=path   set post-process config file (Multiple config files are separated by commas)
-t, --classify=path       set classify file (Multiple classify files are separated by commas)
-n, --numbers=n           set numbers of context/stream.
```

### Example Usage

```bash
cd /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/bin
```

```bash
sudo ./sample_npu -s 1 -m /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/ -i /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/ -p /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_pre_process.json -q /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_post_process.json -t /opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/es_resnet50_classes.txt
```

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
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00033024.JPEG: label(763: ('power drill'), confidence(0.992695)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00026363.JPEG: label(94: ('cheetah'), confidence(0.999983)
/opt/eswin/sample-code/npu_sample/npu_resnet50_sample/models/resnet50/input/pictures/input0/ILSVRC2012_val_00025785.JPEG: label(831: ('sandbar'), confidence(0.999724)
```
