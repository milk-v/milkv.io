import Layout from "@theme/Layout";
import styles_j2 from "@site/src/pages/jupiter2/index.module.css";
import styles_j2_nx from "@site/src/pages/jupiter2-nx/index.module.css";
import MetaData from "../../components/MetaData";
import clsx from "clsx";
import styles_s from '@site/src/pages/vega/index.module.css';
import styles_j from '@site/src/pages/jupiter/index.module.css';
import Translate from "@docusaurus/Translate";
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import BuyPop from "../../components/BuyPop";

export default () => {
  return (
    <Layout
      title="Jupiter"
      description="Jupiter"
    >
      <MetaData page='jupiter2-dev-kit' />
      <div className={styles_j2["jupiter2-content"]}>
        <div className={styles_j2["header"]}>
          <h1>Milk-V Jupiter2 Dev Kit</h1>
          <ol>
            <li>RVA23‑Ready</li>
            <li>RVV 1.0</li>
            <li>
              1024‑bit
              <span>Vector Acceleration</span>
            </li>
          </ol>
          <p>The First RVA23-Compliant RISC-V Dev Kit</p>
          <Link to='#buy' className={styles_j2["btn-buy"]} >
            <Translate id='Buy.now' />
          </Link>
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
                Integrated 3D Graphics Engine
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
              High-Speed Storage
            </p>
            <p className={styles_j2["item-p"]}>High bandwidth, low latency, meeting the demands of large-scale data and model loading</p>
            <div className={styles_j2["storage"]}>
              <div className={styles_j2["lpddr5"]}>
                <p className={styles_j2["item-p"]}>LPDDR5</p>
                <ul className={styles_j2["item-list"]}>
                  <li>Up to 32GB</li>
                  <li>Memory bus width: 64-bit (dual-channel, 32-bit per channel)</li>
                  <li>Data rate: up to 6400 MT/s</li>
                </ul>
              </div>
              <div className={clsx(styles_j2["ufs"], styles_j2_nx["nx-display"])}>
                <div>
                  <p className={styles_j2["item-p"]}>Onboard UFS</p>
                  <ul className={styles_j2["item-list"]}>
                    <li>up to 256GB</li>
                  </ul>
                  <img src="/jupiter2-dev-kit/ufs-kit.webp" alt="Onboard UFS" />
                </div>
                <div>
                  <p className={styles_j2["item-p"]}>NVMe SSD</p>
                  <ul className={styles_j2["item-list"]}>
                    <li>M.2 M Key 2230 Slot</li>
                    <li>M.2 M Key 2280 Slot</li>
                  </ul>
                  <img src="/jupiter2-dev-kit/ssd.webp" alt="SSD" className={styles["ssd"]} />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles_j2["display"], styles_j2["ai_video"], styles_j2_nx["nx-flex"])}>
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
          <div className={clsx(styles_j2_nx["industrial"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              Comprehensive Connectivity
            </p>
            <img src="/jupiter2-dev-kit/interface-view.webp" alt="Interface" />
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
          <div className={clsx(styles_j2_nx["work-with"], styles_j2["interface-item"])}>
            <p className={styles_j2["item-title"]}>
              Package List
            </p>
            <ul className={styles_j2["item-list"]}>
              <li>Radxa C200</li>
              <li>Milk-V Jupiter2 NX</li>
            </ul>
          </div>
          <div className={clsx(styles_j2_nx["vs"], styles_j2["interface-item"])}>
            <div>
              <p className={styles_j2["item-title"]}>
                Jupiter NX VS Jupiter2 NX
              </p>
              <div className={styles_j2_nx["vs-chat"]}>
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
              Jupiter2 NX Development Kit pairs the Jupiter2 NX with the Radxa C200, delivering a production-ready RISC-V AI platform. Built around the SpacemiT K3 (RVA23) SoC, it features an 8-core X100™ CPU and delivers 60 TOPS of AI performance with 1024-bit RVV 1.0 vector acceleration.<br />
              The kit is equipped with up to 32GB LPDDR5 memory, onboard UFS storage, and versatile M.2 expansion slots. Offering a comprehensive set of I/O including high-speed USB, networking, display outputs, and industrial interfaces, it provides a complete foundation for developing and deploying edge AI, robotics, and high-performance computing solutions.
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
                    <p>1x Onboard UFS, Up to 256GB</p>
                    <p>1x microSD Card Slot</p>
                    <p>1x M.2 M Key 2280 Slot</p>
                    <p>1x M.2 M Key 2230 Slot</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Networking</p>
                  </td>
                  <td>
                    <p>1x GbE RJ45 Port (PoE support with optional PoE module)</p>
                    <p>1x M.2 E Key 2230 Slot</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Display</p>
                  </td>
                  <td>
                    <p>1x DP</p>
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
                    <p>USB</p>
                  </td>
                  <td>
                    <p>1× USB Type-C Port</p>
                    <p>4x USB 3.2 Gen1 Type-A Ports</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Other</p>
                  </td>
                  <td>
                    <p>1x 40-Pin GPIO Header</p>
                    <p>1x 12-Pin Button Header</p>
                    <p>1x 4-Pin PoE Header</p>
                    <p>1x 4-Pin PWM Fan Connector</p>
                    <p>1x 4-Pin CAN Bus Header</p>
                    <p>1x 2-Pin RTC Battery Connector</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Power</p>
                  </td>
                  <td>
                    <p>DC5525 Power Jack (9-20V Input)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dimension</p>
                  </td>
                  <td>
                    <p>100mm x 79mm</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <img src="/jupiter2-dev-kit/kit-bg.webp" alt="Jupiter2 dev kit" className={styles_j2["postion-img"]} />
      </div>
      <BuyPop type='jupiter2-dev-kit' />
    </Layout >
  )
}