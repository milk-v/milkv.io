---
sidebar_label: '烧录 BMC 镜像'
sidebar_position: 3
---

# 烧录 BMC 镜像

:::info
你的 Titan 出厂时已预装 BMC 固件，开箱即用。正常情况下，你无需自行烧录固件。

本指南适用于以下特定场景：
- BMC 出现故障需要排查问题时
- 需要升级到新版本的 BMC 固件时
:::

本指南介绍如何使用 AiBurn 工具将 BMC 固件镜像烧录到你的 Milk-V Titan BMC。

## 准备工作

开始之前，请准备以下内容：

- **Windows 电脑**：AiBurn 工具仅支持 Windows 操作系统
- **USB Type-C 数据线**：用于连接 BMC 到电脑
- **12V DC 电源适配器（5525 接口，5A 或以上）**：烧录完成后为 Titan 供电

## 步骤 1：下载所需文件

### 下载 AiBurn 工具

从官方仓库下载 AiBurn 烧录工具：

**下载链接**：[https://github.com/milkv-titan/titan-files/tree/main/bmc](https://github.com/milkv-titan/titan-files/tree/main/bmc)

下载后，在你的 Windows 电脑上安装 AiBurn。

### 下载 BMC 镜像

从同一仓库下载最新的 BMC 固件镜像：

**下载链接**：[https://github.com/milkv-titan/titan-files/tree/main/bmc](https://github.com/milkv-titan/titan-files/tree/main/bmc)

**重要提示**：下载后，需要先解压镜像文件，然后再加载到 AiBurn 中。

## 步骤 2：加载镜像

1. 在 Windows 电脑上启动 AiBurn 应用程序

2. 点击文件夹图标选择镜像文件

<Image src='/docs/titan/bmc/burn-01-select-image.webp' maxWidth='100%' align='left' />

3. 导航到已解压的 BMC 镜像文件并选择它

## 步骤 3：连接设备

:::warning 重要提示
**烧录过程中不要连接 12V DC 电源适配器。** BMC 必须仅通过 USB 供电才能进入烧录模式。只有在烧录完成后才连接 12V 电源。
:::

要进入烧录模式，请仔细按照以下步骤操作：

1. 参考 [Titan 硬件](/docs/titan/getting-started/hardware) 页面的接口图，找到 **BMC Boot 按键**和 **BMC USB Type-C 接口**

2. 确保 **12V DC 电源适配器未连接**到 Titan

3. **按住** BMC Boot 按键

4. 在按住按键的同时，连接 USB Type-C 数据线：
   - 一端连接到 Windows 电脑
   - 另一端连接到 Titan 的 BMC USB Type-C 接口

5. **松开** BMC Boot 按键

6. AiBurn 工具将检测到设备连接

<Image src='/docs/titan/bmc/burn-02-device-connected.webp' maxWidth='100%' align='left' />

当设备成功连接后，你将在工具中看到"设备已连接"状态。

## 步骤 4：开始烧录

1. 点击**开始**按钮开始烧录过程

<Image src='/docs/titan/bmc/burn-03-burning.webp' maxWidth='100%' align='left' />

2. 工具将显示：
   - **进度**：当前烧录进度百分比
   - **速度**：数据传输速度
   - **警告**："正在烧录，请勿断开设备"

3. 等待烧录过程完成。在此过程中**请勿断开 USB 数据线**。

## 步骤 5：验证成功

烧录完成后，你将看到：

<Image src='/docs/titan/bmc/burn-04-success.webp' maxWidth='100%' align='left' />

- **结果**：SUCCESS（绿色显示）
- **进度**：100%

## 步骤 6：启动系统

烧录成功后：

1. **断开** BMC 接口的 USB Type-C 数据线

2. 连接 **12V DC 电源适配器**（5525 接口，5A 或以上）到 Titan

3. BMC 系统将自动启动

4. 等待片刻让 BMC 完全启动

5. 现在你可以按照[用户指南](/docs/titan/bmc/user-guide)访问 BMC Web 界面

---

## 故障排除

### 设备未检测到

如果 AiBurn 未检测到设备：

- 确保在连接 USB 数据线之前按住了 BMC Boot 按键
- 尝试更换 USB Type-C 数据线
- 检查电脑上的 USB 接口是否正常工作
- 重启 AiBurn 并重试

### 烧录失败

如果烧录过程失败：

- 不要断开设备连接
- 点击开始按钮重试
- 如果持续失败，重新下载 BMC 镜像并确认已正确解压
- 确保 USB 连接稳定

### 烧录后系统无法启动

如果烧录后 BMC 无法启动：

- 确认电源适配器已正确连接（12V DC，5A 或以上，5525 接口）
- 等待至少 1-2 分钟进行初次启动
- 尝试电源循环：断开并重新连接电源适配器
- 如果问题持续存在，尝试重新烧录镜像
