import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/jupiter/index.module.css';
import styles_v from '@site/src/pages/vega/index.module.css';
import clsx from "clsx";
// import Subscribe from "@site/src/components/Subscribe";
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import ContactUs from "../../components/ContactUs"
import MetaData from "../../components/MetaData"
import BuyPop from "../../components/BuyPop"

export default () => {
    return <Layout>
        <MetaData page='megrez' />
        <main className={styles.__main}>
            <div className={styles.mg_bg}>
                <div className={styles.title_box}>
                    <div className={styles.mg_title}>
                        <h1>Milk-V Megrez</h1>
                        <p>Your RISC-V AI PC</p>
                        <Link to='#buy' className={styles_v.btnbuy} >
                            <Translate id='Buy.now' />
                        </Link>
                    </div>
                    <img src="/megrez/megrez-view.webp" alt="Milk-V Megrez" />
                </div>
            </div>
            <div className={styles.mg_items}>
                <div className={styles.chips}>
                    <div className={styles.chip_bg}>
                        <p>
                            Powered by
                            <font>ESWIN EIC7700X</font>
                        </p>
                        <ol>
                            <li>
                                <p>up to 1.8GHz</p>
                                <p className={styles.chip_text}>Quad Core SiFive P550<br />(RV64GBCH)</p>
                            </li>
                            <li>
                                <p>Up to<br /> 19.95 TOPS@INT8</p>
                                <p className={styles.chip_text}>Powerful NPU</p>
                            </li>
                        </ol>
                    </div>
                    <div className={styles.chip2}>
                        <p className={clsx(styles.item_title)}>SiFive P550 From SiFive Performance™</p>
                        <ul>
                            <li>RISC-V RV64GBCH CPU, up to <font>1.8GHz</font></li>
                        </ul>
                        <ol>
                            <li>L1 Cache: 32KB (I) + 32KB (D) private</li>
                            <li>L2 Cache: 256KB private</li>
                            <li>L3 Cache: 4MB shared</li>
                        </ol>
                        <ul>
                            <li>Support ECC (SECDED)</li>
                            <li>13-stage, triple-issue, out-of-order pipeline</li>
                        </ul>
                        <img src="/megrez/block-image.webp" alt="SiFive P550" />
                    </div>
                </div>
                <div className={styles.parameters}>
                    <div className={styles.npu}>
                        <p className={clsx(styles.item_title, styles.item_center)}>High Computation NPU</p>
                    </div>
                    <div className={styles.gpu}>
                        <p className={clsx(styles.item_title)}>High efficiency IMG AXM-8-256 GPU</p>
                        <p className={styles.item_mint}>The optimum balance of fill rate and compute in a compact silicon area</p>
                        <ul className={styles.item_ul}>
                            <li>128-wide superscalar ALU (Arithmetic Logic Unit) with dedicated AI pipelines delivers up to 0.25 TFLOPS, 1 TOPS, and 8 Gpixels performance.</li>
                        </ul>
                        <img src="/megrez/gpu-support.webp" alt="High efficiency IMG AXM-8-256 GPU" />
                    </div>
                </div>
                <div className={styles.video}>
                    <div className={styles.new_video}>
                        <div className={styles.video_8k}>
                            <p className={clsx(styles.item_title)}>Support 8K Multi-channel Video Processing</p>
                            <ul className={styles.item_ul}>
                                <li>Support HEVC (H.265) and AVC (H.264) encoding and decoding</li>
                                <li>H.265 up to 8K@50fps or 32-channel 1080P@30fps video decoding</li>
                                <li>H.265 up to 8K@25fps or 13-channel 1080P@30fps video encoding</li>
                            </ul>
                            <img src="/megrez/video-view.webp" alt="Support 8K Multi-channel Video Processing" />
                        </div>
                        <div className={styles.video_support}>
                            <p className={clsx(styles.item_title)}>28% CPU Frequency Boost Exclusively
                                on Milk-V Megrez</p>
                        </div>
                    </div>
                    <div className={styles.jcjh}>
                        <p className={clsx(styles.item_title, styles.flex_center)}>
                            <img src="/megrez/jcjh.svg" />
                            Support 8K Multi-channel Video Processing</p>
                        <ul className={styles.item_ul}>
                            <li>With the robust ecosystem support of the Jiachen Project, everything you need—from distributions to software packages—is at your fingertips.</li>
                        </ul>
                        <img src="/megrez/video-view2.webp" alt=" Support 8K Multi-channel Video Processing" />
                    </div>
                </div>
                <div className={styles.ad_new}>
                    <div>
                        <p className={clsx(styles.item_title)}>This Time, We've Gone All Out</p>
                        <ul className={styles.item_ul}>
                            <li>Single-Core/Multi-Core Performance Sees a Leap Forward Compared to SiFive Unmatched</li>
                        </ul>
                        <img src="/megrez/all-ai.webp" alt="This Time, We've Gone All Out" className={styles.chart1} />
                    </div>
                    <div>
                        <p className={clsx(styles.item_title)}>Hypervisor, the King of Virtualization</p>
                        <ul className={styles.item_ul}>
                            <li>The RISC-V Hypervisor (H) extension is a set of Instruction Set Architecture (ISA) extensions designed to enable virtualization. By introducing new instructions and processor modes, it allows RISC-V hardware to natively support hypervisors running multiple Virtual Machines (VMs).</li>
                        </ul>
                        <img src="/megrez/chart2.webp" alt="Hypervisor, the King of Virtualization" className={styles.chart2} />
                    </div>
                </div>

                <div className={styles.ai}>
                    <p className={clsx(styles.item_title, styles.item_center)}>Powerful AI Tool Chain</p>
                    <p className={clsx(styles.item_mint, styles.item_center)}>Supports software development frameworks such as PyTorch, TensorFlow, PaddlePaddle, ONNX, etc., and high-precision LLMs</p>
                    <img src="/megrez/ai-support.webp" alt="Powerful AI Tool Chain" />
                </div>
                <div className={styles.support}>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Support Wireless</p>
                        <p className={clsx(styles.item_mint, styles.item_center)}>M.2 Key E connector for Wi-Fi/Bluetooth modules (Interface via SDIO/UART)</p>
                    </div>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Onboard Standard PCIe X8 Connector</p>
                        <p className={clsx(styles.item_mint, styles.item_center)}>Built-in PCIe Gen3 X4 signaling</p>
                    </div>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Support High-end <br />Graphics Cards</p>
                        <p className={clsx(styles.item_mint, styles.item_center)}>Supports up to AMD 7900XTX (passed test)</p>
                        <img src="/megrez/cards.webp" alt="Support High-end Graphics Cards" className={styles.cards} />
                    </div>
                </div>

                <div className={styles.storage}>
                    <p className={clsx(styles.item_title)}>Support Multiple Storage</p>
                    <ol>
                        <li>
                            <img src="/megrez/sd.webp" alt="micro SD Card" />
                            <p>micro SD Card</p>
                        </li>
                        <li>
                            <img src="/megrez/emmc.webp" alt="eMMC Module" />
                            <p>eMMC Module</p>
                        </li>
                        <li>
                            <img src="/megrez/ssd.webp" alt="M.2 SATA SSD" className={styles.ssd_img} />
                            <p>M.2 SATA SSD</p>
                        </li>
                        <li>
                            <img src="/megrez/sata.webp" alt="SATA3 HDD/SSD" />
                            <p>SATA3 HDD/SSD</p>
                        </li>
                    </ol>
                </div>

                <div className={styles.build_title}>
                    <p className={clsx(styles.item_title, styles.item_center)}>Build Your Own RISC-V AI Desktop</p>
                </div>
                <div className={styles.support2}>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Standard Mini-ITX</p>
                        <img src="/megrez/size-view.webp" alt="Standard Mini-ITX" className={styles.size} />
                    </div>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Supports standard ATX power supply</p>
                    </div>
                    <div>
                        <p className={clsx(styles.item_title, styles.item_center)}>Supports standard Mini-ITX desktop cases</p>
                        <img src="/megrez/supports.webp" alt="Supports standard Mini-ITX desktop cases" className={styles.itx} />
                    </div>
                </div>
            </div>

            <div className={clsx(styles_v.tabBox_tech, styles_s.tabBox_tech2, styles.m_width)}>
                <h2 className={styles_v.title}><Translate id='line.title.TechSpecs' /></h2>
                <p className={clsx(styles_v.moreP, styles.marginBtm)}>Milk-V Megrez is a Mini-ITX device powered by the ESWIN EIC7700X. It features a built-in quad-core SiFive P550 CPU, specifically designed for RISC-V native development. With a high-performance GPU, it delivers a smooth desktop experience, while its 19.95 TOPS NPU provides exceptional local AI capabilities. The Milk-V Megrez marks a significant milestone in RISC-V desktop technology.</p>
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
                                <p>4-Core SIFIVE P550(RISC-V RV64GBCH)@1.8GHz</p>
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
                                <p>19.95TOPS@INT8 NPU, Support INT16/FP16</p>
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
                            <td>Memory</td>
                            <td>
                                <p>8 / 16 / 32G LPDDR5 6400MT/s</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>
                                <p>1x SPI Flash onboard</p>
                                <p>1x M.2 for SATA SSD(SATA3 6GB/s)</p>
                                <p>1x eMMC Connector</p>
                                <p>1x microSD Card Slot</p>
                                <p>1x SATA3 Connector (Combo with M.2 for SATA)</p>
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
                                <p>2x Gigabit Ethernet Port</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Wireless</td>
                            <td>
                                <p>1x M.2 E Key for Wireless Module</p>
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
                                <p>1x Recovery Switch</p>
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
        <BuyPop type='megrez' />
        <ContactUs product='megrez' />
    </Layout >
}