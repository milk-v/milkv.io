import Layout from '@theme/Layout';
import styles from './index.module.css'
import Translate from '@docusaurus/Translate';
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
      <p>Undoubtedly, the Most Powerful RISC-V MINI-ITX</p>
      <img src='/titan/titan-view.webp' alt='Milk-V Titan' />
    </div>
    <div className={styles.titan_main}>
      <div className={styles.chip_module}>
        <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}>Powered by UltraRISC UR-DP1000</p>
        <div className={styles.chip_flex}>
          <div>
            <p className={styles.module_title2}>
              8 High-Performance RISC-V Cores<br />
              UR-CP100
            </p>
            <span className={styles.ghzs}>Up to <font color='#2CCEFB'>2.0</font>GHz</span>
            <ul className={styles.ul_list}>
              <li>1 Cluster (4x UR-CP100 Cores) Sharing 4MB, Total 8MB</li>
              <li>Syste-level Cache: 16MB Shared by 2 Cluster (8 Cores)</li>
            </ul>
            <p className={styles.module_title2}>The Most Powerful RISC-V Core in Mass Production to Date - UR-CP100 (RV64GCBHX)</p>
            <ul className={styles.ul_list}>
              <li>64-bit <font color='#2CCEFB'>Out-of-Order 4-Issue</font> Superscalar Microarchitecture</li>
              <li>SPECCPU2006 Single-Core <font color='#2CCEFB'>INT@10.4/GHz</font></li>
              <li>SPECCPU2006 Single-Core <font color='#2CCEFB'>FP@12/GHz</font></li>
              <li>UltraRISC Proprietary High-Performance "X" Instruction Set Extension</li>
            </ul>

            <p className={styles.module_title2}>Compliant with RISC-V <br />International Foundation Standards</p>
            <ul className={styles.ul_list}>
              <li>Fully Compliant with RVA22</li>
              <li>Compliant with RVA23* (Excluding "V" Extension)</li>
            </ul>
          </div>
          <img src='/titan/dp1000.webp' alt='UltraRISC UR-DP1000' />
        </div>
        <div className={styles.chip_support}>
          <img src='/titan/support-img.webp' alt='Supports Hardware Virtualization, RISC-V RV64 ISA H(v1.0) Extension' />
          <div>
            <p className={styles.module_title2}>Supports Hardware Virtualization, RISC-V RV64 ISA H(v1.0) Extension</p>
            <ul className={styles.ul_list}>
              <li>Supports Linux KVM (qemu-kvm), XVisor, Bao Hypervisor</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.storage_module}>
        <p className={clsx(styles.module_title, styles.ml_bottom)}>Supports DDR4 Memory Stick, Up to 64GB</p>
        <div className={styles.storage_content}>
          <div>
            <img src='/titan/ddr4.webp' alt='Supports DDR4 Memory Stick, Up to 64GB' />
          </div>
          <ul className={clsx(styles.ul_list, styles.ul_list2)}>
            <li>Compatible with Standard PC-Grade Memory Stick (UDIMM)</li>
            <li>Supports Standard DDR4 JEDEC JESD79-4A Protocol</li>
            <li>Supports Maximum Speed of 3200MT/s</li>
            <li>Supports ECC</li>
          </ul>
        </div>
      </div>
    </div>
    <div className={clsx(styles.uefi_module, styles.module_styles)}>
      <div className={styles.content_width}>
        <p className={clsx(styles.module_title, styles.ml_bottom2)}
          style={{ textAlign: 'left' }}
        >Supports UEFI Boot</p>
        <ul className={clsx(styles.ul_list, styles.ul_list3)}>
          <li>Supports ACPI, CPPC, SMBIOS</li>
          <li>Standardized Boot Support</li>
          <li>Native ISO File Mounting</li>
          <li>More Flexible Boot Options</li>
          <li>Enhanced Security</li>
        </ul>
      </div>
    </div>
    <div className={clsx(styles.os_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}>
        Install Mainstream Operating Systems<br /> from <font color='#2CCEFB'>.iso</font> Image
      </p>
      <img src='/titan/os-support.webp' alt='Install Mainstream Operating Systems from .iso Image' />
    </div>
    <div className={clsx(styles.upstream_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}>Open Source in the Soul<br />
        Planned Upstream to Linux Mainline (2026 Q4)</p>
      <p className={styles.module_title3}>Planned Support for LTS Linux and Upstream Patches</p>
      <img src='/titan/linux-logo.webp' alt='Open Source in the Soul Planned Upstream to Linux Mainline (2026 Q4)' />
      <p className={styles.module_title}>Supports Commodity NVMe SSDs<br />
        (PCIe Gen4 4-lane)</p>
      <p className={styles.module_title3}>Theoretical Read/Write Speeds up to 7.88 GB/s</p>
      <img src='/titan/ssd-speed.webp' alt='Supports Ultra-High-Speed NVMe SSD (PCIe Gen4 4-lane)' />
    </div>
    <div className={clsx(styles.usb_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}>Supports High-Speed USB3 5Gbps</p>
      <img src='/titan/usb3-view.webp' alt='Supports High-Speed USB3 5Gbps' />
      <p className={clsx(styles.module_title, styles.ml_bt)}>Onboard Full-Size PCIe Connector with<br /> PCIe Gen4 16-lane</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Maximum Theoretical Unidirectional Bandwidth of 31.5 GB/s</p>
      <img src='/titan/pcie-charts.webp' alt='Onboard Full-Size PCIe Connector with PCIe Gen4 16-lane' />
      <ol className={styles.pcie_list}>
        <li></li>
        <li>
          <p className={styles.module_title3} style={{ textAlign: 'left' }}>Supports High-end Graphics Cards, Plug-and-Play</p>
        </li>
        <li>
          <p className={styles.module_title3} style={{ textAlign: 'left' }}>Supports 40GbE Onwards Ethernet Cards , Plug-and-Play</p>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt)}>Seamlessly Run Windows Software</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Supports wine64, box64</p>
      <ol className={styles.windows_list}>
        <li>
          <p>Smooth Gaming</p>
        </li>
        <li>
          <p>Effortless Productivity</p>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}>Supports High-Performance IO <br /> Frameworks</p>
      <ol className={styles.dk_ul}>
        <li>
          <div>
            <img src='/titan/dpdk.webp' alt='DPDK' />
          </div>
          <div>
            <p className={styles.module_title2}>DPDK (Data Plane Development Kit)</p>
            <p className={styles.module_title3} style={{ color: '#fff', textAlign: 'left' }}>Accelerates network packet processing with user-space drivers and optimization techniques to enhance network performance.</p>
          </div>
        </li>
        <li>
          <div>
            <img src='/titan/spdk.webp' alt='SPDK' />
          </div>
          <div>
            <p className={styles.module_title2}>SPDK (Storage Performance Development Kit)</p>
            <p className={styles.module_title3} style={{ color: '#fff', textAlign: 'left' }}>Optimizes storage device access with user-space drivers and efficient I/O paths to boost storage performance.</p>
          </div>
        </li>
      </ol>
      <p className={clsx(styles.module_title, styles.ml_bt)}>Supports Mainstream Programming Languages</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Supports Interpreters and Virtual Machines for Java, JavaScript, Go, Lua, Python, PHP, Rust, C/C++ and more</p>
      <img src='/titan/support-lang.webp' alt='Supports Mainstream Programming Languages' className={styles.lang_img} />
    </div>
    <div className={clsx(styles.power_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)} style={{ color: '#000' }}>Supports Low-Power Suspend</p>
      <p className={styles.module_title3}>Supports Linux suspend2idle and suspend2disk</p>
      <img src='/titan/liunx-logo2.webp' alt='Supports Low-Power Suspend' />
      <div className={styles.power_list}>
        <p>suspend2idle</p>
        <p>suspend2disk</p>
      </div>
    </div>
    <div className={clsx(styles.interface_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}>Supports RTOS</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Easily Handles High-Real-Time Tasks</p>
      <div className={styles.rtos_list}>
        <img src='/titan/rtos-1.webp' alt='RTOS' />
        <img src='/titan/rtos-2.webp' alt='RTOS' />
        <img src='/titan/rtos-3.webp' alt='RTOS' />
      </div>

      <p className={clsx(styles.module_title, styles.ml_bt)}>Supports Milk-V BMC Module</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Install the Milk-V BMC Module via Connector for Easy Remote Management</p>
      <div className={clsx(styles.storage_content, styles.bmc_content)}>
        <ul className={clsx(styles.ul_list, styles.ul_list2)}>
          <li>Power On/Off, Terminal Access, Scheduled Tasks</li>
          <li>Supports Web Management</li>
          <li>Supports CLI Management</li>
        </ul>
        <img src='/titan/bmc-view.webp' alt='Supports Milk-V BMC Module' />
      </div>

      <p className={clsx(styles.module_title, styles.ml_bt, styles.ml_bottom)}>Access Terminal Serial Port via<br /> Type-C Interface</p>
      <img src='/titan/typec.webp' alt='Access Terminal Serial Port via Type-C Interface' className={styles.typec_img} />

      <p className={clsx(styles.module_title, styles.ml_bt)}>This is the Genuine RISC-V PC</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>More Than Just Cooling and Form Factor</p>
      <ol className={styles.pc_list}>
        <li>
          <img src='/titan/info-view1.webp' alt='Onboard PWM-Controlled Cooling Fan' />
          <div>
            <p className={styles.module_title2}>Onboard PWM-Controlled<br /> Cooling Fan</p>
            <ul className={styles.ul_list}>
              <li>Fearless of High Temperatures, Full <br />Performance Unleashed</li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view2.webp' alt='Standard MINI-ITX Form Factor' />
          <div>
            <p className={styles.module_title2}>Standard MINI-ITX Form Factor</p>
            <ul className={styles.ul_list}>
              <li>Compatible with Mainstream PC Cases</li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view3.webp' alt='Standard F_PANEL' />
          <div>
            <p className={styles.module_title2}>Standard F_PANEL</p>
            <ul className={styles.ul_list}>
              <li>Supports Standard PC Case Front Panels</li>
              <li>Power On/Off, Restart, HDD Status Indicator</li>
            </ul>
          </div>
        </li>
        <li>
          <img src='/titan/info-view4.webp' alt='Supports DC Wide Voltage Input (12V-19V)' />
          <div>
            <p className={styles.module_title2}>Supports DC Wide Voltage Input <br />(12V-19V)</p>
          </div>
        </li>
        <li>
          <img src='/titan/info-view5.webp' alt='Supports Standard ATX 24-Pin Power Supply' />
          <div>
            <p className={styles.module_title2}>Supports Standard ATX 24-Pin<br /> Power Supply</p>
          </div>
        </li>
      </ol>
    </div>
    <div className={clsx(styles.software_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)} style={{ color: '#000' }}>Community Software Support</p>
      <p className={styles.module_title3}>The FVF Team and Jiachen Project Provide Community Technical Support for Milk-V Titan</p>
      <ol className={clsx(styles.software_list, styles.color_fff)}>
        <li>
          <img src='/titan/jiachen.webp' alt='Jiachen Project' />
          <p>--- Jiachen Project ---</p>
        </li>
        <li>
          <img src='/titan/fvf.webp' alt='Jiachen Project' />
          <p>--- FVF Team ---</p>
        </li>
      </ol>
    </div>
    <div className={clsx(styles.sourced_module, styles.module_styles)}>
      <p className={clsx(styles.module_title, styles.ml_bt)}>We Open-sourced it</p>
      <p className={clsx(styles.module_title3, styles.ml_bottom)} style={{ color: '#fff' }}>Just for Drive RISC-V to New Heights</p>

      <ol className={clsx(styles.sourced_list, styles.software_list)}>
        <li>
          <img src='/titan/software.webp' alt='Software' />
          <p>Software</p>
        </li>
        <li>
          <img src='/titan/hardware.webp' alt='Hardware' />
          <p>Hardware</p>
        </li>
        <li>
          <img src='/titan/design.webp' alt='Structural Design' />
          <p>Structural Design</p>
        </li>
      </ol>
    </div>
    <div className={styles.fromBox}>

      <div className={styles_vega.tabBox_tech}>
        <p className={styles_vega.title}><Translate id='line.title.TechSpecs' /></p>
        <p className={styles_vega.moreP}>The Milk-V Titan, powered by the UltraRISC UR-DP1000 8-core SoC (up to 2.0GHz), is a compact Mini ITX RISC-V board. It supports up to 64GB DDR4 ECC RAM, a PCIe Gen4 x16 slot for graphics/computing cards, and an M.2 NVMe SSD. Featuring Gigabit Ethernet, four USB 3.0 ports, and ATX power support, also support Milk-V BMC remote control, it’s perfect for high-performance RISC-V desktops and servers.
        </p>
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