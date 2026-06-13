"""
练习 8 参考答案：多 Agent 协作

运行方式: python solutions/sol-08-multi-agent.py
"""

from openai import OpenAI

client = OpenAI()


def call_llm(system: str, user: str, temperature: float = 0.7) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
        temperature=temperature,
    )
    return response.choices[0].message.content


def serial_agents(topic: str) -> str:
    # Agent 1: 研究
    research = call_llm(
        "你是研究分析师，整理出关键信息点。",
        f"研究以下主题，列出 3-5 个要点：{topic}",
    )
    print(f"[研究员] {research}")

    # Agent 2: 写作
    article = call_llm(
        "你是技术作家，写通俗易懂的文章。",
        f"根据以下资料写一篇 200 字的文章：\n{research}",
    )
    print(f"[作家] {article}")
    return article


def product_dev_test(feature_idea: str) -> str:
    # 产品经理
    prd = call_llm("你是产品经理，写简洁的需求文档。", f"为以下功能写需求文档：{feature_idea}")
    print(f"[产品经理]\n{prd}\n")

    for round_num in range(3):
        # 开发者
        code = call_llm("你是 Python 开发者，写简洁可运行的代码。", f"根据需求实现代码：\n{prd}")
        print(f"[开发者 - 第 {round_num + 1} 轮]\n{code}\n")

        # 测试者
        review = call_llm(
            "你是严格的质量工程师。审查代码。如果通过回复 APPROVE，否则给出问题。",
            f"审查以下代码：\n{code}\n\n需求：\n{prd}",
            temperature=0,
        )
        print(f"[测试者]\n{review}\n")

        if "APPROVE" in review:
            return f"代码通过审核！\n\n{code}"
        prd = f"{prd}\n\n测试反馈：{review}\n请修复以上问题。"

    return "超过最大修改轮数"


if __name__ == "__main__":
    print("=== 串行协作 ===")
    serial_agents("AI Agent 的应用场景")

    print("\n=== 三角色协作 ===")
    product_dev_test("用户登录注册功能")
