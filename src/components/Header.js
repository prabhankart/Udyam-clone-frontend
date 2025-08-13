import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["Home", "NIC Code", "Useful Documents", "Print / Verify", "Update Details", "Login"];

  return (
    <header className="bg-gradient-to-r from-[#5a67d8] to-[#4c51bf] shadow-lg text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Title Section */}
          <div className="flex items-center">
            {/* Placeholder for the Ashoka Emblem */}
            <div className="w-12 h-12 flex items-center justify-center mr-3">
                <svg className="w-10 h-10 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-wide">सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय</h1>
              <p className="text-xs sm:text-sm opacity-90">Ministry of Micro, Small & Medium Enterprises</p>
            </div>
          </div>
          
          {/* Hamburger Menu Button for mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center border-t border-white/20">
          <ul className="flex space-x-6 lg:space-x-8 py-2">
            {navLinks.map((link, index) => (
              <li key={link}>
                <a href="#" className={`relative text-sm font-medium transition-colors duration-300 ${index === 0 ? 'text-white' : 'text-white/80 hover:text-white'}`}>
                  {link}
                  {index === 0 && <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-yellow-300 rounded-full"></span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu with Transition */}
      <div className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="border-t border-white/20 px-2 pt-2 pb-3 sm:px-3">
          <ul className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <li key={link}>
                <a href="#" className="block py-2 px-3 rounded-md text-base font-medium hover:bg-white/10 transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
