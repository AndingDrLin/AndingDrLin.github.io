"""
练习 4：构建能调用工具的 Agent

目标：
1. 定义 calculate 工具，让 LLM 计算数学表达式
2. 定义 3+ 个工具，让 LLM 自主选择调用哪个
3. 实现错误恢复：工具失败时让 LLM 自动处理

完成后运行: python exercises/ex-04-tool-calling.py
"""

import json
from openai import OpenAI

client = OpenAI()


# === 练习 1：基础工具调用 ===

def calculate(expression: str) -> str:
    """TODO: 安全地执行数学计算

    提示：
    - 用 set() 限制允许的字符
    - 用 eval() 执行计算（注意安全！）
    - 返回计算结果的字符串
    """
    # TODO: 实现
    pass


# TODO: 定义 calculate 工具的 Schema
TOOLS_BASIC = [
    # {
    #     "type": "function",
    #     "function": {
    #         "name": "...",
    #         "description": "...",
    #         "parameters": {...}
    #     }
    # }
]


def chat_basic(user_message: str) -> str:
    """TODO: 实现带工具调用的对话

    提示：
    1. 调用 API，带上 tools 参数
    2. 检查 message.tool_calls
    3. 如果有工具调用，执行并把结果返回
    4. 让 LLM 根据结果生成最终回答
    """
    # TODO: 实现
    pass


# === 练习 2：多工具 Agent ===

# TODO: 定义至少 3 个工具（搜索、天气、计算等）
TOOLS_MULTI = []


# TODO: 实现对应的函数
TOOL_FUNCTIONS_MULTI = {}


def chat_multi(user_message: str) -> str:
    """TODO: 多工具 Agent，支持多轮工具调用"""
    # TODO: 实现
    pass


if __name__ == "__main__":
    print("=== 练习 1：基础工具调用 ===")
    # print(chat_basic("(123 + 456) * 789 等于多少？"))

    print("\n=== 练习 2：多工具 Agent ===")
    # print(chat_multi("现在几点了？另外 2 的 10 次方是多少？"))
