import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedCard from './AnimatedCard'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const id = product.id || product._id
  return (
    <AnimatedCard>
      <a href={`/product/${id}`} className="group block bg-white/80 backdrop-blur border border-amber-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:shadow-amber-200/40 transition-all duration-300 relative overflow-hidden">
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-[1.6rem] opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 bg-gradient-to-r from-amber-200/0 via-amber-300/20 to-amber-200/0" />

        <div className="relative rounded-2xl bg-amber-50 overflow-hidden border border-amber-200">
          <motion.img 
            src={product.image_url || 'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop'} 
            alt={product.title} 
            className="w-full h-56 sm:h-64 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          />
          {/* Shine */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -inset-y-10 -left-1/2 w-[200%] rotate-6 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-60%] group-hover:translate-x-[60%] transition-all duration-700" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-amber-900 line-clamp-1 tracking-tight text-lg group-hover:text-amber-950 transition-colors">{product.title}</h3>
          <p className="text-sm text-amber-900/70 line-clamp-2">{product.description || 'Delicious natural goodness.'}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xl font-bold text-amber-900">${product.price?.toFixed(2)}</div>
            <motion.button 
              onClick={(e) => { e.preventDefault(); addItem(product) }} 
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-2xl shadow-sm"
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <ShoppingCart className="w-4 h-4"/> Add
            </motion.button>
          </div>
        </div>
      </a>
    </AnimatedCard>
  )
}
