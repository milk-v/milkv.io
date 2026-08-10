import React from 'react';
import Link from '@docusaurus/Link';
import useProductContent from '@site/src/hooks/useProductContent';
import styles from './head.module.css';

const vendorPresentation = {
  crowdSupply_url: {image: '/components/crowdsupply.svg', label: 'Crowd Supply', location: 'China Mainland'},
  other_url: {image: '/components/other.svg', label: 'Other countries and regions', location: 'China Mainland'},
  arace_url: {image: '/components/arace.svg', label: 'ARACE', location: 'Hong Kong'},
  taobao_url: {image: '/components/taobao.svg', label: '淘宝', location: 'China Mainland'},
  jd_url: {image: '/components/jd.webp', label: '京东', location: 'China Mainland'},
  mouser_url: {image: '/components/mouser.svg', label: 'Mouser', location: 'United States'},
  banli_url: {image: '/components/banli.svg', label: '斑梨电子', location: 'China Mainland'},
  chilli_url: {image: '/components/platima.png', label: 'Platima Tinkers', location: 'Australia'},
  allnet_url: {image: '/components/allent.svg', label: 'ALLNET', location: 'China Mainland'},
  robu_url: {image: '/components/robu.png', label: 'Rubu.in', location: 'India'},
  contact_url: {image: '/components/milkv.webp', label: 'Contace us', location: 'China Mainland'},
  pajenicko_url: {image: '/components/pajenicko.png', label: 'Pajenicko', location: 'Česko'},
};

export default function BuyPop({type}) {
  const productContent = useProductContent(type);
  const buy = productContent?.product.legacy?.buy;
  if (!buy) {
    return null;
  }

  const outlets = Object.entries(buy.outlets || {});
  return (
    <div id="buy" className={styles.buy_box}>
      <div className={styles.buy_center}>
        <h2>Buy Milk-V {type.toUpperCase()}</h2>
        <div className={styles.flex_center}>
          <img src={buy.picture} alt={type} />
          {outlets.length > 0 ? (
            <ul className={styles.agents}>
              {outlets.map(([vendorId, url]) => {
                const vendor = vendorPresentation[vendorId] || {
                  image: '/components/other.svg',
                  label: vendorId,
                  location: 'Worldwide',
                };
                const area = ['jd_url', 'taobao_url', 'banli_url'].includes(vendorId)
                  ? 'to China'
                  : 'Worldwidely';
                return (
                  <li key={vendorId} onClick={() => window.open(url, '_blank')}>
                    <img src={vendor.image} alt={vendor.label} />
                    <div className={styles.agent_info}>
                      <p className={styles.agent_official}>Official Agents:</p>
                      <p className={styles.agent_br}>{vendor.label}</p>
                      <p className={styles.agent_official}>Based in</p>
                      <p className={styles.agent_br}>{vendor.location}</p>
                      <Link to={url}>shipping {area}</Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.comingsoon}>
              <img src="/components/comingsoon-icon.svg" alt="Coming Soon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
