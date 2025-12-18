---
sidebar_label: '🌍 Overview'
sidebar_position: 1
---

# Titan

## Titan Introduction

The Milk-V Titan is a high-performance RISC-V SoC Mini-ITX motherboard based on the UltraRISC Technology UR-DP1000. This platform targets high-performance desktop, edge computing, and lightweight server-grade application scenarios, providing a complete and ready-to-use hardware and software solution for the deployment of the RISC-V architecture in mainstream computing form factors.

<Image src='/docs/titan/titan-overview.webp' maxWidth='100%' align='left' />

The Milk-V Titan adopts the standard Mini-ITX form factor (170mm × 170mm), offering a complete interface configuration for high-performance computing scenarios within a compact size:

- PCIe Gen4 x16 slot, supporting discrete graphics cards, AI acceleration cards, and high-speed network cards.
- PCIe Gen4 x4 M.2 NVMe interface.
- Dual DDR4 memory slots, supporting ECC, up to 64GB @ 3200MT/s.
- Onboard BMC module, supports remote management and system monitoring
- Universal interfaces like USB 3.0 and Gigabit Ethernet, offering plug-and-play functionality under Ubuntu.
- Flexible power options, with a standard ATX power for heavy load scenarios or a DC5525 option for light use.

## UR-DP1000 SoC Key Features

- Integrates eight high-performance RISC-V cores, supporting the RV64GCBH instruction set and extensions, with private 64KB+64KB L1 cache and 512KB L2 cache.
- Dual-cluster architecture, with each 4-core cluster sharing a 4MB L3 cache.
- Up to 16MB system-level shared cache (SLC), enhancing multi-core coordination efficiency.
- Full support for the RISC-V RVA22 Profile, providing a stable foundation for mainstream Linux distributions.
- First post-silicon RISC-V core to support RISC-V’s Hypervisor Extension 1.0.
