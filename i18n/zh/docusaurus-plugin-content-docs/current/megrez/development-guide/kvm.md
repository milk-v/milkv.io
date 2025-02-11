---
sidebar_label: 'RockOS KVM Demo'
sidebar_position: 30
---
# RockOS KVM 示例

RockOS 支持基于 H 扩展（RISC-V Hypervisor Extension）的 KVM 虚拟化。

目前已经验证可用的系统包括：

- Ubuntu 24.04.1 LTS & 24.10
- openEuler 24.03 LTS & 24.09
- FreeBSD 14.1-RELEASE
- Debian testing netinst CD

## 演示环境

- 系统版本：RockOS [20241117](https://mirror.iscas.ac.cn/rockos/extra/images/evb1/20241130/20241117/)
- Ubuntu 预安装镜像：https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
- openEuler 24.09 QEMU: https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/
- FreeBSD 14.1-RELEASE: https://download.freebsd.org/releases/VM-IMAGES/14.1-RELEASE/riscv64/Latest/
- Debian testing netinst CD: https://cdimage.debian.org/cdimage/weekly-builds/riscv64/iso-cd/debian-testing-riscv64-netinst.iso
- Debian sid cloud image: https://cdimage.debian.org/images/cloud/sid/daily/latest/debian-sid-nocloud-riscv64-daily.qcow2
- 系统默认已预装 `qemu-system-riscv64`
- 需要手动安装 `wget` 或 `curl` 等下载工具以下载镜像
- 软件源内提供了 `u-boot-qemu` 和 `qemu-efi-riscv64`，如有需要可手动安装

> 若下载速度慢可以考虑更换其它镜像源。

## 步骤

由于 QEMU 目前不支持在启用了 KVM 的情况下加载 M Mode 固件（见 [此处注释](https://github.com/qemu/qemu/blob/fdf250e5a37830615e324017cb3a503e84b3712c/hw/riscv/virt.c#L1354)），目前可行的几种方式如下：

- 使用 `u-boot-qemu` 包提供的 `u-boot.elf`
    - Ubuntu 和 FreeBSD 可用此方法启动。
- 使用其它固件
    - 如 openEuler RISC-V 随系统镜像一同分发的 EDK II 固件。
    - `qemu-efi-riscv64` 包也提供 EDK II 固件。
- 手动指定 `-initrd` `-kernel` `-append` 参数
    - Ubuntu 可用此方法启动。
    - 系统自带的 Busybox KVM Demo 也是基于此方式启动。
    - 根据 FreeBSD [文档](https://wiki.freebsd.org/riscv/QEMU#Boot_FreeBSD)，FreeBSD 也可使用此方式启动。
        - 未测试，本文未演示。

在开始前，需要先手动加载 KVM 内核模块（**开机默认未加载**）：

```shell
sudo modprobe kvm
```

获取所需软件包：

```shell
sudo apt update; sudo apt install -y wget u-boot-qemu qemu-efi-riscv64
```

### 方法一：使用 u-boot-qemu 软件包提供的 U-Boot

以 Ubuntu 预安装服务器镜像、FreeBSD 和 Debian netinst CD 为例。

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

默认用户名和密码均为 `ubuntu`。

Ubuntu 的预安装镜像在首次启动时会提示修改密码，按提示操作即可。

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

可使用默认的 `root` 用户免密码登录。

#### Debian cloud

Debian sid 已经提供了 qcow2 格式的硬盘镜像。

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

执行以上命令，会创建一个 16G 大小的 qcow2 硬盘镜像，并启动至 Debian 安装程序。

系统安装结束后，正常关闭虚拟机，删除启动选项中的 `-boot d -cdrom debian-testing-riscv64-netinst.iso \` 部分，即可开机进入安装后的系统。

### 方法二：使用其它固件（如 EDK II）

目前已经验证了 openEuler RISC-V 24.09、Ubuntu、Debian 均可使用 EDK II 进行启动。

其中，openEuler 随系统一起分发了一份 EDK II 固件；Ubuntu 和 Debian 可使用 `qemu-efi-riscv64` 提供的固件启动。

> 目前的 EDK II 固件在提示 `Press ESCAPE within 5 seconds for boot options` 时可能需要等待较久时间（~50s）。按 Enter 可跳过。

#### openEuler

获取并解压系统镜像：

```shell
wget https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/RISCV_VIRT_CODE.fd \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/RISCV_VIRT_VARS.fd \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/openEuler-24.09-riscv64.qcow2.xz \
     https://repo.openeuler.org/openEuler-24.09/virtual_machine_img/riscv64/start_vm.sh
xz -dkv -T0 openEuler-24.09-riscv64.qcow2.xz
```

修改默认启动脚本：

```shell
nano start_vm.sh
```

需要修改的部分有：

- 添加 `--enable-kvm`
- 根据需要修改内存大小：`memory=2` 指定 2G
    - 需要同步修改 `ram1` 和 `ram2`：`object memory-backend-ram,size=1G,id=ram1` `object memory-backend-ram,size=1G,id=ram2`
- 为启动磁盘添加 `if=none` 参数

修改后的脚本如下：

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

启动 KVM：

```shell
sudo bash start_vm.sh
```

或者直接手动执行：

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

默认用户名：`root` 或 `openeuler`

默认密码：`openEuler12#$`

如有需要，您也可以在启动后出现 `Press ESCAPE within 5 seconds for boot options` 提示时，按 ESC 打断 EDK II 的自动启动，进入 EDK II 菜单调整设置。

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

### 方法三：直接加载 vmlinuz 和 initrd

RockOS 的系统镜像中，在 `/home/debian` 目录下自带了一个基于 `busybox` 的 KVM 示例，可供参考。

使用方式：直接运行 `/home/debian/start_kvm.sh` 即可。

除此以外，Ubuntu 也可以使用此方式启动。需要先从系统镜像中提取 `initrd` 和 `vmlinuz`。

方法如下。

```shell
wget https://cdimage.ubuntu.com/releases/24.10/release/ubuntu-24.10-preinstalled-server-riscv64.img.xz
xz -dkv -T0 ubuntu-24.10-preinstalled-server-riscv64.img.xz
sudo losetup -f # 检查第一个可用的 loop 设备，一般默认为 /dev/loop0
sudo losetup -P loop0 ubuntu-24.10-preinstalled-server-riscv64.img
sudo fdisk -l /dev/loop0 # 默认第一个分区为 rootfs，请检查 fdisk 输出
sudo mount /dev/loop0p1 /mnt
ls /mnt/boot
cp /mnt/boot/initrd.img .
sudo cp /mnt/boot/vmlinuz .
sudo umount /mnt
sudo losetup -D # 断开所有 loop 设备
sudo qemu-system-riscv64 --enable-kvm -M virt -cpu host -m 2048 -smp 2 -nographic \
        -device virtio-net-device,netdev=eth0 -netdev user,id=eth0 \
        -device virtio-rng-pci \
        -kernel vmlinuz \
        -initrd initrd.img \
        -append "root=LABEL=cloudimg-rootfs ro  efi=debug earlycon=sbi" \
        -drive file=ubuntu-24.10-preinstalled-server-riscv64.img,format=raw,if=virtio
```

默认用户名和密码均为 `ubuntu`。

Ubuntu 的预安装镜像在首次启动时会提示修改密码，按提示操作即可。

## 屏幕录像

以下是系统启动流程录像，供参考。

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

## 其他说明

- 使用 EDK II 时，确保添加了 `acpi=off` 选项。
- 若 EDK II 不能正常进入系统，可尝试在 EDK II 菜单内手动选择引导设备，或者在 EFI Shell 内手动启动 boot 分区的 EFI 文件。