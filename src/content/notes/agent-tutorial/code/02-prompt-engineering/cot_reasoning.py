"""
Chain-of-Thought 推理 - 展示 CoT 和 Self-Consistency 的效果

需要的依赖：openai, python-dotenv
运行方式：python code/02-prompt-engineering/cot_reasoning.py
"""

import os
from collections import Counter
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


def direct_vs_cot():
    """对比直接回答和 Chain-of-Thought 的效果"""
    problem = """一个水池有两个水管。进水管每小时注入 3 吨水，
    排水管每小时排出 1 吨水。水池容量是 20 吨。
    水池开始是空的，需要多少小时能注满？"""

    print("=== 数学推理：直接回答 vs Chain-of-Thought ===\n")
    print(f"题目: {problem}\n")

    # 直接回答
    print("--- 直接回答 ---")
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": problem}],
        temperature=0,
    )
    print(response.choices[0].message.content)

    # Chain-of-Thought
    print("\n--- Chain-of-Thought ---")
    cot_prompt = f"""{problem}

请一步一步思考：
1. 先计算净进水速度（进水速度 - 排水速度）
2. 再用容量除以净速度，得到需要的时间
3. 最后给出答案"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": cot_prompt}],
        temperature=0,
    )
    print(response.choices[0].message.content)


def self_consistency_demo():
    """演示 Self-Consistency：多次采样取多数票"""
    print("\n\n=== Self-Consistency 演示 ===\n")

    problem = """一个商店搞活动，原价 200 元的商品打 8 折，
    然后用满 100 减 15 的优惠券。
    最终需要付多少钱？"""

    print(f"题目: {problem}\n")

    cot_prompt = f"""{problem}

请一步一步推理：
1. 先计算打折后的价格
2. 再减去优惠券
3. 给出最终价格"""

    answers = []
    for i in range(5):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": cot_prompt}],
            temperature=0.7,
        )
        content = response.choices[0].message.content
        # 尝试提取数字答案
        lines = content.strip().split("\n")
        last_line = lines[-1]
        answers.append(last_line)
        print(f"第 {i + 1} 次采样: {last_line}")

    # 统计
    print(f"\n答案分布:")
    for answer, count in Counter(answers).most_common():
        print(f"  '{answer}' -> 出现 {count} 次")

    most_common = Counter(answers).most_common(1)[0]
    print(f"\n最终答案（多数票）: {most_common[0]}")


def cot_with_different_tasks():
    """在不同任务类型上测试 CoT 效果"""
    print("\n\n=== CoT 在不同任务上的效果 ===\n")

    tasks = {
        "逻辑推理": "如果所有猫都是动物，所有动物都需要吃东西，那么猫需要吃东西吗？",
        "常识推理": "小明把冰淇淋放在太阳底下，10 分钟后会怎样？为什么？",
        "代码分析": "以下代码的输出是什么？\n```python\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(len(x))\n```",
    }

    for task_name, question in tasks.items():
        print(f"--- {task_name} ---")
        print(f"问题: {question}\n")

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"{question}\n\n请一步步推理后再回答。"}],
            temperature=0,
            max_tokens=300,
        )
        print(response.choices[0].message.content)
        print()


if __name__ == "__main__":
    direct_vs_cot()
    self_consistency_demo()
    cot_with_different_tasks()
