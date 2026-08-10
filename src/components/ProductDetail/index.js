import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

function SectionHeading({title, description}) {
  if (!title && !description) {
    return null;
  }
  return (
    <header className={styles.sectionHeading}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </header>
  );
}

function Features({section}) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading title={section.title} description={section.description} />
        <div className={styles.featureGrid}>
          {section.items.map((item, index) => (
            <article className={styles.feature} key={`${item.title}-${index}`}>
              {item.image && <img src={item.image.src} alt={item.image.alt} />}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Media({section}) {
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className={clsx(styles.container, styles.media, section.imagePosition === 'left' && styles.mediaReverse)}>
        <div className={styles.mediaContent}>
          <SectionHeading title={section.title} description={section.description} />
          {section.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <img className={styles.mediaImage} src={section.image.src} alt={section.image.alt} />
      </div>
    </section>
  );
}

function Specifications({section}) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading title={section.title} description={section.description} />
        {section.groups.map((group) => (
          <div className={styles.specGroup} key={group.title}>
            <h3>{group.title}</h3>
            <div className={styles.tableWrap}>
              <table>
                <tbody>
                  {group.rows.map((row, index) => (
                    <tr key={`${row.label}-${index}`}>
                      <th scope="row">{row.label}</th>
                      <td>
                        {Array.isArray(row.value) ? (
                          <ul>{row.value.map((value, index) => <li key={`${value}-${index}`}>{value}</li>)}</ul>
                        ) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Resources({section}) {
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className={styles.container}>
        <SectionHeading title={section.title} description={section.description} />
        <div className={styles.resources}>
          {section.items.map((item) => (
            <Link className={styles.resource} to={item.href} key={`${item.label}-${item.href}`}>
              <span>
                <strong>{item.label}</strong>
                {item.description && <small>{item.description}</small>}
              </span>
              <span aria-hidden="true">&#8594;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionComponents = {
  features: Features,
  media: Media,
  specifications: Specifications,
  resources: Resources,
};

export default function ProductDetail({product}) {
  const {i18n} = useDocusaurusContext();
  const fallbackContent = product.locales.en;
  const localizedContent = product.locales[i18n.currentLocale] || fallbackContent;
  const content = {
    ...fallbackContent,
    ...localizedContent,
    seo: {...fallbackContent.seo, ...localizedContent.seo},
  };

  return (
    <Layout title={content.seo.title} description={content.seo.description}>
      {content.seo.keywords?.length > 0 && (
        <Head>
          <meta name="keywords" content={content.seo.keywords.join(', ')} />
        </Head>
      )}
      <main className={clsx(styles.page, product.theme === 'dark' && styles.dark)}>
        <section className={styles.hero}>
          <img className={styles.heroImage} src={product.heroImage.src} alt={product.heroImage.alt} />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={clsx(styles.container, styles.heroContent)}>
            <h1>{content.name}</h1>
            <p className={styles.tagline}>{content.tagline}</p>
            {content.summary && <p className={styles.summary}>{content.summary}</p>}
            {content.actions?.length > 0 && (
              <div className={styles.actions}>
                {content.actions.map((action) => (
                  <Link
                    className={clsx(styles.action, action.variant === 'secondary' && styles.actionSecondary)}
                    to={action.href}
                    key={`${action.label}-${action.href}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        {content.sections?.map((section, index) => {
          const Section = sectionComponents[section.type];
          return <Section section={section} key={`${section.type}-${section.title || index}`} />;
        })}
      </main>
    </Layout>
  );
}
