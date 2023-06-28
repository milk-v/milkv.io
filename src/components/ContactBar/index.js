import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

import Translate from '@docusaurus/Translate';


export default () => {
    return (
        <>
            <div className={styles.on5_box}>
                <ul>
                    <li className={styles.li}>
                        <h1 className={styles.on5_box_h1}>[matrix]</h1>
                        <p className={styles.on5_box_p}><Translate id='contact.text.matrix' /></p>
                        <div className={styles.on5_bottom}>
                            <Link to='https://matrix.to/#/#milkv-duo:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}><Translate id='contact.text.join' /></Link>
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