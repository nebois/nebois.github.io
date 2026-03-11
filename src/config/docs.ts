export interface DocFile {
  slug: string
  title: string
  description?: string
  category?: string
  order?: number
  children?: DocFile[]
}

export const docsTree: DocFile[] = [
  {
    slug: 'intro',
    title: '介绍',
    description: '欢迎来到 Nebois 文档',
    category: 'getting-started',
    order: 1,
  },
  {
    slug: 'installation',
    title: '安装指南',
    description: '如何安装和配置',
    category: 'getting-started',
    order: 2,
  },
  {
    slug: 'quick-start',
    title: '快速开始',
    description: '5分钟快速上手',
    category: 'getting-started',
    order: 3,
  },
  {
    slug: 'components',
    title: '组件',
    category: 'guides',
    order: 1,
    children: [
      {
        slug: 'button',
        title: '按钮',
        description: '按钮组件的使用',
        order: 1,
      },
      {
        slug: 'input',
        title: '输入框',
        description: '输入框组件',
        order: 2,
      },
      {
        slug: 'modal',
        title: '模态框',
        description: '模态框组件',
        order: 3,
      },
    ],
  },
  {
    slug: 'api',
    title: 'API 参考',
    category: 'reference',
    order: 1,
  },
]

export function getAllDocs(): DocFile[] {
  const result: DocFile[] = []
  
  function flatten(docs: DocFile[]) {
    for (const doc of docs) {
      result.push(doc)
      if (doc.children) {
        flatten(doc.children)
      }
    }
  }
  
  flatten(docsTree)
  return result
}

export function getDocBySlug(slug: string): DocFile | undefined {
  const allDocs = getAllDocs()
  return allDocs.find(doc => doc.slug === slug)
}
