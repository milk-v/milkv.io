import React from "react";
import Layout from '@theme/Layout';
import styles from './jupiter.module.css';
import styles_s from '@site/src/pages/vega/index.module.css';
import styles_j from '@site/src/pages/jupiter/index.module.css';
import Link from '@docusaurus/Link';
import clsx from "clsx";
import Translate from '@docusaurus/Translate';
import BuyPop from "@site/src/components/BuyPop"
import ContactUs from "@site/src/components/ContactUs"

export default () => {
    return <Layout>
        <main className={styles.jnx_main}>
            <div className={styles.jnx_head}>
                <div className={styles.banner_module}>
                    <div className={styles.buy_module}>
                        <h1>Milk-V Jupiter NX</h1>
                        <p>8-Core RISC-V AI Embedded System-on-Module</p>
                        <Link to='#buy' className={styles_s.btnbuy} >
                            <Translate id='Buy.now' />
                        </Link>
                    </div>
                    <img src="/jupiter-nx/jupiter-nx.webp" alt="Jupiter NX" />
                </div>
            </div>
            <div className={styles.jnx_content}>
                <div className={styles.left_main}>
                    <div className={styles.left_item1}>
                        <p className={styles.items_title}>Superior Processing Performance</p>
                        <p className={styles.items_info}>Provides AI computing power up to <span>2TOPS</span> through CPU core fusion, enabling fast integration with all major AI ecosystems.</p>
                        <ol className={clsx(styles_j.border1_ol, styles.left_item1_ol)}>
                            <li>
                                <p className={styles_j.parametric_m}>Octa-core</p>
                                <p className={styles_j.parametric_n}>RISC-V AI CPU</p>
                            </li>
                            <li>
                                <p className={styles_j.parametric_m}>50KDMIPS</p>
                                <p className={styles_j.parametric_n}>CPU computing power</p>
                            </li>
                            <li>
                                <p className={styles_j.parametric_m}>2.0 TOPS</p>
                                <p className={styles_j.parametric_n}>AI computing power</p>
                            </li>
                            <li>
                                <p className={styles_j.parametric_m}>
                                    30%
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="37" viewBox="0 0 12 37" fill="none">
                                        <path d="M6 0.5L0.226498 10.5L11.7735 10.5L6 0.5ZM5 9.5L5 36.5L7 36.5L7 9.5L5 9.5Z" fill="white" />
                                    </svg>
                                </p>
                                <p className={styles_j.parametric_n}>Single Core Computing Power<br /> compared to ARM A55</p>
                            </li>
                        </ol>
                    </div>

                    <div className={styles.left_item2}>
                        <p className={styles.items_title}>X60™ Intelligent Computing Core</p>
                        <p className={styles.items_info}>Based on RISC-V, it extends AI instructions for a CPU with integrated AI power, <span>compatible with all AI models</span></p>
                        <img src="/jupiter-nx/chat1.webp" alt="X60™ Intelligent Computing Core" />
                    </div>

                    <div className={styles.left_item3}>
                        <p className={styles.items_title}>Compatible with Jetson NANO <br />Baseboard</p>
                        <img src="/jupiter-nx/baseboard.webp" alt="Compatible with Jetson NANO Baseboard" />
                    </div>

                    <div className={styles.left_item4}>
                        <p className={styles.items_title}>Half the Price,<br />
                            4 Times the AI Performance</p>
                        <img src="/jupiter-nx/chat2.webp" alt="Half the Price, 4 Times the AI Performance" />
                    </div>

                    <div className={styles.left_item5}>
                        <p className={styles.items_title}>RVV1.0 & RVA22</p>
                    </div>

                    <div className={styles.left_item6}>
                        <p className={styles.items_title}>PCIe Gen2</p>
                        <p className={styles.items_info}>1x 2-lane  +  2x 1-lane</p>
                    </div>

                    <div className={styles.left_item7}>
                        <p className={styles.items_title}>All in Jupiter NX</p>
                        <p className={styles.items_info}>WIFI5/BT5 Onboard; Optional eMMC Onboard</p>
                        <img src="/jupiter-nx/all-in.webp" alt="All in Jupiter NX" />
                    </div>

                </div>
                <div className={styles.right_main}>
                    <div className={styles.right_item1}>
                        <p className={styles.items_title}>Smooth Desktop Experience</p>
                        <p className={styles.items_info}>Support optimised Ubuntu / Fedora OS</p>
                        <img src="/jupiter-nx/desktop1.webp" alt="Ubuntu / Fedora OS" />
                        <img src="/jupiter-nx/desktop2.webp" alt="Ubuntu / Fedora OS" className={styles.desktop2} />
                    </div>


                    <div className={styles.right_item2}>
                        <p className={styles.items_title}>Meets industrial-grade standards</p>
                        <p className={styles.items_info}>Stable and reliable operation in temperatures from -40°C to 85°C</p>
                        <ul className={styles_j.info_ul}>
                            <li>Supports hardware acceleration</li>
                            <li>Supports mainstream frameworks</li>
                        </ul>
                        <div className={styles.support_icons}>
                            <img src="/jupiter/border6-icon1.webp" alt="OpenGL ES 1.1/3.2" />
                            <img src="/jupiter/border6-icon2.webp" alt="EGL1.5" />
                            <img src="/jupiter/border6-icon3.webp" alt="Vulkan 1.3" />
                        </div>
                        <img src="/jupiter/border6-icon4.webp" alt="OpenCL 3.0" />
                    </div>

                    <div className={styles.right_item3}>
                        <p className={styles.items_title}>Dedicated AI algorithm deployment tool — Spacengine™</p>
                        <p className={styles.items_info}>Spacengine™ utilizes SpacemiT's advanced AI instructions and quantization technology to deeply optimize the self-developed RISC-V series chips, significantly boosting the inference performance of common algorithm models on Milk-V Jupiter NX.</p>
                        <img src="/jupiter-nx/chat3.webp" alt="chat" />
                        <img src="/jupiter-nx/chat4.webp" alt="chat" />
                    </div>

                    <div className={styles.right_item4}>
                        <p className={styles.items_title}>Meets industrial-grade standards</p>
                        <p className={styles.items_info}>Stable and reliable operation in temperatures from -40°C to 85°C</p>
                        <p className={styles.standards}><span>-40°C ~</span> 85°C</p>
                    </div>
                </div>
            </div>

            <div className={clsx(styles_s.tabBox_tech, styles_j.tabBox_tech2)}>
                <h2 className={styles_s.title}><Translate id='line.title.TechSpecs' /></h2>
                <p className={styles_s.moreP}>Milk-V Jupiter NX is an octa-core AI system-on-module featuring SpacemiT M1/K1 SoC, onboard WiFi/BT, and eMMC. It complies with RVA22 standards, supports RVV1.0, and is compatible with NANO/Xavier NX baseboards, making it the best replacement for NANO.</p>
                <h2 className={styles_s.headword}><Translate id='duo.info.text.Hardware' /></h2>
                <table className={styles_j.jupiter_table}>
                    <tbody>
                        <tr>
                            <td className={styles_j.tabline}>SoC</td>
                            <td className={styles_j.tabP}>
                                <p>SPACEMIT K1/M1, Octa-core X60™(RV64GCVB), RVA22, RVV1.0</p>
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
                            <td><p>2GB / 4GB / 8GB / 16GB LPDDR4X</p></td>
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
                                <p>H.265/H.264/VP8/VP9/MPEG4/MPEG2 decoder 4K@60fps</p>
                                <p>H.265/H.264/VP8/VP9 encoder 4K@30fps</p>
                                <p>Support simultaneously processing encoding</p>
                                <ul>
                                    <li>1080P@60fps and decoding</li>
                                    <li>1080P@60fps</li>
                                </ul>
                                <p>Support simultaneously</p>
                                <ul>
                                    <li>processing H264/H265 encoding</li>
                                    <li>1080P@30fps and H264/H265</li>
                                    <li>decoding 4K@30fps</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>
                                <p>1x SPI Flash for boot</p>
                                <p>1x Optional eMMC Onboard</p>
                                <p>1x MMC Interface</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Ethernet</td>
                            <td>
                                <p>2x Gigabit Ethernet PHY</p>
                            </td>
                        </tr>
                        <tr>
                            <td>PCIe</td>
                            <td>
                                <p>1x 2-lane + 2 x1-lane PCIe Gen2</p>
                            </td>
                        </tr>
                        <tr>
                            <td>USB</td>
                            <td>
                                <p>1x USB3 OTG (Combo with 1-lane PCIe Gen2)</p>
                                <p>1x USB2 OTG</p>
                                <p>1x USB2 HOST</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Wireless</td>
                            <td>
                                <p>WIFI5/BT5 Onboard</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Camera</td>
                            <td>
                                <p>1x HDMI Interface, up to 1920x1440@60FPS</p>
                                <p>1x MIPI DSI 4-lane</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Resource</td>
                            <td>
                                <p>Up to 55x GPIO available</p>
                                <p>Up to 2x I2S</p>
                                <p>Up to 3x UART</p>
                                <p>Up to 2x I2C</p>
                                <p>Up to 1x SPI</p>
                                <p>Up to 3x PWM</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <BuyPop type='jupiter-nx' />
            <ContactUs product='jupiter-nx' />
        </main>
    </Layout>
}