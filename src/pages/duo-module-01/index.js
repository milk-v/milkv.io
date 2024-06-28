import React from "react";
import ChipsView from "@site/src/components/ChipsView";
import styles from './index.module.css';
import clsx from "clsx";

export default () => {

    return (
        <ChipsView chipName='duo-module-01' >
            <div className={styles.overview_center}>
                <div className={styles.module1}>
                    <div className={clsx(styles.b_green, styles.functions)}>
                        <p className={clsx(styles.ov_title)}>Built-in Main Functions</p>
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
                                <p>BTDM5.4</p>
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
                                <p className={clsx(styles.ov_title)}>"Five Core"</p>
                                <p className={clsx(styles.ov_title_)}>Built-in RV64GCV / Cortex-A53 with RV64GC, 8051<br />Built-in 0.5TOPS@INT8 TPU</p>
                                <img src="/duom01/chip-view.webp" alt="Five Core" />
                            </div>
                            <div className={clsx(styles.b_green, styles.module1_top_2)}>
                                <p className={clsx(styles.ov_title)}>Compact size</p>
                                <p className={clsx(styles.ov_title_)}>25*25 mm(≈ 0.98inch)</p>
                                <img src="/duom01/size-view.webp" alt="Size View" />
                            </div>
                        </div>
                        <div className={clsx(styles.b_green, styles.module_bottom)}>
                            <p className={clsx(styles.ov_title)}>Compatible with Duo / DuoS Software Ecosystem</p>
                            <ol>
                                <li>
                                    <img src="/duom01/software1.webp" />
                                    <p>Builtroot</p>
                                </li>
                                <li>
                                    <img src="/duom01/software2.webp" />
                                    <p>Arduino IDE</p>
                                </li>
                                <li>
                                    <img src="/duom01/software3.webp" />
                                    <p>Peripherals</p>
                                </li>
                                <li>
                                    <img src="/duom01/software4.webp" />
                                    <p>Resources from Community</p>
                                </li>
                                <li>
                                    <img src="/duom01/software5.webp" />
                                    <p>Ubuntu</p>
                                </li>
                                <li>
                                    <img src="/duom01/software6.webp" />
                                    <p>Debian</p>
                                </li>
                                <li>
                                    <img src="/duom01/software7.webp" />
                                    <p>AliOS</p>
                                </li>
                                <li>
                                    <img src="/duom01/software8.webp" />
                                    <p>RT-Thread</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={styles.module2}>
                    <div className={clsx(styles.b_green)}>
                        <p className={clsx(styles.ov_title)}>Design Documentation  Open Source</p>
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
                        <p className={clsx(styles.ov_title)}>Easily design your own baseboards</p>
                        <div className={styles.line_design}>
                            <img src="/duom01/line-drawing.svg" alt="Line Drawing" />
                            <ul>
                                <li>Simple package design</li>
                                <li>Minimum of two layers of boards</li>
                                <li>Supports customized firmware (burning to eMMC)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.module3}>
                    <div className={clsx(styles.b_green, styles.take1)}>
                        <p className={clsx(styles.ov_title)}>Simple Production Process</p>
                        <p className={clsx(styles.ov_title_)}>Supports SMD to Baseboard</p>
                        <img src="/duom01/scene1.webp" alt="Supports SMD to Baseboard" />
                    </div>
                    <div className={clsx(styles.b_green, styles.take2)}>
                        <p className={clsx(styles.ov_title)}>Evaluation Boards Available</p>
                        <p className={clsx(styles.ov_title_)}>Open source Reference Design</p>
                        <img src="/duom01/right-view.webp" alt="Open source Reference Design" />
                    </div>
                    <div className={clsx(styles.b_green, styles.take3)}>
                        <p className={clsx(styles.ov_title)}>Complete Compliance Certification</p>
                        <img src="/duom01/certification.webp" alt="Complete Compliance Certification" />
                    </div>
                </div>
            </div>
        </ChipsView >
    )
}