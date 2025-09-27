'use client'

import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-react'
import { YouTubeVideo } from '@/components/ui/youtube-video'
import TimelineDemo from '@/components/ui/timeline-demo'

interface Experience {
  id: number
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
  youtubeVideo?: string
}

interface Education {
  id: number
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  details?: string[]
}

interface ExperienceProps {
  experiences: Experience[]
  education?: Education[]
}

export function Experience({ experiences, education = [] }: ExperienceProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Side by side layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {/* Education Section (Left) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Education</h3>
            <div className="space-y-4">
              {education.length > 0 && education.map((edu) => (
                <div key={edu.id} className="relative">
                  <CardContainer className="inter-var" containerClassName="py-0">
                    <CardBody 
                      className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer"
                    >
                      <CardItem translateZ="50" className="text-lg font-bold mb-1 text-left">
                        <span>{edu.degree}</span>{' '}
                        <span className="font-medium text-muted-foreground">@ {edu.institution}</span>
                      </CardItem>
                      <CardItem translateZ="20" as="div" className="text-sm text-left">
                        {edu.location}
                      </CardItem>
                      <CardItem translateZ="20" as="div" className="flex items-center gap-2 text-sm text-left mt-1">
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate}
                        {edu.gpa ? <span className="ml-2 text-muted-foreground">GPA: {edu.gpa}</span> : null}
                      </CardItem>
                      {edu.details && edu.details.length > 0 && (
                        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-left">
                          {edu.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </CardBody>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline Section (Right) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
            <div className="space-y-4 relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-current"></div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-current rounded-full border-2 border-current shadow-lg"></div>
                  </div>
                  
                  {/* Experience Card */}
                  <div className="ml-8">
                    <CardContainer className="inter-var" containerClassName="py-0">
                      <CardBody 
                        className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer"
                      >
                        <CardItem translateZ="50" className="text-lg font-bold mb-1 text-left">
                          <span>@ {exp.company}</span>{' '}
                          <span className="font-medium text-muted-foreground">{exp.role}</span>
                        </CardItem>

                        <CardItem translateZ="20" as="div" className="flex items-center gap-2 text-sm text-left">
                          <Calendar className="w-4 h-4" />
                          {exp.startDate} - {exp.endDate}
                        </CardItem>

                        {exp.youtubeVideo && (
                          <div className="mt-4 max-w-sm mx-auto">
                            <YouTubeVideo
                              videoId={exp.youtubeVideo}
                              title={`${exp.role} at ${exp.company}`}
                              className="w-full"
                              autoplay={true}
                              muted={true}
                              loop={true}
                            />
                          </div>
                        )}

                        <CardItem translateZ="40" as="p" className="text-sm leading-relaxed mt-4 text-left overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover/card:max-h-96 group-hover/card:opacity-100">
                          {exp.description}
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="md:hidden space-y-12">
          {/* Education Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Education</h3>
            <div className="space-y-4">
              {education.length > 0 && education.map((edu) => (
                <div key={edu.id} className="relative">
                  <CardContainer className="inter-var" containerClassName="py-0">
                    <CardBody 
                      className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer"
                    >
                      <CardItem translateZ="50" className="text-lg font-bold mb-1 text-left">
                        <span>{edu.degree}</span>{' '}
                        <span className="font-medium text-muted-foreground">@ {edu.institution}</span>
                      </CardItem>
                      <CardItem translateZ="20" as="div" className="text-sm text-left">
                        {edu.location}
                      </CardItem>
                      <CardItem translateZ="20" as="div" className="flex items-center gap-2 text-sm text-left mt-1">
                        <Calendar className="w-4 h-4" />
                        {edu.startDate} - {edu.endDate}
                        {edu.gpa ? <span className="ml-2 text-muted-foreground">GPA: {edu.gpa}</span> : null}
                      </CardItem>
                      {edu.details && edu.details.length > 0 && (
                        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-left">
                          {edu.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </CardBody>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Professional Experience</h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <CardContainer className="inter-var" containerClassName="py-0">
                    <CardBody 
                      className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer"
                    >
                      <CardItem translateZ="50" className="text-lg font-bold mb-1 text-left">
                        <span>@ {exp.company}</span>{' '}
                        <span className="font-medium text-muted-foreground">{exp.role}</span>
                      </CardItem>

                      <CardItem translateZ="20" as="div" className="flex items-center gap-2 text-sm text-left">
                        <Calendar className="w-4 h-4" />
                        {exp.startDate} - {exp.endDate}
                      </CardItem>

                      {exp.youtubeVideo && (
                        <div className="mt-4 max-w-sm mx-auto">
                          <YouTubeVideo
                            videoId={exp.youtubeVideo}
                            title={`${exp.role} at ${exp.company}`}
                            className="w-full"
                            autoplay={true}
                            muted={true}
                            loop={true}
                          />
                        </div>
                      )}

                      <CardItem translateZ="40" as="p" className="text-sm leading-relaxed mt-4 text-left overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover/card:max-h-96 group-hover/card:opacity-100">
                        {exp.description}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
