import { FaLightbulb, FaUsers, FaHandHoldingUsd, FaChartLine, FaNetworkWired, FaTrophy } from 'react-icons/fa';

export default function Initiatives() {
  return (
    <div className="relative isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 -mt-30">
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
          {[
            {
              icon: <FaLightbulb className="w-6 h-6 text-white" />,
              title: 'Startup Incubator',
              subtitle: 'Eureka!',
              description: '12-week intensive program providing mentorship, resources, and funding opportunities for early-stage startups'
            },
            {
              icon: <FaUsers className="w-6 h-6 text-white" />,
              title: 'Mentorship Program',
              subtitle: 'Eureka! Junior',
              description: 'Connect with industry experts and successful entrepreneurs for personalized guidance'
            },
            {
              icon: <FaHandHoldingUsd className="w-6 h-6 text-white" />,
              title: 'Seed Funding',
              subtitle: 'Campus Executive',
              description: 'Annual competition offering grants up to ₹5 lakh for promising student ventures'
            },
            {
              icon: <FaChartLine className="w-6 h-6 text-white" />,
              title: 'Business Workshops',
              subtitle: 'Illuminate',
              description: 'Weekly sessions on market research, financial planning, and growth strategies'
            },
            {
              icon: <FaNetworkWired className="w-6 h-6 text-white" />,
              title: 'Industry Networking',
              subtitle: 'EnB',
              description: 'Quarterly meetups with investors and corporate partners for collaboration opportunities'
            },
            {
              icon: <FaTrophy className="w-6 h-6 text-white" />,
              title: 'Annual Pitch Fest',
              subtitle: 'NEC',
              description: 'Flagship event with ₹10 lakh prize pool and investor demo day'
            }
          ].map((initiative, index) => (
            <div
              key={initiative.title}
              className="bg-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-black/20 dark:border-gray-200/20 transition-all hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-gray-700/20"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg">
                  {initiative.icon}
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
