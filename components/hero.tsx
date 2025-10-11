'use client'

import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { BackgroundLines } from '@/components/ui/background-lines'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import socialData from '@/data/social.json'
import { FeaturedProjectsCard } from '@/components/featured-projects-card'

export function Hero() {
  const [showScrollButton, setShowScrollButton] = useState(true)

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
      <BackgroundLines className="relative h-screen overflow-hidden">
        {/* My Information Section - Centered */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center w-full">
                <div className="relative p-4 sm:p-6 rounded-2xl overflow-hidden w-full">
                  <div className="space-y-2 sm:space-y-3">
                    {/* First div: Name and flip */}
                    <div className="space-y-3 sm:space-y-4">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Abhishek Uddaraju
                      </h1>
                      <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
                        <ContainerTextFlip
                          words={["AI Systems Architect", "ML Engineer", "Developer"]}
                          interval={3000}
                          animationDuration={700}
                          textClassName="text-primary font-semibold"
                        />
                      </div>
                    </div>

                    {/* Second div: Content | Featured Projects */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                      {/* Left side - Text content */}
                      <div className="flex-1 text-center lg:text-right">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                          I specialize in AI system design and deployment, building scalable intelligent systems and end-to-end machine learning workflows.
                        </p>
                      </div>

                      {/* Vertical divider line - centered */}
                      <div className="hidden lg:flex w-px h-16 bg-white/40 justify-center items-center"></div>

                      {/* Right side - Featured Projects Card */}
                      <div className="w-full lg:w-auto lg:flex-shrink-0">
                        <FeaturedProjectsCard className="lg:max-w-sm" />
                      </div>
                    </div>

                    {/* Third div: Icons */}
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 w-full">
                      <span className="invisible">A</span>
                      {socialData.social.map((social) => {
                        const getIcon = () => {
                          switch (social.icon) {
                            case 'github':
                              return <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                            case 'linkedin':
                              return <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                            case 'twitter':
                              return <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                            case 'email':
                              return <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            className="p-2 sm:p-3 rounded-full bg-secondary border border-border hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-120"
                            title={social.label}
                          >
                            {getIcon()}
                          </a>
                        )
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Scroll down indicator */}
        {showScrollButton && (
          <Link
            href="/#about-start"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary text-sm text-muted-foreground hover:text-white hover:bg-primary hover:border-primary transition-colors"
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

      </BackgroundLines>

    </>
  )
}