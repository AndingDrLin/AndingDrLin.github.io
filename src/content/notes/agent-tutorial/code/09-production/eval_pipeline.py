"""
Agent 评估 Pipeline - 自动化评估 Agent 性能

需要的依赖：openai, python-dotenv
运行方式：python code/09-production/eval_pipeline.py
"""

import os
import json
import time
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


class AgentEvaluator:
    """Agent 自动评估系统

    使用 LLM-as-a-Judge 的方法自动评分。
    """

    def __init__(self, agent_fn):
        self.agent_fn = agent_fn

    def _score(self, question: str, answer: str, expected: str) -> float:
        """用 LLM 评分"""
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{
                "role": "user",
                "content": f"""评估回答质量（0-1 分）。

问题：{question}
期望：{expected}
回答：{answer}

评分标准：
0.9-1.0 完全正确  0.7-0.8 基本正确  0.5-0.6 部分正确  0.0-0.4 错误

只返回数字。"""
            }],
            temperature=0,
        )
        try:
            return float(response.choices[0].message.content.strip())
        except ValueError:
            return 0.5

    def evaluate(self, test_cases: list[dict]) -> dict:
        """批量评估"""
        results = []
        start = time.time()

        for case in test_cases:
            answer = self.agent_fn(case["question"])
            score = self._score(case["question"], answer, case["expected"])
            results.append({**case, "answer": answer, "score": score})

        avg_score = sum(r["score"] for r in results) / len(results)
        by_category = {}
        for r in results:
            cat = r.get("category", "default")
            by_category.setdefault(cat, []).append(r["score"])

        return {
            "average_score": avg_score,
            "total_cases": len(results),
            "time_seconds": time.time() - start,
            "by_category": {k: sum(v) / len(v) for k, v in by_category.items()},
            "results": results,
        }


# 测试用例
TEST_CASES = [
    {"question": "什么是 AI Agent？", "expected": "能自主感知和行动的智能程序", "category": "知识"},
    {"question": "Python 是谁创建的？", "expected": "Guido van Rossum", "category": "知识"},
    {"question": "2 的 10 次方是多少？", "expected": "1024", "category": "计算"},
    {"question": "(15 + 27) * 3 等于多少？", "expected": "126", "category": "计算"},
    {"question": "今天天气怎么样？", "expected": "无法回答或调用工具", "category": "边界"},
]


def simple_agent(question: str) -> str:
    """简单的 LLM 回答（用于评估演示）"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": question}],
        temperature=0,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    print("=== Agent 评估 ===\n")
    evaluator = AgentEvaluator(simple_agent)
    report = evaluator.evaluate(TEST_CASES)

    print(f"平均分: {report['average_score']:.2f}")
    print(f"总耗时: {report['time_seconds']:.1f} 秒")
    print(f"分类得分: {json.dumps(report['by_category'], ensure_ascii=False)}")
    print(f"\n详细结果:")
    for r in report["results"]:
        print(f"  [{r['score']:.1f}] {r['question'][:30]}... -> {r['answer'][:50]}...")
