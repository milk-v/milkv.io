---
sidebar_label: 'Boot the Mars'
sidebar_position: 10
---
# Boot Mars from microSD card

## Prepare

- Necessary
  - Mars
  - microSD or eMMC larger than 16GB
  - Type-C cable
- Optional
  - USB to TTL serial cable
  - HDMI cable

## Download images and tools

- Download the system image from [Official Image](https://milkv.io/docs/mars/resources/image).
- Download the flash tool, [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/).

## Burn image

Here are the steps for using balenaEtcher.

- Click **Flash from file**

![etcher-step1](/docs/duo/etcher-step1.png)

- Click **Select target**

![etcher-step2](/docs/duo/etcher-step2.png)

- Click **Flash!**

![etcher-step3](/docs/duo/etcher-step3.png)

## Power on

Insert the microSD card with the burned firmware into the Mars microSD card slot. Use an adapter (5V) to connect Mars via a Type-C cable. Mars will automatically power on and the red power LED on the board will light up. After the system starts successfully, the green status LED on the board will flash.

If an HDMI monitor is connected, the Debian desktop will be displayed after booting.

## Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.
