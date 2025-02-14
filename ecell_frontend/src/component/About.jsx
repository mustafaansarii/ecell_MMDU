import { FaRocket, FaUsers, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <div className="relative isolate overflow-hidden px-4 sm:px-6 py-16 sm:py-24 lg:px-8 mt-3 sm:-mt-52">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-8 sm:space-y-12">
            <div className="group relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-5xl">
                About E-Cell MMDU
              </h2>
              <div className="h-2 w-20 sm:w-24 mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-28 sm:group-hover:w-32 group-hover:from-purple-600 group-hover:to-blue-500" />
            </div>
            
            <div className="relative pl-6 sm:pl-8 group">
              <div className="absolute left-0 top-2 h-5 sm:h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500/80 to-purple-600/80 bg-clip-text text-transparent">
                What is E-Cell?
              </h3>
              <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed bg-white/5 dark:bg-black/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-black/20 dark:border-gray-200/20 shadow-sm">
                The Entrepreneurship Cell at Maharishi Markandeshwar University is a student-driven platform fostering innovation and business acumen. We empower aspiring entrepreneurs through mentorship, resources, and real-world opportunities.
              </p>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/5 p-4 sm:p-8 rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Vision</h3>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  To create an ecosystem where innovative ideas transform into sustainable businesses and shape future industry leaders.
                </p>
              </div>

              <div className="bg-white/5 p-4 sm:p-8 rounded-2xl backdrop-blur-sm border-y border-black/20 dark:border-gray-200/20 transition-all hover:bg-white/10 dark:hover:bg-gray-900/20 sm:hover:-translate-y-1 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Mission</h3>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nurture entrepreneurial mindset through workshops, mentorship programs, and incubation support while bridging academia with industry needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="w-full mx-auto mt-8 sm:mt-12">
          <div className="p-4 sm:p-8">
            <div className="flex flex-row justify-between gap-2 sm:gap-6 p-2 sm:p-4 overflow-x-auto">
              {[
                ['Startups Launched', '50+', <FaRocket className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-blue-500" />],
                ['Students Engaged', '1000+', <FaUsers className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-purple-500" />],
                ['Industry Partners', '20+', <FaHandshake className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-pink-500" />]
              ].map(([title, value, icon], index) => (
                <div key={title} className="flex-none sm:flex-1 text-center min-w-[100px] sm:min-w-0">
                  {icon}
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
