import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import EventPopup from './popup_event';

export default function LoginPopup({ onShowChange }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check for access token in local storage
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        onShowChange(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onShowChange]);

  const handleClose = () => {
    setShowPopup(false);
    onShowChange(false);
  };

  if (!showPopup) return null;

  return (
    <>
      <EventPopup isBlurred={showPopup} />
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700 relative p-6"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close popup"
            >
              <HiX className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Welcome Back!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Please login to access all features
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
              >
                Login Now
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
