"""
LangGraph 基础 Agent - 用 LangGraph 重写 ReAct Agent

需要的依赖：openai, langgraph, langchain-openai, langchain-community, python-dotenv
运行方式：python code/06-langgraph/basic_agent.py
"""

import os
from typing import TypedDict, Annotated, Sequence
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langgraph.graph.message import add_messages

load_dotenv()


# === 第 1 步：定义 State ===

class AgentState(TypedDict):
    """Agent 的状态，贯穿整个图的执行"""
    messages: Annotated[Sequence[BaseMessage], add_messages]


# === 第 2 步：定义工具 ===

@tool
def search(query: str) -> str:
    """搜索互联网获取信息。当需要查找事实、数据或最新信息时使用。"""
    knowledge = {
        "python": "Python 由 Guido van Rossum 于 1991 年创建，是一种解释型编程语言。",
        "transformer": "Transformer 由 Google 在 2017 年提出，是 GPT 和 BERT 的基础架构。",
        "agent": "AI Agent 是能自主感知和行动的智能程序，以 LLM 为核心推理引擎。",
    }
    for k, v in knowledge.items():
        if k in query.lower():
            return v
    return f"搜索 '{query}' 未找到直接相关结果。"


@tool
def calculate(expression: str) -> str:
    """执行数学计算。当需要计算数学表达式时使用。"""
    try:
        allowed = set("0123456789+-*/(). ")
        if all(c in allowed for c in expression):
            return str(eval(expression))
        return "错误：不允许的字符"
    except Exception as e:
        return f"计算错误: {e}"


tools = [search, calculate]


# === 第 3 步：创建 LLM ===

llm = ChatOpenAI(model="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools(tools)


# === 第 4 步：定义节点 ===

def agent_node(state: AgentState) -> AgentState:
    """Agent 节点：调用 LLM 进行推理"""
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}


tool_node = ToolNode(tools)


# === 第 5 步：定义条件边 ===

def should_continue(state: AgentState) -> str:
    """判断 LLM 是否想调用工具"""
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return "end"


# === 第 6 步：构建图 ===

def create_agent():
    """创建 LangGraph Agent"""
    workflow = StateGraph(AgentState)

    # 添加节点
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", tool_node)

    # 设置入口
    workflow.set_entry_point("agent")

    # 添加条件边：agent -> (tools 或 end)
    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {"tools": "tools", "end": END},
    )

    # 添加普通边：tools -> agent（工具执行完回到 LLM）
    workflow.add_edge("tools", "agent")

    return workflow.compile()


# === 第 7 步：运行 ===

def run_agent(query: str):
    """运行 Agent"""
    app = create_agent()

    print(f"\n用户: {query}")
    print("=" * 50)

    result = app.invoke({"messages": [HumanMessage(content=query)]})

    # 打印对话历史
    for msg in result["messages"]:
        if isinstance(msg, HumanMessage):
            print(f"用户: {msg.content}")
        elif isinstance(msg, AIMessage):
            if msg.tool_calls:
                for tc in msg.tool_calls:
                    print(f"[工具调用] {tc['name']}({tc['args']})")
            if msg.content:
                print(f"AI: {msg.content}")

    # 最终回答是最后一条 AI 消息
    final = [m for m in result["messages"] if isinstance(m, AIMessage) and m.content]
    if final:
        print(f"\n最终回答: {final[-1].content}")


if __name__ == "__main__":
    run_agent("2 的 10 次方是多少？")
    run_agent("Python 是谁创建的？创建于哪一年？")
    run_agent("AI Agent 是什么？")
