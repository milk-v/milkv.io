---
sidebar_label: 'Face Detection'
sidebar_position: 20
---

## Face Detection

The test program will pull the camera data, add the face detection algorithm, and use tools such as VLC to pull the stream in real time to view the effect.

### Compilation

Face detection program source code location:

- Duo：[sample_vi_fd.c](https://github.com/milkv-duo/cvitek-tdl-sdk-cv180x/blob/main/sample/cvi_tdl/sample_vi_fd.c)

- Duo256M and DuoS：[sample_vi_fd.c](https://github.com/milkv-duo/cvitek-tdl-sdk-sg200x/blob/main/sample/cvi_tdl/sample_vi_fd.c)

Refer to the method in the previous chapter [Introduction](https://milkv.io/docs/duo/application-development/tdl-sdk/tdl-sdk-introduction) to compile the sample program.

### Send test program and model files to Duo

- Refer to the method in the [Boot the Duo](https://milkv.io/docs/duo/getting-started/boot) chapter to install the system

- Refer to the method in the [Camera](https://milkv.io/docs/duo/camera/gc2083) chapter to power on the Duo after connecting the camera

Send the compiled `sample_vi_fd` to the Duo board through the `scp` command on your PC:

```bash
scp sample_vi_fd root@192.168.42.1:/root/
```

Also use scp to send the model file used for face detection in the `cvimodel` directory to the Duo board:

Duo：
```
scrfd_480_270_int8.cvimodel
```

Duo256M and DuoS：
```
scrfd_768_432_int8_1x.cvimodel
```

### Run the example

Log in to the Duo terminal through the serial port or [ssh](https://milkv.io/docs/duo/getting-started/setup#ssh).

Add executable permissions to the test program in Duo's terminal

```
chmod +x sample_vi_fd
```

Execute the test program in Duo's terminal:

Duo:
```
./sample_vi_fd scrfd_480_270_int8.cvimodel
```

Duo256M and DuoS：
```
./sample_vi_fd scrfd_768_432_int8_1x.cvimodel
```

The following information will be displayed in the Duo terminal:
```
Initialize RTSP
rtsp://127.0.1.1/h264
prio:0
version: 1.4.0
scrfd768432 Build at 2023-12-25 01:21:44 For platform cv181x
Max SharedMem size:1658880
```

At this time, point the camera at the face, and the Duo terminal will print the number of faces detected by the camera in real time:
```
face count: 5
face count: 6
face count: 5
face count: 4
face count: 0
face count: 1
face count: 0
```

### Use VLC to pull streams on PC to view the effect

Open `VLC media player`, click `Media` in the upper left corner, select `Open Network Stream`, and enter the URL.

If you are using USB Net(RNDIS), the address is:
```
rtsp://192.168.42.1/h264
```

![duo](/docs/duo/duo-vlc-stream-setup.jpg)

If you are using the network port on the IO-Board or the network port integrated on DuoS, the IP address in the URL needs to be replaced with the IP of the network port (you can use the `ifconfig` command in the Duo terminal to view).

Click the `Show more options` option in the lower left corner, and you can set the `Caching` option to adjust the delay. The default is 1000 milliseconds, which is 1 second. When the network environment is good, such as in a LAN, you can turn it down to reduce latency. You can set it to 100 to 300. If the network environment is poor or the screen freezes, you can try to increase it.

After configuring, click `Play` to view the face detection effect of the camera.

![duo](/docs/duo/tdl-sdk/duo-tdl-sdk-face-detection.jpg)

### Generation of face detection model

The generation method of the `*.cvimodel` model used in the above test

Coming Soon...