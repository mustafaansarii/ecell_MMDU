import { FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';

// About section data
const aboutData = {
  title: "About E-Cell MMDU",
  description: "The Entrepreneurship Cell at Maharishi Markandeshwar University is a student-driven platform fostering innovation and business acumen. We empower aspiring entrepreneurs through mentorship, resources, and real-world opportunities."
};

// Vision and Mission data
const goalsData = [
  {
    title: "Vision",
    description: "To create an ecosystem where innovative ideas transform into sustainable businesses and shape future industry leaders."
  },
  {
    title: "Mission",
    description: "Nurture entrepreneurial mindset through workshops, mentorship programs, and incubation support while bridging academia with industry needs."
  }
];

// Stats data
const statsData = [
  {
    title: "Startups Launched",
    value: "50+"
  },
  {
    title: "Students Engaged",
    value: "1000+"
  },
  {
    title: "Industry Partners",
    value: "20+"
  }
];

export default function About() {
  return (
    <div className="relative isolate overflow-hidden px-4 sm:px-6 py-16 sm:py-24 lg:px-8 mt-3 sm:-mt-52">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-8 sm:space-y-12">
            <div className="group relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
                {aboutData.title}
              </h2>
              <div className="h-2 w-20 sm:w-24 mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-28 sm:group-hover:w-32 group-hover:from-purple-600 group-hover:to-blue-500" />
            </div>
            
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute left-0 top-2 h-5 sm:h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80 bg-clip-text text-transparent">
                What is E-Cell?
              </h3>
              <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed bg-white/5 dark:bg-black/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-black/20 dark:border-gray-200/20 shadow-sm">
                {aboutData.description}
              </p>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/5 p-4 sm:p-8 rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <FaRocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Vision</h3>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {goalsData[0].description}
                </p>
              </div>

              <div className="bg-white/5 p-4 sm:p-8 rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                    <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Mission</h3>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {goalsData[1].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="w-full mx-auto mt-8 sm:mt-12">
          <div className="p-4 sm:p-8">
            <div className="flex flex-row justify-between gap-2 sm:gap-6 p-2 sm:p-4 overflow-x-auto">
              {statsData.map(({ title, value }, index) => (
                <div key={title} className="flex-none sm:flex-1 text-center min-w-[100px] sm:min-w-0">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg inline-block mb-2">
                    {title === "Startups Launched" && <FaRocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                    {title === "Students Engaged" && <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                    {title === "Industry Partners" && <FaHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                  <dt className="text-xs sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</dt>
                  <dd className="text-xl sm:text-5xl font-bold text-gray-900 dark:text-white">
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
