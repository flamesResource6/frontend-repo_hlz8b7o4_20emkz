import { useState, useMemo } from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import PageShell from './components/PageShell'
import AnimatedGrid from './components/AnimatedGrid'
import AnimatedCard from './components/AnimatedCard'

function App() {
  const [query, setQuery] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [seedStatus, setSeedStatus] = useState('')
  const [seeding, setSeeding] = useState(false)

  const seedDemo = async () => {
    try {
      setSeeding(true)
      setSeedStatus('')
      const base = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace(/:\d+$/, ':8000') : '')
      if (!base) {
        setSeedStatus('Backend URL not set. Open the Test page to configure or try again later.')
        return
      }
      const res = await fetch(`${base}/api/seed`, { method: 'POST' })
      if (!res.ok) throw new Error(`Seed failed: ${res.status}`)
      const data = await res.json()
      setSeedStatus(`✅ Added demo products (${(data.seeded?.products ?? 0)} products, ${(data.seeded?.categories ?? 0)} categories).`)
      setRefreshKey(k => k + 1)
    } catch (e) {
      setSeedStatus(`❌ ${e.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <PageShell>
      <Hero onSearch={setQuery} />
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex items-center gap-2">
            <a href="/test" className="text-sm underline text-amber-800/80 hover:text-amber-900">Connection check</a>
            <button onClick={seedDemo} disabled={seeding} className="text-sm bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg">{seeding ? 'Adding…' : 'Add demo products'}</button>
          </div>
        </div>
        {seedStatus && (
          <div className="mb-4 text-sm px-3 py-2 rounded-lg border border-amber-200 bg-amber-100/70">{seedStatus}</div>
        )}
        <AnimatedGrid>
          <Catalog query={query} refreshKey={refreshKey} />
        </AnimatedGrid>
      </main>
    </PageShell>
  )
}

export default App
