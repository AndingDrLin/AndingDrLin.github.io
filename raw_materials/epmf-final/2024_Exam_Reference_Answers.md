# 2024 年《工程项目管理与财务》期末考试参考答案

> 考试时间：2024 年 4 月 | 总分：100 分

---

## Part I: Multiple Choice Questions（Q1-Q10）

### Q1. Which of the following is NOT TRUE about Management?

**参考答案：A. The process of influencing a group towards the achievement of goals.**

**解题思路：** "The process of influencing a group towards the achievement of goals" 是 **Leadership** 的定义，不是 Management。Management 的核心是 planning、budgeting、organizing 和 controlling（D 选项正确描述了 Management）。B 描述了管理的一般特征（通过他人努力完成事情）；C 中 "motivating and inspiring" 更偏 Leadership，但 "establishing direction, aligning people" 也是 Management 的一部分。A 最明确地将 Leadership 定义套用到 Management 上，是 NOT TRUE 的。

---

### Q2. Which of the following is NOT TRUE about Work Breakdown Structure?

**参考答案：E. All of the above**

**解题思路：** A. WBS 定义和组织项目的全部范围——正确；B. 不在 WBS 中的工作视为项目范围之外——正确（100% Rule）；C. WBS 代表当前批准的项目范围说明书中规定的工作——正确；D. WBS 是面向交付物的项目元素分组——正确。所有 A-D 都是关于 WBS 的正确描述，没有一个是 NOT TRUE 的。在这种题型中，E "All of the above" 意味着"以上所有都不是不正确的"，即所有陈述都是正确的，因此没有 NOT TRUE 的选项。选 E 表示命题人认为以上所有陈述均为正确。

（注：此题型在考试中较为特殊，选 E 表示"A-D 全部为真，没有 NOT TRUE 的"。）

---

### Q3. _____________ represent external and internal vulnerabilities that can impact a project.

**参考答案：A. Strengths and weaknesses**

**解题思路：** SWOT 分析中，**Strengths（优势）和 Weaknesses（劣势）** 代表内部因素（internal vulnerabilities）。Opportunities（机会）和 Threats（威胁）代表外部因素。题目问的是 "external and internal vulnerabilities"——虽然措辞包含 "external"，但在 SWOT 的上下文中，Strengths 和 Weaknesses 是组织内部的优势和弱点，是 SWOT 中代表内部因素的配对。

（注：此题措辞略有歧义。如果严格理解 "external and internal vulnerabilities"，可能指所有四项。但根据课程 PPT 明确区分，Strengths and Weaknesses = internal factors，因此选 A。）

---

### Q4. Which of the following is true about Project Life Cycle?

**参考答案：E. All of the above**

**解题思路：** A. 项目生命周期通常遵循可预测的模式——正确；B. 不确定性在开始时最高——正确；C. 风险在开始时最高——正确；D. 利益相关者对项目的影响力在开始时最大——正确。以上四项均为项目生命周期的正确特征描述。

---

### Q5. The characteristics of qualitative risk analysis include all of the following EXCEPT?

**参考答案：C. Risk responses are developed.**

**解题思路：** Risk responses（风险应对策略）是在 **Plan Risk Responses** 阶段制定的，不属于 Qualitative Risk Analysis（定性风险分析）的特征。定性风险分析包括：按来源或影响分类（A）、使用专家判断（B）、使用主观评估（D）、假设检验（E）。C 是后续阶段的活动。

---

### Q6. A construction project has two sequential tasks A and B. What does this indicate?

**参考答案：E. All of the above**

**解题思路：** 已知 A: ES=0, EF=2, LS=0, LF=2; B: ES=2, EF=5, LS=2, LF=5。

- A 的 Float = LS - ES = 0 - 0 = 0 → A 是 critical activity（A 正确）
- B 的 Float = LS - ES = 2 - 2 = 0 → B 是 critical activity（B 正确）
- 两者都是 critical → both tasks are critical（C 正确）
- 两个 critical 活动构成唯一的关键路径 → project has no float（D 正确）

因此 E（All of the above）正确。

---

### Q7. Activity network calculation - project duration and float of activity D

**参考答案：Project duration = 25 days, total float = 8, free float = 8**

**解题思路：** 根据前向和后向推算结果，项目总工期为 25 天。

Activity D：ES = 6, EF = 8, LS = 14, LF = 16, Duration = 2

