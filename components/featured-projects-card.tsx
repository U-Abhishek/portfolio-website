'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import projectsData from '@/data/projects.json'

interface FeaturedProjectsCardProps {
  className?: string
  autoRotate?: boolean
  rotationInterval?: number
}

export function FeaturedProjectsCard({ 
  className = "", 
  autoRotate = true, 
  rotationInterval = 4000 
}: FeaturedProjectsCardProps) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Get featured projects
  const featuredProjects = projectsData.projects.filter(project => project.featured)

  useEffect(() => {
    if (!autoRotate || featuredProjects.length <= 1) return

    // Auto-rotate featured projects
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [featuredProjects.length, autoRotate, rotationInterval])

  if (featuredProjects.length === 0) return null

  return (
    <div className={`w-full max-w-md px-4 ${className}`}>
      <Link
        href="/projects"
        className="block group"
      >
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-black/90 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
          <div className="flex items-center gap-4">
            <div className="w-28 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              <img
                src={featuredProjects[currentProjectIndex]?.image}
                alt={featuredProjects[currentProjectIndex]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                {featuredProjects[currentProjectIndex]?.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {featuredProjects[currentProjectIndex]?.summary}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
            >
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
