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

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, projects.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore some of my most impactful projects in AI, Computer Vision, and Robotics
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - only show if multiple projects */}
          {projects.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-secondary border border-border hover:bg-primary transition-all duration-200"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-secondary border border-border hover:bg-primary transition-all duration-200"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Carousel */}
          <div className="relative h-[400px] overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="relative h-full">
                    {/* Background cards (left and right) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Left background card - only show if there are multiple projects */}
                      {projects.length > 1 && index > 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[320px] transform -rotate-12 scale-75 opacity-30 z-10">
                          <div className="w-full h-full bg-gradient-to-br from-card to-background rounded-xl border border-border shadow-2xl">
                            <div className="p-4 h-full flex flex-col">
                              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={projects[(index - 1 + projects.length) % projects.length].image}
                                  alt={projects[(index - 1 + projects.length) % projects.length].name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                                {projects[(index - 1 + projects.length) % projects.length].name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Right background card - only show if there are multiple projects */}
                      {projects.length > 1 && index < projects.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[320px] transform rotate-12 scale-75 opacity-30 z-10">
                          <div className="w-full h-full bg-gradient-to-br from-card to-background rounded-xl border border-border shadow-2xl">
                            <div className="p-4 h-full flex flex-col">
                              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={projects[(index + 1) % projects.length].image}
                                  alt={projects[(index + 1) % projects.length].name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                                {projects[(index + 1) % projects.length].name}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center card */}
                    <div className="relative z-20 flex items-center justify-center h-full">
                      <Link href="/projects" className="group">
                        <div className="w-[400px] h-[360px] bg-gradient-to-br from-card to-background rounded-2xl border border-border shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                          <div className="p-6 h-full flex flex-col">
                            {/* Project Image */}
                            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                              <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            {/* Project Info */}
                            <div className="flex-1 flex flex-col">
                              <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                                {project.name}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                {project.summary || project.description}
                              </p>

                              {/* Tags */}
                              {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* View All Projects CTA */}
                              <div className="mt-auto">
                                <div className="text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                                  View All Projects →
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator - only show if multiple projects */}
          {projects.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-white/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
