# 09 Past Paper Worked Examples：高频计算套路

## 用法

本章只整理 past paper 中反复出现的计算模板。考试时不要只写最终答案，要把公式、代入、单位和波形关键数值写出来。

## 通用得分步骤

1. 读题先画简图或波形，标 $T$、$t_{on}$、峰值、单位。
2. 写出适用公式，不要直接跳答案。
3. 分清 average、RMS、peak、peak-to-peak。
4. 损耗题先算 electrical loss，再走 thermal ladder。
5. DC-DC 题先 volt-second balance，再 ripple，再 $I_{\max}/I_{\min}$。
6. Inverter 题先判断 PWM / SPWM / square-wave，再决定是否忽略 high-frequency harmonics。

---

## Example 1：2017 Buck-Boost converter（CCM）

### 题型识别

典型数据：由 $V_{in}=5\,\mathrm{V}$ 得到 $|V_o|=12\,\mathrm{V}$、$I_o=0.5\,\mathrm{A}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$。Inverting buck-boost 输出极性为负，计算常用 magnitude。

### Step 1：Duty cycle

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

$$
D=\frac{|V_o|}{V_{in}+|V_o|}=\frac{12}{5+12}=0.706
$$

### Step 2：Input current by power balance

理想 converter：

$$
P_{in}=P_o=|V_o|I_o
$$

$$
I_{in}=\frac{|V_o|I_o}{V_{in}}=\frac{12\times0.5}{5}=1.2\,\mathrm{A}
$$

### Step 3：Inductor average current

Buck-boost 中输出只在 off interval 接收电感电流：

$$
I_o=(1-D)I_{L,\mathrm{avg}}
$$

$$
I_{L,\mathrm{avg}}=\frac{I_o}{1-D}=\frac{0.5}{1-0.706}=1.70\,\mathrm{A}
$$

### Step 4：Inductor voltage and ripple

On state：

$$
v_L=V_{in}=5\,\mathrm{V}
$$

Off state：

$$
v_L=-|V_o|=-12\,\mathrm{V}
$$

Ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

$$
\Delta i_L=\frac{5\times0.706}{100\times10^{-6}\times50\times10^3}=0.706\,\mathrm{A}
$$

### Step 5：Maximum and minimum inductor current

$$
I_{L,\max}=1.70+\frac{0.706}{2}=2.05\,\mathrm{A}
$$

$$
I_{L,\min}=1.70-\frac{0.706}{2}=1.35\,\mathrm{A}
$$

### Waveform checklist

- $i_L$：从约 $1.35\,\mathrm{A}$ 上升到 $2.05\,\mathrm{A}$，再下降回 $1.35\,\mathrm{A}$。
- $v_L$：on 为 $+5\,\mathrm{V}$，off 为 $-12\,\mathrm{V}$。
- $i_{in}$：on 时等于 $i_L$，off 时约为 0，平均值 $1.2\,\mathrm{A}$。

### 易错点

- 不写负极性或不说明使用 $|V_o|$。
- 把 $I_{L,\mathrm{avg}}$ 当成 $I_o$。
- 用 $\Delta i_L$ 全量直接加减，而不是加减 $\Delta i_L/2$。

---

## Example 2：2018 Boost converter（CCM）

### 题型识别

典型数据：$V_{in}=5\,\mathrm{V}$，$V_o=15\,\mathrm{V}$，$I_o=1\,\mathrm{A}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$。

### Step 1：Duty cycle

$$
V_o=\frac{V_{in}}{1-D}
$$

$$
D=1-\frac{V_{in}}{V_o}=1-\frac{5}{15}=\frac{2}{3}=0.667
$$

### Step 2：Input and inductor average current

$$
I_{in}=\frac{V_oI_o}{V_{in}}=\frac{15\times1}{5}=3\,\mathrm{A}
$$

Boost input current is the inductor current：

$$
I_{L,\mathrm{avg}}=I_{in}=3\,\mathrm{A}
$$

### Step 3：Inductor voltage

On state：

$$
v_L=V_{in}=5\,\mathrm{V}
$$

Off state：

$$
v_L=V_{in}-V_o=5-15=-10\,\mathrm{V}
$$

### Step 4：Inductor ripple

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

$$
\Delta i_L=\frac{5\times(2/3)}{100\times10^{-6}\times50\times10^3}=0.667\,\mathrm{A}
$$

### Step 5：Maximum and minimum current

$$
I_{L,\max}=3+\frac{0.667}{2}=3.33\,\mathrm{A}
$$

$$
I_{L,\min}=3-\frac{0.667}{2}=2.67\,\mathrm{A}
$$

### Waveform checklist

- $v_L$：$+5\,\mathrm{V}$ during $DT$，$-10\,\mathrm{V}$ during $(1-D)T$。
- $i_L$：围绕 $3\,\mathrm{A}$ 的连续三角波。
- $I_{L,\min}>0$，所以 CCM 假设成立。

### 易错点

- 把 $I_o=1\,\mathrm{A}$ 当成 $I_L$ 平均值。
- 忘记 off-state 电感电压是负值。
- 把 boost duty 写成 $D=V_o/V_{in}$。

---

## Example 3：MOSFET loss and thermal template

### 题型识别

2017 Q3 和 2018 Q3 都是 waveform → average/RMS → load power → MOSFET loss → thermal circuit。题目通常给 load current waveform、supply voltage、$R_{DS(on)}$、switching time、thermal resistances。

### Step 1：从波形读 duty 和周期

$$
D=\frac{t_{on}}{T}
$$

2017 worked solution 中：

$$
D=\frac{10\,\mathrm{ms}}{20\,\mathrm{ms}}=0.5
$$

