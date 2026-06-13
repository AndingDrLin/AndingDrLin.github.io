"""
Attention 可视化 - 理解 Transformer 的核心机制

需要的依赖：transformers, torch, bertviz (Jupyter 环境)
运行方式：python code/01-llm-basics/attention_viz.py

注意：bertviz 的交互式可视化需要在 Jupyter Notebook 中运行。
此脚本以文本方式展示 Attention 权重矩阵。
"""

import torch
from transformers import AutoTokenizer, AutoModel


def get_attention_weights(text: str, model_name: str = "bert-base-uncased"):
    """获取 BERT 模型的 Attention 权重"""
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name, output_attentions=True)

    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)

    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    # 取第 1 层的 attention 权重，形状: (batch, heads, seq_len, seq_len)
    attention = outputs.attentions[0][0]  # (heads, seq_len, seq_len)

    return tokens, attention


def print_attention_matrix(tokens: list, attention: torch.Tensor, head: int = 0):
    """以文本方式打印 Attention 权重矩阵"""
    weights = attention[head].numpy()
    n = len(tokens)

    # 打印表头
    print(f"\nAttention 权重 (Layer 1, Head {head + 1}):")
    print(f"{'':>12s}", end="")
    for t in tokens:
        print(f"{t:>10s}", end="")
    print()

    # 打印每一行
    for i in range(n):
        print(f"{tokens[i]:>12s}", end="")
        for j in range(n):
            val = weights[i][j]
            # 用 * 的数量表示权重大小
            stars = "*" * int(val * 10)
            print(f"{val:>8.3f}{stars:>2s}", end="")
        print()


def analyze_attention(text: str):
    """分析并展示 Attention 权重"""
    print(f"输入文本: {text}")
    tokens, attention = get_attention_weights(text)

    print(f"Tokens: {tokens}")
    print(f"Attention 矩阵形状: {attention.shape}")
    print(f"  - {attention.shape[0]} 个 Attention Head")
    print(f"  - {attention.shape[1]} x {attention.shape[2]} 的 Token 序列")

    # 展示第 1 个 Head 的权重
    print_attention_matrix(tokens, attention, head=0)

    # 找出每个 Token 最关注的其他 Token
    weights = attention[0].numpy()  # Head 0
    print(f"\n每个 Token 最关注的 Token:")
    for i, token in enumerate(tokens):
        # 排除自己
        weights_without_self = weights[i].copy()
        weights_without_self[i] = 0
        most_attended = weights_without_self.argmax()
        print(f"  '{token}' -> 最关注 '{tokens[most_attended]}' "
              f"(权重 {weights_without_self[most_attended]:.3f})")


if __name__ == "__main__":
    # 英文示例
    analyze_attention("The cat sat on the mat")

    print("\n" + "=" * 60 + "\n")

    # 另一个示例
    analyze_attention("She told him that she loved him")
