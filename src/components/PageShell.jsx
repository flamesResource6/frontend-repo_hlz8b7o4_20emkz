import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import { CartProvider } from '../context/CartContext'

export default function PageShell({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900">
        <NavbarWithCart />
        {children}
        <CartDrawer />
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
    </CartProvider>
  )
}

import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

function NavbarWithCart() {
  const { count, toggleCart } = useCart()
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-amber-50/70 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a className="text-xl font-extrabold tracking-tight text-amber-900" href="/">BeeBoutique</a>
        <button onClick={toggleCart} className="inline-flex items-center gap-2">
          <span className="text-sm text-amber-900/70 hidden sm:block">Cart</span>
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-amber-800"/>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs px-1.5 py-0.5 rounded-full">{count}</span>
            )}
          </div>
        </button>
      </div>
    </header>
  )
}