$$\text{Total Float} = LF - EF = 16 - 8 = 8$$

$$\text{Free Float} = \min(\text{successor ES}) - EF$$

如果 D 的后续活动的最早开始时间 ≥ 16，则 Free Float = 16 - 8 = 8。在此题中 Free Float = Total Float = 8，说明 D 的延迟不会影响任何后续活动。

---

### Q8. Taguchi loss function calculation

**参考答案：**

已知：Target = 200Ω, Tolerance = ±15Ω, k = 0.12

10 个电阻测量值：195, 200, 210, 198, 194, 202, 188, 201, 196, 199 Ω

**计算每个电阻的 Taguchi loss：**

$$L(y) = 0.12(y - 200)^2$$

| 测量值 y | 偏差 (y-200) | 偏差² | Loss |
|---:|---:|---:|---:|
| 195 | -5 | 25 | 3.00 |
| 200 | 0 | 0 | 0.00 |
| 210 | 10 | 100 | 12.00 |
| 198 | -2 | 4 | 0.48 |
| 194 | -6 | 36 | 4.32 |
| 202 | 2 | 4 | 0.48 |
| 188 | -12 | 144 | 17.28 |
| 201 | 1 | 1 | 0.12 |
| 196 | -4 | 16 | 1.92 |
| 199 | -1 | 1 | 0.12 |

$$\text{Total Loss} = 3.00 + 0.00 + 12.00 + 0.48 + 4.32 + 0.48 + 17.28 + 0.12 + 1.92 + 0.12 = 39.72$$

$$\text{Average Loss} = \frac{39.72}{10} = 3.972$$

**答案：** 平均 Taguchi loss ≈ **3.972**

**验证：** 注意 188Ω 偏差为 12Ω（接近公差边界 ±15Ω），其单点 loss 高达 17.28，占总损失的 43.5%——这体现了 Taguchi loss 的二次特性，偏离越大损失急剧增加。

**评分要点：**
- 正确写出 loss 公式（1 分）
- 逐点计算正确（3 分）
- 正确计算平均 loss（1 分）

---

### Q9. Which of the following is/are true about a control chart?

**参考答案：D. All of the above**

**解题思路：** A. 控制图用于研究过程随时间的变化——正确；B. 控制图是按时间顺序绘制数据的图，包含中心线（均值）、UCL 和 LCL——正确，这是控制图的标准定义；C. 控制图用于监控和控制产品质量——正确。所有陈述都正确描述了控制图的特征和用途。

---

### Q10. Which of the following is/are NOT DFM principles?

**参考答案：C and E（Sales and distribution strategy, Advertising strategy）**

**解题思路：** DFM 的六条原则是：Simplicity（A）、Standardization（B）、Tolerance、Material Selection、Automation、Process Integration（D）。Sales and distribution strategy（C）和 Advertising strategy（E）都不属于 DFM 原则——它们属于市场营销和商业策略范畴，与产品设计和制造无关。

---

## Part II: Short Answer Questions（Q11-Q17，选做 4 题）

### Q11. What is DFM? What are the main benefits of implementing DFM?

**参考答案：**

**DFM 定义：** Design for Manufacturing (DFM) 是一种设计方法论，其核心是设计高质量的产品组件以实现低成本制造（designing components of high-quality products for ease of manufacturing at a lower cost）。DFM 通过降低复杂度、优化性能和重新定义产品来实现这一目标。

DFM 的关键时机是 **initial design 阶段**，因为 70%-80% 的生产成本在设计阶段就被设计决策锁定。越早将制造可行性纳入设计考量，变更成本越低，影响力越大。

**DFM 的主要好处（7 项）：**

1. **Lower Manufacturing Costs（降低制造成本）：** 通过减少零件数量、使用标准件和合理公差，直接降低材料和加工成本。

2. **Improved Production Efficiency（提高生产效率）：** 简化装配流程，减少制造步骤，缩短生产周期时间。

3. **Improved Product Quality（提高产品质量）：** 设计阶段就考虑可制造性，减少了生产过程中的缺陷和变异来源。

4. **Streamlined Product Development Process（简化产品开发流程）：** 减少设计迭代次数，避免"画得出但造不出"的问题，加速产品上市。

5. **Better Supply Chain Management（优化供应链管理）：** 使用标准件和通用材料，降低供应链复杂度和采购风险。

