import { useState } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Events() {
  const [eventType, setEventType] = useState('upcoming');
  const [activeEvent, setActiveEvent] = useState(0);

  const upcomingEvents = [
    {
      title: 'E-Summit',
      date: 'March 15, 2023',
      description: 'Our E-Summit features industry leaders, successful entrepreneurs, and domain experts who share their insights and experiences.',
      cta: 'Apply',
    },
    {
      title: 'Start-Up Fair',
      date: 'April 5, 2023',
      description: 'The Start-Up Fair is a great opportunity for students to showcase their innovative ideas and connect with potential investors and mentors.',
      cta: 'Register',
    },
  ];

  const pastEvents = [
    {
      title: 'E-Networking',
      date: 'February 20, 2023',
      description: 'Our E-Networking event provided a platform for students to interact with alumni and industry professionals, fostering valuable connections.',
      cta: 'View Recap',
    },
    {
      title: 'Campus Ambassador Program',
      date: 'January 15, 2023',
      description: 'The Campus Ambassador Program recognized and rewarded students who actively promoted entrepreneurship and innovation on campus.',
      cta: 'Learn More',
    },
  ];

  const currentEvents = eventType === 'upcoming' ? upcomingEvents : pastEvents;
  const currentEvent = currentEvents[activeEvent];

  const handleEventNavigation = (direction) => {
    if (direction === 'prev' && activeEvent > 0) {
      setActiveEvent(activeEvent - 1);
    } else if (direction === 'next' && activeEvent < currentEvents.length - 1) {
      setActiveEvent(activeEvent + 1);
    }
  };

  return (
    <div className="py-8 sm:py-16 -mt-20">
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
        <div className="flex justify-center mb-8 sm:mb-12 -mt-10">
          <div className="inline-flex rounded-full shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => { setEventType('upcoming'); setActiveEvent(0); }}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                eventType === 'upcoming'
                  ? 'bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
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
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">{activeEvent + 1} / {currentEvents.length}</span>
          <button
            onClick={() => handleEventNavigation('next')}
            disabled={activeEvent === currentEvents.length - 1}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Event Details Card */}
        <div className="border bg-blur border-black/20 dark:border-white/10 rounded-2xl shadow-sm sm:shadow-xl overflow-hidden transition-all hover:shadow-lg sm:hover:shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Event Titles - Hidden on mobile */}
            <div className="hidden sm:block p-4 sm:p-6 dark:bg-gray-900/50">
              <ul className="space-y-2">
                {currentEvents.map((event, index) => (
                  <li
                    key={index}
                    className={`relative cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all ${
                      activeEvent === index
                        ? 'dark:bg-gray-800 shadow-sm sm:shadow-lg border-l-2 sm:border-l-4 border-purple-600'
                        : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => setActiveEvent(index)}
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">{event.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{event.date}</p>
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
                        {currentEvent.title}
                      </span>
                    </div>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                      {currentEvent.description}
                    </p>
                  </div>
                  <button className="w-full sm:w-auto self-start bg-gradient-to-r from-purple-600 to-blue-500 hover:to-blue-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-transform hover:scale-105 text-sm sm:text-base">
                    {currentEvent.cta} →
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-500 dark:text-gray-400">No events available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
