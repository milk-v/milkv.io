import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/megrez/index.module.css';
import Subscribe from "@site/src/components/Subscribe";

export default () => {
    return <Layout>
        <main className={styles.j_main}>
            <div className={styles_s.pr_title}>
                <h1 className={styles_s.pr_name} style={{ color: '#000' }}>Milk-V Jupiter NX</h1>
                <p className={styles_s.pr_info} style={{ color: '#000' }}>Replace your Jetson NANO</p>
            </div>
            <div className={styles.j_content}>
                <Subscribe product='jupiter-nx' theme='black' />
                <div className={styles.content_item}>
                    <p className={styles.feature_title}>Compatible with Jetson NANO<br /> Baseboard
                    </p>
                    <img src="/jupiter-nx/view1.webp" alt="Front View" />
                </div>
                <div className={styles.content_main}>
                    <div className={styles.items_left}>
                        <div>
                            <p className={styles.feature_title}>Powerful multimedia</p>
                            <p className={styles.feature_introduce}>Support OpenCL3.0, OpenGLES 1.1/3.2, Vulkan1.3 Support 4K H.265/H.264/VP9/VP8
                            </p>
                            <img src="/jupiter-nx/view2.webp" alt="Powerful multimedia" className={styles.view2} />
                        </div>
                        <div>
                            <p className={styles.feature_title}>Supports triple camera input single camera up to 16MP</p>
                            <p className={styles.feature_introduce}>
                                1x MIPI CSI 4-lane
                                <br />
                                2x MIPI CSI 2-lane
                            </p>
                            <img src="/jupiter-nx/view4.webp" alt="View" className={styles.view4} />
                        </div>
                        <div style={{ paddingBottom: "0" }}>
                            <p className={styles.feature_title}>PCIe Gen2</p>
                            <p className={styles.feature_introduce}>1x 2-lane  +  1x 1-lane
                            </p>
                            <img src="/jupiter-nx/view6.webp" alt="PCIe Gen2" className={styles.view6} />
                        </div>
                        <div className={styles.feature_cpu}>
                            <p className={styles.feature_title} style={{ color: '#fff' }}>Spacemit K1/M1  8-core RISC-V AI CPU</p>
                            <p className={styles.feature_introduce} style={{ color: '#fff' }}>
                                50KDMIPS CPU Power
                                <br />
                                2 TOPS AI Computing power</p>
                        </div>
                    </div>
                    <div className={styles.items_right}>
                        <div>
                            <p className={styles.feature_title}>All in Jupiter NX</p>
                            <p className={styles.feature_introduce}>
                                WIFI5/BT5 Onboard
                                <br />
                                eMMC Onboard
                            </p>
                            <img src="/jupiter-nx/view3.webp" alt="All in Jupiter NX" className={styles.view3} />
                        </div>
                        <div className={styles.video}>
                            <p className={styles.feature_title}>
                                Supports dual-screen output, up to 1920x1440@60FPS
                            </p>
                            <p className={styles.feature_introduce}>
                                1x MIPI DSI 4-lane
                                <br />
                                1x HDMI
                            </p>
                            <img src="/jupiter-nx/view5.webp" alt="1920x1440@60FPS" className={styles.view5} />
                        </div>
                        <div>
                            <img src="/jupiter-nx/2tops.svg" className={styles.tops} />
                            <p className={styles.feature_title} style={{ whiteSpace: 'nowrap' }}>general AI compute power</p>
                            <p className={styles.feature_introduce}>Supports all AI models
                            </p>
                        </div>
                        <div className={styles.feature_view7}>
                            <p className={styles.feature_title}>RVV1.0 & RVA22</p>
                        </div>
                        <div className={styles.feature_view9}>
                            <p className={styles.feature_title}>Meets industrial-grade standards</p>
                            <p className={styles.feature_introduce}>Stable and reliable operation in temperatures from -40°C to 85°C</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ai}>
                    <p>
                        Half the price,
                        <br />
                        4 times the AI performance
                    </p>
                    <img src="/jupiter-nx/chart.webp" alt="Half the price, 4 times the AI performance" />
                </div>
            </div>
        </main>
    </Layout>
}