import React from "react";
import ChipsView from "@site/src/components/ChipsView";
import styles from './index.module.css';
import clsx from "clsx";
import Translate from '@docusaurus/Translate';

export default () => {

    return (
        <ChipsView chipName='duo-module-01' >
            <div className={styles.overview_center}>
                <div className={styles.module1}>
                    <div className={clsx(styles.b_green, styles.functions)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text1" /></p>
                        <ol>
                            <li>
                                <img src="/duom01/soc.svg" />
                                <p>SG2000 SoC</p>
                            </li>
                            <li>
                                <img src="/duom01/ram.svg" />
                                <p>SIP DRAM 512MB</p>
                            </li>
                            <li>
                                <img src="/duom01/emmc.svg" />
                                <p>8GB eMMC</p>
                            </li>
                            <li>
                                <img src="/duom01/btn.svg" />
                                <p>BTDM5</p>
                            </li>
                            <li>
                                <img src="/duom01/wifi.svg" />
                                <p>WI-FI6</p>
                            </li>
                            <li>
                                <img src="/duom01/tpu.svg" />
                                <p>0.5TOPS TPU</p>
                            </li>
                        </ol>
                    </div>
                    <div className={styles.functions_right}>
                        <div className={styles.module1_top}>
                            <div className={clsx(styles.b_green, styles.module1_top_1)}>
                                <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text2" /></p>
                                <p className={clsx(styles.ov_title_)}>Built-in RV64GCV / Cortex-A53 with RV64GC, 8051<br />Built-in 0.5TOPS@INT8 TPU</p>
                                <img src="/duom01/chip-view.webp" alt="Five Core" />
                            </div>
                            <div className={clsx(styles.b_green, styles.module1_top_2)}>
                                <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text3" /></p>
                                <p className={clsx(styles.ov_title_)}>25*25 mm(≈ 0.98inch)</p>
                                <img src="/duom01/size-view.webp" alt="Size View" />
                            </div>
                        </div>
                        <div className={clsx(styles.b_green, styles.module_bottom)}>
                            <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text4" /></p>
                            <ol>
                                <li>
                                    <img src="/duom01/software1.webp" alt="Buildroot" />
                                    <p>Buildroot</p>
                                </li>
                                <li>
                                    <img src="/duom01/software2.webp" alt="Arduino IDE" />
                                    <p>Arduino IDE</p>
                                </li>
                                <li>
                                    <img src="/duom01/software3.webp" alt="Peripherals" />
                                    <p>Peripherals</p>
                                </li>
                                <li>
                                    <img src="/duom01/software4.webp" alt="Resources from Community" />
                                    <p>Resources from Community</p>
                                </li>
                                <li>
                                    <img src="/duom01/software5.webp"  alt="Ubuntu" />
                                    <p>Ubuntu</p>
                                </li>
                                <li>
                                    <img src="/duom01/software6.webp" alt="Debian" />
                                    <p>Debian</p>
                                </li>
                                <li>
                                    <img src="/duom01/software7.webp" alt="AliOS" />
                                    <p>AliOS</p>
                                </li>
                                <li>
                                    <img src="/duom01/software8.webp" alt="RT-Thread" />
                                    <p>RT-Thread</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={styles.module2}>
                    <div className={clsx(styles.b_green)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text5" /></p>
                        <ol>
                            <li>
                                <img src="/duom01/design1.webp" alt="2D Design Files" />
                                <p>2D Design Files</p>
                            </li>
                            <li>
                                <img src="/duom01/design2.webp" alt="Schematic" />
                                <p>Schematic</p>
                            </li>
                            <li>
                                <img src="/duom01/design3.webp" alt="Datasheet" />
                                <p>Datasheet</p>
                            </li>
                            <li>
                                <img src="/duom01/design4.webp" alt="Baseboard Reference Design" />
                                <p>Baseboard Reference Design</p>
                            </li>
                        </ol>
                    </div>
                    <div className={clsx(styles.b_green)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text6" /></p>
                        <div className={styles.line_design}>
                            <img src="/duom01/line-drawing.svg" alt="Line Drawing" />
                            <ul>
                                <li><Translate id="page.duo01.text7" /></li>
                                <li><Translate id="page.duo01.text8" /></li>
                                <li><Translate id="page.duo01.text9" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.module3}>
                    <div className={clsx(styles.b_green, styles.take1)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text10" /></p>
                        <p className={clsx(styles.ov_title_)}><Translate id="page.duo01.text11" /></p>
                        <img src="/duom01/scene1.webp" alt="Supports SMD to Baseboard" />
                    </div>
                    <div className={clsx(styles.b_green, styles.take2)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text12" /></p>
                        <p className={clsx(styles.ov_title_)}><Translate id="page.duo01.text13" /></p>
                        <img src="/duom01/right-view.webp" alt="Open source Reference Design" />
                    </div>
                    <div className={clsx(styles.b_green, styles.take3)}>
                        <p className={clsx(styles.ov_title)}><Translate id="page.duo01.text14" /></p>
                        <img src="/duom01/certification.webp" alt="Complete Compliance Certification" />
                    </div>
                </div>
            </div>
        </ChipsView >
    )
}