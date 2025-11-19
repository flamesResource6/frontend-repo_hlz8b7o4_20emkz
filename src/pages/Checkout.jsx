import { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'

const API_BASE = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace(/:\d+$/, ':8000') : '')

export default function Checkout() {
  const { cart, subtotal, shipping, total, clear } = useCart()
  const [form, setForm] = useState({ full_name: '', email: '', address_line1: '', city: '', postal_code: '', country: 'US' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => cart.length > 0 && form.full_name && form.email && form.address_line1 && form.city && form.postal_code, [cart.length, form])

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setStatus('')
    try {
      const order = {
        items: cart.map(i => ({ product_id: i.id || i._id, title: i.title, price: i.price, quantity: i.qty })),
        customer: {
          full_name: form.full_name,
          email: form.email,
          address_line1: form.address_line1,
          address_line2: form.address_line2 || '',
          city: form.city,
          state: form.state || '',
          postal_code: form.postal_code,
          country: form.country || 'US',
          phone: form.phone || ''
        },
        subtotal: Number(subtotal.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        total: Number(total.toFixed(2)),
        status: 'pending'
      }
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      if (!res.ok) throw new Error(`Order failed: ${res.status}`)
      const data = await res.json()
      setStatus(`✅ Order received. Reference: ${data.id}`)
      clear()
    } catch (e) {
      setStatus(`❌ ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={placeOrder} className="lg:col-span-2 bg-white/80 backdrop-blur rounded-2xl p-6 border border-amber-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Full name" className="input" value={form.full_name} onChange={e=>setForm(f=>({...f, full_name:e.target.value}))} />
              <input required type="email" placeholder="Email" className="input" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
            </div>
            <input required placeholder="Address line 1" className="input" value={form.address_line1} onChange={e=>setForm(f=>({...f, address_line1:e.target.value}))} />
            <input placeholder="Address line 2" className="input" value={form.address_line2||''} onChange={e=>setForm(f=>({...f, address_line2:e.target.value}))} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input required placeholder="City" className="input" value={form.city} onChange={e=>setForm(f=>({...f, city:e.target.value}))} />
              <input placeholder="State" className="input" value={form.state||''} onChange={e=>setForm(f=>({...f, state:e.target.value}))} />
              <input required placeholder="Postal code" className="input" value={form.postal_code} onChange={e=>setForm(f=>({...f, postal_code:e.target.value}))} />
            </div>
            <div className="flex items-center gap-3">
              <button disabled={!canSubmit || loading} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl">{loading ? 'Placing order…' : 'Place Order'}</button>
              {status && <span className="text-sm">{status}</span>}
            </div>
          </form>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-amber-200 h-fit">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            {cart.length === 0 ? (
              <div className="text-sm text-amber-900/70">Your cart is empty.</div>
            ) : (
              <div className="space-y-3">
                {cart.map(i => (
                  <div key={i.id || i._id} className="flex items-center justify-between text-sm">
                    <span className="line-clamp-1 pr-2">{i.title} × {i.qty}</span>
                    <span>${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 space-y-1 text-sm">
                  <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                  <div className="flex items-center justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
