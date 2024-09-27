---
sidebar_label: 'Build Bianbu OS 1.0'
sidebar_position: 20
---

# Build Bianbu OS 1.0

The Bianbu 1.0 OS Image is based on Ubuntu 23.10.

## Compilation environment

The recommended host machine is Ubuntu 20.04/22.04, with docker ce and qemu-user-static (8.0.4, customized version, Vector 1.0 support is enabled by default) installed.

### docker

For docker ce installation, please refer to [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

### qemu

1. Uninstall binfmt-support
   
   The customized version of qemu-user-static conflicts with binfmt-support because the `/etc/init.d/binfmt-support` provided by binfmt-support is a traditional SysVinit startup script, while the `/lib/systemd/system/systemd-binfmt.service` provided by the customized version of qemu-user-static is a systemd service unit file. `/etc/init.d/binfmt-support` will be executed later than `/lib/systemd/system/systemd-binfmt.service`, resulting in overwriting systemd settings.

   ```bash
   sudo apt-get purge binfmt-support
   ```

2. Download the customized version of qemu
   
   ```bash
   wget https://archive.spacemit.com/qemu/qemu-user-static_8.0.4%2Bdfsg-1ubuntu3.23.10.1_amd64.deb
   ```

3. Install a customized version of qemu
   
   ```bash
   sudo dpkg -i qemu-user-static_8.0.4+dfsg-1ubuntu3.23.10.1_amd64.deb
   ```

4. Register qemu-user-static to the kernel so that the entire system (including containers) can directly execute riscv binaries
   
   ```bash
   sudo systemctl start systemd-binfmt.service
   ```

5. Verify that qemu-user-static is successfully registered
   
   Download the test program:
   ```bash
   wget https://archive.spacemit.com/qemu/rvv
   ```
   Add executable permissions to the test program:
   ```bash
   chmod a+x rvv
   ```
   Execute the test program:
   ```bash
   ./rvv
   ```

   The following message appears, indicating that the registration is successful.
   ```
   helloworld
   spacemit
   ```

## Prepare base rootfs

### 1. Create a working directory

```bash
mkdir ~/bianbu-workspace
```

### 2. Create and start the container

```bash
docker run --privileged -itd -v ~/bianbu-workspace:/mnt --name build-bianbu-rootfs ubuntu:24.04
```

### 3. Entering the container

```bash
docker exec -it -w /mnt build-bianbu-rootfs bash
```

### 4. Install basic tools

```bash
apt-get update
apt-get -y install wget uuid-runtime
```

### 5. Configure environment variables

```bash
export BASE_ROOTFS_URL=https://archive.spacemit.com/bianbu-base/bianbu-base-23.10-base-riscv64.tar.gz
```
```bash
export BASE_ROOTFS=$(basename "$BASE_ROOTFS_URL")
export TARGET_ROOTFS=rootfs
```

### 6. Download the base file system

```bash
wget $BASE_ROOTFS_URL
```

### 7. Extract to the specified directory

```bash
mkdir -p $TARGET_ROOTFS && tar -zxpf $BASE_ROOTFS -C $TARGET_ROOTFS
```

### 8. Mount some system resources into rootfs

```bash
mount -t proc /proc $TARGET_ROOTFS/proc
mount -t sysfs /sys $TARGET_ROOTFS/sys
mount -o bind /dev $TARGET_ROOTFS/dev
mount -o bind /dev/pts $TARGET_ROOTFS/dev/pts
```

## Necessary Configuration

### 1. Configuring sources

#### 1.1 First, configure the environment variables

```bash
export DIST=mantic
export REPO="archive.spacemit.com/bianbu-ports"
export VERSION="v1.0.15"
```

#### 1.2 Install the public key of the repository

```bash
wget -O $TARGET_ROOTFS/usr/share/keyrings/bianbu-archive-keyring-mantic.gpg https://archive.spacemit.com/bianbu-ports/bianbu-archive-keyring.gpg
wget -O $TARGET_ROOTFS/etc/apt/trusted.gpg.d/bianbu-archive-keyring-mantic.gpg https://archive.spacemit.com/bianbu-ports/bianbu-archive-keyring.gpg
```

#### 1.3 Configure sources.list

```bash
cat <<EOF | tee $TARGET_ROOTFS/etc/apt/sources.list
# $DIST
deb https://$REPO/ $DIST/snapshots/$VERSION main universe multiverse restricted
# deb-src https://$REPO/ $DIST/snapshots/$VERSION main universe multiverse restricted

# $DIST-security
deb https://$REPO/ $DIST-security/snapshots/$VERSION main universe multiverse restricted
# deb-src https://$REPO/ $DIST-security/snapshots/$VERSION main universe multiverse restricted
EOF
```

#### 1.4 Configure sources.list.d/bianbu.list

```bash
cat <<EOF | tee $TARGET_ROOTFS/etc/apt/sources.list.d/bianbu.list
# $DIST-spacemit
deb https://$REPO/ $DIST-spacemit/snapshots/$VERSION main universe multiverse restricted
# deb-src https://$REPO/ $DIST-spacemit/snapshots/$VERSION main universe multiverse restricted

# $DIST-porting
deb https://$REPO/ $DIST-porting/snapshots/$VERSION main universe multiverse restricted
# deb-src https://$REPO/ $DIST-porting/snapshots/$VERSION main universe multiverse restricted

# $DIST-customization
deb https://$REPO/ $DIST-customization/snapshots/$VERSION main universe multiverse restricted
# deb-src https://$REPO/ $DIST-customization/snapshots/$VERSION main universe multiverse restricted
EOF
```

#### 1.5 Configure source priorities

```bash
cat <<EOF | tee $TARGET_ROOTFS/etc/apt/preferences.d/bianbu
Package: *
Pin: release o=Spacemit, n=mantic-spacemit
Pin-Priority: 1200

Package: *
Pin: release o=Spacemit, n=mantic-porting
Pin-Priority: 1100

Package: *
Pin: release o=Spacemit, n=mantic-customization
Pin-Priority: 1100
EOF
```

### 2. Configure DNS

```bash
echo "nameserver 8.8.8.8" >$TARGET_ROOTFS/etc/resolv.conf
```

### 3. Install hardware related packages

```bash
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install ca-certificates"
chroot $TARGET_ROOTFS /bin/bash -c "apt-get update"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades upgrade"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install initramfs-tools"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-esos img-gpu-powervr k1x-vpu-firmware k1x-cam spacemit-uart-bt spacemit-modules-usrload opensbi-spacemit u-boot-spacemit linux-image-6.1.15"
```

### 4. Install the meta-package

Different variants have different meta-packages:

- Minimal
  ```
  bianbu-minimal
  ```
- Dekstop
  ```
  bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development
  ```
- NAS
  ```
  bianbu-nas
  ```

Here is an example of making a minimal variant:

```bash
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
```

## General configuration

### 1. Configure Region

```bash
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install locales"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8, zh_CN.UTF-8 UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/default_environment_locale select zh_CN.UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "sed -i 's/^# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/' /etc/locale.gen"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive locales"
```

### 2. Configure time zone

```bash
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/timezone"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/localtime"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive tzdata"
```

### 3. Configure Time Server

```bash
sed -i 's/^#NTP=.*/NTP=ntp.aliyun.com/' $TARGET_ROOTFS/etc/systemd/timesyncd.conf
```

### 4. Configure Password

```bash
chroot $TARGET_ROOTFS /bin/bash -c "echo root:bianbu | chpasswd"
```

### 5. Configure the network (optional)

If you only installed the minimal (bianbu-minimal) meta-package, you need to configure the network using netplan:

```bash
cat <<EOF | tee $TARGET_ROOTFS/etc/netplan/01-netcfg.yaml
network:
    version: 2
    renderer: networkd
    ethernets:
        end0:
            dhcp4: true
EOF
```
```bash
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-netcfg.yaml"
```

## Generate partition image

Note that after the installation and configuration are complete, cancel the mount first:

```bash
mount | grep "$TARGET_ROOTFS/proc" > /dev/null && umount -l $TARGET_ROOTFS/proc
mount | grep "$TARGET_ROOTFS/sys" > /dev/null && umount -l $TARGET_ROOTFS/sys
mount | grep "$TARGET_ROOTFS/dev/pts" > /dev/null && umount -l $TARGET_ROOTFS/dev/pts
mount | grep "$TARGET_ROOTFS/dev" > /dev/null && umount -l $TARGET_ROOTFS/dev
```

Generate a UUID and write it to `/etc/fstab`:

```bash
UUID_BOOTFS=$(uuidgen)
UUID_ROOTFS=$(uuidgen)
```
```bash
cat >$TARGET_ROOTFS/etc/fstab <<EOF
# <file system>     <dir>    <type>  <options>                          <dump> <pass>
UUID=$UUID_ROOTFS   /        ext4    defaults,noatime,errors=remount-ro 0      1
UUID=$UUID_BOOTFS   /boot    ext4    defaults                           0      2
EOF
```

Move boot to another directory to create bootfs and rootfs partitions separately:

```bash
mkdir -p bootfs
mv $TARGET_ROOTFS/boot/* bootfs
```

Generate `bootfs.ext4` and `rootfs.ext4`:

```bash
mke2fs -d bootfs -L bootfs -t ext4 -U $UUID_BOOTFS bootfs.ext4 "256M"
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "2048M"
```

If the previous meta-package uses the Desktop version, the rootfs will be larger, and you need to increase the space of rootfs.ext4 in the command, such as "9216M".

At this point, you can see two partition images in the current directory, `bootfs.ext4` and `rootfs.ext4`, which can be burned into the board using fastboot.

## Generate SD card image

The following describes how to use genimage to create an SD card image on the host machine based on the above Docker environment.

### 1. Install Dependencies

```bash
echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections
echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections
DEBIAN_FRONTEND=noninteractive apt-get -y install wget python3 genimage
```

### 2. Copy the files that the firmware depends on

```bash
export TMP=pack_dir
mkdir -p $TMP/factory/
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_emmc.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_sd.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinand.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinor.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/FSBL.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/u-boot.itb $TMP
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/env.bin $TMP
cp $TARGET_ROOTFS/usr/lib/riscv64-linux-gnu/opensbi/generic/fw_dynamic.itb $TMP
cp bootfs.ext4 $TMP
cp rootfs.ext4 $TMP
```

### 3. Download reference partition table

```bash
wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
```

### 4. Download the script that generates genimage.cfg and generate genimage.cfg

```bash
wget -P $TMP https://gitee.com/bianbu-linux/scripts/raw/bl-v1.0.y/gen_imgcfg.py
```
```bash
python3 $TMP/gen_imgcfg.py -i $TMP/partition_universal.json -n bianbu-custom.sdcard -o $TMP/genimage.cfg
```

### 5. Generate SD card image

```bash
ROOTPATH_TMP="$(mktemp -d)"
GENIMAGE_TMP="$(mktemp -d)"
```
```bash
genimage \
    --config "$TMP/genimage.cfg" \
    --rootpath "$ROOTPATH_TMP" \
    --tmppath "$GENIMAGE_TMP" \
    --inputpath "$TMP" \
    --outputpath "."
```

When you see the following information, it means the packaging is successful.

```
INFO: hdimage(bianbu-custom): adding partition 'bootinfo' from 'factory/bootinfo_sd.bin' ...
INFO: hdimage(bianbu-custom): adding partition 'fsbl' (in MBR) from 'factory/FSBL.bin' ...
INFO: hdimage(bianbu-custom): adding partition 'env' (in MBR) from 'env.bin' ...
INFO: hdimage(bianbu-custom): adding partition 'opensbi' (in MBR) from 'fw_dynamic.itb' ...
INFO: hdimage(bianbu-custom): adding partition 'uboot' (in MBR) from 'u-boot.itb' ...
INFO: hdimage(bianbu-custom): adding partition 'bootfs' (in MBR) from 'bootfs.ext4' ...
INFO: hdimage(bianbu-custom): adding partition 'rootfs' (in MBR) from 'rootfs.ext4' ...
INFO: hdimage(bianbu-custom): adding partition '[MBR]' ...
INFO: hdimage(bianbu-custom): adding partition '[GPT header]' ...
INFO: hdimage(bianbu-custom): adding partition '[GPT array]' ...
INFO: hdimage(bianbu-custom): adding partition '[GPT backup]' ...
INFO: hdimage(bianbu-custom): writing GPT
INFO: hdimage(bianbu-custom): writing protective MBR
INFO: hdimage(bianbu-custom): writing MBR
INFO: cmd: "rm -rf "/tmp/tmp.rX4fZ39DKG"/*" (stderr):
```

`bianbu-custom.sdcard` is the generated SD image.

## Generate eMMC/SSD image

The following describes how to create an eMMC/SSD image on the host machine based on the above Docker environment. The image is a zip package and needs to be flashed into the eMMC or SSD drive using the Titan tool. For specific flashing methods, please refer to: [Milk-V Jupiter Install OS Image](https://milkv.io/docs/jupiter/getting-started/boot).

### 1. Install Dependencies

```bash
apt-get -y install zip
```

### 2. Copy the files that the firmware depends on

First, delete the temporary directory `pack_dir` used when making the SD card image:

```bash
rm -rf pack_dir
```

```bash
export TMP=pack_dir
mkdir -p $TMP/factory/
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_emmc.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_sd.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinand.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinor.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/FSBL.bin $TMP/factory
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/u-boot.itb $TMP
cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/env.bin $TMP
cp $TARGET_ROOTFS/usr/lib/riscv64-linux-gnu/opensbi/generic/fw_dynamic.itb $TMP
cp bootfs.ext4 $TMP
cp rootfs.ext4 $TMP
```

### 3. Download reference partition table

```bash
wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/fastboot.yaml
wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_2M.json
wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_flash.json
wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
```

### 4. Pack

```bash
cd $TMP
zip -r ../bianbu-custom.zip *
cd ..
```

The generated `bianbu-custom.zip` package is the eMMC/SSD image.
