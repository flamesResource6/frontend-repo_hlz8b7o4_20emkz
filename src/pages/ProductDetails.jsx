import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const fallback = (typeof window !== 'undefined' ? window.location.origin.replace(/:\d+$/, ':8000') : '')
const API_BASE = import.meta.env.VITE_BACKEND_URL || fallback

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`)
        if (!res.ok) throw new Error(`Load failed: ${res.status}`)
        const data = await res.json()
        if (isMounted) setProduct(data)
      } catch (e) {
        if (isMounted) setError(e.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [id])

  if (loading) {
    return <div className="min-h-[60vh] grid place-items-center">Loading…</div>
  }
  if (error || !product) {
    return <div className="min-h-[60vh] grid place-items-center">Unable to load product.</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspect-square rounded-3xl overflow-hidden border bg-amber-50">
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h1 className="text-3xl font-bold text-amber-900">{product.title}</h1>
          <p className="mt-2 text-amber-900/80">{product.description}</p>
          <div className="mt-4 text-2xl font-extrabold text-amber-900">${product.price?.toFixed(2)}</div>
          <div className="mt-6">
            <button onClick={() => addItem(product)} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl">
              <ShoppingCart className="w-4 h-4"/> Add to cart
            </button>
          </div>
          {product.variant && <div className="mt-6 text-sm text-amber-900/70">Variant: {product.variant}</div>}
          {product.weight_grams && <div className="text-sm text-amber-900/70">Weight: {product.weight_grams}g</div>}
        </motion.div>
      </div>
    </div>
  )
}
