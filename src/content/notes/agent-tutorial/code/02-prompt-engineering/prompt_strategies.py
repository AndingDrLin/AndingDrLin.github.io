"""
Prompt 策略对比 - 展示不同 Prompt 技巧的效果差异

需要的依赖：openai, python-dotenv
运行方式：python code/02-prompt-engineering/prompt_strategies.py
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


def call_llm(user_prompt: str, system_prompt: str = "", temperature: float = 0.7) -> str:
    """统一的 LLM 调用函数"""
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": user_prompt})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        temperature=temperature,
        max_tokens=500,
    )
    return response.choices[0].message.content


def demo_role_prompting():
    """演示：角色设定"""
    print("=== 角色设定 (Role Prompting) ===\n")

    question = "什么是梯度下降？"

    # 无角色
    print("--- 无角色设定 ---")
    print(call_llm(question))
    print()

    # 有角色设定
    print("--- 有角色设定：大学教授 ---")
    system = "你是一位深度学习教授，擅长用简单的类比给零基础学生讲解技术概念。回答要通俗易懂，不超过 150 字。"
    print(call_llm(question, system_prompt=system))


def demo_few_shot():
    """演示：Few-shot 学习"""
    print("\n=== Few-shot 学习 ===\n")

    # Zero-shot
    print("--- Zero-shot（不给例子）---")
    prompt_zero = "把评论分类为正面或负面：'这个餐厅太好吃了！'"
    print(call_llm(prompt_zero, temperature=0))
    print()

    # Few-shot
    print("--- Few-shot（给 3 个例子）---")
    prompt_few = """请把评论分类为正面或负面。

评论："服务太慢了，等了半小时" -> 负面
评论："菜品很新鲜，环境也不错" -> 正面
评论："价格贵但不值得" -> 负面

评论："这个餐厅太好吃了！" ->"""
    print(call_llm(prompt_few, temperature=0))


def demo_output_format():
    """演示：输出格式约束"""
    print("\n=== 输出格式约束 ===\n")

    review = "我在北京朝阳区的一家咖啡店点了拿铁，花了 35 元，味道不错但等了 20 分钟"

    prompt = f"""从以下用户评论中提取信息，以 JSON 格式返回。

评论："{review}"

请返回以下 JSON（不要添加其他内容）：
{{
    "location": "城市+区域",
    "product": "商品名",
    "price": 价格数字,
    "sentiment": "正面/负面/中性",
    "complaint": "不满事项（没有则为 null）"
}}"""

    result = call_llm(prompt, temperature=0)
    print(f"评论: {review}")
    print(f"提取结果:\n{result}")

    # 验证 JSON 格式
    import json
    try:
        data = json.loads(result)
        print(f"\nJSON 解析成功: {data}")
    except json.JSONDecodeError as e:
        print(f"\nJSON 解析失败: {e}")


def demo_structure_comparison():
    """演示：同一问题用不同策略的效果对比"""
    print("\n=== 策略对比 ===\n")

    question = "解释什么是梯度下降"

    strategies = {
        "直接提问": question,
        "要求结构化": f"""请按以下格式解释「梯度下降」：
## 一句话定义
## 生活类比
## 数学直觉（不推公式）""",
        "Few-shot + 类比风格": f"""请用下面的风格解释概念：

例子：什么是过拟合？
过拟合就像一个学生把所有考试原题都背下来了，但遇到新题就不会做。模型把训练数据的噪声也记住了，导致在新数据上表现差。

现在请用同样的风格解释：
{question}""",
    }

    for name, prompt in strategies.items():
        print(f"--- {name} ---")
        print(call_llm(prompt))
        print()


if __name__ == "__main__":
    demo_role_prompting()
    demo_few_shot()
    demo_output_format()
    demo_structure_comparison()
