import Link from 'next/link'
import { ArrowUpRight, Github, Star } from 'lucide-react'
import { projectsList } from '@/config/portfolio'

export default function PortfolioPage() {
  const featuredProjects = projectsList.filter(p => p.featured)
  const otherProjects = projectsList.filter(p => !p.featured)

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          作品集
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          展示我的个人项目和开源作品
        </p>
      </div>

      {/* Featured projects */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
          <Star className="w-5 h-5 text-yellow-500" />
          精选项目
        </h2>
        <div className="grid gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900 transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
            其他项目
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="group block p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          想要查看更多？
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          欢迎访问我的 GitHub 主页，发现更多开源项目
        </p>
        <a
          href="https://github.com/nebois"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        >
          <Github className="w-5 h-5" />
          访问 GitHub
        </a>
      </section>
    </div>
  )
}
