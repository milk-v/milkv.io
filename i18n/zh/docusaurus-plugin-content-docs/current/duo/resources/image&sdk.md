---
sidebar_label: '官方镜像和SDK'
sidebar_position: 40
---
# 官方镜像和SDK

## 镜像
- **(最新的)** [milkv-duo-xxx.img.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)  
    上传新镜像和SDK:

    启用 ssh  
    启用 RNDIS  
    LED闪烁  
    root 密码: milkv  
    使用ssh通过RNDIS登录:  
    ~~~
    ssh root@192.168.42.1  
    ~~~
    如果你想关闭LED闪烁功能:
    ```
    mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
    ```
    然后执行reboot命令或者重新上电

    也就是将LED闪烁脚本改名，重启Duo后，LED就不闪了

    如果需要恢复LED闪烁，再将其名字改回来，重启即可

    ```
    mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
    ```
    然后执行reboot命令或者重新上电

    [底板 IO-Board 的使用方法](https://milkv.io/zh/docs/duo/io-board/usb&ethernet_iob)

## SDK

### Milk-V Duo 官方 buildroot SDK
duo-buildroot-sdk [https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

### Milk-V Duo 官方 C/C++ 应用开发参考样例
duo-examples [https://github.com/milkv-duo/duo-examples](https://github.com/milkv-duo/duo-examples
)

