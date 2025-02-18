import React from "react";
import Layout from '@theme/Layout';
import styles from './index.module.css';
import styles_s from '@site/src/pages/megrez/index.module.css';
import clsx from "clsx";
import Subscribe from "@site/src/components/Subscribe";

export default () => {
    return <Layout>
        <main className={styles.cluster_main}>
            <div className={styles_s.pr_title}>
                <h1 className={styles_s.pr_name}>Milk-V Cluster 08</h1>
                <p className={styles_s.pr_info}>Full Stack RISC-V Cluster</p>
            </div>
            <div className={styles.c_content}>
                <Subscribe product='cluster-08' />
                <div className={styles.flex_item}>
                    <div className={styles.contexts_module1}>
                        <div className={styles.contexts1}></div>
                        <div className={styles.text_module1}>
                            <p className={styles.c_title_gbps}>Cluster-wide Bandwidth
                                Up to <span>32Gbps</span>
                            </p>
                            <p className={styles.c_title_gbps}>Overall node Bandwidth
                                Up to <span>16Gbps</span></p>
                        </div>
                    </div>
                    <div className={styles.contexts2}>
                        <p className={styles.c_title1}>RISC-V Powered Interconnection</p>
                        <p className={styles.c_title2}>FSL1030M</p>
                        <p className={styles.c_info}>32G bandwidth Layer 2 Ethernet switch chip</p>
                    </div>
                </div>
                <div className={clsx(styles.flex_item, styles.supports)}>
                    <div>
                        <div className={styles.contexts3}>
                            <p className={clsx(styles.c_title2, styles.c_title2_top)}>Milk-V BMC 08</p>
                            <p className={styles.c_info}>RISC-V Powered BMC
                            </p>
                        </div>
                        {/* <div className={styles.support_ul}>
                            <p className={styles.support_title}>Support KVM Function
                            </p>
                            <ul>
                                <li>Remote desktop access</li>
                                <li>Simulates keyboard and mouse</li>
                            </ul>
                        </div> */}
                    </div>
                    <div>
                        <div className={styles.support_ul}>
                            <p className={styles.support_title}>Up to 8 Nodes Management</p>
                            <ul>
                                <li>Remote management with serial port access</li>
                                <li>Remote flashing for any node</li>
                                <li>Simultaneous firmware updates for 8 nodes</li>
                            </ul>
                        </div>
                        <div className={styles.support_ul}>
                            <p className={styles.support_title}>Pluggable Design</p>
                            <ul>
                                <li>Easily embedded for BMC functionality</li>
                                <li>Open source pin definition</li>
                                <li>Open source 2D and 3D designs</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.banner_module, styles.contexts4)}>
                    <p className={clsx(styles.c_title2, styles.c_title2_top)}>RISC-V Computing Nodes</p>
                    <div className={styles.position_box}>
                        <p className={styles.c_title_gbps}>Supports </p>
                        <p className={clsx(styles.c_title_gbps, styles.margin_bottom)}>Jupiter NX & Megrez NX</p>
                        <p className={styles.c_title_gbps}>Each Node Supports</p>
                        <p className={clsx(styles.c_title_gbps, styles.margin_bottom)}>NVMe SSD Installation</p>
                        <p className={styles.c_title_gbps}>8 Megrez NX nodes,
                            <br />up to <span>159.6 TOPS.</span></p>
                    </div>
                </div>
                <div className={clsx(styles.banner_module, styles.contexts5)}>
                    <p className={clsx(styles.c_title2, styles.c_title2_top)}>Supports cross-architecture inference</p>
                </div>
            </div>
        </main>
    </Layout>
}