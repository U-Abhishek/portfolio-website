'use client'

import { useState, useRef, useEffect } from 'react'

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export function YouTubeVideo({ 
  videoId, 
  title, 
  className = "w-full rounded-lg overflow-hidden",
  autoplay = true,
  muted = true,
  loop = true
}: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Small delay to ensure smooth loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Build YouTube embed URL with parameters
  const buildEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      playlist: loop ? videoId : '',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      end: '0'
    })
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading video...</div>
        </div>
      )}
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          src={buildEmbedUrl()}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`absolute top-0 left-0 w-full h-full rounded-lg transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>
    </div>
  )
}
