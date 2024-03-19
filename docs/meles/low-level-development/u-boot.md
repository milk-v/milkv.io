---
sidebar_label: 'Build U-Boot'
sidebar_position: 20
---

# Build U-Boot

## Build DDR singlerank board

```
cd /workspace/thead-sdk
./build/mk-uboot.sh -b milkv-meles -d singlerank
```

And you will get **`out/u-boot-with-spl-singlerank.bin`**

## Build DDR dualrank board

```
cd /workspace/thead-sdk
./build/mk-uboot.sh -b milkv-meles -d dualrank
```

And you will get **`out/u-boot-with-spl-dualrank.bin`**