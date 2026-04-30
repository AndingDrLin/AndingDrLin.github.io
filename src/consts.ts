export const SITE_TITLE = 'Latent Notes';
export const SITE_DESCRIPTION = '记录 AI、3D 视觉、工具、智能体、课程复习与实践过程中的技术笔记。';
export const SITE_URL = 'https://yujialin-523.github.io';
export const GITHUB_URL = 'https://github.com/YujiaLin-523';

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
    description: '工程项目管理与财务课程的期末复习笔记，按考试主题整理。'
  },
  'dsp-notes': {
    slug: 'digital-signal-processing',
    title: '数字信号处理',
    description: '数字信号处理课程的章节自学笔记，涵盖信号基础、DFT、FFT 等。'
  },
  'emf-notes': {
    slug: 'electromagnetics-and-fields',
    title: '电磁场与波',
    description: '电磁场与波课程的章节自学笔记，涵盖矢量分析、静电场、恒定电流等。'
  }
} as const;

export const TOPIC_CHIPS = ['AI 工具', '3D 视觉', '智能体', '研究笔记', '课程复习'] as const;

export const CATEGORIES = [
  'AI Tools',
  '3D Vision',
  'Agents',
  'Research Notes',
  'Essays',
  'Tutorials',
  '课程复习'
] as const;

/* ── 首页文字 ── */
export const HOME = {
  eyebrow: '个人技术与学习笔记',
  blogSectionTitle: '最新博客',
  blogSectionLink: '查看全部博客',
  notesSectionTitle: '最新笔记',
  notesSectionLink: '查看全部笔记'
} as const;

/* ── 关于页文字 ── */
export const ABOUT = {
  title: '关于',
  description: '关于 Latent Notes。',
  heading: 'Latent Notes 是一个记录技术实践与学习过程的地方。',
  paragraphs: [
    '这里收集关于 AI、3D 视觉、工具、智能体、研究复现和课程学习的内容，也记录那些决定想法能否真正落地的细节。',
    '写作风格会尽量轻量，但保持技术上的认真。有些内容会是完整文章，有些则是短笔记、阶段性实验，或者把困惑解决前后的过程留下来。',
    '这个站点本身也保持简单：静态、内容优先，并尽量让未来的更新主要通过 Markdown 或 MDX 完成。'
  ]
} as const;

/* ── 博客页文字 ── */
export const BLOG_PAGE = {
  title: '博客',
  description: '关于 AI、3D 视觉、智能体、工具和研究笔记的长文。',
  eyebrow: '博客',
  heading: '较完整的技术文章、实验记录与研究笔记。',
  intro: '博客用于记录需要展开说明的想法，包括论文复现、工具实践、技术总结，以及不适合压缩成短笔记的内容。'
} as const;

/* ── 笔记页文字 ── */
export const NOTES_PAGE = {
  title: '笔记',
  description: '课程笔记、短想法、阶段性结论和实践记录。',
  eyebrow: '笔记',
  heading: '课程笔记与阶段性记录。',
  intro: '这里是笔记入口。选择一门课程查看按章节整理的笔记。',
  courseNotesTitle: '课程笔记',
  otherNotesTitle: '其他笔记'
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
    notes: '笔记',
    docs: '课程笔记'
  }
} as const;

/* ── 搜索文字 ── */
export const SEARCH = {
  triggerLabel: '搜索',
  placeholder: '搜索文章、笔记...',
  noResults: '没有找到相关内容'
} as const;
