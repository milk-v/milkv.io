import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import Head from "../components/Head"


function HomepageHeader() {
  const bannerBox = useRef(null)
  const on4 = useRef(null)

  const [flag1, setFlag1] = useState(true)
  const [flag2, setFlag2] = useState(true)
  const [count, setCount] = useState(0)

  function toScroll(e) {
    let gao = e.deltaY
    if (gao > 0) {
      if (flag1) {
        bannerBox.current.next()
      }
    } else {
      if (flag2) {
        bannerBox.current.prev()
      }
    }
  }


  useEffect(() => {
    document.querySelector('.footer').style.display = "none";
    if (count === 4) {
      document.querySelector('.footer').style.display = "block";
    }
  }, [count]);

  const which = (c) => {
    setCount(c)
    if (c === 4) {
      setFlag1(false)
    } else {
      setFlag1(true)
    }
    if (c === 0) {
      setFlag2(false)
    } else {
      setFlag2(true)
    }
  }

  return (
    <>
      <div onWheel={e => toScroll(e)} className={styles.center}>
        <Carousel ref={bannerBox} dotPosition='left' afterChange={(c) => which(c)}>
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
              <div className={styles.on3_change}>
                <div className={styles.on3_shadow1}></div>
                <div className={styles.on3_shadow2}></div>
                <div className={styles.on3_shadow3}></div>
                <div className={styles.on3_text}>
                  <div className={styles.on3_change_text}>Starting from $9</div>
                </div>
                <div className={styles.on3_img}> </div>
                <h1 className={styles.on3_h1}>World Debut</h1>
                <span className={styles.on3_change_text_span}>
                  This is
                </span>
                <p className={styles.on3_p}>RISC-V MPU</p>
                <div className={styles.on3_box}>
                  <ul className={styles.box_list}>
                    <li>
                      <div>
                        <div className={styles.icon2}></div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className={styles.icon1}></div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className={styles.icon8}></div>
                      </div>
                    </li>
                  </ul>
                  <p className={styles.p1}>Dual cores up to 1GHz</p>
                  <p className={styles.p2}>Rich IO for UART, I2C, SPI, SDIO, ADC, and more</p>
                  <p className={styles.p3}>Running Linux or RTOS or both simultaneously</p>
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
              <div className={styles.on4_txtBox}>
                <p className={styles.this}>This is</p>
                <p className={styles.txt_line}>RISC-V Developer  Motherboard/PC</p>
                <h1 className={styles.world}>World Debut</h1>
                <div className={styles.parBox}>
                  <div className={styles.parameter}>64 cores up to 2GHz</div>
                  <div className={styles.parameter}>32GB 3200MHz DDR4</div>
                </div>
                <div className={styles.parBox2}>
                  <div className={styles.parameter}>1TB M.2 SSD</div>
                  <div className={styles.parameter}>5 SATA interfaces</div>
                  <div className={styles.parameter}>350W Power Apply</div>
                </div>
              </div>
              <div className={styles.on4_bottom_left}>
                <Head cd='on3'></Head>
              </div>
              <div className={styles.on4_bottom_right}>
                <Link to="/pioneer" style={{ textDecoration: 'none', color: '#fff', width: '100%', height: '100%', display: 'block' }}>Learn more&gt;&gt;</Link>
              </div>
              <div className={styles.on4_pag}></div>
              <div className={styles.on4_show}></div>
            </div>
          </div>
          <div>
            <div ref={on4} className={styles.contentStyle}>
              <div className={styles.on5_box}>
                <ul>
                  <li className={styles.li}>
                    <h1 className={styles.on5_box_h1}>Communiy</h1>
                    <p className={styles.on5_box_p}>Join the Milk-V Matrix Chat channel to share your ideas with the developers all around the world.</p>
                    <div className={styles.on5_bottom}>
                      <Link to='https://community.milkv.io/' style={{ textDecoration: 'none', color: '#fff' }}>Get In Touch</Link>
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
        </Carousel>
      </div>

      <Head ele='home'></Head>
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

