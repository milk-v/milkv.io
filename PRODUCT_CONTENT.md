# Private product content

Product detail content is loaded at build time from a separate private repository. The
private repository is the editing source of truth; only the rendered public content is
included in the deployed website.

## Private repository layout

Store one JSON document per product under `products/`:

```text
products/
  duo.json
  jupiter2.json
  megrez.json
```

Use
[`plugins/product-content/__fixtures__/example-board.json`](plugins/product-content/__fixtures__/example-board.json)
as the schema example. Files beginning with `_` are ignored, which allows the private
repository to keep schema metadata next to the content.

Every product requires an English locale as the fallback. A locale that is not present
falls back to English. Supported section types are `features`, `media`,
`specifications`, and `resources`. Text is rendered as plain text; raw HTML is not
accepted.

All image paths must be absolute website paths such as `/duo/board.webp`, or HTTPS URLs.
Assets referenced by website paths remain in this repository's `static/` directory.
The build fails when a referenced site image does not exist, so broken product media is
not deployed silently.

## Local development

Check out the private repository beside or inside this repository and point the build at
its `products` directory:

```powershell
$env:PRODUCT_DATA_DIR = "C:\path\to\private-product-data\products"
npm run start
```

Set `PRODUCT_DATA_REQUIRED=true` to fail immediately when the data directory is absent.
Without `PRODUCT_DATA_DIR`, the plugin reads `.product-data/products`; if that directory
does not exist, existing hard-coded product pages continue to work.

To exercise the renderer with the non-production fixture:

```powershell
$env:PRODUCT_DATA_DIR = "plugins\product-content\__fixtures__"
npm run build
```

## GitHub Actions setup

Configure the public website repository with:

- Repository secret `PRODUCT_DATA_TOKEN`: a fine-grained, read-only token with Contents
  access to `milk-v/website`

The deploy workflow checks out `milk-v/website` only for trusted push or manual
builds. Pull request builds never receive the token.

## Migrating a product

1. Add and validate the product JSON in the private repository.
2. Run a local build with `PRODUCT_DATA_DIR` pointing to that checkout.
3. Remove the old `src/pages/<product>` page in the same website change. Until it is
   removed, its route conflicts with the route generated from private data.
4. Keep the JSON `path` unchanged so existing links and search results continue to work.

Private storage does not make published product text confidential. The generated HTML
and JSON are public after deployment; only the source repository and CI credential stay
private.
