"""
练习 8：构建多 Agent 协作系统

目标：
1. 实现两个 Agent 的串行协作
2. 实现三角色协作系统
3. （挑战）实现辩论式 Multi-Agent

完成后运行: python exercises/ex-08-multi-agent.py
"""

from openai import OpenAI

client = OpenAI()


def call_llm(system: str, user: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        temperature=0.7,
    )
    return response.choices[0].message.content


# === 练习 1：串行协作 ===

def serial_agents(topic: str) -> str:
    """TODO: 实现两个 Agent 串行协作

    Agent 1（研究员）: 搜索和整理 topic 的资料
    Agent 2（作家）: 根据资料写一篇 200 字的文章

    提示：Agent 1 的输出作为 Agent 2 的输入
    """
    # TODO: 实现
    pass


# === 练习 2：三角色协作 ===

def product_dev_test(feature_idea: str) -> str:
    """TODO: 实现三角色协作

    Agent 1（产品经理）: 分析需求，写需求文档
    Agent 2（开发者）: 根据需求写代码
    Agent 3（测试者）: 审查代码，给出测试报告

    如果测试不通过，代码返回给开发者修改（最多 3 轮）
    """
    # TODO: 实现
    pass


if __name__ == "__main__":
    print("=== 练习 1：串行协作 ===")
    # print(serial_agents("AI Agent 的应用场景"))

    print("\n=== 练习 2：三角色协作 ===")
    # print(product_dev_test("用户登录注册功能"))
