# ES_RUN_MODEL Model Testing Tool

To make it easier for users to call the NPU Runtime for model evaluation, NPU Runtime provides the `es_run_model` tool.

This tool offers several options that allow users to easily test model speed, accuracy, and other metrics. The parameter information for `es_run_model` is as follows:

```bash
debian@rockos-eswin:/opt/eswin/bin$ ./es_run_model --help
[E][ES_MEM]  open_mmz_vb_dev:  348 open /dev/mmz_vb failed!
usage: es_run_model --model=string [options] ...
options:
-m, --model                path to a model file (string)
-b, --batch                the model batch count (int [=1])
-d, --dieId                the die id number (int [=0])
-r, --repeat               repeat times running a model (int [=1])
-w, --warmup               repeat times before running a model to warming up (int [=0])
-i, --input-dir            the directory of each inputs (folders) located (string [=])
-o, --output-dir           the directory of each outputs (folders) will saved in (string [=])
-l, --list                 the list of inputs which will test (string [=])
-v  --verify               verify outputs after running model
-s  --save-perf            save performance result(min, max, avg) as a json file
-?, --help                 print this message
```

## Installation Method

:::tip
Before installing the deb package, it is recommended to upgrade the system kernel first:
`sudo apt update`,
`sudo apt upgrade`, and then restart
:::

```bash
sudo apt install es-sdk-npu
```

After installation, `es_run_model` will be located in the `/opt/eswin/bin` directory.

### Usage Example

```bash
cd /opt/eswin/bin
sudo ./es_run_model -m ../data/npu/yolov3/end2endyolov3s416_batch1_int8_npu_b1.model -r 100
```
