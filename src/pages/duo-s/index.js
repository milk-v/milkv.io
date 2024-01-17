import React, { useState } from "react";

import Layout from '@theme/Layout';
import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"
import Link from '@docusaurus/Link';
import styles from "./index.module.css"
import Translate from '@docusaurus/Translate';

import styles_duo from '@site/src/pages/duo/details.module.css'


export default () => {
    const [duo2, setDuo2] = useState(false)
    const duoStart = () => {
        setDuo2(false)
    }

    return (
        <Layout>
            <BuyPop flag={duo2} module={duoStart} type='duo' />
            <div className={styles.content}>
                <div className={styles.content_head}>
                    <div className={styles.flex_head}>
                        <div className={styles.left_t}>
                            <h2>Milk-V DUO S</h2>
                            <p>All-around Powerful</p>
                            <div className={styles.buy_btn} onClick={() => setDuo2(buy => !buy)}><Translate id='Buy.now' /></div>
                            <span>*Tax or shipping is not included </span>
                        </div>
                        <img src="/duo-s/duo-s-front.webp" alt='Milk-V DUO S' />
                    </div>
                </div>
                <div className={styles.c_info}>
                    <div className={styles.info_list1}>
                        <div>
                            <p>Built-in 0.5TOPS@INT8 TPU</p>
                        </div>
                        <div>
                            <div className={styles.t_text}>
                                <div>
                                    <h3>More powerful than others</h3>
                                    <p>Dual Core RISC-V CPU up to</p>
                                </div>
                                <p>1 Ghz</p>
                            </div>
                            <img src="/duo-s/chart.webp" alt="More powerful than others" />
                        </div>
                    </div>
                    <div className={styles.info_list2}>
                        <div>
                            <h3>Dual MIPI CSI with ISP</h3>
                            <p>Support 2L+2L MIPI CSI 5M@30fps</p>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <img src="/duo-s/wifi.svg" />
                                    <p>WI-FI6</p>
                                </li>
                                <li>
                                    <img src="/duo-s/bt5.svg" />
                                    <p>BT5</p>
                                </li>
                                <li>
                                    <img src="/duo-s/ethernet.svg" />
                                    <p>100Mbps<br />
                                        Ethernet Port</p>
                                </li>
                                <li>
                                    <img src="/duo-s/camera.svg" />
                                    <p>Dual-camera</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.info_list3}>
                        <div>
                            <h4>Optional WI-FI6/BT5</h4>
                            <p>Onboard</p>
                        </div>
                        <div>
                            <h4>Optional eMMC</h4>
                            <p>Onboard</p>
                        </div>
                        <div>
                            <h4>100 Mbps Ethernet Port </h4>
                            <p>with PoE Support
                                (via PoE HAT)</p>
                        </div>
                    </div>
                    <div className={styles.info_list4}>
                        <div>
                            <div className={styles.left_t_audio}>
                                <div>
                                    <img src="/duo-s/audio.svg" />
                                    <span>Audio Output via GPIO Header</span>
                                </div>
                                <div>
                                    <img src="/duo-s/display.svg" />
                                    <div>
                                        <p>MIPI DSI(4-lane)</p>
                                        <span>Support 5M@30FPS Video Output</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Mini Size</p>
                            <img src="/duo-s/size-cts.svg" alt="Mini Size" />
                        </div>
                    </div>
                    <div className={styles.info_list5}>
                        <div>
                            <p>Pushbutton Switching<br />
                                RISC-V / ARM Boot</p>
                        </div>
                        <div>
                            <p> Runs Linux and RTOS <br /> Simultaneously</p>
                        </div>
                        <div>
                            <p>Open Source SDK</p>
                        </div>
                    </div>
                </div>
                <div className={styles_duo.content_box}>
                    <div className={styles_duo.techspec_module}>
                        <h2><Translate id='line.title.TechSpecs' /></h2>
                        <p className={styles_duo.techspec_info}>
                            Milk-V Duo S is an upgraded model of Duo, featuring an upgraded SG2000 main controller with a larger 512MB memory and expanded IO capabilities. It integrates wireless capabilities with WI-FI 6/BT 5, and comes equipped with a USB 2.0 HOST interface and a 100Mbps Ethernet port for user convenience. Supporting dual cameras (2x MIPI CSI 2-lane) and MIPI video output (MIPI DSI 2-lane), it allows for versatile applications. The device also supports switching between RISC-V and ARM boot through a switch. With enhanced functionality, Duo S is better suited for a variety of scenarios with more complex project development requirements.
                        </p>
                        <h3>
                            <Translate id='duo.info.text.Hardware' />
                        </h3>
                        <table className={styles_duo.duo_techspec_table}>
                            <tbody>
                                <tr>
                                    <td className={styles_duo.tr_width}></td>
                                    <td colSpan="2">Duo S</td>
                                    <td colSpan="2">Duo 256M</td>
                                    <td colSpan="2">Duo</td>
                                </tr>
                                <tr>
                                    <td>SoC</td>
                                    <td colSpan="2"><font color='#2d88c9'>SG2000</font></td>
                                    <td colSpan="2"><font color='#2d88c9'>SG2002</font></td>
                                    <td colSpan="2">CVITEK CV1800B</td>
                                </tr>
                                <tr>
                                    <td>RISC-V CPU</td>
                                    <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                                    <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                                    <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                                </tr>
                                <tr>
                                    <td>Arm CPU</td>
                                    <td colSpan="2"><font color='#2d88c9'>1xCortex-A53 @ 1GHz</font></td>
                                    <td colSpan="2"><font color='#2d88c9'>1xCortex-A53 @ 1GHz</font></td>
                                    <td colSpan="2">N/A</td>
                                </tr>
                                <tr>
                                    <td>MCU</td>
                                    <td colSpan="2">8051@8KB SRAM</td>
                                    <td colSpan="2">8051@6KB SRAM</td>
                                    <td colSpan="2">8051@6KB SRAM</td>
                                </tr>
                                <tr>
                                    <td>Memory</td>
                                    <td colSpan="2"><font color='#2d88c9'>SIP DRAM 512MB</font></td>
                                    <td colSpan="2"><font color='#2d88c9'>SIP DRAM 256MB</font></td>
                                    <td colSpan="2">SIP DRAM 64MB</td>
                                </tr>
                                <tr>
                                    <td>TPU</td>
                                    <td colSpan="2">0.5TOPS@INT8</td>
                                    <td colSpan="2"><font color='#2d88c9'>1TOPS@INT8</font></td>
                                    <td colSpan="2">0.5TOPS@INT8</td>
                                </tr>
                                <tr>
                                    <td>Storage</td>
                                    <td colSpan="2">1x microSD connector
                                        1x eMMC Pad on board</td>
                                    <td colSpan="2">1x microSD connector or
                                        1x SD NAND on board</td>
                                    <td colSpan="2">1x microSD connector or
                                        1x SD NAND on board</td>
                                </tr>
                                <tr>
                                    <td>USB</td>
                                    <td colSpan="2">1 x Type-C for power and data,
                                        USB Pads available</td>
                                    <td colSpan="2">1 x Type-C for power and data, USB Pads available</td>
                                    <td colSpan="2">1 x Type-C for power and data or <font color='#2d88c9'>1x USB 2.0 A Port HOST</font></td>
                                </tr>
                                <tr>
                                    <td>CSI</td>
                                    <td colSpan="2">1x 16P FPC connector
                                        (MIPI CSI 2-lane),
                                        <font color='#2d88c9'>1x 15P FPC connector (MIPI CSI 2-lane)</font></td>
                                    <td colSpan="2">1x 16P FPC connector
                                        (MIPI CSI 2-lane)</td>
                                    <td colSpan="2">1x 16P FPC connector
                                        (MIPI CSI 2-lane)</td>
                                </tr>
                                <tr>
                                    <td>Sensor Support</td>
                                    <td colSpan="2"><font color='#2d88c9'>5M@30fps<br /></font></td>
                                    <td colSpan="2"><font color='#2d88c9'>5M@30fps<br /></font></td>
                                    <td colSpan="2">4M@25fps </td>
                                </tr>
                                <tr>
                                    <td>DSI</td>
                                    <td colSpan="2"><font color='#2d88c9'>Via GPIO Header (MIPI DSI 4-lane)</font></td>
                                    <td colSpan="2">N/A</td>
                                    <td colSpan="2">N/A</td>
                                </tr>
                                <tr>
                                    <td>Ethernet</td>
                                    <td colSpan="2"><font color='#2d88c9'>100Mbps ethernet port(RJ45) onboard</font></td>
                                    <td colSpan="2">100Mbps ethernet with PHY</td>
                                    <td colSpan="2">100Mbps ethernet with PHY</td>
                                </tr>
                                <tr>
                                    <td>Wireless</td>
                                    <td colSpan="2"><font color='#2d88c9'>Optional WI-FI6/BT5 onboard</font></td>
                                    <td colSpan="2">N/A</td>
                                    <td colSpan="2">N/A</td>
                                </tr>
                                <tr>
                                    <td>Audio</td>
                                    <td colSpan="2"><font color='#2d88c9'>Via GPIO Pin</font></td>
                                    <td colSpan="2"><font color='#2d88c9'>Via GPIO Pads</font></td>
                                    <td colSpan="2">N/A</td>
                                </tr>
                                <tr>
                                    <td>GPIO</td>
                                    <td colSpan="2">Up to 39x GPIO Pin (Via 2x 26Pin GPIO Header)</td>
                                    <td colSpan="2">Up to 26x GPIO Pads</td>
                                    <td colSpan="2">Up to 26x GPIO Pads</td>
                                </tr>
                                <tr>
                                    <td>Power</td>
                                    <td colSpan="2">5V/1A</td>
                                    <td colSpan="2">5V/1A</td>
                                    <td colSpan="2">5V/1A</td>
                                </tr>
                                <tr>
                                    <td>OS Support</td>
                                    <td colSpan="2">Linux, RTOS</td>
                                    <td colSpan="2">Linux, RTOS</td>
                                    <td colSpan="2">Linux, RTOS</td>
                                </tr>
                                <tr>
                                    <td>Dimension</td>
                                    <td colSpan="2">43mm x 43mm</td>
                                    <td colSpan="2">21mm x 51mm</td>
                                    <td colSpan="2">21mm x 51mm</td>
                                </tr>
                                <tr>
                                    <td>Others</td>
                                    <td colSpan="2">1x BOOT swich,
                                        1x Recovery Key,
                                        1x RST Key </td>
                                    <td colSpan="2">N/A</td>
                                    <td colSpan="2">N/A</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <h3>
                            <Translate id='duo.info.text.pinOut' />
                        </h3>
                        <h4>
                            - Duo / Duo 256S
                        </h4>
                        <img src='/duo/duo-pinout.webp' className={styles_duo.duo_pinout} alt='Pin Out' /> */}
                        {/* <h3><Translate id='duo.info.text.Documents' /></h3> */}
                    </div>
                </div>
                <ContactUs product='duo' />
                <ContactBar product='duo' />
            </div>
        </Layout>
    )
}