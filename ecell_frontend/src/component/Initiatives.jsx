import { FaLightbulb, FaUsers, FaHandHoldingUsd, FaChartLine, FaNetworkWired, FaTrophy } from 'react-icons/fa';

export default function Initiatives() {
  // Static data for initiatives
  const initiatives = [
    {
      id: 1,
      subtitle: 'Innovation',
      title: 'Startup Incubation',
      description: 'Supporting early-stage startups with resources and mentorship to accelerate growth.'
    },
    {
      id: 2,
      subtitle: 'Community',
      title: 'Entrepreneur Network',
      description: 'Connecting entrepreneurs to share knowledge, resources, and opportunities.'
    },
    {
      id: 3,
      subtitle: 'Funding',
      title: 'Seed Investment',
      description: 'Providing initial funding and investment opportunities for promising startups.'
    },
    {
      id: 4,
      subtitle: 'Growth',
      title: 'Business Scaling',
      description: 'Helping established businesses scale their operations and reach new markets.'
    },
    {
      id: 5,
      subtitle: 'Collaboration',
      title: 'Partnership Programs',
      description: 'Facilitating strategic partnerships between startups and established companies.'
    },
    {
      id: 6,
      subtitle: 'Recognition',
      title: 'Awards & Competitions',
      description: 'Celebrating and rewarding innovative ideas and successful ventures.'
    }
  ];

  // Hardcoded icon mapping
  const iconComponents = [
    <FaLightbulb className="w-6 h-6 text-white" />,
    <FaUsers className="w-6 h-6 text-white" />,
    <FaHandHoldingUsd className="w-6 h-6 text-white" />,
    <FaChartLine className="w-6 h-6 text-white" />,
    <FaNetworkWired className="w-6 h-6 text-white" />,
    <FaTrophy className="w-6 h-6 text-white" />
  ];

  return (
    <div className="relative isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 -mt-15">
      <div className="mx-auto max-w-[1200px]">
        <div className="group relative mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
            Our Initiatives
          </h2>
          <div className="h-2 w-24 sm:w-28 mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300 group-hover:w-32 sm:group-hover:w-36" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl text-sm sm:text-base">
            Explore the various initiatives and programs we offer to support and inspire the next generation of entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {initiatives.map((initiative, index) => (
            <div
              key={initiative.id}
              className="bg-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-black/20 dark:border-gray-200/20 transition-all hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-gray-700/20"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg">
                  {iconComponents[index % iconComponents.length]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-1">
                    {initiative.subtitle}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
