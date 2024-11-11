---
sidebar_label: 'MIPI DSI 屏调试'
sidebar_position: 05
---

# MIPI DSI 接口屏幕调试

DuoS 和 Duo Module 01 模组支持 MIPI DSI 接口的屏幕。最大输出分辨率为 1920x1080 （1080P@60fps RGB24-bit）。

## 添加新的屏幕

拉取 SDK 代码 [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)，参考该次提交：[a84a2e84f](https://github.com/milkv-duo/duo-buildroot-sdk/commit/a84a2e84fb2bf2e0e50c1d398e23379ac0700e43)，该次提交是增加对 Milk-V 8 寸 800x1280 屏的支持，仿照 `dsi_milkv_8hd.h` 文件创建新的屏的参数文件，再向 `sample_dsi_panel.h` 和 `sample_dsi.c` 中添加新的屏的定义，再参考 [buildroot sdk 编译方法](https://milkv.io/zh/docs/duo/getting-started/buildroot-sdk) 编译生成新的固件包测试。

除了生成整个固件的方式，也可以使用分步编译的方法，将编译指导中的 build_all 处替换为 `build_middleware`，生成的测试文件为 middleware/v2/sample/mipi_tx/sample_dsi，可以使用 scp 的方式将 sample_dsi 上传到 设备中测试。

测试命令为（注意将 `--panel=` 参数替换为新加的屏）：
```bash
sample_dsi --panel=MILKV_8HD
devmem 0x0a088094 32 0x0701000a
```
此时屏会显示彩色条纹。

<Image src='/docs/duo/duos/duos-mipi-dsi-8hd.webp' maxWidth='100%' align='left' />

## 参考

1. [CV181x 屏幕对接使用指南](https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/zh/01.software/MPI/Screen_Docking_Guide/build/html/index.html)。