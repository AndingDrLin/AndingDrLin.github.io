"""
错误处理演示 - 展示工具调用失败时的重试和恢复机制

需要的依赖：openai, python-dotenv
运行方式：python code/04-tool-use/error_handling.py
"""

import os
import json
import random
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 模拟不稳定的工具 ===

call_count = {}

def unreliable_api(query: str) -> str:
    """模拟一个不稳定的 API（前两次调用失败，第三次成功）"""
    call_count[query] = call_count.get(query, 0) + 1

    if call_count[query] < 3:
        raise ConnectionError(f"API 超时（第 {call_count[query]} 次尝试）")

    # 第三次成功
    return json.dumps({"query": query, "results": ["找到相关结果 1", "找到相关结果 2"]}, ensure_ascii=False)


def flaky_weather(city: str) -> str:
    """模拟偶尔失败的天气 API"""
    if random.random() < 0.3:  # 30% 概率失败
        raise TimeoutError(f"天气 API 请求超时: {city}")

    data = {"北京": "晴 25°C", "上海": "多云 28°C"}
    return data.get(city, f"未找到 {city} 的天气数据")


# === 工具 Schema 和函数映射 ===

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "unreliable_api",
            "description": "搜索信息的 API（可能不稳定）",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "flaky_weather",
            "description": "查询城市天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"}
                },
                "required": ["city"]
            }
        }
    },
]

TOOL_FUNCTIONS = {
    "unreliable_api": unreliable_api,
    "flaky_weather": flaky_weather,
}


def chat_with_error_handling(user_message: str, max_tool_rounds: int = 5) -> str:
    """带错误处理的工具调用循环

    核心思想：工具调用失败时，把错误信息返回给 LLM。
    LLM 会分析错误原因并决定：重试、换个方式、或告诉用户。
    """
    messages = [
        {"role": "system", "content": """你是一个助手。使用工具回答用户问题。
如果工具调用失败，你可以：
1. 用不同参数重试
2. 换一个工具
3. 告诉用户当前无法完成操作

请在工具调用失败时做出合理的决定。"""},
        {"role": "user", "content": user_message},
    ]

    for round_num in range(max_tool_rounds):
        print(f"\n  --- 第 {round_num + 1} 轮 LLM 调用 ---")

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=TOOLS,
        )
        message = response.choices[0].message

        if not message.tool_calls:
            print(f"  [LLM 决定直接回答]")
            return message.content

        messages.append(message)

        for tool_call in message.tool_calls:
            func_name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            print(f"  [调用] {func_name}({args})")

            try:
                result = TOOL_FUNCTIONS[func_name](**args)
                print(f"  [成功] {result}")
            except Exception as e:
                result = f"错误: {type(e).__name__}: {e}"
                print(f"  [失败] {result}")

            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })

    return "达到最大工具调用轮数"


if __name__ == "__main__":
    print("=== 错误处理演示 ===")
    print("\n场景 1: 不稳定的搜索 API（前两次失败，第三次成功）")
    print(f"用户: 帮我搜索 AI Agent 的最新进展")
    answer = chat_with_error_handling("帮我搜索 AI Agent 的最新进展")
    print(f"\n最终回答: {answer}")

    print("\n\n场景 2: 偶尔失败的天气 API")
    print(f"用户: 北京今天天气怎么样？")
    answer = chat_with_error_handling("北京今天天气怎么样？")
    print(f"\n最终回答: {answer}")
