import { useState } from 'react'

const DEFAULT = ['AAPL','MSFT','GOOGL','AMZN','META','NVDA','TSLA','JPM','V','NFLX']

function TickerSelector({ onSubmit, loading }) {
  const [tickers, setTickers] = useState(DEFAULT.join(','))

  const submit = (e) => {
    e.preventDefault()
    const list = tickers
      .split(',')
      .map(t => t.trim().toUpperCase())
      .filter(Boolean)
    onSubmit(list)
  }

  return (
    <form onSubmit={submit} className="w-full bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">Tickers to monitor</label>
      <input
        value={tickers}
        onChange={(e) => setTickers(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g., AAPL, MSFT, GOOGL"
      />
      <button
        type="submit"
        disabled={loading}
        className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Monitoring…' : 'Start Monitoring'}
      </button>
    </form>
  )
}

export default TickerSelector
