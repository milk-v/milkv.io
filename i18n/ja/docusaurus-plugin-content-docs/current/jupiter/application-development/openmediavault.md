---
sidebar_label: 'Using OpenMediaVault'
sidebar_position: 15
---

# Using OpenMediaVault NAS System

OpenMediaVault, abbreviated as OMV, is a network attached storage (NAS) solution based on Debian Linux. It includes services such as SSH, (S)FTP, SMB/CIFS, DAAP media server, RSync, BitTorrent client, etc.

## Using Bianbu NAS Image

OpenMediaVault has been integrated into Jupiter's Bianbu NAS image. You can refer to the [Resource Download Summary](https://milkv.io/docs/jupiter/getting-started/resources) page to download the corresponding firmware.

The image file name format is: milkv-jupiter-bianbu-\*-`nas`-\*.zip

After downloading, refer to [Install OS Image](https://milkv.io/docs/jupiter/getting-started/boot) to install it.

After booting up, execute the `ip a` command in the serial port or check the router web user interface to obtain the IP address of Jupiter. Access the `OpenMediaVault` web interface through the IP in the PC browser.

  - Web interface administrator account: `admin`
  - Password: `openmediavault`

<Image src='/docs/jupiter/jupiter-openmediavault-zh.webp' maxWidth='100%' align='left' />
