"""
练习 5：手写 Agent（全教程最核心的练习）

目标：
1. 实现一个 ReAct Agent，支持自定义工具
2. 添加日志功能，打印每步的 Thought/Action/Observation
3. （挑战）给 Agent 添加"笔记本"功能，支持跨步骤信息传递

需要的依赖：openai, python-dotenv

完成后运行: python exercises/ex-05-react-agent.py
"""

import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 练习 1：手写 ReAct Agent ===

def build_system_prompt(tools: dict) -> str:
    """TODO: 构建 ReAct Agent 的 System Prompt

    提示：
    1. 列出所有可用工具和描述
    2. 定义 Thought/Action/Action Input 格式
    3. 定义 Final Answer 格式
    4. 加上行为规则（每次只调用一个工具等）
    """
    # TODO: 实现
    pass


def parse_response(text: str) -> dict:
    """TODO: 解析 Agent 的文本输出

    提示：
    1. 检查是否包含 "Final Answer:"
    2. 用正则或字符串分割提取 Thought, Action, Action Input
    3. 返回结构化字典

    返回格式:
    {
        "is_final": bool,
        "thought": str,      # 思考过程
        "action": str,        # 工具名称
        "action_input": str,  # 工具参数
        "answer": str,        # 最终答案（仅当 is_final=True）
    }
    """
    # TODO: 实现
    pass


def react_agent(user_query: str, tools: dict, max_steps: int = 10) -> str:
    """TODO: ReAct Agent 核心循环

    提示：
    1. 构建初始 messages
    2. 循环 max_steps 次
    3. 每步：调用 LLM -> 解析响应 -> 判断是否结束 -> 执行工具 -> 更新历史
    4. 返回最终答案

    额外要求：
    - 打印每步的 [Step N] Thought/Action/Observation 日志
    """
    # TODO: 实现
    pass


# === 练习 2（挑战）：带笔记本的 Agent ===

def react_agent_with_notes(user_query: str, tools: dict, max_steps: int = 10) -> str:
    """TODO: 带笔记本功能的 Agent

    额外工具：
    - save_note(key, value): 保存信息到笔记本
    - read_note(key): 从笔记本读取信息

    测试任务：
    "搜索 Python 的创建年份，然后搜索 AI Agent 的定义，
     最后计算 Python 创建至今多少年，并把总结保存为笔记。"
    """
    notes = {}

    def save_note(key: str, value: str) -> str:
        notes[key] = value
        return f"已保存笔记 '{key}'"

    def read_note(key: str) -> str:
        return notes.get(key, f"未找到笔记 '{key}'")

    # 把 save_note 和 read_note 加入工具列表
    all_tools = {**tools, "save_note": save_note, "read_note": read_note}

    # TODO: 用 react_agent 的逻辑，但使用 all_tools
    pass


if __name__ == "__main__":
    # 测试用工具
    def search(query: str) -> str:
        """搜索互联网信息"""
        kb = {"python": "Python 由 Guido van Rossum 于 1991 年创建。",
              "agent": "AI Agent 是能自主行动的智能程序。"}
        for k, v in kb.items():
            if k in query.lower():
                return v
        return f"未找到关于 '{query}' 的信息"

    def calculate(expression: str) -> str:
        """数学计算"""
        try:
            return str(eval(expression))
        except Exception as e:
            return f"错误: {e}"

    tools = {"search": search, "calculate": calculate}

    print("=== 练习 1：ReAct Agent ===")
    # print(react_agent("Python 是谁创建的？", tools))

    print("\n=== 练习 2：带笔记本的 Agent ===")
    # print(react_agent_with_notes("搜索 Python 信息并保存笔记", tools))
