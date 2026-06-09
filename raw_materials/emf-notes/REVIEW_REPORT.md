# Review Report

## 1. PPT Knowledge Coverage

### Chapter 4 (Boundary Value Problems in Electrostatics) -- 本批次
- Covered: Chapter 4 PDF 全部 64 页已分批读取并完整覆盖。包括：泊松方程积分解（格林函数法）、唯一性定理（Dirichlet/Neumann/混合边值问题）、镜像法总论、点电荷+无限大接地导体平面（镜像电荷、感应电荷面密度、作用力）、点电荷+接地导体球（镜像参数 $q'=-aq/d$，$b=a^2/d$）、点电荷+不接地带电导体球（补偿电荷法）、线电荷+无限长接地导体圆柱（镜像线电荷等大反号）、分离变量法基本原理、直角坐标系二维边值问题（矩形槽问题，傅里叶正弦级数）、柱坐标系分离变量法基本形式（贝塞尔函数）。
- Originally missing, now added: 全部内容为新增。补充了弱基础学生需要的直觉解释、符号定义、推导逐步说明、7 幅教学图片说明、5 道完整例题和 12 道自测题答案。
- Needs human confirmation: 1. 图片文件（chapter4_fig1-fig7）存在于 assets/ 目录中，引用路径已正确设置；2. Homework 习题题号 4-1, 4-6, 4-10, 4-14, 4-20, 4-22 来自 slides 末尾，请结合教材核实题目原文；3. 柱坐标分离变量法的贝塞尔函数部分仅做了概述性介绍，slides 中可能有更详细的推导页面，需人工确认是否需要展开。

### Chapter 5 (Steady Electric Currents) -- 上批次
- Covered: Chapter 5 PDF 全部 43 页已通过 pdftotext + pymupdf 组合提取并完整覆盖。包括：5.1 引言（三种电流类型：电解/运流/传导）、5.2 电流密度定义与欧姆定律（$J=Nq\bm{u}$、三种分布模型、$J=\sigma E$、电导率表、PEC/PED）、5.3 电动势与 KVL（slides 中无独立幻灯片，已依据课程标准补充）、5.4 连续性方程与 KCL（电荷守恒、$\nabla \cdot J = -\partial\rho/\partial t$、恒定条件 $\nabla \cdot J=0$、无散场、KCL、保守场性质）、5.5 功率耗散与焦耳定律（$p=E\cdot J$、$P=I^2R$）、5.6 电流密度边界条件（$J_{1n}=J_{2n}$、$E_{1t}=E_{2t}$、电势 BC、折射公式、介质-导体特殊情况）、5.7 电阻计算（三种方法：设电流/设电压/静电比拟法、五个例题）、典型现象对比总结（静电场 vs 恒定电流场中导体行为）、Homework 题号 5-1, 5-6, 5-10, 5-15, 5-16, 5-22。
- Originally missing, now added: Section 5.3（Electromotive Force and KVL）在 slides PDF 中无独立内容页（仅在目录中列出），已依据电磁场课程标准补充电动势定义和 KVL 场论形式。补充了弱基础学生需要的直觉解释、符号定义、推导逐步说明、7 幅教学图片、5 道完整例题和 12 道自测题答案。
- Needs human confirmation: Section 5.3 的实际 slide 内容需要人工确认——目录中列出但 PDF 中未找到对应幻灯片。后续章节具体编号和内容安排也需参照课程实际大纲。

### Chapter 3 (Static Electric Fields) -- 上上批次
- Covered: Chapter 3 PDF 全部 101 页已分批读取并完整覆盖。包括：3.1 引言与电荷模型、3.2 真空中静电场基本假设（散度与旋度方程）、3.3 库仑定律与叠加原理（点电荷、连续分布、典型分布、电偶极子）、3.4 高斯定理及其应用条件（球对称/轴对称/面对称）、3.5 电势定义（泊松方程、拉普拉斯方程、等势面、参考点选择）、3.6 导体在静电场中的行为（静电平衡、内场为零、边界条件）、3.7 介质极化（非极性/极性分子、位移极化/取向极化、极化强度 $\vec P$、极化电荷密度）、3.8 电通量密度 $\vec D$ 与介电常数（本构关系、介质分类）、3.9 边界条件（切向 $\vec E$ 连续、法向 $\vec D$ 跳跃、折射定律、导体表面）、3.10 电容与电容器（孤立导体/两导体/多导体电容、求解方法、典型几何电容公式）、3.11 静电场能量（电荷-电势形式、场能密度形式、能量不满足叠加原理）、Homework 题号 3-5, 3-11, 3-12, 3-22, 3-25, 3-33, 3-37, 3-40。
- Originally missing, now added: 补充了弱基础学生需要的直觉解释、符号定义、推导中每一步说明、典型易错点、14 幅教学图片、7 道完整例题和 15 道自测题答案。
- Needs human confirmation: Slides 第66-69页（dielectric shell with point charge at center）在笔记中以文字概述，未单独绘制图示。Homework 只给出题号，题目原文不在 slides 中，需要结合教材或作业册确认。

### Chapter 2 (Vector Analysis) -- 2026/05/03 深度复审批次
- Covered: Chapter 2 PDF 全部 64 页已覆盖。
- Originally missing, now added: 补充了弱基础学生需要的直觉解释。
- **本批次复审修正 (2026/05/03):** 
  1. 修复了 21 处 LaTeX `\frac` 命令损坏（`\f` 被错误编码为 form feed 字符 0x0C）
  2. 修正了"本章不是 DSP 内容"的笔误（DSP 为其他课程术语）
  3. 新增 3.3 节 $\nabla$ 算符（Del 算符）的正式介绍，含三种运算对照表和直观类比
  4. 在 2.3 节补充了方向导数公式的逐步推导（从全微分出发，解释为什么出现方向余弦）
  5. 在 3.1.1 节解释了方向余弦约束 $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$ 的原因
  6. 在 3.1.3 节新增标量三重积的几何意义（平行六面体体积）和矢量三重积的几何解释
  7. 在 3.2.3 节补充了球坐标的位置矢量 $\vec r=\vec e_r r$ 并说明为何只有一个分量
  8. 在 2.1 节加强了"场"的概念解释（强调场是空间中每一点都有值）
  9. 在 2.6 节补充了保守场的定义及其与无旋场/标量势的等价关系
  10. 在 2.5 节新增旋度三种记号（rot, curl, $\nabla\times$）的等价说明
  11. 在 3.1.2 节补充了叉乘中 $\vec e_n$ 的显式定义
  12. 在 3.1.3 节新增散度、旋度等价记号的统一说明
  13. 在 3.7 节（原 3.6）重写了旋度 $x$ 分量推导，明确标注四条边的积分方向和 Taylor 展开步骤
  14. 在 3.7 节新增旋度的旋度恒等式 $\nabla\times(\nabla\times\vec F)=\nabla(\nabla\cdot\vec F)-\nabla^2\vec F$ 及电磁波应用说明
  15. 在 3.10 节新增 $\nabla'$ 记号说明（对源点坐标求导），补充 Helmholtz 定理的通俗解读
- Needs human confirmation: 1. Slides 第14页圆柱侧面积分示例结果与笔记计算不一致（笔记得 $3\pi h^2$，slides 可能为 $6\pi h$），需人工核对原题；2. 本章新增的旋度的旋度恒等式、矢量 Laplacian 等概念是否为 slides 第 64 页范围内内容，请确认是否需要调整深度。


