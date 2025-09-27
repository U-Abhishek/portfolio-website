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
        <CardBody className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer">
          <div className="flex items-start gap-3">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              {education.logo && (
                <img 
                  src={`/images/education/${education.logo}`}
                  alt={`${education.institution} logo`}
                  className="w-20 h-20 object-contain"
                />
              )}
            </div>
            
            {/* Content Section */}
            <div className="flex-grow min-w-0">
              <CardItem translateZ="50" className="text-xl font-bold mb-2 text-left">
                <span>{education.degree}</span> <span className="font-medium text-muted-foreground">@ {education.institution}</span>
              </CardItem>
              
              <CardItem translateZ="40" className="flex items-center gap-2 text-sm text-left mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{education.location}</span>
              </CardItem>
              
              <CardItem translateZ="20" className="flex items-center gap-2 text-sm text-left mb-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{education.startDate} - {education.endDate}</span>
                {education.gpa && <span className="ml-2 text-muted-foreground">GPA: {education.gpa}</span>}
              </CardItem>
              
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  )
}