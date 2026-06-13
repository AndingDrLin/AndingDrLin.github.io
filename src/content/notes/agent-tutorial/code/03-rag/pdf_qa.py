"""
PDF 问答助手 - 用 RAG 实现文档问答

需要的依赖：openai, chromadb, python-dotenv
运行方式：python code/03-rag/pdf_qa.py
"""

import os
from dotenv import load_dotenv
from openai import OpenAI
import chromadb

load_dotenv()
client = OpenAI()


class SimpleRAG:
    """简单的 RAG 系统"""

    def __init__(self, collection_name: str = "my_docs"):
        self.chroma_client = chromadb.Client()
        # 每次运行重新创建，避免 ID 冲突
        try:
            self.chroma_client.delete_collection(collection_name)
        except Exception:
            pass
        self.collection = self.chroma_client.create_collection(name=collection_name)

    def get_embedding(self, text: str) -> list[float]:
        """获取文本的 Embedding 向量"""
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )
        return response.data[0].embedding

    def add_documents(self, documents: list[str], ids: list[str] = None):
        """添加文档到知识库"""
        if ids is None:
            ids = [f"doc_{i}" for i in range(len(documents))]

        for doc_id, doc in zip(ids, documents):
            self.collection.add(
                ids=[doc_id],
                documents=[doc],
                embeddings=[self.get_embedding(doc)],
            )
        print(f"已添加 {len(documents)} 个文档")

    def retrieve(self, query: str, n_results: int = 3) -> list[dict]:
        """检索最相关的文档块"""
        query_embedding = self.get_embedding(query)
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
        )
        docs = []
        for i in range(len(results["documents"][0])):
            docs.append({
                "text": results["documents"][0][i],
                "distance": results["distances"][0][i],
                "id": results["ids"][0][i],
            })
        return docs

    def ask(self, question: str, n_results: int = 3) -> str:
        """RAG 问答"""
        # 检索相关文档
        context_docs = self.retrieve(question, n_results)
        context = "\n\n".join([d["text"] for d in context_docs])

        # 生成回答
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"""你是一个文档问答助手。根据以下参考资料回答用户的问题。

规则：
1. 只根据参考资料回答，不要编造信息
2. 如果资料中没有相关信息，说"我无法根据现有资料回答这个问题"
3. 回答时引用来源

参考资料：
{context}"""},
                {"role": "user", "content": question},
            ],
            temperature=0,
        )
        return response.choices[0].message.content


def demo():
    """演示 RAG 系统"""
    rag = SimpleRAG(collection_name="ai_tutorial")

    # 准备知识库
    documents = [
        "AI Agent 是能够自主感知环境、做出决策并采取行动的智能程序。它通常由 LLM 作为核心推理引擎，配合工具和记忆系统来完成复杂任务。",
        "RAG（检索增强生成）通过在 LLM 生成答案之前检索外部知识来减少幻觉。核心步骤是：文档切分 → 向量化 → 存储 → 检索 → 生成。",
        "Transformer 是现代 LLM 的基础架构，由 Vaswani 等人在 2017 年提出。核心机制是 Self-Attention，让每个 Token 都能关注到其他所有 Token。",
        "Prompt Engineering 是通过设计输入提示来优化 LLM 输出的技术。常见技巧包括角色设定、Few-shot、Chain-of-Thought 等。",
        "向量数据库（如 ChromaDB、FAISS、Pinecone）专门用于存储和检索高维向量。它们支持近似最近邻搜索（ANN），能在海量向量中快速找到最相似的结果。",
        "Embedding 是将文本转化为数字向量的过程。语义相近的文本，其向量在空间中的距离也更近。常用的 Embedding 模型有 OpenAI 的 text-embedding-3-small 和 BGE 系列。",
    ]

    rag.add_documents(documents)

    # 测试问答
    questions = [
        "什么是 AI Agent？",
        "RAG 的核心步骤是什么？",
        "谁提出了 Transformer？",
        "向量数据库有哪些？",
        "今天股票怎么样？",  # 知识库中没有的信息
    ]

    for q in questions:
        print(f"\n问: {q}")
        answer = rag.ask(q)
        print(f"答: {answer}")
        print("---")


if __name__ == "__main__":
    demo()
