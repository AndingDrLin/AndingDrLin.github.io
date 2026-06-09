---
title: "第4章 进度、WBS、沟通与风险"
description: "WBS、CPM、communication channels、risk、SWOT 与 conflict 场景复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - project-management
  - risk
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 5
draft: false
---

## 考试要会什么

| 知识点 | 考查形式 | 出现频率 | 说明 |
|---|---|---|---|
| WBS 定义、100% rule、out of scope | 选择 | 高 | 概念判断题 |
| WBS 层级分解与画图 | 简答 / 画图 | 中 | 给场景画树状图 |
| CPM forward/backward pass 计算 | 计算 | 高 | 给活动表，求 critical path 和 float |
| PERT / Three-point estimating | 计算 | 中 | 给 O、M、P 求 E 和标准差 |
| PDM 依赖关系（FS/FF/SS/SF） | 选择 | 低-中 | 辨认依赖类型 |
| Schedule compression（Crashing / Fast Tracking） | 选择 | 中 | 区分两种技术 |
| Communication channels 公式 | 计算 | 高 | n(n-1)/2 及增量计算 |
| Communication methods（push/pull/interactive） | 选择 | 高 | 场景匹配 |
| Risk management 过程链 | 选择 | 高 | 排序 / 识别阶段 |
| Risk response strategies | 选择 / 情景 | 高 | 给场景选策略 |
| SWOT | 选择 | 中 | 识别风险的工具 |
| Conflict management | 情景选择 | 中-高 | 给描述选策略 |

---

## 一句话记忆

> WBS 定 scope，CPM 定工期，沟通用 channels 量化，风险用 strategies 应对。

---

## WBS（Work Breakdown Structure）

### 这是什么

WBS 是对项目总范围的层级化分解——把一个大项目拆成更小、更易管理的部分，直到每个末端节点（work package）可以被估算、分配和监控。

> 类比：写论文前先列大纲，每一章拆成每一节，每一节拆成要写的具体段落。WBS 就是项目的"大纲"。

### 为什么重要

没有 WBS，scope 就是一团模糊的东西。WBS 是后续估算成本、排进度、分配资源的基础。考试中 WBS 的 100% rule 是高频考点。

### 必背判断点

- WBS = **Work Breakdown Structure**，不是 Work Breakdown Statement
- WBS 包含项目 **100%** 的工作（100% rule）
- 任何**不在 WBS 里的工作**都视为 out of scope
- WBS 可以按 deliverables、phases、subsystems 等方式分解

### WBS 分解示例：组织一次旅行

用一个直观场景展示从 Level 0 到 work package 的完整树状分解。

```
Level 0:  组织日本旅行
Level 1:  ├── 交通安排
          ├── 住宿安排
          ├── 行程规划
          └── 预算管理
Level 2:  交通安排
          ├── 订机票
          ├── 办签证
          └── 订当地交通卡
          住宿安排
          ├── 预订酒店
          └── 确认入住信息
          行程规划
          ├── 列出每日景点
          ├── 预约门票
          └── 规划餐饮
          预算管理
          ├── 列总预算
          ├── 记录每笔支出
          └── 核算结余
```

每个最末端节点就是 **work package**——到这个粒度才能开始估算时间和费用。

### 画 WBS 检查清单

| 层级 | 要求 |
|---|---|
| Level 0 | 项目总名称 |
| Level 1 | major deliverables / phases（3--5 个） |
| Level 2+ | work packages |
| 每层 | 完整覆盖 scope（100% rule） |
| WBS 外 | 不在 WBS 里的工作 = out of scope |

**Reference**: Set 1 Q3(a)(iv), Set 2 Q1.12, Set 4 Q1.6, Set 5 Q1.5--1.6

---

## Scope management process chain

这六个过程的顺序是固定的，考试可能考排序或让选"下一步做什么"。

| 过程 | 关键动作 | 高频考点 |
|---|---|---|
| Plan Scope Management | 制定 scope 管理方法 | — |
| Collect Requirements | 收集 stakeholder needs | 与 Define Scope 区分 |
| Define Scope | 形成项目/产品边界 | 输出 project scope statement |
| Create WBS | 层级分解 scope | 100% rule |
| Validate Scope | 客户/发起方确认成果 | 与 Control Scope 区分 |
| Control Scope | 控制 scope creep 与变更 | 变更走流程 |

