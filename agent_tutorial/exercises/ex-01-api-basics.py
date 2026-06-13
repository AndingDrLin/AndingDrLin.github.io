"""
练习 1：搭建最简单的聊天机器人

目标：写一个循环，让用户可以和 GPT 持续对话。输入 "quit" 退出。

提示：
1. 用 while True 循环获取用户输入
2. 维护一个 messages 列表存储对话历史
3. 每次把用户输入追加到 messages，调用 API，把回复也追加进去

完成后运行: python exercises/ex-01-api-basics.py
"""

from openai import OpenAI

client = OpenAI()


def chat_bot():
    """TODO: 实现你的聊天机器人"""
    # TODO 1: 初始化 messages 列表，加入 system message
    # messages = [...]
    pass


def token_counter(text: str, model: str = "gpt-4o") -> dict:
    """TODO: 统计文本的 Token 数量，并估算费用

    提示：
    - 用 tiktoken 获取编码器
    - enc.encode(text) 返回 token id 列表
    - 参考价格表计算费用

    返回格式:
    {"tokens": 数量, "cost_usd": 费用}
    """
    # TODO: 实现 Token 计数和费用估算
    pass


if __name__ == "__main__":
    print("=== 练习 1：聊天机器人 ===")
    # chat_bot()

    print("\n=== 练习 2：Token 计数器 ===")
    # result = token_counter("人工智能将改变这个世界")
    # print(f"Token 数: {result['tokens']}, 费用: ${result['cost_usd']:.6f}")
