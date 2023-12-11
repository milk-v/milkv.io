import React, { useState } from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Footer from "@site/src/components/Footer"
import ContactBar from "@site/src/components/ContactBar"
// import MetaData from "@site/src/components/MetaData"
import SupportUs from "@site/src/components/SupportUs"
import styles from './index.module.css'
const jsonData = require('../../chipsData/chips.json');
export default (props) => {
    const { chipName } = props
    const [imgurl, setImgurl] = useState(0)

    return (
        <Layout>
            <div className={styles.chip_module}>
                <div className={styles.chip_title}>
                    <div className={styles.title_l_t}>
                        <h4>{jsonData[chipName].title}</h4>
                        <Link to={jsonData[chipName].buy_link}>Buy Now</Link>
                    </div>
                    <img src={jsonData[chipName].front_view} />
                </div>
            </div>
            <div className={styles.chip_module}>
                <div className={styles.chip_introduction}>
                    <div className={styles.chip_view}>
                        <img src={jsonData[chipName].chip_view[imgurl]} alt="" />
                        <div className={styles.view_ul}>
                            {
                                jsonData[chipName].chip_view.map((item, key) => {
                                    return <img src={item} key={key} onMouseEnter={(() => { setImgurl(key) })} />
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.chip_intro_t}>
                        {
                            jsonData[chipName].chip_intro_text.map((item, key) => {
                                return <p key={key}>{item}</p>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.chip_diagram}>
                <h2>- Chip Block Diagram</h2>
                <img src={jsonData[chipName].diagram_url} alt="" className={styles.diagram_img} />
                <h2>- Hardware</h2>
                <ul className={styles.hardware_ul}>
                    {
                        Object.keys(jsonData[chipName].hardware).map((item, key) => {
                            return <li key={key}>
                                <p className={styles.causality}>{item}</p>
                                <ul className={styles.causality_data}>
                                    {
                                        jsonData[chipName].hardware[item].map((ele, idx) => {
                                            return <li key={idx}>{ele}</li>
                                        })
                                    }
                                </ul>
                            </li>
                        })
                    }
                </ul>
                <h2>- Application Scenarios</h2>
                <ul className={styles.scenarios}>
                    {
                        jsonData[chipName].scenarios.map((item, key) => {
                            return <li key={key}>
                                <img src={item.img_link} alt="" />
                                <p>{item.scenarios_name}</p>
                            </li>
                        })
                    }
                </ul>
                <h2>- Documents</h2>
                <div className={styles.download_link}>
                    {
                        jsonData[chipName].downloads.map((item, key) => {
                            return <Link to={item.download_link} key={key}>
                                <img src="/chips/download.svg" />
                                <span className={styles.link_text}>{item.download_name}</span>
                            </Link>
                        })
                    }
                </div>
            </div>
            <ContactBar product='home' />
            <SupportUs />
            <Footer />
        </Layout>
    )
}