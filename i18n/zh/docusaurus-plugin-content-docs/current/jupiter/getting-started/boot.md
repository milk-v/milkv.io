---
sidebar_label: '安装操作系统'
sidebar_position: 10
---

# Milk-V Jupiter 安装操作系统

## 启动说明

Jupiter 主板支持从 SD 卡，eMMC，SSD（M.2 NVMe）三种介质启动系统，其启动优先级为：`SD 卡 > SSD > eMMC`。

:::tip
板载的 SPI Flash 也可启动系统，但因其容量较小，目前仅用来存储 u-boot 等引导程序，再根据启动优先级来加载 eMMC 或 SSD 中的操作系统。SD 卡系统启动不经过 SPI Flash。
:::

## 系统镜像说明

目前 Jupiter 的镜像包格式主要有以下两种，安装系统时注意区分。

- 后缀为 `.img.zip` 的系统镜像包，为 SD 卡专用镜像包。

  - 必须将 SD 卡通过读卡器插到 PC 上进行烧录。

  - 支持使用进迭官方烧录工具 `titanflasher` 烧录（需解压为 `.img` 文件后烧录）。

  - 也支持通过 `balenaEtcher`，`Rufus`，`Win32DiskImager` 等工具烧录，Linux 下可使用 `dd` 命令烧录，这类工具有些支持直接烧录 zip 包，有些需要解压为 `.img` 文件后再烧录，请自行尝试。使用 `balenaEtcher` 烧录的方法请参考文末章节。

- 后缀为 `.zip` 的系统镜像包，可烧录到 SSD，eMMC 或 SD 卡中。

  - 必须使用进迭官方烧录工具 `titanflasher` 烧录。

  - 烧录到 SSD 或 eMMC 时，必须通过 Type-C 线连接到 PC 上进行烧录。

  - 烧录到 SD 卡时，必须将 SD 卡通过读卡器插到 PC 上进行烧录。

    :::tip
    当前 titanflasher 工具还有点小问题，请先不要使用 titanflasher 烧录 `.zip` 镜像包到 SD 卡。
    :::


以下以使用进迭 `titanflasher` 工具为分例，分别介绍烧录到 SD 卡，SSD，和 eMMC 中的方法。

## 进迭 `titanflasher` 工具的下载和安装

`titanflasher` 目前提供 X86(X64) 和 Linux 两种平台下的版本。

