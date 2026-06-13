"""
练习 6 参考答案：LangGraph 工作流

运行方式: python solutions/sol-06-langgraph-workflow.py
"""

from typing import TypedDict, Literal, Annotated, Sequence
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langgraph.graph.message import add_messages

llm = ChatOpenAI(model="gpt-4o", temperature=0)


# === 练习 1：LangGraph ReAct Agent ===

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]


@tool
def search(query: str) -> str:
    """搜索互联网信息"""
    kb = {"python": "Python 由 Guido van Rossum 于 1991 年创建。",
          "agent": "AI Agent 是能自主行动的智能程序。"}
    for k, v in kb.items():
        if k in query.lower():
            return v
    return f"未找到 '{query}'"


@tool
def calculate(expression: str) -> str:
    """数学计算"""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"错误: {e}"


def create_agent():
    tools = [search, calculate]
    llm_with_tools = llm.bind_tools(tools)

    def agent_node(state: AgentState):
        return {"messages": [llm_with_tools.invoke(state["messages"])]}

    def should_continue(state: AgentState):
        last = state["messages"][-1]
        if hasattr(last, "tool_calls") and last.tool_calls:
            return "tools"
        return "end"

    workflow = StateGraph(AgentState)
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", ToolNode(tools))
    workflow.set_entry_point("agent")
    workflow.add_conditional_edges("agent", should_continue, {"tools": "tools", "end": END})
    workflow.add_edge("tools", "agent")
    return workflow.compile()


# === 练习 2：研究→写作→审核 ===

class WritingState(TypedDict):
    topic: str
    research: str
    article: str
    review_feedback: str
    approved: bool
    revision_count: int


def research(state: WritingState) -> WritingState:
    response = llm.invoke([HumanMessage(content=f"请调研以下主题，列出 3-5 个关键要点：\n{state['topic']}")])
    return {"research": response.content}


def write(state: WritingState) -> WritingState:
    feedback_hint = f"\n\n请根据以下反馈改进：{state['review_feedback']}" if state.get("review_feedback") else ""
    response = llm.invoke([HumanMessage(
        content=f"基于以下资料写一篇 200 字的文章：\n\n主题：{state['topic']}\n资料：{state['research']}{feedback_hint}"
    )])
    return {"article": response.content, "revision_count": state.get("revision_count", 0) + 1}


def review(state: WritingState) -> WritingState:
    response = llm.invoke([HumanMessage(
        content=f"评估以下文章质量。如果通过回复 APPROVE，否则给出修改意见。\n\n{state['article']}"
    )])
    if "APPROVE" in response.content:
        return {"approved": True, "review_feedback": ""}
    return {"approved": False, "review_feedback": response.content}


def check_approval(state: WritingState) -> str:
    if state.get("approved") or state.get("revision_count", 0) >= 3:
        return "end"
    return "revise"


def create_writing_workflow():
    workflow = StateGraph(WritingState)
    workflow.add_node("research", research)
    workflow.add_node("write", write)
    workflow.add_node("review", review)
    workflow.set_entry_point("research")
    workflow.add_edge("research", "write")
    workflow.add_edge("write", "review")
    workflow.add_conditional_edges("review", check_approval, {"revise": "write", "end": END})
    return workflow.compile()


if __name__ == "__main__":
    # 测试练习 1
    print("=== 练习 1：LangGraph Agent ===")
    agent = create_agent()
    result = agent.invoke({"messages": [HumanMessage(content="2 的 10 次方是多少？")]})
    for msg in result["messages"]:
        if isinstance(msg, AIMessage) and msg.content:
            print(f"AI: {msg.content}")

    # 测试练习 2
    print("\n=== 练习 2：写作工作流 ===")
    workflow = create_writing_workflow()
    result = workflow.invoke({
        "topic": "AI Agent 的未来发展趋势",
        "research": "", "article": "", "review_feedback": "",
        "approved": False, "revision_count": 0,
    })
    print(f"最终文章:\n{result['article']}")
