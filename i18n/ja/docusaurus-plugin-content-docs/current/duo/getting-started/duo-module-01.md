---
sidebar_label: 'Duo Module 01 (SG2000)'
sidebar_position: 4
---

# Duo Module 01

<Image src='/docs/duo/dm01/size-view.webp' maxWidth='30%' align='center' />

Duo Module 01は、SG2000、WI-FI6/BTDM5.4、eMMCを統合したコンパクトなモジュールです。SMD実装に対応し、製品開発期間を大幅に短縮できます。製品化の第一選択肢です。

Duo Module 01を用いた製品設計時に、初期ソリューションの迅速な検証・デバッグを可能にする評価ボード（EVB）も用意しています。コアボード専用設計で豊富なインターフェースと機能を備えています。

<Image src='/docs/duo/dm01/dm01-eb.webp' maxWidth='70%' align='center' />

## SG2000の概要

SG2000は、エッジAI監視IPカメラ、顔認証出席端末、スマートホーム機器など多様な分野向けの高性能・低消費電力チップです。H.264/H.265の映像圧縮・デコード、ISP機能を統合し、HDR広ダイナミックレンジ、3Dノイズ除去、デフォグ、レンズ歪み補正などの画像補正アルゴリズムをサポート。プロ品質の映像を提供します。

独自TPUを内蔵し、INT8演算で約0.5TOPSの性能を発揮。TPUスケジューリングエンジンにより高帯域データフローを効率的に供給。Caffe、Pytorch、ONNX、MXNet、TensorFlow(Lite)など主流DLフレームワークの移植も容易です。

## SG2000 公開予備データシート

