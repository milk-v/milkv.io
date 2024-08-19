import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/megrez/index.module.css';
import styles_j from '@site/src/pages/jupiter-nx/index.module.css';
import clsx from "clsx";
import Subscribe from "@site/src/components/Subscribe";

export default () => {
    return <Layout>
        <main className={styles.megreznx_main}>
            <div className={styles_s.pr_title}>
                <h1 className={styles_s.pr_name}>Milk-V Megrez NX</h1>
                <p className={styles_s.pr_info}>Comparable to NVIDIA Jetson Xavier NX</p>
            </div>
            <Subscribe product='megrez-nx' />
            <div className={styles_j.j_content}>
                <div className={styles_j.content_item}>
                    <p className={styles_j.feature_title}>Compatible with Jetson Xavier NX Baseboard
                    </p>
                    <img src="/megrez-nx/view1.webp" alt="Front View" />
                </div>
                <div className={styles_j.content_main}>
                    <div className={styles_j.items_left}>
                        <div >
                            <p className={clsx(styles_j.feature_title, styles.margin_size)}>Quad Core SiFive P550,
                                Built-in 19.95TOPS NPU
                            </p>
                        </div>
                        <div>
                            <p className={styles_j.feature_title}>SExtreme AI computing power
                            </p>
                            <p className={clsx(styles_j.feature_introduce, styles.black_text)}>
                                Built-in <span >19.95TOPS@INT8 NPU</span>
                            </p>
                        </div>
                        <div>
                            <p className={styles_j.feature_title}>Form Factor</p>
                            <p className={styles_j.feature_introduce}>
                                260-Pin SO-DIMM Connector
                                <br />
                                70mm*45mm
                            </p>
                            <img src="/megrez-nx/view3.webp" alt="Form Factor" className={clsx(styles_j.view6, styles.size_view)} />
                        </div>
                        <div>
                            <p className={styles_j.feature_title} >Video Decoding</p>
                            <p className={styles_j.feature_introduce} >
                                H.265 up to 8K@50fps or 32 channels of 1080P@30fps
                            </p>
                        </div>
                    </div>
                    <div className={styles_j.items_right}>
                        <div>
                            <p className={styles_j.feature_title}>
                                Built-in GPU
                            </p>
                            <p className={styles_j.feature_introduce}>
                                Support OpenGL ES 3.2, EGL 1.4, OpenCL 1.2
                                and 2.1 EP2 • Vulkan 1.2
                            </p>
                            <img src="/megrez-nx/view2.webp" alt="Built-in GPU" className={clsx(styles_j.view5, styles.megreznx_gpu)} />
                        </div>
                        <div>
                            <p className={styles_j.feature_title}>All in Megrez NX</p>
                            <p className={styles_j.feature_introduce}>
                                WIFI5/BT5 Onboard
                                <br />
                                eMMC Onboard
                            </p>
                            <img src="/jupiter-nx/view3.webp" alt="All in Megrez NX" className={clsx(styles_j.view3, styles.onboard)} />
                        </div>
                        <div>
                            <p className={styles_j.feature_title}>Video Encoding
                            </p>
                            <p className={styles_j.feature_introduce}>Up to 8K@25fps or 13 channels of 1080P@30fps
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Layout>
}