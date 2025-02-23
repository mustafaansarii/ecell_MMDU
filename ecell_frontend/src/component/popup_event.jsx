import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiX } from 'react-icons/hi';
import config from '../config';

export default function EventPopup({ isBlurred }) {
    const [activeEvent, setActiveEvent] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    // Check localStorage for registration status
    const isRegistered = localStorage.getItem('registrationDone') === 'true';

    useEffect(() => {
        // Don't fetch events if already registered
        if (isRegistered) return;

        const fetchActiveEvents = async () => {
            try {
                const response = await fetch(`${config.Backend_Api}/api/events/all/`);
                const data = await response.json();
                const active = data.find(event => event.status === 'active');
                if (active) {
                    setActiveEvent(active);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchActiveEvents();
    }, [isRegistered]);

    const handleClose = () => {
        setIsVisible(false);
    };

    // Don't show popup if registered or not visible or no active event
    if (isRegistered || !isVisible || !activeEvent) return null;

    // Format the end date to be human readable
    const formattedEndDate = new Date(activeEvent.end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <AnimatePresence>
            <motion.div
                className={`fixed bottom-[10px] sm:bottom-4 right-0 sm:right-4 z-50 w-full sm:w-auto px-4 sm:px-0 ${isBlurred ? 'filter blur-sm' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl w-full sm:max-w-sm border border-gray-200 dark:border-gray-700 relative">
                    {/* Close button with better positioning and animation */}
                    <motion.button 
                        onClick={handleClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                        aria-label="Close popup"
                    >
                        <HiX className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </motion.button>

                    <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            Active Event
                        </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                        {activeEvent.name} is currently active! Register now to participate.
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                        Registration Close: {formattedEndDate}
                    </p>
                    <Link 
                        to="/eventregister"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                        <span className="text-sm sm:text-base">Register Now</span>
                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <HiArrowRight className="h-4 w-4" />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
