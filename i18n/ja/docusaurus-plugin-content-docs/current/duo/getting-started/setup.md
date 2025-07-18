---
sidebar_label: 'セットアップ'
sidebar_position: 20
---

# 作業環境のセットアップ

## USB NET セットアップ

USBネットワークを利用するため、システムではCDC-NCMとDHCPをデフォルトで有効にしています。

:::tip
ファームウェアが `V1.1.2` より前の場合、USBネットワークはRNDISを使用しています。古いバージョンをお使いの場合は、`V1.1.2` 以降のシステムイメージにアップデートしてください。
:::

CDC-NCMはLinux、macOS、最新のWindowsシステムでドライバ不要です。`ssh root@192.168.42.1` でDuoのターミナルに直接ログインできます。

### Windows

Windowsが古い場合は、以下の手順でCDC-NCMドライバを手動インストールしてください。

1. Duo、Duo256MまたはDuoSをType-CケーブルでPCに接続します。

2. デバイスマネージャーに `CDC NCM` デバイスが表示され、黄色い「！」マークが付きます（ドライバ未インストール）。

   <Image src='/docs/duo/duo-usb-ncm_01.webp' maxWidth='80%' align='left' />

3. `CDC NCM` を右クリックし「ドライバーの更新」を選択。

   <Image src='/docs/duo/duo-usb-ncm_02.webp' maxWidth='80%' align='left' />

4. 「コンピューターを参照してドライバーを検索」を選択。

   <Image src='/docs/duo/duo-usb-ncm_03.webp' maxWidth='80%' align='left' />

5. 「コンピューター上の利用可能なドライバーの一覧から選択」を選択。

   <Image src='/docs/duo/duo-usb-ncm_04.webp' maxWidth='80%' align='left' />

6. 「ネットワークアダプター」を選択。

   <Image src='/docs/duo/duo-usb-ncm_05.webp' maxWidth='80%' align='left' />

7. 「製造元」で `Microsoft`、「モデル」で `UsbNcm Host Device` を選択。

   <Image src='/docs/duo/duo-usb-ncm_06.webp' maxWidth='80%' align='left' />

8. 警告メッセージは無視してください。

   <Image src='/docs/duo/duo-usb-ncm_07.webp' maxWidth='80%' align='left' />

9. ドライバが正常にインストールされます。

   <Image src='/docs/duo/duo-usb-ncm_08.webp' maxWidth='80%' align='left' />

10. 「ネットワークアダプター」で `UsbNcm Host Device` が正常表示されていることを確認。

    <Image src='/docs/duo/duo-usb-ncm_09.webp' maxWidth='80%' align='left' />

11. `ping` コマンドで接続をテスト。

    <Image src='/docs/duo/duo-usb-ncm_10.webp' maxWidth='80%' align='left' />

### Linux & macOS

ターミナルを開き、`ping` コマンドでテストします。

```
ubuntu@linux:~$ ping 192.168.42.1 -c 5
PING 192.168.42.1 (192.168.42.1) 56(84) bytes of data.
64 bytes from 192.168.42.1: icmp_seq=1 ttl=64 time=2.00 ms
64 bytes from 192.168.42.1: icmp_seq=2 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=3 ttl=64 time=2.13 ms
64 bytes from 192.168.42.1: icmp_seq=4 ttl=64 time=2.01 ms
64 bytes from 192.168.42.1: icmp_seq=5 ttl=64 time=2.13 ms

--- 192.168.42.1 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 2.003/2.081/2.132/0.059 ms
```

## SSH

### Windows

1. ターミナルを開き、`ssh root@192.168.42.1` を入力。初回接続時は「yes」と入力します。

   <Image src='/docs/duo/duo-usb-ncm_ssh_01.webp' maxWidth='80%' align='left' />

2. パスワード `milkv` を入力（表示されません）。ログイン成功。

   <Image src='/docs/duo/duo-usb-ncm_ssh_02.webp' maxWidth='80%' align='left' />

## ルートパーティションの拡張

### SDカード起動モードでのルートパーティション拡張

#### 現在のディスク使用状況を確認

