import React, { useEffect } from 'react';
import styles from './head.module.css'


export default (props) => {
    const { flag, module, type } = props

    // chinan_url小鹅通
    // other_url 众筹
    // crowdSupply_url "Crowd Supply"商店
    // arace_url Arace 商店
    const buy_info = {
        'home': {
            chinan_url: 'https://app6hodqg6k9861.h5.xiaoeknow.com',
            crowdSupply_url: 'https://www.crowdsupply.com/milkv',
            arace_url: 'https://arace.tech/collections/milk-v',
        },
        'duo': {
            chinan_url: 'https://app6hodqg6k9861.h5.xiaoeknow.com',
            arace_url: 'https://arace.tech/collections/milk-v-duo',
            taobao_url: 'https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-24811212567.2.1f7913b5Y8K002&id=707976817589',
        },
        'pioneer': {
            crowdSupply_url: 'https://www.crowdsupply.com/milkv/milk-v-pioneer',
            arace_url: 'https://arace.tech/collections/milk-v-pioneer',
        },
        'mars': {
            chinan_url: 'https://ewmmz.xet.tech/s/1As0hQ',
            arace_url: 'https://arace.tech/products/milk-v-mars',
            // 
        },
        'mars-cm': {
            chinan_url: 'https://ewmmz.xet.tech/s/4qfvPb',
            arace_url: 'https://arace.tech/products/milk-v-mars-cm',
        },
        'meles': {
            chinan_url: '',
            arace_url: 'https://arace.tech/products/milk-v-meles',
        },
        'vega': {
            chinan_url: '',
            arace_url: '',
        },
    }

    const buyElement = Object.keys(buy_info[type]).map((item, index) => {
        const image_data = {
            'chinan_url': '/components/china.svg',
            'crowdSupply_url': '/components/CrowdSupply_logo.png',
            'other_url': '/components/other.svg',
            'arace_url': '/icons/arace.svg',
            'taobao_url': '/components/taobao.svg',
        }
        const text_data = {
            'chinan_url': "小鹅通",
            'crowdSupply_url': 'Crowd Supply',
            'other_url': 'Other countries and regions',
            'arace_url': 'Arace Tech',
            'taobao_url': '淘宝',
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
                    <img src='/components/icon_more-right.svg' className={styles.img1} />
                    <img src='/components/icon_more-right_white.svg' className={styles.img2} />
                    {
                        buy_info[type][item] ? null : <img src='/components/COMINGSOON.svg' className={styles.coming} />
                    }
                </div>
            </a>
        )
    })


    return (
        <>
            <div className={styles.maskBuy} style={{ display: `${flag ? 'block' : 'none'}` }}>
                <div className={styles.tanchuang} >
                    <img src='/components/icon-close.svg' onClick={module} className={styles.close} />
                    <img src='/components/ICON.svg' className={styles.boxLogo} />
                    {
                        buyElement
                    }
                </div>
            </div>
        </>
    );
}