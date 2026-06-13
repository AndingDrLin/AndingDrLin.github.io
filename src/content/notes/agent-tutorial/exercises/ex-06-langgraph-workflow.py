"""
练习 6：用 LangGraph 构建工作流

目标：
1. 用 LangGraph 重写 ReAct Agent
2. 实现 "研究→写作→审核" 三步工作流

完成后运行: python exercises/ex-06-langgraph-workflow.py
"""

# TODO: 导入所需的库
# from typing import TypedDict, Annotated, Sequence
# from langgraph.graph import StateGraph, END
# from langchain_openai import ChatOpenAI
# from langchain_core.messages import HumanMessage, BaseMessage
# from langchain_core.tools import tool
# from langgraph.graph.message import add_messages


# === 练习 1：用 LangGraph 重写 ReAct Agent ===

# TODO: 定义 State
# class AgentState(TypedDict):
#     messages: ...

# TODO: 定义工具
# @tool
# def search(query: str) -> str:
#     ...

# TODO: 定义节点
# def agent_node(state):
#     ...

# TODO: 构建图
# def create_agent():
#     ...


# === 练习 2：研究→写作→审核 工作流 ===

class WritingState(TypedDict):
    """TODO: 定义写作工作流的状态

    需要的字段：
    - topic: 写作主题
    - research: 研究资料
    - article: 文章内容
    - review_feedback: 审核意见
    - approved: 是否通过
    """
    pass


# TODO: 实现研究节点
def research(state: WritingState) -> WritingState:
    pass


# TODO: 实现写作节点
def write(state: WritingState) -> WritingState:
    pass


# TODO: 实现审核节点
def review(state: WritingState) -> WritingState:
    pass


# TODO: 构建工作流图
def create_writing_workflow():
    pass


if __name__ == "__main__":
    # 练习 1
    # app = create_agent()
    # result = app.invoke({"messages": [HumanMessage(content="2 的 10 次方是多少？")]})

    # 练习 2
    # app = create_writing_workflow()
    # result = app.invoke({"topic": "AI Agent 的未来", ...})
    pass
