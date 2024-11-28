import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Gift, Trophy, Users, Phone, HelpCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const menuItems = [
    {
      title: 'Home',
      path: '/',
      icon: Trophy,
      description: 'Back to homepage'
    },
    {
      title: 'How to Play',
      path: '#',
      icon: HelpCircle,
      description: 'Learn game rules'
    },
    {
      title: 'Winners',
      path: '#',
      icon: Gift,
      description: 'Previous winners'
    },
    {
      title: 'Contact',
      path: '#',
      icon: Phone,
      description: 'Get in touch'
    }
  ];

  const handleBigwinClick = () => {
    onClose();
    // Add the most popular package to cart
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        tags: 2,
        price: 120,
        entries: 5
      }
    });
    // Navigate to checkout
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed left-0 right-0 top-[72px] bg-white shadow-lg rounded-b-2xl md:hidden w-[98%] mx-auto overflow-hidden"
        >
          <div className="py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-center px-6 py-3 hover:bg-purple-50 transition-colors group"
                  onClick={onClose}
                >
                  <Icon className="h-5 w-5 text-purple-600 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </Link>
              );
            })}
          </div>
          
          <div className="px-6 py-4 bg-purple-50 mt-2">
            <button
              onClick={handleBigwinClick}
              className="flex items-center space-x-3 w-full hover:bg-purple-100 rounded-lg p-2 transition-colors"
            >
              <Users className="h-5 w-5 text-purple-600" />
              <div className="text-sm text-gray-600">
                Join <span className="font-medium text-purple-600 hover:text-purple-800 transition-colors">BIGWIN</span> Buyers
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}