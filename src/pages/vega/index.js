import React, { useState } from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css'
import Translate from '@docusaurus/Translate';
import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"


export default () => {
    const [vega, setvega] = useState(false)

    const mars2Start = () => {
        setvega(false)
    }
    return (
        <>
            <Layout>
                <MetaData page='vega' />
                <BuyPop flag={vega} module={mars2Start} type='vega' />
                <div className={styles.header_title}>
                    <div className={styles.title_content}>
                        <h1>Milk-V Vega</h1>
                        <p>RISC-V Open Source 10 Gigabit Network Switch</p>
                        <div className={styles.btnbuy} onClick={() => setvega(buy => !buy)}>
                            <Translate id='Buy.now' />
                        </div>
                    </div>
                </div>
                <div className={styles.black}>
                    <div className={styles.chip}>
                        <h2>RISC-V Network Chip<br></br>
                            -FSL1030M</h2>
                        <p><span>●</span>Operating at 500MHz, the UX608 with TEE supports dual modes of Linux or UCOS.</p>
                        <p><span>●</span>It integrates 8 channels of Gigabit Ethernet PHY, along with 2 channels of 10 Gigabit SerDes and 4 channels of 1 Gigabit SerDes interfaces.</p>
                        <p><span>●</span>Flexible business port selection is supported, catering to various application scenarios.</p>
                        <img src="/vega/FSL91030M.webp" className={styles.chipImage} />
                    </div>
                    <div className={styles.flowchart}>
                        <div className={styles.flowchart_fsl}>
                            <h2>FSL1030M</h2>
                            <img src="/vega/FSL1030M-info.webp" />
                        </div>
                        <div className={styles.flowchart_uCore}>
                            <h2>UX608 uCore</h2>
                            <img src="/vega/UX608-info.webp" />
                        </div>
                    </div>
                    <div className={styles.specification}>
                        <div className={styles.specification_item}>
                            <div className={styles.size_text}>
                                <h2>Compact in size</h2>
                                <p><span>●</span>Supports standard 1U rack</p>
                                <p><span>●</span>Two units can be installed on each layer</p>
                            </div>
                            <img src="/vega/vega-side-view.webp" className={styles.side_view} />
                        </div>
                        <div className={styles.specification_item}>
                            <div className={styles.size_text}>
                                <h2>Development-friendly interface</h2>
                                <p><span>●</span>Provides JTAG interface to facilitate underlying development</p>
                                <p><span>●</span>Provides RS232 and I2C interfaces for easy access to other sensors</p>
                            </div>
                            <img src="/vega/Development-icons.webp" className={styles.development_icons} />
                        </div>
                        <div className={styles.specification_item}>
                            <div className={styles.size_text}>
                                <h2>Suitable for various networking scenarios</h2>
                                <p><span>●</span>2x 10GbE SFP+ optical ports</p>
                                <p><span>●</span>4x 1GbE SFP optical ports</p>
                                <p><span>●</span>8x 1GbE RJ45 Ethernet ports</p>
                            </div>
                            <img src="/vega/vega-rear-view.webp" className={styles.rear_view} />
                        </div>
                        <div className={styles.specification_item}>
                            <div className={styles.size_text}>
                                <h2>Designed for Open Source</h2>
                                <p><span>●</span>Based on open source Linux, convenient for secondary development and DIY.</p>
                                <p><span>●</span>Open openSBI, u-boot, Linux kernel source code, provide cross-compile toolchain.</p>
                                <p><span>●</span>Provide interface SDKs and APIs to flexibly realize business configurations.</p>
                            </div>
                            <img src="/vega/source-icon.webp" className={styles.source_icon} />
                        </div>
                    </div>
                    <div className={styles.specification_text}>
                        <div className={styles.specification_item}>
                            <h2>Network Redundancy and Protection</h2>
                            <p><span>●</span>Spanning Tree Protocol (STP), Rapid</p>
                            <p><span>●</span>Spanning Tree Protocol (RSTP)</p>
                            <p><span>●</span>1+1 / 1:1 Port Protection, Link Aggregation</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Security and Filtering</h2>
                            <p><span>●</span>QoS based on 802.1p/DSCP</p>
                            <p><span>●</span>VLAN-based switching, L2 multicast</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Service Quality Enhancement</h2>
                            <p><span>●</span>Defense against DoS attacks, protocol packet filtering</p>
                            <p><span>●</span>Blacklist / whitelist, IEEE802.1x</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Advanced Feature Support</h2>
                            <p><span>●</span>On-chip packet buffering, ACL, QinQ</p>
                            <p><span>●</span>Hierarchical Policing support</p>
                            <p><span>●</span>VLAN based on port, protocol, IP subnet, and flow</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Flexible Queue Scheduling</h2>
                            <p><span>●</span>8 queues per port, multiple scheduling methods (SP / WRR / DWRR)</p>
                            <p><span>●</span>Hybrid scheduling for optimized performance</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Traffic Shaping and Control</h2>
                            <p><span>●</span>Port-based single-rate shaping</p>
                            <p><span>●</span>Queue-based dual-rate shaping</p>
                            <p><span>●</span>Storm control, L2 bridging</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Management and Monitoring</h2>
                            <p><span>●</span>Mirroring and remote configuration</p>
                            <p><span>●</span>Periodic hardware-based OAM message transmission</p>
                            <p><span>●</span>Synchronous Ethernet (SyncE), 1588 functionality</p>
                        </div>
                        <div className={styles.specification_item}>
                            <h2>Easy to Use</h2>
                            <p><span>●</span>Supports remote configuration, provides WEB and SSH access</p>
                            <p><span>●</span>Provides command line service configuration for VLAN configuration, port mirroring, MAC address learning, traffic control, etc.</p>
                        </div>
                    </div>
                    <div className={styles.application}>
                        <h2 className={styles.title}>Application</h2>
                        <ul className={styles.application_box}>
                            <li>
                                <p>Smart City</p>
                                <img src="/vega/smart-city.webp" />
                            </li>
                            <li>
                                <p>Superstore</p>
                                <img src="/vega/superstore.webp" />
                            </li>
                            <li>
                                <p>Factory</p>
                                <img src="/vega/factory.webp" />
                            </li>
                            <li>
                                <p>Smart Country</p>
                                <img src="/vega/smart-country.webp" />
                            </li>
                            <li>
                                <p>Intelligent Medical Care</p>
                                <img src="/vega/intelligent-medical-care.webp" />
                            </li>
                            <li>
                                <p>Business Park</p>
                                <img src="/vega/business-park.webp" />
                            </li>
                            <li>
                                <p>Teaching And Research</p>
                                <img src="/vega/Teaching-and-research.webp" />
                            </li>
                            <li>
                                <p>Smart Campus</p>
                                <img src="/vega/smart-campus.webp" />
                            </li>
                        </ul>
                    </div>
                    <div className={styles.tabBox_tech}>
                        <h1 className={styles.title}><Translate id='line.title.TechSpecs' /></h1>
                        <p className={styles.moreP}>Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features.</p>
                        <p className={styles.moreP}>Milk-V Vega is a compact and low-density box-style open-source 10 Gigabit network switch developed by Milk-V for the next generation of network architecture. It serves as a unified platform for various services such as broadband, voice, video, and surveillance. Equipped with domestically produced RISC-V high-reliability network switch chips from China, it simplifies network infrastructure, reduces energy and operational costs, and finds applications in data centers, industrial parks, medium to large enterprise networks, hotels, and educational institutions.
                        </p>
                        <h2 className={styles.headword}><Translate id='duo.info.text.Hardware' /></h2>
                        <table className={styles.tableBox}>
                            <tbody>
                                <tr>
                                    <td className={styles.tabline}>CPU Performance</td>
                                    <td className={styles.tabP}>400MHz</td>
                                </tr>
                                <tr>
                                    <td>Maximum Frame Length</td>
                                    <td>16000 bytes</td>
                                </tr>
                                <tr>
                                    <td>On-chip Buffer</td>
                                    <td>1.5MB</td>
                                </tr>
                                <tr>
                                    <td>MAC Address Depth</td>
                                    <td>16K</td>
                                </tr>
                                <tr>
                                    <td>VLAN</td>
                                    <td>4K</td>
                                </tr>
                                <tr>
                                    <td>L2 Multicast</td>
                                    <td>4K</td>
                                </tr>
                                <tr>
                                    <td>ACL</td>
                                    <td>256</td>
                                </tr>
                                <tr>
                                    <td>Meter Minimum Granularity</td>
                                    <td>8Kbps</td>
                                </tr>
                                <tr>
                                    <td>Flow-based Policing Entries</td>
                                    <td>4K</td>
                                </tr>
                                <tr>
                                    <td>Typical Main Control Power Consumption</td>
                                    <td>4.5W</td>
                                </tr>
                                <tr>
                                    <td rowSpan='3'>Network connectors</td>
                                    <td>2x 10GbE SFP+ Ports</td>
                                </tr>
                                <tr>
                                    <td>4x 1GbE SFP Ports</td>
                                </tr>
                                <tr>
                                    <td>8x 1GbE RJ45 Ports</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ContactUs product='vega' />
                    <ContactBar product='vega' />
                </div>
            </Layout>
        </>
    )
}