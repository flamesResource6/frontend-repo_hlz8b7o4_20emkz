import { motion } from 'framer-motion'

export default function AnimatedGrid({ children }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.04,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
