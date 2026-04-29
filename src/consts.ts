export const SITE_TITLE = 'Latent Notes';
export const SITE_DESCRIPTION = '记录 AI、3D 视觉、工具、智能体、课程复习与实践过程中的技术笔记。';
export const SITE_URL = 'https://yujialin-523.github.io';
export const GITHUB_URL = 'https://github.com/YujiaLin-523';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '博客' },
  { href: '/notes', label: '笔记' },
  { href: '/tags', label: '标签' },
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
