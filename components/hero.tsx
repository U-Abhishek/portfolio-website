'use client'

import { SplineScene } from '@/components/ui/spline'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { useState, useEffect } from 'react'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [robotContainer, setRobotContainer] = useState<HTMLDivElement | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(true)

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - removed gradient to match main background */}
      

      {/* Content layout - text left, robot right */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6 text-left py-4">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Abhishek Uddaraju
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 font-medium">
                    AI Systems Architect & ML Engineer
                  </p>
                  <p className="text-base text-gray-400 max-w-md leading-relaxed">
                    I specialize in AI system design and deployment, building scalable intelligent systems and end-to-end machine learning workflows.
                  </p>
                </div>

                {/* Social links */}
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/abhishek-uddaraju"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/abhishek-uddaraju"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://x.com/abhishek-uddaraju"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <FaXTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:abhishek@example.com"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <FaEnvelope className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Right side - 3D Robot */}
              <div 
                ref={setRobotContainer}
                className="relative h-[500px] lg:h-[600px] border-2 border-white/40 rounded-lg overflow-hidden"
              >
                {/* Cursor light effect */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.4), transparent 50%)`,
                  }}
                />
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollButton && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button 
            onClick={() => {
              const nextSection = document.querySelector('#featured-projects') as HTMLElement | null
              nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-gray-300 transition-colors duration-200">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse hover:bg-gray-300 transition-colors duration-200" />
            </div>
          </button>
        </div>
      )}
    </section>
  )
}