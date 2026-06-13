"""
练习 7 参考答案：记忆系统

运行方式: python solutions/sol-07-memory-system.py
"""

from datetime import datetime
from openai import OpenAI
import chromadb

client = OpenAI()


class ConversationMemory:
    def __init__(self, max_messages: int = 10):
        self.messages = []
        self.summary = ""
        self.max_messages = max_messages

    def add(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        if len(self.messages) > self.max_messages:
            self._compress()

    def _compress(self):
        keep = 3
        old = self.messages[:-keep]
        old_text = "\n".join([f"{m['role']}: {m['content']}" for m in old])
        prefix = f"之前的摘要: {self.summary}\n\n" if self.summary else ""
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"{prefix}压缩对话为摘要:\n{old_text}"}],
            temperature=0,
        )
        self.summary = response.choices[0].message.content
        self.messages = self.messages[-keep:]
        print(f"[压缩] {len(old)} 条消息 -> 摘要")

    def get_messages(self) -> list[dict]:
        result = []
        if self.summary:
            result.append({"role": "system", "content": f"对话摘要: {self.summary}"})
        result.extend(self.messages)
        return result


class LongTermMemory:
    def __init__(self):
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection("ltm")
        except Exception:
            pass
        self.collection = self.chroma.create_collection("ltm")

    def remember(self, content: str):
        response = client.embeddings.create(model="text-embedding-3-small", input=content)
        self.collection.add(
            ids=[f"mem_{self.collection.count()}"],
            documents=[content],
            embeddings=[response.data[0].embedding],
        )

    def recall(self, query: str, n: int = 5) -> list[str]:
        response = client.embeddings.create(model="text-embedding-3-small", input=query)
        results = self.collection.query(query_embeddings=[response.data[0].embedding], n_results=n)
        return results["documents"][0]


if __name__ == "__main__":
    # 测试短期记忆
    print("=== 短期记忆 ===")
    mem = ConversationMemory(max_messages=5)
    for i in range(8):
        mem.add("user", f"这是第 {i + 1} 条消息")
    print(f"当前消息数: {len(mem.messages)}")
    print(f"摘要: {mem.summary}")

    # 测试长期记忆
    print("\n=== 长期记忆 ===")
    ltm = LongTermMemory()
    ltm.remember("用户叫小明，喜欢 Python")
    ltm.remember("用户在做 RAG 项目")
    results = ltm.recall("用户的编程偏好")
    for r in results:
        print(f"  {r}")
