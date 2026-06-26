/**
 * Claude Code 工作流脚本 —— 不能用 `node` 直接运行。
 * 由 Claude Code Workflow 引擎注入 phase/agent/parallel/pipeline/log 等全局函数。
 * 如需运行，请在 Claude Code 会话中通过 Workflow 工具调用。
 */

export const meta = {
  name: 'pe-notes-iterate',
  description: 'Phase 2: 持续迭代改进电力电子笔记 (10h+, 连续5轮零问题才停)',
  phases: [
    { title: 'Iterate', detail: '循环: 扫描→修改→审核→全检' },
  ],
}

// ── Hardcoded gap knowledge (from Phase 1 analysis) ──────
// These represent all known exam requirements. The iterative loop
// will use these to guide writers AND to verify completeness.

const ALL_EXAM_REQUIREMENTS = [
  // Waveform
  { id: 'w1', chapter: 'waveform', file: 'src/content/notes/pe-notes/01-waveform-basics.md', req: '锯齿波(sawtooth)完整例题: 画全波整流波形+avg+RMS+FF', exam: '2023Q1a', marks: 5 },
  { id: 'w2', chapter: 'waveform', file: 'src/content/notes/pe-notes/01-waveform-basics.md', req: '含负值波形的处理方法: average含正负抵消,RMS先平方', exam: '2025Q1a', marks: 5 },
  // Rectifier
  { id: 'r1', chapter: 'rectifier', file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md', req: '完整稳压电源反推链例题(含电网波动±8%,变压器regulation 7%,效率90%,form factor 2.7)', exam: '2024Q2', marks: 25 },
  { id: 'r2', chapter: 'rectifier', file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md', req: 'Cs增大对纹波/导通角/form factor/VA的定性分析表', exam: '2022Q2d', marks: 5 },
  { id: 'r3', chapter: 'rectifier', file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md', req: '三种整流器(半波/桥式/中心抽头)可直接答题的对比表', exam: '2022Q2e+2024Q2f', marks: 10 },
  { id: 'r4', chapter: 'rectifier', file: 'src/content/notes/pe-notes/02-diodes-rectifiers.md', req: '有二极管压降(Vf=0.7V)时的中心抽头PIV计算', exam: '2025Q1e', marks: 5 },
  // SCR
  { id: 's1', chapter: 'scr', file: 'src/content/notes/pe-notes/03-scr-phase-control.md', req: '半波SCR average和RMS的完整逐步推导(不跳步,含积分上下限代入)', exam: '2025Q2civ', marks: 6 },
  { id: 's2', chapter: 'scr', file: 'src/content/notes/pe-notes/03-scr-phase-control.md', req: 'SCR桥式驱动DC电机: Vavg=(2Vm/π)cosα完整推导+α=90°物理意义', exam: '2024Q1a', marks: 5 },
  { id: 's3', chapter: 'scr', file: 'src/content/notes/pe-notes/03-scr-phase-control.md', req: '反并联SCR电路画法和两种α的电流波形画法教学', exam: '2023Q1c+2025Q1b', marks: 10 },
  // MOSFET
  { id: 'm1', chapter: 'mosfet', file: 'src/content/notes/pe-notes/04-power-switches-losses.md', req: '非对称电流(ION≠IOFF)的MOSFET完整损耗例题: 画波形+avg+RMS+导通+开关+总+概念分析', exam: '2023Q2', marks: 25 },
  { id: 'm2', chapter: 'mosfet', file: 'src/content/notes/pe-notes/04-power-switches-losses.md', req: '共用散热器判断逻辑: 无散热器安全否+选散热器(含θCA大值情况)', exam: '2025Q1d', marks: 5 },
  // Thermal
  { id: 't1', chapter: 'thermal', file: 'src/content/notes/pe-notes/05-thermal-heatsink.md', req: '降额(derating)完整计算例题: 从降额规格反推允许功耗→选散热器', exam: '2024Q1d', marks: 5 },
  { id: 't2', chapter: 'thermal', file: 'src/content/notes/pe-notes/05-thermal-heatsink.md', req: '共用散热器例题强化: 两个不同器件(MOSFET+Diode)共用, 各自TJ独立检查', exam: '2025Q1d+2022Q4c', marks: 10 },
  // Snubber
  { id: 'sn1', chapter: 'snubber', file: 'src/content/notes/pe-notes/06-snubber-flyback.md', req: 'Snubber数值计算完整例题: 从电路图读参数→功耗/di/dt/峰值电压/振铃频率', exam: '2022Q4ab', marks: 12 },
  { id: 'sn2', chapter: 'snubber', file: 'src/content/notes/pe-notes/06-snubber-flyback.md', req: '在感性负载电路上添加snubber的画法教学+练习', exam: '2024Q3b', marks: 8 },
  // DC-DC
  { id: 'd1', chapter: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', req: 'Buck/Boost/Buck-Boost输出电压完整推导(开关状态→写vL→伏秒平衡→解Vo)', exam: '2023Q3b+2024Q3ai+2025Q3aii', marks: 23 },
  { id: 'd2', chapter: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', req: '画4个波形(iL/vL/iin/iout)的教学: 通用方法论+Buck/Boost具体画法', exam: '2022Q3h+2023Q3d', marks: 14 },
  { id: 'd3', chapter: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', req: 'Buck-Boost完整例题+边界CCM推导+L临界值计算', exam: '2023Q3', marks: 25 },
  { id: 'd4', chapter: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', req: 'Flyback选型决策树+完整设计例题', exam: '2024Q3aii+2025Q3b', marks: 13 },
  { id: 'd5', chapter: 'dcdc', file: 'src/content/notes/pe-notes/07-dc-dc-converters.md', req: '线性稳压器效率计算(vs开关电源)', exam: '2022Q3i', marks: 3 },
  // Inverter
  { id: 'i1', chapter: 'inverter', file: 'src/content/notes/pe-notes/08-dc-ac-inverters-pwm.md', req: '三相逆变器完整分析: 6状态真值表+线电压计算+相序+直通防护', exam: '2023Q4+2024Q4a', marks: 22 },
  { id: 'i2', chapter: 'inverter', file: 'src/content/notes/pe-notes/08-dc-ac-inverters-pwm.md', req: '双极性/单极性PWM完整对比: 开关条件+波形描述+驱动电路+谐波关系+性能对比表', exam: '2024Q4b+2025Q4', marks: 37 },
  { id: 'i3', chapter: 'inverter', file: 'src/content/notes/pe-notes/08-dc-ac-inverters-pwm.md', req: '方波模式: ma>>1时基波幅值=4Vd/π+谐波+优缺点', exam: '2023Q4b+2024Q4b', marks: 8 },
  // Concept cards (in ch0)
  { id: 'c1', chapter: 'concepts', file: 'src/content/notes/pe-notes/00-exam-strategy.md', req: '概念题答题模板: MOSFET优缺点/SCR半控型/整流器对比/Cs影响/减半fs/CCM边界/隔离选择/方波模式/三相vs单相/改相序/直通/PWM对比/snubber作用/器件选型/理想vs实际/开关vs线性', exam: '四年累计~85分', marks: 85 },
]

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

// ── State ─────────────────────────────────────────────────
let iteration = 0
let consecutiveCleanReviews = 0
let totalFixesApplied = 0
let totalFixesFailed = 0
let completedIds = new Set()
let currentTodo = [...ALL_EXAM_REQUIREMENTS]

// ── Iterative loop ───────────────────────────────────────
phase('Iterate')

while (consecutiveCleanReviews < 5) {
  iteration++
  log(`\n═══════════════════════════════════════════`)
  log(`迭代 #${iteration} | 连续零问题轮次: ${consecutiveCleanReviews}/5 | 已完成: ${completedIds.size}/${ALL_EXAM_REQUIREMENTS.length}`)
  log(`═══════════════════════════════════════════\n`)

  // ── Step 1: Identify what needs work ──────────────────
  // Filter out completed items, take top 3 highest priority
  const remaining = currentTodo.filter(item => !completedIds.has(item.id))
  const batch = remaining.slice(0, 3)

  if (batch.length === 0 && iteration > 1) {
    // All items attempted at least once. Do a full-scan to find new issues.
    log('所有已知 gap 已处理。运行全扫描寻找新问题...')

    const newGaps = await parallel(
      CHAPTERS.map(ch => () => agent(
        `快速扫描 ${ch.file}。这个文件已经过多轮修改。

对照以下真题要求，只报告仍然存在的重大缺陷（不要报告小问题）：
${ch.exam}

如果所有重大问题都已解决，返回 gaps: []。用中文。`,
        {
          label: `scan:${ch.id}`,
          phase: 'Iterate',
          effort: 'low',
          schema: {
            type: 'object',
            properties: {
              score: { type: 'number' },
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

    let newGapCount = 0
    for (let i = 0; i < CHAPTERS.length; i++) {
      const gaps = newGaps[i]?.gaps ?? []
      for (const g of gaps) {
        if (!currentTodo.some(t => t.what === g.what && t.chapterId === CHAPTERS[i].id)) {
          currentTodo.push({ ...g, chapterId: CHAPTERS[i].id, chapterFile: CHAPTERS[i].file })
          newGapCount++
        }
      }
    }

    if (newGapCount === 0) {
      consecutiveCleanReviews++
      log(`全扫描完成: 无新问题。连续零问题: ${consecutiveCleanReviews}/5`)
      if (consecutiveCleanReviews >= 5) break
      continue
    } else {
      consecutiveCleanReviews = 0
      log(`全扫描发现 ${newGapCount} 个新 gap，重置连续计数`)
      continue // Re-enter loop with new gaps
    }
  }

  if (batch.length === 0) {
    // Truly nothing left, do full scan
    consecutiveCleanReviews++
    log(`无待处理项。连续零问题: ${consecutiveCleanReviews}/5`)
    if (consecutiveCleanReviews >= 5) break
    continue
  }

  log(`本轮处理 ${batch.length} 个 gap:`)
  for (const item of batch) {
    log(`  [${item.examRef}] ${item.what} (${item.estimatedMarks}分)`)
  }

  // ── Step 2: Write + Review pipeline ───────────────────
  const results = await pipeline(
    batch,
    // Writer: apply the fix
    (item) => agent(
      `你是电力电子课程笔记写手。修改笔记来填补考试缺口。

## 任务
文件: ${item.chapterFile}
修改: ${item.what}
真题: ${item.examRef} (${item.estimatedMarks}分)
方法: ${item.howToAdd}

## 写作规范
1. 中文写作，术语中英双写（如"占空比(duty cycle)"）
2. LaTeX公式: $$...$$块级, $...$行内
3. 推导完整不跳步: 每个积分都要写出上下限代入
4. 例题格式: 已知→公式→代入→答案+单位
5. 保持"先讲清楚"/"固定套路"/"别丢分"结构
6. 略超纲但帮助理解——解释"为什么是这样"而不只是列公式
7. 目标: 看过但没学会的人能从你的修改中学会做这道题

## 操作
1. Read ${item.chapterFile} 了解现有内容
2. 用 Edit 插入新内容（保持文件其余部分不变）
3. 如果需要替换现有内容，确保新内容严格更好
4. Read 确认格式正确`,
      { label: `write:${item.id}`, phase: 'Iterate', effort: 'high' }
    ),
    // Reviewer: verify the fix
    (item, writeResult, idx) => agent(
      `你是严格的审核员。审核刚修改的笔记。

## 审核对象
文件: ${item.chapterFile}
修改: ${item.what}
真题: ${item.examRef} (${item.estimatedMarks}分)

## 5 维度审核 (每项 pass/fail)
1. **数学正确性**: 公式、推导、代入有没有错？(critical)
2. **完整性**: 推导有没有跳步？能否覆盖真题全部要求？(critical)
3. **可读性**: "看过但没学会的人"能否看懂？有无未解释的符号？(major)
4. **格式一致性**: 是否保持先讲清楚/固定套路/别丢分风格？(minor)
5. **考试实用性**: 学生能否在白纸上复现？有无可直接抄的模板？(major)

## 操作
1. Read ${item.chapterFile}
2. 重点审核新增/修改的部分
3. 任何 critical fail → passed=false, 列出修复建议
4. major fail 如果严重也应 failed

用中文输出。`,
      {
        label: `review:${item.id}`,
        phase: 'Iterate',
        effort: 'high',
        schema: {
          type: 'object',
          properties: {
            passed: { type: 'boolean' },
            checks: {
              type: 'object',
              properties: {
                mathCorrectness: { type: 'string' },
                completeness: { type: 'string' },
                readability: { type: 'string' },
                formatConsistency: { type: 'string' },
                examPracticality: { type: 'string' },
              },
            },
            issues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  severity: { type: 'string' },
                  description: { type: 'string' },
                  fix: { type: 'string' },
                },
              },
            },
          },
          required: ['passed', 'checks', 'issues'],
        },
      }
    )
  )

  // ── Step 3: Process results ───────────────────────────
  let thisRoundPassed = 0
  let thisRoundFailed = 0

  for (let i = 0; i < batch.length; i++) {
    const item = batch[i]
    const review = results[i]

    if (review?.passed) {
      completedIds.add(item.id)
      thisRoundPassed++
      totalFixesApplied++
      log(`  ✓ ${item.id}: PASS`)
    } else {
      thisRoundFailed++
      totalFixesFailed++
      const critical = review?.issues?.filter(iss => iss.severity === 'critical') ?? []
      log(`  ✗ ${item.id}: FAIL — ${critical.map(iss => iss.description).join('; ')}`)
      // Keep in todo, will be retried next iteration
    }
  }

  // ── Step 4: Update consecutive clean count ────────────
  if (thisRoundFailed === 0 && batch.length > 0) {
    // This round was clean (all fixes passed review)
    consecutiveCleanReviews++
    log(`本轮全部通过。连续零问题: ${consecutiveCleanReviews}/5`)
  } else if (thisRoundFailed > 0) {
    consecutiveCleanReviews = 0
    log(`本轮 ${thisRoundFailed} 项未通过，连续计数重置为 0`)
  }

  // ── Step 5: Progress summary ──────────────────────────
  const remainingCount = currentTodo.filter(item => !completedIds.has(item.id)).length
  log(`\n进度: ${completedIds.size}/${currentTodo.length} 完成 | ${remainingCount} 待处理 | 总修改: ${totalFixesApplied} | 总失败: ${totalFixesFailed}`)

  // Safety: prevent infinite loop if stuck
  if (iteration >= 100) {
    log(`已达最大迭代次数(100)，停止`)
    break
  }
}

// ── Final comprehensive verification ─────────────────────
phase('Final Verify')

log(`\n迭代完成！共 ${iteration} 轮，${completedIds.size} 项通过。开始最终全面验证...`)

const finalScore = await parallel(
  CHAPTERS.map(ch => () => agent(
    `最终验证: ${ch.file}

以"看过笔记但没学会的学生"视角，逐题验证能否独立做出以下真题:
${ch.exam}

对每道题回答: 能做(预估得多少分) / 不能做(缺什么)

最后给这个章节打 0-100 分。用中文。`,
    {
      label: `verify:${ch.id}`,
      phase: 'Final Verify',
      effort: 'max',
      schema: {
        type: 'object',
        properties: {
          score: { type: 'number' },
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
        },
        required: ['score', 'questionResults'],
      },
    }
  ))
)

// Calculate total estimated score
let totalExamMarks = 0
let totalEstimatedMarks = 0
for (let i = 0; i < CHAPTERS.length; i++) {
  for (const q of (finalScore[i]?.questionResults ?? [])) {
    totalExamMarks += q.totalMarks
    totalEstimatedMarks += q.estimatedMarks
  }
}
const estimatedPercentage = totalExamMarks > 0 ? Math.round(totalEstimatedMarks / totalExamMarks * 100) : 0

log(`\n═══════════════════════════════════════════`)
log(`最终结果`)
log(`═══════════════════════════════════════════`)
log(`总迭代轮次: ${iteration}`)
log(`完成修改: ${completedIds.size}/${ALL_EXAM_REQUIREMENTS.length}`)
log(`预估考试得分: ${estimatedPercentage}%`)
log(`各章节评分:`)
for (let i = 0; i < CHAPTERS.length; i++) {
  log(`  ${CHAPTERS[i].topic}: ${finalScore[i]?.score ?? '?'}/100`)
}

// Write final report
await agent(
  `将以下结果写入 src/content/notes/pe-notes/_final-report.md:

# 电力电子笔记优化最终报告

## 预估考试得分: ${estimatedPercentage}%

## 迭代统计
- 总轮次: ${iteration}
- 完成修改: ${completedIds.size}/${ALL_EXAM_REQUIREMENTS.length}
- 总修改成功: ${totalFixesApplied}
- 总修改失败: ${totalFixesFailed}

## 各章节评分
${CHAPTERS.map((ch, i) => `### ${ch.topic}: ${finalScore[i]?.score ?? '?'}/100\n${finalScore[i]?.questionResults?.map(q => `- ${q.examRef} [${q.totalMarks}分]: ${q.canSolve ? '✓' : '✗'} 预估${q.estimatedMarks}分 ${q.missing || ''}`).join('\n') ?? ''}`).join('\n\n')}

用 Write 工具写入。`,
  { label: 'save-final-report', phase: 'Final Verify' }
)

return { iteration, completedCount: completedIds.size, estimatedPercentage, finalScore }
