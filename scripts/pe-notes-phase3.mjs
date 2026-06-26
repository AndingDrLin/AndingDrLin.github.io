/**
 * Claude Code 工作流脚本 —— 不能用 `node` 直接运行。
 * 由 Claude Code Workflow 引擎注入 phase/agent/parallel/pipeline/log 等全局函数。
 * 如需运行，请在 Claude Code 会话中通过 Workflow 工具调用。
 */

export const meta = {
  name: 'pe-notes-phase3-targeted-fixes',
  description: 'Phase 3: 针对性修复 4 个薄弱章节，目标从 79% 提升到 90%+',
  phases: [
    { title: 'Fix Snubber', detail: '修复缓冲电路章节 (65% → 90%+)' },
    { title: 'Fix DC-DC', detail: '修复 DC-DC 变换器章节 (66% → 90%+)' },
    { title: 'Fix Rectifier', detail: '修复二极管整流章节 (70% → 90%+)' },
    { title: 'Fix SCR', detail: '修复 SCR 相控章节 (75% → 90%+)' },
    { title: 'Final Verify', detail: '验证所有章节达到 90%+' },
  ],
}

// ── Targeted fixes for each chapter ─────────────────────

const FIXES = [
  // Snubber chapter (65% -> 90%)
  {
    id: 'sn-fix1',
    chapter: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    priority: 1,
    what: '修复RCD缓冲电路电阻接法描述矛盾',
    examRef: '2024Q3b[8分]',
    marks: 4,
    details: 'ASCII图画成串联，文字说并联，第87行说"三者串联"。需要统一为标准RCD并联电路：R与C并联，再与D串联。提供正确的电路图SVG。',
  },
  {
    id: 'sn-fix2',
    chapter: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    priority: 1,
    what: '解决缓冲电容选值矛盾（1.2nF vs 150pF）',
    examRef: '2022Q4ab[12分]',
    marks: 3,
    details: '两个公式给出不同结果，需要说明优先级和适用条件。建议：C = I×dt/dV用于初始设计，150pF是经验值/最小值，考试时用题目给定参数。',
  },
  {
    id: 'sn-fix3',
    chapter: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    priority: 2,
    what: '补充di/dt计算中Vdc=200V的来源说明',
    examRef: '2022Q4ab[12分]',
    marks: 2,
    details: '在计算前明确：Vdc是题目给定的直流母线电压，或从交流输入推导（如Vdc=√2×Vrms）。',
  },
  {
    id: 'sn-fix4',
    chapter: 'snubber',
    file: 'src/content/notes/pe-notes/06-snubber-flyback.md',
    priority: 2,
    what: '扩展反激变换器部分，添加完整数值例题',
    examRef: '2024Q3aii[8分]+2025Q3b[5分]',
    marks: 5,
    details: '添加Flyback完整设计例题：给定Vin=24V, Vo=12V, Po=24W, f=100kHz→求匝比、占空比、电感值、二极管PIV。包含完整计算步骤。',
  },

  // DC-DC chapter (66% -> 90%)
  {
    id: 'dc-fix1',
    chapter: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    priority: 1,
    what: '添加Buck/Boost/Buck-Boost拓扑电路图SVG',
    examRef: '2022Q3+2023Q3+2024Q3ai',
    marks: 8,
    details: '学生需要画出电路图才能得分。添加3个SVG：Buck（开关+二极管+LC）、Boost（开关+二极管+LC不同连接）、Buck-Boost。标注关键元件和电流路径。',
  },
  {
    id: 'dc-fix2',
    chapter: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    priority: 1,
    what: '添加Buck续流二极管PIV计算',
    examRef: '2022Q3[25分]',
    marks: 3,
    details: 'Buck中续流二极管PIV=Vin（开关导通时，二极管阳极接地，阴极接Vin）。在Buck小节添加PIV说明和推导。',
  },
  {
    id: 'dc-fix3',
    chapter: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    priority: 1,
    what: '补充Buck-Boost临界电感完整推导（2023Q3）',
    examRef: '2023Q3[25分]',
    marks: 7,
    details: '从ΔiL=2IL,avg出发，代入Buck-Boost的IL,avg=Io/(1-D)和ΔiL=Vin×D/(L×fs)，解出Lcritical。每步不跳。',
  },
  {
    id: 'dc-fix4',
    chapter: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    priority: 2,
    what: '添加Boost完整例题（含拓扑识别、波形、Imax/Imin）',
    examRef: '2024Q3ai[9分]',
    marks: 4,
    details: '2024Q3ai考Boost推导Vo。需要完整例题：Vin=12V, Vo=24V, fs=50kHz, L=100μH→求D、ΔiL、Imax/Imin、画vL和iL波形。',
  },
  {
    id: 'dc-fix5',
    chapter: 'dcdc',
    file: 'src/content/notes/pe-notes/07-dc-dc-converters.md',
    priority: 2,
    what: '添加Flyback vs Forward对比和选型依据',
    examRef: '2024Q3aii[8分]',
    marks: 3,
    details: '添加对比表：Flyback（<100W，简单，成本低）vs Forward（100-500W，效率高，复杂）。说明为什么选Flyback不选Forward。',
  },

  // Rectifier chapter (70% -> 90%)
  {
    id: 're-fix1',
    chapter: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    priority: 1,
    what: '添加半波/桥式/中心抽头波形画法SVG和分步标注指南',
    examRef: '2022Q2+2023Q1e+2024Q1e+2025Q1e+2025Q2ab',
    marks: 10,
    details: '考试必考画波形，但笔记只有文字描述。添加3个SVG：半波（正半周有输出，负半周为0）、桥式（正负半周都翻成正）、中心抽头（两个二极管轮流导通）。每个标注：导通区间、Vf偏移、峰值位置。',
  },
  {
    id: 're-fix2',
    chapter: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    priority: 1,
    what: '完善稳压器功耗推导，补全中间步骤',
    examRef: '2024Q2[25分]',
    marks: 4,
    details: '当前功耗推导跳步。需要：(1)明确Preg=(Vin-Vout)×Iload；(2)说明Vin取最坏情况（纹波谷值或峰值）；(3)给出完整数值代入过程；(4)解释为什么功耗=热耗散。',
  },
  {
    id: 're-fix3',
    chapter: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    priority: 1,
    what: '补充VA计算的电压条件说明',
    examRef: '2024Q2[25分]',
    marks: 3,
    details: 'VA=Vrms×Irms，但用哪个Vrms？需要说明：(1)用次级电压的RMS；(2)Irms=FF×Idc；(3)完整代入过程。',
  },
  {
    id: 're-fix4',
    chapter: 'rectifier',
    file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md',
    priority: 2,
    what: '补充电容耐压选型的完整数值例题',
    examRef: '2024Q2[25分]',
    marks: 3,
    details: '当前只有公式框架。需要完整例题：给定110V±8%输入→次级电压→峰值→电容耐压≥峰值×1.2（留20%余量）。',
  },

  // SCR chapter (75% -> 90%)
  {
    id: 'sc-fix1',
    chapter: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    priority: 1,
    what: '添加半波SCR负载电压波形SVG',
    examRef: '2022Q1d[5分]+2024Q1b[5分]',
    marks: 3,
    details: '考试必考画波形。添加SVG：半波SCR感性负载，标注α触发点、导通区间[α,π]、电压过零点、续流二极管作用。',
  },
  {
    id: 'sc-fix2',
    chapter: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    priority: 1,
    what: '添加反并联SCR电路图和电流波形SVG',
    examRef: '2023Q1c[5分]+2025Q1b[5分]',
    marks: 5,
    details: '反并联SCR是高频考点。需要：(1)电路图SVG（两个SCR反向并联）；(2)α<90°和α>90°的电流波形SVG；(3)标注导通区间。',
  },
  {
    id: 'sc-fix3',
    chapter: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    priority: 1,
    what: '添加桥式SCR DC电机驱动电路图SVG',
    examRef: '2024Q1a[5分]+2025Q2c[15分]',
    marks: 5,
    details: '桥式SCR是推导题的基础。需要SVG：4个SCR组成的全桥，标注电流路径和续流二极管位置。',
  },
  {
    id: 'sc-fix4',
    chapter: 'scr',
    file: 'src/content/notes/pe-notes/03-scr-phase-control.md',
    priority: 2,
    what: '修复第536行表述歧义（线电压vs输入电压绝对值）',
    examRef: '2024Q1a[5分]',
    marks: 1,
    details: '当前"线电压vAB=Vm sinθ"易与三相系统混淆。改为"输入电压绝对值|vs|=Vm|sinθ|"。',
  },
]

