import { ShoppingBag, Menu } from 'lucide-react'

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-amber-50/70 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-amber-100"><Menu className="w-5 h-5 text-amber-800"/></button>
          <div className="text-xl font-extrabold tracking-tight text-amber-900">BeeBoutique</div>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="text-sm text-amber-900/70 hidden sm:block">Cart</span>
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-amber-800"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs px-1.5 py-0.5 rounded-full">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
