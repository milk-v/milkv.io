---
sidebar_label: 'USB 摄像头 '
sidebar_position: 15
---

# 在 Duo S 上使用 USB 摄像头

按照分步编译的步骤进行编译镜像

可参考:https://milkv.io/zh/docs/duo/getting-started/buildroot-sdk#2%E5%88%86%E6%AD%A5%E7%BC%96%E8%AF%91

## 1.配置系统内核

执行 `defconfig cv1813h_milkv_duos_sd` 命令后，在运行命令` menuconfig_kernel `打开内核配置。

![set-kernel](/docs/duo/set-kernel.webp)
```
Device Drivers --->
  `<*>`Multimedia support --->
      Media core support --->
        [ * ]Media Controller API (NEW)
            
  `<*>`Multimedia support --->
       Video4Linux options --->
         [ * ]V4L2 sub-device userspace API (NEW)
            
   `<*>`Multimedia support --->
        Media drivers --->
          [ * ]Media USB Adapters --->
             `<*>`USB Video Class(UVC)
                [ * ]UVC input events device supports 
                 
        Media drivers --->
           [ * ]V4L platform devices

Device Drivers --->
   `<*>`USB support --->
      [ * ]USB announce new devices
 ```     
以上配置完成后，搜索 CONFIG_VIDEOBUF2_VMALLOC 是否=y，CONFIG_USB_VIDEO_CLASS 是否=y

回到终端，运行命令` git status `确认原始配置文件被修改。

```
milkv@milkv-desktop:~/Desktop/test/duo-buildroot-sdk$ git status
On branch develop
Your branch is up to date with 'origin/develop'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   build/boards/cv181x/cv1813h_milkv_duos_sd/linux/cvitek_cv1813h_milkv_duos_sd_defconfig

no changes added to commit (use "git add" and/or "git commit -a")

```

复制到原始配置文件：

提示： /path/to/ 中的路径是自己的目录路径，可pwd查看

```

cp /path/to/duo-buildroot-sdk/linux_5.10/build/cv1813h_milkv_duos_sd/defconfig build/boards/cv181x/cv1813h_milkv_duos_sd/linux/cvitek_cv1813h_milkv_duos_sd_defconfig
```

比如：
```
cp /home/milkv/Desktop/test/duo-buildroot-sdk/linux_5.10/build/cv1813h_milkv_duos_sd/defconfig build/boards/cv181x/cv1813h_milkv_duos_sd/linux/cvitek_cv1813h_milkv_duos_sd_defconfig
```


接着回到分步编译继续接下来的步骤即可。

## 2.检测是否识别到usb摄像头设备

milkv-duos开启，在登陆终端上，将type-A接口设置为USB 2.0 HOST口：
```
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh

sync
```
可参考:https://milkv.io/zh/docs/duo/getting-started/duos#usb-type-a-%E6%8E%A5%E5%8F%A3%E7%9A%84%E4%BD%BF%E7%94%A8

运行命令` lsusb `，查看是否连接usb摄像头:

```
Bus 001 Device 001: ID 1d6b:0002
Bus 001 Device 003: ID 4c4a:4c55
Bus 001 Device 002: ID 05e3:0608
```

拔掉usb摄像头后，只剩下一个，则说明已连接。

运行命令` ls /dev `查看是否识别到设备命令：

```
[root@milkv-duo]~# ls /dev
bus          cvi-vo       cvi_vc_enc0  fd         i2c-4      ptmx       ttyS0
console      cvi-vpss     cvi_vc_enc1  full       ion        pts        ttyS1
cvi-base     cvi_vc_dec0  cvi_vc_enc2  gpiochip0  kmsg       random     ttyS2
cvi-dwa      cvi_vc_dec1  cvi_vc_enc3  gpiochip1  log        rfkill     ttyS3
cvi-ive      cvi_vc_dec2  cvi_vc_enc4  gpiochip2  media0     shm        ttyS4
cvi-mipi-rx  cvi_vc_dec3  cvi_vc_enc5  gpiochip3  mem        snd        urandom
cvi-mipi-tx  cvi_vc_dec4  cvi_vc_enc6  gpiochip4  mmcblk0    spidev0.0  video0
cvi-rgn      cvi_vc_dec5  cvi_vc_enc7  hwrng      mmcblk0p1  stderr     video1
cvi-sys      cvi_vc_dec6  cvi_vc_enc8  i2c-1      mmcblk0p2  stdin      zero
cvi-tpu0     cvi_vc_dec7  cvitekaadc   i2c-2      mmcblk0p3  stdout
cvi-vi       cvi_vc_dec8  cvitekadac   i2c-3      null       tty

```

