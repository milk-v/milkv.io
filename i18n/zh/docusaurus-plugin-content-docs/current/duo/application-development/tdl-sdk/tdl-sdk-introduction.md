---
sidebar_label: '简介'
sidebar_position: 10
---

# 简介

Cvitek 所提供的 TDL（Turnkey Deep Learning）集成算法，用以缩短应用程序开发所需的时间。

此架构实现了 TDL 所需算法包含其前后处理 提供统一且便捷的编程接口。

目前 TDL SDK 包含 移动侦测，人脸检测，人脸识别，人脸追踪，行人检测，语义分割，车牌辨识，车牌检测，活体识别，IR活体识别，婴儿检测，哭声检测，姿态检测，手势侦测，手势识别 等算法。

## 编译

TDL-SDK 程序需要在 PC 主机的 Linux 环境下进行交叉编译，推荐 Ubuntu 22.04 系统。

:::tip
目前 Duo 系列开发板的固件有 V1 和 V2 两个版本，相关说明请参考 [资源下载汇总](https://milkv.io/zh/docs/duo/getting-started/download)。适用于这两个版本固件的 TDL-SDK 也不相同，以下分别介绍适用于这两个版本固件的 TDL-SDK 示例的编译方法。
:::

### 适用于 V1 版本固件的 TDL-SDK 示例

#### 下载交叉编译工具链

```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
```
解压工具链：
```bash
tar xvf host-tools.tar.gz
```
进入工具链目录中将工具链的路径导出到环境变量中：
```bash
cd host-tools
export PATH=$PATH:$(pwd)/gcc/riscv64-linux-musl-x86_64/bin
```
验证工具链是否可用：
```
riscv64-unknown-linux-musl-gcc -v
```
能够正常显示交叉编译工具链的版本信息，即工具链可用：
```
$ riscv64-unknown-linux-musl-gcc -v
Using built-in specs.
COLLECT_GCC=riscv64-unknown-linux-musl-gcc
...
Thread model: posix
Supported LTO compression algorithms: zlib
gcc version 10.2.0 (Xuantie-900 linux-5.10.4 musl gcc Toolchain V2.6.1 B-20220906)
```

#### 下载 TDL-SDK 示例源码

下载 TDL-SDK 源码，Duo 和 Duo256M/DuoS 仓库有所不同：

- Duo:
  ```bash
  git clone https://github.com/milkv-duo/cvitek-tdl-sdk-cv180x.git
  cd cvitek-tdl-sdk-cv180x
  ```
- Duo256M 和 DuoS:
  ```bash
  git clone https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x.git
  cd cvitek-tdl-sdk-sg200x
  ```

后续仓库代码如有更新，可以在代码目录中执行 `git pull` 拉取最新的代码，比如 Duo256M 和 DuoS：
```bash
cd cvitek-tdl-sdk-sg200x
git pull
```
拉取到最新代码后再继续编译。

#### 编译

```
cd sample
./compile_sample.sh
```
生成的示例程序位于相应的子目录中，比如人脸检测示例 `sample_vi_fd` 位于：
```
cvi_tdl/sample_vi_fd
```

Clean:
```bash
./compile_sample.sh clean
```

### 适用于 V2 版本固件的 TDL-SDK 示例

#### 获取 TDL-SDK 示例源码

```
git clone https://github.com/milkv-duo/duo-tdl-examples.git
```

后续仓库代码如有更新，可以在代码目录中执行 `git pull` 拉取最新的代码，拉取到最新代码后再继续编译。

#### 编译示例

以下以编译人脸检测的程序为例，介绍编译的过程。

进入代码目录：
```
cd duo-tdl-examples
```

加载编译环境：
```
source envsetup.sh
```
第一次加载会自动下载所需的编译工具链，下载后的目录名为`host-tools`，下次再加载编译环境时，会检测该目录，如果已存在则不会再次下载。

加载编译环境时需要按提示输入所需编译目标：
```
Select Product:
1. Duo (CV1800B)
2. Duo256M (SG2002) or DuoS (SG2000)
```
如果目标板是 Duo 则选择 `1`，如果目标板是 Duo256M 或者 DuoS 则选择 `2`。由于 Duo256M 和 DuoS 支持 RISCV 和 ARM 两种架构，还需要按提示继续选择：
```
Select Arch:
1. ARM64
2. RISCV64
Which would you like:
```
如果测试程序需要在 ARM 系统中运行，选择 `1`，如果是 RISCV 系统则选择 `2`。

**同一个终端中，只需要加载一次编译环境即可。**

人脸检测的示例程序为 `sample_vi_fd`，进入到 sample_vi_fd 目录：
```
cd sample_vi_fd
```
使用 `make` 命令编译：
```
make
```
将当前目录中生成的 `sample_vi_fd` 程序通过 scp 或者其他方式上传到 Duo 系列开发板中进行测试。如需清除编译生成的程序，可以执行 `make clean` 清除。

通过网络直接上传到 Duo 开发板中的程序，可能没有执行权限，需要先在开发板的系统里通过 `chmod` 命令添加可执行权限：
```
chmod +x sample_vi_fd
```

在开发板中测试该人脸检测示例的命令为 `sample_vi_fd + 人脸检测模型文件`。**注意 Duo 和 Duo256M/DuoS 中使用的模型是不同的**。

模型下载链接：[https://github.com/milkv-duo/tdl-models](https://github.com/milkv-duo/tdl-models)。

- Duo (CV180X)
  ```
  ./sample_vi_fd /mnt/cvimodel/scrfd_320_256_ir_0x.cvimodel
  ```

- Duo256M/DuoS (SG200X)
  ```
  ./sample_vi_fd /mnt/cvimodel/scrfd_768_432_int8_1x.cvimodel
  ```

此时将摄像头对准人脸，终端日志中会打印当前检测到人脸的数量。如需通过电脑实时预览视频画面，可参考 [人脸检测文档](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-face-detection)。

## 模型支持列表

### TDL-SDK 模型列表（Sophgo）

[https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/main.html#id6](https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/main.html#id6)

### TDK-SDK 模型下载（Sophgo）

[https://github.com/sophgo/tdl_models/tree/main](https://github.com/sophgo/tdl_models/tree/main)

## 示例说明

各示例的详细说明及运行方法，请参考后面章节。

## 参考文档

<table>
<thead>
  <tr>
    <td>Chinese Version(中文版)</td>
    <td colspan="2">格式</td>
    <td>English Version</td>
    <td colspan="2">Format</td>
  </tr>
</thead>
<tbody>
	<tr>
    <td>深度学习SDK软件开发指南</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/TDL_SDK_Software_Development_Guide/build/TDLSDKSoftwareDevelopmentGuide_zh.pdf">pdf</a></td>
    <td>TDL SDK Software Development Guide</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/TDL_SDK_Software_Development_Guide/build/TDLSDKSoftwareDevelopmentGuide_en.pdf">pdf</a></td>
  </tr>
  <tr>
    <td>YOLO系列开发指南</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/YOLO_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/TPU/YOLO_Development_Guide/build/YOLODevelopmentGuide_zh.pdf">pdf</a></td>
    <td>YOLO Development Guide</td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/YOLO_Development_Guide/build/html/index.html">html</a></td>
    <td><a href="http://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/TPU/YOLO_Development_Guide/build/YOLODevelopmentGuide_en.pdf">pdf</a></td>
  </tr>
</tbody>
</table>
