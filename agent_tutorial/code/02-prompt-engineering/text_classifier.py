"""
文本分类器 - 用纯 Prompt 实现情感分析和信息提取

需要的依赖：openai, python-dotenv
运行方式：python code/02-prompt-engineering/text_classifier.py
"""

import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()


# === 情感分类器 ===

SENTIMENT_SYSTEM_PROMPT = """你是一个专业的文本情感分析器。

## 任务
分析用户提供的文本，判断其情感倾向。

## 分类标准
- 正面：表达了满意、喜欢、推荐等积极情绪
- 负面：表达了不满、抱怨、失望等消极情绪
- 中性：客观描述，无明显情感倾向

## 输出格式
严格按 JSON 格式返回，不要添加其他内容：
{
    "sentiment": "正面/负面/中性",
    "confidence": 0.0到1.0之间的置信度,
    "keywords": ["关键词1", "关键词2"],
    "summary": "一句话摘要"
}

## 示例
输入：这个手机拍照效果超棒，续航也很给力！
输出：{"sentiment": "正面", "confidence": 0.95, "keywords": ["拍照效果超棒", "续航给力"], "summary": "用户对手机拍照和续航非常满意"}

输入：等了一个月还没发货，客服态度也很差
输出：{"sentiment": "负面", "confidence": 0.9, "keywords": ["等了一个月", "态度差"], "summary": "用户对发货速度和客服态度不满"}
"""


def classify_sentiment(text: str) -> dict:
    """对文本进行情感分类"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SENTIMENT_SYSTEM_PROMPT},
            {"role": "user", "content": text},
        ],
        temperature=0,
    )
    result = response.choices[0].message.content
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"error": "JSON 解析失败", "raw": result}


# === 批量分类 ===

def batch_classify(texts: list[str]) -> list[dict]:
    """批量分类多段文本"""
    results = []
    for text in texts:
        result = classify_sentiment(text)
        result["text"] = text
        results.append(result)
        print(f"分类完成: {text[:30]}... -> {result.get('sentiment', 'ERROR')}")
    return results


# === 自定义分类器 ===

def create_classifier(categories: list[str], examples: list[dict]):
    """创建一个通用的文本分类器

    Args:
        categories: 分类标签列表
        examples: 示例列表，格式: [{"text": "...", "label": "..."}]
    """
    few_shot = "\n".join([f'文本："{ex["text"]}" -> {ex["label"]}' for ex in examples])

    system_prompt = f"""你是一个文本分类器。

## 分类类别
{', '.join(categories)}

## 示例
{few_shot}

## 输出规则
只输出分类标签，不要输出其他内容。"""

    def classify(text: str) -> str:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f'文本："{text}" ->'},
            ],
            temperature=0,
        )
        return response.choices[0].message.content.strip()

    return classify


if __name__ == "__main__":
    # 测试情感分类
    print("=== 情感分类器 ===\n")
    test_texts = [
        "这个手机拍照效果很好，但是电池太不耐用了",
        "老师讲得非常清楚，终于理解了这个概念！",
        "商品已签收",
        "买了三天就坏了，垃圾产品！",
    ]

    for text in test_texts:
        result = classify_sentiment(text)
        print(f"文本: {text}")
        print(f"结果: {json.dumps(result, ensure_ascii=False, indent=2)}\n")

    # 测试自定义分类器
    print("\n=== 自定义分类器：主题分类 ===\n")
    topic_classifier = create_classifier(
        categories=["科技", "体育", "娱乐", "财经"],
        examples=[
            {"text": "苹果发布了新款 iPhone", "label": "科技"},
            {"text": "湖人队赢得了总冠军", "label": "体育"},
            {"text": "央行宣布降息 0.5 个百分点", "label": "财经"},
        ],
    )

    test_news = [
        "OpenAI 发布了 GPT-5",
        "梅西在世界杯决赛中进球",
        "特斯拉股价大涨 10%",
        "周杰伦新专辑销量破百万",
    ]

    for news in test_news:
        label = topic_classifier(news)
        print(f'  "{news}" -> {label}')
