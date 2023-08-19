import React, { useEffect } from 'react';
import styles from './head.module.css'


export default (props) => {
    const { flag, module, type } = props

    useEffect(() => {
        if (flag) {
            document.documentElement.style.overflowY = 'hidden'
        } else {
            document.documentElement.style.overflowY = 'auto'
        }
    }, [flag])

    // chinan_url小鹅通
    // other_url 众筹
    // crowdSupply_url "Crowd Supply"商店
    // arace_url Arace 商店
    const buy_info = {
        'home': {
            chinan_url: 'https://app6hodqg6k9861.h5.xiaoeknow.com',
            crowdSupply_url: 'https://www.crowdsupply.com/milkv',
            arace_url: '',
            // https://arace.tech/collections/milk-v
        },
        'duo': {
            chinan_url: 'https://app6hodqg6k9861.h5.xiaoeknow.com',
            arace_url: '',
            // https://arace.tech/collections/milk-v-duo
        },
        'pioneer': {
            crowdSupply_url: 'https://www.crowdsupply.com/milkv/milk-v-pioneer',
            arace_url: '',
            // https://arace.tech/collections/milk-v-pioneer
        },
        'mars': {
            chinan_url: 'https://ewmmz.xet.tech/s/1As0hQ',
            arace_url: '',
            // https://arace.tech/products/milk-v-mars
        },
        'mars-cm': {
            chinan_url: 'https://ewmmz.xet.tech/s/4qfvPb',
            arace_url: '',
            // https://arace.tech/products/milk-v-mars-cm
        },
        'meles': {
            chinan_url: '',
            arace_url: '',
            // https://arace.tech/products/milk-v-meles
        },
        'vega': {
            chinan_url: '',
            arace_url: '',
        },
    }

    const buyElement = Object.keys(buy_info[type]).map((item, index) => {
        const image_data = {
            'chinan_url': '/pages/china.svg',
            'crowdSupply_url': '/pages/CrowdSupply_logo.png',
            'other_url': '/pages/other.svg',
            'arace_url': '/icons/arace.svg',

        }
        const text_data = {
            'chinan_url': "小鹅通",
            'crowdSupply_url': 'Crowd Supply',
            'other_url': 'Other countries and regions',
            'arace_url': 'Arace Tech',
        }
        return (
            <a
                href={buy_info[type][item] ? buy_info[type][item] : null} className={buy_info[type][item] ? styles.goBuy : styles.none}
                target='_blank'
                key={index}
            >
                <img src={image_data[item]} className={styles.buyIcon} />
                <div className={styles.textBOx}>
                    <p className={styles.tp}>{text_data[item]}</p>
                    <img src='/pages/icon_more-right.svg' className={styles.img1} />
                    <img src='/pages/icon_more-right_white.svg' className={styles.img2} />
                    {
                        buy_info[type][item] ? null : <img src='/pages/COMINGSOON.svg' className={styles.coming} />
                    }
                </div>
            </a>
        )
    })


    return (
        <>
            <div className={styles.tanchuang} style={{ display: `${flag ? 'block' : 'none'}` }} >
                <img src='/pages/icon-close.svg' onClick={module} className={styles.close} />
                <img src='/pages/ICON.svg' className={styles.boxLogo} />
                {
                    buyElement
                }
            </div>
        </>
    );
}