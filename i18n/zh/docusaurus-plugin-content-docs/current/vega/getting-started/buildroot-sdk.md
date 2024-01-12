---
sidebar_label: 'Buildroot SDK'
sidebar_position: 40
---

# 简介

Vega 默认的 SDK 是基于 buildroot 构建的，用来生成 Vega 的固件，SDK 主要包含如下几个部分:

- u-boot: 2020.07-rc2
- linux kernel: 5.8.0
- buildroot: 2020.05-rc1
- opensbi: 0.7

源码地址: [github](https://github.com/milkv-vega/vega-buildroot-sdk)

# 编译镜像

准备编译环境，使用本地的 Ubuntu 系统，官方支持的编译环境为 `Ubuntu Jammy 22.04.x amd64`。

如果您使用的是其他的 Linux 发行版，我们强烈建议您使用 Docker 环境来编译，以降低编译出错的概率。

以下分别介绍两种环境下的编译方法。

## 一、使用 Ubuntu 22.04 编译

### 安装编译依赖的工具包

### 获取 SDK

### 1、一键编译

## 二、使用 Docker 编译

### 在 Linux 主机上拉 SDK 代码

### 1. 使用 Docker 一键编译