// ── Phase 1: Apply targeted fixes ──────────────────────
phase('Fix Snubber')

const snFixes = FIXES.filter(f => f.chapter === 'snubber')
for (const fix of snFixes) {
  log(`\n修复: ${fix.what} [${fix.examRef}]`)

  const result = await agent(
    `修改 ${fix.file} 来修复以下问题：

## 问题
${fix.what}

## 考试对应
${fix.examRef} (${fix.marks}分)

## 具体修复要求
${fix.details}

## 写作规范
1. 中文写作，术语中英双写
2. LaTeX公式: $$...$$块级, $...$行内
3. 推导完整不跳步
4. 保持"先讲清楚"/"固定套路"/"别丢分"结构
5. 如果需要添加SVG图，用详细的文字描述（包括所有元件、连线、标注），后续可以转换为SVG

## 操作
1. Read ${fix.file} 了解现有内容
2. 用 Edit 精准修改问题部分
3. 如果是描述矛盾，统一为正确的标准电路描述
4. Read 确认修改正确`,
    { label: `fix:${fix.id}`, phase: 'Fix Snubber', effort: 'high' }
  )
}

// Verify snubber
const snVerify = await agent(
  `验证 ${snFixes[0].file} 的修复效果。

检查：
1. RCD缓冲电路接法描述是否一致？
2. 电容选值是否说明了优先级？
3. 反激变换器是否有完整数值例题？

用中文输出。`,
  {
    label: 'verify:snubber',
    phase: 'Fix Snubber',
    schema: {
      type: 'object',
      properties: {
        passed: { type: 'boolean' },
        remainingIssues: { type: 'array', items: { type: 'string' } },
      },
      required: ['passed', 'remainingIssues'],
    },
  }
)

