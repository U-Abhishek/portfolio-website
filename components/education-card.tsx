'use client'

import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Calendar, MapPin } from 'lucide-react'

interface Education {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  logo?: string
  details?: string[]
}

interface EducationCardProps {
  education: Education
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="relative w-full max-w-4xl">
      <CardContainer className="inter-var" containerClassName="py-0">
        <CardBody className="bg-background relative group/card hover:shadow-2xl hover:shadow-primary/[0.1] border-border w-full h-auto rounded-xl p-6 border cursor-pointer">
          {/* Logo - outside 3D context */}
          {education.logo && (
            <div className="absolute top-6 left-6">
              <img 
                src={`/images/education/${education.logo}`}
                alt={`${education.institution} logo`}
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
          
          {/* Content with 3D layering */}
          <div className="ml-24">
            <CardItem
              translateZ="50"
              className="text-xl font-bold mb-3"
            >
              <span>{education.degree}</span> <span className="font-medium text-muted-foreground">@ {education.institution}</span>
            </CardItem>
            
            <CardItem
              translateZ="40"
              className="flex items-center gap-2 text-sm mb-2"
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{education.location}</span>
            </CardItem>
            
            <CardItem
              translateZ="30"
              className="flex items-center gap-2 text-sm mb-2"
            >
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{education.startDate} - {education.endDate}</span>
              {education.gpa && <span className="ml-2 text-muted-foreground">GPA: {education.gpa}</span>}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  )
}