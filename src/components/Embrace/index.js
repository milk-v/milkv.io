import React from 'react';
import styles from './index.module.css';

import Translate from '@docusaurus/Translate';


export default (props) => {
    const { product } = props

    return (
        <>
            <div className={styles.riscBg}>
                <h2 className={styles.embrace}>
                    <Translate id={`${product}.embrace1`} />
                </h2>
                <h2 className={styles.risc_v}><Translate id='duo.embrace2' /></h2>
            </div>
        </>
    )
}