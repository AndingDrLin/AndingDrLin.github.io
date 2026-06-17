// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';

function remarkMermaid() {
  return (
    /** @param {any} tree */
    (tree) => {
      visit(tree, 'code', (node, index, parent) => {
        if (node.lang === 'mermaid' && parent && typeof index === 'number') {
          parent.children[index] = {
            type: 'html',
            value: `<pre class="mermaid">${node.value}</pre>`
          };
        }
      });
    }
  );
}

export default defineConfig({
  site: 'https://andingdrlin.github.io',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      wrap: true
    }
  }
});
