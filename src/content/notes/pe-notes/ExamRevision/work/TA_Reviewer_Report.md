---
title: "# TA Reviewer Report"
description: "ExamRevision work artifact"
date: 2025-01-01
category: "课程学习"
docGroup: "power-electronic-notes"
draft: true
---

# TA Reviewer Report

## 总体判定

总体上，`Power_Electronics_Final_Revision.md`、`Exam_Point_Map.md`、`Past_Paper_Analysis.md` 和 `Formula_Registry.md` 已经覆盖了 final_2017、final_2018、feedback、Lecture 13 的主要高频题型，尤其是：

- rectifier / smoothing / SCR phase control；
- MOSFET waveform → loss → thermal；
- Buck-Boost、Boost 的 CCM 计算；
- PWM / SPWM / overmodulation；
- feedback 中反复点名的 RMS、form factor、PIV、half-wave period、thermal ladder、flyback isolation。

作为考前复习笔记，主体结构合格，且 `Power_Electronics_Final_Revision.md` 的章节安排基本符合高分答题路径。不过仍有几处需要在正式使用前修正或加警告：最重要的是 full-wave SCR / controlled rectifier 公式条件不统一，rectifier smoothing 的 conduction-angle 放电时间近似可能被过度泛化，PWM full-bridge/half-bridge 条件需要更醒目地区分，snubber 和 flyback 内容有少量课程外扩展风险。

## Accuracy issues

1. **Full-wave SCR / controlled rectifier average formula 存在不一致风险**
   - `Exam_Point_Map.md` 的 T05 写：`full-wave SCR：V_avg = Vp(1+cosα)/π`。
   - `Formula_Registry.md` 的 F-026 写：`SCR full-wave controlled rectifier average` 为 `$V_{DC}=\dfrac{2\hat V_m}{\pi}\cos\alpha$`，适用条件写成“单相全控桥，连续电流理想近似”。
   - 两者不是同一个物理条件：
     - 对 R load、每半周从 `α` 到 `π` 导通并输出正脉冲的 full-wave phase-controlled rectifier，平均值常写为 `V_m(1+cosα)/π`。
     - 对 fully controlled bridge + continuous current，平均输出可为 `2V_m cosα/π`，且 `α>90°` 时会进入逆变区，和普通 R load discontinuous conduction 不同。
   - 当前 `Power_Electronics_Final_Revision.md` 第 03 章只给 half-wave SCR，避免了正文中直接冲突；但 registry 和 point map 的不一致会误导学生。建议在 `Formula_Registry.md` F-026 明确改名或加一条 separate formula：`Full-wave SCR with R load, discontinuous each half-cycle` vs `fully controlled bridge with continuous current`。

2. **SCR RMS 公式本身正确，但 full-wave RMS 条件没有统一登记**
   - `Exam_Point_Map.md` T05 给 full-wave SCR RMS：`V_rms^2 = Vp^2/(2π)[π-α+0.5 sin(2α)]`，这对应 full-wave R load、两个相同导通半周。
   - `Formula_Registry.md` 只登记了 half-wave SCR RMS F-025，没有登记与 T05 对应的 full-wave R-load RMS。
   - 若学生只看 registry，可能无法处理 full-wave SCR RMS；若只看 point map，则又可能和 F-026 的 continuous-current controlled bridge 混淆。

3. **Rectifier smoothing 的 conduction angle 放电时间公式需要更保守表述**
   - `Power_Electronics_Final_Revision.md` 第 02 章 B 步骤写：`Δt ≈ T_ripple - θ_c/360° T_ripple`。
   - 该式适合作为 past paper 中 conduction angle 已给、且把 charging interval 从一个 ripple period 中扣除的估算，但不是通用精确公式。实际 conduction interval 相对峰值位置可能跨峰值两侧，题目措辞不同会影响放电区间。
   - 建议加一句：“此为 exam approximation；若题图给出 conduction interval 起止点，应按图直接读 discharge time。”否则有把近似公式当通用公式的风险。

