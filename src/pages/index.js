import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';
import { useHistory } from '@docusaurus/router';
import BuyPop from "../components/BuyPop"
import SupportUs from "../components/SupportUs"
import ContactBar from "../components/ContactBar"
import MetaData from "../components/MetaData"

const Chips_module = () => {
  const history = useHistory()

  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <ul className={styles.chips_list}>
            <li className={styles.right_line}>
              <img src='/home/sg2000.webp' alt='SG2000' onClick={() => { history.push("/chips/sg2000") }} />
              <Link to='/chips/sg2000'>SG2000</Link>
            </li>
            <li className={styles.right_line}>
              <img src='/home/sg2002.webp' alt='SG2002' onClick={() => { history.push("/chips/sg2002") }} />
              <Link to='/chips/sg2002'>SG2002</Link>
            </li>
            <li>
              <img src='/home/cv1800b.webp' alt='CV1800B' onClick={() => { history.push("/chips/cv1800b") }} />
              <Link to='/chips/cv1800b'>CV1800B</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

const Duo_module = (props) => {
  const [duo, setDuo] = useState(false)
  const duoStart = () => {
    setDuo(false)
  }
  return (
    <>
      <BuyPop flag={duo} module={duoStart} type='duo' />
      <div className={styles.info_module}>
        <div className={styles.view_mian}>
          <div className={styles.left}>
            <h2>Milk-V Duo</h2>
            <p>Series</p>
          </div>
          <div className={styles.right}>
            <div className={styles.right_img}>
              <img src='/home/home-dous-view.webp' alt='Duo S' />
            </div>
            <div className={styles.right_text}>
              <h2>Milk-V Duo S</h2>
              <p>Dual cores up to 1GHz (optional RISC-V / ARM), up to 512MB of memory, and a 1TOPS@INT8 TPU.  It integrates wireless capabilities with WI-FI 6/BT 5, and comes equipped with a USB 2.0 HOST interface and a 100Mbps Ethernet port for user convenience. Supporting dual cameras (2x MIPI CSI 2-lane) and MIPI video output (MIPI DSI 4-lane).</p>
              <div className={styles.learnMore_use}>
                <Link href='/duo-s'><Translate id='homepage.corporations.marslearnmore' /></Link>
                <div className={styles.buy_button} onClick={() => { setDuo(true) }}><Translate id='homepage.corporations.marsbuynow' /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Duo</h2>
            <h3>Now Duo</h3>
            <div className={styles.vis_link}>
              <Link>Duo</Link>
              |
              <Link>Duo 256M</Link>
            </div>
            <p className={styles.duo_info_p}><Translate id='homepage.corporations.duo' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/duo'><Translate id='homepage.corporations.duolearnmore' /></Link>
              <div className={styles.buy_button} onClick={() => { setDuo(true) }}><Translate id='homepage.corporations.duobuynow' /></div>
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
            <p><Translate id='homepage.corporations.pioneer' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/pioneer'><Translate id='homepage.corporations.pioneerlearnmore' /></Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}><Translate id='homepage.corporations.pioneerbuynow' /></div>
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
              <p><Translate id='homepage.corporations.marscm' /></p>
              <div className={styles.learnMore_use}>
                <Link href='/mars-cm'><Translate id='homepage.corporations.marslearnmore' /></Link>
                <div className={styles.buy_button} onClick={() => { setMarscm(true) }}><Translate id='homepage.corporations.marsbuynow' /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Mars</h2>
            <p><Translate id='homepage.corporations.mars' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/mars'><Translate id='homepage.corporations.marslearnmore' /></Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}><Translate id='homepage.corporations.marsbuynow' /></div>
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
            <p><Translate id='homepage.corporations.meles' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/meles'><Translate id='homepage.corporations.meleslearnmore' /></Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}><Translate id='homepage.corporations.melesbuynow' /></div>
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
            <p><Translate id='homepage.corporations.vega' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/vega'><Translate id='homepage.corporations.vegalearnmore' /></Link>
              <div className={styles.buy_button} onClick={() => { setPionner(true) }}><Translate id='homepage.corporations.vegabuynow' /></div>
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
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false);
  const tabs = [
    { name: 'Duo', index: 0, element: <Duo_module /> },
    { name: 'Pioneer', index: 1, element: <Pionner_module /> },
    { name: 'Mars', index: 2, element: <Mars_module /> },
    { name: 'Meles', index: 3, element: <Meles_module /> },
    { name: 'Vega', index: 4, element: <Vega_module /> },
    { name: 'Chips', index: 5, element: <Chips_module /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && window.innerWidth > 750) {
        setIndex(prevCount => (prevCount === 5 ? 0 : prevCount + 1));
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    }
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <>
      <div className={styles.home_header}>
        <div className={styles.header_title}>
          <h1>"<Translate id='Embracing' />"</h1>
          <div className={styles.button_use}>
            <Link href='https://community.milkv.io/'><Translate id='homepage.corporations.CommunityBotton' /></Link>
            <Link to='/about'><Translate id='homepage.corporations.WhyRVBotton' /></Link>
          </div>
        </div>
      </div>
      <div className={styles.black_shore}>
        <ul className={styles.tab} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {tabs.map((tab, idx) => (
            <li key={idx} className={index === tab.index ? styles.index : null} onClick={() => {
              setIndex(tab.index)
              setIsPaused(true);
            }}>
              <p>{tab.name}</p>
            </li>
          ))}
        </ul>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {
            tabs.filter((tab, idx) => {
              return tab.index === index
            })[0].element
          }
        </div>
        <div className={styles.docs_link}>
          <img src='/home/milkv-docs-logo.svg' alt='milkv docs' />
          <div className={styles.docs_info}>
            <h2><Translate id='homepage.corporations.Documentstitle' /></h2>
            <p><Translate id='homepage.corporations.Documentswords' /></p>
          </div>
          <Link to='/docs' className={styles.docs_a}><Translate id='homepage.corporations.docslearnmore' /></Link>
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
        <MetaData page='home' />
        <Home_web />
      </Layout>
    </>
  );
}