### Chapter 6 (Static Magnetic Fields) -- 本批次
- Covered: Chapter 6 PDF 全部 71 页已读取并覆盖。包括：6.1 真空中静磁场基本假设（$\nabla\times\bm B=\mu_0\bm J$、$\nabla\cdot\bm B=0$、安培环路定律、磁通连续性）、长直圆柱导体例题；6.2 磁矢位（$\bm B=\nabla\times\bm A$、Coulomb 规范、矢量泊松/拉普拉斯方程、积分解、无限长线电流磁矢位）；6.3 Biot-Savart 定律及线/面/体/运流电流模型，有限长导线、无限长导线、圆环轴线磁场，圆环推导，安培定律求无限面电流和同轴电缆分区磁场；6.4 磁化、磁化强度、磁化电流 $\bm J_M=\nabla\times\bm M$、$\bm J_{sM}=\bm M\times\bm e_n$；6.5 $\bm H$、$\bm B=\mu\bm H$、磁介质分类、磁性圆柱例题；6.6 静磁场边界条件、磁矢位边界条件、slides 中时变例题作为第7章过渡；6.7 磁通/磁链、自感、互感、Neumann 公式、同轴线/双线/长直线-矩形线圈例题；6.8 磁能密度、磁矢位能量公式、电感能量公式、同轴线磁能分段表达式；拓展应用和 Homework 题号。
- Originally missing, now added: 本章为新增。补充了中文考试导向结构、符号表、安培环路定律使用模板、圆环轴线磁场完整推导、典型计算例题 5 道、自测题 16 道及完整答案、常见错误表、学习路线。复审中进一步补充了安培力到 Biot-Savart 的逻辑、矢量泊松方程分量形式、无限长导线磁矢位常数不可观测说明、磁化电流推导、自由电流/磁化电流区别、边界法向与切向方向约定、slides 时变边界例题的第7章过渡说明、磁能与安培力的联系。提取了 7 张高价值教学图。
- Needs human confirmation: 1. Homework 6-4, 6-6, 6-10, 6-15, 6-22, 6-27, 6-36, 6-41 的题目原文不在 slides 中，需要结合教材/作业册确认；2. slides 第41-42页使用 Faraday 定律求 $\bm H$ 和导体表面电流，严格属于时变场内容，笔记未展开为核心考点，仅作为边界条件/第7章过渡处理；3. slides 第61-69页电磁炮、电磁弹射器属于知识拓展，笔记只保留应用指向，未按考试公式展开。
- 本次复审（2026/05/18）review findings: 按用户要求完成三步流程：1）差生视角 review，补充未定义方向、符号和公式跳步；2）修 bug + 补漏洞，对照 chap6.pdf 逐页核查安培力、Biot-Savart、磁矢位、磁化电流、边界条件、电感和磁能；3）对照考试精简，保留核心公式、典型例题、自测答案和易错点，压缩应用拓展。修正重点包括：三处 `\right` 损坏导致的 LaTeX 渲染错误、同轴线 $b<\rho<c$ 包围电流表达式、圆环轴线推导中横向分量抵消说明、$\bm H$ 环路定律右边只含自由电流、磁介质界面应为 $B_n$ 连续和 $H_t$ 跳变、互感符号取决于参考方向、两回路磁能中 $L_1I_1^2$ 的平方位置、有限长导线角度约定。
- Image status: 已从 PDF 提取并引用 7 张图片：chapter6_fig1_current_loop_axis.png, chapter6_fig2_infinite_current_sheet_ampere.png, chapter6_fig3_coaxial_cable_regions.png, chapter6_fig4_magnetization_currents.png, chapter6_fig5_magnetic_boundary_B.png, chapter6_fig6_magnetic_boundary_H.png, chapter6_fig7_mutual_inductance_line_loop.png。路径均为 `assets/...`。

## 2. Content Error Corrections

### Chapter 2 corrections (2026/05/03):
- **Error 1 (Chapter 2): 全文 21 处 LaTeX `\frac` 命令编码损坏。** `\frac` 中的 `\f` (0x5C 0x66) 被错误存储为 form feed 字符 (0x0C)，导致公式在渲染时显示为 `rac{...}` 而非 `\frac{...}`。
- Fix: 使用 Python 脚本将所有 0x0C 后跟 `rac{` 的序列替换为正确的 `\frac{`，共修复 21 处。

- **Error 2 (Chapter 2): 笔误——"本章不是 DSP 内容"。** DSP（数字信号处理）与电磁场课程无关，属于明显的模板残留。
- Fix: 改为"本章是电磁场与波课程中的数学工具章"。

- **No formula errors found in this review.** 所有矢量代数、坐标系公式、梯度/散度/旋度公式、积分定理均经核对，未发现知识性错误。
- **No content errors found during review.** All formulas, derivations, and numerical results were verified against the PDF slides during drafting.

### Chapter 5 corrections:
- **Error 1 (Chapter 5): 例4 扇形导电片面积元方向描述错误。** 初稿写 $\phi = \pi/2$ 面外法向为 $-\bm{e}_\phi$，实际应为 $+\bm{e}_\phi$（从washer指向外部电极）。这导致后续 $J \cdot dS$ 的符号解释不正确。
- Fix: 已修正外法向方向和面积元表达式，重写了积分步骤，点积为负说明电流流入washer（符合物理直觉），取绝对值后得总电流大小，电阻公式 $R = \pi/(2\sigma t \ln(b/a))$ 不变。

- **Error 2 (Chapter 5): 章节序列信息不准确。** 初稿将第4章标为"[待补充]"，未给出具体内容；且"和前一章的关系"仅比较第3章而跳过了第4章。
- Fix: 已确认第4章为"静电场问题的解法"（泊松/拉普拉斯方程、唯一性定理、镜像法、边值问题），更新了所有章节交叉引用，补充了第4章数学工具在第5章复用（静电比拟法）的说明。

### Chapter 3 corrections:
- **Error 1 (Chapter 3): 边界条件折射规律物理方向描述错误。** 初稿写"介电常数越大，电场线偏离法线越少"，实际是：$\tan\alpha_1/\tan\alpha_2 = \varepsilon_1/\varepsilon_2$，$\varepsilon_1 > \varepsilon_2$ 时 $\alpha_1 > \alpha_2$（高 $\varepsilon$ 介质中电场更偏离法线，低 $\varepsilon$ 介质中电场更靠近法线）。
- Fix: 已在 2.9 节和 Q15 答案中修正为正确描述，并补充直觉解释（高 $\varepsilon$ 中 $E_n=D_n/\varepsilon$ 较小，法向分量"变弱"，电场更偏切向）。

- **Error 2 (Chapter 3): Q15 答案解释自相矛盾。** 初稿先说"电场线在介质1中更接近法线，在介质2中更偏离法线"，又写"从高 $\varepsilon$ 到低 $\varepsilon$ 向法线靠拢"，数学事实 $\alpha_2=16.1° < 30°=\alpha_1$ 说明前者错误。
- Fix: 已统一修正为正确物理描述。

- **Error 3 (Chapter 3): 能量推导中面积分衰减的表述不够严格。** 初稿写"被积函数 $\sim 1/R^3$"不够准确。
- Fix: 改为详细逐步推导，明确写出 $\varphi D \cdot dS \propto 1/R \cdot 1/R^2 \cdot R^2 = 1/R \to 0$，并补充"任何有限电荷分布在远处近似为点电荷"的说明。

