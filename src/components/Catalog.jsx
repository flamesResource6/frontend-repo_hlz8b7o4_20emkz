import { useEffect, useState, useMemo } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Catalog({ query = '', onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = new URL('/api/products', API_BASE)
    if (query) url.searchParams.set('q', query)
    fetch(url.toString())
      .then(r => r.json())
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [query])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-amber-100/60 animate-pulse rounded-2xl border border-amber-200"/>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-amber-900/70 py-12">No products yet. Add some via the API.</div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  )
}
