import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Footer } from '@/components/footer'
import { FixedSpotlightBackground } from '@/components/ui/fixed-spotlight-background'
import experienceData from '@/data/experience.json'
import educationData from '@/data/education.json'

export default function Home() {
  const { experience } = experienceData
  const { education } = educationData

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed Spotlight Background */}
      <FixedSpotlightBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* About Section - Education, Experience, Tech Stack */}
        <About experiences={experience} education={education} />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
