export const SITE_TITLE = 'Latent Note';
export const SITE_DESCRIPTION = '一处存放笔记、想法与未完成答案的隐空间。';
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
  }
} as const;

export const TOPIC_CHIPS = ['AI 工具', '3D 视觉', '智能体', '科研随笔', '课程学习'] as const;

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
  eyebrow: '记录那些仍在生长的想法',
  blogSectionTitle: '最新博客',
  blogSectionLink: '全部博客',
  notesSectionTitle: '最新笔记',
  notesSectionLink: '全部笔记'
} as const;

/* ── 关于页文字 ── */
export const ABOUT = {
  title: '关于',
  description: '关于这个隐空间。',
  heading: '一个存放技术笔记、想法和未完成理解的地方。',
  paragraphs: [
    '这里记录关于 AI、3D 视觉、工具和智能体的学习过程，也保留那些还没有最终答案的阶段性理解。重要的不是呈现完美，而是让想法慢慢成形。',
    '文章风格尽量轻量，但保持技术上的认真。有些内容很完整，有些只是困惑解决前后的过程记录——对我来说，这两类内容同样有价值。',
    '这个站点本身也在持续生长：静态、安静、内容优先。每次更新，都只是多写了一点正在思考的东西。'
  ]
} as const;

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
  placeholder: '搜索...',
  noResults: '没有找到相关内容',
  devModeHint: '搜索仅在构建后可用',
  untitled: '无标题'
} as const;
