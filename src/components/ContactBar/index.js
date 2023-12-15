import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

import Translate from '@docusaurus/Translate';


export default (props) => {
    const { product } = props

    const link_url = `https://matrix.to/#/#milkv-${product}:matrix.org`

    return (
        <>
            <div className={styles.on5_box}>
                <h2><Translate id='homepage.corporations.joinus' /></h2>
                <ul className={product !== 'home' ? styles.min_ul : null}>
                    <li>
                        < img src='/components/channel.png' />
                        <div className={styles.on5_bottom}>
                            <Link to={product === 'home' ? 'https://matrix.to/#/#milk-v:matrix.org' : link_url} style={{ textDecoration: 'none', color: '#fff' }}>{product !== 'home' ? <><Translate id='contact.text.join' />{product}</> : 'join #milk-v'} </Link>
                        </div>
                        <p>Join the {product.charAt(0).toUpperCase() + product.slice(1)} Matrix Chat channel to share your ideas with the developers all around the world.</p>
                    </li>
                    <li>
                        <img src='/components/weChat.svg' />
                        <h2><Translate id='contact.text.WeChat' /></h2>
                        <div className={styles.on5_bottom} id={styles.wechat}>
                            <Link to='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3NDkwNTYyMw==#wechat_redirect' style={{ textDecoration: 'none', color: '#fff' }}><Translate id='contact.text.WeChat' /></Link>
                        </div>
                        <p>Join Milk-V WeChat Group</p>
                    </li>
                    <li>
                        < img src='/components/QQGroup.svg' />
                        <h2><Translate id='contact.text.QQ' /></h2>
                        <div className={styles.on5_bottom} id={styles.joinqq}>
                            <Link to='https://qm.qq.com/cgi-bin/qm/qr?k=ZFCR14q78e6na-y4RH1KltBaC0UHqiiY&authKey=/HuSnCtvghVjBdHMhj1uZyhbHtLWTEq8AKt85nHQVEDTpYvYw5b0NWc1D1/yAav2&noverify=0' style={{ textDecoration: 'none', color: '#fff' }}><Translate id='contact.text.QQ' /></Link>
                        </div>
                        <p>Join Milk-V QQ Group</p>
                    </li>
                </ul>
            </div>
        </>
    )
}