### 易混淆过程区分

**Collect Requirements vs Define Scope**：Collect Requirements 是"收集各方需求"（做什么调研），Define Scope 是"把需求变成明确的范围边界"（写清楚做什么、不做什么）。前者是输入，后者是加工。

**Validate Scope vs Control Scope**：Validate Scope 是"客户验收成果"（做完了给客户看，客户签字确认），Control Scope 是"防止范围蔓延"（有人要加功能，走变更流程）。一个是验收，一个是管控。

---

## CPM / Critical Path Method

### 这是什么

CPM 是一种进度网络分析技术。它的核心任务是找出 **critical path**——决定项目最短工期的那条路径。搞清楚这条路径，你就知道哪些活动一天都不能拖，哪些活动有余量。

### critical path 定义（PPT 原文）

> Critical path 是项目中活动序列（sequence of activities）的最长路径，决定了项目的最短可能工期（minimum possible project duration）。

关键点：是 **longest path**，不是 shortest path。考试中最常见的陷阱就是把 longest 和 shortest 搞反。

### ES / EF / LS / LF / Float 符号表

| 符号 | 全称 | 含义 |
|---|---|---|
| ES | Early Start | 活动最早开始时间 |
| EF | Early Finish | 活动最早完成时间 |
| LS | Late Start | 活动最晚开始时间 |
| LF | Late Finish | 活动最晚完成时间 |
| Float | Slack | 活动可以延迟而不影响项目总工期的余量 |

**关于起始编号约定**：PPT 中有两种方式——从 0 开始时 $EF = ES + D$，从 1 开始时 $EF = ES + D - 1$。本笔记统一使用**从 0 开始**的约定。

### Float 公式（与 PPT 一致）

$$\text{Total Float} = LF - EF = LS - ES$$

float = 0 的活动就是 **critical activity**。

### 核心判断

- critical path 是 **longest path**，不是 shortest path
- 有多个 critical path 时，项目风险**增加**（因为任何一条出问题都会延期）
- Float = 0 的活动在 critical path 上

---

## Forward pass / Backward pass（完整推导）

这一节用一个完整例子，一步一步展示 forward pass 和 backward pass 的全过程。

### 题目

已知活动依赖和工期如下，求 critical path 和每个活动的 ES/EF/LS/LF/Float。

| 活动 | 工期 | 前置活动 |
|---|---|---|
| A | 3 | 无 |
| B | 5 | 无 |
| C | 4 | A |
| D | 2 | A, B |

### Step 1：画网络依赖图

```
Start ──→ A(3) ──→ C(4) ──→ End
Start ──→ B(5) ──→ D(2) ──→ End
          A(3) ──┘
```

依赖关系：C 依赖 A 完成，D 依赖 A 和 B 都完成。

### Step 2：Forward pass（从前往后算 ES 和 EF）

规则：起点 ES = 0，$EF = ES + D$。如果一个活动有多个前置活动，它的 $ES = \max(\text{所有前置活动的 EF})$。

逐个算：

**A**：前置无 → ES = 0，EF = 0 + 3 = **3**

**B**：前置无 → ES = 0，EF = 0 + 5 = **5**

**C**：前置 A → ES = A 的 EF = 3，EF = 3 + 4 = **7**

**D**：前置 A 和 B → ES = max(A 的 EF, B 的 EF) = max(3, 5) = **5**（取最大的那个），EF = 5 + 2 = **7**

> 易错点：D 有两个前置活动，ES 不是 3 而是 5。因为 D 必须等 A **和** B 都完成才能开始，所以取 max。这是 forward pass 最常见的错误。

### Step 3：Backward pass（从后往前算 LF 和 LS）

规则：终点 LF = 项目总工期（即 forward pass 算出的最大 EF，这里是 7）。$LS = LF - D$。如果一个活动有多个后续活动，它的 $LF = \min(\text{所有后续活动的 LS})$。

逐个算：

