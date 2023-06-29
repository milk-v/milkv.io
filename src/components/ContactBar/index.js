import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

import Translate from '@docusaurus/Translate';


export default (props) => {
    const { product } = props

    const link_url = product === 'duo' ? 'https://matrix.to/#/#milkv-duo:matrix.org' : product === 'pioneer' ? 'https://matrix.to/#/#milkv-pioneer:matrix.org' : product === 'mars' ? 'https://matrix.to/#/#milk-v:matrix.org' : null

    return (
        <>
            <div className={styles.on5_box}>
                <ul>
                    <li className={styles.li}>
                        <h1 className={styles.on5_box_h1}>[matrix]</h1>
                        <p className={styles.on5_box_p}><Translate id='contact.text.matrix' /></p>
                        <div className={styles.on5_bottom}>
                            <Link to={link_url} style={{ textDecoration: 'none', color: '#fff' }}><Translate id='contact.text.join' />{product}</Link>
                        </div>
                    </li>
                    <li className={styles.li}>
                        <h1 className={styles.on5_box_h1}><Translate id='contact.text.WeChat' /></h1>
                        <div className={styles.on5_img}></div>
                    </li>
                    <li className={styles.li}>
                        <h1 className={styles.on5_box_h1}><Translate id='contact.text.QQ' /></h1>
                        <div className={styles.on5_img_QQ}></div>
                    </li>
                </ul>
            </div>
        </>
    )
}