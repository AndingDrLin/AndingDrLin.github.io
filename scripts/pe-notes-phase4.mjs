export const meta = {
  name: 'pe-notes-phase4-final-polish',
  description: 'Phase 4: 最终打磨缓冲电路和SCR章节 (87.5% → 90%+)',
  phases: [
    { title: 'Fix Snubber', detail: '修复缓冲电路剩余3个问题' },
    { title: 'Fix SCR', detail: '修复SCR剩余3个问题' },
    { title: 'Final Verify', detail: '验证两个章节达到90%+' },
  ],
}

// ── Phase 1: Fix Snubber remaining issues ──────────────
phase('Fix Snubber')

// Issue 1: Add Flyback circuit SVG
await agent(
  `修改 src/content/notes/pe-notes/06-snubber-flyback.md，在反激变换器部分添加电路图。

## 任务
当前反激变换器只有文字描述，缺少电路图SVG。2024Q3b明确要求画出反激变换器电路。

## 操作
1. Read 文件了解现有内容
2. 在反激变换器小节添加电路图引用
3. 创建 src/content/notes/pe-notes/assets/flyback_circuit.svg

## SVG要求
- 变压器：原边绕组（带同名端·）、副边绕组（带同名端·）
- 开关管MOSFET：在原边下方，栅极标注Gate
- 二极管：在副边上方，阳极接副边同名端
- 输出电容C：在副边下方
- 负载R：与C并联
- 标注：Vin、Vo、Np、Ns、电流路径（ON时原边电流、OFF时副边电流）

用 Edit 修改文件，用 Write 创建SVG。`,
  { label: 'fix:sn-flyback-svg', phase: 'Fix Snubber', effort: 'high' }
)

// Issue 2: Fix PIV derivation wording
await agent(
  `修改 src/content/notes/pe-notes/06-snubber-flyback.md，修复PIV推导的表述歧义。

## 问题
当前表述"'开关关断时次级感应电压和输出电压都正向加在二极管反向端'不准确，PIV是开关导通期间二极管承受的反向电压"

## 正确解释
- 开关ON时：原边电压=Vin，次级感应电压=Vin×Ns/Np（同名端为负），二极管阳极接次级同名端（负电压），阴极接Vo（正电压），所以PIV=Vo+Vin×Ns/Np
- 开关OFF时：二极管导通，承受正向压降，不是反向电压

## 操作
1. Read 文件找到PIV推导部分
2. 修正表述，明确PIV发生在开关ON期间
3. 写出正确公式：PIV=Vo+Vin×Ns/Np

用 Edit 修改。`,
  { label: 'fix:sn-piv-wording', phase: 'Fix Snubber', effort: 'medium' }
)

// Issue 3: Connect ringing frequency to snubber capacitor
await agent(
  `修改 src/content/notes/pe-notes/06-snubber-flyback.md，明确振铃频率与缓冲电容的关系。

## 任务
当前V_peak推导用了C_total=C_snub+C_parasitic，但振铃频率部分未说明加缓冲后f_r会降低。

## 需要添加的内容
在振铃频率公式后加一段说明：
"加入缓冲电容后，总电容C_total=C_snub+C_parasitic增大，所以振铃频率f_r=1/(2π√(LC))会降低。这是缓冲电路的副作用之一——虽然降低了电压尖峰，但也延长了振铃周期。"

## 操作
1. Read 文件找到振铃频率部分
2. 在公式后添加说明段落

用 Edit 修改。`,
  { label: 'fix:sn-ringing-connection', phase: 'Fix Snubber', effort: 'low' }
)

// Verify snubber
const snVerify = await agent(
  `验证 src/content/notes/pe-notes/06-snubber-flyback.md 修复效果。

检查：
1. 反激变换器是否有电路图SVG？
2. PIV推导是否准确（开关ON期间二极管承受的反向电压）？
3. 振铃频率与缓冲电容的关系是否说明？

给出预估得分率(0-100)。用中文。`,
  {
    label: 'verify:snubber-final',
    phase: 'Fix Snubber',
    schema: {
      type: 'object',
      properties: {
        score: { type: 'number' },
        passed: { type: 'boolean' },
        issues: { type: 'array', items: { type: 'string' } },
      },
      required: ['score', 'passed', 'issues'],
    },
  }
)

log(`缓冲电路验证: ${snVerify?.score}% ${snVerify?.passed ? '✓' : '✗'}`)

// ── Phase 2: Fix SCR remaining issues ──────────────────
phase('Fix SCR')

