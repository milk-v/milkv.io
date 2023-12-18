import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';

import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import Footer from "../../components/Footer"
import ContactBar from "../../components/ContactBar"
import MetaData from "../../components/MetaData"

import styles from "./details.module.css"
import Translate from '@docusaurus/Translate';

function DetailsPage() {
  const [duo2, setDuo2] = useState(false)

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
          <h3 className={styles.starting}>Starting from <span>$5</span></h3>
          <div className={styles.btnbuy} onClick={() => setDuo2(buy => !buy)}><Translate id='Buy.now' /></div>
          <p className={styles.tax}>(*<Translate id='Duo.text.title4' />)</p>
        </div>
        <div className={styles.rotateImg}></div>


        <div className={styles.content_box}>
          <div className={styles.storage}>
            <div className={styles.left_view}>
              <p className={styles.view_title}>Multiple Memory 0ptions<br /> Available for Selection</p>
              <div className={styles.mb64}>64MB</div>
              <div className={styles.mb256}>256MB</div>
              <span>new</span>
            </div>
            <div className={styles.right_view}>
              <p className={styles.max_title}>More Powerful than Others</p>
              <p className={styles.min_title}>Dual Core RISC-V CPU up to</p>
              <img src='/duo/comparison-chart.webp' className={styles.chat256} />
              <img src='/duo/1ghz.svg' className={styles.right_ghz} />
            </div>
          </div>
          <div className={styles.chips_diagram}>
            <div>
              <h3>CV1800B Architecture Diagram</h3>
              <img src='/chips/cv1800b/cv1800B-diagram.webp' alt='CV1800B Diagram' />
            </div>
            <div>
              <h3>SG2002 Architecture Diagram</h3>
              <img src='/chips/sg2002/sg2002-diagram.webp' alt='SG2002 Diagram' />
            </div>
          </div>
          <ul className={styles.support_ul}>
            <li>
              <p>Seamless switching between RISC-V and ARM architectures at the touch of a button</p>
            </li>
            <li>
              <p>Dual-systeCapable of running dual operating systems concurrentlym Operation</p>
            </li>
            <li>
              <p>All chip data is fully open-source</p>
            </li>
          </ul>
          <div className={styles.peripherals}>
            <p>
              Interfaces compatible with Raspberry Pi, featuring a rich array of peripherals
            </p>
          </div>
          <ul className={styles.audio_size_access}>
            <li>
              <p>Open AUDIO Interface</p>
            </li>
            <li>
              <p className={styles.size_p}>As Compact and Lightweight as Chewing Gum</p>
            </li>
            <li>
              <p>Extensive Range of Expansion Boards</p>
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
                  <td colSpan="2">Duo 256M</td>
                  <td colSpan="2">Duo</td>
                </tr>
                <tr>
                  <td>SoC</td>
                  <td colSpan="2">SG2002</td>
                  <td colSpan="2">CVITEK CV1800B</td>
                </tr>
                <tr>
                  <td>RISC-V CPU</td>
                  <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                  <td colSpan="2">C906@1Ghz + C906@700MHz</td>
                </tr>
                <tr>
                  <td>Arm CPU</td>
                  <td colSpan="2">1xCortex-A53 @ 1GHz</td>
                  <td colSpan="2">N/A</td>
                </tr>
                <tr>
                  <td>MCU</td>
                  <td colSpan="2">8051@6KB SRAM</td>
                  <td colSpan="2">N/A</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td colSpan="2">256MB DDR3</td>
                  <td colSpan="2">64MB DDR2</td>
                </tr>
                <tr>
                  <td>NPU</td>
                  <td colSpan="2">1Top @ INT8</td>
                  <td colSpan="2">0.5Top @ INT8</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td colSpan="2">1x microSD connector or
                    1x SD NAND on board</td>
                  <td colSpan="2">1x microSD connector or
                    1x SD NAND on board</td>
                </tr>
                <tr>
                  <td>USB</td>
                  <td colSpan="2">1 x Type-C for power and data, USB Pads available</td>
                  <td colSpan="2">1 x Type-C for power and data,
                    USB Pads available</td>
                </tr>
                <tr>
                  <td>CSI</td>
                  <td colSpan="2">1x 16P FPC connector
                    (MIPI CSI 2-lane)</td>
                  <td colSpan="2">1x 16P FPC connector
                    (MIPI CSI 2-lane)</td>
                </tr>
                <tr>
                  <td>Sensor Support</td>
                  <td colSpan="2">5M @ 30fps<br />100Mbps ethernet with PHY</td>
                  <td colSpan="2">4M @ 25fps <br />100Mbps ethernet with PHY</td>
                </tr>
                <tr>
                  <td>Audio</td>
                  <td colSpan="2">Via GPIO Pads</td>
                  <td colSpan="2">N/A</td>
                </tr>
                <tr>
                  <td>GPIO</td>
                  <td colSpan="2">26x GPIO Pads</td>
                  <td colSpan="2">26x GPIO Pads</td>
                </tr>
                <tr>
                  <td>Power</td>
                  <td colSpan="2">5V/1A</td>
                  <td colSpan="2">5V/1A</td>
                </tr>
                <tr>
                  <td>OS Support</td>
                  <td colSpan="2">Linux, RTOS</td>
                  <td colSpan="2">Linux, RTOS</td>
                </tr>
                <tr>
                  <td>Dimension</td>
                  <td colSpan="2">21mm x 51mm</td>
                  <td colSpan="2">21mm x 51mm</td>
                </tr>
              </tbody>
            </table>
            <h3>
              <Translate id='duo.info.text.pinOut' />
            </h3>
            <h4>
              - Duo / Duo 256M
            </h4>
            <img src='/duo/duo-pinout.webp' className={styles.duo_pinout} />
            <h3><Translate id='duo.info.text.Documents' /></h3>
          </div>
          <div className={styles.document}>
            <ul>
              <li>
                <div className={styles.down}></div>
                <a className={styles.link_down} style={{ textDecoration: 'none' }} href="https://github.com/milkv-duo/duo-files/tree/main/duo/hardware">Duo Datasheet, PDF</a>
              </li>
              <li>
                <div className={styles.down}></div>
                <a className={styles.link_down} style={{ textDecoration: 'none' }} href="https://github.com/milkv-duo/duo-files/tree/main/duo/hardware">Duo Schematic, PDF</a>
              </li>
              <li>
                <span className={styles.down}></span>
                <a className={styles.link_down} style={{ textDecoration: 'none' }} href="https://github.com/milkv-duo/duo-files/tree/main/duo/hardware">Duo Mechanical Drawings, DXF</a>
              </li>
              <li>
                <span className={styles.down}></span>
                <a className={styles.link_down} style={{ textDecoration: 'none' }} href="https://github.com/milkv-duo/duo-files/tree/main/duo/hardware">Duo Schematic Library, OLB</a>
              </li>
              <li>
                <span className={styles.down}></span>
                <a className={styles.link_down} style={{ textDecoration: 'none' }} href="https://github.com/milkv-duo/duo-files/tree/main/duo/hardware">Duo PCB Footprint, DRA</a>
              </li>
            </ul>
          </div>
        </div>
        <ContactUs product='duo' />
        <ContactBar product='duo' />
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
        <Footer></Footer>
      </Layout>
    </>
  )
}
