import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Hero() {
  const heroContent = {
    tagline: "Empowering Entrepreneurs, Building Futures",
    taglinedescription: "Join our vibrant community of innovators and change-makers. Let's shape the future of entrepreneurship together.",
    buttonText: "Get Started",
    buttonLink: "#events",
    initiativesText: "Explore Initiatives",
    initiativesLink: "#initiatives"
  };

  const socialLinks = [
    { platform: 'twitter', url: 'https://twitter.com', color: 'text-[#1DA1F2]' },
    { platform: 'instagram', url: 'https://instagram.com', color: 'text-[#E1306C]' },
    { platform: 'linkedin', url: 'https://linkedin.com', color: 'text-[#0A66C2]' },
    { platform: 'youtube', url: 'https://youtube.com', color: 'text-[#FF0000]' },
    { platform: 'facebook', url: 'https://facebook.com', color: 'text-[#1877F2]' }
  ];

  const platformIcons = {
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    facebook: FaFacebook
  };

  return (
    <div className="relative isolate px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[90vh] mt-25">
      <div className="max-w-7xl w-full text-center flex flex-col items-center px-4 sm:px-6">
        {/* Announcement Banner - Hidden on mobile */}
        <div className="hidden sm:block mb-4 sm:mb-8 animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 ring-1 ring-gray-900/10 dark:ring-gray-100/20 ">
              <span className="text-center sm:text-left">🚀 Join our  Ecell Team to innovate and grow</span>
            <a href="/joinecell" className="sm:ml-2 mt-1 sm:mt-0 font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 flex items-center">
              Register now <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl">
          <h1 className="text-3xl sm:text-2xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {heroContent.tagline}
          </h1>

          {/* Tagline Description */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {heroContent.taglinedescription}
          </p>

           {/* Social Icons */}
        <div className="mt-2 sm:mt-2 flex justify-center space-x-3">
          {socialLinks.map((link) => {
            const IconComponent = platformIcons[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-gray-600 dark:hover:text-gray-400 ${link.color} transition-all duration-300 hover:scale-110 p-2 rounded-lg`}
              >
                {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />}
              </a>
            );
          })}
        </div>

          {/* Buttons */}
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={heroContent.buttonLink}
              className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ring-2 ring-blue-500/30 dark:ring-blue-600/30 flex items-center justify-center space-x-2"
            >
              <span>{heroContent.buttonText}</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a 
              href={heroContent.initiativesLink} 
              className="group text-sm sm:text-base font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 flex items-center"
            >
              {heroContent.initiativesText} <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

       
      </div>
    </div>
  );
}