**C**：后续无（直接到终点）→ LF = 7，LS = 7 - 4 = **3**

**D**：后续无（直接到终点）→ LF = 7，LS = 7 - 2 = **5**

**A**：后续 C 和 D → LF = min(C 的 LS, D 的 LS) = min(3, 5) = **3**，LS = 3 - 3 = **0**

**B**：后续 D → LF = D 的 LS = 5，LS = 5 - 5 = **0**

> 易错点：A 有两个后续活动，LF 取 min 而不是 max。因为 A 的最晚完成时间不能超过任何一个后续活动最需要它的时刻。

### Step 4：算 Float

| 活动 | duration | ES | EF | LS | LF | Float (LF-EF) | critical? |
|---|---|---|---|---|---|---|---|
| A | 3 | 0 | 3 | 0 | 3 | 0 | 是 |
| B | 5 | 0 | 5 | 0 | 5 | 0 | 是 |
| C | 4 | 3 | 7 | 3 | 7 | 0 | 是 |
| D | 2 | 5 | 7 | 5 | 7 | 0 | 是 |

所有活动 float 都是 0，说明两条路径都是 critical path：
- **A → C**：3 + 4 = 7
- **B → D**：5 + 2 = 7

总工期 = **7**。

> 本例中有两个 critical path，这会增加项目风险——任何一条路径出问题都会导致延期。

### 常见错误速查

| 错误 | 错误写法 | 正确写法 |
|---|---|---|
| Forward pass 取 min | D 的 ES = min(3, 5) = 3 | D 的 ES = max(3, 5) = **5** |
| Backward pass 取 max | A 的 LF = max(3, 5) = 5 | A 的 LF = min(3, 5) = **3** |
| Backward pass 起点忘设 | LF 随便填 | LF = 项目总工期（forward pass 的最大 EF） |
| 并行活动都标 critical | 两条路径都 critical → 必须是 | 只有 float = 0 的活动才标 critical |

**Reference**: Set 1 Q3(b), Set 2 Q2(f)(ii--iii), Set 3 Q2, Set 4 Q4(d), Set 5 Q1.1/Q1.4, Set 6 Q2(a--b)

---

## PDM（Precedence Diagramming Method）

### 这是什么

PDM 是构建进度网络图的技术，也叫 **Activity-on-Node (AON)**——用节点表示活动，用箭头表示依赖关系。这是最常见的网络图画法。

### 四种依赖关系

| 类型 | 含义 | PPT 例子 |
|---|---|---|
| **FS**（Finish-to-Start） | 后续活动必须等前置活动完成后才能开始 | 颁奖典礼要等比赛结束才能开始 |
| **FF**（Finish-to-Finish） | 后续活动必须等前置活动完成后才能完成 | 检查工作要等粉刷全部完成才能结束 |
| **SS**（Start-to-Start） | 后续活动必须等前置活动开始后才能开始 | 开始刷漆可以在开始打底漆后立即进行 |
| **SF**（Start-to-Finish） | 后续活动必须等前置活动开始后才能完成 | 第一班保安的班次要等第二班开始才能结束 |

**FS 最常见，SF 最少见**。考试中如果考到依赖类型辨认，记住这两个极端就行。

### Leads 和 Lags

**Lead（提前量）**：后续活动可以比前置活动完成提前开始的时间。例如 FS 之间设 2 周 lead，后续活动可以在前置活动完成前 2 周就开始。

**Lag（滞后量）**：后续活动比前置活动故意延后的时间。例如 SS 之间设 15 天 lag，后续活动要等前置活动开始后 15 天才能开始。

---

## Three-point estimating（PERT 估算）

### 这是什么

单一估计值不靠谱的时候（"大概 15 周吧"），用三种估计值来算一个更合理的期望值。

三个参数：
- **O**（Optimistic）：最乐观估计
- **M**（Most likely）：最可能估计
- **P**（Pessimistic）：最悲观估计

### 两种分布公式

**三角分布（Triangular Distribution）**：

$$E = \frac{O + M + P}{3}$$

**Beta 分布（PERT 传统公式）**：

$$E = \frac{O + 4M + P}{6}$$

