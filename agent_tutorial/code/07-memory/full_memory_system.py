"""
完整记忆系统 - 短期 + 长期 + 工作记忆

需要的依赖：openai, chromadb, python-dotenv
运行方式：python code/07-memory/full_memory_system.py
"""

import os
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
import chromadb

load_dotenv()
client = OpenAI()


class ConversationMemory:
    """短期记忆：对话历史管理"""

    def __init__(self, max_messages: int = 20):
        self.messages: list[dict] = []
        self.summary: str = ""
        self.max_messages = max_messages

    def add(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        if len(self.messages) > self.max_messages:
            self._compress()

    def _compress(self):
        keep = 4
        old = self.messages[:-keep]
        old_text = "\n".join([f"{m['role']}: {m['content']}" for m in old])
        prefix = f"之前的摘要：{self.summary}\n\n" if self.summary else ""

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content":
                f"{prefix}压缩以下对话为 100 字摘要：\n{old_text}"}],
            temperature=0,
        )
        self.summary = response.choices[0].message.content
        self.messages = self.messages[-keep:]

    def get_messages(self) -> list[dict]:
        result = []
        if self.summary:
            result.append({"role": "system", "content": f"对话摘要: {self.summary}"})
        result.extend(self.messages)
        return result


class LongTermMemory:
    """长期记忆：向量数据库持久化"""

    def __init__(self, collection_name: str = "agent_ltm"):
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection(collection_name)
        except Exception:
            pass
        self.collection = self.chroma.create_collection(name=collection_name)

    def remember(self, content: str, memory_type: str = "fact"):
        response = client.embeddings.create(model="text-embedding-3-small", input=content)
        self.collection.add(
            ids=[f"mem_{self.collection.count()}"],
            documents=[content],
            embeddings=[response.data[0].embedding],
            metadatas=[{"type": memory_type, "time": datetime.now().isoformat()}],
        )

    def recall(self, query: str, n: int = 5) -> list[str]:
        response = client.embeddings.create(model="text-embedding-3-small", input=query)
        results = self.collection.query(
            query_embeddings=[response.data[0].embedding], n_results=n
        )
        return results["documents"][0]


class WorkingMemory:
    """工作记忆：任务执行中的临时存储"""

    def __init__(self):
        self.notes: dict[str, str] = {}
        self.scratchpad: list[str] = []

    def save_note(self, key: str, value: str):
        self.notes[key] = value

    def read_note(self, key: str) -> str:
        return self.notes.get(key, "")

    def scratch(self, text: str):
        self.scratchpad.append(f"[{datetime.now().strftime('%H:%M:%S')}] {text}")

    def get_state(self) -> str:
        parts = []
        if self.notes:
            parts.append("笔记: " + "; ".join(f"{k}={v}" for k, v in self.notes.items()))
        if self.scratchpad:
            parts.append("草稿: " + " | ".join(self.scratchpad[-5:]))
        return "\n".join(parts) if parts else "(无)"

    def clear(self):
        self.notes.clear()
        self.scratchpad.clear()


class AgentMemorySystem:
    """完整的 Agent 记忆系统"""

    def __init__(self):
        self.short_term = ConversationMemory(max_messages=15)
        self.long_term = LongTermMemory()
        self.working = WorkingMemory()

    def process_message(self, role: str, content: str):
        self.short_term.add(role, content)

        # 自动提取值得长期保存的信息
        if any(kw in content for kw in ["记住", "偏好", "我叫", "我喜欢", "重要"]):
            self.long_term.remember(content, "user_preference")

    def get_context(self, query: str) -> str:
        parts = []

        # 短期记忆
        msgs = self.short_term.get_messages()[-3:]
        if msgs:
            recent = "\n".join([f"{m['role']}: {m['content']}" for m in msgs])
            parts.append(f"最近对话:\n{recent}")

        # 长期记忆
        memories = self.long_term.recall(query, n=3)
        if memories:
            parts.append("相关记忆:\n" + "\n".join(f"- {m}" for m in memories))

        # 工作记忆
        state = self.working.get_state()
        if state != "(无)":
            parts.append(f"当前状态:\n{state}")

        return "\n\n".join(parts)


def demo():
    """演示完整记忆系统"""
    memory = AgentMemorySystem()

    # 模拟对话
    memory.process_message("user", "你好，我叫小明，记住我喜欢用 Python")
    memory.process_message("assistant", "你好小明！我记住你喜欢 Python 了。")
    memory.process_message("user", "我在做 RAG 项目")
    memory.working.save_note("current_project", "RAG")
    memory.working.scratch("正在研究 Chunking 策略")

    # 查询记忆
    context = memory.get_context("用户的编程偏好")
    print("=== 记忆上下文 ===")
    print(context)


if __name__ == "__main__":
    demo()
