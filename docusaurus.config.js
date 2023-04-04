/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Milk-V',
  tagline: 'Everything about RISC-V',
  favicon: 'img/favicon.ico',
  url: 'https://milkv.io',
  baseUrl: '/',
  organizationName: 'milk-v',
  projectName: 'milkv.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
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
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:

    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            label: 'Duo',
            to: '/duo',
            position: 'right',

          },
          {
            position: 'right',
            label: 'Pioneer',
            to: '/pioneer'
          },
          {
            position: 'right',
            label: 'Community',
            to: 'https://community.milkv.io/'
          },
          {
            type: 'dropdown',
            label: 'Doc',
            position: 'right',
            items: [
              {
                type: 'doc',
                label: 'Duo',
                docId: 'duo/duo',
              },
              {
                type: 'doc',
                label: 'Pioneer',
                docId: 'pioneer/pioneer',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            html: `<div class="footer_text">
              <div class='footer_logo'></div>
              <div class='text_right'>
                <h1>Milk-V Machines</h1>
                <h1>Email: support@milkv.io</h1>
              </div>
            </div>`
          },
        ],
      },
      typography: {
        fontFamily: ["Helvetica", "pingFangSC", "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif"]
      }
    }),
};

module.exports = config;
