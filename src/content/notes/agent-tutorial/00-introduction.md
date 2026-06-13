---
title: "导读与环境搭建"
description: "了解学习路线、搭建开发环境、验证一切就绪"
date: 2026-06-13
tags: [agent, LLM, tutorial, setup]
category: "Tutorials"
docGroup: "agent-tutorial"
order: 0
draft: false
---

# 导读与环境搭建

学完本章，你将拥有一个可运行的开发环境，并了解整个教程的学习路线。

## 学习路线图

整个教程分为 4 个阶段：

```
阶段 1：基础能力（第 1-2 章）
├── 第 1 章：LLM 是什么，怎么工作的     ← 理解"大脑"
└── 第 2 章：Prompt Engineering          ← 学会和"大脑"沟通

阶段 2：外部能力（第 3-4 章）
├── 第 3 章：RAG                         ← 让 LLM 读你的文档
└── 第 4 章：Tool Use                    ← 让 LLM 调用外部工具

阶段 3：核心突破（第 5-6 章）
├── 第 5 章：Agent 循环 ⭐               ← 手写 Agent，最关键！
└── 第 6 章：LangGraph                   ← 用框架构建复杂工作流

阶段 4：进阶与实战（第 7-10 章）
├── 第 7 章：Memory                      ← 让 Agent 拥有记忆
├── 第 8 章：Multi-Agent                 ← 多 Agent 协作
├── 第 9 章：生产级 Agent                ← 评估、安全、成本
└── 第 10 章：毕业项目 🎓                ← 独立完成一个完整产品
```

各章之间的依赖关系：

```mermaid
graph TD
    A[第1章 LLM基础] --> B[第2章 Prompt Engineering]
    B --> C[第3章 RAG]
    B --> D[第4章 Tool Use]
    C --> E[第5章 Agent循环]
    D --> E
    E --> F[第6章 LangGraph]
    E --> G[第7章 Memory]
    F --> H[第8章 Multi-Agent]
    G --> H
    H --> I[第9章 生产级Agent]
    I --> J[第10章 毕业项目]
```

> **第 5 章是全教程的核心**。如果你时间有限，优先保证第 1、2、4、5 章学扎实。

## 前置要求

### Python 基础

你不需要是 Python 专家，但需要会：

- 定义函数和使用参数
- 使用列表（`list`）、字典（`dict`）
- 理解类和对象的基本概念
- 读 API 文档，调用第三方库

如果你能看懂下面这段代码，就没问题：

```python
import requests

def get_weather(city: str) -> dict:
    """获取城市天气"""
    response = requests.get(f"https://api.weather.com/{city}")
    data = response.json()
    return {
        "city": city,
        "temperature": data["temp"],
        "description": data["weather"]
    }

weather = get_weather("北京")
print(f"{weather['city']}: {weather['temperature']}°C, {weather['description']}")
```

### 深度学习入门

你只需要知道：

- 什么是神经网络（不需要手推反向传播）
- 训练（training）和推理（inference）的区别
- 什么是 Embedding（向量表示）

这些概念在第 1 章会用直觉和类比再讲一遍，不用担心。

## 环境搭建

### 第 1 步：确认 Python 版本

```bash
python --version
# 应该显示 Python 3.10.x 或更高版本
```

如果版本低于 3.10，推荐用 [Miniconda](https://docs.conda.io/en/latest/miniconda.html)：

```bash
# 安装 Miniconda 后
conda create -n agent python=3.11
conda activate agent
```

### 第 2 步：创建项目目录和虚拟环境

```bash
# 克隆或下载教程代码
cd agent-tutorial

# 创建虚拟环境
python -m venv .venv

# 激活
source .venv/bin/activate    # macOS / Linux
# .venv\Scripts\activate     # Windows
```

> **为什么要用虚拟环境？** 想象你同时在做两个项目，一个需要 `langchain==0.2`，另一个需要 `langchain==0.3`。不用虚拟环境，两个项目的依赖会打架。虚拟环境就是给每个项目一个独立的"小房间"，互不干扰。

### 第 3 步：安装依赖

```bash
pip install -r requirements.txt
```

如果你网络慢，可以用国内镜像：

```bash
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

> **按需安装**：你不必一次装完所有依赖。第 1 章只需要 `openai` 和 `tiktoken`，后续章节按需安装即可。每个 `.py` 文件顶部标注了需要的依赖。

### 第 4 步：配置 API Key

```bash
cp .env.example .env
```

用编辑器打开 `.env`，填入你的 API Key：

```bash
# OpenAI API Key（必需）
# 申请地址：https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Anthropic API Key（可选，用于 Claude 模型）
# 申请地址：https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

> **安全提醒**：
> - `.env` 文件不要提交到 Git
> - 不要把 API Key 贴到公开的地方（论坛、GitHub Issues）
> - 在 OpenAI 后台设置用量上限（建议 $10），避免意外超支

### 第 5 步：验证环境

创建一个测试文件：

```python
# test_env.py
import os
from dotenv import load_dotenv

load_dotenv()

# 检查 API Key
key = os.getenv("OPENAI_API_KEY", "")
print(f"OpenAI API Key: {'OK' if key.startswith('sk-') else 'MISSING'}")

# 检查关键依赖
for pkg in ["openai", "tiktoken", "chromadb", "langchain", "langgraph"]:
    try:
        __import__(pkg)
        print(f"{pkg}: OK")
    except ImportError:
        print(f"{pkg}: not installed (will install when needed)")
```

运行：

```bash
python test_env.py
```

预期输出：

```
OpenAI API Key: OK
openai: OK
tiktoken: OK
chromadb: not installed (will install when needed)
langchain: not installed (will install when needed)
langgraph: not installed (will install when needed)
```

只要你看到 `OpenAI API Key: OK` 和 `openai: OK`，就可以开始学习了。

## 学习建议

1. **先跑通，再理解**：每个代码示例先跑一遍，看到效果后再研究原理
2. **不要跳过练习**：每章末尾有 3 个练习（基础 / 进阶 / 挑战），是巩固知识的关键
3. **遇到报错别慌**：AI 开发中最常见的问题就是 API 调用失败，99% 的原因是 API Key 不对或网络问题
4. **记笔记**：把你的理解和踩过的坑记下来，这会成为你的宝贵经验

> **关于 AI 编程助手**：你可以用 ChatGPT、Claude 或 GitHub Copilot 辅助学习，但建议先自己写代码，写不出来再求助。直接复制 AI 生成的代码，你学不到东西。

## 常见踩坑 FAQ

### Q: `pip install` 报错 `Permission denied`

不要用 `sudo pip install`。请确认你已经激活了虚拟环境：

```bash
source .venv/bin/activate
pip install -r requirements.txt
```

### Q: API 调用报错 `401 Unauthorized`

API Key 有问题。检查：
1. `.env` 文件中的 Key 是否以 `sk-` 开头
2. Key 是否有多余的空格或引号
3. 账户是否有余额

### Q: API 调用报错 `Connection error`

网络问题。如果你在国内：
- 检查是否开了代理
- 或使用 OpenAI 的中转服务

### Q: 内存不足（特别是第 3 章 RAG）

本地 Embedding 模型需要约 2GB 内存。如果内存不足：
- 关闭其他大应用
- 或使用 OpenAI 的 Embedding API（`text-embedding-3-small`），不需要本地模型

---

准备好了？让我们开始第 1 章：[LLM 是什么，怎么工作的](/notes/tutorial/ai-agent/01-llm-basics/)。
