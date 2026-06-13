"""
练习 7：给 Agent 添加记忆系统

目标：
1. 实现对话摘要压缩（短期记忆）
2. 实现跨会话记忆（长期记忆）
3. 组合三种记忆为完整系统

完成后运行: python exercises/ex-07-memory-system.py
"""

from openai import OpenAI

client = OpenAI()


# === 练习 1：对话摘要压缩 ===

class ConversationMemory:
    """TODO: 实现带摘要压缩的对话记忆

    要求：
    - 维护 messages 列表
    - 当消息数超过 max_messages 时自动压缩
    - 保留最近 N 条消息，其余压缩为摘要
    - get_messages() 返回包含摘要上下文的完整消息列表
    """

    def __init__(self, max_messages: int = 10):
        # TODO
        pass

    def add(self, role: str, content: str):
        # TODO
        pass

    def get_messages(self) -> list[dict]:
        # TODO
        pass


# === 练习 2：跨会话长期记忆 ===

class LongTermMemory:
    """TODO: 实现基于向量数据库的长期记忆

    要求：
    - remember(content): 保存记忆
    - recall(query): 检索相关记忆
    """

    def __init__(self):
        # TODO: 初始化 ChromaDB
        pass

    def remember(self, content: str):
        # TODO
        pass

    def recall(self, query: str, n: int = 5) -> list[str]:
        # TODO
        pass


if __name__ == "__main__":
    print("=== 练习 1：对话摘要 ===")
    # memory = ConversationMemory(max_messages=5)
    # for i in range(10):
    #     memory.add("user", f"消息 {i}")

    print("\n=== 练习 2：长期记忆 ===")
    # ltm = LongTermMemory()
    # ltm.remember("用户喜欢 Python")
    # print(ltm.recall("用户偏好"))
