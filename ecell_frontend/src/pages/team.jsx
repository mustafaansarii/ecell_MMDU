import Footer from '../component/Footer';
import { FaLinkedin, FaPhone, FaUserTie, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '../config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Loading animation component
const LoadingAnimation = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      className="w-16 h-16 bg-purple-500 rounded-full"
      animate={{
        scale: [1, 1.5, 1.5, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0
      }}
    />
  </div>
);

export default function TeamPage() {
  const [teamData, setTeamData] = useState({
    faculty: [],
    domain: [],
    management: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Check if config.Backend_Api exists and is a valid URL
        if (!config.Backend_Api || typeof config.Backend_Api !== 'string') {
          throw new Error('Invalid backend API URL in config');
        }

        // Ensure the URL ends with a slash
        const baseUrl = config.Backend_Api.endsWith('/') 
          ? config.Backend_Api 
          : config.Backend_Api + '/';
        
        const apiUrl = `${baseUrl}api/ecell/team/`;
        console.log('Fetching data from:', apiUrl);  // Debugging

        const response = await axios.get(apiUrl);
        const data = response.data;
        
        setTeamData({
          faculty: data.filter(member => member.team_type === 'FACULTY'),
          domain: data.filter(member => member.team_type === 'DOMAIN'),
          management: data.filter(member => member.team_type === 'MANAGEMENT')
        });
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors">
                <FaHome className="mr-2" />
                <span className="text-sm">Home</span>
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-sm text-purple-500">Team</span>
            </div>
          </div>
          <div className="text-center ">
            <h1 className='font-bold text-5xl text-purple-400'>Meet Our Team</h1>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>this is our team who are working for the betterment of the college and the students</p>
          </div>
        </div>
        
        {/* Faculty Advisors Section */}
        <div className="group relative mb-8 md:mb-16 text-center mt-5">
          <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">
            Faculty Advisors
          </h2>
          <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Guiding mentors shaping entrepreneurial journeys
          </p>
          <div className="h-1 w-20 md:w-32 mt-4 md:mt-6 mx-auto rounded-full transition-all duration-300 group-hover:w-24 md:group-hover:w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 -mt-6 md:-mt-10">
          <AnimatePresence>
            {teamData.faculty.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-8 hover:shadow-xl transition-all duration-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-2 border-transparent hover:border-purple-500 hover:border-t-blue-500 hover:border-r-pink-500 hover:border-b-green-500 hover:border-l-yellow-500"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />
                    <img 
                      src={faculty.img_link} 
                      alt={faculty.name}
                      className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-2 md:border-4 border-white/50 dark:border-gray-800/50 relative transform transition duration-300 hover:rotate-6"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{faculty.name}</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 flex items-center justify-center md:justify-start gap-2">
                      <FaUserTie className="text-purple-600 animate-bounce" />
                      {faculty.role}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 leading-relaxed">
                      {faculty.description}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-3 md:mt-4">
                      <a href={faculty.linkedin_link} target="_blank" rel="noopener noreferrer" className="p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-purple-600 transition-all">
                        <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-white" />
                      </a>
                      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full">
                        <FaPhone className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-300">{faculty.contact_no}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Team Sections */}
        {[teamData.domain, teamData.management].map((team, teamIndex) => (
          <div key={teamIndex} className="group relative mb-8 md:mb-16 text-center">
            <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">
              {team === teamData.domain ? 'Domain Leaders' : 'Management Team'}
            </h2>
            <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {team === teamData.domain ? 'Driving excellence in specialized domains' : 'Orchestrating seamless operations'}
            </p>
            <div className="h-1 w-20 md:w-32 mt-4 md:mt-6 mx-auto rounded-full transition-all duration-300 group-hover:w-24 md:group-hover:w-40" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6 md:mt-8">
              <AnimatePresence>
                {team.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-3 md:p-4 hover:shadow-xl transition-all duration-300 group bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-200 hover:border-purple-400"
                  >
                    <div className="flex flex-col items-center space-y-3 md:space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full blur opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />
                        <img 
                          src={member.img_link} 
                          alt={member.name}
                          className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/50 dark:border-gray-800/50 transform transition duration-300 hover:rotate-6"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm md:text-md font-bold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center justify-center gap-1 md:gap-2">
                          <FaUserTie className="text-purple-600 text-xs" />
                          {member.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-center space-y-1 md:space-y-2 w-full">
                        <div className="flex items-center justify-center space-x-2 md:space-x-3">
                          <a href={member.linkedin_link} className="p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-purple-600 transition-all">
                            <FaLinkedin className="w-3 h-3 md:w-4 md:h-4 text-purple-600 dark:text-white" />
                          </a>
                          <div className="flex items-center gap-1 px-1 md:px-2 py-0 md:py-1 rounded-full">
                            <FaPhone className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">{member.contact_no}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