`df -h` コマンドで現在のディスクパーティションと使用状況を確認します。

```
[root@milkv-duo]~# df -h
Filesystem Size Used Avail Use% Mounted on
/dev/root 752M 185M 526M 26% /
devtmpfs 159M 0 159M 0% /dev
tmpfs 159M 0 159M 0% /dev/shm
tmpfs 159M 116K 159M 1% /tmp
tmpfs 159M 36K 159M 1% /run
/dev/mmcblk0p1 128M 3.6M 125M 3% /boot
```
ルートパーティション（/dev/root）：752M、使用185M、残り526M。

`fdisk -l` コマンドでディスクとパーティションの詳細を確認します。

```
[root@milkv-duo]~# fdisk -l
Disk /dev/mmcblk0: 29.54 GiB, 31719424000 bytes, 61952000 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device         Boot  Start     End Sectors  Size Id Type
/dev/mmcblk0p1 *         1  262144  262144  128M  c W95 FAT32 (LBA)
/dev/mmcblk0p2      262145  266240    4096    2M  0 Empty
/dev/mmcblk0p3      266241 1839104 1572864  768M 83 Linux
```
ディスク名：/dev/mmcblk0  
合計サイズ：29.54 GiB (31719424000 bytes)  
セクタ数：61952000  
セクタサイズ：512 bytes  
パーティションテーブル：DOS (MBR)

拡張するルートパーティションは /dev/mmcblk0p3 です。開始セクタ 266241 を覚えておきます。

注意：/dev/mmcblk0p1 はブートパーティションなので変更しないでください。

#### fdiskでルートパーティションを拡張

1. `fdisk /dev/mmcblk0` でfdiskを起動します。
```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help):
```
2. 現在のルートパーティションを削除

1. d を入力してパーティションを削除。
2. パーティション番号（通常3）を入力し /dev/mmcblk0p3 を削除。

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.

```
3. 新しいパーティションを作成

1. n を入力して新規作成。
2. p を選択してプライマリパーティション。
3. パーティション番号3を入力。
4. 開始セクタ（ここでは266241）を入力しEnter。
5. 終了セクタはEnterで最大サイズに。

※番号やセクタは実際の環境に合わせてください。

```
[root@milkv-duo]~# fdisk /dev/mmcblk0

Welcome to fdisk (util-linux 2.36.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): d
Partition number (1-3, default 3): 3

Partition 3 has been deleted.

