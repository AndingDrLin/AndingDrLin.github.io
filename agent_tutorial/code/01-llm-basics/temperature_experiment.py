"""
Temperature 实验 - 观察不同 Temperature 对输出的影响

需要的依赖：openai, python-dotenv
运行方式：python code/01-llm-basics/temperature_experiment.py
"""

import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


def experiment_temperature(prompt: str, temperatures: list[float], n_runs: int = 3):
    """对比不同 Temperature 下的输出差异"""
    print(f"Prompt: {prompt}")
    print(f"每个 Temperature 运行 {n_runs} 次\n")

    for temp in temperatures:
        print(f"{'=' * 50}")
        print(f"Temperature = {temp}")
        print(f"{'=' * 50}")

        for i in range(n_runs):
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                temperature=temp,
                max_tokens=150,
            )
            content = response.choices[0].message.content
            tokens_used = response.usage.total_tokens
            print(f"\n  第 {i + 1} 次 ({tokens_used} Token):")
            # 缩进输出内容
            for line in content.strip().split("\n"):
                print(f"    {line}")
            time.sleep(0.5)  # 避免触发频率限制

        print()


def count_tokens(prompt: str, temperature: float = 0) -> dict:
    """统计一次调用的 Token 使用情况"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
    )
    return {
        "prompt_tokens": response.usage.prompt_tokens,
        "completion_tokens": response.usage.completion_tokens,
        "total_tokens": response.usage.total_tokens,
        "content": response.choices[0].message.content,
    }


if __name__ == "__main__":
    # 实验 1：诗歌生成（高 Temperature 更有创意）
    experiment_temperature(
        prompt="写一首关于秋天的五言绝句，只写一首",
        temperatures=[0, 0.7, 1.2],
        n_runs=2,
    )

    # 实验 2：事实问答（低 Temperature 更稳定）
    print("\n\n=== 事实问答实验 ===\n")
    experiment_temperature(
        prompt="法国的首都是哪里？用一句话回答",
        temperatures=[0, 0.7, 1.5],
        n_runs=2,
    )

    # Token 统计
    print("\n=== Token 使用统计 ===\n")
    result = count_tokens("用三句话介绍人工智能的发展历史")
    print(f"输入 Token: {result['prompt_tokens']}")
    print(f"输出 Token: {result['completion_tokens']}")
    print(f"总 Token: {result['total_tokens']}")
    print(f"内容: {result['content']}")
