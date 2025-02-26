# Qwen2 示例代码

## 安装 DeepSeek-R1 示例

```bash
sudo apt install es-sdk-sample-npu-qwen
```

安装后 sample 位于 `/opt/eswin/sample-code/npu_sample/qwen_sample` 目录

## 使用示例

- 下载编译好的模型

  - 安装 modelscope
    ```bash
    pip3 install modelscope
    ```
  - 下载模型
    ```bash
    mkdir DeepSeek-r1 && cd DeepSeek-r1
    modelscope download --model ZIFENG278/Qwen2-0.5B_ENNP --local_dir ./
    ```

- 修改 config.json 文件路径

请参考 `/opt/eswin/sample-code/npu_sample/qwen_sample/src/qwen2_7b/config.json`

```bash
{
    "model_dir": "/home/debian/deepseek_r1_distill_qwen_7b/",
    "block_models": [
        "DeepSeek-R1-Distill-Qwen-7B_l0.model",
        "DeepSeek-R1-Distill-Qwen-7B_l1.model",
        "DeepSeek-R1-Distill-Qwen-7B_l2.model",
        "DeepSeek-R1-Distill-Qwen-7B_l3.model",
        "DeepSeek-R1-Distill-Qwen-7B_l4.model",
        "DeepSeek-R1-Distill-Qwen-7B_l5.model",
        "DeepSeek-R1-Distill-Qwen-7B_l6.model",
        "DeepSeek-R1-Distill-Qwen-7B_l7.model",
        "DeepSeek-R1-Distill-Qwen-7B_l8.model",
        "DeepSeek-R1-Distill-Qwen-7B_l9.model",
        "DeepSeek-R1-Distill-Qwen-7B_l10.model",
        "DeepSeek-R1-Distill-Qwen-7B_l11.model",
        "DeepSeek-R1-Distill-Qwen-7B_l12.model",
        "DeepSeek-R1-Distill-Qwen-7B_l13.model",
        "DeepSeek-R1-Distill-Qwen-7B_l14.model",
        "DeepSeek-R1-Distill-Qwen-7B_l15.model",
        "DeepSeek-R1-Distill-Qwen-7B_l16.model",
        "DeepSeek-R1-Distill-Qwen-7B_l17.model",
        "DeepSeek-R1-Distill-Qwen-7B_l18.model",
        "DeepSeek-R1-Distill-Qwen-7B_l19.model",
        "DeepSeek-R1-Distill-Qwen-7B_l20.model",
        "DeepSeek-R1-Distill-Qwen-7B_l21.model",
        "DeepSeek-R1-Distill-Qwen-7B_l22.model",
        "DeepSeek-R1-Distill-Qwen-7B_l23.model",
        "DeepSeek-R1-Distill-Qwen-7B_l24.model",
        "DeepSeek-R1-Distill-Qwen-7B_l25.model",
        "DeepSeek-R1-Distill-Qwen-7B_l26.model",
        "DeepSeek-R1-Distill-Qwen-7B_l27.model"
    ],
    "logits": true,
    "logits_models": "DeepSeek-R1-Distill-Qwen-7B_lm.model",
    "tokenizer_file": "/opt/eswin/sample-code/npu_sample/qwen_sample/src/qwen2_7b/qwen.tiktoken",
    "vocab_size": 152064,
    "embedding_file": "/home/debian/deepseek_r1_distill_qwen_7b/embedding.bin",
    "embedding_size": 3584,
    "num_head": 4,
    "embedding_dim": 128,
    "embedding_dim1": 8,
    "embedding_dim2": 16,
    "token_num": 1024,
    "token_n1": 64,
    "token_n2": 16,
    "precision": 2,
    "language": "en",
    "eos_list": ["<|endoftext|>", "<|im_end|>", "<|im_start|>"],
    "response_max_len": 1024,
    "response_line_len": 100,
    "prompts" : {
        "0":"你是谁",
        "1":"解方程 x+y=12, 2x+4y=34, 求x,y的值",
        "2":"数字10.9大还是数字10.11大"
    },
    "random_cnt": 4,
    "repeat_len": 10,
    "repeat_cnt": 2,
    "log_level": 0,
    "data_dump": 0,
    "data_dump_token": [0, 180],
    "perf_enable": 0,
    "op_dump": 0,
    "op_dump_token": [0, 180],
    "op_dump_layer": [0, 28],
    "op_dump_type": 1,
    "op_dump_list": [0, 220],
    "model_test": 0,
    "repetition_penalty": 1.05,
    "top_k": 1
}


```

- 增大 NPU 内存
  在加载 Deepseek-r1 模型前需要更换 dtb 文件来扩大 NPU 内存到 20 GB
- 启动示例

```bash
$ sudo /opt/eswin/sample-code/npu_sample/qwen_sample/bin/es_qwen2 ./config.json

Loading models: [==================================================] 100.00% (5.46 seconds)
----------------------------------------------------------------------------------
0: 介绍一下大语言模型
1: The quantum computers
2: Humans and robots coexist
3: Customized prompts
----------------------------------------------------------------------------------
[YOU]:
```