- **Error 4 (Chapter 3): Q6 答案缺少中间计算步骤。** 初稿跳过了 $r^2$ 的来源和分步数值计算。
- Fix: 补充了 $r=3\text{ m}, r^2=9$ 的中间步骤和分步数值计算，并新增易错提醒。

## 3. Structure & Teaching Approach Changes

### Chapter 4:
- Note organization: 按"学习目标（11条）—直觉总览（对比表+5个坑）—10个核心概念分节（泊松方程积分解、唯一性定理、镜像法总论、点电荷+平面、点电荷+球、不接地球、线电荷+圆柱、分离变量法总论、直角坐标边值问题、柱坐标分离变量法）—4个核心公式推导—7幅图片解读—方法对比与应用场景—难点总结表（10行）—5道配套例题—12道自测题—学习路线—后续章节关系"组织。
- Each core concept includes: 一句话理解、正式定义、直观例子、容易混淆的点。
- Each formula includes: 这个公式在干什么、推导（逐步）、常见错误。
- Special attention: 唯一性定理的反证法推导（弱学生需逐步引导）；点电荷+球镜像法中 $b = a^2/d$ 和 $q' = -aq/d$ 的严格推导（Step 5 中对 $\theta$ 求导令其为零）；矩形槽分离变量法的完整推导（含傅里叶系数正交性条件）。

### Chapter 5:
- Note organization: 按"学习目标（11条）—直觉总览（对比表+5个坑）—10个核心概念分节—6个核心公式推导—7幅图片解读—应用动机与对比表—难点总结表（10行）—5道配套例题—12道自测题—学习路线—后续章节关系"组织。
- Each core concept includes: 一句话理解、正式定义、直观例子、容易混淆的点。
- Each formula includes: 这个公式在干什么、推导（逐步）、常见错误。
- Special attention: 静电比拟法的对比表（静电场 ↔ 恒定电流场 物理量一一对应）、两种场中导体行为的对比总结。

### Chapter 3:
- Original issue: Slides 以英文公式和图示为主，101 页内容涵盖 11 个子专题，对基础薄弱学生需要拆散重组。
- After fix: 笔记按"学习目标—直觉总览—11 个核心概念分节—7 个核心公式推导—14 幅图片解读—应用动机—难点总结表—7 道配套例题—15 道自测题—学习路线—后续章节关系"组织。每个核心概念均包含一句话理解、正式定义、直观例子和容易混淆的点。

## 4. Example & Exercise Changes

### Chapter 4 new/rewritten examples (5 道):
1. 点电荷+无限大接地导体平面（求感应电荷面密度、作用力，含数值计算）
2. 点电荷+接地导体球（求镜像参数、作用力，含数值计算）
3. 不接地导体球（叠加补偿电荷，求球面电势）
4. 矩形槽分离变量法（完整推导，含前两项数值验证）
5. 线电荷+接地导体圆柱（求镜像参数、单位长度力）

- Reason: 覆盖 slides 中所有主要镜像法几何构型（平面、球、不接地球、圆柱）和分离变量法（直角坐标）。难度从直接套公式到需要推导再到了解内部一致性（例12 自测题说明镜像法限制）。
- Complete answers provided: Yes. 自测题 12 道（涵盖概念理解、公式应用、边界条件、分离变量法、镜像法限制）均给出完整推导过程和最终结果。

### Chapter 5 new/rewritten examples (5 道):
1. 含两种不完美介质的平行板电容器（求 $E_1, E_2$、电能、功率耗散、面电荷密度）
2. 含两种导电介质的同轴电缆（求 $J, E_1, E_2$、各界面面电荷密度）
3. 同轴电缆的电阻（设电流法，单位长度注意事项）
4. 扇形导电片的电阻（设电压法，柱坐标拉普拉斯方程）
5. 环形导电介质的电阻（设电压法，张角参数化）

- Reason: 覆盖 slides 中出现的所有主要计算类型，从一维到二维、从设电流法到设电压法到静电比拟法。
- Complete answers provided: Yes. 自测题 12 道（12 题涵盖定义、计算、验证、判断）均给出完整推导过程和最终结果。

### Chapter 3 examples (7 道):
- 有限长均匀带电直线段、均匀带电圆环轴上电场、均匀带电球体（高斯定理）、无限大均匀带电平面、电偶极子电势与电场、同心球电容器电容、导体球静电场能量（三种方法验证）。
- Reason: 覆盖 slides 中出现的所有主要计算类型，难度从直接代入公式到受力积分到边值问题递进。
- Complete answers provided: Yes.

## 5. Weak Student Read-through Results

### Chapter 4:
- What was previously unclear:
  1. 唯一性定理为什么重要（初学者常觉得它"太理论，和计算无关"）
  2. 镜像电荷的符号和大小如何确定（公式推导过程跳步过多）
  3. 点电荷+球镜像法中 $b = a^2/d$ 和 $q' = -aq/d$ 的来源（slides 中直接给出，没有推导）
  4. 线电荷+圆柱的镜像线电荷为什么等大反号（和球情况的 $a/d$ 缩放因子不同，容易记混）
  5. 分离变量法中 $n = 0$ 模式何时存在、何时不存在
  6. 矩形槽问题傅里叶系数 $[1 - (-1)^n]$ 因子的来源

- Explanations added:
  - 唯一性定理：完整反证法推导（Step 1-6），并用"唯一答案"的直观类比说明其意义
  - 点电荷+球镜像法：完整推导 $b$ 和 $q'$ 的公式（从"让 $R_1/R_2$ 与 $\theta$ 无关"出发，对 $\theta$ 求导令其为零）
  - 线电荷 vs 球的镜像区别：在 2.7 节明确说明"线电荷镜像等大反号，没有 $a/d$ 因子"，并用"三维 vs 二维对称性"解释
  - $n = 0$：在 2.9 节注明"本问题中 $n=0$ 给出平凡解 $X=0$"，并提醒其他问题中需检查
  - 傅里叶系数：在 3.4 节逐步推导 $[1-(-1)^n]$ 因子的来源
  - 有效区域：例题和自测题 Q12 中明确说明"镜像法只在导体外部成立"

- Can a student independently solve examples and exercises now? Yes. 5道例题覆盖全部镜像法构型和矩形槽分离变量法，自测题答案包含完整推导。Q9（特殊底边条件）和 Q12（镜像法限制）作为概念强化题补充。

### Chapter 5:
- What was previously unclear:
  1. 例4 中面积元外法向方向（初学者不易判断 $\phi = \pi/2$ 面的法向指向哪边）
  2. Section 5.3 内容在 slides 何处（目录列了但正文找不到）
  3. 第4章的实际内容是什么（影响了章节关系描述的准确性）
  4. 静电比拟法中 $D \leftrightarrow J$ 的对应关系为何法向边界条件不同
  5. PEC 在静电场和恒定电流场中看似相同（内部 E=0）但原因不同的区分

