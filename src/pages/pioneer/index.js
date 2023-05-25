import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from "../../components/Head"
import Link from '@docusaurus/Link';

import cCss from "./center.module.css"

function Center() {


  return (
    <div className={cCss.centerBox}>
      <div className={cCss.bigimg}>
        <div className={cCss.center_Box}>
          <div className={cCss.pagBox}></div>
          <div className={cCss.titleBox}>
            <h1>Milk-V Pioneer</h1>
            <p>Make native RISC-V development possible</p>
            <div className={cCss.buy}>
              <Head type='pioneer' />
            </div>
          </div>
        </div>
      </div>
      <div className={cCss.startbox}>
        <div className={cCss.title2}>Specification</div>
        <div className={cCss.power}>
          <div className={cCss.power1}>
            <h1>Powered by SOPHON SG2042</h1>
            <div className={cCss.powerimg}></div>
          </div>
          <div className={cCss.power2}>
            <div className={cCss.power2_txt}>64 Core RISC-V CPU</div>
            <div className={cCss.power2_1}>
              <p>Main Frequency</p>
              <p>L1 Cache</p>
              <p>L2 Cache</p>
              <p>L3 Cache</p>
              <p>Typical power consumption</p>
              <p>DDR</p>
              <p>PCI-E</p>
            </div>
            <div className={cCss.power2_2}>
              <p>2GHz</p>
              <p>I:64KB and D:64KB</p>
              <p>1MB/Cluster</p>
              <p>64MB System Cache</p>
              <p>120W</p>
              <p>4 channel 3200Hz ECC RDIMM/UDIMM/SODIMM</p>
              <p>2 x 16x Gen4 with CCIX support</p>
            </div>
          </div>
        </div>
        <div className={cCss.title7}>Pioneer Board</div>
        <div className={cCss.RichImg}></div>
        <div className={cCss.title3}>Pioneer Box</div>
        <div className={cCss.pionBox}>
          <div className={cCss.pionBox_1}>
            <div className={cCss.pionBox_1_img}></div>
          </div>
          <div className={cCss.pionBox_2}>
            <ul>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_1}>AMD R5 230</h1>
                <div>Graphic Card</div>
                <div className={cCss.show1}></div>
              </li>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_2}>Intel X520-DA2</h1>
                <div>Network Card </div>
                <div className={cCss.show2}></div>
              </li>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_3}>MSI A350 350W</h1>
                <div>Power</div>
                <div className={cCss.show3}></div>
              </li>
            </ul>
          </div>
          <div className={cCss.pionBox_3}>
            <ul>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_1}>32GB / 128GB 3200MHz</h1>
                <div>DDR4</div>
                <div className={cCss.show1}></div>
              </li>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_2}>1TB</h1>
                <div>PCIe 3.0 SSD</div>
                <div className={cCss.show2}></div>
              </li>
              <li>
                <p>equipped with </p>
                <h1 className={cCss.h1_3}>RGB</h1>
                <div>Cooler</div>
                <div className={cCss.show3}></div>
              </li>
            </ul>
          </div>
        </div>
        <div className={cCss.title8}>Software Support</div>
        <ul className={cCss.list1}>
          <li className={cCss.div_on1}><div></div></li>
          <li className={cCss.div_on2}><div></div></li>
          <li className={cCss.div_on3}><div></div></li>
          <li className={cCss.div_on4}><div></div></li>
        </ul>
        <ul className={cCss.list2}>
          <li>
            <div className={cCss.div_on5}></div>
          </li>
          <li>
            <div className={cCss.div_on6}></div>
          </li>
          <li>
            <div className={cCss.div_on7}></div>
          </li>
        </ul>
        <div className={cCss.title4}>Really Useful</div>
        <div className={cCss.bannerBox}>
          <div className={cCss.bannerimg1}>
            <div className={cCss.bannerimg1_1}></div>
            <div className={cCss.bannerT}>Workstation</div>
          </div>
          <div className={cCss.bannerimg2}>
            <div className={cCss.bannerimg2_1}></div>
            <div className={cCss.bannerT}>SWICH</div>
          </div>
          <div className={cCss.bannerimg3}>
            <div className={cCss.bannerimg3_1}></div>
            <div className={cCss.bannerT}>NAS</div>
          </div>
        </div>
      </div>
      <div className={cCss.footText}>
        <div className={cCss.chartTech}>
          <div className={cCss.title6}>Tech specs</div>
          <div className={cCss.tech_text1}>
            <p className={cCss.tech_p}>Milk-V Pioneer is a developer motherboard based on SOPHON SG2042 in a standard mATX form factor. With PC-like interfaces and PC industrial compability, Pioneer provides native RISC-V development environment and RISC-V desktop experience. It is the first choice for RISC-V developers and hardware pioneers to experience the cutting edge technology of RISC-V. Embrace RISC-V, embrace the future. </p>
          </div>
          <div className={cCss.tech_text2}>
            <h1 className={cCss.tech_title}>Hardware </h1>
            <h2>Pioneer Board</h2>
            <p className={cCss.tech_p_line}>- SOPHGO SG2042 Chip</p>
            <p className={cCss.tech_p_line}>- 64 Core RISC-V CPU up to 2GHz</p>
          </div>
          <div className={cCss.tech_text3}>
            <h1 className={cCss.tech_title}>Interface</h1>
            <h2>Pioneer Board</h2>
            <p className={cCss.tech_p_line}>- 4x DDR4 DIMM slots up to 128GB ram support</p>
            <p className={cCss.tech_p_line}>- 3x PCIe x16 Slot(PCIe 3.0 x8)</p>
            <p className={cCss.tech_p_line}>- 5x SATA</p>
            <p className={cCss.tech_p_line}>- 8x USB3</p>
            <p className={cCss.tech_p_line}>- 2x M.2 M KEY(PCIe 3.0 x4)</p>
            <p className={cCss.tech_p_line}>- 1x M.2 E KEY(PCIe 3.0 x1 + USB 2.0)</p>
            <p className={cCss.tech_p_line}>- 2x RJ45 2.5G</p>
            <p className={cCss.tech_p_line}>- 1x USB Header for front panel(2x USB 3.0)</p>
            <p className={cCss.tech_p_line}>- 1x misc header for front panel power, reset, LED etc</p>
            <p className={cCss.tech_p_line}>- 2x JTAG debug port</p>
            <p className={cCss.tech_p_line}>- 1x micro USB debug console</p>
            <p className={cCss.tech_p_line}>- 1x micro SD card for recovery or OS loading</p>
            <p className={cCss.tech_p_line}>- 1x SPI flash for BIOS</p>
          </div>
          <div className={cCss.tech_text4}>
            <h2>Pioneer Box</h2>
            <p className={cCss.box_tit}>Pioneer Box is a complete ready-to-use RISC-V PC with the following:</p>
            <p className={cCss.tech_p_line}>- 1x Pioneer Board</p>
            <p className={cCss.tech_p_line}>- 32GB / 128GB 3200 DDR4</p>
            <p className={cCss.tech_p_line}>- 1x 1TB PCIe 3.0 SSD</p>
            <p className={cCss.tech_p_line}>- 1x Intel X520-DA2 Network Card with 2x 10Gbps SFP ports</p>
            <p className={cCss.tech_p_line}>- 1x AMD R5 230 Graphic Card with HDMI, VGA and DVI</p>
            <p className={cCss.tech_p_line}>- 1x MSI A350 350W Power Apply</p>
            <p className={cCss.tech_p_line}>- 1x Cooler with PWM Fan up to 2300 RPM supporting up to 160W D-TDP</p>
            <p className={cCss.tech_p_line}>- White slim PC enclosure with handle</p>
          </div>
          <div className={cCss.document}>
            <h1>Documents</h1>
            <ul>
              <li>
                <div className={cCss.down}></div>
                <a className={cCss.link_down} style={{ textDecoration: 'none' }} href="/PioneerProductBriefv1.0.zip" download="PioneerProductBriefv1.0.zip">Pioneer Product Brief V1.0.zip</a>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cCss.on5_box}>
        <ul>
          <li className={cCss.li}>
            <h1 className={cCss.on5_box_h1}>[matrix]</h1>
            <p className={cCss.on5_box_p}>Join the Pioneer Matrix Chat channel to share your ideas with the developers all around the world.</p>
            <div className={cCss.on5_bottom}>
              <Link to='https://matrix.to/#/#milkv-pioneer:matrix.org' style={{ textDecoration: 'none', color: '#fff' }}>Join #milkv-pioneer</Link>
            </div>
          </li>
          <li className={cCss.li}>
            <h1 className={cCss.on5_box_h1}>WeChat</h1>
            <div className={cCss.on5_img}></div>
          </li>
          <li className={cCss.li}>
            <h1 className={cCss.on5_box_h1}>QQ Group</h1>
            <div className={cCss.on5_img_QQ}></div>
          </li>
        </ul>
      </div>
      <div className={cCss.riscBg}>
        <h1 className={cCss.embrace}>Embrace the new era with Pioneer, </h1>
        <h1 className={cCss.risc_v}>Let's make RISC-V better together.</h1>
      </div>
    </div>
  )
}


export default function () {
  return (
    <>
      <Layout>
        <Center></Center>
      </Layout>
    </>
  )
}