6. **Enhanced Competitiveness（增强竞争力）：** 更低的成本和更短的上市时间增强市场竞争力。

7. **Compliance with Regulations（符合法规要求）：** 在设计阶段就考虑法规合规性，避免后期修改。

**评分要点：**
- 正确定义 DFM（3 分）
- 列出并解释至少 4 个好处（7 分）

---

### Q12. Taguchi's three types of loss functions

**参考答案：**

图中所示为 Taguchi 质量损失函数的三种类型。

**基本概念：** Taguchi 认为产品质量的衡量不应仅限于"是否在公差范围内"。任何偏离目标值（target value）的偏差都会造成质量损失，且偏差越大，损失呈二次方增长。损失函数的一般形式为：

$$L(y) = k(y - m)^2$$

其中 $y$ 为观测值，$m$ 为目标值，$k$ 为质量损失系数（$k = A_0 / \Delta_0^2$，$A_0$ 为超出公差时的维修成本，$\Delta_0$ 为公差距离）。

**三种类型：**

| 类型 | 目标 | 公式 | 示例 |
|---|---|---|---|
| **Nominal-the-best（望目特性）** | 越接近某个特定目标值越好 | $L(y) = k(y - m)^2$ | 电阻 100Ω、电压 10V、轴径 20mm |
| **Smaller-the-better（望小特性）** | 越小越好，目标为零 | $L(y) = ky^2$ | 污染排放量、泄漏电流、响应时间 |
| **Larger-the-better（望大特性）** | 越大越好，目标为无穷大 | $L(y) = k(1/y^2)$ | 效率、功率放大倍数、材料强度 |

**Nominal-the-best 示例：** 某设备目标输出 10V，超出 10 ± 0.5V 时维修成本 $2。$k = 2/0.5^2 = 8$。若实测 9.7V，损失 $L = 8 \times (9.7-10)^2 = 0.72$。

**Smaller-the-better 示例：** 某化工厂的废水排放目标为零。实测排放量为 3mg/L，$k=5$，则 $L = 5 \times 3^2 = 45$。

**Larger-the-better 示例：** 某太阳能电池效率越高越好。实测效率 18%，$k=100$，则 $L = 100 \times (1/0.18^2) = 100/0.0324 = 3,086$（注意单位和 k 值需根据实际场景确定）。

**注意：** 选项中如果出现 "Target-the-zero"，这是错误项——课程中不存在这种类型。

**评分要点：**
- 正确描述 Taguchi 质量损失概念（2 分）
- 列出三种类型及公式（4 分）
- 给出示例（4 分）

---

### Q13. Key features of the organizational chart (Matrix/Team-Based structure)

**参考答案：**

图中所示为一种 **Matrix / Team-Based Organizational Structure（矩阵型/团队型组织结构）**，展示了一个 CAD/CAE 系统级仿真组（System-Level Simulation Group），下设多个功能团队（Functional Teams 1, 2, 3），每个团队包含不同专业成员。

**关键特征：**

1. **跨职能团队构成：** 每个功能团队包含 Mechanical Design（机械设计）、Analysis（分析）和 Electronics Embedded SW（电子嵌入式软件）三种不同专业的成员，打破了传统职能部门的壁垒。

2. **双重汇报关系：** 团队成员既向功能团队负责人汇报（项目维度），又可能向各自专业部门的经理汇报（职能维度），形成矩阵管理。

3. **以系统为中心的组织方式：** 组织围绕"系统级仿真"这一目标功能组建，而非按单一技术专业划分。这有助于保证系统级的集成和验证质量。

4. **资源共享与灵活调配：** 不同功能团队中的相同专业人员可以跨团队共享知识和资源，根据项目需求灵活调配。

5. **并行工程支持：** 跨职能团队的设置使得不同专业的工作可以并行开展，缩短开发周期。

**评分要点：**
- 正确识别组织结构类型（2 分）
- 描述至少 4 个特征（8 分）

---

### Q14. Organizational structure appropriateness for project management

**参考答案：**

**判断：** 该结构**基本适合**该项目的项目管理需求，但有一些需要改进的地方。

**适合的原因：**

1. **跨职能协作：** 项目涉及机械设计、分析和电子嵌入式软件多个专业，矩阵/团队型结构天然支持跨职能协作，避免了纯职能结构中的信息孤岛问题。

