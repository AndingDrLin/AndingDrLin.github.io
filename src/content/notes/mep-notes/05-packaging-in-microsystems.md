---
title: "第5章 Packaging in Microsystems"
description: "Microsystem、MEMS 与汽车、通信、医疗等行业中的封装角色。"
date: 2026-06-11
tags: [microelectronics-packaging, microsystems, MEMS]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 5
draft: false
---
## 考试要会什么

本章对应 Lecture 5。重点不是背行业介绍，而是理解 microsystem packaging 为什么比普通 IC packaging 更复杂。

高频问法：

- What is a microsystem?
- What is the role of packaging in MEMS devices?
- Why is MEMS packaging more complex than traditional semiconductor packaging?
- What packaging requirements appear in automotive / medical / telecom applications?

## 一句话记忆

**Microsystem packaging 不只保护电路，还要允许系统和环境发生 sensing、actuation、optical/fluidic/RF interaction。**

## 核心概念

Microsystems can combine microelectronics, MEMS, RF, photonics, sensors, actuators and wireless functions. 它们不仅处理电子信号，还要和环境交互。

MEMS packaging 的复杂性来自：

| 特点 | 封装要求 |
|---|---|
| moving microstructures | 不能把结构压死，需要 cavity / clearance |
| sensing environment | 需要 pressure/optical/fluidic/acoustic access |
| high sensitivity | 需要防 vibration、stress、contamination |
| reliability critical | 医疗/汽车场景要求长期稳定 |
| mixed domains | electrical + mechanical + thermal + fluidic/optical/RF |

## 行业应用

| 行业 | 典型要求 | 封装重点 |
|---|---|---|
| Automotive | harsh environment, temperature, vibration | robust materials, thermal and mechanical reliability |
| Medical electronics | implantable, ultra-reliable, small size, longevity | hermetic sealing, biocompatibility, low power |
| Telecommunication | high speed, multimedia, RF | signal integrity, heat removal, miniaturization |
| Industrial / aerospace | shock, vibration, long lifetime | mechanical protection and reliability testing |

## 题型模板

### 题型：Why is MEMS packaging more complex?

1. MEMS includes mechanical microstructures as well as electrical circuits。
2. The package must protect the device but still allow interaction with the environment。
3. It may require hermetic sealing, controlled cavity, optical/fluidic/RF ports。
4. Mechanical stress from package can shift sensor output or block moving parts。
5. Therefore MEMS packaging is device-specific and often dominates cost and reliability。

## 易错点

- 不要把 MEMS packaging 写成普通 IC 的 “wire + mold”。
- 行业应用题要写 requirement，不要只列 product name。
- “environmental access”和“environmental protection”是矛盾统一：既要接触环境，又不能被环境破坏。

## 本章概览

Microsystems packaging 的难点在于：系统不只是计算，还要 sensing、actuation、communication 或 interaction with environment。普通 IC package 往往追求隔绝环境，而 MEMS / microsystem package 可能既要保护器件，又要让 pressure、light、fluid、sound 或 motion 进入。

### 零基础先览

- **Microsystem**：由 microelectronics、MEMS、RF、photonics、sensors/actuators 等组成的小型集成系统。
- **MEMS**：把 electrical function 和 micro-mechanical elements 结合。
- **Packaging role**：不仅 connect/protect/cool，还要提供 controlled environmental access。
- **复杂原因**：moving structures、sensitivity、hermetic sealing、calibration、bio/auto harsh requirements。

## Microsystem anatomy

Microsystem 通常可包含：

- processor / control circuit；
- sensor；
- actuator；
- RF / optical / fluidic interface；
- power source；
- package/substrate/interconnect；
- software or signal processing path。

封装要把这些 parts 变成一个可制造、可测试、可使用的 system。

## Why MEMS packaging is different

| 普通 IC packaging | MEMS packaging |
|---|---|
| mainly protects electronic circuits | protects mechanical microstructures and electronics |
| often wants isolation from environment | often needs controlled access to environment |
| electrical I/O dominant | electrical + mechanical + fluidic/optical/acoustic paths |
| stress mainly affects reliability | stress may directly shift sensor output |
| standard package possible | device-specific package common |

## Industry examples

### Automotive

汽车电子面对 high/low temperature、vibration、shock、moisture、long lifetime。Airbag accelerometer 是 MEMS 的典型例子。封装必须在 harsh environment 下保证 sensor 输出稳定。

### Medical

Implantable medical electronics 要求 ultra-reliable、small size、long lifetime、biocompatibility。Package 既要 protect electronics from body fluid，也要允许必要 sensing/stimulation。

### Telecommunication

通信系统强调 high-speed/RF performance、thermal and electromagnetic issues。Package 需要控制 signal integrity 和 heat dissipation。

## 标准答案：MEMS packaging complexity

> MEMS packaging is more complex than traditional IC packaging because MEMS devices contain moving microstructures and often need to interact with the external environment. The package must protect the device from contamination and mechanical damage while allowing pressure, motion, optical, acoustic or fluidic signals to reach the sensing element. Package-induced stress can change sensor calibration or block moving parts. Therefore MEMS packaging often requires cavities, hermetic sealing, special materials and device-specific mechanical design.

## 高频错项

- “MEMS package just seals the device” → 不完整。它常常需要 controlled access。
- “MEMS failure is only electrical” → 错。mechanical sticking、stress shift、contamination 都可能失效。
- “所有 microsystem package 都可标准化” → 错。很多 MEMS package strongly device-specific。

## Self-check

- [ ] 是否解释了 environmental access？
- [ ] 是否说明 moving structure 对封装的影响？
- [ ] 行业题是否写了 requirement 而不是只写 application name？
- [ ] 是否把 reliability、size、functionality、longevity 联系起来？

## Reference

- Lecture 5: anatomy of microsystem, role in automotive/medical/telecommunication, MEMS applications。
- Background doc: What are Microsystem/Microelectronics。

## 来源说明

Slides-backed: Lecture 5。Exam-signal: L1/L5 学长整理多次强调 microsystem 与 MEMS 的作用。
