---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# はじめに

Duoシリーズボードの標準SDKはBuildrootベースで構築されており、Duoのファームウェア生成に使用されます。現在、SDKにはV1とV2の2つのバージョンがあります。

:::tip
- SDK V1はRISC-Vコアのみ対応（Duo 64Mに推奨）
- SDK V2はRISC-VとARMコア両方に対応（Duo256MとDuoSに推奨）
:::

*Duo 64Mはメモリが少ないため、SDK V1の利用を推奨します。SDK V2のAI関連アプリは現状Duo 64Mでは正常動作しません。*

## Buildroot SDK V1

SDKの主な構成：

- u-boot: 2021.10
- linux kernel: 5.10.4
- buildroot: 2021.05
- opensbi: 89182b2

ソースコード：[https://github.com/milkv-duo/duo-buildroot-sdk](https://github.com/milkv-duo/duo-buildroot-sdk)

SDKディレクトリ構成：

```text
├── build                ビルドスクリプトとボード設定
├── build.sh             ワンクリックビルドスクリプト
├── buildroot-2021.05    buildrootソース
├── freertos             freertosシステム
├── fsbl                 プリビルドfsblファームウェア
├── install              一時イメージ保存
├── isp_tuning           カメラパラメータ
├── linux_5.10           Linuxカーネル
├── middleware           独自マルチメディアフレームワーク
├── device               milkv設定ファイル
├── opensbi              opensbiライブラリ
├── out                  Milk-V生成イメージ
├── ramdisk              プリビルドramdisk
└── u-boot-2021.10       u-bootソース
```

## Buildroot SDK V2

SDKの主な構成：

- u-boot: 2021.10
- linux kernel: 5.10.4
- buildroot: 2025.02
- opensbi: 89182b2

ソースコード：[https://github.com/milkv-duo/duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2)

SDKディレクトリ構成：

```text
├── build                ビルドスクリプトとボード設定
├── build.sh             ワンクリックビルドスクリプト
├── buildroot            buildrootソース
├── cvi_mpi              sophgoマルチメディアフレームワーク
├── device               milkv設定ファイル
├── freertos             freertosシステム
├── fsbl                 プリビルドfsblファームウェア
├── install              一時イメージ保存
├── isp_tuning           カメラパラメータ
├── linux_5.10           Linuxカーネル
├── osdrv                周辺ドライバソース
├── opensbi              opensbiライブラリ
├── out                  Milk-V生成イメージ
├── tdl_sdk              sophgoディープラーニングSDK
└── u-boot-2021.10       u-bootソース
```

# イメージのビルド

コンパイル環境の準備。公式サポートは `Ubuntu Jammy 22.04.x amd64` のみです。

他のLinuxディストリビューションの場合はDocker環境でのコンパイルを推奨します。

以下、2つの環境でのコンパイル方法を説明します。SDK V1/V2の手順はほぼ同じです。以下はV2 SDKの例です。

## 1. Ubuntu 22.04でのコンパイル

### 必要パッケージのインストール

依存パッケージをインストール：

```bash
sudo apt install -y pkg-config build-essential ninja-build automake autoconf libtool wget curl git gcc libssl-dev bc slib squashfs-tools android-sdk-libsparse-utils jq python3-distutils scons parallel tree python3-dev python3-pip device-tree-compiler ssh cpio fakeroot libncurses5 flex bison libncurses5-dev genext2fs rsync unzip dosfstools mtools tcl openssh-client cmake expect python-is-python3
```

[duo-buildroot-sdk-v2](https://github.com/milkv-duo/duo-buildroot-sdk-v2)では以下も必要です：
```bash
sudo pip install jinja2
```

### SDKソースコード取得

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk-v2.git --depth=1
```

SDK V2ではネットワーク問題回避のため、`dl.tar`を事前にダウンロードし`buildroot`に展開します：
```bash
wget https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/download/dl/dl.tar
tar xvf ./dl.tar -C ./duo-buildroot-sdk-v2/buildroot/
```
展開後の`dl`ディレクトリ例：
```text
└── buildroot
    └── dl
        ├── acl
        ├── alsa-lib
        ├── alsa-utils
        ├── attr
        ├── ...
```

### 1). ワンクリックコンパイル

`build.sh`スクリプトを実行：
```bash
cd duo-buildroot-sdk/
./build.sh
```

使用方法が表示されます：
```bash
$ ./build.sh
Usage:
./build.sh              - Show this menu
./build.sh lunch        - Select a board to build
./build.sh [board]      - Build [board] directly, supported boards as follows:
milkv-duo-musl-riscv64-sd
milkv-duo256m-glibc-arm64-sd
milkv-duo256m-musl-riscv64-sd
milkv-duos-glibc-arm64-emmc
milkv-duos-glibc-arm64-sd
milkv-duos-musl-riscv64-emmc
milkv-duos-musl-riscv64-sd
```

2通りのビルド方法があります。

1つ目は `./build.sh lunch` で対話メニューを表示し、番号選択：
```bash
$ ./build.sh lunch
Select a target to build:
1. milkv-duo-musl-riscv64-sd
2. milkv-duo256m-glibc-arm64-sd
3. milkv-duo256m-musl-riscv64-sd
4. milkv-duos-glibc-arm64-emmc
5. milkv-duos-glibc-arm64-sd
6. milkv-duos-musl-riscv64-emmc
7. milkv-duos-musl-riscv64-sd
Which would you like:
```

:::tip
- Duo (64M-DDR)はRISC-Vコアのみ、musl libcベースSDカードイメージ
- Duo256MはRISC-V/ARM両対応（musl/GLIBC）、SDカードイメージのみ
- DuoSはRISC-V/ARM両対応（musl/GLIBC）、SD/eMMCイメージ対応
:::

2つ目はスクリプトにターゲット名を指定して直接ビルド：
```bash
$ ./build.sh milkv-duos-musl-riscv64-sd
```

ビルド成功後、`out`ディレクトリに`*.img`（SDカード用）、`*.zip`（eMMC用）イメージが生成されます。

*初回ビルド時は約840MBのツールチェーンが自動DL・展開されます。2回目以降は`host-tools`ディレクトリがあれば再DL不要です。*

### 2). 手動ステップビルド

ワンクリックスクリプト未使用の場合、ツールチェーン[host-tools](https://github.com/milkv-duo/host-tools.git)を手動DLしSDKルートに配置：

```bash
git clone https://github.com/milkv-duo/host-tools.git
cp -a host-tools duo-buildroot-sdk-v2/
```

環境変数設定：
```bash
source build/envsetup_milkv.sh
```
初回はターゲット選択が表示されます。

ターゲット選択後、環境変数ロード完了で情報が表示されます。

環境ロード後、`device`ディレクトリに`target`リンクが作成されます。ターゲット変更は`lunch`パラメータ追加で再選択可能：
```bash
source build/envsetup_milkv.sh lunch
```

環境ロード後、以下コマンドでビルド：
```bash
clean_all
build_all
```

SDカードイメージ生成には追加で：
```bash
pack_sd_image
```

例：`milkv-duos-musl-riscv64-sd`の場合
```bash
source build/envsetup_milkv.sh milkv-duos-musl-riscv64-sd

clean_all
build_all
pack_sd_image
```

生成ファームウェア例：
```text
install/soc_sg2000_milkv_duos_musl_riscv64_sd/milkv-duos-musl-riscv64-sd.img
```

SDカードイメージは`*.img`、eMMCは`upgrade.zip`です。

:::tip
`build_all`以外にも個別モジュールビルド可能。`clean_xxx`で中間ファイル削除後、`build_xxx`で再ビルド。`tab`キーで補完可能。例：
- fsbl: `clean_fsbl`，`build_fsbl`
- uboot: `clean_uboot`，`build_uboot`
- kernel: `clean_kernel`，`build_kernel`
- osdrv: `clean_osdrv`，`build_osdrv`
- cvi_mpi: `clean_middleware`，`build_middleware`
- tdl-sdk: `clean_tdl_sdk`，`build_tdl_sdk`
:::

## 2. Dockerでのコンパイル

LinuxホストでDockerサポートが必要です。Dockerの使い方は[公式ドキュメント](https://docs.docker.com/)参照。

SDKソースをLinuxホストに配置し、Milk-V提供のDockerイメージ環境でビルドします。

### LinuxホストでSDKコード取得

```bash
git clone https://github.com/milkv-duo/duo-buildroot-sdk-v2.git --depth=1
```

SDK V2では`dl.tar`を事前DLし`buildroot`に展開：
```bash
wget https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/download/dl/dl.tar
tar xvf ./dl.tar -C ./duo-buildroot-sdk-v2/buildroot/
```
展開後の`dl`ディレクトリ例：
```text
└── buildroot
    └── dl
        ├── acl
        ├── alsa-lib
        ├── alsa-utils
        ├── attr
        ├── ...
```

### SDKコードディレクトリへ移動

```bash
cd duo-buildroot-sdk-v2
```

### Dockerイメージ取得・起動

```bash
docker run --privileged -itd --name duodocker -v "$(pwd)":/home/work milkvtech/milkv-duo:latest /bin/bash
```

コマンドパラメータ説明：
- `--privileged`：特権モード
- `duodocker`：Docker名
- `$(pwd)`：現在ディレクトリ
- `-v $(pwd):/home/work`：ホストのコードディレクトリをDockerの`/home/work`にバインド
- `milkvtech/milkv-duo:latest`：Milk-V提供Dockerイメージ

Docker起動後、`docker ps -a`で状態確認：
```bash
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND       CREATED       STATUS       PORTS     NAMES
8edea33c2239   milkvtech/milkv-duo:latest   "/bin/bash"   2 hours ago   Up 2 hours             duodocker
```

:::tip
Dockerイメージ更新時は`docker pull milkvtech/milkv-duo:latest`で最新取得可能。
:::

### 1). Dockerでワンクリックビルド

```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && export FORCE_UNSAFE_CONFIGURE=1 && ./build.sh [board]"
```

`./build.sh [board]`はUbuntuでのワンクリックビルドと同様です。`lunch`で対話選択も可能。

例：`milkv-duos-musl-riscv64-sd`の場合
```bash
docker exec -it duodocker /bin/bash -c "cd /home/work && cat /etc/issue && export FORCE_UNSAFE_CONFIGURE=1 && ./build.sh milkv-duos-musl-riscv64-sd"
```

ビルド成功後、`out`ディレクトリにSDカード用`*.img`が生成されます。

### 2). Dockerで手動ステップビルド

ワンクリック未使用の場合、ツールチェーン[host-tools](https://github.com/milkv-duo/host-tools.git)を手動DLしSDKルートに配置：

```bash
git clone https://github.com/milkv-duo/host-tools.git
cp -a host-tools duo-buildroot-sdk-v2/
```

`docker ps -a`でコンテナID確認（例：`8edea33c2239`）

コンテナ未起動の場合は再起動しID確認：
```bash
cd duo-buildroot-sdk-v2/
docker run --privileged -itd --name duodocker -v $(pwd):/home/work milkvtech/milkv-duo:latest /bin/bash
docker ps -a
```

Dockerに入る：
```bash
docker exec -it 8edea33c2239 /bin/bash
```

コードディレクトリへ移動：
```bash
root@8edea33c2239:/# cd /home/work/
```

環境変数設定（rootユーザー用）：
```bash
export FORCE_UNSAFE_CONFIGURE=1
```

環境変数ロード：
```bash
source build/envsetup_milkv.sh
```
初回はターゲット選択が表示されます。

環境ロード後、以下コマンドでビルド：
```bash
clean_all
build_all
```

SDカードイメージ生成には追加で：
```bash
pack_sd_image
```

例：`milkv-duos-musl-riscv64-sd`の場合
```bash
source build/envsetup_milkv.sh milkv-duos-musl-riscv64-sd

clean_all
build_all
pack_sd_image
```

生成ファームウェア例：
```text
install/soc_sg2000_milkv_duos_musl_riscv64_sd/milkv-duos-musl-riscv64-sd.img
```

SDカードイメージは`*.img`、eMMCは`upgrade.zip`です。

:::tip
`build_all`以外にも個別モジュールビルド可能。`clean_xxx`で中間ファイル削除後、`build_xxx`で再ビルド。`tab`キーで補完可能。例：
- fsbl: `clean_fsbl`，`build_fsbl`
- uboot: `clean_uboot`，`build_uboot`
- kernel: `clean_kernel`，`build_kernel`
- osdrv: `clean_osdrv`，`build_osdrv`
- cvi_mpi: `clean_middleware`，`build_middleware`
- tdl-sdk: `clean_tdl_sdk`，`build_tdl_sdk`
:::

ビルド完了後は`exit`でDockerから退出可能：
```bash
root@8edea33c2239:/home/work# exit
```
生成ファームウェアはホスト側コードディレクトリにも出力されます。

### Dockerの停止

不要になったDocker環境は停止・削除可能：
```bash
docker stop 8edea33c2239
docker rm 8edea33c2239
```

## 3. その他のコンパイル注意点

上記以外の環境でSDKをビルドする場合の注意点です。

### cmakeバージョン

`cmake`の最低バージョンは`3.16.5`です。

バージョン確認：
```bash
cmake --version
```

例：Ubuntu 20.04のapt版は`3.16.3`で要件未満。最新版`3.27.6`を手動インストール：
```bash
wget https://github.com/Kitware/CMake/releases/download/v3.27.6/cmake-3.27.6-linux-x86_64.sh
chmod +x cmake-3.27.6-linux-x86_64.sh
sudo sh cmake-3.27.6-linux-x86_64.sh --skip-license --prefix=/usr/local/
```

インストール後は`/usr/local/bin`に配置され、`cmake --version`で確認可能。

### Windows Linux Subsystem (WSL)でのビルド

WSLでビルドする場合、$PATHにWindows環境変数が混在しスペースが含まれる問題があります。

`/etc/wsl.conf`に以下を追加：
```
[interop]
appendWindowsPath = false
```

その後`wsl.exe --reboot`でWSL再起動。`./build.sh`や`build_all`が実行可能になります。元に戻す場合は`appendWindowsPath = true`にし、PowerShellで`wsl.exe --shutdown`→`wsl.exe`で再起動してください。

## 4. アプリケーションパッケージ追加

Buildrootは軽量な組み込みLinux構築ツールで、Ubuntuのようなaptはありません。Duo標準SDKにはよく使うツールが追加されていますが、独自アプリ追加にはSDK修正・再ビルドが必要です。

以下、Buildrootでアプリ追加の一般的な方法です。

### Busyboxコマンド有効化

Buildrootシステムの基本コマンドはbusyboxが提供。必要コマンドがbusybox設定ファイルに含まれているか確認し、有効化して再ビルドします。

設定ファイル例：
```
buildroot/package/busybox/busybox.config
```

例：timeoutコマンド有効化
```diff {9,10}
diff --git a/buildroot/package/busybox/busybox.config b/buildroot/package/busybox/busybox.config
index d7d58f064..b268cd6f8 100644
--- a/buildroot/package/busybox/busybox.config
+++ b/buildroot/package/busybox/busybox.config
@@ -304,7 +304,7 @@ CONFIG_TEST=y
 CONFIG_TEST1=y
 CONFIG_TEST2=y
 CONFIG_FEATURE_TEST_64=y
-# CONFIG_TIMEOUT is not set
+CONFIG_TIMEOUT=y
 CONFIG_TOUCH=y
 # CONFIG_FEATURE_TOUCH_NODEREF is not set
 CONFIG_FEATURE_TOUCH_SUSV3=y
```

参考コミット：[busybox: add timeout command](https://github.com/milkv-duo/duo-buildroot-sdk/commit/2833c24f11bb48776094265b7b16cfde87f86083)

### Buildrootプリセットアプリパッケージ有効化

Buildrootには多数のプリセットアプリがあり、`buildroot/package`で確認できます。

ターゲットボードの設定ファイルで有効化/無効化します。例：`milkv-duos-musl-riscv64-sd`の設定ファイル
```
buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig
```

ホストでSDK全体をビルド後、Buildrootビルドディレクトリで対話メニュー設定可能。

1. Buildrootビルドディレクトリへ移動
   ```bash
   cd buildroot/output/milkv-duos-musl-riscv64-sd/
   ```

   `make show-targets`で使用中パッケージ確認
   ```bash
   $ make show-targets
   busybox coreutils dhcpcd dnsmasq dropbear ...
   ```

2. Buildroot設定
   `make menuconfig`で対話メニュー表示

   必要パッケージを`Target packages`から探し、`/`キーで検索も可能。例：`tar`コマンドは`package_tar`で検索、`System tools`カテゴリにあり、スペースキーで有効化。

   ESCキーで終了、保存時はEnterでOK。

   `make savedefconfig`で設定保存、`git status`で変更確認。

   :::tip
   設定ファイルの差分比較も可能：
   ```diff
   diff -u .config.old .config
   ```
   :::

   新イメージでDuo上でコマンド動作確認。`not found`の場合は`.mk`ファイルにgccパラメータ（`TARGET_CFLAGS`や`TARGET_LDFLAGS`）追加が必要な場合あり。参考コミット：

   1. [buildroot: enable fio](https://github.com/milkv-duo/duo-buildroot-sdk/commit/6ebbd6e219d3efcd9b95086c75702f4f717e7f03#diff-1a84d28825d604f941100ff9b50ec8d63bf84535a3dd6f7e62c421a657e6556a)
   2. [buildroot: enable spidev_test](https://github.com/milkv-duo/duo-buildroot-sdk/commit/84d6b72eb6c9ff467410376fc982b5ee4f8e3d1f#diff-d0fb4ce2e7555c5cc5399aeaa75e4bf5fd429f034f4d00457f450a994204b97f)
   3. [buildroot: fix build parameter for coremark package](https://github.com/milkv-duo/duo-buildroot-sdk/commit/cdd4fabb6100f87a61ca7560def558cd9e38f91a)

### 独自アプリパッケージ追加

独自アプリのビルド・テストは[duo-examples](https://github.com/milkv-duo/duo-examples)方式推奨。

Buildrootパッケージとして組み込みたい場合はプリセットパッケージ設定を参考に追加。参考リンク：

1. [buildroot: add python-evdev required by the pinpong library](https://github.com/milkv-duo/duo-buildroot-sdk/commit/11caee79c7a48f7f6fd4a5d352ccf8976857d522)
2. [buildroot: add python-freetype required by the pinpong library](https://github.com/milkv-duo/duo-buildroot-sdk/commit/165fc3c4c1adca1d1f635fd2069a5ad67d895c7c)

主に`buildroot-2021.05/package`への追加内容を参照。

## 5. アプリケーションパッケージ削除

不要なパッケージ削除でビルド高速化やファームウェア軽量化が可能です。

Buildroot設定ファイルから該当パッケージ名を削除して再ビルドします。例：Python関連ライブラリ不要の場合

```diff title="buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig"
diff --git a/buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig b/buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig
index 2bc8cd5e3..e78901afb 100644
--- a/buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig
+++ b/buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig
@@ -330,25 +330,6 @@ BR2_PACKAGE_EVTEST=y
 # BR2_PACKAGE_FCONFIG is not set
 BR2_PACKAGE_FLASHROM_ARCH_SUPPORTS=y
 
-BR2_PACKAGE_PYTHON3=y
-BR2_PACKAGE_PYTHON3_PY_PYC=y
-BR2_PACKAGE_PYTHON_LXML=y
-BR2_PACKAGE_PYTHON_PIP=y
-BR2_PACKAGE_PYTHON_SETUPTOOLS=y
-BR2_PACKAGE_PYTHON3_SSL=y
-
-BR2_PACKAGE_PYTHON_SERIAL=y
-BR2_PACKAGE_PYTHON_PILLOW=y
-BR2_PACKAGE_PYTHON_SMBUS_CFFI=y
-BR2_PACKAGE_PYTHON_SPIDEV=y
-BR2_PACKAGE_PYTHON_MODBUS_TK=y
-BR2_PACKAGE_PYTHON_EVDEV=y
-BR2_PACKAGE_PYTHON_FREETYPE=y
-
-BR2_PACKAGE_PYTHON_PINPONG=y
-
-BR2_PACKAGE_PYTHON_PSUTIL=y
-
 #
 # Compression and decompression
 #
```

## 6. よくある質問

### Buildrootトラブルシューティング

SDKのBuildrootはデフォルトで並列ビルド有効ですが、エラー解析時は設定ファイルから削除し、`buildroot/output`ディレクトリ削除後再ビルドします。

例：`milkv-duos-musl-riscv64-sd`の設定ファイルから
```bash title="buildroot/configs/milkv-duos-musl-riscv64-sd_defconfig"
BR2_PER_PACKAGE_DIRECTORIES=y
```

エラー発生時はターミナルのエラー情報に加え、`build/br.log`の完全ログも確認してください。

### BuildrootパッケージDL失敗

SDK V2ではネットワーク問題回避のため、`dl.tar`を事前DLし`buildroot`に展開して再ビルドします：
```bash
rm -rf ./buildroot/output ./buildroot/dl
wget https://github.com/milkv-duo/duo-buildroot-sdk-v2/releases/download/dl/dl.tar
tar xvf ./dl.tar -C ./buildroot/
```

展開後の`dl`ディレクトリ例：
```text
└── buildroot
    └── dl
        ├── acl
        ├── alsa-lib
        ├── alsa-utils
        ├── attr
        ├── ...
```
