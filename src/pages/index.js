import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import BuyPop from "../components/BuyPop"
import Footer from "../components/Footer"
import ContactBar from "../components/ContactBar"


import Translate from '@docusaurus/Translate';
const Duo_list = () => {
  return (
    <>


    </>
  )
}



const Home_web = () => {
  const [duo, setDuo] = useState(false)
  const [pioneer, setPioneer] = useState(false)
  const [mars, setMars] = useState(false)
  const [buy, setBuy] = useState(false)


  const [index, setIndex] = useState(1)

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
      <div className={styles.home_header}>
        <div className={styles.header_title}>
          <h1>"As many RISC-V as the <br></br> stars in the Milky Way"</h1>
          <div className={styles.button_use}>
            <Link href=''>Comunity</Link>
            <Link href=''>Learn More</Link>
          </div>
        </div>
      </div>
      <div className={styles.black_shore}>
        <ul className={styles.tab}>
          <li styles><p>Duo</p></li>
          <li><p>Pioneer</p></li>
          <li><p>Mars</p></li>
          <li><p>Meles</p></li>
          <li><p>Vega</p></li>
        </ul>
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

