# DeepSeek-R1 Example Code

## Installing DeepSeek-R1 Example

```bash
sudo apt install es-sdk-sample-npu-qwen
```

After installation, the sample can be found in the directory:
`/opt/eswin/sample-code/npu_sample/qwen_sample`

## Usage Example

- Download the precompiled model

  - Install modelscope
    ```bash
    pip3 install modelscope
    ```
  - Download the model
    ```bash
    mkdir DeepSeek-r1 && cd DeepSeek-r1
    modelscope download --model ZIFENG278/deepseek-r1-distill-qwen-7b_ENNP --local_dir ./
    ```

- Modify the `config.json` file path

  Refer to `/opt/eswin/sample-code/npu_sample/qwen_sample/src/qwen2_7b/config.json`

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
          "0":"Who are you?",
          "1":"Solve the equation x+y=12, 2x+4y=34, find the values of x and y",
          "2":"Which number is larger, 10.9 or 10.11?"
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

- Increase NPU memory

  Before loading the DeepSeek-R1 model, you need to replace the dtb file to expand the NPU memory to 20 GB.

  - Download dtb file
    Download link: [eic7700-milkv-megrez_NPU-20G.dtb](https://github.com/milkv-megrez/megrez-files/blob/main/software/dtb/eic7700-milkv-megrez_NPU-20G.dtb)
  - Replace dtb file
    :::tip
    Please back up the original dtb before replacing.
    :::

  ```bash
  sudo mv eic7700-milkv-megrez_NPU-20G.dtb /boot/dtbs/linux-image-6.6.77-win2030/eswin/eic7700-milkv-megrez.dtb
  sudo sync && sudo reboot
  ```

- Start the example

  ```bash
  debian@rockos-eswin:~$ sudo /opt/eswin/sample-code/npu_sample/qwen_sample/bin/es_qwen2 ./config.json

  Loading models: [==================================================] 100.00% (110.75 seconds)
  ----------------------------------------------------------------------------------
  0: Who are you?
  1: Solve the equation x+y=12, 2x+4y=34, find the values of x and y
  2: Which number is larger, 10.9 or 10.11?
  3: Customized prompts
  ----------------------------------------------------------------------------------
  [YOU]:
  ```
