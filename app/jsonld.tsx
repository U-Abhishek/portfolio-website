export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhishek Uddaraju",
    "jobTitle": "AI Engineer",
    "description": "Machine Learning Engineer & AI Systems Architect",
    "url": "https://abhishekuddaraju.com",
    "sameAs": [
      "https://github.com/abhishekuddaraju",
      "https://linkedin.com/in/abhishekuddaraju"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Deep Learning",
      "Neural Networks",
      "Python",
      "PyTorch",
      "TensorFlow",
      "Robotics"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Engineer",
      "description": "Machine Learning Engineer & AI Systems Architect"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Abhishek Uddaraju Portfolio",
    "url": "https://abhishekuddaraju.com",
    "description": "Portfolio website of Abhishek Uddaraju, Machine Learning Engineer & AI Systems Architect",
    "author": {
      "@type": "Person",
      "name": "Abhishek Uddaraju"
    },
    "inLanguage": "en-US"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}
