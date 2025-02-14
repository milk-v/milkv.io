# ES_RUN_MODEL 模型测试工具

为了方便用户调用 NPU Runtime 测评模型，NPU Runtime 提供了 `es_run_model` 工具。

该工具提供了若干选项，可以很方便地测试模型速度和精度等信息。
`es_run_model` 的参数信息如下：

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

## 安装方法

请按照 [ENNP SDK 下载](introduction#ennp-sdk-下载) 下载 ai-release

```bash
cd ai-release/EIC7x_Release_20241230/softwares/packages
sudo apt install ./es-sdk-sample-npu,deb
```

安装后 `es_run_model` 位于 `/opt/eswin/bin` 目录

### 使用示例

```bash
cd /opt/eswin/bin
sudo ./es_run_model -m ../data/npu/yolov3/end2endyolov3s416_batch1_int8_npu_b1.model -r 100
```
