"""
手写 ReAct Agent - 从零实现，不依赖任何框架

这是全教程最关键的代码。逐行理解它，你就理解了 Agent 的本质。

需要的依赖：openai, python-dotenv
运行方式：python code/05-agent-loop/react_from_scratch.py
"""

import os
import json
import re
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# ============================================================
# 第 1 部分：工具定义
# ============================================================

def search(query: str) -> str:
    """搜索互联网获取信息

    当需要查找事实、数据、最新信息时使用。
    """
    # 模拟搜索结果（实际项目中调用 Tavily、SerpAPI 等）
    knowledge_base = {
        "python": "Python 是一种解释型编程语言，由 Guido van Rossum 于 1991 年创建。"
                  "它是世界上最流行的编程语言之一，广泛用于 Web 开发、数据科学和 AI。",
        "transformer": "Transformer 架构由 Google 的 Vaswani 等人在 2017 年论文 "
                       "'Attention Is All You Need' 中提出。它是 GPT、BERT 等模型的基础。",
        "nobel": "2024 年诺贝尔物理学奖授予了 Geoffrey Hinton 和 John Hopfield，"
                 "以表彰他们在人工神经网络和机器学习方面的基础性发现。"
                 "Hinton 在多伦多大学，Hopfield 在普林斯顿大学。",
        "agent": "AI Agent 是能自主感知环境、做出决策并采取行动的智能程序。"
                 "它以 LLM 为推理核心，配合工具和记忆系统来完成复杂任务。",
    }

    query_lower = query.lower()
    for key, value in knowledge_base.items():
        if key in query_lower:
            return value

    return f"搜索 '{query}' 未找到直接相关的高置信度结果。建议换个关键词重试。"


def calculate(expression: str) -> str:
    """执行数学计算

    当需要进行数学运算时使用。支持 +, -, *, /, ** 等。
    """
    try:
        # 安全检查：用 AST 解析，只允许数学运算节点
        import ast
        tree = ast.parse(expression, mode='eval')
        for node in ast.walk(tree):
            if not isinstance(node, (ast.Expression, ast.BinOp, ast.UnaryOp,
                                     ast.Constant, ast.Add, ast.Sub, ast.Mult,
                                     ast.Div, ast.Pow, ast.Mod, ast.USub)):
                return f"错误：不支持的操作 {type(node).__name__}"
        result = eval(compile(tree, '<expr>', 'eval'))
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"


def get_current_time() -> str:
    """获取当前日期和时间

    当用户询问时间相关问题时使用。
    """
    from datetime import datetime
    return datetime.now().strftime("%Y年%m月%d日 %H:%M:%S")


TOOLS = {
    "search": search,
    "calculate": calculate,
    "get_current_time": get_current_time,
}


# ============================================================
# 第 2 部分：System Prompt 构建
# ============================================================

def build_system_prompt(tools: dict) -> str:
    """构建 ReAct Agent 的 System Prompt"""
    tool_descriptions = []
    for name, func in tools.items():
        doc = func.__doc__.strip().split("\n")[0] if func.__doc__ else "无描述"
        tool_descriptions.append(f"- {name}: {doc}")

    tools_text = "\n".join(tool_descriptions)

    return f"""你是一个 ReAct Agent。你通过"思考→行动→观察"的循环来完成用户任务。

## 可用工具
{tools_text}

## 回答格式

当你需要使用工具时，严格按以下格式（每行一个字段）：

Thought: [你的思考过程，分析当前情况和下一步计划]
Action: [工具名称]
Action Input: [工具参数，简单字符串]

当你能直接回答用户时：

Thought: [总结已收集到的信息]
Final Answer: [你的最终回答]

## 重要规则
1. 每次只调用一个工具
2. 等待观察结果后，再决定下一步
3. 不要用相同的参数重复调用同一个工具
4. 如果工具返回错误，分析原因并尝试其他方法
5. 收集到足够信息后，及时给出 Final Answer"""


# ============================================================
# 第 3 部分：响应解析
# ============================================================

