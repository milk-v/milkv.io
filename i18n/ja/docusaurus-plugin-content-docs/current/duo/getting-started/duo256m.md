---
sidebar_label: 'Duo 256M (SG2002)'
sidebar_position: 1
---

# Duo256M

 <Image src='/docs/duo/duo256m-overview-v1.0.webp' maxWidth='70%' align='center' />

Milk-V Duo 256Mは、メモリ容量を256Mに強化したDuoのアップグレード版で、より大きなメモリ容量を必要とするアプリケーションに対応します。SG2002コンピューティングシリーズチップを搭載し、計算能力は1.0TOPS@INT8に向上。RISC-V/ARMアーキテクチャの切り替えが可能で、デュアルシステムの同時動作にも対応しています。SPIやUARTなど豊富なGPIOインターフェースを備え、IPカメラ、スマートドアロック、ビジュアルドアベルなど、エッジインテリジェント監視の幅広いハードウェア開発に適しています。

## SG2002の紹介

SG2002は、エッジインテリジェント監視IPカメラ、スマートドアロック、ビジュアルドアベル、ホームインテリジェンスなど様々な製品分野向けに設計された高性能・低消費電力チップです。H.264ビデオ圧縮・デコード、H.265ビデオ圧縮・エンコード、ISP機能を統合。HDRワイドダイナミックレンジ、3Dノイズリダクション、デフォッギング、レンズ歪み補正などの画像強化・補正アルゴリズムをサポートし、プロフェッショナルな映像品質を提供します。

独自開発のTPUを搭載し、8ビット整数演算で1.0 TOPSの計算能力を発揮。TPUスケジューリングエンジンにより、全てのテンソル処理ユニットコアに高帯域幅のデータフローを効率的に供給します。深層学習モデルコンパイラやSDK開発キットも提供。CaffeやTensorflowなど主要なディープラーニングフレームワークも容易に移植可能です。セキュアブート、セキュアアップデート、暗号化など、開発から量産、製品応用まで一連のセキュリティソリューションも備えています。

8ビットMCUサブシステムを統合し、外部MCUを置き換えることでコスト削減と省電力化を実現しています。

## SG2002 公開予備データシート

