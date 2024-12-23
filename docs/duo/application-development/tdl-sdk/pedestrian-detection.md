---
sidebar_label: 'Pedestrian Detection'
sidebar_position: 20
---

# Pedestrian detection

This test program will pull camera data, add pedestrian detection algorithm, and use VLC and other tools to pull the stream in real time to view the effect.

### Compile

Pedestrian detection program source code location:

Duo256M and DuoS：[sample_vi_od.c](https://github.com/milkv-duo/duo-tdl-examples/blob/master/sample_vi_od/sample_vi_od.c)

Refer to `https://github.com/milkv-duo/duo-tdl-examples/blob/master/README-zh.md `to compile the example program.

### Upload the test program and model files to Duo

- Refer to the method in the [Run Duo](https://milkv.io/zh/docs/duo/getting-started/boot) section to install the system

To download the v2 version, please visit: https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/tag/v2.0.0

- Refer to the method in the [Camera](https://milkv.io/zh/docs/duo/camera/gc2083) section to connect the camera and power on

Upload the compiled `sample_vi_od` to the Duo development board through the `scp` command on the computer:

```bash
scp sample_vi_od root@192.168.42.1:/root/
```

Download cvimodel for pedestrian detection:

https://github.com/sophgo/tdl_models/blob/main/cv181x/mobiledetv2-pedestrian-d0-ls-448.cvimodel

Use scp to upload cvimodel to Duo development board.

### Run the example

Log in to Duo's terminal via the serial port or [ssh](https://milkv.io/zh/docs/duo/getting-started/setup#ssh) .

Add executable permissions to the test program in Duo's terminal
```
chmod +x sample_vi_od
```
Execute the test program in Duo's terminal:

Duo256M and DuoS:
```
./sample_vi_od mobiledetv2-pedestrian mobiledetv2-pedestrian-d0-ls-448.cvimodel
```

The Duo terminal will display information similar to the following:
```
[root@milkv-duo]~# ./sample_vi_od mobiledetv2-pedestrian mobiledetv2-pedestrian-
d0-ls-448.cvimodel
[SAMPLE_COMM_SNS_ParseIni]-1950: Parse /mnt/data/sensor_cfg.ini
[parse_source_devnum]-1605: devNum = 1
[parse_sensor_name]-1686: sensor = GCORE_GC2083_MIPI_2M_30FPS_10BIT
[parse_sensor_busid]-1714: bus_id = 3

...

1 R:1464 B:2327 CT:3937
2 R:1974 B:1613 CT:7225
Golden 1464 1024 2327
wdrLEOnly:1

```
At this time, point the camera at pedestrians, and the Duo terminal will print the number of pedestrians detected by the camera in real time:
```
obj count: 1, take 17.03,width:1920 ms
obj count: 1, take 17.55,width:1920 ms
obj count: 0, take 17.30,width:1920 ms
```
### Use VLC to pull the stream on the PC to view the effect

Open `VLC media player`, click `Media` in the upper left corner, select `Open Network Stream`, and enter the URL.

If you are using USB Net (USB-NCM), the address is:
```
rtsp://192.168.42.1/h264
```

<Image src='/docs/duo/duo-vlc-stream-setup.jpg' minWidth='40%' maxWidth='60%' align='left' />

If you are using the network port on the baseboard IO-Board, or the network port integrated on DuoS, the IP address in the URL needs to be replaced with the IP of the network port (you can use the `ifconfig` command in the Duo terminal to view it).

Click the `Show more options` option in the lower left corner, and you can set the `Caching` option to adjust the delay. The default is 1000 milliseconds, which is 1 second. When the network environment is good, such as in a local area network, you can lower it to reduce the delay. It can be set to 100 to 300. If the network environment is poor or the screen is stuck, you can try to increase it.

After configuration, click `Play` to view the pedestrian detection effect of the camera.