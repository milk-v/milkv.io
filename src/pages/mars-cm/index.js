import React, { useState } from "react";
import Layout from '@theme/Layout';

import styles from './index.module.css'

import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import Footer from "../../components/Footer"
import ContactBar from "../../components/ContactBar"
import Translate from '@docusaurus/Translate';
import Embrace from "../../components/Embrace"


export default () => {
    const [marscm, setMarscm] = useState(false)

    const mars2Start = () => {
        setMarscm(false)
    }


    return (
        <>
            <Layout>
                <BuyPop flag={marscm} module={mars2Start} type='mars-cm' />
                <div className={styles.header_page}>
                    <div className={styles.title_content}>
                        <div className={styles.leftTitle}>
                            <h1><span>Milk-V Mars</span> CM</h1>
                            <p>A RISC-V Compute Module in compatible form factor</p>
                            <div className={styles.btnbuy} onClick={() => setMarscm(buy => !buy)}>
                                <Translate id='Buy.now' />
                            </div>
                        </div>
                        <img src="/mars-cm/marscm-bevel.webp" alt="Mars CM oblique angle diagram" />
                    </div>
                </div>
                <div className={styles.black}>
                    <div className={styles.cup_view}>
                        <div className={styles.left_cpu}>
                            <h2>Starfive JH7110</h2>
                            <p><span>●</span>Starfive JH7110 64-bit SoC with RV64GC, up to 1.5GHz</p>
                            <p><span>●</span>Integrated GPU with 3D Acceleration: IMG BXE-4-32</p>
                            <div className={styles.cpu}>
                                <img src="/mars-cm/risc-v-white.svg" />
                            </div>
                        </div>
                        <img src="/mars-cm/functional-diagram.webp" alt="Mars CM functional block diagram" />
                    </div>
                    <div className={styles.multimedia_view}>
                        <div className={styles.support_video}>
                            <div className={styles.video_text_info}>
                                <h2>Support HD Multimedia</h2>
                                <p><span>●</span>1x MIPI CSI (2x2-lane or 1x4-lanes)</p>
                                <p><span>●</span>H.264 & H.265 4K@60fps Decoding</p>
                                <p><span>●</span>H.265 1080p@30fps Encoding</p>
                                <p><span>●</span>JPEG encoder/decoder</p>
                            </div>
                            <div className={styles.video_icons_info}>
                                <img src="/meles/over-meles-4kicons-01.svg" />
                                <img src="/meles/over-meles-4kicons-02.svg" />
                                <img src="/meles/over-meles-4kicons-03.svg" />
                                <img src="/meles/over-meles-4kicons-05.svg" />
                                <img src="/meles/over-meles-4kicons-06.svg" />
                            </div>
                        </div>
                        <div className={styles.support_audio}>
                            <h2>Dual-channel <br></br>Stereo Audio Output</h2>
                            <p><span>●</span>1x 2CH Audio out (via GPIO)</p>
                            <div className={styles.audio_contexts}></div>
                        </div>
                    </div>
                    <div className={styles.storage_4k_view}>
                        <div className={styles.support_storage}>
                            <h2>Flexible Configuration of Storage Devices</h2>
                            <p><span>●</span>1x Nor Flash for boot (16M)</p>
                            <p><span>●</span>Storage: 1x SDIO 2.0 (options to 4GB/8GB eMMC)</p>
                            <div className={styles.tf_emmc}>
                                <img src="/mars-cm/TF-card.svg" alt="TF Card" className={styles.tfcard} />
                                <p>or</p>
                                <img src="/mars-cm/eMMc.webp" alt="eMMc" className={styles.emmc} />
                            </div>
                        </div>
                        <div className={styles.support_4k}>
                            <h2>Dual Video Outputs, Supporting Up to 4K Resolution</h2>
                            <p><span>●</span>1x HDMI 2.0</p>
                            <p><span>●</span>1x MIPI DSI</p>
                        </div>
                    </div>
                    <div className={styles.parameters_view}>
                        <div className={styles.PCIe}>
                            <h2>PCIe Available</h2>
                            <p><span>●</span>1x PCIe 1-lane Host, Gen 2 (5Gbps)</p>
                            <p><span>●</span>Supports Multiple High-speed peripherals</p>
                            <div className={styles.pcle_info}>
                                <p>PCle can be extended to</p>
                                <div className={styles.info_grid}>
                                    <div>SATA</div>
                                    <div>USB</div>
                                    <div>RS232</div>
                                    <div>High-speed Devices</div>
                                    <div>RS485</div>
                                    <div>......</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.memory}>
                            <h2>Memory</h2>
                            <p className={styles.lpddr4}>LPDDR4</p>
                            <p className={styles.capacity}>
                                2GB / 4GB / 8GB
                            </p>
                        </div>
                        <div className={styles.os}>
                            <h2>Support OS</h2>
                            <div className={styles.support_os_icons}>
                                <img src="/mars-cm/support-Ubuntu.webp" />
                                <img src="/mars-cm/support-fedora.webp" />
                                <img src="/mars-cm/support-opensuse.webp" />
                                <img src="/mars-cm/support-debian.webp" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.detail_info1}>
                            <h2>Board-to-board Connectors</h2>
                            <p><span>●</span>Easy Secondary Development</p>
                            <p><span>●</span>2x 100 Pin Connectors for IO Board</p>
                            <img src="/mars-cm/marscm-connectors.webp" />
                        </div>
                        <div className={styles.detail_info2}>
                            <h2>Onboard Gigabit Ethernet PHY</h2>
                            <p><span>●</span>Reducing Backplane Design and Production Costs</p>
                            <p><span>●</span>1x Onboard Gigabit Ethernet PHY</p>
                        </div>
                        <div className={styles.detail_info3}>
                            <h2>Onboard WI-FI 5 / BT 5.2</h2>
                            <p><span>●</span>1x AP6256 onboard</p>
                        </div>
                    </div>
                    <div className={styles.support_boards}>
                        <h2>Compatible with Classic IO Board</h2>
                        <ul className={styles.boards_more}>
                            <li>
                                <div>
                                    <img src="/mars-cm/rockcm3-ioboard.webp" className={styles.rockcm3} />
                                </div>
                                <p>Radxa ROCK CM3 IO Board</p>
                            </li>
                            <li>
                                <div>
                                    <img src="/mars-cm/orangepi-ioboard.webp" className={styles.orangepi} />
                                </div>
                                <p>Orange Pi CM4 IO Board</p>
                            </li>
                            <li>
                                <div>
                                    <img src="/mars-cm/raspberrypi-ioboard.webp" className={styles.raspberrypi} />
                                </div>
                                <p>Raspberry Pi CM4 IO Board</p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.tabBox_tech}>
                        <h1 className={styles.title}><Translate id='line.title.TechSpecs' /></h1>
                        <p className={styles.moreP}>The Mars Compute Module is a System on Module (SoM) based on a the StarFive JH7110 System on Chip (SoC). The Mars CM integrates the Central Process Unit (CPU), Power Man agement Unit (PMU), DRAM memory, flash storage and wireless connectivity (WiFi 5 and BT 5.2) in a small form factor of just 55mm x 40mm. The Mars Compute Module offers a cost-efficient solution out of the box for many different applications.</p>
                        <h2 className={styles.headword}><Translate id='duo.info.text.Hardware' /></h2>
                        <table className={styles.tableBox}>
                            <tbody>
                                <tr>
                                    <td className={styles.tabline}>Processor</td>
                                    <td className={styles.tabP}>Starfve JH7110 64bit SoC with RV64GC, up to 1.5GHz</td>
                                </tr>
                                <tr>
                                    <td >Memory</td>
                                    <td>LPDDR4 2GB / 4GB / 8GB</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >Storage</td>
                                    <td>1x SDIO 2.0 (options to 4GB / 8GB eMMC)</td>
                                </tr>
                                <tr>
                                    <td>1x Nor Flash for boot (16M)</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >Video Output</td>
                                    <td>1x HDMI 2.0</td>
                                </tr>
                                <tr>
                                    <td>1x MIPI DSI (4-lanes)</td>
                                </tr>
                                <tr>
                                    <td>Audio</td>
                                    <td>1x 2CH Audio out (via GPIO)</td>
                                </tr>
                                <tr>
                                    <td>Ethernet</td>
                                    <td>1x Onboard Gigabit Ethernet PHY</td>
                                </tr>
                                <tr>
                                    <td>Wireless</td>
                                    <td>Support WIFI 5/BT5.2</td>
                                </tr>
                                <tr>
                                    <td rowSpan="4">Multimedia</td>
                                    <td>1x MIPI CSI (2x2-lanes or 1x4-lanes)</td>
                                </tr>
                                <tr>
                                    <td>H.264 & H.265 4K@60fps Decoding</td>
                                </tr>
                                <tr>
                                    <td>H.265 1080p@30fps Encoding</td>
                                </tr>
                                <tr>
                                    <td>JPEG encoder / decoder</td>
                                </tr>
                                <tr>
                                    <td rowSpan="4">Connectivity</td>
                                    <td>1x USB 2.0</td>
                                </tr>
                                <tr>
                                    <td>2x PCIe 1-lane Host, Gen 2 (5Gbps)</td>
                                </tr>
                                <tr>
                                    <td>Up to 28x GPIO, supporting 3.3V</td>
                                </tr>
                                <tr>
                                    <td>2x 100 Pin Connectors for IO Board</td>
                                </tr>
                                <tr>
                                    <td rowSpan="5">GPIO</td>
                                    <td>UART x6</td>
                                </tr>
                                <tr>
                                    <td>PWM x8</td>
                                </tr>
                                <tr>
                                    <td>I2C x7</td>
                                </tr>
                                <tr>
                                    <td>SPI</td>
                                </tr>
                                <tr>
                                    <td>I2S</td>
                                </tr>
                                <tr>
                                    <td>Power Input</td>
                                    <td>Support 5V DC in</td>
                                </tr>
                                <tr>
                                    <td>Dimension</td>
                                    <td>55mm x 40mm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <ContactUs product='mars' />
                    <ContactBar product='mars' />
                    <Embrace product='mars' />
                </div>
                <Footer></Footer>
            </Layout>
        </>
    )
}