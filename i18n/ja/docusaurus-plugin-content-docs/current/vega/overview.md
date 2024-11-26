---
sidebar_label: '🌍 Overview'
sidebar_position: 1
---

# Vega

Version 1.0 

-------------------------
## Introduction

Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features.
![vega-overview](/docs/vega/vega-overview.webp)
Milk-V Vega is a compact and low-density box-style open-source 10 Gigabit network switch developed by Milk-V for the next generation of network architecture. It serves as a unified platform for various services such as broadband, voice, video, and surveillance. Equipped with domestically produced RISC-V high-reliability network switch chips from China, it simplifies network infrastructure, reduces energy and operational costs, and finds applications in data centers, industrial parks, medium to large enterprise networks, hotels, and educational institutions.

## Fetures

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

## Hardware

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
