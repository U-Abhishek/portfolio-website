'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeAboutSection, setActiveAboutSection] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Trigger load animation
    setIsLoaded(true)
    
    // Ensure About is highlighted when landing directly on /#about (e.g., from another page)
    if (pathname === '/' && typeof window !== 'undefined' && (window.location.hash === '#about' || window.location.hash === '#about-start')) {
      // Defer to allow layout to settle after navigation
      setTimeout(() => {
        setActiveAboutSection('tech-stack');
      }, 50);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Only check about sections if we're on the home page
      if (pathname === '/') {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          const navbarHeight = window.innerWidth < 768 ? 120 : 140
          const scrollY = window.scrollY
          
          // Get about section positions
          const techStackEl = document.querySelector('#about [data-section="tech-stack"]')
          const educationEl = document.querySelector('#about [data-section="education"]')
          const timelineEl = document.querySelector('#about [data-section="timeline"]')
          
          if (techStackEl && educationEl && timelineEl) {
            const aboutTop = aboutSection.offsetTop - navbarHeight
            const techStackTop = techStackEl.getBoundingClientRect().top + scrollY - navbarHeight
            const educationTop = educationEl.getBoundingClientRect().top + scrollY - navbarHeight
            const timelineTop = timelineEl.getBoundingClientRect().top + scrollY - navbarHeight
            
            // Only set active about section if we're actually in the about section
            if (scrollY >= aboutTop) {
              if (scrollY + 10 < educationTop) {
                setActiveAboutSection('tech-stack')
              } else if (scrollY + 10 < timelineTop) {
                setActiveAboutSection('education')
              } else {
                setActiveAboutSection('timeline')
              }
            } else {
              setActiveAboutSection('')
            }
          }
        }
      } else {
        setActiveAboutSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <nav className={cn(
      "fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out",
      isLoaded 
        ? "translate-y-0 opacity-100" 
        : "-translate-y-4 opacity-0"
    )}>
        <div
          className={cn(
            'mx-auto max-w-7xl px-6 py-2 rounded-full border border-white/20 bg-black shadow-2xl transition-all duration-300 relative',
            isScrolled
              ? 'bg-black border-white/30 shadow-3xl shadow-primary/10'
              : 'bg-black border-white/20 shadow-2xl shadow-primary/5'
          )}
          style={{
            boxShadow: isScrolled 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)'
              : '0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 15px rgba(59, 130, 246, 0.05)'
          }}
        >
        <div className="flex items-center justify-between w-full gap-8 relative z-10">
          {/* Logo - Your Name */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-300 leading-tight"
          >
            AU.
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative',
                pathname === '/' && !activeAboutSection
                  ? 'text-white font-bold bg-primary border border-primary'
                  : 'text-muted-foreground hover:text-white hover:bg-secondary border border-transparent font-medium'
              )}
            >
              Home
            </Link>
            <Link
              href="/#about-start"
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative',
                pathname === '/' && activeAboutSection
                  ? 'text-white font-bold bg-primary border border-primary'
                  : 'text-muted-foreground hover:text-white hover:bg-secondary border border-transparent font-medium'
              )}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative',
                pathname === '/projects'
                  ? 'text-white font-bold bg-primary border border-primary'
                  : 'text-muted-foreground hover:text-white hover:bg-secondary border border-transparent font-medium'
              )}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
