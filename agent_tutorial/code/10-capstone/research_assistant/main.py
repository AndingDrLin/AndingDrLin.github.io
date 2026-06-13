"""
智能研究助手 - 毕业项目选题 A

功能：自动研究一个话题，搜索资料，生成研究报告
技术栈：OpenAI API, ReAct Agent, Web 搜索

需要的依赖：openai, python-dotenv
运行方式：python code/10-capstone/research_assistant/main.py
"""

import os
import json
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


class ResearchAssistant:
    """智能研究助手"""

    def __init__(self):
        self.findings: list[str] = []
        self.notes: dict[str, str] = {}

    def plan_research(self, topic: str) -> list[str]:
        """规划研究子话题"""
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{
                "role": "user",
                "content": f"请为研究主题「{topic}」规划 3-5 个子话题。返回 JSON 数组。"
            }],
            temperature=0,
            response_format={"type": "json_object"},
        )
        data = json.loads(response.choices[0].message.content)
        return data.get("topics", data.get("subtopics", [topic]))

    def search(self, query: str) -> str:
        """模拟搜索（实际项目中接入 Tavily/SerpAPI）"""
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{
                "role": "user",
                "content": f"请模拟搜索结果，提供关于「{query}」的 3 个关键信息点。"
            }],
            temperature=0.3,
        )
        return response.choices[0].message.content

    def generate_report(self, topic: str) -> str:
        """生成研究报告"""
        context = "\n\n".join(self.findings)
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{
                "role": "user",
                "content": f"""基于以下研究资料，写一篇关于「{topic}」的研究报告。

资料：
{context}

报告格式：
## 概述
## 核心发现
## 详细分析
## 结论与展望
"""
            }],
            temperature=0.7,
        )
        return response.choices[0].message.content

    def research(self, topic: str, verbose: bool = True) -> str:
        """主入口：研究一个话题"""
        if verbose:
            print(f"开始研究: {topic}")

        # 1. 规划
        sub_topics = self.plan_research(topic)
        if verbose:
            print(f"研究计划: {sub_topics}")

        # 2. 逐个搜索
        for sub in sub_topics:
            if verbose:
                print(f"  搜索: {sub}")
            result = self.search(sub)
            self.findings.append(f"【{sub}】\n{result}")

        # 3. 生成报告
        report = self.generate_report(topic)

        # 4. 保存
        filename = f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
        with open(filename, "w") as f:
            f.write(f"# {topic}\n\n{report}")
        if verbose:
            print(f"报告已保存: {filename}")

        return report


if __name__ == "__main__":
    assistant = ResearchAssistant()
    report = assistant.research("AI Agent 在 2026 年的发展趋势")
    print(f"\n{'=' * 60}")
    print(report)
