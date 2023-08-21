import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default (props) => {
    const { page } = props
    const currentLanguage = useBaseUrl('/');



    const metadata = {
        duo: {
            en: {
                title: 'Milk-V Duo: Extremely Cost-Effective Ultra-Compact Embedded Linux Development Platforms',
                description: 'Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators',
                keywords: 'Milk-V,RISC-V,Duo,CVITEK,CV1800B,RV64,Dual Core,C906',
            },
            zh: {
                title: 'Milk-V Duo：极具性价比的超紧凑型嵌入式Linux开发平台',
                description: 'Milk-V Duo是一个基于CV1800B芯片的超紧凑嵌入式开发平台。它可以运行Linux和RTOS，为专业人士、工业ODM、AIoT爱好者、DIY爱好者和创作者提供可靠、低成本和高性能的平台',
                keywords: 'Milk-V,RISC-V,Duo,精视,算能,双核,Linux计算机',
            },
        },
        pioneer: {
            en: {
                title: 'Milk-V Pioneer: Make native RISC-V development possible',
                description: 'Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future',
                keywords: 'Milk-V,RISC-V,Pioneer,64 Core,high performance,SOPHON SG2042,Workstation',
            },
            zh: {
                title: 'Milk-V Pioneer：让 原生 RISC-V 开发成为可能',
                description: 'Milk-V Pioneer是一款专门为开发者打造的 于搭载64核的RISC-V处理器——SOPHON SG2042的mATX 主板/工作站，通过PC级的接口及强大的工业兼容性，Pioneer为开发者提供无缝的 RISC-V 开发环境，带来深度沉浸式的RISC-V桌面体验。无论是RISC-V的开发者，还是希望探索RISC-V技术尖端的硬件研究者，Pioneer都将成为他们的首选平台',
                keywords: 'Milk-V,RISC-V,Pioneer,高性能,64核,算丰SG2042,工作站',
            },
        },
        mars: {
            en: {
                title: 'Milk-V Mars: The First high-performance RISC-V Single Board Computer (SBC) the size of a credit card',
                description: 'Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. This four-core device supports a plug-and-play eMMC module, as well as up to 8GB of LPDDR4 memory. The board is equipped with three USB 3.0 ports, one USB 2.0 port, an HDMI 2.0 port that supports 4K resolution, an RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO',
                keywords: 'Milk-V,RISC-V,Mars,Quad Core,high performance,Starfive JH7110,SBC,Single board computer',
            },
            zh: {
                title: 'Milk-V Mars：全球首款高性能四核心 RISC-V 开发板',
                description: 'Milk-V Mars是一款高性能的RISC-V单板计算机（SBC），只有信用卡大小，基于StarFive JH7110芯片。这个四核设备支持即插即用的eMMC模块，以及高达8GB的LPDDR4内存。该板配备了三个USB 3.0端口，一个USB 2.0端口，一个支持4K分辨率的HDMI 2.0端口，一个支持PoE（以太网供电）的RJ45以太网端口，以及一个用于WIFI/BT模块的M.2 E-Key插槽。它还包括一个4线MIPI CSI和一个2线MIPI CSI，以及一个40针的GPIO排针座',
                keywords: 'Milk-V,RISC-V,Mars,高性能,四核心,Starfive JH7110,SBC,开发板',
            },
        },
        marscm: {
            en: {
                title: 'Milk-V Mars CM: A RISC-V Compute Module in compatible form factor',
                description: 'The Mars Compute Module is a System on Module (SoM) based on a the StarFive JH7110 System on Chip (SoC). The Mars CM integrates the Central Process Unit (CPU), Power Management Unit (PMU), DRAM memory, flash storage and wireless connectivity (WiFi 5 and BT 5.2) in a small form factor of just 55mm x 40mm. The Mars Compute Module offers a cost-efficient solution out of the box for many different applications',
                keywords: 'Milk-V,RISC-V,Mars CM,Quad Core,high performance,Starfive JH7110,SOM,system on module',
            },
            zh: {
                title: 'Milk-V Mars CM：兼容设计的的高性能 RISC-V 计算模块',
                description: 'Mars 计算模块是基于 StarFive JH7110 (SoC) 的模块化系统 (SoM)。Mars CM 将中央处理器 (CPU)、电源管理单元 (PMU)、DRAM 存储器、闪存和无线连接（WiFi 5 和 BT 5.2）集成在一个仅 55mm x 40mm 的小巧外形中。Mars 计算模块为许多不同的应用提供了高性价比的解决方案',
                keywords: 'Milk-V,RISC-V,Mars CM,高性能,四核心,Starfive JH7110,SOM,核心板',
            },
        },
        vega: {
            en: {
                title: 'Milk-V Vega: RISC-V Open Source 10 Gigabit Network Switch',
                description: 'Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features',
                keywords: 'Milk-V,RISC-V,Vega,Network Switch,Open Source,10 Gigabit,FSL1030M,UX608',
            },
            zh: {
                title: 'Milk-V Vega：RISC-V 开源万兆网络交换机',
                description: 'Milk-V Vega 提供全面的第二层网络协议处理功能，包括第二层桥接、第二层组播和风暴抑制等。它支持基于流、端口、协议和子网的 VLAN 功能。该设备还支持 STP、RSTP 和 QinQ 功能。此外，它还具有防御 DOS 攻击、黑白名单和协议数据包过滤等功能。Milk-V Vega 支持过滤、链路聚合、OAM 信息传输和端口保护功能。它还支持入口和出口 ACL 功能，以及以太网同步和 1588 功能',
                keywords: 'Milk-V,RISC-V,Vega,网络交换机,开源,万兆,FSL1030M,UX608',
            },
        },
        meles: {
            en: {
                title: 'Milk-V Meles: The Classic Creation of a RISC-V Single Board Computer',
                description: 'Milk-V Meles is a credit card-sized, single-board computer (SBC) based on the TH1520. It is powered by a Quad Core RISC-V 64GCV C910, capable of running up to 2.0GHz. This SBC is packed with rich interfaces and boasts powerful computing and AI capabilities, making it an ideal RISC-V intelligent hardware platform for hobbyists, makers, engineers, teachers, and students',
                keywords: 'Milk-V,RISC-V,Meles,TH1520,T-Head,Quad Core,high performance,SBC,Single board computer',
            },
            zh: {
                title: 'Milk-V Meles：RISC-V 单板计算机的经典之作',
                description: 'Milk-V Meles 是一款基于TH1520的信用卡大小的单板计算机（SBC）。它由一颗四核 RISC-V 64GCV C910 处理器驱动，最高主频可达 2.0GHz。该单板计算机配备了丰富的接口，拥有强大的计算和人工智能能力，使其成为业余爱好者、创客、工程师、教师和学生的理想 RISC-V 智能硬件平台',
                keywords: 'Milk-V,RISC-V,Meles,TH1520,平头哥,Quad Core,高性能,开发板,SBC',
            },
        },
    }


    const indexMetaData = currentLanguage === '/' ? metadata[page].en : metadata[page].zh
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