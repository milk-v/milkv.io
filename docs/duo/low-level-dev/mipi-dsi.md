---
sidebar_label: 'MIPI DSI Screen'
sidebar_position: 05
---

# MIPI DSI Screen Development

`DuoS` and `Duo Module 01` support screens with MIPI DSI interface.

## Adding a New Screen

Pull the SDK code [duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk), refer to the commit: [a84a2e84f](https://github.com/milkv-duo/duo-buildroot-sdk/commit/a84a2e84fb2bf2e0e50c1d398e23379ac0700e43), this commit is to add support for Milk-V 8-inch 800x1280 screen, create a new screen parameter file based on the `dsi_milkv_8hd.h` file, and then add the new screen definition to `sample_dsi_panel.h` and `sample_dsi.c`, and then refer to [buildroot sdk compilation](https://milkv.io/docs/duo/getting-started/buildroot-sdk) Compile and generate a new firmware package test.

In addition to generating the entire firmware, you can also use the step-by-step compilation method. Replace build_all in the compilation guide with `build_middleware`. The generated test file is `middleware/v2/sample/mipi_tx/sample_dsi`. You can use scp to upload sample_dsi to the device for testing.

The test command is (note that the `--panel=` parameter is replaced with the newly added screen):
```bash
sample_dsi --panel=MILKV_8HD
devmem 0x0a088094 32 0x0701000a
```
The screen will display color stripes.

<Image src='/docs/duo/duos/duos-mipi-dsi-8hd.webp' maxWidth='100%' align='left' />

## Reference

1. [CV181x Screen Docking Guide](https://doc.sophgo.com/cvitek-develop-docs/master/docs_latest_release/CV180x_CV181x/en/01.software/MPI/Screen_Docking_Guide/build/html/index.html)。
