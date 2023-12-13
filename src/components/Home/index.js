import React from 'react';
import styles from './index.module.css';
import { useHistory } from '@docusaurus/router';

export default () => {
    const goto = useHistory()

    return (
        <>
            <div className={styles.bgBox}>
                <div className={styles._title}>
                    <h2>MilkV Documents</h2>
                </div>
                <ul className={styles.products_ul}>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push('/docs/duo/overview') }}>
                            <img src="/icons/mdhoem-duo.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🍐</p>
                            <div className={styles.pName} onClick={() => { goto.push('/docs/duo/overview') }}>
                                <h2>MilkV Duo</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push('/docs/pioneer/overview') }}>
                            <img src="/icons/mdhoem-mars.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>💪</p>
                            <div className={styles.pName} onClick={() => { goto.push('/docs/pioneer/overview') }}>
                                <h2>MilkV Pioneer</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future.</p>
                    </li>
                    <li>
                        <div className={styles.imageBox} onClick={() => { goto.push('/docs/mars/overview') }}>
                            <img src="/icons/mdhoem-pioneer.webp" />
                        </div>
                        <div className={styles.pNameBox}>
                            <p>🔥</p>
                            <div className={styles.pName} onClick={() => { goto.push('/docs/mars/overview') }}>
                                <h2>MilkV Mars</h2>
                                <img src="/icons/arrow-right-def.svg" className={styles.def} />
                                <img src="/icons/arrow-right.svg" className={styles.on} />
                            </div>
                        </div>
                        <p>Coming soon</p>
                    </li>
                </ul>
            </div>
        </>
    )
}