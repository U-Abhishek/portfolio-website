"use client"

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useMemo } from 'react'

interface ProjectDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    name: string
    summary?: string
    description: string
    date?: string
    tags?: string[]
    github?: string
    report?: string
    ieee?: string
    demo?: string
    youtube?: string
    image: string
  }
}

export function ProjectDetail({ open, onOpenChange, project }: ProjectDetailProps) {
  const youtubeEmbedUrl = useMemo(() => {
    if (!project.youtube) return ''
    try {
      const url = new URL(project.youtube)
      if (url.hostname.includes('youtube.com') && url.searchParams.get('v')) {
        const id = url.searchParams.get('v') as string
        return `https://www.youtube.com/embed/${id}`
      }
      if (url.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed${url.pathname}`
      }
      return project.youtube
    } catch {
      return project.youtube
    }
  }, [project.youtube])
  const hasYouTube = !!youtubeEmbedUrl

  const links: Array<{ label: string; href?: string }> = [
    { label: 'GitHub', href: project.github },
    { label: 'Report', href: project.report },
    { label: 'IEEE', href: project.ieee },
    { label: 'Demo', href: project.demo },
    { label: 'YouTube', href: project.youtube },
  ].filter(l => !!l.href)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl bg-black text-white border-white/10 max-h-[85vh] overflow-y-auto p-10 md:p-12">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
          {links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-3">
          <div className="space-y-5 px-4 md:px-6">
            {project.date && (
              <div className="text-xs text-gray-400">{project.date}</div>
            )}
            <p className="text-sm text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="space-y-5 px-4 md:px-6">
            {hasYouTube && (
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                <iframe
                  src={youtubeEmbedUrl}
                  title={project.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
            {!hasYouTube && project.image && (
              <div className="relative w-full h-72 md:h-80 rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDetail


