---
sidebar_label: '🌍 简介'
sidebar_position: 1
---

# Titan

## Titan 简介

Milk-V Titan 是基于超睿科技 UR-DP1000 的高性能 RISC-V SoC Mini-ITX 主板。该平台面向高性能桌面、边缘计算及轻量级服务器级应用场景，为 RISC-V 架构在主流计算形态中的落地提供了完整、可用的软硬件解决方案。

<Image src='/docs/titan/titan-overview.webp' maxWidth='100%' align='left' />

Milk-V Titan 采用标准 Mini-ITX 尺寸（170mm × 170mm），在紧凑规格内提供面向高性能计算场景的完整接口配置：

- PCIe Gen4 x16 插槽，支持独立显卡、AI 加速卡及高速网络卡
- PCIe Gen4 x4 M.2 NVMe 接口
- 双 DDR4 内存插槽，支持 ECC，总容量最高可达 64GB @ 3200MT/s
- 板载 BMC 模块，支持远程管理与系统监控
- USB 3.0、千兆以太网等通用接口，Ubuntu 下即插即用
- 灵活的供电方案，既可采用标准 ATX 电源满足高负载需求，也可选用 DC5525 接口适配轻量使用场景

## UR-DP1000 SoC 核心特性

- 集成八个高性能 RISC-V 核心，支持 RV64GCBH 指令集及其扩展，每个核心配备独立的 64KB 指令 +64KB 数据一级缓存及 512KB 二级缓存
- 采用双集群架构，每个四核集群共享 4MB 三级缓存
- 最高支持16MB系统级共享缓存（SLC），显著提升多核协同效率
- 完整支持 RISC-V RVA22 规范，为主流 Linux 发行版提供稳定运行基础
- 首款流片后支持 RISC-V Hypervisor Extension 1.0 规范的 RISC-V 核心
