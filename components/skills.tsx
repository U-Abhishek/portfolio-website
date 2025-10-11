import skillsData from '@/data/skills.json'

interface SkillsProps {
  skills: string[]
}

interface SkillItem {
  name: string
  filename: string
  folder: string
}

interface SkillsData {
  skills: {
    'languages-and-tools': SkillItem[]
    'fullstack-and-cloud': SkillItem[]
  }
}

export function Skills({ skills: _skills }: SkillsProps) {
  const { skills } = skillsData as SkillsData

  const SkillCard = ({ skill }: { skill: SkillItem }) => (
    <div className="group relative p-4 rounded-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="relative">
          <img 
            src={`/images/skills/${skill.folder}/${skill.filename}`} 
            alt={skill.name} 
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
            title={skill.name}
          />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-primary transition-colors">
          {skill.name}
        </h3>
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )

  const CategorySection = ({ title, skills, description }: { title: string; skills: SkillItem[]; description: string }) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground text-base sm:text-lg">{description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  )

  return (
    <section id="tech-stack" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent">
            My Tech Stack
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="space-y-12">
          <CategorySection 
            title="Languages & Tools" 
            skills={skills['languages-and-tools']}
            description="Programming languages and ML frameworks I work with"
          />
          
          <CategorySection 
            title="Fullstack & Cloud" 
            skills={skills['fullstack-and-cloud']}
            description="Web development, databases, and cloud infrastructure"
          />
        </div>
      </div>
    </section>
  )
}