Beta 分布给 M 四倍权重，更偏向最可能值，所以通常和三角分布的结果不一样。

**标准差和方差**：

$$\text{Standard Deviation} = \frac{P - O}{6}$$

### PPT 原题

> John 的项目最可能 15 周，最好情况提前 2 周，最差情况延迟 5 周。

O = 13，M = 15，P = 20

- 三角分布：$E = (13 + 15 + 20) / 3 = 16$
- Beta 分布：$E = (13 + 60 + 20) / 6 = 15.5$
- 标准差：$\sigma = (20 - 13) / 6 = 1.17$

---

## Schedule Compression

当项目工期不够用时，不能缩减 scope（那是范围变更），要用 schedule compression 技术来压缩时间。

| 技术 | 做法 | 代价 | 考试关键词 |
|---|---|---|---|
| **Crashing** | 增加资源（加班、加人）缩短工期 | 成本增加 | "add resources", "extra cost" |
| **Fast Tracking** | 并行执行原本顺序进行的活动 | 风险增加（可能返工） | "parallel", "overlap", "rework risk" |

> Crashing 花钱换时间，Fast Tracking 冒险换时间。考试问"增加成本"选 crashing，问"增加风险"选 fast tracking。

---

## Communication management

### 过程链

三个过程，顺序固定：

1. **Plan Communications Management**（规划怎么沟通）
2. **Manage Communications**（执行沟通）
3. **Monitor Communications**（监控沟通效果）

### Communication methods（PPT 原文用词）

| 类型 | 含义 | PPT 原文列出的典型场景 | 信号词 |
|---|---|---|---|
| **Interactive communication** | 双向实时交流 | meetings, phone calls, instant messaging, some forms of social media, videoconferencing | "discuss", "present", "review with" |
| **Push communication** | 单向发送信息 | letters, memos, reports, emails, faxes, voice mails, blogs, press releases | "send to", "distribute", "publish" |
| **Pull communication** | 接收者主动获取 | web portals, intranet sites, e-learning, lessons learned databases, knowledge repositories | "post to", "available on", "access" |

> 笔记注：PPT 原文未使用 "sender-driven" / "receiver-driven" 这类标签。上面的分类是直觉性归纳，帮助记忆方向性，但考试时以 PPT 原文描述为准。

### 高频会议题

题目描述 meeting 无提前通知、side conversations 多、效率低时：

> **Publish a meeting agenda** 是最标准改善动作

---

## Communication channels

### 公式

$$\text{Channels} = \frac{n(n-1)}{2}$$

### 为什么是这个公式

直觉理解：n 个人中，每个人要跟其他 (n-1) 个人各建一条通道。但 A 到 B 和 B 到 A 是同一条通道，所以总数要除以 2。

举个小例子验证：3 个人 A、B、C 之间有多少条通道？A-B、A-C、B-C，共 3 条。代入公式：3 x 2 / 2 = 3。正确。

**注意：n 包括项目中的所有人，含项目经理（PM）。**

### 题型 1：团队人数变化（PPT 例题 5）

> 6 team members report to 1 PM。总人数 n = 7。

$$\text{Channels} = \frac{7 \times 6}{2} = 21$$

### 题型 2：加人计算增量

> 原来 11 人，新增 1 人变成 12 人。

- 原 channels = 11 x 10 / 2 = 55
- 新 channels = 12 x 11 / 2 = 66
- 新增 = **11**

### 题型 3：加人 + 减人

> 原来 6 人，加 3 人、减 2 人。

- 新团队 = 6 + 3 - 2 = 7
- 原 channels = 6 x 5 / 2 = 15
- 新 channels = 7 x 6 / 2 = 21
- 新增 = **6**

### 陷阱

不要只算"新增成员与旧成员之间的连接数"；题目问的通常是**新旧总 channels 差值**，不是增量连接。

---

## Risk management

### 这是什么

项目风险管理不仅管理 threat（威胁），也包括识别和处理 **opportunities**（机会）。

### 高频最佳表述

> minimizing threats and maximizing opportunities

考试中如果选项写 "only threats"，那就是错的。

### 过程链（7 个过程，按顺序）

