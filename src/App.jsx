import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TickerSelector from './components/TickerSelector'
import SignalCard from './components/SignalCard'
import PressList from './components/PressList'

function App() {
  const [signals, setSignals] = useState([])
  const [press, setPress] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchData = async (ticker) => {
    const qs = ticker ? `?ticker=${encodeURIComponent(ticker)}` : ''
    const [s, p] = await Promise.all([
      fetch(`${baseUrl}/api/signals${qs}`).then(r => r.json()),
      fetch(`${baseUrl}/api/press${qs}`).then(r => r.json())
    ])
    setSignals(s.items || [])
    setPress(p.items || [])
    setLastUpdated(Date.now())
  }

  const startMonitoring = async (tickers) => {
    setLoading(true)
    try {
      await fetch(`${baseUrl}/api/mock-ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tickers }),
      }).then(r => r.json())
      await fetchData()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
        <Header onRefresh={() => fetchData()} lastUpdated={lastUpdated} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TickerSelector onSubmit={startMonitoring} loading={loading} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Actionable Signals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {signals.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 bg-white">No signals yet</div>
                )}
                {signals.map((s) => (
                  <SignalCard key={s._id} signal={s} />
                ))}
              </div>
            </section>

            <section>
              <PressList items={press} />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
