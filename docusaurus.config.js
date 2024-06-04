/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Milk-V',
  tagline: 'Everything about RISC-V',
  favicon: 'favicon.ico',
  url: 'https://milkv.io',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'milk-v',
  projectName: 'milkv.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ru', 'ja'],
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/mars/overview',
            from: ['/docs/mars-cm'],
          },
          {
            to: '/docs/duo/overview',
            from: ['/docs/duo'],
          },
          {
            to: '/docs/mars/overview',
            from: ['/docs/mars'],
          },
          {
            to: '/docs/pioneer/overview',
            from: ['/docs/pioneer'],
          },
          {
            to: '/docs/vega/overview',
            from: ['/docs/vega'],
          },
          {
            to: '/docs/meles/overview',
            from: ['/docs/meles'],
          },
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ locale, docPath }) => {
            if (locale !== "en") {
              return `https://github.com/milk-v/milkv.io/edit/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
            }
            return `https://github.com/milk-v/milkv.io/edit/main/docs/${docPath}`;
          },
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
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        appId: '367OH7GCEI',
        apiKey: 'ce5431087fbfc2c53ba31dede7186154',
        indexName: 'milkv',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        searchParameters: {},
        searchPagePath: false,
      },
      colorMode: {
        disableSwitch: true,
      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: 'milkv.io',
          src: 'components/LogoNew.svg',
        },

        items: [
          {
            label: 'Home',
            position: 'right',
            to: '/'
          },
          {
            position: 'right',
            label: 'About',
            to: '/about'
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
                label: 'Duo S',
                to: '/duo-s',
              },
              {
                label: 'Pioneer',
                to: '/pioneer'
              },
              {
                label: 'Mars',
                to: '/mars'
              },
              {
                label: 'Mars CM',
                to: '/mars-cm'
              },
              {
                label: 'Meles',
                to: '/meles'
              },
              {
                label: 'Vega',
                to: '/vega'
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
                docId: 'mars/overview',
              },
              {
                type: 'doc',
                label: 'Meles',
                docId: 'meles/overview',
              },
              {
                type: 'doc',
                label: 'Vega',
                docId: 'vega/overview',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Chips',
            position: 'right',
            items: [
              {
                label: 'SG2000',
                to: '/chips/sg2000',
              },
              {
                label: 'SG2002',
                to: '/chips/sg2002'
              },
              {
                label: 'CV1800B',
                to: '/chips/cv1800b'
              },
              {
                label: 'SG2380',
                to: '/chips/sg2380'
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
