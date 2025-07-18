# YOLOv3 Sample Code

The example directory provided by NPU Runtime (npu_runtime_sample) mainly includes sample code for calling the NPU Runtime interface and the model directory.

## Installing YOLOv3 Example

```bash
sudo apt install es-sdk-sample-npu-runtime
```

After installation, the sample can be found in the `/opt/eswin/sample-code/npu_sample/npu_runtime_sample` directory.

## Directory

The example directory provided by NPU Runtime (npu_runtime_sample) mainly includes sample code for calling the NPU Runtime interface and the model directory: `src` and `models`. The detailed directory structure is as follows:

```bash
debian@rockos-eswin:/opt/eswin/sample-code/npu_sample/npu_runtime_sample$ tree
.
├── bin
│   └── sample_npu
├── models
│   └── yolov3
│       ├── es_yolov3_classes.txt
│       ├── es_yolov3_post_process.json
│       ├── es_yolov3_pre_process.json
│       ├── git_yolov3_416_mix_1x3x416x416_dyn_latency.model
│       ├── git_yolov3_416_mix_1x3x416x416_dyn_latency.ofmap_order.txt
│       ├── input
│       │   ├── pictures
│       │   │   └── input0
│       │   │       ├── bus.jpg
│       │   │       └── dog.jpg
│       │   └── preprocessed
│       │       ├── 0
│       │       │   └── bus.bin
│       │       ├── 1
│       │       │   └── dog.bin
│       │       └── list.txt
│       └── model.json
└── src
    ├── build.sh
    ├── CMakeLists.txt
    ├── README.md
    ├── sample_npu_comm.cpp
    ├── sample_npu_comm.h
    ├── sample_npu.cpp
    └── utils
        ├── json
        │   ├── cJSON.cpp
        │   └── cJSON.h
        ├── postprocess
        │   ├── EsPostProcess.cpp
        │   └── EsPostProcess.h
        ├── preprocess
        │   ├── EsHwPreProcess.cpp
        │   ├── EsHwPreProcess.h
        │   └── IPreprocess.h
        ├── sample_npu_utils.cpp
        ├── sample_npu_utils.h
        └── vdec
            ├── common
            │   ├── sample_comm.h
            │   ├── sample_comm_sys.cpp
            │   ├── sample_comm_vdec.cpp
            │   └── sample_comm_vps.cpp
            ├── EsVdec.cpp
            ├── EsVdec.h
            ├── IVdec.h
            └── MemoryPool.h
```

### `src` Directory

The entry point for the example code provided by NPU Runtime is the `sample_npu.cpp` file. This file contains a series of example cases, such as: sync, async, multi-stream, context, and dynamic batch size cases. Each case has a separate entry function in the code, so users can easily find the sample that fits their application.

The `README.md` file contains instructions for compiling the `sample_npu` code and examples of running the `sample_npu` command line.

The `utils` directory mainly includes some auxiliary utility libraries, such as image preprocessing (preprocess) and post-processing (postprocess) for the inference data.

### `models` Directory

- Configuration files:

  - `es_yolov3_classes.txt` contains category label information.
  - `es_yolov3_pre_process.json` contains preprocessing strategies and parameters.
  - `es_yolov3_post_process.json` contains parameters related to post-processing operators.

- `input` Directory:

  This directory contains the `pictures` and `preprocessed` directories.

  - The `pictures` directory stores the original image files for inference.
  - The `preprocessed` directory stores the preprocessed binary data files (such as Decode, Resize, Normalization, and CVT).

- `output` Directory:

  The output directory is not used in this sample. The `es_run_model` tool will use data from the output directory to verify the correctness of NPU Runtime inference results.

## Usage

For more details, please refer to `opt/eswin/sample-code/npu_sample/npu_runtime_sample/src/README.md`.

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

### Example Usage

```bash
cd /opt/eswin/sample-code/npu_sample/npu_runtime_sample/bin && sudo mkdir ../out
sudo ./sample_npu -s 1 -o ../out
```

```bash
sudo ./sample_npu -s 2 -m /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3 -i /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/input/pictures -p /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_pre_process.json -q /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_post_process.json -t /opt/eswin/sample-code/npu_sample/npu_runtime_sample/models/yolov3/es_yolov3_classes.txt -o ../out
```

![ennp_4.webp](/docs/megrez/ennp_4.webp)
