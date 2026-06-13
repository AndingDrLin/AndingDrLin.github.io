"""
Plan-and-Execute Agent - 先规划再执行的 Agent 模式

需要的依赖：openai, python-dotenv
运行方式：python code/05-agent-loop/plan_and_execute.py
"""

import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 工具定义（复用 react_from_scratch.py 中的工具） ===

def search(query: str) -> str:
    """搜索信息"""
    knowledge = {
        "python": "Python 由 Guido van Rossum 于 1991 年创建。",
        "transformer": "Transformer 由 Google 团队在 2017 年提出。",
        "agent": "AI Agent 以 LLM 为核心，配合工具和记忆完成任务。",
    }
    for k, v in knowledge.items():
        if k in query.lower():
            return v
    return f"未找到关于 '{query}' 的信息"


def calculate(expression: str) -> str:
    """数学计算"""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"错误: {e}"


TOOLS = {"search": search, "calculate": calculate}


# === Plan-and-Execute 核心 ===

def generate_plan(user_query: str) -> list[str]:
    """第 1 阶段：让 LLM 生成执行计划"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": """你是一个任务规划器。把用户任务分解为有序的步骤。

每个步骤应该是一个具体、可执行的行动。
返回 JSON 格式：
{"steps": ["步骤1描述", "步骤2描述", ...]}

可用工具：search（搜索信息）、calculate（数学计算）"""},
            {"role": "user", "content": user_query},
        ],
        temperature=0,
        response_format={"type": "json_object"},
    )

    plan = json.loads(response.choices[0].message.content)
    return plan.get("steps", [])


def execute_step(step: str, context: str) -> dict:
    """第 2 阶段：执行单个步骤"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": f"""你是执行器。根据当前步骤和已有信息，决定需要调用什么工具。

已有信息：
{context}

可用工具：search（搜索）、calculate（计算）
如果不需要工具就能完成，直接返回结果。

返回 JSON：
{{"need_tool": true/false, "tool": "工具名", "input": "参数", "result": "如果不需要工具的结果"}}"""},
            {"role": "user", "content": f"当前步骤: {step}"},
        ],
        temperature=0,
        response_format={"type": "json_object"},
    )

    decision = json.loads(response.choices[0].message.content)

    if decision.get("need_tool"):
        tool_name = decision.get("tool", "")
        tool_input = decision.get("input", "")
        tool_func = TOOLS.get(tool_name)
        if tool_func:
            result = tool_func(tool_input)
            return {"step": step, "tool": tool_name, "tool_input": tool_input, "result": result}
        return {"step": step, "error": f"未知工具: {tool_name}"}

    return {"step": step, "result": decision.get("result", "无法生成结果")}


def synthesize_answer(user_query: str, results: list[dict]) -> str:
    """第 3 阶段：汇总所有结果，生成最终回答"""
    context = "\n".join([f"- {r['step']}: {r.get('result', r.get('error', '无结果'))}" for r in results])

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "根据执行结果，为用户生成清晰、完整的回答。"},
            {"role": "user", "content": f"用户问题: {user_query}\n\n执行结果:\n{context}"},
        ],
        temperature=0,
    )
    return response.choices[0].message.content


def plan_and_execute(user_query: str, max_replans: int = 2, verbose: bool = True) -> str:
    """Plan-and-Execute Agent 主函数"""
    if verbose:
        print(f"\n{'=' * 60}")
        print(f"用户: {user_query}")
        print(f"{'=' * 60}")

    # 阶段 1：规划
    plan = generate_plan(user_query)
    if verbose:
        print(f"\n[计划]")
        for i, step in enumerate(plan, 1):
            print(f"  {i}. {step}")

    # 阶段 2：逐步执行
    results = []
    context = ""

    for i, step in enumerate(plan, 1):
        if verbose:
            print(f"\n[执行] 步骤 {i}: {step}")

        result = execute_step(step, context)
        results.append(result)
        context += f"\n{step}: {result.get('result', result.get('error', ''))}"

        if verbose:
            status = result.get("result", result.get("error", "无结果"))
            print(f"  结果: {status}")

    # 阶段 3：汇总
    answer = synthesize_answer(user_query, results)
    if verbose:
        print(f"\n[最终回答] {answer}")

    return answer


if __name__ == "__main__":
    # 演示
    plan_and_execute("Python 是谁创建的？创建于哪一年？现在过去多少年了？")
    plan_and_execute("AI Agent 是什么？它和传统 AI 有什么区别？")
