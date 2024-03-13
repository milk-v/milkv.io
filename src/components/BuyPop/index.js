import React from 'react';
import styles from './head.module.css'
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

export default (props) => {
    const { type } = props
    const goto = useHistory()

    // chinan_url小鹅通
    // other_url 众筹
    // crowdSupply_url "Crowd Supply"商店
    // arace_url Arace 商店
    const buy_info = {
        'home': {
            crowdSupply_url: 'https://www.crowdsupply.com/milkv',
            arace_url: 'https://arace.tech/collections/milk-v',
        },
        'duo': {
            arace_url: 'https://arace.tech/collections/milk-v-duo',
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=707976817589&sku_properties=1627207:3750323',
            banli_url: 'https://spotpear.cn/category/Milk-V.html',
            chilli_url: 'https://shop.plati.ma/collections/all?filter.p.vendor=Milk-V'
        },
        'duo-s': {
            arace_url: 'https://arace.tech/products/milkv-duo-s',
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=770462822819&sku_properties=5919063:6536025',
            banli_url: 'https://spotpear.cn/category/Milk-V.html',
            chilli_url: 'https://shop.plati.ma/products/milk-v-duo-s-512m-1ghz-dual-core-risc-v-arm-sbc?_pos=4&_fid=86ada3723&_ss=c'
        },
        'pioneer': {
            crowdSupply_url: 'https://www.crowdsupply.com/milkv/milk-v-pioneer',
            arace_url: 'https://arace.tech/collections/milk-v-pioneer',
            mouser_url: 'https://www.mouser.com/c/embedded-solutions/computing/?m=Milk-V'
        },
        'mars': {
            arace_url: 'https://arace.tech/products/milk-v-mars',
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=756713087930'
        },
        'mars-cm': {
            arace_url: 'https://arace.tech/products/milk-v-mars-cm',
        },
        'meles': {
            // arace_url: 'https://arace.tech/products/milk-v-meles',
        },
        'vega': {
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=764856801789&skuId=5260392404476',
            arace_url: 'https://arace.tech/products/milk-v-vega',
        },
        'cv1800b': {
            taobao_url: 'https://item.taobao.com/item.htm?id=748015537624&skuId=5330447539309&spm=a1z10.1-c.w4004-24811118368.6.763d224fh8cJmA',
            arace_url: 'https://arace.tech/products/sophon-cv1800b-5pcs',
        },
        'sg2000': {
            taobao_url: 'https://item.taobao.com/item.htm?id=748015537624&skuId=5258773672599&spm=a1z10.1-c.w4004-24811118368.6.763d224fh8cJmA',
            arace_url: 'https://arace.tech/products/sophon-cv1800b-5pcs',
        },
        'sg2002': {
            taobao_url: 'https://item.taobao.com/item.htm?id=748015537624&skuId=5258773672598&spm=a1z10.1-c.w4004-24811118368.6.763d224fh8cJmA',
            arace_url: 'https://arace.tech/products/sophon-cv1800b-5pcs',
        },
    }

    const image_data = {
        'crowdSupply_url': '/components/crowdsupply.svg',
        'other_url': '/components/other.svg',
        'arace_url': '/components/arace.svg',
        'taobao_url': '/components/taobao.svg',
        'mouser_url': '/components/mouser.svg',
        'banli_url': '/components/banli.svg',
        'chilli_url': '/components/platima.png',
        'allnet_url': '/components/allent.svg',
    }
    const text_data = {
        'crowdSupply_url': 'Crowd Supply',
        'other_url': 'Other countries and regions',
        'arace_url': 'Arace Tech',
        'taobao_url': '淘宝',
        'mouser_url': 'Mouser',
        'banli_url': '斑梨电子',
        'chilli_url': 'Platima Tinkers',
        'allnet_url': 'ALLNET',
    }

    const product_pictures = {
        'home': '/components/buy-meles-view.webp',
        'duo': '/components/buy-duo-view.webp',
        'duo-s': '/components/buy-duo-view.webp',
        'pioneer': '/components/buy-pionner-view.webp',
        'mars': '/components/buy-mars-view.webp',
        'mars-cm': '/components/buy-marscm-view.webp',
        'meles': '/components/buy-meles-view.webp',
        'vega': '/components/buy-vega-view.webp',
        'cv1800b': '/components/buy-cv1800b-view.webp',
        'sg2000': '/components/buy-sg2000-view.webp',
        'sg2002': '/components/buy-sg2002-view.webp',
    }
    function transformString(str) {
        const words = str.split('-');
        let newStr
        if (words.length > 1) {
            newStr = words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words[1].toUpperCase()

        } else {
            newStr = words[0].charAt(0).toUpperCase() + words[0].slice(1)
        }
        return newStr
    }
    let product_name = transformString(type)
    return (
        <div id='buy' className={styles.buy_box}>
            <div className={styles.buy_center}>
                <h2>Buy Milk-V {product_name}</h2>
                <div className={styles.flex_center}>
                    <img src={product_pictures[type]} alt={type} />
                    {
                        Object.keys(buy_info[type]).length > 0 ?
                            <ul className={styles.agents}>
                                {
                                    Object.keys(buy_info[type]).map((item, key) => {
                                        let area = item === 'taobao_url' || item === 'banli_url' ? 'to China' : 'Worldwidely'

                                        let shipping_location
                                        if (item === 'arace_url') {
                                            shipping_location = 'Hong Kong'
                                        } else if (item === 'mouser_url') {
                                            shipping_location = 'United States'
                                        } else if (item === 'chilli_url') {
                                            shipping_location = 'Australia'
                                        } else {
                                            shipping_location = 'China'
                                        }
                                        return <li key={key} onClick={() => { window.open(buy_info[type][item], '_blank') }}>
                                            <img src={image_data[item]} alt={text_data[item]} />
                                            <div className={styles.agent_info}>
                                                <p className={styles.agent_official}>Official Agents:</p>
                                                <p className={styles.agent_br}>{text_data[item]}</p>
                                                <p className={styles.agent_official}>Based in</p>
                                                <p className={styles.agent_br}>{shipping_location}</p>
                                                <Link to={buy_info[type][item]}>shipping {area}</Link>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                            : <div className={styles.comingsoon}>
                                <img src='/components/comingsoon-icon.svg' alt='Coming Soon' />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}