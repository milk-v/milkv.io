import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/megrez/index.module.css';
import Subscribe from "@site/src/components/Subscribe";

export default () => {
    return <Layout>
        <main className={styles.ruyibook_main}>
            <div className={styles_s.pr_title}>
                <h1 className={styles_s.pr_name} style={{ color: '#000' }}>RuyiBook</h1>
                <p className={styles_s.pr_info} style={{ color: '#000' }}>The world's first laptop powered by a Xiangshan Nanhu RISC-V processor
                </p>
            </div>
            <Subscribe product='ruyibook' theme='black' />
            <div className={styles.view_mian}>
                <img src="/ruyibook/ruyibook-view1.webp" alt="Front View" />
                <div>
                    <img src="/ruyibook/ruyibook-view2.webp" alt="XiangShan" />
                    <img src="/ruyibook/ruyibook-view3.webp" alt="中国科学院软件研究所 X 英麒智能 X Milk-V" />
                </div>
            </div>
            <ol className={styles.hardware_ol}>
                <li>
                    <p>CPU
                    </p>
                    <p>“XiangShan Nanhu”(RV64GCBK),up to 2.5GHz
                    </p>
                </li>
                <li>
                    <p>Memory
                    </p>
                    <p>8GB DDR5 4800MT/s
                    </p>
                </li>
                <li>
                    <p>GPU
                    </p>
                    <p>AMD RX 550</p>
                </li>
                <li>
                    <p>USB</p>
                    <p>2x USB3</p>
                </li>
                <li>
                    <p>Ethernet
                    </p>
                    <p>2x 2.5Gbps Ethernet Port</p>
                </li>
                <li>
                    <p>Display
                    </p>
                    <p>
                        1x 14-inch LCD Display
                        <br />
                        1x HDMI, up to 4K
                    </p>
                </li>
                <li>
                    <p>TouchPad
                    </p>
                    <p>Support 9 kinds of gesture operation</p>
                </li>
                <li>
                    <p>Audio
                    </p>
                    <p>Built-in high-quality speakers.
                    </p>
                </li>
                <li>
                    <p>Dimensions
                    </p>
                    <p>315*233*25mm</p>
                </li>
            </ol>
        </main>
    </Layout>
}