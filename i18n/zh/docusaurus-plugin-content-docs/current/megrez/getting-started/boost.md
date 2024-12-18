---
sidebar_label: '频率调整'
sidebar_position: 30
---

# 频率调整

默认情况下，Megrez 的 CPU 频率为 1.4GHz，CPU 电压为 800mV。

## 提升频率至 1.8GHz

以 Rock OS 为例，进入 Rock OS后，在 控制台 输入

~~~ 
sudo sh -c 'echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

此时 Megrez 的 CPU 电压会升至 900mV，CPU 频率会升至 1.8GHz 。

## 降低频率至 1.4GHz

以 Rock OS 为例，进入 Rock OS后，在 控制台 输入

~~~ 
sudo sh -c 'echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

此时 Megrez 的 CPU 电压会降 800mV，CPU 频率会降至 1.4GHz 。

## 动态调频

Megrez 支持动态调频，可根据当前 CPU 任务负载，自动调整频率，以实现节能与性能的平衡。

以 Rock OS 为例，进入 Rock OS后，在 控制台 输入

~~~ 
sudo sh -c 'echo schedutil > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

或

~~~ 
sudo sh -c 'echo ondemand > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

此时 Megrez 的 CPU 频率及电压会根据任务负载自动调节，低负载条件下，CPU频率可能会降至 0.4GHz 。
