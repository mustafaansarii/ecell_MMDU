'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'

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
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <>
      <div className="dark:text-white">
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm ">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-1">
                <div className="text-3xl font-bold relative -top-1">E</div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold leading-none mb-0.5">-CELL</div>
                  <div className="text-[6px] tracking-widest text-center w-full leading-none">M M D U</div>
                </div>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-red-500 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </nav>
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-black sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-1">
                  <div className="text-3xl font-bold relative -top-1">E</div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-bold leading-none mb-0.5">-CELL</div>
                    <div className="text-[6px] tracking-widest text-center w-full leading-none">M M D U</div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
