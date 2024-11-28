import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function DesktopMenu() {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'How to Play', path: '#' },
    { label: 'Winners', path: '#' },
    { label: 'Contact', path: '#' }
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {menuItems.map((item) => (
        <motion.div
          key={item.label}
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.path === '/' ? (
            <Link
              to={item.path}
              className="text-gray-700 font-medium relative group px-2 py-1"
            >
              <span className="relative z-10">{item.label}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 origin-left transform scale-x-0 transition-transform group-hover:scale-x-100"
                initial={false}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 bg-purple-50 rounded-lg -z-10 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ) : (
            <a
              href={item.path}
              className="text-gray-700 font-medium relative group px-2 py-1"
            >
              <span className="relative z-10">{item.label}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 origin-left transform scale-x-0 transition-transform group-hover:scale-x-100"
                initial={false}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 bg-purple-50 rounded-lg -z-10 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.2 }}
              />
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
}