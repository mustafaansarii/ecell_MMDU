import { useState, useEffect } from 'react';

export default function Collaborators() {
  const [width, setWidth] = useState(window.innerWidth);

  const collaborators = [
    { logo: 'https://api.mmumullana.org/uploads/img/L1_1_83_14886.webp?=44', name: 'Collaborator 1' },
    { logo: 'https://mmdu-ecell.vercel.app/assets/images/iit_bombay.png', name: 'IIT Bombay' },
    { logo: 'https://mmdu-ecell.vercel.app/assets/images/nec.png', name: 'NEC' },
    { logo: 'https://ecell.iith.ac.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdwsverefw%2Fimage%2Fupload%2Fc_scale%2Cw_1125%2Fv1666905522%2Fecell%2Funstop_wlsi8w.png&w=2048&q=75', name: 'Unstop' },
    { logo: 'https://mmdu-ecell.vercel.app/assets/images/nec.png', name: 'NEC' },
    { logo: 'https://mmdu-ecell.vercel.app/assets/images/nec.png', name: 'NEC' },
    // Add more collaborators as needed
  ];

  // Duplicate the collaborators array to create seamless looping
  const doubleCollaborators = [...collaborators, ...collaborators];

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
            <img key={index} src={collaborator.logo} alt={collaborator.name} className="h-16 sm:h-20 mx-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
