import Layout from "@theme/Layout";
import styles from "./index.module.css";
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
      <div className={styles["jupiter2-content"]}>
        <div className={styles["header"]}>
          <h1>Milk-V Jupiter2</h1>
          <ol>
            <li>RVA23‑Ready</li>
            <li>RVV 1.0</li>
            <li>
              1024‑bit
              <span>Vector Acceleration</span>
            </li>
          </ol>
          <p>The First RVA23-Compliant RISC-V SBC</p>
        </div>
        <div className={styles["content"]}>
          <div className={clsx(styles["cpu"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              High-Performance CPU<br />
              8-Core X100™ CPU @ 2.4GHz
            </p>
            <ul className={styles["item-list"]}>
              <li>64-bit RISC-V AI processor cores</li>
              <li><font>130 KDMIPS</font> class CPU performance</li>
              <li>Built for desktop-class computing and heavy edge workloads</li>
            </ul>
          </div>
          <div className={styles["ai_video"]}>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                On-Device AI Acceleration<br />
                8-Core A100™ AI CPU
              </p>
              <ul className={styles["item-list"]}>
                <li>Up to 60 TOPS</li>
                <li>Dedicated <font>TCM + DMA</font> acceleration channels</li>
                <li>Supports INT4 / INT8 / FP8 / INT16 / FP16 / BF16 precision</li>
              </ul>
            </div>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                High-Performance CPU<br />
                8-Core X100™ CPU @ 2.4GHz
              </p>
              <ul className={styles["item-list"]}>
                <li>IMG BXM-4-64-MC1</li>
              </ul>
              <img src="/jupiter2/cpu-icon.webp" alt="IMG BXM-4-64-MC1" />
            </div>
          </div>
          <div className={clsx(styles["rvv"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              RVA23 + RVV 1.0
            </p>
            <p className={styles["item-p"]}>Up to 1024-bit RVV 1.0 vector processing</p>
            <ul className={styles["item-list"]}>
              <li>Vector computing made for AI & multimedia</li>
            </ul>
          </div>
          <div className={clsx(styles["hardware"], styles["interface-item"])}>
            <div>
              <p className={styles["item-title"]}>
                Comprehensive Hardware Virtualization
              </p>
              <ul className={styles["item-list"]}>
                <li>Supports RV Hypervisor 1.0, AIA, and RV IOMMU extensions</li>
                <li>Provides full hardware virtualization for CPU, memory, interrupts, and I/O</li>
              </ul>
            </div>
          </div>
          <div className={styles["interface-item"]}>
            <p className={styles["item-title"]}>
              Powerful Storage Expansion
            </p>
            <div className={styles["storage"]}>
              <div className={styles["lpddr5"]}>
                <p className={styles["item-p"]}>LPDDR5</p>
                <ul className={styles["item-list"]}>
                  <li>Up to 32GB</li>
                  <li>Memory bus width: 32-bit (dual-channel, 16-bit per channel)</li>
                  <li>Data rate: up to 6400 MT/s</li>
                </ul>
              </div>
              <div className={styles["ufs"]}>
                <div>
                  <p className={styles["item-p"]}>Onboard UFS (up to 256GB)</p>
                  <ul className={styles["item-list"]}>
                    <li>Faster boot, snappier apps, improved reliability</li>
                  </ul>
                </div>
                <div>
                  <p className={styles["item-p"]}>M.2 M Key 2280 (PCIe Gen3 x4)</p>
                  <ul className={styles["item-list"]}>
                    <li>High-speed NVMe expansion for local knowledge bases, caching, datasets, and NAS/edge storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles["network"], styles["interface-item"])}>
            <img src="/jupiter2/network-bg.webp" alt="Network" />
            <p className={styles["item-title"]}>
              Comprehensive Hardware Virtualization
            </p>
            <ul className={clsx(styles["item-list"], styles["item-list-network"])}>
              <li><span>1</span>High-speed uplink/aggregation/storage networking</li>
              <li><span>2</span>Legacy compatibility and dedicated management link</li>
              <li><span>3</span>Dual-band, dual-antenna for wireless deployment and edge nodes</li>
              <li><span>4</span>4G/5G modules and connectivity expansion for mobile/distributed scenarios</li>
            </ul>
          </div>
          <div className={clsx(styles["display"], styles["ai_video"])}>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                Dual Display Outputs
              </p>
              <ul className={styles["item-list"]}>
                <li>USB Type-C (DP Alt Mode): up to 4K@60Hz</li>
                <li>Embedded DisplayPort (eDP): up to 2.5K@90Hz</li>
              </ul>
            </div>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                High-Frame-Rate Video Codec
              </p>
              <p className={styles["item-p"]}>Built for capture / transcoding, low-latency streaming, and edge video analytics</p>
              <ul className={styles["item-list"]}>
                <li>Decode: H.265 / H.264 / VP9 up to 4K@120fps</li>
                <li>Encode: H.265 / H.264 up to 4K@60fps</li>
              </ul>
              <img src="/jupiter2/codec-bg.webp" alt="AI Video Codec" />
            </div>
          </div>
          <div className={clsx(styles["expansion"], styles["interface-item"])}>
            <div>
              <p className={styles["item-title"]}>
                Real-Time & Industrial Expansion
              </p>
              <p className={styles["item-p"]}>Dual-core RT24™ 64-bit RISC-V Real-Time RISC-V Processor</p>
            </div>
            <ul className={clsx(styles["item-list"], styles["item-list-network"])}>
              <li><span>1</span>Power‑off time keeping</li>
              <li><span>2</span>Support UART, I2C, I2S,  CAN-FD, PWM, GPIOs, etc</li>
              <li><span>3</span>Convenient for both prototyping and production designs</li>
            </ul>
          </div>
          <div className={clsx(styles["support"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              Software Support
            </p>
            <ul className={styles["item-list"]}>
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
          <div >
            <h2 className={styles_s.title}><Translate id='line.title.TechSpecs' /></h2>
            <p className={styles_s.moreP}>
              Powered by the Spacemit K3 (RVA23), this next-gen RISC-V platform features an 8-core X100™ CPU (up to 2.4GHz) with up to 60 TOPS AI performance and RVV 1.0 up to 1024-bit vector acceleration. It offers up to 32GB LPDDR5, onboard UFS (up to 256GB), and an M.2 NVMe slot (PCIe Gen3 x4).<br />
              Connectivity includes 10GbE SFP+, GbE RJ45, and Wi-Fi 6/BT 5.2, plus M.2 B Key + Nano SIM for 4G/5G expansion. With USB-C DP Alt, eDP, and RT I/O expansion for EtherCAT/CAN-FD, it’s ideal for RISC-V AI development and high-performance edge deployments.
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
                    <p>1x M.2 M Key 2280 Slot (PCIe Gen3 x4) for NVMe SSD</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Display</p>
                  </td>
                  <td>
                    <p>1x USB Type-C (DisplayPort Alt Mode), Up to 4K@60Hz</p>
                    <p>1x Embedded DisplayPort (eDP), Up to 2.5K@90Hz</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Networking</p>
                  </td>
                  <td>
                    <p>1x Onboard WiFi 6 + BT 5.2</p>
                    <p>1x GbE RJ45 Port</p>
                    <p>1x 10 GbE SFP+ Port, Supports 10G BASE-R / BASE-X, QinQ, MSI-X, WOL, and clustering.</p>
                    <p>1x Nano SIM Slot</p>
                    <p>1x M.2 B Key Slot (PCIe Gen3 ×2 + USB), Supports 2242 / 3042 cards.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Audio</p>
                  </td>
                  <td>
                    <p>Onboard Codec</p>
                    <p>1x Audio Connector</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>USB</p>
                  </td>
                  <td>
                    <p>2x USB 3.2 Gen1 Type-C Ports</p>
                    <p>4x USB 2.0 Type-A Ports</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Other</p>
                  </td>
                  <td>
                    <p>1x RTC Battery Connector</p>
                    <p>1x FAN Connector</p>
                    <p>2x RT I/O Expansion Connector</p>
                    <p>Supporting expansion modules for EtherCAT, CAN-FD and other real-time interfaces.</p>
                    <p>...</p>
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
                    <p>Power</p>
                  </td>
                  <td>
                    <p>USB Type-C (USB-PD 65W) or ATX 2-pin (12V Input)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Dimension</p>
                  </td>
                  <td>
                    <p>100 x 86 mm</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <img src="/jupiter2/bg-view.webp" alt="Jupiter2" className={styles["postion-img"]} />
      </div>
    </Layout >
  )
}