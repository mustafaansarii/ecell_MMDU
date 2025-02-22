import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGallery } from "../features/gallery/gallerySlice";

export default function Gallery() {
  const dispatch = useDispatch();
  const { galleryItems, status, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  // Take the first 4 items only
  const displayedItems = galleryItems?.slice(0, 4) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayedItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayedItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 -mt-15">
      <div className="mx-auto max-w-[1200px]">
        <div className="group relative mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
            Gallery
          </h2>
          <div className="h-1.5 w-20 sm:w-28 mt-3 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300 group-hover:w-24 sm:group-hover:w-36" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
            Relive the most memorable moments from our events. From inspiring
            keynote speeches to exciting pitch competitions, our gallery
            captures the essence of entrepreneurship and innovation.
          </p>
        </div>

        {/* Book-like Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden border-4 rounded-b-sm border-gray-500 shadow-2xl bg-white dark:bg-gray-800">
          {/* Image Wrapper with Book-like Effect */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {displayedItems.map((item, index) => (
              <div key={item.id} className="min-w-full relative">
                {/* Book-like Page Effect */}
                <div className="absolute inset-0 border-l-2 border-r-2 border-white/10" />
                
                <img
                  src={item.image_url}
                  alt={item.description}
                  className="w-full h-[300px] sm:h-[550px] object-cover"
                />
                
                {/* Enhanced Description Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12 mb-6">
                  <div className="max-w-2xl mx-auto text-center">
                    <h5 className="text-lg font-semibold text-white mb-2">{item.date}</h5>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Buttons */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2  text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            onClick={prevSlide}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2  text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            onClick={nextSlide}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Enhanced Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {displayedItems.map((_, index) => (
              <button
                key={index}
                className={`h-1 w-4 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/gallery"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            View Full Gallery
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
