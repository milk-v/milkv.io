# coredump

## 开启coredump

通常情况下，core文件会包含了程序运行时的内存，寄存器状态，堆栈指针，内存管理信息还有各种函数调用堆栈信息等，我们可以理解为是程序工作当前状态存储生成第一个文件，许多的程序出错的时候都会产生一个core文件，通过工具分析这个文件，我们可以定位到程序异常退出的时候对应的堆栈调用等信息，找出问题所在并进行及时解决。

系统默认关闭coredump，可以通过`ulimit -c`查看。
```
ulimit -c
0
```
为0说明不生成core dump文件。如需开启coredump，需要设置core文件大小和路径。

## 设置core文件大小

通过命令`ulimit -c unlimited`​设置生成的core文件大小不限，也可以按自己的需求设置大小。

命令只对当前终端有效，如果希望系统启动设置，可以编辑`/etc/security/limits.conf`文件，添加以下两行：
```
* soft core unlimited
* hard core unlimited
```

## 设置core文件路径

设置core文件的路径和名称，
```
echo /var/crash/core-%e-%p-%t | sudo tee /proc/sys/kernel/core_pattern
```
命令只对当前终端有效，如果希望系统启动设置，可以编辑/etc/sysctl.conf文件，添加以下行：
```
kernel.core_pattern = /var/crash/core-%e-%p-%t
```
运行命令`sudo sysctl -p`使配置生效。

## 测试

运行以下命令，测试是否生效，
```
bash -c 'kill -SEGV $$'
```
如果生效，可以看到以下输出，
```
Segmentation fault (core dumped)
```
与此同时，/var/crash目录会生成对应的core文件。