SG2000の公開予備データシートとTRMをGitHubで公開しています。[こちら](https://github.com/milkv-duo/duo-files/tree/main/duo-s/datasheet)をご覧ください。

## 購入方法

Milk-VはSG2000チップの正規グローバル代理店です。`Duo Module 01`および`SG2000`チップのサンプルは[オンラインストア](https://arace.tech/products/sophon-cv1800b-5pcs)から直接購入できます。大量注文は[Milk-V営業チーム](mailto:sales@milkv.io)までお問い合わせください。

## はじめに

### システムのインストール

:::tip
Duo Module 01のソフトウェアはDuoSと互換性があります。DuoSのファームウェアをご利用ください。
:::

- SDカードから起動  
  [スタートアップ](https://milkv.io/docs/duo/getting-started/boot)を参照してください。

- eMMCから起動  
  [eMMC版ファームウェア書き込み](https://milkv.io/docs/duo/getting-started/duos#emmc-version-firmware-burning)を参照してください。

### USBネットワークの利用

[セットアップ](https://milkv.io/docs/duo/getting-started/setup)を参照してください。

## Duo Module 01 GPIOピン配置

### GPIOピンマッピング

<div className='gpio_style'>

| GROUP | ADDR          | PORT  | CHIP      | NUM     | NAME     | START             |
|:-----:|:-------------:|:-----:|:---------:|:-------:|:---------|:------------------|
| gpio0 | gpio@03020000 | porta | gpiochip0 | 480-511 | XGPIOA   | 480 - XGPIOA[0]   |
| gpio1 | gpio@03021000 | portb | gpiochip1 | 448-479 | XGPIOB   | 448 - XGPIOB[0]   |
| gpio2 | gpio@03022000 | portc | gpiochip2 | 416-447 | XGPIOC   | 416 - XGPIOC[0]   |
| gpio3 | gpio@03023000 | portd | gpiochip3 | 384-415 |          |                   |
| gpio4 | gpio@05021000 | porte | gpiochip4 | 352-383 | PWR_GPIO | 352 - PWR_GPIO[0] |

</div>

### ピン定義

（以下の各ピン定義テーブルは日本語化せず、英語のまま掲載）

## DuoModule 01 EVB GPIOピン配置

<Image src='/docs/duo/dm01/dm01-evb-pinout.webp' maxWidth='70%' align='left' />

### 26ピンヘッダー

`26ピンヘッダー`のGPIOは3.3Vロジックレベルです。

（以下の26ピンヘッダーのテーブルは英語のまま掲載）

### 青色LEDピン

（LEDピン定義テーブルは英語のまま掲載）

### カメラインターフェース

Duo Module 01 EVBは2つのCSIカメラコネクタを搭載：

- J8：16ピン0.5mmピッチ。Duo/Duo256Mカメラ対応。[CAM-GC2083](https://milkv.io/docs/duo/camera/gc2083)カメラが利用可能。
- J10：15ピン1.0mmピッチ。Raspberry Piカメラインターフェース互換。現在OV5647カメラに対応。

<Image src='/docs/duo/dm01/dm01-evb-csi.webp' maxWidth='70%' align='left' />

J1インターフェースのI2CはI2C3、J2はI2C2を使用します。利用時はピンのマルチプレクス設定を確認してください。

#### J8コネクタFPC定義

（J8コネクタ定義テーブルは英語のまま掲載）

#### J10コネクタFPC定義

（J10コネクタ定義テーブルは英語のまま掲載）

### POEヘッダー

（POEピン定義テーブルは英語のまま掲載）

### ADCインターフェース

（ADCピン定義テーブルは英語のまま掲載）

### MIPI DSIスクリーンインターフェース

（LCDピン定義テーブルは英語のまま掲載）

### RTCインターフェース

（RTCピン定義テーブルは英語のまま掲載）

### オーディオインターフェース

（MICピン定義テーブルは英語のまま掲載）

## Duo Module 01 EVBユーザーガイド

### RISC-VとARMの切り替え

`Duo Module 01 EVB`の大型コアはRISC-VまたはARMプロセッサを選択可能。基板上のスイッチで設定します。EVBが正常起動しない場合は、スイッチと使用ファームウェアが一致しているか確認してください。

<Image src='/docs/duo/dm01/dm01-evb-switch.webp' maxWidth='70%' align='left' />

デバッグシリアルポート接続時、起動ログの1行目が`C`で始まればRISC-Vコア、`B`で始まればARMコアで起動しています。

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```

### USB Type Aインターフェースの利用

EVBのUSB Type AとType Cは排他利用です。デフォルトファームウェアはType CのUSBネットワーク（USB-NCM）機能です。Type AのUSB 2.0 HOST機能（USBメモリ等）を使う場合は以下を実行：

~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
その後`reboot`または再起動で有効化。

USBメモリ接続後、`ls /dev/sd*`で認識確認。

USBメモリをマウント（例：/dev/sda1）：
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
```
内容確認：
```
ls /mnt/udisk
```

アンマウント：
```
umount /mnt/udisk
```

Type CのUSBネットワーク（USB-NCM）機能に戻す場合：
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-ncm.sh /mnt/system/usb.sh
sync
~~~
再起動で有効化。

:::tip
Duo Module 01 EVBは有線LANを搭載しているため、Type CのUSBネットワーク（USB-NCM）は切り替え不要です。
:::

### 有線LANポートMACアドレス固定

EVBのEthernetポートに固定MACアドレスを設定する場合：

:::tip
**コマンド内のMACアドレスは任意のものに変更してください。同一ネットワーク内で重複しないよう注意。**
:::

```
echo "pre-up ifconfig eth0 hw ether 78:01:B3:FC:E8:55" >> /etc/network/interfaces && sync
```

再起動してください。

### UARTシリアルコンソール

Duo Module 01 EVBはUARTデバッグシリアルポートを搭載。起動ログの確認やコンソールログイン、コマンド実行が可能です。

#### USB-TTLシリアルケーブル

Duoシリーズのシリアルレベルは3.3Vです。

一般的なUSB-TTLケーブルのピン定義：

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

#### 接続方法

下記のようにUSB-TTLケーブルを接続（赤線は未接続）：

<div className='gpio_style'>

| Milk-V DouS | \<---> | USB to TTL |
| ----------- | ------ | ---------- |
| GND (pin 6) | \<---> | Black wire |
| TX (pin  8) | \<---> | White wire |
| RX (pin 10) | \<---> | Green wire |

</div>

<Image src='/docs/duo/dm01/dm01-evb-uart.webp' maxWidth='100%' align='left' />

EVBのデフォルトシリアル設定：

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

### WIFI設定

#### 方法1

下記ファイルを編集し、`ssid`と`psk`を接続したいWIFIの情報に変更：

```python {6,7} title="/etc/wpa_supplicant.conf"
ctrl_interface=/var/run/wpa_supplicant
ap_scan=1
update_config=1

network={
  ssid="wifi_test"
  psk="12345678"
  key_mgmt=WPA-PSK
}
```

コマンド実行：

```bash
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
```
接続後、`ifconfig`や`ip a`でIPアドレス確認。

自動接続したい場合は、下記コマンドを`/mnt/system/auto.sh`に記載：

```bash
interface="wlan0"
max_attempts=100
attempt=0
log_file="/var/log/auto.sh.log"

echo "start auto.sh" > "$log_file"
while [ $attempt -lt $max_attempts ]; do
    ip link show "$interface" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "$(date +'%Y-%m-%d %H:%M:%S') $interface interface exists, starting wpa_supplicant..." >> "$log_file"
        wpa_supplicant -B -i "$interface" -c /etc/wpa_supplicant.conf >> "$log_file"
        break
    else
        echo "$(date +'%Y-%m-%d %H:%M:%S') $interface interface not found, waiting..." >> "$log_file"
        sleep 1
        attempt=$((attempt + 1))
    fi
done

if [ $attempt -eq $max_attempts ]; then
    echo "$(date +'%Y-%m-%d %H:%M:%S') Interface $interface not found after $max_attempts attempts" >> "$log_file"
fi
```

### WIFI MACアドレス固定

Duo Module 01 EVBのWIFI MACアドレスはランダムです。固定したい場合は下記コマンドを実行：

:::tip
**コマンド内のMACアドレスは任意のものに変更してください。同一ネットワーク内で重複しないよう注意。**
:::

```bash
echo "MAC_ADDR=11:22:33:44:55:66" > /mnt/system/firmware/aic8800/rwnx_settings.ini && sync
```

再起動してください。

### eMMC版ファームウェア書き込み

Duo Module 01 eMMC版は初期状態でファームウェア未書き込みです。PCとUSB接続で書き込みます。

:::tip
Windows用USB書き込みツールでeMMC対応。ファームウェアは[V1.1.2](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.1.2)または[最新版](https://github.com/milkv-duo/duo-buildroot-sdk/releases)を使用。
:::

#### Windowsでの書き込み

1. ドライバーインストール  
   [CviUsbDownloadInstallDriver.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviUsbDownloadInstallDriver.zip)をダウンロード・解凍・インストール。

2. 書き込みツールダウンロード  
   [CviBurn_v2.0_cli_windows.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviBurn_v2.0_cli_windows.zip)をダウンロード・解凍。

3. ファームウェアダウンロード  
   Duo Module 01のファームウェアはDuoSと共通。[milkv-duos-emmc-v1.1.2-2024-0801.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.2/milkv-duos-emmc-v1.1.2-2024-0801.zip)をダウンロードし、書き込みツールの`rom`フォルダに展開。ディレクトリ構成例：

   ```
   └───CviBurn_v2.0_cli_windows
    │   cv_dl_magic.bin
    │   usb_dl.exe
    └───rom
        │   boot.emmc
        │   fip.bin
        │   partition_emmc.xml
        │   rootfs_ext4.emmc
        |   ...
   ```

   Windowsターミナルで`CviBurn_v2.0_cli_windows`ディレクトリにて：

   ```
   .\usb_dl.exe -s linux -c cv181x -i .\rom
   ```

   *他ディレクトリのファームウェアは-iで指定可能*

   USB接続待ちメッセージ表示：

   <Image src='/docs/duo/duos/duos-emmc-install-01.webp' maxWidth='100%' align='left' />

   **Type-Cデータケーブル**でEVBとPCを接続（SDカード挿入時は抜いてください）。EVBは自動で書き込みモードに入り、PCに進捗が表示されます。

   書き込み完了後、EVBは自動再起動。DuoSの青色LEDが点滅すれば正常起動・書き込み成功です。

### eMMC消去

eMMCを初期化したい場合は、下記コマンドでデータ消去（重要ファイルは事前バックアップ）：

- 読み取り専用解除
  ```
  echo 0 > /sys/block/mmcblk0boot0/force_ro
  echo 0 > /sys/block/mmcblk0boot1/force_ro
  ```
- 消去
  ```
  dd if=/dev/zero of=/dev/mmcblk0boot0 bs=1M count=4
  dd if=/dev/zero of=/dev/mmcblk0boot1 bs=1M count=4
  ```

## ハードウェアドキュメント

### その他

[https://github.com/milkv-duo/duo-files/tree/main/duo-module-01](https://github.com/milkv-duo/duo-files/tree/main/duo-module-01)

