---
sidebar_label: 'LLVM Toolchain'
sidebar_position: 30
---

# SG2042 Thead LLVM documentation
This document is about the installation and use thead llvm in SG2042.

## 1. Current status
Thead vendor extensions are extensions which are not standardized by RISC-V International, and are instead defined by a thead hardware. Check spec [Here](https://github.com/T-head-Semi/thead-extension-spec/releases/download/2.2.2/xthead-2023-01-30-2.2.2.pdf)

Instructions are prefixed with `th.` as described in the specification. There are 13 vendor extensions in spec, but llvm supports 11 vendor extensions，they are:  

1. XTHeadBa, address-generation. 
2. XTHeadBb, basic bit-manipulation.
3. XTHeadBs, single-bit operations
4. XTHeadCondMov, conditional move 
5. XTHeadCmo, cache management operations
6. XTHeadFMemIdx, indexed memory operations for floating point
7. XTheadMac, multiply-accumulate instructions 
8. XTHeadMemIdx, indexed memory operations 
9. XTHeadMemPair，two-GPR memory operations 
10. XTHeadSync，multi-core synchronization instructions
11. XTHeadVdot, version 1.0.0 of the THeadV-family custom instructions  

## 2. How to build
### 2.1 Install prerequisites
Several standard packages are needed to build the toolchain, so we need to prepare the build environment before build. Using ubuntu as an example：

``````
$ apt-get -y install flex bison git-core build-essential ninja-build libssh-dev libc6-dev python3-pip clang  cmake
``````

### 2.2 Build steps

``````
$ git clone git@github.com:llvm/llvm-project.git
$ cd llvm-project
$ mkdir build && cd build
$ cmake -DLLVM_TARGETS_TO_BUILD="RISCV" -DLLVM_ENABLE_PROJECTS="clang" -DCMAKE_BUILD_TYPE="RELEASE" -G Ninja ../llvm
$ ninja
``````

## 3. How to use

`$.example, test.c`
``````
unsigned int clz_32(unsigned int a) {
  return __builtin_riscv_clz_32(a);
}
``````

``````
$llvm-project/build/bin/clang -march=rv64gc_zfh_xtheadba_xtheadbb_xtheadbs_xtheadcmo_xtheadcondmov_xtheadfmemidx_xtheadmac_xtheadmemidx_xtheadmempair_xtheadsync test.c 
``````

*Notes: If we add the -S option，we can see the thead instruction.*

``````
      not     a0, a0
        slli    a0, a0, 32
        th.ff0  a0, a0 ----- the thead instruction.
        ret
``````

