---
sidebar_label: '使用 OpenMediaVault NAS'
sidebar_position: 15
---

# 使用 OpenMediaVault NAS 系统

OpenMediaVault 简称 OMV，是基于 Debian Linux 的网络附加存储 (NAS) 解决方案。它包含 SSH、(S)FTP、SMB/CIFS、DAAP 媒体服务器、RSync、BitTorrent 客户端等服务。

## 使用 Bianbu NAS 镜像

Jupiter 的 Bianbu NAS 镜像中已经集成 OpenMediaVault，您可以参考 [资源下载汇总](https://milkv.io/zh/docs/jupiter/getting-started/resources) 页面下载对应的固件。

镜像文件名格式为：milkv-jupiter-bianbu-\*-`nas`-\*.zip

下载后参考 [安装操作系统](https://milkv.io/zh/docs/jupiter/getting-started/boot) 中的方法进行安装。

开机后通过串口中执行 `ip a` 命令或者查看路由器后台等方式获取到 Jupiter 的 IP 地址，在 PC 的浏览器中通过该 IP 访问 `OpenMediaVault` 后台 Web 界面。

  - 后台 Web 管理员账号： `admin`
  - 密码： `openmediavault`

<Image src='/docs/jupiter/jupiter-openmediavault-zh.webp' maxWidth='100%' align='left' />

