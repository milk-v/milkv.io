import React, { useState, useRef, useEffect } from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Footer from "@site/src/components/Footer"
// import ContactBar from "@site/src/components/ContactBar"
// import MetaData from "@site/src/components/MetaData"
import SupportUs from "@site/src/components/SupportUs"
import styles from './index.module.css'
const jsonData = require('../../chipsData/chips.json');


export default (props) => {
    const { chipName } = props
    const [imgurl, setImgurl] = useState(0)
    const magnifiers = useRef(null)
    const magnifiers_box = useRef(null)
    const tRef = useRef(null)
    const chip_over = useRef(null)
    const chip_diagram = useRef(null)
    const chip_hardware = useRef(null)
    const chip_applications = useRef(null)
    const chip_doc = useRef(null)
    const chip_resources = useRef(null)
    const [tidx, setTidx] = useState(0)


    const [scrollDirection, setScrollDirection] = useState();
    const [dis, setDis] = useState(false)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [down_filter, setDown_filter] = useState(Object.keys(jsonData[chipName].downloads))
    const [down_filter_idx, setDown_filter_idx] = useState(0)

    const [resources_filter, setResources_filter] = useState(Object.keys(jsonData[chipName].resources))
    const [resources_filter_idx, setResources_filter_idx] = useState(0)


    const t_modern_sty = {
        borderBottom: "2px solid #2D88C9",
        color: "#000",
        fontWeight: 600,
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const prevScrollTop = window.previousScrollTop || scrollTop;

            if (scrollTop > prevScrollTop) {
                setScrollDirection(false);
            } else if (scrollTop < prevScrollTop) {
                setScrollDirection(true);
            }
            if (scrollTop === 0) {
                setScrollDirection(false);
            }

            let over_toTop = chip_over.current.offsetTop + chip_over.current.clientHeight - 100
            let diagram_toTop = chip_diagram.current.offsetTop + chip_diagram.current.clientHeight - 100
            let hardware_toTop = chip_hardware.current.offsetTop + chip_hardware.current.clientHeight - 100
            let applications_toTop = chip_applications.current.offsetTop + chip_applications.current.clientHeight - 100
            let doc_toTop = chip_doc.current.offsetTop + chip_doc.current.clientHeight - 100
            let resources_toTop = chip_resources.current.offsetTop + chip_resources.current.clientHeight - 100
            if (scrollTop >= 0 && scrollTop < over_toTop) {
                setTidx(0)
            } else if (scrollTop >= over_toTop && scrollTop <= diagram_toTop) {
                setTidx(1)
            } else if (scrollTop >= diagram_toTop && scrollTop <= hardware_toTop) {
                setTidx(2)
            } else if (scrollTop >= hardware_toTop && scrollTop <= applications_toTop) {
                setTidx(3)
            } else if (scrollTop >= applications_toTop && scrollTop <= doc_toTop) {
                setTidx(4)
            } else if (scrollTop >= doc_toTop && scrollTop <= resources_toTop) {
                setTidx(5)
            }
            window.previousScrollTop = scrollTop;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const tab_arr = [
        {
            text: 'Overview',
            ref: chip_over,
        },
        {
            text: 'Block Diagram',
            ref: chip_diagram,
        },
        {
            text: 'Hardware',
            ref: chip_hardware,
        },
        {
            text: 'Applications',
            ref: chip_applications,
        },
        {
            text: 'Documents',
            ref: chip_doc,
        },
        {
            text: 'Design Resources',
            ref: chip_resources,
        },
    ]


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
            <div className={styles.table_separate}>
                <ul className={styles.table_u} ref={tRef}>
                    {
                        tab_arr.map((item, key) => {
                            return <li key={key} style={key === tidx ? t_modern_sty : null}
                                onClick={() => {
                                    let navHeight = document.querySelector('.navbar').clientHeight
                                    let t_height = tRef.current.clientHeight
                                    let over_height = item.ref.current.offsetTop
                                    window.scrollTo({ top: over_height - t_height - navHeight, behavior: 'instant' })
                                    setTidx(key)
                                }}
                            >
                                {item.text}
                            </li>
                        })
                    }

                </ul>
            </div>
            <div className={styles.chip_module} ref={chip_over}>
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
                                        setX(magnifiers_box.current.clientHeight / 2 - 2)
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
                <div ref={chip_diagram}>
                    <h2>Block Diagram</h2>
                    <img src={jsonData[chipName].diagram_url} alt="" className={styles.diagram_img} />
                </div>
                <div ref={chip_hardware} className={styles.headModule}>
                    <h2 >Hardware</h2>
                    <ul className={styles.hardware_ul}>
                        {
                            Object.keys(jsonData[chipName].hardware).map((item, key) => {
                                return <li key={key}>
                                    <p className={styles.causality}>{item}</p>
                                    <ul className={styles.causality_data}>
                                        {
                                            jsonData[chipName].hardware[item].map((ele, idx) => {
                                                return <li key={idx} style={{ color: "#333" }}>{ele}</li>
                                            })
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div ref={chip_applications}>
                    <h2>Applications </h2>
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
                </div>
                <div ref={chip_doc}>
                    <h2 >Documents</h2>
                    <div className={styles.download_link}>
                        <div className={styles.radio_input}>
                            <p>FILTER BY</p>
                            {
                                down_filter.map((item, key) => {
                                    return (
                                        <label key={key} >
                                            <input type="radio" name="prerequisite" value={item} checked={key === down_filter_idx}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setDown_filter_idx(key)
                                                    }
                                                }}
                                            />
                                            <span>{item}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.download_list}>
                            <p>{down_filter[down_filter_idx]}</p>
                            <ul>
                                {
                                    jsonData[chipName].downloads[down_filter[down_filter_idx]].map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <Link to={item.download_url}>{item.download_name}</Link>
                                                <p><span>{item.file_format}</span> <span>J{item.file_date}</span> <span>{item.file_size}</span></p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div ref={chip_resources} className={styles.resources_m}>
                    <h2 >Design Resources</h2>
                    <div className={styles.download_link}>
                        <div className={styles.radio_input}>
                            <p>FILTER BY</p>
                            {
                                resources_filter.map((item, key) => {
                                    return (
                                        <label key={key}>
                                            <input type="radio" name="Resources" value={item} checked={key === resources_filter_idx}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setResources_filter_idx(key)
                                                    }
                                                }} />
                                            <span>{item}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.download_list}>
                            <p>{resources_filter[resources_filter_idx]}</p>
                            {
                                jsonData[chipName].resources[resources_filter[resources_filter_idx]].map((item, key) => {
                                    return (
                                        <div className={styles.board_info} key={key}>
                                            <img src={item.resources_img} />
                                            <div>
                                                <Link to={item.resources_url} className={styles.info_t}>{item.resources_name}</Link>
                                                <p className={styles.info_p}>{item.resources_info}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.certificate}>
                    <div>
                        <h2>Agency Certificate</h2>
                        <div className={styles.a_context}>
                            <img src="/chips/alleged-victim.webp" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.p_intro}>
                <ul>
                    <li>
                        <img src="/chips/promise1.svg" />
                        <h4>Original Authentic</h4>
                        <p>Factory Authorized Agent</p>
                    </li>
                    <li>
                        <img src="/chips/promise2.svg" />
                        <h4>Available for Immediate Dispatch</h4>
                        <p>Ships within 4 Hours</p>
                    </li>
                    <li>
                        <img src="/chips/promise3.svg" />
                        <h4>Competitive Pricing</h4>
                        <p>First-tier Agent Rates</p>
                    </li>
                    <li>
                        <img src="/chips/promise4.svg" />
                        <h4>Solution Design</h4>
                        <p>All-in-One Chip Solution Design</p>
                    </li>
                    <li>
                        <img src="/chips/promise5.svg" />
                        <h4>Abundant Resources</h4>
                        <p>Extensive Chip Design Resources</p>
                    </li>
                </ul>
            </div>
            <div className={styles.toTop} style={{ display: `${scrollDirection ? 'block' : 'none'}` }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
                <img src="/chips/backtop.svg" />
            </div>
            <SupportUs />
            <Footer />
        </Layout>
    )
}