---
sidebar_label: 'GPIO 引脚控制'
sidebar_position: 3
---

# GPIO 引脚控制

Duos 序号为[J3排列](https://milkv.io/zh/docs/duo/getting-started/duos#%E6%8E%92%E9%92%88-j3)的 NUM 一列。

Duo  序号为[GPIO 引脚分布](https://milkv.io/zh/docs/duo/getting-started/duo#gpio-%E5%BC%95%E8%84%9A%E5%88%86%E5%B8%83)的 NUM 一列。

Duo256M 序号为[GPIO 引脚分布](https://milkv.io/zh/docs/duo/getting-started/duo256m#duo256m-gpio-%E5%BC%95%E8%84%9A%E5%88%86%E9%85%8D)的 NUM 一列。

Duo Module 01 序号为[26 PIN 排针](https://milkv.io/zh/docs/duo/getting-started/duo-module-01#26-pin-%E6%8E%92%E9%92%88)的 NUM 一列。

以 Duos ，GPIO466 为例，

1. 执行以下操作配置 GPIO

```
$ cd /sys/class/gpio

$ echo 466 > export
```
可以运行命令 ls /sys/class/gpio，列出 GPIO 目录，检查是否出现 gpio466，确认导出成功。

运行命令 `echo 466 > unexport`，可以取消 gpio466 引脚的导出。

2. 设置 GPIO 的方向

运行命令 `echo "out" > gpio466/direction`，将 gpio466 方向设置为输出。

运行命令 `echo "in" > gpio466/direction`，将 gpio466 方向设置为输入。

可以通过运行命令 `cat gpio466/direction `，来查看设置的方向。

3. 设置 GPIO 的电平

运行命令 `echo "1" > gpio466/value`，将 gpio466 的电平设置为高。

运行命令 `echo "0" > gpio466/value`，将 gpio466 的电平设置为低。

可以通过运行命令 `cat gpio466/value `，来查看设置的电平。
