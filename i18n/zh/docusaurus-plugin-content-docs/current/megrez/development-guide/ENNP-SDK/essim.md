# EsSimulator 仿真工具

## EsSimulator 工具介绍

EsSimulator 模型离线测试工具，用于比较生成的模型是否与原始模型计算结果一致。
EsSimulator 接收由 EsACC 生成的离线模型，根据 EsGoldenDataGen 生成的输入和预期的输出 Tensor 数据来验证模型的正确性。
EsSimulator 是一个离线验证工具，可快速验证模型正确性，方便调试定位模型问题及评估模型效果。

![ennp_2.webp](/docs/megrez/ennp_2.webp)

## EsSimulator 工具安装

EsAAC 和 EsSimulator 以同一 docker 形式发布, 请用户在 X86 Linux 平台工作站安装好 [docker](https://docs.docker.com/engine/install/ubuntu/)
:::tip
此文档在 x86 ubuntu22.04 Linux 6.8.0-52-generic 上测试通过
:::
请参考 [EsAAC 与 EsSimulator 工具安装](esaac#esaac-与-essimulator-工具安装)