if (!snVerify?.passed) {
  log(`缓冲电路仍有问题: ${snVerify?.remainingIssues?.join(', ')}`)
}

// ── Phase 2: Fix DC-DC ─────────────────────────────────
phase('Fix DC-DC')

const dcFixes = FIXES.filter(f => f.chapter === 'dcdc')
for (const fix of dcFixes) {
  log(`\n修复: ${fix.what} [${fix.examRef}]`)

  const result = await agent(
    `修改 ${fix.file} 来修复以下问题：

## 问题
${fix.what}

## 考试对应
${fix.examRef} (${fix.marks}分)

## 具体修复要求
${fix.details}

## 写作规范
1. 中文写作，术语中英双写
2. LaTeX公式: $$...$$块级, $...$行内
3. 推导完整不跳步
4. 保持"先讲清楚"/"固定套路"/"别丢分"结构
5. 如果需要添加SVG图，用详细的文字描述（包括所有元件、连线、标注），后续可以转换为SVG

## 操作
1. Read ${fix.file} 了解现有内容
2. 用 Edit 精准修改问题部分
3. 如果是添加拓扑图，先在文字中描述电路结构，再在assets目录创建SVG
4. Read 确认修改正确`,
    { label: `fix:${fix.id}`, phase: 'Fix DC-DC', effort: 'high' }
  )
}

