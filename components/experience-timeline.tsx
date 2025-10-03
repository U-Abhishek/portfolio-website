'use client'

import TimelineDemo from '@/components/ui/timeline-demo'

interface Experience {
  id: number
  role: string
  company: string
  startDate: string
  endDate: string
  description: string
  youtubeVideo?: string
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TimelineDemo experiences={experiences} />
      </div>
    </section>
  )
}
