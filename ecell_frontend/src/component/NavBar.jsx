'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../component/auth/authSlice'
import AlertBanner from './aleart_banner'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Initiatives', href: '#initiatives' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(true)
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }eventregister
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !user) {
      dispatch({ type: 'auth/setUser', payload: { token } });
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const response = await fetch(`${config.Backend_Api}/api/events/all/`);
        const data = await response.json();
        const active = data.find(event => event.status === 'active');
        if (active) {
          setActiveEvent(active);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchActiveEvents();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  const userNavigation = [
    { name: 'Join E-Cell', href: '/joinecell' },
    ...(activeEvent ? [{ name: 'Event Register', href: '/eventregister' }] : [])
  ];

  return (
    <>
      <div className="dark:text-white">
        {isAlertVisible && <AlertBanner onClose={handleAlertClose}/>}
        <header className={`fixed inset-x-0 ${isAlertVisible ? 'top-[40px]' : 'top-0'} z-50 backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
          <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1 p-1 flex items-center hover:scale-105 transition-transform duration-200">
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline">
                    <div className="logo-text text-blue-600 font-bold text-lg hover:text-blue-500 transition-colors">E</div>
                    <div className="logo-text text-gray-800 dark:text-white font-bold text-lg -ml-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">&nbsp;CELL</div>
                  </div>
                  <div className="divider-container flex items-center mt-[-0.4rem]">
                    <div className="w-3 h-[1px] bg-gray-800 dark:bg-white transition-colors"></div>
                    <span className="university-text mx-1 text-gray-800 dark:text-white text-[0.5rem] font-semibold tracking-wide hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                      MMDU
                    </span>
                    <div className="w-3 h-[1px] bg-gray-800 dark:bg-white transition-colors"></div>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-7 00 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-sm/6 font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
              {user && userNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-sm/6 font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-sm/6 font-semibold text-gray-900 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
                >
                  Logout <span className="inline-block transition-transform hover:translate-x-1">→</span>
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="text-sm/6 font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
                >
                  Log in <span className="inline-block transition-transform hover:translate-x-1">→</span>
                </Link>
              )}
            </div>
          </nav>
          <div className="border-b border-gray-200 dark:border-white"></div>
          <Dialog 
            open={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5 flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline">
                      <div className="logo-text text-blue-600 font-bold text-xl">E </div>
                      <div className="logo-text text-gray-800 dark:text-white font-bold text-xl -ml-1">&nbsp;CELL</div>
                    </div>
                    <div className="divider-container flex items-center mt-[-0.5rem]">
                      <div className="w-4 h-[1px] bg-gray-800 dark:bg-white"></div>
                      <span className="university-text mx-1 text-gray-800 dark:text-white text-[0.6rem] font-semibold tracking-wide">
                        MMDU
                      </span>
                      <div className="w-4 h-[1px] bg-gray-800 dark:bg-white"></div>
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors absolute right-6 top-6"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-5 00/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {user && userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Log in
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      </div>
    
    </>
  )
}
