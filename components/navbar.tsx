'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeAboutSection, setActiveAboutSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
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
          const experienceEl = document.querySelector('#about [data-section="experience"]')
          
          if (techStackEl && educationEl && experienceEl) {
            const aboutTop = aboutSection.offsetTop - navbarHeight
            const techStackTop = techStackEl.getBoundingClientRect().top + scrollY - navbarHeight
            const educationTop = educationEl.getBoundingClientRect().top + scrollY - navbarHeight
            const experienceTop = experienceEl.getBoundingClientRect().top + scrollY - navbarHeight
            
            // Only set active about section if we're actually in the about section
            if (scrollY >= aboutTop) {
              if (scrollY < educationTop) {
                setActiveAboutSection('tech-stack')
              } else if (scrollY < experienceTop) {
                setActiveAboutSection('education')
              } else {
                setActiveAboutSection('experience')
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
    <nav className="fixed top-4 left-8 right-8 z-50">
      <div
        className={cn(
          'mx-auto max-w-7xl rounded-2xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl transition-all duration-300 relative',
          isScrolled
            ? 'bg-black/50 border-white/30 shadow-3xl shadow-primary/5'
            : 'bg-black/30 border-white/20 shadow-2xl shadow-primary/5'
        )}
      >
        {/* Subtle rose accent line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full"></div>
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo - Your Name */}
          <Link
            href="/"
            className="text-3xl font-bold text-primary hover:text-primary/80 transition-all duration-300 leading-tight"
          >
            AU.
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={cn(
                'px-4 py-2 rounded-xl text-sm transition-all duration-200 relative',
                pathname === '/' && !activeAboutSection
                  ? 'text-white font-bold bg-primary/10 border border-primary/20'
                  : 'text-muted-foreground hover:text-white hover:bg-primary/5 hover:border-primary/10 border border-transparent font-medium'
              )}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={cn(
                'px-4 py-2 rounded-xl text-sm transition-all duration-200 relative',
                pathname === '/' && activeAboutSection
                  ? 'text-white font-bold bg-primary/10 border border-primary/20'
                  : 'text-muted-foreground hover:text-white hover:bg-primary/5 hover:border-primary/10 border border-transparent font-medium'
              )}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={cn(
                'px-4 py-2 rounded-xl text-sm transition-all duration-200 relative',
                pathname === '/projects'
                  ? 'text-white font-bold bg-primary/10 border border-primary/20'
                  : 'text-muted-foreground hover:text-white hover:bg-primary/5 hover:border-primary/10 border border-transparent font-medium'
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
