import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Carousel } from 'antd';

import styles from './index.module.css';
import Head from "../components/Head"
import ContactUs from "../components/ContactUs"

function HomepageHeader() {
  const [duo, setDuo] = useState(false)
  const [pioneer, setPioneer] = useState(false)
  const [mars, setMars] = useState(false)
  const [buy, setBuy] = useState(false)

  const carousel = useRef(null)

  const buyStart = () => {
    setBuy(false)
  }
  const marsStart = () => {
    setMars(false)
  }
  const pioneerStart = () => {
    setPioneer(false)
  }
  const duoStart = () => {
    setDuo(false)
  }
  return (
    <>
      <Head flag={duo} module={duoStart} type='duo' />
      <Head flag={pioneer} module={pioneerStart} type='pioneer' />
      <Head flag={mars} module={marsStart} type='mars' />
      <Head flag={buy} module={buyStart} type='buy' />
      <div className={styles.bg}>
        <div className={styles.pages1}>
          <h1>
            “As many <br></br><span>RISC-V</span> as<br></br>the <span>stars</span> in <br></br>the <span>Milky <br></br>Way</span>”
          </h1>
        </div>
        <div className={styles.pages2}>
          <h1>Why choose RISC-V？</h1>
          <p>Milk-V is committed to providing high quality RISC-V products to developers, enterprises and consumers, and to promoting the development of the RISC-V hardware and software ecosystem. Milk-V will firmly support open source, and hopes that through its own efforts and those of the community, future RISC-V products will be as numerous and bright as the stars in the Milky Way.</p>
          <ul className={styles.icons}>
            <li className={styles.li01}>
              <img src='/home/icon01.svg' />
              <p>Low power</p>
            </li>
            <li className={styles.li02}>
              <img src='/home/icon02.svg' />
              <p>Low cost</p>
            </li>
            <li className={styles.li03}>
              <img src='/home/icon03.svg' />
              <p>Open Source</p>
            </li>
            <li className={styles.li04}>
              <img src='/home/icon04.svg' />
              <p>Modularizable</p>
            </li>
            <li className={styles.li05}>
              <img src='/home/icon05.svg' />
              <p>Simple</p>
            </li>
            <li className={styles.li06}>
              <img src='/home/icon06.svg' />
              <p>Small area</p>
            </li>
            <li className={styles.li07}>
              <img src='/home/icon07.svg' />
              <p>Small area</p>
            </li>
            <li className={styles.li08}>
              <img src='/home/icon08.svg' />
              <p>High performance</p>
            </li>
          </ul>
          <div className={styles.icons_banner} style={{ display: "none" }}>
            <Carousel autoplay={true} dots={false} effect='fade' ref={carousel}>
              <div className={styles.ban_item}>
                <div>
                  <img src='/home/icon01.svg' />
                  <p>Low power</p>
                </div>
                <div>
                  <img src='/home/icon02.svg' />
                  <p>Low cost</p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/home/icon03.svg' />
                  <p>Open Source</p>
                </div>
                <div>
                  <img src='/home/icon04.svg' />
                  <p>Modularizable</p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/home/icon05.svg' />
                  <p>Simple</p>
                </div>
                <div>
                  <img src='/home/icon06.svg' />
                  <p>Small area</p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/home/icon07.svg' />
                  <p>Small area</p>
                </div>
                <div>
                  <img src='/home/icon08.svg' />
                  <p>High performance</p>
                </div>
              </div>
            </Carousel>
            <div className={styles.btns}>
              <img src='/img/chevron-left.svg' onClick={() => { carousel.current.prev() }} />
              <img src='/img/chevron-right.svg' onClick={() => { carousel.current.next() }} />
            </div>
          </div>
        </div>
        <div className={styles.pages3}>
          <img src='/home/on3-bg-img.webp' className={styles.page3Img} />
          <div className={styles.buyBox}>
            <div className={styles.lineshow}>
              <h2>WORLD DEBUT</h2>
              <div className={styles.paddBox}>
                <div className={styles.paddBox2}>Starting from $9</div>
              </div>
            </div>
            <h1>Milk-V Duo</h1>
            <h3>RISC-V Dual Core MPU</h3>
            <p>Dual cores up to 1GHz</p>
            <p>Rich IO for UART, I2C, SPI, SDIO, ADC, and more</p>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setDuo(duo => !duo)}>Buy</div>
              <Link to='/duo'>
                <div className={styles.btnto}>Learn more {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/mobile/mobile-home-02.webp' className={styles.page3Img2} style={{ display: 'none' }} />
        </div>
        <div className={styles.pages4}>
          <div className={styles.buyBox}>
            <h2>WORLD DEBUT</h2>
            <h1>Milk-V Pioneer</h1>
            <h3>RISC-V Developer  Motherboard / Workstation</h3>
            <ul className={styles.rp}>
              <li>64 cores up to 2GHz</li>
              <li>32GB / 128G 3200MHz DDR4</li>
              <li>1TB M.2 SSD</li>
              <li>5 SATA interfaces</li>
            </ul>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setPioneer(pioneer => !pioneer)}>Buy</div>
              <Link to='/pioneer'>
                <div className={styles.btnto}>Learn more {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/mobile/mobile-home-03.webp' className={styles.page3Img3} style={{ display: 'none' }} />
          <div className={styles.imgBox}>
            <img src='/home/pioneer-top.webp' className={styles.pimg1} />
            <img src='/home/pioneer.png' className={styles.pimg2} />
          </div>
        </div>
        <div className={styles.pages5}>
          <img src='/home/mars-home.webp' className={styles.page5_img} />
          <div className={styles.buyBox}>
            <h2>World Debut</h2>
            <h1>Milk-V Mars</h1>
            <h3>The first Quad-Core RISC-V credit card size SBC</h3>
            <p>JH7110, dual core up to 1.5GHz</p>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setMars(mars => !mars)}>Buy</div>
              <Link to='/mars'>
                <div className={styles.btnto}>Learn more {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/mobile/mobile-home-04.webp' className={styles.page3Img4} style={{ display: "none" }} />
        </div>
        <ContactUs />
        <div className={styles.on5_box}>
          <ul>
            <li className={styles.li}>
              <h1 className={styles.on5_box_h1}>[matrix]</h1>
              <p className={styles.on5_box_p}>Join the Duo Matrix Chat channel to share your ideas with the developers all around the world.</p>
              <div className={styles.on5_bottom}>
                <Link to='https://matrix.to/#/#milkv-duo:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}>Join #milkv-duo</Link>
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
      <div className={styles.buyChe} onClick={() => setBuy(buy => !buy)} >
        <img src='/home/buy.svg' className={styles.buy1} />
        <img src='/home/onBuy.svg' className={styles.buy2} />
        <p className={styles.buyCheP}>Online shop</p>
      </div>
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

