import React from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css'
import ContactUs from "../../components/ContactUs"
// import SupportUs from "../../components/SupportUs"


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
                        <img src="/chips/fae.svg" alt="Professional FAE Support" />
                        <p>Professional FAE Support</p>
                    </li>
                    <li className={styles.center_lines}>
                        <img src="/chips/authenticity.svg" alt="Authenticity Guarantee" />
                        <p>Authenticity Guarantee</p>
                    </li>
                    <li>
                        <img src="/chips/supply.svg" alt="Large-scale Supply" />
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
                        <Link to='/chips/sg2002'>Learn More</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.buy_samples}>
                <div className={styles.buy_cards}>
                    <h2>Buy Samples</h2>
                    <div className={styles.buy_card_item}>
                        <Link to='https://item.taobao.com/item.htm?id=748015537624&spm=a1z10.1-c.w4004-24811118368.6.763d224fh8cJmA'>
                            <img src="/chips/taobao.svg" alt="淘宝" />
                            <p>淘宝</p>
                        </Link>
                        <Link to='https://arace.tech/products/sophon-cv1800b-5pcs'>
                            <img src="/chips/arace.svg" alt="Arace" />
                            <p>Arace</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.choosing}>
                <h2>Why Choosing Us</h2>
                <ul>
                    <li>
                        <img src="/chips/authorized.webp" alt="Authorized" />
                        <h4>Official Authorized Distributor</h4>
                        <p>Shenzhen MilkV Technology Co., Ltd. is an official authorized chip distributor for SOPHGO, Cvitek , offering a diverse range of chip models and delivering competitive pricing as a primary distributor.</p>
                    </li>
                    <li>
                        <img src="/chips/custom.webp" alt="Custom" />
                        <h4>Custom Solutions Support</h4>
                        <p>We have mature PCBA solutions and extensive product design experience, offering customized solutions tailored to your unique needs.</p>
                    </li>
                    <li>
                        <img src="/chips/team.webp" alt="Team" />
                        <h4>Worry-Free After-sales Support</h4>
                        <p>Experienced engineering teams provide technical support: offering comprehensive solutions for your needs.</p>
                    </li>
                </ul>
            </div>
        </div>
        <ContactUs product='home' />
    </Layout>
}
