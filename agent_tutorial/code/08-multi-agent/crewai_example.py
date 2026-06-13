"""
CrewAI 示例 - 多角色协作系统

需要的依赖：crewai, openai, python-dotenv
运行方式：python code/08-multi-agent/crewai_example.py

注意：CrewAI 需要 Python 3.10+，首次运行可能需要几分钟来初始化。
"""

import os
from dotenv import load_dotenv

load_dotenv()


def simple_crew_demo():
    """简单的三角色协作：研究 → 写作 → 审核"""
    from crewai import Agent, Task, Crew

    # 定义 Agent（角色）
    researcher = Agent(
        role="研究分析师",
        goal="收集和整理关于指定主题的关键信息",
        backstory="""你是一位资深研究分析师，擅长从大量信息中提取关键要点。
你总是确保信息准确、来源可靠。""",
        verbose=True,
    )

    writer = Agent(
        role="技术作家",
        goal="将研究资料转化为清晰、易懂的技术文章",
        backstory="""你是一位经验丰富的技术作家，擅长用简单的语言解释复杂的技术概念。
你的文章结构清晰、逻辑连贯。""",
        verbose=True,
    )

    editor = Agent(
        role="编辑",
        goal="确保文章质量，检查事实准确性和语言流畅性",
        backstory="""你是一位严格但公正的编辑。你关注文章的准确性、
结构和可读性，会提出具体的改进建议。""",
        verbose=True,
    )

    # 定义 Task（任务）
    research_task = Task(
        description="""研究"AI Agent"这个概念：
1. 什么是 AI Agent？
2. AI Agent 的核心技术是什么？
3. AI Agent 有哪些实际应用？

请整理出关键信息点。""",
        expected_output="一份包含 3-5 个关键信息点的研究摘要",
        agent=researcher,
    )

    writing_task = Task(
        description="根据研究资料，写一篇面向初学者的 300 字介绍文章",
        expected_output="一篇结构清晰、通俗易懂的短文",
        agent=writer,
        context=[research_task],  # 依赖研究任务的输出
    )

    editing_task = Task(
        description="审查文章质量，检查准确性、逻辑性和可读性。如果需要修改，给出具体建议。",
        expected_output="审核意见和最终版本",
        agent=editor,
        context=[writing_task],
    )

    # 组建团队
    crew = Crew(
        agents=[researcher, writer, editor],
        tasks=[research_task, writing_task, editing_task],
        verbose=True,
    )

    # 启动协作
    result = crew.kickoff()
    print("\n" + "=" * 60)
    print("最终结果：")
    print("=" * 60)
    print(result)


if __name__ == "__main__":
    simple_crew_demo()