4. **MOSFET switching loss 公式需要更强调 `I_D` 的取值来自 switching instant**
   - `Power_Electronics_Final_Revision.md` 第 04 章写 `P_sw≈1/2 V_DS I_D(t_r+t_f)f_s`，并补充分开 turn-on/off 的公式。
   - 高分答案应说明 `I_D` 不是 necessarily `I_avg` 或 `I_rms`，而是 turn-on / turn-off moment 的 switch current，若波形不同要分别用 `I_on`、`I_off`。
   - `Exam_Point_Map.md` T07 已写 `P_sw = f_s V_DS(off)(T_on I_on + T_off I_off)/2`，但正文中“`I_D` 如何取值”仍可更醒目。

5. **Snubber design 中 `R_snub = sqrt(L_stray/C_para)` 可能过度固定**
   - `Formula_Registry.md` F-010 和 `Power_Electronics_Final_Revision.md` 第 06 章写 `R_snub = sqrt(L_stray/C_para)`。
   - 这可能是该课程 homework / slides 的经验公式，但不同 damping criterion 可能用 `C_total` 或带系数的表达式。正文已有“如果题目指定用 total capacitance，则按题意说明”，这是好的；仍建议标成“course/homework approximate design rule”，避免学生把它当通用 snubber design law。

## Missing exam points

1. **2017 Q1(b) power electronic conversion advantages 在正文中存在但不够突出**
   - `Past_Paper_Analysis.md` 已列 2017 Q1(b)：advantages of power electronic conversion。
   - `Power_Electronics_Final_Revision.md` 第 04 章主要讲 ideal/actual switches 和 device selection，第 06 章讲 snubber，第 08 章讲 inverter；但“switching converter vs transformer/linear conversion 的 advantages/disadvantages”没有形成一个明显的高分答题框。
   - 建议补一个短表：efficiency, size/weight, controllability, heat, EMI, complexity, ripple。2018 Q1(c) 也会问 switching converter vs linear regulator。

2. **Back-to-back SCR for AC load 在正文覆盖偏轻**
   - `Exam_Point_Map.md` T18 和 `Past_Paper_Analysis.md` feedback Q1 都提到 back-to-back SCR 必须 antiparallel 且 AC source + load R。
   - `Power_Electronics_Final_Revision.md` 第 03 章末尾只在 Past paper 连接中一句话提到 `back-to-back SCR`。
   - 若 feedback 中这是高频扣分点，建议正文增加一个小框：anti-parallel SCR pair controls both positive and negative half-cycles; one SCR per half-cycle; firing delay measured from each zero crossing。

3. **2017 Q1(d) inductor voltage derivation 可再强调**
   - 第 01 章和第 07 章都包含 `v_L=L di/dt` 和 waveform integration，但 2017 Q1(d) 是“由 current waveform 推 voltage waveform”。
   - 当前更多强调 average/RMS，建议在第 01 章 triangular / saw-tooth waveform 后加一句高分点：slope positive gives positive `v_L`, slope negative gives negative `v_L`, flat current gives `v_L=0` under chosen passive sign convention。

4. **Diode voltage waveform with/without capacitor 的画法可以更具体**
   - `Exam_Point_Map.md` T04 单独列了 PIV / diode voltage waveform with smoothing or without C。
   - `Power_Electronics_Final_Revision.md` 第 02 章有 PIV 步骤，但对 diode voltage waveform 的 polarity、导通时约 `0` 或 `-V_F`、关断时承受 reverse voltage 的 sketch 标签讲得不如 load voltage 具体。
   - final_2017 Q2(b) 明确要 load voltage and diode voltage，建议加一个“diode voltage sketch checklist”。

5. **Lecture 13 worked solutions 的 2018 boost/PWM 对应性已覆盖，但缺少“worked layout”提醒**
   - 第 09 章有 templates，这是优点。
   - 但 high-mark答案通常需要“公式、substitution、units、waveform labels”。第 09 章已有通用步骤，建议在 Example 1/2 的 waveform checklist 明确写 `on-time = DT`, `off-time = (1-D)T`，并标 `T=1/f_s`，以便学生画图得分。

