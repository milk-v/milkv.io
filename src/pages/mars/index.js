import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import Footer from "../../components/Footer"
import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"

import Translate from '@docusaurus/Translate';

export default () => {
    const [mars2, setmars2] = useState(false)

    const mars2Start = () => {
        setmars2(false)
    }

    return (
        <Layout>
            <MetaData page='mars' />
            <BuyPop flag={mars2} module={mars2Start} type='mars' />
            <div className={styles.marsBox}>
                <div className={styles.headImage}>
                    <div className={styles.titleBox}>
                        <h1>Milk-V <Translate id='mars' /></h1>
                        <p><Translate id='mars.page.title' /></p>
                        <div className={styles.btnbuy} onClick={() => setmars2(buy => !buy)}><Translate id='Buy.now' /></div>
                    </div>
                </div>
                <div className={styles.prodcuts}>
                    <div className={styles.prodcuts01}>
                        <h1><Translate id='mars.page.info1' /></h1>
                    </div>
                    <div className={styles.prodcuts02}>
                        <img src='/mars/risc-v.svg' />
                        <p><Translate id='mars.page.info2' /></p>
                    </div>
                    <div className={styles.prodcuts03}>
                        40 Pin GPIO Header
                    </div>
                    <div className={styles.prodcuts04}>
                        <h1>Starfive JH7110</h1>
                        <p><Translate id='mars.page.info3' /></p>
                    </div>
                    <div className={styles.prodcuts05}>
                        <p><Translate id='mars.page.info4' /></p>
                        <span><Translate id='mars.page.info5' /></span>
                    </div>
                    <div className={styles.prodcuts06}>
                        <h1><Translate id='mars.page.info6' /></h1>
                        <p><Translate id='mars.page.info7' /></p>
                    </div>
                    <ul className={styles.productsUl}>
                        <li className={styles.li01}>
                            <h1>MIPI DSI</h1>
                            <p className={styles.titleMinP}>4lanes and 2lanes available</p>
                            <p className={styles.title_p}>- 4K@30FPS output</p>
                            <p className={styles.title_p}>- 4K@60FPS decoding</p>
                        </li>
                        <li className={styles.li02}>
                            <h1><Translate id='mars.page.info8' /></h1>
                            <p className={styles.titleMinP}>external M.2 E Key</p>
                        </li>
                        <li className={styles.li03}>
                            {/* <h1><Translate id='mars.page.info9' /></h1>
                            <p className={styles.titleMinP}><Translate id='mars.page.info10' /></p> */}
                        </li>
                    </ul>
                </div>
                <h1 className={styles.title}><Translate id='line.title.TechSpecs' /></h1>
                <p className={styles.moreP}><Translate id='mars.tech.info' /></p>
                <h2><Translate id='duo.info.text.Hardware' /></h2>
                <table className={styles.tableBox}>
                    <tbody>
                        <tr>
                            <td className={styles.tabline}>SoC</td>
                            <td className={styles.tabP}>StarFive JH7110 64bit SoC with RV64GC, up to 1.5GHz</td>
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
                            <td rowSpan="4" >Video output</td>
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
                            <td>40 Pin GPIO Header</td>
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

                </table>
                <ContactUs product='mars' />
                <ContactBar product='mars' />
            </div>
            <Footer></Footer>
        </Layout>
    )
}
