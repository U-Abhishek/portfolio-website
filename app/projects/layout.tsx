import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Abhishek Uddaraju',
  description: 'Explore AI and Machine Learning projects by Abhishek Uddaraju including Computer Vision, Robotics, and Deep Learning applications.',
  keywords: [
    'AI Projects',
    'Machine Learning Projects',
    'Computer Vision',
    'Robotics',
    'Deep Learning',
    'Neural Networks',
    'Python Projects',
    'PyTorch Projects',
    'TensorFlow Projects'
  ],
  openGraph: {
    title: 'Projects - Abhishek Uddaraju',
    description: 'Explore AI and Machine Learning projects by Abhishek Uddaraju including Computer Vision, Robotics, and Deep Learning applications.',
    url: 'https://abhishekuddaraju.com/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Abhishek Uddaraju',
    description: 'Explore AI and Machine Learning projects by Abhishek Uddaraju including Computer Vision, Robotics, and Deep Learning applications.',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
