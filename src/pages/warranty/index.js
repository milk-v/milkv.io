import React from 'react';
import Layout from '@theme/Layout';
import styles from "./index.module.css"
import Translate from '@docusaurus/Translate';
import Footer from "../../components/Footer"


export default () => {
    return (
        <>
            <Layout>
                <iframe src='/warranty/MilkV-Warranty.pdf' className={styles.view_pdf}></iframe>
                <Footer></Footer>
            </Layout>
        </>
    )
}