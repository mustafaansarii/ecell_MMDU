import { useState, useEffect } from 'react';

const staticCollaborators = [
  { id: 1, name: 'Company A', logo_url: 'https://mmdu-ecell.vercel.app/assets/images/nec.png' },
  { id: 2, name: 'Company B', logo_url: 'https://mmdu-ecell.vercel.app/assets/images/iit_bombay.png' },
  { id: 3, name: 'Company C', logo_url: 'https://mmdu-ecell.vercel.app/assets/images/nec.png' },
  { id: 4, name: 'Company D', logo_url: 'https://mmdu-ecell.vercel.app/assets/images/iit_bombay.png' },
];

export default function Collaborators() {
  const [width, setWidth] = useState(window.innerWidth);

  // Duplicate the collaborators array to create seamless looping
  const doubleCollaborators = [...staticCollaborators, ...staticCollaborators];

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="py-8 sm:py-16 max-w-[100vw] overflow-x-hidden">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .marquee-container {
            display: flex;
            width: 100vw;
            overflow: hidden;
            white-space: nowrap;
          }

          .marquee-content {
            display: flex;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
            Our Collaborators
          </h2>
          <div className="h-1.5 w-20 sm:w-28 mt-3 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300 group-hover:w-24 sm:group-hover:w-36" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
            Explore our collaborators and partners who support our mission.
          </p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {doubleCollaborators.map((collaborator, index) => (
            <img 
              key={`${collaborator.id}-${index}`}
              src={collaborator.logo_url} 
              alt={collaborator.name} 
              className="h-16 sm:h-20 mx-4" 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