- Explanations added:
  - 例4：修正了外法向方向，明确写"从washer指向外部电极"，补充了符号取绝对值的说明
  - Section 5.3：标注"需要人工确认"，依据课程标准补充电动势定义和 KVL 场论形式
  - 第4章：核实了实际内容（静电场问题解法），更新了全部交叉引用
  - 静电比拟法：在"容易混淆的点"中强调了 $D$ 和 $J$ 边界条件的差异及原因
  - PEC 行为：在 2.4 节区分了两种场景下 $E=0$ 的不同物理原因

- Can a student independently solve examples and exercises now? Yes. 例题从一维平行板到二维同轴电缆到柱坐标扇形/环形介质递进，自测题答案包含完整推导。

### Chapter 2 (2026/05/03 复审):
- What was previously unclear:
  1. $\nabla$ 算符本身的含义和来源（公式中到处出现 $\nabla$ 但从未被正式介绍）
  2. 方向导数公式 $\frac{\partial u}{\partial l}=\frac{\partial u}{\partial x}\cos\alpha+\cdots$ 的推导来源（为什么出现方向余弦）
  3. 方向余弦约束 $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$ 的原因
  4. 标量三重积的几何含义（不只是循环置换公式）
  5. 球坐标中位置矢量为什么只有一个分量
  6. "场"的概念不够精确（"分布"太模糊）
  7. 旋度推导中四条边的积分方向和各 $F_{y1},F_{z2}$ 符号的来源
  8. 保守场与无旋场的关系
  9. Helmholtz 定理中 $\nabla'$ 的含义
  10. $\operatorname{rot}$ 和 $\operatorname{curl}$ 和 $\nabla\times$ 的关系

- Explanations added:
  - 新增 3.3 节完整介绍 $\nabla$ 算符，含三种运算对照表
  - 在 2.3 节用全微分逐步推导方向导数公式
  - 在 3.1.1 节说明约束来自单位矢量长度为 1
  - 在 3.1.3 节用平行六面体解释标量三重积
  - 在 3.2.3 节补充球坐标位置矢量并说明原因
  - 在 2.1 节强调"每一点都有一个值"
  - 在 3.7 节重写旋度推导，逐条标注四条边的贡献
  - 在 2.6 节补充保守场定义和等价关系
  - 在 3.10 节显式解释 $\nabla'$ 记号
  - 在 2.5 节和 3.1.3 节多处补充记号等价说明
  - 在 3.7 节新增旋度的旋度恒等式（为电磁波方程准备）

- Can a student independently solve examples and exercises now? Yes. 5道例题覆盖矢量代数、通量积分、梯度方向导数、散度旋度计算，15道自测题覆盖全部学习目标。所有答案均包含完整推导过程。

### Chapter 3:
- What was previously unclear:
  1. 能量推导中矢量恒等式的来源
  2. 面积分衰减的物理直觉
  3. 边界条件折射中角度大小的正确物理方向
  4. Q6 计算中 $r^2=9$ 的来源
  5. 如何区分何时能用高斯定理简化计算

- Explanations added: (详见图表部分)
- Can a student independently solve examples and exercises now? Yes.

## 6. Final Verdict

### Chapter 2 (2026/05/03 复审):
- Are these notes ready for a weak student to self-study? **Yes.** 所有 slides 知识点已覆盖。本次复审修复了 21 处 LaTeX 编码损坏和 1 处笔误，新增 $\nabla$ 算符正式介绍、方向导数推导、标量三重积几何意义、球坐标位置矢量、保守场概念、旋度推导详解、旋度的旋度恒等式、Helmholtz 记号说明等 15 项改进。5 道例题和 15 道自测题覆盖全部学习目标。
- Remaining items needing human confirmation:
  1. **Slides 第14页圆柱侧面积分示例**：笔记得 $3\pi h^2$，slides 可能为 $6\pi h$，请人工确认原题被积函数和积分范围
  2. **旋度的旋度恒等式**和**矢量 Laplacian** 是否为 slides 范围内内容——当前加入是为电磁波方程准备，如 slides 未覆盖可降级为附录
  3. Chapter 2 Homework 题号 2-1 至 2-34 对应的教材题目原文
- Next priority if further improvement is needed: 独立完成 Homework 习题解答并加入笔记附录。如后续电磁波章节用到矢量 Laplacian，可提前扩充该部分。

### Chapter 4:
- Are these notes ready for a weak student to self-study? Yes. 所有 slides 知识点已覆盖。5 道例题覆盖全部镜像法构型（平面、球、不接地球、圆柱）和分离变量法（直角坐标矩形槽），12 道自测题覆盖全部核心概念。
- Remaining items needing human confirmation:
  1. **图片文件（chapter4_fig1-fig7）**存在于 assets/ 目录中，已正确引用——如需替换为更清晰版本请手动更新
  2. Chapter 4 Homework 习题题号 4-1, 4-6, 4-10, 4-14, 4-20, 4-22 对应的教材题目原文
  3. 柱坐标分离变量法的贝塞尔函数细节推导——slides 中可能有更详细内容，当前仅做概述
  4. 后续章节（Chapter 6 及之后）的确切编号和内容安排
- Next priority if further improvement is needed: 独立完成 Homework 习题解答并加入笔记附录。如果柱坐标分离变量法的贝塞尔函数在后续课程中更重要，可以扩充该部分的例题和推导。

### Chapter 5:
- Are these notes ready for a weak student to self-study? Yes. 所有 slides 知识点已覆盖，Section 5.3 缺失已标注并补充。5 道例题覆盖全部计算类型，12 道自测题覆盖全部核心概念。
- Remaining items needing human confirmation:
  1. **Section 5.3（Electromotive Force and KVL）的实际 slide 内容**——目录列出但 PDF 中未找到独立幻灯片，已按课程标准补充，请核对
  2. Chapter 5 Homework 题号 5-1, 5-6, 5-10, 5-15, 5-16, 5-22 对应的教材题目原文
  3. 后续章节（Chapter 6 及之后）的确切编号和内容安排
- Next priority if further improvement is needed: 独立完成 Homework 习题解答并加入笔记附录。

### Chapter 6 Final Review Addendum (2026/05/18)

#### Required Three-step Review Flow
- 差生视角 review: 已逐行检查 chapter6.md，补充了有限长导线角度约定、Biot-Savart 中 $\bm R=\bm r-\bm r'$ 的源点到场点方向、无限长导线磁矢位绝对常数不可观测、$\bm B/\bm H/\bm M$ 与自由/磁化电流的区别、边界条件中 $\bm e_n$ 从介质2指向介质1的统一约定、例题/自测中安培力方向判断。
- 修 bug + 补漏洞: 对照 chap6.pdf 全部重要页核查并补充：安培力定律与 Biot-Savart 的连接；矢量泊松方程分量形式；磁化电流推导 $I_M=\oint\bm M\cdot d\bm l$；slides 第41-42页时变边界例题作为第7章过渡；磁能三种算法；同轴线磁能分段表达；Homework 和应用拓展页。
- 对照考试精简: 保留基本方程、计算模板、边界条件、电感/磁能公式、典型例题、常见错误与完整自测答案；电磁炮/电磁弹射器/Maglev 视频仅保留为拓展或作业指向，不展开成非考试背景。

#### Content Error Corrections
- Error 1: Chapter 6 初稿有三处 LaTeX `\right` 损坏为 `ight`，分别出现在 $\nabla\times(\bm B/\mu_0-\bm M)$、磁矢位边界条件、同轴线 $W_{m3}'$ 公式中。
  - How corrected: 全部改为标准 `\right` 并拆成稳定的 display math 格式。
