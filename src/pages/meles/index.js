import React, { useState } from "react";
import Layout from '@theme/Layout';

import styles from './index.module.css'

import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import Footer from "../../components/Footer"
import ContactBar from "../../components/ContactBar"
import Embrace from "../../components/Embrace"
import Translate from '@docusaurus/Translate';
import MetaData from "../../components/MetaData"

export default () => {
    const [meles, setMeles] = useState(false)

    const mars2Start = () => {
        setMeles(false)
    }
    return (
        <Layout>
            <MetaData page='meles' />
            <BuyPop flag={meles} module={mars2Start} type='meles' />
            <div className={styles.melesHead}>
                <div className={styles.titleBox}>
                    <h1>Milk-V <span>Meles</span></h1>
                    <p>Embarking on the RISC-V Cosmic Journey</p>
                    <div className={styles.btnbuy} onClick={() => setMeles(buy => !buy)}>
                        <Translate id='Buy.now' />
                    </div>
                </div>
                <div className={styles.titleIcons}>
                    <img src="/meles/iconThead.svg" />
                    <div>
                        <h3>T-Head TH1520 SoC</h3>
                        <p>Quad Core RISC-V 64GCV C910, up to 2.0GHz</p>
                    </div>
                </div>
            </div>
            <div className={styles.bgColor}>
                <div className={styles.tHeadSoC}>
                    <div className={styles.tHeadSoCLeft}>
                        <div className={styles.topBox}>
                            <h1>T-Head TH1520 SoC</h1>
                            <img src="/meles/ptgLogo.svg" />
                        </div>
                        <img src="/meles/socchart.webp" />
                    </div>
                    <div className={styles.tHeadSoCRight}>
                        <div className={styles.hzBox}>
                            <img src="/mars/risc-v.svg" />
                            <p>Quad Core RISC-V 64GCV C910</p>
                            <h1 className={styles.shaodwText}><span>up to</span>2.0GHz</h1>
                        </div>
                        <img src="/meles/over-meles-size.webp" />
                    </div>
                </div>
                <div className={styles.viaeoBox}>
                    <div className={styles.viaeoLeft}>
                        <h1>Video Processing Master</h1>
                        <p>Support H.265/H.264/VP9 standard video encoding, the highest resolution up to 4K@40fps.</p>
                        <p>Support H.265/H.264/VP9/AVS2 and other multi-format video decoding, the highest resolution up to 4K@75fps.</p>
                        <p>Support JPEG codec, maximum resolution up to 32Kx32K.</p>
                        <div className={styles.icons4k}>
                            <img src="/meles/over-meles-4kicons-01.svg" />
                            <img src="/meles/over-meles-4kicons-02.svg" />
                            <img src="/meles/over-meles-4kicons-03.svg" />
                            <img src="/meles/over-meles-4kicons-04.svg" />
                            <img src="/meles/over-meles-4kicons-05.svg" />
                            <img src="/meles/over-meles-4kicons-06.svg" />
                        </div>
                    </div>
                    <div className={styles.viaeoRight}>
                        <h1>Display,<br></br>More Than One Way</h1>
                        <img src="/meles/over-meles-4k60fps.svg" />
                        <p>1x HDMI2.0</p>
                        <p>1x MIPI DSI 4-lane</p>
                    </div>
                </div>
                <ul className={styles.typeIcons}>
                    <li>
                        <img src="/meles/over-melesicons-01.svg" />
                        <p>4x USB3</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-02.svg" />
                        <p>LPDDR4X 4266MHz</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-03.svg" />
                        <p>Quad Core C910</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-04.svg" />
                        <p>Support 1000Mbps ETH</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-05.svg" />
                        <p>Support WI-FI5</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-06.svg" />
                        <p>Support BT5</p>
                    </li>
                    <li>
                        <img src="/meles/over-melesicons-07.svg" />
                        <p>40 Pin GPIO Header</p>
                    </li>
                </ul>
                <div className={styles.highBox}>
                    <div className={styles.highBoxLeft}>
                        <h1>High Computing Power, True AI</h1>
                        <table className={styles.highTable}>
                            <tbody>
                                <tr>
                                    <td>General-purpose NNA computing power: <span>Supports 4TOPS@INT8.</span></td>
                                </tr>
                                <tr>
                                    <td>Frequency: <span>Operating at 1GHz.</span></td>
                                </tr>
                                <tr>
                                    <td className={styles.tdFlex}>
                                        <p>Support:</p>
                                        <img src="/meles/over-meles-support01.svg" />
                                        <img src="/meles/over-meles-support02.svg" />
                                        <img src="/meles/over-meles-support03.svg" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Support: <span>CNN, RNN, DNN</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.tdFlex2}>
                                        <p>Supported Operations:</p>
                                        <div className={styles.supportText}>
                                            <p><span>●</span> convolution</p>
                                            <p><span>●</span>activation</p>
                                            <p><span>●</span>element-wise operation</p>
                                            <p><span>●</span>pooling</p>
                                            <p><span>●</span>normalization</p>
                                            <p><span>●</span>deconvolution</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.highBoxRight}>
                        <div className={styles.gpuTitle}>
                            <h1>GPU</h1>
                            <h2>3D Graphics Acceleration Engine</h2>
                        </div>
                        <h1>3200Mpixel/sec@800MHz</h1>
                        <div className={styles.gpuIcons}>
                            <img src="/meles/opengl-icon.webp" />
                            <img src="/meles/opencl-icon.webp" />
                            <img src="/meles/vulkan-icon.webp" />
                        </div>
                        <img src="/meles/GPU.webp" />
                    </div>
                </div>
                <div className={styles.sizeBox}>
                    <div className={styles.sizeLeft}>
                        <h1>I Can See the World, Too.</h1>
                        <img src="/meles/chart-left.webp" />
                        <div className={styles.shadowBox}></div>
                    </div>
                    <div className={styles.sizeRight}>
                        <h1>One-click Make Things Easy</h1>
                        <img src="/meles/chart-right.webp" />
                        <div className={styles.shadowBox}></div>
                    </div>
                </div>
                <ul className={styles.take_ul}>
                    <li>
                        <p>Medical Imaging</p>
                        <img src="/meles/take-01.webp" />
                    </li>
                    <li>
                        <p>Video Conference</p>
                        <img src="/meles/take-02.webp" />
                    </li>
                    <li>
                        <p>Home Robotics</p>
                        <img src="/meles/take-03.webp" />
                    </li>
                    <li>
                        <p>Drones</p>
                        <img src="/meles/take-04.webp" />
                    </li>
                </ul>
                <h1 className={styles.title}><Translate id='line.title.TechSpecs' /></h1>
                <p className={styles.moreP}>Milk-V Meles is a credit card-sized, single-board computer (SBC) based on the TH1520. It is powered by a Quad Core RISC-V 64GCV C910, capable of running up to 2.0GHz. This SBC is packed with rich interfaces and boasts powerful computing and AI capabilities, making it an ideal RISC-V intelligent hardware platform for hobbyists, makers, engineers, teachers, and students.</p>
                <h2 className={styles.headword}><Translate id='duo.info.text.Hardware' /></h2>
                <table className={styles.tableBox}>
                    <tbody>
                        <tr>
                            <td className={styles.tabline}>SoC</td>
                            <td className={styles.tabP}>TH1520, Quad Core RISC-V 64GCV C910, up to 2.0GHz</td>
                        </tr>
                        <tr>
                            <td >Memory</td>
                            <td>8GB / 16GB LPDDR4X, 4266 MT/s</td>
                        </tr>
                        <tr>
                            <td rowSpan="2" >Storage</td>
                            <td>1x eMMC Slot</td>
                        </tr>
                        <tr>
                            <td>1x MicroSD Slot</td>
                        </tr>
                        <tr>
                            <td rowSpan="2" >Dispaly</td>
                            <td>1x HDMI2.0, up to 4K@60FPS</td>
                        </tr>
                        <tr>
                            <td>1x MIPI DSI 4-lanes, Support touch screen </td>
                        </tr>
                        <tr>
                            <td rowSpan="3">Audio</td>
                            <td>1x HDMI2.0 with audio output</td>
                        </tr>
                        <tr>
                            <td>1x I2S, Support audio input and output</td>
                        </tr>
                        <tr>
                            <td>1x 3.5mm jack for audio output</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">Camera</td>
                            <td>1x 4-lanes MIPI CSI input</td>
                        </tr>
                        <tr>
                            <td>1x 2-lanes MIPI CSI input</td>
                        </tr>

                        <tr>
                            <td rowSpan="2">USB</td>
                            <td>4x USB3.0 HOST</td>
                        </tr>
                        <tr>
                            <td>1X USB2.0 device (Type-C)</td>
                        </tr>
                        <tr>
                            <td>Ethernet</td>
                            <td>1x 10 / 100 / 1000 Mbps RJ45 Port</td>
                        </tr>
                        <tr>
                            <td>Wireless</td>
                            <td>WI-FI 5 / BT5.2</td>
                        </tr>
                        <tr>
                            <td>GPIO</td>
                            <td>40 Pin GPIO Header, up to 3xUART, 2xI2C, 1xSPI, 1xI2S,1xADC, 8xGPIO, 1xC910 debug port</td>
                        </tr>
                        <tr>
                            <td rowSpan="3">KEY</td>
                            <td>1x key for reset</td>
                        </tr>
                        <tr>
                            <td>1x key for recovery</td>
                        </tr>
                        <tr>
                            <td>1x key for eMMC / SPI flash bootmode swich</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">LED</td>
                            <td>1x Power LED</td>
                        </tr>
                        <tr>
                            <td>1x User LED</td>
                        </tr>
                        <tr>
                            <td>Other</td>
                            <td>2PIN for FAN</td>
                        </tr>
                        <tr>
                            <td>Dimension</td>
                            <td>85x56 mm</td>
                        </tr>
                        <tr>
                            <td>Power Apply</td>
                            <td>5V / 4A DC in (Type-C)</td>
                        </tr>
                    </tbody>
                    {/* colspan rowspan */}

                </table>
                <ContactUs product='meles' />
                <ContactBar product='meles' />
                <Embrace product='meles' />
            </div>
            <Footer></Footer>
        </Layout>
    )
}


