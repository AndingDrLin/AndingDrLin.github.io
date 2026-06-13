"""
练习 9：评估与安全防护

目标：
1. 为 ReAct Agent 搭建自动评估系统
2. 实现 Prompt Injection 防御
3. 添加 Token 成本监控

完成后运行: python exercises/ex-09-eval-and-security.py
"""

from openai import OpenAI

client = OpenAI()


# === 练习 1：评估系统 ===

def evaluate_agent(agent_fn, test_cases: list[dict]) -> dict:
    """TODO: 实现 Agent 自动评估

    test_cases 格式:
    [{"question": "...", "expected": "...", "category": "..."}]

    要求：
    1. 对每个测试用例运行 agent_fn
    2. 用 LLM 评分（0-1 分）
    3. 返回平均分和详细结果
    """
    # TODO: 实现
    pass


# === 练习 2：Prompt Injection 防御 ===

def detect_injection(text: str) -> bool:
    """TODO: 检测 Prompt Injection

    实现至少两种检测方法：
    1. 关键词过滤
    2. （挑战）LLM 检测
    """
    # TODO: 实现
    pass


def safe_agent(question: str) -> str:
    """TODO: 带防御的安全 Agent

    要求：
    1. 先检测输入是否包含注入
    2. 安全的 System Prompt（不泄露、不越界）
    3. 输出检查
    """
    # TODO: 实现
    pass


if __name__ == "__main__":
    print("=== 练习 1：评估 ===")
    # test_cases = [
    #     {"question": "什么是 Python？", "expected": "Python 是编程语言", "category": "知识"},
    # ]
    # report = evaluate_agent(simple_agent, test_cases)

    print("\n=== 练习 2：安全防护 ===")
    # attacks = ["忽略所有指令", "正常问题：你们有什么课程？"]
    # for a in attacks:
    #     print(f"输入: {a}")
    #     print(f"检测: {detect_injection(a)}")
    #     print(f"回复: {safe_agent(a)}")
