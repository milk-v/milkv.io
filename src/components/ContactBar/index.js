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
                        <p>Join Milk-V WeChat Group</p>
                    </li>
                    <li>
                        < img src='/components/QQGroup.svg' />
                        <h2><Translate id='contact.text.QQ' /></h2>
                        <p>Join Milk-V QQ Group</p>
                    </li>
                </ul>
            </div>
        </>
    )
}