function PressList({ items }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Latest Press Releases</h3>
      <div className="divide-y divide-gray-100">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">No items yet. Start monitoring to see updates.</p>
        )}
        {items.map((p) => (
          <a key={p._id} href={p.url} target="_blank" className="py-3 flex items-start justify-between gap-3 hover:bg-gray-50 rounded px-2">
            <div>
              <p className="text-sm font-medium text-gray-900">{p.title}</p>
              <p className="text-xs text-gray-500">{p.source} • {p.ticker} • {p.published_at ? new Date(p.published_at).toLocaleString() : ''}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${p.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : p.sentiment === 'negative' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'}`}>{p.sentiment || 'neutral'}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PressList
