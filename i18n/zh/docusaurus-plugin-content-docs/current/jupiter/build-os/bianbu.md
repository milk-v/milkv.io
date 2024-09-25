---
sidebar_label: '构建 Bianbu OS'
sidebar_position: 20
---

# Bianbu 1.0 ROOTFS 制作

## 环境要求

宿主机推荐 Ubuntu 20.04/22.04，且安装了 docker ce 和 qemu-user-static（8.0.4，定制版，默认开启了 Vector 1.0 支持）。

### docker

docker ce 安装可参考 [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)。

### qemu

1. 卸载 binfmt-support
   
   定制版的 qemu-user-static 与 binfmt-support 有冲突，因为 binfmt-support 提供的 `/etc/init.d/binfmt-support` 属于传统的 SysVinit 启动脚本，而定制版的 qemu-user-static 提供的 `/lib/systemd/system/systemd-binfmt.service` 是 systemd 服务单元文件。`/etc/init.d/binfmt-support` 会晚于 `/lib/systemd/system/systemd-binfmt.service` 执行，导致覆盖 systemd 的设置。

   ```bash
   sudo apt-get purge binfmt-support
   ```

2. 下载定制版的 qemu
   
   ```bash
   wget https://archive.spacemit.com/qemu/qemu-user-static_8.0.4%2Bdfsg-1ubuntu3.23.10.1_amd64.deb
   ```

3. 安装定制版的 qemu
   
   ```bash
   sudo dpkg -i qemu-user-static_8.0.4+dfsg-1ubuntu3.23.10.1_amd64.deb
   ```

4. 注册 qemu-user-static 到内核，这样整个系统范围（含容器）均可以直接执行 riscv 的二进制文件
   
   ```bash
   sudo systemctl start systemd-binfmt.service
   ```

5. 验证 qemu-user-static 是否注册成功
   
   下载测试程序：
   ```bash
   wget https://archive.spacemit.com/qemu/rvv
   ```
   测试程序添加可执行权限：
   ```bash
   chmod a+x rvv
   ```
   执行测试程序：
   ```bash
   ./rvv
   ```

   出现以下信息表示注册成功。
   ```
   helloworld
   spacemit
   ```

## 准备基础 rootfs

### 1. 创建工作目录

```bash
mkdir ~/bianbu-workspace
```

### 2. 创建并启动容器

```bash
docker run --privileged -itd -v ~/bianbu-workspace:/mnt --name build-bianbu-rootfs ubuntu:24.04
```

### 3. 进入容器

```bash
docker exec -it -w /mnt build-bianbu-rootfs bash
```

### 4. 安装基本工具

```bash
apt-get update
apt-get -y install wget uuid-runtime
```

### 5. 配置环境变量，方便后续命令使用

```bash
export BASE_ROOTFS_URL=https://archive.spacemit.com/bianbu-base/bianbu-base-23.10-base-riscv64.tar.gz
```
```bash
export BASE_ROOTFS=$(basename "$BASE_ROOTFS_URL")
```
```bash
export TARGET_ROOTFS=rootfs
```

### 6. 下载基础文件系统

```bash
wget $BASE_ROOTFS_URL
```

### 7. 解压到指定目录

```bash
mkdir -p $TARGET_ROOTFS && tar -zxpf $BASE_ROOTFS -C $TARGET_ROOTFS
```

### 8. 挂载一些系统资源到 rootfs 中

```bash
mount -t proc /proc $TARGET_ROOTFS/proc
mount -t sysfs /sys $TARGET_ROOTFS/sys
mount -o bind /dev $TARGET_ROOTFS/dev
mount -o bind /dev/pts $TARGET_ROOTFS/dev/pts
```

## 必要配置

### 1. 配置源

#### 1.1 首先配置环境变量，方便后续命令使用

```bash
export DIST=mantic
export REPO="archive.spacemit.com/bianbu-ports"
export VERSION="v1.0.15"
```

