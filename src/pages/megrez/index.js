import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/jupiter/index.module.css';
import styles_v from '@site/src/pages/vega/index.module.css';
import clsx from "clsx";
import Subscribe from "@site/src/components/Subscribe";

export default () => {
    return <Layout>
        <main className={styles.__main}>
            <div className={styles.pr_title}>
                <h1 className={styles.pr_name}>Milk-V Megrez</h1>
                <p className={styles.pr_info}>New RISC-V AI PC Milestone</p>
            </div>
            <Subscribe product='megrez' />
            <div className={clsx(styles_v.tabBox_tech, styles_s.tabBox_tech2, styles.m_width)}>
                <table className={styles_s.jupiter_table}>
                    <tbody>
                        <tr>
                            <td className={styles_s.tabline}>SoC</td>
                            <td className={styles_s.tabP}>
                                <p>ESWIN EIC7700X</p>
                            </td>
                        </tr>
                        <tr>
                            <td>CPU</td>
                            <td>
                                <p>4-Core SIFIVE P550(RISC-V RV64CG)@1.6GHz</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>GPU</p>
                            </td>
                            <td>
                                <p>Built-in GPU,Support OpenGL ES 3.2, EGL 1.4, OpenCL 1.2 and 2.1 EP2 • Vulkan 1.2</p>
                            </td>
                        </tr>
                        <tr>
                            <td>NPU</td>
                            <td>
                                <p>INT8  19.95TOPS</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Multimedia</td>
                            <td>
                                <p>Supports HEVC(H.265) and AVC(H.264) encoding and decoding</p>
                                <p>H.265 up to 8K@50fps or 32 channels of 1080P@30fps video decoding</p>
                                <p>H.265 up to 8K@25fps or 13 channels of 1080P@30fps video encoding</p>
                                <p>JPEG ISO/IEC 10918-1, ITU-T T.81, up to 32K x 32K</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>
                                <p>1x SPI Flash for boot</p>
                                <p>1x M.2 M Key Connector for M.2 SATA SSD(SATA3)</p>
                                <p>1x eMMC Connector</p>
                                <p>1x microSD Card Slot</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Memory</td>
                            <td>
                                <p>8 / 16 / 32G LPDDR5 6400MT/s</p>
                            </td>
                        </tr>
                        <tr>
                            <td>PCIe</td>
                            <td>
                                <p>1x PCIe X8 Connector(PCIe Gen3 x4)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Ethernet</td>
                            <td>
                                <p>1x Gigabit Ethernet Port</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Wireless</td>
                            <td>
                                <p>1x WIFI/BT Module Onboard</p>
                            </td>
                        </tr>
                        <tr>
                            <td>USB</td>
                            <td>
                                <p>4x USB3 HOST</p>
                                <p>2x F_USB3</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Display</td>
                            <td>
                                <p>1x HDMI2.0</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Audio</td>
                            <td>
                                <p>1x 3.5mm Jack for Audio input</p>
                                <p>1x 3.5mm Jack for Audio output</p>
                                <p>1x F_AUDIO for Front Panel Audio input/output</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Debug</td>
                            <td>
                                <p>1x UART</p>
                                <p>1x JTAG</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Power</td>
                            <td>
                                <p>1x Standard 24-Pin ATX Power Supply Interface</p>
                                <p>1x 12V DC Power Jack(5.5x2.5mm)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Others</td>
                            <td>
                                <p>1x RTC Slot (CR1220)</p>
                                <p>1x 4P for PWM FAN</p>
                                <p>1x F_Panel</p>
                                <p>1x Power LED(DC/ATX)</p>
                                <p>1x Status LED</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Dimension</td>
                            <td>
                                <p>170mm x 170 mm</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </Layout>
}