import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiX } from 'react-icons/hi';

export default function AlertBanner({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const alerts = [
    {
      text: "Register now for event",
      link: "/eventregister"
    },
    {
      text: "Join E-Cell",
      link: "/joinecell"
    },
    {
      text: "Upcoming event!",
      link: "/#events"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 fixed top-0 left-0 right-0 z-50 shadow-xl overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 relative">
        <div className="flex items-center space-x-4 sm:space-x-8 whitespace-nowrap">
          <motion.div 
            className="flex space-x-4 sm:space-x-8"
            animate={{ 
              x: ['100%', '-100%'],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          > 
            {alerts.map((alert, index) => (
              <Link 
                key={index}
                to={alert.link}
                className="flex items-center space-x-2 sm:space-x-4 group hover:opacity-90 transition-opacity"
              >
                <span className="font-semibold tracking-wide text-xs sm:text-sm md:text-base">
                  {alert.text}
                </span>
                <HiArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Link>
            ))}
          </motion.div>
        </div>

        <button 
          onClick={handleClose}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="Close banner"
        >
          <HiX className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  );
}