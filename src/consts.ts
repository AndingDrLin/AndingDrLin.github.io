export const SITE_TITLE = 'Latent Note';
export const SITE_DESCRIPTION = '记录 AI、3D 视觉、Agent 工具与科研过程里那些还没完全收束的判断。';
export const SITE_URL = 'https://andingdrlin.github.io/';
export const GITHUB_URL = 'https://github.com/AndingDrLin';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '博客' },
  { href: '/notes', label: '笔记' },
  { href: '/about', label: '关于' }
] as const;

export const NOTE_COURSES = {
  'epmf-final-exam-revision-notes': {
    slug: 'engineering-project-management-and-finance',
    title: '工程项目管理与财务',
    description: '按期末考试题型整理的复习笔记。'
  },
  'dsp-notes': {
    slug: 'digital-signal-processing',
    title: '数字信号处理',
    description: '各章节自学笔记，涵盖信号基础、DFT、FFT 等。'
  },
  'emf-notes': {
    slug: 'electromagnetics-and-fields',
    title: '电磁场与波',
    description: '各章节自学笔记，涵盖矢量分析、静电场、恒定电流等。'
  },
  'power-electronic-notes': {
    slug: 'power-electronics',
    title: '电力电子',
    description: '按章节整理的电力电子课程复习笔记，覆盖整流、SCR、开关损耗、热设计、DC-DC、逆变与 PWM。'
  }
} as const;

export const TOPIC_CHIPS = ['AI Research', '3D Vision', 'Agents', 'AI Tools', 'Research Notes'] as const;

export const CATEGORIES = [
  'AI Tools',
  '3D Vision',
  'Agents',
  'Research Notes',
  'Essays',
  'Tutorials',
  '课程学习'
] as const;

/* ── 首页文字 ── */
export const HOME = {
  eyebrow: 'AI / 3D Vision / Agents',
  intro: '这里主要记录我在日常科研中遇到的具体问题：AI 工具怎么真正进入工作流，3D 视觉里的方法判断，Agent 系统的可用边界，以及一些还不够成熟但值得留下的科研感悟。',
  startTitle: '如果你第一次来',
  startLinks: [
    { href: '/blog', label: '读完整文章', description: '较完整的技术文章、实验记录与阶段性判断。' },
    { href: '/notes', label: '翻零散笔记', description: '课程笔记和技术片段都暂存在这里。' },
    { href: '/about', label: '了解作者', description: '研究兴趣、当前关注和 GitHub profile 式介绍。' },
    { href: GITHUB_URL, label: '看 GitHub', description: '代码、项目和公开活动记录。' }
  ],
  blogSectionTitle: '最新博客',
  blogSectionLink: '全部博客',
  notesSectionTitle: '最新笔记',
  notesSectionLink: '全部笔记'
} as const;

/* ── 关于页文字 ── */
export const ABOUT = {
  title: '关于',
  description: '关于作者、研究兴趣和这个站点。',
  heading: 'Hi, I am AndingDrLin.'
} as const;

export const PROFILE = {
  name: 'AndingDrLin',
  role: 'AI / 3D Computer Vision / Agent Tools',
  location: 'Research in progress',
  bio: '我把这里当作一个公开的 research log：记录日常科研里遇到的具体问题、AI 工具进入工作流后的真实收益和限制、3D 视觉方向的阶段性判断，以及一些还没完全想清楚但值得留下的观察。',
  currentWork: [
    '关注 AI 与 3D Computer Vision 交叉方向中的方法选择和实验判断。',
    '尝试把 Agent 和 AI 工具接入阅读、写作、代码与科研管理流程。',
    '把不够成熟但有复盘价值的科研感悟写成可回看的记录。'
  ],
  interests: ['AI Research', '3D Vision', 'Agents', 'AI Tools', 'Research Workflow'],
  links: [
    { href: GITHUB_URL, label: 'GitHub' },
    { href: '/blog', label: 'Blog' },
    { href: '/notes', label: 'Notes' }
  ]
} as const;

export const CONTRIBUTORS = [
  {
    name: PROFILE.name,
    role: PROFILE.role,
    bio: '站点维护者。主要写 AI、3D 视觉、Agent 工具与科研过程中的阶段性判断。',
    links: PROFILE.links
  }
] as const;

/* ── 博客页文字 ── */
export const BLOG_PAGE = {
  title: '博客',
  description: '较完整的技术文章、实验记录与思考轨迹。',
  eyebrow: '博客',
  heading: '把需要展开的想法，写成完整的技术文章。',
  intro: '记录论文复现、工具实践、技术总结，以及那些需要铺开来才能说清楚的想法。有些是阶段性结论，有些是研究过程中的判断。'
} as const;

/* ── 笔记页文字 ── */
export const NOTES_PAGE = {
  title: '笔记',
  description: '课程笔记、技术片段与学习记录。',
  eyebrow: '笔记',
  heading: '课程笔记与技术片段。',
  intro: '选择一门课程按章节浏览，或查看零散的技术记录。这些内容不追求完整，更接近学习过程中的快照。',
  courseNotesTitle: '课程笔记',
  otherNotesTitle: '其他记录'
} as const;

/* ── 页脚文字 ── */
export const FOOTER = {
  rssLabel: 'RSS',
  githubLabel: 'GitHub'
} as const;

/* ── 目录文字 ── */
export const TOC = {
  title: '目录'
} as const;

/* ── 文章 meta 文字 ── */
export const ARTICLE_META = {
  updatedPrefix: '更新于',
  sourceLabel: '来源',
  kindLabels: {
    blog: '博客',
    notes: '笔记'
  }
} as const;

/* ── 搜索文字 ── */
export const SEARCH = {
  triggerLabel: '搜索',
  placeholder: '搜索 AI、3D Vision、Agent...',
  noResults: '没有找到相关内容，可以试试 AI、3D Vision、Agent 或科研工具。',
  devModeHint: '搜索仅在构建后可用，可以先从博客或笔记入口浏览。',
  untitled: '无标题',
  suggestions: ['AI', '3D Vision', 'Agent', '科研工具']
} as const;
