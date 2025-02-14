import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="dark:text-white text-black py-12 mt-20 border-t border-gray-300 dark:border-gray-800 backdrop-blur-lg bg-white/50 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We are dedicated to fostering entrepreneurship and innovation among students, providing resources, mentorship, and opportunities to turn ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="/events" className="hover:text-purple-400 transition-colors">Events</a></li>
              <li><a href="/initiatives" className="hover:text-purple-400 transition-colors">Initiatives</a></li>
              <li><a href="/gallery" className="hover:text-purple-400 transition-colors">Gallery</a></li>
              <li><a href="/contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Email: info@ecell.com</li>
              <li>Phone: +91 12345 67890</li>
              <li>Address: MMDU, Mullana, Ambala</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} E-Cell MMDU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