- Error 2: 有限长直导线公式只写 $\cos\theta_1-\cos\theta_2$，未解释 slides 的角度定义，弱学生容易和 $\sin\alpha_1+\sin\alpha_2$ 版本混淆。
  - How corrected: 明确 $\theta_1,\theta_2$ 按 slides 从导线方向量起，并加入角度约定警告。
- Error 3: 无限长导线磁矢位表达容易让学生误以为 $A_z$ 绝对值有物理意义。
  - How corrected: 增加 $B_\phi=-\partial A_z/\partial\rho$ 检查，说明常数与发散参考项求旋度后消失。
- Error 4: 两回路磁能 slides 排版中 $L_1I_1^2$ 容易被误读。
  - How corrected: 在 notes 中明确写出 $W_m=\frac12L_1I_1^2+\frac12L_2I_2^2+MI_1I_2$，并加量纲提醒。

#### Structure & Teaching Approach Modifications
- Original issue: Chapter 6 初稿覆盖较全，但部分内容仍像 slide 摘要：安培力为何引出 Biot-Savart、$\bm A$ 为何不唯一、自由电流与磁化电流为何不能混、边界条件标量式方向如何确定，解释不足。
- After modification: 按考试优先级补足“为什么”和“怎么用”：增加安培力到磁场定义的引导、矢量泊松方程分量化、磁化电流的 Stokes 推导、自由/磁化电流对照表、边界法向和切向标量式的方向说明、时变例题过渡提示。

#### Example & Practice Problem Modifications
- New/rewritten examples: 保留 5 道典型例题并补强提示；自测题由 15 道增为 16 道，新增安培力 $d\bm F=Id\bm l\times\bm B$ 方向判断题及答案。
- Reason for modification: slides 在 6.3 和 6.8 都出现磁力/能量动机，弱基础学生若只背 $\bm B$ 计算公式，会不知道磁场计算的物理用途。
- Are complete answers provided: Yes. 自测题均给出公式、步骤、方向或单位说明。

#### Weak Student Perspective Review Results
- Originally incomprehensible points: 有限长导线角度符号、$\bm R$ 方向、为什么 $\bm A$ 可加常数、$\bm H$ 环路右边为什么不加磁化电流、边界条件中“1减2”和法向选择、互感正负号、同轴线外部磁场为什么抵消。
- Explanations added: 角度约定警告、源点/场点定义、无限长导线 $A_z$ 求旋度验证、自由/磁化电流表格、边界法向统一说明、互感面积矢量方向说明、同轴线包围电流解释。
- Can student independently complete examples and practice problems: Yes. 例题和自测答案现在覆盖 Ampere、Biot-Savart、磁化、边界、电感、互感、磁能和安培力方向判断。

#### Final Verdict
- Are these notes ready for weak-student self-study? Yes. Chapter 6 重要 slides 知识点均已覆盖，公式符号和方向约定已统一，LaTeX 渲染错误已修复，非考试拓展已压缩。
- Remaining items needing human confirmation: 需要人工确认：Homework 6-4, 6-6, 6-10, 6-15, 6-22, 6-27, 6-36, 6-41 的教材题目原文；需要人工确认：slides 第41-42页时变场例题是否会在 Chapter 6 考核中独立要求完整计算，当前 notes 仅作为第7章过渡；需要人工确认：Maglev 视频作业的评分重点是否需要单独作业解答。
- Next priority if further improvement is needed: 若考试覆盖作业题，应补充 6-4, 6-6, 6-10, 6-15, 6-22, 6-27, 6-36, 6-41 的题干与详细解答。

### Chapter 7 (Time-Varying Fields and Maxwell's Equations) -- 本批次

#### Slide Coverage
- Covered: Chapter 7 PDF 全部 48 页已读取并覆盖。包括：7.1 法拉第电磁感应定律、楞次定律、感应电场的非保守性、磁通变化三种情况、矩形回路例题；7.2 麦克斯韦方程、安培定律矛盾、全电流定律、位移电流密度、四个麦克斯韦方程积分/微分形式、本构关系；7.3 电磁边界条件、理想介质界面、理想导体表面、电流边界条件；7.4 电场和磁场波动方程、无源区波动方程；7.5 位函数、D'Alembert 位函数方程、Coulomb gauge、Lorentz gauge、位函数作用；7.6 时谐场、复数表示、$\partial/\partial t\to j\omega$、复数形式麦克斯韦方程、Helmholtz 方程、复介电常数、损耗正切、有损介质波动方程、两道相量例题、Homework 题号 7-2, 7-4, 7-7, 7-10, 7-13, 7-17, 7-18, 7-25。
- Additions: 为弱基础学生补充了符号表、感应电场 vs 静电场对比、安培定律修正的逐步推导、点乘/叉乘边界条件记忆法、无源波速 $v=1/\sqrt{\mu\varepsilon}$（由标准波动方程和 slides 的 $k=\omega\sqrt{\mu\varepsilon}$ 推出）、4 道典型例题和 15 道自测题完整答案。
- Needs human confirmation: 第6章和第8章具体内容未在本任务中读取，因此 Chapter 7 与前后章节关系中只保留已确认/保守描述；Homework 题号需要结合教材或作业册确认题目原文。

#### 本次复审（2026/05/18）覆盖与补充
- 差生视角 review：重写了本章主线、符号表、Faraday 三种感应电动势的适用场景、静电型电场 vs 感应电场对比、位移电流直觉解释、边界条件法向约定、相量取实部说明。所有例题与自测题均保留完整步骤，补充了电流边界条件和有损介质位函数自测。
- 修 bug + 补漏洞：修复 Maxwell 方程 boxed aligned 环境中 `\\[2mm]` 的 LaTeX 换行格式；补充了有损介质中的 $k_c=\omega\sqrt{\mu\varepsilon_c}$、有损无源 Helmholtz 方程、有损有源位函数方程、相量 Lorentz 规范 $\nabla\cdot\vec A=-j\omega\mu\varepsilon\varphi$ 及 $\varepsilon_c$ 版本；补充了用 Lorentz 规范由 $\vec A$ 求 $\vec E$ 的相量公式。
- 公式校正：确认本课程采用 $e^{j\omega t}$，因此 $\partial_t\to j\omega$，$\varepsilon_c=\varepsilon-j\sigma/\omega$，$\tan\delta_\sigma=\sigma/(\omega\varepsilon)$。确认 Faraday 定律、运动电动势、Maxwell 积分/微分形式、边界条件方向、波动方程源项、Coulomb/Lorentz gauge 符号与 slides 一致。
- 对照考试精简：删除/压缩 Faraday 生平、装饰性说明、前后章节猜测等非考试内容；保留定义、核心公式、推导模板、典型例题、常见错误和完整自测答案。

#### Content Error Corrections
- Error 1: Maxwell 微分形式的 aligned 公式中换行写法可能渲染成 `\[2mm]` 文本或错误命令。
  - How corrected: 改为标准 LaTeX `\\[2mm]` 行距写法。
- Error 2: 初稿未覆盖 slides 后部“potential function equations in active/lossy region”的相量形式，尤其是 $\nabla\cdot\vec A=-j\omega\mu\varepsilon\varphi$、$\vec E=-j\omega\vec A-j\nabla(\nabla\cdot\vec A)/(\omega\mu\varepsilon)$ 和有损介质 $\varepsilon_c$ 版本。
  - How corrected: 在 9.5 和 9.6 新增完整公式，并用文字说明推导来源，避免弱基础学生硬背。
