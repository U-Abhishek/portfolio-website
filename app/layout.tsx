import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Abhishek Uddaraju - AI Engineer",
  description: "Portfolio website of Abhishek Uddaraju, Machine Learning Engineer & AI Systems Architect",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer", 
    "AI Systems Architect",
    "Computer Vision",
    "Deep Learning",
    "Python",
    "PyTorch",
    "TensorFlow",
    "Robotics",
    "Neural Networks"
  ],
  authors: [{ name: "Abhishek Uddaraju" }],
  creator: "Abhishek Uddaraju",
  publisher: "Abhishek Uddaraju",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://abhishekuddaraju.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Abhishek Uddaraju - AI Engineer",
    description: "Portfolio website of Abhishek Uddaraju, Machine Learning Engineer & AI Systems Architect",
    url: 'https://abhishekuddaraju.com',
    siteName: 'Abhishek Uddaraju Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Abhishek Uddaraju - AI Engineer",
    description: "Portfolio website of Abhishek Uddaraju, Machine Learning Engineer & AI Systems Architect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
