---
sidebar_label: 'ZCC Compiler'
sidebar_position: 30
---
# ZCC User Manual

## Account Registration

Since ZCC is a paid compiler, before downloading or using Terapines ZCC, please go to [**cloud.terapines.com**](https://cloud.terapines.com/) and submit an account registration request.

Your registration may not be approved right away, for assistance, please contact **aries.wu@terapines.com**

## Get ZCC Toolchain

1. Register an account and login at https://cloud.terapines.com.  
2. Click the "Download Link" in the "Download ZStudio with Terapines Toolchains for Linux" section to download zcc.

3. Unzip it. After unzipping, there will be a zcc directory in the current directory. This zcc directory is the installation path of the zcc toolchain.

   ```
   tar -xzvf zstudio-linux.tar.gz
   ```
   
## Online Authorization   

1. Add zcc to environment.

   ```
   export ZCC_PATH=`pwd`/zcc/bin
   export PATH=$ZCC_PATH:$PATH
   ```
   
2. Use `which zcc` and `zcc --version` command to ensure zcc is in the environment.

   ```
   $ which zcc
   ~/Work/jupiter/toolchain/zcc/bin/zcc
   $ zcc --version
   Terapines LTD zcc(based on clang) version 3.0.0_ (https://www.terapines.com bb012eef8b915c2ccbde7e17c9ff2533d1746469)
   Target: riscv64-unknown-unknown-elf
   Thread model: posix
   InstalledDir: /home/tptuser/Work/jupiter/toolchain/zcc/bin/../.bin
   Protection: enable
   $
   ```
   
3. Use zstudio.sh for online authorization. `yourusername` and `yourpassword` are the username and password used to login at https://cloud.terapines.com.

   Note: An account can only be used on one machine. Using the same account on a second machine will fail.
   
   ```
   zstudio.sh -u yourusername -p yourpassword
   ```
   
## Using ZCC   

Zcc is based on llvm compiler, and is also compatible with most gcc parameters. So you can use zcc like clang/gcc.

```
$ zcc hello.c -O3 
$ ./a.out
Hello 
$
```

## Using ZCC to Test SPEC2006

Modify the value of `zcc_dir` variable at line 102 in `zcc-sophgo.cfg` to point to the installation directory of zcc.

Copy `zcc-sophgo.cfg` to $SPEC/config, and copy `zcc.xml` to $SPEC/config/flags. Then run runspec.

```
cp zcc-sophgo.cfg $SPEC/config/
cp zcc.xml $SPEC/config/flags
runspec --config=zcc-sophgo int --reportable
```
### Download
- [zcc-sophgo.cfg](/docs/pioneer/zcc-sophgo.cfg)  
- [zcc.xml](/docs/pioneer/zcc.xml)

