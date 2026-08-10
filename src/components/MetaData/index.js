import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useProductContent from '@site/src/hooks/useProductContent';
import siteMetadata from '@site/src/jsonFiles/siteMetadata.json';

const productAliases = {
  marscm: 'mars-cm',
};

export default function MetaData({page}) {
  const {i18n} = useDocusaurusContext();
  const productContent = useProductContent(productAliases[page] || page);
  const sitePage = siteMetadata[page];
  const metadataLocale = i18n.currentLocale === 'zh' ? 'zh' : 'en';
  const legacyMetadata = productContent?.product.legacy?.metadata?.[metadataLocale];
  const sitePageMetadata = sitePage?.[metadataLocale];
  const metadata = legacyMetadata || productContent?.content.seo || sitePageMetadata;

  if (!metadata) {
    return null;
  }

  const keywords = Array.isArray(metadata.keywords)
    ? metadata.keywords.join(', ')
    : metadata.keywords;

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
}
