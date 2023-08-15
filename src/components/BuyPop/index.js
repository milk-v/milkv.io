import React, { useEffect } from 'react';
import styles from './head.module.css'


export default function (props) {
    const { flag, module, type } = props

    useEffect(() => {
        if (flag) {
            document.documentElement.style.overflowY = 'hidden'
        } else {
            document.documentElement.style.overflowY = 'auto'
        }
    }, [flag])
    const toApp = () => {
        if (type === 'duo') {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')
        } else if (type === 'mars') {
            window.open('https://ewmmz.xet.tech/s/1As0hQ')
        } else if (type === 'pioneer') {
            window.open('https://www.crowdsupply.com/milkv/milk-v-pioneer')
        } else if (type === 'home') {
            window.open('https://app6hodqg6k9861.h5.xiaoeknow.com')
        }
    }
    return (
        <>
            <div className={styles.tanchuang} style={{ display: `${flag ? 'block' : 'none'}` }} >
                <img src='/pages/icon-close.svg' onClick={module} className={styles.close} />
                <img src='/pages/ICON.svg' className={styles.boxLogo} />
                {
                    type === 'home' ? <>
                        <div className={styles.goBuy} onClick={() => toApp()}>
                            <img src='/pages/china.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>China's mainland</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                        </div>
                        <div className={styles.goBuy} onClick={() => window.open('https://www.crowdsupply.com/milkv')}>
                            <img src='/pages/CrowdSupply_logo.png' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>Crowd Supply</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                        </div>
                    </> : type === 'pioneer' ? <>
                        <div className={styles.goBuy} onClick={() => toApp()}>
                            <img src='/pages/CrowdSupply_logo.png' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>Crowd Supply</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                        </div>
                    </> : type === 'duo' ? <>
                        <div className={styles.goBuy} onClick={() => toApp()}>
                            <img src='/pages/china.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>China's mainland</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                        </div>
                        <div className={styles.none}>
                            <img src='/pages/other.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>Other countries and regions</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                            <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                        </div>
                    </> : type === 'mars' ? <>
                        <div className={styles.goBuy} onClick={() => toApp()}>
                            <img src='/pages/china.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>China's mainland</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                                {/* <img src='/pages/COMINGSOON.svg' className={styles.coming} /> */}
                            </div>
                        </div>
                        <div className={styles.none}>
                            <img src='/pages/other.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>Other countries and regions</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                            <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                        </div>
                    </> : type === 'meles' ? <>
                        <div className={styles.none} >
                            <img src='/pages/china.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>China's mainland</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                                <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                            </div>
                        </div>
                        {/* <div className={styles.none}>
                            <img src='/pages/other.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>Other countries and regions</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                            </div>
                            <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                        </div> */}
                    </> : type === 'mars-cm' ?
                        <div className={styles.none} onClick={() => toApp()}>
                            <img src='/pages/china.svg' className={styles.buyIcon} />
                            <div className={styles.textBOx}>
                                <p className={styles.tp}>China's mainland</p>
                                <img src='/pages/icon_more-right.svg' className={styles.img1} />
                                <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                                <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                            </div>
                        </div> : null
                }

            </div>
        </>
    );
}