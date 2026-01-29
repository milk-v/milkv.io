---
sidebar_label: '🌍 概要'
sidebar_position: 1
---

# Milk-V Duo

# Duoシリーズ

# 改訂履歴

| バージョン | 日付       | 前バージョンからの変更点                                         |
| ---------- | ---------- | --------------------------------------------------------------- |
| 0.1        | 2023/11/24 | 初版                                                            |
| 0.2        | 2023/12/15 | Duo 256Mおよび関連製品の紹介                                    |
| 0.3        | 2023/12/27 | Duo Sおよび関連製品の紹介                                       |
| 0.4        | 2024/06/25 | DuoModule 01評価ボードおよび関連製品の紹介                      |

--------------------------------------------------------------------------------------------------------
# はじめに
Milk-V Duoは、CV1800Bチップをベースとした超小型の組み込み開発プラットフォームです。LinuxやRTOSを実行でき、プロフェッショナル、産業用ODM、AIoT愛好家、DIYホビイスト、クリエイター向けに、信頼性が高く低コストかつ高性能なプラットフォームを提供します。

Milk-V Duo 256Mは、メモリを256Mに強化したDuoのアップグレード版で、より大容量メモリを必要とする用途に対応します。SG2002コンピューティングシリーズチップを搭載し、計算能力を1.0TOPS@INT8に向上。RISC-V/ARMアーキテクチャのシームレスな切り替えや、デュアルシステムの同時動作をサポートします。SPIやUARTなど豊富なGPIOインターフェースを備え、IPカメラ、スマートドアロック、ビジュアルドアベルなど、エッジインテリジェント監視の幅広いハードウェア開発に適しています。

Milk-V Duo Sは、SG2000メインコントローラと512MBの大容量メモリ、拡張IO機能を備えたDuoのアップグレードモデルです。WI-FI 6/BT 5の無線機能を統合し、USB 2.0 HOSTインターフェースや100Mbpsイーサネットポートも搭載。デュアルカメラ（2x MIPI CSI 2レーン）やMIPIビデオ出力（MIPI DSI 4レーン）もサポートし、多用途に活用できます。スイッチによるRISC-VとARMのブート切り替えも可能。機能強化により、より複雑なプロジェクト開発にも対応します。

Duo Module 01は、SG2000、WI-FI6/BTDM5.4、eMMCを統合したコンパクトなモジュールで、SMD実装に対応。製品開発期間を大幅に短縮できます。製品化の第一選択肢です。Duo Module 01の開発体験を向上させるため、Milk-VはDuoModule 01評価ボードを提供し、開発評価やリファレンス設計をサポートします。

# 仕様
|                | [Duo(EOL)](/docs/duo/getting-started/duo)                                 | [Duo 256M](/docs/duo/getting-started/duo256m)                             | [Duo S](/docs/duo/getting-started/duos)                                       | DuoModule 01評価ボード                                                        |
| -------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 概要           | <Image src='/docs/duo/duo-v1.2-top.webp' maxWidth='70%' align='center' /> | <Image src='/docs/duo/duo256m-v1.0.webp' maxWidth='75%' align='center' /> | <Image src='/docs/duo/duos-x1.0.webp' maxWidth='70%' align='center' />        | <Image src='/docs/duo/dm01/dm01-eb.webp' maxWidth='70%' align='center' />     |
| SoC            | CVITEK CV1800B                                                            | SG2002                                                                    | SG2000                                                                        | SG2000                                                                        |
| RISC-V CPU     | C906@1Ghz + C906@700MHz                                                   | C906@1Ghz + C906@700MHz                                                   | C906@1Ghz + C906@700MHz                                                       | C906@1Ghz + C906@700MHz                                                       |
| Arm CPU        | なし                                                                      | 1 x Cortex-A53@1GHz                                                       | 1 x Cortex-A53@1GHz                                                           | 1 x Cortex-A53@1GHz                                                           |
| MCU            | 8051@8KB SRAM                                                             | 8051@6KB SRAM                                                             | 8051@6KB SRAM                                                                 | 8051@6KB SRAM                                                                 |
| TPU            | 0.5TOPS@INT8                                                              | 1TOPS@INT8                                                                | 0.5TOPS@INT8                                                                  | 0.5TOPSs@INT8                                                                 |
| ストレージ     | 1 x microSDコネクタ または 1x SD NANDオンボード                            | 1 x microSDコネクタ または 1x SD NANDオンボード                            | 1 x microSDコネクタ, 1x eMMCパッドオンボード                                  | 1 x microSDコネクタ, 1x 8GB eMMCオンボード                                    |
| メモリ         | SIP DRAM 64MB                                                             | SIP DRAM 256MB                                                            | SIP DRAM 512MB                                                                | SIP DRAM 512MB                                                                |
| USB            | 1 x Type-C（電源・データ用）、USBパッド利用可                              | 1 x Type-C（電源・データ用）、USBパッド利用可                              | 1 x Type-C（電源・データ用）または1x USB 2.0 AポートHOST                      | 1 x Type-C（電源・データ用）または4x USB 2.0 AポートHOST                      |
| CSI            | 1 x 16P FPCコネクタ（MIPI CSI 2レーン）                                   | 1 x 16P FPCコネクタ（MIPI CSI 2レーン）                                   | 1x 16P FPCコネクタ（MIPI CSI 2レーン）,1x 15P FPCコネクタ（MIPI CSI 2レーン） | 1x 16P FPCコネクタ（MIPI CSI 2レーン）,1x 15P FPCコネクタ（MIPI CSI 2レーン） |
| センサー対応   | 4M @ 25fps                                                                | 5M @ 30fps                                                                | 5M @ 30fps                                                                    | 5M @ 30fps                                                                    |
| イーサネット   | 100Mbps PHY内蔵イーサネット                                              | 100Mbps PHY内蔵イーサネット                                              | 100Mbpsイーサネットポート（RJ45）オンボード                                   | 2x 100Mbpsイーサネットポート（RJ45）                                          |
| 無線           | なし                                                                      | なし                                                                      | オプションでWIFI6 / BT5.4オンボード                                           | WIFI6 / BT5.4オンボード                                                       |
| オーディオ     | なし                                                                      | GPIOパッド経由                                                           | GPIOヘッダー経由                                                              | 1x 3.5mmジャック（音声出力）、2x 2p（マイク入力）                             |
| ディスプレイ   | なし                                                                      | なし                                                                      | GPIOヘッダー経由（MIPI DSI 4レーン）                                          | 1x 39P FPCコネクタ（MIPI DSI 4レーン）                                        |
| GPIO           | 最大26ピンの汎用I/O（GPIO）利用可                                        | 最大26ピンの汎用I/O（GPIO）利用可                                        | 最大39ピンGPIO（2x 26ピンGPIOヘッダー経由）                                   | 最大19ピンGPIO（GPIOヘッダー経由）                                            |
| 電源           | 5V/1A                                                                     | 5V/1A                                                                     | 5V/1A                                                                         | 5V/1A                                                                         |
| OSサポート     | Buildroot, RTOS                                                           | Buildroot, RTOS                                                           | Buildroot, RTOS                                                               | Buildroot, RTOS                                                               |
| サイズ         | 21mm*51mm                                                                 | 21mm*51mm                                                                 | 43mm x 43mm                                                                   | 100mm x 75mm                                                                  |
| その他         | なし                                                                      | なし                                                                      | 1x BOOTスイッチ, 1x リカバリーキー, 1x RSTキー                                | 1x BOOTスイッチ, 1x リカバリーキー, 1x RSTキー                                |