2. **系统级整合：** 组织围绕"System-Level Simulation"组建，有利于在设计早期发现跨专业的接口问题和集成风险。

3. **资源共享：** 相同专业的人员可以跨功能团队共享最佳实践和专业知识，提高整体技术能力。

**改进建议：**

1. **明确汇报关系：** 应清晰定义每个成员在项目维度和职能维度上的汇报关系和权重，避免命令冲突。建议明确哪个方向的汇报权重更大（strong matrix vs balanced matrix vs weak matrix）。

2. **增加项目管理协调角色：** 在多个功能团队之上设立一个项目管理协调者（Project Coordinator 或 PM），负责跨团队的进度协调、资源冲突解决和整体风险管理。

3. **建立跨团队沟通机制：** 定期举行跨功能团队的技术评审和进度同步会议，确保各团队的工作在系统层面保持一致。

4. **明确接口管理：** 对于不同功能团队之间的技术接口（如机械设计与电子软件之间的接口），应指定明确的接口负责人和验证流程。

**评分要点：**
- 明确判断适合/不适合（2 分）
- 给出 2-3 个适合的理由（4 分）
- 给出 2-3 个改进建议（4 分）

---

### Q15. P&L analysis and strategies to increase operating profit

**参考答案：**

**已知数据：**
- Sales = $1,000
- Materials = $50
- Salaries = $500
- Admin = $100
- Rent = $50
- Marketing = $50
- EBITDA = $300
- Depreciation = $50
- Amortization = $25
- EBIT = $225
- Interest expense = $25
- Net Profit = $200
- Capital Employed = $15,000
- Number of Employees = 100

**Q15(i). Operating Profit (EBIT) 计算和公式讨论：**

EBIT（Earnings Before Interest and Tax，经营利润）的两种等价计算方式：

**方法一：从收入自上而下计算**
$$\text{EBIT} = \text{Sales} - \text{Cost of Sales} - \text{Operating Expenses}$$

其中：
- Cost of Sales = Materials = $50
- Operating Expenses = Salaries + Admin + Rent + Marketing = 500 + 100 + 50 + 50 = $700

$$\text{EBIT} = 1{,}000 - 50 - 700 = \$250$$

**方法二：从 EBITDA 自上而下计算**
$$\text{EBIT} = \text{EBITDA} - \text{Depreciation} - \text{Amortization} = 300 - 50 - 25 = \$225$$

（注：两种方法理论上应相等。此处 EBIT = $225 为题目给定数据，可能存在题目数据中未列出的其他成本项。考试中以题目给定的 EBIT = $225 为准。）

**EBIT 的含义：** EBIT 反映公司在扣除利息和税款之前的经营利润，衡量的是核心业务的盈利能力，不受融资方式和税率的影响。

**Q15(ii). 提高经营利润的策略：**

**a) Improve Profitability（提高利润率）：**

提高利润率意味着增加每单位销售额中的利润比例。具体策略：

- **提高售价：** 如果产品有差异化优势，可以适度提价。前提是价格弹性分析显示提价不会导致销量大幅下降。
- **降低材料成本：** 通过供应商谈判、批量采购或替代材料降低 Materials cost（当前仅 $50，占比较小）。
- **优化产品组合：** 增加高利润率产品的销售占比，减少低利润率产品。
- **降低运营费用：** 优化管理效率，减少不必要的 Admin 和 Marketing 开支。

**b) Improve Productivity（提高生产力）：**

提高生产力意味着用相同的投入创造更多产出。具体策略：

- **自动化生产：** 投资自动化设备，减少人工依赖，降低 Salaries 支出（当前 $500，是最大成本项）。
- **流程优化：** 消除生产流程中的浪费和瓶颈，提高单位时间产出。
- **员工培训：** 提升员工技能，减少错误率和返工率。
- **技术升级：** 用技术手段替代重复性劳动，让员工专注于更高价值的工作。

**关键指标：**
- ROCE（Return on Capital Employed）= EBIT / Capital Employed = 225 / 15,000 = **1.5%**（偏低，有提升空间）
- Profit per Employee = Net Profit / Employees = 200 / 100 = **$2/人**（极低，说明人工成本占比过大，提高生产力是关键）

**评分要点：**
- 正确讨论 EBIT 公式和计算（3 分）
- 正确分析两种提高利润的策略（7 分）

