'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ContainerTextFlipProps {
  words?: string[]
  interval?: number
  animationDuration?: number
  className?: string
  textClassName?: string
}

export function ContainerTextFlip({
  words = ["AI Systems Architect", "ML Engineer", "Developer"],
  interval = 3000,
  animationDuration = 700,
  className = "",
  textClassName = ""
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, animationDuration / 2)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval, animationDuration])

  const currentWord = words[currentWordIndex]

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="relative overflow-hidden perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            className={`relative inline-block px-4 py-2 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 shadow-lg ${textClassName}`}
            initial={{ 
              opacity: 0, 
              y: 20,
              rotateX: -90,
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: 20,
              rotateX: -90,
              scale: 0.9
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden"
            }}
          >
            {currentWord}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