下载地址：[https://github.com/milkv-jupiter/jupiter-tools/releases/tag/titanflasher](https://github.com/milkv-jupiter/jupiter-tools/releases/tag/titanflasher)

Windows 版本安装中如有提示，请选择 `始终安装此驱动软件`。
<Image src='/docs/jupiter/titanflasher-20.webp' maxWidth='100%' align='left' />

:::tip
在使用 `titanflasher` 工具刷机过程中，会将固件解压到其工作区，请在 `设置` 中勾选 `自动清理`，或者到工作空间目录手动删除不使用的文件，避免多次刷机后，缓存文件占用太多的系统空间。
:::
<Image src='/docs/jupiter/titanflasher-35.webp' maxWidth='100%' align='left' />

## 安装系统到 SD 卡

SD 卡系统的启动优先级最高，启动所需要的所有引导程序，u-boot，kernel，system 均存储在 SD 卡中。

首先到资源下载页面下载 SD 卡对应的系统镜像包（后缀为 `.img.zip`）：[资源下载汇总](https://milkv.io/zh/docs/jupiter/getting-started/resources)。

下载后解压为 `.img` 文件。

将 SD 卡通过读卡器插到 PC 上。安装系统到 SD 中会清除 SD 卡中原有数据，**注意提前备份卡中的重要文件**。

1. 运行 `titanflasher` 工具，选择"研发工具"。
   <Image src='/docs/jupiter/titanflasher-01.webp' maxWidth='100%' align='left' />
2. 选择 "卡启动"。
   <Image src='/docs/jupiter/titanflasher-02.webp' maxWidth='100%' align='left' />
3. 点击 "选择SD卡"，选择目标 SD 卡。
   <Image src='/docs/jupiter/titanflasher-03.webp' maxWidth='100%' align='left' />
4. 点击 "选择刷机包"。
   <Image src='/docs/jupiter/titanflasher-04.webp' maxWidth='100%' align='left' />
5. 点击 "本地镜像"，选择上面解压好的 `.img` SD 卡镜像。
   <Image src='/docs/jupiter/titanflasher-05.webp' maxWidth='100%' align='left' />
6. 选择"烧录启动卡"。
   <Image src='/docs/jupiter/titanflasher-06.webp' maxWidth='100%' align='left' />
7. 点击 "执行"。
   <Image src='/docs/jupiter/titanflasher-07.webp' maxWidth='100%' align='left' />
8. 点击 "确定"。
   <Image src='/docs/jupiter/titanflasher-08.webp' maxWidth='100%' align='left' />
9. 开始烧录。
   <Image src='/docs/jupiter/titanflasher-09.webp' maxWidth='100%' align='left' />

当烧录进度条显示为 100% 时烧录完成。将烧录好系统的 SD 卡插入 Jupiter 的 SD 卡槽中，上电开机，如果安装的是 Desktop 版本的系统，通过 HDMI 连接的显示器会显示开机 LOGO，系统启动完后会进入桌面。

### 系统分区扩容

:::tip
SD 卡系统目前没有开机后自动扩容功能，请在开机后首先手动扩容，否则系统会报空间不足，甚至在重启后无法进入桌面。SSD 和 eMMC 系统会自动扩容，不需要该操作。
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

5. 在 `New size` 中指定根文件系统的大小，建议至少 16G，填入 `16384`。也可以拖动顶部滑块调节大小。还可以将 `Free space following` 指定为 `0`，将 SD 卡剩余空间全部划分绐根文件系统。
   <Image src='/docs/jupiter/gparted-extend-03.webp' maxWidth='100%' align='left' />

6. 修改好之后点击 `Resize`
   <Image src='/docs/jupiter/gparted-extend-04.webp' maxWidth='100%' align='left' />

7. 可以看到当前 rootfs `/` 已经修改为 16G，点菜单中的`勾号`按钮开始执行变更。
   <Image src='/docs/jupiter/gparted-extend-05.webp' maxWidth='100%' align='left' />
   弹出提示，选择 `Apply`。
   <Image src='/docs/jupiter/gparted-extend-06.webp' maxWidth='100%' align='left' />

8. 待变更完成后，最终分区情况如下。
   <Image src='/docs/jupiter/gparted-extend-07.webp' maxWidth='100%' align='left' />

## 安装系统到 eMMC 或 SSD

系统镜像烧录到 SSD 或 eMMC 时，必须通过 Type-C 线连接到 PC 上进行烧录。

首先到资源下载页面下载后缀为 `.zip`(非 `.img.zip`) 的系统镜像包：[资源下载汇总](https://milkv.io/zh/docs/jupiter/getting-started/resources)。

### 使用进迭 titanflasher 刷机工具

注意，`zip` 包下载后不需要解压。

1. 用 Type-C 线将 Jupiter 的 Type-C 口连接到 PC 端。
   <Image src='/docs/common/usba2typec.webp' maxWidth='50%' align='left' />

2. 按住板上的烧录键（RECOVERY）或者短接 RECOVERY 排针，再绐 Jupiter 上电，会进入 USB 烧录模式。
   <Image src='/docs/jupiter/jupiter-recovery.webp' maxWidth='100%' align='left' />

3. 打开 titanflasher 工具，选择 `研发工具`，再选择 `单机烧录`。
   <Image src='/docs/jupiter/titanflasher-30.webp' maxWidth='100%' align='left' />

4. 点击 `扫描设备`，选择识别到的 `dfu-device`。
   <Image src='/docs/jupiter/titanflasher-31.webp' maxWidth='100%' align='left' />

5. 点击 `选择刷机文件`，选取 zip 系统镜像，工具会先解压，请稍等一会。如果需要烧录完成后自动重启，可以勾选`刷完自启动`。
   <Image src='/docs/jupiter/titanflasher-32.webp' maxWidth='100%' align='left' />

6. 点击`开始刷机`进行烧录。
   <Image src='/docs/jupiter/titanflasher-33.webp' maxWidth='100%' align='left' />

7. 显示 100% 烧录完成，可以断电重新开机进入系统。
   <Image src='/docs/jupiter/titanflasher-34.webp' maxWidth='100%' align='left' />

### 使用 fastboot

除了使用 titanflasher，还可以使用 `fastboot` 方式刷机，该种方式完整刷机步骤有待进一步完善，以下刷机命令仅供开发者参考。

```bash
fastboot stage factory/FSBL.bin
fastboot continue
sleep 2

fastboot stage u-boot.itb
fastboot continue
sleep 3
#adb reboot bootloader
#sleep 3

fastboot flash gpt partition_universal.json
fastboot flash bootinfo factory/bootinfo_sd.bin
fastboot flash fsbl factory/FSBL.bin
fastboot flash env env.bin
fastboot flash opensbi opensbi.itb
fastboot flash uboot u-boot.itb
fastboot flash bootfs bootfs.img
fastboot flash rootfs rootfs.ext4

sleep 2
fastboot reboot
```

## 其他

### 使用第三方工具烧录 SD 卡镜像

SD 卡系统镜像支持使用 balenaEtcher，Rufus，Win32DiskImager 等工具烧录，以 `balenaEtcher` 为例，烧录方法如下。

首先将 SD 卡通过读卡器插到 PC 上。安装系统到 SD 中会清除 SD 卡中原有数据，**注意提前备份卡中的重要文件**。

到资源下载页面下载 SD 卡对应的系统镜像包（后缀为 `.img.zip`）：[资源下载汇总](https://milkv.io/zh/docs/jupiter/getting-started/resources)。

下载后可以不解压，`balenaEtcher` 支持加载 zip 包。

1. 下载镜像烧录工具 [balenaEtcher](https://etcher.balena.io/)，并安装。
2. 点击 `Flash from file` 选择下载好的 SD 卡镜像。
   <Image src='/docs/common/etcher-step1.webp' maxWidth='100%' align='left' />
3. 点击 `Select target` 选择 SD 卡。
   <Image src='/docs/common/etcher-step2.webp' maxWidth='100%' align='left' />
4. 点击 `Flash!` 开始烧录。
   <Image src='/docs/common/etcher-step3.webp' maxWidth='100%' align='left' />

烧录完成后，将 SD 卡插到 Jupiter 主板上开机。SD 卡系统目前没有开机后自动扩容功能，首次开机后，请按前面章节中的方法对系统分区进行扩容。
