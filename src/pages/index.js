import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import Head from "../components/Head"


function HomepageHeader() {
  const on4 = useRef(null)

  return (
    <>
      <div className={styles.center}>
        <div>
          <div className={styles.contentStyle}>
            <div className={styles.on1}>
              <div className={styles.topLeft}></div>
              <div className={styles.rightB}></div>
            </div>
            <div className={styles.on1_p}>
              <span>“As many</span> RISC-V <span>as the</span> stars <span>in the</span> Milky Way<span>”</span></div>
          </div>
        </div>
        <div>
          <div className={styles.contentStyle}>
            <h1 className={styles.on2_h}>
              Why choose RISC-V？
            </h1>
            <p className={styles.on2_p}>
              Milk-V is committed to providing high quality RISC-V products to developers, enterprises and consumers, and to promoting the development of the RISC-V hardware and software ecosystem. Milk-V will firmly support open source, and hopes that through its own efforts and those of the community, future RISC-V products will be as numerous and bright as the stars in the Milky Way.
            </p>
            <div className={styles.on2_shadow}></div>
            <div className={styles.on2_list}>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon1}></div>
                  <p>Low Power</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon2}></div>
                  <p>Low Cost</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon3}></div>
                  <p>Open Source</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon4}></div>
                  <p>Modularizable</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon5}></div>
                  <p>Simple</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon6}></div>
                  <p>Small Area</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon7}></div>
                  <p>Fast</p>
                </div>
              </div>
              <div className={styles.on2_item}>
                <div>
                  <div className={styles.icon8}></div>
                  <p>High Performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.contentStyle}>
            <img src='/img/on3_bg_img.png' className={styles.on3_bg_img} />
            <div className={styles.on3_change}>
              <h2>World Debut</h2>
              <h1>Milk-V Duo</h1>
              <p>RISC-V Dual Core MPU</p>
              <div className={styles.on3_text}>
                <div className={styles.on3_change_text}>Starting from $9</div>
              </div>
              <div className={styles.on3_box}>
                <p className={styles.p1}>Dual cores up to 1GHz</p>
                <p className={styles.p2}>Rich IO for UART, I2C, SPI, SDIO, ADC, and more</p>
              </div>
              <div className={styles.on3_bottom_left}>
                <Head cd='on3'></Head>
              </div>
              <div className={styles.on3_bottom_right}>
                <Link to="/duo" style={{ textDecoration: 'none', color: '#fff', width: '100%', height: '100%', display: 'block' }}>Learn more&gt;&gt;</Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.contentStyle} style={{ background: 'linear-gradient(284.67deg, #000B14 0%, #151818 49.57%, #001B1B 101.26%)' }}>
            <div className={styles.centextBox}>
              <h2>World Debut</h2>
              <h1>Milk-V Pioneer</h1>
              <p>RISC-V Developer Motherboard / Workstation</p>
              <div className={styles.parBox}>
                <div className={styles.parameter}>64 cores up to 2GHz</div>
                <div className={styles.parameter}>32GB / 128G 3200MHz DDR4</div>
              </div>
              <div className={styles.parBox}>
                <div className={styles.parameter}>1TB M.2 SSD</div>
                <div className={styles.parameter}>5 SATA interfaces</div>
              </div>
              <div className={styles.on3_bottom_left}>
                <Head cd='on3'></Head>
              </div>
              <div className={styles.on3_bottom_right}>
                <Link to="/pioneer" style={{ textDecoration: 'none', color: '#fff', width: '100%', height: '100%', display: 'block' }}>Learn more&gt;&gt;</Link>
              </div>
              <img src='/img/pioneer_top.png' className={styles.pioneer_top} />
              <img src='/img/pioneer.png' className={styles.pioneer} />
            </div>
          </div>
        </div>
        <div>
          <div ref={on4} className={styles.contentStyle}>
            <div className={styles.on5_box}>
              <ul>
                <li className={styles.li}>
                  <h1 className={styles.on5_box_h1}>[matrix]</h1>
                  <p className={styles.on5_box_p}>Join the Milk-V Matrix Chat channel(#milk-v:matrix.org) to share your ideas with the developers all around the world.</p>
                  <div className={styles.on5_bottom}>
                    <Link to='https://matrix.to/#/#milk-v:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}>Join #milk-v</Link>
                  </div>
                </li>
                <li className={styles.li}>
                  <h1 className={styles.on5_box_h1}>WeChat</h1>
                  <div className={styles.on5_img}></div>
                </li>
                <li className={styles.li}>
                  <h1 className={styles.on5_box_h1}>QQ Group</h1>
                  <div className={styles.on5_img_QQ}></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Head ele='home' type=''></Head>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Layout>
        <HomepageHeader />
      </Layout>
    </>
  );
}

