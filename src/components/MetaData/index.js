import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default (props) => {
    const { page } = props
    const currentLanguage = useBaseUrl('/');
    const metadata = {
        home: {
            en: {
                title: 'Milk-V | Embracing RISC-V with us',
                description: 'Milk-V is committed to providing high quality RISC-V products to developers, enterprises and consumers, and to promoting the development of the RISC-V hardware and software ecosystem. Milk-V will firmly support open source, and hopes that through its own efforts and those of the community, future RISC-V products will be as numerous and bright as the stars in the Milky Way.',
                keywords: 'Milk-V,RISC-V,SBC,Pioneer,Duo,Mars,Mars CM,Vega,Meles',
            },
            zh: {
                title: 'Milk-V | 和群芯闪耀科技一起拥抱 RISC-V',
                description: '深圳市群芯闪耀科技有限公司 (Shenzhen MilkV Technology) 致力于为开发者、企业和消费者提供高质量的 RISC-V 产品，推动 RISC-V 硬件和软件生态系统的发展。Milk-V 将坚定不移地支持开源，并希望通过自身和社区的努力，让未来的 RISC-V 产品能像银河中的星星一样璀璨繁荣',
                keywords: 'Milk-V,RISC-V,开发板,Pioneer,Duo,Mars,Mars CM,Vega,Meles',
            },
        },
        about: {
            en: {
                title: 'About Milk-V',
                description: 'Shenzhen MilkV Technology is committed to providing high quality RISC-V products to developers, enterprises and consumers, and to promoting the development of the RISC-V hardware and software ecosystem. Milk-V will firmly support open source, and hopes that through its own efforts and those of the community, future RISC-V products will be as numerous and bright as the stars in the Milky Way',
                keywords: 'Milk-V About,RISC-V',
            },
            zh: {
                title: '关于群芯闪耀科技',
                description: '深圳市群芯闪耀科技有限公司 (Shenzhen MilkV Technology) 致力于为开发者、企业和消费者提供高质量的 RISC-V 产品，推动 RISC-V 硬件和软件生态系统的发展。群芯闪耀科技将坚定不移地支持开源，并希望通过自身和社区的努力，让未来的 RISC-V 产品能像银河中的星星一样璀璨繁荣',
                keywords: '关于Milk-V,RISC-V',
            },
        },
        duo: {
            en: {
                title: 'Milk-V Duo | Extremely Cost-Effective Ultra-Compact Embedded Linux Development Platforms',
                description: 'Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators',
                keywords: 'Milk-V,RISC-V,Duo,CVITEK,CV1800B,RV64,Dual Core,C906',
            },
            zh: {
                title: 'Milk-V Duo | 极具性价比的超紧凑型嵌入式Linux开发平台',
                description: 'Milk-V Duo 是群芯闪耀科技推出的基于 CV1800B 芯片的超紧凑嵌入式开发平台。它可以运行Linux和RTOS，为专业人士、工业ODM、AIoT爱好者、DIY爱好者和创作者提供可靠、低成本和高性能的平台',
                keywords: 'Milk-V,RISC-V,Duo,精视,算能,双核,Linux计算机',
            },
        },
        pioneer: {
            en: {
                title: 'Milk-V Pioneer | Make native RISC-V development possible',
                description: 'Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future',
                keywords: 'Milk-V,RISC-V,Pioneer,64 Core,high performance,SOPHON SG2042,Workstation',
            },
            zh: {
                title: 'Milk-V Pioneer | 让 原生 RISC-V 开发成为可能',
                description: 'Milk-V Pioneer 是群芯闪耀科技推出的一款专门为开发者打造的搭载64核的RISC-V处理器 —— SOPHON SG2042 的 mATX 主板/工作站，通过 PC 级的接口及强大的工业兼容性，Pioneer为开发者提供无缝的 RISC-V 开发环境，带来深度沉浸式的RISC-V桌面体验。无论是RISC-V的开发者，还是希望探索RISC-V技术尖端的硬件研究者，Pioneer都将成为他们的首选平台',
                keywords: 'Milk-V,RISC-V,Pioneer,高性能,64核,算丰SG2042,工作站',
            },
        },
        mars: {
            en: {
                title: 'Milk-V Mars | The First high-performance RISC-V Single Board Computer (SBC) the size of a credit card',
                description: 'Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. This four-core device supports a plug-and-play eMMC module, as well as up to 8GB of LPDDR4 memory. The board is equipped with three USB 3.0 ports, one USB 2.0 port, an HDMI 2.0 port that supports 4K resolution, an RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO',
                keywords: 'Milk-V,RISC-V,Mars,Quad Core,high performance,Starfive JH7110,SBC,Single board computer',
            },
            zh: {
                title: 'Milk-V Mars | 全球首款高性能四核心 RISC-V 开发板',
                description: 'Milk-V Mars 是群芯闪耀科技推出的一款高性能的RISC-V单板计算机（SBC），只有信用卡大小，基于StarFive JH7110芯片。这个四核设备支持即插即用的eMMC模块，以及高达8GB的LPDDR4内存。该板配备了三个USB 3.0端口，一个USB 2.0端口，一个支持4K分辨率的HDMI 2.0端口，一个支持PoE（以太网供电）的RJ45以太网端口，以及一个用于WIFI/BT模块的M.2 E-Key插槽。它还包括一个4线MIPI CSI和一个2线MIPI CSI，以及一个40针的GPIO排针座',
                keywords: 'Milk-V,RISC-V,Mars,高性能,四核心,Starfive JH7110,SBC,开发板',
            },
        },
        marscm: {
            en: {
                title: 'Milk-V Mars CM | A RISC-V Compute Module in compatible form factor',
                description: 'The Mars Compute Module is a System on Module (SoM) based on a the StarFive JH7110 System on Chip (SoC). The Mars CM integrates the Central Process Unit (CPU), Power Management Unit (PMU), DRAM memory, flash storage and wireless connectivity (WiFi 5 and BT 5.2) in a small form factor of just 55mm x 40mm. The Mars Compute Module offers a cost-efficient solution out of the box for many different applications',
                keywords: 'Milk-V,RISC-V,Mars CM,Quad Core,high performance,Starfive JH7110,SOM,system on module',
            },
            zh: {
                title: 'Milk-V Mars CM | 兼容设计的的高性能 RISC-V 计算模块',
                description: 'Mars 计算模块是群芯闪耀科技推出的基于 StarFive JH7110 (SoC) 的模块化系统 (SoM)。Mars CM 将中央处理器 (CPU)、电源管理单元 (PMU)、DRAM 存储器、闪存和无线连接（WiFi 5 和 BT 5.2）集成在一个仅 55mm x 40mm 的小巧外形中。Mars 计算模块为许多不同的应用提供了高性价比的解决方案',
                keywords: 'Milk-V,RISC-V,Mars CM,高性能,四核心,Starfive JH7110,SOM,核心板',
            },
        },
        vega: {
            en: {
                title: 'Milk-V Vega | RISC-V Open Source 10 Gigabit Network Switch',
                description: 'Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features',
                keywords: 'Milk-V,RISC-V,Vega,Network Switch,Open Source,10 Gigabit,FSL1030M,UX608',
            },
            zh: {
                title: 'Milk-V Vege | RISC-V 开源万兆网络交换机',
                description: 'Milk-V Vega 是群芯闪耀科技推出的开源万兆网络交换机，提供全面的第二层网络协议处理功能，包括第二层桥接、第二层组播和风暴抑制等。它支持基于流、端口、协议和子网的 VLAN 功能。该设备还支持 STP、RSTP 和 QinQ 功能。此外，它还具有防御 DOS 攻击、黑白名单和协议数据包过滤等功能。Milk-V Vega 支持过滤、链路聚合、OAM 信息传输和端口保护功能。它还支持入口和出口 ACL 功能，以及以太网同步和 1588 功能',
                keywords: 'Milk-V,RISC-V,Vega,网络交换机,开源,万兆,FSL1030M,UX608',
            },
        },
        meles: {
            en: {
                title: 'Milk-V Meles | The Classic Creation of a RISC-V Single Board Computer',
                description: 'Milk-V Meles is a credit card-sized, single-board computer (SBC) based on the TH1520. It is powered by a Quad Core RISC-V 64GCV C910, capable of running up to 2.0GHz. This SBC is packed with rich interfaces and boasts powerful computing and AI capabilities, making it an ideal RISC-V intelligent hardware platform for hobbyists, makers, engineers, teachers, and students',
                keywords: 'Milk-V,RISC-V,Meles,TH1520,T-Head,Quad Core,high performance,SBC,Single board computer',
            },
            zh: {
                title: 'Milk-V Meles | RISC-V 单板计算机的经典之作',
                description: 'Milk-V Meles 是群芯闪耀科技推出的一款基于TH1520的信用卡大小的单板计算机（SBC）。它由一颗四核 RISC-V 64GCV C910 处理器驱动，最高主频可达 2.0GHz。该单板计算机配备了丰富的接口，拥有强大的计算和人工智能能力，使其成为业余爱好者、创客、工程师、教师和学生的理想 RISC-V 智能硬件平台',
                keywords: 'Milk-V,RISC-V,Meles,TH1520,平头哥,Quad Core,高性能,开发板,SBC',
            },
        },
        jupiter: {
            en: {
                title: 'Milk-V Jupiter | RISC-V PC for Everyone',
                description: "Milk-V Jupiter, powered by the Spacemit K1/M1 SoC, is the world's first Mini ITX device to support both RVA22 and RVV1.0. This device integrates a standard PCIe connector, supporting common PCIe devices such as graphics cards, PCIe to SATA adapters, and network cards. It features dual Gigabit Ethernet interfaces, onboard Wi-Fi 6/BT 5.2, and supports NVMe SSDs, making it an ideal choice for an entry-level RISC-V desktop.",
            },
            zh: {
                title: 'Milk-V Jupiter | 触手可及的 RISC-V PC',
                description: 'Milk-V Jupiter 是一款基于Spacemit K1/M1 的Mini ITX设备。该设备集成了标准PCIe Connector，支持常见PCIe设备，如显卡、PCIe转SATA、网卡；双Gigabit以太网接口；板载WI-FI6/BT5.2；支持NVMe SSD，是入门级 RISC-V Desktop 首选。',
                keywords: 'Milk-V; Jupiter; Spacemit; K1; M1; MiniITX; RVA22; RVV1.0; 群芯闪耀; 进迭时空',
            },
        },
        "jupiter-nx": {
            en: {
                title: 'Milk-V Jupiter NX',
                description: "",
            },
            zh: {
                title: 'Milk-V Jupiter NX',
                description: '',
            },
        },
        megrez: {
            en: {
                title: 'Milk-V Megrez | RISC-V AI PC',
                description: "Milk-V Megrez is a Mini-ITX device powered by the ESWIN EIC7700X. It features a built-in quad-core SiFive P550 CPU, specifically designed for RISC-V native development. With a high-performance GPU, it delivers a smooth desktop experience, while its 19.95 TOPS NPU provides exceptional local AI capabilities. The Milk-V Megrez marks a significant milestone in RISC-V desktop technology.",
            },
            zh: {
                title: 'Milk-V Megrez ｜RISC-V AI PC',
                description: 'Milk-V Megrez 是一款搭载 ESWIN EIC7700X 的 RISC-V Mini-ITX 设备。内置四核 SiFive P550 CPU，专为 RISC-V 原生开发而设计；集成高性能 GPU，提供流畅的桌面体验；同时其 19.95 TOPS NPU 能为用户提供卓越的本地 AI 能力。 Milk-V Megrez 是 RISC-V 桌面级主流化的重要里程碑，也是开发者必备的开发利器',
            },
        },
        titan: {
            en: {
                title: 'Milk-V Titan',
                description: "",
            },
            zh: {
                title: 'Milk-V Titan',
                description: '',
            },
        },
        jupiter2: {
            en: {
                title: 'Milk-V Jupiter2 | Your All-in-One Development Platform',
                description: `Powered by the Spacemit K3 (RVA23), this next-gen RISC-V platform features an 8-core X100™ CPU (up to 2.4GHz) with up to 60 TOPS AI performance and RVV 1.0 up to 1024-bit vector acceleration. It offers up to 32GB LPDDR5, onboard UFS (up to 256GB), and an M.2 NVMe slot (PCIe Gen3 x4).Connectivity includes 10GbE SFP+, GbE RJ45, and Wi- Fi 6/BT 5.2, plus M.2 B Key + Nano SIM for 4G/5G expansion.With USB- C DP Alt, eDP, and RT I/O expansion for EtherCAT/CAN - FD, it’s ideal for RISC - V AI development and high - performance edge deployments.`,
            },
            zh: {
                title: 'Milk-V Jupiter | 您的一体化开发平台',
                description: 'Milk-V Jupiter2 基于进迭时空 K3（RVA23），搭载 8 核 X100™ CPU（最高 2.4GHz），提供高达 60 TOPS AI 算力，并支持最高 1024 位 RVV 1.0 向量加速。支持最高 32GB LPDDR5，配备板载 UFS（最高 256GB），并提供 M.2 NVMe（PCIe Gen3 x4）扩展。网络与连接方面，提供 10GbE SFP+、GbE RJ45、Wi-Fi 6/BT 5.2，以及 M.2 B Key + Nano SIM（4G/5G 扩展）。支持 USB-C DP Alt、eDP 与 EtherCAT/CAN-FD RT I/O 扩展，适用于 RISC-V AI 开发与高性能边缘部署。',
                keywords: 'Milk-V; Jupiter2; Spacemit; K3; SBC; RVA23; RVV1.0; 群芯闪耀; 进迭时空',
            },
        },
        "jupiter2-nx": {
            en: {
                title: 'Milk-V Jupiter2 NX | Leading the RVA23 Era',
                description: "Jupiter2 NX is an octa-core AI system-on-module featuring the SpacemiT K3 SoC, LPDDR5 (up to 32GB), and onboard UFS storage. It complies with RVA23 standards, supports RVV 1.0 (up to 1024-bit) vector acceleration, and is compatible with Radxa C200 and Jetson Orin series carrier boards, making it an ideal next-gen upgrade for AI and edge computing.",
            },
            zh: {
                title: 'Milk-V Jupiter2 NX | 引领 RVA23 时代',
                description: 'Milk-V Jupiter2 NX 是一款 8 核 AI 核心模组，搭载进迭时空 K3 SoC，支持 LPDDR5（最高 32GB）并配备板载 UFS 存储。它符合 RVA23 标准，支持 RVV 1.0（最高 1024 位）向量加速，并兼容瑞莎 C200 及 Jetson Orin 系列载板，是面向 AI 与边缘计算的理想新一代升级选择。',
                keywords: 'Milk-V; Jupiter2 NX; Spacemit; K3; SoM; RVA23; RVV1.0; 群芯闪耀; 进迭时空',
            },
        },
        "jupiter2-dev-kit": {
            en: {
                title: 'Milk-V Jupiter2 Dev Kit | Everything You Need in One Kit',
                description: "Jupiter2 NX Development Kit pairs the Jupiter2 NX with the Radxa C200, delivering a production-ready RISC-V AI platform. Built around the SpacemiT K3 (RVA23) SoC, it features an 8-core X100™ CPU and delivers 60 TOPS of AI performance with 1024-bit RVV 1.0 vector acceleration. The kit is equipped with up to 32GB LPDDR5 memory, onboard UFS storage, and versatile M.2 expansion slots.Offering a comprehensive set of I/ O including high- speed USB, networking, display outputs, and industrial interfaces, it provides a complete foundation for developing and deploying edge AI, robotics, and high- performance computing solutions.",
            },
            zh: {
                title: 'Milk-V Jupiter2 Dev Kit | 您的一站式开发套件',
                description: 'Milk-V Jupiter2 开发套件将 Jupiter2 NX 与瑞莎 C200 载板组合，打造一套面向产品化落地的 RISC-V AI 平台。平台基于符合 RVA23 标准的进迭时空 K3 SoC，搭载 8 核 X100™ CPU，提供高达 60 TOPS 的端侧 AI 算力，并支持 1024 位 RVV 1.0 向量加速。最高支持 32GB LPDDR5 内存，配备板载 UFS 存储，并提供灵活的 M.2 扩展能力。依托高速 USB、网络、显示输出与工业接口等丰富 I / O，可为边缘 AI、机器人与高性能计算应用的开发与部署提供完善基础。',
                keywords: 'Milk-V; Milk-V Jupiter2 Dev Kit; Spacemit; K3; Dev Kit; RVA23; RVV1.0; 群芯闪耀; 进迭时空',
            },
        },
    }

    const indexMetaData = currentLanguage === '/zh/' ? metadata[page].zh : metadata[page].en
    return (
        <>
            <Head>
                <title>{indexMetaData.title}</title>
                <meta name="description" content={indexMetaData.description} />
                <meta name="keywords" content={indexMetaData.keywords} />
            </Head>
        </>
    )
}
