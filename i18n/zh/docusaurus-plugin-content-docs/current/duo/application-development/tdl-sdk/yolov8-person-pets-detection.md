---
sidebar_label: '人形及猫狗侦测'
sidebar_position: 20
---

# 人形及猫狗侦测

该测试程序会拉取摄像头数据，加入 yolov8 算法，使用 VLC 等工具可以实时拉流查看效果。

### 编译

行人检测程序源码位置：

Duo256M and DuoS：[sample_vi_od.c](https://github.com/milkv-duo/duo-tdl-examples/blob/master/sample_vi_od/sample_vi_od.c)

参考：[https://github.com/milkv-duo/duo-tdl-examples/blob/master/README-zh.md](https://github.com/milkv-duo/duo-tdl-examples/blob/master/README-zh.md) 中的方法编译示例程序。

### 上传测试程序和模型文件到 Duos 中

- 参考 [运行 Duo](https://milkv.io/zh/docs/duo/getting-started/boot) 章节中的方法安装好系统

  镜像要下载 v2 版本：[https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases)

- 参考 [摄像头](https://milkv.io/zh/docs/duo/camera/gc2083) 章节中的方法连接摄像头之后，上电开机

将编译生成的 `sample_vi_od` 在电脑上通过 `scp` 命令上传到 Duo 开发板中：

```bash
scp sample_vi_od root@192.168.42.1:/root/
```

下载用于人形及猫狗侦测检测的 cvimodel:

[https://github.com/sophgo/tdl_models/blob/main/cv181x/pet_det_640x384.cvimodel](https://github.com/sophgo/tdl_models/blob/main/cv181x/pet_det_640x384.cvimodel)

同样用 scp 将 cvimodel 上传到 Duo 开发板中。

### 运行示例

通过串口或者 [ssh](https://milkv.io/zh/docs/duo/getting-started/setup#ssh) 登陆到 Duo 的终端。

在 Duo 的终端中为测试程序添加可执行权限：
```
chmod +x sample_vi_od
```

在 Duo 的终端中执行测试程序：

Duo256M 和 DuoS：
```
./sample_vi_od yolov8-person-pets pet_det_640x384.cvimodel
```

Duo 终端中会显示类似如下信息:
```
[root@milkv-duo]~# ./sample_vi_od yolov8-person-pets pet_det_640x384.cvimodel
[SAMPLE_COMM_SNS_ParseIni]-1950: Parse /mnt/data/sensor_cfg.ini
[parse_source_devnum]-1605: devNum =  1
[parse_sensor_name]-1686: sensor =  GCORE_GC2083_MIPI_2M_30FPS_10BIT
[parse_sensor_busid]-1714: bus_id =  3

...

1 R:1464 B:2327 CT:3937
2 R:1974 B:1613 CT:7225
Golden 1464 1024 2327
wdrLEOnly:1

```

此时，将摄像头对着人，猫，狗，Duo 终端中会打印摄像头实时检测到的四点坐标，分类以及 source:

```
 1120.35 451.70 1917.16 1067.80 2 0.68
 1127.75 429.42 1916.98 1068.79 2 0.50
 1198.89 319.74 1919.00 1067.76 2 0.68
 1163.29 290.17 1917.01 1068.71 2 0.59
 911.80 151.14 1919.00 1068.79 2 0.87
```

### PC 端使用 VLC 拉流查看效果

打开 `VLC media player`，点击左上角 `Media`，选择 `Open Network Stream`，输入 URL。

如果使用的是 USB Net(USB-NCM)，地址为：
```
rtsp://192.168.42.1/h264
```

<Image src='/docs/duo/duo-vlc-stream-setup.jpg' minWidth='40%' maxWidth='60%' align='left' />


如果使用的是底板 IO-Board 上的网口，或者 DuoS 上集成的网口，URL 中的 IP 地址需换成网口的 IP（可在 Duo 终端中使用 `ifconfig` 命令查看）。

点开左下角的 `Show more options` 选项，可以设置 `Caching` 选项来调整延时，默认是1000毫秒，也就是1秒。网络环境较好时比如在局域网内，可以将其调低来降低延迟，可以设置为100到300。如果网络环境较差或者画面出现卡顿时，可以尝试将其调高。

配置好之后，点击 `Play`，即可查看摄像头的检测效果。

效果图下：

<Image src='/docs/duo/tdl-sdk/duos-yolov8-person-pets-detection.webp' minWidth='40%' maxWidth='60%' align='left' />
