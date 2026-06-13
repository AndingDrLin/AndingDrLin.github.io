---
title: "Memory — 让 Agent 拥有记忆"
description: "设计短期、长期和工作记忆系统，让 Agent 能记住和遗忘"
date: 2026-06-13
tags: [agent, LLM, tutorial, memory, conversation, vector store]
category: "Tutorials"
docGroup: "agent-tutorial"
order: 7
draft: false
---

# 第 7 章：Memory — 让 Agent 拥有记忆

**学完本章，你将能够：**

- 理解 Agent 记忆系统的三种类型
- 实现对话历史管理和压缩
- 构建跨会话的长期记忆
- 给 Agent 设计完整的记忆系统

---

## 7.1 短期记忆：对话历史管理

短期记忆就是**当前对话中的历史消息**。最简单的实现就是维护一个 `messages` 列表——我们在前几章一直在这么做。

### 问题：对话太长怎么办？

LLM 的上下文窗口是有限的（比如 128K Token）。当对话越来越长：

1. **Token 超限**：对话历史超过了上下文窗口
2. **成本爆炸**：每次调用都要发送所有历史消息，费用越来越高
3. **注意力稀释**：太长的上下文会让 LLM "忘记"早期的对话内容

### 解决方案：对话摘要压缩

> 完整代码见 [`code/07-memory/conversation_summary.py`](./code/07-memory/conversation_summary.py)。

```python
def summarize_conversation(messages: list, llm) -> str:
    """把长对话压缩成摘要"""
    conversation_text = "\n".join([
        f"{m['role']}: {m['content']}" for m in messages
    ])

    summary = llm(f"""请将以下对话压缩为简短摘要，保留关键信息：
- 用户的核心需求和偏好
- 已完成的操作和结果
- 待解决的问题

对话内容：
{conversation_text}

摘要：""")
    return summary


class ConversationMemory:
    """带摘要压缩的对话记忆"""

    def __init__(self, llm, max_messages: int = 20):
        self.messages = []
        self.summary = ""
        self.llm = llm
        self.max_messages = max_messages

    def add(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
        # 超过阈值时压缩
        if len(self.messages) > self.max_messages:
            self._compress()

    def _compress(self):
        """压缩旧消息为摘要"""
        # 保留最近 5 条消息，其余压缩
        old_messages = self.messages[:-5]
        self.summary = summarize_conversation(old_messages, self.llm)
        self.messages = self.messages[-5:]

    def get_messages(self) -> list:
        """获取完整的对话上下文"""
        result = []
        if self.summary:
            result.append({
                "role": "system",
                "content": f"之前的对话摘要：{self.summary}"
            })
        result.extend(self.messages)
        return result
```

---

## 7.2 长期记忆：跨会话持久化

短期记忆在对话结束后就没了。**长期记忆**让 Agent 能跨会话记住用户信息。

### 用向量数据库存储长期记忆

> 完整代码见 [`code/07-memory/vector_memory.py`](./code/07-memory/vector_memory.py)。

```python
import chromadb
from openai import OpenAI

class LongTermMemory:
    """基于向量数据库的长期记忆"""

    def __init__(self, collection_name: str = "agent_memory"):
        self.client = OpenAI()
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection(collection_name)
        except:
            pass
        self.collection = self.chroma.create_collection(name=collection_name)

    def remember(self, content: str, metadata: dict = None):
        """保存一条记忆"""
        embedding = self._get_embedding(content)
        self.collection.add(
            ids=[f"mem_{self.collection.count()}"],
            documents=[content],
            embeddings=[embedding],
            metadatas=[metadata or {}],
        )

    def recall(self, query: str, n_results: int = 5) -> list[str]:
        """根据查询检索相关记忆"""
        embedding = self._get_embedding(query)
        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=n_results,
        )
        return results["documents"][0]

    def _get_embedding(self, text: str) -> list[float]:
        response = self.client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )
        return response.data[0].embedding
```

---

## 7.3 工作记忆：Agent 的"草稿纸"

