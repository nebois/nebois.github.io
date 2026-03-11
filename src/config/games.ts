import { LucideIcon } from 'lucide-react'
import { Gamepad2, Dices, Puzzle, Crosshair } from 'lucide-react'

export interface Game {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  route: string
  status: 'coming' | 'available'
}

export const gamesList: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: '经典的数字合成游戏，合并相同的数字达到2048',
    icon: Dices,
    color: 'bg-amber-500',
    route: '/games/2048/',
    status: 'available',
  },
  {
    id: 'snake',
    title: '贪吃蛇',
    description: '经典贪吃蛇游戏，吃食物变长，不要撞墙',
    icon: Crosshair,
    color: 'bg-green-500',
    route: '/games/snake/',
    status: 'available',
  },
  {
    id: 'tetris',
    title: '俄罗斯方块',
    description: '经典俄罗斯方块，消除行来得分',
    icon: Puzzle,
    color: 'bg-purple-500',
    route: '/games/tetris/',
    status: 'coming',
  },
  {
    id: 'minesweeper',
    title: '扫雷',
    description: '经典扫雷游戏，找出所有地雷',
    icon: Gamepad2,
    color: 'bg-blue-500',
    route: '/games/minesweeper/',
    status: 'coming',
  },
]

export function getAvailableGames(): Game[] {
  return gamesList.filter(game => game.status === 'available')
}

export function getGameById(id: string): Game | undefined {
  return gamesList.find(game => game.id === id)
}