### Step 2：分段积分求 average 和 RMS

Average：

$$
I_{\mathrm{avg}}=\frac{1}{T}\int_0^T i(t)\,dt
$$

RMS：

$$
I_{\mathrm{rms}}=\sqrt{\frac{1}{T}\int_0^T i^2(t)\,dt}
$$

2017 lecture worked values：

$$
I_{\mathrm{avg}}=8.75\,\mathrm{A}
$$

$$
I_{\mathrm{rms}}\approx12.4\,\mathrm{A}
$$

### Step 3：Load power

若题目给 supply voltage and switched current，可用：

$$
P_{load}=V_{supply}I_{\mathrm{avg}}
$$

2017 worked value：

$$
P_{load}=50\times8.75=437.5\,\mathrm{W}
$$

### Step 4：MOSFET conduction loss

$$
P_{cond}=I_{D,\mathrm{rms}}^2R_{DS(on)}
$$

2017 worked value：

$$
P_{cond}\approx7.688\,\mathrm{W}
$$

### Step 5：Switching loss

若题目用线性 overlap 近似：

$$
P_{sw}\approx\frac{1}{2}V_{DS}I_D(t_r+t_f)f_s
$$

有些题会分别给 turn-on / turn-off current 或 switching intervals，可按三角形面积逐项相加。2017 worked value：

$$
P_{sw}\approx1.125\,\mathrm{W}
$$

Total semiconductor loss：

$$
P_{tot}=P_{cond}+P_{sw}
$$

2017 worked value：

$$
P_{tot}\approx8.813\,\mathrm{W}
$$

### Step 6：Thermal ladder

基本热阻链：junction → case → sink → ambient。

$$
T_j=T_a+P\left(R_{\theta JC}+R_{\theta CS}+R_{\theta SA}\right)
$$

也可逐级写：

$$
T_S=T_A+P R_{\theta SA}
$$

$$
T_C=T_S+P R_{\theta CS}
$$

$$
T_J=T_C+P R_{\theta JC}
$$

2018 thermal example 给 $P=60\,\mathrm{W}$、$R_{\theta JC}=0.2^\circ\mathrm{C/W}$、$R_{\theta CS}=0.1^\circ\mathrm{C/W}$、$R_{\theta SA}=1^\circ\mathrm{C/W}$、$T_A=25^\circ\mathrm{C}$：

$$
T_S=25+60\times1=85^\circ\mathrm{C}
$$

$$
T_C=85+60\times0.1=91^\circ\mathrm{C}
$$

$$
T_J=91+60\times0.2=103^\circ\mathrm{C}
$$

### 易错点

- 用 average current 算 $I^2R$ loss；应使用 RMS current。
- 把 ms、$\mu\mathrm{s}$、ns 单位混用。
- 多个器件共享 heatsink 时，sink-to-ambient 温升要用总损耗。
- 热阻顺序写反，或者漏写单位 $^\circ\mathrm{C/W}$。

---

## Example 4：PWM inverter calculation template

### 题型识别

2017 Q5 和 2018 Q4(g-i)：single-phase PWM inverter，给 $V_d$、carrier 幅值、$m_a$ 或 constant control signal，要求 low-frequency output 或 average output，并解释 square-wave / overmodulation。

### Case A：SPWM low-frequency component

Full-bridge bipolar SPWM 线性区：

$$
\hat V_{o1}\approx m_aV_d
$$

$$
V_{o1,\mathrm{rms}}\approx\frac{m_aV_d}{\sqrt{2}}
$$

2018 模板：若 $V_d=100\,\mathrm{V}$、$m_a=0.5$：

$$
\hat V_{o1}=0.5\times100=50\,\mathrm{V}
$$

$$
V_{o1,\mathrm{rms}}=\frac{50}{\sqrt{2}}=35.4\,\mathrm{V}
$$

答题时写明：high-frequency harmonics neglected。

### Case B：Overmodulation / square-wave

若 $m_a\gg1$：

- comparator 大部分时间饱和；
- 输出接近 square-wave；
- linear SPWM 关系失效；
- fundamental 增大但 low-order harmonics 明显增加。

Full-bridge square-wave total RMS：

$$
V_{o,\mathrm{rms}}=V_d
$$

Fundamental peak 可写：

$$
\hat V_1=\frac{4V_d}{\pi}
$$

### Case C：Constant control signal average output

若 carrier 为对称三角波 $\pm V_{tri,peak}$，constant control 为 $v_{control}=kV_{tri,peak}$：

$$
D=\frac{1+k}{2}
$$

Full-bridge bipolar average：

$$
\overline v_o=(2D-1)V_d=kV_d
$$

2018 模板：若 $V_d=100\,\mathrm{V}$ 且 $k=0.6$：

$$
D=\frac{1+0.6}{2}=0.8
$$

$$
\overline v_o=(2\times0.8-1)100=60\,\mathrm{V}
$$

若题图 comparator 逻辑相反，答案符号相反，必须按题图说明。

### 易错点

- $m_a>1$ 仍套 $\hat V_{o1}=m_aV_d$。
- 题目要求忽略高频谐波，却把 carrier sidebands 写成最终输出。
- Constant control 题没有先求 duty。
- 不说明 full-bridge / half-bridge，导致电压幅值差一倍。

---

## 最后 30 秒检查

- 每个 numerical answer 是否有单位。
- $\Delta i_L$ 是否是 peak-to-peak。
- $I_{\max/\min}$ 是否用了 $\pm\Delta i_L/2$。
- MOSFET conduction loss 是否用了 RMS current。
- Thermal sink 温升是否用了正确功率。
- PWM 是否在线性区；若 overmodulation，是否停止使用线性公式。