def parse_agent_response(text: str) -> dict:
    """解析 Agent 的文本输出为结构化数据"""
    result = {"raw": text}

    # 检查是否是最终答案
    if "Final Answer:" in text:
        result["is_final"] = True
        answer_part = text.split("Final Answer:", 1)[1].strip()
        result["answer"] = answer_part
        return result

    result["is_final"] = False

    # 解析 Thought
    thought_match = re.search(r"Thought:\s*(.+?)(?=\n(?:Action|Final)|$)", text, re.DOTALL)
    if thought_match:
        result["thought"] = thought_match.group(1).strip()

    # 解析 Action
    action_match = re.search(r"Action:\s*(.+?)$", text, re.MULTILINE)
    if action_match:
        result["action"] = action_match.group(1).strip()

    # 解析 Action Input
    input_match = re.search(r"Action Input:\s*(.+?)$", text, re.MULTILINE)
    if input_match:
        result["action_input"] = input_match.group(1).strip()

    # 兜底：如果解析失败，尝试简单处理
    if "action" not in result:
        result["is_final"] = True
        result["answer"] = text

    return result


# ============================================================
# 第 4 部分：工具执行
# ============================================================

def execute_tool(tools: dict, action: str, action_input: str) -> str:
    """执行工具调用"""
    func = tools.get(action)
    if not func:
        available = ", ".join(tools.keys())
        return f"错误：未知工具 '{action}'。可用工具: {available}"

    try:
        # 如果参数是 JSON，解析为关键字参数
        try:
            args = json.loads(action_input)
            if isinstance(args, dict):
                return str(func(**args))
        except (json.JSONDecodeError, TypeError):
            pass

        # 否则作为第一个位置参数传入
        # 检查函数签名
        import inspect
        sig = inspect.signature(func)
        params = list(sig.parameters.keys())
        if params:
            return str(func(**{params[0]: action_input}))
        else:
            return str(func())

    except Exception as e:
        return f"工具执行错误 ({action}): {e}"


# ============================================================
# 第 5 部分：核心 Agent 循环
# ============================================================

def react_agent(
    user_query: str,
    tools: dict = None,
    max_steps: int = 10,
    verbose: bool = True,
) -> str:
    """ReAct Agent 核心循环

    Args:
        user_query: 用户的输入
        tools: 工具字典 {名称: 函数}
        max_steps: 最大执行步数
        verbose: 是否打印详细日志

    Returns:
        Agent 的最终回答
    """
    if tools is None:
        tools = TOOLS

    system_prompt = build_system_prompt(tools)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query},
    ]

    if verbose:
        print(f"\n{'=' * 60}")
        print(f"用户: {user_query}")
        print(f"{'=' * 60}")

    for step in range(1, max_steps + 1):
        if verbose:
            print(f"\n--- Step {step} ---")

        # 调用 LLM
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0,
        )
        response_text = response.choices[0].message.content

        # 解析响应
        parsed = parse_agent_response(response_text)

        if verbose:
            if parsed.get("thought"):
                print(f"Thought: {parsed['thought']}")

        # 如果是最终答案
        if parsed.get("is_final"):
            if verbose:
                print(f"Final Answer: {parsed['answer']}")
            return parsed["answer"]

        # 执行工具
        action = parsed.get("action", "")
        action_input = parsed.get("action_input", "")

        if verbose:
            print(f"Action: {action}")
            print(f"Action Input: {action_input}")

        observation = execute_tool(tools, action, action_input)

        if verbose:
            print(f"Observation: {observation}")

        # 更新对话历史
        # 把 LLM 的输出加到 messages
        messages.append({"role": "assistant", "content": response_text})
        # 把观察结果加到 messages
        messages.append({"role": "user", "content": f"Observation: {observation}"})

    return f"达到最大步数限制 ({max_steps})，任务未完成。"


# ============================================================
# 第 6 部分：运行演示
# ============================================================

if __name__ == "__main__":
    # 演示 1：需要搜索的事实问答
    answer = react_agent("2024 年诺贝尔物理学奖得主是哪个学校的？")
    print(f"\n最终回答: {answer}")

    # 演示 2：需要计算的任务
    answer = react_agent("如果我投资 10000 元，年化收益 8%，5 年后本息合计多少？")
    print(f"\n最终回答: {answer}")

    # 演示 3：多步骤任务
    answer = react_agent("Python 是谁创建的？创建于哪一年？距离现在多少年了？")
    print(f"\n最终回答: {answer}")
