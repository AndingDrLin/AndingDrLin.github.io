"""
练习 5 参考答案：ReAct Agent + 笔记本功能

需要的依赖：openai, python-dotenv

运行方式: python solutions/sol-05-react-agent.py
"""

import os
import json
import re
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


def build_system_prompt(tools: dict) -> str:
    tool_desc = "\n".join([f"- {name}: {func.__doc__.strip().split(chr(10))[0]}"
                           for name, func in tools.items()])
    return f"""你是一个 ReAct Agent。通过"思考→行动→观察"循环完成任务。

可用工具：
{tool_desc}

格式（每行一个字段）：
Thought: 分析情况和计划
Action: 工具名
Action Input: 参数

或：
Thought: 总结信息
Final Answer: 最终回答

规则：每次只调用一个工具；不重复相同调用。"""


def parse_response(text: str) -> dict:
    result = {"raw": text}
    if "Final Answer:" in text:
        result["is_final"] = True
        result["answer"] = text.split("Final Answer:", 1)[1].strip()
        return result
    result["is_final"] = False
    thought = re.search(r"Thought:\s*(.+?)(?=\nAction|\nFinal|$)", text, re.DOTALL)
    action = re.search(r"Action:\s*(.+?)$", text, re.MULTILINE)
    action_input = re.search(r"Action Input:\s*(.+?)$", text, re.MULTILINE)
    if thought:
        result["thought"] = thought.group(1).strip()
    if action:
        result["action"] = action.group(1).strip()
    if action_input:
        result["action_input"] = action_input.group(1).strip()
    if "action" not in result:
        result["is_final"] = True
        result["answer"] = text
    return result


def react_agent(user_query: str, tools: dict, max_steps: int = 10, verbose: bool = True) -> str:
    system = build_system_prompt(tools)
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user_query},
    ]

    if verbose:
        print(f"\n{'=' * 50}")
        print(f"用户: {user_query}")
        print(f"{'=' * 50}")

    for step in range(1, max_steps + 1):
        response = client.chat.completions.create(model="gpt-4o", messages=messages, temperature=0)
        text = response.choices[0].message.content
        parsed = parse_response(text)

        if verbose:
            print(f"\n[Step {step}]")
            if parsed.get("thought"):
                print(f"  Thought: {parsed['thought']}")

        if parsed.get("is_final"):
            if verbose:
                print(f"  Answer: {parsed['answer']}")
            return parsed["answer"]

        action = parsed.get("action", "")
        action_input = parsed.get("action_input", "")

        if verbose:
            print(f"  Action: {action}({action_input})")

        func = tools.get(action)
        try:
            observation = func(action_input) if func else f"未知工具: {action}"
        except Exception as e:
            observation = f"错误: {e}"

        if verbose:
            print(f"  Observation: {observation}")

        messages.append({"role": "assistant", "content": text})
        messages.append({"role": "user", "content": f"Observation: {observation}"})

    return "达到最大步数"


def react_agent_with_notes(user_query: str, tools: dict, max_steps: int = 10) -> str:
    notes = {}

    def save_note(key: str, value: str = "") -> str:
        notes[key] = value
        return f"已保存笔记 '{key}': {value}"

    def read_note(key: str) -> str:
        return notes.get(key, f"未找到笔记 '{key}'")

    all_tools = {**tools, "save_note": save_note, "read_note": read_note}
    return react_agent(user_query, all_tools, max_steps, verbose=True)


if __name__ == "__main__":
    def search(q: str) -> str:
        """搜索互联网信息"""
        kb = {"python": "Python 由 Guido van Rossum 于 1991 年创建。",
              "agent": "AI Agent 是能自主行动的智能程序。"}
        for k, v in kb.items():
            if k in q.lower():
                return v
        return f"未找到 '{q}'"

    def calc(expr: str) -> str:
        """数学计算"""
        try:
            return str(eval(expr))
        except Exception as e:
            return f"错误: {e}"

    tools = {"search": search, "calculate": calc}

    # 测试 1
    react_agent("Python 是谁创建的？创建于哪一年？", tools)

    # 测试 2: 带笔记本
    react_agent_with_notes("搜索 Python 信息，保存到笔记", tools)
