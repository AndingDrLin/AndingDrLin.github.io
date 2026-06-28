import type { Question } from "../../../../components/quiz/types";

export const exampleSubjectQuestions: Question[] = [
  {
    id: "sig-01-001",
    type: "single",
    questionZh: "对于线性时不变系统，冲激响应 h(t) 的主要作用是什么？",
    questionEn: "For a linear time-invariant system, what is the main role of the impulse response h(t)?",
    options: [
      {
        id: "A",
        textZh: "它完全表征系统，任意输入的输出可由输入与 h(t) 卷积得到",
        textEn: "It fully characterizes the system, and the output for any input can be obtained by convolution with h(t)"
      },
      {
        id: "B",
        textZh: "它只适用于非线性系统",
        textEn: "It applies only to nonlinear systems"
      },
      {
        id: "C",
        textZh: "它等于所有输入信号的傅里叶变换",
        textEn: "It equals the Fourier transform of all input signals"
      }
    ],
    answer: ["A"],
    explanationZh: "A 正确。LTI 系统由冲激响应完全表征，输出满足 $y(t)=x(t)*h(t)$。B 错在非线性系统不能直接用卷积完全描述；C 混淆了系统响应和信号变换。",
    tags: ["LTI系统", "卷积"],
    difficulty: "基础"
  },
  {
    id: "sig-01-002",
    type: "multiple",
    questionZh: "关于连续时间傅里叶变换，下列说法正确的是哪些？",
    questionEn: "Which statements about the continuous-time Fourier transform are correct?",
    options: [
      {
        id: "A",
        textZh: "它可以把时域卷积转化为频域乘法",
        textEn: "It can convert time-domain convolution into frequency-domain multiplication"
      },
      {
        id: "B",
        textZh: "它反映信号的频谱分布",
        textEn: "It describes the spectral distribution of a signal"
      },
      {
        id: "C",
        textZh: "所有信号都一定存在普通意义下的傅里叶变换",
        textEn: "Every signal always has an ordinary Fourier transform"
      },
      {
        id: "D",
        textZh: "频移性质与复指数调制有关",
        textEn: "The frequency-shift property is related to complex exponential modulation"
      }
    ],
    answer: ["A", "B", "D"],
    explanationZh: "A 正确，卷积定理说明时域卷积对应频域乘法。B 正确，Fourier transform 用于分析频谱。C 错误，并非所有信号都满足普通 Fourier transform 的收敛条件。D 正确，乘以复指数会导致频谱平移。",
    tags: ["傅里叶变换", "卷积"],
    difficulty: "中等"
  },
  {
    id: "sig-01-003",
    type: "true_false",
    questionZh: "若系统是线性的，则它一定也是时不变的。",
    questionEn: "If a system is linear, then it must also be time-invariant.",
    options: [],
    answer: ["false"],
    explanationZh: "该说法错误。线性和时不变是两个独立性质。一个系统可以线性但时变，也可以时不变但非线性，只有同时满足二者时才称为 LTI system。",
    tags: ["LTI系统"],
    difficulty: "基础"
  }
];
