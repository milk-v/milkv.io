import React from 'react';
import styles from './index.module.css';

export default () => {

    return (
        <>
            <div className={styles.cUs}>
                <h1 className={styles.maxtitle}>Contact Us</h1>
                <h3>Having questions? Get in touch with us to resolve!</h3>
                <ul className={styles.message}>
                    <li>
                        <h1>Sales Department</h1>
                        <p>sales@milkv.io</p>
                    </li>
                    <li>
                        <h1>Customer Support Department</h1>
                        <p>support@milkv.io</p>
                    </li>
                    <li>
                        <h1>Development Department</h1>
                        <p>dev@milkv.io</p>
                    </li>
                    <li>
                        <h1>Address</h1>
                        <p>L8-01, Block B, Bao Cube Jewelry City, 198 Xin'an 4th Road, Liutang Community, Xixiang Street, Bao'an District, Shenzhen, China</p>
                    </li>
                </ul>
            </div>
        </>
    )
}