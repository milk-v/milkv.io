---
sidebar_label: '小核 RTOS'
sidebar_position: 50
---

# 简介

Duo 的 CPU 采用双核设计，大核上跑的是 Linux 系统，小核上跑的是实时系统，当前是 FreeRTOS。

# 如何使用小核

## 核间通信样例

Duo 大核与小核间通信是通过 mailbox 机制实现的，最新的镜像已经在大核的 Linux 内核中添加了 mailbox 驱动，小核 FreeRTOS 代码中也实现了相关功能，请使用 [V1.0.9](https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.0.9) 或者 [更新的镜像](https://github.com/milkv-duo/duo-buildroot-sdk/releases) 测试。

### 通过大核控制小核点亮 LED

该样例是运行在大核上的一个 Linux 应用程序，通过大核 Linux 内核中的 mailbox 驱动，来通知小核 FreeRTOS 控制 Duo 上的蓝色 LED 先点亮，3秒后再灭掉。

```c
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <unistd.h>

enum SYSTEM_CMD_TYPE {
	CMDQU_SEND = 1,
	CMDQU_SEND_WAIT,
	CMDQU_SEND_WAKEUP,
};

#define RTOS_CMDQU_DEV_NAME "/dev/cvi-rtos-cmdqu"
#define RTOS_CMDQU_SEND                         _IOW('r', CMDQU_SEND, unsigned long)
#define RTOS_CMDQU_SEND_WAIT                    _IOW('r', CMDQU_SEND_WAIT, unsigned long)
#define RTOS_CMDQU_SEND_WAKEUP                  _IOW('r', CMDQU_SEND_WAKEUP, unsigned long)

enum SYS_CMD_ID {
    CMD_TEST_A  = 0x10,
    CMD_TEST_B,
    CMD_TEST_C,
    CMD_DUO_LED,
    SYS_CMD_INFO_LIMIT,
};

enum DUO_LED_STATUS {
	DUO_LED_ON	= 0x02,
	DUO_LED_OFF,
    DUO_LED_DONE,
};

struct valid_t {
	unsigned char linux_valid;
	unsigned char rtos_valid;
} __attribute__((packed));

typedef union resv_t {
	struct valid_t valid;
	unsigned short mstime; // 0 : noblock, -1 : block infinite
} resv_t;

typedef struct cmdqu_t cmdqu_t;
/* cmdqu size should be 8 bytes because of mailbox buffer size */
struct cmdqu_t {
	unsigned char ip_id;
	unsigned char cmd_id : 7;
	unsigned char block : 1;
	union resv_t resv;
	unsigned int  param_ptr;
} __attribute__((packed)) __attribute__((aligned(0x8)));

int main()
{
    int ret = 0;
    int fd = open(RTOS_CMDQU_DEV_NAME, O_RDWR);
    if(fd <= 0)
    {
        printf("open failed! fd = %d\n", fd);
        return 0;
    }

    struct cmdqu_t cmd = {0};
    cmd.ip_id = 0;
    cmd.cmd_id = CMD_DUO_LED;
    cmd.resv.mstime = 100;
    cmd.param_ptr = DUO_LED_ON;

    ret = ioctl(fd , RTOS_CMDQU_SEND_WAIT, &cmd);
    if(ret < 0)
    {
        printf("ioctl error!\n");
        close(fd);
    }
    sleep(1);
    printf("C906B: cmd.param_ptr = 0x%x\n", cmd.param_ptr);

    sleep(3);

    cmd.cmd_id = CMD_DUO_LED;
    cmd.param_ptr = DUO_LED_OFF;
    ret = ioctl(fd , RTOS_CMDQU_SEND, &cmd);
    if(ret < 0)
    {
        printf("ioctl error!\n");
        close(fd);
    }
    sleep(1);
    printf("C906B: cmd.param_ptr = 0x%x\n", cmd.param_ptr);

    close(fd);
    return 0;
}
```

该测试程序已经放到了 [duo-examples](https://github.com/milkv-duo/duo-examples/tree/main/mailbox-test) 仓库中，如果你是第一次使用该仓库，可以参考 [README](https://github.com/milkv-duo/duo-examples/blob/main/README-zh.md) 来配置环境完成编译:

1. 推荐的编译环境是 `Ubuntu 22.04 LTS`
2. 安装依赖的工具:
   ```
   sudo apt-get install wget git make
   ``` 
3. 获取 [duo-examples](https://github.com/milkv-duo/duo-examples) 仓库源码：
   ```
   git clone https://github.com/milkv-duo/duo-examples.git --depth=1
   ```
4. 加载编译环境：
   ```
   cd duo-examples
   source envsetup.sh
   ```
5. 进入 `mailbox-test` 目录编译
   ```
   cd mailbox-test
   make
   ```

编译成功后将生成的 `mailbox_test` 测试程序通过网口或者 USB网络(USB-NCM) 等方式传送到 Duo 设备中，比如 USB 网络方式，Duo 的 IP 为 `192.168.42.1`，用户名是 `root`，密码是 `milkv`
```
$ scp mailbox_test root@192.168.42.1:/root/
```

在 Duo 上为 `mailbox_test` 程序添加可执行权限:
```
chmod +x mailbox_test
```

Duo 的默认固件大核 Linux 系统会控制 LED 闪烁，这个是通过开机脚本实现的，在测试该程序的时候，需要将 LED 闪烁的脚本禁用，在 Duo 的终端中执行:

```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```

也就是将 LED 闪烁脚本改名，重启 Duo 后，LED 就不会闪了。

在 Duo 串口终端中运行 `./mailbox_test` 测试，输出如下:
```
[root@milkv-duo]~# ./mailbox_test 
RT: [507.950049]prvQueueISR
RT: [507.952485]recv cmd(19) from C906B, param_ptr [0x00000002]
RT: [507.958306]recv cmd(19) from C906B...send [0x00000004] to C906B
C906B: cmd.param_ptr = 0x4
RT: [511.965433]prvQueueISR
RT: [511.967867]recv cmd(19) from C906B, param_ptr [0x00000003]
RT: [511.973689]recv cmd(19) from C906B...send [0x00000004] to C906B
C906B: cmd.param_ptr = 0x3
```

可以看到 Duo 上的蓝色 LED 先亮后灭的现象。

其中以 `RT` 开头的日志是小核 `FreeRTOS` 输出的，`C906B` 开头的日志是大核上的 `mailbox_test` 应用程序输出的。

在日志中可以看到，大核绐小核发送亮灯指令后，小核有回送 0x4(0x00000004) 绐大核，大核上也收到了 0x4，而发灭灯指令后，小核也有返回 0x4(0x00000004) 绐大核，但大核端打印的值是 0x3, 结合代码看，这个 0x3 是大核发送灭灯指令前的参数，这也正是使用 `RTOS_CMDQU_SEND_WAIT` 和 `RTOS_CMDQU_SEND` 两个参数的差异:
```
RTOS_CMDQU_SEND_WAIT  等待返回值
RTOS_CMDQU_SEND       没有返回值
```

另外日志中只显示了测试程序和小核的日志，如果想查看大核 Linux 内核里 mailbox 驱动中的相关日志，以下两种方法都可以:

1. 串口终端中修改内核打印等级:
   ```
   echo 8 > /proc/sys/kernel/printk
   ```
   再执行测试程序:
   ```
   ./mailbox_test 
   ```
2. 使用 `dmesg` 命令查看

### 附录

相关代码所在的目录

1. 大核 mailbox Linux 驱动:
   ```
   linux_5.10/drivers/soc/cvitek/rtos_cmdqu/
   ```
2. 小核 FreeRTOS:
   ```
   freertos/cvitek/driver/rtos_cmdqu/include/rtos_cmdqu.h
   freertos/cvitek/task/comm/src/riscv64/
   ```