出现video0，则已识别。

## 3.执行测试程序

下载解压uvctest.zip，在解压文件的地方打开终端，进行程序测试。

![open-terminal](/docs/duo/open-terminal.webp)

在duo-buildroot-sdk文件所在页面打开一个新的终端，进入到` duo-buildroot-sdk/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl- `的目录。

![query-path](/docs/duo/query-path.webp)

回到解压文件的目录终端，执行命令：

提示： /path/to/中的路径是自己的目录路径，可pwd查看

```
CROSS_COMPILE=/path/to/riscv64-unknown-linux-musl- make /path/to/riscv64-unknown-linux-musl-gcc -static -W -Wall -g -mcpu=c906fdv -march=rv64imafdcv0p7xthead -mcmodel=medany -mabi=lp64d -o uvctest uvctest.c
```

比如：
```
CROSS_COMPILE=/home/milkv/Desktop/test/duo-buildroot-sdk/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl- make /home/milkv/Desktop/test/duo-buildroot-sdk/host-tools/gcc/riscv64-linux-musl-x86_64/bin/riscv64-unknown-linux-musl-gcc -static -W -Wall -g -mcpu=c906fdv -march=rv64imafdcv0p7xthead -mcmodel=medany -mabi=lp64d -o uvctest uvctest.c
```

## 4.显示所拍照片

提示:在此之前，将网线连接好！

返回到登陆终端，运行命令` ip addr `显示网络接口地址。  

```
[root@milkv-duo]~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP qlen 1000
    link/ether 5e:ba:66:6b:a9:7d brd ff:ff:ff:ff:ff:ff
    inet 192.168.2.167/24 brd 192.168.2.255 scope global dynamic noprefixroute eth0
       valid_lft 3463sec preferred_lft 3013sec
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UNKNOWN qlen 1000
    link/ether 88:00:33:77:5c:9a brd ff:ff:ff:ff:ff:ff
    inet 169.254.199.14/16 brd 169.254.255.255 scope global noprefixroute wlan0
       valid_lft forever preferred_lft forever
```

复制 inet addr: xxx，回到解压文件的目录终端，执行命令：

```
scp uvctest root@xxx:/root`
```

提示：@xxx（xxx是复制的inet addr）

回到登陆终端，运行命令` ./uvctest /dev/video0 `，让 usb 摄像头拍照。

注意：./uvctest后面要打一个空格！

```
[root@milkv-duo]~# ./uvctest /dev/video0
step 0: cvi_uvc_create start
support capture.
support streaming
support ext format
driver:		uvcvideo
card:		USB Composite Device: DV15 USB 
bus_info:	usb-4340000.usb-1.3
version:	330244
capabilities:	84a00001

Supportformat:
	1.Motion-JPEG
	disc 720x1280

fmt.type:		1
pix.pixelformat:	MJPG
pix.height:		1280
pix.width:		720
pix.field:		1
framerate:		25

req buffers success

640*480
step 2: cvi_uvc_start start
create test file .//19700101_000437.jpg
snap file size 21020
[.//19700101_000437.jpg]: snap file take [226] ms
step 3: cvi_uvc_stop start
step 4: cvi_uvc_destroy start
test complete

```

复制图片xxxx.jpg。

提示 xxxx.jpg是所拍图片，由当时拍摄时间组成为xxxx。

返回解压文件的目录终端终端，执行命令：

```
scp root@xxx:/root/xxxx.jpg .

```

(提示：在jpg后面要打一个空格和.)    

打开对图片可读的权限：

```
sudo chmod 644 xxxx.jpg
```

运行命令` file xxxx.jpg `查看图片信息。

打开文件管理器，即可看见图片。

![view-picture](/docs/duo/view-picture.webp)



















