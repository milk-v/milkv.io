/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Milk-V',
  tagline: 'Everything about RISC-V',
  favicon: 'img/favicon.ico',
  url: 'https://milkv.io',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'milk-v',
  projectName: 'milkv.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/milk-v/milkv.io/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/milk-v/milkv.io/edit/main/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/mdHome.css')],
        },
      }),
    ],
  ],

  themeConfig:

    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '367OH7GCEI',

        // Public API key: it is safe to commit it
        apiKey: 'ce5431087fbfc2c53ba31dede7186154',
        // Your index name
        indexName: 'milkv',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: false,

      },
      colorMode: {
        disableSwitch: true,
      },
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'milkv.io',
          src: 'img/LogoNew.svg',
        },

        items: [
          {
            label: 'Home',
            position: 'right',
            to: '/'
          },
          {
            position: 'right',
            label: 'Community',
            to: 'https://community.milkv.io/'
          },
          {
            type: 'dropdown',
            label: 'Products',
            position: 'right',
            items: [
              {
                label: 'Duo',
                to: '/duo',
              },
              {
                label: 'Pioneer',
                to: '/pioneer'
              },
              {
                label: 'Mars',
                to: '/mars'
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'right',
            items: [
              {
                type: 'doc',
                label: 'Duo',
                docId: 'duo/overview',
              },
              {
                type: 'doc',
                label: 'Pioneer',
                docId: 'pioneer/overview',
              },
              {
                type: 'doc',
                label: 'Mars',
                docId: 'mars/mars',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      typography: {
        fontFamily: ["Helvetica", "pingFangSC", "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif"]
      }
    }),
};

module.exports = config;
