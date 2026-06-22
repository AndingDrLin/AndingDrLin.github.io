export const meta = {
  name: 'pe-notes-phase1-analysis',
  description: 'Phase 1: 分析 7 个章节与四年真题的差距，生成优先级排序的修改计划',
  phases: [
    { title: 'Analyze', detail: '7 个 agent 并行分析所有章节' },
    { title: 'Prioritize', detail: '汇总排序生成 _todo.md' },
  ],
}

// ── Chapter → Exam mapping ────────────────────────────────

const CHAPTERS = [
  {
    id: 'waveform',
    file: 'src/content/notes/pe-notes/01-waveform-basics.md',
    topic: '波形计算 (Average/RMS/Form Factor)',
    exam: `2022Q1a[5分]: L=1mH梯形电流→avg+RMS+画vL | 2023Q1a[5分]: 锯齿波T=10ms Vm=200V→画全波整流波形+avg+RMS+FF | 2025Q1a[5分]: 含负值分段电流→avg+RMS+FF`,
  },
  {
    id: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    topic: '二极管整流 + PIV + 稳压电源',
    exam: `2022Q1e[5分]: 中心抽头120Vrms→类型+波形+PIV | 2022Q2[25分]: 桥式+电容60sin(100πt)→纹波+PIV+去电容波形+RMS+算C+Cs增大影响+优缺点 | 2023Q1e[5分]: 桥式25sin(100πt)→峰值输出+波形+PIV | 2024Q1e[5分]: 中心抽头170sin(100πt)初级→次级和负载波形+PIV | 2024Q2[25分]: 完整稳压电源链110V±8% 60Hz reg7% η90% 桥式 Vf=1V θ=30° FF=2.7 C=10mF→最小次级电压+稳压器功耗+电容耐压+PIV+VA | 2025Q1e[5分]: 中心抽头80Vrms Vf=0.7V→类型+次级峰值+波形+PIV+二极管峰值电流 | 2025Q2ab[10分]: 半波+电容10sin(100πt)→纹波+PIV+去电容画波形(含Vf=1V)`,
  },
  {
    id: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    topic: 'SCR 相控',
    exam: `2022Q1d[5分]: SCR工作原理+画负载电压波形 | 2023Q1c[5分]: 反并联SCR+画两种α电流波形 | 2024Q1a[5分]: SCR桥式DC电机→从零推导Vavg公式+α=90°数值 | 2024Q1b[5分]: SCR原理+画波形 | 2025Q1b[5分]: 反并联SCR+画两种α电流波形 | 2025Q2c[15分]: SCR替换二极管→半控原因+DC不适合+画波形+完整推导avg/RMS`,
  },
  {
    id: 'mosfet',
    file: 'src/content/notes/pe-notes/04-power-switches-losses.md',
    topic: 'MOSFET 损耗 + 二极管损耗',
    exam: `2023Q2[25分]: ION=16A IOFF=24A D=50% V=200V RDS=50mΩ Ton=25ns Toff=30ns→画波形标数值+avg+RMS+导通损耗+开关损耗+总损耗+"减半fs是否有效?" | 2025Q1d[5分]: 共用散热器TO220×2(MOSFET 1W+Diode 2W) θJC=3 θCA=60→无散热器安全否+选散热器`,
  },
  {
    id: 'thermal',
    file: 'src/content/notes/pe-notes/05-thermal-heatsink.md',
    topic: '热设计 + 散热器 + 降额',
    exam: `2022Q4c[9分]: 二极管200W θJC=0.1 heatsink=0.15 θCS=0.04→热路图+Ts/Tc/Tj | 2023Q1d[2分]: 晶体管2W θJC=5 heatsink=50→Tj | 2024Q1d[5分]: 降额题 TIP120 40W TA=30°C θCS=0.5 65W@25°C降额0.5W/°C→选散热器。TIP3055 90W@25°C降额0.7W/°C | 2025Q1d[5分]: 共用散热器TO220×2 θJC=3 θCA=60`,
  },
  {
    id: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    topic: '缓冲电路 + 反激变换器',
    exam: `2022Q4ab[12分]: Snubber作用[4分]+电阻功耗[3分]+di/dt[3分]+峰值电压[2分]+振铃频率[4分] | 2024Q3b[8分]: 感性负载开关电路→选snubber类型+理由+画加snubber的电路`,
  },
  {
    id: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    topic: 'DC-DC 变换器',
    exam: `2022Q3[25分]: Buck 12→5V/500mA 50kHz 100μH→duty+Iavg+vL+diL/dt+ΔiL+Imax/Imin+画4波形+线性稳压效率 | 2023Q3[25分]: Buck-Boost 20→10V 10Ω 50kHz 边界CCM→概念+从零推导Vo[8分]+L临界值+画4波形[8分]+替代方案 | 2024Q3ai[9分]: Buck从零推导Vo | 2024Q3aii[8分]: 选隔离变换器+电路+公式 | 2025Q3a[20分]: Buck 12→7.5V/5W 100kHz 50μH→识别+推导Vo+duty+ON time+Iavg+推导ΔiL+Imax/Imin | 2025Q3b[5分]: Flyback 16-32V→24V选型+公式`,
  },
  {
    id: 'inverter',
    file: 'src/content/notes/pe-notes/08-dc-ac-inverters-pwm.md',
    topic: '逆变器 + PWM',
    exam: `2023Q4[25分]: 三相PWM→vAB/vBC/vCA[9分]+方波[4分]+三相优于单相[4分]+改相序[4分]+直通+防护[4分] | 2024Q4a[13分]: 三相方波真值表6状态→TA+/TB+/TC+/vAB/vBC/vCA | 2024Q4b[12分]: 单相全桥→选PWM模式+理由[5分]+画驱动波形[3分]+开关条件[4分] | 2025Q4[25分]: 两种PWM类型→波形[5分]+开关条件[6分]+电路图[6分]+谐波ma/mf[3分]+性能比较[3分]`,
  },
]

