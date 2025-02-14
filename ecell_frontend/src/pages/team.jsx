import Footer from '../component/Footer';
import { FaLinkedin, FaPhone, FaUserTie, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const facultyAdvisors = [
  {
    name: "Dr. Bharti Sharma",
    role: "Co-Founder & Assistant Professor",
    description: "Visionary leader guiding E-Cell's strategic direction and innovation initiatives.",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/ms%20bharti%20.png",
    linkedinlink: "https://www.linkedin.com/in/dr-bharti-sharma-512a471b0/",
    contactno: "+91 98765 43210"
  },
  {
    name: "Dr. Sumit Mittal",
    role: "Professor & Principal",
    description: "Driving force behind academic-industry collaborations and entrepreneurial ecosystem development.",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/sumiit.png",
    linkedinlink: "https://www.linkedin.com/in/dr-sumit-mittal-7b71011b0/",
    contactno: "+91 98765 43210"
  }
];

const DOMAIN_HEADS = [
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  },
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  },
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  },
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  }
];

const Managers = [
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  },
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  },
  {
    name: "John Doe",
    role: "Co-Founder & President",
    phone: "+91 98765 43210",
    linkedin: "#",
    image: "https://mmdu-ecell.vercel.app/Team/assets/images/aashira.jpg"
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='text-center'>
          <div className="flex items-center justify-start mb-4">
            <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors">
              <FaHome className="mr-2" />
              <span className="text-sm">Home</span>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-sm text-purple-500">Team</span>
          </div>
          
          <h1 className='font-bold text-5xl text-purple-400'>Meet Our Team</h1>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>this is our team who are working for the betterment of the college and the students</p>
        </div>
        {/* Faculty Advisors Section */}
        <div className="group relative mb-16 text-center mt-20">
          <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <h2 className="relative  sm:text-4xl font-bold text-purple-400 md:text-4xl">
            Faculty Advisors
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Guiding mentors shaping entrepreneurial journeys
          </p>
          <div className="h-1 w-32 mt-6 mx-auto rounded-full transition-all duration-300 group-hover:w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 -mt-10" >
          {facultyAdvisors.map((faculty, index) => (
            <div key={index} className="group relative rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-2 border-transparent hover:border-purple-500 hover:border-t-blue-500 hover:border-r-pink-500 hover:border-b-green-500 hover:border-l-yellow-500">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />
                  <img 
                    src={faculty.image} 
                    alt={faculty.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/50 dark:border-gray-800/50 relative transform transition duration-300 hover:rotate-6"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{faculty.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
                    <FaUserTie className="text-purple-600 animate-bounce" />
                    {faculty.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                    {faculty.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <a href={faculty.linkedinlink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-purple-600 transition-all">
                      <FaLinkedin className="w-6 h-6 text-purple-600 dark:text-white" />
                    </a>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full">
                      <FaPhone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{faculty.contactno}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Sections */}
        {[DOMAIN_HEADS, Managers].map((team, teamIndex) => (
          <div key={teamIndex} className="group relative mb-16 text-center">
            <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <h2 className="relative text-4xl sm:text-5xl font-bold text-purple-400 md:text-6xl">
              {team === DOMAIN_HEADS ? 'Domain Leaders' : 'Management Team'}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {team === DOMAIN_HEADS ? 'Driving excellence in specialized domains' : 'Orchestrating seamless operations'}
            </p>
            <div className="h-1 w-32 mt-6 mx-auto rounded-full transition-all duration-300 group-hover:w-40" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {team.map((member, index) => (
                <div key={index} className="relative rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 group bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-purple-200 hover:border-purple-400">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur opacity-10 group-hover:opacity-20 transition-opacity animate-pulse" />
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-white/50 dark:border-gray-800/50 transform transition duration-300 hover:rotate-6"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-md font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center justify-center gap-2">
                        <FaUserTie className="text-purple-600 text-xs" />
                        {member.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <div className="flex items-center justify-center space-x-3">
                        <a href={member.linkedin} className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-purple-600 transition-all">
                          <FaLinkedin className="w-4 h-4 text-purple-600 dark:text-white" />
                        </a>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full">
                          <FaPhone className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
