import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import BuyPop from "../components/BuyPop"
import Footer from "../components/Footer"
import ContactBar from "../components/ContactBar"


import Translate from '@docusaurus/Translate';

function HomepageHeader() {
  const [duo, setDuo] = useState(false)
  const [pioneer, setPioneer] = useState(false)
  const [mars, setMars] = useState(false)
  const [buy, setBuy] = useState(false)

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
    </>

  )
}

export default function Home() {
  return (
    <>
      <Layout>
        <HomepageHeader />
        <Footer></Footer>
      </Layout>
    </>
  );
}

