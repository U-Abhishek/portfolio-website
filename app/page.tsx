import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Footer } from '@/components/footer'
import experienceData from '@/data/experience.json'
import educationData from '@/data/education.json'
import skillsData from '@/data/skills.json'

export default function Home() {
  const { experience } = experienceData
  const { education } = educationData
  const skills = skillsData.skills

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Experience Section */}
      <Experience experiences={experience} education={education} />
      
      {/* Skills Section */}
      <Skills skills={skills} />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
