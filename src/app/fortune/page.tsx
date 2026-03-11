'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Star, TrendingUp, Ghost } from 'lucide-react'
import { clsx } from 'clsx'
import { fortuneTests } from '@/config/fortune'

const typeConfig = {
  personality: {
    icon: Ghost,
    color: 'bg-purple-500',
    label: '性格测试',
  },
  love: {
    icon: Heart,
    color: 'bg-pink-500',
    label: '爱情运势',
  },
  career: {
    icon: TrendingUp,
    color: 'bg-blue-500',
    label: '事业运势',
  },
  fortune: {
    icon: Star,
    color: 'bg-yellow-500',
    label: '每日运势',
  },
  fun: {
    icon: Sparkles,
    color: 'bg-green-500',
    label: '趣味测试',
  },
}

export default function FortunePage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)

  const testsByType = fortuneTests.reduce((acc, test) => {
    if (!acc[test.type]) acc[test.type] = []
    acc[test.type].push(test)
    return acc
  }, {} as Record<string, typeof fortuneTests>)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          占卜测试
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          发现未知的自己，探索你的命运
        </p>
      </div>

      {/* Test categories */}
      {Object.entries(testsByType).map(([type, tests]) => {
        const config = typeConfig[type as keyof typeof typeConfig]
        const Icon = config.icon

        return (
          <section key={type}>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
              <Icon className="w-5 h-5" />
              {config.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tests.map((test) => (
                <Link
                  key={test.id}
                  href={`/fortune/${test.id}/`}
                  className="group block p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${config.color} text-white`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {test.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {test.questions.length} 道题
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Fortune of the day */}
      <section className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-xl font-semibold">今日运势</h2>
        </div>
        <p className="mb-4 opacity-90">
          想知道今天的运气如何吗？点击下方开始测试！
        </p>
        <Link
          href="/fortune/fortune/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
        >
          开始测试
        </Link>
      </section>
    </div>
  )
}
