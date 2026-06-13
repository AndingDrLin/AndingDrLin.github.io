"""
Chunking 策略对比 - 对比不同文档切分策略的效果

需要的依赖：openai, python-dotenv
运行方式：python code/03-rag/chunking_experiment.py
"""

import os
import re
from dotenv import load_dotenv

load_dotenv()


def fixed_size_chunks(text: str, chunk_size: int = 200, overlap: int = 50) -> list[str]:
    """固定大小切分，带重叠

    就像用固定长度的尺子量布，每次移动 (chunk_size - overlap) 的距离。
    重叠部分确保不会在关键词中间截断。
    """
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks


def sentence_chunks(text: str) -> list[str]:
    """按句子切分

    用标点符号作为分隔符，每个句子是一个独立的语义单元。
    """
    sentences = re.split(r'[。！？\n]+', text)
    return [s.strip() for s in sentences if s.strip()]


def paragraph_chunks(text: str) -> list[str]:
    """按段落切分（用空行分隔）"""
    paragraphs = text.split("\n\n")
    return [p.strip() for p in paragraphs if p.strip()]


def recursive_chunks(text: str, chunk_size: int = 200, separators: list[str] = None) -> list[str]:
    """递归切分：先按大单元，再按小单元

    这是 LangChain 的 RecursiveCharacterTextSplitter 的原理：
    1. 先按段落切
    2. 如果某段太长，按句子切
    3. 如果某句还是太长，按字符切
    """
    if separators is None:
        separators = ["\n\n", "\n", "。", "！", "？", "，", " "]

    if len(text) <= chunk_size:
        return [text]

    # 找到第一个可用的分隔符
    sep = separators[0]
    remaining_seps = separators[1:]

    parts = text.split(sep)
    chunks = []
    current_chunk = ""

    for part in parts:
        if len(current_chunk) + len(part) + len(sep) <= chunk_size:
            current_chunk += (sep if current_chunk else "") + part
        else:
            if current_chunk:
                chunks.append(current_chunk)
            # 如果单个 part 也太长，用更小的分隔符继续切
            if len(part) > chunk_size and remaining_seps:
                sub_chunks = recursive_chunks(part, chunk_size, remaining_seps)
                chunks.extend(sub_chunks)
            else:
                current_chunk = part

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


def compare_strategies(text: str):
    """对比三种切分策略"""
    strategies = {
        "固定大小 (200字, 50字重叠)": lambda t: fixed_size_chunks(t, 200, 50),
        "按句子": sentence_chunks,
        "递归切分 (200字)": lambda t: recursive_chunks(t, 200),
    }

    print(f"原文长度: {len(text)} 字\n")

    for name, strategy in strategies.items():
        chunks = strategy(text)
        sizes = [len(c) for c in chunks]
        print(f"=== {name} ===")
        print(f"  块数: {len(chunks)}")
        print(f"  平均大小: {sum(sizes) / len(sizes):.0f} 字")
        print(f"  最大/最小: {max(sizes)} / {min(sizes)} 字")
        print(f"  前 2 块:")
        for i, chunk in enumerate(chunks[:2]):
            print(f"    [{i}] ({len(chunk)}字): {chunk[:80]}...")
        print()


# 示例文本
SAMPLE_TEXT = """人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，旨在创建能够模拟人类智能的系统。

AI 的发展历程可以分为几个阶段。1950 年代，Alan Turing 提出了著名的图灵测试，为 AI 的发展奠定了理论基础。1960-1970 年代，专家系统开始兴起，能够模拟人类专家在特定领域的决策过程。

1980-1990 年代，机器学习开始崭露头角。支持向量机（SVM）、随机森林等算法被广泛应用。然而，由于计算能力和数据量的限制，AI 的发展一度进入低谷。

2012 年是 AI 历史上的转折点。AlexNet 在 ImageNet 竞赛中取得了突破性成绩，深度学习开始主导 AI 领域。2017 年，Google 发表了 "Attention Is All You Need" 论文，提出了 Transformer 架构，这成为了后续所有大语言模型的基础。

2022 年底，ChatGPT 的发布引发了 AI 的新一轮热潮。大语言模型（LLM）展现出了前所未有的能力，能够进行对话、写作、编程、推理等多种任务。AI Agent 作为 LLM 的重要应用形态，正在改变人们与计算机交互的方式。"""

if __name__ == "__main__":
    compare_strategies(SAMPLE_TEXT)
