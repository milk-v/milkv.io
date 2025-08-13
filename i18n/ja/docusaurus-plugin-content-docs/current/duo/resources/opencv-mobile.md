---
sidebar_label: 'OpenCV Mobile'
sidebar_position: 30
---

## Introduction

**opencv-mobile** is a lightweight version of the OpenCV library that minimizes the compilation of OpenCV by adjusting compilation parameters and removing certain portions of the OpenCV source code.

opencv-mobile provides commonly used functionalities of OpenCV, such as image processing, matrix operations, and more. It stays synchronized with the upstream version and has no third-party dependencies. In the majority of cases, it can seamlessly replace the official OpenCV with only 1/10th of the size, making it particularly suitable for mobile and embedded environments with specific size requirements.

Source code package size comparison:
| OpenCV 4.9.0 | The Official OpenCV | opencv-mobile |
|:-:|:-:|:-:|
| source zip   | 93 MB      | 10.7 MB |
| android      | 242 MB     | 18.1 MB |
| ios          | 202 MB     | 10.0 MB  |
| ios+bitcode  | missing :( | 34.5 MB |

Project link: [https://github.com/nihui/opencv-mobile](https://github.com/nihui/opencv-mobile) | Thanks to `nihui`!

:::tip
opencv-mobile already supports hardware-accelerated JPG decoding and VPSS (Video Processing Subsystem) hardware acceleration on Milk-V Duo/Duo256M/DuoS.
:::

## 1. Quick start

We can directly download its release precompiled package to test basic functions or carry out application development.

A [test example](https://github.com/nihui/opencv-mobile/blob/master/test/main.cpp) is provided in the project source code, demonstrates how to use opencv-mobile to load images, zoom, and save images.

Taking this test program as an example, we will introduce the compilation method of opencv-mobile in Linux environment and how to run it on Milk-V Duo.

### Download pre-compiled package for Milk-V Duo

The release link of opencv-mobile:
[https://github.com/nihui/opencv-mobile/releases](https://github.com/nihui/opencv-mobile/releases)

Download the latest pre-compiled package of Milk-V Duo: [opencv-mobile-4.9.0-milkv-duo.zip](https://github.com/nihui/opencv-mobile/releases/latest/download/opencv-mobile-4.9.0-milkv-duo.zip)

### Create a new test program directory

Create a new directory `picture-resize` and enter it:
```bash
mkdir picture-resize
cd picture-resize
```

Extract the pre-compiled package downloaded to the current directory:
```bash
unzip ../opencv-mobile-4.9.0-milkv-duo.zip
```

### Create code file

Create a new file named `main.cpp`:

```bash
vi main.cpp
```

Add the following:
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

Its function is to scale an image named `in.jpg` to a size of `200x200` and then output it as an `out.jpg` file.

### Create CMakeLists.txt

To compile using cmake, you need to create a CMakeLists.txt file:
```bash
vi CMakeLists.txt
```

The content is as follows:
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

There are three variables that need to be noted and configured according to your own file path:
- **OpenCV_DIR**: The directory corresponding to the precompiled package previously extracted to the current directory. Pay attention to the version number in the path.
- **CMAKE_C_COMPILER**: The path to gcc in the cross-compilation tool chain.
- **CMAKE_CXX_COMPILER**: The path to g++ in the cross-compilation tool chain

Download link for cross-compilation toolchain: [host-tools.tar.gz](https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz). You can download it through the wget command then unzip:
```bash
wget https://sophon-file.sophon.cn/sophon-prod-s3/drive/23/03/07/16/host-tools.tar.gz
tar -xf host-tools.tar.gz 
```

If you have ever compiled [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk), the `host-tools` directory under its root directory is the directory of the cross-compilation toolchain. There is no need to re-download it. You can directly modify `OpenCV_DIR` and specify it to this directory. Or create a soft link pointing to the directory.

### Compile

Compiling in cmake mode will create some intermediate directories and files, so we create a new `build` directory and enter this directory to complete it:
```bash
mkdir build
cd build
cmake ..
make
```
The normal compilation output is as follows:
```bash
$ make
[ 50%] Building CXX object CMakeFiles/opencv-mobile-test.dir/main.cpp.o
[100%] Linking CXX executable opencv-mobile-test
[100%] Built target opencv-mobile-test
```
The `opencv-mobile-test` generated in the current `build` directory is the test program:
```bash
$ ls
CMakeCache.txt  CMakeFiles  cmake_install.cmake  Makefile  opencv-mobile-test
```

The directory structure at this time is as follows:
```
picture-resize/                     # Test program root directory
├── build                           # Compile output directory
├── CMakeLists.txt                  # CMake configuration file
├── host-tools                      # Duo cross-compilation tool chain directory
├── main.cpp                        # Test program source code file
└── opencv-mobile-4.9.0-milkv-duo/  # opencv-mobile precompiled library directory
```

Transfer the generated `opencv-mobile-test` program to Duo through the `scp` command:
```bash
scp opencv-mobile-test root@192.168.42.1:/root/
```
Then transfer a `jpg` picture with a size of `1024x1024` for testing to Duo:
```bash
scp in.jpg root@192.168.42.1:/root/
```

`in.jpg`：

<Image src='/docs/duo/opencv-mobile-in.jpg' minWidth='100%' maxWidth='100%' align='center' />

### Run the test program in Duo

:::caution
For Duo firmware, please temporarily use the version [V1.0.8](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.0.8)
:::

Log in to the Duo terminal through the serial port or ssh and enter the /root/ directory:
```bash
cd /root/
```

Add executable permissions to opencv-mobile-test:
```bash
chmod +x opencv-mobile-test
```

Run the test program:
```bash
./opencv-mobile-test
```

If you encounter an `OOM` error, it may be that the image resolution is too large and the memory usage exceeds the available memory of Duo. It is normal to change the image to a smaller size.
```
Out of memory: Killed process 3718 (opencv-mobile-t) total-vm:31168kB, anon-rss:11384kB, file-rss:4kB, shmem-rss:0kB, UID:0
```

Use the `ls` command to check whether the `out.jpg` file is generated in the current directory:
```
[root@milkv-duo]~# ls
in.jpg  opencv-mobile-test  out.jpg
```

Use the `scp` command on the computer to retrieve the `out.jpg` file locally and check whether the size is 200x200:
```bash
scp root@192.168.42.1:/root/out.jpg .
```

## 2. Hardware accelerated JPG decoding test

opencv-mobile already supports hardware-accelerated JPG decoding in Milk-V Duo

1. The opencv-mobile highgui module dynamically loads the cvi library and JPG hardware decoding at runtime
2. No need to modify the code, cv::imread() and cv::imdecode() are automatically supported
3. Supports EXIF auto-rotation and direct decoding to grayscale
4. Speeded up by 5~11 times!

### Test example

To verify the actual effect of JPG hardware acceleration, you can also use the previous sample program that scales the jpg file to 200x200, and use the opencv-mobile precompiled package without JPG hardware acceleration and the precompiled package with JPG hardware acceleration to generate test programs, compare by its running time on Duo.

Pre-compiled package without JPG hardware acceleration: [opencv-mobile-4.8.0-milkv-duo.zip
](https://github.com/nihui/opencv-mobile/releases/download/v19/opencv-mobile-4.8.0-milkv-duo.zip)

Pre-compiled package with JPG hardware acceleration: [opencv-mobile-4.9.0-milkv-duo.zip
](https://github.com/nihui/opencv-mobile/releases/latest/download/opencv-mobile-4.9.0-milkv-duo.zip)

Use two pre-compiled packages to compile `opencv-mobile-test` respectively and transfer them to Duo for running. I tested it in Duo-256M here. `in.jpg` uses a picture with a resolution of 3000x3000 and a size of 3.2M jpg image.

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
It can be seen that the running time without JPG hardware acceleration is `2.56s`, and the running time with JPG hardware acceleration is only `0.37s`, which is about `6.92` times.

### Some details and limitations

#### Load cvi-mmf dynamic library at runtime

In order to reduce compilation coupling, opencv-mobile uses the runtime dlopen/dlsym method to load libsys libvpu libae libawb libisp libcvi_bin libsns_gc2083. Even if the library is missing during compilation, it is still compatible and available.

This method can also automatically adapt to later system library upgrades.

#### Whitelist

The optimized code was verified and tested on Milk-V Duo / Milk-V Duo-256M.

When loading the cvi-mmf library, it is additionally determined whether /proc/device-tree/model is a Milk-V Duo device, and can automatically fall back to the non-optimized version on other devices.

#### Avoid special resolutions

During the test, it was found that for ultra-small (2x2) and ultra-large (4096x4096) resolutions, pictures often get damaged or the content is garbled, encoding errors occur, and even the device is killed due to insufficient memory.

Therefore, for the following special circumstances, it will automatically fall back to the non-optimized version:

- w or h is not a multiple of 2
- w or h is less than 8

#### Pitfalls in the decoding process and vpss alignment

1. Read jpg file into memory
2. Parse the jpg header and obtain w h channel number sampling method EXIF and other information
3. cvi-mmf prepares 3 vbuffers for decoded vb, rotated vb, and BGR-converted vb
4. vdec decodes to yuv444/yuv422/yuv420/y
5. vpss does the rotation and yuv converts to nv12
6. vpss does nv12 to bgr conversion

Among them, the ** test found that vpss has higher requirements for data alignment. It will happen that the data decoded by vdec is 64bytes aligned, while vpss requires the data to be 128bytes aligned**.

In some sizes that are not multiples of 128, decoding failure or decoded image data errors may occur:

![opencv-mobile](/docs/duo/opencv-mobile_02.webp)

So I made a hack in the middle of vdec->vpss. After vdec decoding and before vpss processing, I reset the phyaddr value and re-memmove the UV channel data to meet the alignment requirements of vpss.

If it is decoded to grayscale, vpss will directly treat yuv as y, which can accelerate the rotation.

Overall, the jpg decoding process is much more complicated than encoding, and there are more situations to consider.

#### 8 rotation directions

vdec can only be configured to output flip/mirror, and with vpss it can only do 90/180/270 rotation, and can combine 8 rotation directions.

**Since vpss can only rotate nv12 data, the uv channel decoded by yuv444 will inevitably be downsampled, which is detrimental to the picture quality**.

**Yuv422 vertical and progressive are not supported**.

During the test, it was found that yuv422 horizontal jpg can be decoded normally, but yuv422 vertical jpg is decoded incorrectly by vdec. This type of jpg will automatically fall back to software decoding.

Additionally, progressive jpgs are not supported.

#### Performance Testing

The test reads the image in advance and repeatedly calls cv::imdecode() to decode JPG to eliminate interference from file reading and writing, and the fastest time-consuming statistics are obtained.

Test jpg files in four color spaces of YUV444 YUV422 YUV420 GRAY with a resolution of 720p, and jointly test the decoding process of rotating 90 degrees according to EXIF.

Test cv::Mat decoded to BGR and grayscale respectively.

Tested on Milk-V Duo and Milk-V Duo-256M.

Test results show that cvi-mmf hardware-accelerated JPG decoding has greatly improved.

![opencv-mobile](/docs/duo/opencv-mobile_03.webp)

![opencv-mobile](/docs/duo/opencv-mobile_04.webp)

![opencv-mobile](/docs/duo/opencv-mobile_05.webp)

![opencv-mobile](/docs/duo/opencv-mobile_06.webp)

## 3. VPSS hardware acceleration test

opencv-mobile now supports Milk-V Duo/Duo256M/DuoS MIPI CSI cameras and VPSS hardware acceleration.

- The opencv-mobile highgui module implements access to camera streams based on cvi-mmf
- Automatically and dynamically load the ae+awb+isp+cvi_bin library at runtime to implement ISP image adjustment
- Automatically and dynamically load the vpss library at runtime to implement crop + YUV2BGR hardware acceleration
- There is no need to modify the code, calling cv::VideoCapture will automatically support it and support setting the resolution.
- Currently only supports Milk-V’s official GC2083 camera

### Test example

- Use cv::VideoCapture to open the camera and set the resolution to 320x240
- Get 1 frame of image every 1 second
- Turn off camera
- Finally, stitch the 9 pictures together and save them

The first frame is black because the ISP is still counting image information and it is too late for the ISP to automatically process it.

Sample code:
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

Similarly, refer to the method in the previous [Quick Start](#1-quick-start) to transfer other compiled files to Duo to execute the `./opencv-mobile-test` command:

:::tip
- The camera needs to be connected before Duo is powered on
- When the command is executed, the camera direction can be rotated to capture different images until the program ends
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
After successful operation, a picture `out.jpg` composed of 9 frames of images will be generated.
```
[root@milkv-duo]~# ls
opencv-mobile-test  out.jpg
```

Use the `scp` command on your computer to retrieve the `out.jpg` file locally:
```bash
scp root@192.168.42.1:/root/out.jpg .
```

View the generated image `out.jpg`:

![opencv-mobile-out](/docs/duo/opencv-mobile-out.jpg)

### Some details and limitations

#### Load cvi-mmf dynamic library at runtime

In order to reduce compilation coupling, opencv-mobile uses the runtime dlopen/dlsym method to load libsys libvpu libae libawb libisp libcvi_bin libsns_gc2083. Even if the library is missing during compilation, it is still compatible and available.

This method can also automatically adapt to later system library upgrades.

#### Device detection and whitelisting

The optimized code was verified and tested on Milk-V Duo / Milk-V Duo-256M.

When loading the cvi-mmf library, additionally determine whether /proc/device-tree/model is a Milk-V Duo device

Milk-V Duo and Milk-V Duo-256M cvi-mmf interface are source code compatible, but in fact the sns ini configuration files are different. If used incorrectly, image frames cannot be obtained normally and an error will be reported.
```
isp_err_chk:6343(): CSIBDG_A CH0 frm height less than setting(1080)
```

Distinguish two models according to the model information, and resume work after loading the corresponding configuration:

- Milk-V Duo: [sensor_cfg_gc2083.ini](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo/overlay/mnt/data/sensor_cfg_gc2083.ini)
- Milk-V Duo-256M：[sensor_cfg_gc2083.ini](https://github.com/milkv-duo/duo-buildroot-sdk/blob/develop/device/milkv-duo256m/overlay/mnt/data/sensor_cfg_GC2083.ini)

#### Resolution adaptive

The native camera resolution is 1920x1080 30fps.

- If the user request size exceeds 1080p, the size will be automatically reduced to within the 1080p range while maintaining the ratio
- If the user requests less than 1080p, it will be automatically cropped in the center and kept scaled down to the required resolution

![opencv-mobile-scale](/docs/duo/opencv-mobile_01.webp)

#### vb memory pool number

Although in theory, one memory block can be reused all the time to provide NV21 with frame fetching, but during testing it was found that when there are too few vb memory blocks, a vb memory exhaustion error will occur, resulting in the inability to fetch frames normally after a period of time.

Refer to the cvi-mmf sample code to open up 4 memory blocks for storing NV21 data, so that the problem of vb exhaustion will no longer occur.

## Reference link

1. [opencv-mobile 现已支持 milkv-duo/duo256m MIPI CSI 摄像头和vpss硬件加速](https://zhuanlan.zhihu.com/p/677764814)
2. [opencv-mobile 现已支持 milkv-duo cvi-mmf 硬件加速 JPG 解码](https://zhuanlan.zhihu.com/p/673940312)
3. [opencv-mobile (迷你版opencv库)在 milkv-duo 上的移植和应用](https://zhuanlan.zhihu.com/p/653359280)
