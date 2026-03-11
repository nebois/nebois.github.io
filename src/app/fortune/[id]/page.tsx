'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { fortuneTests, type FortuneQuestion } from '@/config/fortune'

export default function FortuneTestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const test = fortuneTests.find(t => t.id === params.id)
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          测试未找到
        </h1>
        <button
          onClick={() => router.push('/fortune/')}
          className="text-primary-500 hover:text-primary-600"
        >
          返回测试列表
        </button>
      </div>
    )
  }

  const question = test.questions[currentQuestion]

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)

    const option = question.options[optionIndex]
    const newScores = { ...scores }
    Object.entries(option.scores).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value
    })
    setScores(newScores)

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const getResult = () => {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
    return test.results.find(
      r => totalScore >= r.minScore && totalScore <= r.maxScore
    ) || test.results[0]
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setScores({})
    setShowResult(false)
  }

  if (showResult) {
    const result = getResult()

    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 text-white text-3xl mb-4">
              ✨
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {result.title}
            </h2>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {result.description}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetTest}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              重新测试
            </button>
            <button
              onClick={() => router.push('/fortune/')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回列表
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>问题 {currentQuestion + 1} / {test.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              <span className="text-slate-700 dark:text-slate-300">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            上一题
          </button>
          <button
            onClick={() => router.push('/fortune/')}
            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            退出测试
          </button>
        </div>
      </motion.div>
    </div>
  )
}
