import { HomeIcon } from '@heroicons/react/24/outline';
import Footer from '../component/Footer';
import { useState } from 'react';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState(null);
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
        },
        {
          image: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
          date: 'March 19, 2023',
          description: 'Closing ceremony and awards'
        }
      ];
  
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
          <p className='text-center text-gray-500 text-xs sm:text-sm mb-6'>this is ecell mmdu gallery page you'll find all the images of the events here</p>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden shadow-md group aspect-square hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-800/50 cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm opacity-90">{item.date}</p>
                  <p className="text-base sm:text-lg font-semibold mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-screen image modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        <Footer/>
      </>
    );
}
  