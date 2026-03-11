'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Search, FileText, Folder, FolderOpen } from 'lucide-react'
import { clsx } from 'clsx'
import { docsTree, type DocFile } from '@/config/docs'

interface DocSidebarProps {
  activeSlug?: string
}

function DocTreeItem({ 
  item, 
  activeSlug, 
  depth = 0 
}: { 
  item: DocFile
  activeSlug?: string
  depth?: number
}) {
  const [isOpen, setIsOpen] = useState(depth === 0)
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeSlug === item.slug

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg transition-colors',
            'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          )}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          {isOpen ? (
            <FolderOpen className="w-4 h-4 text-primary-500" />
          ) : (
            <Folder className="w-4 h-4 text-primary-500" />
          )}
          <span className="text-sm font-medium">{item.title}</span>
        </button>
      ) : (
        <Link
          href={`/docs/${item.slug}/`}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
            isActive
              ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          )}
          style={{ paddingLeft: `${depth * 12 + 24}px` }}
        >
          <FileText className={clsx('w-4 h-4', isActive ? 'text-primary-500' : '')} />
          <span className="text-sm">{item.title}</span>
        </Link>
      )}

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.children!.map((child) => (
              <DocTreeItem
                key={child.slug}
                item={child}
                activeSlug={activeSlug}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSlug, setActiveSlug] = useState('intro')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索文档..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Doc tree */}
            <nav className="space-y-1">
              {docsTree.map((item) => (
                <DocTreeItem
                  key={item.slug}
                  item={item}
                  activeSlug={activeSlug}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              技术文档
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                欢迎来到 Nebois 技术文档中心。这里包含了所有关于项目开发的技术文档、教程和 API 参考。
              </p>

              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                开始阅读
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {docsTree.slice(0, 3).map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}/`}
                    className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                文档分类
              </h2>

              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>📚 入门指南 - 快速开始项目</li>
                <li>🛠 组件指南 - 使用 UI 组件</li>
                <li>📖 API 参考 - 完整的 API 文档</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
