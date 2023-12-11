import React, { useState, useRef } from "react";
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
    const magnifiers = useRef(null)
    const magnifiers_box = useRef(null)


    const [dis, setDis] = useState(false)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

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
            <div className={styles.table}>



            </div>
            <div className={styles.chip_module}>
                <div className={styles.chip_introduction}>
                    <div className={styles.chip_view}>
                        <div className={styles.chip_view_contexts} ref={magnifiers_box}
                            onMouseMove={(e) => {
                                let refWindth = e.clientX
                                let refHeight = e.clientY

                                let margin_left = magnifiers_box.current.getBoundingClientRect().left
                                let margin_top = magnifiers_box.current.getBoundingClientRect().top
                                let magnifiers_width = magnifiers.current.offsetWidth
                                let magnifiers_height = magnifiers.current.clientHeight
                                setDis(true)
                                const left = parseInt(refWindth - margin_left - (magnifiers_width / 2))
                                const top = parseInt(refHeight - margin_top - (magnifiers_height / 2))

                                setY(left);
                                setX(top);
                                if (refWindth - margin_left >= 0 && refHeight - margin_top >= 0) {
                                    if (left <= 0) {
                                        setY(0)
                                    }
                                    if (left + magnifiers_width >= magnifiers_box.current.offsetWidth) {
                                        setY(magnifiers_box.current.offsetWidth - magnifiers_width)
                                    }
                                    if (top + magnifiers_height >= magnifiers_box.current.offsetHeight) {
                                        console.log(magnifiers_box.current.clientHeight - magnifiers_height);
                                        setX(magnifiers_box.current.clientHeight - magnifiers_height)
                                    }
                                    if (top <= 0) {
                                        setX(0)
                                    }
                                }
                            }}
                            onMouseLeave={() => {
                                setDis(false)
                            }}
                        >
                            <div ref={magnifiers} className={styles.magnifiers} style={{
                                display: `${dis ? 'block' : 'none'}`,
                                top: `${x}px`,
                                left: `${y}px`,
                                transition: 'none',
                            }}></div>
                            <div className={styles.magnifiers_view}
                                style={{
                                    display: `${dis ? 'block' : 'none'}`,
                                }}
                            >
                                <img
                                    style={{
                                        display: `${dis ? 'block' : 'none'}`,
                                        top: `${x * -3}px`,
                                        left: `${y * -3}px`,
                                    }}
                                    src={jsonData[chipName].chip_view[imgurl]} />
                            </div>
                            <img src={jsonData[chipName].chip_view[imgurl]} alt="" />
                        </div>
                        <div className={styles.view_ul}>
                            {
                                jsonData[chipName].chip_view.map((item, key) => {
                                    return <img src={item} key={key} onMouseEnter={(() => { setImgurl(key) })} onClick={(() => { setImgurl(key) })} />
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
            {/* <ContactBar product='home' /> */}
            <SupportUs />
            <Footer />
        </Layout>
    )
}