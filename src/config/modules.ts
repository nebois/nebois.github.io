import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  FolderKanban, 
  FileText,
  LucideIcon 
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
}

export interface ModuleConfig {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  enabled: boolean
}

export const navItems: NavItem[] = [
  { href: '/', label: '首页', icon: Home },
  { href: '/docs/', label: '文档', icon: BookOpen },
  { href: '/games/', label: '游戏', icon: Gamepad2 },
  { href: '/fortune/', label: '占卜', icon: Sparkles },
  { href: '/portfolio/', label: '作品集', icon: FolderKanban },
  { href: '/blog/', label: '博客', icon: FileText },
]

export const moduleConfigs: ModuleConfig[] = [
  {
    id: 'docs',
    title: '技术文档',
    description: '整理和分享技术知识，包括编程笔记、开发教程等',
    href: '/docs/',
    icon: BookOpen,
    color: 'bg-blue-500',
    enabled: true,
  },
  {
    id: 'games',
    title: '游戏中心',
    description: '各种有趣的小游戏，休闲娱乐的好去处',
    href: '/games/',
    icon: Gamepad2,
    color: 'bg-green-500',
    enabled: true,
  },
  {
    id: 'fortune',
    title: '占卜测试',
    description: '趣味心理测试、性格分析、占卜问答',
    href: '/fortune/',
    icon: Sparkles,
    color: 'bg-purple-500',
    enabled: true,
  },
  {
    id: 'portfolio',
    title: '作品集',
    description: '个人项目展示，开源作品和技术Demo',
    href: '/portfolio/',
    icon: FolderKanban,
    color: 'bg-orange-500',
    enabled: true,
  },
  {
    id: 'blog',
    title: '博客',
    description: '分享技术见解、生活感悟和经验总结',
    href: '/blog/',
    icon: FileText,
    color: 'bg-cyan-500',
    enabled: true,
  },
]

export function getEnabledModules(): ModuleConfig[] {
  return moduleConfigs.filter(m => m.enabled)
}

export function getModuleById(id: string): ModuleConfig | undefined {
  return moduleConfigs.find(m => m.id === id)
}
