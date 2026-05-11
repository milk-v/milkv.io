import Layout from "@theme/Layout";
import styles from "./index.module.css";
import MetaData from "../../components/MetaData";
import clsx from "clsx";
import styles_s from '@site/src/pages/vega/index.module.css';
import styles_j from '@site/src/pages/jupiter/index.module.css';
import Translate, { translate } from "@docusaurus/Translate";
import Link from '@docusaurus/Link';
import BuyPop from "../../components/BuyPop";

export default () => {
  return (
    <Layout
      title="Jupiter"
      description="Jupiter"
    >
      <MetaData page='jupiter2' />
      <div className={styles["jupiter2-content"]}>
        <div className={styles["header"]}>
          <h1>Milk-V Jupiter2</h1>
          <ol>
            <li><Translate id='page.jupiter2.text1' /></li>
            <li><Translate id='page.jupiter2.text2' /></li>
            <li>
              <Translate id='page.jupiter2.text3' />
              <span><Translate id='page.jupiter2.text4' /></span>
            </li>
          </ol>
          <p><Translate id='page.jupiter2.text5' /></p>
          <Link to='#buy' className={styles["btn-buy"]} >
            <Translate id='Buy.now' />
          </Link>
        </div>
        <div className={styles["content"]}>
          <div className={clsx(styles["cpu"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text6' /><br />
              <Translate id='page.jupiter2.text7' />
            </p>
            <ul className={styles["item-list"]}>
              <li><Translate id='page.jupiter2.text8' /></li>
              <li
                dangerouslySetInnerHTML={{
                  __html: translate({
                    id: "page.jupiter2.text9",
                  }),
                }}
              ></li>
              <li><Translate id='page.jupiter2.text10' /></li>
            </ul>
          </div>
          <div className={styles["ai_video"]}>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text11' /><br />
                <Translate id='page.jupiter2.text12' />
              </p>
              <ul className={styles["item-list"]}>
                <li><Translate id='page.jupiter2.text13' /></li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: translate({
                      id: "page.jupiter2.text14",
                    }),
                  }}
                ></li>
                <li><Translate id='page.jupiter2.text15' /></li>
              </ul>
            </div>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text16' />
              </p>
              <ul className={styles["item-list"]}>
                <li><Translate id='page.jupiter2.text17' /></li>
              </ul>
              <img src="/jupiter2/cpu-icon.webp" alt="IMG BXM-4-64-MC1" />
            </div>
          </div>
          <div className={clsx(styles["rvv"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text18' />
            </p>
            <p className={styles["item-p"]}><Translate id='page.jupiter2.text19' /></p>
            <ul className={styles["item-list"]}>
              <li><Translate id='page.jupiter2.text20' /></li>
            </ul>
          </div>
          <div className={clsx(styles["hardware"], styles["interface-item"])}>
            <div>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text21' />
              </p>
              <ul className={styles["item-list"]}>
                <li><Translate id='page.jupiter2.text22' /></li>
                <li><Translate id='page.jupiter2.text23' /></li>
              </ul>
            </div>
          </div>
          <div className={styles["interface-item"]}>
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text24' />
            </p>
            <div className={styles["storage"]}>
              <div className={styles["lpddr5"]}>
                <p className={styles["item-p"]}><Translate id='page.jupiter2.text25' /></p>
                <ul className={styles["item-list"]}>
                  <li><Translate id='page.jupiter2.text26' /></li>
                  <li><Translate id='page.jupiter2.text27' /></li>
                  <li><Translate id='page.jupiter2.text28' /></li>
                </ul>
              </div>
              <div className={styles["ufs"]}>
                <div>
                  <p className={styles["item-p"]}><Translate id='page.jupiter2.text29' /></p>
                  <ul className={styles["item-list"]}>
                    <li><Translate id='page.jupiter2.text30' /></li>
                  </ul>
                </div>
                <div>
                  <p className={styles["item-p"]}><Translate id='page.jupiter2.text31' /></p>
                  <ul className={styles["item-list"]}>
                    <li><Translate id='page.jupiter2.text32' /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles["network"], styles["interface-item"])}>
            <img src="/jupiter2/network-bg.webp" alt="Network" />
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text33' />
            </p>
            <ul className={clsx(styles["item-list"], styles["item-list-network"])}>
              <li><span>1</span><Translate id='page.jupiter2.text34' /></li>
              <li><span>2</span><Translate id='page.jupiter2.text35' /></li>
              <li><span>3</span><Translate id='page.jupiter2.text36' /></li>
              <li><span>4</span><Translate id='page.jupiter2.text37' /></li>
            </ul>
          </div>
          <div className={clsx(styles["display"], styles["ai_video"])}>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text38' />
              </p>
              <ul className={styles["item-list"]}>
                <li><Translate id='page.jupiter2.text39' /></li>
                <li><Translate id='page.jupiter2.text40' /></li>
              </ul>
            </div>
            <div className={styles["interface-item"]}>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text41' />
              </p>
              <p className={styles["item-p"]}><Translate id='page.jupiter2.text42' /></p>
              <ul className={styles["item-list"]}>
                <li><Translate id='page.jupiter2.text43' /></li>
                <li><Translate id='page.jupiter2.text44' /></li>
              </ul>
              <img src="/jupiter2/codec-bg.webp" alt="AI Video Codec" />
            </div>
          </div>
          <div className={clsx(styles["expansion"], styles["interface-item"])}>
            <div>
              <p className={styles["item-title"]}>
                <Translate id='page.jupiter2.text45' />
              </p>
              <p className={styles["item-p"]}><Translate id='page.jupiter2.text46' /></p>
            </div>
            <ul className={clsx(styles["item-list"], styles["item-list-network"])}>
              <li><span>1</span><Translate id='page.jupiter2.text47' /></li>
              <li><span>2</span><Translate id='page.jupiter2.text48' /></li>
              <li><span>3</span><Translate id='page.jupiter2.text49' /></li>
            </ul>
          </div>
          <div className={clsx(styles["support"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text50' />
            </p>
            <ul className={styles["item-list"]}>
              <li><Translate id='page.jupiter2.text51' /></li>
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
          <div className={clsx(styles["packageklist"], styles["interface-item"])}>
            <p className={styles["item-title"]}>
              <Translate id='page.jupiter2.text52' />
            </p>
            <ul className={styles["packageklist-list"]}>
              <li><span></span><Translate id='page.jupiter2.text53' /></li>
              <li><span></span><Translate id='page.jupiter2.text54' /></li>
              <li><span></span><Translate id='page.jupiter2.text55' /></li>
            </ul>
            <img src="/jupiter2/package-list-jupiter2.png" alt="Jupiter 2" className={styles["packageklist-board"]} />
            <img src="/jupiter2/package-list-heatsink.png" alt="Active Heatsink" className={styles["packageklist-heatsink"]} />
          </div>
          <div >
            <h2 className={styles_s.title}><Translate id='line.title.TechSpecs' /></h2>
            <p className={styles_s.moreP}>
              <Translate id='page.jupiter2.text56' /><br />
              <Translate id='page.jupiter2.text57' />
            </p>
            <h2 className={styles_s.headword}><Translate id='duo.info.text.Hardware' /></h2>
            <table className={styles_j.jupiter_table}>
              <tbody>
                <tr>
                  <td className={styles_j.tabline}><Translate id='page.jupiter2.text58' /></td>
                  <td className={styles_j.tabP}>
                    <p>SPACEMIT K3（RVA23）</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text59' /></p>
                  </td>
                  <td>
                    <p>8-core A100™</p>
                    <ul>
                      <li><Translate id='page.jupiter2.text60' /></li>
                      <li><Translate id='page.jupiter2.text61' /></li>
                      <li><Translate id='page.jupiter2.text62' /></li>
                      <li><Translate id='page.jupiter2.text63' /></li>
                      <li><Translate id='page.jupiter2.text64' /></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text65' /></p>
                  </td>
                  <td>
                    <p>IMG BXM-4-64-MC1</p>
                    <ul>
                      <li><Translate id='page.jupiter2.text66' /></li>
                      <li><Translate id='page.jupiter2.text67' /></li>
                      <li><Translate id='page.jupiter2.text68' /></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text69' /></p>
                  </td>
                  <td>
                    <p>8-core A100™</p>
                    <ul>
                      <li><Translate id='page.jupiter2.text70' /></li>
                      <li><Translate id='page.jupiter2.text71' /></li>
                      <li><Translate id='page.jupiter2.text72' /></li>
                      <li><Translate id='page.jupiter2.text73' /></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text74' /></p>
                  </td>
                  <td>
                    <p>LPDDR5</p>
                    <ul>
                      <li><Translate id='page.jupiter2.text75' /></li>
                      <li><Translate id='page.jupiter2.text76' /></li>
                      <li><Translate id='page.jupiter2.text77' /></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text78' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text79' /></p>
                    <ul>
                      <li><Translate id='page.jupiter2.text80' /></li>
                    </ul>
                    <p><Translate id='page.jupiter2.text81' /></p>
                    <ul>
                      <li><Translate id='page.jupiter2.text82' /></li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text83' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text84' /></p>
                    <p><Translate id='page.jupiter2.text85' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text86' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text87' /></p>
                    <p><Translate id='page.jupiter2.text88' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text89' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text90' /></p>
                    <p><Translate id='page.jupiter2.text91' /></p>
                    <p><Translate id='page.jupiter2.text92' /></p>
                    <p><Translate id='page.jupiter2.text93' /></p>
                    <p><Translate id='page.jupiter2.text94' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text95' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text96' /></p>
                    <p><Translate id='page.jupiter2.text97' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text98' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text99' /></p>
                    <p><Translate id='page.jupiter2.text100' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text101' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text102' /></p>
                    <p><Translate id='page.jupiter2.text103' /></p>
                    <p><Translate id='page.jupiter2.text104' /></p>
                    <p><Translate id='page.jupiter2.text105' /></p>
                    <p>...</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text107' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text108' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text109' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text110' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text111' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text112' /></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><Translate id='page.jupiter2.text113' /></p>
                  </td>
                  <td>
                    <p><Translate id='page.jupiter2.text114' /></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <img src="/jupiter2/bg-view.webp" alt="Jupiter2" className={styles["postion-img"]} />
      </div>
      <BuyPop type='jupiter2' />
    </Layout >
  )
}
