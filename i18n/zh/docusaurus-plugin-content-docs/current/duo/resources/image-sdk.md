---
sidebar_label: '官方镜像和SDK'
sidebar_position: 10
---
# 官方镜像和SDK

## 镜像

### V1 版本镜像

镜像地址: [https://github.com/milkv-duo/duo-buildroot-sdk/releases/](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)

### V2 版本镜像

V2 版本支持 Duo256M 和 DuoS 的 ARM 核的镜像。

镜像地址：[https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/)

### 镜像描述

默认启用 ssh。

默认启用 USB-NCM 网络。

蓝色LED闪烁。

root 密码: `milkv`
使用 ssh 通过 USB-NCM 登录：
~~~
ssh root@192.168.42.1
~~~

如果你想关闭 LED 闪烁功能：
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
然后执行 `reboot` 命令或者重新上电。

也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不闪了。

如果需要恢复 LED 闪烁，再将其名字改回来，重启即可。
```
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```
然后执行 reboot 命令或者重新上电

底板 IO-Board 的使用方法：[https://milkv.io/zh/docs/duo/io-board/usb-ethernet-iob](https://milkv.io/zh/docs/duo/io-board/usb-ethernet-iob)

## SDK 源码

### Milk-V Duo 官方 buildroot SDK V1
duo-buildroot-sdk: [https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

### Milk-V Duo 官方 buildroot SDK V2
duo-buildroot-sdk-v2: [https://github.com/milkv-duo/duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2)

### Milk-V Duo 官方 C/C++ 应用开发参考示例
duo-examples: [https://github.com/milkv-duo/duo-examples](https://github.com/milkv-duo/duo-examples
)

### Milk-V Duo 官方 TDL-SDK TPU AI 应用开发参考示例

duo-tdl-examples: [https://github.com/milkv-duo/duo-tdl-examples](https://github.com/milkv-duo/duo-tdl-examples)
