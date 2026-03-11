'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

const GRID_SIZE = 4

interface Cell {
  value: number
  id: number
}

export default function Game2048() {
  const [grid, setGrid] = useState<Cell[][]>([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [idCounter, setIdCounter] = useState(0)

  const getEmptyCells = useCallback((currentGrid: Cell[][]): { row: number; col: number }[] => {
    const empty: { row: number; col: number }[] = []
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c].value === 0) {
          empty.push({ row: r, col: c })
        }
      }
    }
    return empty
  }, [])

  const addRandomCell = useCallback((currentGrid: Cell[][]): Cell[][] => {
    const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })))
    const emptyCells = getEmptyCells(newGrid)
    
    if (emptyCells.length === 0) return newGrid
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    newGrid[randomCell.row][randomCell.col] = {
      value: Math.random() < 0.9 ? 2 : 4,
      id: idCounter + 1
    }
    setIdCounter(prev => prev + 1)
    
    return newGrid
  }, [getEmptyCells, idCounter])

  const initGame = useCallback(() => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ value: 0, id: 0 }))
    )
    newGrid = addRandomCell(addRandomCell(newGrid))
    setGrid(newGrid)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }, [addRandomCell])

  const moveLeft = useCallback((currentGrid: Cell[][]): { grid: Cell[][]; score: number } => {
    const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })))
    let moveScore = 0

    for (let r = 0; r < GRID_SIZE; r++) {
      let row = newGrid[r].filter(cell => cell.value !== 0)
      
      for (let c = 0; c < row.length - 1; c++) {
        if (row[c].value === row[c + 1].value) {
          row[c].value *= 2
          moveScore += row[c].value
          row[c + 1].value = 0
        }
      }
      
      row = row.filter(cell => cell.value !== 0)
      while (row.length < GRID_SIZE) {
        row.push({ value: 0, id: 0 })
      }
      
      newGrid[r] = row
    }

    return { grid: newGrid, score: moveScore }
  }, [])

  const moveRight = useCallback((currentGrid: Cell[][]): { grid: Cell[][]; score: number } => {
    const reversed = currentGrid.map(row => [...row].reverse())
    const { grid: movedGrid, score } = moveLeft(reversed)
    return { 
      grid: movedGrid.map(row => [...row].reverse()), 
      score 
    }
  }, [moveLeft])

  const moveUp = useCallback((currentGrid: Cell[][]): { grid: Cell[][]; score: number } => {
    const transposed = Array(GRID_SIZE).fill(null).map((_, c) => 
      Array(GRID_SIZE).fill(null).map((_, r) => ({ ...currentGrid[r][c] }))
    )
    const { grid: movedGrid, score } = moveLeft(transposed)
    return {
      grid: Array(GRID_SIZE).fill(null).map((_, c) =>
        Array(GRID_SIZE).fill(null).map((_, r) => ({ ...movedGrid[r][c] }))
      ),
      score
    }
  }, [moveLeft])

  const moveDown = useCallback((currentGrid: Cell[][]): { grid: Cell[][]; score: number } => {
    const transposed = Array(GRID_SIZE).fill(null).map((_, c) =>
      Array(GRID_SIZE).fill(null).map((_, r) => ({ ...currentGrid[r][c] }))
    )
    const { grid: movedGrid, score } = moveRight(transposed)
    return {
      grid: Array(GRID_SIZE).fill(null).map((_, c) =>
        Array(GRID_SIZE).fill(null).map((_, r) => ({ ...movedGrid[r][c] }))
      ),
      score
    }
  }, [moveRight])

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver || won) return

    let result: { grid: Cell[][]; score: number }
    
    switch (direction) {
      case 'left':
        result = moveLeft(grid)
        break
      case 'right':
        result = moveRight(grid)
        break
      case 'up':
        result = moveUp(grid)
        break
      case 'down':
        result = moveDown(grid)
        break
      default:
        return
    }

    const hasChanged = JSON.stringify(grid) !== JSON.stringify(result.grid)
    
    if (hasChanged) {
      let newGrid = addRandomCell(result.grid)
      setGrid(newGrid)
      setScore(prev => {
        const newScore = prev + result.score
        if (newScore > bestScore) {
          setBestScore(newScore)
          localStorage.setItem('nebois-2048-best', String(newScore))
        }
        return newScore
      })

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (newGrid[r][c].value === 2048) {
            setWon(true)
          }
        }
      }

      const emptyCells = getEmptyCells(newGrid)
      if (emptyCells.length === 0) {
        let canMove = false
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (r < GRID_SIZE - 1 && newGrid[r][c].value === newGrid[r + 1][c].value) {
              canMove = true
              break
            }
            if (c < GRID_SIZE - 1 && newGrid[r][c].value === newGrid[r][c + 1].value) {
              canMove = true
              break
            }
          }
          if (canMove) break
        }
        if (!canMove) setGameOver(true)
      }
    }
  }, [grid, gameOver, won, bestScore, moveLeft, moveRight, moveUp, moveDown, addRandomCell, getEmptyCells])

  useEffect(() => {
    initGame()
    const saved = localStorage.getItem('nebois-2048-best')
    if (saved) setBestScore(parseInt(saved))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const direction = e.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right'
        move(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  const getCellColor = (value: number): string => {
    const colors: Record<number, string> = {
      0: 'bg-slate-200 dark:bg-slate-700',
      2: 'bg-slate-50 dark:bg-slate-600',
      4: 'bg-amber-100 dark:bg-amber-900',
      8: 'bg-orange-200 dark:bg-orange-800',
      16: 'bg-orange-300 dark:bg-orange-700',
      32: 'bg-orange-400 dark:bg-orange-600',
      64: 'bg-red-400 dark:bg-red-600',
      128: 'bg-yellow-400 dark:bg-yellow-600',
      256: 'bg-yellow-500 dark:bg-yellow-500',
      512: 'bg-yellow-600 dark:bg-yellow-400',
      1024: 'bg-yellow-700 dark:bg-yellow-300',
      2048: 'bg-yellow-800 dark:bg-yellow-200',
    }
    return colors[value] || 'bg-yellow-900'
  }

  const getTextColor = (value: number): string => {
    return value <= 4 ? 'text-slate-800 dark:text-slate-200' : 'text-white'
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">2048</h1>
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

        <div className="grid grid-cols-4 gap-2 mb-6 aspect-square">
          {grid.map((row, rIndex) =>
            row.map((cell, cIndex) => (
              <div
                key={`${rIndex}-${cIndex}`}
                className={`rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${getCellColor(cell.value)} ${getTextColor(cell.value)}`}
              >
                {cell.value || ''}
              </div>
            ))
          )}
        </div>

        {(gameOver || won) && (
          <div className="mb-4 p-4 text-center rounded-lg bg-slate-100 dark:bg-slate-700">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {won ? '🎉 恭喜你达到 2048!' : '游戏结束!'}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={initGame}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            重新开始
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          使用方向键或 WASD 移动方块
        </div>
      </div>
    </div>
  )
}
