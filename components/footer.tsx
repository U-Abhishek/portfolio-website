'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import socialData from '@/data/social.json'

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-6 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-2">Abhishek Uddaraju</h3>
            <p className="text-muted-foreground">
              AI Engineer
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
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
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:border-primary border border-border transition-all duration-300 hover:scale-120"
                  title={social.label}
                >
                  {getIcon()}
                </a>
              )
            })}
          </div>
        </div>
        
        <div className="mt-0 pt-0 text-center">
          <p className="text-muted-foreground">
            Made by Abhishek • © 2025 All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  )
}
