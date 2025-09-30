'use client'

import { SplineScene } from '@/components/ui/spline'
import { FeaturedProjectsShowcase } from '@/components/featured-projects-showcase'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import projectsData from '@/data/projects.json'
import socialData from '@/data/social.json'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [robotContainer, setRobotContainer] = useState<HTMLDivElement | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(true)

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
                <div className="relative p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm overflow-hidden">
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

                    {/* Social links */}
                    <div className="flex items-center space-x-3 pt-2">
                      {socialData.social.map((social) => {
                        const getIcon = () => {
                          switch (social.icon) {
                            case 'github':
                              return <FaGithub className="w-5 h-5" />
                            case 'linkedin':
                              return <FaLinkedin className="w-5 h-5" />
                            case 'twitter':
                              return <FaXTwitter className="w-5 h-5" />
                            case 'email':
                              return <FaEnvelope className="w-5 h-5" />
                            default:
                              return null
                          }
                        }

                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target={social.icon === 'email' ? '_self' : '_blank'}
                            rel={social.icon === 'email' ? '' : 'noopener noreferrer'}
                            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-120"
                            title={social.label}
                          >
                            {getIcon()}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Featured Projects Showcase */}
                <FeaturedProjectsShowcase projects={displayProjects} />
              </div>

              {/* Right side - 3D Robot (hidden on mobile/tablet) */}
              <div 
                ref={setRobotContainer}
                className="hidden lg:block relative h-[500px] lg:h-[600px] border border-white/20 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden"
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

        {/* Scroll down indicator */}
        {showScrollButton && (
          <Link
            href="/#about-start"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm text-muted-foreground hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <span>Scroll down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 animate-bounce"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M3.22 7.22a.75.75 0 011.06 0L10 12.94l5.72-5.72a.75.75 0 111.06 1.06l-6.25 6.25a.75.75 0 01-1.06 0L3.22 8.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </Link>
        )}

      </section>

    </>
  )
}