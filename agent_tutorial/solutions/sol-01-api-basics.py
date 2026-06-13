"""
练习 1 参考答案：搭建最简单的聊天机器人 + Token 计数器

运行方式: python solutions/sol-01-api-basics.py
"""

import tiktoken
from openai import OpenAI

client = OpenAI()

# 价格表（每百万 Token，美元）
PRICING = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
}


def chat_bot():
    """交互式聊天机器人"""
    print("聊天机器人已启动，输入 'quit' 退出\n")

    messages = [
        {"role": "system", "content": "你是一个友好的 AI 助手，请用中文回复。"}
    ]

    while True:
        user_input = input("你: ").strip()
        if user_input.lower() in ("quit", "exit", "q"):
            print("再见！")
            break

        messages.append({"role": "user", "content": user_input})

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
        )

        reply = response.choices[0].message.content
        messages.append({"role": "assistant", "content": reply})
        print(f"AI: {reply}\n")


def token_counter(text: str, model: str = "gpt-4o") -> dict:
    """统计 Token 数量并估算费用"""
    enc = tiktoken.encoding_for_model(model)
    tokens = enc.encode(text)
    n_tokens = len(tokens)

    # 输入费用（假设都是输入 Token）
    price = PRICING.get(model, PRICING["gpt-4o"])
    cost = (n_tokens / 1_000_000) * price["input"]

    return {"tokens": n_tokens, "cost_usd": cost}


if __name__ == "__main__":
    # 测试 Token 计数器
    texts = [
        "人工智能将改变这个世界",
        "Artificial Intelligence will change the world",
        "AI Agent 是能够自主行动的智能程序",
    ]

    for text in texts:
        result = token_counter(text)
        print(f"'{text}'")
        print(f"  Token 数: {result['tokens']}, 费用: ${result['cost_usd']:.8f}\n")

    # 启动聊天机器人
    chat_bot()
