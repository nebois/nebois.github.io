import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { gamesList } from '@/config/games'

export default function GamesPage() {
  const availableGames = gamesList.filter(g => g.status === 'available')
  const comingGames = gamesList.filter(g => g.status === 'coming')

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          游戏中心
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          放松一下，来玩些经典小游戏
        </p>
      </div>

      {/* Available games */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          可玩游戏
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {availableGames.map((game) => {
            const Icon = game.icon
            return (
              <Link
                key={game.id}
                href={game.route}
                className="group block p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${game.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {game.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Coming soon */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          即将推出
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {comingGames.map((game) => {
            const Icon = game.icon
            return (
              <div
                key={game.id}
                className="block p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${game.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                        {game.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        即将上线
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                      {game.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
