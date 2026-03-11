import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/config/blog'

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          博客
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          分享技术见解、项目经验和生活感悟
        </p>
      </div>

      {/* Blog posts */}
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group block bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
          >
            <article>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                {post.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">
            暂无博客文章，敬请期待...
          </p>
        </div>
      )}
    </div>
  )
}
