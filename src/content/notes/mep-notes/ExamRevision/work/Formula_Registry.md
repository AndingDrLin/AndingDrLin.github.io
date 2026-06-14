---
title: "# Formula Registry（公式登记表）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Formula Registry（公式与定量关系）

| ID | 名称 | 公式 / 关系 | 变量 | 适用场景 | 注意 |
|---|---|---|---|---|---|
| F-001 | CTE dimensional change | `ΔL = α L ΔT` | `α` CTE, `L` length, `ΔT` temperature change | 判断热膨胀不匹配 | CTE 常用 ppm/°C，单位要统一 |
| F-002 | Thermal mismatch stress approximation | `σ ≈ E Δα ΔT` | `E` modulus, `Δα` CTE mismatch | 定性估算薄膜/界面热应力 | slides 更强调机制，不一定要求数值 |
| F-003 | Fourier conduction | `Q = kAΔT/L` 或 `q'' = -k dT/dx` | `k` thermal conductivity | solid conduction, TIM, substrate | 热从高温到低温；符号按题意说明 |
| F-004 | Thermal resistance | `R_θ = ΔT/P = L/(kA)` | `P` power, `ΔT` temperature rise | 热阻网络 | 可串并联类比电阻 |
| F-005 | Newton cooling | `Q = hA(T_s - T_f)` | `h` convection coefficient | solid to fluid convection | 自然/强迫对流主要体现在 `h` 不同 |
| F-006 | Radiation heat transfer | `Q = εσAF_{12}(T_1^4 - T_2^4)` | `σ=5.67×10^{-8} W/m^2K^4` | thermal radiation | 必须用 Kelvin，不直接用 °C |
| F-007 | Reliability failure rate | `MTBF ≈ 1/λ` | `λ` failure rate | reliability / MTBF 概念 | 课程多考定义与用途 |
| F-008 | Package parasitics | `R, L, C` cause voltage drop, delay, reflection, crosstalk | interconnect geometry/material | electrical package design | 多数题要求解释，不要求复杂计算 |
| F-009 | WLP pitch / I/O limitation | smaller ball pitch → higher I/O density but reliability/PWB cost challenge | pitch, ball size, board routing | WLP/CSP 比较 | 作为趋势和限制解释 |
