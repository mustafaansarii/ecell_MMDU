import { FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';

export default function About() {
  // Static about data
  const aboutData = {
    title: "About E-Cell MMDU",
    description: "The Entrepreneurship Cell of MMDU is a student-run organization dedicated to fostering entrepreneurial spirit and innovation among students. We provide a platform for young minds to develop their ideas, connect with industry experts, and turn their visions into reality.",
    vision: "To create a vibrant entrepreneurial ecosystem that nurtures innovation and empowers students to become successful entrepreneurs and change-makers.",
    mission: "To provide students with the knowledge, resources, and network needed to develop and implement innovative business ideas, while fostering a culture of entrepreneurship and leadership."
  };

  // Static stats data
  const statsData = [
    { title: "Startups Launched", value: "50+", icon_name: "FaRocket" },
    { title: "Members", value: "200+", icon_name: "FaUsers" },
    { title: "Partnerships", value: "30+", icon_name: "FaHandshake" }
  ];

  const goalsData = [
    {
      title: "Vision",
      description: aboutData.vision
    },
    {
      title: "Mission",
      description: aboutData.mission
    }
  ];

  return (
    <div className="relative isolate overflow-hidden mt-10 sm:mt-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12">
          <div className="space-y-6 sm:space-y-12">
            <div className="group relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
                {aboutData.title}
              </h2>
              <div className="h-1.5 w-16 sm:w-20 mt-3 sm:mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-20 sm:group-hover:w-24 group-hover:from-purple-600 group-hover:to-blue-500" />
            </div>
            
            <div className="relative pl-4 sm:pl-6 group">
              <div className="absolute left-0 top-1.5 h-4 sm:h-5 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full animate-pulse" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80 bg-clip-text text-transparent">
                What is E-Cell?
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed bg-white/5 dark:bg-black/5 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm border border-black/20 dark:border-gray-200/20 shadow-sm">
                {aboutData.description}
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-12 mt-6 sm:mt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md sm:rounded-lg">
                    <FaRocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Vision</h3>
                </div>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {goalsData[0].description}
                </p>
              </div>

              <div className="bg-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md sm:rounded-lg">
                    <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Mission</h3>
                </div>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {goalsData[1].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="w-full mx-auto mt-6 sm:mt-10">
          <div className="p-3 sm:p-6">
            <div className="flex flex-row justify-between gap-1 sm:gap-3 p-1 sm:p-2 overflow-x-auto">
              {statsData.map(({ title, value, icon_name }, index) => (
                <div key={`${title}-${index}`} className="flex-none sm:flex-1 text-center min-w-[80px] sm:min-w-[100px]">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md sm:rounded-lg inline-block mb-1 sm:mb-2">
                    {icon_name === "FaRocket" && <FaRocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                    {icon_name === "FaUsers" && <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                    {icon_name === "FaHandshake" && <FaHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                  </div>
                  <dt className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">{title}</dt>
                  <dd className="text-lg sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
