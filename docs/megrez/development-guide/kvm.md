---
sidebar_label: 'RockOS KVM Demo'
sidebar_position: 30
---
# RockOS KVM Demo

RockOS supports KVM virtualization based on H Extension (RISC-V Hypervisor Extension).

Currently the following are verifed as working:
 
- Ubuntu 24.04.1 LTS & 24.10
- openEuler 24.03 LTS & 24.09
- FreeBSD 14.1-RELEASE
- Debian testing netinst CD

## Environment

- OS Version: RockOS [20241117](https://mirror.iscas.ac.cn/rockos/extra/images/evb1/20241130/20241117/)
- Ubuntu preinstalled image: https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
- openEuler 24.09 QEMU: https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/
- FreeBSD 14.1-RELEASE: https://download.freebsd.org/releases/VM-IMAGES/14.1-RELEASE/riscv64/Latest/
- Debian testing netinst CD: https://cdimage.debian.org/cdimage/weekly-builds/riscv64/iso-cd/debian-testing-riscv64-netinst.iso
- Debian sid cloud image: https://cdimage.debian.org/images/cloud/sid/daily/latest/debian-sid-nocloud-riscv64-daily.qcow2
- `qemu-system-riscv64` is installed by default
- Manually install `wget` or `curl` to download the image
- `u-boot-qemu` and `qemu-efi-riscv64` are provided in the repo, manually install them if needed

> You can try other mirrors if the official server is too slow for you.

## Steps

Currently QEMU does not support loading M Mode firmware via `-bios` while KVM is enabled. See comments [here](https://github.com/qemu/qemu/blob/fdf250e5a37830615e324017cb3a503e84b3712c/hw/riscv/virt.c#L1354). So here are some of the options we have now:

- Use `u-boot.elf` provided by `u-boot-qemu` package
    - You can boot Ubuntu and FreeBSD with this method.
- Use other firmwares
    - e.g. openEuler RISC-V + EDK II (distributed along side with system image)
    - EDK II comes with `qemu-efi-riscv64` package
- Use `-initrd` `-kernel` `-append` flags
    - You can boot Ubuntu with this method.
    - The BusyBox KVM Demo is also using this method.
    - You can also boot FreeBSD this way according to [FreeBSD Wiki](https://wiki.freebsd.org/riscv/QEMU#Boot_FreeBSD).
        - Not tested & not demonstrated in this article.

By default RockOS **does not load KVM module on boot**, so before we start, manually load it:

```shell
sudo modprobe kvm
```

Install required packages:

```shell
sudo apt update; sudo apt install -y wget u-boot-qemu qemu-efi-riscv64
```

### Method A: Acquire U-Boot from u-boot-qemu package

For this method, we have Ubuntu preinstalled server image, FreeBSD and Debian netinst CD as examples.

#### Ubuntu

```shell
wget https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
xz -dkv -T0 ubuntu-24.10-preinstalled-server-riscv64.img.xz
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
        -drive file=ubuntu-24.10-preinstalled-server-riscv64.img,format=raw,if=virtio
```

The default username and password are both `ubuntu`.

For Ubuntu preinstalled image, you'll be prompted to change your password on first boot. Follow the steps and you're good to go.

#### FreeBSD

```shell
wget https://download.freebsd.org/releases/VM-IMAGES/14.1-RELEASE/riscv64/Latest/FreeBSD-14.1-RELEASE-riscv-riscv64.qcow2.xz
xz -dkv -T0 FreeBSD-14.1-RELEASE-riscv-riscv64.qcow2.xz
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
        -drive file=FreeBSD-14.1-RELEASE-riscv-riscv64.qcow2,format=qcow2,if=virtio
```

Use username `root` for a passwordless login.

#### Debian cloud

Debian sid currently provides qcow2 disk images.

```shell
wget https://cdimage.debian.org/images/cloud/sid/daily/latest/debian-sid-nocloud-riscv64-daily.qcow2
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
        -drive file=debian-sid-nocloud-riscv64-daily.qcow2,format=qcow2,if=virtio
```

#### Debian testing netinst CD

```shell
wget https://cdimage.debian.org/cdimage/weekly-builds/riscv64/iso-cd/debian-testing-riscv64-netinst.iso
qemu-img create -f qcow2 debian.qcow2 16G
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -boot d -cdrom debian-testing-riscv64-netinst.iso \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel /usr/lib/u-boot/qemu-riscv64_smode/uboot.elf \
        -drive file=debian.qcow2,format=qcow2,if=virtio
```

Execute the commands above will create a 16G qcow2 disk image, and bring you to the Debian installer.

After the installation process, power off the VM, delete `-boot d -cdrom debian-testing-riscv64-netinst.iso \`, and then you can boot straight into the installed system.

### Method B: Use other firmwares (e.g. TianoCore EDK II)

Currently, openEuler, Ubuntu and Debian are verified.

For openEuler use the EDK II firmware distributed with the main system image; for Ubuntu and Debian, install `qemu-efi-riscv64` and use the firmware provided by this package.

> Current version of EDK II might get stuck at `Press ESCAPE within 5 seconds for boot options` (~50s). Press Enter to skip.

#### openEuler

Obtain and decompress the image:

```shell
wget https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/RISCV_VIRT_CODE.fd \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/RISCV_VIRT_VARS.fd \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/openEuler-24.09-riscv64.qcow2.xz \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/start_vm.sh
xz -dkv -T0 openEuler-24.09-riscv64.qcow2.xz
```

Modify the VM start script:

```shell
nano start_vm.sh
```

The following parts need to be changed:

- Add `--enable-kvm` flag
- Change RAM allocate size: `memory=2` for 2G
    - `ram1` and `ram2` also need to be changed:`object memory-backend-ram,size=1G,id=ram1` `object memory-backend-ram,size=1G,id=ram2`
- Add `if=none` flag to boot disk

The edited script should look like this:

```shell
#!/usr/bin/env bash

# The script is created for starting a riscv64 qemu virtual machine with specific parameters.

RESTORE=$(echo -en '\001\033[0m\002')
YELLOW=$(echo -en '\001\033[00;33m\002')

## Configuration
vcpu=2
memory=2
drive="$(ls *.qcow2)"
fw1="RISCV_VIRT_CODE.fd"
fw2="RISCV_VIRT_VARS.fd"
ssh_port=12055

cmd="qemu-system-riscv64 \
  -nographic -machine virt,pflash0=pflash0,pflash1=pflash1,acpi=off \
  --enable-kvm \
  -smp "$vcpu" -m "$memory"G \
  -object memory-backend-ram,size=1G,id=ram1 \
  -numa node,memdev=ram1 \
  -object memory-backend-ram,size=1G,id=ram2 \
  -numa node,memdev=ram2 \
  -blockdev node-name=pflash0,driver=file,read-only=on,filename="$fw1" \
  -blockdev node-name=pflash1,driver=file,filename="$fw2" \
  -drive file="$drive",format=qcow2,id=hd0,if=none \
  -object rng-random,filename=/dev/urandom,id=rng0 \
  -device virtio-vga \
  -device virtio-rng-device,rng=rng0 \
  -device virtio-blk-device,drive=hd0 \
  -device virtio-net-device,netdev=usernet \
  -netdev user,id=usernet,hostfwd=tcp::"$ssh_port"-:22 \
  -device qemu-xhci -usb -device usb-kbd -device usb-tablet"

echo ${YELLOW}:: Starting VM...${RESTORE}
echo ${YELLOW}:: Using following configuration${RESTORE}
echo ""
echo ${YELLOW}vCPU Cores: "$vcpu"${RESTORE}
echo ${YELLOW}Memory: "$memory"G${RESTORE}
echo ${YELLOW}Disk: "$drive"${RESTORE}
echo ${YELLOW}SSH Port: "$ssh_port"${RESTORE}
echo ""
echo ${YELLOW}:: NOTE: Make sure ONLY ONE .qcow2 file is${RESTORE}
echo ${YELLOW}in the current directory${RESTORE}
echo ""
echo ${YELLOW}:: Tip: Try setting DNS manually if QEMU user network doesn\'t work well. ${RESTORE}
echo ${YELLOW}:: HOWTO -\> https://serverfault.com/a/810639 ${RESTORE}
echo ""
echo ${YELLOW}:: Tip: If \'ping\' reports permission error, try reinstalling \'iputils\'. ${RESTORE}
echo ${YELLOW}:: HOWTO -\> \'sudo dnf reinstall iputils\' ${RESTORE}
echo ""

sleep 2

eval $cmd
```

Start the KVM:

```shell
sudo bash start_vm.sh
```

Or manually execute:

```shell
sudo qemu-system-riscv64 \
  -nographic -machine virt,pflash0=pflash0,pflash1=pflash1,acpi=off \
  --enable-kvm \
  -smp 2 -m 2G \
  -object memory-backend-ram,size=1G,id=ram1 \
  -numa node,memdev=ram1 \
  -object memory-backend-ram,size=1G,id=ram2 \
  -numa node,memdev=ram2 \
  -blockdev node-name=pflash0,driver=file,read-only=on,filename=RISCV_VIRT_CODE.fd \
  -blockdev node-name=pflash1,driver=file,filename=RISCV_VIRT_VARS.fd \
  -drive file=openEuler-24.09-riscv64.qcow2,format=qcow2,id=hd0,if=none \
  -object rng-random,filename=/dev/urandom,id=rng0 \
  -device virtio-vga \
  -device virtio-rng-device,rng=rng0 \
  -device virtio-blk-device,drive=hd0 \
  -device virtio-net-device,netdev=usernet \
  -netdev user,id=usernet,hostfwd=tcp::12055-:22 \
  -device qemu-xhci -usb -device usb-kbd -device usb-tablet
```

Default username: `root` or `openeuler`

Default password: `openEuler12#$`

If needed, you can press ESC to interrupt EDK II autoboot while promting `Press ESCAPE within 5 seconds for boot options`, and enter EDK II menu to edit settings.

#### Ubuntu

```shell
wget https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
xz -dkv -T0 ubuntu-24.10-preinstalled-server-riscv64.img.xz
cp /usr/share/qemu-efi-riscv64/RISCV_VIRT_*.fd .
sudo qemu-system-riscv64 --enable-kvm -M virt,pflash0=pflash0,pflash1=pflash1,acpi=off -cpu host -m 2048 -smp 2 -nographic \
        -blockdev node-name=pflash0,driver=file,read-only=on,filename=RISCV_VIRT_CODE.fd \
        -blockdev node-name=pflash1,driver=file,filename=RISCV_VIRT_VARS.fd \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -drive file=ubuntu-24.10-preinstalled-server-riscv64.img,format=raw,if=virtio
```

#### Debian cloud

```shell
wget https://cdimage.debian.org/images/cloud/sid/daily/latest/debian-sid-nocloud-riscv64-daily.qcow2
cp /usr/share/qemu-efi-riscv64/RISCV_VIRT_*.fd .
sudo qemu-system-riscv64 --enable-kvm -M virt,pflash0=pflash0,pflash1=pflash1,acpi=off -cpu host -m 2048 -smp 2 -nographic \
        -blockdev node-name=pflash0,driver=file,read-only=on,filename=RISCV_VIRT_CODE.fd \
        -blockdev node-name=pflash1,driver=file,filename=RISCV_VIRT_VARS.fd \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -drive file=debian-sid-nocloud-riscv64-daily.qcow2,format=qcow2,if=virtio
```

### Method C: Directly load vmlinuz and initrd

In RockOS system image, we have a `busybox` based KVM demo built in, at `/home/debian` for users to try out.

Usage: just execute `/home/debian/start_kvm.sh`.

Aside from that, you can also boot Ubuntu using the similar steps.

You'll need to extract `initrd` and `vmlinuz` images from the disk image.

Use the steps below:

```shell
wget https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
xz -d ubuntu-24.10-preinstalled-server-riscv64.img.xz
sudo losetup -f # Check the first available loop device, usually /dev/loop0
sudo losetup -P loop0 ubuntu-24.10-preinstalled-server-riscv64.img
sudo fdisk -l /dev/loop0 # Check partition table
sudo mount /dev/loop0p1 /mnt # By default the first partition is the rootfs
ls /mnt/boot
cp /mnt/boot/initrd.img .
sudo cp /mnt/boot/vmlinuz .
sudo umount /mnt
sudo losetup -D # Detach all loop devices
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel vmlinuz \
        -initrd initrd.img \
        -append "root=LABEL=cloudimg-rootfs ro  efi=debug earlycon=sbi" \
        -drive file=ubuntu-24.10-preinstalled-server-riscv64.img,format=raw,if=virtio
```

The default username and password are both `ubuntu`.

For Ubuntu preinstalled image, you'll be prompted to change your password on first boot. Follow the steps and you're good to go.

## Screen Records

Here are some asciinema screen records during the boot process for your reference.

Ubuntu 24.10 + U-Boot:

[![Ubuntu 24.10 + U-Boot](https://asciinema.org/a/jrmdPqSD8TiuzhopnTqEs0fCm.svg)](https://asciinema.org/a/jrmdPqSD8TiuzhopnTqEs0fCm)

Ubuntu 24.10, initrd + vmlinuz:

[![Ubuntu 24.10, initrd + vmlinuz](https://asciinema.org/a/0nXvzFMvx6B6tJjAKekzwNePq.svg)](https://asciinema.org/a/0nXvzFMvx6B6tJjAKekzwNePq)

openEuler 24.09 + TianoCore EDK II:

[![openEuler 24.09 + TianoCore EDK II](https://asciinema.org/a/MXla56oCKEFoZ4VUWsCnok8hk.svg)](https://asciinema.org/a/MXla56oCKEFoZ4VUWsCnok8hk)

FreeBSD 14.1-RELEASE + U-Boot:

[![FreeBSD 14.1-RELEASE + U-Boot](https://asciinema.org/a/RwmDjwLwcHCiUErBTSU4ovNlX.svg)](https://asciinema.org/a/RwmDjwLwcHCiUErBTSU4ovNlX)

Debian testing netinst CD + U-Boot:

[![Debian testing netinst CD + U-Boot](https://asciinema.org/a/JWEjdKH8oNbCATP2fDyKKbhav.svg)](https://asciinema.org/a/JWEjdKH8oNbCATP2fDyKKbhav)

## Notes

- Make sure you've added `acpi=off` to QEMU's cmdline while using EDK II.
- If you get stuck at EDK II and can't boot into the system, try manually selecting boot device inside EDK II menu, or choose EFI file from the boot partition.