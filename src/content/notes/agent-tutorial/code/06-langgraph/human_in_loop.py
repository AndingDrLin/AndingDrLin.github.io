"""
Human-in-the-Loop - 人工审核节点

需要的依赖：openai, langgraph, langchain-openai, python-dotenv
运行方式：python code/06-langgraph/human_in_loop.py
"""

import os
from typing import TypedDict
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()
llm = ChatOpenAI(model="gpt-4o", temperature=0)


class State(TypedDict):
    task: str
    draft: str
    human_feedback: str
    final: str
    approved: bool


def draft_agent(state: State) -> State:
    """Agent 生成草稿"""
    response = llm.invoke([
        HumanMessage(content=f"请根据以下任务需求写一段回复草稿：\n{state['task']}")
    ])
    return {"draft": response.content}


def human_review(state: State) -> State:
    """人工审核节点 - 这里用 input() 模拟

    实际生产中，这里会暂停执行，等待人工通过 API 或 UI 提供反馈。
    LangGraph 通过 checkpoint 机制支持这种"暂停-恢复"模式。
    """
    print(f"\n{'=' * 50}")
    print("请审核以下草稿：")
    print(f"{'=' * 50}")
    print(state["draft"])
    print(f"{'=' * 50}")

    feedback = input("\n输入反馈（输入 'approve' 通过，或输入修改意见）: ").strip()

    if feedback.lower() == "approve":
        return {"approved": True, "human_feedback": "approved"}
    return {"approved": False, "human_feedback": feedback}


def check_approval(state: State) -> str:
    """条件边：检查是否通过"""
    if state.get("approved"):
        return "finalize"
    return "revise"


def revise(state: State) -> State:
    """根据人工反馈修改"""
    response = llm.invoke([
        HumanMessage(content=f"""请根据反馈修改草稿。

草稿：{state['draft']}

反馈：{state['human_feedback']}

请直接返回修改后的文本。""")
    ])
    return {"draft": response.content}


def finalize(state: State) -> State:
    """最终输出"""
    return {"final": state["draft"]}


# === 构建图 ===

def create_human_in_loop_workflow():
    workflow = StateGraph(State)

    workflow.add_node("draft", draft_agent)
    workflow.add_node("human_review", human_review)
    workflow.add_node("revise", revise)
    workflow.add_node("finalize", finalize)

    workflow.set_entry_point("draft")
    workflow.add_edge("draft", "human_review")
    workflow.add_conditional_edges("human_review", check_approval,
                                    {"finalize": "finalize", "revise": "revise"})
    workflow.add_edge("revise", "human_review")
    workflow.add_edge("finalize", END)

    # 使用 MemorySaver 支持暂停和恢复
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)


if __name__ == "__main__":
    app = create_human_in_loop_workflow()

    config = {"configurable": {"thread_id": "demo"}}

    result = app.invoke({
        "task": "写一段介绍 AI Agent 的文字，面向高中生读者，200 字以内。",
        "draft": "",
        "human_feedback": "",
        "final": "",
        "approved": False,
    }, config=config)

    print(f"\n最终结果:\n{result['final']}")
