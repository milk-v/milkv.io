---
sidebar_label: '起動'
sidebar_position: 10
---

# microSDカードからの起動

## 準備

- 必要なもの
  - Duo、Duo256M または DuoS
  - 1GB以上のmicroSDカード
  - Type-Cケーブル
- 任意
  - USB to TTLシリアルケーブル

## イメージとツールのダウンロード

- [リソースダウンロードまとめ](https://milkv.io/docs/duo/getting-started/download)からシステムイメージをダウンロードします。
- フラッシュツール [balenaEtcher](https://etcher.balena.io/) または [Rufus](https://rufus.ie/en/) をダウンロードします。

## イメージの書き込み

balenaEtcherを使用する手順です。

- **Flash from file** をクリック

![etcher-step1](/docs/duo/etcher-step1.png)

- **Select target** をクリック

![etcher-step2](/docs/duo/etcher-step2.png)

- **Flash!** をクリック

![etcher-step3](/docs/duo/etcher-step3.png)

## 電源オン

DuoをType-Cケーブルでアダプター（5V）またはPCのUSBに接続します。

Duoの青色LEDが点滅します。

:::tip
起動後に青色LEDが点滅しない場合、システムが正常に動作していない可能性があります。microSDに書き込んだイメージに問題があるかもしれません。他の書き込みソフト（balenaEtcher、Rufus、Win32DiskImagerなど）で再度イメージを書き込んでみてください。それでも正常に起動しない場合は、シリアルケーブルを接続し、起動後のログを送信していただければ解析します。
:::

## トラブルシューティング

問題が発生した場合は、[コミュニティ](https://community.milkv.io/)で投稿してください。

