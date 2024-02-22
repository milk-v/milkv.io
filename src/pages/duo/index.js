import React, { useState } from 'react';
import Layout from '@theme/Layout';

import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
// import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"
import Link from '@docusaurus/Link';
import chips_s from '@site/src/components/ChipsView/index.module.css'
import styles from "./details.module.css"
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles_s from '../duo-s/index.module.css'

const download_data = require("@site/src/jsonFiles/downloadData.json")

function DetailsPage() {
  const [duo2, setDuo2] = useState(false)
  const [down_filter_idx, setDown_filter_idx] = useState(0)

  const currentLanguage = useBaseUrl('/');
  const curren_language = currentLanguage === '/zh/' ? 'duo_zh' : 'duo'

  console.log(download_data[curren_language]);
  const duoStart = () => {
    setDuo2(false)
  }

  return (
    <>
      <BuyPop flag={duo2} module={duoStart} type='duo' />
      <div style={{
        position: "relative",
        width: '100%',
        height: '100%',
        overflow: "hidden",
        backgroundColor: '#151515'
      }}>
        <div className={styles.titleBox}>
          <p className={styles.meet}><Translate id='Duo.text.title1' /></p>
          <h2 className={styles.titleTxt}>Milk-V <Translate id='duo' /></h2>
          <h2 className={styles.textLine}><Translate id='Duo.text.title2' /></h2>
          <p className={styles.low}><Translate id='Duo.text.title3' /></p>
          <h3 className={styles.starting}><Translate id='Startingfrom' /><span>$5</span></h3>
          <div className={styles.btnbuy} onClick={() => setDuo2(buy => !buy)}><Translate id='Buy.now' /></div>
          <p className={styles.tax}>(*<Translate id='Duo.text.title4' />)</p>
        </div>
        <div className={styles.rotateImg}></div>
        <div className={styles.content_box}>
          <div className={styles.storage}>
            <div className={styles.left_view}>
              <p className={styles.view_title} style={{ position: 'relative', zIndex: '20' }}><Translate id='manykernels' /></p>
              <div className={styles.mb64}>64MB</div>
              <div className={styles.mb256}>256MB</div>
              <span>new</span>
            </div>
            <div className={styles.right_view}>
              <p className={styles.max_title}><Translate id='large' /></p>
              <p className={styles.min_title}><Translate id='DualCore' /></p>
              <img src='/duo/comparison-chart.webp' className={styles.chat256} alt='Comparison Chart' />
              <img src='/duo/1ghz.svg' className={styles.right_ghz} alt='1GHz' />
            </div>
          </div>
          <div className={styles.chips_diagram}>
            <div>
              <h3><Translate id='CV1800BDiagram' /></h3>
              <img src='/chips/cv1800b/cv1800B-diagram.webp' alt='CV1800B Diagram' />
            </div>
            <div>
              <h3><Translate id='SG2002Diagram' /></h3>
              <img src='/chips/sg2002/sg2002-diagram.webp' alt='SG2002 Diagram' />
            </div>
          </div>
          <ul className={styles.support_ul}>
            <li>
              <p><Translate id='architectures' /></p>
            </li>
            <li>
              <p><Translate id='Dual-systeCapable' /></p>
            </li>
            <li>
              <p><Translate id='chipOpen-source' /></p>
            </li>
          </ul>
          <div className={styles.peripherals}>
            <p>
              <Translate id='Interfaces' />
            </p>
          </div>
          <ul className={styles.audio_size_access}>
            <li>
              <p> <Translate id='AUDIO' /></p>
            </li>
            <li>
              <p className={styles.size_p}> <Translate id='Lightweight' /></p>
            </li>
            <li>
              <p> <Translate id='Boards' /></p>
            </li>
          </ul>
          <div className={styles.techspec_module}>
            <h2><Translate id='line.title.TechSpecs' /></h2>
            <p className={styles.techspec_info}>
              <Translate id='duo.info.text.Introduction.max' />
            </p>
            <h3>
              <Translate id='duo.info.text.Hardware' />
            </h3>
            <table className={styles.duo_techspec_table}>
              <tbody>
                <tr>
                  <td className={styles.tr_width}></td>
                  <td colSpan="2">Duo</td>
                  <td colSpan="2">Duo 256M</td>
                  <td colSpan="2">Duo S</td>

                </tr>
                <tr>
                  <td>SoC</td>
                  <td colSpan="2">CVITEK CV1800B</td>
                  <td colSpan="2"><font color='#2d88c9'>SG2002</font></td>
                  <td colSpan="2"><font color='#2d88c9'>SG2000</font></td>
                </tr>
                <tr>
                  <td>RISC-V CPU</td>
                  <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                  <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                  <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                </tr>
                <tr>
                  <td>Arm CPU</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2"><font color='#2d88c9'>1xCortex-A53 @ 1GHz</font></td>
                  <td colSpan="2"><font color='#2d88c9'>1xCortex-A53 @ 1GHz</font></td>
                </tr>
                <tr>
                  <td>MCU</td>
                  <td colSpan="2">8051@8KB SRAM</td>
                  <td colSpan="2">8051@6KB SRAM</td>
                  <td colSpan="2">8051@6KB SRAM</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td colSpan="2">SIP DRAM 64MB</td>
                  <td colSpan="2"><font color='#2d88c9'>SIP DRAM 256MB</font></td>
                  <td colSpan="2"><font color='#2d88c9'>SIP DRAM 512MB</font></td>
                </tr>
                <tr>
                  <td>TPU</td>
                  <td colSpan="2">0.5TOPS@INT8</td>
                  <td colSpan="2"><font color='#2d88c9'>1TOPS@INT8</font></td>
                  <td colSpan="2">0.5TOPS@INT8</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td colSpan="2">1x microSD connector or
                    1x SD NAND on board</td>
                  <td colSpan="2">1x microSD connector or
                    1x SD NAND on board</td>
                  <td colSpan="2">1x microSD connector<br />
                    <font color='#2d88c9'> 1x eMMC Pad on board</font></td>
                </tr>
                <tr>
                  <td>USB</td>
                  <td colSpan="2">1 x Type-C for power and data,
                    USB Pads available</td>
                  <td colSpan="2">1 x Type-C for power and data, USB Pads available</td>
                  <td colSpan="2">
                    1 x Type-C for power and data or <font color='#2d88c9'>1x USB 2.0 A Port HOST</font>
                    <br />
                    <p style={{ color: 'red', lineHeight: '120%' }} className={styles_s.note_red}>Note: Cannot be used at the same time, supports switching via terminal commands</p>
                  </td>
                </tr>
                <tr>
                  <td>CSI</td>
                  <td colSpan="2">1x 16P FPC connector
                    (MIPI CSI 2-lane)</td>
                  <td colSpan="2">1x 16P FPC connector
                    (MIPI CSI 2-lane)</td>
                  <td colSpan="2">1x 16P FPC connector
                    (MIPI CSI 2-lane),
                    <font color='#2d88c9'>1x 15P FPC connector (MIPI CSI 2-lane)</font></td>
                </tr>
                <tr>
                  <td>Sensor Support</td>
                  <td colSpan="2">4M@25fps </td>
                  <td colSpan="2"><font color='#2d88c9'>5M@30fps<br /></font></td>
                  <td colSpan="2"><font color='#2d88c9'>5M@30fps<br /></font></td>
                </tr>
                <tr>
                  <td>DSI</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2"><font color='#2d88c9'>Via GPIO Header (MIPI DSI 4-lane)</font></td>
                </tr>
                <tr>
                  <td>Ethernet</td>
                  <td colSpan="2">100Mbps ethernet with PHY</td>
                  <td colSpan="2">100Mbps ethernet with PHY</td>
                  <td colSpan="2"><font color='#2d88c9'>100Mbps ethernet port(RJ45) onboard</font></td>
                </tr>
                <tr>
                  <td>Wireless</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2">Optional WI-FI6/BT5 onboard</td>
                </tr>
                <tr>
                  <td>Audio</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2"><font color='#2d88c9'>Via GPIO Pads</font></td>
                  <td colSpan="2"><font color='#2d88c9'>Via GPIO Pin</font></td>
                </tr>
                <tr>
                  <td>GPIO</td>
                  <td colSpan="2">Up to 26x GPIO Pads</td>
                  <td colSpan="2">Up to 26x GPIO Pads</td>
                  <td colSpan="2">Up to 39x GPIO Pin (Via 2x 26Pin GPIO Header)</td>
                </tr>
                <tr>
                  <td>Power</td>
                  <td colSpan="2">5V/1A</td>
                  <td colSpan="2">5V/1A</td>
                  <td colSpan="2">5V/1A</td>
                </tr>
                <tr>
                  <td>OS Support</td>
                  <td colSpan="2">Linux, RTOS</td>
                  <td colSpan="2">Linux, RTOS</td>
                  <td colSpan="2">Linux, RTOS</td>
                </tr>
                <tr>
                  <td>Dimension</td>
                  <td colSpan="2">21mm x 51mm</td>
                  <td colSpan="2">21mm x 51mm</td>
                  <td colSpan="2">43mm x 43mm</td>
                </tr>
                <tr>
                  <td>Others</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2">N/A</td>
                  <td colSpan="2">1x BOOT Switch,
                    1x Recovery Key,
                    1x Reset Key </td>
                </tr>
              </tbody>
            </table>
            <h3>
              <Translate id='duo.info.text.pinOut' />
            </h3>
            <h4>
              - Duo / Duo 256M
            </h4>
            <img src='/duo/duo-pinout.webp' className={styles.duo_pinout} alt='Pinout' />
            <h3><Translate id='duo.info.text.Documents' /></h3>
          </div>
          <div className={styles.document}>
            <div className={chips_s.download_link}>
              <div className={chips_s.radio_input}>
                <p><Translate id="SelectionMethod" /></p>
                {
                  Object.keys(download_data[curren_language]).map((item, key) => {
                    return (
                      <label key={key}>
                        <input type="radio" name="Resources" value={item}
                          checked={key === down_filter_idx}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDown_filter_idx(key)
                            }
                          }}
                        />
                        <span style={{ color: "#fff" }}>{item}</span>
                      </label>
                    )
                  })
                }
              </div>
              <div className={chips_s.download_list}>
                <p style={{ color: "#fff" }}>{Object.keys(download_data[curren_language])[down_filter_idx]}</p>
                <ul>
                  {
                    download_data[curren_language][Object.keys(download_data[curren_language])[down_filter_idx]].map((item, key) => {
                      return <li key={key}>
                        <Link to={item.file_url}>{item.file_name}</Link>
                        <p style={{ color: "#fff" }}><span>{item.file_format}</span> <span>{item.file_date}</span> <span>{item.file_size}</span></p>
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ContactUs product='duo' />
        {/* <ContactBar product='duo' /> */}
      </div>
    </>
  )
}

export default function () {
  return (
    <>
      <Layout>
        <MetaData page='duo' />
        <DetailsPage></DetailsPage>
      </Layout>
    </>
  )
}
