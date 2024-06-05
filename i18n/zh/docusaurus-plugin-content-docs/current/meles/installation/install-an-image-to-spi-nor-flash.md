---
sidebar_label: '安装镜像到 SPI Nor Flash'
sidebar_position: 50
---

# 安装镜像到 SPI Nor Flash

Meles 开发板上有一个 SPI nor Flash。它被用来存放 Bootloader，以实现引导系统启动和 SoC 下载模式，Soc 本身不支持 从 Micro SD 卡或 USB 等其他储存介质启动。

## 通过串口为 SPI Nor Flash 烧写镜像

### 必要准备

- Meles 和电源适配器
- Meles 的 Bootloader
- 镜像烧录软件
- USB to TTL 串口模块
- 安装有 Ubuntu 的电脑

### 安装工具到电脑

安装 yoctools

<pre>
$ sudo pip install yoctools -U
</pre>

检查软件版本

<pre>
$ yoc --version
2.0.74
</pre>

下载镜像烧录软件， iw-single-line.bin

<pre>
$ wget https://github.com/milkv-meles/thead-bin/raw/main/image-writer/iw-single-line.bin
</pre>

### 下载镜像

从以下链接下载 Meles 的 Bootloader， https://github.com/milkv-meles/meles-images/releases.

- 4GB DDR Meles: https://github.com/milkv-meles/meles-images/releases/download/v2024-0417/u-boot-with-spl-meles-4g.bin
- 8GB DDR Meles: https://github.com/milkv-meles/meles-images/releases/download/v2024-0417/u-boot-with-spl-meles.bin

```
$ wget https://github.com/milkv-meles/meles-images/releases/download/v2024-0417/u-boot-with-spl-meles-4g.bin
$ wget https://github.com/milkv-meles/meles-images/releases/download/v2024-0417/u-boot-with-spl-meles.bin
```

下载 zero 镜像文件。

<pre>
$ wget https://github.com/milkv-meles/thead-bin/raw/main/image-writer/zero-1m.img
</pre>

### 启动 Meles 到下载模式

将 Meles 启动到下载模式非常容易：

- Meles 关机并下电
- 将 USB to TTL 串口模块连接到 Meles 调试接口
- 按住下载按钮
- 插入电源适配器让 Meles 上电
- 松开下载按钮

### 将 Bootloader 写入 SPI Nor Flash

#### 步骤 1： 使用 cct 工具检查可用设备

运行下列命令，/dev/ttyUSB0 是 USB 串口模块在电脑上的对应设备文件。

<pre>
$ sudo cct list -u /dev/ttyUSB0
Wait ..............
</pre>

可以忽略打印的日志并直接前往步骤 2。

#### 步骤 2: 启动 Meles 到下载模式

- Meles 关机并下电
- 将 USB to TTL 串口模块连接到 Meles 调试接口
- 按住下载按钮
- 插入电源适配器让 Meles 上电
- 松开下载按钮
- 检查设备

<pre>
$ sudo cct list -u /dev/ttyUSB0
Wait ............................
Memory device list:
  dev = ram0   , size =    1.1MB
  dev = qspi0  , size =   16.0MB
</pre>

#### 步骤 3: 将镜像烧录软件下载到 SRAM

<pre>
$ sudo cct download -u /dev/ttyUSB0 -d ram0 -f ./iw-single-line.bin -v checksum -r
Wait 
Send file './iw-single-line.bin' to 2:0 ...
File ./iw-single-line.bin download success.     
Start to verify data with method:[checksum]
checksum value is: 0x880572
读出并校验成功!
Start to run image...
</pre>

#### 步骤 4: 下载 Bootloader 到 SPI Nor Flash

下载 bootloader 到 8GB Meles。

<pre>
$ sudo cct download -u /dev/ttyUSB0 -d qspi0 -f ./u-boot-with-spl-meles.bin -v checksum -r -t 1200
Wait 
Send file './u-boot-with-spl-meles.bin' to 23:0 ...
File ./u-boot-with-spl-meles.bin download success.
Start to verify data with method:[checksum]
checksum value is: 0x428a844
读出并校验成功!
Start to run image...
</pre>

#### 步骤 5: Meles 重新上电

Meles 重新上电后，蓝色 LED 应为常亮状态。

### 擦除 SPI Nor Flash

#### 步骤 1：使用 cct 工具检查可用设备

运行下列命令，/dev/ttyUSB0 是 USB 串口模块在电脑上的对应设备文件。

<pre>
$ sudo cct list -u /dev/ttyUSB0
Wait ..............
</pre>

可以忽略打印的日志并直接前往步骤 2。

#### 步骤 2: 启动 Meles 到下载模式

- Meles 关机并下电
- 将 USB to TTL 串口模块连接到 Meles 调试接口
- 按住下载按钮
- 插入电源适配器让 Meles 上电
- 松开下载按钮
- 检查设备

<pre>
$ sudo cct list -u /dev/ttyUSB0
Wait ............................
Memory device list:
  dev = ram0   , size =    1.1MB
  dev = qspi0  , size =   16.0MB
</pre>

#### 步骤 3: 将镜像烧录软件下载到 SRAM

<pre>
$ sudo cct download -u /dev/ttyUSB0 -d ram0 -f ./iw-single-line.bin -v checksum -r
Wait 
Send file './iw-single-line.bin' to 2:0 ...
File ./iw-single-line.bin download success.     
Start to verify data with method:[checksum]
checksum value is: 0x880572
读出并校验成功!
Start to run image...
</pre>

#### Step 4: 下载 zero 镜像文件到 SPI Nor Flash

<pre>
$ sudo cct download -u /dev/ttyUSB0 -d qspi0 -f ./zero-1m.img -v checksum -r -t 1200
Wait 
Send file './zero-1m.img' to 23:0 ...
File ./zero-1m.img download success.     
Start to verify data with method:[checksum]
checksum value is: 0x0
读出并校验成功!
Start to run image...
</pre>

#### 步骤 5: Meles 重新上电

Meles 重新上电后，蓝色 LED 应为常亮状态。
