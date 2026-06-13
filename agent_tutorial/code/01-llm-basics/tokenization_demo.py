"""
Tokenization 演示 - 看看 LLM 眼中的文字长什么样

需要的依赖：tiktoken
运行方式：python code/01-llm-basics/tokenization_demo.py
"""

import tiktoken


def show_tokens(text: str, model: str = "gpt-4o"):
    """展示文本被拆分成 Token 的过程"""
    enc = tiktoken.encoding_for_model(model)
    tokens = enc.encode(text)

    print(f"原文: {text}")
    print(f"Token 数: {len(tokens)}")
    print("\n逐个 Token 解码:")
    for i, token_id in enumerate(tokens):
        decoded = enc.decode([token_id])
        print(f"  Token {i:2d}: {token_id:6d} -> '{decoded}'")
    print()


def compare_languages():
    """对比不同语言的 Token 消耗"""
    enc = tiktoken.encoding_for_model("gpt-4o")

    texts = {
        "英文": "Hello, how are you today?",
        "中文": "你好，你今天怎么样？",
        "日文": "こんにちは、今日はどうですか？",
        "代码": "def hello():\n    print('Hello, World!')",
    }

    print("=== 不同语言的 Token 消耗对比 ===\n")
    for lang, text in texts.items():
        tokens = enc.encode(text)
        print(f"{lang}: {len(tokens):2d} Token -> '{text}'")

    # 中英文对比
    en = "Artificial Intelligence will change the world"
    zh = "人工智能将改变这个世界"
    en_count = len(enc.encode(en))
    zh_count = len(enc.encode(zh))

    print(f"\n=== 同一语义的中英文对比 ===")
    print(f"英文 ({en_count} Token): {en}")
    print(f"中文 ({zh_count} Token): {zh}")
    print(f"中文/英文 Token 比: {zh_count / en_count:.2f}")


def show_special_tokens():
    """展示一些特殊的 Token"""
    enc = tiktoken.encoding_for_model("gpt-4o")

    special_texts = [
        "👍",           # Emoji
        "\n",           # 换行符
        "    ",         # 缩进
        "ChatGPT",      # 品牌名
        "transformer",  # 技术词汇
    ]

    print("\n=== 特殊 Token ===\n")
    for text in special_texts:
        tokens = enc.encode(text)
        decoded_parts = [enc.decode([t]) for t in tokens]
        print(f"'{repr(text)}' -> {len(tokens)} Token: {decoded_parts}")


if __name__ == "__main__":
    show_tokens("AI Agent is the future of artificial intelligence")
    compare_languages()
    show_special_tokens()
