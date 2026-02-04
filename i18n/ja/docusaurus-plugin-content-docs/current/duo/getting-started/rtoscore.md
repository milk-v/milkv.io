---
sidebar_label: 'RTOSコア'
sidebar_position: 50
---

# はじめに

DuoのCPUはデュアルコア設計を採用しています。ビッグコアはLinuxシステムを、スモールコアはリアルタイムシステム（現在はFreeRTOS）を実行します。

# スモールコアの使い方

## コア間通信の例

Duoのビッグコアとスモールコア間の通信は、メールボックスモジュールを通じて実現されています。最新のイメージでは、ビッグコアのLinuxカーネルにメールボックスドライバが追加されています。関連機能はスモールコアのFreeRTOSコードにも実装されています。[V1.0.9](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.0.9) または [最新イメージ](https://github.com/milkv-duo/duo-buildroot-sdk/releases) でテストしてください。

### ビッグコアがスモールコアを制御してLEDを点灯

この例は、ビッグコア上で動作するLinuxアプリケーションで、Linuxカーネルのメールボックスドライバを使用してスモールコアのFreeRTOSに通知し、Duoの青色LEDを制御します。LEDは最初に点灯し、3秒後に消灯します。

```c
// 省略: C言語のサンプルコード（元の内容と同じ）
```

テストプログラムは [duo-examples](https://github.com/milkv-duo/duo-examples/tree/main/mailbox-test) リポジトリに配置されています。初めてこのリポジトリを利用する場合は、[README](https://github.com/milkv-duo/duo-examples/blob/main/README.md) を参照して環境を構築し、コンパイルを完了してください。

1. 推奨コンパイル環境は `Ubuntu 22.04 LTS` です。
2. 依存ツールをインストールします:
   ```
   sudo apt-get install wget git make
   ```
3. [duo-examples](https://github.com/milkv-duo/duo-examples) のソースコードを取得します:
   ```
   git clone https://github.com/milkv-duo/duo-examples.git --depth=1
   ```
4. コンパイル環境を準備します:
   ```
   cd duo-examples
   source envsetup.sh
   ```
5. `mailbox-test` ディレクトリに移動し、makeを実行します:
   ```
   cd mailbox-test
   make
   ```

コンパイルが成功したら、生成された `mailbox_test` テストプログラムをネットワークポートまたはUSBネットワーク（USB-NCM）経由でDuoに転送します。USBネットワークモードの場合、DuoのIPは `192.168.42.1`、ユーザー名は `root`、パスワードは `milkv` です。
```
$ scp mailbox_test root@192.168.42.1:/root/
```

Duo上で `mailbox_test` プログラムに実行権限を付与します:
```
chmod +x mailbox_test
```

Duoのデフォルトファームウェアでは、ビッグコアのLinuxシステムがLEDの点滅を制御しており、これは起動スクリプトによって実現されています。このプログラムをテストする際は、LED点滅を担当するスクリプトを無効化する必要があります。Duoのターミナルで以下のコマンドを実行してください:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```

このコマンドでLED点滅スクリプトの名前を変更します。Duoを再起動するとLEDは点滅しなくなります。

Duoのシリアルポートターミナルで `./mailbox_test` テストを実行すると、以下のような出力が得られます:
```
[root@milkv-duo]~# ./mailbox_test 
RT: [507.950049]prvQueueISR
RT: [507.952485]recv cmd(19) from C906B, param_ptr [0x00000002]
RT: [507.958306]recv cmd(19) from C906B...send [0x00000004] to C906B
C906B: cmd.param_ptr = 0x4
RT: [511.965433]prvQueueISR
RT: [511.967867]recv cmd(19) from C906B, param_ptr [0x00000003]
RT: [511.973689]recv cmd(19) from C906B...send [0x00000004] to C906B
C906B: cmd.param_ptr = 0x3
```

Duoの青色LEDが最初に点灯し、その後消灯することが確認できます。

`RT` で始まるログはスモールコアの `FreeRTOS` から、`C906B` で始まるログはビッグコアの `mailbox_test` アプリケーションから出力されています。

ログを見ると、ビッグコアがLED点灯コマンドをスモールコアに送信した後、スモールコアが0x4（0x00000004）で応答し、ビッグコアも0x4を受信しています。同様に、消灯コマンド送信後もスモールコアは0x4で応答しますが、ビッグコア側で表示される値は0x3です。これは、`RTOS_CMDQU_SEND_WAIT` と `RTOS_CMDQU_SEND` の使い分けによるものです:
```
RTOS_CMDQU_SEND_WAIT  戻り値（ACK）を待つ
RTOS_CMDQU_SEND       戻り値なし
```

さらに、ビッグコアLinuxカーネルのメールボックスドライバの関連ログを確認したい場合は、以下のいずれかの方法を利用できます。

1. シリアルターミナルでカーネルログレベルを変更:
   ```
   echo 8 > /proc/sys/kernel/printk
   ```
   その後テストプログラムを実行:
   ```
   ./mailbox_test 
   ```
2. `dmesg` コマンドを使用

### 付録

関連コードのディレクトリ:

1. ビッグコアのメールボックスLinuxドライバ:
   ```
   linux_5.10/drivers/soc/cvitek/rtos_cmdqu/
   ```
2. スモールコアのFreeRTOS:
   ```
   freertos/cvitek/driver/rtos_cmdqu/include/rtos_cmdqu.h
   freertos/cvitek/task/comm/src/riscv64/
   ```

