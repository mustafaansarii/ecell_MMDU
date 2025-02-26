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
    <div className="min-h-screen  ">
      <div className="flex items-center space-x-2 mb-8 px-4 sm:px-6 mt-4">
        <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors group">
          <FaHome className="mr-1 sm:mr-2 transition-transform group-hover:scale-110" />
          <span className="text-xs sm:text-sm font-medium">Home</span>
        </Link>
        <span className="text-gray-400 text-xs sm:text-sm">/</span>
        <span className="text-xs sm:text-sm font-semibold text-purple-500">Team</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 sm:mb-16">
          <div className="text-center space-y-2 sm:space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            >
              Meet Our Team
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A dedicated team of visionaries driving innovation and excellence in entrepreneurship
            </p>
          </div>
        </div>

        <section className="group relative mb-12 sm:mb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-10 animate-pulse" />
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Faculty Advisors
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Guiding mentors shaping entrepreneurial journeys
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-12">
            <AnimatePresence>
              {teamData.faculty.map((faculty, index) => (
                <motion.div
                  key={faculty.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-8 hover:shadow-2xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100/30 hover:border-purple-200/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur opacity-30 animate-pulse" />
                      <img 
                        src={faculty.img_link} 
                        alt={faculty.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white/80 dark:border-gray-800/80 relative z-10 transform transition duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{faculty.name}</h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 flex items-center justify-center md:justify-start gap-2">
                        <FaUserTie className="text-purple-600 animate-bounce" />
                        {faculty.role}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {faculty.course_year}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3 leading-relaxed">
                        {faculty.description}
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-3 md:mt-4">
                        <a href={faculty.linkedin_link} target="_blank" rel="noopener noreferrer" className="p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all">
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
        </section>

        {[teamData.domain, teamData.management].map((team, teamIndex) => (
          <section key={teamIndex} className="group relative mb-12 sm:mb-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-10 animate-pulse" />
            <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {team === teamData.domain ? 'Domain Experts' : 'Executive Team'}
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {team === teamData.domain ? 'Specialized leadership in key domains' : 'Strategic operational leadership'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 sm:mt-12">
              <AnimatePresence>
                {team.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33%-1rem)] lg:w-[calc(25%-1.5rem)] relative rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100/30 hover:border-purple-200/50"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur opacity-30 animate-pulse" />
                        <img 
                          src={member.img_link} 
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover border-4 border-white/80 dark:border-gray-800/80 relative z-10 transform transition duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-purple-500 dark:text-purple-400 font-medium">{member.role}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{member.course_year}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{member.description}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-1 md:space-y-2 w-full">
                        <div className="flex items-center justify-center space-x-2 md:space-x-3">
                          {member.linkedin_link && member.linkedin_link.includes('linkedin.com') && (
                            <a href={member.linkedin_link} className="p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm  transition-all">
                              <FaLinkedin className="w-3 h-3 md:w-4 md:h-4 text-purple-600 dark:text-white" />
                            </a>
                          )}
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
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
