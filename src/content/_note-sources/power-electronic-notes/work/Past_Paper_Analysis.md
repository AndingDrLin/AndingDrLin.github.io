# Past Paper Analysis（历年题与反馈拆解）

## 资料范围

- `materials/final_2017.pdf`：标注 Total 100 marks，5 题，每题约 20 marks。
- `materials/final_2018.pdf`：标注 Total 100 marks，Q1 25 marks、Q2 25 marks、Q3 25 marks、Q4 25 marks（Q2 小题编号有跳号但分值连续）。
- `materials/feedback on final exam.docx`：按 Q1-Q4 给 average/std/max 和常见错误，明显对应一次 4×25 marks 结构的 final/mock feedback。
- `slides/Lecture 13  - Revisions.pdf`：past exam worked solutions，覆盖 MOSFET waveform/loss/thermal、buck-boost、boost/PWM 等关键计算套路。

## 2017 final paper（100 marks）

| 题号 | 分值结构 | 知识点 | 解题套路 | 易错点 / 备注 |
|---|---:|---|---|---|
| Q1(a) | 6 | Fully-controllable power switch symbols + ratings/frequency | 画任意三个典型器件符号并比较 power rating / switching frequency；优先准备 MOSFET、IGBT、GTO/BJT | 不要画 SCR 当 fully-controllable；比较必须有“功率等级”和“开关频率”两个维度 |
| Q1(b) | 4 | Advantages of power electronic conversion | 列 switching conversion 相对 transformer/linear conversion 的效率、体积、可控性、调速/调压灵活性 | 只写空泛优点会丢分，需联系 power conversion |
| Q1(c) | 4 | Unpolarized voltage / turn-off snubber | 画 unpolarized RC snubber，解释 turn-off 时限制 `dv/dt`、吸收能量、降低 stress | snubber 类型与 turn-on/current snubber 混淆 |
| Q1(d) | 6 | Inductor current waveform average/RMS + voltage derivation | 对三角/分段电流积分；由 `v_L=L di/dt` 得对应电压；画 axes | 平均/RMS 需按完整周期；电压波形符号取决于电流斜率 |
| Q2(a) | 4 | Half-wave rectifier with capacitor smoothing | `V_AC=10sin(100πt)`，C=20000 μF，R=10Ω，conduction angle 30°；用 discharge time 估 ripple，求 diode PIV | Half-wave 50 Hz period = 20 ms，不是 full-wave 10 ms |
| Q2(b) | 6 | Half-wave diode rectifier without capacitor, diode drop 1 V | 画 load voltage 和 diode voltage，正半周导通时 load≈input-1V，负半周 load=0；标 time scale | 漏标 diode voltage drop / peak values |
| Q2(c) | 15 | SCR replacing diode, α=30° | 解释 half-controllable；解释 pure DC 不适合；画 firing delay waveform；用 half-wave SCR 公式算 average/RMS | 半波 SCR 的积分周期是 `2π`；必须标 α、peak、time axis |
| Q3(a-g) | 25 | MOSFET switched load waveform、loss、thermal | 从 current waveform 读 `D=10/20=0.5`；分段求 `Iavg`、`Irms`；`P_load=V Iavg`；`P_cond=I_rms^2R_DS(on)`；用 switching loss 公式；thermal circuit 串联求 `T_S/T_C/T_J` | Lecture 13 给 worked solution：`Iavg=8.75 A`，`Irms≈12.4 A`，`P_load=437.5 W`，`P_cond≈7.688 W`，`P_sw≈1.125 W`，总损耗≈8.813 W；注意单位 μs/ns |
| Q4(a-g) | 20 | Buck-Boost converter CCM | 12 V/0.5 A from 5 V, 50 kHz, L=100 μH；`D=|Vout|/(Vin+|Vout|)=0.706`；power balance 求 input current；求 `v_L` on/off、`di/dt`、`I_Lavg=Iout/(1-D)`、`Imin/Imax`，画 `iL/iin/vL` | Lecture 13 给 worked solution：`Iin=1.2 A`，`ILavg≈1.7 A`，`ILmax≈2.053 A`，`ILmin≈1.347 A`；易错是忘记输出反相、ΔI 加减半量 |
| Q5(a-b) | 10 | Single-phase PWM inverter | `v_control=ma sin(2πft)`，carrier ±1；忽略高频谐波求 output low-frequency component；解释 square-wave mode benefits/disadvantages | 要区分 PWM 基波与高频 harmonics；square-wave 简单但 harmonics 大、滤波困难 |

