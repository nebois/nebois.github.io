export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projectsList: Project[] = [
  {
    id: 'nebois-portfolio',
    title: 'Nebois 个人主页',
    description: '基于 Next.js 的个人网站平台，包含文档、游戏、占卜测试等多个模块',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    demoUrl: '/',
    githubUrl: 'https://github.com/nebois/nebois.github.io',
    featured: true,
  },
  {
    id: 'weather-app',
    title: '天气预报应用',
    description: '实时天气查询，支持多城市管理和天气预警',
    tags: ['React', 'Node.js', 'Weather API'],
    demoUrl: 'https://weather.nebois.com',
    githubUrl: 'https://github.com/nebois/weather-app',
    featured: true,
  },
  {
    id: 'task-manager',
    title: '任务管理系统',
    description: '个人任务管理工具，支持看板视图和番茄钟',
    tags: ['Vue.js', 'Vuex', 'Firebase'],
    demoUrl: 'https://tasks.nebois.com',
    featured: false,
  },
]

export function getFeaturedProjects(): Project[] {
  return projectsList.filter(p => p.featured)
}

export function getProjectById(id: string): Project | undefined {
  return projectsList.find(p => p.id === id)
}
