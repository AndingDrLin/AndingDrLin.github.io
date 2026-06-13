"""
多工具 Agent - 让 LLM 自主选择调用哪些工具

需要的依赖：openai, python-dotenv
运行方式：python code/04-tool-use/multi_tool_agent.py
"""

import os
import json
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 工具定义 ===

def get_weather(city: str) -> str:
    """模拟获取天气（实际项目中调用真实 API）"""
    weather_data = {
        "北京": {"temp": 25, "condition": "晴", "humidity": 40},
        "上海": {"temp": 28, "condition": "多云", "humidity": 65},
        "广州": {"temp": 32, "condition": "雷阵雨", "humidity": 85},
        "深圳": {"temp": 31, "condition": "多云转晴", "humidity": 70},
    }
    data = weather_data.get(city)
    if data:
        return json.dumps(data, ensure_ascii=False)
    return json.dumps({"error": f"未找到城市 '{city}' 的天气数据"}, ensure_ascii=False)


def get_current_time() -> str:
    """获取当前时间"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def calculate(expression: str) -> str:
    """数学计算"""
    try:
        allowed = set("0123456789+-*/(). %")
        if all(c in allowed for c in expression):
            return str(eval(expression))
        return "错误：不允许的字符"
    except Exception as e:
        return f"计算错误: {e}"


def search_knowledge(query: str) -> str:
    """模拟知识库搜索"""
    knowledge = {
        "Python": "Python 是一种解释型编程语言，由 Guido van Rossum 于 1991 年发布。",
        "AI": "人工智能（AI）是计算机科学的分支，旨在创建能模拟人类智能的系统。",
        "Agent": "AI Agent 是能自主感知环境并采取行动的智能程序，以 LLM 为核心。",
    }
    for key, value in knowledge.items():
        if key.lower() in query.lower():
            return value
    return f"未找到与 '{query}' 相关的信息"


# === 工具 Schema ===

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询指定城市的当前天气信息。支持北京、上海、广州、深圳。",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"}
                },
                "required": ["city"]
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
            "name": "search_knowledge",
            "description": "在知识库中搜索信息。用于回答关于 AI、Python、Agent 等技术问题。",
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
    "get_weather": get_weather,
    "get_current_time": get_current_time,
    "calculate": calculate,
    "search_knowledge": search_knowledge,
}


def chat_with_tools(user_message: str, verbose: bool = True) -> str:
    """多工具 Agent 对话"""
    messages = [
        {"role": "system", "content": "你是一个多功能助手。根据用户问题选择合适的工具来回答。"},
        {"role": "user", "content": user_message},
    ]

    max_rounds = 5
    for _ in range(max_rounds):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        message = response.choices[0].message

        if not message.tool_calls:
            return message.content

        messages.append(message)

        for tool_call in message.tool_calls:
            func_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)

            if verbose:
                print(f"  [调用工具] {func_name}({args})")

            func = TOOL_FUNCTIONS.get(func_name)
            if func:
                result = func(**args)
            else:
                result = f"错误：未知工具 '{func_name}'"

            if verbose:
                print(f"  [返回结果] {result}")

            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(result),
            })

    return "达到最大工具调用轮数"


if __name__ == "__main__":
    test_questions = [
        "现在几点了？",
        "北京和上海的天气怎么样？",
        "123 * 456 + 789 等于多少？",
        "什么是 AI Agent？",
        "现在几点了？顺便帮我查一下北京天气。",
    ]

    for q in test_questions:
        print(f"\n{'=' * 50}")
        print(f"用户: {q}")
        print(f"{'=' * 50}")
        answer = chat_with_tools(q)
        print(f"\n回答: {answer}")
