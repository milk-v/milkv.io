---
sidebar_label: 'リソースダウンロード'
sidebar_position: 60
---

# リソースダウンロードまとめ

## 公式イメージ

公式イメージはBuildrootベースで構築されており、現在2つのバージョンがあります。

:::tip
- V1はRISC-Vコアのみ対応。（このバージョンはDuo 64Mに推奨）
- V2はRISC-VとARMコア両方に対応。（このバージョンはDuo256MとDuoSに推奨）
:::

*Duo 64Mはメモリが少ないため、V1バージョンの利用を推奨します。V2バージョンのAI関連アプリは現在Duo 64Mでは正常に動作しません。*

### V1バージョンイメージ

ダウンロードリンク: [https://github.com/milkv-duo/duo-buildroot-sdk/releases/](https://github.com/milkv-duo/duo-buildroot-sdk/releases/)

### V2バージョンイメージ

V2バージョンはDuo256MとDuoSのRISC-Vコア・ARMコアイメージに対応しています。

ダウンロードリンク: [https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/](https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/)

### イメージの説明

sshはデフォルトで有効です。

USB-NCMネットワークはデフォルトで有効です。

青色LEDが点滅します。

rootパスワード: `milkv`
USB-NCM経由でsshログイン:
~~~bash
ssh root@192.168.42.1
~~~

LED点滅を停止したい場合:
```bash
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
その後、`reboot`コマンド実行または再起動してください。

LED点滅スクリプトの名前を変更し、再起動後にLEDが点滅しなくなります。

LED点滅を復元したい場合は、名前を元に戻して再起動してください:
```bash
mv /mnt/system/blink.sh_backup /mnt/system/blink.sh && sync
```
その後、`reboot`コマンド実行または再起動してください。

### 公式SDK

自分でイメージをビルドしたい場合は、ドキュメントを参照してください: [Buildroot SDK](https://milkv.io/docs/duo/getting-started/buildroot-sdk)

## サードパーティイメージ

:::caution
サードパーティイメージは十分なテストがされておらず、未知の問題がある可能性があります。評価目的のみでご利用ください。
:::

### Duo (CV1800B)

<div className='gpio_style'>

| OS | ダウンロードリンク | ガイドリンク | 作者 |
|:---- |:---- |:---- |:---- |
| Fedora 41 | [ダウンロード](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/Duo/images/latest/) | - | Fedora-V Force |
| Arch Linux | [ダウンロード](https://drive.google.com/file/d/1Qf8ioR29KCsvt2MIWre168Um9Q8ot_z5/view?usp=sharing) | [Milk-V Community](https://community.milkv.io/t/arch-linux-on-milkv-duo-milkv-duo-arch-linux/329) [Milk-V Community](https://community.milkv.io/t/debian-arch-linux-on-milkv-duo-256m-milkv-duo-256m-debian-arch-linux/1110) | [@Judehahh](https://community.milkv.io/u/Judehahh) [@sRGB](https://community.milkv.io/u/srgb/summary) |
| AlpineLinux | [ダウンロード](https://drive.google.com/file/d/1LfebzdIubEVe0RRMwWAD5QA5LjK-8sv5/view?usp=drive_link) | [Github](https://github.com/cwt/duo-buildroot-sdk/releases/tag/poc1) [Milk-V Community](https://community.milkv.io/t/alpine-linux-on-the-duo/700/5) | [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#AlpineLinux_Disk_Image) [@cwt](https://github.com/cwt) |
| Ubuntu 22.04 | [ダウンロード](https://drive.google.com/file/d/1y1NQamzUDzot_kVT2yKkbusoJmtvH5tD/view?usp=sharing) | [Github](https://github.com/bassusteur/milkv-duo-ubuntu) [Milk-V Community](https://community.milkv.io/t/ubuntu-on-the-milk-v-duo/960) | [@bassusteur](https://github.com/bassusteur) [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#Ubuntu_Disk_Image) |
| Debian | [ダウンロード](https://drive.google.com/file/d/1TqMuFsRo5Es2Y6-qAyxV8jnFdAkcCp4v/view?usp=sharing) | [Milk-V Community](https://community.milkv.io/t/milkv-duo-duo-debian-full-7z-519m-download/862) [Github](https://github.com/hongwenjun/riscv64/tree/main/milkv-duo) | [@sRGB](https://community.milkv.io/u/srgb/summary) |
| Fedora-RISCV-Builder | [詳細](https://github.com/chainsx/fedora-riscv-builder) | [Github](https://github.com/chainsx/fedora-riscv-builder) | [@chainsx](https://github.com/chainsx) |
| Debian/Ubuntuイメージビルダー | [詳細](https://community.milkv.io/t/milk-v-duo-debian-ubuntu-image-builder/1424) | [Github](https://github.com/logicethos/Milk-V_Duo_Linux2SD) | [@Logic Ethos Ltd](https://github.com/logicethos) |
| OpenWRT | [詳細](https://github.com/Pillar1989/VizOS) | [Milk-V Community](https://community.milkv.io/t/openwrt-on-milkv-duo-milkv-duo-openwrt/1025) | [@Baozhu](https://community.milkv.io/u/Baozhu) [@Pillar1989](https://github.com/Pillar1989) |
| Zephyr | [ダウンロード](https://github.com/kinsamanka/milkv-zephyros/releases/download/v0.1.1-alpha/milkv-duo_sdcard.img.gz) | [Github](https://github.com/kinsamanka/milkv-zephyros) | [@kinsamanka](https://github.com/kinsamanka) |
| Yocto | [詳細](https://github.com/kinsamanka/meta-milkv/blob/master/README.md) | [Github](https://github.com/kinsamanka/meta-milkv) | [@kinsamanka](https://github.com/kinsamanka) |
| RT-Thread | [詳細](https://github.com/RT-Thread/rt-thread/tree/master/bsp/cvitek) | [Github](https://github.com/RT-Thread/rt-thread/tree/master/bsp/cvitek)  [RISC-V RT-Thread Programming Guide](https://riscv-rtthread-programming-manual.readthedocs.io/zh-cn/latest/) | [@hflyingcys](https://github.com/flyingcys) |
| ThreadX | [詳細](https://github.com/saicogn/ThreadX-to-RISC-V64) | [Github](https://github.com/saicogn/ThreadX-to-RISC-V64) | [@hsaicogn](https://github.com/saicogn) |

</div>

### Duo 256M (SG2002)

<div className='gpio_style'>

| OS | ダウンロードリンク | ガイドリンク | 作者 |
|:---- |:---- |:---- |:---- |
| Fedora 41 | [ダウンロード](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/Duo256M/images/latest/) | - | Fedora-V Force |
| Debian | [ダウンロード](https://github.com/Fishwaldo/sophgo-sg200x-debian/releases/tag/v1.2.0) | [Github](https://github.com/Fishwaldo/sophgo-sg200x-debian) | [@Fishwaldo](https://github.com/Fishwaldo) |
| Ubuntu 22.04 | [ダウンロード](https://drive.google.com/file/d/1mkzLhvtjJup3GbgWKZdwL80PZMMXg7n1/view) | [Github](https://github.com/bassusteur/milkv-duo-ubuntu) [Milk-V Community](https://community.milkv.io/t/ubuntu-on-the-milk-v-duo/960) | [@bassusteur](https://github.com/bassusteur) [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#Ubuntu_Disk_Image) |
| Arch Linux | [ダウンロード](https://drive.google.com/file/d/16qJTmEtFFTkS-mIRFdaj4Prbi2QezjMI/view) | [Milk-V Community](https://community.milkv.io/t/arch-linux-on-milkv-duo-milkv-duo-arch-linux/329) [Milk-V Community](https://community.milkv.io/t/debian-arch-linux-on-milkv-duo-256m-milkv-duo-256m-debian-arch-linux/1110) | [@Judehahh](https://community.milkv.io/u/Judehahh) [@sRGB](https://community.milkv.io/u/srgb/summary) |
| AlpineLinux  | [ダウンロード](https://drive.google.com/file/d/1zhhB6AdgvjjuzBWjY6TchdX5b0uNWzP-/view) | [Github](https://github.com/cwt/duo-buildroot-sdk/releases/tag/poc1) [Milk-V Community](https://community.milkv.io/t/alpine-linux-on-the-duo/700/5) | [@xyzdims.com](https://xyzdims.com/3d-printers/misc-hardware-notes/iot-milk-v-duo-risc-v-esbc-running-linux/#AlpineLinux_Disk_Image) [@cwt](https://github.com/cwt) |

</div>

### Duo S (SG2000)

<div className='gpio_style'>

| OS | ダウンロードリンク | ガイドリンク | 作者 | アカウントとパスワード |
|:---- |:---- |:---- |:---- |:---- |
| Fedora 41 | [ダウンロード](https://mirror.iscas.ac.cn/fedora-riscv/dl/Milk-V/DuoS/images/latest/) | - | Fedora-V Force | root/riscv |
| Debian | [ダウンロード](https://github.com/Fishwaldo/sophgo-sg200x-debian/releases) | [Github](https://github.com/Fishwaldo/sophgo-sg200x-debian) | [@Fishwaldo](https://github.com/Fishwaldo) | root/rv および debian/rv |
| NuttX | [ダウンロード](https://github.com/lupyuen/nuttx-sg2000/releases) | [Github](https://github.com/lupyuen/nuttx-sg2000) | [@lupyuen](https://github.com/lupyuen) | |

</div>

