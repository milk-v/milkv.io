---
sidebar_label: 'OpenCV-Mobile'
sidebar_position: 30
---

## 简介

**​opencv-mobile** 是一个精简版的 OpenCV 库，通过调整编译参数，删减部分 OpenCV 源码，来最小化编译 OpenCV。 

opencv-mobile 提供了 OpenCV 常用的功能，如读写图片，处理，矩阵操作等等，版本与上游同步，无第三方依赖。在绝大多数情况下，以 1/10 的体积无痛替换官方 OpenCV，尤其适合对体积有特殊要求的移动端和嵌入式环境。

源码包体积对比：
| OpenCV 4.9.0 | The Official OpenCV | opencv-mobile |
|:-:|:-:|:-:|
| source zip   | 93 MB      | 10.7 MB |
| android      | 242 MB     | 18.1 MB |
| ios          | 202 MB     | 10.0 MB  |
| ios+bitcode  | missing :( | 34.5 MB |

项目链接: [https://github.com/nihui/opencv-mobile](https://github.com/nihui/opencv-mobile) | 感谢 `nihui` 老师 ！

:::tip
opencv-mobile 已经在 Milk-V Duo/Duo256M/DuoS 上支持硬件加速 JPG 解码，以及 VPSS (Video Processing Subsystem) 硬件加速。
:::

## 一、快速开始

我们可以直接下载其 release 的预编译包，来测试基础功能或者进行应用开发。

项目源码中提供了一个[测试示例](https://github.com/nihui/opencv-mobile/blob/master/test/main.cpp)，演示如何使用 opencv-mobile 实现加载图片，缩放，并保存图片。

下面以该测试程序为例，介绍一下 opencv-mobile 在 Linux 环境下的编译方法以及如何在 Milk-V Duo 上运行。

### 下载适配 Milk-V Duo 的预编译包

opencv-mobile 的 release 链接：
[https://github.com/nihui/opencv-mobile/releases](https://github.com/nihui/opencv-mobile/releases)

下载当前最新的 Milk-V Duo 的预编译包：[opencv-mobile-4.9.0-milkv-duo.zip](https://github.com/nihui/opencv-mobile/releases/latest/download/opencv-mobile-4.9.0-milkv-duo.zip)

### 新建测试程序目录

新建目录 `picture-resize` 并进入该目录：
```bash
mkdir picture-resize
cd picture-resize
```

将前面下载的预编译包解压到当前目录：
```bash
unzip ../opencv-mobile-4.9.0-milkv-duo.zip
```

### 创建代码文件

新建一个名为 `main.cpp` 的文件：

```bash
vi main.cpp
```

添加如下内容：
```cpp
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

int main()
{
    cv::Mat bgr = cv::imread("in.jpg", 1);

    cv::resize(bgr, bgr, cv::Size(200, 200));

    cv::imwrite("out.jpg", bgr);

    return 0;
}
```

其功能就是将一张名为 `in.jpg` 的图片，缩放为 `200x200` 的大小后，输出为 `out.jpg` 文件。

### 创建 CMakeLists.txt

使用 cmake 方式来编译，需要创建 CMakeLists.txt 文件：
```bash
vi CMakeLists.txt
```

内容如下：
```makefile
project(opencv-mobile-test)
cmake_minimum_required(VERSION 3.5)
set(CMAKE_CXX_STANDARD 11)

set(CMAKE_C_COMPILER "${CMAKE_CURRENT_SOURCE_DIR}/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-gcc")
set(CMAKE_CXX_COMPILER "${CMAKE_CURRENT_SOURCE_DIR}/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-g++")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -D_LARGEFILE_SOURCE -D_LARGEFILE64_SOURCE -D_FILE_OFFSET_BITS=64")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -mcpu=c906fdv -march=rv64imafdcv0p7xthead -mcmodel=medany -mabi=lp64d")

set(OpenCV_DIR "${CMAKE_CURRENT_SOURCE_DIR}/opencv-mobile-4.9.0-milkv-duo/lib/cmake/opencv4")
find_package(OpenCV REQUIRED)

add_executable(opencv-mobile-test main.cpp)

target_link_libraries(opencv-mobile-test ${OpenCV_LIBS})
```

其中有三个变量需要注意一下，根据自己的文件路径来配置：
- **OpenCV_DIR**：前面解压到当前目录的预编译包对应的目录，注意路径中的版本号
- **CMAKE_C_COMPILER**：交叉编译工具链中 gcc 的路径
- **CMAKE_CXX_COMPILER**：交叉编译工具链中 g++ 的路径

交叉编译工具链的下载链接：[host-tools.tar.gz](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz)。可以通过 wget 命令下载后解压：
```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
tar -xf host-tools.tar.gz 
```

如果你曾经编译过 [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)，其根目录下的 `host-tools` 目录就是交叉工具链的目录，没必要重新下载，可以直接修改 `OpenCV_DIR` 指定到该目录即可。或者创建个软链接指向该目录。

### 编译

cmake 方式编译会创建一些中间目录和文件，所以我们新建一个 build 目录并进入该目录来完成编译：
```bash
mkdir build
cd build
cmake ..
make
```
编译正常输出如下：
```bash
$ make
[ 50%] Building CXX object CMakeFiles/opencv-mobile-test.dir/main.cpp.o
[100%] Linking CXX executable opencv-mobile-test
[100%] Built target opencv-mobile-test
```
当前 `build` 目录下生成的 `opencv-mobile-test` 就是测试程序：
```bash
$ ls
CMakeCache.txt  CMakeFiles  cmake_install.cmake  Makefile  opencv-mobile-test
```

此时目录的结构如下：
```
picture-resize/                     # 测试程序根目录
├── build                           # 编译输出目录
├── CMakeLists.txt                  # CMake 配置文件
├── host-tools                      # Duo 交叉编译工具链目录
├── main.cpp                        # 测试程序源代码文件
└── opencv-mobile-4.9.0-milkv-duo/  # opencv-mobile 预编译库目录
```

把生成的 `opencv-mobile-test` 程序通过 `scp` 命令传送到 Duo 中：
```bash
scp opencv-mobile-test root@192.168.42.1:/root/
```
再将一张测试用大小为 `1024x1024` 的 `jpg` 图片也同样传送到 Duo 中：
```bash
scp in.jpg root@192.168.42.1:/root/
```
![opencv-mobile-in](/docs/duo/opencv-mobile-in.jpg)

### 在 Duo 中运行测试程序

通过串口或者 ssh 登陆到 Duo 的终端，进入 /root/ 目录：
```bash
cd /root/
```

为 opencv-mobile-test 添加可执行权限：
```bash
chmod +x opencv-mobile-test
```

运行测试程序：
```bash
./opencv-mobile-test
```

如果遇到 `OOM` 错误，可能是图片分辨率太大，内存使用超出了 Duo 的可用内存，换个尺寸小一些的图片就正常了。
```
Out of memory: Killed process 3718 (opencv-mobile-t) total-vm:31168kB, anon-rss:11384kB, file-rss:4kB, shmem-rss:0kB, UID:0
```

通过 `ls` 命令查看是否在当前目录下生成了 `out.jpg` 文件：
```
[root@milkv-duo]~# ls
in.jpg  opencv-mobile-test  out.jpg
```

在电脑上用 `scp` 命令将 `out.jpg` 文件取回本地查看大小是否为 200x200:
```bash
scp root@192.168.42.1:/root/out.jpg .
```

## 二、硬件加速 JPG 解码测试

opencv-mobile 已经支持 Milk-V Duo 中的硬件加速 JPG 解码

1. opencv-mobile highgui 模块在运行时动态加载 cvi 库，JPG 硬件解码
2. 无需修改代码，cv::imread() 与 cv::imdecode() 自动支持
3. 支持 EXIF 自动旋转，支持直接解码为 grayscale
4. 加速了 5~11 倍！

验证 JPG 硬件加速实际效果的方法，可以同样使用前面的缩放 jpg 文件为 200x200 的示例程序，分别使用不带 JPG 硬件加速的 opencv-mobile 预编译包和带 JPG 硬件加速的预编译包来生成测试程序，通过其在 Duo 上运行的时间来做对比。

不带 JPG 硬件加速的预编译包：[opencv-mobile-4.8.0-milkv-duo.zip
](https://github.com/nihui/opencv-mobile/releases/download/v19/opencv-mobile-4.8.0-milkv-duo.zip)

带 JPG 硬件加速的预编译包：[opencv-mobile-4.9.0-milkv-duo.zip
](https://github.com/nihui/opencv-mobile/releases/latest/download/opencv-mobile-4.9.0-milkv-duo.zip)

使用两个预编译包，分别编译出 `opencv-mobile-test` 转送到 Duo 中运行，我这里是在 Duo-256M 中测试的，`in.jpg` 使用的是一张分辨率为 3000x3000 大小为 3.2M 的 jpg 图片。 

```
[root@milkv-duo]~# time ./opencv-mobile-test-4.8.0 
real	0m 2.56s
user	0m 2.31s
sys	0m 0.24s
```
```
[root@milkv-duo]~# time ./opencv-mobile-test-4.9.0 
this device is not whitelisted for jpeg encoder rkmpp
real	0m 0.37s
user	0m 0.13s
sys	0m 0.14s
```
可以看到，不带 JPG 硬件加速时运行时间为 `2.56s`，带 JPG 硬件加速时运行时间只有 `0.37s`，速度提高了约 `6.92` 倍。

## 三、VPSS 硬件加速测试

opencv-mobile 现已支持 Milk-V Duo/Duo256M/DuoS MIPI CSI 摄像头和 VPSS 硬件加速。

- opencv-mobile highgui 模块实现基于 cvi-mmf 访问摄像头流
- 在运行时自动动态加载 ae+awb+isp+cvi_bin 库实现 ISP 图像调节
- 在运行时自动动态加载 vpss 库实现 crop + YUV2BGR 硬件加速
- 无需修改代码，调用 cv::VideoCapture 便自动支持，支持设置分辨率
- 暂时只支持 Milk-V 官方搭配的 GC2083 摄像头

### 调用示例

- 用 cv::VideoCapture 打开摄像头，设置分辨率 320x240
- 每隔 1 秒获取1帧图像
- 关闭摄像头
- 最后把 9 张图拼接在一起保存

开头 1 帧因为 isp 还在统计图像信息，来不及 ISP 自动处理，所以是黑的。

示例代码：
```cpp
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

#include <unistd.h>   // sleep()

int main()
{
    cv::VideoCapture cap;
    cap.set(cv::CAP_PROP_FRAME_WIDTH, 320);
    cap.set(cv::CAP_PROP_FRAME_HEIGHT, 240);
    cap.open(0);

    const int w = cap.get(cv::CAP_PROP_FRAME_WIDTH);
    const int h = cap.get(cv::CAP_PROP_FRAME_HEIGHT);
    fprintf(stderr, "%d x %d\n", w, h);

    cv::Mat bgr[9];
    for (int i = 0; i < 9; i++)
    {
        cap >> bgr[i];

        sleep(1);
    }

    cap.release();

    // combine into big image
    {
        cv::Mat out(h * 3, w * 3, CV_8UC3);
        bgr[0].copyTo(out(cv::Rect(0, 0, w, h)));
        bgr[1].copyTo(out(cv::Rect(w, 0, w, h)));
        bgr[2].copyTo(out(cv::Rect(w * 2, 0, w, h)));
        bgr[3].copyTo(out(cv::Rect(0, h, w, h)));
        bgr[4].copyTo(out(cv::Rect(w, h, w, h)));
        bgr[5].copyTo(out(cv::Rect(w * 2, h, w, h)));
        bgr[6].copyTo(out(cv::Rect(0, h * 2, w, h)));
        bgr[7].copyTo(out(cv::Rect(w, h * 2, w, h)));
        bgr[8].copyTo(out(cv::Rect(w * 2, h * 2, w, h)));

        cv::imwrite("out.jpg", out);
    }

    return 0;
}
```

同样，参考前面 [快速开始](#一快速开始) 中的方法，将其他编译后传送到 Duo 中执行 `./opencv-mobile-test` 命令：

:::tip
- Duo 上电前需要连接好摄像头
- 命令执行时，可以转动摄像头方向以捕捉不同的画面，直到程序运行结束
:::

```
[root@milkv-duo]~# ./opencv-mobile-test 
this device is not whitelisted for jpeg encoder rkmpp
this device is not whitelisted for capture v4l2 rkaiq
this device is not whitelisted for capture v4l2 rkaiq
ISP Vipipe(0) Allocate pa(0x8bf30000) va(0x0x3fe7c50000) size(291120)
awbInit ver 6.8@2021500
0 R:1400 B:3100 CT:2850
1 R:1500 B:2500 CT:3900
2 R:2300 B:1600 CT:6500
Golden 1024 1024 1024
WB Quadratic:0
isWdr:0
ViPipe:0,===GC2083 1080P 30fps 10bit LINE Init OK!===
binName = /mnt/cfg/param/cvi_sdr_bin
********************************************************************************
cvi_bin_isp message
gerritId:      36403          commitId:      c69c5863e      
md5:           cab880835a2ad5184de5ed7762404b84
sensorNum      1              
sensorName0    2083           

PQBIN message
gerritId:      80171          commitId:      5c9d8fc5d      
md5:           ba5a510e093ad42db6788e6c2d13169e
sensorNum      3              
sensorName0    2053           

author:        wanqiang.he    desc:          思博慧CV1812H_GC2083_RGB_mode_V1.0.0
createTime:    2023-08-04 16:48:08version:       V1.1           
tool Version:       v3.0.5.24           mode:      
********************************************************************************
sensorName(0) mismatch, mwSns:2083 != pqBinSns:2053
320 x 240
0 R:1165 B:3087 CT:2688
1 R:1464 B:2327 CT:3937
2 R:1974 B:1613 CT:7225
Golden 1464 1024 2327
wdrLEOnly:1
ISP Vipipe(0) Free pa(0x8bf30000) va(0x0x3fe7c50000)
gc2083_standby
```
运行成功后会生成一个由 9 帧图像拼接而成的图片 `out.jpg`
```
[root@milkv-duo]~# ls
opencv-mobile-test  out.jpg
```

在电脑上用 `scp` 命令将 `out.jpg` 文件取回本地：
```bash
scp root@192.168.42.1:/root/out.jpg .
```

查看生成的图片 `out.jpg`：

![opencv-mobile-out](/docs/duo/opencv-mobile-out.jpg)

### 一些实现细节和限制

#### 运行时加载 cvi-mmf 动态库

为了减少编译耦合，opencv-mobile 中采用运行时 dlopen/dlsym 方式加载 libsys libvpu libae libawb libisp libcvi_bin libsns_gc2083，即便编译时候缺库依然兼容可用。

这种方式也能自动适配后期系统库升级。

#### 设备检测和白名单

优化代码在 Milk-V Duo / Milk-V Duo-256M 上做了验证测试。

加载 cvi-mmf 库时，额外判断 /proc/device-tree/model 是否为 Milk-V Duo 设备

Milk-V Duo 和 Milk-V Duo-256M cvi-mmf 接口源码级兼容，但实际上 sns ini 配置文件却是不同的，如果用的不对会导致无法正常获取图像帧，报错
```
isp_err_chk:6343(): CSIBDG_A CH0 frm height less than setting(1080)
```

根据 model 信息区分两种型号，加载对应配置后恢复工作：

- Milk-V Duo: [sensor_cfg_gc2083.ini](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo/overlay/mnt/data/sensor_cfg_gc2083.ini)
- Milk-V Duo-256M：[sensor_cfg_gc2083.ini](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo256m/overlay/mnt/data/sensor_cfg_GC2083.ini)

#### 分辨率自适应

摄像头原生分辨率是 1920x1080 30fps。

- 用户请求尺寸超出 1080p，自动保持比例降低尺寸到 1080p 范围内
- 用户请求小于 1080p，会自动居中裁切并保持比例缩小到需要的分辨率

![opencv-mobile-scale](/docs/duo/opencv-mobile_01.webp)

#### vb 内存池数量

虽然理论上 1 个内存块就可以一直复用，提供给 NV21 取帧，但是测试中发现当 vb 内存块太少时会发生 vb 内存耗尽的错误，导致一段时间后再也无法正常取帧。

参照 cvi-mmf sample 代码开辟4个内存块用于存放 NV21 数据，不再发生 vb 耗尽问题。

## 参考

1. [opencv-mobile 现已支持 milkv-duo/duo256m MIPI CSI 摄像头和vpss硬件加速](https://zhuanlan.zhihu.com/p/677764814)
2. [opencv-mobile 现已支持 milkv-duo cvi-mmf 硬件加速 JPG 解码](https://zhuanlan.zhihu.com/p/673940312)
3. [opencv-mobile (迷你版opencv库)在 milkv-duo 上的移植和应用](https://zhuanlan.zhihu.com/p/653359280)
