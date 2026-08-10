const fs = require('fs');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');
const {validateProduct, validateProducts} = require('./validate');

const fixturePath = path.join(__dirname, '__fixtures__', 'example-board.json');

function fixture() {
  return JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
}

test('accepts a complete product document', () => {
  assert.equal(validateProduct(fixture(), 'fixture').id, 'example-board');
});

test('rejects unsafe client links', () => {
  const product = fixture();
  product.locales.en.actions[0].href = 'javascript:alert(1)';
  assert.throws(
    () => validateProduct(product, 'fixture'),
    /must use http\(s\), mailto, an absolute site path, or an anchor/,
  );
});

test('rejects protocol-relative links', () => {
  const product = fixture();
  product.locales.en.actions[0].href = '//unexpected.example/path';
  assert.throws(
    () => validateProduct(product, 'fixture'),
    /must use http\(s\), mailto, an absolute site path, or an anchor/,
  );
});

test('rejects duplicate routes across files', () => {
  const first = fixture();
  const second = fixture();
  second.id = 'another-board';
  assert.throws(
    () => validateProducts([
      {product: first, source: 'first.json'},
      {product: second, source: 'second.json'},
    ]),
    /duplicates product path/,
  );
});
