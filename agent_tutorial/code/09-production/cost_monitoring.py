"""
Token 成本监控 - 追踪和控制 Agent 运行成本

需要的依赖：openai, python-dotenv
运行方式：python code/09-production/cost_monitoring.py
"""

import os
import json
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


class BudgetExceeded(Exception):
    pass


class CostMonitor:
    """Token 使用和成本监控"""

    PRICING = {
        "gpt-4o": {"input": 2.50, "output": 10.00},
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    }

    def __init__(self, budget_limit: float = 1.0):
        self.total_cost = 0.0
        self.budget_limit = budget_limit
        self.calls: list[dict] = []

    def check_budget(self):
        if self.total_cost > self.budget_limit:
            raise BudgetExceeded(f"预算超限: ${self.total_cost:.4f} > ${self.budget_limit:.2f}")

    def tracked_call(self, model: str, messages: list, **kwargs) -> str:
        """带成本追踪的 LLM 调用"""
        self.check_budget()

        response = client.chat.completions.create(model=model, messages=messages, **kwargs)

        usage = response.usage
        pricing = self.PRICING.get(model, self.PRICING["gpt-4o"])
        cost = (usage.prompt_tokens * pricing["input"] +
                usage.completion_tokens * pricing["output"]) / 1_000_000

        self.total_cost += cost
        self.calls.append({
            "time": datetime.now().isoformat(),
            "model": model,
            "input_tokens": usage.prompt_tokens,
            "output_tokens": usage.completion_tokens,
            "cost": cost,
            "cumulative": self.total_cost,
        })

        self.check_budget()
        return response.choices[0].message.content

    def report(self) -> str:
        if not self.calls:
            return "还没有 API 调用记录"

        total_input = sum(c["input_tokens"] for c in self.calls)
        total_output = sum(c["output_tokens"] for c in self.calls)

        return json.dumps({
            "总调用次数": len(self.calls),
            "输入 Token": total_input,
            "输出 Token": total_output,
            "总费用": f"${self.total_cost:.4f}",
            "预算剩余": f"${max(0, self.budget_limit - self.total_cost):.4f}",
            "预算使用率": f"{self.total_cost / self.budget_limit * 100:.1f}%",
        }, ensure_ascii=False, indent=2)


def cost_optimized_agent(question: str, monitor: CostMonitor) -> str:
    """成本优化的 Agent：简单问题用便宜模型"""
    # 判断问题复杂度（简化版）
    simple_keywords = ["你好", "是什么", "叫什么", "几岁"]
    is_simple = any(kw in question for kw in simple_keywords)

    model = "gpt-4o-mini" if is_simple else "gpt-4o"

    try:
        return monitor.tracked_call(
            model=model,
            messages=[{"role": "user", "content": question}],
        )
    except BudgetExceeded as e:
        return f"抱歉，本次会话预算已用完: {e}"


if __name__ == "__main__":
    monitor = CostMonitor(budget_limit=0.10)

    questions = [
        "你好，请介绍一下你自己",
        "什么是 Python？",
        "详细解释 Transformer 的 Self-Attention 机制，包括公式推导",
        "计算 2 的 20 次方",
        "写一篇 500 字的 AI Agent 综述",
    ]

    for q in questions:
        print(f"\n问题: {q}")
        answer = cost_optimized_agent(q, monitor)
        print(f"回答: {answer[:100]}...")

    print(f"\n\n=== 成本报告 ===")
    print(monitor.report())
