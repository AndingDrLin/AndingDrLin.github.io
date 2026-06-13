"""
辩论式 Multi-Agent - 两个 Agent 从正反面分析问题

需要的依赖：openai, python-dotenv
运行方式：python code/08-multi-agent/debate_agents.py
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


def argue(topic: str, side: str, opponent_argument: str = "") -> str:
    """让一个 Agent 从指定角度论证"""
    prompt = f"""你是一位辩论选手，你的立场是「{side}」。
辩题：{topic}

{"对方说：" + opponent_argument + "\n\n请针对对方的观点进行反驳，并提出你的论据。" if opponent_argument else "请提出你的第一个论据。"}

要求：
1. 提出 2-3 个具体论点
2. 用事实或数据支持你的观点
3. 控制在 150 字以内"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    return response.choices[0].message.content


def judge(topic: str, pro_args: list[str], con_args: list[str]) -> str:
    """裁判 Agent 综合双方观点"""
    pro_text = "\n".join([f"第 {i + 1} 轮：{arg}" for i, arg in enumerate(pro_args)])
    con_text = "\n".join([f"第 {i + 1} 轮：{arg}" for i, arg in enumerate(con_args)])

    prompt = f"""你是辩论裁判。请综合双方观点，给出公正的评判。

辩题：{topic}

正方观点：
{pro_text}

反方观点：
{con_text}

请从以下角度评判：
1. 论据质量（事实准确性、逻辑性）
2. 论证力度（说服力、深度）
3. 综合结论

给出最终评判，控制在 200 字以内。"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )
    return response.choices[0].message.content


def debate(topic: str, max_rounds: int = 3) -> dict:
    """运行辩论"""
    print(f"辩题：{topic}")
    print(f"辩论轮数：{max_rounds}")
    print("=" * 60)

    pro_args = []
    con_args = []

    for round_num in range(max_rounds):
        print(f"\n--- 第 {round_num + 1} 轮 ---")

        # 正方
        opponent = con_args[-1] if con_args else ""
        pro = argue(topic, "正方", opponent)
        pro_args.append(pro)
        print(f"\n[正方]\n{pro}")

        # 反方
        con = argue(topic, "反方", pro_args[-1])
        con_args.append(con)
        print(f"\n[反方]\n{con}")

    # 裁判
    print(f"\n{'=' * 60}")
    print("[裁判评判]")
    verdict = judge(topic, pro_args, con_args)
    print(verdict)

    return {
        "topic": topic,
        "pro_arguments": pro_args,
        "con_arguments": con_args,
        "verdict": verdict,
    }


if __name__ == "__main__":
    # 辩论 1
    result1 = debate("AI Agent 是否会在未来 5 年内取代大部分白领工作？")

    print("\n\n" + "=" * 60)

    # 辩论 2
    result2 = debate("开发者应该优先学习 AI Agent 还是传统后端开发？")
