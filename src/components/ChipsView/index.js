import React, { useState, useRef, useEffect } from "react";
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
// import ContactBar from "@site/src/components/ContactBar"
// import MetaData from "@site/src/components/MetaData"
import SupportUs from "@site/src/components/SupportUs"
import styles from './index.module.css'
// import { useLocation } from "@docusaurus/router";
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
const jsonData = require('../../jsonFiles/chips.json');
import BuyPop from "../BuyPop"

export default (props) => {
    const { chipName, children } = props
    const currentLanguage = useBaseUrl('/');
    const curren_language = currentLanguage === '/zh/' ? 'resources_zh' : 'resources'
    const title_language = currentLanguage === '/zh/' ? 'title_zh' : 'title'
    const intro_language = currentLanguage === '/zh/' ? 'chip_intro_text_zh' : 'chip_intro_text'
    const scenarios_language = currentLanguage === '/zh/' ? 'scenarios_name_zh' : 'scenarios_name'
    const downloads_language = currentLanguage === '/zh/' ? 'downloads_zh' : 'downloads'

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
    const chip_agency = useRef(null)

    const [tidx, setTidx] = useState(0)
    const [scrollDirection, setScrollDirection] = useState();
    const [dis, setDis] = useState(false)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const down_filter = Object.keys(jsonData[chipName][downloads_language])
    const [down_filter_idx, setDown_filter_idx] = useState(0)
    const resources_filter = Object.keys(jsonData[chipName][curren_language])
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
            let agency_toTop = chip_agency.current.offsetTop + chip_agency.current.clientHeight - 100
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
            } else if (scrollTop >= resources_toTop && scrollTop <= agency_toTop) {
                setTidx(6)
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
            text: <Translate id='overview' />,
            ref: chip_over,
        },
        {
            text: <Translate id='BlockDiagram' />,
            ref: chip_diagram,
        },
        {
            text: <Translate id='duo.info.text.Hardware' />,
            ref: chip_hardware,
        },
        {
            text: <Translate id='Applications' />,
            ref: chip_applications,
        },
        {
            text: <Translate id='Documents' />,
            ref: chip_doc,
        },
        {
            text: <Translate id='DesignResources' />,
            ref: chip_resources,
        },
        {
            text: <Translate id='ChoosingUs' />,
            ref: chip_agency,
        }
    ]

    return (
        <Layout>
            <div className={styles.tabs_hied}>
                <div className={styles.tab_card}>
                    <Link to='/'>Home</Link><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.78811 17.7955L14.9131 5.45467C15.0381 5.23816 15.2089 5.19241 15.4254 5.31741L16.0749 5.69241C16.2914 5.81741 16.3372 5.98816 16.2122 6.20467L9.08715 18.5455C8.96215 18.762 8.7914 18.8078 8.57489 18.6828L7.92537 18.3078C7.70886 18.1828 7.66311 18.012 7.78811 17.7955Z" fill="#999999" />
                    </svg><Link to='/chips' style={{ display: `${children ? 'none' : 'block'}` }}>Chips</Link>
                    <svg style={{ display: `${children ? 'none' : 'block'}` }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.78811 17.7955L14.9131 5.45467C15.0381 5.23816 15.2089 5.19241 15.4254 5.31741L16.0749 5.69241C16.2914 5.81741 16.3372 5.98816 16.2122 6.20467L9.08715 18.5455C8.96215 18.762 8.7914 18.8078 8.57489 18.6828L7.92537 18.3078C7.70886 18.1828 7.66311 18.012 7.78811 17.7955Z" fill="#999999" />
                    </svg>
                    <span><Link>{chipName.toUpperCase()}</Link></span>
                </div>
            </div>
            <div className={styles.chip_module}>
                <div className={styles.chip_title}>
                    <div className={styles.title_l_t}>
                        <h4>{jsonData[chipName][title_language]}</h4>
                        <Link style={{ cursor: 'pointer' }} to="#buy"><Translate id="homepage.corporations.duobuynow" /></Link>
                    </div>
                    <img src={jsonData[chipName].front_view} alt="Front View" />
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
                                    alt="Chip Views"
                                    src={jsonData[chipName].chip_view[imgurl]} />
                            </div>
                            <img src={jsonData[chipName].chip_view[imgurl]} alt="Chip Views" />
                        </div>
                        {/* <div className={styles.view_ul}>
                            {
                                jsonData[chipName].chip_view.map((item, key) => {
                                    return <img src={item} key={key} onMouseEnter={(() => { setImgurl(key) })} onClick={(() => { setImgurl(key) })} />
                                })
                            }
                        </div> */}
                    </div>
                    <div className={styles.chip_intro_t}>
                        {
                            jsonData[chipName][intro_language].map((item, key) => {
                                return <p key={key}>{item}</p>
                            })
                        }
                    </div>
                </div>
                <>{children}</>

            </div>
            <div className={styles.chip_diagram}>
                <div ref={chip_diagram}>
                    <h2><Translate id='BlockDiagram' /></h2>
                    <img src={jsonData[chipName].diagram_url} alt="Block Diagram" className={styles.diagram_img} />
                </div>
                <div ref={chip_hardware} className={styles.headModule}>
                    <h2 ><Translate id='duo.info.text.Hardware' /></h2>
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
                    <h2> <Translate id='Applications' /></h2>
                    <ul className={styles.scenarios}>
                        {
                            jsonData[chipName].scenarios.map((item, key) => {
                                return <li key={key}>
                                    <img src={item.img_link} alt="Applications" />
                                    <p>{item[scenarios_language]}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div ref={chip_doc} >
                    <h2 ><Translate id='Documents' /></h2>
                    <div className={styles.download_link}>
                        <div className={styles.radio_input}>
                            <p><Translate id="SelectionMethod" /></p>
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
                                    jsonData[chipName][downloads_language][down_filter[down_filter_idx]].map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <Link to={item.download_url}>{item.download_name}</Link>
                                                <p><span>{item.file_format}</span> <span>{item.file_date}</span> <span>{item.file_size}</span></p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div ref={chip_resources} className={styles.resources_m}>
                    <h2><Translate id='DesignResources' /></h2>
                    <div className={styles.download_link}>
                        <div className={styles.radio_input}>
                            <p><Translate id="SelectionMethod" /></p>
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
                                jsonData[chipName][curren_language][resources_filter[resources_filter_idx]].map((item, key) => {
                                    return (
                                        <div className={styles.board_info} key={key}>
                                            <img src={item.resources_img} alt="resources" />
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
                <div className={styles.certificate} ref={chip_agency}>
                    <h2><Translate id='ChoosingUs' /></h2>
                    <div>
                        <div className={styles.choosing_item}>
                            <img src="/chips/authorized.webp" alt="authorized" />
                            <div className={styles.text_l}>
                                <h3><Translate id='ChoosingUs.item1.title' /></h3>
                                <p><Translate id='ChoosingUs.item1.info' /></p>
                            </div>
                        </div>
                        <div className={styles.choosing_item}>
                            <img src="/chips/custom.webp" alt="design" />
                            <div className={styles.text_l}>
                                <h3>Custom Solutions Support</h3>
                                <p>We have mature PCBA solutions and extensive product design experience, offering customized solutions tailored to your unique needs.</p>
                            </div>
                        </div>
                        <div className={styles.choosing_item}>
                            <img src="/chips/team.webp" alt="team" />
                            <div className={styles.text_l}>
                                <h3><Translate id='ChoosingUs.item3.title' /></h3>
                                <p><Translate id='ChoosingUs.item3.info' /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.toTop} style={{ display: `${scrollDirection ? 'block' : 'none'}` }} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
                <img src="/chips/backtop.svg" alt="TOP" />
            </div>
            <BuyPop type={chipName} />
            <SupportUs />
        </Layout>
    )
}