## 2018 final paper（100 marks）

| 题号 | 分值结构 | 知识点 | 解题套路 | 易错点 / 备注 |
|---|---:|---|---|---|
| Q1(a) | 5 | Ideal vs actual semiconductor power switches | 对比 `V_on`、leakage、voltage/current rating、switching time/loss、thermal limit | 不要只写“ideal no loss”；要覆盖 rating 和 dynamic behavior |
| Q1(b) | 5 | Switch selection for wind turbine converter | 1 MW、690 V、2 kHz：选择 appropriate fully-controllable device，通常 IGBT 更合适，理由是高功率/高电压/中等频率 | MOSFET fast 但电压/电流能力较低；SCR 不 fully-controllable |
| Q1(c) | 5 | Switching converter vs linear regulator | 比较 efficiency、heat、size、EMI、complexity、ripple | advantages 和 disadvantages 都要写 |
| Q1(d) | 5 | Polarized current / turn-on snubber | 画 polarized L-R 或 turn-on snubber，说明限制 `di/dt`、保护开关 | 与 2017 turn-off voltage snubber 区分 |
| Q1(e) | 5 | RMS + form factor for `V1=10sin(100πt)+10` | `V_rms=sqrt(10^2/2+10^2)=sqrt150≈12.25 V`；form factor 用 RMS / average rectified value；该波形非负，average=10 V，所以 FF≈1.225 | 若波形可能过零，form factor 分母必须取 absolute average；这里 offset 使信号 0-20 V |
| Q2(a) | 5 | Full-wave diode rectifier with smoothing | `V_AC=60sin(100πt)`，conduction angle 30°，R=10Ω，C=15000 μF；估 ripple 和 PIV | Full-wave ripple frequency 100 Hz，放电时间按 10 ms 减 conduction interval |
| Q2(b) | 5 | Full-wave rectifier without capacitor | 画 `|sin|` load voltage 和 diode voltage；计算 full-wave output RMS | Full-wave rectified RMS 等于原 sine RMS（理想时） |
| Q2(e) | 5 | Required smoothing capacitance for ripple ≤1 Vpp | 用 `C ≈ I_load Δt / ΔV`，题中说明 capacitor provides current for each complete cycle of rectified voltage | 先判断 “complete cycle of rectified voltage” 的时间 |
| Q2 SCR(a) | 5 | Half-wave SCR waveform | `V_AC=10sin(100πt)`, α=30°，画从 α 到 π 导通 | 必须标 delay angle 和 time scale |
| Q2 SCR(b) | 5 | Half-wave SCR RMS and load power | 用 half-wave SCR `V_rms`，再 `P=V_rms^2/R` | 不要用 average voltage 求 resistor power |
| Q3 thermal(a-b) | 10 | Thermal circuit | 给 θJC=0.2°C/W、θCS=0.1°C/W、P=60 W、θSA=1°C/W、TA=25°C；画并计算 `T_S/T_C/T_J` | 串联顺序和 °C/W 单位；`T_S=25+60×1=85°C`，`T_C=91°C`，`T_J=103°C` |
| Q3 MOSFET(a-e) | 15 | MOSFET waveform/loss | 由 40 ms period 和 current ramp 读 duty；求 average、power、conduction loss (`RDS=20mΩ`)、switching loss (`Ton=Toff=20ns`) | 波形单位是 ms 而 switching time 是 ns；不要混淆 |
| Q4(a-f) | 16 | Boost converter CCM | 15 V/1 A from 5 V，50 kHz，L=100 μH；`D=1-5/15=2/3`；`Iin=3 A`；on/off `v_L`；`ΔI=Vin D/(Lf)`；求 `Imin/Imax` 并画 | Boost 中 `I_Lavg=I_in`，不是 `I_out`；off-state `v_L=Vin-Vout=-10 V` |
| Q4(g-i) | 9 | Single-phase PWM converter | `Vd=100V`，carrier ±1；(g) `ma=0.5` 求 low-frequency output；(h) `ma >> 1` overmodulation/square-wave benefits/disadvantages；(i) constant `v_control=0.6V` 求 average output | 不要保留高频谐波；constant control 要按 carrier comparison 得 duty/average |

