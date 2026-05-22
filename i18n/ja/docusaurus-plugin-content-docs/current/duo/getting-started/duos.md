---
sidebar_label: 'Duo S (SG2000)'
sidebar_position: 3
---

# Duo S

<Image src='/docs/duo/duos/duos-v1.1.webp' maxWidth='70%' align='center' />

Milk-V Duo Sは、Duoのアップグレードモデルで、より大きな512MBメモリと拡張されたIO機能を備えたSG2000メインコントローラを搭載しています。WI-FI 6/BT 5による無線機能を統合し、USB 2.0 HOSTインターフェースと100Mbpsイーサネットポートを装備しています。デュアルカメラ（2x MIPI CSI 2レーン）とMIPIビデオ出力（MIPI DSI 4レーン）をサポートし、幅広い用途に対応します。また、スイッチでRISC-VとARMのブート切り替えが可能です。機能が強化され、より複雑なプロジェクト開発にも適しています。

## SG2000の紹介

SG2000は、エッジインテリジェント監視IPカメラ、顔認証出勤機、スマートホーム機器など様々な分野向けに設計された高性能・低消費電力チップです。H.264/H.265のビデオ圧縮・デコード、ISP機能を統合し、HDR広ダイナミックレンジ、3Dノイズリダクション、デフォグ、レンズ歪み補正などの画像補正アルゴリズムをサポートします。

独自TPUを内蔵し、INT8演算で約0.5TOPSの計算能力を発揮します。TPUスケジューリングエンジンにより高帯域幅のデータフローを効率的に提供。Caffe、Pytorch、ONNX、MXNet、TensorFlow(Lite)など主流のディープラーニングフレームワークを容易に移植できます。

## SG2000 公開プレビュー データシート