// Issue 1: Add half-controlled bridge waveform SVG
await agent(
  `修改 src/content/notes/pe-notes/03-scr-phase-control.md，在半控桥式部分添加输出电压波形SVG。

## 任务
2025Q2c[15分]考半控桥式，当前只有6步文字描述，缺少波形SVG参考。

## 操作
1. Read 文件找到半控桥式部分
2. 添加波形图引用
3. 创建 src/content/notes/pe-notes/assets/half_controlled_bridge_waveform.svg

## SVG要求
- 输入电压vs=Vm*sin(θ)的正弦波（虚线）
- 输出电压vo波形（实线填充）：
  - α到π：跟随输入正半周
  - π到π+α：为0（SCR关断，二极管续流）
  - π+α到2π：|vs|（SCR触发后通过二极管返回）
- 标注：α、π、π+α、2π的竖线
- 标注Vm峰值

用 Edit 修改文件，用 Write 创建SVG。`,
  { label: 'fix:sc-half-bridge-waveform', phase: 'Fix SCR', effort: 'high' }
)

// Issue 2: Add half-controlled bridge circuit SVG
await agent(
  `修改 src/content/notes/pe-notes/03-scr-phase-control.md，在半控桥式部分添加电路拓扑SVG。

## 任务
电路画法只有4步文字描述，没有SVG参考图。学生可能搞混SCR和二极管的臂位。

## 操作
1. Read 文件找到半控桥式电路描述部分
2. 添加电路图引用
3. 创建 src/content/notes/pe-notes/assets/half_controlled_bridge_circuit.svg

## SVG要求
- 4个臂：上半桥2个SCR（T1、T3），下半桥2个二极管（D2、D4）
- 交流输入vs在左侧
- 负载（电感L+电阻R+续流二极管Df）在右侧
- 标注电流路径：正半周T1+D4导通，负半周T3+D2导通
- 续流二极管Df与负载并联（阳极在下，阴极在上）

用 Edit 修改文件，用 Write 创建SVG。`,
  { label: 'fix:sc-half-bridge-circuit', phase: 'Fix SCR', effort: 'high' }
)

// Issue 3: Minor wording fix at line 536
await agent(
  `修改 src/content/notes/pe-notes/03-scr-phase-control.md，修复第536行附近的表述歧义。

## 问题
当前"线电压vAB=Vm sinθ"易与三相系统混淆。应改为"输入电压绝对值|vs|=Vm|sinθ|"。

## 操作
1. Read 文件第530-540行
2. 找到"线电压"相关表述
3. 修正为"输入电压"或"电源电压"

用 Edit 修改。`,
  { label: 'fix:sc-wording', phase: 'Fix SCR', effort: 'low' }
)

// Verify SCR
const scVerify = await agent(
  `验证 src/content/notes/pe-notes/03-scr-phase-control.md 修复效果。

检查：
1. 半控桥式是否有输出电压波形SVG？
2. 半控桥式是否有电路拓扑SVG？
3. 第536行表述歧义是否修复？

给出预估得分率(0-100)。用中文。`,
  {
    label: 'verify:scr-final',
    phase: 'Fix SCR',
    schema: {
      type: 'object',
      properties: {
        score: { type: 'number' },
        passed: { type: 'boolean' },
        issues: { type: 'array', items: { type: 'string' } },
      },
      required: ['score', 'passed', 'issues'],
    },
  }
)

log(`SCR验证: ${scVerify?.score}% ${scVerify?.passed ? '✓' : '✗'}`)

// ── Phase 3: Final summary ─────────────────────────────
phase('Final Verify')

log('\n═══════════════════════════════════════════')
log('Phase 4 最终结果')
log('═══════════════════════════════════════════')
log(`缓冲电路: ${snVerify?.score ?? '?'}% ${snVerify?.passed ? '✓ 达标' : '✗ 未达标'}`)
log(`SCR相控: ${scVerify?.score ?? '?'}% ${scVerify?.passed ? '✓ 达标' : '✗ 未达标'}`)

const allPassed = (snVerify?.passed ?? false) && (scVerify?.passed ?? false)
log(`\n总体: ${allPassed ? '✓ 所有章节达标！' : '✗ 仍有章节未达标'}`)

if (!allPassed) {
  log('剩余问题:')
  if (!snVerify?.passed) log(`  缓冲电路: ${snVerify?.issues?.join('; ')}`)
  if (!scVerify?.passed) log(`  SCR: ${scVerify?.issues?.join('; ')}`)
}

return { snubber: snVerify, scr: scVerify, allPassed }
