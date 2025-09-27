'use client'

import { useState, useEffect, useRef } from 'react'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Calendar, MapPin, GraduationCap, Briefcase, Code } from 'lucide-react'
import { YouTubeVideo } from '@/components/ui/youtube-video'
import { EducationCard } from '@/components/education-card'
import { ExperienceTimeline } from '@/components/experience-timeline'
import skillsData from '@/data/skills.json'

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

interface SkillItem {
  name: string
  filename: string
  folder: string
}

interface SkillsData {
  skills: {
    'languages-and-tools': SkillItem[]
    'fullstack-and-cloud': SkillItem[]
  }
}

interface AboutProps {
  experiences: Experience[]
  education: Education[]
}

const sections = [
  { id: 'tech-stack', title: 'Tech Stack', icon: Code },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'timeline', title: 'Experience', icon: Briefcase },
]

export function About({ experiences, education }: AboutProps) {
  const [activeSection, setActiveSection] = useState('tech-stack')
  const aboutRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return

      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      // Responsive navbar height
      const navbarOffset = window.innerWidth < 768 ? 120 : 140

      // Get actual section positions
      const techStackEl = sectionRefs.current['tech-stack']
      const educationEl = sectionRefs.current.education
      const timelineEl = sectionRefs.current.timeline

      if (!techStackEl || !educationEl || !timelineEl) return

      const techStackTop = techStackEl.offsetTop - navbarOffset
      const educationTop = educationEl.offsetTop - navbarOffset
      const timelineTop = timelineEl.offsetTop - navbarOffset

      // Determine which section is currently in view
      if (scrollY < educationTop) {
        setActiveSection('tech-stack')
      } else if (scrollY < timelineTop) {
        setActiveSection('education')
      } else {
        setActiveSection('timeline')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element && aboutRef.current) {
      const aboutTop = aboutRef.current.offsetTop
      // Increased offset for better spacing on mobile and desktop
      const navbarHeight = window.innerWidth < 768 ? 120 : 140
      const offsetTop = element.offsetTop - aboutTop + aboutRef.current.offsetTop - navbarHeight
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const { skills } = skillsData as SkillsData

  return (
    <section ref={aboutRef} id="about" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 scroll-mt-40">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Navigation - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-white/10 border border-white/20 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area - Full width on mobile, 3/4 width on desktop */}
          <div className="lg:col-span-3">
            {/* Tech Stack Section */}
             <div 
               ref={(el) => { sectionRefs.current['tech-stack'] = el }}
               data-section="tech-stack"
               className="mb-16"
             >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Code className="w-6 h-6" />
                Tech Stack
              </h3>
              <div className="space-y-8">
                {/* Languages & Tools */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Languages & Tools</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {skills['languages-and-tools'].map((skill, index) => (
                      <div key={`${skill.name}-${index}`} className="group flex flex-col items-center p-3 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:bg-gray-800/30 hover:scale-105">
                        <img 
                          src={`/images/skills/${skill.folder}/${skill.filename}`} 
                          alt={skill.name} 
                          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                          title={skill.name}
                        />
                        <span className="text-xs text-gray-300 mt-2 text-center group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fullstack & Cloud */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Fullstack & Cloud</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    {skills['fullstack-and-cloud'].map((skill, index) => (
                      <div key={`${skill.name}-${index}`} className="group flex flex-col items-center p-3 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:bg-gray-800/30 hover:scale-105">
                        <img 
                          src={`/images/skills/${skill.folder}/${skill.filename}`} 
                          alt={skill.name} 
                          className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                          title={skill.name}
                        />
                        <span className="text-xs text-gray-300 mt-2 text-center group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
             <div 
               ref={(el) => { sectionRefs.current.education = el }}
               data-section="education"
               className="mb-16"
             >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" />
                Education
              </h3>
               <div className="space-y-6">
                 {education.map((edu) => (
                   <EducationCard key={edu.id} education={edu} />
                 ))}
               </div>
            </div>

            {/* Experience Dumps Section - Hidden but kept in code for future use */}
            {/* 
             <div 
               ref={(el) => { sectionRefs.current.experience = el }}
               data-section="experience"
               className="mb-16"
             >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6" />
                Experience Dumps
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-6 -translate-x-1/2 z-10">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-black shadow-lg"></div>
                    </div>
                    <div className="ml-16">
                      <CardContainer className="inter-var" containerClassName="py-0">
                        <CardBody className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                              <CardItem translateZ="50" className="text-xl font-bold text-left">
                                <span>{exp.role}</span> <span className="font-medium text-muted-foreground">@ {exp.company}</span>
                              </CardItem>
                              <CardItem translateZ="30" className="flex items-center gap-2 text-sm text-left">
                                <Calendar className="w-4 h-4" />
                                {exp.startDate} - {exp.endDate}
                              </CardItem>
                              <CardItem translateZ="40" className="text-sm leading-relaxed text-left">
                                {exp.description}
                              </CardItem>
                            </div>
                            {exp.youtubeVideo && (
                              <div className="lg:col-span-1 flex justify-center lg:justify-end">
                                <div className="w-full max-w-sm">
                                  <YouTubeVideo
                                    videoId={exp.youtubeVideo}
                                    title={`${exp.role} at ${exp.company}`}
                                    className="w-full"
                                    autoplay={true}
                                    muted={true}
                                    loop={true}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </CardBody>
                      </CardContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            */}

            {/* Timeline Section */}
             <div 
               ref={(el) => { sectionRefs.current.timeline = el }}
               data-section="timeline"
               className="mb-16"
             >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="w-6 h-6" />
                Experience
              </h3>
              <ExperienceTimeline experiences={experiences} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