:::tip
SOPHGOによるCV1800Bの製造終了に伴い、Milk-V Duoは生産終了となります。Milk-V Duo 256MまたはDuo Sのご利用を推奨します。
:::

# 特徴

## プロセッサ

### CV1800B（Duo）
- 1GHzおよび700MHz RISC-V C906プロセッサ
- CVITEK TPU内蔵によるスマート検出
- SIP DRAM 64MB
- H.264/H.265ビデオエンコード対応、最大2880x1620@20fps
- 高解像度CMOSセンサー対応
- センサークロック用プログラマブル周波数出力
- 画像最適化のための包括的なISP機能
- CVハードウェアアクセラレーションによるOpenCVライブラリ一部対応
- 16ビットオーディオコーデック、マイク入力・出力機能内蔵
- 1つのEthernet PHYによる柔軟なネットワーク構成

### SG2002（Duo 256M）
- 1GHzおよび700MHz RISC-V C906プロセッサ
- **オプションでT-Head C906@1GHzまたはCortex-A53@1GHz**
- **1TOPS@INT8** TPU内蔵によるスマート検出
- SIP DRAM 256MB
- H.264/H.265ビデオエンコード対応、最大**5M@30fps**
- 高解像度CMOSセンサー対応
- SPI-NOR、SPI-NAND、eMMC5.0、2 x SDIO3.0インターフェースによる複数ストレージデバイス対応
- 画像最適化のための包括的なISP機能
- CVハードウェアアクセラレーションによるOpenCVライブラリ一部対応
- 16ビットオーディオコーデック、マイク入力・出力機能内蔵
- 2L MIPI DSI 5M@30fps
- 4Lまたは2L+2L MIPI CSI 5M@30fps
- 1つのEthernet PHYによる柔軟なネットワーク構成
- QFN88

### SG2000（Duo S）
- 1GHzおよび700MHz RISC-V C906プロセッサ
- **オプションでT-Head C906@1GHzまたはCortex-A53@1GHz**
- 0.5TOPS@INT8 TPU内蔵によるスマート検出
- SIP DRAM 512MB
- H.264/H.265ビデオエンコード対応、最大**5M@30fps**
- 高解像度CMOSセンサー対応
- SPI-NOR、SPI-NAND、eMMC5.0、2 x SDIO3.0インターフェースによる複数ストレージデバイス対応
- 画像最適化のための包括的なISP機能
- CVハードウェアアクセラレーションによるOpenCVライブラリ一部対応
- 16ビットオーディオコーデック、マイク入力・出力機能内蔵
- 2L MIPI DSI 5M@30fps
- 4Lまたは2L+2L MIPI CSI 5M@30fps
- 1つのEthernet PHYによる柔軟なネットワーク構成
- LFBGA

## クイックスタート
[イメージダウンロード](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

[イメージのビルド方法](https://milkv.io/docs/duo/getting-started/buildroot-sdk)

[ハードウェアドキュメント](https://github.com/milkv-duo/duo-files)

[チップデータシート](https://github.com/sophgo/sophgo-doc/releases)

## サポート
サポートが必要な場合は、[Milk-V Community Duoカテゴリ](https://community.milkv.io/c/duo/5)にご投稿ください。

