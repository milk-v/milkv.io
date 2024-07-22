---
sidebar_label: '使用 Kodbox'
sidebar_position: 20
---

# 使用 Kodbox

[Kodbox](https://kodcloud.com/product/kodbox/) 是一个基于网页的文件管理系统，旨在提供简单高效的文件存储、共享和协作功能。用户只需通过简单环境搭建，即可使用 KodBox 快速完成私有云/私有网盘/在线文档管理系统的部署和搭建。

KOD 提供了类 Windows 用户界面，延续了 Windows 平台的操作逻辑和使用习惯，支持100余种文件格式的在线预览，使得用户的私有云产品可以拥有本地操作一样方便、快捷、安全的体验；为企业用户提供了了文件在线存储与管理、分享和跨平台访问、群组与权限、生产流转、审批存档等全生命周期的在线文档管理的解决方案。

## 使用集成了 Kodbox 的 Bianbu 镜像

我们发布的 Bianbu 镜像中已经包含了集成 Kodbox 的镜像，您可以参考 [资源下载汇总](https://milkv.io/zh/docs/jupiter/getting-started/resources) 页面下载对应的固件。

镜像文件名格式为：milkv-jupiter-bianbu-\*-`kodbox`-\*.zip

下载后参考 [安装操作系统](https://milkv.io/zh/docs/jupiter/getting-started/boot) 中的方法进行安装。

开机后通过串口中执行 `ip a` 命令或者查看路由器后台等方式获取到 Jupiter 的 IP 地址，在 PC 的浏览器中通过该 IP 访问 Kodbox 后台 Web 界面，按照指导简单设置后即可使用。

<Image src='/docs/jupiter/jupiter-kodbox-desktop-zh.webp' maxWidth='100%' align='left' />

<Image src='/docs/jupiter/jupiter-kodbox-explorer-zh.webp' maxWidth='100%' align='left' />
