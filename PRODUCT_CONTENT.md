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

## CV181 兼容芯片接入

六款兼容芯片的数据保存在私有内容仓库 `website/products/cv181*.json`，
页面继续由本仓库的 `src/pages/chips/<id>/index.js` 提供，数据设置
`generatePage: false`，避免与插件自动生成的页面产生路由冲突。

目录读取 `legacy.chip.catalogGroup` 和 `catalogOrder`，在原有三款芯片之后
追加两组三张卡片；`catalog_image` 指向目录示意图，`front_view` 指向详情示意图。
详情使用 `ChipSpecification`，直接复用 `ChipsView/index.module.css`，仅展示已有的
概述、硬件规格、服务介绍和联系区域。原 `ChipsView` 及现有芯片数据保持原实现。

在本仓库目录下，使用同级内容仓库进行完整构建和预览：

```bash
PRODUCT_DATA_DIR="$(realpath ../website/products)" PRODUCT_DATA_REQUIRED=true npm run build
npm run serve -- --host 0.0.0.0 --port 3000 --no-open
```

新增数据与主站路由、`static/chips/packages/` 素材需要配套发布。现有工作流读取
`PRODUCT_DATA_REPOSITORY` 指定的内容仓库；先推送私有内容，再推送主站代码触发构建。
仅更新私有内容仓库后，需要手动触发主站工作流才能重新发布。

没有私有数据的 PR 构建只显示原有三张目录卡片；新增详情保留型号及返回目录的入口。
该回退用于验证公开代码可独立构建，正式构建仍需设置 `PRODUCT_DATA_REQUIRED=true`。