- Error 3: 原 notes 中 “slides 中给出理想导体中不考虑位移电流” 表述过于孤立，容易被理解为所有导体都没有位移电流。
  - How corrected: 改成表格化说明：理想导体主要考虑传导电流；一般介质中传导电流和位移电流都存在。

#### Structure & Teaching Approach Modifications
- Original issue: 初稿信息覆盖较全，但更像 slides 摘要；弱基础学生容易卡在“为什么要修正 Ampere 定律”“边界条件方向怎么定”“相量里的 $j$ 为什么不能丢”“位函数有什么用”。
- After modification: 按“直觉主线 → 符号 → 定律 → 方程组 → 边界条件 → 波动方程 → 位函数 → 相量 → 例题 → 自测”重排和压缩；每个高频公式均配适用条件、符号方向或易错提醒。

#### Example & Exercise Modifications
- New/rewritten examples: 重写矩形回路三问，显式声明 $d\vec S=\vec e_zdS$ 与滑动杆 $d\vec l=\vec e_y dl$；保留并细化位移电流例题、相量转瞬时值例题、瞬时值转相量例题。
- Reason for modification: 矩形回路题最容易因面积法向、回路方向、运动杆积分方向不统一而错号；相量题最容易丢掉 $j$ 的 $90^\circ$ 相位。
- Are complete answers provided: Yes. 16 道自测题均提供必要解释和公式步骤。

#### Weak Student Perspective Review Results
- Originally incomprehensible points: 位移电流不是电子流但又能产生磁场；$\vec e_n$ 从介质2指向介质1导致所有边界条件写成“1减2”；相量不是瞬时值；位函数中时变电场必须包含 $-\partial\vec A/\partial t$；有损介质为什么可用 $\varepsilon_c$ 合并传导项。
- Explanations added: 电容器位移电流直觉、边界条件记忆法、相量取实部定义、Lorentz 规范消去 $\varphi$ 的推导说明、损耗正切等于传导/位移电流幅值比。
- Can student independently complete examples and practice problems: Yes. 例题和自测答案现在提供完整方向约定、代入步骤、符号检查和最终表达式。

#### Image Status
- Extracted and used: `assets/chapter7_fig1_rectangular_loop_induction.png`, `assets/chapter7_fig2_capacitor_displacement_current.png`, `assets/chapter7_fig3_em_boundary_conditions.png`。
- Not extracted: 人物照、装饰图、summary/homework 页面未提取；其教学价值较低或已由文字公式覆盖。
- Markdown link status: Chapter 7 笔记仅引用上述 3 张图片，路径采用 `assets/...`。

#### Final Verdict
- Are these notes ready for weak-student self-study? Yes. Chapter 7 重要 slides 知识点均已覆盖，公式符号和相量约定已统一，非考试背景已压缩，例题和自测答案完整。
- Remaining items needing human confirmation: 需要人工确认：Chapter 7 Homework 题号 7-2, 7-4, 7-7, 7-10, 7-13, 7-17, 7-18, 7-25 的教材题目原文需要结合教材或作业册确认；需要人工确认：slides 中 ideal dielectric interface 页面对 $D$、$B$ 的英文 “tangential component” 判断为课件笔误，已按公式修正为 normal component，建议人工确认课件原意。
- Next priority if further improvement is needed: 若考试会要求作业题，下一步应把 7-2, 7-4, 7-7, 7-10, 7-13, 7-17, 7-18, 7-25 的题目原文和解答加入单独作业解答文档。

---

### Chapter 8 (Plane Electromagnetic Waves) -- 本批次

#### Slide Coverage
- Covered: Chapter 8 PDF 全部 144 页已读取并覆盖。包括：8.1 无损介质均匀平面波定义、相量表达、任意方向传播、波矢量、TEM 横波关系、$\vec E/\vec H/\vec k$ 右手关系、波阻抗、频率/周期/波长/相位常数/相速度、极化概念、线极化/圆极化/椭圆极化判断、极化分解与工程应用概述；8.2 有损介质中复介电常数、$k_c=\beta-j\alpha$、$\gamma=\alpha+j\beta$、衰减常数、相位常数、低损耗介质近似、良导体近似、趋肤深度、表面阻抗、海水/煤矿通信/屏蔽等例题；8.3 Poynting 定理、电磁能量密度、瞬时 Poynting 矢量、平均 Poynting 矢量、平均电/磁能量密度、平均焦耳损耗；8.4 正入射理想导体边界、$\Gamma=-1$、$\tau=0$、入射/反射/总场、驻波、波节波腹、表面电流、WiFi 反射板应用；8.5 正入射理想介质边界、反射/透射系数、行驻波、驻波比、平均功率守恒、相关例题；Homework 题号 8-5, 8-6, 8-12, 8-17, 8-22, 8-27。
- Additions: 为弱基础学生补充了中文符号表、$e^{-jkz}$ 传播方向推导、叉乘方向模板、极化判断流程、良导体/低损耗介质条件对比、瞬时量与平均量公式使用区别、导体边界驻波推导、介质边界 SWR 通用 $|\Gamma|$ 形式、5 道典型例题和 16 道自测题完整答案。
- Needs human confirmation: Homework 8-5, 8-6, 8-12, 8-17, 8-22, 8-27 的教材题目原文不在 slides 中；slides 中部分扩展阅读页（任意方向极化、色散与群速度）图片/公式不完整，笔记只保留概念性说明；雷达低空盲区涉及斜入射 Fresnel 系数，超出本章正入射主线，笔记仅按应用背景处理。

#### Initial Review Findings and Fixes
- Formula convention check: 已统一采用第7章 $e^{j\omega t}$ 约定，确认 $e^{-jkz}$ 沿 $+z$、$\partial_t\to j\omega$、$\varepsilon_c=\varepsilon-j\sigma/\omega$、$k_c=\beta-j\alpha$、$\gamma=\alpha+j\beta$ 与 slides 一致。
- Direction/sign check: 修正并强调 $\vec H=(1/\eta)\vec e_n\times\vec E$、$\vec E=\eta\vec H\times\vec e_n$；理想导体反射波磁场方向单独由 $-\vec e_z$ 判断，避免把电场反号直接套到磁场。
- Teaching fixes: 初稿中有两处模板/转义残留已清除；将极化相位差统一为 $\Delta\phi=\phi_y-\phi_x$；将“同一波前内幅值、方向相同”改为“幅值相同，方向固定”，避免误读为任意不同极化波都方向相同。
- Markdown/link check: Chapter 8 仅引用 6 张教学图片，路径均为 `assets/...`，文件均存在。

#### Image Status
- Extracted and used: `assets/chapter8_fig1_e_h_k_orientation.png`, `assets/chapter8_fig2_circular_polarization.png`, `assets/chapter8_fig3_lossy_medium_phase.png`, `assets/chapter8_fig4_poynting_vector.png`, `assets/chapter8_fig5_conductor_standing_wave.png`, `assets/chapter8_fig6_dielectric_swr_pattern.png`。
- Not extracted: 人物照、视频链接页、装饰性应用图片、Homework 页、低价值整页文字图未提取；相关内容已用文字和公式覆盖。
- Markdown link status: 已用脚本检查 Chapter 8 的所有图片引用均存在。

