"""
Hello LLM - 你的第一次 LLM API 调用

需要的依赖：openai, python-dotenv
运行方式：python code/01-llm-basics/hello_llm.py
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

# 加载 .env 文件中的 API Key
load_dotenv()

# 创建 OpenAI 客户端（自动读取 OPENAI_API_KEY 环境变量）
client = OpenAI()

def ask_llm(question: str, model: str = "gpt-4o") -> str:
    """向 LLM 提问并返回回答"""
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "user", "content": question}
        ]
    )
    return response.choices[0].message.content


def chat():
    """交互式聊天循环"""
    print("=" * 50)
    print("Hello LLM! 输入 'quit' 退出")
    print("=" * 50)

    # 维护对话历史，让模型能"记住"之前说过的话
    messages = [
        {"role": "system", "content": "你是一个友好的 AI 助手，请用中文回复。"}
    ]

    while True:
        user_input = input("\n你: ").strip()
        if user_input.lower() in ("quit", "exit", "q"):
            print("再见！")
            break

        messages.append({"role": "user", "content": user_input})

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
        )

        reply = response.choices[0].message.content
        messages.append({"role": "assistant", "content": reply})
        print(f"\nAI: {reply}")


if __name__ == "__main__":
    # 快速测试
    print("=== 快速测试 ===")
    answer = ask_llm("用一句话解释什么是 AI Agent")
    print(f"问: 用一句话解释什么是 AI Agent")
    print(f"答: {answer}")

    # 启动交互式聊天
    print("\n=== 交互式聊天 ===")
    chat()
