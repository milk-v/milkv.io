---
sidebar_label: 'Install OS'
sidebar_position: 21
---
# OS installation steps

## 1. Preparation

### 1.1 Tool preparation
Before starting the installation, please prepare the following tools:
- MicroSD card (at least greater than 16G)
- MicroSD card reader
- Serial port module

### 1.2 Software preparation
- Download and install balenaEtcher (https://etcher.balena.io/)
- Download the image (https://milkv.io/docs/pioneer/getting-started/download)  
Select the desired image in the [Download page](https://milkv.io/docs/pioneer/getting-started/download), here is Fedora 38 as an example.

![downloadpage](/docs/pioneer/downloadpage.png)
## 2. Burn the program to MicroSD card

### 2.1 Use BalenaEtcher to burn the image
a.Click on the Flash from file button and choose the 
fedora-disk-gnome-workstation_riscv64-f38-20230515-035559-milkv.raw.xz (hereinafter referred to as **fedora38.raw.xz** ) you want to use.

b. Click the Select target button and choose the microSD Card to write the fedora38.raw.xz to.

c.Click the Flash! button to begin the process.  

![balena-etcher](/docs/pioneer/balena-etcher.png)
### 2.2 Installing to Pioneer
Insert the burned microSD card into the Pioneer's microSD card slot.

## 3. Boot from microSD Card

### 3.1 Power on
Tap the boot button to start Pioneer.

### 3.2 Setting up an account
The installation wizard sets up the account password.

### 3.3 Done! Getting Started with Fedora 38
![fedora38](/docs/pioneer/fedora38.png)

## 4. Boot from microSD Card & NVMe SSD
Please complete sections 1-3 above before proceeding with this step
The following steps are recommended for operation using the serial port

Enter the account password to log in to the Fedora system
![loginfedora38](/docs/pioneer/loginfedora.png)

### 4.1Use 'mv-rootfs.sh' to install the system to an NVMe SSD
We have included the '[mv-rootfs.sh](https://milkv.io/docs/pioneer/getting-started/download)' script in /opt for easy configuration of your system to NVMe SSDs.

Just refer to the following steps to run it.

~~~
[milkv@fedora-riscv ~]$ cd /opt
[milkv@fedora-riscv opt]$ sudo ./mv-rootfs.sh
~~~

### 4.2 Reboot
Reboot Pioneer to enable booting from SD cards and NVMe SSD
