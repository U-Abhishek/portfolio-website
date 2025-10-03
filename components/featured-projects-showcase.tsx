'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  name: string
  description: string
  summary?: string
  image: string
  tags?: string[]
  github?: string
  live?: string
}

interface FeaturedProjectsShowcaseProps {
  projects: Project[]
}

export function FeaturedProjectsShowcase({ projects }: FeaturedProjectsShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    if (projects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [projects.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  if (projects.length === 0) return null

  return (
    <div className="mt-8 p-4 bg-card border border-border rounded-2xl">
      <h3 className="text-white text-lg font-semibold mb-2">Featured Projects</h3>
      <div className="relative h-[200px] overflow-hidden">
        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-secondary border border-border hover:bg-primary transition-all duration-200"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-secondary border border-border hover:bg-primary transition-all duration-200"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        <div className="relative h-full flex items-center justify-center">
          {projects.map((project, index) => {
            const isActive = index === currentIndex
            const isLeft = index < currentIndex
            const isRight = index > currentIndex
            
            // Calculate position and styling based on card position
            let cardStyle = ''
            if (isActive) {
              cardStyle = 'z-20 scale-100 opacity-100'
            } else if (isLeft) {
              const distance = currentIndex - index
              cardStyle = `z-10 scale-75 opacity-30 transform -rotate-12 -translate-x-${distance * 4}`
            } else if (isRight) {
              const distance = index - currentIndex
              cardStyle = `z-10 scale-75 opacity-30 transform rotate-12 translate-x-${distance * 4}`
            }

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out ${cardStyle}`}
                style={{
                  transform: isActive 
                    ? 'translateX(0) scale(1)' 
                    : isLeft 
                      ? `translateX(-${(currentIndex - index) * 60}px) scale(0.75) rotate(-12deg)`
                      : `translateX(${(index - currentIndex) * 60}px) scale(0.75) rotate(12deg)`
                }}
              >
                <Link href="/projects" className="block group">
                  <div className="bg-card rounded-2xl border border-border p-3 hover:border-primary transition-all duration-300 hover:scale-105 w-[280px]">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-white font-semibold text-center group-hover:text-primary transition-colors text-sm">
                      {project.name}
                    </h4>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
