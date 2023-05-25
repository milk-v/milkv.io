import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from "../../components/Head"

import styles from './index.module.css';

export default () => {
    return (
        <Layout>
            <div className={styles.marsBox}>
                <div className={styles.headImage}>
                    <div className={styles.titleBox}>
                        <h1>Milk-V Mars</h1>
                        <p>Embarking on the RISC-V Cosmic Journey</p>
                        <Head type='mars' />
                    </div>
                </div>
                <div className={styles.prodcuts}>
                    <div className={styles.prodcuts01}>
                        <h1>The first RISC-V credit card size SBC</h1>
                    </div>
                    <div className={styles.prodcuts02}>
                        <img src='/mars/risc-v.svg' />
                        <p>RISC-V is an open standard instruction set architecture (ISA) based on established reduced instruction set computer (RISC) principles.</p>
                    </div>
                    <div className={styles.prodcuts03}>
                        40PIN GPIO
                    </div>
                    <div className={styles.prodcuts04}>
                        <h1>Starfive JH7110</h1>
                        <p>(quad-core 1.5Ghz)</p>
                    </div>
                    <div className={styles.prodcuts05}>
                        <p>One key to switch uart serial download mode</p>
                        <span>(press and hold before powering on - uart serial download mode)</span>
                    </div>
                    <div className={styles.prodcuts06}>
                        <h1>Support PoE</h1>
                        <p>network cable power</p>
                    </div>
                    <ul className={styles.productsUl}>
                        <li className={styles.li01}>
                            <h1>MIPI DSI</h1>
                            <p className={styles.titleMinP}>4lanes and 2lanes available</p>
                            <p className={styles.title_p}>- 4K@30FPS output</p>
                            <p className={styles.title_p}>- 4K@60FPS decoding</p>
                        </li>
                        <li className={styles.li02}>
                            <h1>Support WI-FI / BT module</h1>
                            <p className={styles.titleMinP}>external M.2 E Key</p>
                        </li>
                        <li className={styles.li03}>
                            <h1>Classic look</h1>
                            <p className={styles.titleMinP}>Adapted to Raspberry Pi 3B case</p>
                        </li>
                    </ul>
                </div>

                <h1 className={styles.maxtitle}>Specification</h1>
                <p className={styles.moreP}>Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. This four-core device supports a plug-and-play eMMC module, as well as up to 8GB of LPDDR4 memory. The board is equipped with three USB 3.0 ports, one USB 2.0 port, an HDMI 2.0 port that supports 4K resolution, an RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO.</p>
                <h2>Hardware</h2>
                <table className={styles.tableBox}>
                    <tbody>
                        <tr>
                            <td className={styles.tabline}>SoC</td>
                            <td className={styles.tabP}>StartFive JH7110 64bit SoC with RV64GC, up to 1.5Ghz</td>
                        </tr>
                        <tr>
                            <td >Memory</td>
                            <td>LPDDR4 1GB / 2GB / 4GB / 8GB</td>
                        </tr>
                        <tr>
                            <td rowSpan="3" >Storage</td>
                            <td>eMMC Slot</td>
                        </tr>
                        <tr>
                            <td>1x Micro SD Slot</td>
                        </tr>
                        <tr>
                            <td>SPI Flash for bootloader</td>
                        </tr>
                        <tr>
                            <td rowSpan="4" >Vedio output</td>
                            <td>1x HDMI</td>
                        </tr>
                        <tr>
                            <td>1x mipi DSI(2-lane)</td>
                        </tr>
                        <tr>
                            <td>1x mipi DSI(4-lane)</td>
                        </tr>
                        <tr>
                            <td>Max dual display output: 1 HDMI + 1 MIPI DSI</td>
                        </tr>
                        <tr>
                            <td rowSpan="4">Multimedia</td>
                            <td>Camera with MIPI CSI(2-lane)</td>
                        </tr>
                        <tr>
                            <td>H.264 & H.265 4K@60fps Decoding</td>
                        </tr>
                        <tr>
                            <td>H.265 1080p@30fps Encoding</td>
                        </tr>
                        <tr>
                            <td>JPEG encoder/decoder</td>
                        </tr>
                        <tr>
                            <td rowSpan="3">Connectivity</td>
                            <td>1x RJ45 Gigabit Ethernet</td>
                        </tr>
                        <tr>
                            <td>3x USB3 + 1x USB2</td>
                        </tr>
                        <tr>
                            <td>1x M.2 E-Key</td>
                        </tr>
                        <tr>
                            <td rowSpan="3">Power</td>
                            <td>USB-C port 5V DC (minimum 3A+)</td>
                        </tr>
                        <tr>
                            <td>GPIO Power in, 5V DC via GPIO header (minimum 3A+)</td>
                        </tr>
                        <tr>
                            <td>PoE</td>
                        </tr>
                        <tr>
                            <td>GPIO</td>
                            <td>40 Pin GPIO</td>
                        </tr>
                        <tr>
                            <td>Dimensions</td>
                            <td>85mm x 56mm</td>
                        </tr>
                        <tr>
                            <td>Button</td>
                            <td>1x Recovery botton</td>
                        </tr>
                        <tr>
                            <td>Other</td>
                            <td>2 Pin 5V slot for FAN</td>
                        </tr>
                    </tbody>
                    {/* colspan rowspan */}

                </table>

                <div className={styles.on5_box}>
                    <ul>
                        <li className={styles.li}>
                            <h1 className={styles.on5_box_h1}>[matrix]</h1>
                            <p className={styles.on5_box_p}>Join the Milk-V Matrix Chat channel(#milk-v:matrix.org) to share your ideas with the developers all around the world.</p>
                            <div className={styles.on5_bottom}>
                                <Link to='https://matrix.to/#/#milk-v:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}>Join #milk-v</Link>
                            </div>
                        </li>
                        <li className={styles.li}>
                            <h1 className={styles.on5_box_h1}>WeChat</h1>
                            <div className={styles.on5_img}></div>
                        </li>
                        <li className={styles.li}>
                            <h1 className={styles.on5_box_h1}>QQ Group</h1>
                            <div className={styles.on5_img_QQ}></div>
                        </li>
                    </ul>
                </div>
                <div className={styles.riscBg}>
                    <h1 className={styles.embrace}>Embrace the new era with Mars, </h1>
                    <h1 className={styles.risc_v}>Let's make RISC-V better together.</h1>
                </div>
            </div>
        </Layout>
    )
}