SG2002の公開予備データシートとTRMをGitHubで公開しています。[こちら](https://github.com/milkv-duo/duo-files/tree/main/duo-256M/datasheet)をご覧ください。

## SG2002チップの購入

Milk-VはSG2002チップの認定グローバルディストリビューターです。サンプルは[オンラインストア](https://arace.tech/products/sophon-cv1800b-5pcs)から直接購入できます。大量注文の場合は[Milk-V営業チーム](mailto:sales@milkv.io)までお問い合わせください。

## はじめに

### システムのインストール

[スタートアップ](https://milkv.io/docs/duo/getting-started/boot)セクションをご参照ください。

### USBネットワークの利用

[セットアップ](https://milkv.io/docs/duo/getting-started/setup)セクションをご参照ください。

## Duo256M GPIOピン配置

<Image src='/docs/duo/duo256m/duo256m-pinout-01.webp' maxWidth='50%' align='center' />

### GPIOピンマッピング

<div className='gpio_style'>

| グループ | アドレス        | ポート | チップ      | 番号     | 名称      | 開始               |
|:-------:|:--------------:|:------:|:----------:|:-------:|:----------|:-------------------|
| gpio0   | gpio@03020000  | porta  | gpiochip0  | 480-511 | XGPIOA    | 480 - XGPIOA[0]    |
| gpio1   | gpio@03021000  | portb  | gpiochip1  | 448-479 | XGPIOB    | 448 - XGPIOB[0]    |
| gpio2   | gpio@03022000  | portc  | gpiochip2  | 416-447 | XGPIOC    | 416 - XGPIOC[0]    |
| gpio3   | gpio@03023000  | portd  | gpiochip3  | 384-415 |           |                    |
| gpio4   | gpio@05021000  | porte  | gpiochip4  | 352-383 | PWR_GPIO  | 352 - PWR_GPIO[0]  |

</div>

### GPIOピン配置

<div className='gpio_style' style={{ overflow :"auto"}} >

<!-- テーブル内容は英語のままですが、必要に応じて日本語化できます -->

</div>

`GP26`と`GP27`ピンの論理レベルは1.8V、その他のGPIOピンは3.3V論理レベルです。

### カメラインターフェース

Duo256Mカメラは0.5mmピッチの16ピンコネクタを使用し、[CAM-GC2083](https://milkv.io/docs/duo/camera/gc2083)カメラヘッドに直接接続できます。

#### コネクタFPC定義

<Image src='/docs/duo/duo/duo-camera-csi-port.webp' maxWidth='50%' align='left' />

<div className='gpio_style'>

| J1 | 説明                |
|:--:|:--------------------|
| 1  | GND                 |
| 2  | MIPI0_DN0           |
| 3  | MIPI0_DP0           |
| 4  | GND                 |
| 5  | MIPI0_DN1           |
| 6  | MIPI0_DP1           |
| 7  | GND                 |
| 8  | MIPI0_CKN           |
| 9  | MIPI0_CKP           |
| 10 | GND                 |
| 11 | SENSOR_RSTN  (1.8V) |
| 12 | SENSOR_CLK   (1.8V) |
| 13 | I2C2_SCL     (1.8V) |
| 14 | I2C2_SDA     (1.8V) |
| 15 |                     |
| 16 | 3V3                 |

</div>

## Duo256M ユーザーガイド

### UARTシリアルコンソール

Duo256MにはUARTデバッグシリアルポートがあり、システム起動ログの表示や、起動後のコンソールログイン・コマンド実行が可能です。

#### USB-TTLシリアルケーブル

Duoシリーズのシリアルポートレベルは3.3Vです。

一般的なUSB-TTLシリアルケーブルのピン定義は以下の通りです。

<Image src='/docs/common/usb2ttl.webp' maxWidth='100%' align='left' />

#### 接続方法

USB-TTLシリアルケーブルを下記のように接続し、赤い線は接続しません。

<div className='gpio_style'>

| Milk-V Duo256M | \<---> | USB to TTL |
| -------------- | ------ | ---------- |
| TX (pin 16)    | \<---> | 白色線     |
| RX (pin 17)    | \<---> | 緑色線     |
| GND (pin 18)   | \<---> | 黒色線     |

</div>

<Image src='/docs/duo/duo/duo-duo256m-serial-port.webp' maxWidth='100%' align='left' />

Duo256Mのデフォルトシリアルポートパラメータは以下の通りです。

```
baudrate: 115200
data bit: 8
stop bit: 1
parity  : none
flow control: none
```

### RISC-VとARMの切り替え

Duo256Mの大型コアはRISC-VまたはARMプロセッサを選択可能です。デフォルトはRISC-Vコアです。物理ピン35（Boot-Switch）とGNDをショートさせることでARMコアに切り替えられます。起動できない場合は、使用中のコアとファームウェアが一致しているかご確認ください。

<Image src='/docs/duo/duo256m/duo256m-arm-riscv-switch.webp' maxWidth='50%' align='center' />

デバッグシリアルポートを接続すると、起動ログの最初の行で、`C`で始まる場合はRISC-Vコア、`B`で始まる場合はARMコアで起動しています。

- RISC-V:
  ```
  C.SCS/0/0.C.SCS/0/0.WD.URPL.USBI.USBW
  ```
- ARM:
  ```
  B.SCS/0/0.WD.URPL.B.SCS/0/0.WD.URPL.USBI.USBW
  ```

## ハードウェアドキュメント

### その他

[https://github.com/milkv-duo/duo-files/tree/main/duo-256M](https://github.com/milkv-duo/duo-files/tree/main/duo-256M)

