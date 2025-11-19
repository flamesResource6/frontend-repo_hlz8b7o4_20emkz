import { motion } from 'framer-motion'

export default function AnimatedGrid({ children }) {
  return (
    <motion.div
      className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
