import { defineConfig } from 'vitepress'
import { nav, repoMasterUrl, repoUrl, sidebar } from './constants'
import { MarkdownPlugin } from './plugins'

export default defineConfig({
  title: 'Opuntia UI',
  description: 'Vue 3 UI 组件库起始模板，提供文档支持',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m28.568 12.893l-.037-.094l-3.539-9.235a.922.922 0 0 0-.364-.439a.948.948 0 0 0-1.083.058a.948.948 0 0 0-.314.477l-2.39 7.31h-9.675l-2.39-7.31a.928.928 0 0 0-.313-.478a.948.948 0 0 0-1.083-.058a.93.93 0 0 0-.365.438L3.47 12.794l-.035.093a6.571 6.571 0 0 0 2.18 7.595l.011.01l.033.022l5.39 4.037l2.668 2.019l1.624 1.226c.39.297.931.297 1.322 0l1.624-1.226l2.667-2.019l5.424-4.061l.013-.01a6.574 6.574 0 0 0 2.177-7.588Z"/></svg>',
        },
        link: repoUrl,
      },
    ],
    lastUpdated: {
      text: '最后更新于',
    },
    editLink: {
      pattern: `${repoMasterUrl}docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    outline: {
      level: [2, 3],
    },
    search: {
      provider: 'local',
    },
  },
  lastUpdated: true,
  rewrites: {
    'components/:path/index.md': 'components/:path.md',
  },
  markdown: {
    config: md => MarkdownPlugin(md),
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  vite: {
    server: {
      port: 1977,
      host: true,
    },
    resolve: {
      conditions: ['dev'],
    },
  },
  base: '/',
  outDir: './dist',
})
