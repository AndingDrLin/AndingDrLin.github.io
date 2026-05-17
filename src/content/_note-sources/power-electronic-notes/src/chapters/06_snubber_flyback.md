# 06 Snubber Circuits and Flyback Converter

## 考试要会什么

- 会解释 snubber 的作用：限制 $dv/dt$、$di/dt$、voltage spike、current spike、ringing 和 switching stress。
- 会区分 **turn-off voltage snubber**、**turn-on current snubber**、**unpolarized RC snubber**。
- 会画简单 RC snubber across switch / diode，并说明能量路径。
- 会用 RC snubber 设计公式估算 ringing frequency、$R_{\mathrm{snub}}$、$C_{\mathrm{snub}}$ 和损耗。
- 会说明 **flyback converter** 与 inverting buck-boost 的关系，以及为什么需要 isolation 时选 flyback 而不是 buck-boost。

## 一句话记忆

**Snubber 是保护开关的缓冲网络；flyback 是带 coupled inductor / transformer isolation 的 buck-boost 思路。**

## 核心原理

### 1. Snubber 的本质作用

Power switch 关断或开通时，电路中的 stray inductance 和 parasitic capacitance 会造成：

- high $dv/dt$：可能误触发、击穿器件、增加 EMI；
- high $di/dt$：可能产生 current spike、reverse recovery stress；
- ringing：由 stray $L$ 和 parasitic $C$ 形成振荡；
- switching trajectory 进入危险区域，增加 switching loss 和 SOA stress。

Snubber 用额外的 $R$、$C$、$L$、diode 给能量提供受控路径，让开关承受更平滑的 voltage/current transition。

### 2. 三类常考 snubber

| 类型 | 常见名称 | 主要限制 | 典型连接 | 考试关键词 |
|---|---|---|---|---|
| Turn-off snubber | Voltage snubber / polarized RC | $dv/dt$、turn-off overvoltage | capacitor across switch，常带 diode 和 resistor | turn-off, voltage stress |
| Turn-on snubber | Current snubber / polarized LR | $di/dt$、turn-on current spike | series inductor，带 reset resistor/diode | turn-on, current stress |
| Unpolarized RC snubber | Series RC damping network | ringing、both-polarity transient | series $R$-$C$ across switch/diode | damping, oscillation |

### 3. Turn-off voltage snubber

关断时，开关电流不能瞬间消失，stray inductance 会抬高 switch voltage。RC snubber 中 capacitor 暂时接收电流，使 switch voltage 上升变慢。

核心句：**The capacitor provides an alternative path for current during turn-off, reducing $dv/dt$ and peak device voltage; the resistor dissipates the stored energy before the next cycle.**

### 4. Turn-on current snubber

开通时，diode reverse recovery 或 capacitor discharge 可能让 switch current 急剧上升。series inductor 限制 current slope。

核心句：**The inductor limits the rate of rise of current during turn-on, while the resistor/diode network resets the snubber energy.**

### 5. Unpolarized RC snubber

Series RC snubber 常并在 switch、diode 或 transformer winding 上，用于抑制由 stray inductance 和 parasitic capacitance 造成的 ringing。它不是 converter 的主功率传输元件，而是 damping/protection network。

## 必背公式

### 1. Ringing frequency

$$
f_0=\frac{1}{2\pi\sqrt{LC}}
$$

这里 $L$ 常是 stray inductance，$C$ 常是 parasitic capacitance 或等效振荡电容。

### 2. RC snubber 经验选择

下面是 course homework / exam 中常用的 approximate design rule，只在题目给出 stray inductance、parasitic capacitance 并要求按该近似设计 damping snubber 时使用：

$$
C_{\mathrm{snub}}\approx 3C_{\mathrm{para}}
$$

$$
R_{\mathrm{snub}}=\sqrt{\frac{L_{\mathrm{stray}}}{C_{\mathrm{para}}}}
$$

如果题目指定用 total capacitance，则按题意说明：

$$
C_{\mathrm{total}}=C_{\mathrm{para}}+C_{\mathrm{snub}}
$$

### 3. Snubber capacitor energy and loss

每次充放电能量近似：

$$
E_C=\frac{1}{2}CV^2
$$

常用保守损耗估计：

$$
P_{\mathrm{snub}}\approx f_sC_{\mathrm{snub}}V^2
$$

注意：有些推导因每周期充放电路径不同会出现 $1/2$，考试按题目给出的公式或说明使用。若未指定，写清楚假设。

### 4. Buck-boost voltage gain

Inverting buck-boost：

$$
V_o=-\frac{D}{1-D}V_{in}
$$

Magnitude 形式：

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

### 5. Flyback voltage gain

Ideal flyback，按输出幅值：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

### 6. Flyback reflected voltage

MOSFET 关断时 primary 侧看到 secondary 反射电压：

$$
V_R=\frac{N_p}{N_s}(V_o+V_D)
$$

理想 MOSFET off-state voltage 常估为：

$$
V_{DS,off}\approx V_{in}+V_R
$$

