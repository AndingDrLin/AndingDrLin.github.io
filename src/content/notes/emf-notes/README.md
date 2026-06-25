---
title: "电磁场与波一天应试笔记"
description: "按老师最新 Q1-Q4 范围重写的电磁场与波期末复习路线图，面向一天内从零快速应试。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 期末复习]
category: "课程学习"
docGroup: "emf-notes"
order: -1
draft: false
---

这份笔记不是按课件页码复述，而是按**期末四道题怎么拿分**重写。目标很具体：如果只剩一天，从这里开始，先抓住必考模板，再用往年题型验证。

本轮最高优先级来自老师给出的考试范围：

| 题号 | 范围 | 题型 | 本笔记对应位置 |
|---|---|---|---|
| Q1 | 全书内容，除分离变量法 | 概念题、小计算题 | 第1–5章 + 第7/8章概念速记 |
| Q2 | Chapter 6 静磁场 | `B,H,M,J_M`、自感、互感、磁能 | 第6章 |
| Q3 | Chapter 7–8 | 无耗/有耗媒质中的平面波传播 | 第7章 + 第8章前半 |
| Q4 | Chapter 8 | 电磁波反射与透射 | 第8章后半 |

往年 2022–2025 期末和 2026 mock 里，Smith chart、传输线、矩形波导、微波网络也出现过。它们不在本轮 Q2–Q4 的大题主线里，但如果 Q1 严格按“全书除分离变量法”出概念题，仍有被问到的风险。本轮正文先把 CH2–CH8 的高频计算模板写完整；传输线、波导、Smith chart 至少应在考前另补一页概念速记。

## 一天学习路线

如果时间完整，按下面的“一天版”走；如果只剩半天，优先级要更狠：

- **4 小时版**：第1章公式总表 → 第6章同轴线/螺线管 → 第8章平面波传播与反射 → 第3章边界条件。
- **2 小时版**：只背 Q2/Q3/Q4 模板；Q1 只扫第1章速记和第3章边界条件。
- **30 分钟版**：只看本页最后“考前最后 30 分钟”和第1章“一页考前速记”。

### 第 0 步：先看考试地图（30–45 分钟）

- [第1章 一天应试地图与公式总表](/notes/electromagnetics-and-fields/chapter1/)

先看第1章，不要直接从矢量分析开始硬啃。第1章会告诉你每道题大概率在考什么、哪些公式必须背、哪些题型可以套模板。

### 第 1 步：补 Q1 小计算工具（2–3 小时）

- [第2章 矢量分析：Q1 小计算工具箱](/notes/electromagnetics-and-fields/chapter2/)
- [第3章 静电场：高斯定律、电势与边界条件](/notes/electromagnetics-and-fields/chapter3/)
- [第4章 静电边值问题：只保留镜像法与方程判断](/notes/electromagnetics-and-fields/chapter4/)
- [第5章 恒定电流：电流密度、电阻与连续性](/notes/electromagnetics-and-fields/chapter5/)

Q1 的特点是散：可能问概念，也可能让你算一个散度、边界场、电阻、镜像法力。复习时不要追求完整推导，先把“题目关键词 → 套哪个公式”练熟。

### 第 2 步：拿下 Q2 静磁场大题（2 小时）

- [第6章 静磁场：Q2 磁场、电感与磁能](/notes/electromagnetics-and-fields/chapter6/)

这里最可能出完整计算题。优先掌握两套模板：

1. 同轴线：安培环路求 `H` → 积分磁能 → 求单位长度电感。
2. 螺线管：求 `H/B` → 求磁通 → 求自感/互感。

### 第 3 步：拿下 Q3 平面波传播（2 小时）

- [第7章 时变场与 Maxwell 方程：Q3 的源头](/notes/electromagnetics-and-fields/chapter7/)
- [第8章 平面电磁波：Q3 传播与 Q4 反射透射](/notes/electromagnetics-and-fields/chapter8/)

Q3 常见问法是：给一个 `E` 或 `H` 相量，求另一个场、波长、频率、平均 Poynting 矢量；或者给导电媒质参数，求 `alpha/beta/delta/eta_c`。

### 第 4 步：最后专攻 Q4 反射透射（1.5–2 小时）

仍然看第8章后半。Q4 不难，但符号很容易错，尤其是反射波的磁场方向。考试时不要凭直觉写 `H_r`，统一用

$$
\mathbf H=\frac{1}{\eta}\hat{\mathbf k}\times \mathbf E
$$

来判断。

## 章节目录

- [第1章 一天应试地图与公式总表](/notes/electromagnetics-and-fields/chapter1/) — 四道题怎么分工、总公式表、符号表、模板索引
- [第2章 矢量分析：Q1 小计算工具箱](/notes/electromagnetics-and-fields/chapter2/) — 梯度、散度、旋度、Gauss/Stokes、柱坐标常用公式
- [第3章 静电场：高斯定律、电势与边界条件](/notes/electromagnetics-and-fields/chapter3/) — `E/D/V/rho` 互求、高斯定律、静电边界、电容
- [第4章 静电边值问题：只保留镜像法与方程判断](/notes/electromagnetics-and-fields/chapter4/) — Poisson/Laplace、唯一性、镜像法，明确跳过分离变量法
- [第5章 恒定电流：电流密度、电阻与连续性](/notes/electromagnetics-and-fields/chapter5/) — `J=sigma E`、连续性、电阻、功率、多介质导电
- [Review of Static Electric Fields 参考答案](/notes/electromagnetics-and-fields/important_problems/) — 前五章静态电场补充练习
- [EMT Midterm Mock Test 2（含参考答案）](/notes/electromagnetics-and-fields/emt-midterm-mock-test-2/) — 期中模拟题，可作为 Q1 额外训练
- [第6章 静磁场：Q2 磁场、电感与磁能](/notes/electromagnetics-and-fields/chapter6/) — `B/H/M/J_M`、安培环路、同轴线电感、螺线管互感
- [第7章 时变场与 Maxwell 方程：Q3 的源头](/notes/electromagnetics-and-fields/chapter7/) — Faraday、位移电流、Maxwell 方程、相量、波动方程
- [第8章 平面电磁波：Q3 传播与 Q4 反射透射](/notes/electromagnetics-and-fields/chapter8/) — 无耗/有耗传播、良导体、Poynting、极化、反射透射

## 往年题型如何使用

这份笔记不会把整份真题原样搬进来，而是把题目抽象成模板。你会在正文中看到类似“2025 Q7 类型”“mock 2026 Q2 类型”的标注。它们的作用是告诉你：这个模板不是凭空总结的，而是在近几年卷子里反复出现。

建议做题顺序：

1. 先看模板步骤，不急着背结果。
2. 盖住答案，按步骤写一遍。
3. 对照易错点检查符号、方向、单位。
4. 最后再去 `raw_materials/emf-final/` 找对应年份题干做原题。

## 考前最后 30 分钟只看什么

如果真的只剩 30 分钟，按这个顺序扫：

1. 第1章的 Q1–Q4 总公式表。
2. 第6章同轴线磁场-磁能-电感模板。
3. 第8章 `E/H/k` 右手关系、良导体公式、法向入射公式。
4. 每章末尾“一页考前速记”。

这不是完整学习方法，但在考前最后阶段，比继续翻课件更有效。