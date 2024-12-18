---
sidebar_label: '安装操作系统'
sidebar_position: 10
---

# Milk-V Megrez 安装操作系统

## 启动说明

Megrez 主板支持从 SD 卡，eMMC 模块，SSD（M.2 SATA），SATA硬盘 四种介质启动系统。

:::tip
板载的 SPI Flash 用来存储 u-boot 等引导程序，再根据启动优先级来加载 eMMC 或 SSD 中的操作系统。
:::

## 系统镜像说明

目前 Megrez 的镜像包格式为img.zip。

- 后缀为 `.img.zip` 的系统镜像包

  - 支持通过 `balenaEtcher`，`Rufus`，`Win32DiskImager` 等工具烧录，Linux 下可使用 `dd` 命令烧录，这类工具有些支持直接烧录 zip 包，有些需要解压为 `.img` 文件后再烧录，请自行尝试。

## （推荐）使用 balenaEtcher 安装系统到 SD 卡/M.2 SATA SSD/SATA硬盘/eMMC 模块

需要准备：
- MicroSD 卡（大于16GB）/ M.2 SATA SSD / SATA 硬盘 / eMMC 模块
- SD 卡读卡器 / M.2 SATA 硬盘盒 / SATA 硬盘盒 / eMMC 模块读卡器

以使用 `balenaEtcher` 工具为例，烧录方法如下。

首先将 存储介质 通过读卡器插到 PC 上。安装系统到 指定硬盘 中会清除 存储介质 中原有数据，**注意提前备份硬盘中的重要文件**。

到资源下载页面下载对应的系统镜像包（后缀为 `.img.zip`）：[资源下载汇总](https://milkv.io/docs/megrez/getting-started/resources)。

下载后可以解压为 `.img`文件后烧录，可以不解压，`balenaEtcher` 支持加载 zip 包。

1. 下载镜像烧录工具 [balenaEtcher](https://etcher.balena.io/)，并安装。
2. 点击 `Flash from file` 选择下载好的镜像。
   <Image src='/docs/common/etcher-step1.webp' maxWidth='100%' align='left' />
3. 点击 `Select target` 选择 存储介质 。
   <Image src='/docs/common/etcher-step2.webp' maxWidth='100%' align='left' />
4. 点击 `Flash!` 开始烧录。
   <Image src='/docs/common/etcher-step3.webp' maxWidth='100%' align='left' />

烧录完成后，将 存储介质 插到 Megrez 主板上开机。系统目前没有开机后自动扩容功能，首次开机后，请按系统分区扩容章节中的方法对系统分区进行扩容。


## 使用 fastboot 安装系统到 SD 卡/M.2 SATA SSD/eMMC 模块

Coming soon

## 系统分区扩容

:::tip
系统目前没有开机后自动扩容功能，请在开机后首先手动扩容，否则系统会报空间不足，甚至在重启后无法进入桌面。
:::

下面以使用 `gparted` 工具为例说明如何扩容，您也可以使用您熟悉的其他工具完成扩容。

1. 安装 `gparted` 工具。
   ```bash
   sudo apt update
   sudo apt install gparted
   ```
2. 从命令行启动 `gparted` 程序，或者从菜单的应用列表中点击 `gparted` 应用。
   ```bash
   sudo gparted
   ```

3. 右上方选择 SD 卡设备，可以看到当前 SD 卡未分配的空间有 22G，根文件系统 rootfs `/` 为 6G。
   <Image src='/docs/jupiter/gparted-extend-01.webp' maxWidth='100%' align='left' />

4. 选中 rootfs `/` 分区，右键选择 `Resize/Move` 进行分区扩展。
   <Image src='/docs/jupiter/gparted-extend-02.webp' maxWidth='100%' align='left' />

5. 在 `New size` 中指定根文件系统的大小，建议至少 16G，填入 `16384`。也可以拖动顶部滑块调节大小。还可以将 `Free space following` 指定为 `0`，将 剩余空间全部划分绐根文件系统。
   <Image src='/docs/jupiter/gparted-extend-03.webp' maxWidth='100%' align='left' />

6. 修改好之后点击 `Resize`
   <Image src='/docs/jupiter/gparted-extend-04.webp' maxWidth='100%' align='left' />

7. 可以看到当前 rootfs `/` 已经修改为 16G，点菜单中的`勾号`按钮开始执行变更。
   <Image src='/docs/jupiter/gparted-extend-05.webp' maxWidth='100%' align='left' />
   弹出提示，选择 `Apply`。
   <Image src='/docs/jupiter/gparted-extend-06.webp' maxWidth='100%' align='left' />

8. 待变更完成后，最终分区情况如下。
   <Image src='/docs/jupiter/gparted-extend-07.webp' maxWidth='100%' align='left' />

   ## 更新/重刷 U-boot

   ### U-Boot 可用时
   Coming soon

   ### U-boot 不可用时
   Coming soon