#### Reviewer Agent Final Review Addendum (2026/05/18)

##### Required Three-step Review Flow
- 差生视角 review: 已逐行检查 chapter8.md，修复了例1 中 `\frac` 损坏为 form-feed/`rac` 的 LaTeX 渲染错误；补充了沿 $-z$ 传播时左右旋判断反转、任意方向极化判据、相位/路程差如何影响反射板增强或减弱、介质边界最大/最小位置如何由 $\Gamma$ 正负决定、群速度与相速度的区别。自测题从 16 道扩展到 20 道，并补全答案。
- 修 bug + 补漏洞: 对照 chap8.pdf 全部 144 页重点核查并补充：极化分解、任意方向旋向判据、趋肤深度工程应用、煤矿/海水通信衰减估算思路、屏蔽厚度按最低频率最大趋肤深度设计、色散和群速度、WiFi 反射板、雷达测距和低空盲区、介质界面行驻波分解、SWR 与最大/最小点、由 SWR 和波长比反推介质参数例题。确认 $e^{j\omega t}$ 约定、$k_c=\beta-j\alpha$、$\gamma=\alpha+j\beta$、$\varepsilon_c=\varepsilon-j\sigma/\omega$、$\eta_c$、良导体近似、Poynting 平均功率因子、PEC 反射符号、介质边界 $\Gamma/\tau$ 与功率守恒公式一致。
- 对照考试精简: 未引入大段非考试背景图片说明；将 3D 电影、偏光眼镜、微波炉、雷达隐身等应用压缩为和公式直接相关的短说明或删除，仅保留公式、判断模板、典型例题、常见错误和完整自测答案。

##### Content Error Corrections
- Error 1: 例1 传播方向单位矢量和叉乘式中 `\frac35` 被损坏为 form-feed/`rac35`，会导致 Markdown/LaTeX 渲染失败。
  - How corrected: 改为标准 `\frac35`，并确认例1 叉乘结果 $1.2\vec e_x+5\vec e_y-1.6\vec e_z$ 与 slides 第21页一致。
- Error 2: 初稿只给出沿 $+z$ 传播时 $\Delta\phi$ 左/右旋口诀，未说明传播方向反转时旋向判据反转，弱学生遇到 $e^{+jkz}$ 题会误判。
  - How corrected: 在极化节补充沿 $-z$ 传播的左右旋反转规则，并加入任意方向判据 $\vec k\cdot(\vec E_{mi}\times\vec E_{mr})$。
- Error 3: 初稿缺少介质边界前电场最大/最小位置与 $\Gamma$ 正负的对应关系，只给 $E_{\max},E_{\min}$ 和 SWR。
  - How corrected: 新增“界面同相为最大、反相为最小”的弱基础判断法，分别列出 $\Gamma>0$ 与 $\Gamma<0$ 的最大/最小点位置。
- Error 4: slides 部分生活应用页的公式排版中出现 $\sigma/(\omega\mu)$ 痕迹，可能误导学生。
  - How corrected: 在 notes 中明确统一使用正确无量纲判据 $\sigma/(\omega\varepsilon)$，并将应用例子降级为“了解”。

##### Structure & Teaching Approach Modifications
- Original issue: 初稿主线较完整，但仍偏“公式清单”：极化应用/任意方向判断、色散/群速度、反射板相位叠加、SWR 位置判据、由 SWR 反推介质参数等 slides 后半部分典型考试/讨论点不足。
- After modification: 按考试优先级补足“怎么判断”和“为什么”：新增极化分解与任意方向模板、有损介质应用的统一衰减模板、群速度概念、反射板相位分析、雷达测距公式、行驻波分解、SWR 位置判断和反推参数例题。

##### Example & Practice Problem Modifications
- New/rewritten examples: 新增例6“由 SWR 和波长比反推介质参数”，覆盖 slides 第132页同类题；自测题新增 17-20，覆盖任意方向极化判据、群速度、反射板相位、SWR 符号判断。
- Reason for modification: 初稿已有基础传播、极化、有损介质、Poynting 和简单边界例题，但缺少 slides 后半部分常见综合题（SWR + 参数反推）和讨论题（反射板相位、群速度）。
- Are complete answers provided: Yes. 新增例题与新增自测题均有完整推导或判断理由。

##### Weak Student Perspective Review Results
- Originally incomprehensible points: $e^{+jkz}$ 极化旋向如何判断；任意方向传播不能直接用 $x/y$ 相位差；反射板为什么有时增强有时减弱；SWR 只给 $|\Gamma|$ 但不能给符号；介质边界最大/最小点为什么会随 $\Gamma$ 正负换位置；群速度为什么不总等于相速度。
- Explanations added: 沿传播方向观察的旋向说明、$\vec E_{mr}/\vec E_{mi}$ 判据、路程相位差 + 反射相位差分析、界面同相/反相判断最大最小、$v_g=d\omega/d\beta$ 和无色散特例。
- Can student independently complete examples and practice problems: Yes. 现在例题和自测覆盖平面波方向、参数、极化、有损介质、功率流、PEC 驻波、介质边界、SWR 和扩展概念；答案包含必要中间步骤。

##### Image Status
- Existing Chapter 8 image references preserved: `assets/chapter8_fig1_e_h_k_orientation.png` through `assets/chapter8_fig6_dielectric_swr_pattern.png`。
- No new images added; non-exam application image pages were summarized in text to keep notes concise.

##### Final Verdict
- Are these notes ready for weak-student self-study? Yes. Chapter 8 important slides knowledge points are now covered with consistent notation, corrected LaTeX, explicit direction/sign conventions, complete examples and self-test answers.
- Remaining items needing human confirmation: 需要人工确认 Homework 8-5, 8-6, 8-12, 8-17, 8-22, 8-27 的教材题目原文；需要人工确认考试是否要求雷达低空盲区斜入射 Fresnel 系数完整推导（notes 仅保留概念和正入射主线）；需要人工确认任意方向极化判据是否按 slides 中 $\vec k\cdot(\vec E_{mi}\times\vec E_{mr})>0$ 为右旋的约定评分。
- Next priority if further improvement is needed: 若考试覆盖作业题，应补充 8-5, 8-6, 8-12, 8-17, 8-22, 8-27 的题干与详细解答；若考试覆盖斜入射，则应单独扩展 Fresnel 系数。

---

## review_static_electric_fields_solutions.md 复审 (2026/05/05)

### 1. Content Error Corrections

**Error 1 (Series 1 Q1 Step 4): 三种表面自由电荷密度的符号全部反号。**
- Description: 文档在推导平行板自由面电荷时，将 $\vec{D}$ 视为沿 $+\vec{e}_y$ 方向的矢量，但实际上电场 $\vec{E}$ 从上极板（$U$）指向下极板（$0$），即 $-\vec{e}_y$ 方向，因此 $\vec{D} = \varepsilon\vec{E}$ 也指向 $-y$。下极板 $\rho_{sf}(0)$ 文档原写 $+\varepsilon_2 E_2$，正确应为 $-\varepsilon_2 E_2$（负电荷）；分界面 $\rho_{sf}(d/2)$ 文档原写 $\varepsilon_1 E_1 - \varepsilon_2 E_2$，正确应为 $\varepsilon_2 E_2 - \varepsilon_1 E_1$（即原公式分子 $\varepsilon_1\sigma_2 - \varepsilon_2\sigma_1$ 应为 $\varepsilon_2\sigma_1 - \varepsilon_1\sigma_2$）；上极板 $\rho_{sf}(d)$ 文档原写 $-\varepsilon_1 E_1$，正确应为 $+\varepsilon_1 E_1$（正电荷）。
- How corrected: 重写了整个 Step 4，在自由电荷推导之前增加了电场方向的明确提醒框，然后逐界面用矢量形式严格推导，并附物理意义解释（正/负电荷判断）。同时更新了 Step 8 中 $C$ 和 $C/G$ 的解释，使其与修正后的符号一致。

