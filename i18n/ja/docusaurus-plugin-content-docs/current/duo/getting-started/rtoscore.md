---
sidebar_label: 'RTOS Core'
sidebar_position: 50
---

# Introduction

Duo's CPU adopts a dual-core design. The big core runs the Linux system, and the small core runs the real-time system. Currently, it is FreeRTOS.

# How to use the small core

## Inter-core communication example

The communication between the Duo big core and the small core is realized through the mailbox module. The latest image has added the mailbox driver to the Linux kernel of the big core. Related functions are also implemented in the FreeRTOS code of the small core. Please use [V1.0.9]( https://github.com/milkv-duo/duo-buildroot-sdk/releases/tag/Duo-V1.0.9) or [latest image](https://github.com/milkv-duo/duo-buildroot-sdk/releases) test.

### Big core controls small core to light up LED

This example is a Linux application running on the big core, which use the mailbox driver in the Linux kernel to notify the small core FreeRTOS to control the blue LED on Duo. The LED is first light up, and after 3 seconds, it is turned off.

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

The test program has been placed in the [duo-examples](https://github.com/milkv-duo/duo-examples/tree/main/mailbox-test) repository，If this is your first time using this repository，you can refer to [README](https://github.com/milkv-duo/duo-examples/blob/main/README.md) to configure the environment and complete the compilation:

1. The recommended compilation environment is `Ubuntu 22.04 LTS`
2. Install the tools that compile dependencies:
   ```
   sudo apt-get install wget git make
   ``` 
3. Get [duo-examples](https://github.com/milkv-duo/duo-examples) source code：
   ```
   git clone https://github.com/milkv-duo/duo-examples.git --depth=1
   ```
4. Prepare compilation environment：
   ```
   cd duo-examples
   source envsetup.sh
   ```
5. Enter the `mailbox-test` directory and execute make
   ```
   cd mailbox-test
   make
   ```

After successful compilation, the generated `mailbox_test` test program should be transferred to Duo through the network port or USB network (RNDIS). For example, in USB network mode, the IP of Duo is `192.168.42.1`, and the user name is `root`, the password is `milkv`:
```
$ scp mailbox_test root@192.168.42.1:/root/
```

Add executable permissions to the `mailbox_test` program on Duo:
```
chmod +x mailbox_test
```

The default firmware of Duo has the big core Linux system controlling the LED blinking, which is achieved through a boot script. When testing this program, it is necessary to disable the script responsible for LED blinking. To do so, execute the following command on Duo's terminal:
```
mv /mnt/system/blink.sh /mnt/system/blink.sh_backup && sync
```

This command renames the LED blinking script. After restarting Duo, the LED will no longer blink.

Run the `./mailbox_test` test in Duo serial port terminal, the output is as follows:
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

You can see that the blue LED on the Duo turns on first and then turns off.

The logs starting with `RT` are output by the small core `FreeRTOS`, and the logs starting with `C906B` are output by the `mailbox_test` application on the big core.

In the logs, it can be observed that after the big core sends the command to light up the LED to the small core, the small core responds with 0x4 (0x00000004) to the big core, and the big core also receives 0x4. Similarly, after sending the command to turn off the LED, the small core responds with 0x4 (0x00000004) to the big core. However, the value printed on the big core side is 0x3. Combining this with the code, this 0x3 is the parameter before the big core sends the command to turn off the LED. This difference can be attributed to the usage of `RTOS_CMDQU_SEND_WAIT` and `RTOS_CMDQU_SEND` as two different parameters:
```
RTOS_CMDQU_SEND_WAIT  Wait for return value (ACK)
RTOS_CMDQU_SEND       No return value
```

Additionally, if you want to view the relevant logs of the mailbox driver in the big core Linux kernel, you can use either of the following two methods:

1. Modify kernel log level in the serial terminal:
   ```
   echo 8 > /proc/sys/kernel/printk
   ```
   Then execute the testing program:
   ```
   ./mailbox_test 
   ```
2. Use the `dmesg` command

### Appendix

The directory where the relevant code is located:

1. Big core mailbox Linux driver:
   ```
   linux_5.10/drivers/soc/cvitek/rtos_cmdqu/
   ```
2. Small core FreeRTOS:
   ```
   freertos/cvitek/driver/rtos_cmdqu/include/rtos_cmdqu.h
   freertos/cvitek/task/comm/src/riscv64/
   ```
