'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-4 left-8 right-8 z-50">
      <div
        className={cn(
          'mx-auto max-w-6xl rounded-2xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl transition-all duration-300',
          isScrolled
            ? 'bg-black/50 border-white/30 shadow-3xl'
            : 'bg-black/30 border-white/20 shadow-2xl'
        )}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo - Your Name */}
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-gray-300 transition-all duration-300 leading-tight"
          >
            AU.
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={cn(
                'px-4 py-2 rounded-xl text-sm transition-all duration-200',
                pathname === '/'
                  ? 'text-white font-bold'
                  : 'text-gray-300 hover:text-white font-medium'
              )}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={cn(
                'px-4 py-2 rounded-xl text-sm transition-all duration-200',
                pathname === '/projects'
                  ? 'text-white font-bold'
                  : 'text-gray-300 hover:text-white font-medium'
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