---

### Q16. Portfolio Management process figure

**参考答案：**

图中所示为 **Portfolio Management（项目组合管理）** 过程框架。

**描述：** 该图展示了从组织战略目标（Strategic Goals & Objectives）出发，经过项目评估和优先级排序（Prioritized Projects），将项目组织到 Programs（项目集）、Subsidiary Portfolios（子组合）和 Operations（运营）中，并通过 Portfolio Reports 向高层报告绩效的完整流程。

**关键特征：**

1. **战略驱动的项目选择：** 所有项目的筛选和优先级排序都以战略目标为导向。不是"有什么做什么"，而是"做什么最符合战略"。

2. **Portfolio 层级管理：** Portfolio 包含 Programs、Subsidiary Portfolios 和 Operations 三种类型的管理元素，形成从战略到执行的完整层级。

3. **绩效反馈循环：** Portfolio Reports 提供定期的组合绩效数据，支持高层做出调整决策（如终止低价值项目、增加高优先级项目的资源投入）。

4. **资源优化：** 在多个项目和项目集之间协调有限资源，最大化整体投资回报。

5. **风险平衡：** 组合层面管理可以平衡高风险创新项目和低风险稳定项目的风险暴露。

**评分要点：**
- 正确识别为 Portfolio Management（2 分）
- 描述关键特征（8 分）

---

### Q17. Compare and contrast three project management structures

**参考答案：**

项目管理的三种基本组织结构是：**Functional（职能型）**、**Matrix（矩阵型）** 和 **Projectized（项目型）**。

| 维度 | Functional | Matrix | Projectized |
|---|---|---|---|
| **PM 权力** | 很小或没有 | 小到中等 | 很大到全权 |
| **资源可用性** | 很少 | 小到中等 | 很多到几乎全部 |
| **预算控制者** | Functional Manager | 混合 | Project Manager |
| **PM 角色** | 兼职 | 兼职或全职 | 全职 |
| **行政人员** | 兼职 | 兼职 | 全职 |

**Functional Structure（职能型）：**

- **特征：** 员工按专业分组（如工程部、市场部），由职能经理统一管理。PM 角色有限，职能经理掌控资源和决策权。
- **优势：** 专业深度强，同类专业人员集中便于知识分享和技术提升；职业发展路径清晰。
- **劣势：** 跨部门协作困难，项目优先级容易被职能日常工作挤占；对客户需求响应慢。

**Matrix Structure（矩阵型）：**

- **特征：** 员工同时向职能经理和项目经理汇报。分为 Weak Matrix（职能经理权力大）、Balanced Matrix（双方平衡）和 Strong Matrix（PM 权力大）。
- **优势：** 资源可在多项目间共享；跨职能协作比职能型好；灵活性较高。
- **劣势：** 双重汇报导致权责不清；管理复杂度高；容易产生冲突。

**Projectized Structure（项目型）：**

- **特征：** PM 对项目有全权控制，团队成员全职投入项目。职能经理的角色很弱或不存在。
- **优势：** 决策快速，PM 控制力强；团队忠诚度高；对项目需求响应快。
- **劣势：** 项目结束后团队解散，资源利用率可能不高；专业人员分散在各项目中，知识共享困难；项目间资源重复配置。

**选择建议：**
- 项目少且技术深度要求高 → Functional
- 多项目并行且资源共享需求大 → Matrix
- 项目重要性高、需要快速响应 → Projectized

**评分要点：**
- 正确描述三种结构（4 分）
- 对比特征和优缺点（4 分）
- 给出选择建议（2 分）

---

## Part III: Calculation Questions（Q18-Q21）

### Q18. Project Management Process Groups for an international music festival

**参考答案：**

**Initiating（启动）：**
- 明确音乐节的目标和愿景（如举办一场为期 3 天的国际音乐节，吸引 50,000 名观众）
- 识别关键利益相关者（演出方、赞助商、场地管理方、政府审批部门、安保公司）
- 制定项目章程（Project Charter），明确项目范围、预算框架和主要里程碑
- 任命项目经理