工作记忆是 Agent 在执行任务时使用的**临时存储空间**，用于保存中间结果和状态。

类比：
- **短期记忆** = 你正在聊天的对话框
- **长期记忆** = 你的笔记本（永久保存）
- **工作记忆** = 你做数学题时的草稿纸（用完就扔）

> 完整代码见 [`code/07-memory/full_memory_system.py`](./code/07-memory/full_memory_system.py)。

```python
class WorkingMemory:
    """工作记忆：Agent 的草稿纸"""

    def __init__(self):
        self.notes: dict[str, str] = {}
        self.scratchpad: list[str] = []

    def write_note(self, key: str, value: str):
        """保存一条笔记"""
        self.notes[key] = value

    def read_note(self, key: str) -> str:
        """读取一条笔记"""
        return self.notes.get(key, "")

    def add_to_scratchpad(self, entry: str):
        """写入草稿纸"""
        self.scratchpad.append(entry)

    def get_scratchpad(self) -> str:
        """获取草稿纸内容"""
        return "\n".join(self.scratchpad)

    def clear(self):
        """清空工作记忆"""
        self.notes.clear()
        self.scratchpad.clear()
```

### 完整记忆系统

把三种记忆组合在一起：

```python
class AgentMemorySystem:
    """完整的 Agent 记忆系统"""

    def __init__(self, llm):
        self.short_term = ConversationMemory(llm, max_messages=20)
        self.long_term = LongTermMemory()
        self.working = WorkingMemory()

    def process_message(self, role: str, content: str):
        """处理一条新消息"""
        # 1. 加入短期记忆
        self.short_term.add(role, content)

        # 2. 判断是否需要保存到长期记忆
        if self._is_important(content):
            self.long_term.remember(content)

    def get_context(self, query: str) -> str:
        """构建完整的记忆上下文"""
        parts = []

        # 短期记忆（当前对话）
        parts.append("当前对话：" + str(self.short_term.get_messages()[-5:]))

        # 长期记忆（检索相关历史）
        relevant = self.long_term.recall(query, n_results=3)
        if relevant:
            parts.append("相关历史记忆：" + "\n".join(relevant))

        # 工作记忆
        if self.working.notes:
            parts.append("当前任务笔记：" + str(self.working.notes))

        return "\n\n".join(parts)

    def _is_important(self, content: str) -> bool:
        """判断一条消息是否值得保存到长期记忆"""
        # 简单实现：包含特定关键词的消息
        important_keywords = ["偏好", "记住", "重要", "总是", "永远"]
        return any(kw in content for kw in important_keywords)
```

---

## 动手练习

### 练习 1（基础）：实现对话摘要压缩

> 实现 `ConversationMemory` 类，当对话消息超过 20 条时自动压缩为摘要。
> 测试：模拟一个 30 轮的对话，验证压缩是否正确触发。

### 练习 2（进阶）：跨会话记忆

> 实现一个能跨会话记住用户偏好的 Agent。
> 场景：第 1 次对话告诉 Agent "我喜欢 Python"，第 2 次对话 Agent 应该记住这个偏好。

### 练习 3（挑战）：给 Agent 添加完整记忆系统

> 把短期、长期、工作记忆组合在一起，实现 `AgentMemorySystem`。
> 测试一个需要跨步骤传递信息、记住用户偏好的复杂任务。

---

## 常见踩坑 FAQ

### Q: 对话摘要丢失了重要信息

压缩时保留更多关键信息的方法：
1. 在摘要 Prompt 中明确指出需要保留的信息类型
2. 增加 `max_messages` 的值，保留更多原文
3. 对不同类型的消息用不同的压缩策略

### Q: 长期记忆检索不准确

1. 尝试不同的 Embedding 模型
2. 在记忆时添加 metadata（如时间、话题标签），检索时可以过滤
3. 定期清理过时的记忆

### Q: 记忆系统太慢

1. 对 Embedding 计算做缓存
2. 批量处理记忆存储（而不是每条消息都存）
3. 长期记忆检索使用异步调用

---

下一章：[Multi-Agent 系统](./08-multi-agent.md)。
