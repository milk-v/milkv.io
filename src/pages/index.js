import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

import BuyPop from "../components/BuyPop"
import SupportUs from "../components/SupportUs"
import Footer from "../components/Footer"
import ContactBar from "../components/ContactBar"


const Duo_module = (props) => {
  const [duo, setDuo] = useState(false)
  const duoStart = () => {
    setDuo(false)
  }
  return (
    <>
      <BuyPop flag={duo} module={duoStart} type='duo' />
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Duo</h2>
            <p>Dual cores up to 800MHz,Rich IO for UART, I2C, SPI, SDIO, ADC and more,Running Linux or RTOS or both simultaneously</p>
            <div className={styles.learnMore_use}>
              <Link href=''>Learn More</Link>
              <div className={styles.buy_button} onClick={() => { setDuo(true) }}>Buy New</div>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-duo-view.webp' alt='Duo' />
          </div>
        </div>
        <div className={styles.grid_item1_module}>

        </div>
        <div className={styles.grid_item2_module}>

        </div>
      </div >
    </>
  )
}

const Home_web = () => {
  const [pioneer, setPioneer] = useState(false)
  const [mars, setMars] = useState(false)
  const [buy, setBuy] = useState(false)

  const [index, setIndex] = useState(1)
  const tabs = [
    { name: 'Duo', index: 1, element: <Duo_module></Duo_module> },
    { name: 'Pioneer', index: 2, element: <></> },
    { name: 'Mars', index: 3, element: <></> },
    { name: 'Meles', index: 4, element: <></> },
    { name: 'Vega', index: 5, element: <></> },
  ];

  const buyStart = () => {
    setBuy(false)
  }
  const marsStart = () => {
    setMars(false)
  }
  const pioneerStart = () => {
    setPioneer(false)
  }

  return (
    <>
      <BuyPop flag={pioneer} module={pioneerStart} type='pioneer' />
      <BuyPop flag={mars} module={marsStart} type='mars' />
      <BuyPop flag={buy} module={buyStart} type='home' />
      <div className={styles.home_header}>
        <div className={styles.header_title}>
          <h1>"As Many RISC-V as the <br></br> Stars in the Milky Way"</h1>
          <div className={styles.button_use}>
            <Link href=''>Milk-V Comunity</Link>
            <Link href='/about'>Why RISC-V ?</Link>
          </div>
        </div>
      </div>
      <div className={styles.black_shore}>
        <ul className={styles.tab}>
          {tabs.map((tab, idx) => (
            <li key={idx} className={index === tab.index ? styles.index : null} onClick={() => { setIndex(tab.index) }}>
              <p>{tab.name}</p>
            </li>
          ))}
        </ul>
        <div>
          {
            tabs.filter((tab, idx) => {
              return tab.index === index
            })[0].element
          }
        </div>
        <div className={styles.docs_link}>
          <img src='/home/milkv-docs-logo.svg' alt='milkv docs' />
          <div className={styles.docs_info}>
            <h1>MilkV Documents</h1>
            <p>View our documentation for technical support</p>
          </div>
          <Link href='/docs/home' className={styles.docs_a}>Learn More</Link>
        </div>
        <ContactBar product='duo' />
        <SupportUs />
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      <Layout>
        <Home_web />
        <Footer></Footer>
      </Layout>
    </>
  );
}

