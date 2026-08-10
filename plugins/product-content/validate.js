const SECTION_TYPES = new Set([
  'features',
  'media',
  'specifications',
  'resources',
]);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function fail(source, path, message) {
  throw new Error(`${source}: ${path} ${message}`);
}

function requireObject(value, source, path) {
  if (!isObject(value)) {
    fail(source, path, 'must be an object');
  }
}

function requireString(value, source, path) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(source, path, 'must be a non-empty string');
  }
}

function optionalString(value, source, path) {
  if (value !== undefined) {
    requireString(value, source, path);
  }
}

function optionalStringArray(value, source, path) {
  if (value === undefined) {
    return;
  }
  if (!Array.isArray(value)) {
    fail(source, path, 'must be an array');
  }
  value.forEach((item, index) => requireString(item, source, `${path}[${index}]`));
}

function validateLink(link, source, path) {
  requireObject(link, source, path);
  requireString(link.label, source, `${path}.label`);
  requireString(link.href, source, `${path}.href`);
  optionalString(link.description, source, `${path}.description`);
  if (!/^(?:https?:\/\/|mailto:|\/(?!\/)|#)/.test(link.href)) {
    fail(source, `${path}.href`, 'must use http(s), mailto, an absolute site path, or an anchor');
  }
  if (link.variant !== undefined && !['primary', 'secondary'].includes(link.variant)) {
    fail(source, `${path}.variant`, 'must be "primary" or "secondary"');
  }
}

function validateImage(image, source, path) {
  requireObject(image, source, path);
  requireString(image.src, source, `${path}.src`);
  requireString(image.alt, source, `${path}.alt`);
  if (!/^(?:https?:\/\/|\/(?!\/))/.test(image.src)) {
    fail(source, `${path}.src`, 'must use http(s) or an absolute site path');
  }
}

function validateSection(section, source, path) {
  requireObject(section, source, path);
  requireString(section.type, source, `${path}.type`);
  if (!SECTION_TYPES.has(section.type)) {
    fail(source, `${path}.type`, `must be one of: ${[...SECTION_TYPES].join(', ')}`);
  }
  optionalString(section.title, source, `${path}.title`);
  optionalString(section.description, source, `${path}.description`);

  if (section.type === 'features') {
    if (!Array.isArray(section.items) || section.items.length === 0) {
      fail(source, `${path}.items`, 'must be a non-empty array');
    }
    section.items.forEach((item, index) => {
      const itemPath = `${path}.items[${index}]`;
      requireObject(item, source, itemPath);
      requireString(item.title, source, `${itemPath}.title`);
      requireString(item.description, source, `${itemPath}.description`);
      if (item.image !== undefined) {
        validateImage(item.image, source, `${itemPath}.image`);
      }
    });
  }

  if (section.type === 'media') {
    optionalStringArray(section.body, source, `${path}.body`);
    validateImage(section.image, source, `${path}.image`);
    if (section.imagePosition !== undefined && !['left', 'right'].includes(section.imagePosition)) {
      fail(source, `${path}.imagePosition`, 'must be "left" or "right"');
    }
  }

  if (section.type === 'specifications') {
    if (!Array.isArray(section.groups) || section.groups.length === 0) {
      fail(source, `${path}.groups`, 'must be a non-empty array');
    }
    section.groups.forEach((group, groupIndex) => {
      const groupPath = `${path}.groups[${groupIndex}]`;
      requireObject(group, source, groupPath);
      requireString(group.title, source, `${groupPath}.title`);
      if (!Array.isArray(group.rows) || group.rows.length === 0) {
        fail(source, `${groupPath}.rows`, 'must be a non-empty array');
      }
      group.rows.forEach((row, rowIndex) => {
        const rowPath = `${groupPath}.rows[${rowIndex}]`;
        requireObject(row, source, rowPath);
        requireString(row.label, source, `${rowPath}.label`);
        if (typeof row.value !== 'string' && !Array.isArray(row.value)) {
          fail(source, `${rowPath}.value`, 'must be a string or an array of strings');
        }
        if (Array.isArray(row.value)) {
          optionalStringArray(row.value, source, `${rowPath}.value`);
        } else {
          requireString(row.value, source, `${rowPath}.value`);
        }
      });
    });
  }

  if (section.type === 'resources') {
    if (!Array.isArray(section.items) || section.items.length === 0) {
      fail(source, `${path}.items`, 'must be a non-empty array');
    }
    section.items.forEach((item, index) => validateLink(item, source, `${path}.items[${index}]`));
  }
}

function validateLocale(content, source, path) {
  requireObject(content, source, path);
  requireString(content.name, source, `${path}.name`);
  requireString(content.tagline, source, `${path}.tagline`);
  optionalString(content.summary, source, `${path}.summary`);

  requireObject(content.seo, source, `${path}.seo`);
  requireString(content.seo.title, source, `${path}.seo.title`);
  requireString(content.seo.description, source, `${path}.seo.description`);
  optionalStringArray(content.seo.keywords, source, `${path}.seo.keywords`);

  if (content.actions !== undefined) {
    if (!Array.isArray(content.actions)) {
      fail(source, `${path}.actions`, 'must be an array');
    }
    content.actions.forEach((action, index) => validateLink(action, source, `${path}.actions[${index}]`));
  }

  if (content.sections !== undefined) {
    if (!Array.isArray(content.sections)) {
      fail(source, `${path}.sections`, 'must be an array');
    }
    content.sections.forEach((section, index) => validateSection(section, source, `${path}.sections[${index}]`));
  }
}

function validateProduct(product, source = 'product data') {
  requireObject(product, source, '$');
  if (product.schemaVersion !== 1) {
    fail(source, '$.schemaVersion', 'must equal 1');
  }
  requireString(product.id, source, '$.id');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id)) {
    fail(source, '$.id', 'must contain only lowercase letters, numbers, and single hyphens');
  }
  requireString(product.path, source, '$.path');
  if (!/^\/[a-z0-9]+(?:[\/-][a-z0-9]+)*$/.test(product.path)) {
    fail(source, '$.path', 'must be an absolute URL path using lowercase letters, numbers, and hyphens');
  }
  if (product.theme !== undefined && !['light', 'dark'].includes(product.theme)) {
    fail(source, '$.theme', 'must be "light" or "dark"');
  }
  if (product.generatePage !== undefined && typeof product.generatePage !== 'boolean') {
    fail(source, '$.generatePage', 'must be a boolean');
  }
  validateImage(product.heroImage, source, '$.heroImage');
  requireObject(product.locales, source, '$.locales');
  if (!product.locales.en) {
    fail(source, '$.locales.en', 'is required as the fallback locale');
  }
  Object.entries(product.locales).forEach(([locale, content]) => {
    if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) {
      fail(source, `$.locales.${locale}`, 'uses an invalid locale key');
    }
    validateLocale(content, source, `$.locales.${locale}`);
  });
  return product;
}

function validateProducts(productsWithSources) {
  const ids = new Set();
  const paths = new Set();
  return productsWithSources.map(({product, source}) => {
    validateProduct(product, source);
    if (ids.has(product.id)) {
      fail(source, '$.id', `duplicates product id "${product.id}"`);
    }
    if (paths.has(product.path)) {
      fail(source, '$.path', `duplicates product path "${product.path}"`);
    }
    ids.add(product.id);
    paths.add(product.path);
    return product;
  });
}

module.exports = {
  SECTION_TYPES,
  validateProduct,
  validateProducts,
};