Command (m for help): n
Partition type
   p   primary (2 primary, 0 extended, 2 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (3,4, default 3): 3
First sector (266241-61951999, default 268288): 266241
Last sector, +/-sectors or +/-size{K,M,G,T,P} (266241-61951999, default 61951999): 

Created a new partition 3 of type 'Linux' and of size 29.4 GiB.
Partition #3 contains a ext4 signature.

Do you want to remove the signature? [Y]es/[N]o: N

```
※「Do you want to remove the signature? [Y]es/[N]o」と出たらNを選択。

4. 変更を保存

w を入力して保存し、fdiskを終了します。
```
Command (m for help): w

The partition table has been altered.
Syncing disks.
```

5. ファイルシステムを拡張

fdisk操作後、ファイルシステムを拡張します。
```
[root@milkv-duo]~# resize2fs /dev/mmcblk0p3
resize2fs 1.46.2 (28-Feb-2021)
Filesystem at /dev/mmcblk0p3 is mounted on /; on-line resizing required
old_desc_blocks = 3, new_desc_blocks = 118
```
6. 拡張後のルートパーティションを確認
```
[root@milkv-duo]~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        30G  178M   28G   1% /
devtmpfs        159M     0  159M   0% /dev
tmpfs           159M     0  159M   0% /dev/shm
tmpfs           159M  116K  159M   1% /tmp
tmpfs           159M   36K  159M   1% /run
/dev/mmcblk0p1  128M  3.6M  125M   3% /boot
```
ルートパーティション（/dev/root）：30G、使用178M、残り28G。

#### ルートパーティション拡張スクリプトの作成

内容例：

```
#!/bin/bash

# rootで実行されているか確認
if [ "$EUID" -ne 0 ]; then
echo "rootで実行してください"
exit
fi

# デバイス名設定
DEVICE="/dev/mmcblk0"

# fdiskでパーティション操作
{
echo d # パーティション削除
echo 3 # 3番パーティション
echo n # 新規作成
echo p # プライマリ
echo 3 # 3番
echo 266241 # 開始セクタ
echo # 終了セクタ（最大）
echo N # シグネチャ削除しない
echo w # 保存
} | fdisk "$DEVICE"

# ファイルシステム拡張
resize2fs "${DEVICE}p3"

# 拡張後のディスク使用量表示
df -h
```
※削除・作成するパーティション番号や開始セクタは環境に合わせてください。

スクリプト名を `resize.sh` とし、`chmod +x resize.sh` で実行権限を付与。

`./resize.sh` でルートパーティションを拡張できます。

## その他

### USBネットワークのIPアドレス変更

USBネットワークのデフォルトIPは `192.168.42.1` です。複数のDuoを同じPCに接続する場合など、各DuoのIPを変更するには、Duo内の以下2ファイルを編集します。

```bash {11} showLineNumbers title="/mnt/system/usb-ncm.sh"
#!/bin/sh

/etc/uhubon.sh device >> /tmp/ncm.log 2>&1
/etc/run_usb.sh probe ncm >> /tmp/ncm.log 2>&1
if test -e /usr/bin/burnd; then
  /etc/run_usb.sh probe acm >> /tmp/ncm.log 2>&1
fi
/etc/run_usb.sh start ncm >> /tmp/ncm.log 2>&1

sleep 0.5
ifconfig usb0 192.168.42.1

count=`ps | grep dnsmasq | grep -v grep | wc -l`
if [ ${count} -lt 1 ] ;then
  echo "/etc/init.d/S80dnsmasq start" >> /tmp/ncm.log 2>&1
  /etc/init.d/S80dnsmasq start >> /tmp/ncm.log 2>&1
fi
```

```bash {2} showLineNumbers title="/etc/dnsmasq.conf"
interface=usb0
dhcp-range=192.168.42.2,192.168.42.242,1h
dhcp-option=3
dhcp-option=6
```

### Swapの有効化

#### Swapとは

Swap（スワップ）は仮想RAMとも呼ばれ、物理メモリ（RAM）が不足した際にデータを一時的にストレージへ退避する仕組みです。物理メモリが十分でもキャッシュ容量拡大のために使われることもあります。

:::caution
Swapを有効にするとmicroSDカードの寿命が短くなる場合があります。**メモリ不足時のみ有効化を推奨します！**
:::

#### DuoでSwapを有効にする方法

:::tip
Swapにはパーティション方式とファイル方式があります。`v1.1.3`より前は256MのSwapパーティションが予約されていますが、`v1.1.3`以降はSwapファイル方式が標準です。
:::

最新のシステムイメージはこちら：

[https://github.com/milkv-duo/duo-buildroot-sdk/releases](https://github.com/milkv-duo/duo-buildroot-sdk/releases)

Duoのターミナルで以下を実行し、256MのSwapファイルを作成します（サイズや場所は任意で変更可）。

```bash
fallocate -l 256M /mnt/swapfile
chmod 600 /mnt/swapfile
mkswap /mnt/swapfile
swapon /mnt/swapfile
```

`swapon --show` または `free -h` でSwapが有効（256M）か確認できます。

```bash {3} title="swapon --show"
[root@milkv-duo]~# swapon --show
NAME          TYPE   SIZE USED PRIO
/mnt/swapfile file 255.8M   0B   -2
```

```bash {4} title="free -h"
[root@milkv-duo]~# free -h
              total        used        free      shared  buff/cache   available
Mem:          28.3M       14.3M        3.7M       76.0K       10.3M       11.2M
Swap:        255.8M           0      255.8M
```

起動時に自動でSwapを有効化するには、以下を実行します。

```bash
echo "/mnt/swapfile swap swap defaults 0 0" >> /etc/fstab && sync
```

再起動後、`swapon --show` または `free -h` でSwapが自動有効化されていることを確認してください。

