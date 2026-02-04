---
sidebar_label: 'Frequency Adjustment'
sidebar_position: 30
---

# Frequency Adjustment

By default, the CPU frequency of Megrez is set to 1.4GHz, with a CPU voltage of 800mV.

## Increasing the Frequency to 1.8GHz

Using RockOS as an example, after booting into RockOS, enter the following command in the terminal:

~~~ 
sudo sh -c 'echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

At this point, the CPU voltage will increase to 900mV, and the CPU frequency will rise to 1.8GHz.

## Reducing the Frequency to 1.4GHz

Using RockOS as an example, after booting into RockOS, enter the following command in the terminal:

~~~ 
sudo sh -c 'echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

At this point, the CPU voltage will decrease to 800mV, and the CPU frequency will drop back to 1.4GHz.

## Dynamic Frequency Scaling

Megrez supports dynamic frequency scaling, allowing the CPU frequency to adjust automatically based on the current task load to balance energy efficiency and performance.

Using RockOS as an example, after booting into RockOS, enter the following command in the terminal:

~~~ 
sudo sh -c 'echo schedutil > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

Or:

~~~ 
sudo sh -c 'echo ondemand > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
~~~ 

In this mode, the CPU frequency and voltage will adjust dynamically according to the task load. Under low-load conditions, the CPU frequency may drop to as low as 0.4GHz.
