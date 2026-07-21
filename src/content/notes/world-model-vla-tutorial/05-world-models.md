---
title: "第 5 章：世界模型"
description: "世界模型不是一种架构，而是一类关于状态、行动和未来的预测问题"
date: 2026-06-27
updated: 2026-07-21
tags: [world-model, DreamerV3, DIAMOND, JEPA, Cosmos, robotics, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 5
draft: false
---

# 第 5 章：世界模型

> 世界模型（World Model）最容易被误解成“能生成未来视频的模型”。我现在更愿意把它理解成一个问题陈述：给定当前观察、内部状态和候选动作，系统能不能预测接下来可能发生什么，并把这个预测用于规划、训练或评估？

这一章要解决三个问题：

1. **世界模型到底是什么**：它不是 Sora、Dreamer、JEPA、NeRF 里的某一个，而是一类问题。
2. **主流路线怎么分类**：为什么视频生成、latent dynamics、JEPA、3D neural representation 都会抢 “world model” 这个标签？
3. **它在机器人里怎么真正有用**：不是为了“想象力”这个词好听，而是为了更便宜地评估、更快地训练、更安全地部署。

我目前的判断：世界模型短期内最确定的价值不是“直接替代真实世界”，而是成为机器人训练和评估的中间层。它能让很多原本只能在硬件上慢慢试的事情，先在可控的 learned substrate 里跑一遍。问题是，这个 substrate 是否真的保留了动作、接触、空间记忆和任务成功率相关的信息，而不是只会生成漂亮视频。

---

## 5.1 世界模型不是一种模型架构

先把一句话钉住：**world modeling 是 problem statement，不是 model architecture。**

这个说法和 SLAM 很像。SLAM 不是某个固定网络，也不是某个固定优化器，而是一个问题：机器人一边移动，一边估计自己在哪里，同时建出周围的地图。解决 SLAM 可以用 EKF，可以用 particle filter，可以用 graph optimization，也可以用直接法或特征点法。

世界模型也是这样。“Build a world model” 说的是目标，不是答案。不同路线只是对下面这个问题给出了不同取舍：

> 给定我现在看到什么、我以为世界处在什么状态、我准备做什么动作，以及那些我看不见但会影响未来的因素，模型能不能预测接下来会发生什么？

一个比较干净的形式化来自 Yann LeCun 的 AMI（A Path Towards Autonomous Machine Intelligence）设想。我们可以把它写成：

$$
h_t = Enc(x_t)
$$

$$
s_{t+1} = Pred(h_t, s_t, a_t, z_t)
$$

如果需要把预测结果画回像素，再接一个可选的 decoder：

$$
\hat{x}_{t+1} = Dec(s_{t+1})
$$

这里每个符号都很重要：

| 符号 | 含义 | 在机器人里的例子 |
|---|---|---|
| $x_t$ | 当前 observation | 相机图像、深度图、触觉、关节读数 |
| $h_t$ | observation 的表示 | 视觉 encoder 输出的 embedding |
| $s_t$ | 当前内部状态估计 | 物体位置、机器人姿态、任务进度、历史记忆 |
| $a_t$ | 候选动作 | 末端执行器位移、夹爪开合、离散 action token |
| $z_t$ | 当前看不见但会影响未来的 latent factor | 摩擦、遮挡物、物体重量、传感器噪声 |
| $s_{t+1}$ | 下一步状态预测 | 执行动作后的场景状态 |
| $\hat{x}_{t+1}$ | 可选的渲染结果 | 预测出来的下一帧图像或视频 |

这个定义里最容易被忽略的是 $z_t$。真实世界不是完全可观测的。机器人看到一个杯子，但不知道杯底是否湿、杯子是否比看起来更重、桌面摩擦系数是多少。一个 deterministic predictor 会给一个最可能的未来；一个 probabilistic predictor 应该给一组 plausible futures。

### 一个落地例子：机械臂推抽屉

假设机械臂看到一个半开的抽屉，任务是“把抽屉关上”。

- $x_t$：腕部相机和第三视角相机看到的图像。
- $s_t$：模型内部估计的抽屉开合程度、夹爪位置、接触关系。
- $a_t$：候选动作，比如“向前推 3 cm”或“先调整角度再推”。
- $z_t$：抽屉滑轨是否卡住、桌面是否晃动、相机看不到的阻尼。
- $s_{t+1}$：执行动作后，抽屉是否真的更接近关闭状态。

如果模型只预测下一帧像素，它可能会画出一个看起来合理的抽屉；但机器人真正需要的是：这个动作是否会改变抽屉状态？会不会撞到边缘？如果滑轨卡住，是否应该换一个动作？

所以这一章后面所有分类，都围绕一个核心分歧展开：**模型到底应该预测 state，还是预测 pixel？渲染下一帧是目标本身，还是只是训练辅助？**

---

## 5.2 一张分类图：预测在哪里发生？

先给一张粗糙但实用的分类图。横轴看模型是否 action-conditioned，纵轴看它主要在 pixel/video 空间工作，还是在 latent/structured state 空间工作。

```text
                         主要预测 pixel / video
                                  ↑
                                  │
        Sora / Veo / Genie        │       DIAMOND / GameNGen
        text/image → video         │       action → future frames
        叙事强，控制弱             │       可交互，但成本高
                                  │
不显式条件化动作  ────────────────┼────────────────  动作条件化 / 可交互
                                  │
        I-JEPA / V-JEPA           │       Dreamer / TD-MPC / V-JEPA-AC
        masked/future embedding    │       action → future latent state
        表征学习强，控制需后接       │       规划与训练最直接
                                  │
                                  ↓
                         主要预测 latent / state
```

这张图不是为了把所有论文严丝合缝地塞进去，而是为了提醒自己读论文时先问三个问题：

1. **压缩什么？** 是压缩成 pixel token、visual embedding、RSSM state，还是 3D scene representation？
2. **预测什么？** 是下一帧、未来 embedding、reward/value，还是可执行动作？
3. **预测被怎么用？** 是为了生成视频、训练 policy、做 MPC、评估 checkpoint，还是合成数据？

如果一篇论文只说自己是 world model，却没有回答这三个问题，我通常会先把它放在“概念还没钉牢”的篮子里。

---

## 5.3 四种主流范式

### 5.3.1 Generative World Models：把未来画出来

这一类最容易出圈。Sora、Veo、Genie、GameNGen、部分自动驾驶视频预测模型，都可以放在这个大桶里。它们通常给定一段上下文视频、文本 prompt 或起始图像，生成接下来的视频。如果再加上动作条件，就变成“可交互的视频世界”。

可以把它写成：

$$
\hat{x}_{t+1:t+H} \sim p_\theta(x_{t+1:t+H} \mid x_{\le t}, a_{t:t+H})
$$

优点很直接：

- 结果可视化，人的直觉容易判断。
- 可以做 synthetic data，生成不同背景、视角、物体组合。
- 如果动作条件做得好，可以变成可玩的环境模拟器。

但它也有典型 failure mode：

| 问题 | 表现 | 为什么对机器人严重 |
|---|---|---|
| Autoregressive drift | 小误差在长 rollout 中滚雪球 | 长任务越推越偏，后面动作基于错误世界 |
| Hallucination | 被遮挡物体凭空出现/消失 | 机器人需要 object permanence，不是短视频合理性 |
| Physical implausibility | 接触、重力、刚体关系不稳定 | 抓取、推拉、插入任务对接触极其敏感 |
| Memory loss | 视角移开后场景状态改变 | 长程任务需要持久空间记忆 |
| Action fidelity 不足 | 视频看起来合理，但不真的响应动作 | policy ranking 和 planning 会被误导 |

我的理解是：生成式世界模型不是没用，而是要非常清楚它的使用边界。它适合做数据增强、场景扩展、失败模式探索；如果要直接拿来做控制，就必须证明动作对未来的影响是可靠的，而不能只证明视频好看。

### 5.3.2 Latent Dynamics Models：在隐空间里做动力学

Dreamer、PlaNet、TD-MPC 这一支来自 model-based RL。它们不把重点放在生成高清未来视频，而是学习一个 compact latent state，然后在 latent space 里预测未来、奖励和值函数。

经典结构是 RSSM（Recurrent State-Space Model）：

$$
\text{RSSM}: \begin{cases}
h_t = f(h_{t-1}, z_{t-1}, a_{t-1}) & \text{确定性路径} \\
z_t \sim q_\theta(z_t \mid h_t, x_t) & \text{posterior：训练时看真实观测} \\
\hat{z}_t \sim p_\theta(\hat{z}_t \mid h_t) & \text{prior：想象时不看真实观测}
\end{cases}
$$

训练时，它通常有几个 head：

- reconstruction head：从 latent 重建 observation；
- reward head：预测奖励；
- continuation head：预测 episode 是否继续；
- actor / critic：在 imagination rollout 中训练策略。

这一路线的核心不是“我能不能画出下一帧”，而是：**latent state 是否足够支持任务决策**。

Dreamer 系列的训练循环可以概括成：

```text
真实环境交互 → replay buffer
        ↓
训练 world model：encoder + RSSM + decoder/reward/continue heads
        ↓
在 world model 里 imagine rollout
        ↓
用 imagined trajectory 训练 actor-critic
        ↓
回到真实环境收集更多数据
```

这条路线的优势是闭环清楚：世界模型不是最后拿来展示的视频，而是 policy learning 的训练场。

局限也同样清楚：

- latent 可能学到的是“够当前 reward 用”的状态，而不是通用物理理解；
- reconstruction loss 会迫使 latent 记住很多对控制没用的视觉细节；
- model bias 会污染 actor-critic，策略可能学会钻 world model 的漏洞；
- 迁移到真实机器人时，接触、摩擦、遮挡这些长尾因素很难靠小数据学全。

### 5.3.3 JEPA：拒绝像素重建的世界模型

JEPA（Joint Embedding Predictive Architecture）走的是另一种哲学：不要预测 pixel，不要把容量浪费在不可预测的细节上，而是在 representation space 里预测未来或被遮挡区域的 embedding。

可以写成：

$$
e_t = Enc(x_t)
$$

$$
\hat{e}_{t+k} = Pred(e_{\le t}, a_{t:t+k})
$$

训练目标不是重建图片，而是让预测 embedding 接近目标 embedding：

$$
\mathcal{L}_{JEPA} = d(\hat{e}_{t+k}, e_{t+k})
$$

这就是它和 Dreamer 一类 latent dynamics model 的关键差别：

| 维度 | Latent Dynamics（Dreamer 等） | JEPA / V-JEPA |
|---|---|---|
| 训练信号 | reconstruction + reward/value + KL 等 | embedding prediction，自监督为主 |
| decoder | 通常训练时存在 | 设计上可以没有 |
| reward | 往往参与塑形 latent | 通常不依赖 reward |
| 目标 | 在想象中训练 policy | 学通用预测表征，再接 planning/controller |
| 控制方式 | actor-critic in imagination | 常见是 MPC 或小 action-conditioned head |

JEPA 对世界模型的一个提醒很重要：**能不能渲染，不等于能不能理解。**

这句话也不能走极端。机器人最终要落地，还是需要把 embedding 和 action、success、contact、goal 连接起来。一个只会在 embedding space 里预测、却无法支持 planning 或 policy evaluation 的 JEPA，也只是一个好的 video representation learner。

### 5.3.4 3D Neural World Models：把世界表示成可探索空间

NeRF、3D Gaussian Splatting、World Labs 这一类系统强调 3D representation。它们的强项不是时间预测，而是把场景变成可持久化、可渲染、可导航的空间。

这一类更准确地说，经常先是 **world representation**，不一定已经是 **world model**。

原因很简单：

- 一个 static NeRF 能从新视角渲染场景，但它不会预测“机器人推了一下杯子之后杯子去哪”；
- 一个 3DGS 场景能提供几何和外观，但如果没有 dynamics，它只是地图或资产；
- 如果再加入对象状态、接触动力学、动作条件预测，它才逐渐接近 world model。

所以我会这样看 3D neural 路线：

| 能力 | 典型 3D representation 已经擅长吗？ | 对机器人还缺什么？ |
|---|---|---|
| 新视角渲染 | 擅长 | 需要和相机/机器人坐标系稳定对齐 |
| 空间持久性 | 比纯视频模型强 | 需要更新场景状态 |
| 可编辑环境 | 部分具备 | 需要物理和碰撞约束 |
| 动作后预测 | 通常不是核心 | 需要 dynamics / contact model |
| 训练数据生成 | 有潜力 | 需要验证生成数据是否提升真实 policy |

这也是为什么 3D + world model 很有吸引力：视频模型容易忘记被遮挡物体，3D representation 天然更像“地图”；但只有地图还不够，机器人需要的是会随动作变化的地图。

### 5.3.5 World-Action Models：世界模型和 policy 融在一起

还有一条越来越值得关注的路线：World-Action Model（WAM）。传统 VLA 是：

$$
(x_t, \text{language}) \rightarrow a_t
$$

WAM 则把未来视频/状态和未来动作一起建模：

$$
(x_t, \text{language}) \rightarrow (a_{t:t+H}, \hat{x}_{t+1:t+H})
$$

它的主张是：如果模型在训练时同时学习“动作会让世界怎么变”，那么学到的表示应该比只监督 action 更有物理先验。

我对 WAM 的保守判断是：它可能真正有价值的地方不一定是测试时生成未来视频，而是训练时的 representation co-training。也就是说，视频预测可以是让 policy 学得更好的辅助任务；部署时未必真的要每一步都生成视频。读这类论文时，要特别看它有没有回答：跳过 future rendering 后，性能还剩多少？延迟下降多少？

---

## 5.4 对照表：四条路线到底差在哪？

| 维度 | Generative Video WM | Latent Dynamics WM | JEPA / Latent Predictive | 3D Neural WM |
|---|---|---|---|---|
| 典型代表 | Sora/Veo/Genie、GameNGen、DIAMOND 的像素预测部分 | PlaNet、Dreamer、TD-MPC | I-JEPA、V-JEPA、V-JEPA 2、LeWorldModel | NeRF、3DGS、World Labs/Marble 类系统 |
| 核心状态 | pixel/video token | RSSM latent / compact state | visual embedding | 3D scene representation |
| 预测对象 | 下一帧或未来视频 | future latent + reward/value | future/masked embedding | 新视角或空间状态，动态预测需额外模块 |
| 是否依赖 decoder | decoder 是核心产物 | 训练时常有，规划时可丢 | 通常刻意没有 | rendering 是核心能力之一 |
| 是否用 reward | 通常不用 | 常用 | 通常不用 | 通常不用 |
| 对 action 的关系 | 可有可无；机器人场景必须 action-conditioned | 强 action-conditioned | 下游控制时需要 action-conditioned predictor | 静态场景弱，动态扩展才强 |
| 最适合的用途 | 合成数据、可视化 rollout、场景扩展 | imagination RL、MPC、数据高效控制 | 通用表征、goal-conditioned planning | 空间记忆、可探索环境、仿真资产 |
| 最大风险 | 视频好看但动作不准 | model bias 被 policy 利用 | 表征好但不一定能控制 | 会渲染但不会预测动作后果 |

真正要盯住的是两列：**Pred()** 和 **Dec()**。

- Pred() 决定它是不是在做有意义的 forward prediction。
- Dec() 决定它把多少容量投入到“画回像素”。

一个世界模型是否适合机器人，不取决于它叫不叫 world model，而取决于它预测的东西是否能帮助动作选择。

---

## 5.5 重要论文导读：逐图看什么

这一节不复制论文原图。建议你打开原论文或项目页，对照下面的“看图顺序”读。我的经验是，世界模型论文不能只读 abstract；至少要看清楚输入、状态、预测目标、评估方式四件事。

### 论文 1：LeCun, A Path Towards Autonomous Machine Intelligence

- 链接：[OpenReview PDF](https://openreview.net/pdf?id=BZ5a1r-kVsf)
- 关键词：JEPA、world model、configurator、cost、actor、short-term memory
- 建议先看：文中关于 world model / JEPA 的架构示意图

这篇不是工程 baseline，但它给了一个很好的语言系统。读图时按这个顺序看：

1. observation 怎么变成 representation？这对应 $Enc(x_t)$。
2. predictor 到底预测的是 representation/state，还是 pixel？
3. latent variable $z$ 在图里扮演什么角色？它是不是在表达不确定未来？
4. cost / objective 怎么接到 action selection？如果没有 cost，模型只是预测器，不是决策系统。

我建议把这篇当作“概念坐标系”，不要把它当作马上能复现的代码论文。

### 论文 2：PlaNet / Dreamer / DreamerV3

- PlaNet：[Learning Latent Dynamics for Planning from Pixels](https://arxiv.org/abs/1811.04551)
- DreamerV3：[Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104)
- 项目入口：[danijar/dreamerv3](https://github.com/danijar/dreamerv3)

Dreamer 系列最值得看的图，是 world model 和 actor-critic 的闭环：真实数据训练 RSSM，RSSM 想象 future latent trajectory，actor-critic 在这些 trajectory 上更新。

读图时不要只看模块名，逐段问：

1. encoder 把图像压成什么？
2. RSSM 的 deterministic state 和 stochastic state 分别承担什么？
3. decoder/reward/continue heads 如何共同训练 latent？
4. actor-critic 在真实环境里训练，还是在 imagined rollout 里训练？
5. 真实环境交互只在什么时候发生？

DreamerV3 的价值不只是“又一个 RL 算法”。它真正重要的点是：一套比较统一的 world-model RL recipe 可以跨 Atari、DMControl、Minecraft 等任务工作。这说明世界模型可以从“为一个任务手写模型”变成“可复用的训练范式”。

但要注意边界：Dreamer 的 latent 被 reward 和 reconstruction 共同塑形，所以它是任务导向的世界模型，不是天然的通用物理常识模型。

### 论文 3：DIAMOND：Diffusion for World Modeling

- 项目页：[DIAMOND](https://diamond-wm.github.io/)
- 代码：[eloialonso/diamond](https://github.com/eloialonso/diamond)
- 论文：[Diffusion for World Modeling: Visual Details Matter in Atari](https://arxiv.org/abs/2405.12399)

DIAMOND 很适合作为本章练习 baseline，因为它足够新、开源、结果直观，而且能暴露“像素预测世界模型”的优缺点。

它的关键变化是：传统 latent dynamics 往往在压缩空间里预测，DIAMOND 用 diffusion model 建一个高保真的环境 dream，让 agent 在 dream 里训练。

读图时重点看三件事：

1. world model 的输入是不是包含 action history？如果不含 action，就很难做控制。
2. agent 训练时到底是在真实 Atari 环境里，还是在 diffusion world model 里？
3. 多步 rollout 的视觉质量和游戏状态一致性如何随 horizon 变化？

DIAMOND 的好处是视觉细节强，特别适合 Atari 这种像素变化携带关键信息的环境。它的瓶颈也很明显：扩散采样成本高，长 rollout 的一致性和速度都可能成为问题。读这篇时不要只问“分数高不高”，还要问“这个 world model 能不能实时支撑 planning？”

### 论文 4：V-JEPA / V-JEPA 2

- Meta 博客：[V-JEPA 2: world model benchmarks](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/)
- 论文：[V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985)

V-JEPA 系列适合用来理解 JEPA 路线：它不把生成像素当目标，而是在 embedding space 中预测被遮挡或未来部分。

看 V-JEPA 2 的图时，按这个顺序：

1. context encoder 看到了哪些 video tokens？
2. target encoder 提供了什么样的目标 embedding？
3. predictor 预测的是 pixel 还是 embedding？
4. 如果用于 robot planning，action-conditioned predictor 是怎么接进去的？
5. goal image / goal embedding 如何变成 MPC 的目标？

这篇的价值在于提醒我们：世界模型不一定要会画。对机器人来说，如果 embedding prediction 能支持 goal-conditioned planning，它可能比高保真视频更省、更稳。

### 论文 5：Genie 系列：可交互生成世界

- 官方介绍：[Genie 2: A large-scale foundation world model](https://deepmind.google/blog/genie-2-a-large-scale-foundation-world-model/)

Genie 系列适合放在 generative world model 的代表位置。它关心的问题是：能不能从图像或视频中生成一个可交互环境，让 action 影响后续画面？

看这类系统的 demo 时，不要只看“像不像游戏”。更重要的是：

1. action 是否真的改变了环境状态，而不是只改变镜头？
2. 物体离开视野再回来，状态是否一致？
3. 同一个初始状态下，不同 action 的 counterfactual future 是否有可解释差异？
4. rollout 多长以后开始崩？

如果这些问题没有被评估，demo 再漂亮，也很难说明它已经能作为机器人 planning substrate。

### 论文 6：NVIDIA Cosmos：World Foundation Model for Physical AI

- 官方介绍：[NVIDIA Cosmos World Foundation Models](https://blogs.nvidia.com/blog/cosmos-world-foundation-models/)
- 论文入口：[Cosmos World Foundation Model Platform for Physical AI](https://arxiv.org/abs/2501.03575)

Cosmos 代表的是工程平台视角：世界模型不只是一个算法，而是一套用来生成物理 AI 数据、做仿真、做 policy evaluation 的基础设施。

读它的图时建议看 pipeline，而不是只看模型结构：

```text
真实/合成视频数据
        ↓
Tokenizer / video world model
        ↓
合成 trajectory / 场景变化 / policy rollout
        ↓
机器人或自动驾驶 policy 训练、评估、数据增强
```

这类平台真正要证明的是：生成的数据或模拟 rollout 是否提升真实世界任务，而不是生成视频本身有多清晰。

### 论文 7：DayDreamer 与 Dyna 传统

- DayDreamer：[World Models for Physical Robot Learning](https://arxiv.org/abs/2206.14176)
- Dyna 思想源头：Sutton 1991 的 integrated learning, planning, and reacting

DayDreamer 重要的地方在于：它把 Dreamer 风格的 world-model RL 推到了真实机器人上。读它时重点看 real robot interaction budget：机器人到底用了多少真实交互，哪些更新在 imagination 里完成。

这条线和 Sutton 的 Dyna 思想是一脉相承的：

```text
真实经验 → 学模型 → 用模型生成模拟经验 → 更新策略 → 再收集真实经验
```

今天的区别是，模型不再是手写 transition table，而是视觉世界模型、latent dynamics model 或 video world model。

---

## 5.6 世界模型在机器人生命周期里的 5 个用法

如果只问“世界模型是什么架构”，很容易陷入名词争论。对做机器人更有用的问题是：它在 pipeline 的哪个阶段赚钱？我会把它分成 5 个位置。

### 用法 1：Evaluation —— 更便宜地评估 policy

真实机器人评估很慢。一个 checkpoint 可能要跑几十上百次 trial，每次 reset 场景、摆物体、处理硬件漂移。几天时间只评估几个 policy，是很常见的事情。

世界模型可以做一个 proxy evaluator：把同一个初始真实图像喂进去，让多个 policy 在 learned world model 里 rollout，再比较成功率、碰撞、偏离目标等指标。

但这里有一个硬条件：world model 的 ranking 必须和真实成功率相关。否则它只是一个漂亮但误导人的 simulator。

评估类 world model 应该报告：

- predicted success 和 real success 的 rank correlation；
- 不同 policy checkpoint 的排序是否稳定；
- 哪些任务上相关性高，哪些任务上完全失效；
- 是否能发现真实硬件上的 safety failure；
- world model 自己的不确定性是否能提醒“这次预测不可信”。

### 用法 2：Direct Planning —— 运行时直接用模型选动作

这是 model predictive control（MPC）的世界模型版本：

```text
当前 observation
        ↓
采样 N 条候选 action sequence
        ↓
world model 预测每条序列的未来
        ↓
用 goal / value / reward 打分
        ↓
执行第一步动作，然后重新规划
```

JEPA 路线很适合讲这个用法：给一个 goal image，把候选动作 rollout 到 future embedding，选那个最接近 goal embedding 的动作序列。

MPC 的好处是可解释：你能看见模型为什么选择某条动作。坏处是计算贵，而且模型误差会直接影响动作选择。

读 planning 论文时，最该盯的是：

- action candidate 是怎么来的？随机采样、CEM、policy proposal，还是语言规划？
- score function 是 reward、value、goal embedding distance，还是 VLM judge？
- 每一步是否 re-plan？
- planning latency 是否允许真实机器人闭环控制？

### 用法 3：Training Gym —— 在想象中训练 policy

这是 Dreamer/DayDreamer 最典型的用法。world model 不是评估器，而是训练环境。

```text
真实数据训练 world model
        ↓
policy 在 world model 里 rollout
        ↓
reward/value/VLM judge 给分
        ↓
RL 更新 policy
        ↓
真实世界少量验证和补数据
```

这条线最吸引人的地方是数据效率：真实机器人交互贵，而 imagination rollout 便宜。

但它也最容易出问题：policy 会 exploit world model 的漏洞。比如 world model 没学好接触，policy 可能学出一种在模型里能穿模、在现实里完全失败的动作。

所以 training-gym 类论文不能只看 reward 曲线，要看：

- 在真实环境验证的频率；
- world model error 随 rollout horizon 的增长；
- policy 是否只在模型里变好，真实机器人上没有提升；
- 是否有 iterative update：真实 rollout 反过来继续 fine-tune world model。

### 用法 4：Synthetic Data Generation —— 把世界模型当数据工厂

这和 Training Gym 不一样。Synthetic data generation 不一定有 policy 在回路里，也不一定有 RL。它更像：

```text
真实机器人数据 / 视频数据
        ↓
world model 生成新背景、新视角、新物体、新轨迹
        ↓
把生成结果当作 imitation learning 数据
        ↓
训练 VLA / policy
```

这对 VLA 很现实。机器人数据难采，但视觉变化极多：光照、桌面材质、相机角度、物体外观。世界模型如果能生成合理变化，就可能提升泛化。

问题是，合成数据很容易“看起来多样，实际上偏差一致”。所以这类工作必须做 ablation：

- 加 synthetic data 是否真的提升真实成功率？
- 提升来自更多外观变化，还是来自更多动作覆盖？
- synthetic 占比继续增加时，性能是上升、饱和还是下降？
- 哪些任务会被合成数据误导？

### 用法 5：World-Action Model —— policy 和 simulator 的边界变模糊

WAM 把世界预测和动作预测放进同一个模型。它可能输出未来动作，也可能同时输出未来视频。

这条路的吸引力在于：policy 不再只是模仿动作，而是被迫学习动作带来的世界变化。

但我会保留一个问题：**测试时真的需要生成未来视频吗？**

如果一个 WAM 在训练时用 video prediction 辅助 representation，但部署时跳过视频生成，仍然保留大部分性能，那说明视频预测更像训练正则，而不是 runtime planner。这会直接影响工程选择：能不生成视频，就能省掉大量延迟。

---

## 5.7 怎么评估世界模型：别只看视频质量

世界模型评估最常见的陷阱是：拿视频生成指标替代机器人指标。

FVD、LPIPS、PSNR、SSIM 这些指标不是没用，但它们回答的是“像不像视频”，不回答“能不能帮机器人做对动作”。

更适合 robotics 的评估漏斗是：

```text
视觉质量
  ↓
物理一致性
  ↓
动作忠实度（action fidelity）
  ↓
反事实预测（counterfactual correctness）
  ↓
policy ranking 相关性
  ↓
planning / training 是否提升真实成功率
```

可以把指标分成三层：

| 层级 | 指标 | 它回答什么 | 常见误区 |
|---|---|---|---|
| 视觉层 | FVD、LPIPS、重建误差 | 生成画面像不像 | 画面好不代表动作因果对 |
| 动力学层 | multi-step prediction error、contact consistency、object permanence | rollout 是否保持物理关系 | 只看 1-step，忽略长程漂移 |
| 任务层 | policy ranking correlation、planning success、real-world lift、latency | 是否帮助机器人决策 | 只在 world model 内部报告提升 |

如果你复现一个 baseline，我建议最后一定要写一张这样的表：

| 问题 | 观察 | 可能原因 | 下一步验证 |
|---|---|---|---|
| 1-step 很准，20-step 崩 | 物体位置逐渐漂移 | rollout error accumulation | 缩短 MPC horizon / 加 state correction |
| 视频清晰但动作不敏感 | left/right 生成差别小 | action conditioning 弱 | 做 counterfactual action test |
| 模型内 reward 提升，真实无提升 | policy exploit model bias | 接触动力学没学好 | 增加 real eval / uncertainty penalty |
| 速度太慢 | diffusion sampling 成本高 | 去噪步数多 | distillation / latent diffusion / shorter rollout |

---

## 5.8 练习：用 vibe coding 复现一个热门 baseline，并拆出它的优势和瓶颈

这部分不再要求你从零手写 RSSM 或扩散模型。现在更符合行业工作流的练习是：**用现成开源 baseline 跑起来，然后设计观察与压力测试，判断它为什么有效、在哪里会失败。**

推荐 baseline：**DIAMOND**。

- 项目页：[diamond-wm.github.io](https://diamond-wm.github.io/)
- 代码：[eloialonso/diamond](https://github.com/eloialonso/diamond)
- 论文：[arXiv:2405.12399](https://arxiv.org/abs/2405.12399)

为什么选它：

1. 它足够热门，代表 diffusion world model 路线。
2. Atari 环境比真实机器人便宜，适合复现和做 ablation。
3. 结果可视化，适合观察 rollout drift、action fidelity、速度瓶颈。
4. 它和 Dreamer/JEPA 形成很好的对照：像素预测到底带来了什么，又付出了什么成本？

### 练习 0：先写 baseline card，不急着跑代码

在动手前，先填这张卡。你可以让 vibe coding agent 帮你读 README、论文和配置文件，但最后判断要自己写。

| 项目 | 你的记录 |
|---|---|
| Baseline 名称 | DIAMOND |
| 输入 | 过去帧？动作？reward？done？ |
| 输出 | 下一帧？latent？reward？policy action？ |
| State representation | pixel、latent，还是混合？ |
| Action conditioning | 动作如何进入 world model？ |
| Training data | Atari 交互数据还是 offline dataset？ |
| World model loss | diffusion loss？reward/value loss？ |
| Policy 如何训练 | 在真实环境、world model，还是两者交替？ |
| 主要评估指标 | Atari score、rollout quality、速度？ |
| 你预计的瓶颈 | 采样速度、长程一致性、动作忠实度、显存？ |

可以直接给 coding agent 这样的任务：

```text
请阅读 DIAMOND 仓库 README、配置文件和训练入口，帮我整理一个 baseline card：输入、输出、训练数据、world model loss、agent training loop、评估命令、最小可运行配置。不要改代码，先只总结。
```

### 练习 1：跑最小复现，不追求 SOTA 分数

目标不是把 Atari 100K 全部复现到论文分数，而是跑通最小闭环：

```text
安装环境 → 选择一个小游戏/预训练配置 → 跑 world model rollout → 保存真实帧与 imagined 帧 → 记录速度和失败样例
```

记录三类产物：

1. 一段真实环境帧序列。
2. 一段 world model imagined rollout。
3. 一张训练/评估日志截图或表格。

不要在第一轮就调参。第一轮只回答：这个 repo 的最小工作路径是什么？哪些依赖最容易卡？显存和时间成本是多少？

### 练习 2：做 counterfactual action test

世界模型是否真的懂 action，不能只看一条 rollout。要固定同一个初始状态，喂不同动作序列，看未来是否产生合理差异。

设计一个小表：

| 初始状态 | 动作序列 A | 动作序列 B | 预测差异 | 是否符合环境逻辑 |
|---|---|---|---|---|
| ball 在左侧 | 连续 left | 连续 right | ? | ? |
| 敌人靠近 | no-op | fire / jump | ? | ? |
| 即将碰撞 | accelerate | brake | ? | ? |

观察重点：

- 模型是否对动作敏感？
- 不同动作只改变局部像素，还是改变游戏状态？
- 预测差异是否会随着 rollout horizon 变弱？

可以让 vibe coding agent 帮你写评估脚本，但不要让它替你下结论。你要自己看 rollout，判断模型到底有没有学到 action → future 的因果关系。

### 练习 3：画出 rollout horizon 曲线

把 imagined rollout 按 horizon 分段比较：1 step、5 step、10 step、20 step、50 step。

你要记录：

| Horizon | 视觉质量 | 状态一致性 | 动作响应 | 速度 | 典型失败 |
|---|---|---|---|---|---|
| 1 | ? | ? | ? | ? | ? |
| 5 | ? | ? | ? | ? | ? |
| 10 | ? | ? | ? | ? | ? |
| 20 | ? | ? | ? | ? | ? |
| 50 | ? | ? | ? | ? | ? |

这一步的中心判断是：**这个世界模型可用的 planning horizon 到底有多长？**

如果 5 步以内很稳，20 步开始漂，那它适合 short-horizon MPC；如果 50 步仍然稳，但速度太慢，它可能适合离线 evaluation，不适合 real-time control。

### 练习 4：和 DreamerV3 做概念对照

不一定要完整复现 DreamerV3，但至少要做一张对照表：

| 维度 | DIAMOND | DreamerV3 |
|---|---|---|
| 预测空间 | 像素/视觉细节更强 | latent state |
| 采样成本 | 高，扩散多步去噪 | 较低 |
| policy training | 在 diffusion world model 的 dream 中训练 | actor-critic in RSSM imagination |
| 长程一致性 | 需要实测 | RSSM 结构更偏长程状态 |
| 可解释性 | 画面直观 | latent 难直接看 |
| 适合用途 | 可视化、Atari、视觉细节关键任务 | 数据高效 RL、连续控制 |

这张表不要照抄论文。要结合你自己的复现观察改写。比如“DIAMOND 视觉更清晰”只有在你真的看到 rollout 对比后，才应该写成你的结论。

### 练习 5：写一页“world model 评估报告”

最后输出一页报告，结构固定：

1. 我复现了什么 baseline。
2. 最小运行路径是什么。
3. 它最明显的优势是什么。
4. 它在哪些 horizon / 场景下开始失败。
5. 它更适合 evaluation、planning、training gym 还是 synthetic data。
6. 如果我要把它迁移到机器人，我第一步会改什么。

报告里必须有一个保守判断句，例如：

> 我目前的判断：DIAMOND 这类 diffusion world model 在需要保留视觉细节的离散环境中很有吸引力，但如果直接搬到真实机器人闭环控制，最大瓶颈可能不是画质，而是 action fidelity、采样延迟和接触动力学。

这类练习比“从零写一个玩具 RSSM”更贴近现在的技术栈。真正的训练不是写出 200 行模型代码，而是能读懂 baseline、复现最小结果、设计压力测试，并判断它是否值得放进你的机器人 pipeline。

---

## 5.9 常见踩坑 FAQ

**Q：世界模型是不是等于视频生成模型？**
A：不是。视频生成模型可以是世界模型的一种实现，但 world modeling 的核心是预测 action 之后的未来状态，并服务于规划、训练或评估。如果不能证明 action fidelity 和任务收益，视频再清晰也只能说明它是强生成模型。

**Q：JEPA 不生成图像，怎么知道它真的学到了世界？**
A：不能只靠直觉相信 embedding。要看它能不能支持 downstream planning、goal reaching、policy ranking 或真实机器人任务。如果 embedding prediction 好，但接不上动作选择，那它更像 representation learner。

**Q：为什么不直接用物理仿真器？**
A：物理仿真器仍然重要，尤其在几何、碰撞、可控实验上很强。世界模型的优势是可以从真实数据中学习难建模的外观、长尾场景和部分隐含动力学。短期更现实的路线不是替代 simulator，而是 learned world model + simulator + real data 混合使用。

**Q：世界模型能替代 VLA 吗？**
A：不一定。VLA 直接学 observation/language 到 action；world model 学 action 后的未来。它们可以分工：VLA 提 proposal，world model 做评估或 refinement；也可以融合成 WAM。但在很多任务里，端到端 VLA 仍然是更简单的 baseline。

**Q：我应该先复现 DreamerV3 还是 DIAMOND？**
A：如果目标是理解 model-based RL 的闭环，先看 DreamerV3；如果目标是做一个更符合当下讨论、可视化更直观的 baseline 复盘，先做 DIAMOND。对本教程来说，我建议先用 DIAMOND 做练习，再回头用 DreamerV3 理解 latent dynamics 的优势。

**Q：世界模型最容易被高估的地方是什么？**
A：把“看起来像未来”误认为“能用于控制”。机器人最需要的是反事实动作预测、接触一致性、长期记忆和真实任务提升。漂亮 rollout 只是第一层证据。

**Q：世界模型最可能先落地在哪里？**
A：我目前更看好 evaluation 和 synthetic data。它们不要求世界模型在部署时实时闭环控制，容错空间更大，也更容易用真实任务收益来验证。Direct planning 和 training gym 更激动人心，但对模型误差、延迟和安全边界要求更高。

---

## 参考阅读

- Yann LeCun, [A Path Towards Autonomous Machine Intelligence](https://openreview.net/pdf?id=BZ5a1r-kVsf)
- Hafner et al., [Learning Latent Dynamics for Planning from Pixels / PlaNet](https://arxiv.org/abs/1811.04551)
- Hafner et al., [Mastering Diverse Domains through World Models / DreamerV3](https://arxiv.org/abs/2301.04104)
- Alonso et al., [Diffusion for World Modeling: Visual Details Matter in Atari / DIAMOND](https://arxiv.org/abs/2405.12399)，[项目页](https://diamond-wm.github.io/)，[代码](https://github.com/eloialonso/diamond)
- Meta AI, [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985)，[官方博客](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/)
- Google DeepMind, [Genie 2: A large-scale foundation world model](https://deepmind.google/blog/genie-2-a-large-scale-foundation-world-model/)
- NVIDIA, [Cosmos World Foundation Models](https://blogs.nvidia.com/blog/cosmos-world-foundation-models/)，[arXiv 论文](https://arxiv.org/abs/2501.03575)
- Wu et al., [DayDreamer: World Models for Physical Robot Learning](https://arxiv.org/abs/2206.14176)
- 还是菜，[“World model” 参考文章（知乎）](https://www.zhihu.com/question/2015943067778183463/answer/2034559787409654429)：本文的“world model 是问题陈述而不是单一架构”、范式划分和 robotics lifecycle 视角受这篇文章启发；本站内容已重新组织与改写，没有复用原文段落。
