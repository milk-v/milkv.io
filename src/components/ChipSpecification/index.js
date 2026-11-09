import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useProductContent from '@site/src/hooks/useProductContent';
import SupportUs from '@site/src/components/SupportUs';
import styles from '@site/src/components/ChipsView/index.module.css';

const activeTabStyle = {
  borderBottom: '2px solid #2D88C9',
  color: '#000',
  fontWeight: 600,
};

function Separator() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7.78811 17.7955L14.9131 5.45467C15.0381 5.23816 15.2089 5.19241 15.4254 5.31741L16.0749 5.69241C16.2914 5.81741 16.3372 5.98816 16.2122 6.20467L9.08715 18.5455C8.96215 18.762 8.7914 18.8078 8.57489 18.6828L7.92537 18.3078C7.70886 18.1828 7.66311 18.012 7.78811 17.7955Z" fill="#999999" />
  </svg>;
}

export default function ChipSpecification({chipName}) {
  const productContent = useProductContent(chipName);
  const data = productContent?.product.legacy?.chip;
  const isChinese = productContent?.locale === 'zh';
  const tabRef = useRef(null);
  const overviewRef = useRef(null);
  const hardwareRef = useRef(null);
  const choosingRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showTop, setShowTop] = useState(false);

  const getScrollOffset = () => (
    (document.querySelector('.navbar')?.clientHeight || 0)
    + (document.querySelector(`.${styles.tabs_hied}`)?.clientHeight || 0)
    + (tabRef.current?.clientHeight || 0)
  );

  useEffect(() => {
    const update = () => {
      const offset = getScrollOffset() + 2;
      let index = 0;
      [overviewRef, hardwareRef, choosingRef].forEach((ref, i) => {
        if (ref.current && ref.current.getBoundingClientRect().top <= offset) index = i;
      });
      setActiveTab(index);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', update, {passive: true});
    update();
    return () => window.removeEventListener('scroll', update);
  }, [chipName]);

  // Public PR builds intentionally run without the private content repository.
  if (!data) {
    return <Layout title={chipName.toUpperCase()}><div className={styles.chip_diagram}>
      <h2>{chipName.toUpperCase()}</h2><Link to="/chips">Chips</Link>
    </div></Layout>;
  }

  const tabs = [
    {id: 'overview', text: <Translate id="overview" />, ref: overviewRef},
    {id: 'hardware', text: <Translate id="duo.info.text.Hardware" />, ref: hardwareRef},
    {id: 'choosing-us', text: <Translate id="ChoosingUs" />, ref: choosingRef},
  ];
  const title = isChinese ? data.title_zh : data.title;
  const paragraphs = isChinese ? data.chip_intro_text_zh : data.chip_intro_text;
  const hardware = isChinese ? data.hardware_zh : data.hardware;
  const contactUrl = `mailto:sales@milkv.io?subject=${encodeURIComponent(`${chipName.toUpperCase()} - ${isChinese ? '芯片选型与资料咨询' : 'Chip enquiry'}`)}`;

  const goToSection = (tab, index) => {
    window.scrollTo({top: window.scrollY + tab.ref.current.getBoundingClientRect().top - getScrollOffset(), behavior: 'instant'});
    setActiveTab(index);
  };

  return <Layout title={productContent.content.seo.title} description={productContent.content.seo.description}>
    <div className={styles.tabs_hied}>
      <div className={styles.tab_card}>
        <Link to="/">Home</Link><Separator />
        <Link to="/chips">Chips</Link><Separator />
        <span><Link to={`/chips/${chipName}`}>{chipName.toUpperCase()}</Link></span>
      </div>
    </div>
    <div className={styles.chip_module}>
      <div className={styles.chip_title}>
        <div className={styles.title_l_t}>
          <h4>{title}</h4>
          <Link to={contactUrl}>{isChinese ? '联系我们' : 'Contact Us'}</Link>
        </div>
        <img src={data.front_view} alt={isChinese ? '封装示意，非实物照片' : 'Package illustration, not a product photograph'} />
      </div>
    </div>
    <div className={styles.table_separate}>
      <ul className={styles.table_u} ref={tabRef}>
        {tabs.map((tab, index) => <li key={tab.id} tabIndex={0} role="button"
          style={activeTab === index ? activeTabStyle : undefined}
          onClick={() => goToSection(tab, index)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              goToSection(tab, index);
            }
          }}>{tab.text}</li>)}
      </ul>
    </div>
    <div className={styles.chip_module} ref={overviewRef} id="overview">
      <div className={styles.chip_introduction}>
        <div className={styles.chip_view}>
          <div className={styles.chip_view_contexts}>
            <img src={data.front_view} alt={isChinese ? '封装示意，非实物照片' : 'Package illustration, not a product photograph'} />
          </div>
        </div>
        <div className={styles.chip_intro_t}>
          {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
          <p><Link to={`/chips/${data.relatedChip}`}>
            {isChinese ? '了解' : 'Explore'} {data.relatedChip.toUpperCase()}
          </Link></p>
        </div>
      </div>
    </div>
    <div className={styles.chip_diagram}>
      <div ref={hardwareRef} id="hardware">
        <h2><Translate id="duo.info.text.Hardware" /></h2>
        <ul className={styles.hardware_ul}>
          {Object.entries(hardware).map(([key, values]) => <li key={key}>
            <p className={styles.causality}>{key}</p>
            <ul className={styles.causality_data}>
              {values.map((value, index) => <li key={index} style={{color: '#333'}}>{value}</li>)}
            </ul>
          </li>)}
        </ul>
      </div>
      <div className={styles.certificate} ref={choosingRef} id="choosing-us">
        <h2><Translate id="ChoosingUs" /></h2>
        <div>
          <div className={styles.choosing_item}>
            <img src="/chips/authorized.webp" alt="authorized" />
            <div className={styles.text_l}>
              <h3><Translate id="ChoosingUs.item1.title" /></h3>
              <p><Translate id="ChoosingUs.item1.info" /></p>
            </div>
          </div>
          <div className={styles.choosing_item}>
            <img src="/chips/custom.webp" alt="design" />
            <div className={styles.text_l}>
              <h3>Custom Solutions Support</h3>
              <p>We have mature PCBA solutions and extensive product design experience, offering customized solutions tailored to your unique needs.</p>
            </div>
          </div>
          <div className={styles.choosing_item}>
            <img src="/chips/team.webp" alt="team" />
            <div className={styles.text_l}>
              <h3><Translate id="ChoosingUs.item3.title" /></h3>
              <p><Translate id="ChoosingUs.item3.info" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.toTop} style={{display: showTop ? 'block' : 'none'}}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <img src="/chips/backtop.svg" alt="TOP" />
    </div>
    <SupportUs />
  </Layout>;
}
