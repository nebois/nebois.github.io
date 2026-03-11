export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: '你好，世界！',
    description: '欢迎来到我的个人博客，这里将记录我的技术学习和开发心得',
    date: '2024-01-01',
    tags: ['随笔', '开场'],
    readingTime: '2 分钟',
  },
  {
    slug: 'nextjs-guide',
    title: 'Next.js 14 完全指南',
    description: '深入学习 Next.js 14 的新特性，包括 App Router、Server Actions 等',
    date: '2024-01-15',
    tags: ['Next.js', 'React', '教程'],
    readingTime: '15 分钟',
  },
  {
    slug: 'tailwind-tips',
    title: 'Tailwind CSS 实用技巧',
    description: '分享一些 Tailwind CSS 的使用技巧和最佳实践',
    date: '2024-02-01',
    tags: ['Tailwind CSS', 'CSS', '技巧'],
    readingTime: '8 分钟',
  },
]

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}
