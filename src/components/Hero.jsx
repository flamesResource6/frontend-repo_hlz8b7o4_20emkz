import { ShoppingCart, Leaf, Package, Search } from 'lucide-react'
import { motion } from 'framer-motion'

function Badge({ children }) {
  return (
    <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300/60">
      {children}
    </motion.span>
  )
}

export default function Hero({ onSearch }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.12),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex-1 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <Badge>Raw</Badge>
              <Badge>Organic</Badge>
              <Badge>Local</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-amber-900">
              Pure Honey & Natural Derivatives
            </h1>
            <p className="mt-4 text-amber-900/80 text-lg max-w-2xl">
              From hive to home — sustainably harvested honey, propolis, beeswax, and more.
            </p>
            <div className="mt-6 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex items-center bg-white/80 backdrop-blur border border-amber-200 rounded-xl px-3 py-2 w-full max-w-md shadow-sm">
                <Search className="w-5 h-5 text-amber-600" />
                <input
                  placeholder="Search honey, propolis, beeswax..."
                  className="ml-2 bg-transparent outline-none w-full text-amber-900 placeholder:text-amber-700/50"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
              <a href="#catalog" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl shadow">
                <ShoppingCart className="w-4 h-4" /> Shop Now
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-amber-900/70">
              <div className="inline-flex items-center gap-2"><Leaf className="w-4 h-4"/>Sustainably sourced</div>
              <div className="inline-flex items-center gap-2"><Package className="w-4 h-4"/>No additives</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex-1 w-full">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-200 to-amber-100 border border-amber-300/60 shadow-inner flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" alt="Honey jar" className="w-3/4 h-3/4 object-cover rounded-2xl shadow-2xl border border-amber-300/60"/>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
