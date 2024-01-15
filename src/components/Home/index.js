import React from 'react';
import styles from './index.module.css';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default () => {
    const goto = useHistory()
    const currentLanguage = useBaseUrl('/');

    return (
        <>
            <div className={styles.bgBox}>
                <div className={styles._title}>
                    <h2>MilkV Documents</h2>
                </div>
                <ul className={styles.products_ul}>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push(`${currentLanguage}docs/duo/overview`) }}>
                            <img src="/icons/mdhoem-duo.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🍐</p>
                            <div className={styles.pName} onClick={() => { goto.push(`${currentLanguage}docs/duo/overview`) }}>
                                <h2>Milk-V Duo</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push(`${currentLanguage}docs/pioneer/overview`) }}>
                            <img src="/icons/mdhoem-pioneer.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>💪</p>
                            <div className={styles.pName} onClick={() => { goto.push(`${currentLanguage}docs/pioneer/overview`) }}>
                                <h2>Milk-V Pioneer</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push(`${currentLanguage}docs/mars/overview`) }}>
                            <img src="/icons/mdhoem-mars.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🔥</p>
                            <div className={styles.pName} onClick={() => { goto.push(`${currentLanguage}docs/mars/overview`) }}>
                                <h2>Milk-V Mars</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. This four-core device supports a plug-and-play eMMC module, as well as up to 8GB of LPDDR4 memory. The board is equipped with three USB 3.0 ports, one USB 2.0 port, an HDMI 2.0 port that supports 4K resolution, an RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push(`${currentLanguage}docs/meles/overview`) }}>
                            <img src="/icons/mdhoem-meles.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🦨</p>
                            <div className={styles.pName} onClick={() => { goto.push(`${currentLanguage}docs/meles/overview`) }}>
                                <h2>Milk-V Meles</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Meles is a credit card-sized, single-board computer (SBC) based on the TH1520. It is powered by a Quad Core RISC-V 64GCV C910, capable of running up to 2.0GHz. This SBC is packed with rich interfaces and boasts powerful computing and AI capabilities, making it an ideal RISC-V intelligent hardware platform for hobbyists, makers, engineers, teachers, and students.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push(`${currentLanguage}docs/vega/overview`) }}>
                            <img src="/icons/mdhoem-vega.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🪐</p>
                            <div className={styles.pName} onClick={() => { goto.push(`${currentLanguage}docs/vega/overview`) }}>
                                <h2>Milk-V Vega</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Vega offers comprehensive second-layer network protocol processing capabilities, including L2 bridging, L2 multicast, and storm suppression, among others. It supports VLAN functions based on streams, ports, protocols, and subnets. The device also provides support for STP, RSTP, and QinQ functionalities. Additionally, it includes features like defense against DOS attacks, black and white lists, and protocol packet filtering. Milk-V Vega facilitates filtering, link aggregation, OAM message transmission, and port protection functionalities. It further supports both ingress and egress ACL functionalities, as well as Ethernet synchronization and 1588 features.</p>
                    </li>
                </ul>
            </div>
        </>
    )
}