## Formula/notation issues

1. **`V_m` / `Vp` / `\hat V_m` 符号应统一**
   - `Exam_Point_Map.md` 用 `Vp`。
   - `Formula_Registry.md` 和正文多用 `\hat V_m`。
   - 建议统一为 `\hat V_m` 或 `V_p`，并在开头说明是 peak value。否则 rectifier、SCR、PWM 中学生容易把 peak 和 RMS 混用。

2. **`V_DC` 与 `V_o` 的 average / instantaneous 含义需要区分**
   - Rectifier 章节中 `V_DC` 是 average output。
   - DC-DC 章节中 `V_o` 是 steady average output。
   - Inverter 章节中 `v_o` 可能是 instantaneous switching waveform，也可能是 low-frequency component。
   - 建议在第 08 章特别区分 `v_o(t)` switching waveform、`\bar v_o` average、`\hat V_{o1}` fundamental peak、`V_{o1,rms}` fundamental RMS。

3. **Buck-Boost off-state `v_L=-|V_o|` 需要说明 reference direction**
   - `Power_Electronics_Final_Revision.md` 第 07 章写“按常用电感参考方向：`v_L=-|V_o|`”，这是正确且必要。
   - 建议保持这个限定，不要在其他表格中只写 `-V_out` 而不说明 `V_out` 是 signed 还是 magnitude。`Exam_Point_Map.md` T13 的“off: `v_L=-V_out` by chosen polarity”略易混淆，可改成 `v_L=-|V_o|` under the stated inductor polarity。

4. **Thermal notation `R_θ` 与 `θ` 混用可接受，但应统一单位**
   - `Exam_Point_Map.md` 用 `θ_SA`，正文用 `R_{\theta SA}`。
   - 考试中两者都可理解，但复习材料最好在 formula registry 中说明 `θ_SA = R_{θSA}`，单位 `°C/W`。

5. **PWM `f_s` 可能与 switching frequency / carrier frequency混淆**
   - `Formula_Registry.md` F-038 写 `m_f=f_s/f_1`，正文第 08 章也写 `f_s=m_f f_1`。
   - 建议标明这里的 `f_s` 是 carrier/switching frequency，不是 supply frequency；因为前面 rectifier 章节的 `f_line` 和 DC-DC 的 `f_s` 同时出现。

6. **Form factor definition 正确，但可再标注 “average rectified value” 不是 DC average**
   - 正文第 01 章已经写得比较清楚。
   - 建议在第 00 章“必背公式”处也用 `X_{avg,rectified}` 而不只是文字提醒，避免学生只背最前面的公式。

## High-value improvements

1. **为 full-wave SCR 增加“which formula?” 决策框**
   - 建议在 SCR 章或 registry 中增加：
     - half-wave R load: integrate `α → π` over `2π`；
     - full-wave R load rectified output: two identical pulses per cycle, average `V_m(1+cosα)/π`；
     - fully controlled bridge with continuous current: `2V_m cosα/π`。
   - 这是当前最可能造成公式扣分的点。

2. **新增一个 “diagram marks checklist”**
   - 对 final_2017 / final_2018，图题很多：diode voltage waveform、SCR waveform、thermal chain、converter waveforms、PWM comparator。
   - 建议在第 10 章前部加入统一清单：axes, units, peak, zero, period, on/off intervals, polarity, component labels。

3. **把 feedback 原文高频错点做成更醒目的红线**
   - 当前第 10 章已经很好。
   - 还应把以下点提升到更靠前位置：
     - back-to-back SCR anti-parallel；
     - diode voltage waveform polarity；
     - control mechanism vs resultant circuit；
     - input/output current identity for boost and buck-boost。