1. **Plan Risk Management**（定义怎么管风险）
2. **Identify Risks**（找出所有风险）
3. **Perform Qualitative Risk Analysis**（定性排序，先挑重要的看）
4. **Perform Quantitative Risk Analysis**（定量算数值）
5. **Plan Risk Responses**（制定应对策略）
6. **Implement Risk Responses**（执行策略）
7. **Monitor Risks**（持续监控）

> 考试技巧：题目说"已识别并分类了所有风险"，问下一步做什么？答案是 **Perform Qualitative Risk Analysis**（先定性排序）。

---

## Risk response strategies

### 威胁（Threats）策略——5 种

| 策略 | 含义 | 场景举例 |
|---|---|---|
| **Escalate** | 上报给更高层级管理者处理，适用于超出 PM 权限的情况 | 项目面临公司级政策变更的风险，PM 无权决策，上报给项目发起人 |
| **Avoid** | 消除威胁源头，改变计划以完全规避 | 发现某个技术方案有重大安全隐患，改用成熟方案 |
| **Transfer** | 将影响转嫁给第三方（保险、外包） | 为关键设备购买保险，或把高风险模块外包给专业公司 |
| **Mitigate** | 降低概率或影响程度 | 给存储设备装减振支架，降低楼上振动损坏设备的概率 |
| **Accept** | 不主动处理，发生时再应对 | 小概率的网络中断，接受风险，发生时手动处理 |

### 机会（Opportunities）策略——5 种

| 策略 | 含义 | 场景举例 |
|---|---|---|
| **Escalate** | 上报给更高层级管理者处理 | 发现一个可以拓展到新市场的机会，但需要公司层面决策 |
| **Exploit** | 确保机会一定发生 | 有一个关键技术专家空闲，立刻把他调到项目组确保技术优势 |
| **Share** | 与第三方共享利益 | 和合作伙伴联合开发，各取所需 |
| **Enhance** | 提高概率或影响程度 | 提前做一些准备工作，让"提前交付"这个机会更容易实现 |
| **Accept** | 不主动追求，发生时再利用 | 有机会拿到额外预算，但不去争取，如果来了就用 |

> 样题中主要考查 **threat strategies**；opportunity strategies 需要了解但出现频率较低。

如果题目问"哪一个不属于 risk response planning"，常见错项是 **Identification**，因为那是识别阶段，不是 response strategy。

---

## SWOT

**SWOT** = Strengths, Weaknesses, Opportunities, Threats

### SWOT 的 2x2 结构

|  | 积极因素 | 消极因素 |
|---|---|---|
| **内部因素** | Strengths（优势） | Weaknesses（劣势） |
| **外部因素** | Opportunities（机会） | Threats（威胁） |

SWOT 作为风险识别工具：Strengths 和 Weaknesses 对应 **internal vulnerabilities**（内部条件），Opportunities 和 Threats 对应 **external factors**（外部环境）。SWOT 帮助项目团队从内外两个维度系统地识别可能的风险来源。

### 考法

题目问：

> which technique can be mainly used to identify risks, particularly in assessing external factors and internal vulnerabilities that can impact the project?

答案：**SWOT**

---

## Conflict management（来自 ch03 Project Resource Management）

> 注意：五种冲突管理策略的详细内容来自 ch03 Project Resource Management（Manage Team 部分），不是 ch04。但在样题中常和沟通、团队管理混合出题。

### 五种策略——一句话理解核心逻辑

| 策略 | 一句话核心逻辑 | 场景举例 |
|---|---|---|
| **Avoiding** | 我不想面对，先躲开 | 两个人为一个无关紧要的小细节争吵，PM 选择先搁置 |
| **Accommodating** | 我让步，保关系 | 你有不同方案，但对方坚持，你为了维持团队和谐同意了他的方案 |
| **Compromising** | 各退一步，找中间点 | 两个人争项目截止日期，PM 折中把截止日期延长一点 |
| **Competing** | 我说了算，快速决策 | 紧急情况下 PM 不等讨论，直接拍板决定 |
| **Collaborating** | 双方坐下来一起找最优解 | 两个工程师对架构方案有分歧，PM 安排会议把两种方案的优点合并 |

