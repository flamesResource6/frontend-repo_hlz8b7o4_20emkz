import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const id = product.id || product._id
  return (
    <AnimatedCard>
      <a href={`/product/${id}`} className="group block bg-white/80 backdrop-blur border border-amber-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
        <div className="aspect-square rounded-xl bg-amber-50 overflow-hidden border border-amber-200">
          <img src={product.image_url || 'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=600&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-amber-900 line-clamp-1">{product.title}</h3>
          <p className="text-sm text-amber-900/70 line-clamp-2">{product.description || 'Delicious natural goodness.'}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-lg font-bold text-amber-900">${product.price?.toFixed(2)}</div>
            <button onClick={(e) => { e.preventDefault(); addItem(product) }} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-xl">
              <ShoppingCart className="w-4 h-4"/> Add
            </button>
          </div>
        </div>
      </a>
    </AnimatedCard>
  )
}
