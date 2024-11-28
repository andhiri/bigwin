import React, { useState, useEffect } from 'react';
import { Trophy, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';
import { MobileMenu } from './navigation/MobileMenu';
import { DesktopMenu } from './navigation/DesktopMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between w-[98%] mx-auto">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-7 w-7 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">BIGWIN.MV</span>
            </Link>

            <DesktopMenu />

            <div className="flex items-center space-x-4">
              <Link to="/checkout">
                <CartIcon />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-purple-600 transition-colors focus:outline-none md:hidden"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </nav>
      <div className="h-20" />
    </>
  );
}