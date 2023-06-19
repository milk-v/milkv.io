import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import Head from "../../components/Head"
import ContactUs from "../../components/ContactUs"
import Link from '@docusaurus/Link';
import cssList from "./details.module.css"

function DetailsPage() {
  const [num, setNum] = useState(0)
  const banner = useRef()
  const [duo2, setDuo2] = useState(false)

  const duoStart = () => {
    setDuo2(false)
  }
  const onPrve = () => {
    if (num == 0) return
    setNum((num) => num + (banner.current.offsetWidth / 3))
  }
  const onNext = () => {
    if (num === -(2 * (banner.current.offsetWidth / 3))) return
    setNum((num) => num - (banner.current.offsetWidth / 3))
  }

  return (
    <>
      <Head flag={duo2} module={duoStart} type='duo' />
      <div style={{
        position: "relative",
        width: '100%',
        height: '100%',
        overflow: "hidden",
        backgroundColor: '#000'
      }}>
        <div className={cssList.titleBox}>
          <p className={cssList.meet}>Meet</p>
          <h1 className={cssList.titleTxt}>Milk-V Duo</h1>
          <h2 className={cssList.textLine}>A $9 RISC-V COMPUTER</h2>
          <p className={cssList.low}>Low cost, low power consumption, high performance</p>
          <div className={cssList.btnbuy} onClick={() => setDuo2(buy => !buy)}>Buy Now</div>
          <p className={cssList.tax}>*Tax or shipping is not included </p>
        </div>
        <div className={cssList.rotateImg}></div>
        <div className={cssList.title2}>Specification</div>
        <div className={cssList.chartBox}>
          <h1 className={cssList.chartTitle}>More powerful than others</h1>
          <p className={cssList.chartTitle2}>RISC-V CPU up to</p>
          <div className={cssList.largeText}>
            <p className={cssList.one1}>1</p>
            <p>
              <span className={cssList.spanG} >G</span>
              <span className={cssList.spanHz}>Hz</span>
            </p>
          </div>
          <p className={cssList.vector}>Vector Acceleration</p>
          <div className={cssList.shadow3}></div>
          <div className={cssList.shadow4}></div>
          <div className={cssList.Ghzbox}> </div>
        </div>
        <div className={cssList.exhibits}>
          <div className={cssList.group2}>
            <div className={cssList.textList}>10/100Mbps Ethernet via optional add-on board</div>
            <div className={cssList.exhibitsImg}></div>
          </div>
          <div className={cssList.micBox}>
            <div className={cssList.micList1}>
              <div className={cssList.frame1}></div>
              <p>MicroSD support</p>
              <div className={cssList.shadow6}></div>
            </div>
            <div className={cssList.micList2}>
              <div className={cssList.frame2}></div>
              <p>64MB RAM</p>
              <div className={cssList.shadow7}></div>
            </div>
          </div>
          <div className={cssList.footerText}><h1>40P GPIO</h1></div>
          <div className={cssList.bigExhibits}>
            <div className={cssList.head}>Incredible, it's a computer!</div>
            <div className={cssList.support}>Support Asymmetric multiprocessing</div>
            <div className={cssList.btnBox}>

              <div className={cssList.shadow8}></div>
              <div className={cssList.shadow9}></div>
            </div>
          </div>
          <div className={cssList.lineChart}>
            <div className={cssList.shadow10}></div>
            <div className={cssList.shadow11}></div>
            <div className={cssList.lineBox}>
              <div className={cssList.line1}></div>
              <div className={cssList.line2}></div>
              <div className={cssList.line3}></div>
              <div className={cssList.line4}></div>
              <div className={cssList.lineGroup}></div>
              <div className={cssList.jj} ></div>
            </div>
          </div>
          <div className={cssList.title3}>Small size, big potentials</div>
        </div>
        <div className={cssList.bannerList} >
          <div ref={banner} style={{
            transform: `translateX(${num}px)`,
            transition: '1s'
          }}>
            <div className={cssList.bannerimg1}>
              <div className={cssList.img1} ></div>
              <p>Smart Door Lock</p>
            </div>
            <div className={cssList.bannerimg2}>
              <div className={cssList.img2} ></div>
              <p>Intelligent Monitoring</p>
            </div>
            <div className={cssList.bannerimg3}>
              <div className={cssList.img3} ></div>
              <p>Smart Street Light </p>
            </div>
            <div className={cssList.bannerimg4}>
              <div className={cssList.img4} ></div>
              <p>Traffic Monitoring </p>
            </div>
            <div className={cssList.bannerimg5}>
              <div className={cssList.img5} ></div>
              <p>Pedestrian Detection</p>
            </div>
          </div>
          <div className={cssList.prev} onClick={() => onPrve()}></div>
          <div className={cssList.next} onClick={() => onNext()}></div>
        </div>
        <div className={cssList.chartTech}>
          <div className={cssList.title4}>Tech specs</div>
          <div className={cssList.tech_text1}>
            <h1 className={cssList.tech_title}>Introduction</h1>
            <p className={cssList.tech_p}>Milk-V Duo is an ultra-compact embedded development platform based on the CV1800B chip. It can run Linux and RTOS, providing a reliable, low-cost, and high-performance platform for professionals, industrial ODMs, AIoT enthusiasts, DIY hobbyists, and creators.</p>
          </div>
          <div className={cssList.tech_text2}>
            <h1 className={cssList.tech_title}>Hardware </h1>
            <p className={cssList.tech_p_line}>- CVITEK CV1800B (C906@1Ghz + C906@700MHz)</p>
            <p className={cssList.tech_p_line}>- Dual RV64 Core up to 1GHz</p>
            <p className={cssList.tech_p_line}>- 64MB RAM</p>
            <p className={cssList.tech_p_line}>- Provides 10/100Mbps Ethernet via optional add-on board</p>
            <p className={cssList.tech_p_line}>- technology supports running both Linux and RTOS</p>
          </div>
          <h1 className={cssList.tech_title3}>Pin Out</h1>
          <div className={cssList.pinImg}></div>
          <div className={cssList.document}>
            <h1>Documents</h1>
            <ul>
              <li>
                <div className={cssList.down}></div>
                <a className={cssList.link_down} style={{ textDecoration: 'none' }} href="/files/duo/duo-schematic-v1.1.pdf" download="duo-schematic-v1.1.pdf">Duo Schematic v1.1, PDF</a>
              </li>
              <li>
                <span className={cssList.down}></span>
                <a className={cssList.link_down} style={{ textDecoration: 'none' }} href="/files/duo/duo-mechanical-drawings-v1.1.zip" download="duo-mechanical-drawings-v1.1.zip">Duo Mechanical Drawings v1.1, DXF</a>
              </li>
              <li>
                <span className={cssList.down}></span>
                <a className={cssList.link_down} style={{ textDecoration: 'none' }} href="/files/duo/duo-schematic-library-v1.2.olb" download="duo-schematic-library-v1.2.olb">Duo Schematic Library v1.2, OLB</a>
              </li>
              <li>
                <span className={cssList.down}></span>
                <a className={cssList.link_down} style={{ textDecoration: 'none' }} href="/files/duo/duo-pcb-footprint-v1.2.dra" download="duo-pcb-footprint-v1.2.dra">Duo PCB Footprint v1.2, DRA</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={cssList.shadow1}></div>
        <div className={cssList.shadow2}></div>
        <div className={cssList.shadow5}></div>
        <div className={cssList.shadow12}></div>
        <div className={cssList.shadow13}></div>
        <div className={cssList.shadow14}></div>
        <ContactUs product='duo' />
        <div className={cssList.on5_box}>
          <ul>
            <li className={cssList.li}>
              <h1 className={cssList.on5_box_h1}>[matrix]</h1>
              <p className={cssList.on5_box_p}>Join the Duo Matrix Chat channel to share your ideas with the developers all around the world.</p>
              <div className={cssList.on5_bottom}>
                <Link to='https://matrix.to/#/#milkv-duo:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}>Join #milkv-duo</Link>
              </div>
            </li>
            <li className={cssList.li}>
              <h1 className={cssList.on5_box_h1}>WeChat</h1>
              <div className={cssList.on5_img}></div>
            </li>
            <li className={cssList.li}>
              <h1 className={cssList.on5_box_h1}>QQ Group</h1>
              <div className={cssList.on5_img_QQ}></div>
            </li>
          </ul>
        </div>
        <div className={cssList.riscBg}>
          <h1 className={cssList.embrace}>Embrace the new era with Duo, </h1>
          <h1 className={cssList.risc_v}>Let's make RISC-V better together.</h1>
        </div>
      </div>
    </>
  )
}

export default function () {
  return (
    <>
      <Layout>
        <DetailsPage></DetailsPage>
      </Layout>
    </>
  )
}
