'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { RotateCcw, Pause, Play, Trophy } from 'lucide-react'

const GRID_SIZE = 20
const INITIAL_SPEED = 150

type Direction = 'up' | 'down' | 'left' | 'right'

interface Point {
  x: number
  y: number
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ])
  const [food, setFood] = useState<Point>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>('up')
  const [nextDirection, setNextDirection] = useState<Direction>('up')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const lastDirectionRef = useRef<Direction>('up')

  const generateFood = useCallback((): Point => {
    let newFood: Point
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  const resetGame = useCallback(() => {
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ])
    setFood(generateFood())
    setDirection('up')
    setNextDirection('up')
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    setIsRunning(false)
    lastDirectionRef.current = 'up'
  }, [generateFood])

  const startGame = useCallback(() => {
    if (!isRunning && !gameOver) {
      setIsRunning(true)
    }
    setIsPaused(false)
  }, [isRunning, gameOver])

  const pauseGame = useCallback(() => {
    setIsPaused(true)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('nebois-snake-best')
    if (saved) setBestScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('nebois-snake-best', String(score))
    }
  }, [score, bestScore])

  useEffect(() => {
    if (!isRunning || isPaused || gameOver) return

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0]
        const newHead = { ...head }

        setDirection(nextDirection)
        lastDirectionRef.current = nextDirection
        setNextDirection(prev => prev)

        switch (nextDirection) {
          case 'up':
            newHead.y -= 1
            break
          case 'down':
            newHead.y += 1
            break
          case 'left':
            newHead.x -= 1
            break
          case 'right':
            newHead.x += 1
            break
        }

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true)
          setIsRunning(false)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10)
          setFood(generateFood())
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isRunning, isPaused, gameOver, nextDirection, food, generateFood])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        startGame()
      }

      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        if (isPaused) {
          startGame()
        } else if (isRunning) {
          pauseGame()
        }
        return
      }

      if (!isRunning && !gameOver) {
        startGame()
      }

      const key = e.key.toLowerCase()
      const dirs: Record<string, Direction> = {
        arrowup: 'up', w: 'up',
        arrowdown: 'down', s: 'down',
        arrowleft: 'left', a: 'left',
        arrowright: 'right', d: 'right',
      }
      
      const newDir = dirs[key]
      if (!newDir) return

      const opposites: Record<Direction, Direction> = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
      }

      if (opposites[lastDirectionRef.current] !== newDir) {
        setNextDirection(newDir)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isRunning, isPaused, gameOver, startGame, pauseGame])

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">贪吃蛇</h1>
          <div className="flex gap-2">
            <div className="text-center px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <div className="text-xs text-slate-500 dark:text-slate-400">分数</div>
              <div className="font-bold text-slate-800 dark:text-slate-200">{score}</div>
            </div>
            <div className="text-center px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <div className="text-xs text-slate-500 dark:text-slate-400">最高</div>
              <div className="font-bold text-slate-800 dark:text-slate-200">{bestScore}</div>
            </div>
          </div>
        </div>

        <div className="relative mb-6 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
            {Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800" />
            ))}
          </div>
          
          <div className="absolute inset-0">
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute rounded-sm transition-all"
                style={{
                  left: `${(segment.x / GRID_SIZE) * 100}%`,
                  top: `${(segment.y / GRID_SIZE) * 100}%`,
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  backgroundColor: index === 0 ? '#0ea5e9' : '#38bdf8',
                }}
              />
            ))}
            
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${(food.x / GRID_SIZE) * 100 + 2.5}%`,
                top: `${(food.y / GRID_SIZE) * 100 + 2.5}%`,
                width: `${100 / GRID_SIZE - 5}%`,
                height: `${100 / GRID_SIZE - 5}%`,
                backgroundColor: '#ef4444',
              }}
            />
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold text-xl">游戏结束!</p>
                <p className="text-slate-300">最终得分: {score}</p>
              </div>
            </div>
          )}

          {!isRunning && !gameOver && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white font-medium">按方向键开始游戏</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={resetGame}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            重新开始
          </button>
          <button
            onClick={isPaused ? startGame : pauseGame}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            {isPaused ? '继续' : '暂停'}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          使用方向键或 WASD 移动，空格键暂停
        </div>
      </div>
    </div>
  )
}
