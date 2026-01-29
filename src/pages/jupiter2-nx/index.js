import Layout from "@theme/Layout";
import styles_j2 from "@site/src/pages/jupiter2/index.module.css";
import styles from "./index.module.css"
import MetaData from "../../components/MetaData";
import clsx from "clsx";
import styles_s from '@site/src/pages/vega/index.module.css';
import styles_j from '@site/src/pages/jupiter/index.module.css';
import Translate from "@docusaurus/Translate";

export default () => {
  return (
    <Layout
      title="Jupiter"
      description="Jupiter"
    >
      <MetaData page='jupiter' />
      <div className={styles_j2["jupiter2-content"]}>
        <div className={styles_j2["header"]}>
          <h1>Milk-V Jupiter2 NX</h1>
          <ol>
            <li>RVA23‑Ready</li>
            <li>RVV 1.0</li>
            <li>
              1024‑bit
              <span>Vector Acceleration</span>
            </li>
          </ol>
          <p>The First RVA23-Compliant RISC-V SoM</p>
        </div>
        <div className={styles_j2["content"]}>
          <div className={clsx(styles_j2["cpu"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              High-Performance CPU<br />
              8-Core X100™ CPU @ 2.4GHz
            </p>
            <ul className={styles_j2["item-list"]}>
              <li>64-bit RISC-V AI processor cores</li>
              <li><font>130 KDMIPS</font> class CPU performance</li>
              <li>Built for desktop-class computing and heavy edge workloads</li>
            </ul>
          </div>
          <div className={styles_j2["ai_video"]}>
            <div className={styles_j2["interface-item"]}>
              <p className={styles_j2["item-title"]}>
                On-Device AI Acceleration<br />
                8-Core A100™ AI CPU
              </p>
              <ul className={styles_j2["item-list"]}>
                <li>Up to 60 TOPS</li>
                <li>Dedicated <font>TCM + DMA</font> acceleration channels</li>
                <li>Supports INT4 / INT8 / FP8 / INT16 / FP16 / BF16 precision</li>
              </ul>
            </div>
            <div className={styles_j2["interface-item"]}>
              <p className={styles_j2["item-title"]}>
                High-Performance CPU<br />
                8-Core X100™ CPU @ 2.4GHz
              </p>
              <ul className={styles_j2["item-list"]}>
                <li>IMG BXM-4-64-MC1</li>
              </ul>
              <img src="/jupiter2/cpu-icon.webp" alt="IMG BXM-4-64-MC1" />
            </div>
          </div>
          <div className={clsx(styles_j2["rvv"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              RVA23 + RVV 1.0
            </p>
            <p className={styles_j2["item-p"]}>Up to 1024-bit RVV 1.0 vector processing</p>
            <ul className={styles_j2["item-list"]}>
              <li>Vector computing made for AI & multimedia</li>
            </ul>
          </div>
          <div className={clsx(styles_j2["hardware"], styles_j2["interface-item"])}>
            <div>
              <p className={styles_j2["item-title"]}>
                Comprehensive Hardware Virtualization
              </p>
              <ul className={styles_j2["item-list"]}>
                <li>Supports RV Hypervisor 1.0, AIA, and RV IOMMU extensions</li>
                <li>Provides full hardware virtualization for CPU, memory, interrupts, and I/O</li>
              </ul>
            </div>
          </div>
          <div className={styles_j2["interface-item"]}>
            <p className={styles_j2["item-title"]}>
              Powerful Storage Expansion
            </p>
            <div className={styles_j2["storage"]}>
              <div className={styles_j2["lpddr5"]}>
                <p className={styles_j2["item-p"]}>LPDDR5</p>
                <ul className={styles_j2["item-list"]}>
                  <li>Up to 32GB</li>
                  <li>Memory bus width: 32-bit (dual-channel, 16-bit per channel)</li>
                  <li>Data rate: up to 6400 MT/s</li>
                </ul>
              </div>
              <div className={clsx(styles_j2["ufs"], styles["nx-display"])}>
                <div>
                  <p className={styles_j2["item-p"]}>Onboard UFS (up to 256GB)</p>
                  <ul className={styles_j2["item-list"]}>
                    <li>Support NVMe SSD via PCIe and microSD Card via SDIO 3.0</li>
                  </ul>
                  <img src="/jupiter2-nx/ufs-nx.webp" alt="Onboard UFS" />
                </div>
                <div>
                  <p className={styles_j2["item-p"]}>NVMe SSD via PCIe Gen3</p>
                  <img src="/jupiter2-nx/pcie.webp" alt="NVMe SSD via PCIe Gen3" />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles_j2["display"], styles_j2["ai_video"], styles["nx-flex"])}>
            <div className={styles_j2["interface-item"]}>
              <p className={styles_j2["item-title"]}>
                High-Frame-Rate Video Codec
              </p>
              <p className={styles_j2["item-p"]}>Built for capture/transcoding, low-latency streaming, and edge video analytics</p>
              <ul className={styles_j2["item-list"]}>
                <li>Decode: H.265 / H.264 / VP9 up to 4K@120fps</li>
                <li>Encode: H.265 / H.264 up to 4K@60fps</li>
              </ul>
              <img src="/jupiter2/codec-bg.webp" alt="AI Video Codec" />
            </div>
            <div className={styles_j2["interface-item"]}>
              <p className={styles_j2["item-title"]}>
                Peripheral Expansion
              </p>
              <ul className={styles_j2["item-list"]}>
                <li>Support UART, I2C, I2S,  CAN, PWM, GPIOs, etc</li>
                <li>PCIe Gen3</li>
                <li>USB 3.0 / USB 2.0</li>
              </ul>
            </div>
          </div>
          <div className={clsx(styles["industrial"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              Industrial-Grade Reliability
            </p>
            <ol className={styles["item-list-industrial"]}>
              <li>260-pin SO-DIMM connector</li>
              <li>69.6 mm x 45 mm</li>
              <li>-40°C~85°C</li>
              <li>Power TDP: 18–35W</li>
            </ol>
          </div>
          <div className={clsx(styles_j2["support"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              Software Support
            </p>
            <ul className={styles_j2["item-list"]}>
              <li>Bianbu 3.0, Ubuntu 26.04, OpenHarmony 6.0, OpenKylin 2.0, deepin 25, Fedora</li>
            </ul>
            <div>
              <img src="/jupiter2/support-icon1.webp" alt="Support" />
              <img src="/jupiter2/support-icon2.webp" alt="Support" />
              <img src="/jupiter2/support-icon3.webp" alt="Support" />
              <img src="/jupiter2/support-icon4.webp" alt="Support" />
              <img src="/jupiter2/support-icon5.webp" alt="Support" />
              <img src="/jupiter2/support-icon6.webp" alt="Support" />
            </div>
          </div>
          <div className={clsx(styles["work-with"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              Work with Radxa C200
            </p>
          </div>
          <div className={clsx(styles["vs"], styles_j2["interface-item"])}>
            <div>
              <p className={styles_j2["item-title"]}>
                Jupiter NX VS Jupiter2 NX
              </p>
              <div className={styles["vs-chat"]}>
                <p>
                  <span></span>
                  Milk-V Jupiter NX
                </p>
                <p>
                  <span></span>
                  Milk-V Jupiter2 NX
                </p>
              </div>
            </div>
            <img src="/jupiter2-nx/vs-view.webp" alt="Jupiter NX VS Jupiter2 NX" />
          </div>
          <div >
            <h2 className={styles_s.title}><Translate id='line.title.TechSpecs' /></h2>
            <p className={styles_s.moreP}>
              Jupiter2 NX is an octa-core AI system-on-module featuring the SpacemiT K3 SoC, LPDDR5 (up to 32GB), and onboard UFS storage. It complies with RVA23 standards, supports RVV 1.0 (up to 1024-bit) vector acceleration, and is compatible with Radxa C200 and Jetson Orin series carrier boards, making it an ideal next-gen upgrade for AI and edge computing.
            </p>
            <h2 className={styles_s.headword}><Translate id='duo.info.text.Hardware' /></h2>
            <table className={styles_j.jupiter_table}>
              <tbody>
                <tr>
                  <td className={styles_j.tabline}>SoC</td>
                  <td className={styles_j.tabP}>
                    <p>SPACEMIT K3（RVA23）</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPU</p>
                  </td>
                  <td>
                    <p>8-core A100™</p>
                    <ul>
                      <li>Up to 2.4 GHz</li>
                      <li>64-bit RISC-V AI Processor Cores</li>
                      <li>Delivering 130 KDMIPS</li>
                      <li>X100™ is a quad-issue, out-of-order high-performance core</li>
                      <li>8MB shared L2 cache per 8-core cluster</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>GPU</p>
                  </td>
                  <td>
                    <p>IMG BXM-4-64-MC1</p>
                    <ul>
                      <li>OpenGL ES1.1 / ES2.0 / ES3.2</li>
                      <li>OpenCL 3.0</li>
                      <li>Vulkan 1.3</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>AI Performance</p>
                  </td>
                  <td>
                    <p>8-core A100™</p>
                    <ul>
                      <li>Up to 60 TOPS</li>
                      <li>Up to 1024-bit RVV 1.0 vector processing</li>
                      <li>Dedicated TCM and DMA acceleration channels provided</li>
                      <li>Supports INT4 / INT8 / FP8 / INT16 / FP16 / BF16 precision</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>RAM</p>
                  </td>
                  <td>
                    <p>LPDDR5</p>
                    <ul>
                      <li>Up to 32GB</li>
                      <li>Memory bus width: 32-bit (dual-channel, 16-bit per channel)</li>
                      <li>Data rate: up to 6400 MT/s</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Codec</p>
                  </td>
                  <td>
                    <p>Video Decoder:</p>
                    <ul>
                      <li>H.265 / H.264 / VP9 up to 4K@120fps</li>
                    </ul>
                    <p>Video Encoder:</p>
                    <ul>
                      <li>H.265 / H.264 up to 4K@60fps</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Storage</p>
                  </td>
                  <td>
                    <p>Supports Onboard UFS, microSD card , and external NVMe.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>PCIe</p>
                  </td>
                  <td>
                    <p>PCIe Gen3</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Display</p>
                  </td>
                  <td>
                    <p>1x DisplayPort (DP1.2)</p>
                    <p>1x MIPI DSI</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Camera</p>
                  </td>
                  <td>
                    <p>2x MIPI CSI</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Networking</p>
                  </td>
                  <td>
                    <p>Gigabit Ethernet</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>USB</p>
                  </td>
                  <td>
                    <p>USB 3.0</p>
                    <p>USB 2.0</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Other</p>
                  </td>
                  <td>
                    <p>Support UART, I2C, I2S,  CAN-FD, PWM, GPIOs, etc</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Connector</p>
                  </td>
                  <td>
                    <p>260-pin SO-DIMM connector</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Operating System</p>
                  </td>
                  <td>
                    <p>Bianbu 3.0, Ubuntu 26.04, OpenHarmony 6.0, OpenKylin, Deepin, Fedora</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dimension</p>
                  </td>
                  <td>
                    <p>69.6 mm x 45 mm</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Power TDP</p>
                  </td>
                  <td>
                    <p>18–35W</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <img src="/jupiter2-nx/position-nx.webp" alt="Jupiter2" className={styles_j2["postion-img"]} />
      </div>
    </Layout >
  )
}