import { useState } from 'react'
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaFacebook} from 'react-icons/fa';
export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const heroContent = [
    { 
      tagline: "Igniting Entrepreneurial Spirit at MMDU",
      buttonText: "Explore Programs",
      buttonLink: "#",
      taglinedescription: "E-Cell MMDU fosters innovation and business leadership through mentorship, resources, and startup opportunities. Join us to shape tomorrow's industry leaders.",
      initiativesLink: "#",
      initiativesText: "Our Initiatives"
    }
  ];

  const socialLinks = [
    { platform: 'Twitter', url: 'https://twitter.com', icon: FaTwitter, color: 'text-blue-500' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: FaInstagram, color: 'text-pink-600' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: FaLinkedin, color: 'text-blue-700' },
    { platform: 'YouTube', url: 'https://youtube.com', icon: FaYoutube, color: 'text-red-600' },
    { platform: 'Facebook', url: 'https://facebook.com', icon: FaFacebook, color: 'text-blue-600' },
  ];

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 flex items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-0">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 w-full">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100 hover:ring-gray-900/20">
            Join our upcoming Startup Bootcamp{' '}
            <a href="#" className="font-semibold text-purple-600 dark:text-purple-400">
              <span aria-hidden="true" className="absolute inset-0" />
              Register now <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto">
            {heroContent[0].tagline}
          </h1>
          <div className="mt-6 flex justify-center space-x-4 sm:space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-gray-400 ${link.color} transition-colors`}
              >
                <link.icon className="h-5 w-5 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-600 dark:text-gray-300 sm:text-lg/8 sm:mt-8 max-w-2xl">
            {heroContent[0].taglinedescription}
          </p>
          <div className="mt-8 flex flex-row items-center justify-center gap-4 sm:gap-x-6 sm:mt-10">
            <a
              href={heroContent[0].buttonLink}
              className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:from-blue-500 hover:to-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-auto text-center"
            >
              {heroContent[0].buttonText}
            </a>
            <a href={heroContent[0].initiativesLink} className="text-sm/6 font-semibold text-gray-900 dark:text-white ml-4">
              {heroContent[0].initiativesText} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
