'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/project-card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import projectsData from '@/data/projects.json'

type Category = 'all' | 'cv' | 'robotics' | 'ml'

export default function ProjectsPage() {
  const { projects } = projectsData
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  // Get unique categories from project tags
  const categories = ['all', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))] as Category[]

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.tags?.includes(selectedCategory))

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12 mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Projects
            </h1>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
