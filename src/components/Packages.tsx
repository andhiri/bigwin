import React from 'react';
import { Key, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const packages = [
  {
    tags: 1,
    price: 50,
    entries: 2,
    popular: false
  },
  {
    tags: 2,
    price: 120,
    entries: 5,
    popular: true
  },
  {
    tags: 3,
    price: 250,
    entries: 7,
    popular: false
  }
];

export function Packages() {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleBuyNow = (pkg: typeof packages[0]) => {
    dispatch({ type: 'ADD_ITEM', payload: pkg });
    navigate('/checkout');
  };

  return (
    <div id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Package</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.tags} className={`relative rounded-2xl overflow-hidden ${
              pkg.popular ? 'transform scale-105' : ''
            }`}>
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 rounded-bl-lg font-semibold">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${
                pkg.popular ? 'bg-gradient-to-b from-purple-900 to-indigo-900 text-white' : 'bg-white'
              } shadow-lg`}>
                <div className="flex justify-center mb-4">
                  <Key className={`h-12 w-12 ${pkg.popular ? 'text-yellow-400' : 'text-purple-600'}`} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">{pkg.tags} Key Tag{pkg.tags > 1 ? 's' : ''}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-lg"> MVR</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    {pkg.entries} Lucky Draw Entries
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    Instant Digital Delivery
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    24/7 Support
                  </li>
                </ul>
                <button 
                  onClick={() => handleBuyNow(pkg)}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-transform hover:scale-105 ${
                    pkg.popular 
                      ? 'bg-yellow-400 text-black' 
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}