"""
练习 3 参考答案：Mini RAG 系统

运行方式: python solutions/sol-03-mini-rag.py
"""

import re
import chromadb
from openai import OpenAI

client = OpenAI()


class MiniRAG:
    """完整的 RAG 系统"""

    def __init__(self, collection_name: str = "mini_rag"):
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection(collection_name)
        except Exception:
            pass
        self.collection = self.chroma.create_collection(name=collection_name)

    def get_embedding(self, text: str) -> list[float]:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )
        return response.data[0].embedding

    def add_documents(self, documents: list[str]):
        for i, doc in enumerate(documents):
            self.collection.add(
                ids=[f"doc_{i}"],
                documents=[doc],
                embeddings=[self.get_embedding(doc)],
            )
        print(f"已添加 {len(documents)} 个文档")

    def retrieve(self, query: str, n_results: int = 3) -> list[str]:
        results = self.collection.query(
            query_embeddings=[self.get_embedding(query)],
            n_results=n_results,
        )
        return results["documents"][0]

    def ask(self, question: str) -> str:
        context_docs = self.retrieve(question)
        context = "\n\n".join(context_docs)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"根据以下资料回答问题。如果没有相关信息就说不知道。\n\n{context}"},
                {"role": "user", "content": question},
            ],
            temperature=0,
        )
        return response.choices[0].message.content


def chunk_by_fixed_size(text: str, size: int = 200, overlap: int = 50) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start:start + size])
        start += size - overlap
    return chunks


def chunk_by_sentence(text: str) -> list[str]:
    sentences = re.split(r'[。！？\n]+', text)
    return [s.strip() for s in sentences if s.strip()]


def demo():
    # 准备知识库
    documents = [
        "AI Agent 是能够自主感知环境、做出决策并采取行动的智能程序。它通常由 LLM 作为核心推理引擎。",
        "RAG 通过在 LLM 生成答案之前检索外部知识来减少幻觉。",
        "Transformer 是现代 LLM 的基础架构，核心是 Self-Attention 机制。",
        "Prompt Engineering 是通过设计输入提示来优化 LLM 输出的技术。",
        "向量数据库（如 ChromaDB）专门用于存储和检索高维向量。",
    ]

    rag = MiniRAG()
    rag.add_documents(documents)

    questions = [
        "什么是 AI Agent？",
        "如何减少 LLM 的幻觉？",
        "Transformer 的核心是什么？",
    ]

    for q in questions:
        print(f"\n问: {q}")
        print(f"答: {rag.ask(q)}")


if __name__ == "__main__":
    demo()
