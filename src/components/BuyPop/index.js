import React from 'react';
import styles from './head.module.css'
import Link from '@docusaurus/Link';

export default (props) => {
    const { type } = props

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
            chilli_url: 'https://shop.plati.ma/collections/all?filter.p.vendor=Milk-V',
            jd_url: 'https://ic-item.jd.com/10107640792852.html',
            robu_url: 'https://robu.in/?s=milk+v+duo&post_type=product&dgwt_wcas=1',
            pajenicko_url: 'https://pajenicko.cz/milk-v/milk-v-duo'
        },
        'duo-s': {
            arace_url: 'https://arace.tech/products/milkv-duo-s',
            taobao_url: 'https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-24811212567.16.4d92224f5Hci1u&id=770462822819&sku_properties=5919063:6536025',
            banli_url: 'https://spotpear.cn/category/Milk-V.html',
            chilli_url: 'https://shop.plati.ma/products/milk-v-duo-s-512m-1ghz-dual-core-risc-v-arm-sbc?_pos=4&_fid=86ada3723&_ss=c',
            jd_url: 'https://ic-item.jd.com/10107306617970.html#crumb-wrap',
            robu_url: 'https://robu.in/?s=milk+v+duo+s&post_type=product&dgwt_wcas=1',
            pajenicko_url: 'https://pajenicko.cz/milk-v'
        },
        'duo-module-01': {
            arace_url: 'https://arace.tech/products/milk-v-duo-module-01',
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=828155295674',
            chilli_url: 'https://shop.plati.ma/products/milk-v-duo-module-01?_pos=5&_fid=2ba550543&_ss=c',
            pajenicko_url: 'https://pajenicko.cz/milk-v/milk-v-duo-module-01'
        },
        'pioneer': {
            crowdSupply_url: 'https://www.crowdsupply.com/milkv/milk-v-pioneer',
            arace_url: 'https://arace.tech/collections/milk-v-pioneer',
            // mouser_url: 'https://www.mouser.com/c/embedded-solutions/computing/?m=Milk-V'
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=747577392202&skuId=5389708539957',
            jd_url: 'https://ic-item.jd.com/10107306192743.html',
        },
        'mars': {
            arace_url: 'https://arace.tech/products/milk-v-mars',
            taobao_url: 'https://item.taobao.com/item.htm?ft=t&id=756713087930',
            robu_url: 'https://robu.in/?s=milk+v+mars&post_type=product&dgwt_wcas=1'
        },
        'mars-cm': {
            arace_url: 'https://arace.tech/products/milk-v-mars-cm',
            robu_url: 'https://robu.in/product/milk-v-mars-cm-without-wi-fi/'
        },
        'meles': {
            taobao_url: 'https://item.taobao.com/item.htm?id=779272470113',
            arace_url: 'https://arace.tech/products/milk-v-meles-1'
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
        'sg2380': {
            // arace_url: 'https://arace.tech/products/milk-v-meles',
        },
        'jupiter': {
            taobao_url: 'https://milkv.taobao.com/',
            jd_url: 'https://item.jd.com/10108225846745.html',
            arace_url: 'https://arace.tech/products/milk-v-jupiter-spacemit-m1-k1-octa-core-rva22-rvv1-0-risc-v-soc-2tops-miniitx',
        },
        'megrez': {
            contact_url: 'mailto: megrez@milkv.io',
            // jd_url: 'https://ic-item.jd.com/10126518696856.html#crumb-wrap',
            // arace_url: 'https://arace.tech/products/milk-v-megrez',
        },
        'jupiter-nx': {},
        'titan': {
            arace_url: 'https://arace.tech/products/milk-v-titan',
            jd_url: 'http://item.jd.com/10165331347566.html?sdx=ehi-lLxFuZiE6JnJZ4Zfj8cjtDeUDg0rsmpKtqxHZNWLPe_RLJhe4nvmpU3iU2KT',
        }
    }

    const image_data = {
        'crowdSupply_url': '/components/crowdsupply.svg',
        'other_url': '/components/other.svg',
        'arace_url': '/components/arace.svg',
        'taobao_url': '/components/taobao.svg',
        'jd_url': '/components/jd.webp',
        'mouser_url': '/components/mouser.svg',
        'banli_url': '/components/banli.svg',
        'chilli_url': '/components/platima.png',
        'allnet_url': '/components/allent.svg',
        'robu_url': '/components/robu.png',
        'contact_url': '/components/milkv.webp',
        'pajenicko_url': '/components/pajenicko.png',
    }

    const text_data = {
        'crowdSupply_url': 'Crowd Supply',
        'other_url': 'Other countries and regions',
        'arace_url': 'ARACE',
        'taobao_url': '淘宝',
        'jd_url': '京东',
        'mouser_url': 'Mouser',
        'banli_url': '斑梨电子',
        'chilli_url': 'Platima Tinkers',
        'allnet_url': 'ALLNET',
        'robu_url': 'Rubu.in',
        'contact_url': 'Contace us',
        'pajenicko_url': 'Pajenicko',
    }

    const product_pictures = {
        'home': '/components/buy-meles-view.webp',
        'duo': '/components/buy-duo-view.webp',
        'duo-s': '/components/buy-duos-view.webp',
        'duo-module-01': '/components/duo-module-01-buy.webp',
        'pioneer': '/components/buy-pionner-view.webp',
        'mars': '/components/buy-mars-view.webp',
        'mars-cm': '/components/buy-marscm-view.webp',
        'meles': '/components/buy-meles-view.webp',
        'megrez': '/components/buy-megrez-view.webp',
        'vega': '/components/buy-vega-view.webp',
        'jupiter': '/components/buy-jupiter-view.webp',
        'jupiter-nx': '/components/buy-jupiternx-view.webp',
        'cv1800b': '/components/buy-cv1800b-view.webp',
        'sg2000': '/components/buy-sg2000-view.webp',
        'sg2002': '/components/buy-sg2002-view.webp',
        'sg2380': '/components/buy-sg2380-view.webp',
        'titan': '/components/buy-titan-view.webp',
    }

    return (
        <div id='buy' className={styles.buy_box}>
            <div className={styles.buy_center}>
                <h2>Buy Milk-V {type.toUpperCase()}</h2>
                <div className={styles.flex_center}>
                    <img src={product_pictures[type]} alt={type} />
                    {
                        Object.keys(buy_info[type]).length > 0 ?
                            <ul className={styles.agents}>
                                {
                                    Object.keys(buy_info[type]).map((item, key) => {
                                        let area = item === 'jd_url' || item === 'taobao_url' || item === 'banli_url' ? 'to China' : 'Worldwidely'

                                        let shipping_location
                                        if (item === 'arace_url') {
                                            shipping_location = 'Hong Kong'
                                        } else if (item === 'mouser_url') {
                                            shipping_location = 'United States'
                                        } else if (item === 'chilli_url') {
                                            shipping_location = 'Australia'
                                        } else if (item === 'robu_url') {
                                            shipping_location = 'India'
                                        } else if (item === 'robu_url') {
                                            shipping_location = 'India'
                                        } else if (item === 'pajenicko_url') {
                                            shipping_location = 'Česko'
                                        } else {
                                            shipping_location = 'China Mainland'
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