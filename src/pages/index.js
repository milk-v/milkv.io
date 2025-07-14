import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';
import { useHistory } from '@docusaurus/router';
import SupportUs from "../components/SupportUs"
import ContactBar from "../components/ContactBar"
import MetaData from "../components/MetaData"
import clsx from 'clsx';

const Chips_module = () => {
  const history = useHistory()

  return (
    <>
      <div className={styles.info_module}>
        <h2 className={styles.chips_title}>Buying RISC-V Chips from Milk-V</h2>
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
        <Link className={styles.chips_learn} to='/chips' >Learn More</Link>
      </div>
    </>
  )
}

const Duo_module = (props) => {
  return (
    <>
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
                <Link href='/duo-s' title='Duo S Details'><Translate id='homepage.corporations.marslearnmore' /></Link>
                <Link href='/duo-s#buy' className={styles.buy_button}><Translate id='homepage.corporations.marsbuynow' /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Duo</h2>
            <h3>Now Duo</h3>
            <div className={styles.vis_link}>
              <p>Duo</p>
              |
              <p>Duo 256M</p>
            </div>
            <p className={styles.duo_info_p}><Translate id='homepage.corporations.duo' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/duo' title='Duo Details'><Translate id='homepage.corporations.duolearnmore' /></Link>
              <Link href='/duo#buy' className={styles.buy_button} ><Translate id='homepage.corporations.duobuynow' /></Link>
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
  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Pioneer</h2>
            <p><Translate id='homepage.corporations.pioneer' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/pioneer' title='Pioneer Details'><Translate id='homepage.corporations.pioneerlearnmore' /></Link>
              <Link href='/pioneer#buy' className={styles.buy_button} ><Translate id='homepage.corporations.pioneerbuynow' /></Link>
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
  return (
    <>
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
                <Link href='/mars-cm#buy' className={styles.buy_button} ><Translate id='homepage.corporations.marsbuynow' /></Link>
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
              <Link href='/mars#buy' className={styles.buy_button} ><Translate id='homepage.corporations.marsbuynow' /></Link>
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
  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Meles</h2>
            <p><Translate id='homepage.corporations.meles' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/meles'><Translate id='homepage.corporations.meleslearnmore' /></Link>
              <Link href='/meles#buy' className={styles.buy_button}><Translate id='homepage.corporations.melesbuynow' /></Link>
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
const Jupiter_module = (props) => {
  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Jupiter</h2>
            <p><Translate id='homepage.corporations.jupiter' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/jupiter' title='Jupiter Details'><Translate id='homepage.corporations.pioneerlearnmore' /></Link>
              <Link href='/jupiter#buy' className={styles.buy_button} ><Translate id='homepage.corporations.pioneerbuynow' /></Link>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-jupiter-view.webp' alt='Jupiter' />
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
const Vega_module = (props) => {
  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Vega</h2>
            <p><Translate id='homepage.corporations.vega' /></p>
            <div className={styles.learnMore_use}>
              <Link href='/vega'><Translate id='homepage.corporations.vegalearnmore' /></Link>
              <Link href='/vega#buy' className={styles.buy_button} ><Translate id='homepage.corporations.vegabuynow' /></Link>
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

const Megrez_module = (props) => {
  return (
    <>
      <div className={styles.info_module}>
        <div className={styles.main_module}>
          <div className={styles.left_title}>
            <h2>Milk-V Megrez</h2>
            <p>Milk-V Megrez, a Mini-ITX device powered by the ESWIN EIC7700X, has a built-in quad-core SiFive P550 CPU for RISC-V native development. It offers a smooth desktop experience with a high-performance GPU and has a 19.95 TOPS NPU for local AI capabilities, marking a milestone in RISC-V desktop technology.</p>
            <div className={styles.learnMore_use}>
              <Link href='/megrez'><Translate id='homepage.corporations.vegalearnmore' /></Link>
              <Link href='/megrez#buy' className={styles.buy_button} ><Translate id='homepage.corporations.vegabuynow' /></Link>
            </div>
          </div>
          <div className={styles.right_img}>
            <img src='/home/home-megrez-view.webp' alt='megrez' />
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
    { name: 'Jupiter', index: 5, element: <Jupiter_module /> },
    { name: 'Megrez', index: 6, element: <Megrez_module /> },
    { name: 'Chips', index: 7, element: <Chips_module /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && window.innerWidth > 750) {
        setIndex(prevCount => (prevCount === 7 ? 0 : prevCount + 1));
      }
    }, 5000);

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
        <div className={styles.info_module} >
          <div className={clsx(styles.main_module, styles.titan_content)} style={{ height: 'auto' }}>
            <div className={clsx(styles.left_title, styles.titan_left)}>
              <h2 style={{ color: '#F5B21B' }}>Milk-V Titan</h2>
              <p className={styles.titan_text}>Undoubtedly, the Most Powerful<br /> RISC-V MINI-ITX</p>
              <div className={clsx(styles.learnMore_use, styles.titan_more)}>
                <Link href='/titan'><Translate id='homepage.corporations.vegalearnmore' /></Link>
                <Link href='/titan#buy' className={styles.buy_button} ><Translate id='homepage.corporations.vegabuynow' /></Link>
              </div>
            </div>
            <div className={styles.right_img}>
            </div>
          </div>
        </div >
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
          <Link to='/docs' title='MilkV Docs' className={styles.docs_a}><Translate id='homepage.corporations.docslearnmore' /></Link>
        </div>
        <ContactBar product='home' />
        <SupportUs />
      </div >
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

