"""
向量记忆 - 基于向量数据库的长期记忆系统

需要的依赖：openai, chromadb, python-dotenv
运行方式：python code/07-memory/vector_memory.py
"""

import os
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
import chromadb

load_dotenv()
client = OpenAI()


class LongTermMemory:
    """基于向量数据库的长期记忆

    能够保存、检索、遗忘记忆。使用语义搜索找到最相关的记忆。
    """

    def __init__(self, collection_name: str = "agent_memory"):
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection(collection_name)
        except Exception:
            pass
        self.collection = self.chroma.create_collection(name=collection_name)

    def _get_embedding(self, text: str) -> list[float]:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )
        return response.data[0].embedding

    def remember(self, content: str, memory_type: str = "fact", importance: float = 0.5):
        """保存一条记忆

        Args:
            content: 记忆内容
            memory_type: 类型 (fact, preference, experience, instruction)
            importance: 重要性 (0-1)
        """
        embedding = self._get_embedding(content)
        memory_id = f"mem_{self.collection.count()}"

        self.collection.add(
            ids=[memory_id],
            documents=[content],
            embeddings=[embedding],
            metadatas=[{
                "type": memory_type,
                "importance": importance,
                "timestamp": datetime.now().isoformat(),
                "access_count": 0,
            }],
        )
        print(f"[记忆] 保存: {content[:50]}... (类型: {memory_type})")

    def recall(self, query: str, n_results: int = 5, memory_type: str = None) -> list[dict]:
        """检索相关记忆

        Args:
            query: 查询内容
            n_results: 返回数量
            memory_type: 可选，按类型过滤
        """
        embedding = self._get_embedding(query)
        where_filter = {"type": memory_type} if memory_type else None

        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=n_results,
            where=where_filter,
        )

        memories = []
        for i in range(len(results["documents"][0])):
            memories.append({
                "content": results["documents"][0][i],
                "distance": results["distances"][0][i],
                "metadata": results["metadatas"][0][i],
            })
        return memories

    def forget(self, query: str, threshold: float = 0.3):
        """根据查询遗忘相关记忆（距离太近的相似记忆）"""
        results = self.recall(query, n_results=10)
        forgotten = 0
        for mem in results:
            if mem["distance"] < threshold:
                # 在实际项目中，这里需要通过 ID 删除
                forgotten += 1
        print(f"[遗忘] 匹配到 {forgotten} 条记忆")


def demo():
    """演示长期记忆系统"""
    memory = LongTermMemory()

    # 保存不同类型的记忆
    memory.remember("用户叫小明，是计算机专业的大学生", memory_type="fact", importance=0.8)
    memory.remember("用户喜欢用 Python 编程", memory_type="preference", importance=0.7)
    memory.remember("用户在做一个 AI Agent 的课程作业", memory_type="fact", importance=0.6)
    memory.remember("用户觉得 RAG 很有趣", memory_type="preference", importance=0.5)
    memory.remember("用户之前用 ChromaDB 遇到过 ID 冲突问题", memory_type="experience", importance=0.6)

    # 测试检索
    queries = [
        "这个用户是谁？",
        "用户有什么技术偏好？",
        "用户遇到过什么技术问题？",
    ]

    for query in queries:
        print(f"\n查询: {query}")
        results = memory.recall(query, n_results=3)
        for i, r in enumerate(results):
            print(f"  {i + 1}. [{r['metadata']['type']}] {r['content']} (距离: {r['distance']:.3f})")


if __name__ == "__main__":
    demo()
