---
sidebar_label: '处理器'
sidebar_position: 20
---
# SOPHON SG2042 

## SOPHON SG2042 简介
SG2042服务器芯片基于RISC-V指令集架构（ISA），具有64核服务器级芯片，旨在满足高性能计算需求。它具有可扩展性、灵活性和定制性，其集成电路包括高速缓存（L3Cache 64MB）、内存控制器（4个DDR4-3200）、网络接口和PCI Express®控制器（x32 PCI Express Gen4.0），支持Linux®等通用的操作系统。SG2042的时钟速度为2GHz，设计由16个集群组成，每个集群包含4个RISC-V内核，每个内核具有L1-D 64KB和L1-I 64KB。每个集群共享一个L2 1MB的设计。L3系统高速缓存的容量为64MB。SG2042通过CCIX支持两个芯片之间的互连，有4个DDR4-3200控制器，支持RDIMM、ECC和UDIMM。该芯片还具有32x PCI E Gen4.0接口，集成eMMC5.1、SDIO 3.0、SPI x2、I2C x4、UART x4和千兆以太网MAC。


![SG2042](/docs/pioneer/sg2042.webp)


# SG2042 TRM
我们已将SOPHON SG2042的TRM开源到GitHub， 请 [查看](https://github.com/milkv-pioneer/hardware/blob/main/SG2042-TRM.pdf).