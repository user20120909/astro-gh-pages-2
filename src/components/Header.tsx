import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

interface Props {
  siteName: string;
  shopUrl: string;
}

const Header: React.FC<Props> = ({ siteName, shopUrl }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const pages = [
    { name: 'sjop 👕', href: shopUrl },
    { name: 'niews 📰', href: '/ps/1' },
    { name: 'weer 🌤️', href: '/weer' },
    { name: 'eige poost 📝', href: '/eige-poost' },
    { name: 'follo 👥', href: '/follo' },
    { name: 'kontakt 📧', href: '/kontakt' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowNotification(true);
    }, 60000);
  }, []);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:py-7 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <img
                src="https://i.ibb.co/JRwdK6rj/android-chrome-192x192.png"
                alt="Company logo"
                className="h-10 w-auto sm:h-12"
              />
              <span className="ml-3 text-2xl sm:text-3xl font-bold">
                {siteName}.nl
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) {
                  setShowNotification(false);
                }
              }}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-pink-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaXmark className="h-7 w-7" aria-hidden="true" />
              ) : (
                <>
                  <FaBars className="h-7 w-7" aria-hidden="true" />
                  {showNotification && (
                    <span className="absolute ml-20 mr-11 mb-7 flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {pages.map((page) => (
              <a
                key={page.name}
                href={page.href}
                className="text-lg font-semibold text-gray-900"
                target={page.href.startsWith('http') ? '_blank' : '_self'}
              >
                {page.name}
                {page.name.startsWith('sjop') && showNotification && (
                  <span className="absolute top-0 ml-15 mt-10 flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Menu rendered outside header so it stacks behind */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto p-6">
          <div className="flex flex-col justify-start pt-32 space-y-10 h-full text-2xl items-end text-right px-6">
            {pages.map((page) => (
              <a
                key={page.name}
                href={page.href}
                className="font-semibold text-gray-900 hover:text-gray-600 break-words"
                target={page.href.startsWith('http') ? '_blank' : '_self'}
              >
                {page.name}
                {page.name.startsWith('sjop') && (
                  <span className="absolute top-0 ml-20 mt-38 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
