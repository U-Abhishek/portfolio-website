'use client'

import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

interface Project {
  name: string
  description: string
  summary?: string
  image: string
  tags?: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <CardContainer className="inter-var" containerClassName="py-0">
      <CardBody className="bg-background relative group/card hover:shadow-2xl hover:shadow-primary/[0.1] border-border w-full h-auto rounded-xl p-6 border cursor-pointer">
        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white mb-3"
        >
          {project.name}
        </CardItem>

        {/* Summary */}
        <CardItem
          translateZ="40"
          className="text-muted-foreground text-sm leading-relaxed mb-4"
        >
          {project.summary ?? project.description}
        </CardItem>

        {/* Image - always visible */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden project-image-container">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover project-image"
          />
        </div>
      </CardBody>
    </CardContainer>
  )
}