// ── Phase 1: Parallel analysis ───────────────────────────
phase('Analyze')

const analyses = await parallel(
  CHAPTERS.map(ch => () => agent(
    `你是电力电子课程笔记审核专家。逐题对照真题，找出笔记让学生"看了却不会做题"的所有缺陷。

## 章节
文件: ${ch.file}
主题: ${ch.topic}

## 对应真题
${ch.exam}

## 审核标准
读者已粗略看过笔记但没学会。需要能看懂推导、照着步骤做题、回答概念题。

## 操作
1. Read 文件
2. 逐题检查：笔记内容能否让学生做出这道题？
3. 对每个 gap 输出: what / examRef / estimatedMarks / howToAdd / priority(1-5, 1最高)

用中文输出。`,
    {
      label: `analyze:${ch.id}`,
      phase: 'Analyze',
      schema: {
        type: 'object',
        properties: {
          score: { type: 'number', description: '0-100, 读完这章能否做出对应真题' },
          gaps: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                what: { type: 'string' },
                examRef: { type: 'string' },
                estimatedMarks: { type: 'number' },
                howToAdd: { type: 'string' },
                priority: { type: 'number' },
              },
            },
          },
        },
        required: ['score', 'gaps'],
      },
    }
  ))
)

// ── Phase 2: Prioritize ──────────────────────────────────
phase('Prioritize')

const prioritized = await agent(
  `汇总以下分析结果，按提分效率排序，生成修改计划。

${CHAPTERS.map((ch, i) => `### ${ch.topic} (评分: ${analyses[i]?.score}/100)\n${analyses[i]?.gaps?.map(g => `- [${g.examRef}] ${g.what} (${g.estimatedMarks}分) P${g.priority}`).join('\n') ?? '无 gap'}`).join('\n\n')}

输出 JSON: { sortedGaps: [{chapterId, chapterFile, ...gap}], totalMissingMarks }`,
  {
    label: 'prioritize',
    phase: 'Prioritize',
    schema: {
      type: 'object',
      properties: {
        sortedGaps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              chapterId: { type: 'string' },
              chapterFile: { type: 'string' },
              what: { type: 'string' },
              examRef: { type: 'string' },
              estimatedMarks: { type: 'number' },
              howToAdd: { type: 'string' },
              priority: { type: 'number' },
            },
          },
        },
        totalMissingMarks: { type: 'number' },
      },
      required: ['sortedGaps', 'totalMissingMarks'],
    },
  }
)

// Save todo list
await agent(
  `将以下 JSON 数据写入文件 src/content/notes/pe-notes/_todo.md（覆盖已有内容）：

\`\`\`json
${JSON.stringify(prioritized, null, 2)}
\`\`\`

用 Write 工具写入。文件格式：第一行是 JSON 代码块。`,
  { label: 'save-todo', phase: 'Prioritize' }
)

log(`Phase 1 完成。总缺失: ${prioritized?.totalMissingMarks} 分, 共 ${prioritized?.sortedGaps?.length} 个 gap`)
return { analyses, prioritized }
