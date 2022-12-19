import type { DefaultTheme } from 'vitepress/types/default-theme'
const tutorial = [
  { text: '快速上手', link: '/guide/tutorial/start' },
  { text: '使用场景', link: '/guide/tutorial/useCase' },
  { text: '我们的不同', link: '/guide/tutorial/enhance' },
]

const advance = [
  { text: '表单结构', link: '/guide/advance/table' },
  { text: '单元格类型', link: '/guide/advance/fieldParse' },
  { text: '图层名称', link: '/guide/advance/nodeName' },
  { text: '取值规则', link: '/guide/advance/obtainValue' },
]

export const navbar: DefaultTheme.NavItem[] = [
  { text: '简单介绍', items: tutorial, activeMatch: '^/guide/tutorial' },
  {
    text: '详细文档',
    items: advance,
    activeMatch: '^/guide/advance',
  },
  // { text: '产品故事', link: 'https://support.qq.com/products/431975/team/' },
  // { text: '用户反馈', link: 'https://support.qq.com/product/431975' }
]

export const navbar_en: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/en/guide/', activeMatch: '^/en/guide/' },
  { text: 'Product Story', link: 'https://support.qq.com/products/431975/team/' },
  { text: 'FeedBack', link: 'https://support.qq.com/product/431975' },
]
