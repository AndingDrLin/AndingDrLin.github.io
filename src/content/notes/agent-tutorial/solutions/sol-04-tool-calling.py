"""
练习 4 参考答案：工具调用 Agent

运行方式: python solutions/sol-04-tool-calling.py
"""

import json
from datetime import datetime
from openai import OpenAI

client = OpenAI()


def calculate(expression: str) -> str:
    try:
        allowed = set("0123456789+-*/(). %")
        if all(c in allowed for c in expression):
            return str(eval(expression))
        return "错误：不允许的字符"
    except Exception as e:
        return f"计算错误: {e}"


def get_current_time() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def search_knowledge(query: str) -> str:
    kb = {
        "Python": "Python 是一种解释型编程语言，由 Guido van Rossum 于 1991 年发布。",
        "AI": "人工智能是计算机科学的分支，旨在创建能模拟人类智能的系统。",
        "Agent": "AI Agent 是能自主感知环境并采取行动的智能程序。",
    }
    for k, v in kb.items():
        if k.lower() in query.lower():
            return v
    return f"未找到与 '{query}' 相关的信息"


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "执行数学计算",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "数学表达式"}
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "获取当前日期和时间",
            "parameters": {"type": "object", "properties": {}}
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_knowledge",
            "description": "在知识库中搜索信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词"}
                },
                "required": ["query"]
            }
        }
    },
]

TOOL_FUNCTIONS = {
    "calculate": calculate,
    "get_current_time": get_current_time,
    "search_knowledge": search_knowledge,
}


def chat(user_message: str, verbose: bool = True) -> str:
    messages = [
        {"role": "system", "content": "你是一个多功能助手，使用工具回答问题。"},
        {"role": "user", "content": user_message},
    ]

    for _ in range(5):
        response = client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=TOOLS,
        )
        message = response.choices[0].message

        if not message.tool_calls:
            return message.content

        messages.append(message)
        for tc in message.tool_calls:
            name = tc.function.name
            args = json.loads(tc.function.arguments)
            if verbose:
                print(f"  [{name}({args})]")
            result = TOOL_FUNCTIONS[name](**args)
            if verbose:
                print(f"  -> {result}")
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": str(result)})

    return "达到最大调用轮数"


if __name__ == "__main__":
    questions = [
        "(123 + 456) * 789 等于多少？",
        "现在几点了？另外 2 的 10 次方是多少？",
        "什么是 Python？",
    ]
    for q in questions:
        print(f"\n用户: {q}")
        print(f"回答: {chat(q)}")
