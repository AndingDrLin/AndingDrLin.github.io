---
title: "动力学与控制考试复习笔记"
description: "按考试题型重整的动力学与控制复习笔记，覆盖建模、框图、Routh、PID、根轨迹、Nyquist、Bode 与补偿器设计。"
date: 2026-05-26
updated: 2026-07-27
tags: [dynamics-and-control, 控制理论]
category: "课程学习"
docGroup: "dc-notes"
order: -1
draft: false
---

## 这套笔记现在解决什么问题

原来的笔记更像“跟着课程学一遍”的讲义，但考试不是这样考的。真正上卷面时，题目通常不会问你“解释一下什么是控制系统”，而是直接给一个框图、一个特征方程、一条开环传递函数，要求你在有限时间里算出闭环传递函数、稳定范围、root locus、Bode margin 或 compensator 参数。

所以这套笔记按复习目标重整：**每章都先讲考试会怎么考，再给公式速查、固定解题步骤、例题和易错点。** 目标不是把 PPT 逐页搬过来，而是把 `dc-slides` 和 `dc-tutorials` 中反复出现的题型压缩成可以直接练的模板。

## 章节目录

> 说明：为了保留已经发布过的旧链接，部分文件名没有重命名。例如第 3 章仍然使用 `chapter7` 路径，第 4 章仍然使用 `chapter9` 路径。复习时按下面的章节顺序看，不要按文件名猜章节号。

1. [第1章 动态系统、建模与传递函数](chapter1)  
   会列微分方程、做 Laplace 变换、写传递函数，并识别一阶/二阶系统。
2. [第2章 控制系统结构与闭环传递函数](chapter2)  
   会区分开环/闭环，画反馈框图，推导 $G/(1+GH)$。
3. [第3章 框图化简与扰动分析](chapter7)  
   会用串联、并联、反馈、求和点/分支点移动，把复杂框图化成单一传递函数。
4. [第4章 稳定性、极点零点与 Routh 判据](chapter9)  
   会用极点位置和 Routh 表判断稳定性，求含参数 $K$ 的稳定范围。
5. [第5章 P/I/D 控制与时域性能](chapter11)  
   会分析 P、I、D、PI、PD、PID 对稳态误差、响应速度、超调和稳定性的影响。
6. [第6章 根轨迹 Root Locus](chapter12)  
   会画根轨迹，求渐近线、分离点、虚轴交点、临界增益和稳定范围。
7. [第7章 Nyquist 图与频域稳定性](chapter13)  
   会从 $G(j\omega)$ 画 Nyquist 图，用本课程的 $N=Z-P$ 约定判断闭环稳定性。
8. [第8章 Bode 图与稳定裕度](chapter14)  
   会手绘 Bode 图，读 gain margin、phase margin，并根据 GM/PM 反求增益。
9. [第9章 频域补偿器设计](chapter15)  
   会区分 lead、lag、lead-lag compensator，并按相位裕度和稳态误差指标做设计。

## 如果你是为了补考/重修，先这样复习

不要从第 1 页慢慢精读。先把最容易上卷面的题型练出来。

### 第一天：先保命，拿基础计算分

1. 第 3 章：框图化简  
   练到能快速写出 $C/R$、$C/N$，尤其是含扰动输入的题。
2. 第 4 章：Routh 判据  
   练三阶、四阶和含参数 $K$ 的 Routh 表，知道第一列变号次数代表右半平面极点数。
3. 第 5 章：P/I/D  
   先会写闭环特征方程，再算稳态误差和阻尼比，不要背一堆孤立结论。

### 第二天：补上后半课程的考试大头

1. 第 6 章：Root Locus  
   熟练算 poles/zeros、实轴段、渐近线、breakaway、虚轴交点。
2. 第 8 章：Bode  
   会把传递函数化成 time constant form，会画渐近幅频图和相频图。
3. 第 7 章：Nyquist  
   至少会求 $G(j\omega)$ 的实部虚部、负实轴交点，以及判断是否包围 $-1+j0$。

### 第三天：做综合题

重点练 `test-exercise-with-answers.pdf` 中的同类型题：

- Root locus 求临界 $K$；
- Bode/Nyquist 求稳定范围；
- GM/PM 读图并反推增益；
- PID 设计题中按稳态误差、非振荡条件、$\zeta$、$t_s$ 匹配参数。

### 考前最后一遍

只看每章的四块内容：

1. **公式速查**：确保符号和条件没记反。
2. **标准解题模板**：拿到题先做什么、再做什么。
3. **易错点与扣分点**：考试真正丢分通常不是不会，而是符号、方向、单位、条件漏了。
4. **自测题答案过程**：只看答案没用，要能复现推导。

## 这门课最容易挂在哪些地方

| 模块 | 常见挂点 | 补救方式 |
|---|---|---|
| 建模 | 变量选错、输出/输入比写反 | 每题第一行先写“输入是什么，输出是什么” |
| 框图 | 负反馈分母写成 $1-GH$，扰动通道算错 | 分开求 $C/R$ 和 $C/N$，不要一次混算 |
| Routh | 只看系数全正就下结论 | 系数全正只是必要条件，必须构造 Routh 表 |
| PID | 背结论不写闭环特征方程 | 所有 PID 题都从 $1+G_cG_pH=0$ 出发 |
| Root Locus | 渐近线中心、实轴规则、breakaway 点判断错 | 每一步都回到开环 poles/zeros |
| Nyquist | 忘记开环右半平面极点数 $P$，包围方向写反 | 本课程采用顺时针为正，$N=Z-P$ |
| Bode | PM/GM 对应频率读反 | PM 在 gain crossover 读，GM 在 phase crossover 读 |
| 补偿器 | lead/lag 的 pole-zero 顺序和 $\alpha$ 定义混用 | 以本课程 slides 的定义为准，先画零极点相对位置 |

## 源材料对应关系

- `raw_materials/dc-slides/ch01`–`ch06`：前五章的理论主线。
- `raw_materials/dc-slides/ch07`–`ch12`：根轨迹、Nyquist、Bode、频域稳定性和补偿器。
- `raw_materials/dc-tutorials/example-answers-ch01`–`ch06`：前半课程例题和答案。
- `raw_materials/dc-tutorials/stability-examples.pdf`：Routh、Root Locus、Nyquist、Bode、GM/PM 的 worked examples。
- `raw_materials/dc-tutorials/tutorials-ch08.pdf`：Nyquist/Bode/频率响应练习。
- `raw_materials/dc-tutorials/test-exercise-with-answers.pdf`：最接近考试综合题的材料，应作为后半课程刷题核心。

有些 quiz PDF 的正文 OCR 不稳定，笔记只吸收已经能确认的题型和结论；不确定的图上读数和符号约定会在对应章节中标注。