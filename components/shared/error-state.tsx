"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full min-h-[50vh] text-center px-4 py-8"
    >
      <h3 className="text-xl font-bold text-white mb-2">Something Went Wrong</h3>
      <p className="text-gray-300 text-sm mb-4">{message}</p>
      <Button
        onClick={onRetry}
        className="bg-white text-black hover:bg-gray-200 transition-colors duration-200"
        aria-label="Retry loading events"
      >
        Try Again
      </Button>
    </motion.div>
  )
}