'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Github, ExternalLink, FileText, Globe } from 'lucide-react'

interface Project {
  name: string
  description: string
  date: string
  ieee?: string
  live?: string
  github?: string
  report?: string
  image: string
  youtube?: string
  tags?: string[]
  summary?: string
}

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {

  // Month number to month name mapping
  const monthNames: { [key: string]: string } = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December'
  }

  // Format date from YYYY-MM to "Month YYYY"
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-')
    return `${monthNames[month]} ${year}`
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const youtubeId = project.youtube ? extractYouTubeId(project.youtube) : null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-background/95 border border-border rounded-xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl shadow-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="relative px-8 pt-12 pb-0">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            <span className="text-md text-muted-foreground mt-1">{formatDate(project.date)}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-white transition-colors p-2 hover:bg-primary/20 rounded-lg border border-border hover:border-primary/30"
          >
            <X size={24} strokeWidth={4} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-100px)] overflow-hidden">
          {/* Left side - Project details */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="space-y-6">

              {/* Description */}
              <div className="text-muted-foreground leading-relaxed text-left">
                {project.description}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 font-medium"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}
                  {project.ieee && (
                    <a
                      href={project.ieee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 font-medium"
                    >
                      <FileText size={18} />
                      IEEE
                    </a>
                  )}
                  {project.report && (
                    <a
                      href={project.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all duration-200 border border-primary/30 hover:border-primary/50 text-sm"
                    >
                      <FileText size={16} />
                      Report
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 font-medium"
                    >
                      <Globe size={18} />
                      Live
                    </a>
                  )}
                </div>
            </div>
          </div>

          {/* Right side - Media */}
          <div className="lg:w-1/2 px-8 pt-4 pb-8 flex items-center justify-center bg-black">
            {project.youtube && youtubeId ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-white/10 border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title={project.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-2xl shadow-white/10 border border-white/10 project-image-container">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover project-image"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