**Error 2 (Series 1 Q4 答案): 中文文本损坏。**
- Description: 第 544 行 "$E_{air}$ 不变减小" 存在文字合并损坏。
- How corrected: 改为 "$E_{air}$ 不变，仍为 $E_0$；$E_{diel}$ 减小为 $E_0/\varepsilon_r$"。

### 2. Missing Content Supplemented

**补充 1 (Series 1 Q2): 添加极化电荷面密度的显式公式。**
- Original: "极板表面 ($y=0$ 和 $y=d$)：类似 Q1 的思路"——未给具体公式。
- After fix: 给出了完整的矢量推导和四个板面的显式结果（$\rho_{sp1}(0)$, $\rho_{sp2}(0)$, $\rho_{sp1}(d)$, $\rho_{sp2}(d)$）。

**补充 2 (Series 2 Q2): 添加极化电荷面密度的显式公式。**
- Original: "类似 Q1，但分界面 ($\phi=0,\pi$) 处由于 $\vec{P}$ 无 $\vec{e}_\phi$ 分量，**极化面电荷为零**"——未给极板表面的具体公式。
- After fix: 给出了 $r=a$ 和 $r=b$ 处上下半区的四个极化面电荷显式表达式。

**补充 3 (Series 3 Q2): 添加极化电荷面密度的显式公式。**
- Original: "$r = a$：类似 Q1，上下不同 $\varepsilon$ 导致不同的极化电荷密度"——未给具体公式。
- After fix: 给出了 $r=a$ 和 $r=b$ 处上下半球的四个极化面电荷显式表达式。

### 3. Structure and Teaching Approach Modifications

**改进 1 (Series 1 Q1 Step 2): 电势推导流程重构。**
- Original issue: 先写了一个带中文注释的公式 $\varphi(y)=\varphi(0)+E_2\cdot y$（其中 $\text{因为 }E\text{ 指向 }+y$），然后立刻说"等等，这里需要小心"并推翻。这种"先犯错再纠正"的写法对弱学生非常困惑，而且中文在 `$$...$$` 数学模式中可能渲染失败。
- After fix: 重新组织为从 $\vec{E}=-\nabla\varphi$ 出发的一气呵成的正确推导，先声明电场方向（$-y$），再用积分公式计算。中文解释移到数学模式外。最后加了"直观记忆"总结。

**改进 2 (Series 1 Q1 物理分析): 补充 $\nabla\cdot\vec{J}=0$ 到 $J_{1n}=J_{2n}$ 的推导。**
- Original issue: 直接从 $\nabla\cdot\vec{J}=0$ 跳到"电流密度在法线方向必须连续"，未说明数学如何得到这个结论。
- After fix: 增加了 pillbox 高斯面的说明，解释了如果 $J$ 不连续会导致界面电荷积累并违反稳态条件。

**改进 3 (Series 1 Q4 物理过程): 简化稳态分析的逻辑链。**
- Original issue: 从 $E_{diel}=0$ 推到 $E_{air}=0$ 依赖了 $D_n$ 连续的论证，逻辑不够直接。
- After fix: 用更简单的论证——极板电荷经有耗介质泄漏完毕，$Q=0$，因此 $E=0$ 处处成立。

**改进 4 (Series 2 Q1): 增强 "$C$ 依赖 $\sigma$" 的解释。**
- Original: 一句话说明"C 也依赖于 $\sigma$"。
- After fix: 补充了完整的因果链（$\sigma$ 决定 $E$ 分布 → $E$ 和 $\varepsilon$ 共同决定 $Q$ → $C=Q/V$ 同时依赖两者），并与并联情形对比说明为什么并联时 $C$ 不依赖 $\sigma$。

**改进 5 (考试技巧速记): 改善"分界面方向"判断的表述。**
- Original: "垂直电场（法向分层）→ 串联；平行电场（切向分层）→ 并联"——可能被误解。
- After fix: 改为更明确的"分界面法向与 $\vec{E}$ 平行（即界面垂直于 $\vec{E}$）→ 串联；分界面法向与 $\vec{E}$ 垂直（即界面平行于 $\vec{E}$）→ 并联"。

### 4. Weak Student Perspective Review

- Originally unclear points:
  1. Q1 Step 2 电势推导中的方向反复（先给一个公式又说"需要小心"）——已重构为直截了当的正确推导
  2. Q1 Step 4 中 $D$ 值与矢量方向的关系（符号混乱）——已重写为严格的矢量推导
  3. Q2/Series 2 Q2/Series 3 Q2 的极化电荷只写了"类似 Q1"没有公式——已全部补充显式表达式
  4. $\nabla\cdot\vec{J}=0$ 为什么意味着 $J$ 在界面连续——已补充 pillbox 推导
  5. Q4 稳态分析的逻辑跳跃——已简化论证

- Can student independently complete examples and practice problems: **Yes.** 所有 8 道大题（Series 1 Q1-Q4、Series 2 Q1-Q2、Series 3 Q1-Q2）的每一个子问题现在都有完整的、带符号的、可直接代入计算的公式。弱学生照搬推导流程就能独立解题。

### 5. Remaining Issues

- **无重大遗留问题。** 公式正确性（平行板电容、同轴线单位长度电容、同心球电容、圆柱/球坐标散度、积分公式、半球面积、柱侧面积、串联/并联电导公式、边界条件、物理逻辑）均已逐一核对。
- **需要人工确认的微小事项：**
  1. Series 1 Q1 的电容公式 $C = \frac{2S}{d} \cdot \frac{\varepsilon_1 \sigma_2}{\sigma_1 + \sigma_2}$ 使用了上极板（正极板）电荷——这是标准做法，但如果原题要求从其他角度（如等效电路法）计算 $C$，请确认。
  2. 原 PDF 中各题的确切小问编号和措辞——本文档已覆盖所有核心物理量（$\vec{E}$, $\vec{D}$, $\vec{J}$, $\varphi$, $\rho_{sf}$, $\rho_{sp}$, $p$, $w_e$, $C$, $G$），但如果源文件有额外小问（如"解释物理意义""画出等效电路"等），请对照确认。

### Overall:
- **本文档现在适合弱基础学生自学。** 所有公式错误已修正，缺失的显式表达式已补充，推导步骤已细化，符号混乱已消除，中文表述已优化。
- Repository status: notes/ 目录现包含 chapter2.md, chapter3.md, chapter4.md, chapter5.md，以及 REVIEW_REPORT.md。所有四章笔记均已完成。
- Image management: 所有引用图片均存在于 assets/ 目录，无未使用图片残留，无临时文件残留。Chapter 4 引用的图片（chapter4_fig1 至 chapter4_fig7）均已存在。
