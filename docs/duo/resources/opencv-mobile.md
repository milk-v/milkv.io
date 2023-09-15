---
sidebar_label: 'OpenCV-Mobile'
sidebar_position: 30
---

# OpenCV-Mobile
Project Link:https://github.com/nihui/opencv-mobile  
By Nihui
## Introduction

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)
![build](https://img.shields.io/github/actions/workflow/status/nihui/opencv-mobile/release.yml?style=for-the-badge)
![download](https://img.shields.io/github/downloads/nihui/opencv-mobile/total.svg?style=for-the-badge)

![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![ARM Linux](https://img.shields.io/badge/ARM_Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![MacOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)

:heavy_check_mark: This project provides the minimal build of opencv library for the **Android**, **iOS** and **ARM Linux** platforms.

:heavy_check_mark: Packages for **Windows**, **Linux**, **MacOS** and **WebAssembly** are available now.

:heavy_check_mark: We provide prebuild binary packages for opencv **2.4.13.7**, **3.4.20** and **4.8.0**.

:heavy_check_mark: We also provide prebuild binary package for **iOS/iOS-Simulator with bitcode enabled**, that the official package lacks.

:heavy_check_mark: We also provide prebuild binary package for **Mac-Catalyst** and **Apple xcframework**, that the official package lacks.

:heavy_check_mark: All the binaries are compiled from source on github action, **no virus**, **no backdoor**, **no secret code**.

|opencv 4.8.0 android|package size|
|:-:|:-:|
|The official opencv|189 MB|
|opencv-mobile|17.7 MB|

|opencv 4.8.0 ios|package size|package size with bitcode|
|:-:|:-:|:-:|
|The official opencv|197 MB|missing :(|
|opencv-mobile|9.88 MB|34 MB|

## Download

https://github.com/nihui/opencv-mobile/releases/latest

[opencv4-milkv-duo-url]: https://github.com/nihui/opencv-mobile/releases/latest/download/opencv-mobile-4.8.0-milkv-duo.zip


* Android package build with ndk r25c and android api 24
* iOS / iOS-Simulator / MacOS / Mac-Catalyst package build with Xcode 13.4.1
* ARM Linux package build with cross-compiler on Ubuntu-22.04
* WebAssembly package build with Emscripten 3.1.28

## Usage ARM Linux, Windows, Linux, WebAssembly

1. Extract archive to ```<project dir>/```
2. Modify ```<project dir>/CMakeListst.txt``` to find and link opencv
3. Pass ```-DOpenCV_STATIC=ON``` to cmake option for windows build

```cmake
set(OpenCV_DIR ${CMAKE_SOURCE_DIR}/opencv-mobile-4.8.0-armlinux/arm-linux-gnueabihf/lib/cmake/opencv4)
find_package(OpenCV REQUIRED)

target_link_libraries(your_target ${OpenCV_LIBS})
```

## How-to-build your custom package

**step 1. download opencv source**
```shell
wget -q https://github.com/opencv/opencv/archive/4.8.0.zip -O opencv-4.8.0.zip
unzip -q opencv-4.8.0.zip
cd opencv-4.8.0
```

**step 2. strip zlib dependency and use stb-based highgui implementation (optional)**
```shell
patch -p1 -i ../opencv-4.8.0-no-zlib.patch
truncate -s 0 cmake/OpenCVFindLibsGrfmt.cmake
rm -rf modules/gapi
rm -rf modules/highgui
cp -r ../highgui modules/
```

**step 3. patch opencv source for no-rtti build (optional)**
```shell
patch -p1 -i ../opencv-4.8.0-no-rtti.patch
```

**step 4. apply your opencv options to opencv4_cmake_options.txt**

**step 5. build your opencv package with cmake**
```shell
mkdir -p build
cd build
cmake -DCMAKE_INSTALL_PREFIX=install \
-DCMAKE_BUILD_TYPE=Release \
`cat ../../opencv4_cmake_options.txt` \
-DBUILD_opencv_world=OFF ..
```

**step 6. make a package**
```shell
zip -r -9 opencv-mobile-4.8.0.zip install
```

## Some notes

* The minimal opencv build contains most basic opencv operators and common image processing functions, with some handy additions like keypoint feature extraction and matching, image inpainting and opticalflow estimation.

* Many computer vision algorithms that reside in dedicated modules are discarded, such as face detection etc. [You could try deep-learning based algorithms with neural network inference library optimized for mobile.](https://github.com/Tencent/ncnn)

* Image IO functions in highgui module, like ```cv::imread``` and ```cv::imwrite```, are re-implemented using [stb](https://github.com/nothings/stb) for smaller code size. GUI functions, like ```cv::imshow```, are discarded.

* cuda and opencl are disabled because there is no cuda on mobile, no opencl on ios, and opencl on android is slow. opencv on gpu is not suitable for real productions. Write metal on ios and opengles/vulkan on android if you need good gpu acceleration.

* C++ RTTI and exceptions are disabled for minimal build on mobile platforms and webassembly build. Be careful when you write ```cv::Mat roi = image(roirect);```  :P

## opencv modules included

|module|comment|
|---|---|
|opencv_core|Mat, matrix operations, etc|
|opencv_imgproc|resize, cvtColor, warpAffine, etc|
|opencv_highgui|imread, imwrite|
|opencv_features2d|keypoint feature and matcher, etc (not included in opencv 2.x package)|
|opencv_photo|inpaint, etc|
|opencv_video|opticalflow, etc|

## opencv modules discarded

|module|comment|
|---|---|
|opencv_androidcamera|use android Camera api instead|
|opencv_calib3d|camera calibration, rare uses on mobile|
|opencv_contrib|experimental functions, build part of the source externally if you need|
|opencv_dnn|very slow on mobile, try ncnn for neural network inference on mobile|
|opencv_dynamicuda|no cuda on mobile|
|opencv_flann|feature matching, rare uses on mobile, build the source externally if you need|
|opencv_gapi|graph based image processing, little gain on mobile|
|opencv_gpu|no cuda/opencl on mobile|
|opencv_imgcodecs|link with opencv_highgui instead|
|opencv_java|wrap your c++ code with jni|
|opencv_js|write native code on mobile|
|opencv_legacy|various good-old cv routines, build part of the source externally if you need|
|opencv_ml|train your ML algorithm on powerful pc or server|
|opencv_nonfree|the SIFT and SURF, use ORB which is faster and better|
|opencv_objdetect|HOG, cascade detector, use deep learning detector which is faster and better|
|opencv_ocl|no opencl on mobile|
|opencv_python|no python on mobile|
|opencv_shape|shape matching, rare uses on mobile, build the source externally if you need|
|opencv_stitching|image stitching, rare uses on mobile, build the source externally if you need|
|opencv_superres|do video super-resolution on powerful pc or server|
|opencv_ts|test modules, useless in production anyway|
|opencv_videoio|use android MediaCodec or ios AVFoundation api instead|
|opencv_videostab|do video stablization on powerful pc or server|
|opencv_viz|vtk is not available on mobile, write your own data visualization routines|

## Hod to use on Milk-V Duo?
original link: https://community.milkv.io/t/opencv-mobile-opencv-milkv-duo/557

### TL;DR

Compile the packaged zip file and get ready!

1. Open the website https://github.com/nihui/opencv-mobile
2. Download opencv-mobile-4.8.0-milkv-duo.zip and unzip it.
3. Run cmake `-DOpenCV_DIR=<unzip_directory>/lib/cmake/opencv4` + `find_package(OpenCV)` + `target_link_libraries(your-program ${OpenCV_LIBS})`

### opencv-mobile

opencv-mobile minimizes the compiled opencv library by adjusting compilation parameters and removing some opencv source code.

* Provides common opencv functionalities such as image read/write, image processing, matrix operations, etc.
* Synchronized with upstream, no third-party dependencies.

In most cases, it can replace the official opencv with 1/10 of the size, making it especially suitable for mobile and embedded environments with special size requirements.

Compared to the modified opencv in the Plain Gopro Community, opencv-mobile can directly enjoy upstream RVV optimization, making it more original and lighter.

### Compiling opencv-mobile for milkv-duo

The milkv-duo board has very limited hardware resources.

- Prepare a cross-compilation toolchain, for example, unzip it to `/home/nihui/osd/host-tools`, and set it as an environment variable later.

https://github.com/milkv-duo/duo-buildroot-sdk/tree/develop

- Download the latest opencv source code.

https://github.com/opencv/opencv/releases

- Download the compilation configuration and patches for opencv-mobile.

https://github.com/nihui/opencv-mobile

Follow the compilation steps of opencv-mobile, set the toolchain directory environment variable, modify the highgui module, apply patches, and use `riscv64-unknown-linux-musl.toolchain.cmake`.

```shell
export RISCV_ROOT_PATH=/home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64

git clone https://github.com/nihui/opencv-mobile.git
cd opencv-mobile

wget -q https://github.com/opencv/opencv/archive/4.8.0.zip
unzip -q opencv-4.8.0.zip
cd opencv-4.8.0

truncate -s 0 cmake/OpenCVFindLibsGrfmt.cmake
rm -rf modules/gapi
patch -p1 -i ../opencv-4.8.0-no-rtti.patch
patch -p1 -i ../opencv-4.8.0-no-zlib.patch
patch -p1 -i ../opencv-4.8.0-link-openmp.patch
rm -rf modules/highgui
cp -r ../highgui modules/

mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=../../toolchains/riscv64-unknown-linux-musl.toolchain.cmake -DCMAKE_C_FLAGS="-fno-rtti -fno-exceptions" -DCMAKE_CXX_FLAGS="-fno-rtti -fno-exceptions" -DCMAKE_INSTALL_PREFIX=install -DCMAKE_BUILD_TYPE=Release `cat ../../opencv4_cmake_options.txt` -DBUILD_opencv_world=OFF -DOPENCV_DISABLE_FILESYSTEM_SUPPORT=ON ..
make -j4
make install

```

After compilation, opencv-mobile is ready in opencv-mobile/build/install.

Note that during the compilation process, you will see that CMake has successfully detected and enabled RVV vector support, which provides acceleration for the milkv-duo chip:

```txt
-- Performing Test HAVE_CPU_RVV_SUPPORT (check file: cmake/checks/cpu_rvv.cpp)
-- Performing Test HAVE_CPU_RVV_SUPPORT - Success
```

opencv-mobile's toolchains/riscv64-unknown-linux-musl.toolchain.cmake globally enables compilation parameters related to the c906 kernel and sets them for c906 optimization. These parameters will automatically be applied to the compilation of all opencv-mobile modules, providing optimal performance.
```txt
-- General configuration for OpenCV 4.8.0 =====================================
--   Version control:               v18-dirty
--
--   Platform:
--     Timestamp:                   2023-08-30T09:37:40Z
--     Host:                        Linux 6.4.12-200.fc38.x86_64 x86_64
--     Target:                      Linux riscv64
--     CMake:                       3.27.3
--     CMake generator:             Unix Makefiles
--     CMake build tool:            /usr/bin/gmake
--     Configuration:               Release
--
--   CPU/HW features:
--     Baseline:                    RVV
--       requested:                 DETECT
--
--   C/C++:
--     Built as dynamic libs?:      NO
--     C++ standard:                11
--     C++ Compiler:                /home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-g++  (ver 10.2.0)
--     C++ flags (Release):         -march=rv64gcv0p7_zfh_xtheadc -mabi=lp64d -mtune=c906   -fsigned-char -W -Wall -Wreturn-type -Wnon-virtual-dtor -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wundef -Winit-self -Wpointer-arith -Wshadow -Wsign-promo -Wuninitialized -Wsuggest-override -Wno-delete-non-virtual-dtor -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -fvisibility=hidden -fvisibility-inlines-hidden -fopenmp -O3 -DNDEBUG  -DNDEBUG
--     C++ flags (Debug):           -march=rv64gcv0p7_zfh_xtheadc -mabi=lp64d -mtune=c906   -fsigned-char -W -Wall -Wreturn-type -Wnon-virtual-dtor -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wundef -Winit-self -Wpointer-arith -Wshadow -Wsign-promo -Wuninitialized -Wsuggest-override -Wno-delete-non-virtual-dtor -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -fvisibility=hidden -fvisibility-inlines-hidden -fopenmp -g  -O0 -DDEBUG -D_DEBUG
--     C Compiler:                  /home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-gcc
--     C flags (Release):           -march=rv64gcv0p7_zfh_xtheadc -mabi=lp64d -mtune=c906   -fsigned-char -W -Wall -Wreturn-type -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wmissing-prototypes -Wstrict-prototypes -Wundef -Winit-self -Wpointer-arith -Wshadow -Wuninitialized -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -fvisibility=hidden -fopenmp -O3 -DNDEBUG  -DNDEBUG
--     C flags (Debug):             -march=rv64gcv0p7_zfh_xtheadc -mabi=lp64d -mtune=c906   -fsigned-char -W -Wall -Wreturn-type -Waddress -Wsequence-point -Wformat -Wformat-security -Wmissing-declarations -Wmissing-prototypes -Wstrict-prototypes -Wundef -Winit-self -Wpointer-arith -Wshadow -Wuninitialized -Wno-comment -Wimplicit-fallthrough=3 -Wno-strict-overflow -fdiagnostics-show-option -pthread -fomit-frame-pointer -ffunction-sections -fdata-sections  -fvisibility=hidden -fopenmp -g  -O0 -DDEBUG -D_DEBUG
--     Linker flags (Release):      -Wl,--gc-sections -Wl,--as-needed -Wl,--no-undefined
--     Linker flags (Debug):        -Wl,--gc-sections -Wl,--as-needed -Wl,--no-undefined
--     ccache:                      NO
--     Precompiled headers:         NO
--     Filesystem support is disabled
--     Extra dependencies:          /home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/riscv64-unknown-linux-musl/lib64v0p7_xthead/lp64d/libgomp.so /home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/sysroot/usr/lib64v0p7_xthead/lp64d/libpthread.a /home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/riscv64-unknown-linux-musl/lib64v0p7_xthead/lp64d/libatomic.so dl m pthread rt
--     3rdparty dependencies:
--
--   OpenCV modules:
--     To be built:                 core features2d highgui imgproc photo video
--     Disabled:                    calib3d dnn flann imgcodecs ml objdetect stitching videoio world
--     Disabled by dependency:      -
--     Unavailable:                 java python2 python3 ts
--     Applications:                -
--     Documentation:               NO
--     Non-free algorithms:         NO
--
--   GUI:
--
--   Media I/O:
--     ZLib:                        build (ver )
--
--   Video I/O:
--     DC1394:                      NO
--
--   Parallel framework:            OpenMP
--
--   Other third-party libraries:
--     Lapack:                      NO
--     Custom HAL:                  NO
--
--   Python (for build):            /usr/bin/python2.7
--
--   Install to:                    /home/nihui/dev/opencv-mobile/opencv-4.8.0/build/install
-- -----------------------------------------------------------------
```

### Using opencv-mobile to Implement Image Scaling for milkv-duo

opencv-mobile includes a sample project demonstrating how to use opencv-mobile to load images, scale them, and save images.

Key code:
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

CMake project key code:
```cmake
project(opencv-mobile-test)
cmake_minimum_required(VERSION 3.5)

# opencv4 requires c++11
set(CMAKE_CXX_STANDARD 11)

# set OpenCV_DIR to where OpenCVConfig.cmake resides
find_package(OpenCV REQUIRED)

add_executable(opencv-mobile-test main.cpp)
target_link_libraries(opencv-mobile-test ${OpenCV_LIBS})
```

Compilation process:
```shell
export RISCV_ROOT_PATH=/home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64

cd opencv-mobile/test

mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=../../toolchains/riscv64-unknown-linux-musl.toolchain.cmake -DCMAKE_BUILD_TYPE=Release -DOpenCV_DIR=/home/nihui/dev/opencv-mobile/opencv-4.8.0/build/install/lib/cmake/opencv4 ..
make
```

(Optional) The compiled binary can be further reduced in size using the strip tool from the cross-compilation toolchain:
```shell
/home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-strip opencv-mobile-test
```

After flashing the latest milkv-duo image and connecting via USB, confirm that you can SSH:

https://github.com/milkv-duo/duo-buildroot-sdk/releases

Copy opencv-mobile-test and a test image in.jpg to root@192.168.42.1:/root/.

At this point, when you execute it in an SSH shell, you may encounter an error that libgomp.so.1 cannot be found:

```txt
[root@milkv]~# ./opencv-mobile-test
Error loading shared library libgomp.so.1: No such file or directory (needed by ./opencv-mobile-test)
Error relocating ./opencv-mobile-test: GOMP_loop_nonmonotonic_dynamic_start: symbol not found
Error relocating ./opencv-mobile-test: omp_get_thread_num: symbol not found
Error relocating ./opencv-mobile-test: omp_set_dynamic: symbol not found
Error relocating ./opencv-mobile-test: GOMP_parallel: symbol not found
Error relocating ./opencv-mobile-test: GOMP_loop_nonmonotonic_dynamic_next: symbol not found
Error relocating ./opencv-mobile-test: GOMP_loop_end_nowait: symbol not found
Error relocating ./opencv-mobile-test: omp_get_max_threads: symbol not found
Error relocating ./opencv-mobile-test: GOMP_loop_nonmonotonic_dynamic_start: symbol not found
Error relocating ./opencv-mobile-test: omp_get_thread_num: symbol not found
Error relocating ./opencv-mobile-test: omp_set_dynamic: symbol not found
Error relocating ./opencv-mobile-test: GOMP_parallel: symbol not found
Error relocating ./opencv-mobile-test: GOMP_loop_nonmonotonic_dynamic_next: symbol not found
Error relocating ./opencv-mobile-test: GOMP_loop_end_nowait: symbol not found
Error relocating ./opencv-mobile-test: omp_get_max_threads: symbol not found
```

From the toolchain, find `/home/nihui/osd/host-tools/gcc/riscv64-linux-musl-x86_64/sysroot/lib64v0p7_xthead/lp64d/libgomp.so.1.0.0`, copy it, and rename it to `root@192.168.42.1:/root/libgomp.so.1`. Then, add `LD_LIBRARY_PATH` and execute the program, and it should exit normally:

```txt
[root@milkv]~# LD_LIBRARY_PATH=. ./opencv-mobile-test
```

If you encounter a "Killed" error, it means the image resolution is too large and exceeds the memory capacity of milkv-duo. Use a smaller image to avoid this issue.

Finally, if you find this useful, please star and share: :P

https://github.com/nihui/opencv-mobile