## Feedback document：题型、表现与易错点

| Feedback Q | 指向知识点 | 老师反馈的关键错误 | 复习处理 |
|---|---|---|---|
| Q1 | Average/RMS/form factor；back-to-back SCR；MOSFET pros/cons；thermal；transformer/rectifier/PIV | average current 正确应为 0；form factor 分母要用 absolute current；没有利用 symmetry；双 SCR 必须 antiparallel 且 AC source + load R；phase control 是每半周延迟后导通；80 Vrms 要乘 √2 得 peak；PIV 公式用错 | 最终笔记设置“波形计算红框”和“SCR/PIV checklist” |
| Q2 | Half-wave rectifier with smoothing；diode waveforms；SCR phase control | 半波周期应为 20 ms，不是 10 ms；30° charging time = 30/360×20 ms；SCR 图漏标 10 V peak、x-axis units、30° delay；average/RMS 用 `2π` 周期 | Rectifier 章节单独列 half-wave vs full-wave period 表 |
| Q3 | Buck converter；DC-DC converter selection | 推导 input-output relation 缺步骤；IL max/min 把 `ΔIL` 当作半值加减；需要 isolation 时应选 Flyback，而不是 Buck-Boost | DC-DC 章节每种 converter 固定五步法：D、vL、ΔIL、ILavg、Imin/max |
| Q4 | DC-AC inverters | 画错：题目要 control mechanism/circuit diagram，不是不同 switch state 下的 resultant DC-AC circuit；bipolar/unipolar switching 混淆 | Inverter 章节分开“power circuit”和“control comparison waveforms” |

## Lecture 13 worked solutions：必须吸收的套路

1. **MOSFET waveform/loss/thermal**：Lecture 13 直接示范 2017 Q3：先读 `D=10/20=0.5`，再分段积分求 `Iavg=8.75A`、`Irms≈12.4A`，再算 `P_load=50Iavg`、`P_cond=Irms²RDS`、`P_sw`，最后用 `P_loss=P_cond+P_sw` 走 thermal ladder。
2. **Buck-Boost**：示范 `Vout = D/(1-D) Vin` 的 magnitude 关系，求 `D=0.706`、`Iin=1.2A`、`ILavg≈1.7A`、`ILmax/min≈2.053/1.347A`，并画 switch waveform、inductor voltage、inductor current、input current。
3. **Boost / PWM pages**：后半部分文字抽取较少，但结构与 2018 Q4 对应：boost duty/inductor current/waveform + PWM output calculation。最终笔记应按 2018 Q4 建立 worked template。

## 分值导向的复习优先级

1. **P0：每年稳定出现且分值大**：rectifier/SCR、MOSFET loss+thermal、DC-DC CCM、PWM inverter、average/RMS/form factor。
2. **P1：简答/图示稳定出现**：switch selection、snubber、advantages/disadvantages、heatsink diagram、device symbols。
3. **P2：可能作为扩展**：three-phase inverter、flyback isolation、snubber design homework。
