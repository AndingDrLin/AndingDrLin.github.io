# 05 Thermal Management and Heatsink

## 考试要会什么

- 会画 **junction-case-sink-ambient thermal chain**。
- 会用 thermal resistance 求 $T_S$、$T_C$、$T_J$。
- 会反推 required heatsink thermal resistance $R_{\theta SA}$。
- 会处理 **common heatsink**：sink temperature rise 用所有器件总损耗。
- 会把 MOSFET / IGBT losses 转换成 thermal calculation 的输入功率。

## 一句话记忆

**电路看电流，热路看功率；thermal resistance 串联，common heatsink 先用总功率升温，再分别加各器件自己的 case 和 junction 温升。**

## 核心原理

### 1. Thermal circuit 类比

| Electrical circuit | Thermal circuit |
|---|---|
| Voltage $V$ | Temperature difference $\Delta T$ |
| Current $I$ | Power loss $P$ |
| Resistance $R$ | Thermal resistance $R_\theta$ |
| Ohm's law $V=IR$ | Thermal law $\Delta T=PR_\theta$ |

Power semiconductor 的损耗最终变成热，从 junction 经过 case、thermal interface、heatsink 到 ambient。

### 2. Thermal chain 顺序

从热源到空气的顺序固定：

$$
\text{junction} \rightarrow \text{case} \rightarrow \text{sink} \rightarrow \text{ambient}
$$

对应 thermal resistance：

$$
R_{\theta JC},\quad R_{\theta CS},\quad R_{\theta SA}
$$

其中：

- $R_{\theta JC}$：junction-to-case，通常由器件封装决定。
- $R_{\theta CS}$：case-to-sink，受 thermal pad、grease、mounting pressure 影响。
- $R_{\theta SA}$：sink-to-ambient，由 heatsink 和 airflow 决定。

### 3. Common heatsink 的核心区别

若多个器件共用同一个 heatsink：

1. heatsink 到 ambient 的温升由 **总损耗** 决定：

$$
T_S=T_A+P_{\mathrm{total,sink}}R_{\theta SA}
$$

2. 每个器件从 sink 到 case/junction 的温升用 **该器件自己的损耗**：

$$
T_{C,k}=T_S+P_kR_{\theta CS,k}
$$

$$
T_{J,k}=T_{C,k}+P_kR_{\theta JC,k}
$$

考试最容易错在：common heatsink 的 $T_S$ 不能只用某一个器件的损耗。

## 必背公式

### 1. Basic thermal resistance law

$$
\Delta T=PR_\theta
$$

单位必须匹配：$P$ 用 $\mathrm{W}$，$R_\theta$ 用 $^\circ\mathrm{C}/\mathrm{W}$ 或 $\mathrm{K}/\mathrm{W}$，得到 $^\circ\mathrm{C}$ 或 $\mathrm{K}$ 的温升。

### 2. Single-device thermal chain

$$
T_S=T_A+PR_{\theta SA}
$$

$$
T_C=T_S+PR_{\theta CS}
$$

$$
T_J=T_C+PR_{\theta JC}
$$

合并写法：

$$
T_J=T_A+P\left(R_{\theta JC}+R_{\theta CS}+R_{\theta SA}\right)
$$

### 3. Required heatsink thermal resistance

若给定 $T_{J,\max}$，求 heatsink 需要多好：

