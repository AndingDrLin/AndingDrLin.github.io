"""
代码仓库问答 - 毕业项目选题 B

功能：输入 GitHub 仓库 URL，用自然语言提问代码仓库
技术栈：OpenAI API, ChromaDB, AST 解析

需要的依赖：openai, python-dotenv, chromadb
运行方式：python code/10-capstone/code_qa/main.py
"""

import os
import ast
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
import chromadb

load_dotenv()
client = OpenAI()


class CodeQA:
    """代码仓库问答系统"""

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.chroma = chromadb.Client()
        try:
            self.chroma.delete_collection("code_repo")
        except Exception:
            pass
        self.collection = self.chroma.create_collection("code_repo")

    def index_repo(self):
        """索引代码仓库"""
        py_files = list(self.repo_path.rglob("*.py"))
        print(f"找到 {len(py_files)} 个 Python 文件")

        for file_path in py_files:
            chunks = self._parse_file(file_path)
            for i, chunk in enumerate(chunks):
                self.collection.add(
                    ids=[f"{file_path}_{i}"],
                    documents=[chunk["content"]],
                    metadatas=[{
                        "file": str(file_path),
                        "name": chunk.get("name", ""),
                        "type": chunk.get("type", "module"),
                    }],
                )
        print(f"索引完成，共 {self.collection.count()} 个代码块")

    def _parse_file(self, file_path: Path) -> list[dict]:
        """解析 Python 文件，按函数/类切分"""
        try:
            content = file_path.read_text(encoding="utf-8")
            tree = ast.parse(content)
        except (SyntaxError, UnicodeDecodeError):
            return []

        chunks = []
        for node in ast.iter_child_nodes(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                name = node.name
                code = ast.get_source_segment(content, node) or ""
                chunks.append({"content": code, "name": name, "type": "function"})
            elif isinstance(node, ast.ClassDef):
                name = node.name
                code = ast.get_source_segment(content, node) or ""
                chunks.append({"content": code, "name": name, "type": "class"})

        # 如果没有函数/类，把整个文件作为一个块
        if not chunks and content.strip():
            chunks.append({"content": content[:2000], "name": str(file_path.name), "type": "module"})

        return chunks

    def ask(self, question: str) -> str:
        """回答关于代码仓库的问题"""
        # 检索相关代码
        response = client.embeddings.create(model="text-embedding-3-small", input=question)
        results = self.collection.query(
            query_embeddings=[response.data[0].embedding],
            n_results=5,
        )

        context = ""
        for i, doc in enumerate(results["documents"][0]):
            meta = results["metadatas"][0][i]
            context += f"\n--- {meta['file']} ({meta['name']}) ---\n{doc}\n"

        # 生成回答
        answer = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"你是一个代码分析师。根据以下代码回答问题，引用具体文件名。\n\n{context}"},
                {"role": "user", "content": question},
            ],
            temperature=0,
        )
        return answer.choices[0].message.content


if __name__ == "__main__":
    # 示例：索引当前项目的 code/05-agent-loop/ 目录
    repo = CodeQA("code/05-agent-loop")
    repo.index_repo()

    questions = [
        "这个项目的核心函数是什么？",
        "Agent 是怎么处理工具调用的？",
    ]
    for q in questions:
        print(f"\n问: {q}")
        print(f"答: {repo.ask(q)}")
