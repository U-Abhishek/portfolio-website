'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-2">Abhishek Uddaraju</h3>
            <p className="text-gray-400">
              AI Engineer
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/abhishek-uddaraju"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/abhishek-uddaraju"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:abhishek@example.com"
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/abhishek-uddaraju"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-0 pt-0 text-center">
          <p className="text-gray-400">
            Made with <FaHeart className="w-4 h-4 text-red-500 inline" /> by Abhishek • © 2024 All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  )
}