// Verify DC-DC
const dcVerify = await agent(
  `验证 ${dcFixes[0].file} 的修复效果。

检查：
1. Buck/Boost/Buck-Boost是否有拓扑电路图？
2. Buck续流二极管PIV是否说明？
3. Buck-Boost临界电感推导是否完整？
4. Flyback vs Forward是否有对比？

用中文输出。`,
  {
    label: 'verify:dcdc',
    phase: 'Fix DC-DC',
    schema: {
      type: 'object',
      properties: {
        passed: { type: 'boolean' },
        remainingIssues: { type: 'array', items: { type: 'string' } },
      },
      required: ['passed', 'remainingIssues'],
    },
  }
)

if (!dcVerify?.passed) {
  log(`DC-DC仍有问题: ${dcVerify?.remainingIssues?.join(', ')}`)
}

// ── Phase 3: Fix Rectifier ─────────────────────────────
phase('Fix Rectifier')

const reFixes = FIXES.filter(f => f.chapter === 'rectifier')
for (const fix of reFixes) {
  log(`\n修复: ${fix.what} [${fix.examRef}]`)

  const result = await agent(
    `修改 ${fix.file} 来修复以下问题：

## 问题
${fix.what}

## 考试对应
${fix.examRef} (${fix.marks}分)

## 具体修复要求
${fix.details}

## 写作规范
1. 中文写作，术语中英双写
2. LaTeX公式: $$...$$块级, $...$行内
3. 推导完整不跳步
4. 保持"先讲清楚"/"固定套路"/"别丢分"结构
5. 如果需要添加SVG图，用详细的文字描述（包括所有元件、连线、标注），后续可以转换为SVG

## 操作
1. Read ${fix.file} 了解现有内容
2. 用 Edit 精准修改问题部分
3. 如果是添加波形图，先在文字中描述波形特征，再在assets目录创建SVG
4. Read 确认修改正确`,
    { label: `fix:${fix.id}`, phase: 'Fix Rectifier', effort: 'high' }
  )
}

// Verify rectifier
const reVerify = await agent(
  `验证 ${reFixes[0].file} 的修复效果。

检查：
1. 三种整流器是否有波形画法SVG？
2. 稳压器功耗推导是否完整？
3. VA计算是否说明电压条件？
4. 电容耐压是否有完整数值例题？

用中文输出。`,
  {
    label: 'verify:rectifier',
    phase: 'Fix Rectifier',
    schema: {
      type: 'object',
      properties: {
        passed: { type: 'boolean' },
        remainingIssues: { type: 'array', items: { type: 'string' } },
      },
      required: ['passed', 'remainingIssues'],
    },
  }
)

if (!reVerify?.passed) {
  log(`整流仍有问题: ${reVerify?.remainingIssues?.join(', ')}`)
}

// ── Phase 4: Fix SCR ───────────────────────────────────
phase('Fix SCR')

const scFixes = FIXES.filter(f => f.chapter === 'scr')
for (const fix of scFixes) {
  log(`\n修复: ${fix.what} [${fix.examRef}]`)

  const result = await agent(
    `修改 ${fix.file} 来修复以下问题：

## 问题
${fix.what}

## 考试对应
${fix.examRef} (${fix.marks}分)

## 具体修复要求
${fix.details}

## 写作规范
1. 中文写作，术语中英双写
2. LaTeX公式: $$...$$块级, $...$行内
3. 推导完整不跳步
4. 保持"先讲清楚"/"固定套路"/"别丢分"结构
5. 如果需要添加SVG图，用详细的文字描述（包括所有元件、连线、标注），后续可以转换为SVG

## 操作
1. Read ${fix.file} 了解现有内容
2. 用 Edit 精准修改问题部分
3. 如果是添加电路图/波形图，先在文字中描述，再在assets目录创建SVG
4. Read 确认修改正确`,
    { label: `fix:${fix.id}`, phase: 'Fix SCR', effort: 'high' }
  )
}

