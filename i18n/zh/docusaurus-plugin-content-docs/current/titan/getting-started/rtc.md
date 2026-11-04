---
sidebar_label: 'RTC 设置'
sidebar_position: 25
---

# RTC 设置

在 Titan Ubuntu 系统中，开机时会读取 RTC（实时时钟）来设置系统时间；启用 NTP 并联网校时成功后，系统会自动将准确时间写回 RTC，写回可能需要几分钟。正常使用无需手动设置，只有系统或 RTC 时间异常、自动校时未恢复时，才需要手动校正。

## 安装 RTC 电池

建议安装一枚 **CR1225** 纽扣电池，以便整机断电后继续保持时间。关闭系统并断开主板电源，将电池装入 RTC 电池座，安装方向如图所示。

<Image src='/docs/titan/titan-rtc-battery.webp' maxWidth='100%' align='left' />

## 时间异常时手动校正

先检查系统时间和 RTC 时间：

```bash
date
sudo hwclock --show --rtc /dev/rtc0 --utc
```

如果日期明显错误，或使用 `sudo` 读取 RTC 仍提示 `Invalid argument`，可能是 RTC 未初始化或断电丢时。请按以下步骤校正。读取 RTC 需使用 `sudo`，避免将权限不足误判为 RTC 故障。

**联网时**，启用自动校时，并等待 `System clock synchronized: yes`：

```bash
sudo timedatectl set-ntp true
timedatectl status
```

**离线时**，手动设置系统时间。请将示例替换为**实际当前 UTC 时间**（北京时间减去 8 小时）：

```bash
sudo timedatectl set-ntp false
sudo date --utc --set='2026-11-04 06:00:00'
```

确认系统时间正确后，将它立即写入 RTC 并回读：

```bash
sudo hwclock --systohc --rtc /dev/rtc0 --utc
sudo hwclock --show --rtc /dev/rtc0 --utc
```

再次间隔几秒读取，确认时间持续递增。安装电池后，还可关机断电一段时间，再断网开机检查是否保时。若写入后仍无法读取或走时，请联系技术支持。

离线校正后，如需恢复网络自动校时，执行 `sudo timedatectl set-ntp true`。
