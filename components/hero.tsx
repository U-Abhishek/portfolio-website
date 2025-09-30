'use client'

import { SplineScene } from '@/components/ui/spline'
import { FeaturedProjectsShowcase } from '@/components/featured-projects-showcase'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import projectsData from '@/data/projects.json'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [robotContainer, setRobotContainer] = useState<HTMLDivElement | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(true)
  const [socialIconPositions, setSocialIconPositions] = useState<{ [key: string]: { x: number, y: number } }>({})
  const [isHoveringSocial, setIsHoveringSocial] = useState<string | null>(null)

  // Get featured projects (projects with featured: true, fallback to first 5 if none featured)
  const featuredProjects = projectsData.projects.filter(project => project.featured === true)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projectsData.projects.slice(0, 5)
  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotContainer) {
        const rect = robotContainer.getBoundingClientRect()
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        })
      }
    }

    if (robotContainer) {
      robotContainer.addEventListener('mousemove', handleMouseMove)
      return () => robotContainer.removeEventListener('mousemove', handleMouseMove)
    }
  }, [robotContainer])

  // Magnetic effect for social icons
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const socialIcons = document.querySelectorAll('[data-social-icon]')
      socialIcons.forEach((icon) => {
        const rect = icon.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
        
        if (distance < 100) { // Magnetic attraction radius
          const force = (100 - distance) / 100
          const deltaX = (e.clientX - centerX) * force * 0.1
          const deltaY = (e.clientY - centerY) * force * 0.1
          
          setSocialIconPositions(prev => ({
            ...prev,
            [icon.getAttribute('data-social-icon') || '']: { x: deltaX, y: deltaY }
          }))
        } else {
          setSocialIconPositions(prev => ({
            ...prev,
            [icon.getAttribute('data-social-icon') || '']: { x: 0, y: 0 }
          }))
        }
      })
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      
      // Hide scroll button when scrolled past 50% of hero section
      setShowScrollButton(scrollY < heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        

        {/* Content layout - text left, robot right */}
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6 text-left py-4">
                {/* My Information Section */}
                <div className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/20">
                  {/* Primary color accent lines */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                  
                  <div className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Abhishek Uddaraju
                    </h1>
                    <div className="text-xl sm:text-2xl text-muted-foreground font-medium">
                      I am a{' '}
                      <ContainerTextFlip
                        words={["AI Systems Architect", "ML Engineer", "Developer"]}
                        interval={3000}
                        animationDuration={700}
                        textClassName="text-primary font-semibold"
                      />
                    </div>
                    <p className="text-md text-muted-foreground leading-relaxed">
                      I specialize in AI system design and deployment, building scalable intelligent systems and end-to-end machine learning workflows.
                    </p>

                    {/* Magnetic Social links */}
                    <div className="flex items-center space-x-3 pt-2">
                      <a
                        href="https://github.com/abhishek-uddaraju"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-social-icon="github"
                        className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                        style={{
                          transform: `translate(${socialIconPositions.github?.x || 0}px, ${socialIconPositions.github?.y || 0}px)`
                        }}
                        onMouseEnter={() => setIsHoveringSocial('github')}
                        onMouseLeave={() => setIsHoveringSocial(null)}
                      >
                        <FaGithub className="w-5 h-5" />
                        {isHoveringSocial === 'github' && (
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                        )}
                      </a>
                      <a
                        href="https://linkedin.com/in/abhishek-uddaraju"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-social-icon="linkedin"
                        className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                        style={{
                          transform: `translate(${socialIconPositions.linkedin?.x || 0}px, ${socialIconPositions.linkedin?.y || 0}px)`
                        }}
                        onMouseEnter={() => setIsHoveringSocial('linkedin')}
                        onMouseLeave={() => setIsHoveringSocial(null)}
                      >
                        <FaLinkedin className="w-5 h-5" />
                        {isHoveringSocial === 'linkedin' && (
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                        )}
                      </a>
                      <a
                        href="https://x.com/abhishek-uddaraju"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-social-icon="twitter"
                        className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                        style={{
                          transform: `translate(${socialIconPositions.twitter?.x || 0}px, ${socialIconPositions.twitter?.y || 0}px)`
                        }}
                        onMouseEnter={() => setIsHoveringSocial('twitter')}
                        onMouseLeave={() => setIsHoveringSocial(null)}
                      >
                        <FaXTwitter className="w-5 h-5" />
                        {isHoveringSocial === 'twitter' && (
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                        )}
                      </a>
                      <a
                        href="mailto:abhishek@example.com"
                        data-social-icon="email"
                        className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-110"
                        style={{
                          transform: `translate(${socialIconPositions.email?.x || 0}px, ${socialIconPositions.email?.y || 0}px)`
                        }}
                        onMouseEnter={() => setIsHoveringSocial('email')}
                        onMouseLeave={() => setIsHoveringSocial(null)}
                      >
                        <FaEnvelope className="w-5 h-5" />
                        {isHoveringSocial === 'email' && (
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                        )}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Featured Projects Showcase */}
                <FeaturedProjectsShowcase projects={displayProjects} />
              </div>

              {/* Right side - 3D Robot */}
              <div 
                ref={setRobotContainer}
                className="relative h-[500px] lg:h-[600px] border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl shadow-primary/20"
              >
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
            </div>
          </div>
        </div>

      </section>

    </>
  )
}