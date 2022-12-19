import type { DefaultTheme } from 'vitepress'

const sec1 = {
  text: '简单来说',
  collapsible: false,
  items: [
    { text: '诞生日记', link: '/guide/tutorial/whyIt.md' },
    { text: '使用场景', link: '/guide/tutorial/useCase' },
    { text: '快速上手', link: '/guide/tutorial/start' },
    { text: '我们的不同', link: '/guide/tutorial/enhance' },
  ],
}

const sec2: DefaultTheme.SidebarGroup = {
  text: '复杂来讲',
  collapsible: false,
  items: [
    { text: '表单结构', link: '/guide/advance/table' },
    { text: '单元格类型', link: '/guide/advance/fieldParse' },
    { text: '图层名称', link: '/guide/advance/nodeName' },
    { text: '取值规则', link: '/guide/advance/obtainValue' },
  ],
}

const sec3: DefaultTheme.SidebarGroup = {
  text: '顺便提提',
  items: [
    { text: '配合其他插件', link: '/guide/other/otherPlugin' },
    { text: '结束语', link: '/guide/other/end' },
    { text: '致谢', link: '/guide/other/thanks' },
  ],
}

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [sec1, sec2, sec3,

  ],
  '/en/guide/': [{
    text: 'Guide',
    items: [
      { text: 'Getting Started', link: '/en/guide/' },
      { text: 'Introduction', link: '/en/guide/introduce' },
      { text: 'Usage', link: '/en/guide/usage' }],
  }],
}