// Verify SCR
const scVerify = await agent(
  `验证 ${scFixes[0].file} 的修复效果。

检查：
1. 半波SCR是否有负载电压波形SVG？
2. 反并联SCR是否有电路图和电流波形SVG？
3. 桥式SCR是否有DC电机驱动电路图？
4. 第536行表述歧义是否修复？

用中文输出。`,
  {
    label: 'verify:scr',
    phase: 'Fix SCR',
    schema: {
      type: 'object',
      properties: {
        passed: { type: 'boolean' },
        remainingIssues: { type: 'array', items: { type: 'string' } },
      },
      required: ['passed', 'remainingIssues'],
    },
  }
)

if (!scVerify?.passed) {
  log(`SCR仍有问题: ${scVerify?.remainingIssues?.join(', ')}`)
}

// ── Phase 5: Final Verification ────────────────────────
phase('Final Verify')

log('\n所有修复完成，开始最终验证...')

const CHAPTERS = [
  { id: 'snubber', file: 'src/content/notes/pe-notes/06-snubber-flyback.md', topic: '缓冲电路', exam: '2022Q4ab[12分]+2024Q3b[8分]', totalMarks: 20 },
  { id: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', topic: 'DC-DC变换器', exam: '2022Q3[25分]+2023Q3[25分]+2024Q3ai[9分]+2024Q3aii[8分]+2025Q3a[20分]+2025Q3b[5分]', totalMarks: 92 },
  { id: 'rectifier', file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md', topic: '二极管整流', exam: '2022Q1e[5分]+2022Q2[25分]+2023Q1e[5分]+2024Q1e[5分]+2024Q2[25分]+2025Q1e[5分]+2025Q2ab[10分]', totalMarks: 80 },
  { id: 'scr', file: 'src/content/notes/pe-notes/03-scr-phase-control.md', topic: 'SCR相控', exam: '2022Q1d[5分]+2023Q1c[5分]+2024Q1a[5分]+2024Q1b[5分]+2025Q1b[5分]+2025Q2c[15分]', totalMarks: 40 },
]

const finalResults = await parallel(
  CHAPTERS.map(ch => () => agent(
    `验证 ${ch.file} 修复后的得分率。

章节: ${ch.topic}
真题: ${ch.exam}
总分: ${ch.totalMarks}分

逐题评分，给出预估得分。目标：≥90% (${Math.round(ch.totalMarks*0.9)}分)。

用中文输出。`,
    {
      label: `final:${ch.id}`,
      phase: 'Final Verify',
      effort: 'max',
      schema: {
        type: 'object',
        properties: {
          score: { type: 'number', description: '0-100 得分率' },
          estimatedMarks: { type: 'number' },
          passed: { type: 'boolean' },
          remainingGaps: { type: 'array', items: { type: 'string' } },
        },
        required: ['score', 'estimatedMarks', 'passed', 'remainingGaps'],
      },
    }
  ))
)

// Summary
log('\n═══════════════════════════════════════════')
log('Phase 3 最终结果')
log('═══════════════════════════════════════════')

let totalEstimated = 0
let totalMarks = 0
let allPassed = true

for (let i = 0; i < CHAPTERS.length; i++) {
  const ch = CHAPTERS[i]
  const result = finalResults[i]
  const passed = result?.passed ?? false
  const marks = result?.estimatedMarks ?? 0

  totalEstimated += marks
  totalMarks += ch.totalMarks

  if (!passed) allPassed = false

  log(`${ch.topic}: ${result?.score ?? '?'}% (${marks}/${ch.totalMarks}分) ${passed ? '✓' : '✗'}`)
  if (!passed && result?.remainingGaps?.length) {
    log(`  剩余问题: ${result.remainingGaps.join(', ')}`)
  }
}

const finalPercentage = Math.round(totalEstimated / totalMarks * 100)
log(`\n总计: ${finalPercentage}% (${totalEstimated}/${totalMarks}分)`)
log(`目标: ≥90%`)
log(`结果: ${finalPercentage >= 90 ? '✓ 达标' : '✗ 未达标，需继续修复'}`)

return { finalPercentage, totalEstimated, totalMarks, allPassed, chapterResults: finalResults }
