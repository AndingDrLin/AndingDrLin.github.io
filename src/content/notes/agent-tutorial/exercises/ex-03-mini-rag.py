"""
练习 3：搭建一个简单的 RAG 系统

目标：
1. 用 ChromaDB 存储 5 段不同主题的文本
2. 实现语义检索 + 问答
3. 对比不同 Chunking 策略的效果

完成后运行: python exercises/ex-03-mini-rag.py
"""

from openai import OpenAI

client = OpenAI()


class MiniRAG:
    """TODO: 实现你的 RAG 系统

    需要实现的方法：
    - __init__: 初始化向量数据库
    - add_documents: 添加文档
    - retrieve: 检索相关文档
    - ask: 基于检索结果回答问题
    """

    def __init__(self):
        # TODO: 初始化 ChromaDB
        pass

    def add_documents(self, documents: list[str]):
        """TODO: 把文档向量化后存入数据库"""
        pass

    def retrieve(self, query: str, n_results: int = 3) -> list[str]:
        """TODO: 检索最相关的文档块"""
        pass

    def ask(self, question: str) -> str:
        """TODO: 检索 + 生成回答"""
        pass


def compare_chunking(text: str):
    """TODO: 对比固定大小 vs 按句子切分的效果

    1. 准备一段 500 字以上的文本
    2. 分别用两种策略切分
    3. 存入两个不同的 RAG 系统
    4. 问同样的问题，比较检索到的内容
    """
    pass


if __name__ == "__main__":
    # 测试你的 RAG 系统
    # rag = MiniRAG()
    # rag.add_documents([...])
    # print(rag.ask("你的问题"))
    pass
