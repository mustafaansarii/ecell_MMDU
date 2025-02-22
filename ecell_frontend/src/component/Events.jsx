import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../config';
const LOADING_ITEMS = 3;
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Events() {
  const [eventType, setEventType] = useState('upcoming');
  const [activeEvent, setActiveEvent] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${config.Backend_Api}/api/events/all/`);
        const data = await response.json();
        // Sort events to put active events first
        const sortedEvents = data.sort((a, b) => {
          if (a.status === 'active') return -1;
          if (b.status === 'active') return 1;
          return 0;
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const currentEvents = events.filter(event => 
    eventType === 'upcoming' 
      ? event.status === 'upcoming' || event.status === 'active'
      : event.status === 'past'
  );
  const currentEvent = currentEvents[activeEvent];

  const handleEventNavigation = (direction) => {
    if (direction === 'prev' && activeEvent > 0) {
      setActiveEvent(activeEvent - 1);
    } else if (direction === 'next' && activeEvent < currentEvents.length - 1) {
      setActiveEvent(activeEvent + 1);
    }
  };

  return (
    <div className="py-8 sm:py-16 -mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
            Events
          </h2>
          <div className="h-1.5 w-20 sm:w-28 mt-3 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300 group-hover:w-24 sm:group-hover:w-36" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
            Explore the latest events and activities from our organization. From workshops to networking opportunities, we're always working to support and inspire the next generation of entrepreneurs.
          </p>
        </div>
        
        {/* Event Type Selector */}
        <div className="flex justify-center mb-8 sm:mb-12 mt-10">
          <div className="inline-flex rounded-full shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => { setEventType('upcoming'); setActiveEvent(0); }}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                eventType === 'upcoming'
                  ? 'bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900'
                  : 'text-gray-5 00 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => { setEventType('past'); setActiveEvent(0); }}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                eventType === 'past'
                  ? 'bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Mobile Event Navigation */}
        <div className="sm:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => handleEventNavigation('prev')}
            disabled={activeEvent === 0}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-900 dark:text-white" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{activeEvent + 1} / {currentEvents.length}</span>
          <button
            onClick={() => handleEventNavigation('next')}
            disabled={activeEvent === currentEvents.length - 1}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          >
            <FaChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Event Details Card */}
        {events.length === 0 ? (
          <div className="border bg-blur border-black/20 dark:border-white/10 rounded-2xl shadow-sm sm:shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Loading Skeleton - Titles */}
              <div className="hidden sm:block p-4 sm:p-6 dark:bg-gray-900/50">
                <ul className="space-y-2">
                  {Array.from({ length: LOADING_ITEMS }).map((_, index) => (
                    <motion.li
                      key={index}
                      variants={CARD_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800/50 animate-pulse"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Loading Skeleton - Content */}
              <div className="p-4 sm:p-8 sm:col-span-2">
                <motion.div
                  variants={CARD_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
                        <div className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mt-6 animate-pulse" />
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border bg-blur border-black/20 dark:border-white/10 rounded-2xl shadow-sm sm:shadow-xl overflow-hidden transition-all hover:shadow-lg sm:hover:shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Event Titles - Hidden on mobile */}
              <div className="hidden sm:block p-4 sm:p-6 dark:bg-gray-900/50">
                <ul className="space-y-2">
                  {currentEvents.map((event, index) => (
                    <li
                      key={event.id}
                      className={`relative cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all ${
                        activeEvent === index
                          ? 'dark:bg-gray-800 shadow-sm sm:shadow-lg border-l-2 sm:border-l-4 border-purple-600'
                          : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setActiveEvent(index)}
                    >
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">{event.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(event.end_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                          })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Event Content */}
              <div className="p-4 sm:p-8 sm:col-span-2">
                {currentEvent ? (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                          <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                          {currentEvent.name}
                        </span>
                      </div>
                      <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                        {currentEvent.description}
                      </p>
                    </div>
                    {currentEvent.status === 'active' ? (
                      <a href="/eventregister" className="w-full sm:w-auto self-start bg-gradient-to-r from-purple-600 to-blue-500 hover:to-blue-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base text-center">
                        Apply Now →
                      </a>
                    ) : (
                      <a href="/gallery" className="w-full sm:w-auto self-start bg-gradient-to-r from-purple-600 to-blue-500 hover:to-blue-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base text-center">
                        Check Wrap Up →
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-500 dark:text-gray-400">No events available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
