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
    <motion.div
      layout
      className={`relative inline-block ${className}`}
      transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          className={`inline-block ${textClassName}`}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: animationDuration / 1000 / 2,
            ease: "easeInOut"
          }}
        >
          {currentWord.split('').map((letter, index) => (
            <motion.span
              key={`${currentWord}-${index}`}
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                delay: index * 0.02,
                duration: animationDuration / 1000 / 3,
                ease: "easeOut"
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}
