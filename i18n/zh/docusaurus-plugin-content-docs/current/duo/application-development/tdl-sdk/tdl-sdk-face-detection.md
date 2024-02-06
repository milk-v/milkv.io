---
sidebar_label: '人脸检测'
sidebar_position: 20
---

# 人脸检测

该测试程序会拉取摄像头数据，加入人脸检测算法，使用 VLC 等工具可以实时拉流查看效果。

### 编译

人脸检测程序源码位置：

- Duo：[sample_vi_fd.c](https://github.com/milkv-duo/cvitek-tdl-sdk-cv180x/blob/main/sample/cvi_tdl/sample_vi_fd.c)

- Duo256M and DuoS：[sample_vi_fd.c](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_tdl/sample_vi_fd.c)

参考上一章节 [简介](https://milkv.io/zh/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) 中的方法编译示例程序。

### 上传测试程序和模型文件到 Duo 中

- 参考 [运行 Duo](https://milkv.io/zh/docs/duo/getting-started/boot) 章节中的方法安装好系统

- 参考 [摄像头](https://milkv.io/zh/docs/duo/camera/gc2083) 章节中的方法连接摄像头之后，上电开机

将编译生成的 `sample_vi_fd` 在电脑上通过 `scp` 命令上传到 Duo 开发板中：

```bash
scp sample_vi_fd root@192.168.42.1:/root/
```

同样用 scp 将 `cvimodel` 目录中用于人脸检测的模型文件上传到 Duo 开发板中：

Duo：
```
scrfd_480_270_int8.cvimodel
```

Duo256M and DuoS：
```
scrfd_768_432_int8_1x.cvimodel
```

### 运行示例

通过串口或者 [ssh](https://milkv.io/zh/docs/duo/getting-started/setup#ssh) 登陆到 Duo 的终端。

在 Duo 的终端中为测试程序添加可执行权限
```
chmod +x sample_vi_fd
```

在 Duo 的终端中执行测试程序：

Duo:
```
./sample_vi_fd scrfd_480_270_int8.cvimodel
```

Duo256M 和 DuoS：
```
./sample_vi_fd scrfd_768_432_int8_1x.cvimodel
```

Duo 终端中会显示类似如下信息
```
Initialize RTSP
rtsp://127.0.1.1/h264
prio:0
version: 1.4.0
scrfd768432 Build at 2023-12-25 01:21:44 For platform cv181x
Max SharedMem size:1658880
```

此时用摄像头对准人脸，Duo 终端中会打印摄像头实时检测到的人脸个数：
```
face count: 5
face count: 6
face count: 5
face count: 4
face count: 0
face count: 1
face count: 0
```

### PC 端使用 VLC 拉流查看效果

打开 `VLC media player`，点击左上角 `Media`，选择 `Open Network Stream`，输入 URL。

如果使用的是 USB Net(RNDIS)，地址为：
```
rtsp://192.168.42.1/h264
```

<Image src='/docs/duo/duo-vlc-stream-setup.jpg' minWidth='40%' maxWidth='60%' align='left' />

如果使用的是底板 IO-Board 上的网口，或者 DuoS 上集成的网口，URL 中的 IP 地址需换成网口的 IP（可在 Duo 终端中使用 `ifconfig` 命令查看）。

点开左下角的 `Show more options` 选项，可以设置 `Caching` 选项来调整延时，默认是1000毫秒，也就是1秒。网络环境较好时比如在局域网内，可以将其调低来降低延迟，可以设置为100到300。如果网络环境较差或者画面出现卡顿时，可以尝试将其调高。

配置好之后，点击 `Play`，即可查看摄像头的人脸检测效果。

<Image src='/docs/duo/tdl-sdk/duo-tdl-sdk-face-detection.jpg' minWidth='50%' maxWidth='80%' align='left' />

### 人脸检测模型的生成

上述测试中使用的 `*.cvimodel` 模型的生成方法

Coming Soon...