**Planning（规划）：**
- 制定详细的 WBS：场地布置、演出安排、票务系统、安保方案、餐饮服务、交通安排、营销推广等
- 编制进度计划：确定各活动的先后顺序和工期，使用 CPM 识别关键路径
- 制定预算：场地租赁、艺人费用、设备租赁、安保、保险、营销等各项成本估算
- 风险管理计划：识别天气风险、安保风险、演出取消风险、票务系统故障等，制定应对策略
- 沟通计划：与演出方、赞助商、政府部门的沟通频率和方式

**Executing（执行）：**
- 签订演出合同、场地租赁合同
- 启动营销推广活动（社交媒体、票务平台）
- 场地搭建和设备安装
- 安保人员和志愿者的招募与培训
- 协调各供应商和演出方的物流安排
- 管理利益相关者期望

**Monitoring & Controlling（监控）：**
- 跟踪售票进度（是否达到预期销售目标）
- 监控预算执行情况（是否超支）
- 跟踪场地搭建进度是否按计划进行
- 管理变更请求（如演出阵容调整、场地变更）
- 监控安全合规情况

**Closing（收尾）：**
- 音乐节结束后场地清理和设备归还
- 与供应商完成财务结算
- 获得赞助商和演出方的正式确认
- 收集观众反馈
- 编写项目总结报告，记录经验教训（Lessons Learned）
- 归档所有合同、财务记录和项目文档

**评分要点：**
- 每个过程组 1 分（共 5 分），描述需结合音乐节具体场景

---

### Q19. Communication channels calculation

**参考答案：**

**已知条件：**
- 项目工作人员：25 人
- 风险管理部门：5 人
- 其中 2 人既在风险管理部门又参与项目活动（重叠人员）

**Q19(i). PM 召集项目人员和风险管理部门一起开会的总沟通渠道数。**

总参与人数需要避免重复计算。25 个项目人员中已包含 2 个风险管理部门成员，因此：

$$n = 25 + 5 - 2 = 28 \text{ 人}$$

$$\text{Channels} = \frac{28 \times 27}{2} = 378$$

**答案：** 总沟通渠道数 = **378**

**Q19(ii). 先单独与风险管理部门开会，再与项目人员开会。**

**第一次会议：** PM 与风险管理部门 5 人开会。

$$n_1 = 5 + 1(\text{PM}) = 6 \text{ 人}$$

$$\text{Channels}_1 = \frac{6 \times 5}{2} = 15$$

**第二次会议：** PM 与项目工作人员 25 人开会。

$$n_2 = 25 + 1(\text{PM}) = 26 \text{ 人}$$

$$\text{Channels}_2 = \frac{26 \times 25}{2} = 325$$

**两次会议沟通渠道总计：** 15 + 325 = **340**

**比较：** 分开开会 (340) < 一起开会 (378)。分开开会减少了 38 条沟通渠道，降低了沟通复杂度。

**评分要点：**
- 正确处理重叠人员（2 分）
- 正确计算 Q19(i) = 378（2 分）
- 正确计算 Q19(ii) = 15 + 325 = 340（3 分）
- 注意是否需要包含 PM（1 分）

（注：如果题目中 n 不含 PM，则 Q19(i) = 25+5-2 = 28 人，channels = 378；Q19(ii) 第一次 = C(5,2) = 10，第二次 = C(25,2) = 300，总计 = 310。具体以题目要求为准。）

---

### Q20. Cp and Cpk analysis

**参考答案：**

**Q20(i). Key features of the two figures.**

**Figure 1：** Cp = 1.0, Cpk = 0.5

- 过程分布宽度刚好等于规格宽度（$C_p = 1.0$ 意味着 $USL - LSL = 6\sigma$）
- 但过程均值严重偏离目标值（$C_{pk} = 0.5$ 远小于 $C_p$），说明偏心是主要问题
- 虽然过程"有潜力"达到规格要求，但由于中心偏移，实际会有较多超出规格的产品

**Figure 2：** Cp = 1.5, Cpk = 1.2

- 过程分布比规格宽度窄（$C_p = 1.5$ 意味着 $USL - LSL = 9\sigma$，有 50% 余量）
- Cpk = 1.2 表示有一定偏心但不严重，过程整体处于 moderate 到 low risk 水平
- 相比 Figure 1，Figure 2 的过程能力显著更好

**关键区别：** Figure 1 的核心问题是偏心（centering），Figure 2 表明较好的中心控制和更窄的过程分布。

---

**Q20(ii). Figure 1 中随机测量超出规格限的概率约为 0.27%，TRUE or FALSE?**

