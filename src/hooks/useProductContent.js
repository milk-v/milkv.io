import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';

export default function useProductContent(productId) {
  const {i18n} = useDocusaurusContext();
  const pluginData = usePluginData('milkv-product-content');
  const product = pluginData?.products?.[productId];
  if (!product) {
    return null;
  }

  const fallbackContent = product.locales.en;
  const localizedContent = product.locales[i18n.currentLocale] || fallbackContent;
  return {
    product,
    content: {
      ...fallbackContent,
      ...localizedContent,
      seo: {...fallbackContent.seo, ...localizedContent.seo},
    },
    locale: i18n.currentLocale,
  };
}