$$
R_{\theta SA}\le \frac{T_{J,\max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

判断：

- 结果越小，heatsink 要求越强。
- 若结果为负，说明单靠普通 heatsink 不够，需要降低损耗、并联器件、强迫风冷或重新选器件。

### 4. 多器件 common heatsink

总 heatsink 功率：

$$
P_{\mathrm{total,sink}}=P_1+P_2+\cdots+P_n
$$

heatsink temperature：

$$
T_S=T_A+P_{\mathrm{total,sink}}R_{\theta SA}
$$

第 $k$ 个器件：

$$
T_{J,k}=T_S+P_k\left(R_{\theta CS,k}+R_{\theta JC,k}\right)
$$

## 图像/波形/拓扑

![Thermal chain](../../assets/thermal_chain.svg)

考试手画 thermal circuit 时写成：

```text
T_J ── R_θJC ── T_C ── R_θCS ── T_S ── R_θSA ── T_A
        ↑P              ↑P              ↑P
```

common heatsink 手画模板：

```text
Device 1: T_J1 ─ R_θJC1 ─ T_C1 ─ R_θCS1 ┐
                                         ├─ T_S ─ R_θSA ─ T_A
Device 2: T_J2 ─ R_θJC2 ─ T_C2 ─ R_θCS2 ┘

T_S is set by P_1 + P_2, not by one device only.
```

图中必须标：$T_J$、$T_C$、$T_S$、$T_A$、$R_{\theta JC}$、$R_{\theta CS}$、$R_{\theta SA}$、$P$。

## 做题步骤

### 1. 给 losses 求 temperatures

1. 先确认输入功率是 device dissipated power，不是 load power。
2. 按顺序写 thermal path：$T_A \rightarrow T_S \rightarrow T_C \rightarrow T_J$。
3. 算 heatsink：$T_S=T_A+PR_{\theta SA}$。
4. 算 case：$T_C=T_S+PR_{\theta CS}$。
5. 算 junction：$T_J=T_C+PR_{\theta JC}$。
6. 与 $T_{J,\max}$ 比较，写 safe / unsafe。

### 2. 给 temperature limit 求 heatsink

1. 写总允许温升：$T_{J,\max}-T_A$。
2. 除以 power 得总允许 thermal resistance。
3. 减去 $R_{\theta JC}$ 和 $R_{\theta CS}$，得到 $R_{\theta SA}$ 上限。
4. 选择 catalog heatsink 时要选 **smaller** $R_{\theta SA}$。

### 3. Common heatsink 题步骤

1. 列出每个器件损耗：$P_1,P_2,\ldots$。
2. 求 $P_{\mathrm{total,sink}}$。
3. 用总功率求 $T_S$。
4. 对每个器件分别算 $T_C$ 和 $T_J$。
5. 找最高 $T_J$ 的器件作为 limiting device。

### 4. 和 MOSFET loss 题连接

MOSFET 题常先算：

$$
P_{\mathrm{loss}}=P_{\mathrm{cond}}+P_{\mathrm{sw}}
$$

然后把 $P_{\mathrm{loss}}$ 代入 thermal chain。不要把 load power $P_{\mathrm{load}}$ 直接当作 semiconductor loss。

## 高频错误

- 把 $P_{\mathrm{load}}$ 当成器件发热功率；thermal 用的是 dissipated loss。
- thermal resistance 顺序写反，把 ambient 放在 junction 旁边。
- 漏写单位 $^\circ\mathrm{C}/\mathrm{W}$ 或 $\mathrm{K}/\mathrm{W}$。
- common heatsink 只用单个器件功率求 $T_S$。
- 求 heatsink 时选了更大的 $R_{\theta SA}$；正确是 $R_{\theta SA}$ 越小散热越好。
- 忘记检查 $T_J<T_{J,\max}$，只算温度不给结论。
- 把 $R_{\theta CS}$ 误认为可以忽略；除非题目明确忽略 thermal interface。

## Past paper 连接

- **2018 Q3 thermal(a-b)**：给 $R_{\theta JC}=0.2^\circ\mathrm{C}/\mathrm{W}$、$R_{\theta CS}=0.1^\circ\mathrm{C}/\mathrm{W}$、$P=60\,\mathrm{W}$、$R_{\theta SA}=1^\circ\mathrm{C}/\mathrm{W}$、$T_A=25^\circ\mathrm{C}$，要求画 thermal circuit 并求 $T_S$、$T_C$、$T_J$。标准顺序是 $85^\circ\mathrm{C}$、$91^\circ\mathrm{C}$、$103^\circ\mathrm{C}$。
- **2017 Q3(g)**：MOSFET losses 算完后接 thermal ladder，重点是用 $P_{\mathrm{loss}}$ 而不是 $P_{\mathrm{load}}$。
- **Exam feedback Q1**：thermal 画图和单位是常见扣分点；必须标完整 thermal path。
- **高频组合题**：waveform calculation → loss → thermal，是最值得背模板的 25 marks 大题结构。