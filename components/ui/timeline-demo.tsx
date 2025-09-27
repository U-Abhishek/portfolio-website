import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { TimelineExperienceCard } from "@/components/ui/timeline-experience-card";

interface Experience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  youtubeVideo?: string;
}

interface TimelineDemoProps {
  experiences: Experience[];
}

export default function TimelineDemo({ experiences }: TimelineDemoProps) {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  // Create individual timeline entries for each experience
  const timelineData = sortedExperiences.map((exp) => ({
    title: exp.endDate, // Display end date beside the dot
    content: <TimelineExperienceCard experience={exp} />,
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={timelineData} />
    </div>
  );
}
