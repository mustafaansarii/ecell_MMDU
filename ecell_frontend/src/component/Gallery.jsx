import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const galleryItems = [
    {
      image: 'https://mmdu-ecell.vercel.app/Events/assets/images/day1_admin.jpeg',
      date: 'March 15, 2023',
      description: 'E-Summit opening ceremony'
    },
    {
      image: 'https://mmdu-ecell.vercel.app/Events/assets/images/day1_admin.jpeg',
      date: 'March 16, 2023',
      description: 'Startup pitch competition'
    },
    {
      image: 'https://mmdu-ecell.vercel.app/Events/assets/images/day1_admin.jpeg',
      date: 'March 17, 2023',
      description: 'Networking session with investors'
    },
    {
      image: 'https://mmdu-ecell.vercel.app/Events/assets/images/day1_admin.jpeg',
      date: 'March 18, 2023',
      description: 'Closing ceremony and awards'
    }
  ];

  // Only take first 4 items
  const displayedItems = galleryItems.slice(0, 4);

  const handleNavigation = (direction) => {
    if (direction === 'prev' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === 'next' && activeIndex < galleryItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('bg-black/90')) {
      toggleFullscreen();
    }
  };

  return (
    <div className="py-8 sm:py-16 -mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative mb-8 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
            Gallery
          </h2>
          
          <div className="h-1.5 w-20 sm:w-28 mt-3 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300 group-hover:w-24 sm:group-hover:w-36" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
            Relive the most memorable moments from our events. From inspiring keynote speeches to exciting pitch competitions, our gallery captures the essence of entrepreneurship and innovation.
          </p>
        </div>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 -mt-4">
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden cursor-pointer active:shadow-lg sm:hover:shadow-lg dark:active:shadow-gray-700/20 dark:sm:hover:shadow-gray-700/20 transition-all border-2 border-transparent active:border-purple-500 sm:hover:border-purple-500"
              onClick={() => {
                setActiveIndex(index);
                toggleFullscreen();
              }}
            >
              <img
                src={item.image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 active:scale-105 sm:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 sm:opacity-0 active:opacity-100 sm:group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white sm:opacity-0 active:opacity-100 sm:group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium">{item.date}</p>
                <p className="text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="/gallery" 
            className="px-8 py-3 text-purple-500 dark:text-purple-400 font-medium hover:text-purple-600 dark:hover:text-purple-300 transition-all duration-300"
          >
            Explore Full Gallery →
          </a>
        </div>

        {/* Fullscreen Viewer */}
        {isFullscreen && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-8 flex items-center justify-center"
            onClick={handleClickOutside}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <FaExpand className="w-5 h-5 rotate-45" />
              </button>
              <img
                src={galleryItems[activeIndex].image}
                alt={`Selected ${activeIndex + 1}`}
                className="w-[1000px] h-full object-contain"
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 p-3 rounded-lg text-white text-center">
                <p className="text-sm">{galleryItems[activeIndex].date}</p>
                <p className="text-xs">{galleryItems[activeIndex].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
