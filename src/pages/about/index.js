import React, { useRef, useEffect } from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css'
import Translate from '@docusaurus/Translate';

import Footer from "../../components/Footer"
import MetaData from "../../components/MetaData"

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const AboutUs = () => {
    const lineRef = useRef(null)

    useEffect(() => {
        gsap.to(lineRef.current, {
            width: '100%', duration: .5, scrollTrigger: {
                trigger: lineRef.current,
                start: "bottom bottom",
                end: "top bottom",
                markers: false,
                scrub: true,
            },
        });
    }, [])


    return (
        <>
            <div className={styles.about_contexts}>
                <div className={styles.about_map}>
                    <h2>Why Choose RISC-V ?</h2>
                    <div className={styles.present}>
                        <p className={styles.left_text}>
                            Milk-V is committed to providing high quality RISC-V products to developers, enterprises and consumers, and to promoting the development of the RISC-V hardware and software ecosystem. Milk-V will firmly support open source, and hopes that through its own efforts and those of the community, future RISC-V products will be as numerous and bright as the stars in the Milky Way.
                        </p>
                        <ul className={styles.specificities}>
                            <li>
                                <img src="/about/427320092.svg" />
                                <h2>Low Power</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-1.svg" />
                                <h2>Low Cost</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-2.svg" />
                                <h2>Open Standard</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-3.svg" />
                                <h2>Modularizable</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-4.svg" />
                                <h2>Simple</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-5.svg" />
                                <h2>Small Area</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-6.svg" />
                                <h2>Fast</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>
                            <li>
                                <img src="/about/427320092-7.svg" />
                                <h2>High Performance</h2>
                                <p>wn efforts and those of the community, future RISC-V products will be as numerous and bright as the </p>
                            </li>

                        </ul>
                    </div>
                </div>


                <div className={styles.embrace}>
                    <p>Let's </p>
                    <h2>Embrace the New Era with Milk-V,</h2>
                    <h2>Make RISC-V Better Together.
                        <span className={styles.btm_line} ref={lineRef} ></span>
                    </h2>
                </div>
            </div>
        </>
    )
}








export default () => {
    return (
        <>
            <Layout>
                <MetaData page='vega' />
                <AboutUs />
                <Footer />
            </Layout>
        </>
    )
}