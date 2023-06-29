import React from 'react';
import styles from './index.module.css';

import Translate from '@docusaurus/Translate';


export default (props) => {
    const { product } = props

    return (
        <>
            <div className={styles.riscBg}>

                <h1 className={styles.embrace}>
                    {
                        product === 'duo' ? <Translate id='duo.embrace1' /> : product === 'pionner' ? <Translate id='pioneer.embrace1' /> : product === 'mars' ? <Translate id='mars.embrace1' /> : null
                    }
                </h1>
                <h1 className={styles.risc_v}><Translate id='duo.embrace2' /></h1>
            </div>
        </>
    )
}