---
sidebar_label: '官方镜像和SDK'
sidebar_position: 40
---
# 官方镜像和SDK
## 镜像
- **(最新的)** [milkv-duo-20230616-2232.img](https://github.com/milkv-duo/milkv-duo-buildroot-sdk/releases/tag/20230616)  
    上传新图像和SDK:

    启用 ssh  
    启用 RNDIS  
    闪烁的LED  
    Root 密码: milkv  
    使用ssh通过RNDIS登录:  
    ~~~
    ssh root@192.168.42.1  
    ~~~
    如果你想关闭LED闪烁功能:  
    mv /mnt/system/blink.sh /mnt/system/blink.  sh_backup && sync  
    然后重新启动电路板  

## SDK
### Buildroot-sdk

  [Get it on GitHub](https://github.com/milkv-duo/duo-buildroot-sdk)