4. **MOSFET loss 增加 “which current is used where?” 小表**
   - 推荐表格：
     - `I_avg` → source/load average power when voltage is constant；
     - `I_rms` → conduction loss / heating；
     - `I_on`, `I_off` → switching energy；
     - `P_loss`, not `P_load` → thermal。
   - 这对 2017/2018 Q3 是高价值提分点。

5. **Rectifier smoothing 增加 past-paper-specific worked mini example**
   - 2017 half-wave `50 Hz → 20 ms`、2018 full-wave `100 Hz → 10 ms` 是 feedback 高频错点。
   - 正文已有概念和连接，但若加入一行数值模板，会更利于考试直接套用。

6. **PWM 增加 half-bridge vs full-bridge output amplitude warning**
   - 第 08 章已有 half/full bridge 区分。
   - 建议在 Example 4 开头加一句：2017/2018 若题图是 full-bridge，才用 `\hat V_{o1}=m_aV_d`；half-bridge 需要相应减半。这样可避免公式迁移错误。

## Content to compress/remove

1. **Snubber / flyback 章节略偏扩展，可压缩部分非核心细节**
   - `Power_Electronics_Final_Revision.md` 第 06 章的 flyback reflected voltage、leakage spike、RCD clamp 说明正确，但对 final_2017/final_2018 的直接分值可能低于 rectifier、MOSFET、DC-DC、PWM。
   - 建议保留 isolation / buck-boost relation / snubber type distinction，压缩 detailed flyback stress 内容，避免考前记忆负担。

2. **Three-phase inverter six-step 表格模板可能误导**
   - 第 08 章 six-step 表格中多处写“`-V_d 或 0`”“`+V_d 或 0`”，虽然随后提醒按题目 sequence 逐列相减，但表格本身不够确定。
   - 若没有完整 switching sequence，不建议给半确定表格；可改成“method-only”：先列 `v_A,v_B,v_C`，再算 `v_AB,v_BC,v_CA`。这样比背不完整表格更安全。

3. **Formula Registry 中 reverse recovery 相关公式可能不是 final 核心**
   - F-013、F-014 正确，但在 final_2017/final_2018 核心题型中优先级不如 MOSFET loss、thermal、rectifier、SCR、DC-DC、PWM。
   - 可以保留为 secondary formula，但不要在最终复习路线中突出，避免学生误以为是高频大题。

4. **部分 advanced wording 可能超出课程考试需要**
   - 例如 `SOA stress`、`RCD clamp`、`leakage inductance spike`、`magnetising inductance` 都是合理术语，但若正文篇幅过长，可能稀释 high-frequency exam routines。
   - 建议保持为一句解释，不展开推导。

## Pass/fail decision

**Decision: PASS WITH REQUIRED MINOR FIXES BEFORE FINAL USE.**

理由：

- 覆盖度：通过。final_2017、final_2018、feedback、Lecture 13 的核心题型基本齐全。
- 公式准确性：大部分通过；但 full-wave SCR / controlled bridge 公式条件存在明显混淆风险，必须修正或加条件说明。
- 符号与条件：基本通过；需统一 peak/RMS、`V_o` magnitude/sign、PWM full/half bridge、CCM/ideal 条件。
- 幻觉/泛化风险：中等偏低；主要风险来自 snubber/flyback 扩展和 smoothing conduction-angle 近似被当作通用公式。
- 高分导向：总体强；若补充 diagram checklist、which-current table、full-wave SCR decision box，会更接近 TA-approved revision sheet。

最优先修正顺序：

1. 修正 `Formula_Registry.md` F-026 与 `Exam_Point_Map.md` T05 的 full-wave SCR 条件不一致。
2. 在 SCR 章补 full-wave R-load vs fully controlled bridge continuous-current 的公式适用条件。
3. 在 rectifier smoothing 章标明 conduction-angle 放电时间是 exam approximation。
4. 在 MOSFET loss 章补 `I_avg / I_rms / I_on / I_off / P_loss` 用途表。
5. 压缩或降权 snubber/flyback/three-phase 的非核心扩展内容。