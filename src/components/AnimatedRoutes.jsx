import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import App from '../App'
import Test from '../Test'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'

const page = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 }
}

export default function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...page} className="min-h-screen">
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