实际还要加 leakage inductance spike，所以 flyback 常需要 RCD clamp 或 snubber。

## 图像/波形/拓扑

### 1. Unpolarized RC snubber

```text
        ┌──── Switch / Diode ────┐
        │                        │
        └──── R_snub ─ C_snub ───┘

Series RC is placed across the stressed device to damp ringing.
```

### 2. Turn-off voltage snubber 概念图

```text
Turn-off:

inductive current → snubber capacitor charging
                 → switch voltage rises more slowly
                 → resistor dissipates stored energy
```

画图关键词：capacitor across switch、diode gives charging path、resistor discharge path、limit $dv/dt$。

### 3. Turn-on current snubber 概念图

```text
DC link ─ L_snub ─ switch ─ load
             │
        reset R/D path

L_snub limits di/dt during switch turn-on.
```

### 4. Buck-boost 与 flyback 的文字拓扑对比

```text
Inverting buck-boost:
Vin ─ switch ─ L ─ diode/capacitor/load
Energy storage element: inductor
Isolation: no
Output polarity: inverted

Flyback:
Vin ─ switch ─ primary coupled inductor || secondary ─ diode/capacitor/load
Energy storage element: transformer magnetising inductance
Isolation: yes
Output polarity: set by dot convention and diode direction
```

## 做题步骤

### 1. Snubber 简答题步骤

1. 先判断题目问 turn-on 还是 turn-off。
2. 若问 turn-off / voltage stress：写 RC voltage snubber，重点 $dv/dt$ 和 overvoltage。
3. 若问 turn-on / current stress：写 LR current snubber，重点 $di/dt$ 和 current spike。
4. 若问 ringing：写 series RC unpolarized snubber，重点 damping stray $L$ 和 parasitic $C$。
5. 最后补一句 trade-off：snubber 降低 stress 和 EMI，但会增加 loss、size 和 design complexity。

### 2. RC snubber calculation 步骤

1. 从题目读 $L_{\mathrm{stray}}$、$C_{\mathrm{para}}$、$V$、$f_s$。
2. 求 ringing frequency：$f_0=1/(2\pi\sqrt{LC})$。
3. 选 $C_{\mathrm{snub}}$，常用 $C_{\mathrm{snub}}\approx3C_{\mathrm{para}}$。
4. 算 $R_{\mathrm{snub}}=\sqrt{L_{\mathrm{stray}}/C_{\mathrm{para}}}$。
5. 算损耗：$P_{\mathrm{snub}}\approx f_sC_{\mathrm{snub}}V^2$。
6. 写 compromise：更大的 $C$ 抑制更强，但 snubber loss 更大，便携或高效率设备尤其不利。

### 3. Flyback vs buck-boost 选择题步骤

1. 若题目要求 electrical isolation，直接优先考虑 **flyback**。
2. 写 flyback derived from buck-boost，但把 inductor 拆成 coupled inductor / transformer。
3. 写多了 turns ratio：除 duty cycle 外，$N_s/N_p$ 也决定 voltage gain。
4. 写非隔离 buck-boost 不能替代 flyback，因为 buck-boost 没有 galvanic isolation。
5. 若题目问 stress，补充 MOSFET off voltage 包含 input voltage、reflected voltage 和 leakage spike，需要 snubber/clamp。

## 高频错误

- 把 snubber 当作 converter 的主拓扑元件；它主要是 protection / damping network。
- turn-off snubber 与 turn-on snubber 混淆：turn-off 主要限 $dv/dt$，turn-on 主要限 $di/dt$。
- 只画 R/C/L，不解释能量路径和保护对象。
- $f_0=1/(2\pi\sqrt{LC})$ 忘记平方根或 $2\pi$。
- 计算 snubber loss 时漏掉 $f_s$，或 $\mathrm{nF}$、$\mathrm{pF}$ 没换成 farad。
- Flyback 与 buck-boost 混淆：flyback 有 isolation 和 turns ratio，buck-boost 没有 isolation。
- 以为 flyback transformer 是普通理想 transformer；实际核心储能在 magnetising inductance。
- 估算 MOSFET voltage stress 时只写 $V_{in}$，漏掉 reflected voltage 和 leakage spike。

## Past paper 连接

- **2017 Q1(c)**：unpolarized voltage / turn-off snubber。要画 RC snubber 并说明限制 $dv/dt$、吸收能量、降低 switch stress。
- **2018 Q1(d)**：polarized current / turn-on snubber。重点是限制 $di/dt$，不要画成 turn-off voltage snubber。
- **2017 Q4 / 2018 Q4 相关 DC-DC 思路**：buck-boost 和 boost 计算常考；flyback 作为 buck-boost 的隔离版本，是 converter choice 简答题重点。
- **Feedback Q3**：需要 isolation 时应选 flyback，不是 non-isolated buck-boost。
- **Lecture 9**：flyback 与 snubber voltage stress 常联系在一起，尤其是 leakage inductance spike 需要 snubber/clamp。