import skillsData from '@/data/skills.json'
import { Marquee, MarqueeContent, MarqueeItem, MarqueeFade } from '@/components/ui/shadcn-io/marquee'

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

  const SkillLogo = ({ skill, size = "w-16 h-16" }: { skill: SkillItem; size?: string }) => (
    <div className="group relative">
      <img 
        src={`/images/skills/${skill.folder}/${skill.filename}`} 
        alt={skill.name} 
        className={`${size} object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110`}
        title={skill.name}
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap bg-black/80 px-2 py-1 rounded">
          {skill.name}
        </span>
      </div>
    </div>
  )

  return (
    <section id="tech-stack" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            My Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee className="[--duration:35s]">
            <MarqueeContent pauseOnHover>
              {skills['languages-and-tools'].map((skill, index) => (
                <MarqueeItem key={`${skill.name}-${index}`}>
                  <div className="flex items-center gap-3 mx-4 px-4 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                    <img 
                      src={`/images/skills/${skill.folder}/${skill.filename}`} 
                      alt={skill.name} 
                      className="w-6 h-6 object-contain"
                    />
                    <p className="text-white font-medium text-sm whitespace-nowrap">{skill.name}</p>
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
          
          <Marquee className="[--duration:35s]">
            <MarqueeContent direction="right" pauseOnHover>
              {skills['fullstack-and-cloud'].map((skill, index) => (
                <MarqueeItem key={`${skill.name}-${index}`}>
                  <div className="flex items-center gap-3 mx-4 px-4 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                    <img 
                      src={`/images/skills/${skill.folder}/${skill.filename}`} 
                      alt={skill.name} 
                      className="w-6 h-6 object-contain"
                    />
                    <p className="text-white font-medium text-sm whitespace-nowrap">{skill.name}</p>
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
        </div>
      </div>
    </section>
  )
}