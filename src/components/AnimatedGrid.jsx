import { motion } from 'framer-motion'

export default function AnimatedGrid({ children }) {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.02,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
