import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Carousel } from 'antd';

import styles from './index.module.css';
import BuyPop from "../components/BuyPop"
import PopUp from "../components/Popup"
import Footer from "../components/Footer"
import ContactBar from "../components/ContactBar"


import Translate from '@docusaurus/Translate';

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
      <BuyPop flag={duo} module={duoStart} type='duo' />
      <BuyPop flag={pioneer} module={pioneerStart} type='pioneer' />
      <BuyPop flag={mars} module={marsStart} type='mars' />
      <BuyPop flag={buy} module={buyStart} type='home' />
      <div className={styles.bg}>
        <div className={styles.pages1}>
          <h1>
            “As many <br></br><span>RISC-V</span> as<br></br>the <span>stars</span> in <br></br>the <span>Milky <br></br>Way</span>”
          </h1>
        </div>
        <div className={styles.pages2}>
          <h1><Translate id='homepage.text.title1' /></h1>
          <p><Translate id='homepage.text.title1.info' /></p>
          <ul className={styles.icons}>
            <li className={styles.li01}>
              <img src='/pages/icon01.svg' />
              <p><Translate id='homepage.text.Features1' /></p>
            </li>
            <li className={styles.li02}>
              <img src='/pages/icon02.svg' />
              <p><Translate id='homepage.text.Features2' /></p>
            </li>
            <li className={styles.li03}>
              <img src='/pages/icon03.svg' />
              <p><Translate id='homepage.text.Features3' /></p>
            </li>
            <li className={styles.li04}>
              <img src='/pages/icon04.svg' />
              <p><Translate id='homepage.text.Features4' /></p>
            </li>
            <li className={styles.li05}>
              <img src='/pages/icon05.svg' />
              <p><Translate id='homepage.text.Features5' /></p>
            </li>
            <li className={styles.li06}>
              <img src='/pages/icon06.svg' />
              <p><Translate id='homepage.text.Features6' /></p>
            </li>
            <li className={styles.li07}>
              <img src='/pages/icon07.svg' />
              <p><Translate id='homepage.text.Features7' /></p>
            </li>
            <li className={styles.li08}>
              <img src='/pages/icon08.svg' />
              <p><Translate id='homepage.text.Features8' /></p>
            </li>
          </ul>
          <div className={styles.icons_banner} style={{ display: "none" }}>
            <Carousel autoplay={true} dots={false} effect='fade' ref={carousel}>
              <div className={styles.ban_item}>
                <div>
                  <img src='/pages/icon01.svg' />
                  <p><Translate id='homepage.text.Features1' /></p>
                </div>
                <div>
                  <img src='/pages/icon02.svg' />
                  <p><Translate id='homepage.text.Features2' /></p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/pages/icon03.svg' />
                  <p><Translate id='homepage.text.Features3' /></p>
                </div>
                <div>
                  <img src='/pages/icon04.svg' />
                  <p><Translate id='homepage.text.Features4' /></p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/pages/icon05.svg' />
                  <p><Translate id='homepage.text.Features5' /></p>
                </div>
                <div>
                  <img src='/pages/icon06.svg' />
                  <p><Translate id='homepage.text.Features6' /></p>
                </div>
              </div>
              <div className={styles.ban_item}>
                <div>
                  <img src='/pages/icon07.svg' />
                  <p><Translate id='homepage.text.Features7' /></p>
                </div>
                <div>
                  <img src='/pages/icon08.svg' />
                  <p><Translate id='homepage.text.Features8' /></p>
                </div>
              </div>
            </Carousel>
            <div className={styles.btns}>
              <img src='/pages/chevron-left.svg' onClick={() => { carousel.current.prev() }} />
              <img src='/pages/chevron-right.svg' onClick={() => { carousel.current.next() }} />
            </div>
          </div>
        </div>
        <div className={styles.pages3}>
          <img src='/pages/on3-bg-img.webp' className={styles.page3Img} />
          <div className={styles.buyBox}>
            <div className={styles.lineshow}>
              <h2><Translate id='homepage.text.debut' /></h2>
              <div className={styles.paddBox}>
                <div className={styles.paddBox2}><Translate id='homepage.text.Duo.Price' /></div>
              </div>
            </div>
            <h1>Milk-V Duo</h1>
            <h3><Translate id='homepage.text.Duo.mpu' /></h3>
            <p><Translate id='homepage.text.Duo.SellingPoint1' /></p><br></br>
            <p><Translate id='homepage.text.Duo.SellingPoint2' /></p>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setDuo(duo => !duo)}><Translate id='homepage.text.buy' /></div>
              <Link to='/duo'>
                <div className={styles.btnto}><Translate id='homepage.text.learnMore' /> {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/pages/mobile-home-02.webp' className={styles.page3Img2} style={{ display: 'none' }} />
        </div>
        <div className={styles.pages4}>
          <div className={styles.buyBox}>
            <h2><Translate id='homepage.text.debut' /></h2>
            <h1>Milk-V Pioneer</h1>
            <h3><Translate id='homepage.text.pioneer.mpu' /></h3>
            <ul className={styles.rp}>
              <li>64 cores up to 2GHz</li>
              <li>32GB / 128G 3200MHz DDR4</li>
              <li>1TB M.2 SSD</li>
              <li>5 SATA interfaces</li>
            </ul>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setPioneer(pioneer => !pioneer)}><Translate id='homepage.text.buy' /></div>
              <Link to='/pioneer'>
                <div className={styles.btnto}><Translate id='homepage.text.learnMore' /> {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/pages/mobile-home-03.webp' className={styles.page3Img3} style={{ display: 'none' }} />
          <div className={styles.imgBox}>
            <img src='/pages/pioneer-top.webp' className={styles.pimg1} />
            <img src='/pages/pioneer.png' className={styles.pimg2} />
          </div>
        </div>
        <div className={styles.pages5}>
          <img src='/pages/mars-home.webp' className={styles.page5_img} />
          <div className={styles.buyBox}>
            <h2><Translate id='homepage.text.debut' /></h2>
            <h1>Milk-V Mars</h1>
            <h3><Translate id='homepage.text.mars.mpu' /></h3>
            <p>JH7110, dual core up to 1.5GHz</p>
            <div className={styles.buyBtns}>
              <div className={styles.btnto} onClick={() => setMars(mars => !mars)}><Translate id='homepage.text.buy' /></div>
              <Link to='/mars'>
                <div className={styles.btnto}><Translate id='homepage.text.learnMore' /> {'>>'}</div>
              </Link >
            </div>
          </div>
          <img src='/pages/mobile-home-04.webp' className={styles.page3Img4} style={{ display: "none" }} />
        </div>
        <ContactBar product='duo' />
      </div>
      <div className={styles.buyChe} onClick={() => setBuy(buy => !buy)} >
        <img src='/pages/buy.svg' className={styles.buy1} />
        <img src='/pages/onBuy.svg' className={styles.buy2} />
        <p className={styles.buyCheP}><Translate id='online.buy' /></p>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Layout>
        <HomepageHeader />
        {/* <PopUp></PopUp> */}
        <Footer></Footer>
      </Layout>
    </>
  );
}

