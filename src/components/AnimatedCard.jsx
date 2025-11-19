import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function AnimatedCard({ children }) {
  return (
    <motion.div variants={variants} whileHover={{ y: -2 }}>
      {children}
    </motion.div>
  )
}