#### 1.2 安装源的签名公钥

```bash
wget -O $TARGET_ROOTFS/usr/share/keyrings/bianbu-archive-keyring-mantic.gpg https://archive.spacemit.com/bianbu-ports/bianbu-archive-keyring.gpg
wget -O $TARGET_ROOTFS/etc/apt/trusted.gpg.d/bianbu-archive-keyring-mantic.gpg https://archive.spacemit.com/bianbu-ports/bianbu-archive-keyring.gpg
```

#### 1.3 配置 sources.list

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

#### 1.4 配置 sources.list.d/bianbu.list

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

#### 1.5 配置源的优先级

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

### 2. 配置 DNS

```bash
echo "nameserver 8.8.8.8" >$TARGET_ROOTFS/etc/resolv.conf
```

### 3. 安装硬件相关的包

```bash
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install ca-certificates"
chroot $TARGET_ROOTFS /bin/bash -c "apt-get update"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades upgrade"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install initramfs-tools"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-esos img-gpu-powervr k1x-vpu-firmware k1x-cam spacemit-uart-bt spacemit-modules-usrload opensbi-spacemit u-boot-spacemit linux-image-6.1.15"
```

### 4. 安装元包

不同变体有不同的元包：

- Minimal：bianbu-minimal
- Dekstop：bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development
- NAS：bianbu-nas

这里以制作最小的 minimal 变体为例：

```bash
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
```

## 通用配置

### 1. 配置地区

```bash
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install locales"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8, zh_CN.UTF-8 UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/default_environment_locale select zh_CN.UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "sed -i 's/^# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/' /etc/locale.gen"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive locales"
```

### 2. 配置时区

```bash
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/timezone"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/localtime"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive tzdata"
```

### 3. 配置时间服务器

```bash
sed -i 's/^#NTP=.*/NTP=ntp.aliyun.com/' $TARGET_ROOTFS/etc/systemd/timesyncd.conf
```

### 4. 配置密码

```bash
chroot $TARGET_ROOTFS /bin/bash -c "echo root:bianbu | chpasswd"
```

### 5. 配置网络（可选）

如果仅安装了 minimal（bianbu-minimal）元包，则需要使用 netplan 配置网络：

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

## 生成分区镜像

注意安装配置完后，先取消挂载：

```bash
mount | grep "$TARGET_ROOTFS/proc" > /dev/null && umount -l $TARGET_ROOTFS/proc
mount | grep "$TARGET_ROOTFS/sys" > /dev/null && umount -l $TARGET_ROOTFS/sys
mount | grep "$TARGET_ROOTFS/dev/pts" > /dev/null && umount -l $TARGET_ROOTFS/dev/pts
mount | grep "$TARGET_ROOTFS/dev" > /dev/null && umount -l $TARGET_ROOTFS/dev
```

生成 UUID，并写入 `/etc/fstab`：

```bash
UUID_BOOTFS=$(uuidgen)
```
```bash
UUID_ROOTFS=$(uuidgen)
```
```bash
cat >$TARGET_ROOTFS/etc/fstab <<EOF
# <file system>     <dir>    <type>  <options>                          <dump> <pass>
UUID=$UUID_ROOTFS   /        ext4    defaults,noatime,errors=remount-ro 0      1
UUID=$UUID_BOOTFS   /boot    ext4    defaults                           0      2
EOF
```

移动 boot 到其他目录，以便分别制作 bootfs 和 rootfs 分区：

```bash
mkdir -p bootfs
mv $TARGET_ROOTFS/boot/* bootfs
```

生成 `bootfs.ext4` 和 `rootfs.ext4`：

```bash
mke2fs -d bootfs -L bootfs -t ext4 -U $UUID_BOOTFS bootfs.ext4 "256M"
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "2048M"
```

此时，在当前目录可以看到两个分区镜像，`bootfs.ext4` 和 `rootfs.ext4`，可使用 fastboot 烧写到板子中。
