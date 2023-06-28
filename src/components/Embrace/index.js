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
                        product === 'duo' ? <Translate id='duo.embrace1' /> : product === 'pionner' ? 'Embrace the new era with Pionner,' : product === 'mars' ? 'Embrace the new era with Mars,' : null
                    }
                </h1>
                <h1 className={styles.risc_v}><Translate id='duo.embrace2' /></h1>
            </div>
        </>
    )
}