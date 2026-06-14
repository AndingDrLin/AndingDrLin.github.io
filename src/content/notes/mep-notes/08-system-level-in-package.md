---
title: "第8章 System Level Integration in Package"
description: "SoC、SiP、SoP、CSP、WLP 与系统级封装比较。"
date: 2026-06-11
tags: [microelectronics-packaging, SiP, WLP]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 8
draft: false
---
## 考试要会什么

本章对应 Lecture 8。高频问题：

- Compare SoC, SiP and SoP。
- What are CSP and WLP?
- Why is WLP expected to reduce cost and time?
- What are WLP reliability challenges?
- Why is SiP useful for heterogeneous systems?

## 一句话记忆

**System-level packaging 的核心是：当一个芯片做不完或太贵时，用 package 把多个功能集成成系统。**

![System package map](./assets/system_package_map.svg)

## SoC / SiP / SoP

| 概念 | 定义 | 优势 | 挑战 |
|---|---|---|---|
| SoC | system functions integrated on one chip | high performance, short on-chip interconnect | high design cost, long development, process compatibility |
| SiP | multiple active/passive components in one package | heterogeneous integration, flexible, shorter time-to-market | package interconnect, thermal, assembly complexity |
| SoP | system-on-package concept with package as integration platform | package-level passives/RF/optical integration | design/manufacturing complexity |

## CSP and WLP

CSP (chip scale package) 指 package size 接近 chip size。WLP (wafer-level packaging) 指在 wafer level 完成封装、互连和测试等步骤，singulation 前已经完成很多 packaging operations。

WLP 优势：

- smaller form factor；
- wafer-level parallel processing reduces cost/time；
- shorter interconnect improves electrical performance；
- wafer-level test/burn-in can reduce downstream cost；
- useful for portable products。

WLP 挑战：

- I/O count limited by chip area and ball pitch；
- small solder joints face fatigue/reliability issue；
- PWB routing must support fine pitch；
- thermal and mechanical stress become important。

## 题型模板

### 题型：Why is WLP cheaper than wire bonding?

1. WLP processes many dies in parallel at wafer level。
2. It reduces individual die handling and separate package assembly steps。
3. It shortens interconnects and package size, saving material and board area。
4. Wafer-level testing can detect defects earlier。
5. Limitation: fine pitch, I/O count and solder fatigue must be controlled。

### 题型：Compare CSP, flip-chip and WLP

- CSP：package size close to chip size；重点是外形尺寸。
- Flip-chip：interconnection method using solder bumps and face-down die；重点是连接方式。
- WLP：wafer-level manufacturing flow；重点是工艺阶段。

三者可以重叠，但不是同一个分类维度。

## 易错点

- CSP、flip-chip、WLP 不要混成一个概念。
- SiP 不等于落后；它在 heterogeneous integration 和快速开发上有优势。
- WLP 的优势和限制都要写，尤其是 pitch/I/O/reliability。

## 本章概览

System-level integration 的问题是：一个复杂产品往往不适合全部做成单一 SoC。不同功能可能需要不同 process technology，例如 logic、memory、RF、MEMS、optical、passives。SiP/SoP/WLP/CSP 等技术就是把这些功能在 package 层面组织起来。

### 零基础先览

- **SoC**：把系统功能尽量做在一颗 chip 上。
- **SiP**：把多颗 die / passive / MEMS / RF 等放进一个 package。
- **SoP**：把 package 当成系统集成平台，可能集成 passive、RF、optical。
- **CSP**：package size close to chip size。
- **WLP**：在 wafer level 完成封装流程。

## SoC / SiP / SoP 的层次关系

SoC 和 SiP 不是简单替代关系，而是两种 system integration strategy。SoC 把复杂性放在 silicon design；SiP 把复杂性放在 package integration；SoP 则进一步把 package 作为更完整的 system platform。

## SiP 的典型优势

| 优势 | 解释 |
|---|---|
| Heterogeneous integration | 不同 process 的 dies 可组合，例如 CMOS + memory + RF + MEMS |
| Shorter development time | 可复用 known good dies，不必重做 full custom SoC |
| Lower risk | 单个 die 出问题不一定影响整个 system design |
| Flexible upgrade | 可替换某个 component 更新系统 |
| Compact module | 比 board-level discrete assembly 更小 |

## SiP 的挑战

- thermal management：多个 heat sources 在小 package 内；
- interconnect design：package-level routing 和 signal integrity；
- test：known good die、package-level test；
- reliability：多个 die、underfill、interposer、solder interfaces；
- assembly yield：components 越多，整体良率越难控制。

## WLP 深入理解

WLP 的关键不是“很小”，而是 manufacturing flow：在 wafer 尚未切割前完成 redistribution、bumping、passivation、test 等步骤。它的成本优势来自 parallel processing。

### WLP advantage

1. Many dies processed simultaneously at wafer level。
2. Reduced individual package handling。
3. Smaller form factor and shorter interconnect。
4. Lower package and test cost for suitable products。
5. Good for portable and low-profile electronics。

### WLP limitation

1. I/O count limited by die area and ball pitch。
2. Fine-pitch solder balls face fatigue risk。
3. PWB routing becomes expensive if pitch too small。
4. Underfill/reliability may be required for large die or harsh cycling。

## CSP / Flip-chip / WLP 区分

| Term | 它回答的问题 | 例子 |
|---|---|---|
| CSP | package size relative to chip | package footprint close to die size |
| Flip-chip | die-to-substrate interconnection method | solder bump face-down connection |
| WLP | when/how package is fabricated | wafer-level redistribution and bumping |

它们可以组合：一个 WLP 可以是 CSP 形式，也可能使用 bump interconnect；但三者不是同义词。

## 标准答案：WLP cost/time advantage

> WLP can reduce cost and processing time because packaging steps are performed in parallel on the whole wafer before dicing. This reduces individual die handling, wire bonding and separate package assembly. It also shortens interconnects and reduces package footprint. However, the small package area limits I/O count and ball pitch, and solder joint fatigue and PWB routing become important reliability and cost challenges.

## Self-check

- [ ] SoC/SiP 是否写了 process compatibility？
- [ ] WLP 是否写了 wafer-level parallel processing？
- [ ] CSP/flip-chip/WLP 是否按不同分类维度区分？
- [ ] 是否写了 SiP thermal/test/yield challenge？

## Reference

- Lecture 8: SoC/SiP/SoP, CSP, WLP, wafer-level burn-in/test。
- Senior L7 notes: CSP/flip-chip/WLP, WLP cost/time and reliability issues。

## 来源说明

Slides-backed: Lecture 8。Exam-signal: 学长 L7 整理和 practice questions 中 CSP/flip-chip/WLP、SoC/SiP 高频出现。
