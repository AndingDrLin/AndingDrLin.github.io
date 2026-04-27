export const SITE_TITLE = 'Latent Notes';
export const SITE_DESCRIPTION = '记录 AI、3D 视觉、工具、智能体、课程复习与实践过程中的技术笔记。';
export const SITE_URL = 'https://yujialin-523.github.io';
export const GITHUB_URL = 'https://github.com/YujiaLin-523';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '博客' },
  { href: '/notes', label: '笔记' },
  { href: '/docs', label: '文档' },
  { href: '/tags', label: '标签' },
  { href: '/about', label: '关于' }
] as const;

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
