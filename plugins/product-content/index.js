const fs = require('fs/promises');
const path = require('path');
const {aliasedSitePath, normalizeUrl} = require('@docusaurus/utils');
const {validateProducts} = require('./validate');

async function listJsonFiles(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listJsonFiles(entryPath);
    }
    if (entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('_')) {
      return [entryPath];
    }
    return [];
  }));
  return nestedFiles.flat().sort();
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function collectLocalImagePaths(product) {
  const sources = new Set();
  const addImage = (image) => {
    if (image?.src?.startsWith('/')) {
      sources.add(image.src.split(/[?#]/, 1)[0]);
    }
  };

  addImage(product.heroImage);
  Object.values(product.locales).forEach((locale) => {
    locale.sections?.forEach((section) => {
      addImage(section.image);
      section.items?.forEach((item) => addImage(item.image));
    });
  });
  return [...sources];
}

async function validateLocalAssets(products, staticDirectories) {
  await Promise.all(products.flatMap((product) => (
    collectLocalImagePaths(product).map(async (sitePath) => {
      let relativePath;
      try {
        relativePath = decodeURIComponent(sitePath.slice(1));
      } catch {
        throw new Error(`Product "${product.id}" has an invalid encoded image path: ${sitePath}`);
      }
      const candidates = staticDirectories.map((directory) => path.join(directory, relativePath));
      const exists = await Promise.all(candidates.map(pathExists));
      if (!exists.some(Boolean)) {
        throw new Error(
          `Product "${product.id}" references a missing static image: ${sitePath}`,
        );
      }
    })
  )));
}

module.exports = function productContentPlugin(context, options = {}) {
  const contentPath = path.resolve(context.siteDir, options.contentPath || '.product-data/products');
  const required = options.required === true;

  return {
    name: 'milkv-product-content',

    getPathsToWatch() {
      return [`${contentPath}/**/*.json`];
    },

    async loadContent() {
      if (!(await pathExists(contentPath))) {
        if (required) {
          throw new Error(
            `Product data is required but was not found at ${contentPath}. ` +
            'Set PRODUCT_DATA_DIR to the checked-out private product data directory.',
          );
        }
        return [];
      }

      const files = await listJsonFiles(contentPath);
      const productsWithSources = await Promise.all(files.map(async (file) => {
        let product;
        try {
          product = JSON.parse(await fs.readFile(file, 'utf8'));
        } catch (error) {
          throw new Error(`Unable to read product data file ${file}: ${error.message}`);
        }
        return {product, source: path.relative(context.siteDir, file)};
      }));

      const products = validateProducts(productsWithSources);
      const staticDirectories = context.siteConfig.staticDirectories.map((directory) => (
        path.resolve(context.siteDir, directory)
      ));
      await validateLocalAssets(products, staticDirectories);
      return products;
    },

    async contentLoaded({content, actions}) {
      const {addRoute, createData, setGlobalData} = actions;
      setGlobalData({
        products: Object.fromEntries(content.map((product) => [product.id, product])),
      });
      await Promise.all(content.filter((product) => product.generatePage !== false).map(async (product) => {
        const dataPath = await createData(
          `product-${product.id}.json`,
          JSON.stringify(product, null, 2),
        );
        addRoute({
          path: normalizeUrl([context.siteConfig.baseUrl, product.path]),
          component: '@site/src/components/ProductDetail/index.js',
          exact: true,
          modules: {
            product: aliasedSitePath(dataPath, context.siteDir),
          },
        });
      }));
    },
  };
};
