---
sidebar_label: 'Arduino'
sidebar_position: 51
---

# はじめに

Arduinoは、シンプルさ・使いやすさ・オープン性で知られる人気のオープンソースハードウェアプラットフォームです。豊富なライブラリ関数やサンプルコードが用意されており、プログラミング未経験者でも扱いやすいのが特徴です。また、活発なコミュニティがあり、様々なプロジェクトチュートリアルやドキュメント、サポートも充実しています。

Milk-V DuoシリーズはArduino開発に対応しています。Arduino IDEを直接利用でき、簡単な設定後すぐに使い始めることができます。

DuoシリーズのCPUはbig-littleコア設計を採用しており、Arduinoファームウェアはリトルコア上で動作し、ビッグコアはArduino IDEとの通信を担当します。Arduinoファームウェアを受信し、リトルコアにロードして実行します。同時に、ビッグコアのLinuxシステムも通常通り動作します。

また、Duoシリーズボードはビジュアルプログラミングソフト「VISUINO」にも対応しています。詳細は[VISUINO](https://milkv.io/docs/duo/resources/visuino)の章をご参照ください。

## 1. 開発環境のセットアップ

### Arduino IDEのインストール

Arduino IDEはWindows、Linux、macOSの3つのOSに対応しています。ご利用のOSに合わせて[Arduino公式サイト](https://www.arduino.cc/en/software)からインストーラーをダウンロードしてください。現在の最新版は2.3.2で、最新版の利用を推奨します。

### Arduino IDEにDuoを追加

Arduino IDEを開き、``ファイル``メニューの``環境設定``を選択し、``設定``タブの``追加のボードマネージャのURL``に以下のDuo設定ファイルアドレスを追加します。

```
https://github.com/kubuds/sophgo-arduino/releases/download/v0.2.5/package_sg200x_index.json
```

<Image src='/docs/duo/arduino/duo-arduino-01.webp' minWidth='40%' maxWidth='100%' align='left' />

他の開発ボードのURLを既に設定している場合はカンマで区切るか、アドレスバー右側のアイコンをクリックしてウィンドウを表示し、案内に従って追加してください。

設定後、``ツール``メニューの``ボード``から``ボードマネージャ``を開き、*SG200X*で検索し、``インストール``をクリックします。

<Image src='/docs/duo/arduino/duo-arduino-02.webp' minWidth='40%' maxWidth='100%' align='left' />

これでArduino IDE上のDuo開発環境がインストールされ、コードの作成・テストが可能です。

### オンボードLED点滅テスト

現在、DuoのSDカードシステムにはArduino対応ファームウェアの書き込みが必要です。[Latest Release](https://github.com/milkv-duo/duo-buildroot-sdk/releases)から`arduino`で始まるファームウェアをダウンロードしてください。

:::tip
最新のArduinoファームウェアバージョンは[Duo-V1.1.2](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.1.2)です。

DuoSは現時点でArduino版ファームウェアを提供していません。[Buildroot SDK](https://milkv.io/zh/docs/duo/getting-started/buildroot-sdk)をクローンし、arduinoブランチに切り替えてコンパイルしてください。
:::

前章の[Boot the Duo](https://milkv.io/docs/duo/getting-started/boot)を参考にシステムをインストールします。

USBケーブルでDuoをPCに接続すると自動で電源が入ります。

Duoのデフォルトファームウェア（ビッグコアLinux）は起動スクリプトでオンボードLEDを点滅させます。リトルコアArduinoでLEDを制御するには、ビッグコアLinuxのLED点滅スクリプトを無効化します。Duoのターミナルで以下を実行してください。
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```
LED点滅スクリプトをリネームします。再起動後、LEDは点滅しなくなります。
```
reboot
```

この時、PCの「デバイスマネージャー」の「ポート」に新しいシリアルデバイスが表示されます。

<Image src='/docs/duo/arduino/duo-arduino-03.webp' minWidth='40%' maxWidth='60%' align='left' />

Arduino IDEのメイン画面で``ボードを選択``をクリックし、``他のボードとポートを選択...``をクリックします。

<Image src='/docs/duo/arduino/duo-arduino-04.webp' minWidth='40%' maxWidth='100%' align='left' />

「duo」で検索し、Duoの場合は``Duo Dev Module``、Duo256Mの場合は``Duo256 Dev Module``を選択し、ポートも選択してOKをクリックします。

<Image src='/docs/duo/arduino/duo-arduino-05.webp' minWidth='40%' maxWidth='100%' align='left' />

Arduino IDEの``ファイル``メニューから``Examples`` > ``01.Basics`` > ``Blink``テストプログラムを開きます。このプログラムはArduinoデバイスのオンボードLEDを点滅させます。Duoでも動作します。アップロードには```pyserial```のインストールが必要な場合があります。``Upload``ボタンをクリックしてテストしてください。

<Image src='/docs/duo/arduino/duo-arduino-06.webp' minWidth='40%' maxWidth='100%' align='left' />

Duoボード上のLEDが1秒間隔で点滅するのが確認できます。

:::tip
コードのコンパイル・ダウンロード前に、PCに```python```環境がインストールされ、環境変数が正しく設定されていることを確認してください。```python```環境がないとコンパイル・ダウンロードに失敗します。

Duoへのファームウェアダウンロードができない場合、まず```pyserial```がインストールされているか確認してください。未インストールの場合は```pip install pyserial```でインストールできます。

```pyserial```インストール後もアップロードできない場合は、```serial```がインストールされていないか確認してください。```pyserial```と```serial```を同時にインストールするとダウンロードに失敗する場合があります。```pip uninstall serial```で```serial```をアンインストールしてください。
:::

## 2. Duo Arduinoピンリソース

### Duo

<div className='gpio_style'>

<!-- ピンテーブルはそのまま -->

</div>

### Duo256M

<div className='gpio_style'>

<!-- ピンテーブルはそのまま -->

</div>

### DuoS

`Header J3`（RJ45ポート側）のGPIOは3.3Vロジックレベルです。

<div className='gpio_style' style={{ overflow :"auto"}} >

<!-- ピンテーブルはそのまま -->

</div>

*GND\*: ピン9はV1.1ハードウェアではLowレベルGPIO、V1.2以降ではGNDです。

注意: CSIカメラコネクタJ2のI2CはI2C2です。J2でCSIカメラを使う場合、J3ピンヘッダのI2C2は利用できません。

`Header J4`（USB-Aポート側）のGPIOは1.8Vロジックレベルです。

<div className='gpio_style' style={{ overflow :"auto"}} >

<!-- ピンテーブルはそのまま -->

</div>

:::warning
DuoSではSPI、I2C1/2、ADCは一時的に利用できません。今後のソフトウェアアップデートをお待ちください。
:::

## 3. コード例

### GPIO使用例

このプログラムはDuo物理ピン20で1秒間隔でHigh/Lowを出力し、外部LEDで現象を観察します。

接続方法：LEDのマイナスをDuoのGND（例：ピン18）、プラスを1K抵抗経由でピン20に接続します。

<Image src='/docs/duo/arduino/duo-arduino-07.png' minWidth='40%' maxWidth='70%' align='left' />

テストコード:
```C
#define TEST_PIN 20  //0,1,2,14,15,19,20,21,22,24,25,26,27

void setup() {
  pinMode(TEST_PIN, OUTPUT);
}

void loop() {
  digitalWrite(TEST_PIN, HIGH);
  delay(1000);
  digitalWrite(TEST_PIN, LOW);
  delay(1000);
}
```

:::tip
- LED未接続の場合は、マルチメータやオシロスコープでピンの状態変化を観察できます。
- TEST_PINを0に設定するとDuoオンボードLEDのテストができます。
:::

### UART使用例

#### UARTシリアルポート

UARTシリアルポートはデフォルトで物理ピン6/7の`UART3`を使用します。Arduinoプログラムのデバッグ時はこのシリアルポートで情報を出力できます。

:::tip
DuoSボードの場合、`UART3`はデフォルトで`50/48`ピンにマッピングされています。これらは1.8Vレベルのため使いにくい場合があります。`UART2`の利用を推奨します。
:::

接続方法：PCはUSB-TTLシリアルケーブルを使用。ロジックレベルは3.3V、ボーレートは115200。シリアルケーブルのRXをDuoのPIN 6 UART3_TX、TXをPIN 7 UART3_RX、GNDをDuoのGND（例：ピン3）に接続します。

<Image src='/docs/duo/arduino/duo-arduino-08.webp' minWidth='40%' maxWidth='90%' align='left' />

テストコード:
```C
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.printf("hello world\r\n");
  delay(1000);
}
```

実行するとPCのシリアルツールに1秒ごとに"hello world"が表示されます。

また、デフォルトシリアルポートはDuoのUART3なので、プログラム内で`Serial3`も利用できます。
```C
void setup() {
  Serial3.begin(115200);
}

void loop() {
  Serial3.printf("hello world\r\n");
  delay(1000);
}
```

### I2C使用例

:::caution
DuoとDuo256MのI2Cインターフェースリソースは異なるため、前述のピンリソース図を参照してください。
:::

#### I2C0からI2C1へデータ送信（Duo）

ハードウェア接続：I2C0とI2C1のSDA/SCLをそれぞれ接続し、UART例の方法でPCにシリアル接続して出力を確認します。

<Image src='/docs/duo/arduino/duo-arduino-09.webp' minWidth='40%' maxWidth='60%' align='left' />

Duoの`Wire`関数はデフォルトでI2C0にマッピングされています（`Wire`＝`Wire0`）。

テストコード:
```C
#include <Wire.h>

void receive(int a) {
  Serial.printf("receive %d bytes\n\r", a);
  while(a--) {
    Serial.printf("%d \n\r", Wire1.read());
  }
}

void setup() {
  Serial.begin(115200);
  Wire1.begin(0x50);
  Wire1.onReceive(receive);
  Wire.begin();
  Serial.printf("test slave\n\r");
  Wire1.print();
}

byte val = 0;

void loop() {
  Wire.beginTransmission(0x50);
  Serial.printf("send %d \n\r", ++val);
  Wire.write(val);
  Wire.endTransmission();
  Wire1.onService();
  delay(1000);
}
```

テスト結果:
```
test slave
Wire1: 1
[iic_dump_register]: ===dump start
IC_CON = 0x22
IC_TAR = 0x55
IC_SAR = 0x50
IC_SS_SCL_HCNT = 0x1ab
IC_SS_SCL_LCNT = 0x1f3
IC_ENABLE = 0x1
IC_STATUS = 0x6
IC_INTR_MASK = 0x224
IC_INTR_STAT = 0
IC_RAW_INTR_STAT = 0x10
[iic_dump_register]: ===dump end
send 1
receive 1 bytes
1
send 2
receive 1 bytes
2
send 3
receive 1 bytes
3
send 4
receive 1 bytes
4
```

#### I2C1からI2C2へデータ送信（Duo256M）

:::tip
Duo256MにはI2C0はありません。
:::

ハードウェア接続：I2C1とI2C2のSDA/SCLをそれぞれ接続し、UART例の方法でPCにシリアル接続して出力を確認します。

<Image src='/docs/duo/arduino/duo-arduino-11.webp' minWidth='40%' maxWidth='60%' align='left' />

Duo256Mの`Wire`関数はデフォルトでI2C1にマッピングされています（`Wire`＝`Wire1`）。

テストコード:
```C
#include <Wire.h>

void receive(int a) {
  Serial.printf("receive %d bytes\n\r", a);
  while(a--) {
    Serial.printf("%d \n\r", Wire2.read());
  }
}

void setup() {
  Serial.begin(115200);

  Wire2.begin(0x50);
  Wire2.onReceive(receive);

  Wire.begin();
  Serial.printf("test slave\n\r");
  Wire2.print();
}

byte val = 0;

void loop() {
  Wire.beginTransmission(0x50);
  Serial.printf("send %d \n\r", ++val);
  Wire.write(val);
  Wire.endTransmission();
  Wire2.onService();
  delay(1000);
}
```

テスト結果:
```
test slave
Wire2: 1
[iic_dump_register]: ===dump start
IC_CON = 0x22
IC_TAR = 0x55
IC_SAR = 0x50
IC_SS_SCL_HCNT = 0x1ab
IC_SS_SCL_LCNT = 0x1f3
IC_ENABLE = 0x1
IC_STATUS = 0x6
IC_INTR_MASK = 0x224
IC_INTR_STAT = 0
IC_RAW_INTR_STAT = 0x10
[iic_dump_register]: ===dump end
send 1
receive 1 bytes
1
send 2
receive 1 bytes
2
send 3
receive 1 bytes
3
send 4
receive 1 bytes
4
```

### SPI使用例

#### SPIループバックテスト

ハードウェア接続：SPIのMOSIとMISO（ピン10と11）をショートし、UART例の方法でPCにシリアル接続して出力を確認します。

<Image src='/docs/duo/arduino/duo-arduino-10.webp' minWidth='40%' maxWidth='60%' align='left' />

テストコード:
```C
#include <SPI.h>

char str[]="hello world\n";
void setup() {
  Serial.begin(115200);
  SPI.begin();
}

byte i = 0;

void loop() {
  SPI.beginTransaction(SPISettings());
  Serial.printf("transfer %c\n\r", str[i]);
  char out = SPI.transfer(str[i++]);
  SPI.endTransaction();
  Serial.printf("receive %x \n\r", out);
  i %= 12;
}
```

テスト結果:
```
receive a
transfer h
receive 68
transfer e
receive 65
transfer l
receive 6c
transfer l
receive 6c
transfer o
receive 6f
transfer  
receive 20
transfer w
receive 77
transfer o
receive 6f
transfer r
receive 72
transfer l
receive 6c
transfer d
receive 64
transfer
```

### PWM使用例

ハードウェア接続：DUOのGP4をLEDのマイナスリードに接続します。

<Image src='/docs/duo/arduino/duo-arduino-12.webp' minWidth='40%' maxWidth='60%' align='left' />

テストコード:
```C
void setup() {
  pinMode(6, OUTPUT);
}

void loop() {
  for(int i = 128; i < 255; i++)
  {
    analogWrite(6,i);
    delay(50);
  }
  for(int i = 255; i > 128; i--)
  {
    analogWrite(6,i);
    delay(50);
  }
}
```

書き込み後、LEDの呼吸効果が観察できます。

:::warning
PWM利用時はPWMリソースの割り当てに注意してください。同じPWMが異なるピンに割り当てられる場合、両ピンの出力は全く同じになります。
:::

### ADC使用例

ハードウェア接続：DUOのGP26をポテンショメータの信号ピンに接続し、他の2ピンを電源の正負に接続します。

<Image src='/docs/duo/arduino/duo-arduino-13.webp' minWidth='40%' maxWidth='60%' align='left' />

テストコード:
```C
int adc_get_val = 0;

void setup() {
  pinMode(0,OUTPUT);
}

void loop() {
  adc_get_val = analogRead(31);

  digitalWrite(0,HIGH);
  delay(adc_get_val);
  digitalWrite(0,LOW);
  delay(adc_get_val);
}
```

書き込み後、ポテンショメータの位置に応じてオンボードLEDの点滅周期が変化します。

### MailBox使用例

以下のコードをリトルコアArduinoに書き込みます。このプログラムはビッグコアからMailBox経由で送信された情報を受信し、シリアルポートに出力します。シリアル配線は[UART使用例](#uart-usage-example)を参照してください。

```C
#include "mailbox.h"

struct valid_t {
  uint8_t linux_valid;
  uint8_t rtos_valid;
} __attribute__((packed));

typedef union resv_t {
  struct valid_t valid;
  unsigned short mstime;
} resv_t;

typedef struct cmdqu_t cmdqu_t;
struct cmdqu_t {
  uint8_t ip_id;
  uint8_t cmd_id : 7;
  uint8_t block : 1;
  union resv_t resv;
  unsigned int param_ptr;
} __attribute__((packed)) __attribute__((aligned(0x8)));

void showmsg(MailboxMsg msg) {
  cmdqu_t *cmdq;
  Serial.print("Get Msg: ");
  Serial.println(*(msg.data), HEX);
  cmdq = (cmdqu_t *)msg.data;
  Serial.printf("cmdq->ip_id = %d\r\n", cmdq->ip_id);
  Serial.printf("cmdq->cmd_id = %x\r\n", cmdq->cmd_id);
  Serial.printf("cmdq->block = %d\r\n", cmdq->block);
  Serial.printf("cmdq->para_ptr = %x\r\n", cmdq->param_ptr);
  *(msg.data) = 0;
}

void setup() {
  Serial.begin(115200);
  mailbox_init(false);
  mailbox_register(0, showmsg);
  mailbox_enable_receive(0);
  Serial.println("Mailbox Start");
}

void loop() {
  
}
```

テストプログラム[mailbox_test](https://github.com/milkv-duo/duo-examples/tree/main/mailbox-test)をビッグコアLinuxでコンパイル・実行します。詳細は[README](https://github.com/milkv-duo/duo-examples/blob/main/README.md)を参照してください。

実行後、ビッグコアLinux出力：

```
C906B: cmd.param_ptr = 0x2
C906B: cmd.param_ptr = 0x3
```

リトルコアシリアル出力：

```
Mailbox Start
Get Msg: 19300
cmdq->ip_id = 0
cmdq->cmd_id = 13
cmdq->block = 1
cmdq->para_ptr = 2
Get Msg: 19300
cmdq->ip_id = 0
cmdq->cmd_id = 13
cmdq->block = 1
cmdq->para_ptr = 3
```

### サーボ使用例

まず、修正済みの[Servoライブラリ](https://github.com/milkv-duo/duo-files/blob/main/arduino/Servo.zip)をArduinoライブラリディレクトリに上書きしてください。デフォルトパスは`C:\Users\[ユーザー名]\AppData\Local\Arduino15\libraries`です。

Arduino-IDEのメニューバー「ファイル」-「スケッチ例」-「Servo」-「Sweep」にもテストコードがあります。ピン番号はPWM機能付きピンに変更してください。

書き込み前にサーボが正しく接続されているか確認してください。

<Image src='/docs/duo/arduino/duo-arduino-14.webp' minWidth='40%' maxWidth='60%' align='left' />

```C
#include <Servo.h>

Servo myservo; 

int pos = 0;

void setup() {
  myservo.attach(4);
}

void loop() {
  for (pos = 0; pos <= 180; pos += 1) {
    myservo.write(pos);
    delay(15);
  }
  for (pos = 180; pos >= 0; pos -= 1) {
    myservo.write(pos);
    delay(15);
  }
}
```

書き込み後、接続したサーボが周期的に往復します。

## 4. センサー例

### L9110H_test

L9110H_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/L9110H_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/L9110H_test)

DCモータードライバIC L9110Hのサンプルコードです。コードコメント通りに配線し、書き込み・実行すると、モーターが徐々に加速・減速、逆転を繰り返します。

### LCD1602

LCD1602_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD1602_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD1602_test)

LCD1602 I2Cインターフェース液晶のサンプルコードです。コードコメント通りに配線し、書き込み・実行すると、液晶に文字列が表示されます。

### LCD2004

LCD2004_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD2004_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/LCD2004_test)

LCD2004 I2Cインターフェース液晶のサンプルコードです。コードコメント通りに配線し、書き込み・実行すると、液晶に文字列が表示されます。

### ブザー

buzzer_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_test)

ブザーモジュールのサンプルコードです。コードコメント通りに配線し、書き込み・実行すると、3種類の周波数のビープ音がループ再生されます。

### ブザーでメロディ再生

buzzer_play_waveソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_play_wave](https://github.com/milkv-duo/duo-arduino-examples/tree/master/buzzer_play_wave)

ブザーモジュールのサンプルコードです。コードコメント通りに配線し、書き込み・実行すると、まずCメジャーの7音を再生し、その後「二匹の虎」をループ再生します。

### HC-SR04

hc_sr04_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/hc_sr04_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/hc_sr04_test)

HC-SR04超音波距離センサーモジュールのサンプルコードです。書き込み・実行後、測定した距離データがシリアルポートに出力されます。

### RC522

rc522_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/rc522_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/rc522_test)

RC522 RFIDリードライターモジュールのサンプルコードです。書き込み・実行後、IDカード検出時にカード種別・番号情報がシリアルポートに出力されます。

### SSD1306

ssd1306_testソース：[https://github.com/milkv-duo/duo-arduino-examples/tree/master/ssd1306_test](https://github.com/milkv-duo/duo-arduino-examples/tree/master/ssd1306_test)

SSD1306 OLED画面モジュールのサンプルコードです。コメント通りに配線し、書き込み・実行すると、画面に目のアニメーションが表示されます。

## 5. Arduino API一覧

### デジタルI/O

<details>
<summary>digitalWrite()</summary>

```
void digitalWrite(uint8_t pinNumber, uint8_t status)
```
デジタルピンにHIGHまたはLOWを出力します。

</details>

<details>
<summary>digitalRead()</summary>

```
int digitalRead(uint8_t pinNumber)
```
指定したデジタルピンの値（HIGH/LOW）を読み取ります。

</details>

<details>
<summary>pinMode()</summary>

```
void pinMode(uint8_t pinNumber, uint8_t pinMode)
```
指定したピンを入力または出力として設定します。

</details>

### アナログI/O

<details>
<summary>analogRead()</summary>

```
uint32_t analogRead(uint32_t pinNumber)
```
指定したアナログピンの値を読み取ります。

</details>

<details>
<summary>analogReadResolution()</summary>

```
void analogReadResolution(int bits)
```
analogRead()の返す値のビット数を設定します。

</details>

<details>
<summary>analogWrite()</summary>

```
void analogWrite(uint8_t pinNumber, uint32_t val)
```
ピンにアナログ値（PWM波）を出力します。

</details>

<details>
<summary>analogWriteResolution()</summary>

```
void analogWriteResolution(int bits)
```
analogWrite()の解像度を設定します。

</details>

### Wire(I2C)

<details>
<summary>begin()</summary>

```
void begin(csi_iic_addr_mode_t addr_mode = IIC_ADDRESS_7BIT);
void begin(uint16_t address, csi_iic_addr_mode_t addr_mode = IIC_ADDRESS_7BIT);
```

</details>

<details>
<summary>beginTransmission()</summary>

```
void beginTransmission(uint16_t);
```

</details>

<details>
<summary>endTransmission()</summary>

```
uint8_t endTransmission(bool stopBit);
uint8_t endTransmission(void);
```

</details>

<details>
<summary>requestFrom()</summary>

```
size_t requestFrom(uint16_t address, size_t quantity, bool stopBit);
size_t requestFrom(uint16_t address, size_t quantity);
```

</details>

<details>
<summary>write()</summary>

```
size_t write(uint8_t data);
size_t write(const uint8_t * data, size_t quantity);
```

</details>

<details>
<summary>available()</summary>

```
virtual int available(void);
```

</details>

<details>
<summary>read()</summary>

```
virtual int read(void);
```

</details>

<details>
<summary>onReceive()</summary>

```
void onReceive(void(*)(int));
```

</details>

<details>
<summary>onRequest()</summary>

```
void onRequest(void(*)(void));
```

</details>

<br />

その他の機能インターフェースやDuoでの使い方は今後更新予定です。詳細は[Arduino公式ドキュメント](https://www.arduino.cc/reference/en/)もご参照ください。

