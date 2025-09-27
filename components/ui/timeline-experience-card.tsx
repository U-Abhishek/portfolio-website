import React from "react";
import { YouTubeVideo } from "@/components/ui/youtube-video";
import { Calendar } from "lucide-react";
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

interface Experience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  youtubeVideo?: string;
}

interface TimelineExperienceCardProps {
  experience: Experience;
}

export function TimelineExperienceCard({ experience }: TimelineExperienceCardProps) {
  return (
    <div className="relative w-full max-w-4xl">
      <CardContainer className="inter-var" containerClassName="py-0">
        <CardBody className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl p-6 border cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Content */}
            <div className="space-y-4">
              <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                {experience.role}
              </CardItem>
              <CardItem translateZ="40" className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                <span className="font-medium">@ {experience.company}</span>
                <Calendar className="w-4 h-4" />
                <span>{experience.startDate} - {experience.endDate}</span>
              </CardItem>
              <CardItem translateZ="20" className="text-sm text-neutral-300 leading-relaxed">
                {experience.description}
              </CardItem>
            </div>

            {/* Right side - Video */}
            {experience.youtubeVideo && (
              <div className="flex justify-center lg:justify-end">
                <div className="w-full">
                  <YouTubeVideo
                    videoId={experience.youtubeVideo}
                    title={`${experience.role} at ${experience.company}`}
                    className="w-full rounded-lg"
                    autoplay={true}
                    muted={true}
                    loop={true}
                  />
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
