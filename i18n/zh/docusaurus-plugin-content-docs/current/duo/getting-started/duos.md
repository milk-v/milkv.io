---
sidebar_label: 'Duo S(SG2000)'
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

Milk-V 是 SG2002 芯片的全球授权经销商。您可以直接从我们的经销商 [Arace](https://arace.tech/products/sophon-cv1800b-5pcs) 购买 SG2002 芯片的样品。如需批量订购，请联系 [Milk-V 销售团队](mailto:sales@milkv.io) 获取报价。

## DuoS GPIO 引脚分配

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='center' />

### 排针 J3

<div className='gpio_style'>

| SPI      | PWM  | I2C               | UART     | NAME  | PIN                              | PIN                             | NAME | UART               | PWM  | SPI     | JTAG      |
|:---------|:-----|:------------------|:---------|------:|:--------------------------------:|:-------------------------------:|:-----|:-------------------|:-----|:--------|:----------|
|          |      |                   |          | 3V3   | <div className='orange'>1</div>  | <div className='red'>2</div>    | VSYS |                    |      |         |           |
|          | PWM3 | I2C3_SDA/I2C4_SCL |          | B20   | <div className='green'>3</div>   | <div className='red'>4</div>    | VSYS |                    |      |         |           |
|          |      | I2C3_SCL/I2C4_SDA |          | B21   | <div className='green'>5</div>   | <div className='black'>6</div>  | GND  |                    |      |         |           |
|          |      | I2C1_SCL          |          | B18   | <div className='green'>7</div>   | <div className='green'>8</div>  | A16  | UART0_TX/UART1_TX  | PWM4 |         |           |
|          |      |                   |          | GND\* | <div className='black'>9</div>   | <div className='green'>10</div> | A17  | UART0_RX/UART1_RX  | PWM5 |         |           |
|          | PWM1 | I2C1_SDA          | UART2_TX | B11   | <div className='green'>11</div>  | <div className='green'>12</div> | B19  | UART2_TX           | PWM2 |         |           |
|          | PWM2 | I2C1_SCL          | UART2_RX | B12   | <div className='green'>13</div>  | <div className='black'>14</div> | GND  |                    |      |         |           |
|          |      |                   | UART2_RX | B22   | <div className='green'>15</div>  | <div className='green'>16</div> | A20  |                    |      |         | JTAG_TRST |
|          |      |                   |          | 3V3   | <div className='orange'>17</div> | <div className='green'>18</div> | A19  | UART1_TX/UART1_RTS | PWM7 |         | JTAG_TMS  |
| SPI3_SDO | PWM3 | I2C2_SCL          |          | B13   | <div className='green'>19</div>  | <div className='black'>20</div> | GND  |                    |      |         |           |
| SPI3_SDI |      | I2C2_SDA          |          | B14   | <div className='green'>21</div>  | <div className='green'>22</div> | A18  | UART1_RX/UART1_CTS | PWM6 |         | JTAG_TCK  |
| SPI3_SCK |      |                   | UART2_TX | B15   | <div className='green'>23</div>  | <div className='green'>24</div> | B16  | UART2_RX           |      | SPI3_CS |           |
|          |      |                   |          | GND   | <div className='black'>25</div>  | <div className='green'>26</div> | A28  | UART2_TX/UART1_TX  |      |         |           |


</div>

`排针 J3` 上的 GPIO 使用 3.3V 逻辑电平。

*GND\*：引脚 9 在 V1.1 版本硬件中是一个低电平的 GPIO，在 V1.2 及更高版本硬件中为 GND。*

### 排针 J4

<div className='gpio_style'>

| PWM   | I2C               | UART     | NAME | PIN                             | PIN                              | NAME        | I2C      | PWM   | SD      | SPI       |
|:------|:------------------|:---------|-----:|:-------------------------------:|:--------------------------------:|:------------|:---------|:------|:--------|:----------|
|       |                   |          | VSYS | <div className='red'>52</div>   | <div className='blue'>51</div>   | AUDIO_OUT_R |          |       |         |           |
| PWM12 | I2C4_SCL          | UART3_TX | B1   | <div className='green'>50</div> | <div className='blue'>49</div>   | AUDIO_OUT_L |          |       |         |           |
| PWM13 | I2C4_SDA          | UART3_RX | B2   | <div className='green'>48</div> | <div className='blue'>47</div>   | AUDIO_IN_R  |          |       |         |           |
|       |                   |          | B3   | <div className='green'>46</div> | <div className='blue'>45</div>   | AUDIO_IN_L  |          |       |         |           |
| PWM10 | I2C2_SDA          |          | E2   | <div className='green'>44</div> | <div className='orange'>43</div> | 3V3         |          |       |         |           |
| PWM9  | I2C2_SCL          | UART2_RX | E1   | <div className='green'>42</div> | <div className='green'>41</div>  | C18         | I2C1_SDA | PWM12 | SD1_CLK |           |
| PWM8  |                   | UART2_TX | E0   | <div className='green'>40</div> | <div className='green'>39</div>  | C19         | I2C1_SCL | PWM13 | SD1_CMD |           |
|       |                   |          | GND  | <div className='black'>38</div> | <div className='black'>37</div>  | GND         |          |       |         |           |
| PWM14 | I2C1_SDA/I2C2_SDA |          | C20  | <div className='green'>36</div> | <div className='green'>35</div>  | C16         | I2C1_SDA | PWM8  | SD1_D2  | SPI0_SCK  |
| PWM15 | I2C1_SCL/I2C2_SCL |          | C21  | <div className='green'>34</div> | <div className='green'>33</div>  | C17         | I2C1_SCL | PWM9  | SD1_D3  | SPI0_CS_X |
|       |                   |          | GND  | <div className='black'>32</div> | <div className='black'>31</div>  | GND         |          |       |         |           |
| PWM10 | I2C2_SDA          |          | C14  | <div className='green'>30</div> | <div className='green'>29</div>  | C12         |          | PWM14 |         |           |
| PWM11 | I2C2_SCL          |          | C15  | <div className='green'>28</div> | <div className='green'>27</div>  | C13         |          | PWM15 |         |           |

</div>

`排针 J4` 上的 GPIO E0/E1/E2 使用 3.3V 逻辑电平，其他 GPIO 使用 1.8V 逻辑电平。

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

DuoS USB Type A 接口与 Type C 接口的 USB 功能是二选一的，不可以同时使用。默认固件配置的是 Type C 口的 USB 网口(RNDIS)功能，如果需要切换为 Type A 口的 USB 2.0 HOST 口接 U 盘等设备使用，需要执行以下命令：

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

想恢复 Type C 口 的 USB 网卡(RNDIS)功能时，执行：
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-rndis.sh /mnt/system/usb.sh
sync
~~~
然后执行 `reboot` 命令或重新上电使其生效。

:::tip
DuoS 有板载以太网接口，所以 Type C 口的 USB 网口(RNDIS)可以不用，一直保持切换为 A 口的 USB 2.0 Host 功能。
:::

### UART 串口控制台

如下图所示，连接USB到TTL串口模块，不要连接红线。

| Milk-V DouS | \<---> | USB 转 TTL 串口 |
| ----------- | ------ | -------------- |
| GND (pin 6) | \<---> | 黑色线          |
| TX (pin  8) | \<---> | 白色线          |
| RX (pin 10) | \<---> | 绿色线          |

<Image src='/docs/duo/duos/duos-serial-port.webp' maxWidth='100%' align='center' />

Duo u-boot 和内核控制台的默认串行设置是：

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

:::tip
如果需要开机自动连网，可以把该命令放到 `/mnt/system/auto.sh` 文件中。
:::
