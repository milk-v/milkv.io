import Layout from '@theme/Layout';
import styles from './index.module.css'
import Translate, { translate } from '@docusaurus/Translate';
import BuyPop from "../../components/BuyPop"
import ContactUs from "../../components/ContactUs"
import MetaData from "../../components/MetaData"
import styles_vega from "@site/src/pages/vega/index.module.css";
import clsx from 'clsx';
export default () => {
  return <Layout>
    <MetaData page='titan' />
    <div className={clsx(styles.module_styles, styles.title_module)}>
      <h2>Milk-V Titan</h2>
      <p><Translate id='page.titan.text1' /></p>
      <img src='/titan/titan-view.webp' alt='Milk-V Titan' />
    </div>
    <div className={styles.titan_main}>
      <div className={styles.chip_module}>
        <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}><Translate id='page.titan.text2' /></p>
        <div className={styles.chip_flex}>
          <div>
            <p className={styles.module_title2}
              dangerouslySetInnerHTML={{
                __html: translate({
                  id: "page.titan.text3",
                }),
              }}
            >
            </p>
            <span className={styles.ghzs}><Translate id='page.titan.text4' /> <font color='#2CCEFB'>2.0</font>GHz</span>
            <ul className={styles.ul_list}>
              <li><Translate id='page.titan.text5' /></li>
              <li><Translate id='page.titan.text6' /></li>
            </ul>
            <p className={styles.module_title2}><Translate id='page.titan.text7' /></p>
            <ul className={styles.ul_list}>
              <li
                dangerouslySetInnerHTML={{
                  __html: translate({
                    id: "page.titan.text8",
                  }),
                }}
              ></li>
              <li>SPECCPU2006 Single-Core <font color='#2CCEFB'>INT@10.4/GHz</font></li>
              <li>SPECCPU2006 Single-Core <font color='#2CCEFB'>FP@12/GHz</font></li>
              <li><Translate id='page.titan.text11' /></li>
            </ul>

            <p className={styles.module_title2}
              dangerouslySetInnerHTML={{
                __html: translate({
                  id: "page.titan.text12",
                }),
              }}
            ></p>
            <ul className={styles.ul_list}>
              <li><Translate id='page.titan.text13' /></li>
              <li><Translate id='page.titan.text14' /></li>
            </ul>
          </div>
          <img src='/titan/dp1000.webp' alt='UltraRISC UR-DP1000' />
        </div>
        <div className={styles.chip_support}>
          <img src='/titan/support-img.webp' alt='Supports Hardware Virtualization, RISC-V RV64 ISA H(v1.0) Extension' />
          <div>
            <p className={styles.module_title2}><Translate id='page.titan.text15' /></p>
            <ul className={styles.ul_list}>
              <li><Translate id='page.titan.text16' /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.storage_module}>
        <p className={clsx(styles.module_title, styles.ml_bottom)}><Translate id='page.titan.text17' /></p>
        <div className={styles.storage_content}>
          <div>
            <img src='/titan/ddr4.webp' alt='Supports DDR4 Memory Stick, Up to 64GB' />
          </div>
          <ul className={clsx(styles.ul_list, styles.ul_list2)}>
            <li><Translate id='page.titan.text18' /></li>
            <li><Translate id='page.titan.text19' /></li>
            <li><Translate id='page.titan.text20' /></li>
            <li><Translate id='page.titan.text21' /></li>
          </ul>
        </div>
      </div>
    </div>
    <div className={clsx(styles.uefi_module, styles.module_styles)}>
      <div className={styles.content_width}>
        <p className={clsx(styles.module_title, styles.ml_bottom2)}
          style={{ textAlign: 'left' }}
        ><Translate id='page.titan.text22' /></p>
        <ul className={clsx(styles.ul_list, styles.ul_list3)}>
          <li><Translate id='page.titan.text23' /></li>
          <li><Translate id='page.titan.text24' /></li>
          <li><Translate id='page.titan.text25' /></li>
          <li><Translate id='page.titan.text26' /></li>
          <li><Translate id='page.titan.text27' /></li>
        </ul>
      </div>
    </div>
    <div className={clsx(styles.os_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text28",
          }),
        }}
      >
      </p>
      <img src='/titan/os-support.webp' alt='Install Mainstream Operating Systems from .iso Image' />
    </div>
    <div className={clsx(styles.upstream_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text29",
          }),
        }}
      ></p>
      <p className={styles.module_title3}><Translate id='page.titan.text30' /></p>
      <img src='/titan/linux-logo.webp' alt='Open Source in the Soul Planned Upstream to Linux Mainline (2026 Q4)' />
      <p className={styles.module_title}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text31",
          }),
        }}
      ></p>
      <p className={styles.module_title3}><Translate id='page.titan.text32' /></p>
      <img src='/titan/ssd-speed.webp' alt='Supports Ultra-High-Speed NVMe SSD (PCIe Gen4 4-lane)' />
    </div>
    <div className={clsx(styles.usb_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}><Translate id='page.titan.text33' /></p>
      <img src='/titan/usb3-view.webp' alt='Supports High-Speed USB3 5Gbps' />
      <p className={clsx(styles.module_title, styles.ml_bt)}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text34",
          }),
        }}
      ></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text35' /></p>
      <img src='/titan/pcie-charts.webp' alt='Onboard Full-Size PCIe Connector with PCIe Gen4 16-lane' />
      <ol className={styles.pcie_list}>
        <li></li>
        <li>
          <p className={styles.module_title3} style={{ textAlign: 'left' }}><Translate id='page.titan.text36' /></p>
        </li>
        <li>
          <p className={styles.module_title3} style={{ textAlign: 'left' }}><Translate id='page.titan.text37' /></p>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text38' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text39' /></p>
      <ol className={styles.windows_list}>
        <li>
          <p><Translate id='page.titan.text40' /></p>
        </li>
        <li>
          <p><Translate id='page.titan.text41' /></p>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text42",
          }),
        }}
      ></p>
      <ol className={styles.dk_ul}>
        <li>
          <div>
            <img src='/titan/dpdk.webp' alt='DPDK' />
          </div>
          <div>
            <p className={styles.module_title2}>DPDK (Data Plane Development Kit)</p>
            <p className={styles.module_title3} style={{ color: '#fff', textAlign: 'left' }}><Translate id='page.titan.text43' /></p>
          </div>
        </li>
        <li>
          <div>
            <img src='/titan/spdk.webp' alt='SPDK' />
          </div>
          <div>
            <p className={styles.module_title2}>SPDK (Storage Performance Development Kit)</p>
            <p className={styles.module_title3} style={{ color: '#fff', textAlign: 'left' }}><Translate id='page.titan.text44' /></p>
          </div>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text45' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text46' /></p>
      <img src='/titan/support-lang.webp' alt='Supports Mainstream Programming Languages' className={styles.lang_img} />
    </div>
    <div className={clsx(styles.power_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)} style={{ color: '#000' }}><Translate id='page.titan.text47' /></p>
      <p className={styles.module_title3}><Translate id='page.titan.text48' /></p>
      <img src='/titan/liunx-logo2.webp' alt='Supports Low-Power Suspend' />
      <div className={styles.power_list}>
        <p>suspend2idle</p>
        <p>suspend2disk</p>
      </div>
    </div>
    <div className={clsx(styles.interface_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text49' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text50' /></p>
      <div className={styles.rtos_list}>
        <img src='/titan/rtos-1.webp' alt='RTOS' />
        <img src='/titan/rtos-2.webp' alt='RTOS' />
        <img src='/titan/rtos-3.webp' alt='RTOS' />
      </div>
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text51' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text52' /></p>
      <div className={clsx(styles.storage_content, styles.bmc_content)}>
        <ul className={clsx(styles.ul_list, styles.ul_list2)}>
          <li><Translate id='page.titan.text53' /></li>
          <li><Translate id='page.titan.text54' /></li>
          <li><Translate id='page.titan.text55' /></li>
        </ul>
        <img src='/titan/bmc-view.webp' alt='Supports Milk-V BMC Module' />
      </div>

      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: "page.titan.text56",
          }),
        }}
      ></p>
      <img src='/titan/typec.webp' alt='Access Terminal Serial Port via Type-C Interface' className={styles.typec_img} />
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text57' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text58' /></p>
      <ol className={styles.pc_list}>
        <li>
          <img src='/titan/info-view1.webp' alt='Onboard PWM-Controlled Cooling Fan' />
          <div>
            <p className={styles.module_title2}
              dangerouslySetInnerHTML={{
                __html: translate({
                  id: "page.titan.text59",
                }),
              }}
            ></p>
            <ul className={styles.ul_list}>
              <li dangerouslySetInnerHTML={{
                __html: translate({
                  id: "page.titan.text60",
                }),
              }}
              ></li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view2.webp' alt='Standard MINI-ITX Form Factor' />
          <div>
            <p className={styles.module_title2}><Translate id='page.titan.text61' /></p>
            <ul className={styles.ul_list}>
              <li><Translate id='page.titan.text62' /></li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view3.webp' alt='Standard F_PANEL' />
          <div>
            <p className={styles.module_title2}><Translate id='page.titan.text63' /></p>
            <ul className={styles.ul_list}>
              <li><Translate id='page.titan.text64' /></li>
              <li><Translate id='page.titan.text65' /></li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view4.webp' alt='Supports DC Wide Voltage Input (12V-19V)' />
          <div>
            <p className={styles.module_title2} dangerouslySetInnerHTML={{
              __html: translate({
                id: "page.titan.text66",
              }),
            }}
            ></p>
          </div>
        </li>
        <li>
          <img src='/titan/info-view5.webp' alt='Supports Standard ATX 24-Pin Power Supply' />
          <div>
            <p className={styles.module_title2}
              dangerouslySetInnerHTML={{
                __html: translate({
                  id: "page.titan.text67",
                }),
              }}
            ></p>
          </div>
        </li>
      </ol>
    </div>
    <div className={clsx(styles.software_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)} style={{ color: '#000' }}><Translate id='page.titan.text68' /></p>
      <p className={styles.module_title3}><Translate id='page.titan.text69' /></p>
      <ol className={clsx(styles.software_list, styles.color_fff)}>
        <li>
          <img src='/titan/jiachen.webp' alt='Jiachen Project' />
          <p>--- <Translate id='page.titan.text70' /> ---</p>
        </li>
        <li>
          <img src='/titan/fvf.webp' alt='FVF Team' />
          <p>--- <Translate id='page.titan.text71' /> ---</p>
        </li>
      </ol>
    </div>
    <div className={clsx(styles.sourced_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}><Translate id='page.titan.text72' /></p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}><Translate id='page.titan.text73' /></p>
      <ol className={clsx(styles.sourced_list, styles.software_list)}>
        <li>
          <img src='/titan/software.webp' alt='Software' />
          <p><Translate id='page.titan.text74' /></p>
        </li>
        <li>
          <img src='/titan/hardware.webp' alt='Hardware' />
          <p><Translate id='page.titan.text75' /></p>
        </li>
        <li>
          <img src='/titan/design.webp' alt='Structural Design' />
          <p><Translate id='page.titan.text76' /></p>
        </li>
      </ol>
    </div>
    <div className={styles.fromBox}>
      <div className={styles_vega.tabBox_tech}>
        <p className={styles_vega.title}><Translate id='line.title.TechSpecs' /></p>
        <p className={styles_vega.moreP}><Translate id='page.titan.text77' /></p>
        <table className={clsx(styles_vega.tableBox, styles.titan_table)}>
          <tbody>
            <tr>
              <td>CPU</td>
              <td>UltraRISC UR‑DP1000, 8‑core CP‑100(RV64GCBHX), Up to 2.0GHz</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>2x DDR4 Stick Slot, Support ECC, Up to 64GB@3200MT/s</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>1x M.2 M Key Connector for M.2 NVMe SSD (PCIe Gen4 x4)</td>
            </tr>
            <tr>
              <td>Ethernet</td>
              <td>1x Gigabit RJ45 Port</td>
            </tr>
            <tr>
              <td rowSpan="2">USB</td>
              <td colSpan="2">4x USB3 5Gbps</td>
            </tr>
            <tr>
              <td colSpan="2">1x USB 2.0 Interface via Front USB header</td>
            </tr>
            <tr>
              <td>PCIe</td>
              <td>1x PCIe x16 Slot (PCIe Gen4, 16‑lane), Supports Graphic Cards and Computing Cards, etc.</td>
            </tr>
            <tr>
              <td rowSpan="4">BMC Module (Optional)</td>
              <td colSpan="4">1x Milk‑V BMC Module Connector for Milk‑V BMC Module</td>
            </tr>
            <tr>
              <td colSpan="4">1x 100Mbps RJ45 Port for Remote Control (Via Milk‑V BMC Module)</td>
            </tr>
            <tr>
              <td colSpan="4">1x USB2 for BMC Storage (Via Milk‑V BMC Module)</td>
            </tr>
            <tr>
              <td colSpan="4">1x MicroSD Slot for BMC Storage (Via Milk‑V BMC Module)</td>
            </tr>
            <tr>
              <td rowSpan="5">Others</td>
              <td colSpan="5">1x PWM Fan Connector</td>
            </tr>
            <tr>
              <td colSpan="5">1x RTC Socket(CR1220 battery)</td>
            </tr>
            <tr>
              <td colSpan="5">1x Front Panel header for Power Button / Reset Button / Status LED / Power LED</td>
            </tr>
            <tr>
              <td colSpan="5">1x CPU Uart(3P)</td>
            </tr>
            <tr>
              <td colSpan="5">1x Debug Type‑C</td>
            </tr>
            {/*  */}
            <tr>
              <td>Operating System</td>
              <td>Ubuntu / Debian / Fedora</td>
            </tr>
            <tr>
              <td>Dimension</td>
              <td>170mm x 170 mm</td>
            </tr>
            <tr>
              <td>Compliance</td>
              <td>FCC / CE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BuyPop type='titan' />
    <ContactUs product='titan' />
  </Layout>
}