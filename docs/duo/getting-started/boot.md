---
sidebar_label: 'Start Up'
sidebar_position: 10
---

# Boot from microSD card

## Prepare

- Necessary
  - Duo, Duo256M or DuoS
  - microSD card, larger than 1GB
  - Type-C cable
- Optional
  - USB to TTL serial cable

## Download images and tools

- Download the system image from [Official Image and SDK](https://milkv.io/docs/duo/getting-started/download).
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

Connect the Duo with a Type-C cable using an adapter (5V) or computer USB.

The blue LED on the Duo will blink.

:::tip
If the blue LED does not blink after booting, it means the system is not running properly, and there may be a problem with the image burned to the microSD. You can try to re-burn the image with other burning software, such as balenaEtcher, Rufus, Win32DiskImager, etc. If it still cannot boot normally, you can connect a serial cable and send the log after booting to us for analysis.
:::

## Troubleshooting

If you have a problem, go to our [community](https://community.milkv.io/) and post to let us know.
