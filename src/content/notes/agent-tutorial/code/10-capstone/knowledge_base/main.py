"""
个人知识库 - 毕业项目选题 C

功能：导入文档，自然语言问答，跨会话记忆
技术栈：OpenAI API, ChromaDB, 混合检索

需要的依赖：openai, python-dotenv, chromadb
运行方式：python code/10-capstone/knowledge_base/main.py
"""

import os
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
import chromadb

load_dotenv()
client = OpenAI()


class PersonalKnowledgeBase:
    """个人知识库"""

    def __init__(self, collection_name: str = "my_kb"):
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection(collection_name)
        except Exception:
            pass
        self.collection = self.chroma.create_collection(collection_name)
        self.conversation_history: list[dict] = []

    def import_file(self, file_path: str, chunk_size: int = 500):
        """导入单个文件"""
        path = Path(file_path)
        content = path.read_text(encoding="utf-8")

        # 简单切分
        chunks = [content[i:i + chunk_size] for i in range(0, len(content), chunk_size)]
        print(f"导入 {path.name}: {len(chunks)} 个块")

        for i, chunk in enumerate(chunks):
            response = client.embeddings.create(model="text-embedding-3-small", input=chunk)
            self.collection.add(
                ids=[f"{path.name}_{i}"],
                documents=[chunk],
                embeddings=[response.data[0].embedding],
                metadatas=[{"source": path.name, "chunk_index": i}],
            )

    def import_directory(self, dir_path: str, extensions: list[str] = None):
        """导入整个目录"""
        if extensions is None:
            extensions = [".md", ".txt"]

        path = Path(dir_path)
        files = []
        for ext in extensions:
            files.extend(path.rglob(f"*{ext}"))

        for file_path in files:
            self.import_file(str(file_path))
        print(f"共导入 {len(files)} 个文件")

    def ask(self, question: str) -> str:
        """问答"""
        # 检索相关文档
        emb_response = client.embeddings.create(model="text-embedding-3-small", input=question)
        results = self.collection.query(
            query_embeddings=[emb_response.data[0].embedding],
            n_results=5,
        )

        context = "\n\n".join(results["documents"][0])

        # 构建对话
        messages = [
            {"role": "system", "content": f"你是个人知识库助手。根据以下资料回答问题。\n\n{context}"},
        ]
        # 加入对话历史
        messages.extend(self.conversation_history[-6:])
        messages.append({"role": "user", "content": question})

        response = client.chat.completions.create(
            model="gpt-4o", messages=messages, temperature=0,
        )
        answer = response.choices[0].message.content

        self.conversation_history.append({"role": "user", "content": question})
        self.conversation_history.append({"role": "assistant", "content": answer})

        return answer

    def stats(self) -> dict:
        return {"documents": self.collection.count()}


if __name__ == "__main__":
    kb = PersonalKnowledgeBase()

    # 导入当前教程的章节文件
    tutorial_dir = Path(".")
    md_files = list(tutorial_dir.glob("0*.md"))
    for f in md_files[:3]:  # 只导入前 3 个
        kb.import_file(str(f))

    print(f"\n知识库统计: {kb.stats()}")

    questions = [
        "什么是 RAG？",
        "这个教程讲了什么内容？",
    ]
    for q in questions:
        print(f"\n问: {q}")
        print(f"答: {kb.ask(q)}")
