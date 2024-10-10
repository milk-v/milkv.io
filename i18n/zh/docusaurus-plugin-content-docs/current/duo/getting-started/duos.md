---
sidebar_label: 'Duo S (SG2000)'
sidebar_position: 3
---

# Duo S

<Image src='/docs/duo/duos/duos-v1.1.webp' maxWidth='70%' align='center' />

Milk-V DuoS 是 Duo 的升级型号，升级了 SG2000 主控，拥有更大的内存（512MB）和更多的 IO 接口。 它集成了 WI-FI 6/BT 5 无线功能，并配备 USB 2.0 HOST 接口和 100Mbps 以太网端口，方便用户使用。 它支持双摄像头（2x MIPI CSI 2 通道）和 MIPI 视频输出（MIPI DSI 4 通道），可实现多种应用。 DuoS 还支持通过开关在 RISC-V 和 ARM 启动之间切换。 通过性能和接口的增强，DuoS 更适合各种场景和更复杂的项目开发需求。

## SG2000 简介

SG2000 是一款高性能、低功耗芯片，专为智能监控 IP 摄像机、本地面部识别考勤机、智能家居设备等各种产品领域而设计。 它集成了 H.264/H.265 视频压缩解码和 ISP 能力。 支持 HDR 宽动态、3D 降噪、去雾、镜头畸变校正等多种图像增强和校正算法，为客户提供专业级的视频图像质量。

该芯片还集成了内部 TPU，在 INT8 运算下可提供约 0.5TOPS 的计算能力。专门设计的 TPU 调度引擎高效地为张量处理单元核心提供高带宽数据流。它还为用户提供了强大的深度学习模型编译器和软件 SDK 开发套件。 Caffe、Pytorch、ONNX、MXNet、TensorFlow（Lite）等主流深度学习框架都可以轻松移植到该平台。

## SG2000 数据手册

