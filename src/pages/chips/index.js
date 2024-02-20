import React from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css'


export default () => {
    return <Layout>
        <div className={styles.chips_center}>
            <div className={styles.tit_box}>
                <img src="/chips/chips-view.webp" alt="SG2002" />
                <h2>Buying RISC-V Chips from Milk-V</h2>
                <img src="/home/home-duo-view.webp" alt="Duo" />
            </div>
            <div className={styles.guarantee}>
                <ul>
                    <li>
                        <img src="/chips/fae.svg" alt="" />
                        <p>Professional FAE Support</p>
                    </li>
                    <li className={styles.center_lines}>
                        <img src="/chips/authenticity.svg" alt="" />
                        <p>Authenticity Guarantee</p>
                    </li>
                    <li>
                        <img src="/chips/supply.svg" alt="" />
                        <p>Large-scale Supply</p>
                    </li>
                </ul>
            </div>
            <div className={styles.product_list}>
                <h2>Products</h2>
                <ul>
                    <li>
                        <img src="/chips/cv1800b/cv1800b-frontview.webp" alt="CV1800B" />
                        <p>CV1800B</p>
                        <Link to='/chips/cv1800b'>Learn More</Link>
                    </li>
                    <li>
                        <img src="/chips/sg2000/sg2000-frontview.webp" alt="SG2000" />
                        <p>SG2000</p>
                        <Link to='/chips/sg2000'>Learn More</Link>
                    </li>
                    <li>
                        <img src="/chips/sg2002/sg2002-frontview.webp" alt="SG2002" />
                        <p>SG2002</p>
                        <Link to='/chips/sg2000'>Learn More</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.buy_samples}>
                <div className={styles.buy_cards}>
                    <h2>Buy Samples</h2>
                    <div className={styles.buy_card_item}>
                        <div>
                            <img src="/chips/taobao.svg" alt="淘宝" />
                            <p>淘宝</p>
                        </div>
                        <div>
                            <img src="/chips/arace.svg" alt="Arace" />
                            <p>Arace</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}
