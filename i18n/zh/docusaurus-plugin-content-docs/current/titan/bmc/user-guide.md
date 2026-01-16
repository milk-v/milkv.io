---
sidebar_label: '用户指南'
sidebar_position: 2
---

# Titan BMC 用户使用指南

## 目录

1. [简介](#简介)
2. [系统初始化](#系统初始化)
3. [登录系统](#登录系统)
4. [主界面介绍](#主界面介绍)
5. [节点管理](#节点管理)
6. [连接终端](#连接终端)
   - [连接 UART 终端](#连接-uart-终端)
   - [连接 TTY 终端](#连接-tty-终端)
7. [节点配置](#节点配置)
8. [安装 Agent](#安装-agent)

---

## 简介

Titan BMC 是一个用于管理 Milk-V Titan 的 Web 管理工具。它提供了以下主要功能：

- **节点监控**：查看节点状态、资源使用情况
- **终端访问**：通过 UART 或 TTY 连接到节点终端
- **电源管理**：控制节点的启动和关闭
- **Agent 管理**：在节点上安装和移除管理代理

---

## 系统初始化

首次访问 Titan BMC 时，需要进行系统初始化，创建管理员账户。

### 初始化步骤

1. 在路由器的管理界面或 DHCP 客户端列表中查找 BMC 的 IP 地址

2. 打开浏览器，访问 `http://<BMC_IP>:8000`（将 `<BMC_IP>` 替换为你的 BMC 实际 IP 地址）

3. 系统会自动跳转到初始化页面

<Image src='/docs/titan/bmc/00-initialization.webp' maxWidth='100%' align='left' />

4. 填写管理员信息：
   - **Admin username**：输入管理员用户名（例如：`root`）
   - **Admin password**：输入管理员密码（例如：`root1234`）
   - **Confirm password**：再次输入密码确认

<Image src='/docs/titan/bmc/00-initialization-filled.webp' maxWidth='100%' align='left' />

5. 点击 **Initialize database** 按钮

6. 初始化成功后，显示 "Initialization completed" 提示

<Image src='/docs/titan/bmc/00-initialization-success.webp' maxWidth='100%' align='left' />

7. 点击 **Back to home** 按钮返回登录页面

**注意：**
- 初始化只需要执行一次
- 请妥善保管管理员账户信息
- 密码建议使用强密码，包含字母、数字和特殊字符

---

## 登录系统

完成初始化后，可以使用创建的管理员账户登录系统。

1. 在登录页面输入用户名和密码：
   - **用户名**：初始化时设置的用户名（例如：`root`）
   - **密码**：初始化时设置的密码（例如：`root1234`）

2. 点击 **Login** 按钮登录

<Image src='/docs/titan/bmc/01-login.webp' maxWidth='100%' align='left' />

---

## 主界面介绍

登录成功后，你将看到主界面，包含以下部分：

<Image src='/docs/titan/bmc/02-main-dashboard.webp' maxWidth='100%' align='left' />

### 界面布局

1. **顶部导航栏**
   - 左侧：Milk-V Cluster Pilot 标题和版本号
   - 右侧：当前用户名和退出按钮

2. **左侧边栏**
   - **节点列表**：显示所有可用节点（BMC、Titan 等）
   - 点击节点名称可切换到该节点

3. **中间菜单栏**
   - **Summary**：节点概览信息
   - **Console**：终端控制台
   - **Config**：节点配置

4. **主内容区域**
   - 显示当前选中节点的详细信息

### 节点信息面板

主界面显示两个主要信息区域：

**Node info（节点信息）**
- Node：节点名称
- IP：节点 IP 地址
- Status：节点状态（Online/Offline）
- Last check：最后检查时间

**Resource usage（资源使用情况）**
- Memory：内存使用百分比
- CPU：CPU 使用百分比
- Disk：磁盘使用百分比

---

## 节点管理

### 查看节点列表

在左侧边栏可以看到所有可用节点：

- **BMC**：基板管理控制器节点
- **Titan**：计算节点

### 切换节点

点击左侧边栏中的节点名称即可切换到该节点，查看其详细信息。

<Image src='/docs/titan/bmc/03-titan-node.webp' maxWidth='100%' align='left' />

### 节点操作按钮

在节点标题栏右侧有以下操作按钮：

- **Start**：启动节点（节点关闭时可用）
- **Shutdown**：关闭节点
- **UART/TTY**：快速访问终端（下拉菜单）

---

## 连接终端

Titan BMC 支持两种终端连接方式：

1. **UART**：通过串口连接，适用于系统启动、调试等场景
2. **TTY**：通过 UART 协议连接的 PTY，需要节点上安装 Agent

### 连接 UART 终端

1. 选择目标节点（如 Titan）

2. 点击左侧菜单的 **Console**

3. 确认终端类型为 **UART**

4. 点击 **Connect** 按钮

<Image src='/docs/titan/bmc/04-console-uart.webp' maxWidth='100%' align='left' />

5. 连接成功后，状态显示为 **Connected**，终端窗口显示 `[Connected]`

<Image src='/docs/titan/bmc/05-uart-connected.webp' maxWidth='100%' align='left' />

6. 现在可以在终端中输入命令，与节点交互

7. 使用完毕后，点击 **Disconnect** 断开连接

### 连接 TTY 终端

TTY 终端提供更好的交互体验，但需要在节点上安装 Agent。

1. 选择目标节点

2. 点击左侧菜单的 **Console**

3. 点击顶部的终端类型下拉菜单（**UART** 旁边的箭头）

4. 选择 **TTY**

<Image src='/docs/titan/bmc/06-tty-connected.webp' maxWidth='100%' align='left' />

5. 系统会自动连接到 TTY 终端

6. 连接成功后，状态显示为 **Connected Channel X**（X 为通道号）

7. 终端显示 shell 提示符（如 `ubuntu@ubuntu:~$`），可以正常使用

**TTY 终端优势：**
- 支持多个并发会话（多个 Channel）
- 更好的终端仿真（颜色、光标控制等）
- 可以指定登录用户

**注意：** 使用 TTY 终端前，需要在节点上安装 Agent（参见[安装 Agent](#安装-agent)）

### 在模态窗口中打开终端

为了获得更好的终端体验，你可以在模态窗口中打开终端，支持多标签功能。

1. 在页面顶部的快捷操作栏中，点击 **TTY** 按钮旁边的下拉箭头

2. 点击 **TTY** 右侧的**在新窗口打开**图标（外部链接图标）

<Image src='/docs/titan/bmc/11-modal-terminal-tabs.webp' maxWidth='100%' align='left' />

3. 将打开一个包含终端的模态窗口

**模态终端功能：**
- **多标签支持**：点击 **+** 按钮可以创建新的终端标签（TTY 0、TTY 1、TTY 2 等）
- **独立会话**：每个标签运行独立的终端会话，拥有自己的通道
- **轻松切换**：点击标签名称即可在不同终端会话之间切换
- **关闭标签**：点击每个标签上的 **×** 按钮可以关闭该标签
- **全屏模式**：点击最大化按钮可以将终端扩展到全屏

这个多标签功能在需要同时使用多个终端会话时特别有用，例如在一个标签中监控日志，同时在另一个标签中执行命令。

---

## 节点配置

### 访问配置页面

1. 选择目标节点

2. 点击左侧菜单的 **Config**

<Image src='/docs/titan/bmc/07-config-page.webp' maxWidth='100%' align='left' />

### 配置选项

**Node name（节点名称）**
- 自定义节点的显示名称

**AC Power On（交流电源开启）**
- 启用后，节点在通电时自动启动
- 禁用后，需要手动启动节点

**Agent manage（Agent 管理）**
- **Install Agent**：在节点上安装管理代理
- **Remove Agent**：从节点上移除管理代理

**Default TTY user（默认 TTY 用户）**
- 设置 TTY 终端连接时使用的默认用户名
- 默认为 `ubuntu`

### 保存配置

修改配置后，点击 **Save config** 按钮保存更改。

---

## 安装 Agent

要使用 TTY 终端和高级管理功能，需要在节点上安装 Agent。

### 安装前准备

- 确保目标节点已启动
- 准备节点的登录凭据（用户名和密码）
- 确保节点上已安装 Python 3 和必要的系统工具

### 安装步骤

1. **选择目标节点**

   在左侧边栏点击要安装 Agent 的节点（例如：Titan）

2. **进入配置页面**

   点击左侧菜单的 **Config**

3. **启动安装向导**

   在 **Agent manage** 部分，点击 **Install Agent** 按钮

4. **输入节点凭据**

   在弹出的对话框中输入节点的登录信息：
   - **Username**：节点的用户名（例如：`ubuntu`）
   - **Password**：节点的密码

   <Image src='/docs/titan/bmc/08-install-agent-dialog.webp' maxWidth='100%' align='left' />

   **注意：** 
   - 这些凭据仅在安装过程中使用，不会被保存
   - 输入的用户名需要具有 root 或 sudo 权限才能安装 Agent

   <Image src='/docs/titan/bmc/08-install-agent-filled.webp' maxWidth='100%' align='left' />

5. **确认安装**

   点击 **Confirm** 按钮开始安装

6. **监控安装过程**

   系统会自动打开 BMC TTY 终端窗口，显示安装进度：
   - 验证节点环境
   - 传输 Agent 安装器
   - 安装依赖和配置服务
   - 启动 Agent 服务

   <Image src='/docs/titan/bmc/09-install-agent-running.webp' maxWidth='100%' align='left' />

   <Image src='/docs/titan/bmc/09-install-agent-progress.webp' maxWidth='100%' align='left' />

7. **安装完成**

   当终端显示 "Installation completed successfully" 和 "Deployment succeeded" 时，表示安装成功

   <Image src='/docs/titan/bmc/10-install-agent-complete.webp' maxWidth='100%' align='left' />

8. **验证安装**

   安装完成后，可以：
   - 在 **Console** 页面切换到 TTY 终端
   - 检查节点状态是否显示 IP 地址
   - 尝试连接 TTY 终端验证功能

### 安装过程说明

安装脚本会自动执行以下操作：

1. **环境检查**
   - 检查 Python 版本（需要 Python 3.x）
   - 检查必要的系统工具（base64、systemctl 等）
   - 验证 UART 设备（/dev/ttyS3）

2. **停止冲突服务**
   - 停止可能占用串口的 serial-getty 服务

3. **安装 Agent**
   - 传输 Agent 安装器到节点
   - 解压并安装到 `/opt/bmc-agent/`
   - 创建 systemd 服务文件

4. **启动服务**
   - 启动 bmc-agent.service
   - 验证服务运行状态
   - 建立与 BMC 的通信连接

### 移除 Agent

如果需要移除 Agent：

1. 在 **Config** 页面的 **Agent manage** 部分

2. 点击 **Remove Agent** 按钮

3. 系统会停止并移除 Agent 服务

### 故障排除

**安装失败怎么办？**

1. 检查节点凭据是否正确
2. 检查节点是否正常启动
3. 查看安装日志中的错误信息
4. 尝试手动 SSH 连接到节点，验证访问权限

**Agent 服务无法启动？**

1. 检查 Python 版本是否满足要求（Python 3.x）
2. 确保 /dev/ttyS3 设备存在且可访问
3. 检查 systemd 日志：`sudo journalctl -u bmc-agent.service`

---

## 常见问题

### Q: 无法连接 UART 终端？

**A:** 检查以下几点：
- 节点是否已启动
- 是否有其他用户正在使用 UART 连接

### Q: TTY 终端显示 "Connecting..." 不连接？

**A:** 可能的原因：
- 节点上未安装 Agent，请先安装 Agent
- Agent 服务未启动，尝试重新安装 Agent

### Q: 如何在 TTY 终端中使用不同的用户？

**A:** 
1. 在 **Config** 页面设置 **Default TTY user**
2. 保存配置
3. 重新连接 TTY 终端

### Q: 终端窗口大小不合适？

**A:** 
- 调整浏览器窗口大小，终端会自动适应
- 刷新页面重新连接

---

## 技术支持

如有问题或建议，请联系技术支持团队。

**版本：** v0.2.1
