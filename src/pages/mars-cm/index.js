import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css'
import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
// import ContactBar from "../../components/ContactBar"
import Translate from '@docusaurus/Translate';
import MetaData from "../../components/MetaData"
import Link from '@docusaurus/Link';

export default () => {

    return (
        <>
            <Layout>
                <MetaData page='marscm' />
                <div className={styles.header_page}>
                    <div className={styles.title_content}>
                        <div className={styles.leftTitle}>
                            <h2><span>Milk-V Mars</span> CM</h2>
                            <p>A RISC-V Compute Module in compatible form factor</p>
                            <Link to='#buy' className={styles.btnbuy}>
                                <Translate id='Buy.now' />
                            </Link>
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
                                <img src="/mars-cm/risc-v-white.svg" alt="RISC-V" />
                            </div>
                        </div>
                        <div className={styles.block_diagram}>
                            <h2>Mars CM Block Diagram</h2>
                        </div>
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
                                <img src="/meles/over-meles-4kicons-01.svg" alt="H.264" />
                                <img src="/meles/over-meles-4kicons-02.svg" alt="H.265" />
                                <img src="/meles/over-meles-4kicons-03.svg" alt="JPEG 9" />
                                <img src="/meles/over-meles-4kicons-05.svg" alt="4K 40FPS" />
                                <img src="/meles/over-meles-4kicons-06.svg" alt="4K 75FPS" />
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
                            <p><span>●</span>Storage: 1x SDIO 2.0 (options to eMMC)</p>
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
                            <img src="/mars-cm/extended.webp" alt="PCIe Available" />
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
                                <img src="/mars-cm/support-Ubuntu.webp" alt="Ubuntu" />
                                <img src="/mars-cm/support-fedora.webp" alt="Fedora" />
                                <img src="/mars-cm/support-opensuse.webp" alt="OpenSUSE" />
                                <img src="/mars-cm/support-debian.webp" alt="Debian" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.detail_info1}>
                            <h2>Board-to-board Connectors</h2>
                            <p><span>●</span>Easy Secondary Development</p>
                            <p><span>●</span>2x 100 Pin Connectors for IO Board</p>
                            <img src="/mars-cm/marscm-connectors.webp" alt="Board-to-board Connectors" />
                        </div>
                        <div className={styles.detail_info2}>
                            <h2>Onboard Gigabit Ethernet PHY</h2>
                            <p><span>●</span>Reducing Backplane Design and Production Costs</p>
                            <p><span>●</span>1x Onboard Gigabit Ethernet PHY</p>
                        </div>
                        <div className={styles.detail_info3}>
                            <h2>Onboard<br></br> WI-FI 5 / BT 5.2</h2>
                            <p><span>●</span>1x AP6256 onboard</p>
                        </div>
                        <div className={styles.detail_info4}>
                            <h2>Compatible with Classic IO Board</h2>
                            <p><span>●</span>CM4 IO Board</p>
                            <img src="/mars-cm/cm4ioboard.webp" alt="Compatible with Classic IO Board" />
                        </div>
                    </div>
                    <div className={styles.tabBox_tech}>
                        <h2 className={styles.title}><Translate id='line.title.TechSpecs' /></h2>
                        <p className={styles.moreP}>The Mars Compute Module is a System on Module (SoM) based on a the StarFive JH7110 System on Chip (SoC). The Mars CM integrates the Central Process Unit (CPU), Power Management Unit (PMU), DRAM memory, flash storage and wireless connectivity (WiFi 5 and BT 5.2) in a small form factor of just 55mm x 40mm. The Mars Compute Module offers a cost-efficient solution out of the box for many different applications.</p>
                        <h2 className={styles.headword}><Translate id='duo.info.text.Hardware' /></h2>
                        <table className={styles.tableBox}>
                            <tbody>
                                <tr>
                                    <td className={styles.tabline}>Processor</td>
                                    <td className={styles.tabP}>StarFive JH7110 64bit SoC with RV64GC, up to 1.5GHz</td>
                                </tr>
                                <tr>
                                    <td >Memory</td>
                                    <td>LPDDR4 2GB / 4GB / 8GB</td>
                                </tr>
                                <tr>
                                    <td rowSpan="2" >Storage</td>
                                    <td>1x SDIO 2.0 (options to eMMC)</td>
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
                                    <td>Support WIFI 5 / BT5.2</td>
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
                                    <td>1x PCIe 1-lane Host, Gen 2 (5Gbps)</td>
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
                    <BuyPop type='mars-cm' />
                    <ContactUs product='mars' />
                    {/* <ContactBar product='mars' /> */}
                </div>
            </Layout>
        </>
    )
}