import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getEnabledModules } from '@/config/modules'

export default function HomePage() {
  const modules = getEnabledModules()

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          欢迎来到 Nebois
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          这里是一个集技术文档、游戏娱乐、占卜测试于一体的个人平台。
          探索不同的模块，发现更多有趣的内容！
        </p>
      </section>

      {/* Module cards */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
          探索模块
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link
                key={module.id}
                href={module.href}
                className="group block p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${module.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {module.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-3 gap-4">
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {modules.length}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            活跃模块
          </div>
        </div>
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            5+
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            功能页面
          </div>
        </div>
        <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            100%
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            开源免费
          </div>
        </div>
      </section>
    </div>
  )
}
