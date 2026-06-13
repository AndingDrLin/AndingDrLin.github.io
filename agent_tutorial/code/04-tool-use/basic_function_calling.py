"""
基础 Function Calling - 让 LLM 调用计算器工具

需要的依赖：openai, python-dotenv
运行方式：python code/04-tool-use/basic_function_calling.py
"""

import os
import json
import math
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 定义工具 ===

def calculate(expression: str) -> str:
    """安全地执行数学计算"""
    try:
        # 只允许数学运算字符，防止代码注入
        allowed_chars = set("0123456789+-*/(). %")
        if not all(c in allowed_chars for c in expression):
            return f"错误：表达式 '{expression}' 包含不允许的字符"

        # 添加常用数学函数
        safe_dict = {
            "__builtins__": {},
            "abs": abs, "round": round,
            "pow": pow, "sqrt": math.sqrt,
            "sin": math.sin, "cos": math.cos, "pi": math.pi,
        }
        result = eval(expression, safe_dict)
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "执行数学计算。当用户需要计算数学表达式时使用。支持 +, -, *, /, %, pow, sqrt 等运算。",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "要计算的数学表达式，如 '2 + 3 * 4' 或 'sqrt(16)'"
                    }
                },
                "required": ["expression"]
            }
        }
    }
]

TOOL_FUNCTIONS = {"calculate": calculate}


def chat_with_tools(user_message: str) -> str:
    """带工具调用的对话"""
    messages = [
        {"role": "system", "content": "你是一个数学助手。遇到计算问题时使用 calculate 工具。"},
        {"role": "user", "content": user_message},
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=TOOLS,
        tool_choice="auto",
    )

    message = response.choices[0].message

    # 检查是否有工具调用
    if message.tool_calls:
        print(f"[LLM 决定调用工具]")
        messages.append(message)

        for tool_call in message.tool_calls:
            func_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            print(f"  工具: {func_name}({args})")

            # 执行工具
            result = TOOL_FUNCTIONS[func_name](**args)
            print(f"  结果: {result}")

            # 把结果返回给 LLM
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })

        # 让 LLM 根据结果生成最终回答
        final_response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
        )
        return final_response.choices[0].message.content
    else:
        return message.content


if __name__ == "__main__":
    test_questions = [
        "(15 + 27) * 3 等于多少？",
        "如果一个圆的半径是 5，面积是多少？",
        "144 的平方根是多少？",
        "你今天心情怎么样？",  # 不需要工具的问题
    ]

    for q in test_questions:
        print(f"\n{'=' * 50}")
        print(f"用户: {q}")
        print(f"{'=' * 50}")
        answer = chat_with_tools(q)
        print(f"\n回答: {answer}")
