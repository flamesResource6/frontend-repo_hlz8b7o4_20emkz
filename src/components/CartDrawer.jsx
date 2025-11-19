import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { isOpen, closeCart, cart, removeItem, setQty, subtotal, shipping, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40" onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={closeCart} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5"/></button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-12">Your cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id || item._id} className="flex gap-3 items-center">
                    <img src={item.image_url} alt={item.title} className="w-20 h-20 rounded-lg object-cover border" />
                    <div className="flex-1">
                      <div className="font-medium line-clamp-1">{item.title}</div>
                      <div className="text-sm text-gray-500">${(item.price || 0).toFixed(2)}</div>
                      <div className="mt-2 inline-flex items-center gap-2">
                        <button onClick={() => setQty(item.id || item._id, Math.max(1, (item.qty || 1) - 1))} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Minus className="w-4 h-4"/></button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button onClick={() => setQty(item.id || item._id, (item.qty || 1) + 1)} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Plus className="w-4 h-4"/></button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id || item._id)} className="p-2 rounded-lg text-red-600 hover:bg-red-50"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <a href="/checkout" className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg mt-2">Checkout</a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
