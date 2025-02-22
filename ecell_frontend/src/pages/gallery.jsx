import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGallery } from '../features/gallery/gallerySlice';
import Footer from '../component/Footer'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const dispatch = useDispatch();
  const { galleryItems, status, error } = useSelector(state => state.gallery);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  // Fetch data only once on component mount
  useEffect(() => {
    if (galleryItems.length === 0) {
      dispatch(fetchGallery());
    }
  }, [dispatch]);

  const handleNavigation = (direction) => {
    if (galleryItems.length === 0) return;
    
    setActiveIndex(prev => {
      if (direction === 'prev') return prev > 0 ? prev - 1 : galleryItems.length - 1;
      if (direction === 'next') return prev < galleryItems.length - 1 ? prev + 1 : 0;
      return prev;
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('bg-black/90')) {
      toggleFullscreen();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0 mt-10">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">Gallery</span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">Event Gallery</h2>
        </div>
        <p className='text-center text-gray-500 text-xs sm:text-sm mb-6'>This is E-Cell MMDU gallery page where you'll find all the images of our events</p>
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative aspect-square">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="h-4 w极3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {status !== 'loading' && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative overflow-hidden shadow-md group aspect-square cursor-pointer"
                  onClick={() => setSelectedImage(item.image_url)}
                >
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700">
                    <img
                      src={item.image_url}
                      alt={`Gallery Image ${item.id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={(e) => e.target.classList.remove('hidden')}
                      onError={(e) => {
                        e.target.classList.add('hidden');
                        e.target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center text-gray-500">
                      <span>Image not available</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90">{item.event_date}</p>
                    <p className="text-base sm:text-lg font-semibold mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium ${
                      currentPage === page
                        ? 'text-white bg-blue-500'
                        : 'text-gray-500 bg-white border border-gray-300'
                    } rounded-lg hover:bg-gray-100`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Full-screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-[1000px] max-w-full max h-full">
            <img
              src={selectedImage}
              alt="Full screen"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.classList.add('hidden');
                e.target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden text-white text-center">
              <p>Image could not be loaded</p>
              <button 
                className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </>
  );
}