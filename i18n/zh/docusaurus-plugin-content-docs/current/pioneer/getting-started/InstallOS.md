---
sidebar_label: '安装操作系统'
sidebar_position: 21
---
# 操作系统的安装步骤

## 1. 准备工作

### 1.1 工具准备
在开始安装之前，请准备以下工具：
- MicroSD卡（至少大于16G）
- MicroSD读卡器
- 串口模块

### 1.2 软件准备
- 下载并安装 [balenaEtcher](https://etcher.balena.io/)
- 下载 [镜像](https://milkv.io/docs/pioneer/getting-started/download)  
 在 [下载页面](https://milkv.io/docs/pioneer/getting-started/download) 中选择所需镜像, 这里以Fedora 38为例。

![downloadpage](/docs/pioneer/downloadpage.png)
## 2. 将程序刻录到MicroSD卡上

### 2.1 使用BalenaEtcher来刻录镜像
a.点击Flash from file按钮，选择 
fedora-disk-gnome-workstation_riscv64-f38-20230515-035559-milkv.raw.xz（以下简称**fedora38.raw.xz**），你要使用的。

b.点击选择目标按钮，选择microSD卡，将fedora38.raw.xz写入其中。

c.点击Flash！按钮，开始这个过程。 

![balena-etcher](/docs/pioneer/balena-etcher.png)
### 2.2 安装Pioneer
将烧好的microSD卡插入 Pioneer 的microSD卡槽。

## 3. 从microSD卡启动

### 3.1 开启电源
点开启动按钮，启动Pioneer。

### 3.2 设置一个账户
安装向导设置了账户密码。

### 3.3 完成了! 开始使用Fedora 38
![fedora38](/docs/pioneer/fedora38.png)
