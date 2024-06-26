import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css'
import styles_s from '@site/src/pages/vega/index.module.css';
import Translate from '@docusaurus/Translate';
import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
// import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"
import Link from '@docusaurus/Link';
import clsx from "clsx";

export default () => {

    return <Layout>
        <MetaData page='vega' />
        <main className={styles._main}>
            <div className={styles.jupiter_main}>
                <div className={styles.jupiter_contexts}>
                    <div className={styles.jupiter_head}>
                        <img src="/jupiter/milkv-jupiter.webp" alt="Milk-V Jupiter" className={styles.jupiter_logo} />
                        {/* 图片 */}

                        <img src="/jupiter/jupiter-center-top.webp" alt="Milk-V Jupiter" className={styles.jupiter_center_top} />
                    </div>
                    <div className={styles.jupiter_center}>
                        <div className={styles.center_items}>
                            <div className={clsx(styles.max_vie, styles.border1)}>
                                <p className={styles.info_title}>Superior Processing Performance</p>
                                <p className={styles.info_text}>Provides AI computing power up to <font>2TOPS</font> through CPU core fusion, enabling fast integration with all major AI ecosystems.</p>
                                <ol className={styles.border1_ol}>
                                    <li>
                                        <p className={styles.parametric_m}>Octa-core</p>
                                        <p className={styles.parametric_n}>RISC-V AI CPU</p>
                                    </li>
                                    <li>
                                        <p className={styles.parametric_m}>50KDMIPS</p>
                                        <p className={styles.parametric_n}>CPU computing power</p>
                                    </li>
                                    <li>
                                        <p className={styles.parametric_m}>2.0 TOPS</p>
                                        <p className={styles.parametric_n}>AI computing power</p>
                                    </li>
                                    <li>
                                        <p className={styles.parametric_m}>
                                            30%
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="37" viewBox="0 0 12 37" fill="none">
                                                <path d="M6 0.5L0.226498 10.5L11.7735 10.5L6 0.5ZM5 9.5L5 36.5L7 36.5L7 9.5L5 9.5Z" fill="white" />
                                            </svg>
                                        </p>
                                        <p className={styles.parametric_n}>computing power</p>
                                    </li>
                                </ol>
                            </div>
                            <div className={styles.flex_column}>
                                <div className={styles.border2}>
                                    <p className={styles.info_title}>Smooth Desktop Experience</p>
                                    <p className={styles.info_text}>Support optimised Ubuntu OS</p>
                                </div>
                                <div className={styles.border3}>
                                    <p className={styles.info_title}>Supports CASA OS</p>
                                    <ul className={styles.info_ul}>
                                        <li>Easily set up a RISC-V NAS</li>
                                        <li>Download a multitude of applications via Docker</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.center_items}>
                            <div className={styles.flex_column}>
                                <div className={styles.border4}>
                                    <p className={styles.info_title}>Powerful Vector Computing Power</p>
                                    <p className={styles.info_text}>The world’s first RISC-V AI CPU supports RVA22 Profile and 256-bit RVV 1.0 standard</p>
                                    <div>
                                        <p>
                                            2X
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="73" viewBox="0 0 24 61" fill="none">
                                                <path d="M12 0.0820312L0.452995 20.082L23.547 20.082L12 0.0820312ZM10 18.082L10 60.082L14 60.082L14 18.082L10 18.082Z" fill="white" />
                                            </svg>
                                        </p>
                                        <p>SIMD parallel processing capability</p>
                                    </div>

                                </div>
                                <div className={styles.border5}>
                                    <p className={styles.info_tops}>
                                        Provides AI computing power by CPU core fusion,up to <font>2TOPS</font>, achieve rapid integration with <font>all mainstream AI ecosystems</font>.
                                    </p>
                                </div>
                            </div>
                            <div className={clsx(styles.max_vie, styles.border6)}>
                                <p className={styles.info_title}>Integrated high-performance GPU</p>
                                <ul className={styles.info_ul}>
                                    <li>Supports hardware acceleration</li>
                                    <li>Supports mainstream frameworks</li>
                                </ul>
                                <div>
                                    <img src="/jupiter/border6-icon1.webp" alt="OpenGL ES 1.1/3.2" />
                                    <img src="/jupiter/border6-icon2.webp" alt="EGL1.5" />
                                    <img src="/jupiter/border6-icon3.webp" alt="Vulkan 1.3" />
                                </div>
                                <img src="/jupiter/border6-icon4.webp" alt="OpenCL 3.0" />
                            </div>
                        </div>
                        <div className={styles.center_items_3}>
                            <div className={styles.border7}>
                                <p className={styles.info_title}>Enjoy using 'apt install'</p>
                            </div>
                            <div className={styles.border8}>
                                <p className={styles.info_title}>RVV1.0</p>
                                <p className={styles.info_text}>RVV1.0 is the first stable technical version of the RISC-V vector extension series, providing stronger support for the application of the RISC-V architecture in the AI field.</p>
                            </div>
                            <div className={styles.border9}>
                                <p className={styles.info_title}>RVA22</p>
                                <p className={styles.info_text}>RVA22 follows the standards of the RISC-V Foundation, ensuring compatibility and interoperability between different devices and platforms.</p>
                            </div>
                        </div>
                        <div className={styles.center_items_4}>
                            <div className={styles.border10}>
                                <p className={styles.info_title}>Built-in PCIe 2.0, 2-lane signaling </p>
                                <p className={styles.info_text}>Supports standard PCIe accessories such as graphics cards, <font>PCIe to SATA</font>, etc.</p>
                            </div>
                            <div className={styles.border11}>
                                <p className={styles.info_title}>Standard MiniITX form factor</p>
                                <ul className={styles.info_ul}>
                                    <li>Supports hardware acceleration</li>
                                    <li>Supports mainstream frameworks</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.border12}>
                            <p className={styles.info_title}>Strong storage scalability</p>
                            <ol>
                                <li>
                                    <img src="/jupiter/ssd.webp" alt="NVMe SSD" />
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <circle cx="5" cy="5" r="4.5" fill="#E3784E" />
                                        </svg>
                                        NVMe SSD</p>
                                </li>
                                <li>
                                    <img src="/jupiter/sata.webp" alt="M.2 to SATA" />
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <circle cx="5" cy="5" r="4.5" fill="#E3784E" />
                                        </svg>
                                        M.2 to SATA</p>
                                </li>
                                <li>
                                    <img src="/jupiter/nvme.webp" alt="PCIe to NVMe" />
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <circle cx="5" cy="5" r="4.5" fill="#E3784E" />
                                        </svg>
                                        PCIe to NVMe</p>
                                </li>
                                <li>
                                    <img src="/jupiter/sd.webp" alt="SD Card" />
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <circle cx="5" cy="5" r="4.5" fill="#E3784E" />
                                        </svg>
                                        SD Card</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles_s.tabBox_tech, styles.tabBox_tech2)}>
                <h2 className={styles_s.title}><Translate id='line.title.TechSpecs' /></h2>
                <p className={styles_s.moreP}>Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features.</p>
                <h2 className={styles_s.headword}><Translate id='duo.info.text.Hardware' /></h2>
                <table className={styles.jupiter_table}>
                    <tbody>
                        <tr>
                            <td className={styles.tabline}>SoC</td>
                            <td className={styles.tabP}>
                                <p>SPACEMIT K1/M1, Otca-core X60™(RV64GCVB), RVA22, RVV1.0</p>
                            </td>
                        </tr>
                        <tr>
                            <td>AI-Power</td>
                            <td>
                                <p>2.0TOPS</p>
                            </td>
                        </tr>
                        <tr>
                            <td>RAM</td>
                            <td><p>4GB / 8GB / 16GB LPDDR4X</p></td>
                        </tr>
                        <tr>
                            <td>
                                <p>GPU</p>
                            </td>
                            <td>
                                <p>IMG BXE-2-32@819MHz, 32KB SLC</p>
                                <ul>
                                    <li>OpenGL ES 1.1/3.2</li>
                                    <li>EGL1.5</li>
                                    <li>2.OpenCL 3.0</li>
                                    <li>Vulkan 1.3</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Multimedia</td>
                            <td>
                                <p>H.265/H.264/VP8/VP9/MPEG4/MPEG2 decoder 4K@60fpsmailto:4K@60fps</p>
                                <p>H.265/H.264/VP8/VP9 encoder 4K@30fpsmailto:4K@30fps</p>
                                <p>Support simultaneously processing encoding</p>
                                <ul>
                                    <li>OpenGL ES 1.1/3.2</li>
                                    <li>EGL1.5</li>
                                </ul>
                                <p>Support simultaneously processing H264/H265 encoding</p>
                                <ul>
                                    <li>Vulkan 1.3</li>
                                    <li>2.OpenCL 3.0</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>
                                <p>1x SPI Flash for boot</p>
                                <p>1x M.2 M Key Connector for M.2 NVMe SSD (PCIe 2.0 x2)</p>
                                <p>1x eMMC Connector</p>
                                <p>1x microSD Card Slot</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Ethernet</td>
                            <td>
                                <p>2x Gigabit RJ45 Port with PoE support(Additional PoE Module Required)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Wireless</td>
                            <td>
                                <p>WI-FI6/BT5.2 Onboard</p>
                            </td>
                        </tr>
                        <tr>
                            <td>USB</td>
                            <td>
                                <p>2x USB 3 Type-A HOST Ports</p>
                                <p>2x USB 2 Type-A HOST Ports</p>
                                <p>1x Type-C (USB2 OTG, for Firmware Download)</p>
                                <p>2x USB 3.0 Interface via Front USB header</p>
                                <p>2x USB 2.0 Interface via Front USB header</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Display</td>
                            <td>
                                <p>1x Standard HDMI, up to 1920x1080@60Hz</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Audio</td>
                            <td>
                                <p>1x Headphone Jack</p>
                                <p>1x Microphone Jack</p>
                            </td>
                        </tr>
                        <tr>
                            <td>PCIe</td>
                            <td>
                                <p>1x PCIe x8 Slot (PCIe 2.0, 2-lane), Supports Graphic Cards and PCIe to SATA, etc.</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Others</td>
                            <td>
                                <p>1x PWM fan Connector</p>
                                <p>1x RTC Socket(CR1220 battery)</p>
                                <p>1x Front Panel header for Power Button / Reset Button / Status LED / Power LED</p>
                                <p>2x SATA Power Connector(4P)</p>
                                <p>1x SoC Uart(3P)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Power</td>
                            <td>
                                <p>1x 12V DC Power Jack(55x25mm)</p>
                                <p>1x Standard 24-Pin ATX Power Supply Interface</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ContactUs product='vega' />
        </main>
    </Layout>
}