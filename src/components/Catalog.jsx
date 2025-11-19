import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL

export default function Catalog({ query = '', onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        // Build endpoint safely even if API_BASE is not set
        let endpoint = '/api/products'
        if (API_BASE) {
          endpoint = new URL('/api/products', API_BASE).toString()
        } else if (typeof window !== 'undefined' && window.location?.origin) {
          // Fallback to same-origin to avoid URL constructor crash; may 404 but won't break the UI
          endpoint = `${window.location.origin}/api/products`
        }

        const url = new URL(endpoint)
        if (query) url.searchParams.set('q', query)

        const res = await fetch(url.toString())
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }
        const data = await res.json()
        if (isMounted) setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        if (isMounted) {
          setProducts([])
          setError('Unable to load products. Please ensure the backend URL is set and running.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
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

  if (error) {
    return (
      <div className="bg-amber-100/70 border border-amber-200 text-amber-900 p-4 rounded-xl">
        <div className="font-semibold mb-1">We couldn't load the catalog.</div>
        <div className="text-sm opacity-80">{error}</div>
        <div className="text-sm mt-2">Try the connection check at <a className="underline" href="/test">/test</a>. If it's empty, click the seed button there or tell me to seed demo products.</div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-amber-900/70 py-12">No products yet. Use the connection check at <a className="underline" href="/test">/test</a> to seed demo data.</div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard key={p.id || p._id || p.title} product={p} onAdd={onAdd} />
      ))}
    </div>
  )
}
