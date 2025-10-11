import React from "react";
import { YouTubeVideo } from "@/components/ui/youtube-video";
import { Calendar } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="relative w-full">
      <Card className="relative group/card hover:shadow-2xl w-full h-auto rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02]">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Content */}
            <div className="space-y-4">
              <div className="text-xl font-bold text-white mb-2">
                {experience.role}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                <span className="font-medium">@ {experience.company}</span>
                <Calendar className="w-4 h-4" />
                <span>{experience.startDate} - {experience.endDate}</span>
              </div>
              <div className="text-sm text-neutral-300 leading-relaxed">
                {experience.description}
              </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
