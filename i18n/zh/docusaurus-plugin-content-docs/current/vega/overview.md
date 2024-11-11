---
sidebar_label: '🌍 概述'
sidebar_position: 1
---

# Milk-V Vega

## 简介

Milk-V Vega 是 Milk-V 为下一代网络架构开发的紧凑型低密度盒式开源 10G 网络交换机。它是宽带、语音、视频和监控等各种服务的统一平台。搭载中国自主研发的 RISC-V 高可靠网络交换机芯片，简化网络基础设施，降低能源和运营成本，广泛应用于数据中心、工业园区、中大型企业网络、酒店、教育机构等。

![vega-overview](/docs/vega/vega-overview.webp)

Milk-V Vega 提供全面的第二层网络协议处理功能，包括 L2 桥接、L2 多播和风暴抑制等。它支持基于流、端口、协议和子网的 VLAN 功能。该设备还支持 STP、RSTP 和 QinQ 功能。此外，它还包括防御 DOS 攻击、黑名单和白名单以及协议数据包过滤等功能。Milk-V Vega 有助于过滤、链路聚合、OAM 消息传输和端口保护功能。它还支持入口和出口 ACL 功能，以及以太网同步和 1588 功能。

## 特性

- RISC-V Network Chip - FSL1030M
    - Operating at 500MHz, the UX608 with TEE supports dual modes of Linux or UCOS.
    - It integrates 8 channels of Gigabit Ethernet PHY, along with 2 channels of 10 Gigabit SerDes and 4 channels of 1 Gigabit SerDes interfaces.
    - Flexible business port selection is supported, catering to various application scenarios.

- Compact in size
    - Supports standard 1U rack
    - Two units can be installed on each layer
    ![vega-sideview](/docs/vega/vega-side-view.webp)

- Development-friendly interface
    - Provides JTAG interface to facilitate underlying development
    - Provides RS232 and I2C interfaces for easy access to other sensors

- Suitable for various networking scenarios
    - 2x 10GbE SFP+ optical ports
    - 4x 1GbE SFP optical ports
    - 8x 1GbE RJ45 Ethernet ports

- Designed for Open Source
    - Based on open source Linux, convenient for secondary development and DIY.
    - Open openSBI, u-boot, Linux kernel source code, provide cross-compile toolchain.
    - Provide interface SDKs and APIs to flexibly realize business configurations.

- Network Redundancy and Protection
    - Spanning Tree Protocol (STP)
    - Rapid Spanning Tree Protocol (RSTP)
    - 1+1 / 1:1 Port Protection, Link Aggregation

- Security and Filtering
    - QoS based on 802.1p/DSCP
    - VLAN-based switching, L2 multicast

- Service Quality Enhancement
    - Defense against DoS attacks, protocol packet filtering
    - Blacklist / whitelist, IEEE802.1x

-  Advanced Feature Support
    - On-chip packet buffering, ACL, QinQ
    - Hierarchical Policing support
    - VLAN based on port, protocol, IP subnet, and flow

- Flexible Queue Scheduling
    - 8 queues per port, multiple scheduling methods (SP / WRR / DWRR)
    - Hybrid scheduling for optimized performance

- Traffic Shaping and Control
    - Port-based single-rate shaping
    - Queue-based dual-rate shaping
    - Storm control, L2 bridging

- Management and Monitoring
    - Mirroring and remote configuration
    - Periodic hardware-based OAM message transmission
    - Synchronous Ethernet (SyncE), 1588 functionality

- Easy to Use
    - Supports remote configuration, provides WEB and SSH access
    - Provides command line service configuration for VLAN configuration, port mirroring, MAC address learning, traffic control, etc.

## 硬件参数

| Milk-V Vega                            | Specification       |
| -------------------------------------- | ------------------- |
| CPU Performance                        | 400MHz              |
| Maximum Frame Length                   | 16000 bytes         |
| On-chip Buffer                         | 1.5MB               |
| MAC Address Depth                      | 16K                 |
| VLAN                                   | 4K                  |
| L2 Multicast                           | 4K                  |
| ACL                                    | 256                 |
| Meter Minimum Granularity              | 8Kbps               |
| Flow-based Policing Entries            | 4K                  |
| Typical Main Control Power Consumption | 4.5W                |
| Network Connectors                     | 2x 10GbE SFP+ Ports |
|                                        | 4x 1GbE SFP Ports   |
|                                        | 8x 1GbE RJ45 Ports  |
