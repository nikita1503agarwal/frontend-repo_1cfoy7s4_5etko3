import { TrendingUp, RefreshCw } from 'lucide-react'

function Header({ onRefresh, lastUpdated }) {
  return (
    <header className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">EquiSignal</h1>
          <p className="text-sm text-gray-500">Real-time signals from company press releases</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {lastUpdated && (
          <span className="text-xs text-gray-500">Updated {new Date(lastUpdated).toLocaleTimeString()}</span>
        )}
        <button onClick={onRefresh} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>
    </header>
  )
}

export default Header
