---
sidebar_label: '常用设置'
sidebar_position: 20
---

# 常用设置

## UART 串口控制台

Megrez 主板上有预留一个 UART 调试串口，可以查看系统的启动日志，也可以在系统启动后登陆到控制台，执行一些终端命令。

### USB 转串口线

常见的 USB 转 TTL 串口线的引脚定义如下：

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

### 连接串口

调试串口电平为 3.3V，如下图所示，连接 USB 转 TTL 串口模块，不要连接红色线。

<div className='gpio_style'>

| Milk-V Megrez | \<---> | USB 转 TTL 线 |
| :-----------: | :----: | :------------ |
|      GND      | \<---> | 黑线          |
|      RX       | \<---> | 绿线 (TX)     |
|      TX       | \<---> | 白线 (RX)     |

</div>

<Image src='/docs/megrez/megrez-ttl.webp' maxWidth='100%' align='left' />

Megrez 默认的串口参数如下：
```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

## 释放 NPU 占用的内存

在系统启动后，系统的内存容量要小于标称值，比如 16G 内存的版本，通过命令查看内存为 10G 左右：

```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:           9.7Gi       471Mi       8.9Gi       9.3Mi       426Mi       9.2Gi
Swap:             0B          0B          0B
```

这是因为有一部分内存被分配绐了 NPU 使用，如果您不需要 NPU 功能，可以使用如下方法将 NPU 占用的内存释放出来。

:::caution
释放 NPU 占用的内存会失去 NPU 以及相关的编解码功能！如果系统内存满足使用需求，不建议释放 NPU 所用内存！
:::

### 替换设备树

下载该 dtb 文件：
[eic7700-milkv-megrez-no-npu.dtb](https://github.com/milkv-megrez/megrez-files/blob/main/software/dtb/eic7700-milkv-megrez-no-npu.dtb?raw=true)

备份原系统使用的 dtb 文件：
```
sudo cp /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb_bak
```

替换下载的 dtb 文件：
```
sudo cp -rf eic7700-milkv-megrez-no-npu.dtb /boot/dtbs/linux-image-6.6.66-win2030/eswin/eic7700-milkv-megrez.dtb
```

同步后重启设备：
```
sync
sudo reboot
```

重启后再次查看内存信息，已经变为 16G 左右：
```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       858Mi        14Gi        10Mi       764Mi        14Gi
Swap:             0B          0B          0B
```
