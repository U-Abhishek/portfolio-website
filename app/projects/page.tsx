'use client'

import { useState, useMemo } from 'react'
import { ProjectCard } from '@/components/project-card'
import { ProjectDetailsModal } from '@/components/project-details-modal'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import projectsData from '@/data/projects.json'

type Category = 'all' | 'Computer Vision' | 'Robotics' | 'Machine Learning'

export default function ProjectsPage() {
  const { projects } = projectsData
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [selectedProject, setSelectedProject] = useState<typeof projectsData.projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get unique categories from project tags - memoized to prevent hydration issues
  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))] as Category[]
  }, [projects])

  // Filter projects based on selected category and sort by date (most recent first)
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'all' 
      ? projects.sort((a, b) => b.date.localeCompare(a.date))
      : projects.filter(project => project.tags?.includes(selectedCategory)).sort((a, b) => b.date.localeCompare(a.date))
  }, [projects, selectedCategory])

  const handleProjectClick = (project: typeof projectsData.projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Content */}
      <div>
        <Navbar />
        
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Projects
            </h1>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-primary border-primary text-white'
                      : 'bg-secondary border-border text-muted-foreground hover:bg-primary hover:border-primary hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.name} onClick={() => handleProjectClick(project)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
        </div>
        
        <Footer />

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}
