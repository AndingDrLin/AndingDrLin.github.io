---
title: "# Exam Point Map（高频考点地图）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Exam Point Map（高频考点地图）

> 复习原则：先掌握 practice/exam 反复出现的问答题，再回到 slides 找定义、图和公式。正式笔记中文解释为主，保留考试题干中的英文术语。

| Topic ID | 优先级 | 高频考点 | 来源 | 考试会怎么问 | 必会结论 / 公式 | 需要图示 | 常见错误 |
|---|---|---|---|---|---|---|---|
| T01 | P0 | Packaging 的功能与多学科属性 | S01, M01, M04 | Explain why systems packaging is multidisciplinary | electrical + mechanical + materials；package 负责 interconnection、power、heat、protection、mechanical support | packaging hierarchy | 只写“保护芯片”，漏 signal/power/thermal/reliability |
| T02 | P0 | Technology waves / evolution | S01, S04, S09, M01 | Trace development across technology waves | Through-hole → SMT → BGA/CSP/flip-chip → 2.5D/3D/SiP/FOWLP | evolution timeline | 只背年代，不写每代优势和 drawback |
| T03 | P0 | Moore's Law for packaging / MLP | S01, M01 | Describe future trends and challenge | chip scaling pushes package I/O density、interconnect length、thermal and cost constraints | package scaling sketch | 把 IC Moore's Law 与 packaging integration 混成一句空话 |
| T04 | P0 | Electrical package design | S02, M01, M05 | What are electrical functions of package? Why high frequency is difficult? | signal path + power/ground path；parasitic R/L/C cause delay, reflection, crosstalk, noise | signal/power path | 只写 wire connection，不写 power distribution/ground/EMI |
| T05 | P0 | Design for reliability / testability | S02, M01, M05 | Define DFR/DFT and why needed | DFR upfront prevents failure; DFT embeds test features and lowers production test cost; MTBF indicates reliability | reliability flow | 把 DFR 写成“做完再测试” |
| T06 | P0 | Environmental reliability | S02, M01 | moisture/temperature/vibration/EMI effects | moisture causes corrosion, delamination, insulation drop; automotive/outdoor need robust package | failure mechanism table | 只列环境因素，不写 failure mechanism |
| T07 | P0 | Packaging materials and functions | S03, M01, M05 | underfill/mold/solder/TIM/substrate 各自作用 | underfill reduces solder strain; TIM provides thermal path; solder interconnects; substrate routes signals/power | material stack | 材料名和作用对不上 |
| T08 | P0 | CTE and material properties | S03, M01, M05 | What is CTE? Why important? | `ΔL=αLΔT`; CTE mismatch causes solder fatigue, delamination, cracking | CTE mismatch diagram | 忘记 CTE 是 reliability 核心，不是纯材料定义 |
| T09 | P0 | Wire bonding / TAB / flip-chip | S03, S09, M01, M05 | compare advantages/disadvantages | wire bonding cheap/flexible but long interconnect; TAB fine pitch automation; flip-chip high I/O/electrical/thermal but process/substrate cost higher | assembly methods | 只写优点，不讨论 cost/equipment/reliability |
| T10 | P0 | Role in microelectronics | S04, M01 | Why packaging controls performance/cost/reliability? | IC must be packaged; package can become speed/cost/reliability bottleneck; SoC vs SiP tradeoff | SoC vs SiP | 把 SoC/SiP 只按“一个芯片/多个芯片”粗分 |
| T11 | P1 | Microsystems and MEMS packaging | S05, M10, M08 | why MEMS packaging is complex | needs environmental interface, hermetic/sealing, mechanical motion, sensing/actuation, reliability | MEMS role sketch | 把 MEMS 当普通 IC 只谈电连接 |
| T12 | P0 | Impact of Si processing | S06, M05, M08 | low-k ILD, die thinning, interposer, TSV effects | low-k reduces parasitic capacitance but is fragile; die thinning lowers package height/thermal resistance but increases stress/handling risk; TSV enables 3D | TSV/interposer sketch | 只背名词，不写 impact on packaging |
| T13 | P0 | Thermal management | S07, M04, M05, M08 | heat transfer modes / board temperature calculation / why thermal management important | `Rθ=ΔT/P`; `Q=kAΔT/L`; `q=hA(Ts-Tf)`; radiation `Q=εσAF(T1^4-T2^4)` | thermal path | 摄氏温度直接代入辐射四次方；面积/单位错误 |
| T14 | P0 | System-level package: SoC / SiP / SoP | S08, S04, M08, M09 | compare SoC and SiP; why use SiP | SoC performance high but design/prototype cost high; SiP integrates known dies, shorter development, heterogeneous | SoC/SiP comparison | 只说 SiP “更差”，漏 flexibility/time-to-market |
| T15 | P0 | CSP / WLP / BGA / 3D package | S08, S09, M01, M08 | compare CSP, flip chip, WLP; why WLP cost/time lower | WLP done at wafer level, small form factor, better electrical path, but I/O/pitch/reliability limited | package family map | 把 CSP、flip-chip、WLP 混成同一种封装 |
| T16 | P0 | Answer templates and common mistakes | M01-M08 | essay / compare / explain with figures | definition → mechanism → consequence → example → limitation | templates | 答案只有概念，没有“why/impact/challenge” |
