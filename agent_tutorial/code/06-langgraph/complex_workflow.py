"""
复杂工作流 - 用 LangGraph 构建带分支和循环的文档处理流水线

需要的依赖：openai, langgraph, langchain-openai, python-dotenv
运行方式：python code/06-langgraph/complex_workflow.py
"""

import os
from typing import TypedDict, Literal
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, END

load_dotenv()
llm = ChatOpenAI(model="gpt-4o", temperature=0)


# === State 定义 ===

class DocumentState(TypedDict):
    original_text: str       # 原始文档
    summary: str             # 生成的摘要
    quality_score: float     # 质量评分
    needs_revision: bool     # 是否需要修改
    revision_count: int      # 修改次数
    final_output: str        # 最终输出


# === 节点函数 ===

def generate_summary(state: DocumentState) -> DocumentState:
    """生成文档摘要"""
    response = llm.invoke([
        HumanMessage(content=f"请为以下文档生成一段 100 字以内的中文摘要：\n\n{state['original_text']}")
    ])
    return {"summary": response.content}


def review_summary(state: DocumentState) -> DocumentState:
    """自动审核摘要质量"""
    response = llm.invoke([
        HumanMessage(content=f"""请评估以下摘要的质量，返回 0-1 之间的分数。

评分标准：
- 信息完整性（是否覆盖了原文关键信息）
- 语言流畅性
- 长度适当性（100 字以内）

只返回一个数字（如 0.85），不要返回其他内容。

原文：{state['original_text'][:500]}

摘要：{state['summary']}""")
    ])
    try:
        score = float(response.content.strip())
    except ValueError:
        score = 0.5

    return {"quality_score": score, "revision_count": state.get("revision_count", 0) + 1}


def check_quality(state: DocumentState) -> Literal["pass", "fail"]:
    """条件边：判断质量是否达标"""
    if state["quality_score"] >= 0.8:
        return "pass"
    if state["revision_count"] >= 3:
        return "pass"  # 最多修改 3 次
    return "fail"


def revise_summary(state: DocumentState) -> DocumentState:
    """根据审核反馈修改摘要"""
    response = llm.invoke([
        HumanMessage(content=f"""以下摘要质量得分 {state['quality_score']}，需要改进。
请重写这个摘要，使其更完整、更流畅。

原始文档：{state['original_text'][:500]}

当前摘要：{state['summary']}

请直接返回改进后的摘要，不要解释。""")
    ])
    return {"summary": response.content}


def finalize(state: DocumentState) -> DocumentState:
    """最终输出"""
    return {
        "final_output": f"摘要（质量分: {state['quality_score']:.2f}，修改次数: {state['revision_count']}）：\n{state['summary']}"
    }


# === 构建工作流 ===

def create_workflow():
    workflow = StateGraph(DocumentState)

    workflow.add_node("generate", generate_summary)
    workflow.add_node("review", review_summary)
    workflow.add_node("revise", revise_summary)
    workflow.add_node("finalize", finalize)

    workflow.set_entry_point("generate")
    workflow.add_edge("generate", "review")
    workflow.add_conditional_edges("review", check_quality, {"pass": "finalize", "fail": "revise"})
    workflow.add_edge("revise", "review")
    workflow.add_edge("finalize", END)

    return workflow.compile()


# === 运行 ===

SAMPLE_TEXT = """人工智能（AI）是计算机科学的一个分支，旨在创建能够模拟人类智能的系统。
近年来，大语言模型（LLM）如 GPT 和 Claude 的出现，标志着 AI 进入了一个新的时代。
这些模型能够理解和生成自然语言，进行推理和代码编写。
AI Agent 是 LLM 的重要应用形态，它能让 AI 不仅"会说话"，还能"做事"——
自主感知环境、做出决策并采取行动。"""

if __name__ == "__main__":
    app = create_workflow()
    result = app.invoke({
        "original_text": SAMPLE_TEXT,
        "summary": "",
        "quality_score": 0.0,
        "needs_revision": False,
        "revision_count": 0,
        "final_output": "",
    })
    print(result["final_output"])
