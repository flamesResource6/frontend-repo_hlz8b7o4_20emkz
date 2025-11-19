import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'

function App() {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex(p => p.id === product.id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900">
      <Navbar cartCount={cartCount} />
      <Hero onSearch={setQuery} />
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <Catalog query={query} onAdd={addToCart} />
      </main>
      <footer className="border-t border-amber-200/70 bg-amber-50/60">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-amber-900/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} BeeBoutique — Pure honey, naturally.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-amber-900" href="#">Shipping</a>
            <a className="hover:text-amber-900" href="#">Returns</a>
            <a className="hover:text-amber-900" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
