import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
}

export default function AnimatedCard({ children }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}