我们已将 SG2000 的数据手册和 TRM 开源到GitHub。请 [查看](https://github.com/milkv-duo/duo-files/tree/main/duo-s/datasheet)。

## 购买 SG2000 芯片

Milk-V 是 SG2000 芯片的全球授权经销商。您可以直接从我们的经销商 [Arace](https://arace.tech/products/sophon-cv1800b-5pcs) 购买 SG2000 芯片的样品。如需批量订购，请联系 [Milk-V 销售团队](mailto:sales@milkv.io) 获取报价。

## 上手指南

### 安装系统

- 从 SD 卡启动
  
  请参考：[启动](https://milkv.io/zh/docs/duo/getting-started/boot) 章节。

- 从 eMMC 启动
  
  请参考：[eMMC 版本固件烧录](https://milkv.io/zh/docs/duo/getting-started/duos#emmc-%E7%89%88%E6%9C%AC%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95) 章节。

### USB 网络的使用

请参考：[设置](https://milkv.io/zh/docs/duo/getting-started/setup) 章节。

## DuoS GPIO 引脚分配

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='center' />


### GPIO 引脚映射

<div className='gpio_style'>

| GROUP | ADDR          | PORT  | CHIP      | NUM     | NAME     | START             |
|:-----:|:-------------:|:-----:|:---------:|:-------:|:---------|:------------------|
| gpio0 | gpio@03020000 | porta | gpiochip0 | 480-511 | XGPIOA   | 480 - XGPIOA[0]   |
| gpio1 | gpio@03021000 | portb | gpiochip1 | 448-479 | XGPIOB   | 448 - XGPIOB[0]   |
| gpio2 | gpio@03022000 | portc | gpiochip2 | 416-447 | XGPIOC   | 416 - XGPIOC[0]   |
| gpio3 | gpio@03023000 | portd | gpiochip3 | 384-415 |          |                   |
| gpio4 | gpio@05021000 | porte | gpiochip4 | 352-383 | PWR_GPIO | 352 - PWR_GPIO[0] |

</div>

### 排针 J3

`排针 J3` 上的 GPIO 使用 3.3V 逻辑电平。

<div className='gpio_style' style={{ overflow :"auto"}} >

| SPI      | PWM  | I2C      | UART     | NUM | SG2000     | NAME  | PIN                              | PIN                             | NAME     | SG2000     | NUM | UART               | PWM  | SPI     | JTAG      |
|:---------|:-----|:---------|:---------|:---:|:-----------|------:|:--------------------------------:|:-------------------------------:|:---------|:-----------|:---:|:-------------------|:-----|:--------|:----------|
|          |      |          |          |     |            | 3V3   | <div className='orange'>1</div>  | <div className='red'>2</div>    | VSYS(5V) |            |     |                    |      |         |           |
|          | PWM3 | I2C4_SCL |          | 468 | XGPIOB[20] | B20   | <div className='green'>3</div>   | <div className='red'>4</div>    | VSYS(5V) |            |     |                    |      |         |           |
|          |      | I2C4_SDA |          | 469 | XGPIOB[21] | B21   | <div className='green'>5</div>   | <div className='black'>6</div>  | GND      |            |     |                    |      |         |           |
|          |      | I2C1_SCL |          | 466 | XGPIOB[18] | B18   | <div className='green'>7</div>   | <div className='green'>8</div>  | A16      | XGPIOA[16] | 496 | UART0_TX/UART1_TX  | PWM4 |         |           |
|          |      |          |          |     |            | GND\* | <div className='black'>9</div>   | <div className='green'>10</div> | A17      | XGPIOA[17] | 497 | UART0_RX/UART1_RX  | PWM5 |         |           |
|          | PWM1 | I2C1_SDA | UART2_TX | 459 | XGPIOB[11] | B11   | <div className='green'>11</div>  | <div className='green'>12</div> | B19      | XGPIOB[19] | 467 | UART2_TX           | PWM2 |         |           |
|          | PWM2 | I2C1_SCL | UART2_RX | 460 | XGPIOB[12] | B12   | <div className='green'>13</div>  | <div className='black'>14</div> | GND      |            |     |                    |      |         |           |
|          |      |          | UART2_RX | 470 | XGPIOB[22] | B22   | <div className='green'>15</div>  | <div className='green'>16</div> | A20      | XGPIOA[20] | 500 |                    |      |         | JTAG_TRST |
|          |      |          |          |     |            | 3V3   | <div className='orange'>17</div> | <div className='green'>18</div> | A19      | XGPIOA[19] | 499 | UART1_TX/UART1_RTS | PWM7 |         | JTAG_TMS  |
| SPI3_SDO | PWM3 | I2C2_SCL |          | 461 | XGPIOB[13] | B13   | <div className='green'>19</div>  | <div className='black'>20</div> | GND      |            |     |                    |      |         |           |
| SPI3_SDI |      | I2C2_SDA |          | 462 | XGPIOB[14] | B14   | <div className='green'>21</div>  | <div className='green'>22</div> | A18      | XGPIOA[18] | 498 | UART1_RX/UART1_CTS | PWM6 |         | JTAG_TCK  |
| SPI3_SCK |      |          | UART2_TX | 463 | XGPIOB[15] | B15   | <div className='green'>23</div>  | <div className='green'>24</div> | B16      | XGPIOB[16] | 464 | UART2_RX           |      | SPI3_CS |           |
|          |      |          |          |     |            | GND   | <div className='black'>25</div>  | <div className='green'>26</div> | A28      | XGPIOA[28] | 508 | UART2_TX/UART1_TX  |      |         |           |

</div>

*GND\*：引脚 9 在 V1.1 版本硬件中是一个低电平的 GPIO，在 V1.2 及更高版本硬件中为 GND。*

注意：CSI 摄像头连接器 J2 上的 I2C 为 I2C2，所以在使用 J2 上的 CSI 摄像头时，J3 排针中的 I2C2 不可用。

### 排针 J4

`排针 J4` 上的 GPIO 使用 1.8V 逻辑电平。

<div className='gpio_style' style={{ overflow :"auto"}} >

| PWM   | I2C      | UART     | MIPI DSI   | NUM | SG2000      | NAME     | PIN                             | PIN                              | NAME        | SG2000     | NUM | MIPI DSI   |
|:------|:---------|:---------|:-----------|:---:|:------------|---------:|:-------------------------------:|:--------------------------------:|:------------|:-----------|:---:|:-----------|
|       |          |          |            |     |             | VSYS(5V) | <div className='red'>52</div>   | <div className='blue'>51</div>   | AUDIO_OUT_R |            |     |            |
| PWM12 | I2C4_SCL | UART3_TX |            | 449 | XGPIOB[1]   | B1       | <div className='green'>50</div> | <div className='blue'>49</div>   | AUDIO_OUT_L |            |     |            |
| PWM13 | I2C4_SDA | UART3_RX |            | 450 | XGPIOB[2]   | B2       | <div className='green'>48</div> | <div className='blue'>47</div>   | AUDIO_IN_R  |            |     |            |
|       |          |          |            | 451 | XGPIOB[3]   | B3       | <div className='green'>46</div> | <div className='blue'>45</div>   | AUDIO_IN_L  |            |     |            |
| PWM10 | I2C2_SDA |          | LCD_RST    | 354 | PWR_GPIO[2] | E2       | <div className='green'>44</div> | <div className='orange'>43</div> | 3V3         |            |     |            |
| PWM9  | I2C2_SCL | UART2_RX | LCD_PWR_CT | 353 | PWR_GPIO[1] | E1       | <div className='green'>42</div> | <div className='green'>41</div>  | C18         | XGPIOC[18] | 434 | MIPI_TX_3N |
| PWM8  |          | UART2_TX | LCD_PWM    | 352 | PWR_GPIO[0] | E0       | <div className='green'>40</div> | <div className='green'>39</div>  | C19         | XGPIOC[19] | 435 | MIPI_TX_3P |
|       |          |          |            |     |             | GND      | <div className='black'>38</div> | <div className='black'>37</div>  | GND         |            |     |            |
|       |          |          | MIPI_TX_2N | 436 | XGPIOC[20]  | C20      | <div className='green'>36</div> | <div className='green'>35</div>  | C16         | XGPIOC[16] | 432 | MIPI_TX_CN |
|       |          |          | MIPI_TX_2P | 437 | XGPIOC[21]  | C21      | <div className='green'>34</div> | <div className='green'>33</div>  | C17         | XGPIOC[17] | 433 | MIPI_TX_CP |
|       |          |          |            |     |             | GND      | <div className='black'>32</div> | <div className='black'>31</div>  | GND         |            |     |            |
|       |          |          | MIPI_TX_1N | 430 | XGPIOC[14]  | C14      | <div className='green'>30</div> | <div className='green'>29</div>  | C12         | XGPIOC[12] | 428 | MIPI_TX_0N |
|       |          |          | MIPI_TX_1P | 431 | XGPIOC[15]  | C15      | <div className='green'>28</div> | <div className='green'>27</div>  | C13         | XGPIOC[13] | 429 | MIPI_TX_0P |

</div>

### 蓝色 LED 引脚

<div className='gpio_style'>

| NAME                            | SG2000     | NUM |
|:-------------------------------:|:----------:|:---:|
| <div className='blue'>LED</div> | XGPIOA[29] | 509 |

</div>

### 摄像头接口

DuoS 有两个 CSI 摄像头接连器：

- J1 是 16 PIN 间距为 0.5mm 与 Duo 和 Duo256M 摄像头兼容的连接器，可以直接使用 [CAM-GC2083](https://milkv.io/zh/docs/duo/camera/gc2083) 摄像头。
- J2 是 15 PIN 间距为 1.0mm 与树莓派摄像头接口兼容的连接器，目前可以支持在树莓派上使用的 OV5647 摄像头。

<Image src='/docs/duo/duos/duos-camera-csi-port.webp' maxWidth='50%' align='center' />

注意，J1 接口使用的 I2C 为 I2C3，J2 接口使用的 I2C 为 I2C2，使用时注意检查引脚复用配置。

#### J1 接口 FPC 线序

<div className='gpio_style'>

| J1 | Description         |
|:--:|:--------------------|
| 1  | GND                 |
| 2  | MIPI0_DN0           |
| 3  | MIPI0_DP0           |
| 4  | GND                 |
| 5  | MIPI0_DN1           |
| 6  | MIPI0_DP1           |
| 7  | GND                 |
| 8  | MIPI0_CKN           |
| 9  | MIPI0_CKP           |
| 10 | GND                 |
| 11 | SENSOR_RSTN0 (1.8V) |
| 12 | SENSOR_CLK0  (1.8V) |
| 13 | I2C3_SCL     (1.8V) |
| 14 | I2C3_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>

#### J2 接口 FPC 线序

<div className='gpio_style'>

| J2 | Description          |
|:--:|:---------------------|
| 1  | 3V3                  |
| 2  | I2C2_SDA     (3.3V)  |
| 3  | I2C2_SCL     (3.3V)  |
| 4  | SENSOR_CLK1  (3.3V)  |
| 5  | SENSOR_RSTN1 (3.3V)  |
| 6  | GND                  |
| 7  | MIPI0_DP5 (CAM1_CP)  |
| 8  | MIPI0_DN5 (CAM1_CN)  |
| 9  | GND                  |
| 10 | MIPI0_DP4 (CAM1_DP1) |
| 11 | MIPI0_DN4 (CAM1_DN1) |
| 12 | GND                  |
| 13 | MIPI0_DP3 (CAM1_DP0) |
| 14 | MIPI0_DN3 (CAM1_DN0) |
| 15 | GND                  |

</div>

### POE 接口

<Image src='/docs/duo/duos/duos-poe-pinout.webp' maxWidth='50%' align='left' />

<div className='gpio_style'>

| POE Pin | Description |
|:-------:|:-----------:|
| 1       | VB-         |
| 2       | VB+         |
| 3       | VA-         |
| 4       | VA+         |

</div>

## DuoS 使用指引

### RISC-V 与 ARM 切换

DuoS 的大核可以选择使用 RISC-V 或者 ARM，可以通过主板上的切换开关来设置，如果您在使用中发现 DuoS 不能正常启动，请先检查该切换开关和使用的固件是否一致。

<Image src='/docs/duo/duos/duos-arm-riscv-switch.webp' maxWidth='70%' align='center' />

如果连接了调试串口，可以在第一行开机日志中看到，以 `C` 开头时代表从 RISC-V 核启动，以 `B` 开头时代表从 ARM 核启动。

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```

### USB Type A 接口的使用

DuoS USB Type A 接口与 Type C 接口的 USB 功能是二选一的，不可以同时使用。默认固件配置的是 Type C 口的 USB 网口(USB-NCM)功能，如果需要切换为 Type A 口的 USB 2.0 HOST 口接 U 盘等设备使用，需要执行以下命令：

~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
然后执行 `reboot` 命令或重新上电使其生效。

比如 USB A 口接入 U 盘后，可以用 `ls /dev/sd*` 查看是否有检测到设备。

挂载到系统中查看 U 盘中的内容(以/dev/sda1为例)：
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
```
查看 `/mnt/udisk` 目录中的内容是否符合预期：
```
ls /mnt/udisk
```

卸载U盘的命令：
```
umount /mnt/udisk
```

想恢复 Type C 口 的 USB 网卡(USB-NCM)功能时，执行：
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-ncm.sh /mnt/system/usb.sh
sync
~~~
然后执行 `reboot` 命令或重新上电使其生效。

:::tip
DuoS 有板载以太网接口，所以 Type C 口的 USB 网口(USB-NCM)可以不用，一直保持切换为 A 口的 USB 2.0 Host 功能。
:::

### 固定网口 MAC 地址

DuoS 以太网口 MAC 地址是随机分配的，这可能会导致每次重启之后，路由器为网口分配的 IP 地址会变，为了解决这个问题，可以使用如下命令配置一个固定的 MAC 地址:

:::tip
**替换命令中的 MAC 地址为你想使用的地址，另外注意在同一网段中，不能出现重复的 MAC 地址**
:::

```
echo "pre-up ifconfig eth0 hw ether 78:01:B3:FC:E8:55" >> /etc/network/interfaces && sync
```
然后执行 reboot 命令或重新上电使其生效。

### UART 串口控制台

DuoS 主板上有预留 UART 调试串口，可以查看系统的启动日志，也可以在系统启动后登陆到控制台，执行一些终端命令。

#### USB-TTL 串口线

Duo 系列调试串口电平为 3.3V。

常见的 USB 转 TTL 串口线的引脚定义如下：

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

#### 连接串口

如下图所示，连接 USB 到 TTL 串口线，不要连接红线。

<div className='gpio_style'>

| Milk-V DouS | \<---> | USB 转 TTL 串口 |
| ----------- | ------ | -------------- |
| GND (pin 6) | \<---> | 黑色线          |
| TX (pin  8) | \<---> | 白色线          |
| RX (pin 10) | \<---> | 绿色线          |

</div>

<Image src='/docs/duo/duos/duos-serial-port.webp' maxWidth='100%' align='left' />

DuoS 默认的串口参数如下：

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

### WIFI 配置

#### 方法一

编辑如下文件，替换 `ssid` 和 `psk` 为要连接的 WIFI 账号和密码：

```python {6,7} title="/etc/wpa_supplicant.conf"
ctrl_interface=/var/run/wpa_supplicant
ap_scan=1
update_config=1

network={
  ssid="wifi_test"
  psk="12345678"
  key_mgmt=WPA-PSK
}
```

再执行如下命令：

```bash
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
```
即可连接 WIFI，连接之后可以通过 `ifconfig` 或者 `ip a` 命令查看分配的 IP 地址。

如果需要开机自动连接 WIFI，可以把以下命令放到 `/mnt/system/auto.sh` 文件中。

```bash
interface="wlan0"
max_attempts=100
attempt=0
log_file="/var/log/auto.sh.log"

# Continuously attempt to detect if the interface exists, up to $max_attempts times
echo "start auto.sh" > "$log_file"
while [ $attempt -lt $max_attempts ]; do
    # Check if the wlan0 interface exists
    ip link show "$interface" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "$(date +'%Y-%m-%d %H:%M:%S') $interface interface exists, starting wpa_supplicant..." >> "$log_file"
        wpa_supplicant -B -i "$interface" -c /etc/wpa_supplicant.conf >> "$log_file"
        break  # Exit the loop if the interface is found
    else
        echo "$(date +'%Y-%m-%d %H:%M:%S') $interface interface not found, waiting..." >> "$log_file"
        sleep 1  # Wait for 1 second before checking again
        attempt=$((attempt + 1))  # Increment the attempt counter
    fi
done

# If the maximum number of attempts is reached and the interface still not found, output an error message
if [ $attempt -eq $max_attempts ]; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') Interface $interface not found after $max_attempts attempts" >> "$log_file"
fi
```

### 固定 WIFI MAC 地址

DuoS WIFI MAC 地址是随机分配的，这可能会导致每次重启之后，路由器为 WIFI 分配的 IP 地址会变，可以使用如下命令为 WIFI 配置一个固定的 MAC 地址：

:::tip
**替换命令中的 MAC 地址为你想使用的地址，另外注意在同一网段中，不能出现重复的 MAC 地址**
:::

```bash
echo "MAC_ADDR=11:22:33:44:55:66" > /mnt/system/firmware/aic8800/rwnx_settings.ini && sync
```

然后执行 reboot 命令或重新上电使其生效。

### eMMC 版本固件烧录

DuoS eMMC 版本出厂未烧录固件，需要使用 PC 通过 USB 接口烧录。

:::tip
使用 Windows 下的 USB 烧录工具支持 eMMC 固件版本为 [V1.1.3](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/v1.1.3) 或[更新的版本](https://github.com/milkv-duo/duo-buildroot-sdk/releases)。
:::

#### Windows 环境下烧录

1. 安装驱动

   下载 USB 驱动安装工具：[CviUsbDownloadInstallDriver.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviUsbDownloadInstallDriver.zip)。下载后解压安装即可。

2. 下载烧录工具

   下载 Windows 下的命令行烧录工具 [CviBurn_v2.0_cli_windows.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviBurn_v2.0_cli_windows.zip)，下载后解压。

3. 下载固件

   下载 DuoS eMMC 最新版本的固件，当前是 [milkv-duos-emmc-v1.1.3-2024-0930.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/v1.1.3/milkv-duos-emmc-v1.1.3-2024-0930.zip)，可以在烧录工具 `CviBurn_v2.0_cli_windows` 目录下新建 rom 文件夹，并将下载好的 eMMC 固件压缩包解压到 rom 目录下，此时烧录工具的目录结构如下：

   ```
   └───CviBurn_v2.0_cli_windows
    │   cv_dl_magic.bin
    │   usb_dl.exe
    └───rom
        │   boot.emmc
        │   fip.bin
        │   partition_emmc.xml
        │   rootfs_ext4.emmc
        |   ...
   ```

   在 Windows 的终端中，`CviBurn_v2.0_cli_windows` 目录下执行烧录命令：

   ```
   .\usb_dl.exe -s linux -c cv181x -i .\rom
   ```

   *也可以把固件放到其他目录，通过命令中的 -i 参数指定到对应的目录即可。*

   显示等待 USB 连接的信息：

   <Image src='/docs/duo/duos/duos-emmc-install-01.webp' maxWidth='100%' align='center' />

   按住 DuoS 上的 recovery 按键，再用 **Type-C 数据线** 连接 DuoS 和 PC 。

   :::warning
   目前如果 DuoS 有插 SD 卡，请先将 SD 卡取下。
   :::

   <Image src='/docs/duo/duos/duos-emmc-install-02.jpg' maxWidth='100%' align='center' />
   
   松开 recovery 按键， DuoS 会上电并进入烧录模式，PC 端会实时显示烧录进度：

   ```
   [INFO] Waiting for USB device connection: ---
   [INFO] found usb device vid=0x3346 pid=0x1000
   [INFO] downloading file: .\rom\boot.emmc
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 3384664/213100824(1%)
   [INFO] downloading file: .\rom\rootfs_ext4.emmc
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 20161944/213100824(9%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 36939224/213100824(17%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 53716504/213100824(25%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 70493784/213100824(33%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 87271064/213100824(40%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 104048344/213100824(48%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 120825624/213100824(56%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 137602904/213100824(64%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 154380184/213100824(72%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 171157464/213100824(80%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 187934744/213100824(88%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 204712024/213100824(96%)
   [INFO] CVI_USB_PROGRAM
   [INFO] updated size: 213100696/213100824(99%)
   [INFO] USB download complete
   ```

   烧录完成后，DuoS 会自动重启，开机后看到 DuoS 上的蓝色 LED 闪烁，说明系统已经正常启动，烧录成功。

## 硬件资料

### 其他

[https://github.com/milkv-duo/duo-files/tree/main/duo-s](https://github.com/milkv-duo/duo-files/tree/main/duo-s)