**FALSE。**

0.27% 对应的是 ±3σ 范围外的概率（正态分布 $P(|Z| > 3) = 0.27\%$），这只在过程**居中**时成立。

当 $C_p = 1.0$ 且 $C_{pk} = 0.5$ 时，过程均值已偏移。假设均值偏向 USL 一侧：

由 $C_{pk} = \frac{USL - \mu}{3\sigma} = 0.5$，得 $USL - \mu = 1.5\sigma$

由 $C_p = \frac{USL - LSL}{6\sigma} = 1.0$，得 $USL - LSL = 6\sigma$

因此 $\mu - LSL = 6\sigma - 1.5\sigma = 4.5\sigma$

超出 USL 的概率：$P(Z > 1.5) = 1 - 0.9332 = 6.68\%$

超出 LSL 的概率：$P(Z < -4.5) \approx 0.0003\%$

总超出概率 ≈ **6.68%**，远大于 0.27%。

---

**Q20(iii). Calculate the actual probability of failure for Figure 1.**

如上计算，Figure 1 的实际失败概率约为 **6.68%**。

**这意味着什么：**

1. 过程的偏心问题比看起来严重得多。仅看 $C_p = 1.0$ 会误以为过程"刚好够用"，但 $C_{pk} = 0.5$ 揭示了严重的中心偏移问题。

2. 每生产约 15 个产品就有 1 个可能超出规格限，这对质量要求高的行业是不可接受的。

3. **改进方向：** 首先将过程均值拉回目标值（centering），使 $C_{pk}$ 接近 $C_p$。之后再考虑进一步降低 variation 以提升 $C_p$。

4. **核心教训：** 必须同时看 $C_p$ 和 $C_{pk}$，仅凭一个指标会严重误判过程能力。

**评分要点：**
- 正确描述两个图的特征（4 分）
- 正确判断 FALSE 并计算概率（6 分）
- 正确解释含义和改进方向（5 分）

---

### Q21. CPM network calculation and probability

**参考答案：**

**Q21(i). Forward pass / Backward pass, Float, Critical Path.**

根据题目给出的活动数据进行计算。假设活动及依赖关系如下（以题目网络图为准）：

已知关键数据：Project duration = 25 days

Activity D：ES = 6, EF = 8, LS = 14, LF = 16, Duration = 2, Float = 8

**Forward Pass（正向推算）：**
- 起始活动 ES = 0
- EF = ES + Duration
- 有多个前置活动时，ES = max(所有前置活动的 EF)

**Backward Pass（反向推算）：**
- 终点 LF = Project Duration = 25
- LS = LF - Duration
- 有多个后续活动时，LF = min(所有后续活动的 LS)

**Float 计算：**
$$\text{Total Float} = LF - EF = LS - ES$$

Float = 0 的活动构成 **Critical Path（关键路径）**。

根据 Activity D 的 Float = 8 > 0，可知 D 不在关键路径上。关键路径由 Float = 0 的活动组成。

**答案：** 项目总工期 = **25 天**。Critical Path 上的活动 Float = 0。

---

**Q21(ii). Probability of finishing within 27 days.**

使用 PERT 三估算法：

$$E = \frac{O + 4M + P}{6}$$

$$\sigma = \frac{P - O}{6}$$

项目总期望工期 $T_E$ = 各关键路径活动期望工期之和。

项目标准差 $\sigma_{project}$ = 关键路径上各活动方差之和的平方根：

$$\sigma_{project} = \sqrt{\sum \sigma_i^2}$$

计算 Z 值：

$$Z = \frac{T_S - T_E}{\sigma_{project}} = \frac{27 - T_E}{\sigma_{project}}$$

查正态分布表得到 $P(T < 27)$。

**示例计算（假设 $T_E = 25$, $\sigma_{project} = 2.0$）：**

$$Z = \frac{27 - 25}{2.0} = 1.0$$

$$P(Z < 1.0) = 0.8413 = 84.13\%$$

（注：实际计算需根据题目给出的 O、M、P 值逐项计算。以上为方法演示，具体数值以题目数据为准。）

**评分要点：**
- 正确进行 Forward/Backward pass（5 分）
- 正确计算各活动 Float（3 分）
- 正确识别 Critical Path（2 分）
- 正确使用 PERT 公式计算概率（5 分）