SG2000の公開プレビュー版データシートとTRMをGitHubで公開しています。[こちら](https://github.com/milkv-duo/duo-files/tree/main/duo-s/datasheet)をご覧ください。

## SG2000チップの購入

Milk-VはSG2000チップの認定グローバルディストリビューターです。サンプルは[オンラインストア](https://arace.tech/products/sophon-cv1800b-5pcs)から購入できます。大量注文は[Milk-V営業チーム](mailto:sales@milkv.io)までお問い合わせください。

## はじめに

### システムのインストール

- SDカードから起動  
  [スタートアップ](https://milkv.io/docs/duo/getting-started/boot)セクションを参照してください。

- eMMCから起動  
  [eMMC版ファームウェア書き込み](https://milkv.io/docs/duo/getting-started/duos#emmc-version-firmware-burning)セクションを参照してください。

### USBネットワークの利用

[セットアップ](https://milkv.io/docs/duo/getting-started/setup)セクションを参照してください。

## DuoS GPIOピン配置

<Image src='/docs/duo/duos/duos-pinout-v1.1.webp' maxWidth='50%' align='center' />

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

### ヘッダーJ3

`Header J3`のGPIOは3.3Vロジックレベルです。

<div className='gpio_style' style={{ overflow :"auto"}} >

<!-- テーブル内容は省略（英語のまま） -->

</div>

*GND\*: ピン9はV1.1ハードウェアでは低レベルGPIO、V1.2以降ではGNDです。*

注: CSIカメラコネクタJ2のI2CはI2C2です。J2でCSIカメラを使う場合、J3ピンヘッダーのI2C2は利用できません。

### ヘッダーJ4

`Header J4`のGPIOは1.8Vロジックレベルです。

<div className='gpio_style' style={{ overflow :"auto"}} >

<!-- テーブル内容は省略（英語のまま） -->

</div>

### 青色LEDピン

<div className='gpio_style'>

| NAME                            | SG2000     | NUM |
|:-------------------------------:|:----------:|:---:|
| <div className='blue'>LED</div> | XGPIOA[29] | 509 |

</div>

### カメラインターフェース

DuoSは2つのCSIカメラコネクタを搭載しています。

- J1は16ピン0.5mmピッチコネクタで、Duo/Duo256Mカメラと互換性があり、[CAM-GC2083](https://milkv.io/docs/duo/camera/gc2083)カメラが使用可能です。
- J2は15ピン1.0mmピッチコネクタで、Raspberry Piカメラインターフェースと互換性があります。現在Raspberry Pi用OV5647カメラをサポートしています。

<Image src='/docs/duo/duos/duos-camera-csi-port.webp' maxWidth='50%' align='center' />

J1のI2CはI2C3、J2のI2CはI2C2です。使用時はピンのマルチプレックス設定を確認してください。

#### J1コネクタFPC定義

<div className='gpio_style'>

<!-- テーブル内容は省略（英語のまま） -->

</div>

#### J2コネクタFPC定義

<div className='gpio_style'>

<!-- テーブル内容は省略（英語のまま） -->

</div>

### POEヘッダー

<Image src='/docs/duo/duos/duos-poe-pinout.webp' maxWidth='50%' align='left' />

<div className='gpio_style'>

<!-- テーブル内容は省略（英語のまま） -->

</div>

## DuoSユーザーガイド

### RISC-VとARMの切り替え

DuoSの大コアはRISC-VまたはARMプロセッサを選択可能で、基板上のスイッチで設定します。起動しない場合は、スイッチと使用ファームウェアが一致しているか確認してください。

<Image src='/docs/duo/duos/duos-arm-riscv-switch.webp' maxWidth='70%' align='center' />

デバッグシリアルポート接続時、起動ログの1行目が`C`で始まればRISC-Vコア、`B`で始まればARMコアです。

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```

### USB Type Aインターフェースの利用

DuoSのUSB Type AとType Cインターフェースは同時利用できません。デフォルトファームウェアはType CポートのUSBネットワーク（USB-NCM）機能です。Type AポートのUSB 2.0 HOST機能に切り替える場合は、以下を実行してください。

~~~
ln -sf /mnt/system/usb-host.sh /mnt/system/usb.sh
sync
~~~
その後、`reboot`コマンドまたは再起動で反映されます。

USBメモリをType Aポートに接続後、`ls /dev/sd*`で認識状況を確認できます。

USBメモリをマウントして内容を確認（例: /dev/sda1）:
```
mkdir /mnt/udisk
mount /dev/sda1 /mnt/udisk
ls /mnt/udisk
```

USBメモリのアンマウント:
```
umount /mnt/udisk
```

Type CポートのUSBネットワーク（USB-NCM）機能に戻す場合は以下を実行:
~~~
rm /mnt/system/usb.sh
ln -sf /mnt/system/usb-ncm.sh /mnt/system/usb.sh
sync
~~~
その後、`reboot`コマンドまたは再起動で反映されます。

:::tip
DuoSはイーサネットインターフェースを搭載しているため、Type CポートのUSBネットワーク（USB-NCM）は切り替え不要で利用できます。
:::

### イーサネットポートのMACアドレス固定

イーサネットポートのMACアドレスを固定する場合、以下を実行してください。

:::tip
**コマンド内のMACアドレスは任意のものに変更してください。同一ネットワーク内で重複しないようご注意ください。**
:::

```
echo "pre-up ifconfig eth0 hw ether 78:01:B3:FC:E8:55" >> /etc/network/interfaces && sync
```

その後、再起動してください。

### UARTシリアルコンソール

DuoSはUARTデバッグシリアルポートを搭載しており、システム起動ログの確認やコンソールログインが可能です。

#### USB-TTLシリアルケーブル

Duoシリーズのシリアルポートレベルは3.3Vです。

一般的なUSB-TTLシリアルケーブルのピン定義:

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

#### 接続方法

USB-TTLシリアルケーブルは下記のように接続し、赤線は未接続です。

<div className='gpio_style'>

| Milk-V DouS | \<---> | USB to TTL |
| ----------- | ------ | ---------- |
| GND (pin 6) | \<---> | 黒線       |
| TX (pin  8) | \<---> | 白線       |
| RX (pin 10) | \<---> | 緑線       |

</div>

<Image src='/docs/duo/duos/duos-serial-port.webp' maxWidth='100%' align='left' />

DuoSのデフォルトシリアルポートパラメータ:

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

### WIFI設定

#### 方法1

下記ファイルを編集し、`ssid`と`psk`を接続するWIFIのアカウントとパスワードに変更してください。

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

次に以下を実行:

```bash
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
```
WIFIに接続できます。接続後、`ifconfig`または`ip a`でIPアドレスを確認できます。

起動時に自動接続したい場合は、下記コマンドを`/mnt/system/auto.sh`に記載してください。

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

DuoSのWIFI MACアドレスはランダムです。固定する場合は以下を実行してください。

:::tip
**コマンド内のMACアドレスは任意のものに変更してください。同一ネットワーク内で重複しないようご注意ください。**
:::

```bash
echo "MAC_ADDR=11:22:33:44:55:66" > /mnt/system/firmware/aic8800/rwnx_settings.ini && sync
```

その後、再起動してください。

### eMMC版ファームウェア書き込み

DuoS eMMC版はファームウェア未書き込みのため、PCからUSB経由で書き込みが必要です。

:::tip
Windows用USB書き込みツールでeMMCに対応。ファームウェアは[V1.1.3](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/v1.1.3)または[最新版](https://github.com/milkv-duo/duo-buildroot-sdk/releases)を使用してください。
:::

#### Windowsでの書き込み

1. ドライバーインストール

   USBドライバーインストールツール: [CviUsbDownloadInstallDriver.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviUsbDownloadInstallDriver.zip)をダウンロード・解凍・インストール。

2. 書き込みツールダウンロード

   Windows用コマンドライン書き込みツール [CviBurn_v2.0_cli_windows.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/Duo-V1.1.0/CviBurn_v2.0_cli_windows.zip)をダウンロード・解凍。

3. ファームウェアダウンロード

   DuoS eMMC最新版ファームウェア [milkv-duos-emmc-v1.1.3-2024-0930.zip](https://github.com/milkv-duo/duo-buildroot-sdk/releases/download/v1.1.3/milkv-duos-emmc-v1.1.3-2024-0930.zip)をダウンロードし、書き込みツール`CviBurn_v2.0_cli_windows`ディレクトリ内にromフォルダを作成し、解凍したファームウェアをromフォルダに展開。ディレクトリ構成例:

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

   Windowsターミナルで`CviBurn_v2.0_cli_windows`ディレクトリ内で以下を実行:

   ```
   .\usb_dl.exe -s linux -c cv181x -i .\rom
   ```

   *他ディレクトリのファームウェアも-iパラメータで指定可能です。*

   USB接続待ちメッセージが表示されます:

   <Image src='/docs/duo/duos/duos-emmc-install-01.webp' maxWidth='100%' align='center' />

   DuoSのリカバリーボタンを押しながら、**Type-Cデータケーブル**でPCと接続。

   :::warning
   この手順前にSDカードを抜いてください!!
   :::

   <Image src='/docs/duo/duos/duos-emmc-install-02.jpg' maxWidth='100%' align='center' />
   
   リカバリーボタンを離すとDuoSが起動し、書き込みモードに入ります。PC側で進捗が表示されます。

   書き込み完了後、DuoSは自動再起動します。青色LEDが点滅すれば正常起動・書き込み成功です。

### eMMC消去

eMMCを初期化する場合、下記コマンドでデータを消去してください（重要ファイルは事前にバックアップしてください）。

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

[https://github.com/milkv-duo/duo-files/tree/main/duo-s](https://github.com/milkv-duo/duo-files/tree/main/duo-s)

