import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

function badgeColor(action) {
  switch (action) {
    case 'buy':
      return 'bg-emerald-100 text-emerald-700'
    case 'sell':
      return 'bg-rose-100 text-rose-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function arrowIcon(action) {
  switch (action) {
    case 'buy':
      return <ArrowUpRight className="h-4 w-4 text-emerald-600" />
    case 'sell':
      return <ArrowDownRight className="h-4 w-4 text-rose-600" />
    default:
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

function SignalCard({ signal }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${badgeColor(signal.action)}`}>{signal.action.toUpperCase()}</span>
          <span className="text-xs text-gray-500">Confidence {(signal.confidence * 100).toFixed(0)}%</span>
        </div>
        {arrowIcon(signal.action)}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{signal.ticker}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{signal.reason}</p>
      </div>
      <a href={signal.source_url} target="_blank" className="text-sm text-blue-600 hover:underline">
        {signal.source_title}
      </a>
      <div className="text-xs text-gray-500">
        {signal.published_at ? new Date(signal.published_at).toLocaleString() : ''}
      </div>
    </div>
  )
}

export default SignalCard
