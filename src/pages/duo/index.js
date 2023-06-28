import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import Head from "../../components/Head"
import ContactUs from "../../components/ContactUs"
import PopUp from "../../components/Popup"
import Link from '@docusaurus/Link';
import Footer from "../../components/Footer"
import cssList from "./details.module.css"
import Translate from '@docusaurus/Translate';

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
          <p className={cssList.meet}><Translate id='Duo.text.title1' /></p>
          <h1 className={cssList.titleTxt}>Milk-V Duo</h1>
          <h2 className={cssList.textLine}><Translate id='Duo.text.title2' /></h2>
          <p className={cssList.low}><Translate id='Duo.text.title3' /></p>
          <div className={cssList.btnbuy} onClick={() => setDuo2(buy => !buy)}><Translate id='Buy.now' /></div>
          <p className={cssList.tax}>*<Translate id='Duo.text.title4' /></p>
        </div>
        <div className={cssList.rotateImg}></div>
        <div className={cssList.title2}><Translate id='line.title.Specification' /></div>
        <div className={cssList.chartBox}>
          <h1 className={cssList.chartTitle}><Translate id='info.text.powerful' /></h1>
          <p className={cssList.chartTitle2}><Translate id='info.text.CPU' /></p>
          <div className={cssList.largeText}>
            <p className={cssList.one1}>1</p>
            <p>
              <span className={cssList.spanG} >G</span>
              <span className={cssList.spanHz}>Hz</span>
            </p>
          </div>
          <p className={cssList.vector}><Translate id='info.text.Vector' /></p>
          <div className={cssList.shadow3}></div>
          <div className={cssList.shadow4}></div>
          <div className={cssList.Ghzbox}> </div>
        </div>
        <div className={cssList.exhibits}>
          <div className={cssList.group2}>
            <div className={cssList.textList}><Translate id='info.text.Ethernet' /></div>
            <div className={cssList.exhibitsImg}></div>
          </div>
          <div className={cssList.micBox}>
            <div className={cssList.micList1}>
              <div className={cssList.frame1}></div>
              <p><Translate id='info.text.MicroSD' /></p>
              <div className={cssList.shadow6}></div>
            </div>
            <div className={cssList.micList2}>
              <div className={cssList.frame2}></div>
              <p><Translate id='info.text.RAM' /></p>
              <div className={cssList.shadow7}></div>
            </div>
          </div>
          <div className={cssList.footerText}><h1>40P GPIO</h1></div>
          <div className={cssList.bigExhibits}>
            <div className={cssList.head}><Translate id='info.text.Incredible' /></div>
            <div className={cssList.support}><Translate id='info.text.support' /></div>
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
          <div className={cssList.title3}><Translate id='line.title.size' /></div>
        </div>
        <div className={cssList.bannerList} >
          <div ref={banner} style={{
            transform: `translateX(${num}px)`,
            transition: '1s'
          }}>
            <div className={cssList.bannerimg1}>
              <div className={cssList.img1} ></div>
              <p><Translate id='info.text.size.title1' /></p>
            </div>
            <div className={cssList.bannerimg2}>
              <div className={cssList.img2} ></div>
              <p><Translate id='info.text.size.title2' /></p>
            </div>
            <div className={cssList.bannerimg3}>
              <div className={cssList.img3} ></div>
              <p><Translate id='info.text.size.title3' /></p>
            </div>
            <div className={cssList.bannerimg4}>
              <div className={cssList.img4} ></div>
              <p><Translate id='info.text.size.title4' /></p>
            </div>
            <div className={cssList.bannerimg5}>
              <div className={cssList.img5} ></div>
              <p><Translate id='info.text.size.title5' /></p>
            </div>
          </div>
          <div className={cssList.prev} onClick={() => onPrve()}></div>
          <div className={cssList.next} onClick={() => onNext()}></div>
        </div>
        <div className={cssList.chartTech}>
          <div className={cssList.title4}><Translate id='line.title.TechSpecs' /></div>
          <div className={cssList.tech_text1}>
            <h1 className={cssList.tech_title}><Translate id='duo.info.text.Introduction' /></h1>
            <p className={cssList.tech_p}><Translate id='duo.info.text.Introduction.max' /></p>
          </div>
          <div className={cssList.tech_text2}>
            <h1 className={cssList.tech_title}><Translate id='duo.info.text.Hardware' /></h1>
            <p className={cssList.tech_p_line}>- CVITEK CV1800B (C906@1Ghz + C906@700MHz)</p>
            <p className={cssList.tech_p_line}>- <Translate id='duo.Hardware.info1' /></p>
            <p className={cssList.tech_p_line}>- <Translate id='info.text.RAM' /></p>
            <p className={cssList.tech_p_line}>- <Translate id='duo.Hardware.info2' /></p>
            <p className={cssList.tech_p_line}>- <Translate id='duo.Hardware.info3' /></p>
          </div>
          <h1 className={cssList.tech_title3}><Translate id='duo.info.text.pinOut' /></h1>
          <div className={cssList.pinImg}></div>
          <div className={cssList.document}>
            <h1><Translate id='duo.info.text.Documents' /></h1>
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
          <h1 className={cssList.embrace}><Translate id='duo.embrace1' /></h1>
          <h1 className={cssList.risc_v}><Translate id='duo.embrace2' /></h1>
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
        <PopUp></PopUp>
        <Footer></Footer>
      </Layout>
    </>
  )
}