> 考试技巧：看关键词。"postpone", "hope issue resolves" → Avoiding；"give up own preferred outcome" → Accommodating；"each side gets part of what they want" → Compromising；"use authority", "imposes decision" → Competing；"work together", "adjust scope to satisfy both" → Collaborating。

### Conflict scenario 识别模板

| 策略 | 场景信号词 |
|---|---|
| **Avoid / Withdraw** | postpone discussion, hope issue resolves itself, withdraw from meeting |
| **Accommodate / Smooth** | maintain harmony, give up own preferred outcome, emphasize common ground |
| **Collaborate / Problem Solve** | work together, adjust scope/options to satisfy both sides, open dialogue |
| **Compete / Force** | manager imposes decision under pressure, use authority to settle |
| **Compromise / Reconcile** | each side gets part of what they want, find middle ground |

---

## 高频判断速记

### 一眼要会

- longest path → critical path（Set 1 Q3(b), Set 6 Q2(a)）
- float = 0 → critical activity（Set 2 Q2(f)(ii)）
- break scope into manageable elements → WBS（Set 2 Q1.12）
- team communication channels → n(n-1)/2（Set 3 Q2）
- identifying internal vulnerabilities / external factors → SWOT（Set 4 Q1.6）
- publish agenda → better meeting order（Set 5 Q1.5）
- risk management = minimize threats AND maximize opportunities（Set 4 Q4(d)）

### 高频错项

- critical path = shortest path → 错，是 **longest** path（Set 1 Q3(b)）
- risk management = only threats → 错，也包括 opportunities（Set 4 Q4(d)）
- identification = risk response strategy → 错，那是识别阶段（Set 5 Q1.6）
- WBS excludes some minor work → 错，WBS 包含 100% 工作（Set 2 Q1.12）

---

## 自测区

### Q1（CPM 完整计算）

活动表如下，求 critical path、总工期、活动 B 的 float。

| 活动 | 工期 | 前置活动 |
|---|---|---|
| P | 6 | 无 |
| Q | 4 | 无 |
| R | 3 | P |
| S | 2 | Q |
| T | 5 | R, S |

**参考答案**：

Forward pass：P: ES=0, EF=6。Q: ES=0, EF=4。R: ES=6, EF=9。S: ES=4, EF=6。T: ES=max(9,6)=9, EF=14。

Backward pass：T: LF=14, LS=9。R: LF=9, LS=6。S: LF=9, LS=7。P: LF=6, LS=0。Q: LF=7, LS=3。

Critical path: **P → R → T**，总工期 = **14**。

B 的 float（活动 Q）：LF - EF = 7 - 4 = **3**。

### Q2（Risk response 情景题）

项目关键设备对振动敏感，楼上有时有大型机器运作。以下哪个是 risk **mitigation**？

A. 跟楼上沟通，让他操作前通知你，你提前关机
B. 给设备装减振支架
C. 购买设备保险
D. 不管，祈祷没事

**答案：B**。减振支架降低了振动造成损害的概率/影响，属于 Mitigate。A 是接受 + 监控，C 是 Transfer，D 是 Accept。

### Q3（Communication channels）

一个项目经理带 4 个成员，新阶段加入 2 人，走了 1 人。新旧 channels 差值是多少？

**参考答案**：原 n=5，channels=10。新 n=5+2-1=6，channels=15。差值 = **5**。

### Q4（Three-point estimating）

一个活动最乐观 8 天，最可能 10 天，最悲观 16 天。用 PERT 公式求期望工期和标准差。

**参考答案**：$E = (8 + 40 + 16) / 6 = 10.67$ 天。$\sigma = (16 - 8) / 6 = 1.33$ 天。

### Q5（SWOT）

SWOT 中哪两个字母代表内部因素？

**答案**：S（Strengths）和 W（Weaknesses）。

### Q6（Conflict management）

团队成员 A 和 B 对技术方案有分歧。PM 安排一次讨论会，让双方陈述各自方案的优点，然后合并两种方案的长处形成新方案。这是哪种冲突管理策略？

**答案**：Collaborating（Problem Solving）——双方一起找最优解。
