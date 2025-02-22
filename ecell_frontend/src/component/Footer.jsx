import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

const socials = [
  { platform: 'twitter', Icon: FaTwitter, color: '#1DA1F2', url: 'https://twitter.com/ecell_mmdu/' },
  { platform: 'instagram', Icon: FaInstagram, color: '#E1306C', url: 'https://www.instagram.com/ecell_mmdu/' },
  { platform: 'facebook', Icon: FaFacebook, color: '#1877F2', url: 'https://www.facebook.com/ecell.mmdu/' },
  { platform: 'linkedin', Icon: FaLinkedin, color: '#0A66C2', url: 'https://www.linkedin.com/company/ecell-mmdu/' },
  { platform: 'youtube', Icon: FaYoutube, color: '#FF0000', url: 'https://www.youtube.com/@ecellmmdu' }
];

export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About Section */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">About Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              We are dedicated to fostering entrepreneurship and innovation among students, providing resources, mentorship, and opportunities to turn ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/events" className="text-gray-6 00 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Events</a></li>
              <li><a href="/initiatives" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Initiatives</a></li>
              <li><a href="/gallery" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Gallery</a></li>
              <li><a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex flex-col">
                <span className="font-medium">Email:</span>
                <a href="mailto:info@ecell.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">info@ecell.com</a>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Phone:</span>
                <a href="tel:+911234567890" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">+91 12345 67890</a>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Address:</span>
                <span>MMDU, Mullana, Ambala</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Connect</h3>
            <div className="flex space-x-4">
              {socials.map(({ platform, Icon, color, url }) => (
                <a
                  key={platform}
                  href={url}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 group"
                >
                  <Icon className={`w-5 h-5 text-[${color}] hover:text-[${color}] transition-colors`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} E-Cell MMDU. All rights reserved. 
            <span className="block sm:inline mt-2 sm:mt-0">Crafted with ♥ by E-Cell Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
