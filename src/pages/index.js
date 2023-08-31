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
              <Link href='/duo'>Learn More</Link>
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

const Pionner_module = (props) => {
  const [pioneer, setPionner] = useState(false)
  const pionnerStart = () => {
    setPionner(false)
  }
  return (
    <>
      <BuyPop flag={pioneer} module={pionnerStart} type='pioneer' />
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Pioneer</h2>
            <p>Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V.</p>
            <div className={styles.learnMore_use}>
              <Link href='/pioneer'>Learn More</Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}>Buy New</div>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-pionner-view.webp' alt='Pioneer' />
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

const Mars_module = (props) => {
  const [pioneer, setPionner] = useState(false)
  const [marscm, setMarscm] = useState(false)
  const pionnerStart = () => {
    setPionner(false)
  }
  const cmStart = () => {
    setMarscm(false)
  }
  return (
    <>
      <BuyPop flag={pioneer} module={pionnerStart} type='mars' />
      <BuyPop flag={marscm} module={cmStart} type='mars-cm' />
      <div className={styles.info_module}>
        <div className={styles.view_mian}>
          <div className={styles.left}>
            <h2>Milk-V Mars</h2>
            <p>Series</p>
          </div>
          <div className={styles.right}>
            <div className={styles.right_img}>
              <img src='/home/home-marscm-view.webp' alt='Mars CM' />
            </div>
            <div className={styles.right_text}>
              <h2>Milk-V Mars CM</h2>
              <p>Dual cores up to 800MHz,Rich IO for UART, I2C, SPI, SDIO, ADC and more,Running Linux or RTOS or both simultaneously</p>
              <div className={styles.learnMore_use}>
                <Link href='/mars-cm'>Learn More</Link>
                <div className={styles.buy_button} onClick={() => { setMarscm(true) }}>Buy New</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Mars</h2>
            <p>Milk-V Mars is a high-performance RISC-V Single Board Computer (SBC) the size of a credit card, built on the StarFive JH7110. An RJ45 Ethernet port that supports PoE (Power over Ethernet), and an M.2 E-Key slot for a WIFI/BT module. It also includes a 4-lane MIPI CSI and a 2-lane MIPI CSI, along with a 40-pin GPIO.</p>
            <div className={styles.learnMore_use}>
              <Link href='/mars'>Learn More</Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}>Buy New</div>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-mars-view.webp' alt='Mars' />
          </div>
        </div>
      </div >
    </>
  )
}
const Meles_module = (props) => {
  const [pioneer, setPionner] = useState(false)
  const pionnerStart = () => {
    setPionner(false)
  }
  return (
    <>
      <BuyPop flag={pioneer} module={pionnerStart} type='meles' />
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Meles</h2>
            <p>Milk-V Meles is a credit card-sized, single-board computer (SBC) based on the TH1520. It is powered by a Quad Core RISC-V 64GCV C910, capable of running up to 2.0GHz. This SBC is packed with rich interfaces and boasts powerful computing and AI capabilities, making it an ideal RISC-V intelligent hardware platform for hobbyists, makers, engineers, teachers, and students.</p>
            <div className={styles.learnMore_use}>
              <Link href='/meles'>Learn More</Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}>Buy New</div>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-meles-view.webp' alt='Meles' />
          </div>
        </div>
      </div >
    </>
  )
}
const Vega_module = (props) => {
  const [pioneer, setPionner] = useState(false)
  const pionnerStart = () => {
    setPionner(false)
  }
  return (
    <>
      <BuyPop flag={pioneer} module={pionnerStart} type='vega' />
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Vega</h2>
            <p>Milk-V Vega is a compact and low-density box-style open-source 10 Gigabit network switch developed by Milk-V for the next generation of network architecture. It serves as a unified platform for various services such as broadband, voice, video, and surveillance.</p>
            <div className={styles.learnMore_use}>
              <Link href='/vega'>Learn More</Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}>Buy New</div>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-vega-view.webp' alt='Vega' />
          </div>
        </div>
      </div >
    </>
  )
}
const Home_web = () => {
  const [index, setIndex] = useState(1)
  const tabs = [
    { name: 'Duo', index: 1, element: <Duo_module /> },
    { name: 'Pioneer', index: 2, element: <Pionner_module /> },
    { name: 'Mars', index: 3, element: <Mars_module /> },
    { name: 'Meles', index: 4, element: <Meles_module /> },
    { name: 'Vega', index: 5, element: <Vega_module /> },
  ];


  return (
    <>
      <div className={styles.home_header}>
        <div className={styles.header_title}>
          <h1>"As Many RISC-V as the <br></br> Stars in the Milky Way."</h1>
          <div className={styles.button_use}>
            <Link href='https://community.milkv.io/'>Milk-V Comunity</Link>
            <Link to='/about'>Why RISC-V ?</Link>
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
            <h1>Milk-V Documents</h1>
            <p>View our documentation for technical support</p>
          </div>
          <Link to='/docs/home' className={styles.docs_a}>Learn More</Link>
        </div>
        <ContactBar product='home' />
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

