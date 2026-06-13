"""
对话摘要压缩 - 管理长期对话的短期记忆

需要的依赖：openai, python-dotenv
运行方式：python code/07-memory/conversation_summary.py
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


class ConversationMemory:
    """带摘要压缩的对话记忆

    当消息数超过 max_messages 时，自动将旧消息压缩为摘要。
    """

    def __init__(self, max_messages: int = 10):
        self.messages: list[dict] = []
        self.summary: str = ""
        self.max_messages = max_messages

    def add(self, role: str, content: str):
        """添加一条消息"""
        self.messages.append({"role": role, "content": content})

        if len(self.messages) > self.max_messages:
            self._compress()

    def _compress(self):
        """将旧消息压缩为摘要"""
        # 保留最近 4 条消息，其余压缩
        keep_count = 4
        old_messages = self.messages[:-keep_count]
        recent_messages = self.messages[-keep_count:]

        # 生成摘要
        old_text = "\n".join([f"{m['role']}: {m['content']}" for m in old_messages])

        context_prefix = f"之前的摘要：{self.summary}\n\n" if self.summary else ""
        prompt = f"""{context_prefix}请将以下对话压缩为简短摘要（100字以内）。
保留：用户的需求、已完成的任务、关键结论。

对话：
{old_text}

摘要："""

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        self.summary = response.choices[0].message.content
        self.messages = recent_messages

        print(f"\n[压缩] 压缩了 {len(old_messages)} 条消息")
        print(f"[摘要] {self.summary}")

    def get_messages(self) -> list[dict]:
        """获取完整的消息列表（包含摘要）"""
        result = []
        if self.summary:
            result.append({
                "role": "system",
                "content": f"以下是之前对话的摘要：{self.summary}"
            })
        result.extend(self.messages)
        return result

    def chat(self, user_input: str) -> str:
        """带记忆的对话"""
        self.add("user", user_input)

        messages = self.get_messages()
        messages.insert(0, {
            "role": "system",
            "content": "你是一个友好的 AI 助手。请用中文回复。"
        })

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7,
        )
        reply = response.choices[0].message.content
        self.add("assistant", reply)
        return reply


def demo():
    """演示对话摘要压缩"""
    memory = ConversationMemory(max_messages=8)

    # 模拟一个较长的对话
    conversations = [
        "你好，我叫小明",
        "我是一名大学生，学习计算机科学",
        "我在做一个 AI Agent 的课程作业",
        "我想了解 RAG 是什么",
        "能推荐一些学习资源吗？",
        "我之前学过 Python 和机器学习基础",
        "我想用 ChromaDB 作为向量数据库",
        "RAG 的 Chunking 策略有什么推荐？",
        "我打算做一个论文问答系统",
        "你觉得混合检索效果怎么样？",
    ]

    for i, user_msg in enumerate(conversations):
        print(f"\n{'=' * 40}")
        print(f"轮次 {i + 1}")
        print(f"用户: {user_msg}")
        reply = memory.chat(user_msg)
        print(f"AI: {reply}")
        print(f"当前消息数: {len(memory.messages)}")


if __name__ == "__main__":
    demo()
