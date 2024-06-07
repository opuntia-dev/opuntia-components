import type { DefaultTheme } from 'vitepress'

export const repoUrl = 'https://github.com/opuntia-dev/opuntia-ui'

export const repoMasterUrl = `${repoUrl}/-/tree/master/`

export const guides = [{
  text: '使用指南',
  collapsed: false,
  items: [
    {
      text: '介绍',
      link: '/guide/introduce',
    },
    {
      text: '快速上手',
      link: '/guide/quick-start',
    },
    {
      text: '主题样式',
      link: '/guide/theme',
    },
  ],
}, {
  text: '开发指南',
  collapsed: false,
  items: [
    {
      text: '参与共建',
      link: '/guide/contributing',
    },
    {
      text: '开发常见问题',
      link: '/guide/dev-faq',
    },
  ],
}]

export const components = [
  {
    text: '基础',
    collapsed: false,
    items: [
      {
        text: 'Todo',
        link: '/components/todo',
      },
    ],
  },
  /* @generate-code */
]

export const sidebar = {
  '/guide': guides,
  '/components': components,
}

export const nav = [
  { text: '首页', link: '/' },
  { text: '指南', items: guides },
  { text: '组件', items: components },
] as DefaultTheme.NavItem[]
