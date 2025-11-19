import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  const addItem = (product, qty = 1) => {
    if (!product) return
    setCart(prev => {
      const id = product.id || product._id
      const idx = prev.findIndex(p => (p.id || p._id) === id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }
        return copy
      }
      return [...prev, { ...product, qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => (p.id || p._id) !== id))
  }

  const setQty = (id, qty) => {
    setCart(prev => prev.map(p => (p.id || p._id) === id ? { ...p, qty: Math.max(1, qty) } : p))
  }

  const clear = () => setCart([])

  const subtotal = useMemo(() => cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0), [cart])
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])
  const shipping = subtotal > 0 ? 5 : 0
  const total = subtotal + shipping

  const value = {
    cart,
    addItem,
    removeItem,
    setQty,
    clear,
    subtotal,
    total,
    shipping,
    count,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen(v => !v),
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
