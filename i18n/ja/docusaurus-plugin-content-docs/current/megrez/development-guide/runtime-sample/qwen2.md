# Qwen2 Example Code

## Install Qwen2 Sample

```bash
sudo apt install es-sdk-sample-npu-qwen
```

After installation, the sample is located in the `/opt/eswin/sample-code/npu_sample/qwen_sample` directory.

## Usage Example

- Download the precompiled model

  - Install modelscope
    ```bash
    pip3 install modelscope
    ```
  - Download the model
    ```bash
    mkdir Qwen2 && cd Qwen2
    modelscope download --model ZIFENG278/Qwen2-0.5B_ENNP --local_dir ./
    ```

- Modify the config.json file path

  Please refer to `/opt/eswin/sample-code/npu_sample/qwen_sample/src/qwen2_0_5b/config.json`

  ```bash
  {
      "model_dir": "/opt/eswin/sample-code/npu_sample/qwen_sample/models/qwen2_0_5b/",
      "block_models": [
          "modified_block_0_npu_b1.model",
          "modified_block_1_npu_b1.model",
          "modified_block_2_npu_b1.model",
          "modified_block_3_npu_b1.model",
          "modified_block_4_npu_b1.model",
          "modified_block_5_npu_b1.model",
          "modified_block_6_npu_b1.model",
          "modified_block_7_npu_b1.model",
          "modified_block_8_npu_b1.model",
          "modified_block_9_npu_b1.model",
          "modified_block_10_npu_b1.model",
          "modified_block_11_npu_b1.model",
          "modified_block_12_npu_b1.model",
          "modified_block_13_npu_b1.model",
          "modified_block_14_npu_b1.model",
          "modified_block_15_npu_b1.model",
          "modified_block_16_npu_b1.model",
          "modified_block_17_npu_b1.model",
          "modified_block_18_npu_b1.model",
          "modified_block_19_npu_b1.model",
          "modified_block_20_npu_b1.model",
          "modified_block_21_npu_b1.model",
          "modified_block_22_npu_b1.model",
          "modified_block_23_npu_b1.model"
      ],
      "logits": true,
      "logits_models": "lm_npu_b1.model",
      "tokenizer_file": "/opt/eswin/sample-code/npu_sample/qwen_sample/src/qwen2_0_5b/qwen.tiktoken",
      "vocab_size": 151936,
      "embedding_file": "/opt/eswin/sample-code/npu_sample/qwen_sample/models/qwen2_0_5b/embedding.bin",
      "embedding_size": 896,
      "num_head": 2,
      "embedding_dim": 64,
      "embedding_dim1": 4,
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
          "0":"介绍一下大语言模型",
          "1":"The quantum computers",
          "2":"Humans and robots coexist"
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
      "op_dump_layer": [0, 23],
      "op_dump_type": 1,
      "op_dump_list": [0, 220],
      "model_test": 0,
      "repetition_penalty": 1.1,
      "top_k": 1
  }
  ```

- Start the example

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
  ``
  ```
