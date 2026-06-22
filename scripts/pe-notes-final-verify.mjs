export const meta = {
  name: 'pe-notes-final-verify',
  description: '最终验证：逐题评分电力电子笔记，输出预估考试得分',
  phases: [
    { title: 'Verify', detail: '8 个 agent 逐章评分' },
  ],
}

const CHAPTERS = [
  {
    id: 'waveform',
    file: 'src/content/notes/pe-notes/01-waveform-basics.md',
    topic: '波形计算 (Average/RMS/Form Factor)',
    exam: `2022Q1a[5分]: L=1mH梯形电流→avg+RMS+画vL | 2023Q1a[5分]: 锯齿波T=10ms Vm=200V→画全波整流波形+avg+RMS+FF | 2025Q1a[5分]: 含负值分段电流→avg+RMS+FF`,
    totalMarks: 15,
  },
  {
    id: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    topic: '二极管整流 + PIV + 稳压电源',
    exam: `2022Q1e[5分]+2022Q2[25分]+2023Q1e[5分]+2024Q1e[5分]+2024Q2[25分]+2025Q1e[5分]+2025Q2ab[10分]`,
    totalMarks: 80,
  },
  {
    id: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    topic: 'SCR 相控',
    exam: `2022Q1d[5分]+2023Q1c[5分]+2024Q1a[5分]+2024Q1b[5分]+2025Q1b[5分]+2025Q2c[15分]`,
    totalMarks: 40,
  },
  {
    id: 'mosfet',
    file: 'src/content/notes/pe-notes/04-power-switches-losses.md',
    topic: 'MOSFET 损耗 + 二极管损耗',
    exam: `2023Q2[25分]+2025Q1d[5分]`,
    totalMarks: 30,
  },
  {
    id: 'thermal',
    file: 'src/content/notes/pe-notes/05-thermal-heatsink.md',
    topic: '热设计 + 散热器 + 降额',
    exam: `2022Q4c[9分]+2023Q1d[2分]+2024Q1d[5分]+2025Q1d[5分]`,
    totalMarks: 21,
  },
  {
    id: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    topic: '缓冲电路 + 反激变换器',
    exam: `2022Q4ab[12分]+2024Q3b[8分]`,
    totalMarks: 20,
  },
  {
    id: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    topic: 'DC-DC 变换器',
    exam: `2022Q3[25分]+2023Q3[25分]+2024Q3ai[9分]+2024Q3aii[8分]+2025Q3a[20分]+2025Q3b[5分]`,
    totalMarks: 92,
  },
  {
    id: 'inverter',
    file: 'src/content/notes/pe-notes/08-dc-ac-inverters-pwm.md',
    topic: '逆变器 + PWM',
    exam: `2023Q4[25分]+2024Q4a[13分]+2024Q4b[12分]+2025Q4[25分]`,
    totalMarks: 75,
  },
]

phase('Verify')

const results = await parallel(
  CHAPTERS.map(ch => () => agent(
    `你是电力电子课程考试评分员。验证 ${ch.file} 的笔记能否让学生在考试中得分。

## 章节信息
- 主题: ${ch.topic}
- 对应真题: ${ch.exam}
- 该章节总分: ${ch.totalMarks} 分

## 评分标准
假设学生"粗略看过笔记但基本没学会"，修改后的笔记能否让他们：
1. 看懂推导过程
2. 照着步骤做题
3. 回答概念题

## 操作
1. Read ${ch.file}
2. 逐题验证：笔记内容能否让学生做出这道题？能得多少分？
3. 给出章节总分和具体问题列表

用中文输出。`,
    {
      label: `verify:${ch.id}`,
      phase: 'Verify',
      effort: 'max',
      schema: {
        type: 'object',
        properties: {
          chapterScore: { type: 'number', description: '0-100 章节得分率' },
          questionResults: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                examRef: { type: 'string' },
                totalMarks: { type: 'number' },
                estimatedMarks: { type: 'number' },
                canSolve: { type: 'boolean' },
                missing: { type: 'string' },
              },
            },
          },
          overallAssessment: { type: 'string' },
        },
        required: ['chapterScore', 'questionResults', 'overallAssessment'],
      },
    }
  ))
)

// Calculate totals
let totalExamMarks = 0
let totalEstimatedMarks = 0
const chapterSummary = []

for (let i = 0; i < CHAPTERS.length; i++) {
  const ch = CHAPTERS[i]
  const result = results[i]

  let chTotal = 0
  let chEstimated = 0
  for (const q of (result?.questionResults ?? [])) {
    chTotal += q.totalMarks
    chEstimated += q.estimatedMarks
  }

  totalExamMarks += chTotal
  totalEstimatedMarks += chEstimated

  chapterSummary.push({
    topic: ch.topic,
    score: result?.chapterScore ?? 0,
    estimated: chEstimated,
    total: chTotal,
    assessment: result?.overallAssessment ?? '',
    questions: result?.questionResults ?? [],
  })
}

const estimatedPercentage = totalExamMarks > 0 ? Math.round(totalEstimatedMarks / totalExamMarks * 100) : 0

log(`\n═══════════════════════════════════════════`)
log(`最终评分结果`)
log(`═══════════════════════════════════════════`)
log(`预估考试得分: ${estimatedPercentage}% (${totalEstimatedMarks}/${totalExamMarks})`)
log(`\n各章节评分:`)
for (const ch of chapterSummary) {
  log(`  ${ch.topic}: ${ch.score}/100 (${ch.estimated}/${ch.total}分)`)
}

// Write final report
await agent(
  `将以下结果写入 src/content/notes/pe-notes/_final-report.md:

# 电力电子笔记优化最终报告

## 预估考试得分: ${estimatedPercentage}% (${totalEstimatedMarks}/${totalExamMarks}分)

## 各章节评分详情

${chapterSummary.map(ch => `### ${ch.topic}: ${ch.score}/100

**预估得分: ${ch.estimated}/${ch.total}分**

${ch.questions.map(q => `- ${q.examRef} [${q.totalMarks}分]: ${q.canSolve ? '✓' : '✗'} 预估${q.estimatedMarks}分 ${q.missing || ''}`).join('\n')}

**评价:** ${ch.assessment}
`).join('\n---\n\n')}

## 改进建议

${chapterSummary.filter(ch => ch.score < 80).map(ch => `- **${ch.topic}** (${ch.score}/100): ${ch.questions.filter(q => !q.canSolve).map(q => q.missing).join('; ')}`).join('\n') || '所有章节均达到80分以上'}

用 Write 工具写入。`,
  { label: 'save-report', phase: 'Verify' }
)

return { estimatedPercentage, totalEstimatedMarks, totalExamMarks, chapterSummary }
