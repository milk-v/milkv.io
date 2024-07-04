const sidebars = {
  duo: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'duo/overview',
    {
      type: "category",
      label: '🚀 Getting Started',
      collapsed: false,
      link: {
        type: "generated-index",
        title: '🚀 Getting Started',
        description: 'Getting Started with Duo',
        slug: '/duo/getting-started'
      },
      items: [
        'duo/getting-started/duo',
        'duo/getting-started/duo256m',
        'duo/getting-started/duos',
        'duo/getting-started/boot',
        'duo/getting-started/setup',
        'duo/getting-started/swap',
        'duo/getting-started/buildroot-sdk',
        'duo/getting-started/rtoscore',
        'duo/getting-started/8051core',
        'duo/getting-started/arduino',
      ],
    },
    {
      type: "category",
      label: '🖥️ App Development',
      collapsed: false,
      link: {
        type: "generated-index",
        title: '🖥️ App Development',
        description: 'Application Development',
        slug: '/duo/application-development'
      },
      items: [
        'duo/application-development/pinmux',
        'duo/application-development/wiringx',
        'duo/application-development/pinpong',
        {
          type: "category",
          label: 'TDL SDK',
          collapsed: false,
          link: {
            title: 'TDL SDK',
            description: ' ',
          },
          items: [
            'duo/application-development/tdl-sdk/tdl-sdk-introduction',
            'duo/application-development/tdl-sdk/tdl-sdk-face-detection',
            'duo/application-development/tdl-sdk/tdl-sdk-yolov5',
          ],
        },
        {
          type: "category",
          label: 'TPU',
          collapsed: false,
          link: {
            title: 'TPU',
            description: ' ',
          },
          items: [
            'duo/application-development/tpu/tpu-introduction',
            'duo/application-development/tpu/tpu-docker',
            'duo/application-development/tpu/tpu-yolov5',
            'duo/application-development/tpu/tpu-mobilenetv2',
            'duo/application-development/tpu/tpu-shufflenetv2',
            'duo/application-development/tpu/tpu-googlenet',
            'duo/application-development/tpu/tpu-squeezenet',
            'duo/application-development/tpu/tpu-densenet',
            'duo/application-development/tpu/tpu-resnet18',
          ],
        },
        'duo/application-development/sensor-demo',
      ],
    },
    {
      type: "category",
      label: '🧰 Resources',
      collapsed: false,
      link: {
        type: "generated-index",
        title: '🧰 Resources',
        description: 'Useful Resources',
        slug: '/duo/useful-resources'
      },
      items: [
        'duo/resources/image-sdk',
        'duo/resources/mainline',
        'duo/resources/mmf',
        'duo/resources/opencv-mobile',
        'duo/resources/xyzdims',
        'duo/resources/spilvgl',
        'duo/resources/third-party-img',
      ],
    },
    {
      type: "category",
      label: '🔌 IO Boards',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'duo/io-board/usb-ethernet-iob',
      },
      items: [
        'duo/io-board/usb-ethernet-iob',
        'duo/io-board/duos-poe-hat',
      ],
    },
    {
      type: "category",
      label: '📷 Camera',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'duo/camera/gc2083',
      },
      items: [
        'duo/camera/gc2083',
        'duo/camera/tuning',
      ],
    },
  ],
  pioneer: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'pioneer/overview',
    {
      type: "category",
      label: '🏁 Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🏁 Getting Started',
        description: 'Getting Started with Pionner',
        slug: '/pioneer/getting-started'
      },
      items: [
        'pioneer/getting-started/BeforeStart',
        'pioneer/getting-started/processor',
        'pioneer/getting-started/InstallOS',
        'pioneer/getting-started/Memory',
        'pioneer/getting-started/ExpansionCards',
        'pioneer/getting-started/StorageDevices',
        'pioneer/getting-started/PowerSupply',
        'pioneer/getting-started/CompleteAssembly',
        'pioneer/getting-started/download',
        'pioneer/getting-started/buglist',
      ],
    },
    {
      type: "category",
      label: '🧰 Resources',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🧰 Resources',
        description: 'Useful Resources',
        slug: '/pioneer/useful-resources'
      },
      items: [
        'pioneer/resources/repository',
        'pioneer/resources/scoresoftware',
        'pioneer/resources/gcc',
        'pioneer/resources/inferllm',
        'pioneer/resources/llvm',
        'pioneer/resources/zcc',
      ],
    },
    {
      type: "category",
      label: '🛠️ Development',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🛠️ Development',
        description: 'Development Guide',
        slug: '/pioneer/development-guide'
      },
      items: [
        'pioneer/development/kernel',
      ],
    },
    'pioneer/faq',
  ],
  mars: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'mars/overview',
    {
      type: "category",
      label: '🚀 Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🚀 Getting Started',
        description: 'Getting Started with Mars',
        slug: '/mars/getting-started'
      },
      items: [
        'mars/getting-started/boot',
        'mars/getting-started/setup',
        'mars/getting-started/extendpartition',
        'mars/getting-started/bootloader',
        'mars/getting-started/images',
        'mars/getting-started/hardware',
        'mars/getting-started/third-party-img',
      ],
    },
    'mars/mipicsi-support',
    'mars/mipidsi-support',
    'mars/uvccam-support',
    {
      type: "category",
      label: '🔳 Compute Module',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🔳 Compute Module',
        description: 'The Mars Compute Module is a System on Module (SoM) based on a the StarFive JH7110 System on Chip (SoC) integrates the Central Process Unit (CPU), Power Management Unit (PMU), DRAM memory, flash storage and wireless connectivity (WiFi 5 and BT 5.2) in a small form factor of just 55mm x 40mm.',
        slug: '/mars/compute-module'
      },
      items: [
        'mars/compute-module/introduction',
        'mars/compute-module/boot',
        'mars/compute-module/setup',
        'mars/compute-module/extendpartition',
        'mars/compute-module/bootloader',
        'mars/compute-module/hardware',
        {
          type: "category",
          label: '🧰 Resources',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'mars/compute-module/resources/images',
          },
          items: [
            'mars/compute-module/resources/images',
          ],
        },
      ],
    },
  ],
  meles: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'meles/overview',
    {
      type: "category",
      label: '🚀 Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🚀 Getting Started',
        description: 'Getting Started with Meles',
        slug: '/meles/getting-started'
      },
      items: [
        'meles/getting-started/boot',
        'meles/getting-started/setup',
      ],
    },
    {
      type: "category",
      label: '🔌 Hardware Introduction',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🔌 Hardware',
        description: 'Hardware Introduction',
        slug: '/meles/hardware'
      },
      items: [
        'meles/hardware/meles-main-board',
      ],
    },
    {
      type: "category",
      label: '🖥️ OS Usage',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🖥️ OS Usage',
        description: 'OS Usage with Meles',
        slug: '/meles/os-usage'
      },
      items: [
        'meles/os-usage/revyos',
        'meles/os-usage/ros2',
      ],
    },
    {
      type: "category",
      label: '🖊️ Installation',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🖊️ Installation',
        description: 'Install an image',
        slug: '/meles/installation'
      },
      items: [
        'meles/installation/install-an-image-to-spi-nor-flash',
        'meles/installation/install-an-image-to-microsd-card',
        'meles/installation/install-an-image-to-emmc',
      ],
    },
    {
      type: "category",
      label: '🐧 Low Level Development',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🐧 Low Level Development',
        description: 'How to build u-boot, kernel and rootfs for meles',
        slug: '/meles/low-level-development'
      },
      items: [
        'meles/low-level-development/build-revyos',
      ],
    },
    {
      type: "category",
      label: '🧰 Resources Download',
      collapsed: false,
      link: {
        type: "generated-index",
        title: '🧰 Resources Download',
        description: 'Meles Related Resources Download',
        slug: '/meles/resources-download'
      },
      items: [
        'meles/resources-download/image',
        'meles/resources-download/hardware',
      ],
    },
  ],
  vega: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'vega/overview',
    {
      type: "category",
      label: '🚀 Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🚀 Getting Started',
        description: 'Getting Started with Vega',
        slug: '/vega/getting-started'
      },
      items: [
        'vega/getting-started/boot',
        'vega/getting-started/setup',
        'vega/getting-started/buildroot-sdk',
        'vega/getting-started/modulesupport',
      ],
    },
  ],
  jupiter: [
    {
      type: 'link',
      label: '🏠 Home',
      href: '/docs',
    },
    'jupiter/overview',
    {
      type: "category",
      label: '🚀 Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: '🚀 Getting Started',
        description: 'Getting Started with Jupiter',
        slug: '/jupiter/getting-started'
      },
      items: [
        'jupiter/getting-started/boot',
        'jupiter/getting-started/setup',
        'jupiter/getting-started/resources',
      ],
    },
    {
      type: "category",
      label: '🖥️ App Development',
      collapsed: false,
      link: {
        type: "generated-index",
        title: '🖥️ App Development',
        description: 'Application Development',
        slug: '/jupiter/application-development'
      },
      items: [
        'jupiter/application-development/gcc',
      ],
    },
  ],
};

module.exports = sidebars;
