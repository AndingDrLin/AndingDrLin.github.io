"""
混合检索 - 向量检索 + BM25 结合

需要的依赖：openai, numpy, rank_bm25, python-dotenv
运行方式：python code/03-rag/hybrid_search.py
"""

import os
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI
from rank_bm25 import BM25Okapi

load_dotenv()
client = OpenAI()


def get_embedding(text: str) -> list[float]:
    """获取文本的 Embedding"""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text,
    )
    return response.data[0].embedding


def cosine_similarity(a: list[float], b: list[float]) -> float:
    """计算两个向量的余弦相似度"""
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8)


class HybridRetriever:
    """混合检索器：向量检索 + BM25"""

    def __init__(self):
        self.documents = []
        self.embeddings = []
        self.tokenized_docs = []
        self.bm25 = None

    def add_documents(self, documents: list[str]):
        """添加文档"""
        self.documents = documents
        self.embeddings = [get_embedding(doc) for doc in documents]

        # BM25 需要分词（这里用简单的字符级别，实际项目中用 jieba）
        self.tokenized_docs = [list(doc) for doc in documents]
        self.bm25 = BM25Okapi(self.tokenized_docs)

    def search_vector(self, query: str, top_k: int = 3) -> list[dict]:
        """向量检索"""
        query_emb = get_embedding(query)
        scores = [cosine_similarity(query_emb, doc_emb) for doc_emb in self.embeddings]
        ranked = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)[:top_k]
        return [{"index": i, "score": s, "text": self.documents[i], "method": "vector"} for i, s in ranked]

    def search_bm25(self, query: str, top_k: int = 3) -> list[dict]:
        """BM25 关键词检索"""
        scores = self.bm25.get_scores(list(query))
        ranked = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)[:top_k]
        return [{"index": i, "score": s, "text": self.documents[i], "method": "bm25"} for i, s in ranked]

    def search_hybrid(self, query: str, top_k: int = 3, alpha: float = 0.5) -> list[dict]:
        """混合检索

        alpha: 向量检索的权重
        """
        # 两种检索的分数
        query_emb = get_embedding(query)
        vector_scores = np.array([cosine_similarity(query_emb, e) for e in self.embeddings])
        bm25_scores = np.array(self.bm25.get_scores(list(query)))

        # 归一化
        vector_norm = vector_scores / (vector_scores.max() + 1e-8)
        bm25_norm = bm25_scores / (bm25_scores.max() + 1e-8)

        # 加权融合
        combined = alpha * vector_norm + (1 - alpha) * bm25_norm
        ranked = sorted(enumerate(combined), key=lambda x: x[1], reverse=True)[:top_k]
        return [{"index": i, "score": float(s), "text": self.documents[i], "method": "hybrid"} for i, s in ranked]


def demo():
    """演示混合检索的效果"""
    documents = [
        "Python 是一种解释型、面向对象的高级编程语言。它的设计哲学强调代码的可读性。",
        "Transformer 架构使用 Self-Attention 机制处理序列数据，是 GPT 和 BERT 的基础。",
        "RAG（检索增强生成）通过检索外部知识来增强 LLM 的回答能力。",
        "深度学习是机器学习的一个子集，使用多层神经网络来学习数据的表示。",
        "向量数据库专门用于存储和检索高维向量数据，支持近似最近邻搜索。",
        "Prompt Engineering 是通过设计输入提示来优化大语言模型输出的技术。",
        "AI Agent 是能自主感知环境并采取行动的智能程序，通常以 LLM 为核心。",
        "Fine-tuning（微调）是在预训练模型基础上，用特定数据集进一步训练以适应特定任务。",
    ]

    retriever = HybridRetriever()
    retriever.add_documents(documents)

    queries = [
        "什么是 Transformer",           # 关键词匹配好
        "怎么让 AI 有外部知识",          # 语义匹配好
        "大模型如何使用",                # 模糊查询
    ]

    for query in queries:
        print(f"\n{'=' * 60}")
        print(f"查询: {query}")
        print(f"{'=' * 60}")

        print("\n--- 向量检索 ---")
        for r in retriever.search_vector(query, top_k=3):
            print(f"  [{r['score']:.3f}] {r['text'][:60]}...")

        print("\n--- BM25 检索 ---")
        for r in retriever.search_bm25(query, top_k=3):
            print(f"  [{r['score']:.3f}] {r['text'][:60]}...")

        print("\n--- 混合检索 ---")
        for r in retriever.search_hybrid(query, top_k=3, alpha=0.5):
            print(f"  [{r['score']:.3f}] {r['text'][:60]}...")


if __name__ == "__main__":
    demo()
