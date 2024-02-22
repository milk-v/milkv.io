---
sidebar_label: 'SG2042 Running benchmark software usage documentation'
sidebar_position: 20
---
# SG2042 Running benchmark software usage documentation
This document is about the installation and use of SG2042 scoring software. It contains a total of two items, which are for CPU performance testing, including a total of five items, namely spec2017, spec2006, core-core latency, Uniex-bench, coremark; And for memory and IO performance runs a total of two items, namely stream and fio.

## CPU Performance Testing
### 1. SPEC 2017
SPEC CPU is an industry-standard CPU-intensive benchmark suite. SPEC CPU2017 was released in June 2017 and contains four benchmarks. This document is about SPECrate 2017 Integer, SPECrate 2017 Floating, both are throughput tests.

#### 1.1 How to Build

``````
$mkdir cpu
$sudo mount cpu-1.1.9.iso cpu/
$mkdir spec2017
$sudo chmod +x spec2017/ -R
$cp -r cpu/* spec2017/
$cd spec2017
$sudo dnf install gcc g++ gfortran glibc-static libgfortran-static libxcrypt-compat
$./install.sh
``````
After running the./install.sh command, you will be prompted to whichdirectory to install the relevant files, type yes, you can install to the current directory, wait for the installation, after the installation is successful，continue execution：

``````
$mv riscv.cfg config/ // This command does not need to be executed if the official cfg is used
``````

Currently, Terapines zcc toolchain, llvm compiler, T-head compiler, gcc are supported. If you want to test with a different compiler, you can specify the compiler by modifying the CC, CXX, FC parameters of riscv.cfg:

- **GCC**
``````
CC = $(SPECLANG)gcc -std=c99
CXX = $(SPECLANG)g++ -std=c++O3
``````

- **T-head**
``````
CC = /home/fedora/tools/gcc-riscv64-thead-fedora38-linux-gnu-10.4/bin/gcc -std=c99
CXX = /home/fedora/tools/gcc-riscv64-thead-fedora38-linux-gnu-10.4/bin/g++  -std=c++O3
FC = /home/fedora/tools/gcc-riscv64-thead-fedora38-linux-gnu-10.4/bin/gfortran
``````

- **clang**

Since llvm does not currently have a fortran library, fortran can only use gfortran:

``````
CC = clang
CXX = calng++
FC = $(SPECLANG)gfortran
``````

- **ZCC**

Terapines fortran compiler zfc will be available in the next release.
```
CC = zcc --target=riscv64-unknown-linux-gnu -std=c99 -mllvm --no-unsigned-wrap=false
CXX = z++ --target=riscv64-unknown-linux-gnu -std=c++03
FC = $(SPECLANG)gfortran
```

#### 1.2 How to use

``````
$. ./shrc
``````
SPECrate Integer:
``````
$runcpu --action=run --tune=base --config=riscv.cfg intrate,
``````
SPECrate Floating:
``````
$. ./shrc
$runcpu --action=run --tune=base --config=riscv.cfg fprate.
``````
Result:
``````
Under spec2017/result is the generated score.
result:CPU2017.xxx.iinrate/fprate.refrate.pdf/txt; 
``````

### 2. SPEC 2006
SPEC 2006 is a suite of standardized CPU test benchmarks, including the SPECint benchmark and the SPECfp benchmark.

#### 2.1 How to build

``````
$mkdir cpu
$sudo mount cpu2006-1.2.iso cpu/
$mkdir spec2006
$sudo chmod +x spec2006/ -R
$cp -r cpu/* spec2006/
$cd spec2006
$sudo dnf install gcc g++ gfortran glibc-static libgfortran-static libxcrypt-compat libstdc++-static.riscv64
``````
Place the spec2006 porting toolkit linux-riscv64-118.tar in the spec2006directory, then:

``````
$tar -xvf linux-riscv64-118.tar
$export SPEC_INSTALL_NOCHECK=1
$./install.sh -u linux-riscv
$mv riscv.cfg config/ #If you use other config, this step can be ignored
``````

Currently, Terapines zcc toolchain, llvm compiler, T-head compiler, gcc are supported. If you want to use a different compiler for testing, you can specify the compiler by modifying the CC, CXX, FC parameters of riscv.cfg:

- **GCC**

``````
CC = gcc
CXX = g++
FC = gfortran
``````

- **T-Head**

``````
CC = /home/fedora/tools/gcc-riscv64-thead-fedora38-linux-gnu-10.4/bin/gcc
CXX = /home/fedora/tools/GCC - riscv64 - thead - fedora38 - Linux - 10.4 - gnu/bin/g++
FC = /home/fedora/tools/GCC - riscv64 - thead - fedora38 - Linux - 10.4 -gnu/bin/gfortran
``````

- **llvm**

``````
CC = clang -Wno-int-conversion -std=gnu89
CXX = g++
FC = gfortran
``````

- **ZCC**

Terapines fortran compiler zfc will be available in the next release.

``````
CC = zcc --target=riscv64-unknown-linux-gnu -Wno-int-conversion -std=gnu89 -mllvm -no-unsigned-wrap=false
CXX = z++ --target=riscv64-unknown-linux-gnu -std=c++03
FC = gfortran
``````

*Note: export SPEC_INSTALL_NOCHECK=1 can bypass regression testing for perl*

#### How to use
Run the runspec command to test, common test options are as follows:

``````
(1) --action=build/run/onlyrun build means only compile the test set, run means run the test set, if the test set has not been compiled before, it will build and then test. onlyrun only runs but does not compile.

(2) -- tune=base/peak /all base benchmark peak test all first base test and then peak test.

(3) -size =test/train/ref /all test set, from small to large, all, run all three test sets.

(4) -- config=xxx.cfg specifies the config file, the file is saved in the config directory; 

(5) -n x Specifies the number of tests, n must be greater than or equal to 3 in order to generate a test report.

(6) - reprotable generates a report int/fp/all Selects integer test, floating-point test, all runs int before fp

(7) int/fp/all selects integer test and floating point test. all runs int first and then fp.

(8)--copies=X limit the number of CPUs running when run rate test

Just Type:
runspec –action=build –tune=base –config=riscv.cfg int -reportable -n 3 -l
``````

### 3. Unixbench
Unixbench is an open source tool for testing the basic performance of unix systems. It tests a series of performance of all aspects of the system, and then compares each test result with a benchmark value to obtain an index value.

#### 3.1 How to build

``````
$git clone https://github.com/kdlucas/byte-unixbench.git
$ cd byte-unixbench
$cd Unixbbench
$sudo dnf install perl
``````

llvm compiler, T-head compiler, gcc are currently supported. If you want to use adifferent compiler for testing, you can modify the Makefile to select the compiler

``````
$vim Makefile
CC=clang/gcc/the path to gcc in the T-head bin directory
$make
``````

#### 3.2 How to use
``````
$./Run
``````

If you want to get runs with different cpu numbers, you can add the -c argument to specify the number of cpus to run:

Just Type:

``````
$/Run -c X//X is the actual number of cpus
``````
Result:
The Unixbench run-score results are in the results directory:
``````
$cd results
$ls
``````

### 4. Coremark test

#### 4.1 How to build 

``````
$git clone https://github.com/eembc/coremark.git
$cd coremark
$cd posix/
$vi core_portme.mak
``````

Currently support llvm compiler, T-head compiler, gcc, if you want to use a different compiler test, you can change the cc parameter to select the compiler, and change PORT_CFLAGS =-O3,PORT_CFLAGS +=-lrt-lpthread in the core_porme.mak,then:

``````
$cd ..
$make
$make clean
``````

#### How to use

``````
$make XCFLAGS="-DMULTITHREAD= x-duse_fork "//X specifies how many cores to measure
``````
Result: Run score results in run1.log  
Note: If you need consecutive tests, run `$make clean` first

### 5. core-core latency
Core-core latency measures the latency it takes for a CPU to send a message to another CPU via its cache coherence protocol. By pinning two threads to two different CPU cores, we can have them perform a series of comparison swap operations and measure the latency.

#### 5.1 How to build

``````
$git clone https://github.com/nviennot/core-to-core-latency.git
$cd core-to-core-latency
$curl, proto '= HTTPS' - tlsv1.2 - sSf https://sh.rustup.rs | sh
$vi ~/.bashrc
``````

Installing Rust on Fedora can be done through rustup, the tool provided by Rust officially. After rustup is installed, in order to ensure that core-to-core-latency is running correctly, add the installation directory of rustup to the environment variable of your system, and add the following at the end of the bashrc file:eg:export PATH=“$HOME/.cargo/bin:$PATH”, then

``````
$source ~/.bashrc
$cargo install core-to-core-latency
``````

#### 5.2 How to use

``````
$core-to-core-latency
``````
If you want to visualize the results, run the following command:
``````
$core-to-core-latency 5000 --csv > output.csv
``````
Result: The result is in the Result directory  

Results Visualization: There is a python script for visualization in the result directory. You can run this script through juypter to visualize the results.  

## Memory and IO Performance scores
### 1. Stream
stream is a set of comprehensive performance test programs, including four array operations: Copy, Scale, Add and Triad. The performance of memory bandwidth is tested by these four array operations.

#### 1.1 How to build

``````
$git clone https://github.com/jeffhammond/STREAM.git
$cd STREAM
``````

llvm compiler, T-head compiler, gcc are currently supported. The commands compiled by different compilers are as follows:

``````
$gcc-O3 -fopenmp -DSTREAM_ARRAY_SIZE=80000000 -DNTIMES=20 stream.c -o stream
 
$clang -O3 -fopenmp -DSTREAM_ARRAY_SIZE=80000000 -DNTIMES=20 stream.c -o stream  

$/home/fedora/tools/gcc-riscv64-theel- fedora38- linux- gnu-10.4
/bin/gcc-O3-fopenmp-DSTREAM_ARRAY_SIZE=80000000-DNTIMES=20 stream.c-o stream// T-head compiler
``````

#### 1.2 How to run 

``````
$export OMP_NUM_THREADS=X// Specify how many threads to run
$./streamResult: The command will give the result of memory bandwidth when completed
``````

### 2. FIO
Fio is an open source testing tool, mainly used to test hard disk io performance, can test block devices or files, can simulate various io operations through multi-threads or processes, can test statistics iops, bandwidth and latency performance.

#### 2.1 How to build
llvm compiler, T-head compiler, gcc are currently supported. If you want to test with a different compiler, you can run make and specify the compiler:

``````
$git clone https://github.com/axboe/fio.git
$cd fio
$./configure -- cc=clang//llvm compiler
$./configure--cc=/home/fedora/tools/gcc-riscv64-thead-fedora38- linux- gnu-10.4/bin/gcc // the directory where the compiler is located
$./configure //gcc compiler
$make
$ make install
``````

#### How to run 64 threads
Test the ability to read sequentially:

``````
$sudo fio -filename=/dev/nvme0n1 -direct=1 - iodepth 1 -thread -rw=read -ioengine=psync -bs=1M -size=10G - numjobs=64 -runtime=60 - group_reporting -name=nvme
``````

Test order write:

``````
$sudo fio -filename=/dev/nvme0n1 -direct=1 -iodepth 1 -thread -rw=wirte -ioengine=psync -bs=1M -size=10G - numjobs=64 -runtime=60 - group_reporting -name=nvme
``````
